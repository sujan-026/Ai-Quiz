
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Brain } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="absolute top-0 left-0 right-0 z-50 px-6 lg:px-8 py-6">
      <nav className="mx-auto max-w-6xl flex items-center justify-between">
        <div 
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <Brain className="w-8 h-8 text-purple-400" />
          <span className="text-2xl font-bold text-white">QuizAI</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-gray-300 hover:text-white transition-colors">
            Home
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">
            Categories
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">
            Leaderboard
          </a>
          <Button 
            className="bg-purple-600 hover:bg-purple-700 text-white"
            onClick={() => navigate("/quiz")}
          >
            Start Quiz
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
