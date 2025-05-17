
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Users, Trophy, Star, Clock, Gamepad } from "lucide-react";

const GamePlayPage = () => {
  const { gameType, gameId } = useParams();
  const navigate = useNavigate();
  const [level, setLevel] = useState("beginner");
  const [inviteFriends, setInviteFriends] = useState(false);
  
  // Mock data
  const gameLevels = {
    beginner: {
      title: "Level 1: Fundamentals",
      challenges: [
        { id: 1, title: "Introduction to Basic Concepts", completed: false, progress: 0 },
        { id: 2, title: "Simple Problem Solving", completed: false, progress: 0 },
        { id: 3, title: "Core Principles", completed: false, progress: 0 },
      ]
    },
    intermediate: {
      title: "Level 2: Advanced Concepts",
      challenges: [
        { id: 4, title: "Complex Problem Solving", completed: false, progress: 0 },
        { id: 5, title: "Real-world Applications", completed: false, progress: 0 },
        { id: 6, title: "Collaborative Challenges", completed: false, progress: 0 },
      ]
    },
    advanced: {
      title: "Level 3: Expert Mastery",
      challenges: [
        { id: 7, title: "Advanced Implementation", completed: false, progress: 0 },
        { id: 8, title: "System Design", completed: false, progress: 0 },
        { id: 9, title: "Final Assessment", completed: false, progress: 0 },
      ]
    }
  };
  
  const friends = [
    { id: 1, name: "Alex Johnson", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop", status: "Online" },
    { id: 2, name: "Maria Garcia", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374&auto=format&fit=crop", status: "Away" },
    { id: 3, name: "Sam Wilson", avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=1470&auto=format&fit=crop", status: "Online" },
  ];
  
  // Get game title based on type and ID
  const getGameTitle = () => {
    if (gameType === "flashcards") {
      return gameId === "1" ? "DSA Fundamentals" : 
             gameId === "2" ? "OS Concepts" : "DBMS Essentials";
    } else if (gameType === "simulations") {
      return gameId === "1" ? "Data Scientist Career Path" : "Software Engineer Journey";
    } else if (gameType === "careerPathBuilder") {
      return "Build Your Dream Career";
    } else if (gameType === "skillGames") {
      return gameId === "1" ? "Speed Coding Race" : 
             gameId === "2" ? "Debug Master" : "Logic Puzzles";
    }
    return "Game";
  };

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Back button */}
      <Button 
        variant="ghost" 
        className="mb-6 flex items-center gap-2" 
        onClick={() => navigate("/games")}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Games
      </Button>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Game info sidebar */}
        <div className="lg:col-span-1">
          <Card className="bg-white/80 backdrop-blur shadow-lg">
            <CardHeader>
              <div className="mb-2">
                <Badge variant="outline" className="bg-blue-100 text-blue-800 mb-2">
                  {gameType?.charAt(0).toUpperCase() + gameType?.slice(1)}
                </Badge>
              </div>
              <CardTitle className="text-2xl">{getGameTitle()}</CardTitle>
              <CardDescription>
                Master key concepts through interactive challenges and gameplay
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Overall Progress</span>
                  <span className="font-medium">25%</span>
                </div>
                <Progress value={25} className="h-2" />
              </div>
              
              <div className="pt-4">
                <h3 className="font-medium mb-2">Game Overview</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span className="text-gray-600">Difficulty</span>
                    <span className="font-medium">Intermediate</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Estimated Time</span>
                    <span className="font-medium">3-4 hours</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Mode</span>
                    <span className="font-medium">Single/Multiplayer</span>
                  </li>
                </ul>
              </div>
              
              <div className="flex flex-col gap-3 pt-4">
                <Button 
                  variant="outline"
                  className="w-full flex items-center gap-2"
                  onClick={() => setInviteFriends(!inviteFriends)}
                >
                  <Users className="h-4 w-4" />
                  Invite Friends
                </Button>
                <Button 
                  variant="outline"
                  className="w-full flex items-center gap-2"
                  onClick={() => navigate(`/games/${gameType}/${gameId}/leaderboard`)}
                >
                  <Trophy className="h-4 w-4" />
                  View Leaderboard
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {inviteFriends && (
            <Card className="mt-4 bg-white/80 backdrop-blur shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Invite Friends</CardTitle>
                <CardDescription>Play together and learn faster</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {friends.map(friend => (
                  <div key={friend.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={friend.avatar} alt={friend.name} />
                        <AvatarFallback>{friend.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{friend.name}</p>
                        <p className="text-xs text-gray-500">{friend.status}</p>
                      </div>
                    </div>
                    <Button size="sm">Invite</Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
        
        {/* Game content main area */}
        <div className="lg:col-span-2">
          <Card className="bg-white/80 backdrop-blur shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Let's Play!</CardTitle>
              <CardDescription>
                Choose your level and start learning
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={level} onValueChange={setLevel} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="beginner">Beginner</TabsTrigger>
                  <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
                  <TabsTrigger value="advanced">Advanced</TabsTrigger>
                </TabsList>
                
                {Object.entries(gameLevels).map(([levelKey, levelData]) => (
                  <TabsContent key={levelKey} value={levelKey} className="mt-4 space-y-4">
                    <h3 className="text-xl font-semibold">{levelData.title}</h3>
                    <div className="space-y-3">
                      {levelData.challenges.map(challenge => (
                        <Card key={challenge.id} className="bg-white">
                          <div className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="bg-blue-100 p-2 rounded-full">
                                <Gamepad className="h-5 w-5 text-blue-600" />
                              </div>
                              <div>
                                <h4 className="font-medium">{challenge.title}</h4>
                                {challenge.progress > 0 && (
                                  <div className="w-24 mt-1">
                                    <Progress value={challenge.progress} className="h-1" />
                                  </div>
                                )}
                              </div>
                            </div>
                            <Button>
                              {challenge.progress > 0 ? 'Continue' : 'Start'}
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-amber-500" />
                  Your Rewards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
                  <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
                  <Star className="h-5 w-5 text-gray-300" />
                  <Star className="h-5 w-5 text-gray-300" />
                  <Star className="h-5 w-5 text-gray-300" />
                </div>
                <p className="text-sm mt-2">Complete more challenges to earn stars!</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="h-5 w-5 text-purple-500" />
                  Learning Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">0h 35m</p>
                <p className="text-sm text-gray-600">Keep going to improve!</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePlayPage;
