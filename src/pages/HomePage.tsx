import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Camera, Link, TrendingUp, User } from "lucide-react";
import MascotBubble from "@/components/MascotBubble";
import { getRandomMascotMessage, recipes } from "@/lib/recipe-data";

const HomePage = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      icon: TrendingUp,
      label: "Trending",
      description: "Swipe through recipes",
      path: "/feed",
    },
    {
      icon: Camera,
      label: "Scan",
      description: "Snap your ingredients",
      path: "/scan",
    },
    {
      icon: Link,
      label: "Import",
      description: "Paste a video link",
      path: "/import",
    },
    {
      icon: User,
      label: "Profile",
      description: "Your saved recipes",
      path: "/profile",
    },
  ];

  return (
    <div className="min-h-[100dvh] bg-background px-5 pt-14 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Pantry<span className="font-normal">Chef</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">What are we cooking today?</p>
        </div>
        <button
          onClick={() => navigate("/profile")}
          className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center"
        >
          <User className="w-5 h-5 text-foreground" />
        </button>
      </div>

      {/* Mascot */}
      <MascotBubble message={getRandomMascotMessage("welcome")} />

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 gap-3 mt-6">
        {quickActions.map((action, i) => {
          const Icon = action.icon;
          return (
            <motion.button
              key={action.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => navigate(action.path)}
              className="flex flex-col items-start p-4 rounded-2xl bg-card border border-border text-left hover:bg-secondary transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center mb-3">
                <Icon className="w-5 h-5 text-foreground" />
              </div>
              <span className="font-display text-sm font-semibold text-foreground">{action.label}</span>
              <span className="text-xs text-muted-foreground mt-0.5">{action.description}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Recently Trending */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display text-base font-semibold text-foreground">Recently Trending</h2>
          <button onClick={() => navigate("/feed")} className="text-xs text-muted-foreground font-medium">
            See all →
          </button>
        </div>
        <div className="space-y-3">
          {recipes.slice(0, 3).map((recipe, i) => (
            <motion.div
              key={recipe.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
              onClick={() => navigate(`/recipe/${recipe.id}`)}
              className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border cursor-pointer hover:bg-secondary transition-colors"
            >
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-foreground truncate">{recipe.title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {recipe.cookTime} · {recipe.difficulty}
                </p>
              </div>
              <span className="text-xs text-muted-foreground">{recipe.likes.toLocaleString()} ♥</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
