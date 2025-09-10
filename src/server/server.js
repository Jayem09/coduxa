import 'dotenv/config';
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import paymentRoutes from "./routes/payment.js";
import adminRoutes from "./routes/admin.js";
import { createClient } from "@supabase/supabase-js";
import rateLimit, { ipKeyGenerator } from "express-rate-limit";
import { Resend } from "resend";

const app = express();

// Trust proxy for Vercel deployment
app.set('trust proxy', 1);

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Initialize Resend for email service
const resend = new Resend(process.env.RESEND_API_KEY);

// Middleware
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL || "http://localhost:5173",
      "http://localhost:5175", // Add support for port 5175
      "http://localhost:3000", // Add support for port 3000
      "http://localhost:5174"  // Add support for port 5174
    ],
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from public directory
app.use(express.static('public'));

// Specific route for robots.txt with proper headers
app.get('/robots.txt', (req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.sendFile('robots.txt', { root: 'public' });
});

const adminLimiter = rateLimit({ 
  windowMs: 60 * 1000, 
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: ipKeyGenerator
});

const webhookLimiter = rateLimit({ 
  windowMs: 60 * 1000, 
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: ipKeyGenerator
});

// Email confirmation endpoint
app.post("/api/send-confirmation", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const result = await resend.emails.send({
      from: "noreply@coduxa.com", // Use your verified domain
      to: email,
      subject: "Welcome to Coduxa - Confirm Your Email",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8" />
            <title>Welcome to Coduxa</title>
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #3b82f6; margin: 0;">Welcome to Coduxa!</h1>
                <p style="color: #666; margin: 5px 0;">Programming Certification Platform</p>
              </div>
              
              <h2 style="color: #333;">Confirm Your Email</h2>
              <p>Hello,</p>
              <p>Thank you for signing up for Coduxa! Please confirm your email address by clicking the button below:</p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${process.env.FRONTEND_URL || 'https://coduxa.vercel.app'}/confirm?email=${encodeURIComponent(email)}" 
                   style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                  Confirm Email
                </a>
              </div>
              
              <p>Once confirmed, you'll be able to access all Coduxa features and start your programming certification journey!</p>
              
              <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
              <p style="color: #666; font-size: 14px;">
                Best regards,<br />
                The Coduxa Team<br />
                <a href="https://coduxa.vercel.app" style="color: #3b82f6;">coduxa.vercel.app</a>
              </p>
            </div>
          </body>
        </html>
      `,
    });

    res.json({ success: true, result });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

// Mount payment routes
app.use("/api", paymentRoutes);
// Mount admin routes
app.use("/admin", adminLimiter, adminRoutes);

// Direct webhook route (for Xendit) - no rate limiting to avoid proxy issues
app.post("/webhook", async (req, res) => {
  try {
    console.log('Webhook received:', JSON.stringify(req.body, null, 2));
    
    const event = req.body;
    if (event?.status !== "PAID") {
      console.log('Webhook status not PAID:', event?.status);
      return res.sendStatus(200);
    }

    let userId = event?.user_id || event?.metadata?.user_id;
    let credits = Number(event?.metadata?.credits || 0);
    
    if (event?.external_id) {
      const m = String(event.external_id).match(/^topup-(.+)-\d+$/);
      if (m) {
        userId = m[1];
        console.log('Extracted userId from external_id:', userId);
      }
    }
    
    if (!credits) {
      const descMatch = event?.description?.match(/(\d+)\s*credits/);
      if (descMatch) {
        credits = Number(descMatch[1]);
        console.log('Extracted credits from description:', credits);
      } else if (event?.amount) {
        credits = Math.floor(Number(event.amount) / 6);
        console.log('Calculated credits from amount:', credits);
      }
    }
    
    console.log('Webhook data:', { userId, credits, external_id: event?.external_id, amount: event?.amount });
    
    if (!userId || credits <= 0) {
      console.error('Invalid webhook data:', { userId, credits, event });
      return res.sendStatus(400);
    }

    // Try RPC first
    console.log(`Attempting to add ${credits} credits to user ${userId}`);
    const rpcResult = await supabase.rpc("increment_credits", {
      p_user_id: userId,
      p_credit_amount: credits,
    });
    
    if (rpcResult.error) {
      console.log('RPC failed, using fallback method:', rpcResult.error);
      
      // Fallback: direct upsert
      const current = await supabase
        .from("user_credits")
        .select("credits")
        .eq("user_id", userId)
        .single();
      
      if (current.error && current.error.code !== "PGRST116") {
        console.error("Failed to read current credits:", current.error);
        return res.sendStatus(500);
      }
      
      const currentCredits = current.data?.credits || 0;
      const newCredits = currentCredits + credits;
      
      const upsert = await supabase
        .from("user_credits")
        .upsert({ user_id: userId, credits: newCredits });
      
      if (upsert.error) {
        console.error("Upsert credits failed:", upsert.error);
        return res.sendStatus(500);
      }
      
      console.log(`Fallback: Added ${credits} credits. New total: ${newCredits}`);
    } else {
      console.log('RPC successful:', rpcResult.data);
    }

    // Persist payment
    const paymentRow = {
      id: event?.id || null,
      external_id: event?.external_id || null,
      user_id: userId,
      amount: Number(event?.amount) || 0,
      currency: event?.currency || "PHP",
      description: event?.description || null,
      status: "PAID",
      provider: "xendit",
      metadata: event?.metadata || {},
      paid_at: event?.paid_at || new Date().toISOString(),
      created_at: new Date().toISOString(),
    };
    const { error: payErr } = await supabase.from("payments").insert(paymentRow);
    if (payErr) console.warn("Failed to insert payment:", payErr);

    // Log activity
    const activityRow = {
      type: "credit_purchase",
      user_id: userId,
      amount: Number(event?.amount) || 0,
      description: `Credit purchase • ${credits} credits`,
      metadata: {
        provider: "xendit",
        external_id: event?.external_id || null,
        pack_title: event?.metadata?.pack_title || null,
        credits,
      },
      created_at: new Date().toISOString(),
    };
    const { error: actErr } = await supabase.from("activity_log").insert(activityRow);
    if (actErr) console.warn("Failed to insert activity:", actErr);

    console.log(`Successfully processed webhook for user ${userId}, added ${credits} credits`);
    return res.sendStatus(200);
  } catch (err) {
    console.error("Webhook error:", err);
    return res.sendStatus(500);
  }
});

// Route to fetch user credits
app.get("/api/credits/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const { data, error } = await supabase
      .from("user_credits")
      .select("credits")
      .eq("user_id", userId)
      .single();

    if (error && error.code === "PGRST116") {
      return res.json({ success: true, credits: 0 });
    }
    if (error) throw error;
    res.json({ success: true, credits: data?.credits || 0 });
  } catch (err) {
    console.error("Failed to fetch credits:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Test endpoint to manually add credits
app.post("/test-credits", async (req, res) => {
  try {
    const { userId, credits } = req.body;
    
    if (!userId || !credits) {
      return res.status(400).json({ error: "Missing userId or credits" });
    }
    
    console.log(`Manually adding ${credits} credits to user ${userId}`);
    
    // Try RPC first
    const rpc1 = await supabase.rpc("increment_credits", {
      p_user_id: userId,
      p_credit_amount: credits,
    });
    
    if (rpc1.error) {
      console.log('RPC failed, trying fallback:', rpc1.error);
      
      // Fallback to direct update
      const current = await supabase
        .from("user_credits")
        .select("credits")
        .eq("user_id", userId)
        .single();
      
      const currentCredits = current.data?.credits || 0;
      const newCredits = currentCredits + credits;
      
      const upsert = await supabase
        .from("user_credits")
        .upsert({ user_id: userId, credits: newCredits });
      
      if (upsert.error) {
        return res.status(500).json({ error: "Failed to add credits", details: upsert.error });
      }
      
      return res.json({ 
        success: true, 
        message: `Added ${credits} credits using fallback method`,
        currentCredits: newCredits
      });
    }
    
    // Get updated credits
    const { data: updatedCredits } = await supabase
      .from("user_credits")
      .select("credits")
      .eq("user_id", userId)
      .single();
    
    res.json({ 
      success: true, 
      message: `Added ${credits} credits successfully`,
      currentCredits: updatedCredits?.credits || 0
    });
    
  } catch (err) {
    console.error("Test credits error:", err);
    res.status(500).json({ error: "Internal server error", details: err.message });
  }
});


// 404 handler
app.use((req, res) => res.status(404).json({ error: "Route not found" }));

// Error handler
app.use((err, req, res, next) => {
  console.error("❌ Server error:", err);
  res.status(500).json({ error: "Internal server error" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));