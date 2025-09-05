import 'dotenv/config';
import express from "express";
import { createClient } from "@supabase/supabase-js";

const router = express.Router();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Server-side admin guard: verify JWT and role/email
async function adminGuard(req, res, next) {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ')
      ? authHeader.slice(7)
      : null;
    if (!token) return res.status(401).json({ error: 'Missing token' });

    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data?.user) return res.status(401).json({ error: 'Invalid token' });

    const user = data.user;
    const isAdmin = user?.app_metadata?.role === 'admin';
    if (!isAdmin) return res.status(403).json({ error: 'Forbidden' });

    req.user = user;
    next();
  } catch (e) {
    console.error('adminGuard error:', e);
    return res.status(500).json({ error: 'Auth failure' });
  }
}

// Apply guard to all admin routes
router.use(adminGuard);

// Helper to list all users (admin API is paginated)
async function listAllUsers() {
  const all = [];
  let page = 1;
  const perPage = 1000;
  // Loop until fewer than perPage users returned
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage });
    if (error) throw error;
    const users = data?.users || [];
    all.push(...users);
    if (users.length < perPage) break;
    page += 1;
  }
  return all;
}

router.get("/overview", async (req, res) => {
  try {
    // Users
    const users = await listAllUsers();
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;
    const oneWeek = 7 * oneDay;
    const activeUsers = users.filter(u => u.last_sign_in_at && (now - new Date(u.last_sign_in_at).getTime()) <= oneWeek).length;
    const newUsersToday = users.filter(u => (now - new Date(u.created_at).getTime()) <= oneDay).length;
    const newUsersThisWeek = users.filter(u => (now - new Date(u.created_at).getTime()) <= oneWeek).length;

    // Credits stats
    const { data: creditsAgg, error: creditsAggErr } = await supabase
      .from("user_credits")
      .select("credits", { count: "exact" });
    if (creditsAggErr) throw creditsAggErr;
    const totalCredits = (creditsAgg || []).reduce((sum, r) => sum + (r.credits || 0), 0);

    // Build user activity list with credits
    const { data: creditsRows, error: creditsErr } = await supabase
      .from("user_credits")
      .select("user_id, credits");
    if (creditsErr) throw creditsErr;
    const userIdToCredits = new Map(creditsRows?.map(r => [r.user_id, r.credits || 0]) || []);

    const userActivity = users.slice(0, 100).map(u => ({
      id: u.id,
      email: u.email,
      role: (u.app_metadata?.role || "user"),
      credits: userIdToCredits.get(u.id) || 0,
      status: u.last_sign_in_at ? "active" : "inactive",
      lastLogin: u.last_sign_in_at || "Never",
    }));

    // Revenue and transactions today
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const { data: paymentsToday, error: paymentsErr } = await supabase
      .from('payments')
      .select('amount')
      .gte('paid_at', startOfDay.toISOString())
      .eq('status', 'PAID');
    if (paymentsErr) console.warn('paymentsToday error:', paymentsErr);
    const transactionsToday = (paymentsToday || []).length;
    const totalRevenueToday = (paymentsToday || []).reduce((s, r) => s + (Number(r.amount) || 0), 0);

    // Average transaction value (over all PAID payments)
    const { data: paidPayments, error: paidErr } = await supabase
      .from('payments')
      .select('amount')
      .eq('status', 'PAID');
    if (paidErr) console.warn('paidPayments error:', paidErr);
    const totalRevenueAll = (paidPayments || []).reduce((s, r) => s + (Number(r.amount) || 0), 0);
    const averageTransactionValue = (paidPayments && paidPayments.length > 0)
      ? totalRevenueAll / paidPayments.length
      : 0;

    // Recent activity (last 20 items)
    const { data: recentActivityRows, error: recentActErr } = await supabase
      .from('activity_log')
      .select('id, type, description, created_at, amount')
      .order('created_at', { ascending: false })
      .limit(20);
    if (recentActErr) console.warn('recent activity error:', recentActErr);
    const recentActivity = (recentActivityRows || []).map(r => ({
      id: String(r.id),
      type: r.type,
      description: r.description,
      timestamp: r.created_at,
      amount: r.amount || undefined,
    }));

    const response = {
      userStats: {
        totalUsers: users.length,
        activeUsers,
        newUsersToday,
        newUsersThisWeek,
      },
      creditsStats: {
        totalCredits,
        totalRevenue: totalRevenueAll,
        transactionsToday,
        averageTransactionValue,
      },
      systemHealth: {
        databaseStatus: "healthy",
        paymentStatus: "healthy",
        serverStatus: "healthy",
      },
      recentActivity,
      userActivity,
      lastUpdated: new Date().toISOString(),
    };

    res.json(response);
  } catch (err) {
    console.error("/admin/overview error:", err);
    res.status(500).json({ error: "Failed to load overview" });
  }
});

router.get("/user-growth", async (req, res) => {
  try {
    const users = await listAllUsers();
    const days = 7;
    const buckets = Array.from({ length: days }, () => 0);
    const labels = Array.from({ length: days }, (_, i) => {
      const d = new Date(Date.now() - (days - i - 1) * 86400000);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    });
    const start = Date.now() - (days - 1) * 86400000;
    users.forEach(u => {
      const t = new Date(u.created_at).getTime();
      if (t >= start) {
        const idx = Math.floor((t - start) / 86400000);
        if (idx >= 0 && idx < days) buckets[idx] += 1;
      }
    });
    const data = labels.map((name, i) => ({ name, value: buckets[i] }));
    res.json(data);
  } catch (err) {
    console.error("/admin/user-growth error:", err);
    res.status(500).json({ error: "Failed to load user growth" });
  }
});

router.get("/revenue", async (_req, res) => {
  try {
    const { data, error } = await supabase
      .from("payments")
      .select("amount, created_at")
      .eq("status", "PAID")
      .gte("created_at", new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
      .order("created_at", { ascending: true });

    if (error) throw error;

    // Group payments by day for the last 7 days
    const days = 7;
    const buckets = Array.from({ length: days }, () => 0);
    const labels = Array.from({ length: days }, (_, i) => {
      const d = new Date(Date.now() - (days - i - 1) * 86400000);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    });
    
    const start = Date.now() - (days - 1) * 86400000;
    (data || []).forEach(payment => {
      const t = new Date(payment.created_at).getTime();
      if (t >= start) {
        const idx = Math.floor((t - start) / 86400000);
        if (idx >= 0 && idx < days) {
          buckets[idx] += payment.amount || 0;
        }
      }
    });

    const revenueData = labels.map((name, i) => ({ name, value: buckets[i] }));
    res.json(revenueData);
  } catch (err) {
    console.error("/admin/revenue error:", err);
    res.status(500).json({ error: "Failed to load revenue data" });
  }
});

router.get("/credits-distribution", async (_req, res) => {
  try {
    const { data, error } = await supabase.from("user_credits").select("credits");
    if (error) throw error;
    const buckets = { "0-100": 0, "101-500": 0, "501-1000": 0, "1001+": 0 };
    (data || []).forEach(row => {
      const c = row.credits || 0;
      if (c <= 100) buckets["0-100"] += 1;
      else if (c <= 500) buckets["101-500"] += 1;
      else if (c <= 1000) buckets["501-1000"] += 1;
      else buckets["1001+"] += 1;
    });
    res.json(Object.entries(buckets).map(([name, value]) => ({ name, value })));
  } catch (err) {
    console.error("/admin/credits-distribution error:", err);
    res.status(500).json({ error: "Failed to load distribution" });
  }
});

// Admin: update any user's profile names
router.post("/users/:id/profile", async (req, res) => {
  try {
    const userId = req.params.id;
    const { firstName, lastName } = req.body || {};
    if (!userId) return res.status(400).json({ error: 'Missing user id' });
    const { data, error } = await supabase.auth.admin.updateUserById(userId, {
      app_metadata: undefined,
      user_metadata: { firstName: firstName || '', lastName: lastName || '' },
    });
    if (error) return res.status(400).json({ error: error.message });
    return res.json({ success: true, user: { id: data.user.id, email: data.user.email, user_metadata: data.user.user_metadata } });
  } catch (e) {
    console.error('update profile error:', e);
    return res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Admin: reset/set any user's password
router.post("/users/:id/password", async (req, res) => {
  try {
    const userId = req.params.id;
    const { newPassword } = req.body || {};
    if (!userId || !newPassword) return res.status(400).json({ error: 'Missing fields' });
    const { data, error } = await supabase.auth.admin.updateUserById(userId, {
      password: newPassword,
    });
    if (error) return res.status(400).json({ error: error.message });
    return res.json({ success: true, user: { id: data.user.id, email: data.user.email } });
  } catch (e) {
    console.error('update password error:', e);
    return res.status(500).json({ error: 'Failed to update password' });
  }
});

export default router;


