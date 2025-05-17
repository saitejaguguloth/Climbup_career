import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Award, Clock, PlayCircle, ChevronRight, Star, Trophy, Users, Zap, ChevronDown, Gamepad } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { NeonTitle, NeonButton, NeonCard, NeonDivider } from '@/components/ui/neon-elements';

const GameDetailPage = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock game data based on ID
  const gameData = {
    id: gameId,
    title: gameId === '1' ? 'Diagnose & Decide' : 
           gameId === '3' ? 'Code Combat' : 
           gameId === '9' ? 'JEE Speed Quiz' : 'Game Title',
    description: "Master key concepts through hands-on coding challenges and practical examples. This game helps you develop critical thinking skills and improve your problem-solving abilities under time pressure.",
    longDescription: "This interactive game puts you in realistic scenarios where you'll need to apply your knowledge and make decisions quickly. As you progress through increasingly difficult levels, you'll gain expertise and unlock new challenges. Perfect for both beginners and advanced users looking to sharpen their skills.",
    difficulty: gameId === '9' ? 'Hard' : gameId === '3' ? 'Medium' : 'Easy',
    xpReward: 120,
    category: gameId === '1' ? 'Doctor' : gameId === '3' ? 'Developer' : gameId === '9' ? 'Engineer' : 'Career',
    timeRequired: '15 minutes',
    players: 1250,
    totalLevels: 10,
    completedLevels: 3,
    averageScore: 76,
    yourBestScore: 82,
    skills: ['Problem Solving', 'Critical Thinking', 'Time Management', 'Knowledge Application'],
    relatedGames: [
      { id: '2', title: 'Anatomy Explorer', difficulty: 'Hard' },
      { id: '4', title: 'Bug Hunter', difficulty: 'Medium' },
    ],
    color: gameId === '1' ? 'teal' : gameId === '3' ? 'orange' : 'yellow'
  };

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Back button */}
      <Button 
        variant="ghost" 
        className="mb-6 flex items-center gap-2 hover:bg-white/5" 
        onClick={() => navigate("/games")}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Games
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Game info sidebar */}
        <div className="lg:col-span-1">
          <NeonCard color={gameData.color as "yellow" | "teal" | "orange"}>
            <div>
              <div className="flex justify-between items-start mb-3">
                <span className={`px-2 py-0.5 rounded text-xs font-medium
                  ${gameData.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' : 
                  gameData.difficulty === 'Medium' ? 'bg-amber-500/20 text-amber-400' : 
                  'bg-red-500/20 text-red-400'}`}>
                  {gameData.difficulty}
                </span>
                <span className="px-2 py-0.5 rounded text-xs font-medium bg-white/10 text-white/70">
                  {gameData.category}
                </span>
              </div>

              <NeonTitle 
                color={gameData.color as "yellow" | "teal" | "orange"} 
                size="lg" 
                className="mb-2"
              >
                {gameData.title}
              </NeonTitle>
              <p className="text-white/70 text-sm mb-4">
                {gameData.description}
              </p>
            </div>
            
            <NeonDivider color={gameData.color as "yellow" | "teal" | "orange"} className="my-4" />

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Clock className={`h-4 w-4 mr-2 text-neon-${gameData.color}`} />
                  <span className="text-sm text-white/80">Time Required</span>
                </div>
                <span className="text-white">{gameData.timeRequired}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Award className={`h-4 w-4 mr-2 text-neon-${gameData.color}`} />
                  <span className="text-sm text-white/80">XP Reward</span>
                </div>
                <span className="text-white">+{gameData.xpReward} XP</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Users className={`h-4 w-4 mr-2 text-neon-${gameData.color}`} />
                  <span className="text-sm text-white/80">Total Players</span>
                </div>
                <span className="text-white">{gameData.players.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Zap className={`h-4 w-4 mr-2 text-neon-${gameData.color}`} />
                  <span className="text-sm text-white/80">Average Score</span>
                </div>
                <span className="text-white">{gameData.averageScore}%</span>
              </div>
            </div>
            
            <NeonDivider color={gameData.color as "yellow" | "teal" | "orange"} className="my-4" />
            
            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="text-sm text-white/80">Your Progress</span>
                <span className="text-sm text-white">{gameData.completedLevels}/{gameData.totalLevels} levels</span>
              </div>
              <Progress 
                value={(gameData.completedLevels / gameData.totalLevels) * 100}
                className="h-2 bg-white/10"
                indicatorClassName={`bg-neon-${gameData.color}`}
              />
            </div>
            
            <div className="pt-4 space-y-3">
              <NeonButton 
                color={gameData.color as "yellow" | "teal" | "orange"}
                className="w-full"
                onClick={() => navigate(`/games/${gameId}/play`)}
              >
                <PlayCircle className="h-4 w-4 mr-2" />
                Start Game
              </NeonButton>
              
              <Button 
                variant="outline" 
                className="w-full bg-transparent border-white/20 text-white hover:bg-white/5"
                onClick={() => navigate(`/games/${gameId}/leaderboard`)}
              >
                <Trophy className="h-4 w-4 mr-2" />
                View Leaderboard
              </Button>
            </div>
          </NeonCard>
          
          {/* Skills card */}
          <NeonCard color="teal" className="mt-6">
            <div className="flex items-center mb-4">
              <Star className="h-5 w-5 mr-2 text-neon-teal" />
              <h3 className="font-display text-lg text-neon-teal">Skills You'll Develop</h3>
            </div>
            
            <ul className="space-y-3">
              {gameData.skills.map((skill, index) => (
                <li key={index} className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-neon-teal mr-2"></div>
                  <span className="text-white/80">{skill}</span>
                </li>
              ))}
            </ul>
          </NeonCard>
          
          {/* Related games */}
          <NeonCard color="orange" className="mt-6">
            <div className="flex items-center mb-4">
              <Gamepad className="h-5 w-5 mr-2 text-neon-orange" />
              <h3 className="font-display text-lg text-neon-orange">Related Games</h3>
            </div>
            
            <div className="space-y-3">
              {gameData.relatedGames.map((game) => (
                <div 
                  key={game.id} 
                  className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 cursor-pointer"
                  onClick={() => navigate(`/games/${game.id}`)}
                >
                  <div>
                    <h4 className="text-white font-medium">{game.title}</h4>
                    <span className={`text-xs 
                      ${game.difficulty === 'Easy' ? 'text-green-400' : 
                      game.difficulty === 'Medium' ? 'text-amber-400' : 
                      'text-red-400'}`}>
                      {game.difficulty}
                    </span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-white/60" />
                </div>
              ))}
            </div>
          </NeonCard>
        </div>
        
        {/* Game content main area */}
        <div className="lg:col-span-2">
          <NeonCard color={gameData.color as "yellow" | "teal" | "orange"} className="mb-8">
            <div className="relative h-60 md:h-80 bg-black/40 rounded-lg overflow-hidden mb-6">
              <div className={`absolute inset-0 flex flex-col items-center justify-center text-neon-${gameData.color}`}>
                {/* Game visual representation */}
                <div className={`animate-glow-pulse text-neon-${gameData.color}`}>
                  {gameData.id === '1' && (
                    <svg width="160" height="160" viewBox="0 0 200 200">
                      <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="2" />
                      <path d="M100,40 C60,40 40,70 40,100 C40,140 70,160 100,160 C140,160 160,120 160,100 C160,70 140,40 100,40 Z" 
                        fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="10 5" />
                      <circle cx="80" cy="80" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
                      <circle cx="120" cy="80" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
                      <path d="M70,120 C80,130 120,130 130,120" fill="none" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  )}
                  
                  {gameData.id === '3' && (
                    <svg width="160" height="160" viewBox="0 0 200 200">
                      <rect x="40" y="40" width="120" height="120" fill="none" stroke="currentColor" strokeWidth="2" />
                      <text x="100" y="85" fontSize="12" fontFamily="monospace" textAnchor="middle" fill="currentColor">
                        {`<code>`}
                      </text>
                      <text x="100" y="105" fontSize="12" fontFamily="monospace" textAnchor="middle" fill="currentColor">
                        {`function()`}
                      </text>
                      <text x="100" y="125" fontSize="12" fontFamily="monospace" textAnchor="middle" fill="currentColor">
                        {`</code>`}
                      </text>
                      <path d="M40,60 L160,60 M60,40 L60,160 M140,40 L140,160" fill="none" stroke="currentColor" 
                        strokeWidth="1" strokeDasharray="4 4" />
                    </svg>
                  )}
                  
                  {gameData.id === '9' && (
                    <svg width="160" height="160" viewBox="0 0 200 200">
                      <polygon points="100,40 160,70 160,130 100,160 40,130 40,70" 
                        fill="none" stroke="currentColor" strokeWidth="2" />
                      <line x1="100" y1="40" x2="100" y2="160" stroke="currentColor" strokeWidth="1" />
                      <line x1="40" y1="70" x2="160" y2="130" stroke="currentColor" strokeWidth="1" />
                      <line x1="40" y1="130" x2="160" y2="70" stroke="currentColor" strokeWidth="1" />
                      <circle cx="100" cy="100" r="20" fill="none" stroke="currentColor" strokeWidth="2" />
                      <text x="100" y="105" fontSize="14" fontFamily="monospace" textAnchor="middle" fill="currentColor">
                        JEE
                      </text>
                    </svg>
                  )}
                </div>
                <NeonTitle 
                  color={gameData.color as "yellow" | "teal" | "orange"} 
                  size="lg" 
                  className="mt-4 text-shadow"
                >
                  {gameData.title}
                </NeonTitle>
                <p className="mt-2 text-white/70 max-w-md text-center px-4">
                  Click the Start Game button to begin your challenge
                </p>
              </div>
            </div>
            
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="bg-black/30 border-b border-white/10 w-full justify-start rounded-none p-0 mb-6">
                <TabsTrigger 
                  value="overview" 
                  className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-b-current rounded-none"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger 
                  value="instructions" 
                  className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-b-current rounded-none"
                >
                  How to Play
                </TabsTrigger>
                <TabsTrigger 
                  value="rewards" 
                  className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-b-current rounded-none"
                >
                  Rewards
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="mt-0">
                <div className="space-y-4">
                  <h3 className="font-display text-lg text-white">Game Overview</h3>
                  <p className="text-white/80">
                    {gameData.longDescription}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Trophy className={`h-4 w-4 mr-2 text-neon-${gameData.color}`} />
                        <h4 className="font-medium">Your Best Score</h4>
                      </div>
                      <div className="flex items-center">
                        <div className={`text-2xl font-display text-neon-${gameData.color}`}>
                          {gameData.yourBestScore}%
                        </div>
                        <div className="text-xs text-white/50 ml-2">
                          Top 25% of players
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Star className={`h-4 w-4 mr-2 text-neon-${gameData.color}`} />
                        <h4 className="font-medium">Skills Gained</h4>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {gameData.skills.slice(0, 3).map((skill, index) => (
                          <span 
                            key={index}
                            className={`text-xs px-2 py-0.5 rounded-full bg-${gameData.color === 'yellow' ? 'yellow' : gameData.color === 'teal' ? 'teal' : 'orange'}-500/20 
                            text-${gameData.color === 'yellow' ? 'yellow' : gameData.color === 'teal' ? 'teal' : 'orange'}-400`}
                          >
                            {skill}
                          </span>
                        ))}
                        {gameData.skills.length > 3 && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/60">
                            +{gameData.skills.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 mb-6 flex justify-center">
                    <NeonButton
                      color={gameData.color as "yellow" | "teal" | "orange"}
                      size="lg"
                      onClick={() => navigate(`/games/${gameId}/play`)}
                    >
                      <PlayCircle className="h-5 w-5 mr-2" />
                      Start Game
                    </NeonButton>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="instructions" className="mt-0">
                <div className="space-y-4">
                  <h3 className="font-display text-lg text-white">How to Play</h3>
                  
                  <div className="space-y-4">
                    <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <div className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center mr-2">
                          <span className="font-medium">1</span>
                        </div>
                        <h4 className="font-medium">Getting Started</h4>
                      </div>
                      <p className="text-sm text-white/70">
                        Click the "Start Game" button and wait for the game to load. You'll be presented with an 
                        introduction and basic controls explanation.
                      </p>
                    </div>
                    
                    <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <div className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center mr-2">
                          <span className="font-medium">2</span>
                        </div>
                        <h4 className="font-medium">Game Objectives</h4>
                      </div>
                      <p className="text-sm text-white/70">
                        Complete challenges within the time limit. Each level increases in difficulty and introduces 
                        new concepts. Your score is based on accuracy and completion time.
                      </p>
                    </div>
                    
                    <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <div className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center mr-2">
                          <span className="font-medium">3</span>
                        </div>
                        <h4 className="font-medium">Controls</h4>
                      </div>
                      <p className="text-sm text-white/70">
                        Use the mouse to interact with game elements. Some challenges may require keyboard input.
                        Press ESC to pause the game at any time.
                      </p>
                    </div>
                    
                    <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <div className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center mr-2">
                          <span className="font-medium">4</span>
                        </div>
                        <h4 className="font-medium">Scoring & Progression</h4>
                      </div>
                      <p className="text-sm text-white/70">
                        Your score is saved automatically. Complete all levels to earn maximum XP and unlock special 
                        badges. You can replay any level to improve your score.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="rewards" className="mt-0">
                <div className="space-y-4">
                  <h3 className="font-display text-lg text-white">Game Rewards</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className={`p-3 rounded-lg bg-${gameData.color === 'yellow' ? 'yellow' : gameData.color === 'teal' ? 'teal' : 'orange'}-500/10 mr-4`}>
                        <Award className={`h-6 w-6 text-neon-${gameData.color}`} />
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">XP Points</h4>
                        <p className="text-sm text-white/70">
                          Earn {gameData.xpReward} XP points upon completing this game. Extra XP is awarded for high scores and 
                          completing optional challenges.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className={`p-3 rounded-lg bg-${gameData.color === 'yellow' ? 'yellow' : gameData.color === 'teal' ? 'teal' : 'orange'}-500/10 mr-4`}>
                        <Trophy className={`h-6 w-6 text-neon-${gameData.color}`} />
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Achievement Badges</h4>
                        <p className="text-sm text-white/70">
                          Unlock special badges by achieving high scores or completing specific challenges within the game.
                          These badges will appear on your profile.
                        </p>
                        <div className="flex space-x-2 mt-3">
                          <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                            <Star className="h-5 w-5 text-amber-400" />
                          </div>
                          <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                            <Zap className="h-5 w-5 text-blue-400" />
                          </div>
                          <div className="w-10 h-10 rounded-full bg-black/40 border border-white/10 flex items-center justify-center">
                            <span className="text-xs text-white/40">?</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className={`p-3 rounded-lg bg-${gameData.color === 'yellow' ? 'yellow' : gameData.color === 'teal' ? 'teal' : 'orange'}-500/10 mr-4`}>
                        <Star className={`h-6 w-6 text-neon-${gameData.color}`} />
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Skill Development</h4>
                        <p className="text-sm text-white/70">
                          Each game you complete improves your skills and is reflected in your profile's skill radar chart.
                          This game enhances the following skills:
                        </p>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {gameData.skills.map((skill, index) => (
                            <span 
                              key={index}
                              className="text-xs px-2 py-1 rounded bg-white/10 text-white/80"
                            >
                              +5% {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </NeonCard>
          
          {/* Call to action */}
          <NeonCard color="teal" className="flex flex-col md:flex-row items-center justify-between p-6 gap-4">
            <div>
              <h3 className="font-display text-xl text-neon-teal mb-2">Ready to Challenge Yourself?</h3>
              <p className="text-white/70">Start the game now and track your progress on the leaderboard!</p>
            </div>
            <div className="flex gap-3">
              <NeonButton 
                color="teal"
                onClick={() => navigate(`/games/${gameId}/play`)}
              >
                <PlayCircle className="h-4 w-4 mr-2" />
                Start Game
              </NeonButton>
              <Button 
                variant="outline" 
                className="bg-transparent border-white/20 hover:bg-white/5"
                onClick={() => navigate(`/games/${gameId}/leaderboard`)}
              >
                <Trophy className="h-4 w-4 mr-2" />
                Leaderboard
              </Button>
            </div>
          </NeonCard>
        </div>
      </div>
    </div>
  );
};

export default GameDetailPage;
