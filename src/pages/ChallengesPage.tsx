
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Code, PuzzlePiece, FileEdit, Calendar } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Progress } from "@/components/ui/progress";

const ChallengesPage = () => {
  const [filter, setFilter] = useState("all");
  
  const challenges = [
    {
      id: 1,
      title: "30-Day Coding Challenge",
      description: "Solve one coding problem daily for 30 days. Perfect for building consistent coding habits.",
      image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=1470&auto=format&fit=crop",
      category: "coding",
      difficulty: "Intermediate",
      participants: 2478,
      completion: 24,
      daysLeft: 18
    },
    {
      id: 2,
      title: "UI/UX Design Sprint",
      description: "Design a complete mobile app interface in 7 days. Learn design thinking and prototyping.",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1528&auto=format&fit=crop",
      category: "design",
      difficulty: "Beginner",
      participants: 1253,
      completion: 45,
      daysLeft: 4
    },
    {
      id: 3,
      title: "Data Science Portfolio Challenge",
      description: "Build 3 data analysis projects using real-world datasets in 21 days.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop",
      category: "data",
      difficulty: "Advanced",
      participants: 876,
      completion: 0,
      daysLeft: 21
    },
    {
      id: 4,
      title: "Mock Interview Marathon",
      description: "Participate in 10 mock interviews with peers and get feedback to improve your skills.",
      image: "https://images.unsplash.com/photo-1565688534245-05d6b5be184a?q=80&w=1470&auto=format&fit=crop",
      category: "career",
      difficulty: "All Levels",
      participants: 654,
      completion: 70,
      daysLeft: 3
    },
    {
      id: 5,
      title: "Full-Stack Web App Challenge",
      description: "Build and deploy a complete web application in 14 days. Frontend, backend, and deployment included.",
      image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?q=80&w=1470&auto=format&fit=crop",
      category: "coding",
      difficulty: "Advanced",
      participants: 1847,
      completion: 10,
      daysLeft: 10
    },
    {
      id: 6,
      title: "Competitive Coding Contest",
      description: "Compete with peers in a 3-hour coding contest with algorithmic problems.",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1470&auto=format&fit=crop",
      category: "coding",
      difficulty: "Expert",
      participants: 2145,
      completion: 0,
      daysLeft: 5
    }
  ];

  const filteredChallenges = filter === "all" 
    ? challenges 
    : challenges.filter(challenge => challenge.category === filter);

  return (
    <div className="min-h-screen py-16 px-4 relative">
      {/* Background blurry elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Skill <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">Challenges</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Push your limits and accelerate your growth with time-bound challenges designed by industry experts.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Filter By Category</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <Button 
                      onClick={() => setFilter("all")}
                      variant={filter === "all" ? "default" : "outline"}
                      className="w-full justify-start"
                    >
                      All Challenges
                    </Button>
                    <Button 
                      onClick={() => setFilter("coding")}
                      variant={filter === "coding" ? "default" : "outline"}
                      className="w-full justify-start"
                    >
                      <Code className="mr-2 h-4 w-4" />
                      Coding Challenges
                    </Button>
                    <Button 
                      onClick={() => setFilter("design")}
                      variant={filter === "design" ? "default" : "outline"}
                      className="w-full justify-start"
                    >
                      <FileEdit className="mr-2 h-4 w-4" />
                      Design Challenges
                    </Button>
                    <Button 
                      onClick={() => setFilter("data")}
                      variant={filter === "data" ? "default" : "outline"}
                      className="w-full justify-start"
                    >
                      <PuzzlePiece className="mr-2 h-4 w-4" />
                      Data Science Challenges
                    </Button>
                    <Button 
                      onClick={() => setFilter("career")}
                      variant={filter === "career" ? "default" : "outline"}
                      className="w-full justify-start"
                    >
                      <Trophy className="mr-2 h-4 w-4" />
                      Career Challenges
                    </Button>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredChallenges.map((challenge) => (
            <Card key={challenge.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-white/90 backdrop-blur">
              <div className="relative">
                <AspectRatio ratio={16/9}>
                  <img 
                    src={challenge.image} 
                    alt={challenge.title}
                    className="object-cover w-full h-full"
                  />
                </AspectRatio>
                <div className="absolute top-2 right-2 flex gap-2">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    {challenge.difficulty}
                  </Badge>
                </div>
              </div>
              
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl">{challenge.title}</CardTitle>
                  <Badge variant="outline" className="bg-purple-50">
                    <Calendar className="mr-1 h-3 w-3" /> {challenge.daysLeft} days left
                  </Badge>
                </div>
                <CardDescription>{challenge.description}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm font-medium">{challenge.completion}%</span>
                </div>
                <Progress value={challenge.completion} className="h-2" />
                
                <div className="mt-4 flex items-center text-sm text-gray-500">
                  <Trophy className="mr-1 h-4 w-4" /> 
                  <span>{challenge.participants} participants</span>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600">
                  {challenge.completion > 0 ? "Continue Challenge" : "Join Challenge"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Challenges
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChallengesPage;
