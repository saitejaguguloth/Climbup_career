import React, { useState, useRef } from 'react';
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
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

const PortfolioPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('resume');
  const [isPublic, setIsPublic] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.displayName || '',
    email: user?.email || '',
    title: '',
    location: '',
    about: '',
    avatar: user?.photoURL || '',
    skills: [],
    experience: [],
    education: [],
    projects: [],
    certifications: [],
    achievements: [],
    languages: [],
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  // Modal state
  const [modal, setModal] = useState({ open: false, type: '', section: '', index: null });
  const [modalData, setModalData] = useState<any>({});

  // Profile field change handler
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Save profile handler
  const handleSaveProfile = () => {
    setIsEditing(false);
    toast({ title: 'Profile updated', description: 'Your profile info has been saved.', variant: 'success' });
    // In a real app, save to backend here
  };

  // Photo upload handler
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setProfile((prev) => ({ ...prev, avatar: ev.target?.result as string }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // Download Resume as PDF
  const handleDownloadResume = () => {
    window.print(); // Simple print for now; can use jsPDF/react-to-print for custom PDF
    toast({ title: 'Download started', description: 'Your resume is being downloaded.' });
  };

  // Share Portfolio (copy link)
  const handleSharePortfolio = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({ title: 'Link copied!', description: 'Portfolio link copied to clipboard.' });
  };

  const handleSkillChange = (index, value) => {
    // In a real app, this would update the skill proficiency
    console.log(`Updating skill ${profile.skills[index].name} to ${value}`);
  };

  // Open modal for add/edit
  const openModal = (section: string, type: 'add' | 'edit', index: number | null = null) => {
    setModal({ open: true, type, section, index });
    if (type === 'edit' && index !== null) {
      setModalData(profile[section][index]);
    } else {
      setModalData({});
    }
  };
  // Close modal
  const closeModal = () => {
    setModal({ open: false, type: '', section: '', index: null });
    setModalData({});
  };
  // Save modal data
  const saveModalData = () => {
    setProfile((prev) => {
      const updated = { ...prev };
      if (modal.type === 'add') {
        updated[modal.section] = [...updated[modal.section], { ...modalData, id: Date.now() }];
      } else if (modal.type === 'edit' && modal.index !== null) {
        updated[modal.section] = updated[modal.section].map((item, i) => (i === modal.index ? { ...modalData } : item));
      }
      return updated;
    });
    closeModal();
    toast({ title: 'Saved!', description: `Your ${modal.section} has been updated.`, variant: 'success' });
  };
  // Delete item
  const deleteItem = (section: string, index: number) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setProfile((prev) => {
        const updated = { ...prev };
        updated[section] = updated[section].filter((_, i) => i !== index);
        return updated;
      });
      toast({ title: 'Deleted!', description: `Item removed from ${section}.`, variant: 'destructive' });
    }
  };

  return (
    <div className="min-h-screen py-16 px-4 relative bg-black/90 text-white">
      {/* Neon blurry background elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 left-0 w-72 h-72 bg-neon-yellow/30 rounded-full filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-neon-teal/30 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-neon-orange/30 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-neon-yellow neon-shadow-yellow">
            Your <span className="text-neon-teal">Portfolio</span>
          </h1>
          <p className="text-lg text-neon-teal/80 max-w-2xl mx-auto">
            Showcase your skills, experience, and projects to potential employers and collaborators.
          </p>
        </div>
        
        <div className="bg-black/80 backdrop-blur rounded-xl p-6 shadow-lg mb-10 border border-neon-yellow/20">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="md:w-1/3 flex flex-col items-center text-center">
              <Avatar className="h-32 w-32 mb-4 border-4 border-neon-yellow/40">
                <AvatarImage src={profile.avatar} />
                <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
              </Avatar>
              {isEditing ? (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handlePhotoChange}
                  />
                  <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                    <FileUp className="mr-1 h-4 w-4" />
                    Upload Photo
                  </Button>
                </>
              ) : null}
              <div className="flex flex-col gap-2 w-full mt-4">
                {isEditing ? (
                  <>
                    <Input
                      name="name"
                      value={profile.name}
                      onChange={handleProfileChange}
                      placeholder="Full Name"
                      className="mb-2"
                    />
                    <Input
                      name="title"
                      value={profile.title}
                      onChange={handleProfileChange}
                      placeholder="Title (e.g. Software Engineer)"
                      className="mb-2"
                    />
                    <Input
                      name="location"
                      value={profile.location}
                      onChange={handleProfileChange}
                      placeholder="Location"
                      className="mb-2"
                    />
                    <Textarea
                      name="about"
                      value={profile.about}
                      onChange={handleProfileChange}
                      placeholder="About you"
                      className="mb-2"
                    />
                  </>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-neon-yellow">{profile.name}</h2>
                    <p className="text-neon-teal mb-2">{profile.title}</p>
                    <p className="text-sm text-neon-orange/80 mb-2">{profile.location}</p>
                    <p className="text-sm text-white/80 mb-4">{profile.about}</p>
                  </>
                )}
                <div className="flex gap-2 justify-center">
                  {isEditing ? (
                    <Button size="sm" onClick={handleSaveProfile} className="bg-neon-teal text-black hover:bg-neon-teal/80">Save</Button>
                  ) : (
                    <Button size="sm" onClick={() => setIsEditing(true)} className="bg-neon-yellow text-black hover:bg-neon-yellow/80">Edit</Button>
                  )}
                </div>
              </div>
              
              <div className="w-full flex items-center justify-between mb-4 p-3 bg-black/70 border border-neon-yellow/20 rounded-lg">
                <div className="flex items-center">
                  <div className={`mr-2 h-3 w-3 rounded-full ${isPublic ? 'bg-neon-teal' : 'bg-gray-400'}`}></div>
                  <span className="font-medium">{isPublic ? 'Public Profile' : 'Private Profile'}</span>
                </div>
                <Switch 
                  checked={isPublic} 
                  onCheckedChange={setIsPublic} 
                />
              </div>
              
              <div className="w-full">
                <Button className="w-full mb-2 bg-neon-yellow/80 text-black hover:bg-neon-yellow" onClick={handleDownloadResume}>
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </Button>
                <Button variant="outline" className="w-full border-neon-teal/40 text-neon-teal" onClick={handleSharePortfolio}>
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
                      {profile.experience.map((exp, index) => (
                        <div key={exp.id} className="border-b pb-4 last:border-0 last:pb-0">
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="font-semibold text-lg">{exp.role}</h3>
                            <Badge variant="outline">{exp.duration}</Badge>
                            <div className="flex gap-1">
                              <Button size="sm" variant="outline" onClick={() => openModal('experience', 'edit', index)}>Edit</Button>
                              <Button size="sm" variant="destructive" onClick={() => deleteItem('experience', index)}>Delete</Button>
                            </div>
                          </div>
                          <p className="text-neon-teal mb-2">{exp.company}</p>
                          <p className="text-sm text-white/80">{exp.description}</p>
                        </div>
                      ))}
                      <Button variant="outline" className="w-full" onClick={() => openModal('experience', 'add')}>
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
                      {profile.education.map((edu, index) => (
                        <div key={edu.id} className="border-b pb-4 last:border-0 last:pb-0">
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="font-semibold text-lg">{edu.degree}</h3>
                            <Badge variant="outline">{edu.duration}</Badge>
                            <div className="flex gap-1">
                              <Button size="sm" variant="outline" onClick={() => openModal('education', 'edit', index)}>Edit</Button>
                              <Button size="sm" variant="destructive" onClick={() => deleteItem('education', index)}>Delete</Button>
                            </div>
                          </div>
                          <p className="text-neon-teal mb-2">{edu.institution}</p>
                          <p className="text-sm text-white/80">{edu.description}</p>
                        </div>
                      ))}
                      <Button variant="outline" className="w-full" onClick={() => openModal('education', 'add')}>
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
                      {profile.certifications.map((cert, index) => (
                        <div key={cert.id} className="border-b pb-4 last:border-0 last:pb-0">
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="font-semibold text-lg">{cert.name}</h3>
                            <Badge variant="outline">{cert.date}</Badge>
                            <div className="flex gap-1">
                              <Button size="sm" variant="outline" onClick={() => openModal('certifications', 'edit', index)}>Edit</Button>
                              <Button size="sm" variant="destructive" onClick={() => deleteItem('certifications', index)}>Delete</Button>
                              <Button size="sm" variant="ghost" onClick={() => window.open(cert.link, '_blank')}>View</Button>
                            </div>
                          </div>
                          <p className="text-neon-teal mb-2">{cert.issuer}</p>
                        </div>
                      ))}
                      <Button variant="outline" className="w-full" onClick={() => openModal('certifications', 'add')}>
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
                      {profile.projects.map((project, index) => (
                        <Card key={project.id} className="border">
                          <CardHeader className="pb-2">
                            <CardTitle>{project.title}</CardTitle>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <p className="text-neon-teal mb-2">{project.description}</p>
                            <div className="flex flex-wrap gap-1 mb-2">
                              {project.technologies && project.technologies.map((tech, i) => (
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
                            <Button size="sm" variant="outline" onClick={() => openModal('projects', 'edit', index)}>Edit</Button>
                            <Button size="sm" variant="destructive" onClick={() => deleteItem('projects', index)}>Delete</Button>
                            <Button size="sm" variant="ghost" onClick={() => window.open(project.link, '_blank')}>View</Button>
                          </CardFooter>
                        </Card>
                      ))}
                      <Button variant="outline" className="w-full" onClick={() => openModal('projects', 'add')}>
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
                      </CardTitle>
                      <CardDescription>
                        Rate your proficiency in various technical skills
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {profile.skills.map((skill, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <Label>{skill.name}</Label>
                            <span className="text-sm font-medium">{skill.proficiency}%</span>
                            <div className="flex gap-1">
                              <Button size="sm" variant="outline" onClick={() => openModal('skills', 'edit', index)}>Edit</Button>
                              <Button size="sm" variant="destructive" onClick={() => deleteItem('skills', index)}>Delete</Button>
                            </div>
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
                      <Button variant="outline" className="w-full" onClick={() => openModal('skills', 'add')}>
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
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {profile.languages.map((lang, index) => (
                          <div key={lang.id} className="flex justify-between items-center">
                            <div>
                              <Label>{lang.name}</Label>
                              <span className="ml-2 text-sm font-medium">{lang.level}</span>
                            </div>
                            <div className="flex gap-1">
                              <Button size="sm" variant="outline" onClick={() => openModal('languages', 'edit', index)}>Edit</Button>
                              <Button size="sm" variant="destructive" onClick={() => deleteItem('languages', index)}>Delete</Button>
                            </div>
                          </div>
                        ))}
                        <Button variant="outline" className="w-full mt-6" onClick={() => openModal('languages', 'add')}>
                          <Plus className="mr-2 h-4 w-4" />
                          Add Language
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="achievements" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Award className="mr-2 h-5 w-5 text-blue-600" />
                        Achievements & Awards
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {profile.achievements.map((ach, index) => (
                          <div key={ach.id} className="flex items-start gap-4 p-4 border rounded-lg">
                            <div className="bg-amber-100 p-2 rounded-full">
                              <Award className="h-6 w-6 text-amber-600" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold">{ach.title}</h3>
                              <p className="text-sm text-neon-teal">{ach.description}</p>
                              <Badge variant="outline" className="mt-2">{ach.year}</Badge>
                            </div>
                            <div className="flex flex-col gap-1">
                              <Button size="sm" variant="outline" onClick={() => openModal('achievements', 'edit', index)}>Edit</Button>
                              <Button size="sm" variant="destructive" onClick={() => deleteItem('achievements', index)}>Delete</Button>
                            </div>
                          </div>
                        ))}
                        <Button variant="outline" className="w-full mt-6" onClick={() => openModal('achievements', 'add')}>
                          <Plus className="mr-2 h-4 w-4" />
                          Add Achievement
                        </Button>
                      </div>
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
              </CardTitle>
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
              </CardTitle>
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
      {/* Modal for add/edit with custom fields for each section */}
      <Dialog open={modal.open} onOpenChange={closeModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{modal.type === 'add' ? 'Add' : 'Edit'} {modal.section.slice(0,1).toUpperCase() + modal.section.slice(1)}</DialogTitle>
          </DialogHeader>
          {/* Render fields based on section */}
          {modal.section === 'skills' && (
            <>
              <Label className="mb-1">Skill Name</Label>
              <select
                value={modalData.name || ''}
                onChange={e => setModalData({ ...modalData, name: e.target.value })}
                className="mb-2 w-full rounded-md border border-gray-300 bg-black/80 text-white px-3 py-2"
              >
                <option value="">Select Skill</option>
                <option value="React">React</option>
                <option value="JavaScript">JavaScript</option>
                <option value="TypeScript">TypeScript</option>
                <option value="Node.js">Node.js</option>
                <option value="Python">Python</option>
                <option value="AWS">AWS</option>
                <option value="MongoDB">MongoDB</option>
                <option value="Other">Other</option>
              </select>
              <Slider
                defaultValue={[modalData.proficiency || 0]}
                max={100}
                step={5}
                onValueChange={v => setModalData({ ...modalData, proficiency: v[0] })}
              />
            </>
          )}
          {modal.section === 'experience' && (
            <>
              <Label className="mb-1">Role</Label>
              <select
                value={modalData.role || ''}
                onChange={e => setModalData({ ...modalData, role: e.target.value })}
                className="mb-2 w-full rounded-md border border-gray-300 bg-black/80 text-white px-3 py-2"
              >
                <option value="">Select Role</option>
                <option value="Software Engineer">Software Engineer</option>
                <option value="Frontend Developer">Frontend Developer</option>
                <option value="Backend Developer">Backend Developer</option>
                <option value="Full Stack Developer">Full Stack Developer</option>
                <option value="Intern">Intern</option>
                <option value="Other">Other</option>
              </select>
              <Label className="mb-1">Company</Label>
              <Input
                value={modalData.company || ''}
                onChange={e => setModalData({ ...modalData, company: e.target.value })}
                placeholder="Company"
                className="mb-2"
              />
              <Label className="mb-1">Duration</Label>
              <select
                value={modalData.duration || ''}
                onChange={e => setModalData({ ...modalData, duration: e.target.value })}
                className="mb-2 w-full rounded-md border border-gray-300 bg-black/80 text-white px-3 py-2"
              >
                <option value="">Select Duration</option>
                <option value="2024 - Present">2024 - Present</option>
                <option value="2023 - 2024">2023 - 2024</option>
                <option value="2022 - 2023">2022 - 2023</option>
                <option value="2021 - 2022">2021 - 2022</option>
                <option value="2020 - 2021">2020 - 2021</option>
                <option value="Other">Other</option>
              </select>
              <Label className="mb-1">Description</Label>
              <Textarea
                value={modalData.description || ''}
                onChange={e => setModalData({ ...modalData, description: e.target.value })}
                placeholder="Description"
                className="mb-2"
              />
            </>
          )}
          {modal.section === 'education' && (
            <>
              <Label className="mb-1">Degree</Label>
              <select
                value={modalData.degree || ''}
                onChange={e => setModalData({ ...modalData, degree: e.target.value })}
                className="mb-2 w-full rounded-md border border-gray-300 bg-black/80 text-white px-3 py-2"
              >
                <option value="">Select Degree</option>
                <option value="B.Tech">B.Tech</option>
                <option value="M.Tech">M.Tech</option>
                <option value="B.Sc">B.Sc</option>
                <option value="M.Sc">M.Sc</option>
                <option value="PhD">PhD</option>
                <option value="Other">Other</option>
              </select>
              <Label className="mb-1">Institution</Label>
              <select
                value={modalData.institution || ''}
                onChange={e => setModalData({ ...modalData, institution: e.target.value })}
                className="mb-2 w-full rounded-md border border-gray-300 bg-black/80 text-white px-3 py-2"
              >
                <option value="">Select Institution</option>
                <option value="IIT Delhi">IIT Delhi</option>
                <option value="IIT Bombay">IIT Bombay</option>
                <option value="IIT Madras">IIT Madras</option>
                <option value="NIT Trichy">NIT Trichy</option>
                <option value="Other">Other</option>
              </select>
              <Label className="mb-1">Duration</Label>
              <select
                value={modalData.duration || ''}
                onChange={e => setModalData({ ...modalData, duration: e.target.value })}
                className="mb-2 w-full rounded-md border border-gray-300 bg-black/80 text-white px-3 py-2"
              >
                <option value="">Select Duration</option>
                <option value="2020 - 2024">2020 - 2024</option>
                <option value="2016 - 2020">2016 - 2020</option>
                <option value="2014 - 2016">2014 - 2016</option>
                <option value="Other">Other</option>
              </select>
              <Label className="mb-1">Description</Label>
              <Textarea
                value={modalData.description || ''}
                onChange={e => setModalData({ ...modalData, description: e.target.value })}
                placeholder="Description"
                className="mb-2"
              />
            </>
          )}
          {modal.section === 'projects' && (
            <>
              <Label className="mb-1">Title</Label>
              <Input
                value={modalData.title || ''}
                onChange={e => setModalData({ ...modalData, title: e.target.value })}
                placeholder="Project Title"
                className="mb-2"
              />
              <Label className="mb-1">Description</Label>
              <Textarea
                value={modalData.description || ''}
                onChange={e => setModalData({ ...modalData, description: e.target.value })}
                placeholder="Project Description"
                className="mb-2"
              />
              <Label className="mb-1">Technologies</Label>
              <select
                multiple
                value={modalData.technologies || []}
                onChange={e => setModalData({ ...modalData, technologies: Array.from(e.target.selectedOptions, option => option.value) })}
                className="mb-2 w-full rounded-md border border-gray-300 bg-black/80 text-white px-3 py-2"
              >
                <option value="React">React</option>
                <option value="Node.js">Node.js</option>
                <option value="MongoDB">MongoDB</option>
                <option value="Express">Express</option>
                <option value="Stripe">Stripe</option>
                <option value="Firebase">Firebase</option>
                <option value="Material UI">Material UI</option>
                <option value="Redux">Redux</option>
                <option value="OpenWeather API">OpenWeather API</option>
                <option value="HTML">HTML</option>
                <option value="CSS">CSS</option>
                <option value="Other">Other</option>
              </select>
              <Label className="mb-1">Link</Label>
              <Input
                value={modalData.link || ''}
                onChange={e => setModalData({ ...modalData, link: e.target.value })}
                placeholder="https://..."
                className="mb-2"
              />
            </>
          )}
          {modal.section === 'certifications' && (
            <>
              <Label className="mb-1">Name</Label>
              <Input
                value={modalData.name || ''}
                onChange={e => setModalData({ ...modalData, name: e.target.value })}
                placeholder="Certification Name"
                className="mb-2"
              />
              <Label className="mb-1">Issuer</Label>
              <Input
                value={modalData.issuer || ''}
                onChange={e => setModalData({ ...modalData, issuer: e.target.value })}
                placeholder="Issuer"
                className="mb-2"
              />
              <Label className="mb-1">Start Date</Label>
              <input
                type="date"
                value={modalData.startDate || ''}
                onChange={e => setModalData({ ...modalData, startDate: e.target.value })}
                className="mb-2 w-full rounded-md border border-gray-300 bg-black/80 text-white px-3 py-2"
              />
              <Label className="mb-1">End Date</Label>
              <input
                type="date"
                value={modalData.endDate || ''}
                onChange={e => setModalData({ ...modalData, endDate: e.target.value })}
                className="mb-2 w-full rounded-md border border-gray-300 bg-black/80 text-white px-3 py-2"
              />
              <Label className="mb-1">Date (Display)</Label>
              <Input
                value={modalData.date || ''}
                onChange={e => setModalData({ ...modalData, date: e.target.value })}
                placeholder="Date"
                className="mb-2"
              />
              <Label className="mb-1">Link</Label>
              <Input
                value={modalData.link || ''}
                onChange={e => setModalData({ ...modalData, link: e.target.value })}
                placeholder="https://..."
                className="mb-2"
              />
            </>
          )}
          {modal.section === 'achievements' && (
            <>
              <Label className="mb-1">Title</Label>
              <Input
                value={modalData.title || ''}
                onChange={e => setModalData({ ...modalData, title: e.target.value })}
                placeholder="Achievement Title"
                className="mb-2"
              />
              <Label className="mb-1">Description</Label>
              <Textarea
                value={modalData.description || ''}
                onChange={e => setModalData({ ...modalData, description: e.target.value })}
                placeholder="Description"
                className="mb-2"
              />
              <Label className="mb-1">Year</Label>
              <select
                value={modalData.year || ''}
                onChange={e => setModalData({ ...modalData, year: e.target.value })}
                className="mb-2 w-full rounded-md border border-gray-300 bg-black/80 text-white px-3 py-2"
              >
                <option value="">Select Year</option>
                {Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i).map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </>
          )}
          {modal.section === 'languages' && (
            <>
              <Label className="mb-1">Language</Label>
              <select
                value={modalData.name || ''}
                onChange={e => setModalData({ ...modalData, name: e.target.value })}
                className="mb-2 w-full rounded-md border border-gray-300 bg-black/80 text-white px-3 py-2"
              >
                <option value="">Select Language</option>
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
                <option value="Chinese">Chinese</option>
                <option value="Japanese">Japanese</option>
                <option value="Other">Other</option>
              </select>
              <Label className="mb-1">Proficiency Level</Label>
              <select
                value={modalData.level || ''}
                onChange={e => setModalData({ ...modalData, level: e.target.value })}
                className="mb-2 w-full rounded-md border border-gray-300 bg-black/80 text-white px-3 py-2"
              >
                <option value="">Select Proficiency</option>
                <option value="Native">Native</option>
                <option value="Fluent">Fluent</option>
                <option value="Professional">Professional</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Basic">Basic</option>
              </select>
            </>
          )}
          <DialogFooter>
            <Button onClick={saveModalData}>{modal.type === 'add' ? 'Add' : 'Save'}</Button>
            <Button variant="outline" onClick={closeModal}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PortfolioPage;
