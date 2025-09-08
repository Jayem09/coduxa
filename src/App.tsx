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
import { lazy, Suspense } from "react";
import SEO, { seoConfigs } from "./components/SEO";

// Lazy load heavy components
const AdminDashboard = lazy(() => import("./backend/pages/AdminDashboard"));
const LoginForm = lazy(() => import("./components/pages/LoginForm").then(m => ({ default: m.LoginForm })));
const SignUpForm = lazy(() => import("./components/pages/SignUpForm").then(m => ({ default: m.SignUpForm })));
const ResetPasswordForm = lazy(() => import("./components/pages/ResetPasswordForm").then(m => ({ default: m.ResetPasswordForm })));
const AdminSidebar = lazy(() => import("./backend/pages/AdminSidebar"));
const CreditsPage = lazy(() => import("./backend/pages/CreditsModal"));
const CertificationsPage = lazy(() => import("./backend/pages/CertificationsPage"));
const UserSettings = lazy(() => import("./backend/pages/UserSettings"));
const ExamsPage = lazy(() => import("./backend/pages/ExamsPage"));
const FAQs = lazy(() => import("./components/FAQs"));
const Roadmap = lazy(() => import("./components/Roadmap"));
const Leaderboard = lazy(() => import("./components/Leaderboard"));
const Career = lazy(() => import("./components/Career"));
const Feedback = lazy(() => import("./components/Feedback"));
const TermsOfService = lazy(() => import("./components/pages/TermsOfService"));
const PrivacyPolicy = lazy(() => import("./components/pages/PrivacyPolicy"));

import { SidebarProvider, SidebarTrigger } from "./backend/components/ui/sidebar";
import { CreditsProvider } from "./services/CreditsContext";

// Loading component for Suspense
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
  </div>
);

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
          <Suspense fallback={<LoadingSpinner />}>
            <SEO {...seoConfigs.login} />
            <LoginForm />
          </Suspense>
        } />
        <Route path="/signup" element={
          <Suspense fallback={<LoadingSpinner />}>
            <SEO {...seoConfigs.signup} />
            <SignUpForm />
          </Suspense>
        } />
        <Route path="/reset-password" element={
          <Suspense fallback={<LoadingSpinner />}>
            <SEO 
              title="Reset Password - Coduxa"
              description="Reset your Coduxa account password securely"
              url="/reset-password"
            />
            <ResetPasswordForm />
          </Suspense>
        } />
        <Route path="/terms" element={
          <Suspense fallback={<LoadingSpinner />}>
            <SEO 
              title="Terms of Service - Coduxa"
              description="Terms of Service for Coduxa programming certification platform"
              url="/terms"
            />
            <TermsOfService />
          </Suspense>
        } />
        <Route path="/privacy" element={
          <Suspense fallback={<LoadingSpinner />}>
            <SEO 
              title="Privacy Policy - Coduxa"
              description="Privacy Policy for Coduxa programming certification platform"
              url="/privacy"
            />
            <PrivacyPolicy />
          </Suspense>
        } />

        {/* Dashboard routes */}
        <Route
          path="/dashboard/*"
          element={
            !user ? (
              <Navigate to="/login" replace />
            ) : (
              <CreditsProvider>
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
                    
                    <Suspense fallback={<LoadingSpinner />}>
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
                        <Route path="exams" element={
                          <>
                            <SEO 
                              title="Exams - Coduxa"
                              description="Take programming exams and earn certifications"
                              url="/dashboard/exams"
                            />
                            <ExamsPage />
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
                        <Route path="faqs" element={
                          <>
                            <SEO {...seoConfigs.faqs} />
                            <FAQs />
                          </>
                        } />
                        <Route path="roadmap" element={
                          <>
                            <SEO {...seoConfigs.roadmap} />
                            <Roadmap />
                          </>
                        } />
                        <Route path="leaderboard" element={
                          <>
                            <SEO {...seoConfigs.leaderboard} />
                            <Leaderboard />
                          </>
                        } />
                        <Route path="career" element={
                          <>
                            <SEO {...seoConfigs.career} />
                            <Career />
                          </>
                        } />
                        <Route path="feedback" element={
                          <>
                            <SEO {...seoConfigs.feedback} />
                            <Feedback />
                          </>
                        } />
                      </Routes>
                    </Suspense>
                    </main>
                  </div>
                </SidebarProvider>
              </CreditsProvider>
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