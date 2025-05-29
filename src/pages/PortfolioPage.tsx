
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
import { NeonTitle, NeonButton, NeonCard, NeonIcon } from '@/components/ui/neon-elements';

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
    <div className="min-h-screen py-16 relative">
      {/* Background blurry elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-neon-yellow rounded-full mix-blend-overlay filter blur-3xl opacity-5 animate-blob"></div>
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-neon-teal rounded-full mix-blend-overlay filter blur-3xl opacity-5 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-neon-orange rounded-full mix-blend-overlay filter blur-3xl opacity-5 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-10">
          <NeonTitle size="2xl" color="yellow" className="mb-4">
            Your <span className="text-neon-teal">Portfolio</span>
          </NeonTitle>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Showcase your skills, experience, and projects to potential employers and collaborators.
          </p>
        </div>
        
        <NeonCard color="teal" className="mb-10">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="md:w-1/3 flex flex-col items-center text-center">
              <Avatar className="h-32 w-32 mb-4">
                <AvatarImage src={userData.avatar} />
                <AvatarFallback className="bg-black/40 text-white text-2xl">{userData.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-bold text-white">{userData.name}</h2>
              <p className="text-white/80 mb-2">{userData.title}</p>
              <p className="text-sm text-white/60 mb-4">{userData.location}</p>
              
              <div className="flex gap-2 mb-6">
                <NeonButton color="yellow" size="sm">
                  <FileUp className="mr-1 h-4 w-4" />
                  Update Photo
                </NeonButton>
              </div>
              
              <div className="w-full flex items-center justify-between mb-4 p-3 bg-black/30 rounded-lg border border-white/20">
                <div className="flex items-center">
                  <div className={`mr-2 h-3 w-3 rounded-full ${isPublic ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                  <span className="font-medium text-white">{isPublic ? 'Public Profile' : 'Private Profile'}</span>
                </div>
                <Switch 
                  checked={isPublic} 
                  onCheckedChange={setIsPublic} 
                />
              </div>
              
              <div className="w-full space-y-2">
                <NeonButton color="teal" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </NeonButton>
                <NeonButton variant="outline" color="orange" className="w-full">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Portfolio
                </NeonButton>
              </div>
            </div>
            
            <div className="md:w-2/3">
              <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6 bg-black/30 border border-white/20">
                  <TabsTrigger value="resume" className="flex items-center gap-1 text-white data-[state=active]:bg-neon-yellow/20 data-[state=active]:text-neon-yellow">
                    <Briefcase className="h-4 w-4" />
                    <span>Resume</span>
                  </TabsTrigger>
                  <TabsTrigger value="portfolio" className="flex items-center gap-1 text-white data-[state=active]:bg-neon-yellow/20 data-[state=active]:text-neon-yellow">
                    <Palette className="h-4 w-4" />
                    <span>Portfolio</span>
                  </TabsTrigger>
                  <TabsTrigger value="skills" className="flex items-center gap-1 text-white data-[state=active]:bg-neon-yellow/20 data-[state=active]:text-neon-yellow">
                    <Code className="h-4 w-4" />
                    <span>Skills</span>
                  </TabsTrigger>
                  <TabsTrigger value="achievements" className="flex items-center gap-1 text-white data-[state=active]:bg-neon-yellow/20 data-[state=active]:text-neon-yellow">
                    <Award className="h-4 w-4" />
                    <span>Achievements</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="resume" className="space-y-6">
                  <NeonCard color="yellow">
                    <CardHeader>
                      <CardTitle className="flex items-center text-white">
                        <NeonIcon color="yellow" size="sm" className="mr-2">
                          <Briefcase className="h-5 w-5" />
                        </NeonIcon>
                        Professional Experience
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {userData.experience.map((exp) => (
                        <div key={exp.id} className="border-b border-white/20 pb-4 last:border-0 last:pb-0">
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="font-semibold text-lg text-white">{exp.role}</h3>
                            <Badge className="bg-neon-teal/20 text-neon-teal border-neon-teal/50">{exp.duration}</Badge>
                          </div>
                          <p className="text-white/80 mb-2">{exp.company}</p>
                          <p className="text-sm text-white/60">{exp.description}</p>
                        </div>
                      ))}
                      <NeonButton variant="outline" color="yellow" className="w-full">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Experience
                      </NeonButton>
                    </CardContent>
                  </NeonCard>
                  
                  <NeonCard color="teal">
                    <CardHeader>
                      <CardTitle className="flex items-center text-white">
                        <NeonIcon color="teal" size="sm" className="mr-2">
                          <GraduationCap className="h-5 w-5" />
                        </NeonIcon>
                        Education
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {userData.education.map((edu) => (
                        <div key={edu.id} className="border-b border-white/20 pb-4 last:border-0 last:pb-0">
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="font-semibold text-lg text-white">{edu.degree}</h3>
                            <Badge className="bg-neon-orange/20 text-neon-orange border-neon-orange/50">{edu.duration}</Badge>
                          </div>
                          <p className="text-white/80 mb-2">{edu.institution}</p>
                          <p className="text-sm text-white/60">{edu.description}</p>
                        </div>
                      ))}
                      <NeonButton variant="outline" color="teal" className="w-full">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Education
                      </NeonButton>
                    </CardContent>
                  </NeonCard>
                  
                  <NeonCard color="orange">
                    <CardHeader>
                      <CardTitle className="flex items-center text-white">
                        <NeonIcon color="orange" size="sm" className="mr-2">
                          <Award className="h-5 w-5" />
                        </NeonIcon>
                        Certifications
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {userData.certifications.map((cert) => (
                        <div key={cert.id} className="border-b border-white/20 pb-4 last:border-0 last:pb-0">
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="font-semibold text-lg text-white">{cert.name}</h3>
                            <Badge className="bg-neon-yellow/20 text-neon-yellow border-neon-yellow/50">{cert.date}</Badge>
                          </div>
                          <p className="text-white/80 mb-2">{cert.issuer}</p>
                          <a 
                            href={cert.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm text-neon-teal hover:underline"
                          >
                            View Certificate
                          </a>
                        </div>
                      ))}
                      <NeonButton variant="outline" color="orange" className="w-full">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Certification
                      </NeonButton>
                    </CardContent>
                  </NeonCard>
                </TabsContent>
                
                <TabsContent value="portfolio" className="space-y-6">
                  <NeonCard color="teal">
                    <CardHeader>
                      <CardTitle className="flex items-center text-white">
                        <NeonIcon color="teal" size="sm" className="mr-2">
                          <Code className="h-5 w-5" />
                        </NeonIcon>
                        Projects
                      </CardTitle>
                      <CardDescription className="text-white/60">
                        Showcase your best work and projects to potential employers
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {userData.projects.map((project) => (
                        <NeonCard key={project.id} color="yellow" className="border">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-white">{project.title}</CardTitle>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <p className="text-white/80 mb-2">{project.description}</p>
                            <div className="flex flex-wrap gap-1 mb-2">
                              {project.technologies.map((tech, i) => (
                                <Badge key={i} className="bg-neon-teal/20 text-neon-teal border-neon-teal/50">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                            <a 
                              href={project.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-sm text-neon-orange hover:underline"
                            >
                              View Project
                            </a>
                          </CardContent>
                          <CardFooter className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm" className="text-white/70 hover:text-neon-teal">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-white/70 hover:text-red-400">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </CardFooter>
                        </NeonCard>
                      ))}
                      <NeonButton variant="outline" color="teal" className="w-full">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Project
                      </NeonButton>
                    </CardContent>
                  </NeonCard>
                </TabsContent>
                
                <TabsContent value="skills" className="space-y-6">
                  <NeonCard color="orange">
                    <CardHeader>
                      <CardTitle className="flex items-center text-white">
                        <NeonIcon color="orange" size="sm" className="mr-2">
                          <Code className="h-5 w-5" />
                        </NeonIcon>
                        Technical Skills
                      </CardTitle>
                      <CardDescription className="text-white/60">
                        Rate your proficiency in various technical skills
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {userData.skills.map((skill, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between">
                            <Label className="text-white">{skill.name}</Label>
                            <span className="text-sm font-medium text-neon-yellow">{skill.proficiency}%</span>
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
                      <NeonButton variant="outline" color="orange" className="w-full">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Skill
                      </NeonButton>
                    </CardContent>
                  </NeonCard>
                  
                  <NeonCard color="yellow">
                    <CardHeader>
                      <CardTitle className="flex items-center text-white">
                        <NeonIcon color="yellow" size="sm" className="mr-2">
                          <Languages className="h-5 w-5" />
                        </NeonIcon>
                        Languages
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label className="text-white">English</Label>
                            <span className="text-sm font-medium text-neon-teal">Fluent</span>
                          </div>
                          <Progress value={95} className="bg-white/10" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label className="text-white">Hindi</Label>
                            <span className="text-sm font-medium text-neon-teal">Native</span>
                          </div>
                          <Progress value={100} className="bg-white/10" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label className="text-white">Spanish</Label>
                            <span className="text-sm font-medium text-neon-teal">Basic</span>
                          </div>
                          <Progress value={30} className="bg-white/10" />
                        </div>
                      </div>
                      <NeonButton variant="outline" color="yellow" className="w-full mt-6">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Language
                      </NeonButton>
                    </CardContent>
                  </NeonCard>
                </TabsContent>
                
                <TabsContent value="achievements" className="space-y-6">
                  <NeonCard color="teal">
                    <CardHeader>
                      <CardTitle className="flex items-center text-white">
                        <NeonIcon color="teal" size="sm" className="mr-2">
                          <Award className="h-5 w-5" />
                        </NeonIcon>
                        Achievements & Awards
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-start gap-4 p-4 border border-white/20 rounded-lg bg-black/20">
                          <div className="bg-neon-yellow/20 p-2 rounded-full">
                            <Award className="h-6 w-6 text-neon-yellow" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-white">Hackathon Winner</h3>
                            <p className="text-sm text-white/80">First place at TechCorp Annual Hackathon 2022</p>
                            <Badge className="mt-2 bg-neon-orange/20 text-neon-orange border-neon-orange/50">2022</Badge>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-4 p-4 border border-white/20 rounded-lg bg-black/20">
                          <div className="bg-neon-teal/20 p-2 rounded-full">
                            <Award className="h-6 w-6 text-neon-teal" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-white">Employee of the Quarter</h3>
                            <p className="text-sm text-white/80">Recognized for outstanding performance and contributions</p>
                            <Badge className="mt-2 bg-neon-yellow/20 text-neon-yellow border-neon-yellow/50">Q2 2023</Badge>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-4 p-4 border border-white/20 rounded-lg bg-black/20">
                          <div className="bg-neon-orange/20 p-2 rounded-full">
                            <BookOpen className="h-6 w-6 text-neon-orange" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-white">Published Article</h3>
                            <p className="text-sm text-white/80">Technical article published in Dev.to on React performance optimization</p>
                            <Badge className="mt-2 bg-neon-teal/20 text-neon-teal border-neon-teal/50">2023</Badge>
                          </div>
                        </div>
                      </div>
                      <NeonButton variant="outline" color="teal" className="w-full mt-6">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Achievement
                      </NeonButton>
                    </CardContent>
                  </NeonCard>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </NeonCard>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <NeonCard color="yellow">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <NeonIcon color="yellow" size="sm" className="mr-2">
                  <Eye className="h-5 w-5" />
                </NeonIcon>
                Profile Visibility
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/80 mb-4">
                Control who can see your portfolio and resume. Make it public to increase your visibility to potential employers.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {isPublic ? (
                    <Eye className="mr-2 h-5 w-5 text-green-400" />
                  ) : (
                    <EyeOff className="mr-2 h-5 w-5 text-gray-400" />
                  )}
                  <span className="font-medium text-white">{isPublic ? 'Public' : 'Private'}</span>
                </div>
                <Switch 
                  checked={isPublic} 
                  onCheckedChange={setIsPublic} 
                />
              </div>
            </CardContent>
          </NeonCard>
          
          <NeonCard color="orange">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <NeonIcon color="orange" size="sm" className="mr-2">
                  <Download className="h-5 w-5" />
                </NeonIcon>
                Export Options
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/80 mb-4">
                Download your portfolio and resume in various formats to share with potential employers.
              </p>
              <div className="flex flex-wrap gap-2">
                <NeonButton variant="outline" color="orange" size="sm">
                  PDF Resume
                </NeonButton>
                <NeonButton variant="outline" color="teal" size="sm">
                  Word Document
                </NeonButton>
                <NeonButton variant="outline" color="yellow" size="sm">
                  Web Portfolio
                </NeonButton>
              </div>
            </CardContent>
          </NeonCard>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;
