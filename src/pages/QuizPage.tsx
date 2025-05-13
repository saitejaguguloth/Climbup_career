
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import { ArrowRight } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
}

interface Result {
  career: string;
  description: string;
  match: number;
  path: string;
}

const QuizPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const questions: Question[] = [
    {
      id: 1,
      question: "Which activities do you enjoy the most?",
      options: [
        "Solving complex problems and puzzles",
        "Creating art or design work",
        "Helping and teaching others",
        "Managing and organizing people or projects",
        "Working with data and numbers"
      ]
    },
    {
      id: 2,
      question: "In a group project, which role do you naturally take?",
      options: [
        "The problem solver who tackles technical challenges",
        "The creative who comes up with ideas and designs",
        "The mediator who ensures everyone works well together",
        "The leader who organizes and delegates tasks",
        "The analyst who reviews data and details"
      ]
    },
    {
      id: 3,
      question: "What subjects did/do you enjoy most in school?",
      options: [
        "Mathematics and Computer Science",
        "Art, Design or Literature",
        "Psychology or Social Sciences",
        "Business Studies or Economics",
        "Science or Statistics"
      ]
    },
    {
      id: 4,
      question: "How do you prefer to work?",
      options: [
        "Independently, focused on solving specific challenges",
        "In a creative environment with freedom to express ideas",
        "Directly with people, helping them achieve goals",
        "Leading teams and coordinating efforts",
        "With clear systems, processes and data"
      ]
    },
    {
      id: 5,
      question: "What kind of impact do you want to make?",
      options: [
        "Build innovative technologies that change how we live",
        "Create meaningful experiences through art and design",
        "Directly improve people's lives and wellbeing",
        "Lead organizations to success and growth",
        "Use data to make better decisions and discoveries"
      ]
    }
  ];

  const results: Result[] = [
    {
      career: "Software Engineer",
      description: "You excel at problem-solving and logical thinking. A career in software development would let you build innovative solutions and work with cutting-edge technology.",
      match: 95,
      path: "/roadmap/software-engineer"
    },
    {
      career: "UX/UI Designer",
      description: "Your creative skills and empathy make you perfect for designing user experiences that are both beautiful and functional.",
      match: 88,
      path: "/roadmap/ux-ui-designer"
    },
    {
      career: "Data Scientist",
      description: "Your analytical mindset and love for patterns would thrive in a data-focused role where you can uncover insights and drive decisions.",
      match: 82,
      path: "/roadmap/data-scientist"
    },
    {
      career: "Product Manager",
      description: "Your balance of technical understanding and people skills would make you excellent at coordinating product development.",
      match: 75,
      path: "/roadmap/product-manager"
    }
  ];

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / questions.length) * 100;

  const handleAnswerSelect = (answer: string) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: answer
    });
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResults(false);
  };

  const handleViewRoadmap = (path: string) => {
    navigate(path);
    toast({
      title: "Roadmap Generated",
      description: "Your personalized career roadmap is ready to explore!"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-hero py-16">
      {/* Background blurry elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-3000"></div>
        <div className="absolute -bottom-20 right-1/4 w-96 h-96 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            Career Discovery <span className="gradient-text">Quiz</span>
          </h1>
          
          {!showResults ? (
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 md:p-10 mt-8 animate-fade-in">
              <div className="mb-8">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Question {currentQuestionIndex + 1} of {questions.length}</span>
                  <span className="text-sm font-medium">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2 bg-gray-100" />
              </div>
              
              <h2 className="text-2xl font-bold mb-6">{currentQuestion.question}</h2>
              
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(option)}
                    className="w-full p-4 text-left rounded-lg border border-gray-200 hover:border-climbup-blue hover:bg-climbup-blue/5 transition-colors"
                  >
                    {option}
                  </button>
                ))}
              </div>
              
              {currentQuestionIndex > 0 && (
                <div className="mt-8 text-center">
                  <Button 
                    variant="outline" 
                    onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
                  >
                    Back to Previous Question
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 md:p-10 mt-8 animate-fade-in">
              <h2 className="text-2xl font-bold mb-6 text-center">Your Career Matches</h2>
              <p className="text-gray-600 mb-8 text-center">
                Based on your answers, here are career paths that might be a good fit for you.
              </p>
              
              <div className="space-y-6">
                {results.map((result, index) => (
                  <div key={index} className="p-4 rounded-lg border border-gray-200 hover:border-climbup-blue transition-colors">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-bold text-lg">{result.career}</h3>
                      <span className="text-sm font-medium text-climbup-blue">{result.match}% Match</span>
                    </div>
                    <p className="text-gray-600 mb-4">{result.description}</p>
                    <div className="flex justify-end">
                      <Button 
                        size="sm" 
                        className="gradient-button" 
                        onClick={() => handleViewRoadmap(result.path)}
                      >
                        View Roadmap <ArrowRight size={16} className="ml-2" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <Button variant="outline" onClick={handleReset}>
                  Retake Quiz
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
