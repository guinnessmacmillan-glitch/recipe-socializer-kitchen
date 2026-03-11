import { Heart, MessageCircle, Clock, ChefHat } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import type { Recipe } from "@/lib/recipe-data";

interface RecipeCardProps {
  recipe: Recipe;
  onTap: () => void;
}

const RecipeCard = ({ recipe, onTap }: RecipeCardProps) => {
  const [liked, setLiked] = useState(false);

  return (
    <motion.div
      className="relative w-full h-[calc(100vh-140px)] snap-start flex-shrink-0 rounded-2xl overflow-hidden"
      whileTap={{ scale: 0.98 }}
    >
      <img
        src={recipe.image}
        alt={recipe.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 gradient-overlay" />

      {/* Right action bar */}
      <div className="absolute right-3 bottom-32 flex flex-col items-center gap-5">
        <button
          onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
          className="flex flex-col items-center gap-1"
        >
          <Heart className={`w-7 h-7 ${liked ? "fill-accent text-accent" : "text-foreground"}`} />
          <span className="text-xs text-foreground font-medium">
            {liked ? recipe.likes + 1 : recipe.likes}
          </span>
        </button>
        <div className="flex flex-col items-center gap-1">
          <MessageCircle className="w-7 h-7 text-foreground" />
          <span className="text-xs text-foreground font-medium">{recipe.comments}</span>
        </div>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-4" onClick={onTap}>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-full gradient-warm flex items-center justify-center text-sm font-bold text-primary-foreground">
            {recipe.authorAvatar}
          </div>
          <span className="text-sm font-medium text-foreground">{recipe.author}</span>
        </div>
        <h2 className="font-display text-2xl font-bold text-foreground mb-2">{recipe.title}</h2>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-xs text-foreground/80">
            <Clock className="w-3.5 h-3.5" /> {recipe.cookTime}
          </span>
          <span className="flex items-center gap-1 text-xs text-foreground/80">
            <ChefHat className="w-3.5 h-3.5" /> {recipe.difficulty}
          </span>
          {recipe.source && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/20 text-primary font-medium">
              {recipe.source === "imported" ? "Imported" : recipe.source === "ai" ? "AI" : recipe.source === "scanned" ? "Scanned" : "Community"}
            </span>
          )}
        </div>
        <div className="flex gap-1.5 mt-2">
          {recipe.tags.map((tag) => (
            <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-muted/60 text-muted-foreground">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default RecipeCard;
