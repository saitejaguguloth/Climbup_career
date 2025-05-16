
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import HomePage from "@/pages/HomePage";
import RoadmapPage from "@/pages/RoadmapPage";
import QuizPage from "@/pages/QuizPage";
import GamesPage from "@/pages/GamesPage";
import GameDetailPage from "@/pages/GameDetailPage";
import GameLeaderboardPage from "@/pages/GameLeaderboardPage";
import ChallengesPage from "@/pages/ChallengesPage";
import MentorsPage from "@/pages/MentorsPage";
import PlannerPage from "@/pages/PlannerPage";
import CommunityPage from "@/pages/CommunityPage";
import MessagingPage from "@/pages/MessagingPage";
import LeaderboardPage from "@/pages/LeaderboardPage";
import CareersPage from "@/pages/CareersPage";
import PortfolioPage from "@/pages/PortfolioPage";
import LoginPage from "@/pages/LoginPage";
import NotFound from "@/pages/NotFound";
import Layout from "@/components/Layout";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Layout sidebarVisible={false} />}>
          <Route index element={<HomePage />} />
          <Route path="roadmap" element={<RoadmapPage />} />
          <Route path="roadmap/:careerPath" element={<RoadmapPage />} />
          <Route path="quiz" element={<QuizPage />} />
          <Route path="games" element={<GamesPage />} />
          <Route path="games/:gameId" element={<GameDetailPage />} />
          <Route path="games/:gameId/leaderboard" element={<GameLeaderboardPage />} />
          <Route path="challenges" element={<ChallengesPage />} />
          <Route path="mentors" element={<MentorsPage />} />
          <Route path="planner" element={<PlannerPage />} />
          <Route path="community" element={<CommunityPage />} />
          <Route path="messaging" element={<MessagingPage />} />
          <Route path="leaderboard" element={<LeaderboardPage />} />
          <Route path="careers" element={<CareersPage />} />
          <Route path="portfolio" element={<PortfolioPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
