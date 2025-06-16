
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, BookOpen, User, Users } from "lucide-react";

interface CategorySelectionProps {
  onCategorySelect: (category: string) => void;
}

const CategorySelection = ({ onCategorySelect }: CategorySelectionProps) => {
  const categories = [
    {
      id: "science",
      name: "Science",
      description: "Biology, Chemistry, Physics",
      icon: Book,
      color: "from-green-500 to-emerald-600"
    },
    {
      id: "history",
      name: "History",
      description: "World History, Ancient Civilizations",
      icon: BookOpen,
      color: "from-amber-500 to-orange-600"
    },
    {
      id: "geography",
      name: "Geography",
      description: "Countries, Capitals, Landmarks",
      icon: Users,
      color: "from-blue-500 to-cyan-600"
    },
    {
      id: "literature",
      name: "Literature",
      description: "Classic Books, Authors, Poetry",
      icon: User,
      color: "from-purple-500 to-pink-600"
    },
    {
      id: "mathematics",
      name: "Mathematics",
      description: "Algebra, Geometry, Calculus",
      icon: Book,
      color: "from-red-500 to-rose-600"
    },
    {
      id: "technology",
      name: "Technology",
      description: "Programming, AI, Gadgets",
      icon: BookOpen,
      color: "from-indigo-500 to-blue-600"
    }
  ];

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
          Choose Your Challenge
        </h1>
        <p className="text-xl text-gray-300">
          Select a category to start your AI-powered quiz
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card 
            key={category.id}
            className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 cursor-pointer"
            onClick={() => onCategorySelect(category.id)}
          >
            <CardHeader className="text-center pb-4">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center`}>
                <category.icon className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl text-white">{category.name}</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-300">{category.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CategorySelection;
