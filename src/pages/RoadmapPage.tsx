
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowRight, Target, Users, Briefcase, GraduationCap } from "lucide-react";
import { NeonTitle, NeonButton, NeonCard, NeonIcon } from "@/components/ui/neon-elements";

interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  duration: string;
  skills: string[];
}

interface CareerPath {
  title: string;
  description: string;
  estimatedDuration: string;
  steps: RoadmapStep[];
}

const RoadmapPage = () => {
  const navigate = useNavigate();
  const [currentRole, setCurrentRole] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [showRoadmap, setShowRoadmap] = useState(false);

  const currentRoles = [
    { id: "student", label: "Student", icon: GraduationCap },
    { id: "fresher", label: "Recent Graduate", icon: Users },
    { id: "professional", label: "Working Professional", icon: Briefcase },
    { id: "career-changer", label: "Career Changer", icon: Target }
  ];

  const targetRoles = [
    { id: "software-engineer", label: "Software Engineer" },
    { id: "data-scientist", label: "Data Scientist" },
    { id: "product-manager", label: "Product Manager" },
    { id: "ux-designer", label: "UX/UI Designer" },
    { id: "cybersecurity", label: "Cybersecurity Expert" },
    { id: "ai-engineer", label: "AI/ML Engineer" },
    { id: "devops", label: "DevOps Engineer" },
    { id: "mobile-developer", label: "Mobile Developer" }
  ];

  const generateRoadmap = (): CareerPath => {
    const baseRoadmaps: { [key: string]: CareerPath } = {
      "software-engineer": {
        title: "Software Engineer Roadmap",
        description: "A comprehensive path to becoming a software engineer",
        estimatedDuration: "6-12 months",
        steps: [
          {
            id: "1",
            title: "Programming Fundamentals",
            description: "Learn programming basics with Python or JavaScript",
            duration: "4-6 weeks",
            skills: ["Programming Logic", "Syntax", "Problem Solving"]
          },
          {
            id: "2",
            title: "Data Structures & Algorithms",
            description: "Master fundamental CS concepts",
            duration: "6-8 weeks",
            skills: ["Arrays", "Linked Lists", "Trees", "Sorting", "Searching"]
          },
          {
            id: "3",
            title: "Web Development",
            description: "Build web applications",
            duration: "8-10 weeks",
            skills: ["HTML", "CSS", "JavaScript", "React", "Node.js"]
          },
          {
            id: "4",
            title: "Projects & Portfolio",
            description: "Build real-world projects",
            duration: "6-8 weeks",
            skills: ["Git", "Project Management", "Deployment"]
          }
        ]
      },
      "data-scientist": {
        title: "Data Scientist Roadmap",
        description: "Path to becoming a data scientist",
        estimatedDuration: "8-14 months",
        steps: [
          {
            id: "1",
            title: "Mathematics & Statistics",
            description: "Build strong mathematical foundation",
            duration: "6-8 weeks",
            skills: ["Linear Algebra", "Statistics", "Probability"]
          },
          {
            id: "2",
            title: "Programming for Data Science",
            description: "Learn Python and R",
            duration: "6-8 weeks",
            skills: ["Python", "R", "SQL", "Pandas", "NumPy"]
          },
          {
            id: "3",
            title: "Machine Learning",
            description: "Master ML algorithms and techniques",
            duration: "10-12 weeks",
            skills: ["Supervised Learning", "Unsupervised Learning", "Deep Learning"]
          },
          {
            id: "4",
            title: "Data Projects",
            description: "Build end-to-end data science projects",
            duration: "8-10 weeks",
            skills: ["Data Visualization", "Model Deployment", "Business Intelligence"]
          }
        ]
      },
      "product-manager": {
        title: "Product Manager Roadmap",
        description: "Journey to becoming a product manager",
        estimatedDuration: "8-12 months",
        steps: [
          {
            id: "1",
            title: "Product Strategy Fundamentals",
            description: "Learn product strategy and market analysis",
            duration: "4-6 weeks",
            skills: ["Market Research", "User Stories", "Product Strategy"]
          },
          {
            id: "2",
            title: "Technical Understanding",
            description: "Basic understanding of development process",
            duration: "6-8 weeks",
            skills: ["Agile/Scrum", "API Basics", "Database Concepts"]
          },
          {
            id: "3",
            title: "Analytics & Data",
            description: "Learn to work with data and metrics",
            duration: "4-6 weeks",
            skills: ["Analytics Tools", "A/B Testing", "KPI Definition"]
          },
          {
            id: "4",
            title: "Leadership & Communication",
            description: "Develop soft skills and leadership",
            duration: "6-8 weeks",
            skills: ["Stakeholder Management", "Presentation Skills", "Team Leadership"]
          }
        ]
      },
      "ux-designer": {
        title: "UX/UI Designer Roadmap",
        description: "Path to becoming a UX/UI designer",
        estimatedDuration: "6-10 months",
        steps: [
          {
            id: "1",
            title: "Design Fundamentals",
            description: "Learn basic design principles",
            duration: "4-6 weeks",
            skills: ["Color Theory", "Typography", "Layout Design"]
          },
          {
            id: "2",
            title: "UX Research & Strategy",
            description: "Understand user research methods",
            duration: "6-8 weeks",
            skills: ["User Research", "Personas", "Journey Mapping"]
          },
          {
            id: "3",
            title: "Design Tools & Prototyping",
            description: "Master design tools and prototyping",
            duration: "6-8 weeks",
            skills: ["Figma", "Adobe XD", "Prototyping", "Wireframing"]
          },
          {
            id: "4",
            title: "Portfolio & Testing",
            description: "Build portfolio and learn usability testing",
            duration: "4-6 weeks",
            skills: ["Portfolio Creation", "Usability Testing", "Design Systems"]
          }
        ]
      }
    };

    // Customize roadmap based on current role
    const baseRoadmap = baseRoadmaps[targetRole] || baseRoadmaps["software-engineer"];
    
    if (currentRole === "student") {
      // Add foundational steps for students
      return {
        ...baseRoadmap,
        estimatedDuration: `${parseInt(baseRoadmap.estimatedDuration.split('-')[0]) + 2}-${parseInt(baseRoadmap.estimatedDuration.split('-')[1]) + 4} months`,
        steps: [
          {
            id: "0",
            title: "Academic Foundation",
            description: "Focus on relevant coursework and build study habits",
            duration: "2-4 weeks",
            skills: ["Time Management", "Study Skills", "Academic Planning"]
          },
          ...baseRoadmap.steps
        ]
      };
    } else if (currentRole === "career-changer") {
      // Add transition-specific steps
      return {
        ...baseRoadmap,
        estimatedDuration: `${parseInt(baseRoadmap.estimatedDuration.split('-')[0]) + 3}-${parseInt(baseRoadmap.estimatedDuration.split('-')[1]) + 6} months`,
        steps: [
          {
            id: "0",
            title: "Career Transition Planning",
            description: "Plan your career transition and skill gap analysis",
            duration: "2-3 weeks",
            skills: ["Career Planning", "Skill Assessment", "Network Building"]
          },
          ...baseRoadmap.steps,
          {
            id: "final",
            title: "Job Search & Transition",
            description: "Prepare for job search in new field",
            duration: "4-8 weeks",
            skills: ["Resume Writing", "Interview Prep", "Networking"]
          }
        ]
      };
    }

    return baseRoadmap;
  };

  const handleGenerateRoadmap = () => {
    if (currentRole && targetRole) {
      setShowRoadmap(true);
    }
  };

  const roadmap = showRoadmap ? generateRoadmap() : null;

  return (
    <div className="min-h-screen py-16 relative">
      {/* Background blurry elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-neon-yellow rounded-full mix-blend-overlay filter blur-3xl opacity-5 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-neon-teal rounded-full mix-blend-overlay filter blur-3xl opacity-5 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-neon-orange rounded-full mix-blend-overlay filter blur-3xl opacity-5 animate-blob animation-delay-3000"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <NeonTitle size="2xl" color="yellow" className="mb-4">
              Build Your <span className="text-neon-teal">Career Roadmap</span>
            </NeonTitle>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Get a personalized roadmap based on your current situation and career goals
            </p>
          </div>

          {!showRoadmap ? (
            <div className="space-y-8">
              {/* Current Role Selection */}
              <NeonCard color="yellow">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">I am a...</h3>
                  <p className="text-white/70">Tell us about your current situation</p>
                </div>
                <RadioGroup value={currentRole} onValueChange={setCurrentRole}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentRoles.map((role) => (
                      <div key={role.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={role.id} id={role.id} className="border-neon-yellow text-neon-yellow" />
                        <Label
                          htmlFor={role.id}
                          className="flex items-center gap-3 text-white cursor-pointer p-3 rounded-lg hover:bg-white/10 transition-colors flex-1"
                        >
                          <role.icon className="h-5 w-5 text-neon-yellow" />
                          {role.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </NeonCard>

              {/* Target Role Selection */}
              <NeonCard color="teal">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">I want to become a...</h3>
                  <p className="text-white/70">Choose your target career</p>
                </div>
                <RadioGroup value={targetRole} onValueChange={setTargetRole}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {targetRoles.map((role) => (
                      <div key={role.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={role.id} id={role.id} className="border-neon-teal text-neon-teal" />
                        <Label
                          htmlFor={role.id}
                          className="text-white cursor-pointer p-3 rounded-lg hover:bg-white/10 transition-colors flex-1"
                        >
                          {role.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </NeonCard>

              {/* Generate Button */}
              <div className="flex justify-center">
                <NeonButton
                  color="orange"
                  size="lg"
                  onClick={handleGenerateRoadmap}
                  disabled={!currentRole || !targetRole}
                  className={!currentRole || !targetRole ? "opacity-50 cursor-not-allowed" : ""}
                >
                  <Target className="mr-2 h-5 w-5" />
                  Generate My Roadmap
                  <ArrowRight className="ml-2 h-5 w-5" />
                </NeonButton>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Back Button */}
              <div className="flex justify-start">
                <NeonButton
                  variant="outline"
                  color="yellow"
                  onClick={() => setShowRoadmap(false)}
                >
                  ← Back to Selection
                </NeonButton>
              </div>

              {/* Roadmap Header */}
              <NeonCard color="yellow">
                <div className="text-center">
                  <NeonTitle size="xl" color="yellow" className="mb-4">
                    {roadmap?.title}
                  </NeonTitle>
                  <p className="text-white/70 text-lg mb-4">{roadmap?.description}</p>
                  <div className="flex justify-center items-center gap-2 text-neon-teal">
                    <Target className="h-5 w-5" />
                    <span className="font-semibold">Estimated Duration: {roadmap?.estimatedDuration}</span>
                  </div>
                </div>
              </NeonCard>

              {/* Roadmap Steps */}
              <div className="space-y-6">
                {roadmap?.steps.map((step, index) => (
                  <NeonCard key={step.id} color={index % 3 === 0 ? "yellow" : index % 3 === 1 ? "teal" : "orange"}>
                    <div className="flex items-start gap-4">
                      <NeonIcon 
                        color={index % 3 === 0 ? "yellow" : index % 3 === 1 ? "teal" : "orange"} 
                        size="sm"
                      >
                        <span className="text-lg font-bold">{index + 1}</span>
                      </NeonIcon>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                        <p className="text-white/70 mb-4">{step.description}</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {step.skills.map((skill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className="px-3 py-1 bg-white/10 text-white/80 text-sm rounded-full border border-white/20"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                        <div className="text-sm text-white/60">
                          Duration: {step.duration}
                        </div>
                      </div>
                    </div>
                  </NeonCard>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 justify-center">
                <NeonButton color="yellow">
                  Start Learning
                </NeonButton>
                <NeonButton variant="outline" color="teal">
                  Save Roadmap
                </NeonButton>
                <NeonButton variant="outline" color="orange">
                  Share with Friends
                </NeonButton>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoadmapPage;
