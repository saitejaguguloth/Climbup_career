
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Award, Brain, Code, Trophy, Puzzle } from 'lucide-react';

// Mock data
const challenges = {
  daily: [
    {
      id: 1,
      title: "JavaScript: Array Methods",
      description: "Complete these 5 array manipulation challenges to earn your badge",
      category: "Programming",
      difficulty: "Intermediate",
      completedSteps: 2,
      totalSteps: 5,
      xp: 250,
      imgUrl: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=1470&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Python: Data Analysis",
      description: "Analyze a dataset to extract meaningful insights",
      category: "Data Science",
      difficulty: "Advanced",
      completedSteps: 0,
      totalSteps: 3,
      xp: 350,
      imgUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "System Design: Social Media App",
      description: "Design the architecture for a basic social media application",
      category: "System Design",
      difficulty: "Advanced",
      completedSteps: 0,
      totalSteps: 4,
      xp: 400,
      imgUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1472&auto=format&fit=crop"
    }
  ],
  weekly: [
    {
      id: 4,
      title: "Full-Stack To-Do App",
      description: "Build a complete to-do application with React and Node.js",
      category: "Project",
      difficulty: "Intermediate",
      completedSteps: 3,
      totalSteps: 8,
      xp: 750,
      imgUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1470&auto=format&fit=crop"
    },
    {
      id: 5,
      title: "Machine Learning: Image Classification",
      description: "Create an ML model to classify common household objects",
      category: "AI/ML",
      difficulty: "Advanced",
      completedSteps: 1,
      totalSteps: 6,
      xp: 900,
      imgUrl: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=1470&auto=format&fit=crop"
    }
  ],
  monthly: [
    {
      id: 6,
      title: "DevOps Pipeline Challenge",
      description: "Build a complete CI/CD pipeline for automated testing and deployment",
      category: "DevOps",
      difficulty: "Expert",
      completedSteps: 2,
      totalSteps: 10,
      xp: 1500,
      imgUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1470&auto=format&fit=crop"
    },
    {
      id: 7,
      title: "Blockchain Smart Contract",
      description: "Develop and deploy a working smart contract on a test blockchain",
      category: "Blockchain",
      difficulty: "Expert",
      completedSteps: 0,
      totalSteps: 8,
      xp: 1800,
      imgUrl: "https://images.unsplash.com/photo-1639322537504-6427a16b0a28?q=80&w=1332&auto=format&fit=crop"
    }
  ]
};

const ChallengesPage = () => {
  const [activeTab, setActiveTab] = useState('daily');

  const renderChallengeCards = (challengesList) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {challengesList.map((challenge) => (
          <Card key={challenge.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-white/90 backdrop-blur">
            <div className="relative h-48">
              <img 
                src={challenge.imgUrl} 
                alt={challenge.title} 
                className="h-full w-full object-cover"
              />
              <div className="absolute top-2 right-2 flex gap-2">
                <Badge className="bg-indigo-600">{challenge.difficulty}</Badge>
              </div>
              <div className="absolute bottom-2 left-2">
                <Badge variant="outline" className="bg-black/50 text-white border-none">
                  {challenge.category}
                </Badge>
              </div>
            </div>
            
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle>{challenge.title}</CardTitle>
                <div className="flex items-center text-amber-600 font-medium">
                  <Trophy className="h-4 w-4 mr-1" />
                  <span>{challenge.xp} XP</span>
                </div>
              </div>
              <CardDescription>{challenge.description}</CardDescription>
            </CardHeader>
            
            <CardContent className="pb-2">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span className="font-medium">{challenge.completedSteps}/{challenge.totalSteps}</span>
                </div>
                <Progress value={(challenge.completedSteps / challenge.totalSteps) * 100} />
              </div>
            </CardContent>
            
            <CardFooter>
              <Button className="w-full bg-gradient-to-r from-indigo-600 to-blue-700">
                {challenge.completedSteps > 0 ? "Continue Challenge" : "Start Challenge"}
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
        <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 left-1/2 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Skill <span className="bg-gradient-to-r from-indigo-600 to-blue-600 text-transparent bg-clip-text">Challenges</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Put your skills to the test with our curated challenges for all experience levels.
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur rounded-xl p-6 shadow-lg mb-10">
          <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-indigo-600 to-blue-700 text-white rounded-lg mb-6">
            <div className="bg-white/20 p-3 rounded-full">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Current Challenge Streak: 7 Days</h2>
              <p>Complete today's challenge to continue your streak!</p>
            </div>
          </div>
          
          <Tabs defaultValue="daily" className="w-full" onValueChange={setActiveTab}>
            <div className="flex justify-center mb-8">
              <TabsList className="grid grid-cols-3 w-full max-w-md">
                <TabsTrigger value="daily" className="flex items-center gap-1">
                  <Code className="h-4 w-4" />
                  <span>Daily</span>
                </TabsTrigger>
                <TabsTrigger value="weekly" className="flex items-center gap-1">
                  <Brain className="h-4 w-4" />
                  <span>Weekly</span>
                </TabsTrigger>
                <TabsTrigger value="monthly" className="flex items-center gap-1">
                  <Puzzle className="h-4 w-4" />
                  <span>Monthly</span>
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="daily">
              <div className="mb-6 flex justify-between items-center">
                <h3 className="text-2xl font-bold flex items-center">
                  <Code className="mr-2 h-5 w-5 text-indigo-600" />
                  Daily Challenges
                </h3>
                <Badge variant="outline" className="px-3 py-1">
                  Refreshes in 16:45:32
                </Badge>
              </div>
              {renderChallengeCards(challenges.daily)}
            </TabsContent>
            
            <TabsContent value="weekly">
              <div className="mb-6 flex justify-between items-center">
                <h3 className="text-2xl font-bold flex items-center">
                  <Brain className="mr-2 h-5 w-5 text-indigo-600" />
                  Weekly Challenges
                </h3>
                <Badge variant="outline" className="px-3 py-1">
                  Refreshes in 3 days
                </Badge>
              </div>
              {renderChallengeCards(challenges.weekly)}
            </TabsContent>
            
            <TabsContent value="monthly">
              <div className="mb-6 flex justify-between items-center">
                <h3 className="text-2xl font-bold flex items-center">
                  <Puzzle className="mr-2 h-5 w-5 text-indigo-600" />
                  Monthly Challenges
                </h3>
                <Badge variant="outline" className="px-3 py-1">
                  Refreshes in 16 days
                </Badge>
              </div>
              {renderChallengeCards(challenges.monthly)}
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trophy className="mr-2 h-5 w-5 text-amber-600" />
                Challenge Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                See how you stack up against other students tackling the same challenges.
                Climb the ranks and earn exclusive rewards!
              </p>
              <Button variant="outline" className="border-amber-300 text-amber-800 hover:bg-amber-200 hover:text-amber-900">
                View Leaderboard
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="mr-2 h-5 w-5 text-indigo-600" />
                Your Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                You've earned 14 badges and completed 28 challenges.
                View your collection and share your success!
              </p>
              <Button variant="outline" className="border-indigo-300 text-indigo-800 hover:bg-indigo-200 hover:text-indigo-900">
                See Achievements
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ChallengesPage;
