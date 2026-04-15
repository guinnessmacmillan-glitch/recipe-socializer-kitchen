import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { Heart, X, Clock, ChefHat, Bookmark, ArrowLeft } from "lucide-react";
import { recipes } from "@/lib/recipe-data";
import { useSavedRecipes } from "@/hooks/use-saved-recipes";
import { useToast } from "@/hooks/use-toast";

const FeedPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { toggleSave, isSaved } = useSavedRecipes();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exitDirection, setExitDirection] = useState<"left" | "right" | null>(null);
  const [dragX, setDragX] = useState(0);

  const currentRecipe = recipes[currentIndex];
  const isFinished = currentIndex >= recipes.length;

  const handleSwipe = useCallback(
    (dir: "left" | "right") => {
      if (isFinished) return;
      setExitDirection(dir);
      if (dir === "right" && !isSaved(currentRecipe.id)) {
        toggleSave(currentRecipe.id);
        toast({
          title: "Recipe saved! 🔖",
          description: `${currentRecipe.title} added to your collection.`,
        });
      }
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        setExitDirection(null);
        setDragX(0);
      }, 300);
    },
    [currentIndex, isFinished, currentRecipe, toast, toggleSave, isSaved]
  );

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 100) {
      handleSwipe(info.offset.x > 0 ? "right" : "left");
    }
    setDragX(0);
  };

  if (isFinished) {
    return (
      <div className="h-[100dvh] flex flex-col items-center justify-center bg-background px-6 text-center gap-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="text-6xl"
        >
          🍽️
        </motion.div>
        <h2 className="font-display text-2xl font-bold text-foreground">You've seen them all!</h2>
        <p className="text-muted-foreground text-sm">
          Check your profile to see your saved recipes.
        </p>
        <button
          onClick={() => { setCurrentIndex(0); }}
          className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-display font-semibold text-sm hover:opacity-90 transition-opacity"
        >
          Start Over
        </button>
        <button
          onClick={() => navigate("/")}
          className="text-sm text-muted-foreground underline"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const nopeOpacity = Math.min(Math.max(-dragX / 100, 0), 1);
  const saveOpacity = Math.min(Math.max(dragX / 100, 0), 1);

  return (
    <div className="h-[100dvh] w-full bg-background flex flex-col">
      {/* Header */}
      <div className="px-4 pt-3 pb-2 flex items-center justify-between flex-shrink-0">
        <button onClick={() => navigate("/")} className="p-1">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="font-display text-lg font-bold text-foreground">Discover</h1>
        <span className="text-xs text-muted-foreground font-medium">
          {currentIndex + 1}/{recipes.length}
        </span>
      </div>

      {/* Card area */}
      <div className="flex-1 relative px-4 pb-4 flex items-center justify-center overflow-hidden">
        {/* Next card preview */}
        {currentIndex + 1 < recipes.length && (
          <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 rounded-3xl overflow-hidden h-[75%] scale-[0.92] opacity-40">
            <img src={recipes[currentIndex + 1].image} alt="" className="w-full h-full object-cover" />
          </div>
        )}

        {/* Current card */}
        <AnimatePresence mode="wait">
          {!exitDirection && (
            <motion.div
              key={currentRecipe.id}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, x: 0, rotate: 0, y: 0 }}
              exit={{
                x: exitDirection === "right" ? 500 : -500,
                rotate: exitDirection === "right" ? 20 : -20,
                opacity: 0,
                transition: { duration: 0.3 },
              }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.9}
              onDrag={(_, info) => setDragX(info.offset.x)}
              onDragEnd={handleDragEnd}
              className="absolute inset-x-4 top-1/2 -translate-y-1/2 h-[75%] rounded-3xl overflow-hidden cursor-grab active:cursor-grabbing shadow-2xl border border-border/20"
              style={{ touchAction: "none" }}
              onClick={() => navigate(`/recipe/${currentRecipe.id}`)}
            >
              <img
                src={currentRecipe.image}
                alt={currentRecipe.title}
                className="absolute inset-0 w-full h-full object-cover"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/30" />

              {/* Swipe indicators */}
              <motion.div
                className="absolute top-8 left-6 px-5 py-2.5 rounded-2xl border-3 border-destructive bg-destructive/30 rotate-[-20deg] backdrop-blur-sm"
                style={{ opacity: nopeOpacity }}
              >
                <span className="text-destructive font-display font-bold text-2xl">NOPE</span>
              </motion.div>
              <motion.div
                className="absolute top-8 right-6 px-5 py-2.5 rounded-2xl border-3 border-success bg-success/30 rotate-[20deg] backdrop-blur-sm"
                style={{ opacity: saveOpacity }}
              >
                <span className="font-display font-bold text-2xl" style={{ color: "hsl(var(--success))" }}>SAVE</span>
              </motion.div>

              {/* Author */}
              <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                <div className="w-9 h-9 rounded-full bg-warm/80 backdrop-blur-sm flex items-center justify-center text-sm font-bold text-white shadow-md">
                  {currentRecipe.authorAvatar}
                </div>
                <span className="text-sm font-medium text-white drop-shadow-lg">{currentRecipe.author}</span>
              </div>

              {/* Cuisine badge */}
              {currentRecipe.cuisine && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="text-[10px] px-2.5 py-1 rounded-full bg-warm/60 text-white font-medium backdrop-blur-sm">
                    {currentRecipe.cuisine}
                  </span>
                </div>
              )}

              {/* Bottom info */}
              <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                <h2 className="font-display text-2xl font-bold text-white mb-2 drop-shadow-lg">
                  {currentRecipe.title}
                </h2>
                <div className="flex items-center gap-3 mb-2">
                  <span className="flex items-center gap-1 text-xs text-white/80">
                    <Clock className="w-3.5 h-3.5" /> {currentRecipe.cookTime}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-white/80">
                    <ChefHat className="w-3.5 h-3.5" /> {currentRecipe.difficulty}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-white/80">
                    <Heart className="w-3.5 h-3.5" /> {currentRecipe.likes.toLocaleString()}
                  </span>
                </div>
                <div className="flex gap-1.5 flex-wrap">
                  {currentRecipe.tags.map((tag) => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-white/15 text-white/80 backdrop-blur-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-center gap-6 pb-6 flex-shrink-0">
        <motion.button
          whileTap={{ scale: 0.85 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => handleSwipe("left")}
          className="w-14 h-14 rounded-full bg-card border border-border flex items-center justify-center shadow-lg"
        >
          <X className="w-7 h-7 text-destructive" />
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.85 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate(`/recipe/${currentRecipe.id}`)}
          className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center shadow-lg"
        >
          <ChefHat className="w-5 h-5 text-foreground" />
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.85 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => handleSwipe("right")}
          className="w-14 h-14 rounded-full bg-warm flex items-center justify-center shadow-lg"
        >
          <Bookmark className="w-7 h-7 text-white" />
        </motion.button>
      </div>
    </div>
  );
};

export default FeedPage;
