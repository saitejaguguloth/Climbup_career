import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { FileUp, Plus, Trash2, Download, Share2, Eye, EyeOff, Award, Briefcase, GraduationCap, Code, Palette, Languages, BookOpen } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const PortfolioPage = () => {
  const [activeTab, setActiveTab] = useState('resume');
  const [isPublic, setIsPublic] = useState(true);
  
  // Sample user data
  const userData = {
    name: "Priya Sharma",
    title: "Software Engineer",
    email: "priya.sharma@example.com",
    phone: "+91 98765 43210",
    location: "Bangalore, India",
    about: "Passionate software engineer with 3+ years of experience in full-stack development. Specialized in React, Node.js, and cloud technologies.",
    avatar: "https://i.pravatar.cc/150?img=32",
    skills: [
      { name: "React", proficiency: 90 },
      { name: "JavaScript", proficiency: 85 },
      { name: "Node.js", proficiency: 80 },
      { name: "TypeScript", proficiency: 75 },
      { name: "AWS", proficiency: 70 },
      { name: "MongoDB", proficiency: 65 },
    ],
    experience: [
      {
        id: 1,
        role: "Software Engineer",
        company: "TechCorp India",
        duration: "Jan 2022 - Present",
        description: "Developing and maintaining web applications using React and Node.js. Implementing CI/CD pipelines and optimizing application performance."
      },
      {
        id: 2,
        role: "Junior Developer",
        company: "WebSolutions",
        duration: "Jun 2020 - Dec 2021",
        description: "Worked on front-end development using HTML, CSS, and JavaScript. Collaborated with the design team to implement responsive UI components."
      },
      {
        id: 3,
        role: "Intern",
        company: "CodeStart",
        duration: "Jan 2020 - May 2020",
        description: "Assisted in developing and testing web applications. Gained experience in agile development methodologies."
      }
    ],
    education: [
      {
        id: 1,
        degree: "B.Tech in Computer Science",
        institution: "Indian Institute of Technology, Delhi",
        duration: "2016 - 2020",
        description: "Graduated with distinction. Specialized in software engineering and data structures."
      },
      {
        id: 2,
        degree: "Higher Secondary Education",
        institution: "Delhi Public School",
        duration: "2014 - 2016",
        description: "Completed with 95% marks in science stream."
      }
    ],
    projects: [
      {
        id: 1,
        title: "E-commerce Platform",
        description: "A full-stack e-commerce platform with payment integration, user authentication, and admin dashboard.",
        technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe"],
        link: "https://github.com/priyasharma/ecommerce-platform"
      },
      {
        id: 2,
        title: "Task Management App",
        description: "A collaborative task management application with real-time updates and team collaboration features.",
        technologies: ["React", "Firebase", "Material UI", "Redux"],
        link: "https://github.com/priyasharma/task-manager"
      },
      {
        id: 3,
        title: "Weather Forecast App",
        description: "A weather application that provides real-time weather updates and forecasts based on location.",
        technologies: ["JavaScript", "OpenWeather API", "HTML", "CSS"],
        link: "https://github.com/priyasharma/weather-app"
      }
    ],
    certifications: [
      {
        id: 1,
        name: "AWS Certified Developer - Associate",
        issuer: "Amazon Web Services",
        date: "Aug 2022",
        link: "https://aws.amazon.com/certification/certified-developer-associate/"
      },
      {
        id: 2,
        name: "MongoDB Certified Developer",
        issuer: "MongoDB University",
        date: "Mar 2022",
        link: "https://university.mongodb.com/certification"
      },
      {
        id: 3,
        name: "React Developer Certification",
        issuer: "Meta",
        date: "Nov 2021",
        link: "https://www.meta.com/certifications"
      }
    ]
  };

  const handleSkillChange = (index, value) => {
    // In a real app, this would update the skill proficiency
    console.log(`Updating skill ${userData.skills[index].name} to ${value}`);
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
            Your <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">Portfolio</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Showcase your skills, experience, and projects to potential employers and collaborators.
          </p>
        </div>
        
        <div className="bg-white/90 backdrop-blur rounded-xl p-6 shadow-lg mb-10">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="md:w-1/3 flex flex-col items-center text-center">
              <Avatar className="h-32 w-32 mb-4">
                <AvatarImage src={userData.avatar} />
                <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-bold">{userData.name}</h2>
              <p className="text-gray-600 mb-2">{userData.title}</p>
              <p className="text-sm text-gray-500 mb-4">{userData.location}</p>
              
              <div className="flex gap-2 mb-6">
                <Button variant="outline" size="sm">
                  <FileUp className="mr-1 h-4 w-4" />
                  Update Photo
                </Button>
              </div>
              
              <div className="w-full flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className={`mr-2 h-3 w-3 rounded-full ${isPublic ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                  <span className="font-medium">{isPublic ? 'Public Profile' : 'Private Profile'}</span>
                </div>
                <Switch 
                  checked={isPublic} 
                  onCheckedChange={setIsPublic} 
                />
              </div>
              
              <div className="w-full">
                <Button className="w-full mb-2">
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </Button>
                <Button variant="outline" className="w-full">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Portfolio
                </Button>
              </div>
            </div>
            
            <div className="md:w-2/3">
              <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6">
                  <TabsTrigger value="resume" className="flex items-center gap-1">
                    <Briefcase className="h-4 w-4" />
                    <span>Resume</span>
                  </TabsTrigger>
                  <TabsTrigger value="portfolio" className="flex items-center gap-1">
                    <Palette className="h-4 w-4" />
                    <span>Portfolio</span>
                  </TabsTrigger>
                  <TabsTrigger value="skills" className="flex items-center gap-1">
                    <Code className="h-4 w-4" />
                    <span>Skills</span>
                  </TabsTrigger>
                  <TabsTrigger value="achievements" className="flex items-center gap-1">
                    <Award className="h-4 w-4" />
                    <span>Achievements</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="resume" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Briefcase className="mr-2 h-5 w-5 text-blue-600" />
                        Professional Experience
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {userData.experience.map((exp) => (
                        <div key={exp.id} className="border-b pb-4 last:border-0 last:pb-0">
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="font-semibold text-lg">{exp.role}</h3>
                            <Badge variant="outline">{exp.duration}</Badge>
                          </div>
                          <p className="text-gray-600 mb-2">{exp.company}</p>
                          <p className="text-sm text-gray-500">{exp.description}</p>
                        </div>
                      ))}
                      <Button variant="outline" className="w-full">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Experience
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <GraduationCap className="mr-2 h-5 w-5 text-blue-600" />
                        Education
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {userData.education.map((edu) => (
                        <div key={edu.id} className="border-b pb-4 last:border-0 last:pb-0">
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="font-semibold text-lg">{edu.degree}</h3>
                            <Badge variant="outline">{edu.duration}</Badge>
                          </div>
                          <p className="text-gray-600 mb-2">{edu.institution}</p>
                          <p className="text-sm text-gray-500">{edu.description}</p>
                        </div>
                      ))}
                      <Button variant="outline" className="w-full">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Education
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Award className="mr-2 h-5 w-5 text-blue-600" />
                        Certifications
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {userData.certifications.map((cert) => (
                        <div key={cert.id} className="border-b pb-4 last:border-0 last:pb-0">
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="font-semibold text-lg">{cert.name}</h3>
                            <Badge variant="outline">{cert.date}</Badge>
                          </div>
                          <p className="text-gray-600 mb-2">{cert.issuer}</p>
                          <a 
                            href={cert.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:underline"
                          >
                            View Certificate
                          </a>
                        </div>
                      ))}
                      <Button variant="outline" className="w-full">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Certification
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="portfolio" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Code className="mr-2 h-5 w-5 text-blue-600" />
                        Projects
                      </CardTitle>
                      <CardDescription>
                        Showcase your best work and projects to potential employers
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {userData.projects.map((project) => (
                        <Card key={project.id} className="border">
                          <CardHeader className="pb-2">
                            <CardTitle>{project.title}</CardTitle>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <p className="text-gray-600 mb-2">{project.description}</p>
                            <div className="flex flex-wrap gap-1 mb-2">
                              {project.technologies.map((tech, i) => (
                                <Badge key={i} variant="secondary" className="bg-blue-100 text-blue-800">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                            <a 
                              href={project.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-sm text-blue-600 hover:underline"
                            >
                              View Project
                            </a>
                          </CardContent>
                          <CardFooter className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                      <Button variant="outline" className="w-full">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Project
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="skills" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Code className="mr-2 h-5 w-5 text-blue-600" />
                        Technical Skills
                      CardTitle>
                      <CardDescription>
                        Rate your proficiency in various technical skills
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {userData.skills.map((skill, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between">
                            <Label>{skill.name}</Label>
                            <span className="text-sm font-medium">{skill.proficiency}%</span>
                          </div>
                          <Slider
                            defaultValue={[skill.proficiency]}
                            max={100}
                            step={5}
                            onValueChange={(value) => handleSkillChange(index, value[0])}
                            className="mb-6"
                          />
                        </div>
                      ))}
                      <Button variant="outline" className="w-full">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Skill
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Languages className="mr-2 h-5 w-5 text-blue-600" />
                        Languages
                      CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label>English</Label>
                            <span className="text-sm font-medium">Fluent</span>
                          </div>
                          <Progress value={95} />
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label>Hindi</Label>
                            <span className="text-sm font-medium">Native</span>
                          </div>
                          <Progress value={100} />
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label>Spanish</Label>
                            <span className="text-sm font-medium">Basic</span>
                          </div>
                          <Progress value={30} />
                        </div>
                      </div>
                      <Button variant="outline" className="w-full mt-6">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Language
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="achievements" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Award className="mr-2 h-5 w-5 text-blue-600" />
                        Achievements & Awards
                      CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-start gap-4 p-4 border rounded-lg">
                          <div className="bg-amber-100 p-2 rounded-full">
                            <Award className="h-6 w-6 text-amber-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">Hackathon Winner</h3>
                            <p className="text-sm text-gray-600">First place at TechCorp Annual Hackathon 2022</p>
                            <Badge variant="outline" className="mt-2">2022</Badge>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-4 p-4 border rounded-lg">
                          <div className="bg-blue-100 p-2 rounded-full">
                            <Award className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">Employee of the Quarter</h3>
                            <p className="text-sm text-gray-600">Recognized for outstanding performance and contributions</p>
                            <Badge variant="outline" className="mt-2">Q2 2023</Badge>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-4 p-4 border rounded-lg">
                          <div className="bg-purple-100 p-2 rounded-full">
                            <BookOpen className="h-6 w-6 text-purple-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">Published Article</h3>
                            <p className="text-sm text-gray-600">Technical article published in Dev.to on React performance optimization</p>
                            <Badge variant="outline" className="mt-2">2023</Badge>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full mt-6">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Achievement
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="mr-2 h-5 w-5 text-blue-600" />
                Profile Visibility
              CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Control who can see your portfolio and resume. Make it public to increase your visibility to potential employers.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {isPublic ? (
                    <Eye className="mr-2 h-5 w-5 text-green-600" />
                  ) : (
                    <EyeOff className="mr-2 h-5 w-5 text-gray-600" />
                  )}
                  <span className="font-medium">{isPublic ? 'Public' : 'Private'}</span>
                </div>
                <Switch 
                  checked={isPublic} 
                  onCheckedChange={setIsPublic} 
                />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Download className="mr-2 h-5 w-5 text-purple-600" />
                Export Options
              CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Download your portfolio and resume in various formats to share with potential employers.
              </p>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" className="border-purple-300 text-purple-800 hover:bg-purple-200">
                  PDF Resume
                </Button>
                <Button variant="outline" size="sm" className="border-purple-300 text-purple-800 hover:bg-purple-200">
                  Word Document
                </Button>
                <Button variant="outline" size="sm" className="border-purple-300 text-purple-800 hover:bg-purple-200">
                  Web Portfolio
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;
