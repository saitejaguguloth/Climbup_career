import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { NeonTitle, NeonButton } from "@/components/ui/neon-elements";

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

const QuizPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showSummary, setShowSummary] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const progress = ((currentQuestionIndex) / questions.length) * 100;
  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (answer: string) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: answer
    });
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowSummary(true);
    }
  };

  const handleBack = () => {
    if (showSummary) {
      setShowSummary(false);
      setCurrentQuestionIndex(questions.length - 1);
    } else if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowSummary(false);
    setShowResults(false);
  };

  const handleViewRoadmap = (path: string) => {
    navigate(path);
  };

  // Extra feature: summary of answers before results
  const handleShowResults = () => {
    setShowResults(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-16 relative">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-neon-yellow rounded-full mix-blend-overlay filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-neon-teal rounded-full mix-blend-overlay filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-neon-orange rounded-full mix-blend-overlay filter blur-3xl opacity-10 animate-blob animation-delay-3000"></div>
        <div className="absolute -bottom-20 right-1/4 w-96 h-96 bg-neon-purple rounded-full mix-blend-overlay filter blur-3xl opacity-5 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <NeonTitle size="2xl" color="yellow" className="text-center mb-6">
            Career Discovery <span className="text-neon-teal">Quiz</span>
          </NeonTitle>

          {/* Quiz Questions */}
          {!showSummary && !showResults && (
            <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-neon-yellow/30 p-6 md:p-10 mt-8 animate-fade-in">
              <div className="mb-8">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-neon-yellow font-display">Question {currentQuestionIndex + 1} of {questions.length}</span>
                  <span className="text-sm font-medium text-neon-teal font-display">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2 bg-white/10" />
              </div>

              <h2 className="text-2xl font-bold mb-6 text-white font-display tracking-wide animate-fade-in">
                {currentQuestion.question}
              </h2>

              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(option)}
                    className="w-full p-4 text-left rounded-lg border border-white/20 bg-black/20 hover:border-neon-yellow hover:bg-neon-yellow/10 transition-all text-white hover:text-neon-yellow animate-fade-in"
                  >
                    {option}
                  </button>
                ))}
              </div>

              <div className="flex justify-between mt-8">
                <NeonButton color="teal" variant="outline" onClick={handleBack} disabled={currentQuestionIndex === 0}>
                  Back
                </NeonButton>
                <NeonButton color="yellow" variant="solid" onClick={handleReset}>
                  Reset
                </NeonButton>
              </div>
            </div>
          )}

          {/* Summary before results */}
          {showSummary && !showResults && (
            <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-neon-teal/30 p-6 md:p-10 mt-8 animate-fade-in">
              <NeonTitle size="lg" color="teal" className="text-center mb-6">
                Review Your Answers
              </NeonTitle>
              <ul className="mb-8 space-y-4">
                {questions.map((q) => (
                  <li key={q.id} className="text-white/80">
                    <span className="font-bold text-neon-yellow">Q{q.id}:</span> {q.question}
                    <br />
                    <span className="text-neon-teal">Your answer:</span> {answers[q.id] || <span className="text-red-400">Not answered</span>}
                  </li>
                ))}
              </ul>
              <div className="flex justify-between">
                <NeonButton color="teal" variant="outline" onClick={handleBack}>
                  Back
                </NeonButton>
                <NeonButton color="yellow" variant="solid" onClick={handleShowResults}>
                  See Results
                </NeonButton>
              </div>
            </div>
          )}

          {/* Results */}
          {showResults && (
            <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-neon-teal/30 p-6 md:p-10 mt-8 animate-fade-in">
              <NeonTitle size="lg" color="teal" className="text-center mb-6">
                Your Career Matches
              </NeonTitle>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {results.map((result, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col justify-between animate-fade-in">
                    <h3 className="text-xl font-bold text-neon-yellow mb-2">{result.career}</h3>
                    <p className="text-white/80 mb-4">{result.description}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-neon-teal font-bold">{result.match}% match</span>
                      <NeonButton color="teal" size="sm" onClick={() => handleViewRoadmap(result.path)}>
                        View Roadmap
                      </NeonButton>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center">
                <NeonButton color="yellow" variant="solid" onClick={handleReset}>
                  Take Again
                </NeonButton>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPage; 