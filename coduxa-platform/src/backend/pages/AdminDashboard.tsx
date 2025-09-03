// src/backend/pages/AdminDashboard.tsx
import { Card, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Users,
  Award,
  FileText,
  CreditCard,
  Shield,
  TrendingUp,
  Activity,
} from "lucide-react";

const stats = [
  { title: "Total Users", value: "1,245", icon: Users },
  { title: "Certifications Issued", value: "320", icon: Award },
  { title: "Exams Taken", value: "540", icon: FileText },
  { title: "Revenue", value: "₱85,400", icon: CreditCard },
];

const systemHealth = [
  {
    icon: Shield,
    title: "System Secure",
    description: "All services operational with SSL encryption",
    status: "Good",
  },
  {
    icon: Activity,
    title: "Server Uptime",
    description: "99.9% uptime in the last 30 days",
    status: "Stable",
  },
  {
    icon: TrendingUp,
    title: "Growth Rate",
    description: "User base grew by 15% this month",
    status: "Positive",
  },
];

export default function AdminDashboard() {
  return (
    // Use absolute positioning and full viewport to override any parent constraints
    <div 
      className="absolute inset-0 bg-blue-50 overflow-y-auto" 
      style={{ 
        height: '100vh', 
        margin: 0, 
        padding: 0,
        left: '250px', // Assuming sidebar width
        width: 'calc(100vw - 250px)'
      }}
    >
      <div className="p-6 space-y-6">
        {/* Header */}
        <Card className="p-6">
          <div className="flex flex-col md:flex-row justify-between md:items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">Admin Dashboard</h2>
              <p className="text-muted-foreground">
                Manage users, monitor exams, and track performance metrics
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-2">
              <Button variant="outline">View Reports</Button>
              <Button>Manage Users</Button>
            </div>
          </div>
        </Card>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.title} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{stat.title}</CardTitle>
                  <p className="text-2xl font-bold mt-2">{stat.value}</p>
                </div>
                <stat.icon className="h-8 w-8 text-muted-foreground" />
              </div>
            </Card>
          ))}
        </div>

        {/* System Health Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {systemHealth.map((item, i) => (
            <Card key={i} className="p-6">
              <div className="flex flex-col items-center text-center space-y-3">
                <item.icon className="h-8 w-8 text-muted-foreground" />
                <h3 className="font-bold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
                <Badge
                  className={
                    item.status === "Good"
                      ? "bg-green-500 text-white"
                      : item.status === "Stable"
                      ? "bg-blue-500 text-white"
                      : "bg-yellow-500 text-white"
                  }
                >
                  {item.status}
                </Badge>
              </div>
            </Card>
          ))}
        </div>

        {/* Actions */}
        <div className="text-center pt-4">
          <p className="text-sm text-muted-foreground mb-4">
            Need to perform advanced actions? Switch to the admin tools panel.
          </p>
          <Button variant="outline" size="sm">
            Go to Admin Tools
          </Button>
        </div>
      </div>
    </div>
  );
}