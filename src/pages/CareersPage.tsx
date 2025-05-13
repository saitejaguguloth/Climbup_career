import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Briefcase, Search, MapPin, Building, DollarSign, Clock, Filter, Bookmark, Share2, ExternalLink, ChevronDown, ChevronUp, Star, Heart } from "lucide-react";

const CareersPage = () => {
  const [activeTab, setActiveTab] = useState("explore");
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [salaryRange, setSalaryRange] = useState([50000]);
  const [experienceLevel, setExperienceLevel] = useState("");
  const [jobType, setJobType] = useState("");
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [savedJobs, setSavedJobs] = useState([]);
  const [expandedJob, setExpandedJob] = useState(null);

  // Sample job data
  const jobs = [
    {
      id: 1,
      title: "Software Engineer",
      company: "TechCorp Solutions",
      location: "Bangalore, India",
      salary: 120000,
      experience: "3-5 years",
      type: "Full-time",
      remote: true,
      description: "We are looking for a skilled Software Engineer to join our dynamic team. You will be responsible for developing high-quality applications, collaborating with cross-functional teams, and contributing to all phases of the software development lifecycle.",
      requirements: [
        "Bachelor's degree in Computer Science or related field",
        "3+ years of experience in software development",
        "Proficiency in JavaScript, React, and Node.js",
        "Experience with cloud platforms (AWS, Azure, or GCP)",
        "Strong problem-solving skills and attention to detail"
      ],
      postedDate: "2 days ago",
      logo: "https://images.unsplash.com/photo-1549921296-3b0f9a35af35?q=80&w=1476&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Data Scientist",
      company: "Analytics Innovate",
      location: "Remote",
      salary: 140000,
      experience: "2-4 years",
      type: "Full-time",
      remote: true,
      description: "Join our data science team to build machine learning models and extract valuable insights from complex datasets. You'll work on challenging problems and help drive data-informed decision making across the organization.",
      requirements: [
        "Master's or PhD in Data Science, Statistics, or related field",
        "Experience with Python, R, and SQL",
        "Knowledge of machine learning algorithms and statistical modeling",
        "Familiarity with data visualization tools",
        "Strong analytical and problem-solving skills"
      ],
      postedDate: "1 week ago",
      logo: "https://images.unsplash.com/photo-1568952433726-3896e3881c65?q=80&w=1470&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Product Manager",
      company: "InnovateTech",
      location: "Hyderabad, India",
      salary: 130000,
      experience: "4-6 years",
      type: "Full-time",
      remote: false,
      description: "We're seeking an experienced Product Manager to lead the development of our flagship product. You'll work closely with engineering, design, and marketing teams to define product strategy and roadmap.",
      requirements: [
        "Bachelor's degree in Business, Computer Science, or related field",
        "4+ years of product management experience",
        "Strong understanding of software development lifecycle",
        "Excellent communication and leadership skills",
        "Experience with agile methodologies"
      ],
      postedDate: "3 days ago",
      logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=1473&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "UX/UI Designer",
      company: "DesignHub Creative",
      location: "Mumbai, India",
      salary: 90000,
      experience: "2-5 years",
      type: "Full-time",
      remote: true,
      description: "Join our creative team to design beautiful, intuitive user experiences for web and mobile applications. You'll collaborate with product managers and developers to create designs that delight users.",
      requirements: [
        "Bachelor's degree in Design, HCI, or related field",
        "Portfolio demonstrating strong UI/UX design skills",
        "Proficiency in design tools like Figma, Sketch, or Adobe XD",
        "Understanding of user-centered design principles",
        "Experience with design systems and component libraries"
      ],
      postedDate: "1 week ago",
      logo: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1528&auto=format&fit=crop"
    },
    {
      id: 5,
      title: "DevOps Engineer",
      company: "CloudTech Systems",
      location: "Delhi, India",
      salary: 110000,
      experience: "3-6 years",
      type: "Full-time",
      remote: true,
      description: "We're looking for a DevOps Engineer to help us build and maintain our cloud infrastructure. You'll work on automating deployment processes, improving system reliability, and optimizing performance.",
      requirements: [
        "Bachelor's degree in Computer Science or related field",
        "Experience with cloud platforms (AWS, Azure, or GCP)",
        "Knowledge of infrastructure as code tools (Terraform, CloudFormation)",
        "Experience with CI/CD pipelines",
        "Familiarity with containerization technologies (Docker, Kubernetes)"
      ],
      postedDate: "5 days ago",
      logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop"
    },
    {
      id: 6,
      title: "Frontend Developer",
      company: "WebSolutions Inc",
      location: "Pune, India",
      salary: 85000,
      experience: "1-3 years",
      type: "Contract",
      remote: true,
      description: "Join our frontend team to build responsive, performant web applications. You'll work with modern JavaScript frameworks to create engaging user interfaces.",
      requirements: [
        "Bachelor's degree in Computer Science or related field",
        "Experience with React, Vue, or Angular",
        "Strong HTML, CSS, and JavaScript skills",
        "Knowledge of responsive design principles",
        "Familiarity with frontend build tools and package managers"
      ],
      postedDate: "2 weeks ago",
      logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=1473&auto=format&fit=crop"
    }
  ];

  // Filter jobs based on search and filters
  const filteredJobs = jobs.filter(job => {
    // Search query filter
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         job.company.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Location filter
    const matchesLocation = locationFilter ? job.location.toLowerCase().includes(locationFilter.toLowerCase()) : true;
    
    // Salary filter
    const matchesSalary = parseInt(job.salary) >= salaryRange[0];
    
    // Experience level filter
    const matchesExperience = experienceLevel ? job.experience.includes(experienceLevel) : true;
    
    // Job type filter
    const matchesJobType = jobType ? job.type === jobType : true;
    
    // Remote filter
    const matchesRemote = remoteOnly ? job.remote === true : true;
    
    return matchesSearch && matchesLocation && matchesSalary && matchesExperience && matchesJobType && matchesRemote;
  });

  // Toggle job expansion
  const toggleJobExpansion = (jobId) => {
    if (expandedJob === jobId) {
      setExpandedJob(null);
    } else {
      setExpandedJob(jobId);
    }
  };

  // Toggle job saved status
  const toggleSaveJob = (jobId) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter(id => id !== jobId));
    } else {
      setSavedJobs([...savedJobs, jobId]);
    }
  };

  return (
    <div className="min-h-screen py-16 px-4 relative">
      {/* Background blurry elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Explore <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">Career Opportunities</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover job opportunities aligned with your skills and career goals.
          </p>
        </div>
        
        <Tabs defaultValue="explore" className="w-full" onValueChange={setActiveTab}>
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-2 w-full max-w-md">
              <TabsTrigger value="explore" className="flex items-center gap-2">
                <Search className="w-4 h-4" />
                <span>Explore Jobs</span>
              </TabsTrigger>
              <TabsTrigger value="saved" className="flex items-center gap-2">
                <Bookmark className="w-4 h-4" />
                <span>Saved Jobs</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="explore">
            <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-md">
              <div className="flex flex-col space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      placeholder="Search job titles, companies..." 
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="relative flex-grow">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      placeholder="Location" 
                      className="pl-10"
                      value={locationFilter}
                      onChange={(e) => setLocationFilter(e.target.value)}
                    />
                  </div>
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter className="h-4 w-4" />
                    Filters
                    {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                </div>
                
                {showFilters && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-gray-50 rounded-lg mt-2">
                    <div className="space-y-2">
                      <Label>Salary Range (₹)</Label>
                      <div className="flex items-center gap-4">
                        <Slider 
                          defaultValue={[50000]} 
                          max={200000} 
                          step={10000}
                          value={salaryRange}
                          onValueChange={setSalaryRange}
                        />
                        <span className="text-sm font-medium w-24">₹{salaryRange[0].toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Experience Level</Label>
                      <Select value={experienceLevel} onValueChange={setExperienceLevel}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select experience" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Any Experience</SelectItem>
                          <SelectItem value="0-1">Entry Level (0-1 years)</SelectItem>
                          <SelectItem value="1-3">Junior (1-3 years)</SelectItem>
                          <SelectItem value="3-5">Mid-Level (3-5 years)</SelectItem>
                          <SelectItem value="5+">Senior (5+ years)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Job Type</Label>
                      <Select value={jobType} onValueChange={setJobType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select job type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Any Type</SelectItem>
                          <SelectItem value="Full-time">Full-time</SelectItem>
                          <SelectItem value="Part-time">Part-time</SelectItem>
                          <SelectItem value="Contract">Contract</SelectItem>
                          <SelectItem value="Internship">Internship</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="remote-only" 
                        checked={remoteOnly}
                        onCheckedChange={setRemoteOnly}
                      />
                      <Label htmlFor="remote-only">Remote Only</Label>
                    </div>
                    
                    <div className="md:col-span-2 flex justify-end">
                      <Button 
                        variant="outline" 
                        className="mr-2"
                        onClick={() => {
                          setSearchQuery("");
                          setLocationFilter("");
                          setSalaryRange([50000]);
                          setExperienceLevel("");
                          setJobType("");
                          setRemoteOnly(false);
                        }}
                      >
                        Reset Filters
                      </Button>
                      <Button>Apply Filters</Button>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">
                    {filteredJobs.length} {filteredJobs.length === 1 ? 'Job' : 'Jobs'} Found
                  </h2>
                  <Select defaultValue="relevance">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Relevance</SelectItem>
                      <SelectItem value="recent">Most Recent</SelectItem>
                      <SelectItem value="salary-high">Salary: High to Low</SelectItem>
                      <SelectItem value="salary-low">Salary: Low to High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-4">
                  {filteredJobs.length > 0 ? (
                    filteredJobs.map((job) => (
                      <Card key={job.id} className="overflow-hidden hover:shadow-md transition-all duration-300">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <div className="flex gap-4">
                              <div className="h-12 w-12 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                                <img 
                                  src={job.logo} 
                                  alt={job.company} 
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div>
                                <CardTitle className="text-xl">{job.title}</CardTitle>
                                <CardDescription className="flex items-center gap-1">
                                  <Building className="h-3 w-3" />
                                  {job.company}
                                </CardDescription>
                              </div>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => toggleSaveJob(job.id)}
                              className={savedJobs.includes(job.id) ? "text-red-500" : ""}
                            >
                              <Heart className="h-5 w-5" fill={savedJobs.includes(job.id) ? "currentColor" : "none"} />
                            </Button>
                          </div>
                        </CardHeader>
                        
                        <CardContent className="pb-2">
                          <div className="flex flex-wrap gap-2 mb-3">
                            <Badge variant="outline" className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {job.location}
                            </Badge>
                            <Badge variant="outline" className="flex items-center gap-1">
                              <DollarSign className="h-3 w-3" />
                              ₹{job.salary.toLocaleString()} per year
                            </Badge>
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Briefcase className="h-3 w-3" />
                              {job.experience}
                            </Badge>
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {job.type}
                            </Badge>
                            {job.remote && (
                              <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                                Remote
                              </Badge>
                            )}
                          </div>
                          
                          {expandedJob === job.id ? (
                            <div className="mt-4 space-y-4 animate-fadeIn">
                              <div>
                                <h4 className="font-semibold mb-2">Job Description</h4>
                                <p className="text-gray-700">{job.description}</p>
                              </div>
                              
                              <div>
                                <h4 className="font-semibold mb-2">Requirements</h4>
                                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                                  {job.requirements.map((req, index) => (
                                    <li key={index}>{req}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          ) : (
                            <p className="text-gray-700 line-clamp-2">{job.description}</p>
                          )}
                        </CardContent>
                        
                        <CardFooter className="flex justify-between pt-2">
                          <div className="text-sm text-gray-500">
                            Posted {job.postedDate}
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => toggleJobExpansion(job.id)}
                            >
                              {expandedJob === job.id ? "Show Less" : "Show More"}
                            </Button>
                            <Button size="sm">
                              Apply Now
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-10">
                      <div className="text-gray-400 mb-2">
                        <Search className="h-12 w-12 mx-auto" />
                      </div>
                      <h3 className="text-xl font-medium mb-1">No jobs found</h3>
                      <p className="text-gray-500">Try adjusting your search or filters</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="saved">
            <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-md">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Bookmark className="mr-2 h-5 w-5 text-blue-600" />
                Saved Jobs
              </h2>
              
              {savedJobs.length > 0 ? (
                <div className="space-y-4">
                  {jobs
                    .filter(job => savedJobs.includes(job.id))
                    .map(job => (
                      <Card key={job.id} className="overflow-hidden hover:shadow-md transition-all duration-300">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <div className="flex gap-4">
                              <div className="h-12 w-12 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                                <img 
                                  src={job.logo} 
                                  alt={job.company} 
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div>
                                <CardTitle className="text-xl">{job.title}</CardTitle>
                                <CardDescription className="flex items-center gap-1">
                                  <Building className="h-3 w-3" />
                                  {job.company}
                                </CardDescription>
                              </div>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => toggleSaveJob(job.id)}
                              className="text-red-500"
                            >
                              <Heart className="h-5 w-5" fill="currentColor" />
                            </Button>
                          </div>
                        </CardHeader>
                        
                        <CardContent className="pb-2">
                          <div className="flex flex-wrap gap-2 mb-3">
                            <Badge variant="outline" className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {job.location}
                            </Badge>
                            <Badge variant="outline" className="flex items-center gap-1">
                              <DollarSign className="h-3 w-3" />
                              ₹{job.salary.toLocaleString()} per year
                            </Badge>
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Briefcase className="h-3 w-3" />
                              {job.experience}
                            </Badge>
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {job.type}
                            </Badge>
                            {job.remote && (
                              <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                                Remote
                              </Badge>
                            )}
                          </div>
                          
                          <p className="text-gray-700 line-clamp-2">{job.description}</p>
                        </CardContent>
                        
                        <CardFooter className="flex justify-between pt-2">
                          <div className="text-sm text-gray-500">
                            Posted {job.postedDate}
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm">
                              Apply Now
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <div className="text-gray-400 mb-2">
                    <Bookmark className="h-12 w-12 mx-auto" />
                  </div>
                  <h3 className="text-xl font-medium mb-1">No saved jobs yet</h3>
                  <p className="text-gray-500 mb-4">Save jobs you're interested in to view them later</p>
                  <Button 
                    variant="outline"
                    onClick={() => setActiveTab("explore")}
                  >
                    Explore Jobs
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="mr-2 h-5 w-5 text-blue-600" />
                Recommended for You
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Get personalized job recommendations based on your skills, interests, and career goals.
              </p>
              <Button variant="outline" className="border-blue-300 text-blue-800 hover:bg-blue-200 hover:text-blue-900">
                View Recommendations
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Briefcase className="mr-2 h-5 w-5 text-purple-600" />
                Career Assessment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Take our career assessment to discover jobs that match your personality, values, and work style.
              </p>
              <Button variant="outline" className="border-purple-300 text-purple-800 hover:bg-purple-200 hover:text-purple-900">
                Start Assessment
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
            <CardHeader>
              <CardTitle className="flex items-center">
                <ExternalLink className="mr-2 h-5 w-5 text-emerald-600" />
                Job Market Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Explore trends, salary information, and growth opportunities in different career fields.
              </p>
              <Button variant="outline" className="border-emerald-300 text-emerald-800 hover:bg-emerald-200 hover:text-emerald-900">
                View Insights
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CareersPage;
