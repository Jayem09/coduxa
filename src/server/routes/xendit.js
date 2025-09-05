import express from "express";
import axios from "axios";
import 'dotenv/config';
import cors from "cors";
import bodyParser from "body-parser";
import { createClient } from "@supabase/supabase-js";
import path from 'path';
import { fileURLToPath } from 'url';

// Get current file path for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables with proper path (already loaded via dotenv/config)

// Debug: Log environment variables (remove in production)
console.log('Environment variables loaded:');
console.log('SUPABASE_URL:', process.env.SUPABASE_URL ? 'SET' : 'NOT SET');
console.log('SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? 'SET' : 'NOT SET');
console.log('XENDIT_SECRET_KEY:', process.env.XENDIT_SECRET_KEY ? 'SET' : 'NOT SET');
console.log('XENDIT_CALLBACK_TOKEN:', process.env.XENDIT_CALLBACK_TOKEN ? 'SET' : 'NOT SET');

// Validate required environment variables
const requiredEnvVars = ['SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY', 'XENDIT_SECRET_KEY'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.error('❌ Missing required environment variables:', missingEnvVars);
  console.error('Please check your .env file and ensure these variables are set.');
  process.exit(1);
}

const app = express();
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(bodyParser.json());

const XENDIT_SECRET = process.env.XENDIT_SECRET_KEY;

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('✅ Supabase client initialized successfully');

// Mount admin routes here so this server can serve admin endpoints
// Note: Keep admin routes mounted on main server.js only

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: {
      supabaseUrl: process.env.SUPABASE_URL ? 'SET' : 'NOT SET',
      xenditSecret: process.env.XENDIT_SECRET_KEY ? 'SET' : 'NOT SET'
    }
  });
});

// Create invoice endpoint
app.post("/create-invoice", async (req, res) => {
  try {
    console.log('📝 Creating invoice with data:', req.body);
    
    const { userId, amount, credits, packTitle } = req.body;

    // Validate required fields
    if (!userId || !amount || !credits || !packTitle) {
      return res.status(400).json({ 
        error: 'Missing required fields: userId, amount, credits, packTitle' 
      });
    }

    const invoiceData = {
      external_id: `topup-${userId}-${Date.now()}`,
      amount: Number(amount),
      currency: "PHP",
      description: `Coduxa Top-up • ${packTitle} • ${credits} credits`,
      success_redirect_url: `${process.env.FRONTEND_URL || 'https://coduxa.vercel.app'}/dashboard/credits?status=success`,
      failure_redirect_url: `${process.env.FRONTEND_URL || 'https://coduxa.vercel.app'}/dashboard/credits?status=failed`,
      metadata: {
        user_id: userId,
        credits: Number(credits),
        pack_title: packTitle,
      },
    };

    console.log('🚀 Sending request to Xendit:', invoiceData);

    const response = await axios.post(
      "https://api.xendit.co/v2/invoices",
      invoiceData,
      { 
        auth: { 
          username: XENDIT_SECRET, 
          password: "" 
        },
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('✅ Invoice created successfully:', response.data.id);
    res.json(response.data);

  } catch (error) {
    console.error('❌ Error creating invoice:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    
    res.status(500).json({ 
      error: "Failed to create invoice",
      details: error.response?.data || error.message
    });
  }
});

// Webhook verification endpoint (GET)
app.get("/xendit-webhook", (req, res) => {
  console.log('🔍 Webhook verification request received');
  res.json({ status: 'OK', message: 'Webhook endpoint is active' });
});

// Webhook endpoint to handle payment notifications
app.post("/xendit-webhook", async (req, res) => {
  try {
    console.log('🔔 Received Xendit webhook');
    console.log('📋 Request body:', JSON.stringify(req.body, null, 2));
    
    // Verify callback token if set
    const token = req.header("x-callback-token");
    if (process.env.XENDIT_CALLBACK_TOKEN && token !== process.env.XENDIT_CALLBACK_TOKEN) {
      console.error('❌ Invalid callback token');
      return res.sendStatus(401);
    }

    const event = req.body;
    console.log("📋 Webhook event:", JSON.stringify(event, null, 2));

    // Handle PAID status - Xendit sends different format
    if (event?.status === "PAID") {
      console.log('💰 Payment confirmed, processing credit update...');
      
      // Try to get user_id and credits from different possible locations
      let userId = event?.metadata?.user_id;
      let credits = 0;
      
      // If no metadata, try to extract from external_id (format: topup-{userId}-{timestamp})
      if (!userId && event?.external_id) {
        const match = event.external_id.match(/^topup-(.+)-(\d+)$/);
        if (match) {
          userId = match[1];
        }
      }
      
      // Look for credits in metadata or calculate from amount
      if (event?.metadata?.credits) {
        credits = Number(event.metadata.credits);
      } else if (event?.amount) {
        // Fallback: calculate credits from amount (assuming 1 credit = 6 PHP)
        credits = Math.floor(Number(event.amount) / 6);
      }

      if (!userId) {
        console.error('❌ No user_id found in webhook metadata');
        return res.sendStatus(400);
      }

      if (credits <= 0) {
        console.error('❌ Invalid credits amount:', credits);
        return res.sendStatus(400);
      }

      console.log(`💳 Crediting ${credits} credits to user ${userId}`);

      // 1) Update user credits in Supabase via RPC, fallback to upsert if RPC missing
      const rpcResult = await supabase.rpc("increment_credits", {
        p_credit_amount: credits,
        p_user_id: userId,
      });

      if (rpcResult.error) {
        console.warn("⚠️ RPC increment_credits failed, falling back to upsert:", rpcResult.error);

        // Fetch current credits
        const current = await supabase
          .from("user_credits")
          .select("credits")
          .eq("user_id", userId)
          .single();

        if (current.error && current.error.code !== "PGRST116") {
          console.error("❌ Failed to read current credits:", current.error);
          return res.status(500).json({ error: "Failed to read current credits" });
        }

        const newCredits = (current.data?.credits || 0) + credits;

        const upsert = await supabase
          .from("user_credits")
          .upsert({ user_id: userId, credits: newCredits });

        if (upsert.error) {
          console.error("❌ Upsert credits failed:", upsert.error);
          return res.status(500).json({ error: "Failed to update credits" });
        }

        console.log(`✅ Successfully credited ${credits} credits (fallback) to user ${userId}`);
      } else {
        console.log(`✅ Successfully credited ${credits} credits to user ${userId}`);
        console.log('📊 Supabase response:', rpcResult.data);
      }

      // 2) Persist payment to payments table
      const paymentRow = {
        id: event?.id || null,
        external_id: event?.external_id || null,
        user_id: userId,
        amount: Number(event?.amount) || 0,
        currency: event?.currency || 'PHP',
        description: event?.description || null,
        status: 'PAID',
        provider: 'xendit',
        metadata: event?.metadata || {},
        paid_at: event?.paid_at || new Date().toISOString(),
        created_at: new Date().toISOString(),
      };

      const { error: insertPaymentErr } = await supabase
        .from('payments')
        .insert(paymentRow);

      if (insertPaymentErr) {
        console.warn('⚠️ Failed to insert payment row:', insertPaymentErr);
      } else {
        console.log('💾 Payment recorded');
      }

      // 3) Append to activity log
      const activityRow = {
        type: 'credit_purchase',
        user_id: userId,
        amount: Number(event?.amount) || 0,
        description: `Credit purchase • ${credits} credits`,
        created_at: new Date().toISOString(),
        metadata: {
          provider: 'xendit',
          external_id: event?.external_id || null,
          pack_title: event?.metadata?.pack_title || null,
          credits,
        }
      };

      const { error: insertActivityErr } = await supabase
        .from('activity_log')
        .insert(activityRow);

      if (insertActivityErr) {
        console.warn('⚠️ Failed to insert activity row:', insertActivityErr);
      } else {
        console.log('📝 Activity recorded');
      }
    } else {
      console.log(`ℹ️  Webhook status: ${event?.status} (not processing)`);
    }

    res.sendStatus(200);

  } catch (error) {
    console.error("❌ Webhook processing error:", error);
    res.sendStatus(500);
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('❌ Unhandled error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  console.log(`🚀 Xendit server running on http://localhost:${PORT}`);
  console.log(`📋 Available endpoints:`);
  console.log(`   GET  /health - Health check`);
  console.log(`   POST /create-invoice - Create payment invoice`);
  console.log(`   POST /xendit-webhook - Handle payment webhooks`);
});