import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Trophy, Users, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NeonTitle, NeonButton, NeonCard, NeonIcon } from "@/components/ui/neon-elements";

const ChallengeLeaderboardPage = () => {
  const { challengeId, challengeType } = useParams();
  const navigate = useNavigate();
  
  // Mock leaderboard data
  const leaderboardData = [
    { 
      id: 1, 
      name: "Alex Johnson", 
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop",
      score: 98,
      completionTime: "28m 45s",
      level: 12
    },
    { 
      id: 2, 
      name: "Maria Garcia", 
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374&auto=format&fit=crop",
      score: 95,
      completionTime: "31m 20s",
      level: 9
    },
    { 
      id: 3, 
      name: "Sam Wilson", 
      avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=1470&auto=format&fit=crop",
      score: 93,
      completionTime: "32m 15s",
      level: 11
    },
    { 
      id: 4, 
      name: "Priya Patel", 
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1374&auto=format&fit=crop",
      score: 89,
      completionTime: "35m 40s",
      level: 10
    },
    { 
      id: 5, 
      name: "Thomas Lee", 
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1374&auto=format&fit=crop",
      score: 87,
      completionTime: "36m 55s",
      level: 8
    },
    { 
      id: 6, 
      name: "Emma Clark", 
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1376&auto=format&fit=crop",
      score: 85,
      completionTime: "38m 10s",
      level: 9
    },
    { 
      id: 7, 
      name: "James Brown", 
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1374&auto=format&fit=crop",
      score: 82,
      completionTime: "40m 05s",
      level: 7
    }
  ];
  
  // Get challenge title based on type and ID
  const getChallengeTitle = () => {
    if (challengeType === "daily") {
      return challengeId === "1" ? "JavaScript: Array Methods" : 
             challengeId === "2" ? "Python: Data Analysis" : "System Design: Social Media App";
    } else if (challengeType === "weekly") {
      return challengeId === "4" ? "Full-Stack To-Do App" : "Machine Learning: Image Classification";
    } else if (challengeType === "monthly") {
      return challengeId === "6" ? "DevOps Pipeline Challenge" : "Blockchain Smart Contract";
    }
    return "Challenge";
  };

  return (
    <div className="min-h-screen py-8 px-4 relative">
      {/* Background blurry elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-neon-yellow rounded-full mix-blend-overlay filter blur-3xl opacity-5 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-neon-teal rounded-full mix-blend-overlay filter blur-3xl opacity-5 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-neon-orange rounded-full mix-blend-overlay filter blur-3xl opacity-5 animate-blob animation-delay-3000"></div>
      </div>

      <div className="container mx-auto">
        {/* Back button */}
        <NeonButton 
          variant="outline"
          color="yellow"
          className="mb-6 flex items-center gap-2" 
          onClick={() => navigate(`/challenges/${challengeType}/${challengeId}`)}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Challenge
        </NeonButton>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Leaderboard sidebar */}
          <div className="lg:col-span-1">
            <NeonCard color="yellow">
              <CardHeader>
                <div className="mb-2">
                  <Badge variant="outline" className="bg-neon-yellow/20 text-neon-yellow border-neon-yellow/50 mb-2">
                    {challengeType?.toUpperCase()}
                  </Badge>
                </div>
                <CardTitle className="text-xl text-white">{getChallengeTitle()}</CardTitle>
                <CardDescription className="text-white/70">
                  Challenge Leaderboard
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gradient-to-r from-amber-900/50 to-amber-800/50 p-4 rounded-lg border border-amber-500/50">
                  <div className="flex items-center gap-3">
                    <NeonIcon color="yellow" size="sm">
                      <Trophy className="h-4 w-4" />
                    </NeonIcon>
                    <div>
                      <h3 className="font-semibold text-white">Your Ranking</h3>
                      <p className="text-sm text-amber-300">
                        You're currently <span className="font-bold">#4</span> on the leaderboard
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-2">
                  <h3 className="font-medium mb-2 text-white">Challenge Stats</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span className="text-white/70">Participants</span>
                      <span className="font-medium text-white">432</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-white/70">Average Score</span>
                      <span className="font-medium text-white">78%</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-white/70">Average Time</span>
                      <span className="font-medium text-white">42m 15s</span>
                    </li>
                  </ul>
                </div>
                
                <div className="pt-4">
                  <NeonButton 
                    variant="outline"
                    color="teal"
                    className="w-full flex items-center gap-2"
                    onClick={() => navigate("/challenges")}
                  >
                    <Users className="h-4 w-4" />
                    All Challenges
                  </NeonButton>
                </div>
              </CardContent>
            </NeonCard>
          </div>
          
          {/* Leaderboard main area */}
          <div className="lg:col-span-3">
            <NeonCard color="teal">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl flex items-center text-white">
                    <NeonIcon color="teal" size="sm" className="mr-3">
                      <Trophy className="h-5 w-5" />
                    </NeonIcon>
                    Leaderboard
                  </CardTitle>
                  <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-400">
                    Updated 5 min ago
                  </Badge>
                </div>
                <CardDescription className="text-white/70">
                  Top performers for this challenge
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/20">
                        <th className="text-left pb-3 pl-2 text-white">Rank</th>
                        <th className="text-left pb-3 text-white">Player</th>
                        <th className="text-right pb-3 text-white">Score</th>
                        <th className="text-right pb-3 text-white">Time</th>
                        <th className="text-right pb-3 pr-2 text-white">Level</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaderboardData.map((player, index) => (
                        <tr 
                          key={player.id} 
                          className={`hover:bg-white/5 ${
                            index < 3 ? "bg-amber-500/10" : ""
                          }`}
                        >
                          <td className="py-3 pl-2">
                            {index === 0 && (
                              <div className="flex items-center justify-center w-6 h-6 bg-amber-400 text-black rounded-full">
                                1
                              </div>
                            )}
                            {index === 1 && (
                              <div className="flex items-center justify-center w-6 h-6 bg-gray-400 text-white rounded-full">
                                2
                              </div>
                            )}
                            {index === 2 && (
                              <div className="flex items-center justify-center w-6 h-6 bg-amber-700 text-white rounded-full">
                                3
                              </div>
                            )}
                            {index > 2 && (
                              <div className="flex items-center justify-center w-6 h-6 text-white/70">
                                {index + 1}
                              </div>
                            )}
                          </td>
                          <td className="py-3">
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={player.avatar} alt={player.name} />
                                <AvatarFallback>{player.name.substring(0, 2)}</AvatarFallback>
                              </Avatar>
                              <span className="font-medium text-white">{player.name}</span>
                              {index === 3 && (
                                <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-400 text-xs">
                                  You
                                </Badge>
                              )}
                            </div>
                          </td>
                          <td className="text-right py-3">
                            <div className="font-semibold text-white">{player.score}%</div>
                          </td>
                          <td className="text-right py-3 text-white">
                            {player.completionTime}
                          </td>
                          <td className="text-right py-3 pr-2">
                            <div className="flex items-center justify-end gap-1">
                              <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                              <span className="text-white">{player.level}</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </NeonCard>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <NeonCard color="yellow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white">Top Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-neon-yellow">98%</div>
                  <p className="text-sm text-white/70">Alex Johnson</p>
                </CardContent>
              </NeonCard>
              
              <NeonCard color="teal">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white">Fastest Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-neon-teal">28:45</div>
                  <p className="text-sm text-white/70">Alex Johnson</p>
                </CardContent>
              </NeonCard>
              
              <NeonCard color="orange">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white">Most Improved</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-neon-orange">+15%</div>
                  <p className="text-sm text-white/70">James Brown</p>
                </CardContent>
              </NeonCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeLeaderboardPage;
