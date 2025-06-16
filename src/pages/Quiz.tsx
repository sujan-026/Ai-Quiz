
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Trophy, Target } from "lucide-react";
import CategorySelection from "@/components/CategorySelection";
import QuizGame from "@/components/QuizGame";
import Header from "@/components/Header";

const Quiz = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [totalScore, setTotalScore] = useState(0);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handleQuizComplete = (score: number) => {
    setTotalScore(prev => prev + score);
    if (score >= 7) { // Need 70% to level up
      setCurrentLevel(prev => prev + 1);
    }
    setSelectedCategory(null); // Return to category selection
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Header />
      
      <div className="pt-24 px-6 lg:px-8 pb-16">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Button
              variant="ghost"
              className="text-white hover:bg-white/10"
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-white">
                <Target className="w-5 h-5 text-purple-400" />
                <span className="font-semibold">Level {currentLevel}</span>
              </div>
              <div className="flex items-center space-x-2 text-white">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <span className="font-semibold">{totalScore} pts</span>
              </div>
            </div>
          </div>

          {/* Main Content */}
          {!selectedCategory ? (
            <CategorySelection onCategorySelect={handleCategorySelect} />
          ) : (
            <QuizGame 
              category={selectedCategory}
              level={currentLevel}
              onComplete={handleQuizComplete}
              onBack={() => setSelectedCategory(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
