
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Download, Share, Save, Pencil, MessageCircle, BookOpen, User } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { toast } from "@/hooks/use-toast";
import { downloadRoadmapAsPDF, saveRoadmap, shareRoadmap, isStepDone, markStepAsDone } from "@/utils/roadmapUtils";
import ShareDialog from "@/components/ShareDialog";
import GroupChat from "@/components/GroupChat";
import LearningDialog from "@/components/LearningDialog";

const RoadmapPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedEducation, setSelectedEducation] = useState("");
  const [selectedGoal, setSelectedGoal] = useState("");
  const [careerOptions, setCareerOptions] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [groupChatOpen, setGroupChatOpen] = useState(false);
  const [learningDialogOpen, setLearningDialogOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState<any>(null);
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});
  const [foundationProgress, setFoundationProgress] = useState(0);
  const [intermediateProgress, setIntermediateProgress] = useState(0);
  const [advancedProgress, setAdvancedProgress] = useState(0);

  // Current user data (would come from authentication in a real app)
  const currentUser = {
    name: "You",
    initials: "YO",
  };

  const educationLevels = [
    "10th Grade",
    "12th Grade (Science)",
    "12th Grade (Commerce)",
    "12th Grade (Arts)",
    "BTech/BE",
    "BSc",
    "BCom",
    "BA",
    "Pharmacy (BPharm)",
    "Diploma",
    "Other"
  ];

  const careerOptionsByEducation: Record<string, string[]> = {
    "10th Grade": [
      "Software Engineer",
      "Mechanical Engineer",
      "Civil Engineer",
      "AI/ML Specialist",
      "Doctor (MBBS)",
      "Dentist",
      "Pharmacist",
      "Nurse",
      "Graphic Designer",
      "Video Editor",
      "Game Developer",
      "Chartered Accountant (CA)",
      "Financial Analyst",
      "Entrepreneur",
      "Defense (NDA)",
      "Government Jobs (SSC)",
      "Digital Marketer"
    ],
    "12th Grade (Science)": [
      "Engineering (JEE/BTech)",
      "Medical (NEET/MBBS)",
      "Research Scientist",
      "Data Scientist",
      "Pilot"
    ],
    "12th Grade (Commerce)": [
      "Chartered Accountant (CA)",
      "Company Secretary (CS)",
      "MBA/BBA",
      "Financial Planner"
    ],
    "12th Grade (Arts)": [
      "Journalist",
      "Psychologist",
      "Teacher",
      "Content Writer",
      "Social Worker"
    ],
    "BTech/BE": [
      "Higher Studies (MTech/MS)",
      "IT Jobs (FAANG)",
      "Entrepreneurship",
      "Civil Services (UPSC)"
    ]
  };

  // Default career options for other education levels
  const defaultCareerOptions = [
    "Software Engineer",
    "Data Scientist",
    "IAS Officer",
    "Doctor",
    "Business Analyst",
    "Digital Marketer",
    "UI/UX Designer"
  ];

  // Sample course data for learning dialog
  const sampleCourse = {
    title: "Introduction to Computer Science",
    description: "A comprehensive introduction to computer science principles, algorithms, and programming fundamentals. Perfect for beginners starting their journey in software engineering.",
    duration: "6 weeks",
    level: "Beginner",
    instructor: "Dr. Rajesh Kumar",
    resources: {
      videos: [
        { 
          title: "Introduction to Programming", 
          url: "https://www.youtube.com/watch?v=zOjov-2OZ0E", 
          duration: "45 min" 
        },
        { 
          title: "Data Structures Basics", 
          url: "https://www.youtube.com/watch?v=zOjov-2OZ0E", 
          duration: "55 min" 
        },
        { 
          title: "Algorithms and Complexity", 
          url: "https://www.youtube.com/watch?v=zOjov-2OZ0E", 
          duration: "60 min" 
        }
      ],
      readings: [
        { 
          title: "Programming Fundamentals PDF", 
          url: "https://example.com/fundamentals.pdf", 
          type: "PDF Document" 
        },
        { 
          title: "Introduction to Computer Science", 
          url: "https://example.com/cs101", 
          type: "Web Resource" 
        }
      ],
      exercises: [
        {
          title: "Basic Programming Exercises",
          description: "Complete 5 basic programming exercises to test your understanding of variables, loops, and conditionals."
        },
        {
          title: "Algorithm Implementation",
          description: "Implement a simple sorting algorithm and analyze its time complexity."
        }
      ]
    }
  };

  useEffect(() => {
    if (selectedEducation) {
      setCareerOptions(careerOptionsByEducation[selectedEducation] || defaultCareerOptions);
    }
    
    // Update progress based on current step
    if (currentStep === 1) {
      setProgress(33);
    } else if (currentStep === 2) {
      setProgress(66);
    } else if (currentStep === 3) {
      setProgress(100);
      
      // Load completed steps from localStorage
      try {
        const savedSteps = JSON.parse(localStorage.getItem('completedRoadmapSteps') || '{}');
        setCompletedSteps(savedSteps);
        
        // Calculate progress for each stage
        let foundationDone = 0;
        let foundationTotal = 2; // Number of foundation items
        let intermediateDone = 0;
        let intermediateTotal = 2; // Number of intermediate items
        let advancedDone = 0;
        let advancedTotal = 2; // Number of advanced items
        
        Object.keys(savedSteps).forEach(key => {
          if (savedSteps[key] && key.includes('foundation')) {
            foundationDone++;
          } else if (savedSteps[key] && key.includes('intermediate')) {
            intermediateDone++;
          } else if (savedSteps[key] && key.includes('advanced')) {
            advancedDone++;
          }
        });
        
        setFoundationProgress((foundationDone / foundationTotal) * 100);
        setIntermediateProgress((intermediateDone / intermediateTotal) * 100);
        setAdvancedProgress((advancedDone / advancedTotal) * 100);
      } catch (error) {
        console.error("Error loading completed steps:", error);
      }
    }
  }, [selectedEducation, currentStep]);

  const handleNext = () => {
    if (currentStep === 1 && selectedEducation) {
      setCurrentStep(2);
    } else if (currentStep === 2 && selectedGoal) {
      setCurrentStep(3);
    }
  };

  const handleMarkAsDone = (stepId: string) => {
    const isDone = !completedSteps[stepId];
    const newCompletedSteps = { ...completedSteps, [stepId]: isDone };
    setCompletedSteps(newCompletedSteps);
    markStepAsDone(stepId, isDone);
    
    // Update progress
    if (stepId.includes('foundation')) {
      setFoundationProgress(prev => isDone ? prev + 50 : prev - 50);
    } else if (stepId.includes('intermediate')) {
      setIntermediateProgress(prev => isDone ? prev + 50 : prev - 50);
    } else if (stepId.includes('advanced')) {
      setAdvancedProgress(prev => isDone ? prev + 50 : prev - 50);
    }
    
    toast({
      title: isDone ? "Step completed!" : "Step marked as incomplete",
      description: isDone ? "Great job! Keep going to complete your roadmap." : "You can complete this step later."
    });
  };

  const handleSaveRoadmap = () => {
    const roadmapData = {
      education: selectedEducation,
      careerGoal: selectedGoal,
      stages: [
        {
          name: "Foundation Stage",
          courses: [
            {
              title: "Introduction to Computer Science",
              links: [
                { type: "YouTube", url: "https://www.youtube.com/watch?v=zOjov-2OZ0E" },
                { type: "Free Course", url: "https://example.com/cs101" }
              ]
            },
            {
              title: "Data Structures & Algorithms",
              links: [
                { type: "YouTube", url: "https://www.youtube.com/watch?v=zOjov-2OZ0E" },
                { type: "Premium", url: "https://example.com/dsa" }
              ]
            }
          ],
          skills: ["Problem Solving", "Basic Programming"],
          projects: ["Personal portfolio website", "Simple applications"]
        },
        {
          name: "Intermediate Stage",
          courses: [
            {
              title: "Advanced Programming",
              links: [
                { type: "YouTube", url: "https://www.youtube.com/watch?v=zOjov-2OZ0E" }
              ]
            },
            {
              title: "Web Development",
              links: [
                { type: "YouTube", url: "https://www.youtube.com/watch?v=zOjov-2OZ0E" }
              ]
            }
          ],
          skills: ["Frontend Development", "Backend Development"],
          projects: ["E-commerce website", "Social media app"]
        },
        {
          name: "Advanced Stage",
          courses: [
            {
              title: "System Design",
              links: [
                { type: "YouTube", url: "https://www.youtube.com/watch?v=zOjov-2OZ0E" }
              ]
            },
            {
              title: "DevOps",
              links: [
                { type: "YouTube", url: "https://www.youtube.com/watch?v=zOjov-2OZ0E" }
              ]
            }
          ],
          skills: ["Cloud Computing", "CI/CD"],
          projects: ["Enterprise application", "Cloud-native app"]
        }
      ],
      timeline: {
        foundation: "2 months",
        intermediate: "4 months",
        advanced: "3 months",
        total: "9 months"
      }
    };

    const success = saveRoadmap(roadmapData);
    if (success) {
      toast({
        title: "Roadmap saved!",
        description: "Your roadmap has been saved to your device."
      });
    } else {
      toast({
        title: "Error saving roadmap",
        description: "There was an error saving your roadmap. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleDownloadPDF = async () => {
    toast({
      title: "Preparing PDF...",
      description: "Your roadmap PDF is being generated..."
    });
    
    const success = await downloadRoadmapAsPDF('roadmap-content', `${selectedGoal.replace(/\s+/g, '-')}-roadmap`);
    if (success) {
      toast({
        title: "Download complete!",
        description: "Your roadmap has been downloaded as a PDF."
      });
    } else {
      toast({
        title: "Error downloading PDF",
        description: "There was an error generating your PDF. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleShareRoadmap = () => {
    setShareDialogOpen(true);
  };

  const handleJoinGroup = () => {
    setGroupChatOpen(true);
  };

  const handleStartLearning = (course: any) => {
    setCurrentCourse(sampleCourse);
    setLearningDialogOpen(true);
  };

  const handleViewAllRoadmaps = () => {
    // Navigate to a page that shows all available roadmaps
    toast({
      title: "View All Roadmaps",
      description: "This would navigate to a page showing all available roadmaps."
    });
  };

  const handleCustomize = () => {
    toast({
      title: "Customize Roadmap",
      description: "This would open a roadmap customization interface."
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 py-16 relative">
      {/* Blurry background elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-3000"></div>
        <div className="absolute -bottom-20 right-1/4 w-96 h-96 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Progress bar */}
          <div className="mb-8 bg-white/70 backdrop-blur-md p-4 rounded-2xl shadow-sm">
            <div className="flex justify-between text-sm font-medium mb-2">
              <span>Select Education</span>
              <span>Select Career</span>
              <span>View Roadmap</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          {currentStep === 1 && (
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
                Build Your <span className="gradient-text">Roadmap</span>
              </h1>
              
              <div className="mt-8">
                <h2 className="text-3xl font-bold mb-3 text-center">I am a...</h2>
                <p className="text-gray-600 text-center mb-10">
                  Select your current education level to begin your journey
                </p>
                
                <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-10 flex flex-col items-center border border-white/50">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
                    {educationLevels.map((level) => (
                      <button
                        key={level}
                        onClick={() => setSelectedEducation(level)}
                        className={`p-4 rounded-xl text-left transition-all flex items-center ${
                          selectedEducation === level
                            ? "bg-gradient-to-r from-blue-500 to-violet-500 text-white shadow-md"
                            : "bg-white hover:bg-gray-50 text-gray-800 border border-gray-100"
                        }`}
                      >
                        {selectedEducation === level && (
                          <Check className="mr-2 h-4 w-4 text-white" />
                        )}
                        {level}
                      </button>
                    ))}
                  </div>
                  
                  <Button 
                    className="mt-10 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white shadow-md" 
                    size="lg" 
                    onClick={handleNext}
                    disabled={!selectedEducation}
                  >
                    Next <ArrowRight className="ml-2" size={16} />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
                Build Your <span className="gradient-text">Roadmap</span>
              </h1>
              
              <div className="mt-8">
                <h2 className="text-3xl font-bold mb-3 text-center">I want to become...</h2>
                <p className="text-gray-600 text-center mb-10">
                  Select your dream career path
                </p>
                
                <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-10 flex flex-col items-center border border-white/50">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
                    {careerOptions.map((goal) => (
                      <button
                        key={goal}
                        onClick={() => setSelectedGoal(goal)}
                        className={`p-4 rounded-xl text-left transition-all flex items-center ${
                          selectedGoal === goal
                            ? "bg-gradient-to-r from-blue-500 to-violet-500 text-white shadow-md"
                            : "bg-white hover:bg-gray-50 text-gray-800 border border-gray-100"
                        }`}
                      >
                        {selectedGoal === goal && (
                          <Check className="mr-2 h-4 w-4 text-white" />
                        )}
                        {goal}
                      </button>
                    ))}
                  </div>
                  
                  <div className="flex space-x-4 mt-10">
                    <Button 
                      variant="outline" 
                      onClick={() => setCurrentStep(1)}
                      className="border-gray-300"
                    >
                      Back
                    </Button>
                    <Button 
                      className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white shadow-md"
                      onClick={handleNext}
                      disabled={!selectedGoal}
                    >
                      Next <ArrowRight className="ml-2" size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
                Your <span className="gradient-text">Personalized Roadmap</span>
              </h1>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Sidebar */}
                <div className="lg:col-span-1">
                  <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 sticky top-24 border border-white/50">
                    <div className="mb-6 p-4 border border-gray-100 rounded-lg bg-gray-50/80">
                      <p className="font-medium">Current Level: <span className="text-blue-600">{selectedEducation}</span></p>
                      <p className="font-medium">Career Goal: <span className="text-violet-600">{selectedGoal}</span></p>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="font-bold mb-3">Your Progress</h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Foundation Stage</span>
                            <span>{foundationProgress}%</span>
                          </div>
                          <Progress value={foundationProgress} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Intermediate Stage</span>
                            <span>{intermediateProgress}%</span>
                          </div>
                          <Progress value={intermediateProgress} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Advanced Stage</span>
                            <span>{advancedProgress}%</span>
                          </div>
                          <Progress value={advancedProgress} className="h-2" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="font-bold mb-3">Estimated Timeline</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Foundation Stage</span>
                          <span>2 months</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Intermediate Stage</span>
                          <span>4 months</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Advanced Stage</span>
                          <span>3 months</span>
                        </div>
                        <div className="flex justify-between font-medium pt-2 border-t">
                          <span>Total Duration</span>
                          <span>9 months</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="font-bold mb-3">Join Community</h3>
                      <Button 
                        className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
                        onClick={handleJoinGroup}
                      >
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Join {selectedGoal} Group
                      </Button>
                    </div>
                    
                    <div>
                      <h3 className="font-bold mb-3">Get the App</h3>
                      <div className="bg-gray-100 p-4 rounded-lg flex flex-col items-center">
                        <div className="mb-2 bg-white p-2 rounded-lg">
                          {/* QR Code placeholder */}
                          <div className="w-24 h-24 bg-gray-200 rounded"></div>
                        </div>
                        <span className="text-xs text-gray-500">Scan to continue on mobile</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Main content */}
                <div className="lg:col-span-2">
                  <div id="roadmap-content" className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/50">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold">{selectedGoal} Roadmap</h2>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={handleDownloadPDF}>
                          <Download className="mr-1 h-4 w-4" />
                          PDF
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleShareRoadmap}>
                          <Share className="mr-1 h-4 w-4" />
                          Share
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-8">
                      <div className="flex">
                        <div className="mr-4 flex flex-col items-center">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 text-white flex items-center justify-center font-bold shadow-md">1</div>
                          <div className="w-1 h-full bg-gradient-to-b from-blue-500 to-violet-500 mt-2 rounded-full"></div>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex-1">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-xl text-gray-900">Foundation Stage</h3>
                            <Button 
                              variant={completedSteps['foundation-stage'] ? "default" : "outline"} 
                              size="sm" 
                              className={completedSteps['foundation-stage'] ? "bg-green-600" : "text-xs"}
                              onClick={() => handleMarkAsDone('foundation-stage')}
                            >
                              <Check className="mr-1 h-4 w-4" />
                              {completedSteps['foundation-stage'] ? "Completed" : "Mark as Done"}
                            </Button>
                          </div>
                          <p className="text-gray-700 mb-4">Build core knowledge and skills needed for your journey</p>
                          
                          <div className="space-y-6">
                            <div>
                              <h4 className="font-semibold text-blue-700 mb-2 flex items-center">
                                <BookOpen className="mr-2 h-4 w-4" />
                                Courses
                              </h4>
                              <ul className="space-y-3">
                                <li className="flex flex-col">
                                  <div className="flex items-center justify-between">
                                    <span className="text-gray-800">Introduction to Computer Science</span>
                                    <Button 
                                      size="sm" 
                                      variant="ghost" 
                                      className="h-7 text-xs text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                                      onClick={() => handleStartLearning("intro-cs")}
                                    >
                                      Start Learning
                                    </Button>
                                  </div>
                                  <div className="flex flex-wrap gap-2 mt-1">
                                    <a 
                                      href="https://www.youtube.com/watch?v=zOjov-2OZ0E" 
                                      target="_blank" 
                                      rel="noopener noreferrer" 
                                      className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded flex items-center"
                                    >
                                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path><path d="m10 15 5-3-5-3z"></path></svg>
                                      YouTube
                                    </a>
                                    <a 
                                      href="https://example.com/cs101" 
                                      target="_blank" 
                                      rel="noopener noreferrer" 
                                      className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded flex items-center"
                                    >
                                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><rect width="20" height="14" x="2" y="7" rx="2"/><path d="M16 2v5"/><path d="M8 2v5"/><path d="M12 13h.01"/><path d="M17 13h.01"/><path d="M7 13h.01"/><path d="M12 17h.01"/><path d="M17 17h.01"/><path d="M7 17h.01"/></svg>
                                      Free Course
                                    </a>
                                  </div>
                                </li>
                                <li className="flex flex-col">
                                  <div className="flex items-center justify-between">
                                    <span className="text-gray-800">Data Structures & Algorithms</span>
                                    <Button 
                                      size="sm" 
                                      variant="ghost" 
                                      className="h-7 text-xs text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                                      onClick={() => handleStartLearning("dsa")}
                                    >
                                      Start Learning
                                    </Button>
                                  </div>
                                  <div className="flex flex-wrap gap-2 mt-1">
                                    <a 
                                      href="https://www.youtube.com/watch?v=zOjov-2OZ0E" 
                                      target="_blank" 
                                      rel="noopener noreferrer" 
                                      className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded flex items-center"
                                    >
                                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path><path d="m10 15 5-3-5-3z"></path></svg>
                                      YouTube
                                    </a>
                                    <a 
                                      href="https://example.com/dsa" 
                                      target="_blank" 
                                      rel="noopener noreferrer" 
                                      className="text-xs bg-violet-50 text-violet-700 px-2 py-1 rounded flex items-center"
                                    >
                                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><circle cx="12" cy="12" r="10"></circle><path d="M6 12h12"></path><path d="M12 6v12"></path></svg>
                                      Premium
                                    </a>
                                  </div>
                                </li>
                              </ul>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold text-emerald-700 mb-2 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M2 12h2a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4a2 2 0 0 1 2-2h2"></path><path d="M16 8V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v4"></path><path d="M12 2v10"></path><path d="m9 7 3 3 3-3"></path></svg>
                                Skills
                              </h4>
                              <ul className="space-y-1 ml-2">
                                <li className="flex items-start">
                                  <span className="bg-emerald-100 text-emerald-800 text-xs font-medium px-2 py-1 rounded">Problem Solving</span>
                                </li>
                                <li className="flex items-start">
                                  <span className="bg-emerald-100 text-emerald-800 text-xs font-medium px-2 py-1 rounded">Basic Programming</span>
                                </li>
                              </ul>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold text-violet-700 mb-2 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M20 10c0 6-8 10-8 10s-8-4-8-10a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                Projects
                              </h4>
                              <ul className="space-y-1 ml-2">
                                <li className="flex items-start">
                                  <span className="bg-violet-100 text-violet-800 text-xs font-medium px-2 py-1 rounded">Personal portfolio website</span>
                                </li>
                                <li className="flex items-start">
                                  <span className="bg-violet-100 text-violet-800 text-xs font-medium px-2 py-1 rounded">Simple applications</span>
                                </li>
                              </ul>
                            </div>
                            
                            <div className="flex space-x-2 mt-4 pt-4 border-t border-gray-100">
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="text-xs flex items-center"
                                onClick={() => setGroupChatOpen(true)}
                              >
                                <User className="mr-1 h-4 w-4" />
                                Ask a Mentor
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="text-xs flex items-center"
                                onClick={() => setGroupChatOpen(true)}
                              >
                                <MessageCircle className="mr-1 h-4 w-4" />
                                Discuss
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <div className="mr-4 flex flex-col items-center">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 text-white flex items-center justify-center font-bold shadow-md">2</div>
                          <div className="w-1 h-full bg-gradient-to-b from-blue-500 to-violet-500 mt-2 rounded-full"></div>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex-1">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-xl text-gray-900">Intermediate Stage</h3>
                            <Button 
                              variant={completedSteps['intermediate-stage'] ? "default" : "outline"} 
                              size="sm" 
                              className={completedSteps['intermediate-stage'] ? "bg-green-600" : "text-xs"}
                              onClick={() => handleMarkAsDone('intermediate-stage')}
                            >
                              <Check className="mr-1 h-4 w-4" />
                              {completedSteps['intermediate-stage'] ? "Completed" : "Mark as Done"}
                            </Button>
                          </div>
                          <p className="text-gray-700 mb-4">Deepen knowledge and begin to specialize in your field</p>
                          
                          {/* Similar structure as the first stage */}
                          <div className="space-y-6">
                            <div>
                              <h4 className="font-semibold text-blue-700 mb-2 flex items-center">
                                <BookOpen className="mr-2 h-4 w-4" />
                                Courses
                              </h4>
                              <ul className="space-y-3">
                                <li className="flex flex-col">
                                  <div className="flex items-center justify-between">
                                    <span className="text-gray-800">Advanced Programming</span>
                                    <Button 
                                      size="sm" 
                                      variant="ghost" 
                                      className="h-7 text-xs text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                                      onClick={() => handleStartLearning("adv-programming")}
                                    >
                                      Start Learning
                                    </Button>
                                  </div>
                                </li>
                                <li className="flex flex-col">
                                  <div className="flex items-center justify-between">
                                    <span className="text-gray-800">Web Development</span>
                                    <Button 
                                      size="sm" 
                                      variant="ghost" 
                                      className="h-7 text-xs text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                                      onClick={() => handleStartLearning("web-dev")}
                                    >
                                      Start Learning
                                    </Button>
                                  </div>
                                </li>
                              </ul>
                            </div>
                            
                            {/* Add more sections similar to the first stage */}
                            <div className="flex space-x-2 mt-4 pt-4 border-t border-gray-100">
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="text-xs flex items-center"
                                onClick={() => setGroupChatOpen(true)}
                              >
                                <User className="mr-1 h-4 w-4" />
                                Ask a Mentor
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="text-xs flex items-center"
                                onClick={() => setGroupChatOpen(true)}
                              >
                                <MessageCircle className="mr-1 h-4 w-4" />
                                Discuss
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <div className="mr-4 flex flex-col items-center">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 text-white flex items-center justify-center font-bold shadow-md">3</div>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex-1">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-xl text-gray-900">Advanced Stage</h3>
                            <Button 
                              variant={completedSteps['advanced-stage'] ? "default" : "outline"} 
                              size="sm" 
                              className={completedSteps['advanced-stage'] ? "bg-green-600" : "text-xs"}
                              onClick={() => handleMarkAsDone('advanced-stage')}
                            >
                              <Check className="mr-1 h-4 w-4" />
                              {completedSteps['advanced-stage'] ? "Completed" : "Mark as Done"}
                            </Button>
                          </div>
                          <p className="text-gray-700 mb-4">Master skills and prepare for industry</p>
                          
                          {/* Similar structure as previous stages */}
                          <div className="space-y-6">
                            <div>
                              <h4 className="font-semibold text-blue-700 mb-2 flex items-center">
                                <BookOpen className="mr-2 h-4 w-4" />
                                Courses
                              </h4>
                              <ul className="space-y-3">
                                <li className="flex flex-col">
                                  <div className="flex items-center justify-between">
                                    <span className="text-gray-800">System Design</span>
                                    <Button 
                                      size="sm" 
                                      variant="ghost" 
                                      className="h-7 text-xs text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                                      onClick={() => handleStartLearning("system-design")}
                                    >
                                      Start Learning
                                    </Button>
                                  </div>
                                </li>
                                <li className="flex flex-col">
                                  <div className="flex items-center justify-between">
                                    <span className="text-gray-800">DevOps</span>
                                    <Button 
                                      size="sm" 
                                      variant="ghost" 
                                      className="h-7 text-xs text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                                      onClick={() => handleStartLearning("devops")}
                                    >
                                      Start Learning
                                    </Button>
                                  </div>
                                </li>
                              </ul>
                            </div>
                            
                            {/* Add more sections similar to previous stages */}
                            <div className="flex space-x-2 mt-4 pt-4 border-t border-gray-100">
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="text-xs flex items-center"
                                onClick={() => setGroupChatOpen(true)}
                              >
                                <User className="mr-1 h-4 w-4" />
                                Ask a Mentor
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="text-xs flex items-center"
                                onClick={() => setGroupChatOpen(true)}
                              >
                                <MessageCircle className="mr-1 h-4 w-4" />
                                Discuss
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Action buttons */}
                    <div className="mt-10 flex flex-wrap gap-3 justify-center">
                      <Button 
                        className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white"
                        onClick={handleSaveRoadmap}
                      >
                        <Save className="mr-2 h-4 w-4" />
                        Save Roadmap
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={handleDownloadPDF}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={handleCustomize}
                      >
                        <Pencil className="mr-2 h-4 w-4" />
                        Customize
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={handleShareRoadmap}
                      >
                        <Share className="mr-2 h-4 w-4" />
                        Share
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-10 text-center">
                <p className="text-gray-600 mb-4">Not what you're looking for?</p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button variant="outline" onClick={() => setCurrentStep(1)}>
                    Start Over
                  </Button>
                  <Button variant="outline" onClick={() => navigate("/quiz")}>
                    Take Career Quiz
                  </Button>
                  <Button variant="outline" onClick={handleViewAllRoadmaps}>
                    Browse All Roadmaps
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Share Dialog */}
      <ShareDialog 
        open={shareDialogOpen}
        onOpenChange={setShareDialogOpen}
        title={`${selectedGoal} Roadmap`}
        url={window.location.href}
      />
      
      {/* Group Chat Dialog */}
      <GroupChat 
        open={groupChatOpen}
        onOpenChange={setGroupChatOpen}
        groupName={selectedGoal || "Career"}
        currentUser={currentUser}
      />
      
      {/* Learning Dialog */}
      {currentCourse && (
        <LearningDialog 
          open={learningDialogOpen}
          onOpenChange={setLearningDialogOpen}
          course={currentCourse}
        />
      )}
    </div>
  );
};

export default RoadmapPage;
