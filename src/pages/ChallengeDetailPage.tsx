
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, CheckCircle2, Clock, Code, Play, Trophy } from "lucide-react";

const ChallengeDetailPage = () => {
  const { challengeId, challengeType } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  
  // Mock data
  const challengeDetails = {
    title: challengeType === "daily" ? 
           challengeId === "1" ? "JavaScript: Array Methods" : 
           challengeId === "2" ? "Python: Data Analysis" : "System Design: Social Media App" :
           challengeType === "weekly" ?
           challengeId === "4" ? "Full-Stack To-Do App" : "Machine Learning: Image Classification" :
           challengeId === "6" ? "DevOps Pipeline Challenge" : "Blockchain Smart Contract",
    description: "Master key concepts through hands-on coding challenges and practical examples.",
    category: "Programming",
    difficulty: "Intermediate",
    xp: 250,
    totalSteps: 5,
    completedSteps: 2,
    steps: [
      {
        id: 1,
        title: "Introduction to Concepts",
        description: "Learn the foundational concepts required for the challenge.",
        completed: true,
        content: "This step introduces you to the basic concepts and provides resources to learn."
      },
      {
        id: 2,
        title: "Understanding the Problem",
        description: "Break down the problem and plan your approach.",
        completed: true,
        content: "In this step, you'll analyze the challenge requirements and plan your solution strategy."
      },
      {
        id: 3,
        title: "Building the Solution",
        description: "Implement your solution step-by-step.",
        completed: false,
        content: "Now it's time to write code or develop your solution based on the previous steps."
      },
      {
        id: 4,
        title: "Testing and Debugging",
        description: "Test your solution and fix any issues.",
        completed: false,
        content: "In this step, you'll verify your solution works correctly and fix any bugs."
      },
      {
        id: 5,
        title: "Optimization and Submission",
        description: "Optimize your solution and submit for review.",
        completed: false,
        content: "Finalize your solution by improving performance and readability before submission."
      }
    ]
  };

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Back button */}
      <Button 
        variant="ghost" 
        className="mb-6 flex items-center gap-2" 
        onClick={() => navigate("/challenges")}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Challenges
      </Button>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Challenge info sidebar */}
        <div className="lg:col-span-1">
          <Card className="bg-white/80 backdrop-blur shadow-lg">
            <CardHeader>
              <div className="mb-2 flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-indigo-100 text-indigo-800">
                  {challengeDetails.difficulty}
                </Badge>
                <Badge variant="outline" className="bg-blue-100 text-blue-800">
                  {challengeDetails.category}
                </Badge>
                <Badge variant="outline" className="bg-amber-100 text-amber-800">
                  {challengeType?.toUpperCase()}
                </Badge>
              </div>
              <CardTitle className="text-2xl">{challengeDetails.title}</CardTitle>
              <CardDescription>
                {challengeDetails.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Overall Progress</span>
                  <span className="font-medium">{challengeDetails.completedSteps}/{challengeDetails.totalSteps}</span>
                </div>
                <Progress 
                  value={(challengeDetails.completedSteps / challengeDetails.totalSteps) * 100} 
                  className="h-2" 
                />
              </div>
              
              <div className="pt-4">
                <h3 className="font-medium mb-2">Challenge Info</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span className="text-gray-600">Difficulty</span>
                    <span className="font-medium">{challengeDetails.difficulty}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Category</span>
                    <span className="font-medium">{challengeDetails.category}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">XP Reward</span>
                    <span className="font-medium flex items-center">
                      <Trophy className="h-4 w-4 mr-1 text-amber-500" />
                      {challengeDetails.xp} XP
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Est. Time</span>
                    <span className="font-medium">45 minutes</span>
                  </li>
                </ul>
              </div>
              
              <div className="pt-4">
                <Button 
                  variant="outline"
                  className="w-full flex items-center gap-2"
                  onClick={() => navigate(`/challenges/${challengeType}/${challengeId}/leaderboard`)}
                >
                  <Trophy className="h-4 w-4" />
                  View Leaderboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Challenge content main area */}
        <div className="lg:col-span-2">
          <Card className="bg-white/80 backdrop-blur shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">Challenge Steps</CardTitle>
                <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                  Step {currentStep + 1} of {challengeDetails.totalSteps}
                </Badge>
              </div>
              <CardDescription>
                Complete all steps to earn your badge and XP rewards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Steps navigation */}
                <div className="flex overflow-x-auto pb-2 gap-2">
                  {challengeDetails.steps.map((step, index) => (
                    <Button
                      key={step.id}
                      variant={currentStep === index ? "default" : "outline"}
                      className={`flex items-center gap-1 whitespace-nowrap ${
                        step.completed ? "border-green-300" : ""
                      }`}
                      onClick={() => setCurrentStep(index)}
                    >
                      {step.completed && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                      {!step.completed && index === currentStep && (
                        <Play className="h-4 w-4" />
                      )}
                      {!step.completed && index !== currentStep && (
                        <Clock className="h-4 w-4" />
                      )}
                      Step {step.id}
                    </Button>
                  ))}
                </div>
                
                {/* Current step content */}
                <div className="border rounded-lg p-5">
                  <h3 className="text-xl font-semibold mb-2">
                    {challengeDetails.steps[currentStep].title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {challengeDetails.steps[currentStep].description}
                  </p>
                  <div className="bg-gray-50 p-4 rounded border mb-4">
                    {challengeDetails.steps[currentStep].content}
                  </div>
                  
                  {/* Code example for programming challenges */}
                  {challengeDetails.category === "Programming" && (
                    <div className="bg-gray-900 text-gray-100 p-4 rounded font-mono text-sm mb-4">
                      {`// Example code
function processArray(arr) {
  return arr.map(item => item * 2).filter(item => item > 10);
}`}
                    </div>
                  )}
                  
                  <div className="flex justify-between mt-6">
                    <Button 
                      variant="outline"
                      disabled={currentStep === 0}
                      onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                    >
                      Previous Step
                    </Button>
                    
                    {currentStep < challengeDetails.totalSteps - 1 ? (
                      <Button 
                        onClick={() => setCurrentStep(prev => Math.min(challengeDetails.totalSteps - 1, prev + 1))}
                      >
                        Next Step
                      </Button>
                    ) : (
                      <Button>
                        Complete Challenge
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Related resources */}
          <Card className="mt-6 bg-gradient-to-r from-indigo-50 to-blue-50 border-indigo-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Code className="h-5 w-5 text-indigo-600" />
                Resources & Materials
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <span className="bg-indigo-100 p-1 rounded-full mr-2">
                    <CheckCircle2 className="h-3 w-3 text-indigo-600" />
                  </span>
                  <a href="#" className="text-blue-600 hover:underline">
                    Documentation: Array Methods Reference
                  </a>
                </li>
                <li className="flex items-center">
                  <span className="bg-indigo-100 p-1 rounded-full mr-2">
                    <CheckCircle2 className="h-3 w-3 text-indigo-600" />
                  </span>
                  <a href="#" className="text-blue-600 hover:underline">
                    Tutorial: Functional Programming with Arrays
                  </a>
                </li>
                <li className="flex items-center">
                  <span className="bg-indigo-100 p-1 rounded-full mr-2">
                    <CheckCircle2 className="h-3 w-3 text-indigo-600" />
                  </span>
                  <a href="#" className="text-blue-600 hover:underline">
                    Practice Exercises: Map, Filter, Reduce
                  </a>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetailPage;
