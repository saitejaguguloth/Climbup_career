
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Gamepad, Trophy, Brain, Code, PenTool, Play, Star, Award, Layers } from "lucide-react";
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

  // Sample data for games - enhanced with more attractive themes and descriptions
  const games = {
    flashcards: [
      {
        id: 1,
        title: "DSA Memory Match",
        description: "Match and memorize DSA concepts in this addictive memory card game",
        image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=1528&auto=format&fit=crop",
        difficulty: "Beginner",
        players: "Single/Multiplayer",
        category: "Programming",
        xp: 250
      },
      {
        id: 2,
        title: "OS Trivia Rush",
        description: "Race against time in this fast-paced operating systems trivia game",
        image: "https://images.unsplash.com/photo-1623479322729-28b25c16b011?q=80&w=1470&auto=format&fit=crop",
        difficulty: "Intermediate",
        players: "Single/Multiplayer",
        category: "Computer Science",
        xp: 350
      },
      {
        id: 3,
        title: "SQL Battle Arena",
        description: "Duel with friends in real-time database query challenges",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1528&auto=format&fit=crop",
        difficulty: "Intermediate",
        players: "Multiplayer",
        category: "Data Science",
        xp: 400
      },
      {
        id: 4,
        title: "ML Puzzle Quest",
        description: "Solve machine learning puzzles to unlock new algorithm powers",
        image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1374&auto=format&fit=crop",
        difficulty: "Advanced",
        players: "Single Player",
        category: "AI",
        xp: 500
      }
    ],
    simulations: [
      {
        id: 1,
        title: "Data Scientist Tycoon",
        description: "Build your data science empire from intern to chief data officer",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop",
        difficulty: "All Levels",
        players: "Single Player",
        category: "Career Simulation",
        xp: 450
      },
      {
        id: 2,
        title: "Dev Team Simulator",
        description: "Lead a software team through sprints and product launches",
        image: "https://images.unsplash.com/photo-1580894894513-541e068a3e2b?q=80&w=1470&auto=format&fit=crop",
        difficulty: "All Levels",
        players: "Single Player",
        category: "Career Simulation",
        xp: 400
      },
      {
        id: 3,
        title: "Startup Venture",
        description: "Launch your tech startup and navigate funding rounds",
        image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=1470&auto=format&fit=crop",
        difficulty: "Advanced",
        players: "Multiplayer",
        category: "Business",
        xp: 550
      }
    ],
    careerPathBuilder: [
      {
        id: 1,
        title: "Career Architect",
        description: "Design your ideal career path in this immersive builder game",
        image: "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?q=80&w=1470&auto=format&fit=crop",
        difficulty: "All Levels",
        players: "Single Player",
        category: "Career Planning",
        xp: 300
      },
      {
        id: 2,
        title: "Skill Tree Master",
        description: "Grow your professional skill tree and unlock new career paths",
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1470&auto=format&fit=crop",
        difficulty: "Beginner",
        players: "Single Player",
        category: "Skill Development",
        xp: 250
      }
    ],
    skillGames: [
      {
        id: 1,
        title: "Code Runner",
        description: "Race through coding challenges with our arcade-style typing game",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1472&auto=format&fit=crop",
        difficulty: "All Levels",
        players: "Single/Multiplayer",
        category: "Coding Skills",
        xp: 350
      },
      {
        id: 2,
        title: "Debug Escape Room",
        description: "Find and fix bugs to escape increasingly difficult code chambers",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1470&auto=format&fit=crop",
        difficulty: "Intermediate",
        players: "Single Player",
        category: "Problem Solving",
        xp: 400
      },
      {
        id: 3,
        title: "Algorithm Arcade",
        description: "Classic arcade games reimagined to teach sorting algorithms",
        image: "https://images.unsplash.com/photo-1553481187-be93c21490a9?q=80&w=1470&auto=format&fit=crop",
        difficulty: "Beginner to Advanced",
        players: "Single Player",
        category: "Logical Reasoning",
        xp: 325
      },
      {
        id: 4,
        title: "UI Pattern Puzzles",
        description: "Match and arrange UI patterns in this addictive puzzle game",
        image: "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?q=80&w=1374&auto=format&fit=crop",
        difficulty: "Intermediate",
        players: "Single Player",
        category: "Design",
        xp: 375
      }
    ]
  };

  const renderGameCards = (gamesList) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {gamesList.map((game) => (
          <Card key={game.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur border-blue-100 group">
            <div className="relative">
              <AspectRatio ratio={16/9}>
                <img 
                  src={game.image} 
                  alt={game.title}
                  className="object-cover w-full h-full rounded-t-lg group-hover:scale-105 transition-transform duration-500"
                />
              </AspectRatio>
              <div className="absolute top-2 right-2 flex gap-2">
                <Badge variant="secondary" className={`
                  ${game.difficulty === 'Beginner' ? 'bg-green-100 text-green-800 border-green-200' : 
                    game.difficulty === 'Intermediate' ? 'bg-blue-100 text-blue-800 border-blue-200' : 
                    game.difficulty === 'Advanced' ? 'bg-purple-100 text-purple-800 border-purple-200' : 
                    'bg-amber-100 text-amber-800 border-amber-200'}
                `}>
                  {game.difficulty}
                </Badge>
              </div>
              <div className="absolute bottom-2 right-2">
                <Badge variant="secondary" className="bg-indigo-100 text-indigo-800 border-indigo-200 flex items-center gap-1">
                  <Star className="h-3 w-3 text-amber-500 fill-amber-500" /> {game.xp} XP
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
      {/* Enhanced background elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-6000"></div>
      </div>
      
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Level Up Your <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-transparent bg-clip-text">Career Skills</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Make your learning journey fun and engaging with our collection of arcade-style educational games designed to boost your career.
          </p>
        </div>
        
        <Tabs defaultValue="flashcards" className="w-full" onValueChange={setActiveTab}>
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-blue-50 p-1 rounded-xl">
              <TabsTrigger 
                value="flashcards" 
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white rounded-lg transition-all"
              >
                <BookOpen className="w-4 h-4" />
                <span>Flashcard Games</span>
              </TabsTrigger>
              <TabsTrigger 
                value="simulations" 
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-violet-600 data-[state=active]:text-white rounded-lg transition-all"
              >
                <Brain className="w-4 h-4" />
                <span>Career Simulations</span>
              </TabsTrigger>
              <TabsTrigger 
                value="careerPathBuilder" 
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-500 data-[state=active]:text-white rounded-lg transition-all"
              >
                <Layers className="w-4 h-4" />
                <span>Career Builder</span>
              </TabsTrigger>
              <TabsTrigger 
                value="skillGames" 
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-600 data-[state=active]:to-teal-600 data-[state=active]:text-white rounded-lg transition-all"
              >
                <Gamepad className="w-4 h-4" />
                <span>Arcade Games</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="flashcards" className="mt-2">
            <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-md border border-blue-100/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">Flashcard Battle Games</h2>
              </div>
              <p className="text-gray-600 mb-6">
                Test your knowledge and compete with friends in these interactive, arcade-style flashcard games. Master key concepts while racing against time!
              </p>
              {renderGameCards(games.flashcards)}
            </div>
          </TabsContent>
          
          <TabsContent value="simulations">
            <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-md border border-purple-100/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-full bg-gradient-to-r from-purple-500 to-violet-600 text-white">
                  <Brain className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 text-transparent bg-clip-text">Career Simulations</h2>
              </div>
              <p className="text-gray-600 mb-6">
                Experience different career paths through immersive, game-like simulations. Make decisions and see where they lead in these realistic career adventures!
              </p>
              {renderGameCards(games.simulations)}
            </div>
          </TabsContent>
          
          <TabsContent value="careerPathBuilder">
            <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-md border border-amber-100/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                  <Layers className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-transparent bg-clip-text">Career Path Builder</h2>
              </div>
              <p className="text-gray-600 mb-6">
                Design your own career path in these engaging builder games. Visualize your journey and get personalized roadmaps through interactive gameplay.
              </p>
              {renderGameCards(games.careerPathBuilder)}
            </div>
          </TabsContent>
          
          <TabsContent value="skillGames">
            <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-md border border-emerald-100/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
                  <Gamepad className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 text-transparent bg-clip-text">Arcade Skill Games</h2>
              </div>
              <p className="text-gray-600 mb-6">
                Improve specific skills through classic arcade-style games. Practice coding, debugging, and logical reasoning with these addictive mini-games.
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
