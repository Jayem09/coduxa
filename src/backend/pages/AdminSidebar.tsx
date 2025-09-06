import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "../components/ui/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "../components/ui/sidebar";
import {
  CreditCard,
  Shield,
  Award,
  FileText,
  BarChart3,
  Briefcase,
  Map,
  HelpCircle,
  MessageSquare,
  Code,
  Settings,
  LogOut,
  ArrowLeft,
} from "lucide-react";
import { supabase } from "../../components/lib/supabaseClient";
import { useCredits } from "../../services/CreditsContext.tsx";

const baseMenuItems = [
  { title: "Credits", icon: CreditCard, href: "/dashboard/credits" },
  { title: "Certifications", icon: Award, href: "/dashboard/certifications" },
  { title: "Exams", icon: FileText, href: "/dashboard/exams" },
  { title: "Leaderboard", icon: BarChart3, href: "/dashboard/leaderboard" },
  { title: "Career", icon: Briefcase, href: "/dashboard/career" },
  { title: "Roadmap", icon: Map, href: "/dashboard/roadmap" },
  { title: "FAQs", icon: HelpCircle, href: "/dashboard/faqs" },
  { title: "Feedback", icon: MessageSquare, href: "/dashboard/feedback" },
];

export default function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showTopUp, setShowTopUp] = useState(false);
  const [amount, setAmount] = useState(100);
  const { credits, refresh, userId } = useCredits();
  const [userEmail, setUserEmail] = useState<string>("");
  const [userInitials, setUserInitials] = useState<string>("?");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // Refresh credits when returning focus (e.g., after payment redirect)
  useEffect(() => {
    const onFocus = () => {
      refresh().catch(() => {});
    };
    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        refresh().catch(() => {});
      }
    };
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [refresh]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    // Force clear any cached auth state
    window.location.href = '/';
  };

  useEffect(() => {
    const loadProfile = async () => {
      const { data } = await supabase.auth.getUser();
      const u = data.user;
      const email = u?.email || '';
      setUserEmail(email);
      setUserInitials(email ? email.slice(0, 2).toUpperCase() : '?');
      setIsAdmin(u?.app_metadata?.role === 'admin');
    };
    loadProfile();
  }, []);

  const handleTopUp = async () => {
    if (!userId) return alert("Not logged in");

    try {
      const res = await fetch(`${(import.meta as any).env?.VITE_SERVER_URL || 'https://coduxa.vercel.app'}/api/create-invoice`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          amount,
          credits: amount / 10,
          packTitle: `Top-up ${amount}`,
        }),
      });

      if (!res.ok) {
        const message = await res.text();
        console.error("Create invoice failed:", res.status, message);
        alert("Something went wrong while creating the payment.");
        return;
      }

      const data = await res.json();
      if (data.invoice_url) {
        window.location.href = data.invoice_url;
      } else {
        alert("Failed to create invoice");
      }
    } catch (err) {
      console.error(err);
      alert("Error while top up");
    }
  };

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/')}
            className="p-1 hover:bg-muted rounded-md transition-colors"
            title="Back to main page"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div className=" ml-2 w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Code className="h-4 w-4 text-primary-foreground" />
          </div>
          <div className="text-2xl font-bold">coduxa</div>
        </div>
        <div className="mt-4 p-3 bg-muted rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm">
              {userInitials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{userEmail || 'User'}</p>
              <p className="text-xs text-muted-foreground truncate">{userEmail || ''}</p>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <CreditCard className="h-4 w-4" />
            <span>{credits}</span>
            <button
              onClick={() => setShowTopUp(true)}
              className="text-blue-500 cursor-pointer hover:underline"
            >
              Top up
            </button>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4">
        <SidebarMenu>
          {/* Admin-only item */}
          {isAdmin && (
            <SidebarMenuItem key="Admin Dashboard">
              <SidebarMenuButton
                asChild
                className={cn(
                  "w-full justify-start",
                  location.pathname === "/dashboard/admin" && "bg-accent"
                )}
              >
                <Link to="/dashboard/admin" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span>Admin Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
          {(baseMenuItems).map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                className={cn(
                  "w-full justify-start",
                  location.pathname === item.href && "bg-accent"
                )}
              >
                <Link to={item.href} className="flex items-center gap-2">
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

        <div className="mt-auto pt-4 border-t">
          <SidebarMenu>
            {!isAdmin && (
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="w-full justify-start"
                >
                  <Link to="/dashboard/settings" className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )}
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={handleLogout}
                className=" mb-3 w-full justify-start text-destructive hover:text-destructive"
              >
                <LogOut className="h-4 w-4" />
                <span>Log out</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarContent>

      {showTopUp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Top Up Credits</h2>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full border rounded p-2 mb-4"
              min={50}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowTopUp(false)}
                className="px-4 py-2 rounded bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleTopUp}
                className="px-4 py-2 rounded bg-blue-600 text-white"
              >
                Pay with Xendit
              </button>
            </div>
          </div>
        </div>
      )}
    </Sidebar>
  );
}
