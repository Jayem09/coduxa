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
  const event = req.body;
  if (event?.status !== "PAID") return res.sendStatus(200);

  const userId = event.metadata?.user_id;
  const credits = Number(event.metadata?.credits || 0);

  if (!userId || credits <= 0) return res.sendStatus(400);

  try {
    // Update credits
    await supabase.rpc("increment_credits", { user_id: userId, credit_amount: credits });
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

export default router;
