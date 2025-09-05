import 'dotenv/config';
import express from "express";
import axios from "axios";
import { createClient } from "@supabase/supabase-js";

const router = express.Router();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const XENDIT_SECRET = process.env.XENDIT_SECRET_KEY;

const CREDIT_PACKAGES = {
  starter: { credits: 15, amount: 150, title: "Starter Pack" },
  popular: { credits: 40, amount: 300, title: "Popular Pack" },
  pro: { credits: 100, amount: 600, title: "Pro Pack" }
};

// Get user credits
router.get("/credits/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const { data, error } = await supabase
      .from("user_credits")
      .select("credits")
      .eq("user_id", userId)
      .single();

    if (error && error.code === "PGRST116") {
      return res.json({ success: true, credits: 0 });
    } else if (error) {
      throw error;
    }

    res.json({ success: true, credits: data.credits || 0 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Failed to fetch credits" });
  }
});

// Get packages
router.get("/packages", (req, res) => {
  res.json({ success: true, packages: CREDIT_PACKAGES });
});

// Create invoice
router.post("/create-invoice", async (req, res) => {
  const { userId, amount, credits, packTitle } = req.body;
  if (!userId || !amount || !credits || !packTitle)
    return res.status(400).json({ error: "Missing required fields" });

  try {
    const invoiceData = {
      external_id: `topup-${userId}-${Date.now()}`,
      amount: Number(amount),
      currency: "PHP",
      description: `${packTitle} • ${credits} credits`,
      success_redirect_url: `${process.env.FRONTEND_URL || "http://localhost:5173"}/dashboard/credits?status=success`,
      failure_redirect_url: `${process.env.FRONTEND_URL || "http://localhost:5173"}/dashboard/credits?status=failed`,
      metadata: { user_id: userId, credits, pack_title: packTitle },
    };

    const response = await axios.post(
      "https://api.xendit.co/v2/invoices",
      invoiceData,
      {
        auth: { username: XENDIT_SECRET, password: "" },
        headers: { "Content-Type": "application/json" },
      }
    );

    res.json({
      success: true,
      invoice_url: response.data.invoice_url,
      invoice_id: response.data.id,
      external_id: response.data.external_id,
      amount: response.data.amount,
      credits,
      package: packTitle,
    });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ success: false, error: "Failed to create invoice" });
  }
});

// Webhook
router.post("/webhook", async (req, res) => {
  try {
    // Handle Vercel deployment protection bypass
    const bypassToken = req.query['x-vercel-protection-bypass'];
    if (bypassToken && process.env.VERCEL_PROTECTION_BYPASS_TOKEN) {
      if (bypassToken !== process.env.VERCEL_PROTECTION_BYPASS_TOKEN) {
        return res.status(401).json({ error: 'Invalid bypass token' });
      }
    }

    const event = req.body;
    if (event?.status !== "PAID") return res.sendStatus(200);

    // Extract user and credits
    let userId = event?.metadata?.user_id;
    let credits = Number(event?.metadata?.credits || 0);
    if (!userId && event?.external_id) {
      const m = String(event.external_id).match(/^topup-(.+)-\d+$/);
      if (m) userId = m[1];
    }
    if (!credits && event?.amount) {
      credits = Math.floor(Number(event.amount) / 6); // fallback conv
    }
    if (!userId || credits <= 0) return res.sendStatus(400);

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

    return res.sendStatus(200);
  } catch (err) {
    console.error("Webhook error:", err);
    return res.sendStatus(500);
  }
});

export default router;
