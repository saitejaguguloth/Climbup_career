
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { toast } from "@/hooks/use-toast";

// Interface for roadmap data
export interface RoadmapData {
  education: string;
  careerGoal: string;
  stages: {
    name: string;
    courses: Array<{
      title: string;
      links: Array<{
        type: string;
        url: string;
      }>
    }>;
    skills: string[];
    projects: string[];
  }[];
  timeline: {
    foundation: string;
    intermediate: string;
    advanced: string;
    total: string;
  };
}

// Career-specific roadmap data templates
export const careerRoadmapTemplates: Record<string, Partial<RoadmapData>> = {
  "Software Developer": {
    stages: [
      {
        name: "Foundation",
        courses: [
          { 
            title: "Introduction to Programming", 
            links: [{ type: "Online Course", url: "https://www.example.com/intro-programming" }] 
          },
          { 
            title: "Data Structures and Algorithms", 
            links: [{ type: "Online Course", url: "https://www.example.com/dsa" }] 
          }
        ],
        skills: ["Problem Solving", "Basic Programming", "Logical Thinking"],
        projects: ["Simple Calculator", "To-Do List App"]
      },
      {
        name: "Intermediate",
        courses: [
          { 
            title: "Web Development Fundamentals", 
            links: [{ type: "Online Course", url: "https://www.example.com/web-dev" }] 
          },
          { 
            title: "Database Management", 
            links: [{ type: "Online Course", url: "https://www.example.com/database" }] 
          }
        ],
        skills: ["HTML/CSS", "JavaScript", "SQL", "Git"],
        projects: ["Personal Portfolio Website", "E-commerce Store Frontend"]
      },
      {
        name: "Advanced",
        courses: [
          { 
            title: "Full Stack Development", 
            links: [{ type: "Online Course", url: "https://www.example.com/fullstack" }] 
          },
          { 
            title: "DevOps and CI/CD", 
            links: [{ type: "Online Course", url: "https://www.example.com/devops" }] 
          }
        ],
        skills: ["React/Angular/Vue", "Node.js", "Docker", "Cloud Services"],
        projects: ["Full Stack Web Application", "Mobile App with API Integration"]
      }
    ],
    timeline: {
      foundation: "3 months",
      intermediate: "6 months",
      advanced: "9 months",
      total: "18 months"
    }
  },
  "Doctor": {
    stages: [
      {
        name: "Foundation",
        courses: [
          { 
            title: "Biology and Chemistry Fundamentals", 
            links: [{ type: "Online Course", url: "https://www.example.com/bio-chem" }] 
          },
          { 
            title: "Anatomy and Physiology", 
            links: [{ type: "Online Course", url: "https://www.example.com/anatomy" }] 
          }
        ],
        skills: ["Medical Terminology", "Lab Techniques", "Critical Thinking"],
        projects: ["Anatomy Studies", "Basic Health Assessment Practice"]
      },
      {
        name: "Intermediate",
        courses: [
          { 
            title: "Pathophysiology", 
            links: [{ type: "Online Course", url: "https://www.example.com/pathophysiology" }] 
          },
          { 
            title: "Pharmacology Basics", 
            links: [{ type: "Online Course", url: "https://www.example.com/pharmacology" }] 
          }
        ],
        skills: ["Patient Assessment", "Medical Ethics", "Research Methods"],
        projects: ["Case Studies Analysis", "Medical Documentation Practice"]
      },
      {
        name: "Advanced",
        courses: [
          { 
            title: "Clinical Diagnostics", 
            links: [{ type: "Online Course", url: "https://www.example.com/diagnostics" }] 
          },
          { 
            title: "Treatment Planning", 
            links: [{ type: "Online Course", url: "https://www.example.com/treatment" }] 
          }
        ],
        skills: ["Diagnostic Reasoning", "Patient Communication", "Medical Decision Making"],
        projects: ["Clinical Shadowing", "Medical Research Paper"]
      }
    ],
    timeline: {
      foundation: "12 months",
      intermediate: "24 months",
      advanced: "36 months",
      total: "72 months"
    }
  },
  "Data Scientist": {
    stages: [
      {
        name: "Foundation",
        courses: [
          { 
            title: "Statistics and Probability", 
            links: [{ type: "Online Course", url: "https://www.example.com/stats" }] 
          },
          { 
            title: "Programming with Python", 
            links: [{ type: "Online Course", url: "https://www.example.com/python" }] 
          }
        ],
        skills: ["Math Fundamentals", "Python Programming", "Data Analysis"],
        projects: ["Data Cleaning Project", "Exploratory Data Analysis"]
      },
      {
        name: "Intermediate",
        courses: [
          { 
            title: "Machine Learning Fundamentals", 
            links: [{ type: "Online Course", url: "https://www.example.com/ml-basics" }] 
          },
          { 
            title: "Data Visualization", 
            links: [{ type: "Online Course", url: "https://www.example.com/data-viz" }] 
          }
        ],
        skills: ["Machine Learning Algorithms", "Data Visualization", "SQL", "Feature Engineering"],
        projects: ["Predictive Model", "Interactive Dashboard"]
      },
      {
        name: "Advanced",
        courses: [
          { 
            title: "Deep Learning", 
            links: [{ type: "Online Course", url: "https://www.example.com/deep-learning" }] 
          },
          { 
            title: "Big Data Technologies", 
            links: [{ type: "Online Course", url: "https://www.example.com/big-data" }] 
          }
        ],
        skills: ["Deep Learning", "Big Data Processing", "Model Deployment", "Business Analysis"],
        projects: ["Complex ML System", "Industry-Specific Data Project"]
      }
    ],
    timeline: {
      foundation: "4 months",
      intermediate: "8 months",
      advanced: "12 months",
      total: "24 months"
    }
  },
  // Default roadmap as a fallback
  "default": {
    stages: [
      {
        name: "Foundation",
        courses: [
          { 
            title: "Core Fundamentals", 
            links: [{ type: "Online Course", url: "https://www.example.com/fundamentals" }] 
          }
        ],
        skills: ["Critical Thinking", "Communication", "Time Management"],
        projects: ["Self-assessment", "Skill Development Plan"]
      },
      {
        name: "Intermediate",
        courses: [
          { 
            title: "Field-Specific Knowledge", 
            links: [{ type: "Online Course", url: "https://www.example.com/specific-field" }] 
          }
        ],
        skills: ["Field-Specific Skills", "Problem Solving", "Collaboration"],
        projects: ["Field Research", "Portfolio Development"]
      },
      {
        name: "Advanced",
        courses: [
          { 
            title: "Specialization", 
            links: [{ type: "Online Course", url: "https://www.example.com/specialization" }] 
          }
        ],
        skills: ["Advanced Techniques", "Leadership", "Industry Best Practices"],
        projects: ["Capstone Project", "Industry Networking"]
      }
    ],
    timeline: {
      foundation: "6 months",
      intermediate: "12 months",
      advanced: "12 months",
      total: "30 months"
    }
  }
};

// Function to generate roadmap based on education and career goal
export const generateRoadmap = (education: string, careerGoal: string): RoadmapData => {
  // Get career-specific template or default if not found
  const template = careerRoadmapTemplates[careerGoal] || careerRoadmapTemplates["default"];
  
  // Create a complete roadmap data object
  const roadmapData: RoadmapData = {
    education,
    careerGoal,
    stages: template.stages || careerRoadmapTemplates["default"].stages!,
    timeline: template.timeline || careerRoadmapTemplates["default"].timeline!
  };
  
  return roadmapData;
};

// Function to save roadmap data to local storage
export const saveRoadmap = (roadmapData: RoadmapData) => {
  try {
    localStorage.setItem(`roadmap-${roadmapData.careerGoal}`, JSON.stringify(roadmapData));
    toast({
      title: "Roadmap Saved",
      description: "Your roadmap has been saved successfully"
    });
    return true;
  } catch (error) {
    console.error("Error saving roadmap:", error);
    toast({
      title: "Save Failed",
      description: "There was an error saving your roadmap",
      variant: "destructive"
    });
    return false;
  }
};

// Function to download roadmap as PDF
export const downloadRoadmapAsPDF = async (elementId: string, fileName: string = "roadmap") => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error("Element not found");
    }
    
    toast({
      title: "Preparing PDF",
      description: "Creating your roadmap PDF..."
    });
    
    // Create canvas from the DOM element
    const canvas = await html2canvas(element, {
      scale: 2,
      logging: false,
      useCORS: true,
      allowTaint: true,
    });
    
    // Calculate dimensions
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [canvas.width, canvas.height]
    });
    
    // Add image to PDF
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save(`${fileName}.pdf`);
    
    toast({
      title: "PDF Downloaded",
      description: "Your roadmap PDF has been downloaded"
    });
    
    return true;
  } catch (error) {
    console.error("Error downloading roadmap as PDF:", error);
    toast({
      title: "Download Failed",
      description: "There was an error creating your PDF",
      variant: "destructive"
    });
    return false;
  }
};

// Function to share roadmap
export const shareRoadmap = async (data: { title: string, text: string, url: string }) => {
  if (navigator.share) {
    try {
      await navigator.share(data);
      toast({
        title: "Shared Successfully",
        description: "Your roadmap has been shared"
      });
      return true;
    } catch (error) {
      console.error("Error sharing roadmap:", error);
      if ((error as Error).name !== 'AbortError') {
        toast({
          title: "Share Failed",
          description: "There was an error sharing your roadmap",
          variant: "destructive"
        });
      }
      return false;
    }
  } else {
    // Fallback for browsers that don't support the Web Share API
    return copyToClipboard(data.url);
  }
};

// Function to copy content to clipboard
export const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    toast({
      title: "Link Copied",
      description: "Roadmap link copied to clipboard"
    });
    return true;
  } catch (error) {
    console.error("Error copying to clipboard:", error);
    toast({
      title: "Copy Failed",
      description: "Could not copy link to clipboard",
      variant: "destructive"
    });
    return false;
  }
};

// Function to mark a step as done
export const markStepAsDone = (stepId: string, isDone: boolean) => {
  try {
    const completedSteps = JSON.parse(localStorage.getItem('completedRoadmapSteps') || '{}');
    completedSteps[stepId] = isDone;
    localStorage.setItem('completedRoadmapSteps', JSON.stringify(completedSteps));
    
    if (isDone) {
      toast({
        title: "Step Completed",
        description: "This step has been marked as complete"
      });
    } else {
      toast({
        description: "Step has been marked as incomplete"
      });
    }
    
    return true;
  } catch (error) {
    console.error("Error marking step as done:", error);
    toast({
      title: "Action Failed",
      description: "There was an error updating this step",
      variant: "destructive"
    });
    return false;
  }
};

// Function to check if a step is done
export const isStepDone = (stepId: string) => {
  try {
    const completedSteps = JSON.parse(localStorage.getItem('completedRoadmapSteps') || '{}');
    return !!completedSteps[stepId];
  } catch (error) {
    console.error("Error checking if step is done:", error);
    return false;
  }
};

// Function to get all saved roadmaps
export const getAllRoadmaps = () => {
  try {
    const roadmaps: RoadmapData[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('roadmap-')) {
        const data = localStorage.getItem(key);
        if (data) {
          roadmaps.push(JSON.parse(data));
        }
      }
    }
    return roadmaps;
  } catch (error) {
    console.error("Error getting all roadmaps:", error);
    return [];
  }
};

// Function to navigate to roadmap from quiz results
export const viewRoadmapFromQuiz = (careerPath: string, navigate: any) => {
  if (careerPath) {
    navigate(`/roadmap/${encodeURIComponent(careerPath)}`);
  } else {
    navigate('/roadmap');
  }
};

// Function to navigate to messaging page
export const navigateToMessaging = (navigate: any, groupId?: string) => {
  navigate('/messaging');
  if (groupId) {
    // In a real app, you would store the groupId in state or context
    // and then access it in the messaging page to open the correct group
    localStorage.setItem('activeGroupId', groupId);
  }
};

// Function to navigate to mentors chat
export const askMentor = (navigate: any) => {
  navigate('/messaging');
  // In a real app, you would store the mentor group ID
  localStorage.setItem('activeGroupId', '3'); // ID of the mentor group
};
