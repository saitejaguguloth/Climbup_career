
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
            links: [{ type: "YouTube", url: "https://www.youtube.com/watch?v=zOjov-2OZ0E" }] 
          },
          { 
            title: "Data Structures and Algorithms", 
            links: [{ type: "YouTube", url: "https://www.youtube.com/watch?v=zOjov-2OZ0E" }] 
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
            links: [{ type: "YouTube", url: "https://www.youtube.com/watch?v=zOjov-2OZ0E" }] 
          },
          { 
            title: "Database Management", 
            links: [{ type: "YouTube", url: "https://www.youtube.com/watch?v=zOjov-2OZ0E" }] 
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
            links: [{ type: "YouTube", url: "https://www.youtube.com/watch?v=zOjov-2OZ0E" }] 
          },
          { 
            title: "DevOps and CI/CD", 
            links: [{ type: "YouTube", url: "https://www.youtube.com/watch?v=zOjov-2OZ0E" }] 
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
            links: [{ type: "YouTube", url: "https://www.youtube.com/watch?v=0RRVV4Diomg" }] 
          },
          { 
            title: "Human Anatomy and Physiology", 
            links: [{ type: "Free Course", url: "https://www.khanacademy.org/science/health-and-medicine/human-anatomy-and-physiology" }] 
          }
        ],
        skills: ["Science Fundamentals", "Memorization", "Focus & Discipline"],
        projects: ["Human Anatomy Studies", "Biology Research Paper"]
      },
      {
        name: "Intermediate",
        courses: [
          { 
            title: "NEET Preparation", 
            links: [{ type: "YouTube", url: "https://www.youtube.com/c/neetstudy" }] 
          },
          { 
            title: "Medical Entrance Exams", 
            links: [{ type: "Online Course", url: "https://www.unacademy.com/goal/neet-ug/TMUVD" }] 
          }
        ],
        skills: ["Physics", "Chemistry", "Biology", "Time Management"],
        projects: ["Mock Tests Practice", "Science Laboratory Work"]
      },
      {
        name: "Advanced",
        courses: [
          { 
            title: "MBBS Core Subjects", 
            links: [{ type: "YouTube", url: "https://www.youtube.com/c/DrNajeebLectures" }] 
          },
          { 
            title: "Medical Ethics", 
            links: [{ type: "Online Course", url: "https://www.coursera.org/learn/medical-ethics" }] 
          }
        ],
        skills: ["Patient Care", "Clinical Diagnostics", "Medical Decision-Making"],
        projects: ["Health Awareness Camp", "Hospital Volunteering"]
      }
    ],
    timeline: {
      foundation: "12 months",
      intermediate: "24 months",
      advanced: "60 months",
      total: "96 months"
    }
  },
  "Data Scientist": {
    stages: [
      {
        name: "Foundation",
        courses: [
          { 
            title: "Statistics and Probability", 
            links: [{ type: "YouTube", url: "https://www.youtube.com/playlist?list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9" }] 
          },
          { 
            title: "Programming with Python", 
            links: [{ type: "Online Course", url: "https://www.datacamp.com/tracks/python-programmer" }] 
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
            links: [{ type: "YouTube", url: "https://www.youtube.com/playlist?list=PLLssT5z_DsK-h9vYZkQkYNWcItqhlRJLN" }] 
          },
          { 
            title: "Data Visualization", 
            links: [{ type: "Online Course", url: "https://www.coursera.org/specializations/data-visualization" }] 
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
            links: [{ type: "Online Course", url: "https://www.deeplearning.ai/courses/deep-learning-specialization/" }] 
          },
          { 
            title: "Big Data Technologies", 
            links: [{ type: "YouTube", url: "https://www.youtube.com/playlist?list=PL9ooVrP1hQOFrYxqxb0NJCdCABPZNo0pD" }] 
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
  "Engineer": {
    stages: [
      {
        name: "Foundation",
        courses: [
          { 
            title: "Mathematics and Physics", 
            links: [{ type: "YouTube", url: "https://www.youtube.com/c/JEEengineeringMainsAdvanced" }] 
          },
          { 
            title: "Engineering Drawing", 
            links: [{ type: "Online Course", url: "https://www.nptel.ac.in/courses/112/103/112103019/" }] 
          }
        ],
        skills: ["Mathematics", "Physics", "Problem Solving"],
        projects: ["Basic Engineering Designs", "Physics Projects"]
      },
      {
        name: "Intermediate",
        courses: [
          { 
            title: "JEE Preparation", 
            links: [{ type: "YouTube", url: "https://www.youtube.com/c/PhysicsWallah" }] 
          },
          { 
            title: "Engineering Mechanics", 
            links: [{ type: "Online Course", url: "https://www.nptel.ac.in/courses/112/105/112105268/" }] 
          }
        ],
        skills: ["Advanced Mathematics", "Applied Physics", "Chemistry"],
        projects: ["Engineering Models", "Mechanical Designs"]
      },
      {
        name: "Advanced",
        courses: [
          { 
            title: "Engineering Specialization", 
            links: [{ type: "YouTube", url: "https://www.youtube.com/c/MITOpenCourseWare" }] 
          },
          { 
            title: "Project Management", 
            links: [{ type: "Online Course", url: "https://www.coursera.org/professional-certificates/google-project-management" }] 
          }
        ],
        skills: ["Specialized Engineering Skills", "Technical Drawing", "Team Management"],
        projects: ["Engineering Capstone Project", "Internship"]
      }
    ],
    timeline: {
      foundation: "12 months",
      intermediate: "24 months",
      advanced: "24 months",
      total: "60 months"
    }
  },
  "IAS Officer": {
    stages: [
      {
        name: "Foundation",
        courses: [
          { 
            title: "General Studies Foundation", 
            links: [{ type: "YouTube", url: "https://www.youtube.com/c/StudyIQeducation" }] 
          },
          { 
            title: "Indian Polity & Constitution", 
            links: [{ type: "Online Course", url: "https://www.unacademy.com/goal/upsc-civil-services-examination-ias-preparation/KSCGY" }] 
          }
        ],
        skills: ["Reading Comprehension", "Critical Thinking", "Current Affairs Analysis"],
        projects: ["Daily Newspaper Analysis", "NCERT Book Summaries"]
      },
      {
        name: "Intermediate",
        courses: [
          { 
            title: "UPSC Prelims Preparation", 
            links: [{ type: "YouTube", url: "https://www.youtube.com/c/UnacademyUPSC" }] 
          },
          { 
            title: "Economy & International Relations", 
            links: [{ type: "Online Course", url: "https://www.cleariasexam.com/course" }] 
          }
        ],
        skills: ["MCQ Solving", "Map Reading", "Memorization Techniques"],
        projects: ["Mock Tests", "Subject-wise Notes Compilation"]
      },
      {
        name: "Advanced",
        courses: [
          { 
            title: "UPSC Mains Answer Writing", 
            links: [{ type: "YouTube", url: "https://www.youtube.com/c/ShouldersOfGiants" }] 
          },
          { 
            title: "Essay & Optional Subject", 
            links: [{ type: "Online Course", url: "https://iasscore.in/upsc-coaching" }] 
          }
        ],
        skills: ["Essay Writing", "Opinion Formation", "Interview Skills"],
        projects: ["Answer Writing Practice", "Mock Interviews"]
      }
    ],
    timeline: {
      foundation: "6 months",
      intermediate: "12 months",
      advanced: "6 months",
      total: "24 months"
    }
  },
  "Lawyer": {
    stages: [
      {
        name: "Foundation",
        courses: [
          { 
            title: "Introduction to Legal Studies", 
            links: [{ type: "YouTube", url: "https://www.youtube.com/c/LexCliq" }] 
          },
          { 
            title: "Indian Constitution", 
            links: [{ type: "Online Course", url: "https://www.coursera.org/learn/introduction-to-law" }] 
          }
        ],
        skills: ["Reading Comprehension", "Logical Reasoning", "Critical Analysis"],
        projects: ["Case Studies", "Legal Document Analysis"]
      },
      {
        name: "Intermediate",
        courses: [
          { 
            title: "CLAT/AILET Preparation", 
            links: [{ type: "YouTube", url: "https://www.youtube.com/c/LegalEdge" }] 
          },
          { 
            title: "Legal Research Methods", 
            links: [{ type: "Online Course", url: "https://lawsikho.com/" }] 
          }
        ],
        skills: ["Legal Writing", "Case Analysis", "Time Management"],
        projects: ["Mock CLAT Exams", "Legal Essays"]
      },
      {
        name: "Advanced",
        courses: [
          { 
            title: "Specialized Law Fields", 
            links: [{ type: "YouTube", url: "https://www.youtube.com/c/FinologyLegal" }] 
          },
          { 
            title: "Court Procedures", 
            links: [{ type: "Online Course", url: "https://www.udemy.com/course/practical-course-on-criminal-trial/" }] 
          }
        ],
        skills: ["Argument Formation", "Client Consultation", "Court Etiquette"],
        projects: ["Moot Court", "Legal Internship", "Drafting Legal Documents"]
      }
    ],
    timeline: {
      foundation: "6 months",
      intermediate: "12 months",
      advanced: "36 months",
      total: "54 months"
    }
  },
  "Chartered Accountant": {
    stages: [
      {
        name: "Foundation",
        courses: [
          { 
            title: "Accounting Fundamentals", 
            links: [{ type: "YouTube", url: "https://www.youtube.com/c/CANareshAggarwal" }] 
          },
          { 
            title: "Business Mathematics", 
            links: [{ type: "Online Course", url: "https://www.superprofs.com/courses/ca-foundation/" }] 
          }
        ],
        skills: ["Numerical Ability", "Logical Reasoning", "Basic Accounting"],
        projects: ["Journal Entry Practice", "Company Financial Statement Analysis"]
      },
      {
        name: "Intermediate",
        courses: [
          { 
            title: "CA Foundation Exam Prep", 
            links: [{ type: "YouTube", url: "https://www.youtube.com/c/CAGeniusEducation" }] 
          },
          { 
            title: "Advanced Accounting", 
            links: [{ type: "Online Course", url: "https://www.selfstudys.com/ca/foundation" }] 
          }
        ],
        skills: ["Financial Statement Preparation", "Tax Calculation", "Audit Planning"],
        projects: ["Tax Filing Practice", "Audit Documentation"]
      },
      {
        name: "Advanced",
        courses: [
          { 
            title: "CA Final Preparation", 
            links: [{ type: "YouTube", url: "https://www.youtube.com/c/CAclubindia" }] 
          },
          { 
            title: "Corporate Finance", 
            links: [{ type: "Online Course", url: "https://www.cakart.in/" }] 
          }
        ],
        skills: ["Advanced Taxation", "Corporate Auditing", "Financial Management"],
        projects: ["Articleship", "Corporate Tax Planning", "Audit Report Preparation"]
      }
    ],
    timeline: {
      foundation: "8 months",
      intermediate: "18 months",
      advanced: "30 months",
      total: "56 months"
    }
  },
  "Designer": {
    stages: [
      {
        name: "Foundation",
        courses: [
          { 
            title: "Design Principles & Color Theory", 
            links: [{ type: "YouTube", url: "https://www.youtube.com/c/TheDesignAcademy" }] 
          },
          { 
            title: "Introduction to Adobe Suite", 
            links: [{ type: "Online Course", url: "https://www.udemy.com/course/graphic-design-masterclass/" }] 
          }
        ],
        skills: ["Visual Thinking", "Color Theory", "Typography"],
        projects: ["Logo Design", "Poster Creation"]
      },
      {
        name: "Intermediate",
        courses: [
          { 
            title: "UI/UX Design", 
            links: [{ type: "YouTube", url: "https://www.youtube.com/c/JesseShowalter" }] 
          },
          { 
            title: "Motion Graphics", 
            links: [{ type: "Online Course", url: "https://www.domestika.org/en/courses/areas/3-design" }] 
          }
        ],
        skills: ["Prototyping", "User Research", "Interface Design"],
        projects: ["Mobile App Design", "Website Redesign"]
      },
      {
        name: "Advanced",
        courses: [
          { 
            title: "Design Systems", 
            links: [{ type: "YouTube", url: "https://www.youtube.com/c/DesignCourse" }] 
          },
          { 
            title: "Brand Identity", 
            links: [{ type: "Online Course", url: "https://www.masterclass.com/classes/david-carson-teaches-graphic-design" }] 
          }
        ],
        skills: ["Design Leadership", "Art Direction", "Client Management"],
        projects: ["Complete Brand Identity", "Product Design", "Design Portfolio"]
      }
    ],
    timeline: {
      foundation: "6 months",
      intermediate: "12 months",
      advanced: "18 months",
      total: "36 months"
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

