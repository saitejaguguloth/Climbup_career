
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const RoadmapPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedEducation, setSelectedEducation] = useState("");
  const [selectedGoal, setSelectedGoal] = useState("");

  const educationLevels = [
    "10th Grade",
    "12th Grade (Inter)",
    "Bachelor's (BTech/BCA)",
    "Master's",
    "Working Professional"
  ];

  const careerGoals = [
    "Software Engineer",
    "Data Scientist",
    "IAS Officer",
    "Doctor",
    "Business Analyst",
    "Digital Marketer",
    "UI/UX Designer"
  ];

  const handleNext = () => {
    if (currentStep === 1 && selectedEducation) {
      setCurrentStep(2);
    } else if (currentStep === 2 && selectedGoal) {
      setCurrentStep(3);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {currentStep === 1 && (
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
                Build Your <span className="gradient-text">Roadmap</span>
              </h1>
              
              <div className="mt-16">
                <h2 className="text-3xl font-bold mb-3 text-center">Where are you now?</h2>
                <p className="text-gray-600 text-center mb-10">
                  Select your current education level to begin your journey
                </p>
                
                <div className="gradient-card p-10 flex flex-col items-center">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
                    {educationLevels.map((level) => (
                      <button
                        key={level}
                        onClick={() => setSelectedEducation(level)}
                        className={`p-4 rounded-lg text-left transition-all ${
                          selectedEducation === level
                            ? "bg-gradient-to-r from-climbup-blue to-climbup-purple text-white"
                            : "bg-white hover:bg-gray-50 text-gray-800"
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                  
                  <Button 
                    className="mt-10 gradient-button" 
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
              
              <div className="mt-16">
                <h2 className="text-3xl font-bold mb-3 text-center">What's Your Goal?</h2>
                <p className="text-gray-600 text-center mb-10">
                  What do you want to become?
                </p>
                
                <div className="gradient-card p-10 flex flex-col items-center">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
                    {careerGoals.map((goal) => (
                      <button
                        key={goal}
                        onClick={() => setSelectedGoal(goal)}
                        className={`p-4 rounded-lg text-left transition-all ${
                          selectedGoal === goal
                            ? "bg-gradient-to-r from-climbup-blue to-climbup-purple text-white"
                            : "bg-white hover:bg-gray-50 text-gray-800"
                        }`}
                      >
                        {goal}
                      </button>
                    ))}
                  </div>
                  
                  <div className="flex space-x-4 mt-10">
                    <Button 
                      variant="outline" 
                      onClick={() => setCurrentStep(1)}
                    >
                      Back
                    </Button>
                    <Button 
                      className="gradient-button" 
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
              
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10">
                <div className="mb-8 p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <p className="font-medium">Current Level: <span className="text-climbup-blue">{selectedEducation}</span></p>
                  <p className="font-medium">Career Goal: <span className="text-climbup-purple">{selectedGoal}</span></p>
                </div>
                
                <div className="space-y-8">
                  <div className="flex">
                    <div className="mr-4 flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-climbup-blue text-white flex items-center justify-center font-bold">1</div>
                      <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg flex-1">
                      <h3 className="font-bold text-lg text-gray-900">Foundation Stage</h3>
                      <p className="text-gray-700 mt-1">Build core knowledge and skills</p>
                      <ul className="mt-4 space-y-2">
                        <li className="flex items-start">
                          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">Courses</span>
                          <span className="ml-2 text-gray-700">Introduction to Computer Science, Data Structures & Algorithms</span>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">Skills</span>
                          <span className="ml-2 text-gray-700">Problem Solving, Basic Programming</span>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded">Projects</span>
                          <span className="ml-2 text-gray-700">Personal portfolio website, Simple applications</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="mr-4 flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-climbup-blue text-white flex items-center justify-center font-bold">2</div>
                      <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg flex-1">
                      <h3 className="font-bold text-lg text-gray-900">Intermediate Stage</h3>
                      <p className="text-gray-700 mt-1">Deepen knowledge and specialize</p>
                      <ul className="mt-4 space-y-2">
                        <li className="flex items-start">
                          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">Courses</span>
                          <span className="ml-2 text-gray-700">Advanced Programming, Web Development, Database Systems</span>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">Skills</span>
                          <span className="ml-2 text-gray-700">Frontend & Backend Technologies, Database Design</span>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded">Projects</span>
                          <span className="ml-2 text-gray-700">Full-stack web application, Mobile app prototype</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="mr-4 flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-climbup-blue text-white flex items-center justify-center font-bold">3</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg flex-1">
                      <h3 className="font-bold text-lg text-gray-900">Advanced Stage</h3>
                      <p className="text-gray-700 mt-1">Master skills and prepare for industry</p>
                      <ul className="mt-4 space-y-2">
                        <li className="flex items-start">
                          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">Courses</span>
                          <span className="ml-2 text-gray-700">System Design, DevOps, Cloud Computing</span>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">Skills</span>
                          <span className="ml-2 text-gray-700">Modern Frameworks, CI/CD, Deployment, Testing</span>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded">Projects</span>
                          <span className="ml-2 text-gray-700">Production-ready application, Open source contributions</span>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2 py-1 rounded">Internships</span>
                          <span className="ml-2 text-gray-700">Software Engineering Internship, Tech Company Experience</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="mt-10 flex flex-wrap gap-3 justify-center">
                  <Button className="gradient-button">
                    Save Roadmap
                  </Button>
                  <Button variant="outline">
                    Download PDF
                  </Button>
                  <Button variant="outline">
                    Customize
                  </Button>
                  <Button variant="outline">
                    Share
                  </Button>
                </div>
              </div>
              
              <div className="mt-10 text-center">
                <p className="text-gray-600 mb-4">Not what you're looking for?</p>
                <div className="flex space-x-4 justify-center">
                  <Button variant="outline" onClick={() => setCurrentStep(1)}>
                    Start Over
                  </Button>
                  <Button variant="outline">
                    Take Career Quiz
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoadmapPage;
