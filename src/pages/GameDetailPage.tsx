
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Trophy, Users, Book, BookOpen, Brain, Clock, CheckCircle2, XCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const GameDetailPage = () => {
  const { gameId, gameType } = useParams();
  const navigate = useNavigate();
  const [activeLevel, setActiveLevel] = useState("beginner");
  const [game, setGame] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Sample game data structure (would be fetched from API/database in a real app)
  useEffect(() => {
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      // Sample data structure - in a real app, this would be fetched based on gameId
      const gameData = {
        id: gameId,
        type: gameType,
        title: gameType === "flashcards" ? "DSA Fundamentals" : 
              gameType === "simulations" ? "Data Scientist Career Path" : 
              gameType === "careerPathBuilder" ? "Build Your Dream Career" : "Speed Coding Race",
        description: "Master key concepts through interactive challenges and gameplay.",
        image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=1528&auto=format&fit=crop",
        progress: 35,
        difficulty: "Intermediate",
        players: [
          {
            id: "p1",
            name: "Alex Johnson",
            avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop",
            level: 12
          },
          {
            id: "p2",
            name: "Sarah Miller",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374&auto=format&fit=crop",
            level: 9
          },
          {
            id: "p3",
            name: "Mike Roberts",
            avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=1470&auto=format&fit=crop", 
            level: 7
          }
        ],
        levels: {
          beginner: {
            title: "Getting Started",
            challenges: [
              { id: "b1", title: "Introduction to Arrays", completed: true, score: 85 },
              { id: "b2", title: "Understanding Lists", completed: true, score: 92 },
              { id: "b3", title: "Basic Sorting Algorithms", completed: false },
              { id: "b4", title: "Simple Data Structures", completed: false },
              { id: "b5", title: "Beginner Challenge", completed: false }
            ]
          },
          intermediate: {
            title: "Advanced Concepts",
            challenges: [
              { id: "i1", title: "Binary Trees", completed: false },
              { id: "i2", title: "Hash Maps Implementation", completed: false },
              { id: "i3", title: "Graph Traversal", completed: false },
              { id: "i4", title: "Dynamic Programming Basics", completed: false },
              { id: "i5", title: "Intermediate Challenge", completed: false }
            ]
          },
          advanced: {
            title: "Expert Skills",
            challenges: [
              { id: "a1", title: "Advanced Algorithm Analysis", completed: false },
              { id: "a2", title: "Complex Data Structures", completed: false },
              { id: "a3", title: "System Design Patterns", completed: false },
              { id: "a4", title: "Performance Optimization", completed: false },
              { id: "a5", title: "Expert Challenge", completed: false }
            ]
          }
        }
      };
      
      setGame(gameData);
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [gameId, gameType]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading game...</p>
        </div>
      </div>
    );
  }

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
      
      {/* Game Header */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="w-full md:w-1/3">
          <div className="aspect-video rounded-lg overflow-hidden">
            <img 
              src={game.image} 
              alt={game.title} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
              {game.difficulty}
            </Badge>
            <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-300">
              {game.type}
            </Badge>
          </div>
          
          <h1 className="text-3xl font-bold mb-2">{game.title}</h1>
          <p className="text-gray-600 mb-4">{game.description}</p>
          
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Your progress</span>
              <span className="font-medium">{game.progress}%</span>
            </div>
            <Progress value={game.progress} className="h-2" />
          </div>
          
          <div className="flex flex-wrap gap-4 mt-6">
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600">
              Continue Playing
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Invite Friends
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              View Leaderboard
            </Button>
          </div>
        </div>
      </div>
      
      {/* Game Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left sidebar - Players */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                Current Players
              </CardTitle>
              <CardDescription>People playing this game</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {game.players.map((player) => (
                <div key={player.id} className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={player.avatar} alt={player.name} />
                    <AvatarFallback>{player.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium leading-none">{player.name}</p>
                    <p className="text-xs text-gray-500">Level {player.level}</p>
                  </div>
                  <Button variant="outline" size="sm" className="h-8">
                    Challenge
                  </Button>
                </div>
              ))}
              
              <Button variant="outline" className="w-full mt-4">
                Find More Players
              </Button>
            </CardContent>
          </Card>
        </div>
        
        {/* Main content - Levels */}
        <div className="lg:col-span-3">
          <Tabs value={activeLevel} onValueChange={setActiveLevel}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="beginner" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Beginner
              </TabsTrigger>
              <TabsTrigger value="intermediate" className="flex items-center gap-2">
                <Brain className="h-4 w-4" />
                Intermediate
              </TabsTrigger>
              <TabsTrigger value="advanced" className="flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                Advanced
              </TabsTrigger>
            </TabsList>
            
            {Object.entries(game.levels).map(([levelKey, levelData]) => (
              <TabsContent key={levelKey} value={levelKey} className="mt-6">
                <h3 className="text-xl font-semibold mb-4">{levelData.title}</h3>
                <div className="space-y-4">
                  {levelData.challenges.map((challenge) => (
                    <Card key={challenge.id} className={`transition-all ${challenge.completed ? 'border-green-200 bg-green-50/30' : ''}`}>
                      <div className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {challenge.completed ? (
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                          ) : (
                            <Clock className="h-5 w-5 text-orange-500" />
                          )}
                          <div>
                            <h4 className="font-medium">{challenge.title}</h4>
                            {challenge.completed && (
                              <p className="text-sm text-gray-600">Score: {challenge.score}%</p>
                            )}
                          </div>
                        </div>
                        <Button>
                          {challenge.completed ? 'Replay' : 'Start'}
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
      
      {/* Game Statistics */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">3/12</p>
            <p className="text-sm text-gray-600">Unlocked achievements</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-500" />
              Time Spent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">2h 45m</p>
            <p className="text-sm text-gray-600">Total learning time</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Book className="h-5 w-5 text-purple-500" />
              Concepts Learned
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">14</p>
            <p className="text-sm text-gray-600">Core concepts mastered</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GameDetailPage;
