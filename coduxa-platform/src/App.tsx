// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "./components/lib/supabaseClient";
import { CodeCredHeader } from "./components/CoduxaHeader";
import { CodeCredHero } from "./components/CoduxaHero";
import { CodeCredServices } from "./components/CoduxaServices";
import { CodeCredStats } from "./components/CoduxaStats";
import { CodeCredFooter } from "./components/CoduxaFooter";
import AdminDashboard from "./backend/pages/AdminDashboard";

import { LoginForm } from "./components/pages/LoginForm";
import { SignUpForm } from "./components/pages/SignUpForm";

import AdminSidebar from "./backend/pages/AdminSidebar";
import CreditsPage from "./backend/pages/CreditsModal";
import CertificationsPage from "./backend/pages/CertificationsPage";
import { SidebarProvider } from "./backend/components/ui/sidebar";

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) setUser(data.user);
      setLoading(false);
    };
    fetchUser();

    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      fetchUser();
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <BrowserRouter>
      <Routes>
        {/* Public landing page with header/footer */}
        <Route
          index
          element={
            <div className="min-h-screen bg-background flex flex-col">
              <CodeCredHeader />
              <main className="flex-1">
                <CodeCredHero />
                <CodeCredServices />
                <CodeCredStats />
              </main>
              <CodeCredFooter />
            </div>
          }
        />

        {/* Auth routes */}
        <Route
          path="/login"
          element={<LoginForm onSwitchToSignUp={() => true} />}
        />
        <Route
          path="/signup"
          element={
            <SignUpForm
  onSignUp={async () => true}
  onSwitchToLogin={() => true}
/>
          }
        />

        {/* Dashboard routes */}
        <Route
          path="/dashboard/*"
          element={
            !user ? (
              <Navigate to="/login" replace />
            ) : (
              <SidebarProvider>
                <div className="flex min-h-screen w-full">
                  <AdminSidebar />
                  {/* Remove all constraints and padding */}
                  <main 
                    className="flex-1 bg-gray-100" 
                    style={{ width: '100%', maxWidth: 'none', padding: 0, margin: 0 }}
                  >
                    <Routes>
                      <Route index element={<Navigate to="credits" replace />} />
                      <Route path="credits" element={<CreditsPage />} />
                      <Route path="certifications" element={<CertificationsPage />} />
                      <Route path="admin" element={<AdminDashboard />} />
                    </Routes>
                  </main>
                </div>
              </SidebarProvider>
            )
          }
        />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}