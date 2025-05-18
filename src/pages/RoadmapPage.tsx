import { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Download, Share, Save, Pencil, MessageCircle, BookOpen, User, Calendar, Target, School, GitFork } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { toast } from "@/hooks/use-toast";
import { downloadRoadmapAsPDF, saveRoadmap, shareRoadmap, isStepDone, markStepAsDone, generateRoadmap, RoadmapData, careerRoadmapTemplates, educationalPaths } from "@/utils/roadmapUtils";
import ShareDialog from "@/components/ShareDialog";
import GroupChat from "@/components/GroupChat";
import LearningDialog from "@/components/LearningDialog";
const RoadmapPage = () => {
  const navigate = useNavigate();
  const {
    careerPath
  } = useParams<{
    careerPath: string;
  }>();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedEducation, setSelectedEducation] = useState("");
  const [selectedGoal, setSelectedGoal] = useState(careerPath ? decodeURIComponent(careerPath) : "");
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
  const [roadmapData, setRoadmapData] = useState<RoadmapData | null>(null);
  const [nextStepsVisible, setNextStepsVisible] = useState<Record<number, boolean>>({});

  // Current user data (would come from authentication in a real app)
  const currentUser = {
    name: "You",
    initials: "YO"
  };
  const educationLevels = ["10th Grade", "12th Grade (Science)", "12th Grade (Commerce)", "12th Grade (Arts)", "BTech/BE", "BSc", "BCom", "BA", "Pharmacy (BPharm)", "Diploma", "Other"];
  const careerOptionsByEducation: Record<string, string[]> = {
    "10th Grade": ["Software Developer", "Engineer", "Doctor", "IAS Officer", "Lawyer", "Chartered Accountant", "Designer", "Data Scientist"],
    "12th Grade (Science)": ["Software Developer", "Data Scientist", "Doctor", "Engineer"],
    "12th Grade (Commerce)": ["Chartered Accountant", "IAS Officer", "Lawyer"],
    "12th Grade (Arts)": ["IAS Officer", "Lawyer", "Designer"],
    "BTech/BE": ["Software Developer", "Data Scientist", "Engineer", "IAS Officer"],
    "BSc": ["Data Scientist", "Doctor", "IAS Officer"],
    "BCom": ["Chartered Accountant", "IAS Officer", "Lawyer"],
    "BA": ["IAS Officer", "Lawyer", "Designer"],
    "Diploma": ["Engineer", "Software Developer", "Designer"]
  };

  // Default career options for other education levels
  const defaultCareerOptions = Object.keys(careerRoadmapTemplates).filter(key => key !== 'default');
  useEffect(() => {
    // If a career path is specified in the URL, go directly to step 3
    if (careerPath) {
      setSelectedGoal(decodeURIComponent(careerPath));
      // For URL-based navigation, we'll use a default education level if none was selected
      const defaultEducation = "Other";
      setSelectedEducation(defaultEducation);
      setCurrentStep(3);

      // Generate roadmap data based on the provided career path
      const generatedRoadmap = generateRoadmap(defaultEducation, decodeURIComponent(careerPath));
      setRoadmapData(generatedRoadmap);

      // Update progress to 100% since we're at step 3
      setProgress(100);

      // Load any completed steps from localStorage
      try {
        const savedSteps = JSON.parse(localStorage.getItem('completedRoadmapSteps') || '{}');
        setCompletedSteps(savedSteps);
        updateStageProgress(savedSteps);
      } catch (error) {
        console.error("Error loading completed steps:", error);
      }
    }
  }, [careerPath]);
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
      if (selectedEducation && selectedGoal && !roadmapData) {
        // Generate roadmap data based on selected education and goal
        const generatedRoadmap = generateRoadmap(selectedEducation, selectedGoal);
        setRoadmapData(generatedRoadmap);
      }

      // Load completed steps from localStorage
      try {
        const savedSteps = JSON.parse(localStorage.getItem('completedRoadmapSteps') || '{}');
        setCompletedSteps(savedSteps);
        updateStageProgress(savedSteps);
      } catch (error) {
        console.error("Error loading completed steps:", error);
      }
    }
  }, [selectedEducation, currentStep, selectedGoal, roadmapData]);
  const updateStageProgress = (savedSteps: Record<string, boolean>) => {
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
    setFoundationProgress(foundationDone / foundationTotal * 100);
    setIntermediateProgress(intermediateDone / intermediateTotal * 100);
    setAdvancedProgress(advancedDone / advancedTotal * 100);
  };
  const handleNext = () => {
    if (currentStep === 1 && selectedEducation) {
      setCurrentStep(2);
    } else if (currentStep === 2 && selectedGoal) {
      setCurrentStep(3);
    }
  };
  const handleMarkAsDone = (stepId: string) => {
    const isDone = !completedSteps[stepId];
    const newCompletedSteps = {
      ...completedSteps,
      [stepId]: isDone
    };
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
  const toggleNextSteps = (index: number) => {
    setNextStepsVisible(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };
  const handleSaveRoadmap = () => {
    if (roadmapData) {
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
    } else {
      toast({
        title: "No roadmap to save",
        description: "Please complete your selections to generate a roadmap first.",
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
    // In a real app, you would fetch course details
    // For now, we'll use the selected course title to construct a sample course
    setCurrentCourse({
      title: course.title || "Course Title",
      description: "A comprehensive course to help you master the required skills for your career path.",
      duration: "6 weeks",
      level: "Beginner to Intermediate",
      instructor: "Expert Instructor",
      resources: {
        videos: [{
          title: "Introduction to the Course",
          url: course.links?.[0]?.url || "https://www.youtube.com/watch?v=example",
          duration: "45 min"
        }, {
          title: "Key Concepts",
          url: "https://www.youtube.com/watch?v=example",
          duration: "55 min"
        }],
        readings: [{
          title: "Course Materials PDF",
          url: "https://example.com/materials.pdf",
          type: "PDF Document"
        }],
        exercises: [{
          title: "Practice Exercises",
          description: "Complete these exercises to test your understanding."
        }]
      }
    });
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
  const getEducationalPathInfo = () => {
    if (!selectedEducation || !selectedGoal) return null;
    const educationPath = educationalPaths[selectedEducation] || educationalPaths["Other"];
    return educationPath[selectedGoal] || educationPath["default"];
  };
  const renderNextStepsInfo = (stageIndex: number) => {
    const pathInfo = getEducationalPathInfo();
    if (!pathInfo || stageIndex !== 0) return null;
    return <div className="mt-6 pt-4 border-t border-gray-100">
        <h4 className="font-semibold text-blue-700 mb-3 flex items-center cursor-pointer" onClick={() => toggleNextSteps(stageIndex)}>
          <GitFork className="mr-2 h-4 w-4" />
          What's Next? {nextStepsVisible[stageIndex] ? '▼' : '►'}
        </h4>
        
        {nextStepsVisible[stageIndex] && <div className="pl-6 space-y-4 animate-fadeIn">
            {/* Next Steps */}
            {pathInfo.nextSteps && pathInfo.nextSteps.length > 0 && <div>
                <h5 className="font-medium text-gray-700 mb-1">Next Steps:</h5>
                <ul className="list-disc pl-5 text-sm text-gray-600">
                  {pathInfo.nextSteps.map((step, i) => <li key={i} className="mb-1">{step}</li>)}
                </ul>
              </div>}
            
            {/* Stream Options */}
            {pathInfo.streamOptions && pathInfo.streamOptions.length > 0 && <div>
                <h5 className="font-medium text-gray-700 mb-1">Stream Options:</h5>
                <div className="flex flex-wrap gap-2">
                  {pathInfo.streamOptions.map((stream, i) => <span key={i} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded">
                      {stream}
                    </span>)}
                </div>
              </div>}
            
            {/* Entrance Exams */}
            {pathInfo.entranceExams && pathInfo.entranceExams.length > 0 && <div>
                <h5 className="font-medium text-gray-700 mb-2">Entrance Exams:</h5>
                <div className="space-y-3">
                  {pathInfo.entranceExams.map((exam, i) => <div key={i} className="bg-violet-50 p-3 rounded-md">
                      <div className="font-medium text-violet-800">{exam.name}</div>
                      <div className="grid grid-cols-1 gap-1 mt-1 text-xs text-violet-700">
                        <div className="flex items-center">
                          <Target className="h-3 w-3 mr-1" /> 
                          Target Rank: {exam.targetRank}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" /> 
                          Exam Month: {exam.examMonth}
                        </div>
                        <div className="flex items-center">
                          <User className="h-3 w-3 mr-1" /> 
                          Eligibility: {exam.eligibility}
                        </div>
                      </div>
                    </div>)}
                </div>
              </div>}
            
            {/* College Options */}
            {pathInfo.collegeOptions && pathInfo.collegeOptions.length > 0 && <div>
                <h5 className="font-medium text-gray-700 mb-2">College Options:</h5>
                <div className="space-y-2">
                  {pathInfo.collegeOptions.map((option, i) => <div key={i}>
                      <div className="text-sm font-medium text-gray-700">{option.tier} Tier:</div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {option.examples.map((college, j) => <span key={j} className="bg-emerald-50 text-emerald-700 text-xs px-2 py-1 rounded">
                            <School className="inline h-3 w-3 mr-1" /> {college}
                          </span>)}
                      </div>
                    </div>)}
                </div>
              </div>}
          </div>}
      </div>;
  };
  const renderRoadmapContent = () => {
    if (!roadmapData) return null;
    return <div className="space-y-8">
        {roadmapData.stages.map((stage, index) => <div key={index} className="flex">
            <div className="mr-4 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 text-white flex items-center justify-center font-bold shadow-md">{index + 1}</div>
              {index < roadmapData.stages.length - 1 && <div className="w-1 h-full bg-gradient-to-b from-blue-500 to-violet-500 mt-2 rounded-full"></div>}
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex-1">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-xl text-gray-900">{stage.name}</h3>
                <Button variant={completedSteps[`${stage.name.toLowerCase().replace(/\s+/g, '-')}`] ? "default" : "outline"} size="sm" onClick={() => handleMarkAsDone(`${stage.name.toLowerCase().replace(/\s+/g, '-')}`)} className="rounded-3xl my-0 text-base bg-[E5D0AC] bg-[#e5d0ac] py-[7px] px-[24px] font-light">
                  <Check className="mr-1 h-4 w-4" />
                  {completedSteps[`${stage.name.toLowerCase().replace(/\s+/g, '-')}`] ? "Completed" : "Mark as Done"}
                </Button>
              </div>
              
              <p className="text-gray-700 mb-4">
                {stage.description || <>
                    {index === 0 && "Build core knowledge and skills needed for your journey"}
                    {index === 1 && "Deepen knowledge and begin to specialize in your field"}
                    {index === 2 && "Master skills and prepare for industry"}
                  </>}
              </p>
              
              <div className="space-y-6">
                {/* Entrance Exams if available */}
                {stage.examInfo && stage.examInfo.exams && stage.examInfo.exams.length > 0 && <div>
                    <h4 className="font-semibold text-violet-700 mb-2 flex items-center">
                      <Target className="mr-2 h-4 w-4" />
                      Entrance Exams
                    </h4>
                    <div className="bg-violet-50 p-3 rounded-md">
                      <ul className="space-y-2">
                        {stage.examInfo.exams.map((exam, examIndex) => <li key={examIndex} className="text-violet-800">
                            {exam}
                          </li>)}
                      </ul>
                      {stage.examInfo.targetRanks && <div className="mt-2 text-sm text-violet-700">
                          <span className="font-medium">Target Rank:</span> {stage.examInfo.targetRanks}
                        </div>}
                      {stage.examInfo.examDates && <div className="text-sm text-violet-700">
                          <span className="font-medium">Exam Dates:</span> {stage.examInfo.examDates}
                        </div>}
                      {stage.examInfo.eligibility && <div className="text-sm text-violet-700">
                          <span className="font-medium">Eligibility:</span> {stage.examInfo.eligibility}
                        </div>}
                    </div>
                  </div>}
              
                {/* Colleges if available */}
                {stage.colleges && stage.colleges.length > 0 && <div>
                    <h4 className="font-semibold text-emerald-700 mb-2 flex items-center">
                      <School className="mr-2 h-4 w-4" />
                      College Options
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {stage.colleges.map((college, collegeIndex) => <span key={collegeIndex} className="bg-emerald-50 text-emerald-700 text-xs px-2 py-1 rounded">
                          {college}
                        </span>)}
                    </div>
                  </div>}
                
                {/* Alternative Paths if available */}
                {stage.alternativePaths && stage.alternativePaths.length > 0 && <div>
                    <h4 className="font-semibold text-amber-700 mb-2 flex items-center">
                      <GitFork className="mr-2 h-4 w-4" />
                      Alternative Paths
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {stage.alternativePaths.map((path, pathIndex) => <span key={pathIndex} className="bg-amber-50 text-amber-700 text-xs px-2 py-1 rounded">
                          {path}
                        </span>)}
                    </div>
                  </div>}
                
                {/* Courses */}
                <div>
                  <h4 className="font-semibold text-blue-700 mb-2 flex items-center">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Courses
                  </h4>
                  <ul className="space-y-3">
                    {stage.courses.map((course, courseIndex) => <li key={courseIndex} className="flex flex-col">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-800">{course.title}</span>
                          <Button size="sm" variant="ghost" className="h-7 text-xs text-blue-600 hover:text-blue-800 hover:bg-blue-50" onClick={() => handleStartLearning(course)}>
                            Start Learning
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {course.links.map((link, linkIndex) => <a key={linkIndex} href={link.url} target="_blank" rel="noopener noreferrer" className={`text-xs ${link.type === "Premium" ? "bg-violet-50 text-violet-700" : "bg-blue-50 text-blue-700"} px-2 py-1 rounded flex items-center`}>
                              {link.type === "YouTube" && <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path><path d="m10 15 5-3-5-3z"></path></svg>}
                              {link.type === "Premium" && <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><circle cx="12" cy="12" r="10"></circle><path d="M6 12h12"></path><path d="M12 6v12"></path></svg>}
                              {link.type === "Free Course" && <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><rect width="20" height="14" x="2" y="7" rx="2" /><path d="M16 2v5" /><path d="M8 2v5" /><path d="M12 13h.01" /><path d="M17 13h.01" /><path d="M7 13h.01" /><path d="M12 17h.01" /><path d="M17 17h.01" /><path d="M7 17h.01" /></svg>}
                              {link.type === "Online Course" && <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>}
                              {link.type}
                            </a>)}
                        </div>
                      </li>)}
                  </ul>
                </div>
                
                {/* Skills */}
                <div>
                  <h4 className="font-semibold text-emerald-700 mb-2 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M2 12h2a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4a2 2 0 0 1 2-2h2"></path><path d="M16 8V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v4"></path><path d="M12 2v10"></path><path d="m9 7 3 3 3-3"></path></svg>
                    Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {stage.skills.map((skill, skillIndex) => <span key={skillIndex} className="bg-emerald-100 text-emerald-800 text-xs font-medium px-2 py-1 rounded">
                        {skill}
                      </span>)}
                  </div>
                </div>
                
                {/* Projects */}
                <div>
                  <h4 className="font-semibold text-violet-700 mb-2 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M20 10c0 6-8 10-8 10s-8-4-8-10a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    Projects
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {stage.projects.map((project, projectIndex) => <span key={projectIndex} className="bg-violet-100 text-violet-800 text-xs font-medium px-2 py-1 rounded">
                        {project}
                      </span>)}
                  </div>
                </div>
                
                {/* "What's Next?" section with educational path info */}
                {renderNextStepsInfo(index)}
                
                {/* Discussion buttons */}
                <div className="flex space-x-2 mt-4 pt-4 border-t border-gray-100">
                  <Button size="sm" variant="outline" onClick={() => setGroupChatOpen(true)} className="text-xs flex items-center rounded-3xl">
                    <User className="mr-1 h-4 w-4" />
                    Ask a Mentor
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setGroupChatOpen(true)} className="text-xs flex items-center rounded-3xl">
                    <MessageCircle className="mr-1 h-4 w-4" />
                    Discuss
                  </Button>
                </div>
              </div>
            </div>
          </div>)}
      </div>;
  };
  return <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 py-16 relative bg-[#e5d0ac]">
      {/* Blurry background elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-3000"></div>
        <div className="absolute -bottom-20 right-1/4 w-96 h-96 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="container mx-auto relative z-10 bg-[E5D0AC] bg-[#e5d0ac] rounded-3xl py-[62px] my-0 px-[34px]">
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
          
          {currentStep === 1 && <div className="animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
                Build Your <span className="gradient-text">Roadmap</span>
              </h1>
              
              <div className="mt-8">
                <h2 className="text-3xl font-bold mb-3 text-center">I am a...</h2>
                <p className="text-gray-600 text-center mb-10">
                  Select your current education level to begin your journey
                </p>
                
                <div className="backdrop-blur-md rounded-3xl shadow-xl p-10 flex flex-col items-center border border-white/50 bg-[A31D1D] bg-[#a31d1d]">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
                    {educationLevels.map(level => <button key={level} onClick={() => setSelectedEducation(level)} className={`p-4 rounded-xl text-left transition-all flex items-center ${selectedEducation === level ? "bg-gradient-to-r from-blue-500 to-violet-500 text-white shadow-md" : "bg-white hover:bg-gray-50 text-gray-800 border border-gray-100"}`}>
                        {selectedEducation === level && <Check className="mr-2 h-4 w-4 text-white" />}
                        {level}
                      </button>)}
                  </div>
                  
                  <Button size="lg" onClick={handleNext} disabled={!selectedEducation} className="mt-10 from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 shadow-md text-[A31D1D] text-[#a31d1d] bg-[E5D0AC] bg-[#e5d0ac] rounded-3xl">
                    Next <ArrowRight className="ml-2" size={16} />
                  </Button>
                </div>
              </div>
            </div>}

          {currentStep === 2 && <div className="animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
                Build Your <span className="gradient-text">Roadmap</span>
              </h1>
              
              <div className="mt-8">
                <h2 className="text-3xl font-bold mb-3 text-center">I want to become...</h2>
                <p className="text-gray-600 text-center mb-10">
                  Select your dream career path
                </p>
                
                <div className="backdrop-blur-md rounded-3xl shadow-xl p-10 flex flex-col items-center border border-white/50 bg-[A31D1D] bg-[#a31d1d]">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
                    {careerOptions.map(goal => <button key={goal} onClick={() => setSelectedGoal(goal)} className={`p-4 rounded-xl text-left transition-all flex items-center ${selectedGoal === goal ? "bg-gradient-to-r from-blue-500 to-violet-500 text-white shadow-md" : "bg-white hover:bg-gray-50 text-gray-800 border border-gray-100"}`}>
                        {selectedGoal === goal && <Check className="mr-2 h-4 w-4 text-white" />}
                        {goal}
                      </button>)}
                  </div>
                  
                  <div className="flex space-x-4 mt-10">
                    <Button variant="outline" onClick={() => setCurrentStep(1)} className="border-gray-300 rounded-3xl py-0">
                      Back
                    </Button>
                    <Button onClick={handleNext} disabled={!selectedGoal} className="from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 shadow-md bg-[E5D0AC] bg-[#e5d0ac] rounded-3xl text-[#a31d1d]">
                      Next <ArrowRight className="ml-2" size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>}

          {currentStep === 3 && <div className="animate-fade-in">
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
                    
                    {roadmapData && <div className="mb-6">
                        <h3 className="font-bold mb-3">Estimated Timeline</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Foundation Stage</span>
                            <span>{roadmapData.timeline.foundation}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Intermediate Stage</span>
                            <span>{roadmapData.timeline.intermediate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Advanced Stage</span>
                            <span>{roadmapData.timeline.advanced}</span>
                          </div>
                          <div className="flex justify-between font-medium pt-2 border-t">
                            <span>Total Duration</span>
                            <span>{roadmapData.timeline.total}</span>
                          </div>
                        </div>
                      </div>}
                    
                    <div className="mb-6">
                      <h3 className="font-bold mb-3">Join Community</h3>
                      <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white" onClick={handleJoinGroup}>
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
                    
                    {renderRoadmapContent()}
                    
                    {/* Action buttons */}
                    <div className="mt-10 flex flex-wrap gap-3 justify-center">
                      <Button onClick={handleSaveRoadmap} className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white bg-[#e5d0ac] rounded-3xl">
                        <Save className="mr-2 h-4 w-4" />
                        Save Roadmap
                      </Button>
                      <Button variant="outline" onClick={handleDownloadPDF} className="rounded-3xl">
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                      </Button>
                      <Button variant="outline" onClick={handleCustomize} className="rounded-3xl">
                        <Pencil className="mr-2 h-4 w-4" />
                        Customize
                      </Button>
                      <Button variant="outline" onClick={handleShareRoadmap} className="rounded-3xl">
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
                  <Button variant="outline" onClick={() => setCurrentStep(1)} className="rounded-3xl">
                    Start Over
                  </Button>
                  <Button variant="outline" onClick={() => navigate("/quiz")} className="rounded-3xl">
                    Take Career Quiz
                  </Button>
                  <Button variant="outline" onClick={handleViewAllRoadmaps} className="rounded-3xl">
                    Browse All Roadmaps
                  </Button>
                </div>
              </div>
            </div>}
        </div>
      </div>

      {/* Share Dialog */}
      <ShareDialog open={shareDialogOpen} onOpenChange={setShareDialogOpen} title={`${selectedGoal} Roadmap`} url={window.location.href} />
      
      {/* Group Chat Dialog */}
      <GroupChat open={groupChatOpen} onOpenChange={setGroupChatOpen} groupName={selectedGoal || "Career"} currentUser={currentUser} />
      
      {/* Learning Dialog */}
      {currentCourse && <LearningDialog open={learningDialogOpen} onOpenChange={setLearningDialogOpen} course={currentCourse} />}
    </div>;
};
export default RoadmapPage;