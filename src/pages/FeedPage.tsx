import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import RecipeCard from "@/components/RecipeCard";
import MascotBubble from "@/components/MascotBubble";
import { recipes, getRandomMascotMessage } from "@/lib/recipe-data";

const FeedPage = () => {
  const navigate = useNavigate();
  const [showMascot, setShowMascot] = useState(true);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-lg px-4 py-3 flex items-center justify-between">
        <h1 className="font-display text-xl font-bold text-foreground">
          Pantry<span className="text-primary">Chef</span>
        </h1>
        <div className="flex gap-2">
          <button
            onClick={() => navigate("/import")}
            className="text-xs px-3 py-1.5 rounded-full gradient-warm text-primary-foreground font-medium"
          >
            + Import
          </button>
        </div>
      </div>

      {/* Mascot */}
      <div className="pt-16 px-2">
        <AnimatePresence>
          {showMascot && (
            <motion.div exit={{ opacity: 0, height: 0 }}>
              <MascotBubble message={getRandomMascotMessage("welcome")} />
              <button
                onClick={() => setShowMascot(false)}
                className="text-[10px] text-muted-foreground ml-14 mt-1"
              >
                dismiss
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Feed */}
      <div className="px-3 pt-2 space-y-4 snap-y snap-mandatory">
        {recipes.map((recipe, index) => (
          <motion.div
            key={recipe.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <RecipeCard
              recipe={recipe}
              onTap={() => navigate(`/recipe/${recipe.id}`)}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FeedPage;
