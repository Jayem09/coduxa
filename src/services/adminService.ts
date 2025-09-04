// Simple typed admin service with mock data to make AdminDashboard functional
export type UserStats = {
  totalUsers: number;
  activeUsers: number;
  newUsersToday: number;
  newUsersThisWeek: number;
};

export type CreditsStats = {
  totalCredits: number;
  totalRevenue: number;
  transactionsToday: number;
  averageTransactionValue: number;
};

export type SystemHealth = {
  databaseStatus: 'healthy' | 'warning' | 'error';
  paymentStatus: 'healthy' | 'warning' | 'error' | 'active' | 'inactive';
  serverStatus: 'healthy' | 'warning' | 'error';
};

export type RecentActivity = {
  id: string;
  type: 'user_registration' | 'credit_purchase' | 'credit_usage' | 'admin_action' | 'other';
  description: string;
  timestamp: string;
  amount?: number;
};

export type UserActivity = {
  id: string;
  email: string;
  role: 'user' | 'admin';
  credits: number;
  status: 'active' | 'inactive';
  lastLogin: string;
};

export type ChartData = { name: string; value: number };

export type DashboardOverview = {
  userStats: UserStats;
  creditsStats: CreditsStats;
  systemHealth: SystemHealth;
  recentActivity: RecentActivity[];
  userActivity: UserActivity[];
  lastUpdated: string;
};

const API_BASE = import.meta.env.VITE_SERVER_URL || "http://localhost:4000";

async function authFetch(path: string): Promise<Response> {
  const token = (await import('../components/lib/supabaseClient')).supabase.auth.getSession().then(r => r.data.session?.access_token);
  const accessToken = await token;
  return fetch(`${API_BASE}${path}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
  });
}

export const AdminService = {
  async getDashboardOverview(): Promise<DashboardOverview> {
    const res = await authFetch(`/admin/overview`);
    if (!res.ok) throw new Error("Failed to fetch overview");
    return res.json();
  },

  async getUserGrowthData(): Promise<ChartData[]> {
    const res = await authFetch(`/admin/user-growth`);
    if (!res.ok) throw new Error("Failed to fetch growth data");
    return res.json();
  },

  async getRevenueData(): Promise<ChartData[]> {
    const res = await authFetch(`/admin/revenue`);
    if (!res.ok) throw new Error("Failed to fetch revenue data");
    return res.json();
  },

  async getCreditsDistribution(): Promise<ChartData[]> {
    const res = await authFetch(`/admin/credits-distribution`);
    if (!res.ok) throw new Error("Failed to fetch credits distribution");
    return res.json();
  },

  async adminUpdateUserProfile(userId: string, firstName: string, lastName: string): Promise<any> {
    const res = await fetch(`${API_BASE}/admin/users/${userId}/profile`, {
      method: 'POST',
      headers: await (async () => {
        const token = (await import('../components/lib/supabaseClient')).supabase.auth.getSession().then(r => r.data.session?.access_token);
        const accessToken = await token;
        return {
          'Content-Type': 'application/json',
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        } as Record<string, string>;
      })(),
      body: JSON.stringify({ firstName, lastName }),
      credentials: 'include',
    });
    if (!res.ok) throw new Error('Failed to update user profile');
    return res.json();
  },

  async adminSetUserPassword(userId: string, newPassword: string): Promise<any> {
    const res = await fetch(`${API_BASE}/admin/users/${userId}/password`, {
      method: 'POST',
      headers: await (async () => {
        const token = (await import('../components/lib/supabaseClient')).supabase.auth.getSession().then(r => r.data.session?.access_token);
        const accessToken = await token;
        return {
          'Content-Type': 'application/json',
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        } as Record<string, string>;
      })(),
      body: JSON.stringify({ newPassword }),
      credentials: 'include',
    });
    if (!res.ok) throw new Error('Failed to update user password');
    return res.json();
  },
};

export default AdminService;


