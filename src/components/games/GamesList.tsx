
import React from "react";
import { useNavigate } from "react-router-dom";
import { Award, Clock, Play, Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { NeonButton, NeonCard } from "@/components/ui/neon-elements";
import { Game } from "@/hooks/use-games-data";

interface GamesListProps {
  games: Game[];
}

const GamesList = ({ games }: GamesListProps) => {
  const navigate = useNavigate();

  if (games.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No games found matching your criteria.</p>
      </div>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400';
      case 'medium': return 'text-amber-400';
      case 'hard': return 'text-red-400';
      default: return 'text-muted-foreground';
    }
  };

  const handlePlayGame = (gameId: string) => {
    // Open game in new tab
    window.open(`/games/play/${gameId}`, '_blank');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {games.map((game) => (
        <div 
          key={game.id}
          className={`game-card game-card-${game.color} bg-black/40 backdrop-blur-sm overflow-hidden`}
        >
          <div className="h-40 bg-gradient-to-br from-black/60 to-black/10 relative overflow-hidden">
            {/* Game header graphics */}
            <div className="absolute inset-0 flex items-center justify-center opacity-60">
              {game.type === 'arcade' && (
                <div className={`text-neon-${game.color} animate-glow-pulse`}>
                  <svg width="120" height="120" viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r="30" fill="none" stroke="currentColor" strokeWidth="2" />
                    <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="10 15" />
                    <path d="M100,30 L100,50 M100,150 L100,170 M30,100 L50,100 M150,100 L170,100" 
                      stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
              )}
              
              {game.type === 'quiz' && (
                <div className={`text-neon-${game.color} animate-glow-pulse`}>
                  <svg width="120" height="120" viewBox="0 0 200 200">
                    <path d="M100,40 L160,100 L100,160 L40,100 Z" fill="none" stroke="currentColor" strokeWidth="2" />
                    <circle cx="100" cy="100" r="20" fill="none" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
              )}
              
              {game.type === 'simulation' && (
                <div className={`text-neon-${game.color} animate-glow-pulse`}>
                  <svg width="120" height="120" viewBox="0 0 200 200">
                    <rect x="50" y="50" width="100" height="100" fill="none" stroke="currentColor" strokeWidth="2" />
                    <path d="M50,50 L150,150 M50,150 L150,50" stroke="currentColor" strokeWidth="2" strokeDasharray="5 5" />
                    <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
              )}
              
              {game.type === 'puzzle' && (
                <div className={`text-neon-${game.color} animate-glow-pulse`}>
                  <svg width="120" height="120" viewBox="0 0 200 200">
                    <path d="M70,70 L130,70 L130,130 L70,130 Z" fill="none" stroke="currentColor" strokeWidth="2" />
                    <path d="M50,50 L80,50 L80,80 L50,80 Z M120,50 L150,50 L150,80 L120,80 Z 
                            M50,120 L80,120 L80,150 L50,150 Z M120,120 L150,120 L150,150 L120,150 Z" 
                          fill="none" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
              )}
            </div>
            
            {/* Difficulty badge */}
            <div className="absolute top-3 left-3">
              <span className={`font-display uppercase text-xs px-2 py-1 rounded bg-black/50 border 
                border-${game.color === 'yellow' ? 'yellow' : game.color === 'teal' ? 'teal' : 'orange'}-500/50
                ${getDifficultyColor(game.difficulty)}`}>
                {game.difficulty}
              </span>
            </div>
            
            {/* XP reward badge */}
            <div className="absolute top-3 right-3 flex items-center space-x-1 px-2 py-1 rounded bg-black/50 border border-white/10">
              <Award className="h-3 w-3 text-amber-400" />
              <span className="text-xs font-medium text-amber-400">+{game.xpReward} XP</span>
            </div>
            
            {/* Play button */}
            <div className="absolute bottom-3 right-3">
              <NeonButton
                color={game.color as "yellow" | "teal" | "orange"}
                size="sm"
                onClick={() => handlePlayGame(game.id)}
                className="group"
              >
                <Play className="h-4 w-4 mr-1" /> Play
              </NeonButton>
            </div>
            
            {/* Time required */}
            <div className="absolute bottom-3 left-3 flex items-center space-x-1 px-2 py-1 rounded bg-black/50">
              <Clock className={`h-3 w-3 text-neon-${game.color}`} />
              <span className="text-xs font-medium text-white/80">{game.timeRequired}</span>
            </div>
          </div>
          
          {/* Game info */}
          <div className="p-4 text-left">
            <h3 className={`text-neon-${game.color} font-display text-lg font-bold mb-1 tracking-wider`}>
              {game.title}
            </h3>
            <p className="text-sm text-white/80 mb-3 line-clamp-2 h-10">
              {game.description}
            </p>
            
            {/* Skills */}
            <div className="flex flex-wrap gap-1 mb-3">
              {game.skills.slice(0, 2).map((skill, index) => (
                <span 
                  key={index} 
                  className={`text-xs px-2 py-0.5 rounded-full bg-${game.color === 'yellow' ? 'yellow' : game.color === 'teal' ? 'teal' : 'orange'}-500/20 
                  border border-${game.color === 'yellow' ? 'yellow' : game.color === 'teal' ? 'teal' : 'orange'}-500/40
                  text-${game.color === 'yellow' ? 'yellow' : game.color === 'teal' ? 'teal' : 'orange'}-400`}
                >
                  {skill}
                </span>
              ))}
              {game.skills.length > 2 && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-gray-700/30 text-gray-400 border border-gray-700">
                  +{game.skills.length - 2} more
                </span>
              )}
            </div>
            
            {/* Progress bar */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-white/60">Progress</span>
                <div className="flex items-center">
                  <Star className="h-3 w-3 mr-1 text-amber-400 fill-amber-400" />
                  <span className="font-medium text-amber-400">{game.progress}%</span>
                </div>
              </div>
              <Progress 
                value={game.progress} 
                className="h-1 bg-white/10"
              />
              <div className="flex justify-end mt-1">
                <span className="text-xs text-white/60">{game.completions.toLocaleString()} plays</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GamesList;
