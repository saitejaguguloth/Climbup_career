
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, Trophy, Star, Fire, Medal, TrendingUp, Users, Clock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">Leaderboard</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Compete with peers, track your progress, and climb to the top!
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6 mb-10">
          <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex-1">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Trophy className="mr-2 h-5 w-5" />
                Your Ranking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="mr-4">
                  <Avatar className="h-16 w-16 border-2 border-white">
                    <AvatarImage src={currentUser.avatar} />
                    <AvatarFallback>YOU</AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <div className="text-4xl font-bold">#{currentUser.rank}</div>
                  <div className="text-lg opacity-90">{currentUser.name}</div>
                  <div className="text-sm opacity-80">{currentUser.score} points</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur flex-1">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Fire className="mr-2 h-5 w-5 text-orange-500" />
                Your Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{currentUser.streak} days</div>
              <div className="text-sm text-gray-500 mt-1">Keep learning daily to increase your streak!</div>
              <div className="mt-2">
                <Button size="sm" className="bg-gradient-to-r from-orange-500 to-red-500">
                  <Fire className="mr-2 h-4 w-4" /> Continue Streak
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur flex-1">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Medal className="mr-2 h-5 w-5 text-yellow-500" />
                Next Achievement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="mr-4 bg-yellow-100 p-3 rounded-full">
                  <TrendingUp className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <div className="font-semibold">Rising Star</div>
                  <div className="text-sm text-gray-500">Improve your rank by 10 positions</div>
                  <div className="mt-1 text-xs text-gray-400">75% complete</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-white/90 backdrop-blur shadow-lg rounded-xl p-6 mb-10">
          <div className="flex justify-between items-center flex-wrap gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold flex items-center">
                <Trophy className="mr-2 h-6 w-6 text-yellow-500" /> Top Performers
              </h2>
            </div>
            
            <div className="flex gap-4">
              <Tabs 
                value={timeframe} 
                onValueChange={(value) => setTimeframe(value as "weekly" | "monthly" | "allTime")}
                className="w-[400px]"
              >
                <TabsList className="grid grid-cols-3">
                  <TabsTrigger value="weekly" className="flex items-center">
                    <Clock className="mr-1 h-4 w-4" /> Weekly
                  </TabsTrigger>
                  <TabsTrigger value="monthly" className="flex items-center">
                    <Calendar className="mr-1 h-4 w-4" /> Monthly
                  </TabsTrigger>
                  <TabsTrigger value="allTime" className="flex items-center">
                    <Star className="mr-1 h-4 w-4" /> All Time
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-6">
            {topThree.map((user, index) => (
              <Card 
                key={user.rank} 
                className={`flex-1 border-t-4 ${
                  index === 0 
                    ? "border-t-yellow-400" 
                    : index === 1 
                      ? "border-t-gray-400" 
                      : "border-t-amber-700"
                }`}
              >
                <CardHeader className="pb-2 text-center">
                  <div className="flex justify-center mb-2">
                    <div className={`rounded-full p-2 ${
                      index === 0 
                        ? "bg-yellow-100" 
                        : index === 1 
                          ? "bg-gray-100" 
                          : "bg-amber-100"
                    }`}>
                      <Trophy className={`h-6 w-6 ${
                        index === 0 
                          ? "text-yellow-600" 
                          : index === 1 
                            ? "text-gray-600" 
                            : "text-amber-700"
                      }`} />
                    </div>
                  </div>
                  <CardTitle className="text-lg">Rank #{user.rank}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <Avatar className="h-20 w-20 mx-auto mb-2 border-2 border-gray-200">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="font-bold text-xl">{user.name}</div>
                  <div className="text-gray-500 text-sm">{user.college}</div>
                  <div className="mt-2 text-lg font-semibold">{user.score} points</div>
                  <div className="mt-1 flex items-center justify-center text-sm">
                    <Fire className="mr-1 h-4 w-4 text-orange-500" />
                    <span>{user.streak} day streak</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-8">
            <div className="rounded-lg overflow-hidden bg-white">
              {remainingUsers.map((user, index) => (
                <div 
                  key={user.rank}
                  className={`flex items-center p-4 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                >
                  <div className="w-12 text-center font-bold text-lg">#{user.rank}</div>
                  <Avatar className="h-10 w-10 ml-2">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 flex-grow">
                    <div className="font-semibold">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.college}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-semibold">{user.score}</div>
                      <div className="text-xs text-gray-500">points</div>
                    </div>
                    <Badge variant="outline" className="flex items-center whitespace-nowrap">
                      <Fire className="mr-1 h-3 w-3 text-orange-500" />
                      {user.streak} days
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <Button variant="outline">View Full Leaderboard</Button>
          </div>
        </div>
        
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Join Campus Competitions</h3>
              <p className="opacity-90">
                Compete with students from your college and earn special badges and rewards.
              </p>
            </div>
            <Button variant="secondary" className="whitespace-nowrap">
              <Users className="mr-2 h-4 w-4" />
              Find Campus Events
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LeaderboardPage;
