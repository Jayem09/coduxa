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
app.use("/api", webhookLimiter, paymentRoutes);
// Mount admin routes
app.use("/admin", adminLimiter, adminRoutes);

// Direct webhook route (for Xendit)
app.use("/webhook", webhookLimiter, paymentRoutes);

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
