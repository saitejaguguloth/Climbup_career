
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import RoadmapPage from "./pages/RoadmapPage";
import QuizPage from "./pages/QuizPage";
import LoginPage from "./pages/LoginPage";
import MentorsPage from "./pages/MentorsPage";
import CommunityPage from "./pages/CommunityPage";
import NotFound from "./pages/NotFound";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./components/AppSidebar";
import GamesPage from "./pages/GamesPage";
import ChallengesPage from "./pages/ChallengesPage";
import PlannerPage from "./pages/PlannerPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import CareersPage from "./pages/CareersPage";
import PortfolioPage from "./pages/PortfolioPage";
import MessagingPage from "./pages/MessagingPage";
import { ToastProvider } from "@/contexts/toast-context";

const queryClient = new QueryClient();

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated on component mount and on localStorage change
    const checkAuthStatus = () => {
      const authStatus = localStorage.getItem("isAuthenticated");
      setIsAuthenticated(authStatus === "true");
    };

    checkAuthStatus();

    // Listen for storage events to update auth status across tabs
    window.addEventListener("storage", checkAuthStatus);
    
    return () => {
      window.removeEventListener("storage", checkAuthStatus);
    };
  }, []);

  // Function to protect routes that require authentication
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ToastProvider>
          <BrowserRouter>
            <SidebarProvider defaultOpen={false} open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <div className="min-h-screen flex w-full">
                {isAuthenticated && <AppSidebar />}
                <Routes>
                  <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />} />
                  <Route 
                    path="/" 
                    element={
                      <ProtectedRoute>
                        <Layout />
                      </ProtectedRoute>
                    }
                  >
                    <Route index element={<HomePage />} />
                    <Route path="roadmap" element={<RoadmapPage />} />
                    <Route path="roadmap/:careerPath" element={<RoadmapPage />} />
                    <Route path="quiz" element={<QuizPage />} />
                    <Route path="games" element={<GamesPage />} />
                    <Route path="challenges" element={<ChallengesPage />} />
                    <Route path="mentors" element={<MentorsPage />} />
                    <Route path="planner" element={<PlannerPage />} />
                    <Route path="community" element={<CommunityPage />} />
                    <Route path="leaderboard" element={<LeaderboardPage />} />
                    <Route path="careers" element={<CareersPage />} />
                    <Route path="portfolio" element={<PortfolioPage />} />
                    <Route path="messaging" element={<MessagingPage />} />
                    <Route path="*" element={<NotFound />} />
                  </Route>
                </Routes>
              </div>
            </SidebarProvider>
            <Toaster />
            <Sonner />
          </BrowserRouter>
        </ToastProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
