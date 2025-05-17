
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Gamepad, Trophy, Brain, Code, PenTool, Play, Star } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const GamesPage = () => {
  const [activeTab, setActiveTab] = useState("flashcards");
  const navigate = useNavigate();
  
  // Function to handle play now button click - updated to use correct path
  const handlePlayNow = (gameId, gameType) => {
    navigate(`/games/${gameType}/${gameId}/play`);
    toast({
      title: "Game launching...",
      description: "Get ready to level up your skills!",
      duration: 2000,
    });
  };
  
  // Function to view leaderboard
  const handleViewLeaderboard = () => {
    navigate('/games/leaderboard');
  };

  // Sample data for games
  const games = {
    flashcards: [
      {
        id: 1,
        title: "DSA Fundamentals",
        description: "Learn key DSA concepts with interactive flashcards",
        image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=1528&auto=format&fit=crop",
        difficulty: "Beginner",
        players: "Single/Multiplayer",
        category: "Programming"
      },
      {
        id: 2,
        title: "OS Concepts",
        description: "Master operating system concepts through flashcard challenges",
        image: "https://images.unsplash.com/photo-1623479322729-28b25c16b011?q=80&w=1470&auto=format&fit=crop",
        difficulty: "Intermediate",
        players: "Single/Multiplayer",
        category: "Computer Science"
      },
      {
        id: 3,
        title: "DBMS Essentials",
        description: "Learn database management concepts with competitive flashcard battles",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1528&auto=format&fit=crop",
        difficulty: "Intermediate",
        players: "Multiplayer",
        category: "Data Science"
      }
    ],
    simulations: [
      {
        id: 1,
        title: "Data Scientist Career Path",
        description: "Experience the life of a data scientist through interactive scenarios",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop",
        difficulty: "All Levels",
        players: "Single Player",
        category: "Career Simulation"
      },
      {
        id: 2,
        title: "Software Engineer Journey",
        description: "Navigate career decisions and see where they lead you",
        image: "https://images.unsplash.com/photo-1580894894513-541e068a3e2b?q=80&w=1470&auto=format&fit=crop",
        difficulty: "All Levels",
        players: "Single Player",
        category: "Career Simulation"
      }
    ],
    careerPathBuilder: [
      {
        id: 1,
        title: "Build Your Dream Career",
        description: "Drag and drop interests and skills to visualize your ideal career path",
        image: "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?q=80&w=1470&auto=format&fit=crop",
        difficulty: "All Levels",
        players: "Single Player",
        category: "Career Planning"
      }
    ],
    skillGames: [
      {
        id: 1,
        title: "Speed Coding Race",
        description: "Test and improve your coding speed with typing challenges",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1472&auto=format&fit=crop",
        difficulty: "All Levels",
        players: "Single/Multiplayer",
        category: "Coding Skills"
      },
      {
        id: 2,
        title: "Debug Master",
        description: "Find and fix bugs in progressively challenging code snippets",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1470&auto=format&fit=crop",
        difficulty: "Intermediate",
        players: "Single Player",
        category: "Problem Solving"
      },
      {
        id: 3,
        title: "Logic Puzzles",
        description: "Strengthen your aptitude with fun logic puzzles",
        image: "https://images.unsplash.com/photo-1553481187-be93c21490a9?q=80&w=1470&auto=format&fit=crop",
        difficulty: "Beginner to Advanced",
        players: "Single Player",
        category: "Logical Reasoning"
      }
    ]
  };

  const renderGameCards = (gamesList) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {gamesList.map((game) => (
          <Card key={game.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur border-blue-100">
            <div className="relative">
              <AspectRatio ratio={16/9}>
                <img 
                  src={game.image} 
                  alt={game.title}
                  className="object-cover w-full h-full rounded-t-lg"
                />
              </AspectRatio>
              <div className="absolute top-2 right-2 flex gap-2">
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">
                  {game.difficulty}
                </Badge>
              </div>
            </div>
            
            <CardHeader className="pb-2">
              <CardTitle className="text-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                {game.title}
              </CardTitle>
              <CardDescription>{game.description}</CardDescription>
            </CardHeader>
            
            <CardContent className="pb-2">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-purple-50 border-purple-200">
                  {game.players}
                </Badge>
                <Badge variant="outline" className="bg-green-50 border-green-200">
                  {game.category}
                </Badge>
              </div>
            </CardContent>
            
            <CardFooter>
              <Button 
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all hover:shadow-md hover:from-blue-700 hover:to-indigo-700 flex items-center gap-2 group"
                onClick={() => handlePlayNow(game.id, activeTab)}
              >
                <Play className="w-4 h-4 transition-transform group-hover:scale-110" />
                Play Now
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen py-16 px-4 relative">
      {/* Background blurry elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Learn by <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">Playing</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Make your learning journey fun and engaging with our collection of educational games and challenges.
          </p>
        </div>
        
        <Tabs defaultValue="flashcards" className="w-full" onValueChange={setActiveTab}>
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-blue-50">
              <TabsTrigger 
                value="flashcards" 
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white"
              >
                <BookOpen className="w-4 h-4" />
                <span>Flashcard Battles</span>
              </TabsTrigger>
              <TabsTrigger 
                value="simulations" 
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-violet-600 data-[state=active]:text-white"
              >
                <Brain className="w-4 h-4" />
                <span>Career Simulations</span>
              </TabsTrigger>
              <TabsTrigger 
                value="careerPathBuilder" 
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-500 data-[state=active]:text-white"
              >
                <Gamepad className="w-4 h-4" />
                <span>Career Path Builder</span>
              </TabsTrigger>
              <TabsTrigger 
                value="skillGames" 
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-600 data-[state=active]:to-teal-600 data-[state=active]:text-white"
              >
                <PenTool className="w-4 h-4" />
                <span>Skill Games</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="flashcards" className="mt-2">
            <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">Flashcard Battles</h2>
              </div>
              <p className="text-gray-600 mb-4">
                Test your knowledge and compete with friends in these interactive flashcard games. Master key concepts while having fun!
              </p>
              {renderGameCards(games.flashcards)}
            </div>
          </TabsContent>
          
          <TabsContent value="simulations">
            <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-full bg-purple-100 text-purple-600">
                  <Brain className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 text-transparent bg-clip-text">Career Simulations</h2>
              </div>
              <p className="text-gray-600 mb-4">
                Experience different career paths through interactive storytelling. Make decisions and see where they lead you!
              </p>
              {renderGameCards(games.simulations)}
            </div>
          </TabsContent>
          
          <TabsContent value="careerPathBuilder">
            <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-full bg-amber-100 text-amber-600">
                  <Gamepad className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-transparent bg-clip-text">Career Path Builder</h2>
              </div>
              <p className="text-gray-600 mb-4">
                Design your own career path by dragging and dropping interests and skills. Visualize your journey and get personalized roadmaps.
              </p>
              {renderGameCards(games.careerPathBuilder)}
            </div>
          </TabsContent>
          
          <TabsContent value="skillGames">
            <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-full bg-emerald-100 text-emerald-600">
                  <PenTool className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 text-transparent bg-clip-text">Skill Games</h2>
              </div>
              <p className="text-gray-600 mb-4">
                Improve specific skills through fun mini-games. Practice coding, debugging, and logical reasoning in an engaging way.
              </p>
              {renderGameCards(games.skillGames)}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                <Trophy className="w-6 h-6 text-amber-300" />
                Career Arena Leaderboard
              </h3>
              <p className="opacity-90">
                Compete with peers, track your progress, and earn rewards. Join the Career Arena to showcase your skills.
              </p>
            </div>
            <Button 
              variant="secondary" 
              className="whitespace-nowrap hover:bg-white group transition-all"
              onClick={handleViewLeaderboard}
            >
              <Trophy className="w-4 h-4 mr-2 text-amber-500 group-hover:scale-110 transition-transform" />
              View Leaderboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamesPage;
