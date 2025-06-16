
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, ArrowLeft } from "lucide-react";
import { generateQuizQuestions } from "@/utils/quizGenerator";
import { useToast } from "@/hooks/use-toast";

interface QuizGameProps {
  category: string;
  level: number;
  onComplete: (score: number) => void;
  onBack: () => void;
}

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

const QuizGame = ({ category, level, onComplete, onBack }: QuizGameProps) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadQuestions();
  }, [category, level]);

  const loadQuestions = async () => {
    setIsLoading(true);
    try {
      const generatedQuestions = await generateQuizQuestions(category, level);
      setQuestions(generatedQuestions);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate questions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setShowResult(true);

    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setQuizCompleted(true);
      }
    }, 1500);
  };

  const handleQuizComplete = () => {
    onComplete(score);
  };

  if (isLoading) {
    return (
      <div className="text-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
        <p className="text-white text-lg">Generating your quiz questions...</p>
      </div>
    );
  }

  if (quizCompleted) {
    const percentage = (score / questions.length) * 100;
    const passed = percentage >= 70;

    return (
      <div className="text-center animate-fade-in">
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl text-white mb-4">
              Quiz Complete! 🎉
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-6xl font-bold text-purple-400">
              {score}/{questions.length}
            </div>
            <div className="text-xl text-gray-300">
              You scored {percentage.toFixed(0)}%
            </div>
            <div className={`text-lg font-semibold ${passed ? 'text-green-400' : 'text-red-400'}`}>
              {passed ? '🎊 Congratulations! You leveled up!' : '📚 Keep practicing to level up!'}
            </div>
            <div className="flex gap-4 justify-center">
              <Button
                onClick={handleQuizComplete}
                className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
              >
                Continue
              </Button>
              <Button
                variant="outline"
                onClick={onBack}
                className="border-white/20 text-white hover:bg-white/10"
              >
                Choose Another Category
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <Button
          variant="ghost"
          className="text-white hover:bg-white/10"
          onClick={onBack}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Categories
        </Button>
        <div className="text-white text-lg font-semibold">
          Question {currentQuestion + 1} of {questions.length}
        </div>
      </div>

      <Progress value={progress} className="mb-8 h-2" />

      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardHeader>
          <CardTitle className="text-2xl text-white text-center">
            {currentQ.question}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentQ.options.map((option, index) => {
            let buttonClass = "w-full p-4 text-left border-2 border-white/20 hover:border-purple-400 transition-all duration-200 transform hover:scale-[1.02]";
            
            if (showResult) {
              if (index === currentQ.correctAnswer) {
                buttonClass += " bg-green-500/20 border-green-400 text-green-100";
              } else if (index === selectedAnswer && index !== currentQ.correctAnswer) {
                buttonClass += " bg-red-500/20 border-red-400 text-red-100";
              } else {
                buttonClass += " bg-white/5 text-gray-300";
              }
            } else if (selectedAnswer === index) {
              buttonClass += " bg-purple-500/20 border-purple-400 text-purple-100";
            } else {
              buttonClass += " bg-white/5 text-white hover:bg-white/10";
            }

            return (
              <Button
                key={index}
                variant="ghost"
                className={buttonClass}
                onClick={() => handleAnswerSelect(index)}
                disabled={showResult}
              >
                <div className="flex items-center justify-between w-full">
                  <span>{option}</span>
                  {showResult && index === currentQ.correctAnswer && (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  )}
                  {showResult && index === selectedAnswer && index !== currentQ.correctAnswer && (
                    <XCircle className="w-5 h-5 text-red-400" />
                  )}
                </div>
              </Button>
            );
          })}
          
          {!showResult && (
            <Button
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null}
              className="w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 disabled:opacity-50"
            >
              {currentQuestion + 1 === questions.length ? 'Finish Quiz' : 'Next Question'}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizGame;
