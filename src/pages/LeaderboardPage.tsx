import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, Trophy, Star, Medal, TrendingUp, Users, Clock, Flame, Calendar } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NeonTitle, NeonButton, NeonCard, NeonIcon } from "@/components/ui/neon-elements";

const LeaderboardPage = () => {
  const [timeframe, setTimeframe] = useState<"weekly" | "monthly" | "allTime">("weekly");
  const [category, setCategory] = useState<"overall" | "coding" | "quizzes" | "projects">("overall");

  // Sample leaderboard data
  const leaderboardData = {
    weekly: {
      overall: [
        { rank: 1, name: "Priya Sharma", score: 2450, avatar: "https://i.pravatar.cc/150?img=32", college: "IIT Delhi", streak: 28 },
        { rank: 2, name: "Rajiv Kumar", score: 2340, avatar: "https://i.pravatar.cc/150?img=61", college: "BITS Pilani", streak: 24 },
        { rank: 3, name: "Ananya Patel", score: 2180, avatar: "https://i.pravatar.cc/150?img=57", college: "VIT Vellore", streak: 21 },
        { rank: 4, name: "Aditya Singh", score: 1950, avatar: "https://i.pravatar.cc/150?img=53", college: "IIIT Hyderabad", streak: 19 },
        { rank: 5, name: "Neha Reddy", score: 1890, avatar: "https://i.pravatar.cc/150?img=23", college: "NIT Warangal", streak: 17 },
        { rank: 6, name: "Vikram Verma", score: 1780, avatar: "https://i.pravatar.cc/150?img=60", college: "Manipal Institute of Technology", streak: 15 },
        { rank: 7, name: "Meera Joshi", score: 1650, avatar: "https://i.pravatar.cc/150?img=5", college: "Delhi University", streak: 14 },
        { rank: 8, name: "Karan Malhotra", score: 1520, avatar: "https://i.pravatar.cc/150?img=65", college: "SRM University", streak: 12 },
        { rank: 9, name: "Divya Gupta", score: 1490, avatar: "https://i.pravatar.cc/150?img=25", college: "Amity University", streak: 11 },
        { rank: 10, name: "Arjun Nair", score: 1450, avatar: "https://i.pravatar.cc/150?img=68", college: "Anna University", streak: 10 }
      ]
    },
    monthly: {
      overall: [
        { rank: 1, name: "Ananya Patel", score: 8720, avatar: "https://i.pravatar.cc/150?img=57", college: "VIT Vellore", streak: 45 },
        { rank: 2, name: "Priya Sharma", score: 7890, avatar: "https://i.pravatar.cc/150?img=32", college: "IIT Delhi", streak: 42 },
        { rank: 3, name: "Vikram Verma", score: 7640, avatar: "https://i.pravatar.cc/150?img=60", college: "Manipal Institute of Technology", streak: 38 },
        { rank: 4, name: "Rajiv Kumar", score: 6950, avatar: "https://i.pravatar.cc/150?img=61", college: "BITS Pilani", streak: 36 },
        { rank: 5, name: "Neha Reddy", score: 6780, avatar: "https://i.pravatar.cc/150?img=23", college: "NIT Warangal", streak: 32 },
        { rank: 6, name: "Aditya Singh", score: 6540, avatar: "https://i.pravatar.cc/150?img=53", college: "IIIT Hyderabad", streak: 30 },
        { rank: 7, name: "Divya Gupta", score: 6320, avatar: "https://i.pravatar.cc/150?img=25", college: "Amity University", streak: 29 },
        { rank: 8, name: "Karan Malhotra", score: 6180, avatar: "https://i.pravatar.cc/150?img=65", college: "SRM University", streak: 27 },
        { rank: 9, name: "Meera Joshi", score: 5940, avatar: "https://i.pravatar.cc/150?img=5", college: "Delhi University", streak: 25 },
        { rank: 10, name: "Arjun Nair", score: 5720, avatar: "https://i.pravatar.cc/150?img=68", college: "Anna University", streak: 23 }
      ]
    },
    allTime: {
      overall: [
        { rank: 1, name: "Vikram Verma", score: 34560, avatar: "https://i.pravatar.cc/150?img=60", college: "Manipal Institute of Technology", streak: 120 },
        { rank: 2, name: "Priya Sharma", score: 31240, avatar: "https://i.pravatar.cc/150?img=32", college: "IIT Delhi", streak: 115 },
        { rank: 3, name: "Ananya Patel", score: 29870, avatar: "https://i.pravatar.cc/150?img=57", college: "VIT Vellore", streak: 108 },
        { rank: 4, name: "Rajiv Kumar", score: 28450, avatar: "https://i.pravatar.cc/150?img=61", college: "BITS Pilani", streak: 102 },
        { rank: 5, name: "Neha Reddy", score: 26780, avatar: "https://i.pravatar.cc/150?img=23", college: "NIT Warangal", streak: 95 },
        { rank: 6, name: "Aditya Singh", score: 24360, avatar: "https://i.pravatar.cc/150?img=53", college: "IIIT Hyderabad", streak: 90 },
        { rank: 7, name: "Divya Gupta", score: 22180, avatar: "https://i.pravatar.cc/150?img=25", college: "Amity University", streak: 87 },
        { rank: 8, name: "Karan Malhotra", score: 21950, avatar: "https://i.pravatar.cc/150?img=65", college: "SRM University", streak: 84 },
        { rank: 9, name: "Meera Joshi", score: 20740, avatar: "https://i.pravatar.cc/150?img=5", college: "Delhi University", streak: 79 },
        { rank: 10, name: "Arjun Nair", score: 19520, avatar: "https://i.pravatar.cc/150?img=68", college: "Anna University", streak: 75 }
      ]
    }
  };

  // Get current user stats (mock data)
  const currentUser = {
    rank: 42,
    name: "You",
    score: 870,
    avatar: "https://i.pravatar.cc/150?img=12",
    college: "Your College",
    streak: 8
  };

  // Get top 3 users
  const topThree = leaderboardData[timeframe][category].slice(0, 3);
  
  // Get remaining users
  const remainingUsers = leaderboardData[timeframe][category].slice(3);

  return (
    <div className="min-h-screen py-16 px-4 relative">
      {/* Background blurry elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 left-0 w-72 h-72 bg-neon-yellow rounded-full mix-blend-overlay filter blur-3xl opacity-5 animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-neon-teal rounded-full mix-blend-overlay filter blur-3xl opacity-5 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-neon-orange rounded-full mix-blend-overlay filter blur-3xl opacity-5 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-10">
          <NeonTitle size="2xl" color="yellow" className="mb-4">
            <span className="text-neon-teal">Leaderboard</span>
          </NeonTitle>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Compete with peers, track your progress, and climb to the top!
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6 mb-10">
          <NeonCard color="yellow" className="flex-1">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg text-white">
                <NeonIcon color="yellow" size="sm" className="mr-2">
                  <Trophy className="h-5 w-5" />
                </NeonIcon>
                Your Ranking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="mr-4">
                  <Avatar className="h-16 w-16 border-2 border-neon-yellow">
                    <AvatarImage src={currentUser.avatar} />
                    <AvatarFallback>YOU</AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <div className="text-4xl font-bold text-neon-yellow">#{currentUser.rank}</div>
                  <div className="text-lg text-white">{currentUser.name}</div>
                  <div className="text-sm text-white/70">{currentUser.score} points</div>
                </div>
              </div>
            </CardContent>
          </NeonCard>

          <NeonCard color="orange" className="flex-1">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg text-white">
                <NeonIcon color="orange" size="sm" className="mr-2">
                  <Flame className="h-5 w-5" />
                </NeonIcon>
                Your Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-neon-orange">{currentUser.streak} days</div>
              <div className="text-sm text-white/70 mt-1">Keep learning daily to increase your streak!</div>
              <div className="mt-2">
                <NeonButton size="sm" color="orange">
                  <Flame className="mr-2 h-4 w-4" /> Continue Streak
                </NeonButton>
              </div>
            </CardContent>
          </NeonCard>

          <NeonCard color="teal" className="flex-1">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg text-white">
                <NeonIcon color="teal" size="sm" className="mr-2">
                  <Medal className="h-5 w-5" />
                </NeonIcon>
                Next Achievement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <NeonIcon color="teal" size="md" className="mr-4">
                  <TrendingUp className="h-6 w-6" />
                </NeonIcon>
                <div>
                  <div className="font-semibold text-white">Rising Star</div>
                  <div className="text-sm text-white/70">Improve your rank by 10 positions</div>
                  <div className="mt-1 text-xs text-white/60">75% complete</div>
                </div>
              </div>
            </CardContent>
          </NeonCard>
        </div>
        
        <NeonCard color="teal" className="mb-10">
          <div className="flex justify-between items-center flex-wrap gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold flex items-center text-white">
                <NeonIcon color="teal" size="sm" className="mr-2">
                  <Trophy className="h-6 w-6" />
                </NeonIcon>
                Top Performers
              </h2>
            </div>
            
            <div className="flex gap-4">
              <Tabs 
                value={timeframe} 
                onValueChange={(value) => setTimeframe(value as typeof timeframe)}
              >
                <TabsList className="bg-black/20">
                  <TabsTrigger value="weekly" className="text-white data-[state=active]:bg-neon-teal/20 data-[state=active]:text-neon-teal">
                    <Calendar className="w-4 h-4 mr-1" /> Weekly
                  </TabsTrigger>
                  <TabsTrigger value="monthly" className="text-white data-[state=active]:bg-neon-teal/20 data-[state=active]:text-neon-teal">
                    <Calendar className="w-4 h-4 mr-1" /> Monthly
                  </TabsTrigger>
                  <TabsTrigger value="allTime" className="text-white data-[state=active]:bg-neon-teal/20 data-[state=active]:text-neon-teal">
                    <Star className="w-4 h-4 mr-1" /> All Time
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
          
          {/* Top 3 Users */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {topThree.map((user, index) => (
              <div key={user.rank} className={`text-center ${
                index === 0 ? 'order-2 md:order-1' : 
                index === 1 ? 'order-1 md:order-2' : 
                'order-3'
              }`}>
                <div className={`relative mb-4 ${
                  index === 0 ? 'transform md:scale-110' : ''
                }`}>
                  <Avatar className={`mx-auto ${
                    index === 0 ? 'h-24 w-24 border-4 border-amber-400' : 
                    index === 1 ? 'h-20 w-20 border-4 border-gray-400' : 
                    'h-20 w-20 border-4 border-amber-700'
                  }`}>
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    index === 0 ? 'bg-amber-400 text-black' : 
                    index === 1 ? 'bg-gray-400 text-white' : 
                    'bg-amber-700 text-white'
                  }`}>
                    {user.rank}
                  </div>
                </div>
                <h3 className="font-semibold text-white">{user.name}</h3>
                <p className="text-sm text-white/70">{user.college}</p>
                <div className="mt-2">
                  <div className="text-2xl font-bold text-neon-yellow">{user.score.toLocaleString()}</div>
                  <div className="text-sm text-white/60">points</div>
                </div>
                <div className="flex items-center justify-center mt-2">
                  <Flame className="w-4 h-4 text-orange-400 mr-1" />
                  <span className="text-sm text-orange-400">{user.streak} day streak</span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Remaining Users Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-3 text-white">Rank</th>
                  <th className="text-left py-3 text-white">Student</th>
                  <th className="text-right py-3 text-white">Score</th>
                  <th className="text-right py-3 text-white">Streak</th>
                </tr>
              </thead>
              <tbody>
                {remainingUsers.map((user) => (
                  <tr key={user.rank} className="hover:bg-white/5 border-b border-white/10">
                    <td className="py-3">
                      <span className="font-medium text-white">#{user.rank}</span>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-white">{user.name}</div>
                          <div className="text-sm text-white/60">{user.college}</div>
                        </div>
                      </div>
                    </td>
                    <td className="text-right py-3">
                      <span className="font-semibold text-white">{user.score.toLocaleString()}</span>
                    </td>
                    <td className="text-right py-3">
                      <div className="flex items-center justify-end">
                        <Flame className="w-4 h-4 text-orange-400 mr-1" />
                        <span className="text-orange-400">{user.streak}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </NeonCard>
      </div>
    </div>
  );
};

export default LeaderboardPage;
