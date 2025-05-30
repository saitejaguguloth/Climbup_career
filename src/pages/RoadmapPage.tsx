import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  CheckCircle, 
  Circle, 
  Clock, 
  BookOpen, 
  Award,
  ArrowRight,
  Download,
  Share2,
  Calendar,
  Target,
  TrendingUp
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { NeonTitle, NeonButton, NeonCard, NeonIcon } from "@/components/ui/neon-elements";

interface Roadmap {
  title: string;
  description: string;
  estimatedDuration: string;
  phases: Phase[];
}

interface Phase {
  id: string;
  title: string;
  description: string;
  duration: string;
  steps: Step[];
}

interface Step {
  id: string;
  title: string;
  description: string;
  estimatedTime: string;
  skills: string[];
  resources: Resource[];
}

interface Resource {
  name: string;
  type: 'course' | 'certification' | 'book' | 'tutorial';
  url: string;
}

type Roadmaps = {
  [key: string]: Roadmap;
};

const RoadmapPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const careerPath = searchParams.get('career') || 'software-engineer';
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  
  const roadmaps: Roadmaps = {
    'software-engineer': {
      title: 'Software Engineer Roadmap',
      description: 'A comprehensive guide to becoming a software engineer, covering essential skills, technologies, and resources.',
      estimatedDuration: '6-12 Months',
      phases: [
        {
          id: 'phase1',
          title: 'Fundamentals',
          description: 'Learn the basics of programming, data structures, and algorithms.',
          duration: '4 Weeks',
          steps: [
            {
              id: 'step1',
              title: 'Learn a Programming Language',
              description: 'Choose a language like Python or JavaScript and complete an introductory course.',
              estimatedTime: '20 hours',
              skills: ['Programming', 'Basic Syntax'],
              resources: [
                { name: 'Codecademy - Python', type: 'course', url: 'https://www.codecademy.com/learn/learn-python-3' },
                { name: 'freeCodeCamp - JavaScript', type: 'course', url: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/' }
              ]
            },
            {
              id: 'step2',
              title: 'Data Structures and Algorithms',
              description: 'Understand common data structures and algorithms.',
              estimatedTime: '30 hours',
              skills: ['Data Structures', 'Algorithms'],
              resources: [
                { name: 'Coursera - Data Structures', type: 'course', url: 'https://www.coursera.org/specializations/data-structures-algorithms' },
                { name: 'LeetCode', type: 'tutorial', url: 'https://leetcode.com/' }
              ]
            }
          ]
        },
        {
          id: 'phase2',
          title: 'Web Development',
          description: 'Dive into web development with HTML, CSS, and JavaScript.',
          duration: '8 Weeks',
          steps: [
            {
              id: 'step3',
              title: 'HTML and CSS',
              description: 'Learn to structure and style web pages.',
              estimatedTime: '25 hours',
              skills: ['HTML', 'CSS'],
              resources: [
                { name: 'MDN Web Docs', type: 'tutorial', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
                { name: 'CSS-Tricks', type: 'tutorial', url: 'https://css-tricks.com/' }
              ]
            },
            {
              id: 'step4',
              title: 'JavaScript Frameworks',
              description: 'Explore frameworks like React or Angular.',
              estimatedTime: '40 hours',
              skills: ['React', 'Angular', 'JavaScript'],
              resources: [
                { name: 'React Official Tutorial', type: 'tutorial', url: 'https://reactjs.org/tutorial/tutorial.html' },
                { name: 'Angular Documentation', type: 'tutorial', url: 'https://angular.io/docs' }
              ]
            }
          ]
        }
      ]
    },
    'ux-ui-designer': {
      title: 'UX/UI Designer Roadmap',
      description: 'A guide to becoming a UX/UI designer, covering design principles, tools, and portfolio building.',
      estimatedDuration: '4-9 Months',
      phases: [
        {
          id: 'phase1',
          title: 'Design Principles',
          description: 'Understand the core principles of UX/UI design.',
          duration: '6 Weeks',
          steps: [
            {
              id: 'step1',
              title: 'Learn Design Thinking',
              description: 'Understand the design thinking process.',
              estimatedTime: '20 hours',
              skills: ['Design Thinking', 'User Research'],
              resources: [
                { name: 'Interaction Design Foundation', type: 'course', url: 'https://www.interaction-design.org/' },
                { name: 'IDEO U', type: 'course', url: 'https://www.ideou.com/' }
              ]
            },
            {
              id: 'step2',
              title: 'UI Design Basics',
              description: 'Learn the basics of visual design.',
              estimatedTime: '25 hours',
              skills: ['Visual Design', 'Typography'],
              resources: [
                { name: 'Skillshare - UI Design', type: 'course', url: 'https://www.skillshare.com/classes/UI-Design-Fundamentals/1694146431' },
                { name: 'Laws of UX', type: 'book', url: 'https://lawsofux.com/' }
              ]
            }
          ]
        },
        {
          id: 'phase2',
          title: 'Design Tools',
          description: 'Master industry-standard design tools.',
          duration: '6 Weeks',
          steps: [
            {
              id: 'step3',
              title: 'Figma Mastery',
              description: 'Learn to use Figma for UI design and prototyping.',
              estimatedTime: '30 hours',
              skills: ['Figma', 'Prototyping'],
              resources: [
                { name: 'Figma Learn', type: 'tutorial', url: 'https://www.figma.com/learn/' },
                { name: 'YouTube - Figma Tutorials', type: 'tutorial', url: 'https://www.youtube.com/results?search_query=figma+tutorial' }
              ]
            },
            {
              id: 'step4',
              title: 'Adobe XD',
              description: 'Explore Adobe XD for UI/UX design.',
              estimatedTime: '25 hours',
              skills: ['Adobe XD', 'UI/UX Design'],
              resources: [
                { name: 'Adobe XD Tutorials', type: 'tutorial', url: 'https://helpx.adobe.com/xd/tutorials.html' },
                { name: 'XD Ideas', type: 'tutorial', url: 'https://xd.adobe.com/ideas/' }
              ]
            }
          ]
        }
      ]
    },
    'data-scientist': {
      title: 'Data Scientist Roadmap',
      description: 'A guide to becoming a data scientist, covering math, programming, and machine learning.',
      estimatedDuration: '9-15 Months',
      phases: [
        {
          id: 'phase1',
          title: 'Math and Stats',
          description: 'Build a strong foundation in mathematics and statistics.',
          duration: '10 Weeks',
          steps: [
            {
              id: 'step1',
              title: 'Linear Algebra',
              description: 'Learn the basics of linear algebra.',
              estimatedTime: '40 hours',
              skills: ['Linear Algebra', 'Mathematics'],
              resources: [
                { name: 'Khan Academy - Linear Algebra', type: 'course', url: 'https://www.khanacademy.org/math/linear-algebra' },
                { name: 'MIT OpenCourseWare', type: 'course', url: 'https://ocw.mit.edu/courses/mathematics/18-06-linear-algebra-spring-2010/' }
              ]
            },
            {
              id: 'step2',
              title: 'Statistics Fundamentals',
              description: 'Understand statistical concepts and methods.',
              estimatedTime: '45 hours',
              skills: ['Statistics', 'Data Analysis'],
              resources: [
                { name: 'Coursera - Statistics', type: 'course', url: 'https://www.coursera.org/specializations/statistics' },
                { name: 'edX - Statistics', type: 'course', url: 'https://www.edx.org/learn/statistics' }
              ]
            }
          ]
        },
        {
          id: 'phase2',
          title: 'Programming',
          description: 'Master programming skills with Python and R.',
          duration: '10 Weeks',
          steps: [
            {
              id: 'step3',
              title: 'Python for Data Science',
              description: 'Learn Python for data analysis and machine learning.',
              estimatedTime: '50 hours',
              skills: ['Python', 'Data Science'],
              resources: [
                { name: 'DataCamp - Python', type: 'course', url: 'https://www.datacamp.com/tracks/data-scientist-with-python' },
                { name: 'Google Developers - Python', type: 'tutorial', url: 'https://developers.google.com/edu/python/' }
              ]
            },
            {
              id: 'step4',
              title: 'R for Data Analysis',
              description: 'Explore R for statistical analysis.',
              estimatedTime: '40 hours',
              skills: ['R', 'Data Analysis'],
              resources: [
                { name: 'R-Project', type: 'tutorial', url: 'https://www.r-project.org/' },
                { name: 'Codecademy - R', type: 'course', url: 'https://www.codecademy.com/learn/learn-r' }
              ]
            }
          ]
        }
      ]
    },
    'product-manager': {
      title: 'Product Manager Roadmap',
      description: 'A guide to becoming a product manager, covering product strategy, market analysis, and leadership.',
      estimatedDuration: '6-12 Months',
      phases: [
        {
          id: 'phase1',
          title: 'Product Strategy',
          description: 'Learn how to define and execute product strategy.',
          duration: '8 Weeks',
          steps: [
            {
              id: 'step1',
              title: 'Market Research',
              description: 'Understand market research techniques.',
              estimatedTime: '30 hours',
              skills: ['Market Research', 'Data Analysis'],
              resources: [
                { name: 'HubSpot - Market Research', type: 'tutorial', url: 'https://blog.hubspot.com/marketing/market-research-buyers-persona-research' },
                { name: 'ProductPlan', type: 'tutorial', url: 'https://www.productplan.com/learn/market-research/' }
              ]
            },
            {
              id: 'step2',
              title: 'Product Roadmapping',
              description: 'Learn how to create a product roadmap.',
              estimatedTime: '35 hours',
              skills: ['Product Roadmapping', 'Product Strategy'],
              resources: [
                { name: 'Aha! - Product Roadmaps', type: 'tutorial', url: 'https://www.aha.io/roadmapping' },
                { name: 'Product School', type: 'course', url: 'https://www.productschool.com/' }
              ]
            }
          ]
        },
        {
          id: 'phase2',
          title: 'Leadership',
          description: 'Develop leadership and communication skills.',
          duration: '8 Weeks',
          steps: [
            {
              id: 'step3',
              title: 'Communication Skills',
              description: 'Improve communication and presentation skills.',
              estimatedTime: '30 hours',
              skills: ['Communication', 'Presentation'],
              resources: [
                { name: 'Toastmasters', type: 'tutorial', url: 'https://www.toastmasters.org/' },
                { name: 'MindTools', type: 'tutorial', url: 'https://www.mindtools.com/pages/article/newCS_85.htm' }
              ]
            },
            {
              id: 'step4',
              title: 'Team Management',
              description: 'Learn how to manage and motivate a team.',
              estimatedTime: '35 hours',
              skills: ['Team Management', 'Leadership'],
              resources: [
                { name: 'Harvard Business Review', type: 'tutorial', url: 'https://hbr.org/topic/team-management' },
                { name: 'Coursera - Leadership', type: 'course', url: 'https://www.coursera.org/specializations/leadership' }
              ]
            }
          ]
        }
      ]
    }
  };

  const currentRoadmap = roadmaps[careerPath as keyof typeof roadmaps] || roadmaps['software-engineer'];
  
  const getTotalSteps = () => {
    return currentRoadmap.phases.reduce((total, phase) => total + phase.steps.length, 0);
  };

  const getPhaseProgress = (phase: Phase) => {
    const completedPhaseSteps = phase.steps.filter(step => completedSteps.has(step.id)).length;
    return (completedPhaseSteps / phase.steps.length) * 100;
  };

  const getProgress = () => {
    const totalSteps = getTotalSteps();
    const completed = completedSteps.size;
    return (completed / totalSteps) * 100;
  };

  const toggleStepCompletion = (stepId: string) => {
    const newCompletedSteps = new Set(completedSteps);
    if (newCompletedSteps.has(stepId)) {
      newCompletedSteps.delete(stepId);
    } else {
      newCompletedSteps.add(stepId);
    }
    setCompletedSteps(newCompletedSteps);
  };

  const handleResourceClick = (resource: Resource) => {
    window.open(resource.url, '_blank');
  };

  return (
    <div className="min-h-screen py-16 relative">
      {/* Background blurry elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-neon-yellow rounded-full mix-blend-overlay filter blur-3xl opacity-5 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-neon-teal rounded-full mix-blend-overlay filter blur-3xl opacity-5 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-neon-orange rounded-full mix-blend-overlay filter blur-3xl opacity-5 animate-blob animation-delay-3000"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <NeonTitle size="2xl" color="yellow" className="mb-4">
              Your Personalized <span className="text-neon-teal">Roadmap</span>
            </NeonTitle>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              {currentRoadmap.description}
            </p>
          </div>

          {/* Roadmap Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <NeonCard color="yellow">
              <div className="flex items-center gap-3">
                <NeonIcon color="yellow" size="sm">
                  <Target className="h-5 w-5" />
                </NeonIcon>
                <div>
                  <p className="text-sm text-white/70">Total Steps</p>
                  <p className="text-2xl font-bold text-white">{getTotalSteps()}</p>
                </div>
              </div>
            </NeonCard>
            
            <NeonCard color="teal">
              <div className="flex items-center gap-3">
                <NeonIcon color="teal" size="sm">
                  <CheckCircle className="h-5 w-5" />
                </NeonIcon>
                <div>
                  <p className="text-sm text-white/70">Completed</p>
                  <p className="text-2xl font-bold text-white">{completedSteps.size}</p>
                </div>
              </div>
            </NeonCard>
            
            <NeonCard color="orange">
              <div className="flex items-center gap-3">
                <NeonIcon color="orange" size="sm">
                  <Clock className="h-5 w-5" />
                </NeonIcon>
                <div>
                  <p className="text-sm text-white/70">Duration</p>
                  <p className="text-2xl font-bold text-white">{currentRoadmap.estimatedDuration}</p>
                </div>
              </div>
            </NeonCard>
            
            <NeonCard color="yellow">
              <div className="flex items-center gap-3">
                <NeonIcon color="yellow" size="sm">
                  <TrendingUp className="h-5 w-5" />
                </NeonIcon>
                <div>
                  <p className="text-sm text-white/70">Progress</p>
                  <p className="text-2xl font-bold text-white">{getProgress()}%</p>
                </div>
              </div>
            </NeonCard>
          </div>

          {/* Progress Bar */}
          <NeonCard color="teal" className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Overall Progress</h3>
              <span className="text-sm text-white/70">{completedSteps.size} of {getTotalSteps()} completed</span>
            </div>
            <Progress value={getProgress()} className="h-3 bg-white/10" />
          </NeonCard>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mb-8 justify-center">
            <NeonButton color="yellow">
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </NeonButton>
            <NeonButton variant="outline" color="teal">
              <Share2 className="mr-2 h-4 w-4" />
              Share Roadmap
            </NeonButton>
            <NeonButton variant="outline" color="orange">
              <Calendar className="mr-2 h-4 w-4" />
              Set Reminders
            </NeonButton>
          </div>

          {/* Roadmap Phases */}
          <div className="space-y-8">
            {currentRoadmap.phases.map((phase, phaseIndex) => (
              <NeonCard key={phase.id} color={phaseIndex % 3 === 0 ? "yellow" : phaseIndex % 3 === 1 ? "teal" : "orange"}>
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <NeonIcon 
                      color={phaseIndex % 3 === 0 ? "yellow" : phaseIndex % 3 === 1 ? "teal" : "orange"} 
                      size="sm"
                    >
                      <BookOpen className="h-5 w-5" />
                    </NeonIcon>
                    <h3 className="text-xl font-bold text-white">{phase.title}</h3>
                    <Badge 
                      className={`ml-auto ${
                        phaseIndex % 3 === 0 
                          ? "bg-neon-yellow/20 text-neon-yellow border-neon-yellow/50" 
                          : phaseIndex % 3 === 1 
                          ? "bg-neon-teal/20 text-neon-teal border-neon-teal/50"
                          : "bg-neon-orange/20 text-neon-orange border-neon-orange/50"
                      }`}
                    >
                      {phase.duration}
                    </Badge>
                  </div>
                  <p className="text-white/70 mb-4">{phase.description}</p>
                  
                  {/* Phase Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-white/70">Phase Progress</span>
                      <span className="text-white/70">{getPhaseProgress(phase)}%</span>
                    </div>
                    <Progress value={getPhaseProgress(phase)} className="h-2 bg-white/10" />
                  </div>
                </div>

                {/* Phase Steps */}
                <div className="space-y-4">
                  {phase.steps.map((step, stepIndex) => {
                    const isCompleted = completedSteps.has(step.id);
                    return (
                      <div
                        key={step.id}
                        className={`border rounded-lg p-4 transition-all cursor-pointer ${
                          isCompleted 
                            ? 'border-neon-teal bg-neon-teal/10' 
                            : 'border-white/20 bg-black/20 hover:border-white/40'
                        }`}
                        onClick={() => toggleStepCompletion(step.id)}
                      >
                        <div className="flex items-start gap-3">
                          <button className="mt-1 transition-colors">
                            {isCompleted ? (
                              <CheckCircle className="h-5 w-5 text-neon-teal" />
                            ) : (
                              <Circle className="h-5 w-5 text-white/50 hover:text-white" />
                            )}
                          </button>
                          
                          <div className="flex-1">
                            <h4 className={`font-medium mb-2 ${isCompleted ? 'text-white line-through' : 'text-white'}`}>
                              {step.title}
                            </h4>
                            <p className="text-white/70 text-sm mb-3">{step.description}</p>
                            
                            {/* Step Skills */}
                            <div className="flex flex-wrap gap-2 mb-3">
                              {step.skills.map((skill, skillIndex) => (
                                <Badge
                                  key={skillIndex}
                                  variant="outline"
                                  className="bg-white/10 text-white/80 border-white/30 text-xs"
                                >
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                            
                            {/* Step Resources */}
                            <div className="flex flex-wrap gap-2">
                              {step.resources.map((resource, resourceIndex) => (
                                <NeonButton
                                  key={resourceIndex}
                                  size="sm"
                                  variant="outline"
                                  color={phaseIndex % 3 === 0 ? "yellow" : phaseIndex % 3 === 1 ? "teal" : "orange"}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleResourceClick(resource);
                                  }}
                                >
                                  {resource.type === 'course' && <BookOpen className="mr-1 h-3 w-3" />}
                                  {resource.type === 'certification' && <Award className="mr-1 h-3 w-3" />}
                                  {resource.name}
                                  <ArrowRight className="ml-1 h-3 w-3" />
                                </NeonButton>
                              ))}
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <Badge 
                              variant="outline"
                              className="bg-white/10 text-white/70 border-white/30 text-xs"
                            >
                              {step.estimatedTime}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {phaseIndex < currentRoadmap.phases.length - 1 && (
                  <div className="flex justify-center mt-6">
                    <Separator className="w-px h-8 bg-white/20" orientation="vertical" />
                  </div>
                )}
              </NeonCard>
            ))}
          </div>

          {/* Completion Message */}
          {getProgress() === 100 && (
            <NeonCard color="yellow" className="mt-8 text-center">
              <NeonIcon color="yellow" size="lg" className="mx-auto mb-4">
                <Award className="h-12 w-12" />
              </NeonIcon>
              <h3 className="text-2xl font-bold mb-2 text-white">Congratulations! 🎉</h3>
              <p className="text-white/70 mb-6">
                You've completed your {currentRoadmap.title} roadmap! You're now ready to take on new challenges.
              </p>
              <div className="flex gap-4 justify-center">
                <NeonButton color="yellow">
                  <Award className="mr-2 h-4 w-4" />
                  Get Certificate
                </NeonButton>
                <NeonButton variant="outline" color="teal" onClick={() => navigate('/quiz')}>
                  Explore New Paths
                </NeonButton>
              </div>
            </NeonCard>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoadmapPage;
