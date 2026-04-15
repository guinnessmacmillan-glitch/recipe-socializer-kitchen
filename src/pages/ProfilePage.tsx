import { useNavigate } from "react-router-dom";
import { Settings, BookOpen, Heart, Import, Camera, Bookmark, Moon, Sun, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Switch } from "@/components/ui/switch";
import raccoonMascot from "@/assets/raccoon-mascot.png";
import { recipes } from "@/lib/recipe-data";
import { useTheme } from "@/hooks/use-theme";
import { useSavedRecipes } from "@/hooks/use-saved-recipes";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { savedIds, toggleSave } = useSavedRecipes();
  const savedRecipes = recipes.filter((r) => savedIds.includes(r.id));

  return (
    <div className="min-h-screen bg-background pb-24 px-4">
      <div className="pt-6 flex items-center justify-between mb-6">
        <h1 className="font-display text-xl font-bold text-foreground">Profile</h1>
        <button className="p-2 text-muted-foreground">
          <Settings className="w-5 h-5" />
        </button>
      </div>

      {/* Avatar */}
      <div className="flex flex-col items-center gap-3 mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="w-20 h-20 rounded-full bg-warm flex items-center justify-center shadow-lg"
        >
          <img src={raccoonMascot} alt="Profile" className="w-14 h-14" />
        </motion.div>
        <div className="text-center">
          <h2 className="font-display text-lg font-bold text-foreground">Chef Raccoon</h2>
          <p className="text-sm text-muted-foreground">@pantrychef_user</p>
        </div>
        <div className="flex gap-6 mt-2">
          {[
            { label: "Recipes", value: String(recipes.length) },
            { label: "Cooked", value: "8" },
            { label: "Saved", value: String(savedRecipes.length) },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <span className="font-display font-bold text-lg text-foreground">{stat.value}</span>
              <p className="text-[10px] text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Dark Mode Toggle */}
      <div className="mb-6 bg-card rounded-xl p-4 border border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          {theme === "dark" ? (
            <Moon className="w-5 h-5 text-foreground" />
          ) : (
            <Sun className="w-5 h-5 text-warm-foreground" />
          )}
          <div>
            <span className="text-sm font-display font-semibold text-foreground">Dark Mode</span>
            <p className="text-xs text-muted-foreground">
              {theme === "dark" ? "Dark theme active" : "Light theme active"}
            </p>
          </div>
        </div>
        <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
      </div>

      {/* Saved Recipes */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display text-sm font-semibold text-foreground flex items-center gap-1.5">
            <Bookmark className="w-4 h-4 text-warm-foreground" /> Saved Recipes
          </h3>
          <span className="text-xs text-muted-foreground">{savedRecipes.length} saved</span>
        </div>
        {savedRecipes.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8 bg-card rounded-xl border border-border"
          >
            <Bookmark className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No saved recipes yet.</p>
            <p className="text-xs text-muted-foreground mt-1">Swipe right on recipes to save them!</p>
            <button
              onClick={() => navigate("/feed")}
              className="mt-3 px-4 py-1.5 rounded-full bg-warm text-white text-xs font-display font-semibold"
            >
              Discover Recipes
            </button>
          </motion.div>
        ) : (
          <div className="space-y-2 max-h-[300px] overflow-y-auto hide-scrollbar">
            <AnimatePresence>
              {savedRecipes.map((recipe, i) => (
                <motion.div
                  key={recipe.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ delay: i * 0.04 }}
                  className="w-full bg-card rounded-xl overflow-hidden border border-border flex items-center text-left hover:border-warm/30 transition-colors"
                >
                  <button
                    onClick={() => navigate(`/recipe/${recipe.id}`)}
                    className="flex items-center flex-1 min-w-0"
                  >
                    <img src={recipe.image} alt={recipe.title} className="w-16 h-16 object-cover flex-shrink-0" />
                    <div className="p-3 flex-1 min-w-0">
                      <h4 className="font-display font-semibold text-foreground text-sm truncate">{recipe.title}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">{recipe.cookTime} · {recipe.difficulty}</p>
                    </div>
                  </button>
                  <button
                    onClick={() => toggleSave(recipe.id)}
                    className="p-3 text-destructive hover:bg-destructive/10 rounded-lg transition-colors mr-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Quick actions */}
      <div className="space-y-2">
        {[
          { icon: BookOpen, label: "My Recipes", desc: "Your saved collection", path: "/" },
          { icon: Heart, label: "Favorites", desc: "Recipes you've liked", path: "/feed" },
          { icon: Import, label: "Imported", desc: "Recipes from videos", path: "/import" },
          { icon: Camera, label: "Scanned", desc: "From ingredient photos", path: "/scan" },
        ].map((item) => (
          <motion.button
            key={item.label}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(item.path)}
            className="w-full bg-card rounded-xl p-4 flex items-center gap-3 border border-border hover:border-warm/30 transition-colors text-left"
          >
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
              <item.icon className="w-5 h-5 text-foreground" />
            </div>
            <div>
              <span className="text-sm font-display font-semibold text-foreground">{item.label}</span>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
