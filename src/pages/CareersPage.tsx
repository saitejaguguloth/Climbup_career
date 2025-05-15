
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Briefcase, TrendingUp, BookOpen } from "lucide-react";

const CareersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSalary, setSelectedSalary] = useState<string>("all");
  
  // Sample career data
  const careerPaths = [
    {
      id: 1,
      title: "Software Developer",
      company: "Tech Solutions Inc.",
      location: "Bangalore, India",
      salary: "₹8L - ₹15L /year",
      experience: "1-3 years",
      description: "Join our team as a Software Developer where you'll work on cutting-edge technologies to build scalable applications. The role involves collaborating with cross-functional teams to deliver high-quality software solutions.",
      skills: ["React", "JavaScript", "Node.js", "MongoDB"],
      applicationDeadline: "2023-06-30",
      category: "technology",
      salaryRange: "8-15"
    },
    {
      id: 2,
      title: "Frontend Developer",
      company: "Infotech Services",
      location: "Delhi, India",
      salary: "₹6L - ₹12L /year",
      experience: "0-2 years",
      description: "We're looking for a passionate Frontend Developer who loves creating intuitive user interfaces. You'll be responsible for implementing visual elements that users interact with on our web applications.",
      skills: ["HTML", "CSS", "JavaScript", "React", "UI/UX"],
      applicationDeadline: "2023-07-15",
      category: "technology",
      salaryRange: "6-12"
    },
    {
      id: 3,
      title: "Data Scientist",
      company: "Analytics Plus",
      location: "Hyderabad, India",
      salary: "₹10L - ₹18L /year",
      experience: "2-5 years",
      description: "Join our data science team to analyze complex data sets and develop machine learning models. You'll work on projects that involve statistical analysis, predictive modeling, and data visualization.",
      skills: ["Python", "Machine Learning", "SQL", "Statistics", "Data Visualization"],
      applicationDeadline: "2023-08-01",
      category: "data",
      salaryRange: "10-18"
    },
    {
      id: 4,
      title: "Marketing Manager",
      company: "Global Brands Ltd.",
      location: "Mumbai, India",
      salary: "₹12L - ₹20L /year",
      experience: "3-6 years",
      description: "Lead our marketing efforts to increase brand visibility and customer engagement. You'll develop marketing strategies, manage campaigns, and analyze performance metrics.",
      skills: ["Digital Marketing", "Content Strategy", "SEO", "Social Media", "Analytics"],
      applicationDeadline: "2023-07-10",
      category: "marketing",
      salaryRange: "12-20"
    },
    {
      id: 5,
      title: "UX/UI Designer",
      company: "Creative Solutions",
      location: "Pune, India",
      salary: "₹8L - ₹14L /year",
      experience: "2-4 years",
      description: "Design intuitive user experiences for web and mobile applications. You'll work closely with product managers and developers to create wireframes, prototypes, and visual designs.",
      skills: ["Figma", "Adobe XD", "Sketch", "User Research", "Prototyping"],
      applicationDeadline: "2023-07-25",
      category: "design",
      salaryRange: "8-14"
    },
    {
      id: 6,
      title: "Operations Manager",
      company: "Logistics Pro",
      location: "Chennai, India",
      salary: "₹15L - ₹25L /year",
      experience: "5-8 years",
      description: "Oversee daily operations and implement strategies to improve efficiency. You'll manage teams, coordinate resources, and ensure smooth workflow across departments.",
      skills: ["Operations Management", "Team Leadership", "Process Optimization", "Supply Chain"],
      applicationDeadline: "2023-08-15",
      category: "operations",
      salaryRange: "15-25"
    }
  ];
  
  // Filtered career paths
  const filteredCareers = careerPaths.filter(career => {
    const matchesSearch = career.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          career.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || career.category === selectedCategory;
    
    let matchesSalary = true;
    if (selectedSalary === "0-10") {
      const [min] = career.salaryRange.split("-").map(s => parseInt(s));
      matchesSalary = min < 10;
    } else if (selectedSalary === "10-15") {
      const [min, max] = career.salaryRange.split("-").map(s => parseInt(s));
      matchesSalary = min >= 10 && max <= 15;
    } else if (selectedSalary === "15+") {
      const [min] = career.salaryRange.split("-").map(s => parseInt(s));
      matchesSalary = min >= 15;
    }
    
    return matchesSearch && matchesCategory && matchesSalary;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Explore <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">Career Paths</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover various career opportunities and find the perfect path for your skills and interests.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white/80 backdrop-blur-md shadow-md rounded-xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search careers or companies"
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="data">Data Science</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="operations">Operations</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={selectedSalary} onValueChange={setSelectedSalary}>
              <SelectTrigger>
                <SelectValue placeholder="Salary Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Salary Ranges</SelectItem>
                <SelectItem value="0-10">Below ₹10L</SelectItem>
                <SelectItem value="10-15">₹10L - ₹15L</SelectItem>
                <SelectItem value="15+">Above ₹15L</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Career Listings */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Available Careers</h2>
            
            {filteredCareers.length > 0 ? (
              <div className="space-y-6">
                {filteredCareers.map(career => (
                  <Card key={career.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl">{career.title}</CardTitle>
                          <CardDescription className="text-base">{career.company} • {career.location}</CardDescription>
                        </div>
                        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          {career.salary}
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pb-2">
                      <p className="text-gray-700 mb-4">{career.description}</p>
                      
                      <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-2">Required Skills:</p>
                        <div className="flex flex-wrap gap-2">
                          {career.skills.map((skill, index) => (
                            <span 
                              key={index} 
                              className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded-md text-xs"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>Experience: {career.experience}</span>
                        <span>Apply by: {career.applicationDeadline}</span>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="pt-2">
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600">View Details</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="bg-white/80 backdrop-blur-md rounded-xl p-8 text-center">
                <div className="text-gray-400 mb-3">
                  <Search className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-xl font-medium mb-2">No careers found</h3>
                <p className="text-gray-600">
                  Try adjusting your search or filter criteria to find more opportunities.
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Career Resources */}
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  Career Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 bg-blue-100 p-1 rounded-full">
                      <BookOpen className="h-3 w-3 text-blue-600" />
                    </div>
                    <span className="text-sm text-gray-700">Guide to Software Engineering Careers</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 bg-blue-100 p-1 rounded-full">
                      <BookOpen className="h-3 w-3 text-blue-600" />
                    </div>
                    <span className="text-sm text-gray-700">How to Prepare for Technical Interviews</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 bg-blue-100 p-1 rounded-full">
                      <BookOpen className="h-3 w-3 text-blue-600" />
                    </div>
                    <span className="text-sm text-gray-700">Resume Building Masterclass</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full mt-4">
                  View All Resources
                </Button>
              </CardContent>
            </Card>
            
            {/* Career Trends */}
            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                  Trending Careers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex justify-between items-center">
                    <span className="text-sm font-medium">Data Scientist</span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">+24%</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-sm font-medium">Full-Stack Developer</span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">+18%</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-sm font-medium">UX Designer</span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">+15%</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            {/* Salary Guide */}
            <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-amber-600" />
                  Salary Guide
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex justify-between items-center">
                    <span className="text-sm font-medium">Entry Level</span>
                    <span className="text-sm">₹4L - ₹8L</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-sm font-medium">Mid Level</span>
                    <span className="text-sm">₹8L - ₹18L</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-sm font-medium">Senior Level</span>
                    <span className="text-sm">₹18L - ₹35L+</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full mt-4">
                  Compare Salaries
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareersPage;
