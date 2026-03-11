import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { Heart, MessageCircle, Clock, ChefHat, Bookmark } from "lucide-react";
import { recipes } from "@/lib/recipe-data";

const FeedPage = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const containerRef = useRef<HTMLDivElement>(null);

  const swipeThreshold = 50;

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.y < -swipeThreshold && currentIndex < recipes.length - 1) {
      setDirection(-1);
      setCurrentIndex((prev) => prev + 1);
    } else if (info.offset.y > swipeThreshold && currentIndex > 0) {
      setDirection(1);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY > 30 && currentIndex < recipes.length - 1) {
        setDirection(-1);
        setCurrentIndex((prev) => prev + 1);
      } else if (e.deltaY < -30 && currentIndex > 0) {
        setDirection(1);
        setCurrentIndex((prev) => prev - 1);
      }
    };

    const el = containerRef.current;
    if (el) el.addEventListener("wheel", handleWheel, { passive: false });
    return () => { if (el) el.removeEventListener("wheel", handleWheel); };
  }, [currentIndex]);

  const recipe = recipes[currentIndex];

  const variants = {
    enter: (dir: number) => ({ y: dir > 0 ? "-100%" : "100%", opacity: 0 }),
    center: { y: 0, opacity: 1 },
    exit: (dir: number) => ({ y: dir > 0 ? "100%" : "-100%", opacity: 0 }),
  };

  return (
    <div ref={containerRef} className="h-[100dvh] w-full overflow-hidden bg-foreground relative">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-40 px-4 pt-3 pb-2 flex items-center justify-between">
        <h1 className="font-display text-lg font-bold text-white">
          Trending
        </h1>
        <div className="flex items-center gap-3">
          <span className="text-xs text-white/60 font-medium">{currentIndex + 1}/{recipes.length}</span>
        </div>
      </div>

      {/* Swipeable Card */}
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={recipe.id}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
        >
          <img
            src={recipe.image}
            alt={recipe.title}
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

          {/* Right action bar */}
          <div className="absolute right-3 bottom-36 flex flex-col items-center gap-5 z-10">
            <button
              onClick={(e) => { e.stopPropagation(); setLiked(prev => ({ ...prev, [recipe.id]: !prev[recipe.id] })); }}
              className="flex flex-col items-center gap-1"
            >
              <Heart className={`w-7 h-7 ${liked[recipe.id] ? "fill-red-500 text-red-500" : "text-white"}`} />
              <span className="text-[11px] text-white font-medium">
                {liked[recipe.id] ? recipe.likes + 1 : recipe.likes}
              </span>
            </button>
            <div className="flex flex-col items-center gap-1">
              <MessageCircle className="w-7 h-7 text-white" />
              <span className="text-[11px] text-white font-medium">{recipe.comments}</span>
            </div>
            <button className="flex flex-col items-center gap-1">
              <Bookmark className="w-7 h-7 text-white" />
              <span className="text-[11px] text-white font-medium">Save</span>
            </button>
          </div>

          {/* Bottom info */}
          <div
            className="absolute bottom-20 left-0 right-14 p-4 z-10"
            onClick={() => navigate(`/recipe/${recipe.id}`)}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-sm font-bold text-white">
                {recipe.authorAvatar}
              </div>
              <span className="text-sm font-medium text-white">{recipe.author}</span>
            </div>
            <h2 className="font-display text-2xl font-bold text-white mb-2">{recipe.title}</h2>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-xs text-white/80">
                <Clock className="w-3.5 h-3.5" /> {recipe.cookTime}
              </span>
              <span className="flex items-center gap-1 text-xs text-white/80">
                <ChefHat className="w-3.5 h-3.5" /> {recipe.difficulty}
              </span>
            </div>
            <div className="flex gap-1.5 mt-2">
              {recipe.tags.map((tag) => (
                <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-white/15 text-white/80">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Swipe hint */}
          {currentIndex === 0 && (
            <motion.div
              className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[11px] text-white/40"
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              Swipe up for more
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Dot indicators */}
      <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex flex-col gap-1 z-40">
        {recipes.map((_, i) => (
          <div
            key={i}
            className={`w-1 rounded-full transition-all duration-200 ${i === currentIndex ? "h-4 bg-white" : "h-1 bg-white/30"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default FeedPage;
