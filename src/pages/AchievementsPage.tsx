
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Award, Trophy, Star, CheckCircle2, Code, Brain, Puzzle } from "lucide-react";

const AchievementsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("badges");
  
  // Mock achievements data
  const achievements = {
    badges: [
      {
        id: 1,
        title: "JavaScript Master",
        description: "Complete all JavaScript challenges",
        category: "Programming",
        progress: 60,
        unlocked: true,
        image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?q=80&w=1470&auto=format&fit=crop",
      },
      {
        id: 2,
        title: "Python Explorer",
        description: "Complete 5 Python challenges",
        category: "Programming",
        progress: 40,
        unlocked: false,
        image: "https://images.unsplash.com/photo-1526379879527-8559ecfcb970?q=80&w=1374&auto=format&fit=crop",
      },
      {
        id: 3,
        title: "Daily Challenger",
        description: "Complete challenges for 7 consecutive days",
        category: "Engagement",
        progress: 100,
        unlocked: true,
        image: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?q=80&w=1468&auto=format&fit=crop",
      },
      {
        id: 4,
        title: "Team Player",
        description: "Complete 3 multiplayer challenges",
        category: "Social",
        progress: 66,
        unlocked: false,
        image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=1470&auto=format&fit=crop",
      },
      {
        id: 5,
        title: "Web Dev Guru",
        description: "Master HTML, CSS, and JavaScript challenges",
        category: "Programming",
        progress: 80,
        unlocked: true,
        image: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?q=80&w=1470&auto=format&fit=crop",
      },
      {
        id: 6,
        title: "Data Science Enthusiast",
        description: "Complete 10 data-related challenges",
        category: "Data Science",
        progress: 30,
        unlocked: false,
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop",
      }
    ],
    certificates: [
      {
        id: 1,
        title: "Frontend Development Mastery",
        description: "Completed the comprehensive frontend development track",
        issueDate: "May 15, 2023",
        image: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?q=80&w=1470&auto=format&fit=crop",
      },
      {
        id: 2,
        title: "JavaScript Foundations",
        description: "Demonstrated proficiency in core JavaScript concepts",
        issueDate: "March 3, 2023",
        image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?q=80&w=1470&auto=format&fit=crop",
      }
    ],
    stats: {
      challengesCompleted: 28,
      totalXp: 4850,
      longestStreak: 14,
      currentStreak: 7,
      averageScore: 87,
      skillBreakdown: [
        { name: "JavaScript", value: 75 },
        { name: "Python", value: 45 },
        { name: "Data Science", value: 30 },
        { name: "Web Development", value: 80 },
        { name: "System Design", value: 25 }
      ]
    }
  };

  // Render badge cards
  const renderBadgeCards = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.badges.map((badge) => (
          <Card 
            key={badge.id} 
            className={`overflow-hidden hover:shadow-lg transition-all duration-300 ${
              badge.unlocked ? "bg-white" : "bg-gray-50"
            }`}
          >
            <div className="relative h-40">
              <img 
                src={badge.image} 
                alt={badge.title} 
                className={`h-full w-full object-cover ${
                  !badge.unlocked ? "grayscale opacity-50" : ""
                }`}
              />
              <div className="absolute top-2 right-2">
                <Badge className={`${
                  badge.category === "Programming" ? "bg-blue-600" :
                  badge.category === "Engagement" ? "bg-green-600" :
                  badge.category === "Social" ? "bg-purple-600" :
                  badge.category === "Data Science" ? "bg-amber-600" :
                  "bg-indigo-600"
                }`}>
                  {badge.category}
                </Badge>
              </div>
              {badge.unlocked && (
                <div className="absolute bottom-2 right-2">
                  <Badge variant="outline" className="bg-white border-white">
                    <Award className="h-4 w-4 mr-1 text-amber-500" />
                    Unlocked
                  </Badge>
                </div>
              )}
            </div>
            
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center">
                  {badge.unlocked && <Trophy className="h-4 w-4 mr-2 text-amber-500" />}
                  {badge.title}
                </CardTitle>
              </div>
              <CardDescription>{badge.description}</CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span className="font-medium">{badge.progress}%</span>
                </div>
                <Progress value={badge.progress} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  // Render certificate cards
  const renderCertificateCards = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {achievements.certificates.map((certificate) => (
          <Card 
            key={certificate.id} 
            className="overflow-hidden hover:shadow-lg transition-all duration-300"
          >
            <div className="relative h-40">
              <img 
                src={certificate.image} 
                alt={certificate.title} 
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                <h3 className="text-white text-xl font-bold">{certificate.title}</h3>
              </div>
            </div>
            
            <CardContent className="pt-4">
              <p className="text-gray-600 mb-2">{certificate.description}</p>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">Issued: {certificate.issueDate}</p>
                <Button variant="outline" size="sm">View Certificate</Button>
              </div>
            </CardContent>
          </Card>
        ))}
        
        <Card className="flex items-center justify-center p-8 border-dashed">
          <div className="text-center">
            <Award className="mx-auto h-10 w-10 text-gray-400 mb-2" />
            <h3 className="font-medium text-lg mb-1">Keep Learning!</h3>
            <p className="text-gray-500 text-sm mb-4">Complete more challenges to earn certificates</p>
            <Button variant="outline">Explore Challenges</Button>
          </div>
        </Card>
      </div>
    );
  };

  // Render stats content
  const renderStatsContent = () => {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                Challenges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{achievements.stats.challengesCompleted}</p>
              <p className="text-sm text-gray-600">Completed</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Trophy className="h-5 w-5 text-amber-500" />
                XP Earned
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{achievements.stats.totalXp}</p>
              <p className="text-sm text-gray-600">Total points</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Star className="h-5 w-5 text-blue-500" />
                Best Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{achievements.stats.longestStreak}</p>
              <p className="text-sm text-gray-600">Days in a row</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Award className="h-5 w-5 text-purple-500" />
                Avg. Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{achievements.stats.averageScore}%</p>
              <p className="text-sm text-gray-600">Challenge scores</p>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Skill Breakdown</CardTitle>
            <CardDescription>Your proficiency in different areas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {achievements.stats.skillBreakdown.map((skill) => (
                <div key={skill.name} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{skill.name}</span>
                    <span className="font-medium">{skill.value}%</span>
                  </div>
                  <Progress value={skill.value} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
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
        {/* Back button */}
        <Button 
          variant="ghost" 
          className="mb-6 flex items-center gap-2" 
          onClick={() => navigate("/challenges")}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Challenges
        </Button>
        
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center">
            <Award className="h-8 w-8 mr-3 text-amber-500" />
            Your <span className="bg-gradient-to-r from-indigo-600 to-blue-600 text-transparent bg-clip-text mx-2">Achievements</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Track your progress, showcase your skills, and celebrate your learning journey.
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur rounded-xl p-6 shadow-lg mb-10">
          <Tabs defaultValue="badges" className="w-full" onValueChange={setActiveTab}>
            <div className="flex justify-center mb-8">
              <TabsList className="grid grid-cols-3 w-full max-w-md">
                <TabsTrigger value="badges" className="flex items-center gap-1">
                  <Trophy className="h-4 w-4" />
                  <span>Badges</span>
                </TabsTrigger>
                <TabsTrigger value="certificates" className="flex items-center gap-1">
                  <Award className="h-4 w-4" />
                  <span>Certificates</span>
                </TabsTrigger>
                <TabsTrigger value="stats" className="flex items-center gap-1">
                  <Star className="h-4 w-4" />
                  <span>Stats</span>
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="badges">
              <div className="mb-6 flex justify-between items-center">
                <h3 className="text-2xl font-bold flex items-center">
                  <Trophy className="mr-2 h-5 w-5 text-amber-600" />
                  Your Badges
                </h3>
                <Badge variant="outline" className="px-3 py-1">
                  {achievements.badges.filter(badge => badge.unlocked).length}/{achievements.badges.length} Unlocked
                </Badge>
              </div>
              {renderBadgeCards()}
            </TabsContent>
            
            <TabsContent value="certificates">
              <div className="mb-6 flex justify-between items-center">
                <h3 className="text-2xl font-bold flex items-center">
                  <Award className="mr-2 h-5 w-5 text-indigo-600" />
                  Your Certificates
                </h3>
                <Badge variant="outline" className="px-3 py-1">
                  {achievements.certificates.length} Earned
                </Badge>
              </div>
              {renderCertificateCards()}
            </TabsContent>
            
            <TabsContent value="stats">
              <div className="mb-6 flex justify-between items-center">
                <h3 className="text-2xl font-bold flex items-center">
                  <Star className="mr-2 h-5 w-5 text-blue-600" />
                  Your Learning Stats
                </h3>
                <Badge variant="secondary" className="px-3 py-1 bg-blue-100 text-blue-800">
                  Current Streak: {achievements.stats.currentStreak} days
                </Badge>
              </div>
              {renderStatsContent()}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AchievementsPage;
