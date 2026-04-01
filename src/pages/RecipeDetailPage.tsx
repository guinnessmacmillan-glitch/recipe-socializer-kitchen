import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, ChefHat, Heart, Share2 } from "lucide-react";
import { useState } from "react";
import { recipes } from "@/lib/recipe-data";
import { Button } from "@/components/ui/button";

const RecipeDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipe = recipes.find((r) => r.id === id);
  const [cooking, setCooking] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  if (!recipe) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Recipe not found</p>
      </div>
    );
  }

  if (cooking) {
    return (
      <div className="min-h-screen bg-background">
        <div className="fixed top-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-lg px-4 py-3 flex items-center justify-between border-b border-border">
          <button onClick={() => setCooking(false)} className="text-foreground">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="font-display font-bold text-foreground">Cooking Mode</h2>
          <span className="text-sm text-muted-foreground font-medium">
            {currentStep + 1}/{recipe.steps.length}
          </span>
        </div>

        <div className="pt-20 px-6 pb-32">
          <div className="flex gap-1 mb-8">
            {recipe.steps.map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  i <= currentStep ? "bg-foreground" : "bg-muted"
                }`}
              />
            ))}
          </div>

          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <span className="text-6xl font-display font-bold text-muted">
              {currentStep + 1}
            </span>
            <p className="text-xl font-display text-foreground leading-relaxed">
              {recipe.steps[currentStep]}
            </p>
          </motion.div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border p-4 pb-6">
          <div className="flex gap-3 max-w-lg mx-auto">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="flex-1 border-border text-foreground"
            >
              Previous
            </Button>
            {currentStep < recipe.steps.length - 1 ? (
              <Button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="flex-1 bg-primary text-primary-foreground border-0"
              >
                Next Step
              </Button>
            ) : (
              <Button
                onClick={() => setCooking(false)}
                className="flex-1 bg-success text-primary-foreground border-0"
              >
                Done! 🎉
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero */}
      <div className="relative h-72">
        <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 w-9 h-9 rounded-full bg-card/50 backdrop-blur flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
      </div>

      <div className="px-4 -mt-8 relative z-10">
        <div className="bg-card rounded-2xl p-5 border border-border space-y-4">
          <h1 className="font-display text-2xl font-bold text-foreground">{recipe.title}</h1>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" /> {recipe.cookTime}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <ChefHat className="w-4 h-4" /> {recipe.difficulty}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Heart className="w-4 h-4" /> {recipe.likes}
            </span>
          </div>

          {/* What yours should look like */}
          <div>
            <h3 className="text-sm font-display font-semibold text-foreground mb-2">
              What yours should look like
            </h3>
            <div className="flex gap-2 overflow-x-auto hide-scrollbar">
              {[recipe.image, recipe.image].map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="Reference"
                  className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
                />
              ))}
            </div>
          </div>

          {/* Ingredients */}
          <div>
            <h3 className="text-sm font-display font-semibold text-foreground mb-2">Ingredients</h3>
            <div className="space-y-1.5">
              {recipe.ingredients.map((ing, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-foreground">{ing.name}</span>
                  <span className="text-muted-foreground">{ing.amount}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Steps */}
          <div>
            <h3 className="text-sm font-display font-semibold text-foreground mb-2">Steps</h3>
            <div className="space-y-2">
              {recipe.steps.map((s, i) => (
                <div key={i} className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-secondary text-foreground text-xs flex items-center justify-center flex-shrink-0 font-bold">
                    {i + 1}
                  </span>
                  <p className="text-sm text-foreground/80">{s}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom actions */}
      <div className="fixed bottom-16 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border p-3">
        <div className="flex gap-2 max-w-lg mx-auto">
          <Button
            onClick={() => setCooking(true)}
            className="flex-1 bg-primary text-primary-foreground border-0 font-display font-semibold"
          >
            Start Cooking
          </Button>
          <Button variant="outline" className="border-border text-foreground px-3">
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailPage;
