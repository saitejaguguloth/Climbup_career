
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Trophy, Users, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
    <div className="container mx-auto py-8 px-4">
      {/* Back button */}
      <Button 
        variant="ghost" 
        className="mb-6 flex items-center gap-2" 
        onClick={() => navigate(`/challenges/${challengeType}/${challengeId}`)}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Challenge
      </Button>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Leaderboard sidebar */}
        <div className="lg:col-span-1">
          <Card className="bg-white/80 backdrop-blur shadow-lg">
            <CardHeader>
              <div className="mb-2">
                <Badge variant="outline" className="bg-indigo-100 text-indigo-800 mb-2">
                  {challengeType?.toUpperCase()}
                </Badge>
              </div>
              <CardTitle className="text-xl">{getChallengeTitle()}</CardTitle>
              <CardDescription>
                Challenge Leaderboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-4 rounded-lg border border-amber-200">
                <div className="flex items-center gap-3">
                  <div className="bg-amber-200 p-2 rounded-full">
                    <Trophy className="h-4 w-4 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Your Ranking</h3>
                    <p className="text-sm text-amber-800">
                      You're currently <span className="font-bold">#4</span> on the leaderboard
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="pt-2">
                <h3 className="font-medium mb-2">Challenge Stats</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span className="text-gray-600">Participants</span>
                    <span className="font-medium">432</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Average Score</span>
                    <span className="font-medium">78%</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Average Time</span>
                    <span className="font-medium">42m 15s</span>
                  </li>
                </ul>
              </div>
              
              <div className="pt-4">
                <Button 
                  variant="outline"
                  className="w-full flex items-center gap-2"
                  onClick={() => navigate("/challenges")}
                >
                  <Users className="h-4 w-4" />
                  All Challenges
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Leaderboard main area */}
        <div className="lg:col-span-3">
          <Card className="bg-white/80 backdrop-blur shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-amber-500" />
                  Leaderboard
                </CardTitle>
                <Badge variant="outline" className="bg-blue-100 text-blue-800">
                  Updated 5 min ago
                </Badge>
              </div>
              <CardDescription>
                Top performers for this challenge
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left pb-3 pl-2">Rank</th>
                      <th className="text-left pb-3">Player</th>
                      <th className="text-right pb-3">Score</th>
                      <th className="text-right pb-3">Time</th>
                      <th className="text-right pb-3 pr-2">Level</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboardData.map((player, index) => (
                      <tr 
                        key={player.id} 
                        className={`hover:bg-gray-50 ${
                          index < 3 ? "bg-amber-50" : ""
                        }`}
                      >
                        <td className="py-3 pl-2">
                          {index === 0 && (
                            <div className="flex items-center justify-center w-6 h-6 bg-amber-400 text-white rounded-full">
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
                            <div className="flex items-center justify-center w-6 h-6 text-gray-600">
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
                            <span className="font-medium">{player.name}</span>
                            {index === 3 && (
                              <Badge variant="outline" className="bg-blue-100 text-blue-800 text-xs">
                                You
                              </Badge>
                            )}
                          </div>
                        </td>
                        <td className="text-right py-3">
                          <div className="font-semibold">{player.score}%</div>
                        </td>
                        <td className="text-right py-3">
                          {player.completionTime}
                        </td>
                        <td className="text-right py-3 pr-2">
                          <div className="flex items-center justify-end gap-1">
                            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                            <span>{player.level}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Top Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">98%</div>
                <p className="text-sm text-gray-600">Alex Johnson</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Fastest Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">28:45</div>
                <p className="text-sm text-gray-600">Alex Johnson</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Most Improved</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">+15%</div>
                <p className="text-sm text-gray-600">James Brown</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeLeaderboardPage;
