
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Briefcase, TrendingUp, BookOpen, Calendar, MapPin, Award } from "lucide-react";
import { NeonTitle, NeonButton, NeonCard, NeonIcon } from "@/components/ui/neon-elements";

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
    <div className="min-h-screen py-16 px-4 relative">
      {/* Background blurry elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-neon-yellow rounded-full mix-blend-overlay filter blur-3xl opacity-5 animate-blob"></div>
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-neon-teal rounded-full mix-blend-overlay filter blur-3xl opacity-5 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-neon-orange rounded-full mix-blend-overlay filter blur-3xl opacity-5 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-10">
          <NeonTitle size="2xl" color="yellow" className="mb-4">
            Explore <span className="text-neon-teal">Career Paths</span>
          </NeonTitle>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Discover various career opportunities and find the perfect path for your skills and interests.
          </p>
        </div>

        {/* Search and Filter Section */}
        <NeonCard color="yellow" className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={18} />
              <Input
                placeholder="Search careers or companies"
                className="pl-10 bg-black/20 border-white/20 text-white placeholder:text-white/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="bg-black/20 border-white/20 text-white">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-black border-white/20">
                <SelectItem value="all" className="text-white">All Categories</SelectItem>
                <SelectItem value="technology" className="text-white">Technology</SelectItem>
                <SelectItem value="data" className="text-white">Data Science</SelectItem>
                <SelectItem value="marketing" className="text-white">Marketing</SelectItem>
                <SelectItem value="design" className="text-white">Design</SelectItem>
                <SelectItem value="operations" className="text-white">Operations</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={selectedSalary} onValueChange={setSelectedSalary}>
              <SelectTrigger className="bg-black/20 border-white/20 text-white">
                <SelectValue placeholder="Salary Range" />
              </SelectTrigger>
              <SelectContent className="bg-black border-white/20">
                <SelectItem value="all" className="text-white">All Salary Ranges</SelectItem>
                <SelectItem value="0-10" className="text-white">Below ₹10L</SelectItem>
                <SelectItem value="10-15" className="text-white">₹10L - ₹15L</SelectItem>
                <SelectItem value="15+" className="text-white">Above ₹15L</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </NeonCard>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Career Listings */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4 text-white">Available Careers</h2>
            
            {filteredCareers.length > 0 ? (
              <div className="space-y-6">
                {filteredCareers.map(career => (
                  <NeonCard key={career.id} color="teal" className="transition-all hover:shadow-lg">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl text-white">{career.title}</CardTitle>
                          <CardDescription className="text-base text-white/70 flex items-center">
                            <Briefcase className="mr-1 h-4 w-4" />
                            {career.company} • 
                            <MapPin className="ml-2 mr-1 h-4 w-4" />
                            {career.location}
                          </CardDescription>
                        </div>
                        <Badge className="bg-neon-yellow/20 text-neon-yellow border-neon-yellow/50">
                          {career.salary}
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pb-2">
                      <p className="text-white/80 mb-4">{career.description}</p>
                      
                      <div className="mb-4">
                        <p className="text-sm text-white/60 mb-2">Required Skills:</p>
                        <div className="flex flex-wrap gap-2">
                          {career.skills.map((skill, index) => (
                            <Badge 
                              key={index} 
                              variant="outline"
                              className="bg-neon-teal/20 text-neon-teal border-neon-teal/50"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex justify-between text-sm text-white/60">
                        <span className="flex items-center">
                          <Award className="mr-1 h-4 w-4" />
                          Experience: {career.experience}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="mr-1 h-4 w-4" />
                          Apply by: {career.applicationDeadline}
                        </span>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="pt-2">
                      <NeonButton color="teal" className="w-full">View Details</NeonButton>
                    </CardFooter>
                  </NeonCard>
                ))}
              </div>
            ) : (
              <NeonCard color="orange" className="text-center p-8">
                <NeonIcon color="orange" size="lg" className="mx-auto mb-4">
                  <Search className="h-12 w-12" />
                </NeonIcon>
                <h3 className="text-xl font-medium mb-2 text-white">No careers found</h3>
                <p className="text-white/70">
                  Try adjusting your search or filter criteria to find more opportunities.
                </p>
              </NeonCard>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Career Resources */}
            <NeonCard color="yellow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <NeonIcon color="yellow" size="sm">
                    <BookOpen className="h-5 w-5" />
                  </NeonIcon>
                  Career Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start text-white/80">
                    <div className="mr-2 mt-1 bg-neon-yellow/20 p-1 rounded-full">
                      <BookOpen className="h-3 w-3 text-neon-yellow" />
                    </div>
                    <span className="text-sm">Guide to Software Engineering Careers</span>
                  </li>
                  <li className="flex items-start text-white/80">
                    <div className="mr-2 mt-1 bg-neon-yellow/20 p-1 rounded-full">
                      <BookOpen className="h-3 w-3 text-neon-yellow" />
                    </div>
                    <span className="text-sm">How to Prepare for Technical Interviews</span>
                  </li>
                  <li className="flex items-start text-white/80">
                    <div className="mr-2 mt-1 bg-neon-yellow/20 p-1 rounded-full">
                      <BookOpen className="h-3 w-3 text-neon-yellow" />
                    </div>
                    <span className="text-sm">Resume Building Masterclass</span>
                  </li>
                </ul>
                <NeonButton variant="outline" color="yellow" className="w-full mt-4">
                  View All Resources
                </NeonButton>
              </CardContent>
            </NeonCard>
            
            {/* Career Trends */}
            <NeonCard color="teal">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <NeonIcon color="teal" size="sm">
                    <TrendingUp className="h-5 w-5" />
                  </NeonIcon>
                  Trending Careers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex justify-between items-center">
                    <span className="text-sm font-medium text-white">Data Scientist</span>
                    <Badge className="bg-green-500/20 text-green-400 border-green-400">+24%</Badge>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-sm font-medium text-white">Full-Stack Developer</span>
                    <Badge className="bg-green-500/20 text-green-400 border-green-400">+18%</Badge>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-sm font-medium text-white">UX Designer</span>
                    <Badge className="bg-green-500/20 text-green-400 border-green-400">+15%</Badge>
                  </li>
                </ul>
              </CardContent>
            </NeonCard>
            
            {/* Salary Guide */}
            <NeonCard color="orange">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <NeonIcon color="orange" size="sm">
                    <Briefcase className="h-5 w-5" />
                  </NeonIcon>
                  Salary Guide
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex justify-between items-center">
                    <span className="text-sm font-medium text-white">Entry Level</span>
                    <span className="text-sm text-white/70">₹4L - ₹8L</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-sm font-medium text-white">Mid Level</span>
                    <span className="text-sm text-white/70">₹8L - ₹18L</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-sm font-medium text-white">Senior Level</span>
                    <span className="text-sm text-white/70">₹18L - ₹35L+</span>
                  </li>
                </ul>
                <NeonButton variant="outline" color="orange" className="w-full mt-4">
                  Compare Salaries
                </NeonButton>
              </CardContent>
            </NeonCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareersPage;
