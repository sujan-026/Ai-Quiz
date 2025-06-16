
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Brain, Target, Trophy, Users } from "lucide-react";
import Header from "@/components/Header";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Questions",
      description: "Our AI generates unique quiz questions tailored to your chosen category"
    },
    {
      icon: Target,
      title: "Progressive Difficulty",
      description: "Questions get harder as you level up, keeping you challenged"
    },
    {
      icon: Trophy,
      title: "Track Progress",
      description: "Monitor your performance and see your improvement over time"
    },
    {
      icon: Users,
      title: "Multiple Categories",
      description: "Choose from various topics to test your knowledge"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Header />
      
      {/* Hero Section */}
      <section className="relative px-6 lg:px-8 pt-20 pb-16">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-5xl lg:text-7xl font-bold text-white mb-8 animate-fade-in">
            <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              QuizAI
            </span>
            <br />
            Challenge Your Mind
          </h1>
          <p className="text-xl lg:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto animate-fade-in">
            Experience the future of learning with AI-generated quizzes that adapt to your skill level
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-6 text-lg font-semibold rounded-xl transform transition-all duration-200 hover:scale-105"
              onClick={() => navigate("/quiz")}
            >
              Start Quiz Now
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-purple-400 text-purple-300 hover:bg-purple-400 hover:text-white px-8 py-6 text-lg font-semibold rounded-xl transform transition-all duration-200 hover:scale-105"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 lg:px-8 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center text-white mb-16">
            Why Choose QuizAI?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105"
              >
                <CardContent className="p-6 text-center">
                  <feature.icon className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 lg:px-8 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="animate-fade-in">
              <div className="text-4xl lg:text-5xl font-bold text-purple-400 mb-2">1000+</div>
              <div className="text-gray-300 text-lg">Questions Generated</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-4xl lg:text-5xl font-bold text-blue-400 mb-2">50+</div>
              <div className="text-gray-300 text-lg">Categories Available</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-4xl lg:text-5xl font-bold text-pink-400 mb-2">24/7</div>
              <div className="text-gray-300 text-lg">AI Availability</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 lg:px-8 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8">
            Ready to Test Your Knowledge?
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Join thousands of learners and start your quiz journey today
          </p>
          <Button 
            size="lg"
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-12 py-6 text-xl font-semibold rounded-xl transform transition-all duration-200 hover:scale-105"
            onClick={() => navigate("/quiz")}
          >
            Get Started
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
