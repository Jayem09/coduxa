// src/backend/pages/AdminDashboard.tsx
import { useEffect, useState } from "react";
import { Card, CardTitle, CardContent, CardHeader } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Users,
  CreditCard,
  DollarSign,
  Server,
  Database,
  Activity,
  TrendingUp,
  RefreshCw,
  UserPlus,
  Zap,
  Shield,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { AdminService, type UserStats, type CreditsStats, type SystemHealth, type RecentActivity, type UserActivity, type ChartData } from "../../services/adminService";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { supabase } from "../../components/lib/supabaseClient";

export default function AdminDashboard() {
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [creditsStats, setCreditsStats] = useState<CreditsStats | null>(null);
  const [systemHealth, setSystemHealth] = useState<SystemHealth | null>(null);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [userActivity, setUserActivity] = useState<UserActivity[]>([]);
  const [userGrowthData, setUserGrowthData] = useState<ChartData[]>([]);
  const [revenueData, setRevenueData] = useState<ChartData[]>([]);
  const [creditsDistribution, setCreditsDistribution] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [settingsMessage, setSettingsMessage] = useState<string>("");
  const [showAllActivities, setShowAllActivities] = useState(false);
  const activitiesToShow = 5; // Show 5 activities by default

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      // Reset show all activities when refreshing data
      setShowAllActivities(false);
      const [dashboardData, growthData, revenueChartData, distributionData] = await Promise.all([
        AdminService.getDashboardOverview(),
        AdminService.getUserGrowthData(),
        AdminService.getRevenueData(),
        AdminService.getCreditsDistribution(),
      ]);
      setUserStats(dashboardData.userStats);
      setCreditsStats(dashboardData.creditsStats);
      setSystemHealth(dashboardData.systemHealth);
      setRecentActivity(dashboardData.recentActivity);
      setUserActivity(dashboardData.userActivity);
      setUserGrowthData(growthData);
      setRevenueData(revenueChartData);
      setCreditsDistribution(distributionData);
      setLastUpdated(dashboardData.lastUpdated);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
    // Auto-refresh removed per request
    return () => {};
  }, []);

  useEffect(() => {
    const loadProfile = async () => {
      const { data } = await supabase.auth.getUser();
      const u = data.user;
      if (u) {
        setFirstName((u.user_metadata?.firstName || u.user_metadata?.first_name || "").toString());
        setLastName((u.user_metadata?.lastName || u.user_metadata?.last_name || "").toString());
        setEmail(u.email || "");
      }
    };
    loadProfile();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      setSettingsMessage("");
      setProfileLoading(true);
      const { error } = await supabase.auth.updateUser({
        data: { firstName, lastName },
      });
      if (error) throw error;
      setSettingsMessage("Profile updated successfully.");
    } catch (e: any) {
      setSettingsMessage(e?.message || "Failed to update profile.");
    } finally {
      setProfileLoading(false);
    }
  };

  const handleUpdatePassword = async () => {
    try {
      setSettingsMessage("");
      if (!currentPassword || !newPassword || !confirmPassword) {
        setSettingsMessage("Please fill in all password fields.");
        return;
      }
      if (newPassword !== confirmPassword) {
        setSettingsMessage("New passwords do not match.");
        return;
      }
      setPasswordLoading(true);
      // Re-authenticate with current password
      const emailAddr = email;
      const signIn = await supabase.auth.signInWithPassword({ email: emailAddr, password: currentPassword });
      if (signIn.error) {
        setSettingsMessage("Current password is incorrect.");
        setPasswordLoading(false);
        return;
      }
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      setSettingsMessage("Password updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (e: any) {
      setSettingsMessage(e?.message || "Failed to update password.");
    } finally {
      setPasswordLoading(false);
    }
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(amount);

  const formatDate = (dateString: string) => new Date(dateString).toLocaleString();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
      case "active":
        return "bg-green-500 text-white";
      case "warning":
        return "bg-yellow-500 text-white";
      case "error":
      case "inactive":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "user_registration":
        return UserPlus;
      case "credit_purchase":
        return CreditCard;
      case "credit_usage":
        return Zap;
      case "admin_action":
        return Shield;
      default:
        return Activity;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-blue-50 overflow-y-auto" 
      style={{ 
        margin: 0, 
        padding: 0
      }}
    >
      <div className="p-6 space-y-6">
        <Card className="p-6">
          <div className="flex flex-col md:flex-row justify-between md:items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">Admin Dashboard</h2>
              <p className="text-muted-foreground">Real-time monitoring of users, credits, and system health</p>
              {lastUpdated && (
                <p className="text-xs text-muted-foreground mt-1">Last updated: {formatDate(lastUpdated)}</p>
              )}
            </div>
            <div className="mt-4 md:mt-0 flex gap-2">
              <Button variant="outline" onClick={loadDashboardData} disabled={loading}>
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>
        </Card>

        {userStats && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Total Users</CardTitle>
                  <p className="text-2xl font-bold mt-2">{userStats.totalUsers.toLocaleString()}</p>
                </div>
                <Users className="h-8 w-8 text-muted-foreground" />
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Active Users</CardTitle>
                  <p className="text-2xl font-bold mt-2">{userStats.activeUsers.toLocaleString()}</p>
                </div>
                <Activity className="h-8 w-8 text-muted-foreground" />
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">New Today</CardTitle>
                  <p className="text-2xl font-bold mt-2">{userStats.newUsersToday}</p>
                </div>
                <UserPlus className="h-8 w-8 text-muted-foreground" />
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">New This Week</CardTitle>
                  <p className="text-2xl font-bold mt-2">{userStats.newUsersThisWeek}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-muted-foreground" />
              </div>
            </Card>
          </div>
        )}

        {creditsStats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Total Credits</CardTitle>
                  <p className="text-2xl font-bold mt-2">{creditsStats.totalCredits.toLocaleString()}</p>
                </div>
                <Zap className="h-8 w-8 text-muted-foreground" />
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Total Revenue</CardTitle>
                  <p className="text-2xl font-bold mt-2">{formatCurrency(creditsStats.totalRevenue)}</p>
                </div>
                <DollarSign className="h-8 w-8 text-muted-foreground" />
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Transactions Today</CardTitle>
                  <p className="text-2xl font-bold mt-2">{creditsStats.transactionsToday}</p>
                </div>
                <CreditCard className="h-8 w-8 text-muted-foreground" />
        </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Avg Transaction</CardTitle>
                  <p className="text-2xl font-bold mt-2">{formatCurrency(creditsStats.averageTransactionValue)}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-muted-foreground" />
              </div>
            </Card>
          </div>
        )}

        {systemHealth && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <div className="flex flex-col items-center text-center space-y-3">
                <Database className="h-8 w-8 text-muted-foreground" />
                <h3 className="font-bold">Database</h3>
                <p className="text-sm text-muted-foreground">Connection status and performance</p>
                <Badge className={getStatusColor(systemHealth.databaseStatus)}>
                  {systemHealth.databaseStatus}
                </Badge>
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex flex-col items-center text-center space-y-3">
                <CreditCard className="h-8 w-8 text-muted-foreground" />
                <h3 className="font-bold">Payment System</h3>
                <p className="text-sm text-muted-foreground">Transaction processing status</p>
                <Badge className={getStatusColor(systemHealth.paymentStatus)}>
                  {systemHealth.paymentStatus}
                </Badge>
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex flex-col items-center text-center space-y-3">
                <Server className="h-8 w-8 text-muted-foreground" />
                <h3 className="font-bold">Server</h3>
                <p className="text-sm text-muted-foreground">Uptime and response times</p>
                <Badge className={getStatusColor(systemHealth.serverStatus)}>
                  {systemHealth.serverStatus}
                </Badge>
              </div>
            </Card>
          </div>
        )}

        <Tabs defaultValue="activity" className="space-y-4">
          <TabsList>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Recent Activity
                  {recentActivity.length > 0 && (
                    <Badge variant="secondary" className="text-xs">
                      {recentActivity.length} {recentActivity.length === 1 ? 'item' : 'items'}
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.length > 0 ? (
                    <>
                      {recentActivity.slice(0, showAllActivities ? recentActivity.length : activitiesToShow).map((activity) => {
                        const IconComponent = getActivityIcon(activity.type);
                        return (
                          <div key={activity.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                            <IconComponent className="h-5 w-5 text-muted-foreground" />
                            <div className="flex-1">
                              <p className="text-sm font-medium">{activity.description}</p>
                              <p className="text-xs text-muted-foreground">{formatDate(activity.timestamp)}</p>
                            </div>
                            {activity.amount && (
                              <Badge variant="outline">{formatCurrency(activity.amount)}</Badge>
                            )}
                          </div>
                        );
                      })}
                      
                      {recentActivity.length > activitiesToShow && (
                        <div className="flex justify-center pt-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowAllActivities(!showAllActivities)}
                            className="flex items-center gap-2 hover:bg-gray-50"
                          >
                            {showAllActivities ? (
                              <>
                                <ChevronUp className="h-4 w-4" />
                                <span>Show Less</span>
                                <span className="text-xs text-muted-foreground">({activitiesToShow} of {recentActivity.length})</span>
                              </>
                            ) : (
                              <>
                                <ChevronDown className="h-4 w-4" />
                                <span>See More</span>
                                <span className="text-xs text-muted-foreground">({recentActivity.length - activitiesToShow} more)</span>
                              </>
                            )}
                          </Button>
                        </div>
                      )}
                    </>
                  ) : (
                    <p className="text-muted-foreground text-center py-8">No recent activity</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Credits</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Login</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userActivity.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.email}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{user.role}</Badge>
                        </TableCell>
                        <TableCell>{user.credits}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {user.lastLogin === 'Never' ? 'Never' : formatDate(user.lastLogin)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Growth (Last 7 Days)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={userGrowthData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} dot={{ fill: '#8884d8', strokeWidth: 2, r: 4 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Trends (Last 7 Days)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => [formatCurrency(Number(value)), 'Revenue']} />
                        <Bar dataKey="value" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Credits Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={creditsDistribution}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#ffc658" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>System Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {systemHealth && (
                      <>
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Database className="h-5 w-5" />
                            <span>Database Response Time</span>
                          </div>
                          <Badge className={getStatusColor(systemHealth.databaseStatus)}>
                            {systemHealth.databaseStatus === 'healthy' ? '< 100ms' : 'Error'}
                          </Badge>
        </div>

                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <CreditCard className="h-5 w-5" />
                            <span>Payment API Status</span>
                          </div>
                          <Badge className={getStatusColor(systemHealth.paymentStatus)}>
                            {systemHealth.paymentStatus}
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Server className="h-5 w-5" />
                            <span>Server Uptime</span>
                          </div>
                          <Badge className={getStatusColor(systemHealth.serverStatus)}>
                            99.9%
                          </Badge>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
        </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <p className="text-sm text-muted-foreground">Manage your account settings and preferences</p>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-4">
                  <h3 className="font-semibold">Profile</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" value={email} disabled />
                      <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                    </div>
                  </div>
                  <Button onClick={handleUpdateProfile} disabled={profileLoading}>
                    {profileLoading ? 'Updating...' : 'Update Profile'}
                  </Button>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Security</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" placeholder="Enter your current password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" placeholder="Enter new password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" placeholder="Confirm new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                  </div>
                  <Button onClick={handleUpdatePassword} disabled={passwordLoading}>
                    {passwordLoading ? 'Updating...' : 'Update Password'}
                  </Button>
                </div>

                {settingsMessage && (
                  <p className="text-sm text-muted-foreground">{settingsMessage}</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}