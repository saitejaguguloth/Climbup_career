
import React from "react";
import { Award, Clock, Users, Gamepad2, Activity, User, ChevronRight, Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { NeonCard, NeonTitle, NeonDivider } from "@/components/ui/neon-elements";

const GamesSidebar = () => {
  // Mock data for sidebar
  const userStats = {
    xp: 4250,
    level: 12,
    nextLevelXp: 5000,
    streak: 7,
    position: 43,
  };
  
  const recentGames = [
    { id: '1', title: 'Diagnose & Decide', time: '3 hours ago', progress: 60 },
    { id: '3', title: 'Code Combat', time: '2 days ago', progress: 75 },
    { id: '9', title: 'JEE Speed Quiz', time: '3 days ago', progress: 50 },
  ];
  
  const suggestedSkills = [
    { name: 'Problem Solving', games: 4, improvement: 15 },
    { name: 'Decision Making', games: 3, improvement: 22 },
    { name: 'Critical Thinking', games: 5, improvement: 18 },
  ];
  
  return (
    <div className="space-y-6">
      {/* User Profile */}
      <NeonCard color="yellow">
        <div className="flex items-center mb-4">
          <div className="h-12 w-12 rounded-full bg-white/10 border border-neon-yellow/40 flex items-center justify-center text-neon-yellow font-display">
            <User className="h-6 w-6" />
          </div>
          <div className="ml-3">
            <h3 className="font-display text-lg text-neon-yellow">Player Profile</h3>
            <p className="text-xs text-white/70">User's Current Progress</p>
          </div>
        </div>
        
        <div className="space-y-4 mb-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Award className="h-4 w-4 mr-1 text-neon-yellow" />
              <span className="text-sm text-white/80">XP Points</span>
            </div>
            <span className="font-display text-neon-yellow">{userStats.xp}</span>
          </div>
          
          <div>
            <div className="flex justify-between mb-1 text-xs">
              <span className="text-white/60">Level {userStats.level}</span>
              <span className="text-white/60">Level {userStats.level + 1}</span>
            </div>
            <Progress 
              value={(userStats.xp / userStats.nextLevelXp) * 100} 
              className="h-1 bg-white/10"
            />
            <div className="flex justify-end mt-1 text-xs text-white/60">
              {userStats.nextLevelXp - userStats.xp} XP needed
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 pt-2">
            <div className="bg-white/5 rounded-md border border-white/10 p-3 text-center">
              <div className="flex items-center justify-center text-neon-teal mb-1">
                <Clock className="h-4 w-4" />
              </div>
              <div className="text-neon-teal font-display text-lg">{userStats.streak}</div>
              <div className="text-xs text-white/60">Day Streak</div>
            </div>
            
            <div className="bg-white/5 rounded-md border border-white/10 p-3 text-center">
              <div className="flex items-center justify-center text-neon-orange mb-1">
                <Users className="h-4 w-4" />
              </div>
              <div className="text-neon-orange font-display text-lg">#{userStats.position}</div>
              <div className="text-xs text-white/60">Rank</div>
            </div>
          </div>
        </div>
        
        <NeonDivider color="yellow" className="my-4" />
        
        <h4 className="font-display text-neon-yellow mb-3 flex items-center">
          <Activity className="h-4 w-4 mr-1" /> Game Activity
        </h4>
        
        <div className="space-y-3">
          {recentGames.map((game) => (
            <div key={game.id} className="flex items-center">
              <div className="h-8 w-8 rounded bg-white/5 border border-white/10 flex items-center justify-center mr-2">
                <Gamepad2 className="h-4 w-4 text-white/70" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-white/80 font-medium">{game.title}</span>
                  <span className="text-white/50">{game.time}</span>
                </div>
                <Progress 
                  value={game.progress} 
                  className="h-1 bg-white/10"
                />
              </div>
            </div>
          ))}
        </div>
      </NeonCard>
      
      {/* Skills to Improve */}
      <NeonCard color="teal">
        <h3 className="font-display text-lg text-neon-teal mb-4 flex items-center">
          <Star className="h-5 w-5 mr-2" /> Skills to Improve
        </h3>
        
        <div className="space-y-4">
          {suggestedSkills.map((skill, index) => (
            <div key={index}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-white/80">{skill.name}</span>
                <span className="text-neon-teal">+{skill.improvement}%</span>
              </div>
              <Progress 
                value={skill.improvement} 
                className="h-1 bg-white/10"
              />
              <div className="flex justify-between mt-1">
                <span className="text-xs text-white/60">{skill.games} related games</span>
                <span className="text-xs text-neon-teal flex items-center cursor-pointer hover:underline">
                  Play <ChevronRight className="h-3 w-3 ml-0.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </NeonCard>
    </div>
  );
};

export default GamesSidebar;
