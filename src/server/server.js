import 'dotenv/config';
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import paymentRoutes from "./routes/payment.js";
import adminRoutes from "./routes/admin.js";
import { createClient } from "@supabase/supabase-js";
import rateLimit from "express-rate-limit";

const app = express();

// Trust proxy for Vercel deployment
app.set('trust proxy', 1);

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

// Basic rate limiters with proper proxy configuration
const adminLimiter = rateLimit({ 
  windowMs: 60 * 1000, 
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    return req.ip || req.connection.remoteAddress || 'unknown';
  }
});

const webhookLimiter = rateLimit({ 
  windowMs: 60 * 1000, 
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    return req.ip || req.connection.remoteAddress || 'unknown';
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

    // Extract user and credits from Xendit webhook
    let userId = event?.user_id || event?.metadata?.user_id;
    let credits = Number(event?.metadata?.credits || 0);
    
    // If no credits in metadata, try to extract from external_id or calculate from amount
    if (!credits && event?.external_id) {
      const m = String(event.external_id).match(/^topup-(.+)-\d+$/);
      if (m) userId = m[1];
    }
    
    // If still no credits, calculate from amount (assuming 1 credit = 6000 IDR)
    if (!credits && event?.amount) {
      credits = Math.floor(Number(event.amount) / 6000); // 1 credit = 6000 IDR
    }
    
    // If still no userId, try to extract from external_id pattern
    if (!userId && event?.external_id) {
      const m = String(event.external_id).match(/^topup-(.+)-\d+$/);
      if (m) userId = m[1];
    }
    
    console.log('Webhook data:', { userId, credits, external_id: event?.external_id, amount: event?.amount });
    
    if (!userId || credits <= 0) {
      console.error('Invalid webhook data:', { userId, credits, event });
      return res.sendStatus(400);
    }

    // Try RPC with both arg name sets
    let rpcError = null;
    const rpc1 = await supabase.rpc("increment_credits", {
      p_user_id: userId,
      p_credit_amount: credits,
    });
    if (rpc1.error) {
      const rpc2 = await supabase.rpc("increment_credits", {
        user_id: userId,
        credit_amount: credits,
      });
      if (rpc2.error) rpcError = rpc2.error;
    }

    if (rpcError) {
      // Fallback upsert
      const current = await supabase
        .from("user_credits")
        .select("credits")
        .eq("user_id", userId)
        .single();
      if (current.error && current.error.code !== "PGRST116") {
        console.error("Failed to read current credits:", current.error);
        return res.sendStatus(500);
      }
      const newCredits = (current.data?.credits || 0) + credits;
      const upsert = await supabase
        .from("user_credits")
        .upsert({ user_id: userId, credits: newCredits });
      if (upsert.error) {
        console.error("Upsert credits failed:", upsert.error);
        return res.sendStatus(500);
      }
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
// Initialize Supabase client for server routes
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

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

// 404 handler
app.use((req, res) => res.status(404).json({ error: "Route not found" }));

// Error handler
app.use((err, req, res, next) => {
  console.error("❌ Server error:", err);
  res.status(500).json({ error: "Internal server error" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
