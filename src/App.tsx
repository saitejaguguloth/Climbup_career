import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import HomePage from "@/pages/HomePage";
import RoadmapPage from "@/pages/RoadmapPage";
import QuizPage from "@/pages/QuizPage";
import GamesPage from "@/pages/GamesPage";
import GameDetailPage from "@/pages/GameDetailPage";
import GameLeaderboardPage from "@/pages/GameLeaderboardPage";
import GamePlayPage from "@/pages/GamePlayPage";
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
import LoginPage from "@/pages/LoginPage";
import NotFound from "@/pages/NotFound";
import Layout from "@/components/Layout";
import GameRoutes from './components/GameRoutes';

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
          <Route path="games/:gameType/:gameId" element={<GameDetailPage />} />
          <Route path="games/:gameType/:gameId/play" element={<GamePlayPage />} />
          <Route path="games/:gameType/:gameId/leaderboard" element={<GameLeaderboardPage />} />
          <Route path="challenges" element={<ChallengesPage />} />
          <Route path="challenges/:challengeType/:challengeId" element={<ChallengeDetailPage />} />
          <Route path="challenges/:challengeType/:challengeId/leaderboard" element={<ChallengeLeaderboardPage />} />
          <Route path="achievements" element={<AchievementsPage />} />
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
      <GameRoutes />
    </Router>
  );
}

export default App;
