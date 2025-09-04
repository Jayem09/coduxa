import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import paymentRoutes from "./routes/payments.js";
import { getUserCredits } from "./services/creditsService.js";

dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mount payment routes
app.use("/api/payments", paymentRoutes);

// Route to fetch user credits
app.get("/credits/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const credits = await getUserCredits(userId);
    if (credits === null) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.json({ success: true, credits });
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
