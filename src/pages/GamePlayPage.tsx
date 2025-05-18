
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Users, Trophy, Star, Clock, Gamepad, Play, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const GamePlayPage = () => {
  const { gameType, gameId } = useParams();
  const navigate = useNavigate();
  const [level, setLevel] = useState("beginner");
  const [inviteFriends, setInviteFriends] = useState(false);
  const [activeChallenge, setActiveChallenge] = useState<number | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    // Reset game state when game type or id changes
    setGameStarted(false);
    setActiveChallenge(null);
    setProgress(0);
  }, [gameType, gameId]);
  
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
  
  const handleStartGame = (challengeId) => {
    setActiveChallenge(challengeId);
    setGameStarted(true);
    toast({
      title: "Game Started!",
      description: "Let's level up your skills!",
      duration: 3000,
    });
    
    // Simulate progress increase
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 800);
  };
  
  const renderGameContent = () => {
    if (!gameStarted) {
      return (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600 mb-6">Select a challenge to start playing</p>
        </div>
      );
    }
    
    return (
      <div className="rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 border-blue-100 p-6 animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-800">
              {gameLevels[level].challenges.find(c => c.id === activeChallenge)?.title || "Challenge"}
            </h3>
            <p className="text-sm text-gray-600">Complete the challenge to earn XP</p>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="bg-amber-100 text-amber-800">
              <Clock className="w-3 h-3 mr-1" /> 10:00
            </Badge>
            <Badge variant="outline" className="bg-green-100 text-green-800">
              <Trophy className="w-3 h-3 mr-1" /> +50 XP
            </Badge>
          </div>
        </div>
        
        {progress < 100 ? (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h4 className="font-medium mb-4">Challenge Content</h4>
              
              {gameType === "flashcards" && (
                <div className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white p-8 rounded-lg shadow-lg text-center hover:scale-[1.02] transition-transform">
                  <h3 className="text-xl font-bold">What is a Binary Search Tree?</h3>
                  <button 
                    className="mt-6 bg-white text-purple-600 px-4 py-2 rounded-full font-medium"
                    onClick={() => setProgress(prev => Math.min(prev + 20, 100))}
                  >
                    Flip Card
                  </button>
                </div>
              )}
              
              {gameType === "simulations" && (
                <div className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white p-8 rounded-lg shadow-lg hover:scale-[1.02] transition-transform">
                  <h3 className="text-xl font-bold">Career Scenario</h3>
                  <p className="my-4">You're assigned a project with unclear requirements. What's your first step?</p>
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <button 
                      className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium"
                      onClick={() => setProgress(prev => Math.min(prev + 20, 100))}
                    >
                      Ask for clarification
                    </button>
                    <button 
                      className="bg-white/80 text-blue-600 px-4 py-2 rounded-lg font-medium"
                      onClick={() => setProgress(prev => Math.min(prev + 10, 100))}
                    >
                      Make assumptions
                    </button>
                  </div>
                </div>
              )}
              
              {gameType === "skillGames" && (
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white p-8 rounded-lg shadow-lg hover:scale-[1.02] transition-transform">
                  <h3 className="text-xl font-bold">Code Challenge</h3>
                  <div className="my-4 bg-black/80 p-4 rounded text-green-400 font-mono text-sm">
                    <p>// Fix this function to return the sum of two numbers</p>
                    <p>function add(a, b) {'{'}</p>
                    <p>&nbsp;&nbsp;return a - b; // Bug here!</p>
                    <p>{'}'}</p>
                  </div>
                  <button 
                    className="bg-white text-emerald-600 px-4 py-2 rounded-lg font-medium"
                    onClick={() => setProgress(prev => Math.min(prev + 30, 100))}
                  >
                    Submit Solution
                  </button>
                </div>
              )}
              
              {gameType === "careerPathBuilder" && (
                <div className="bg-gradient-to-br from-amber-500 to-orange-600 text-white p-8 rounded-lg shadow-lg hover:scale-[1.02] transition-transform">
                  <h3 className="text-xl font-bold">Build Your Path</h3>
                  <p className="my-4">Drag and drop the skills in order of importance for a Frontend Developer:</p>
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="bg-white/20 p-3 rounded-lg cursor-move">HTML/CSS</div>
                    <div className="bg-white/20 p-3 rounded-lg cursor-move">JavaScript</div>
                    <div className="bg-white/20 p-3 rounded-lg cursor-move">React</div>
                    <div className="bg-white/20 p-3 rounded-lg cursor-move">UI/UX</div>
                  </div>
                  <button 
                    className="mt-4 bg-white text-amber-600 px-4 py-2 rounded-lg font-medium"
                    onClick={() => setProgress(prev => Math.min(prev + 25, 100))}
                  >
                    Submit Order
                  </button>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm mb-1">
                <span>Challenge Progress</span>
                <span className="font-medium">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2 bg-gray-200" />
            </div>
          </div>
        ) : (
          <div className="text-center py-12 space-y-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold">Challenge Completed!</h3>
            <p className="text-gray-600">You've earned 50 XP and unlocked a new badge</p>
            <div className="flex justify-center gap-4 mt-6">
              <Button 
                onClick={() => {
                  setGameStarted(false);
                  setActiveChallenge(null);
                  setProgress(0);
                }} 
                variant="outline"
              >
                Next Challenge
              </Button>
              <Button 
                onClick={() => navigate(`/games/${gameType}/${gameId}/leaderboard`)}
              >
                View Leaderboard
              </Button>
            </div>
          </div>
        )}
      </div>
    );
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
          <Card className="bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur shadow-lg border-blue-100">
            <CardHeader>
              <div className="mb-2">
                <Badge variant="outline" className="bg-blue-100 text-blue-800 mb-2">
                  {gameType?.charAt(0).toUpperCase() + gameType?.slice(1)}
                </Badge>
              </div>
              <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                {getGameTitle()}
              </CardTitle>
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
                <Progress value={25} className="h-2 bg-blue-100" />
              </div>
              
              <div className="pt-4">
                <h3 className="font-medium mb-2 text-gray-800">Game Overview</h3>
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
                  className="w-full flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600"
                  onClick={() => setInviteFriends(!inviteFriends)}
                >
                  <Users className="h-4 w-4" />
                  Invite Friends
                </Button>
                <Button 
                  variant="outline"
                  className="w-full flex items-center gap-2 border-blue-200 hover:bg-blue-50"
                  onClick={() => navigate(`/games/${gameType}/${gameId}/leaderboard`)}
                >
                  <Trophy className="h-4 w-4" />
                  View Leaderboard
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {inviteFriends && (
            <Card className="mt-4 bg-gradient-to-br from-white/90 to-purple-50/90 backdrop-blur shadow-lg border-purple-100">
              <CardHeader>
                <CardTitle className="text-lg">Invite Friends</CardTitle>
                <CardDescription>Play together and learn faster</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {friends.map(friend => (
                  <div key={friend.id} className="flex items-center justify-between hover:bg-purple-50/50 p-2 rounded-lg transition-colors">
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
                    <Button size="sm" className="bg-gradient-to-r from-indigo-500 to-purple-500">
                      Invite
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
        
        {/* Game content main area */}
        <div className="lg:col-span-2">
          <Card className="bg-white/90 backdrop-blur shadow-lg mb-6 overflow-hidden border-0">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <CardTitle className="text-2xl">Let's Play!</CardTitle>
              <CardDescription className="text-blue-100">
                Choose your level and start learning
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs value={level} onValueChange={setLevel} className="w-full">
                <div className="px-6 pt-6">
                  <TabsList className="grid w-full grid-cols-3 bg-blue-50">
                    <TabsTrigger value="beginner" className="data-[state=active]:bg-gradient-to-r from-green-500 to-emerald-600 data-[state=active]:text-white">
                      Beginner
                    </TabsTrigger>
                    <TabsTrigger value="intermediate" className="data-[state=active]:bg-gradient-to-r from-blue-500 to-indigo-600 data-[state=active]:text-white">
                      Intermediate
                    </TabsTrigger>
                    <TabsTrigger value="advanced" className="data-[state=active]:bg-gradient-to-r from-purple-500 to-violet-600 data-[state=active]:text-white">
                      Advanced
                    </TabsTrigger>
                  </TabsList>
                </div>
                
                <div className="p-6">
                  {Object.entries(gameLevels).map(([levelKey, levelData]) => (
                    <TabsContent key={levelKey} value={levelKey} className="mt-4 space-y-4">
                      <h3 className="text-xl font-semibold">{levelData.title}</h3>
                      <div className="space-y-3">
                        {levelData.challenges.map(challenge => (
                          <Card key={challenge.id} className={`${activeChallenge === challenge.id ? 'border-blue-300 bg-blue-50/50' : 'bg-white'} hover:shadow-md transition-all duration-300`}>
                            <div className="p-4 flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-full ${
                                  levelKey === 'beginner' ? 'bg-green-100 text-green-600' : 
                                  levelKey === 'intermediate' ? 'bg-blue-100 text-blue-600' : 
                                  'bg-purple-100 text-purple-600'
                                }`}>
                                  <Gamepad className="h-5 w-5" />
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
                              <Button
                                onClick={() => handleStartGame(challenge.id)}
                                className={`${
                                  levelKey === 'beginner' ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 
                                  levelKey === 'intermediate' ? 'bg-gradient-to-r from-blue-500 to-indigo-600' : 
                                  'bg-gradient-to-r from-purple-500 to-violet-600'
                                } transition-all hover:scale-105`}
                              >
                                <Play className="w-4 h-4 mr-1" />
                                {challenge.progress > 0 ? 'Continue' : 'Start'}
                              </Button>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>
                  ))}
                </div>
              </Tabs>
              
              {/* Game content area */}
              {gameStarted && (
                <div className="border-t border-gray-100 p-6">
                  {renderGameContent()}
                </div>
              )}
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <Card className="bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-100 hover:shadow-md transition-all duration-300">
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
            
            <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-100 hover:shadow-md transition-all duration-300">
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
