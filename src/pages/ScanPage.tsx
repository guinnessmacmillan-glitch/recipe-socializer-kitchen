import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Camera, ImageIcon, Loader2, ChefHat, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import MascotBubble from "@/components/MascotBubble";
import { getRandomMascotMessage, recipes } from "@/lib/recipe-data";

type Step = "capture" | "scanning" | "results";

const ScanPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("capture");
  const [detectedIngredients, setDetectedIngredients] = useState<string[]>([]);

  const handleScan = () => {
    setStep("scanning");
    setTimeout(() => {
      setDetectedIngredients([
        "Eggs (6)",
        "Rice (1 bag)",
        "Garlic (1 bulb)",
        "Soy sauce",
        "Green onions",
        "Butter",
        "Chicken breast",
        "Bell peppers (2)",
        "Noodles (1 pack)",
      ]);
      setStep("results");
    }, 2000);
  };

  const suggestedRecipes = recipes.slice(0, 4);

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="font-display text-lg font-bold text-foreground">Scan My Ingredients</h1>
      </div>

      <AnimatePresence mode="wait">
        {step === "capture" && (
          <motion.div
            key="capture"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="px-4 space-y-6"
          >
            <MascotBubble message={getRandomMascotMessage("scan")} />

            {/* Camera preview mock */}
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-card border-2 border-dashed border-border flex flex-col items-center justify-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                <Camera className="w-8 h-8 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground text-center px-8">
                Take a photo of your fridge, pantry, or ingredients on the counter
              </p>
              <div className="absolute bottom-6 flex gap-4">
                <Button
                  onClick={handleScan}
                  className="gradient-warm text-primary-foreground border-0 font-display font-semibold rounded-full px-8"
                >
                  <Camera className="w-4 h-4 mr-2" /> Take Photo
                </Button>
                <Button
                  variant="outline"
                  onClick={handleScan}
                  className="border-border text-foreground rounded-full"
                >
                  <ImageIcon className="w-4 h-4 mr-2" /> Gallery
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {step === "scanning" && (
          <motion.div
            key="scanning"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-4 pt-20 flex flex-col items-center gap-6"
          >
            <div className="w-20 h-20 rounded-full gradient-warm flex items-center justify-center animate-pulse-glow">
              <Loader2 className="w-8 h-8 text-primary-foreground animate-spin" />
            </div>
            <h2 className="font-display text-xl font-bold text-foreground">
              Scanning Ingredients...
            </h2>
            <p className="text-sm text-muted-foreground">
              Our AI is identifying what you've got
            </p>
          </motion.div>
        )}

        {step === "results" && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-4 space-y-5"
          >
            {/* Detected ingredients */}
            <div className="bg-card rounded-xl p-4 border border-border">
              <h3 className="text-sm font-display font-semibold text-foreground mb-3">
                Detected Ingredients
              </h3>
              <div className="flex flex-wrap gap-2">
                {detectedIngredients.map((ing, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="text-xs px-3 py-1.5 rounded-full bg-primary/15 text-primary border border-primary/20"
                  >
                    {ing}
                  </motion.span>
                ))}
              </div>
              <button
                onClick={() => setStep("capture")}
                className="text-xs text-primary mt-3 block"
              >
                Scan again
              </button>
            </div>

            {/* Recipe suggestions */}
            <div>
              <h3 className="text-sm font-display font-semibold text-foreground mb-3">
                You could make:
              </h3>
              <div className="space-y-3">
                {suggestedRecipes.map((recipe, i) => (
                  <motion.button
                    key={recipe.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => navigate(`/recipe/${recipe.id}`)}
                    className="w-full bg-card rounded-xl overflow-hidden border border-border flex items-center text-left hover:border-primary/30 transition-colors"
                  >
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-20 h-20 object-cover flex-shrink-0"
                    />
                    <div className="p-3 flex-1 min-w-0">
                      <h4 className="font-display font-semibold text-foreground text-sm truncate">
                        {recipe.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                          <Clock className="w-3 h-3" /> {recipe.cookTime}
                        </span>
                        <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                          <ChefHat className="w-3 h-3" /> {recipe.difficulty}
                        </span>
                      </div>
                      <div className="flex gap-1 mt-1.5">
                        {recipe.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="text-[9px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="bg-card-elevated rounded-xl p-4 border border-border">
              <p className="text-xs text-muted-foreground text-center">
                🤖 Can't find a match? We'll generate an AI recipe just for your ingredients!
              </p>
              <Button className="w-full mt-2 gradient-cool text-secondary-foreground border-0 text-sm">
                Generate AI Recipe
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ScanPage;
