
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileEdit, Download, Upload, Eye, EyeOff, Copy, Github, Linkedin, Globe, ExternalLink, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Progress } from "@/components/ui/progress";

const PortfolioPage = () => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [previewMode, setPreviewMode] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://climbup.app/portfolio/yourname");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  // Sample portfolio data
  const portfolio = {
    profile: {
      name: "Arjun Kumar",
      title: "Full Stack Developer",
      location: "Bangalore, India",
      email: "arjun.kumar@example.com",
      phone: "+91 9876543210",
      about: "A passionate full stack developer with 2 years of experience building web applications with React, Node.js, and MongoDB. Strong problem-solving skills and a keen eye for design.",
      skills: ["JavaScript", "React", "Node.js", "MongoDB", "Express", "TypeScript", "CSS", "HTML", "Git"]
    },
    projects: [
      {
        id: 1,
        title: "E-commerce Platform",
        description: "A full-featured e-commerce platform with product listings, cart functionality, payment integration, and user authentication.",
        technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe API"],
        liveUrl: "https://example-ecommerce.com",
        githubUrl: "https://github.com/username/ecommerce",
        image: "https://images.unsplash.com/photo-1556742031-c6961e8560b0?q=80&w=1470&auto=format&fit=crop"
      },
      {
        id: 2,
        title: "Task Management App",
        description: "A collaborative task management application with real-time updates, team assignments, and progress tracking.",
        technologies: ["React", "Firebase", "Material UI", "Redux"],
        liveUrl: "https://example-taskapp.com",
        githubUrl: "https://github.com/username/taskapp",
        image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?q=80&w=1476&auto=format&fit=crop"
      },
      {
        id: 3,
        title: "Weather Dashboard",
        description: "A responsive weather dashboard that displays current conditions and forecasts for multiple locations.",
        technologies: ["JavaScript", "HTML", "CSS", "Weather API"],
        liveUrl: "https://example-weather.com",
        githubUrl: "https://github.com/username/weather",
        image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?q=80&w=1470&auto=format&fit=crop"
      }
    ],
    education: [
      {
        degree: "B.Tech in Computer Science",
        institution: "VIT University",
        year: "2018 - 2022",
        description: "Specialized in Data Structures, Algorithms, and Web Development."
      },
      {
        degree: "Higher Secondary Education",
        institution: "Delhi Public School",
        year: "2016 - 2018",
        description: "Computer Science, Mathematics, Physics, Chemistry."
      }
    ],
    experience: [
      {
        role: "Full Stack Developer",
        company: "TechInnovate Solutions",
        duration: "Jan 2022 - Present",
        description: "Develop and maintain web applications for clients across various industries. Implement responsive designs and integrate backend services."
      },
      {
        role: "Web Development Intern",
        company: "CodeCraft Labs",
        duration: "May 2021 - Dec 2021",
        description: "Assisted in developing front-end components for client projects. Collaborated with the design team to implement UI/UX designs."
      }
    ],
    achievements: [
      "1st place in National Coding Hackathon 2021",
      "Published research paper on optimizing database queries",
      "Open-source contributor to React ecosystem"
    ]
  };

  const renderPortfolioPreview = () => (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="md:w-1/3">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-lg">
            <div className="w-32 h-32 rounded-full bg-white/20 mx-auto mb-4 flex items-center justify-center text-3xl font-bold">
              {portfolio.profile.name.charAt(0)}
            </div>
            <h2 className="text-xl font-bold text-center mb-1">{portfolio.profile.name}</h2>
            <p className="text-center text-white/80 mb-4">{portfolio.profile.title}</p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                <Globe className="mr-2 h-4 w-4" /> {portfolio.profile.location}
              </div>
              <div className="flex items-center">
                <Mail className="mr-2 h-4 w-4" /> {portfolio.profile.email}
              </div>
              <div className="flex items-center">
                <Phone className="mr-2 h-4 w-4" /> {portfolio.profile.phone}
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="font-semibold mb-2 border-b border-white/20 pb-1">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {portfolio.profile.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="bg-white/10 hover:bg-white/20">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="font-semibold mb-2 border-b border-white/20 pb-1">Education</h3>
              <div className="space-y-3">
                {portfolio.education.map((edu, index) => (
                  <div key={index}>
                    <div className="font-medium">{edu.degree}</div>
                    <div className="text-white/80 text-sm">{edu.institution}</div>
                    <div className="text-white/70 text-xs">{edu.year}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-6 flex justify-center space-x-4">
              <button className="p-2 bg-white/10 rounded-full hover:bg-white/20">
                <Github className="h-5 w-5" />
              </button>
              <button className="p-2 bg-white/10 rounded-full hover:bg-white/20">
                <Linkedin className="h-5 w-5" />
              </button>
              <button className="p-2 bg-white/10 rounded-full hover:bg-white/20">
                <Globe className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="md:w-2/3">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 border-b pb-2">About Me</h2>
            <p className="text-gray-600">{portfolio.profile.about}</p>
          </div>
          
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 border-b pb-2">Experience</h2>
            <div className="space-y-6">
              {portfolio.experience.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg">{exp.role}</h3>
                      <p className="text-gray-600">{exp.company}</p>
                    </div>
                    <Badge>{exp.duration}</Badge>
                  </div>
                  <p className="text-gray-600 mt-2">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 border-b pb-2">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {portfolio.projects.map((project) => (
                <Card key={project.id} className="overflow-hidden">
                  <AspectRatio ratio={16/9}>
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="object-cover w-full h-full"
                    />
                  </AspectRatio>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.technologies.map((tech, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Github className="mr-1 h-4 w-4" /> Code
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <ExternalLink className="mr-1 h-4 w-4" /> Demo
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4 border-b pb-2">Achievements</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              {portfolio.achievements.map((achievement, index) => (
                <li key={index}>{achievement}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
  
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
            Resume & <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">Portfolio</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Showcase your skills, projects, and achievements to potential employers and mentors.
          </p>
        </div>
        
        <Card className="mb-8 bg-white/90 backdrop-blur shadow-md">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl">Your Portfolio</CardTitle>
              <Button 
                variant="outline" 
                onClick={() => setPreviewMode(!previewMode)}
                className="flex items-center"
              >
                {previewMode ? (
                  <>
                    <FileEdit className="mr-2 h-4 w-4" /> Edit Mode
                  </>
                ) : (
                  <>
                    <Eye className="mr-2 h-4 w-4" /> Preview Mode
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
          
          <CardContent>
            {previewMode ? (
              renderPortfolioPreview()
            ) : (
              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="resume">Resume</TabsTrigger>
                  <TabsTrigger value="projects">Projects</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                
                <TabsContent value="profile">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" defaultValue={portfolio.profile.name} />
                      </div>
                      <div>
                        <Label htmlFor="title">Professional Title</Label>
                        <Input id="title" defaultValue={portfolio.profile.title} />
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" defaultValue={portfolio.profile.location} />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" defaultValue={portfolio.profile.email} />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" defaultValue={portfolio.profile.phone} />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="about">About Me</Label>
                        <Textarea 
                          id="about" 
                          rows={6} 
                          defaultValue={portfolio.profile.about} 
                          className="resize-none"
                        />
                      </div>
                      <div>
                        <Label htmlFor="skills">Skills (comma separated)</Label>
                        <Textarea 
                          id="skills" 
                          rows={3} 
                          defaultValue={portfolio.profile.skills.join(", ")} 
                          className="resize-none"
                        />
                      </div>
                      <div>
                        <Label>Profile Completeness</Label>
                        <Progress value={75} className="h-2 mt-2" />
                        <p className="text-xs text-gray-500 mt-1">75% - Add more projects to increase your profile score</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <Button className="bg-gradient-to-r from-blue-600 to-indigo-600">Save Profile</Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="resume">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-xl">Upload Resume</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                          {resumeFile ? (
                            <div>
                              <div className="flex items-center justify-center text-green-500 mb-2">
                                <Check className="h-8 w-8" />
                              </div>
                              <p className="font-medium">{resumeFile.name}</p>
                              <p className="text-sm text-gray-500 mb-4">
                                {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                              <Button variant="outline" size="sm">
                                Change File
                              </Button>
                            </div>
                          ) : (
                            <>
                              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                              <p className="text-sm text-gray-500 mb-2">
                                Drag and drop your resume here or click to browse
                              </p>
                              <p className="text-xs text-gray-400 mb-4">
                                Supported formats: PDF, DOCX, DOC (Max 5MB)
                              </p>
                              <Input 
                                id="resume-upload" 
                                type="file" 
                                className="hidden" 
                                onChange={handleFileChange}
                                accept=".pdf,.doc,.docx"
                              />
                              <label htmlFor="resume-upload">
                                <Button variant="outline" size="sm" className="cursor-pointer" asChild>
                                  <span>
                                    <Upload className="mr-2 h-4 w-4" />
                                    Choose File
                                  </span>
                                </Button>
                              </label>
                            </>
                          )}
                        </div>
                        
                        {resumeFile && (
                          <div className="mt-4 flex justify-between">
                            <Button variant="outline" size="sm">
                              <Eye className="mr-2 h-4 w-4" /> Preview
                            </Button>
                            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600" size="sm">
                              <Upload className="mr-2 h-4 w-4" /> Upload Resume
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-xl">Resume Templates</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="border rounded-lg p-2 cursor-pointer hover:border-blue-400 transition-all">
                            <AspectRatio ratio={3/4}>
                              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                Template 1
                              </div>
                            </AspectRatio>
                            <div className="text-center mt-2 text-sm font-medium">Minimal</div>
                          </div>
                          <div className="border rounded-lg p-2 cursor-pointer hover:border-blue-400 transition-all">
                            <AspectRatio ratio={3/4}>
                              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                Template 2
                              </div>
                            </AspectRatio>
                            <div className="text-center mt-2 text-sm font-medium">Modern</div>
                          </div>
                          <div className="border rounded-lg p-2 cursor-pointer hover:border-blue-400 transition-all">
                            <AspectRatio ratio={3/4}>
                              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                Template 3
                              </div>
                            </AspectRatio>
                            <div className="text-center mt-2 text-sm font-medium">Professional</div>
                          </div>
                          <div className="border rounded-lg p-2 cursor-pointer hover:border-blue-400 transition-all">
                            <AspectRatio ratio={3/4}>
                              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                Template 4
                              </div>
                            </AspectRatio>
                            <div className="text-center mt-2 text-sm font-medium">Creative</div>
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <Button className="w-full">
                            <Download className="mr-2 h-4 w-4" /> Generate Resume
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="projects">
                  <div className="mb-6">
                    <Button className="bg-gradient-to-r from-blue-600 to-indigo-600">
                      <Plus className="mr-2 h-4 w-4" /> Add New Project
                    </Button>
                  </div>
                  
                  {portfolio.projects.map((project) => (
                    <Card key={project.id} className="mb-4">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/4">
                          <AspectRatio ratio={16/9}>
                            <img 
                              src={project.image} 
                              alt={project.title}
                              className="object-cover w-full h-full rounded-l-lg"
                            />
                          </AspectRatio>
                        </div>
                        <div className="p-4 flex-grow">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-lg">{project.title}</h3>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-gray-600 text-sm mb-3">{project.description}</p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {project.technologies.map((tech, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <Label htmlFor={`live-url-${project.id}`} className="text-xs">Live URL</Label>
                              <Input id={`live-url-${project.id}`} defaultValue={project.liveUrl} size="sm" />
                            </div>
                            <div>
                              <Label htmlFor={`github-url-${project.id}`} className="text-xs">GitHub URL</Label>
                              <Input id={`github-url-${project.id}`} defaultValue={project.githubUrl} size="sm" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </TabsContent>
                
                <TabsContent value="settings">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Portfolio URL</h3>
                      <div className="flex">
                        <div className="bg-gray-100 border border-r-0 rounded-l-md px-3 py-2 text-gray-500 flex items-center">
                          https://climbup.app/portfolio/
                        </div>
                        <Input className="rounded-l-none" defaultValue="your-username" />
                        <Button 
                          variant="outline" 
                          className="ml-2" 
                          onClick={handleCopyLink}
                        >
                          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Privacy Settings</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-base">Make Portfolio Public</Label>
                            <p className="text-sm text-gray-500">Allow anyone with the link to view your portfolio</p>
                          </div>
                          <Switch />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-base">Show Contact Information</Label>
                            <p className="text-sm text-gray-500">Display your email and phone on your public portfolio</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-base">Allow Mentor Comments</Label>
                            <p className="text-sm text-gray-500">Let mentors leave feedback on your portfolio</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Export Options</h3>
                      <div className="flex gap-4">
                        <Button variant="outline">
                          <Download className="mr-2 h-4 w-4" /> Export as PDF
                        </Button>
                        <Button variant="outline">
                          <Download className="mr-2 h-4 w-4" /> Export as HTML
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            )}
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 mb-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Get Expert Feedback</h3>
              <p className="opacity-90">
                Have mentors review your resume and portfolio to maximize your chances of landing your dream job.
              </p>
            </div>
            <Button variant="secondary" className="whitespace-nowrap">
              Request Feedback
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

// These icons are needed for the portfolio preview part
const Mail = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <rect width="20" height="16" x="2" y="4" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const Phone = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const Plus = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M5 12h14"/>
    <path d="M12 5v14"/>
  </svg>
);

const Calendar = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
    <line x1="16" x2="16" y1="2" y2="6"/>
    <line x1="8" x2="8" y1="2" y2="6"/>
    <line x1="3" x2="21" y1="10" y2="10"/>
  </svg>
);

const Pencil = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
    <path d="m15 5 4 4"/>
  </svg>
);

const Trash2 = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M3 6h18"/>
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
    <line x1="10" x2="10" y1="11" y2="17"/>
    <line x1="14" x2="14" y1="11" y2="17"/>
  </svg>
);

const Switch = ({ defaultChecked = false }) => {
  const [checked, setChecked] = useState(defaultChecked);
  
  return (
    <button 
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${checked ? 'bg-blue-600' : 'bg-gray-300'}`}
      onClick={() => setChecked(!checked)}
    >
      <span 
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`} 
      />
    </button>
  );
};

export default PortfolioPage;
