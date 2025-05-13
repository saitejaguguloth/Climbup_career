
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Search, TrendingUp, Briefcase, BookOpen, 
  ChevronRight, ArrowRight, BarChart2, Code, 
  PieChart, Microscope, Server, Globe, Palette
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const CareersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const careerCategories = [
    {
      id: "tech",
      name: "Technology",
      icon: Code,
      color: "text-blue-500",
      bgColor: "bg-blue-100"
    },
    {
      id: "data",
      name: "Data Science",
      icon: BarChart2,
      color: "text-purple-500",
      bgColor: "bg-purple-100"
    },
    {
      id: "science",
      name: "Science & Research",
      icon: Microscope,
      color: "text-emerald-500",
      bgColor: "bg-emerald-100"
    },
    {
      id: "business",
      name: "Business & Finance",
      icon: PieChart,
      color: "text-amber-500",
      bgColor: "bg-amber-100"
    },
    {
      id: "engineering",
      name: "Engineering",
      icon: Server,
      color: "text-red-500",
      bgColor: "bg-red-100"
    },
    {
      id: "creative",
      name: "Creative & Design",
      icon: Palette,
      color: "text-pink-500",
      bgColor: "bg-pink-100"
    }
  ];
  
  // Sample careers data
  const careers = [
    {
      id: 1,
      title: "Software Engineer",
      category: "tech",
      demand: "High",
      avgSalary: "₹8-25 LPA",
      growth: "20%",
      description: "Design, develop and maintain software systems and applications.",
      skills: ["Programming", "DSA", "System Design", "Development Frameworks"],
      educationPath: "BTech/BE in Computer Science, MCA, or related field",
      image: "https://images.unsplash.com/photo-1573495627361-d9864d87bde4?q=80&w=1469&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Data Scientist",
      category: "data",
      demand: "Very High",
      avgSalary: "₹10-30 LPA",
      growth: "35%",
      description: "Analyze complex data to help organizations make better decisions.",
      skills: ["Machine Learning", "Statistics", "Python/R", "Data Visualization"],
      educationPath: "BTech/BE, MTech or PhD in Computer Science, Statistics or related field",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "UX/UI Designer",
      category: "creative",
      demand: "High",
      avgSalary: "₹6-20 LPA",
      growth: "22%",
      description: "Create intuitive, aesthetically pleasing interfaces for websites and applications.",
      skills: ["Visual Design", "User Research", "Wireframing", "Prototyping"],
      educationPath: "Degree in Design, HCI, or related field",
      image: "https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=1471&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "Machine Learning Engineer",
      category: "tech",
      demand: "Very High",
      avgSalary: "₹12-35 LPA",
      growth: "40%",
      description: "Build and deploy ML models and systems to solve real-world problems.",
      skills: ["Machine Learning", "Deep Learning", "Python", "TensorFlow/PyTorch"],
      educationPath: "BTech/BE, MTech or PhD in Computer Science, AI or related field",
      image: "https://images.unsplash.com/photo-1591453089816-0fbb971b454c?q=80&w=1470&auto=format&fit=crop"
    },
    {
      id: 5,
      title: "Product Manager",
      category: "business",
      demand: "High",
      avgSalary: "₹15-40 LPA",
      growth: "25%",
      description: "Lead product development from conception to launch and beyond.",
      skills: ["Business Strategy", "User Empathy", "Data Analysis", "Cross-functional Leadership"],
      educationPath: "BTech/BE, MBA or related business degree",
      image: "https://images.unsplash.com/photo-1559523161-0fc0d8b38a77?q=80&w=1473&auto=format&fit=crop"
    },
    {
      id: 6,
      title: "Biomedical Engineer",
      category: "science",
      demand: "Medium",
      avgSalary: "₹7-18 LPA",
      growth: "18%",
      description: "Design and develop medical systems, devices, and equipment.",
      skills: ["Biomedical Principles", "Medical Device Design", "Clinical Evaluation"],
      educationPath: "BTech/BE, MTech in Biomedical Engineering or related field",
      image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=1480&auto=format&fit=crop"
    }
  ];
  
  const trendingCareers = careers.filter(career => 
    career.demand === "Very High" || career.growth.replace("%", "") > 25
  );
  
  const filteredCareers = searchTerm 
    ? careers.filter(career => 
        career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        career.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : careers;
  
  return (
    <div className="min-h-screen py-16 px-4 relative">
      {/* Background blurry elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/3 left-1/2 w-72 h-72 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Explore <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">Careers</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover exciting career paths, required skills, and educational journeys to reach your goals.
          </p>
        </div>
        
        <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 mb-10 shadow-md">
          <div className="flex flex-col md:flex-row gap-4 md:items-center">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                placeholder="Search careers, skills or interests..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600">
              <Search className="mr-2 h-4 w-4" /> Explore Careers
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-6">
            {careerCategories.map((category) => (
              <Button 
                key={category.id}
                variant="outline" 
                className="h-auto py-4 flex flex-col items-center justify-center gap-2 hover:border-blue-300 hover:bg-blue-50"
              >
                <div className={`p-2 rounded-full ${category.bgColor}`}>
                  <category.icon className={`h-5 w-5 ${category.color}`} />
                </div>
                <span>{category.name}</span>
              </Button>
            ))}
          </div>
        </div>
        
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold flex items-center">
              <TrendingUp className="mr-2 h-6 w-6 text-blue-500" /> Trending Careers
            </h2>
            <Button variant="ghost" className="flex items-center text-blue-600">
              View All <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingCareers.map((career) => (
              <Card key={career.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-white/90 backdrop-blur">
                <div>
                  <AspectRatio ratio={16/9}>
                    <img 
                      src={career.image} 
                      alt={career.title}
                      className="object-cover w-full h-full"
                    />
                  </AspectRatio>
                </div>
                
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{career.title}</CardTitle>
                    <Badge variant={
                      career.demand === "Very High" 
                        ? "default" 
                        : career.demand === "High"
                          ? "secondary"
                          : "outline"
                    }>
                      {career.demand} Demand
                    </Badge>
                  </div>
                  <CardDescription className="flex items-center mt-1">
                    <TrendingUp className="mr-1 h-3 w-3 text-green-600" /> 
                    {career.growth} growth expected
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <p className="text-gray-600 mb-3">{career.description}</p>
                  <div>
                    <div className="text-sm font-medium mb-1">Key Skills:</div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {career.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="bg-blue-50">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <div className="text-sm font-medium mb-1">Avg. Salary:</div>
                    <div className="text-sm text-gray-600">{career.avgSalary}</div>
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600">
                    Explore Career Path <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-md overflow-hidden mb-12">
          <Tabs defaultValue="all" className="w-full">
            <div className="bg-gray-50 px-6 py-4 border-b">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <TabsTrigger value="all" className="flex items-center">
                  <Globe className="mr-2 h-4 w-4" /> All Careers
                </TabsTrigger>
                <TabsTrigger value="tech" className="flex items-center">
                  <Code className="mr-2 h-4 w-4" /> Technology
                </TabsTrigger>
                <TabsTrigger value="data" className="flex items-center">
                  <BarChart2 className="mr-2 h-4 w-4" /> Data Science
                </TabsTrigger>
                <TabsTrigger value="business" className="flex items-center">
                  <PieChart className="mr-2 h-4 w-4" /> Business
                </TabsTrigger>
              </TabsList>
            </div>
            
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Briefcase className="mr-2 h-6 w-6 text-gray-700" /> 
                {searchTerm ? `Search Results: ${filteredCareers.length} careers found` : 'All Career Paths'}
              </h2>
              
              <div className="grid grid-cols-1 gap-4">
                {filteredCareers.map((career) => (
                  <Card key={career.id} className="overflow-hidden border-l-4 border-l-blue-500">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/4 lg:w-1/5">
                        <AspectRatio ratio={4/3} className="h-full">
                          <img 
                            src={career.image} 
                            alt={career.title}
                            className="object-cover w-full h-full"
                          />
                        </AspectRatio>
                      </div>
                      
                      <div className="p-4 md:p-6 flex-grow">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-2">
                          <div>
                            <h3 className="text-xl font-bold">{career.title}</h3>
                            <p className="text-gray-600">{career.description}</p>
                          </div>
                          <div className="flex gap-2">
                            <Badge variant={
                              career.demand === "Very High" 
                                ? "default" 
                                : career.demand === "High"
                                  ? "secondary"
                                  : "outline"
                            }>
                              {career.demand} Demand
                            </Badge>
                            <Badge variant="outline" className="flex items-center whitespace-nowrap">
                              <TrendingUp className="mr-1 h-3 w-3" /> 
                              {career.growth}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                          <div>
                            <div className="text-sm font-medium text-gray-500">Key Skills</div>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {career.skills.slice(0, 3).map((skill, index) => (
                                <Badge key={index} variant="outline" className="bg-blue-50">
                                  {skill}
                                </Badge>
                              ))}
                              {career.skills.length > 3 && (
                                <Badge variant="outline">+{career.skills.length - 3}</Badge>
                              )}
                            </div>
                          </div>
                          
                          <div>
                            <div className="text-sm font-medium text-gray-500">Education Path</div>
                            <div className="text-sm mt-1">{career.educationPath}</div>
                          </div>
                          
                          <div>
                            <div className="text-sm font-medium text-gray-500">Avg. Salary</div>
                            <div className="font-semibold mt-1">{career.avgSalary}</div>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex justify-end">
                          <Button className="bg-gradient-to-r from-blue-600 to-indigo-600">
                            <BookOpen className="mr-2 h-4 w-4" /> View Career Roadmap
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
                
                {filteredCareers.length === 0 && (
                  <div className="text-center py-10">
                    <h3 className="text-xl font-semibold mb-2">No careers found</h3>
                    <p className="text-gray-600">Try adjusting your search terms</p>
                  </div>
                )}
              </div>
            </div>
          </Tabs>
        </div>
        
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Not sure which career is right for you?</h3>
              <p className="opacity-90">
                Take our career assessment quiz and discover the perfect path based on your interests and strengths.
              </p>
            </div>
            <Button variant="secondary" className="whitespace-nowrap">
              Take Career Quiz
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CareersPage;
