import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import HomePage from "@/pages/HomePage";
import RoadmapPage from "@/pages/RoadmapPage";
import GamesPage from "@/pages/GamesPage";
import GameDetailPage from "@/pages/GameDetailPage";
import GameLeaderboardPage from "@/pages/GameLeaderboardPage";
import GamePlayPage from "@/pages/GamePlayPage";
import DailyChallengesPage from "@/pages/DailyChallengesPage";
import ChallengesPage from "@/pages/ChallengesPage";
import ChallengeDetailPage from "@/pages/ChallengeDetailPage";
import ChallengeLeaderboardPage from "@/pages/ChallengeLeaderboardPage";
import AchievementsPage from "@/pages/AchievementsPage";
import MentorsPage from "@/pages/MentorsPage";
import PlannerPage from "@/pages/PlannerPage";
import CommunityPage from "@/pages/CommunityPage";
import MessagingPage from "@/pages/MessagingPage";
import LeaderboardPage from "@/pages/LeaderboardPage";
import CareersPage from "@/pages/CareersPage";
import PortfolioPage from "@/pages/PortfolioPage";
import DashboardPage from "@/pages/DashboardPage";
import NotFound from "@/pages/NotFound";
import Layout from "@/components/Layout";
import GameRoutes from './components/GameRoutes';
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import SignInPage from "@/pages/SignInPage";
import SignUpPage from "@/pages/SignUpPage";
import QuizPage from "@/pages/QuizPage";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/signin" replace />;
  return children;
}

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<Layout sidebarVisible={false} />}>
            <Route index element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
            <Route path="roadmap" element={<ProtectedRoute><RoadmapPage /></ProtectedRoute>} />
            <Route path="roadmap/:careerPath" element={<ProtectedRoute><RoadmapPage /></ProtectedRoute>} />
            <Route path="games" element={<ProtectedRoute><GamesPage /></ProtectedRoute>} />
            <Route path="games/:gameType/:gameId" element={<ProtectedRoute><GameDetailPage /></ProtectedRoute>} />
            <Route path="games/:gameType/:gameId/play" element={<ProtectedRoute><GamePlayPage /></ProtectedRoute>} />
            <Route path="games/:gameType/:gameId/leaderboard" element={<ProtectedRoute><GameLeaderboardPage /></ProtectedRoute>} />
            <Route path="daily-challenges" element={<ProtectedRoute><DailyChallengesPage /></ProtectedRoute>} />
            <Route path="challenges" element={<ProtectedRoute><ChallengesPage /></ProtectedRoute>} />
            <Route path="challenges/:challengeType/:challengeId" element={<ProtectedRoute><ChallengeDetailPage /></ProtectedRoute>} />
            <Route path="challenges/:challengeType/:challengeId/leaderboard" element={<ProtectedRoute><ChallengeLeaderboardPage /></ProtectedRoute>} />
            <Route path="achievements" element={<ProtectedRoute><AchievementsPage /></ProtectedRoute>} />
            <Route path="mentors" element={<ProtectedRoute><MentorsPage /></ProtectedRoute>} />
            <Route path="planner" element={<ProtectedRoute><PlannerPage /></ProtectedRoute>} />
            <Route path="community" element={<ProtectedRoute><CommunityPage /></ProtectedRoute>} />
            <Route path="messaging" element={<ProtectedRoute><MessagingPage /></ProtectedRoute>} />
            <Route path="leaderboard" element={<ProtectedRoute><LeaderboardPage /></ProtectedRoute>} />
            <Route path="careers" element={<ProtectedRoute><CareersPage /></ProtectedRoute>} />
            <Route path="portfolio" element={<ProtectedRoute><PortfolioPage /></ProtectedRoute>} />
            <Route path="dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            <Route path="signin" element={<SignInPage />} />
            <Route path="signup" element={<SignUpPage />} />
            <Route path="quiz" element={<ProtectedRoute><QuizPage /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        <Toaster />
        <GameRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
