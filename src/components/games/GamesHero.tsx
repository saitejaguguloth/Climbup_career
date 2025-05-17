
import React from "react";
import { Trophy, Star, Zap } from "lucide-react";
import { NeonTitle, NeonIcon, NeonDivider } from "@/components/ui/neon-elements";

const GamesHero = () => {
  return (
    <div className="relative mb-12 py-12 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] -z-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-neon-yellow/5 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-0 right-1/3 w-72 h-72 bg-neon-teal/5 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/3 right-1/4 w-60 h-60 bg-neon-orange/5 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>

        {/* Grid lines */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
      </div>

      <div className="container mx-auto text-center px-4 relative">
        <div className="flex justify-center mb-6">
          <NeonIcon color="yellow" size="lg">
            <Zap className="h-10 w-10" />
          </NeonIcon>
        </div>
        
        <NeonTitle color="yellow" size="xl" className="mb-4 uppercase tracking-wider">
          Level Up Your Skills While Having Fun!
        </NeonTitle>
        
        <p className="text-white/70 max-w-2xl mx-auto mb-8 text-lg">
          Play career-based games that help you grow from beginner to expert.
          Earn XP, unlock achievements, and track your progress on the leaderboard.
        </p>
        
        <NeonDivider color="yellow" width="1/2" className="mb-8" />
        
        <div className="flex flex-wrap justify-center gap-8 mt-6">
          <div className="flex items-center">
            <div className="bg-white/5 p-2 rounded-full border border-neon-yellow/30">
              <Trophy className="h-5 w-5 text-neon-yellow" />
            </div>
            <span className="ml-2 text-white/80">Earn XP & Badges</span>
          </div>
          
          <div className="flex items-center">
            <div className="bg-white/5 p-2 rounded-full border border-neon-teal/30">
              <Star className="h-5 w-5 text-neon-teal" />
            </div>
            <span className="ml-2 text-white/80">Track Progress</span>
          </div>
          
          <div className="flex items-center">
            <div className="bg-white/5 p-2 rounded-full border border-neon-orange/30">
              <Zap className="h-5 w-5 text-neon-orange" />
            </div>
            <span className="ml-2 text-white/80">Daily Challenges</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamesHero;
