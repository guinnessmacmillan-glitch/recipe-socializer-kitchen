import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { Heart, X, Clock, ChefHat, Bookmark, ArrowLeft } from "lucide-react";
import { recipes } from "@/lib/recipe-data";
import { useToast } from "@/hooks/use-toast";

const FeedPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exitDirection, setExitDirection] = useState<"left" | "right" | null>(null);
  const [saved, setSaved] = useState<string[]>([]);

  const currentRecipe = recipes[currentIndex];
  const isFinished = currentIndex >= recipes.length;

  const handleSwipe = useCallback(
    (dir: "left" | "right") => {
      if (isFinished) return;
      setExitDirection(dir);
      if (dir === "right") {
        setSaved((prev) => [...prev, currentRecipe.id]);
        toast({
          title: "Recipe saved! 🔖",
          description: `${currentRecipe.title} added to your collection.`,
        });
      }
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        setExitDirection(null);
      }, 300);
    },
    [currentIndex, isFinished, currentRecipe, toast]
  );

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 100) {
      handleSwipe(info.offset.x > 0 ? "right" : "left");
    }
  };

  if (isFinished) {
    return (
      <div className="h-[100dvh] flex flex-col items-center justify-center bg-background px-6 text-center gap-6">
        <div className="text-6xl">🍽️</div>
        <h2 className="font-display text-2xl font-bold text-foreground">No more recipes!</h2>
        <p className="text-muted-foreground text-sm">
          You saved {saved.length} recipe{saved.length !== 1 ? "s" : ""}. Check your profile to see them.
        </p>
        <button
          onClick={() => { setCurrentIndex(0); setSaved([]); }}
          className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-display font-semibold text-sm"
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

  return (
    <div className="h-[100dvh] w-full bg-background flex flex-col">
      {/* Header */}
      <div className="px-4 pt-3 pb-2 flex items-center justify-between flex-shrink-0">
        <button onClick={() => navigate("/")}>
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
          <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 rounded-3xl overflow-hidden h-[75%] scale-[0.92] opacity-50">
            <img
              src={recipes[currentIndex + 1].image}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Current card */}
        <AnimatePresence>
          {!exitDirection && (
            <motion.div
              key={currentRecipe.id}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, x: 0, rotate: 0 }}
              exit={{
                x: exitDirection === "right" ? 400 : -400,
                rotate: exitDirection === "right" ? 15 : -15,
                opacity: 0,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.8}
              onDragEnd={handleDragEnd}
              className="absolute inset-x-4 top-1/2 -translate-y-1/2 h-[75%] rounded-3xl overflow-hidden cursor-grab active:cursor-grabbing shadow-xl"
              style={{ touchAction: "none" }}
              onClick={() => navigate(`/recipe/${currentRecipe.id}`)}
            >
              <img
                src={currentRecipe.image}
                alt={currentRecipe.title}
                className="absolute inset-0 w-full h-full object-cover"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

              {/* Swipe indicators */}
              <motion.div
                className="absolute top-6 left-6 px-4 py-2 rounded-xl border-2 border-destructive bg-destructive/20 rotate-[-15deg]"
                style={{ opacity: 0 }}
                drag={false}
              >
                <span className="text-destructive font-bold text-xl">NOPE</span>
              </motion.div>
              <motion.div
                className="absolute top-6 right-6 px-4 py-2 rounded-xl border-2 border-success bg-success/20 rotate-[15deg]"
                style={{ opacity: 0 }}
                drag={false}
              >
                <span className="text-success font-bold text-xl">SAVE</span>
              </motion.div>

              {/* Author */}
              <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-sm font-bold text-white">
                  {currentRecipe.authorAvatar}
                </div>
                <span className="text-sm font-medium text-white drop-shadow">{currentRecipe.author}</span>
              </div>

              {/* Bottom info */}
              <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                <h2 className="font-display text-2xl font-bold text-white mb-2 drop-shadow">
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
                <div className="flex gap-1.5">
                  {currentRecipe.tags.map((tag) => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-white/15 text-white/80">
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
        <button
          onClick={() => handleSwipe("left")}
          className="w-14 h-14 rounded-full bg-card border border-border flex items-center justify-center shadow-md active:scale-90 transition-transform"
        >
          <X className="w-7 h-7 text-destructive" />
        </button>
        <button
          onClick={() => navigate(`/recipe/${currentRecipe.id}`)}
          className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center shadow-md active:scale-90 transition-transform"
        >
          <ChefHat className="w-5 h-5 text-foreground" />
        </button>
        <button
          onClick={() => handleSwipe("right")}
          className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-md active:scale-90 transition-transform"
        >
          <Bookmark className="w-7 h-7 text-primary-foreground" />
        </button>
      </div>
    </div>
  );
};

export default FeedPage;
