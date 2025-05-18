
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Clock, XCircle, Trophy, Award, Flag, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import { NeonTitle, NeonButton, NeonCard, NeonDivider } from "@/components/ui/neon-elements";

// Define the game interface
interface GameQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface GameData {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  color: "yellow" | "teal" | "orange";
  difficulty: string;
  category: string;
  questions: GameQuestion[];
  skills: string[];
}

const GamePlayPartnerPage = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [gameState, setGameState] = useState<"intro" | "playing" | "completed">("intro");
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(60);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [gameTimer, setGameTimer] = useState<NodeJS.Timeout | null>(null);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [gameData, setGameData] = useState<GameData | null>(null);

  useEffect(() => {
    // Mock game data based on ID - in a real app, this would come from an API
    const fetchedGameData: GameData = {
      id: gameId || "1",
      title: 
        gameId === '1' ? 'Diagnose & Decide' : 
        gameId === '2' ? 'Anatomy Explorer' :
        gameId === '3' ? 'Code Combat' : 
        gameId === '4' ? 'Bug Hunter' :
        gameId === '5' ? 'Business Tycoon' :
        gameId === '6' ? 'Market Analyzer' :
        gameId === '7' ? 'Design Challenge' :
        gameId === '8' ? 'Color Theory Master' :
        gameId === '9' ? 'JEE Speed Quiz' : 'Career Skills Game',
      description: "Test your knowledge and skills through this interactive challenge",
      difficulty: gameId === '9' || gameId === '2' ? 'Hard' : 
                  gameId === '3' || gameId === '4' || gameId === '6' ? 'Medium' : 'Easy',
      xpReward: 120,
      category: 
        gameId === '1' || gameId === '2' ? 'Doctor' : 
        gameId === '3' || gameId === '4' ? 'Developer' : 
        gameId === '5' || gameId === '6' ? 'Business' :
        gameId === '7' || gameId === '8' ? 'Designer' :
        gameId === '9' ? 'Engineer' : 'Career',
      color: 
        (parseInt(gameId || "1") % 3 === 0) ? 'orange' : 
        (parseInt(gameId || "1") % 3 === 1) ? 'yellow' : 'teal',
      questions: generateQuestionsForCategory(gameId || "1"),
      skills: ['Problem Solving', 'Critical Thinking', 'Time Management', 'Knowledge Application'],
    };

    setGameData(fetchedGameData);
  }, [gameId]);

  // Generate different questions based on the game category
  function generateQuestionsForCategory(id: string): GameQuestion[] {
    const category = 
      id === '1' || id === '2' ? 'medical' : 
      id === '3' || id === '4' ? 'programming' : 
      id === '5' || id === '6' ? 'business' :
      id === '7' || id === '8' ? 'design' :
      id === '9' ? 'engineering' : 'general';
    
    const questionsMap: Record<string, GameQuestion[]> = {
      medical: [
        {
          id: 1,
          question: 'A patient presents with fever, cough, and shortness of breath. What is the most likely diagnosis?',
          options: ['Common Cold', 'Pneumonia', 'Bronchitis', 'Tuberculosis'],
          correctAnswer: 1
        },
        {
          id: 2,
          question: 'Which of the following is NOT a symptom of diabetes?',
          options: ['Excessive thirst', 'Weight loss', 'Shortness of breath', 'Frequent urination'],
          correctAnswer: 2
        },
        {
          id: 3,
          question: 'Which medication is contraindicated in patients with liver disease?',
          options: ['Lisinopril', 'Acetaminophen', 'Amlodipine', 'Metformin'],
          correctAnswer: 1
        }
      ],
      programming: [
        {
          id: 1,
          question: 'What will be the output of this code: console.log(typeof null);',
          options: ['null', 'undefined', 'object', 'NaN'],
          correctAnswer: 2
        },
        {
          id: 2,
          question: 'Which of these is NOT a JavaScript data type?',
          options: ['String', 'Boolean', 'Character', 'Number'],
          correctAnswer: 2
        },
        {
          id: 3,
          question: 'What is the output of: [1,2,3].map(n => n * 2)?',
          options: ['[1,2,3]', '[2,4,6]', '2,4,6', 'Error'],
          correctAnswer: 1
        }
      ],
      business: [
        {
          id: 1,
          question: 'What is the term for the difference between total revenue and total cost?',
          options: ['Gross margin', 'Net profit', 'Operating income', 'Cash flow'],
          correctAnswer: 1
        },
        {
          id: 2,
          question: 'Which financial statement shows a company\'s revenues and expenses over a period of time?',
          options: ['Balance Sheet', 'Income Statement', 'Cash Flow Statement', 'Statement of Retained Earnings'],
          correctAnswer: 1
        },
        {
          id: 3,
          question: 'What does ROI stand for?',
          options: ['Return On Investment', 'Rate Of Interest', 'Risk Of Inflation', 'Reduction Of Income'],
          correctAnswer: 0
        }
      ],
      design: [
        {
          id: 1,
          question: 'Which color model is used for digital display?',
          options: ['CMYK', 'RGB', 'HSL', 'Pantone'],
          correctAnswer: 1
        },
        {
          id: 2,
          question: 'What design principle deals with the arrangement of elements to create visual stability?',
          options: ['Contrast', 'Repetition', 'Balance', 'Hierarchy'],
          correctAnswer: 2
        },
        {
          id: 3,
          question: 'Which file format supports transparency?',
          options: ['JPEG', 'PNG', 'BMP', 'GIF'],
          correctAnswer: 1
        }
      ],
      engineering: [
        {
          id: 1,
          question: 'If the velocity of a particle is given by v = 2t + 3, what is its acceleration?',
          options: ['2 m/s²', '3 m/s²', '5 m/s²', '0 m/s²'],
          correctAnswer: 0
        },
        {
          id: 2,
          question: 'What is the SI unit of electric current?',
          options: ['Ampere', 'Volt', 'Watt', 'Ohm'],
          correctAnswer: 0
        },
        {
          id: 3,
          question: 'Which of the following is a vector quantity?',
          options: ['Mass', 'Temperature', 'Velocity', 'Time'],
          correctAnswer: 2
        }
      ],
      general: [
        {
          id: 1,
          question: 'What skill is most important for effective leadership?',
          options: ['Communication', 'Technical knowledge', 'Working long hours', 'Micromanagement'],
          correctAnswer: 0
        },
        {
          id: 2,
          question: 'Which of these is considered a "soft skill"?',
          options: ['Programming', 'Accounting', 'Emotional intelligence', 'Data analysis'],
          correctAnswer: 2
        },
        {
          id: 3,
          question: 'What is the most effective way to handle a conflict at work?',
          options: ['Ignore it', 'Report to HR immediately', 'Address it directly with the person', 'Complain to coworkers'],
          correctAnswer: 2
        }
      ]
    };
    
    return questionsMap[category] || questionsMap.general;
  }

  const startGame = () => {
    setGameState("playing");
    setCurrentQuestion(0);
    setAnswers([]);
    setTime(60);
    setScore(0);
    // Start timer
    const timer = setInterval(() => {
      setTime(prevTime => {
        if (prevTime <= 1) {
          // Time's up
          endGame();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    setGameTimer(timer);
  };

  const endGame = () => {
    if (gameTimer) {
      clearInterval(gameTimer);
      setGameTimer(null);
    }
    
    // Calculate score based on correct answers
    if (gameData) {
      const correctCount = answers.filter((answer, index) => 
        answer === gameData.questions[index].correctAnswer
      ).length;
      const calculatedScore = Math.round((correctCount / gameData.questions.length) * 100);
      setScore(calculatedScore);
      setGameCompleted(true);
    }
    setGameState("completed");
  };

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);
    
    // Move to next question or end game
    if (gameData && currentQuestion < gameData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      endGame();
    }
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  useEffect(() => {
    return () => {
      if (gameTimer) {
        clearInterval(gameTimer);
      }
    };
  }, [gameTimer]);

  // Show success toast if game is completed
  useEffect(() => {
    if (gameCompleted && gameData) {
      toast({
        title: "Game Completed!",
        description: `You scored ${score}% and earned +${gameData.xpReward} XP!`,
      });
    }
  }, [gameCompleted, score, gameData]);

  if (!gameData) return <div className="flex justify-center items-center h-screen text-white">Loading game...</div>;

  return (
    <div className="min-h-screen py-8 px-4">
      {/* Back button */}
      <Button 
        variant="ghost" 
        className="mb-6 flex items-center gap-2 hover:bg-white/5 text-white" 
        onClick={() => navigate(`/games`)}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Games
      </Button>

      <div className="max-w-4xl mx-auto">
        {/* Game Intro */}
        {gameState === "intro" && (
          <NeonCard color={gameData.color} className="text-center">
            <div className="py-10 px-4">
              <NeonTitle 
                color={gameData.color}
                size="xl"
                className="mb-6"
              >
                {gameData.title}
              </NeonTitle>
              
              <p className="text-white/70 max-w-lg mx-auto mb-8 text-lg">
                {gameData.description}
              </p>
              
              <div className="max-w-md mx-auto mb-10 space-y-6">
                <div className="bg-white/5 border border-white/10 rounded-lg p-4 flex items-center">
                  <div className="h-10 w-10 rounded-full bg-black/40 flex items-center justify-center mr-4">
                    <Clock className={`h-5 w-5 text-neon-${gameData.color}`} />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium text-white">Time Limit</h3>
                    <p className="text-sm text-white/70">You have 60 seconds to complete the game</p>
                  </div>
                </div>
                
                <div className="bg-white/5 border border-white/10 rounded-lg p-4 flex items-center">
                  <div className="h-10 w-10 rounded-full bg-black/40 flex items-center justify-center mr-4">
                    <Trophy className={`h-5 w-5 text-neon-${gameData.color}`} />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium text-white">Earn XP</h3>
                    <p className="text-sm text-white/70">Complete all questions to earn +{gameData.xpReward} XP</p>
                  </div>
                </div>
              </div>
              
              <NeonButton 
                color={gameData.color}
                size="lg"
                onClick={startGame}
              >
                Start Game
              </NeonButton>
            </div>
          </NeonCard>
        )}

        {/* Game Playing */}
        {gameState === "playing" && gameData && (
          <div className="space-y-6">
            {/* Game header */}
            <NeonCard color={gameData.color} className="mb-6">
              <div className="flex items-center justify-between">
                <h2 className={`text-neon-${gameData.color} font-display text-xl`}>
                  {gameData.title}
                </h2>
                <div className="flex items-center bg-white/5 px-4 py-1 rounded-full">
                  <Clock className={`h-4 w-4 mr-2 text-neon-${gameData.color}`} />
                  <span className={`font-display text-neon-${gameData.color}`}>{formatTime(time)}</span>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-white/70">Question {currentQuestion + 1} of {gameData.questions.length}</span>
                  <span className="text-white/70">{Math.round((currentQuestion / gameData.questions.length) * 100)}% Complete</span>
                </div>
                <Progress 
                  value={(currentQuestion / gameData.questions.length) * 100}
                  className="h-1 bg-white/10"
                  indicatorClassName={`bg-neon-${gameData.color}`}
                />
              </div>
            </NeonCard>
            
            {/* Current Question */}
            <NeonCard color={gameData.color}>
              <div className="space-y-6">
                <h3 className="text-xl font-medium text-white">
                  {gameData.questions[currentQuestion].question}
                </h3>
                
                <div className="grid gap-3">
                  {gameData.questions[currentQuestion].options.map((option, index) => (
                    <Button
                      key={index}
                      className={`justify-start text-left py-6 px-4 h-auto bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20`}
                      onClick={() => handleAnswer(index)}
                    >
                      <div className="flex items-center">
                        <div className="h-7 w-7 flex items-center justify-center rounded-full bg-black/50 border border-white/30 mr-3">
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span className="text-white">{option}</span>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            </NeonCard>
          </div>
        )}

        {/* Game Completed */}
        {gameState === "completed" && gameData && (
          <NeonCard color={gameData.color} className="text-center">
            <div className="py-10 px-4">
              <div className="flex justify-center mb-6">
                <div className={`h-20 w-20 rounded-full bg-${gameData.color === 'yellow' ? 'yellow' : gameData.color === 'teal' ? 'teal' : 'orange'}-500/20 border-2 border-${gameData.color === 'yellow' ? 'yellow' : gameData.color === 'teal' ? 'teal' : 'orange'}-500/50 flex items-center justify-center`}>
                  {score >= 70 ? (
                    <Trophy className={`h-10 w-10 text-neon-${gameData.color}`} />
                  ) : score >= 40 ? (
                    <Award className={`h-10 w-10 text-neon-${gameData.color}`} />
                  ) : (
                    <Flag className={`h-10 w-10 text-neon-${gameData.color}`} />
                  )}
                </div>
              </div>
              
              <NeonTitle 
                color={gameData.color}
                size="xl"
                className="mb-3"
              >
                Game Completed!
              </NeonTitle>
              
              <p className="text-white/70 mb-8">
                Here's how you did:
              </p>
              
              <div className="max-w-md mx-auto mb-10">
                <div className="relative h-32 w-32 mx-auto mb-6">
                  <div className={`absolute inset-0 rounded-full flex items-center justify-center border-8 border-${gameData.color === 'yellow' ? 'yellow' : gameData.color === 'teal' ? 'teal' : 'orange'}-500/20`}>
                    <span className={`text-4xl font-display text-neon-${gameData.color}`}>
                      {score}%
                    </span>
                  </div>
                  <svg className="w-full h-full -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="8"
                      strokeDasharray="352"
                      strokeDashoffset={352 * (1 - score/100)}
                      className={`text-neon-${gameData.color} transform origin-center`}
                    />
                  </svg>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <div className="text-3xl font-display text-white">{answers.filter((answer, index) => answer === gameData.questions[index].correctAnswer).length}</div>
                    <div className="text-sm text-white/70">Correct Answers</div>
                  </div>
                  
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <div className="text-3xl font-display text-white">+{gameData.xpReward}</div>
                    <div className="text-sm text-white/70">XP Earned</div>
                  </div>
                </div>
                
                <div className="flex space-x-3 justify-center">
                  <NeonButton
                    color={gameData.color}
                    onClick={() => navigate(`/games/${gameId}/leaderboard`)}
                  >
                    <Trophy className="h-4 w-4 mr-2" />
                    View Leaderboard
                  </NeonButton>
                  
                  <Button
                    variant="outline"
                    className="bg-transparent border-white/20 text-white hover:bg-white/5"
                    onClick={startGame}
                  >
                    Play Again
                  </Button>
                </div>
                
                <div className="mt-6">
                  <Button
                    variant="ghost"
                    className="text-white/50 hover:text-white hover:bg-white/5"
                    onClick={() => navigate("/games")}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Games
                  </Button>
                </div>
              </div>
            </div>
          </NeonCard>
        )}
      </div>
    </div>
  );
};

export default GamePlayPartnerPage;
