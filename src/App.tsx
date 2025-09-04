// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { HelmetProvider } from "react-helmet-async";
import { supabase } from "./components/lib/supabaseClient";
import { CodeCredHeader } from "./components/CoduxaHeader";
import { CodeCredHero } from "./components/CoduxaHero";
import { CodeCredServices } from "./components/CoduxaServices";
import { CodeCredStats } from "./components/CoduxaStats";
import { CodeCredFooter } from "./components/CoduxaFooter";
import AdminDashboard from "./backend/pages/AdminDashboard";
import SEO, { seoConfigs } from "./components/SEO";

import { LoginForm } from "./components/pages/LoginForm";
import { SignUpForm } from "./components/pages/SignUpForm";
import { ResetPasswordForm } from "./components/pages/ResetPasswordForm";

import AdminSidebar from "./backend/pages/AdminSidebar";
import CreditsPage from "./backend/pages/CreditsModal";
import CertificationsPage from "./backend/pages/CertificationsPage";
import { SidebarProvider, SidebarTrigger } from "./backend/components/ui/sidebar";
import UserSettings from "./backend/pages/UserSettings";

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const isAdminUser = (u: any) => {
    if (!u) return false;
    // Role-only check
    return u?.app_metadata?.role === "admin";
  };

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
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
        {/* Public landing page with header/footer */}
        <Route
          index
          element={
            <div className="min-h-screen bg-background flex flex-col">
              <SEO {...seoConfigs.home} />
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
        <Route path="/login" element={
          <>
            <SEO {...seoConfigs.login} />
            <LoginForm />
          </>
        } />
        <Route path="/signup" element={
          <>
            <SEO {...seoConfigs.signup} />
            <SignUpForm />
          </>
        } />
        <Route path="/reset-password" element={
          <>
            <SEO 
              title="Reset Password - Coduxa"
              description="Reset your Coduxa account password securely"
              url="/reset-password"
            />
            <ResetPasswordForm />
          </>
        } />

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
                    {/* Mobile Navigation Header */}
                    <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                          <svg className="h-5 w-5 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                          </svg>
                        </div>
                        <span className="text-xl font-bold">coduxa</span>
                      </div>
                      <SidebarTrigger />
                    </div>
                    
                    <Routes>
                      <Route index element={<Navigate to="credits" replace />} />
                      <Route path="credits" element={
                        <>
                          <SEO {...seoConfigs.credits} />
                          <CreditsPage />
                        </>
                      } />
                      <Route path="certifications" element={
                        <>
                          <SEO {...seoConfigs.certifications} />
                          <CertificationsPage />
                        </>
                      } />
                      <Route
                        path="admin"
                        element={isAdminUser(user) ? (
                          <>
                            <SEO {...seoConfigs.admin} />
                            <AdminDashboard />
                          </>
                        ) : <Navigate to="/dashboard/credits" replace />}
                      />
                      <Route path="settings" element={
                        <>
                          <SEO {...seoConfigs.dashboard} />
                          <UserSettings />
                        </>
                      } />
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
    </HelmetProvider>
  );
}