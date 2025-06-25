import React from "react";
import { useNavigate } from "react-router-dom";
import { NeonCard, NeonButton, NeonTitle } from "@/components/ui/neon-elements";
import { BookOpen, Brain, Gamepad, FileEdit, Trophy } from "lucide-react";

const DashboardPage = () => {
  const navigate = useNavigate();
  // In a real app, get user info from context or Firebase Auth
  const user = JSON.parse(localStorage.getItem("user") || '{}');

  return (
    <div className="min-h-screen bg-black/90 flex flex-col items-center justify-center py-16">
      <NeonTitle size="2xl" color="yellow" className="mb-6 text-center">
        Welcome{user?.firstName ? `, ${user.firstName}` : " to ClimbUp"}!
      </NeonTitle>
      <p className="text-white/80 text-lg mb-10 text-center max-w-xl">
        Your personalized learning dashboard. Get started with your roadmap, play skill games, or build your portfolio!
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl mb-12">
        <NeonCard color="teal" className="flex flex-col items-center p-8">
          <BookOpen className="h-10 w-10 text-neon-teal mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Personalized Roadmap</h3>
          <p className="text-white/70 mb-4 text-center">See your step-by-step learning journey.</p>
          <NeonButton color="teal" variant="outline" onClick={() => navigate("/roadmap")}>Go to Roadmap</NeonButton>
        </NeonCard>
        <NeonCard color="yellow" className="flex flex-col items-center p-8">
          <Brain className="h-10 w-10 text-neon-yellow mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Career Quiz</h3>
          <p className="text-white/70 mb-4 text-center">Find your best-fit career path.</p>
          <NeonButton color="yellow" variant="outline" onClick={() => navigate("/quiz")}>Take Quiz</NeonButton>
        </NeonCard>
        <NeonCard color="orange" className="flex flex-col items-center p-8">
          <Gamepad className="h-10 w-10 text-neon-orange mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Skill Games</h3>
          <p className="text-white/70 mb-4 text-center">Learn by playing interactive games.</p>
          <NeonButton color="orange" variant="outline" onClick={() => navigate("/games")}>Play Games</NeonButton>
        </NeonCard>
        <NeonCard color="teal" className="flex flex-col items-center p-8">
          <FileEdit className="h-10 w-10 text-neon-teal mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Portfolio</h3>
          <p className="text-white/70 mb-4 text-center">Showcase your achievements and skills.</p>
          <NeonButton color="teal" variant="outline" onClick={() => navigate("/portfolio")}>View Portfolio</NeonButton>
        </NeonCard>
        <NeonCard color="yellow" className="flex flex-col items-center p-8">
          <Trophy className="h-10 w-10 text-neon-yellow mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Challenges</h3>
          <p className="text-white/70 mb-4 text-center">Compete in daily and skill challenges.</p>
          <NeonButton color="yellow" variant="outline" onClick={() => navigate("/challenges")}>View Challenges</NeonButton>
        </NeonCard>
      </div>
    </div>
  );
};

export default DashboardPage; 