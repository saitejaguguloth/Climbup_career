
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
    <div className="min-h-screen py-16">
      {/* Background pattern elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-climbup-heading rounded-full opacity-5"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-climbup-text rounded-full opacity-5"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-climbup-component rounded-full opacity-10"></div>
        <div className="absolute -bottom-20 right-1/4 w-96 h-96 bg-climbup-heading rounded-full opacity-5"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center text-climbup-heading">
            Career Discovery <span className="bg-gradient-to-r from-climbup-heading to-climbup-text text-transparent bg-clip-text">Quiz</span>
          </h1>
          
          {!showResults ? (
            <div className="bg-climbup-component/90 backdrop-blur-md rounded-2xl shadow-lg p-6 md:p-10 mt-8 animate-fade-in border border-climbup-text/20">
              <div className="mb-8">
                <div className="flex justify-between mb-2 text-climbup-text">
                  <span className="text-sm font-medium">Question {currentQuestionIndex + 1} of {questions.length}</span>
                  <span className="text-sm font-medium">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2 bg-climbup-component [&>div]:bg-climbup-heading" />
              </div>
              
              <h2 className="text-2xl font-bold mb-6 text-climbup-heading">{currentQuestion.question}</h2>
              
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(option)}
                    className="w-full p-4 text-left rounded-lg border border-climbup-text/30 hover:border-climbup-heading hover:bg-climbup-heading/5 transition-colors text-climbup-text"
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
                    className="border-climbup-text text-climbup-text hover:bg-climbup-text/20"
                  >
                    Back to Previous Question
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-climbup-component/90 backdrop-blur-md rounded-2xl shadow-lg p-6 md:p-10 mt-8 animate-fade-in border border-climbup-text/20">
              <h2 className="text-2xl font-bold mb-6 text-center text-climbup-heading">Your Career Matches</h2>
              <p className="text-climbup-text mb-8 text-center">
                Based on your answers, here are career paths that might be a good fit for you.
              </p>
              
              <div className="space-y-6">
                {results.map((result, index) => (
                  <div key={index} className="p-4 rounded-lg border border-climbup-text/30 hover:border-climbup-heading transition-colors bg-climbup-component/50">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-bold text-lg text-climbup-heading">{result.career}</h3>
                      <span className="text-sm font-medium text-climbup-text">{result.match}% Match</span>
                    </div>
                    <p className="text-climbup-text mb-4">{result.description}</p>
                    <div className="flex justify-end">
                      <Button 
                        size="sm" 
                        className="bg-gradient-to-r from-climbup-heading to-climbup-text text-climbup-background" 
                        onClick={() => handleViewRoadmap(result.path)}
                      >
                        View Roadmap <ArrowRight size={16} className="ml-2" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <Button 
                  variant="outline" 
                  onClick={handleReset}
                  className="border-climbup-heading text-climbup-heading hover:bg-climbup-heading/20"
                >
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
