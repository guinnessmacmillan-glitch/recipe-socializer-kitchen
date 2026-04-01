import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Link2, Upload, Share, Check, Edit3, Loader2, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MascotBubble from "@/components/MascotBubble";
import { getRandomMascotMessage } from "@/lib/recipe-data";

type Step = "input" | "processing" | "confirm" | "done";

const ImportPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("input");
  const [url, setUrl] = useState("");
  const [editMode, setEditMode] = useState(false);

  const [extracted, setExtracted] = useState({
    title: "Creamy Garlic Shrimp Pasta",
    cookTime: "25 min",
    difficulty: "Medium" as const,
    ingredients: [
      { name: "Shrimp", amount: "1 lb", confirmed: true },
      { name: "Pasta", amount: "400g", confirmed: true },
      { name: "Garlic", amount: "4 cloves", confirmed: true },
      { name: "Heavy cream", amount: "1 cup", confirmed: true },
      { name: "Parmesan", amount: "1/2 cup", confirmed: true },
      { name: "Butter", amount: "2 tbsp", confirmed: false },
    ],
    steps: [
      "Cook pasta al dente",
      "Sauté shrimp with garlic in butter",
      "Add heavy cream and simmer",
      "Toss pasta with sauce",
      "Top with parmesan and serve",
    ],
  });

  const handleImport = () => {
    if (!url.trim()) return;
    setStep("processing");
    setTimeout(() => setStep("confirm"), 2500);
  };

  const handleConfirm = () => {
    setStep("done");
  };

  const getPlatformFromUrl = (url: string) => {
    if (url.includes("tiktok")) return "TikTok";
    if (url.includes("instagram")) return "Instagram";
    if (url.includes("youtube") || url.includes("youtu.be")) return "YouTube";
    return "Video";
  };

  const getVideoEmbedUrl = (url: string) => {
    // YouTube
    const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
    // For demo/mock URLs, return null
    return null;
  };

  const embedUrl = getVideoEmbedUrl(url);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="font-display text-lg font-bold text-foreground">Import Recipe</h1>
      </div>

      <AnimatePresence mode="wait">
        {step === "input" && (
          <motion.div
            key="input"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="px-4 space-y-6"
          >
            <MascotBubble message={getRandomMascotMessage("import")} />

            <div className="space-y-3">
              <label className="text-sm font-display font-semibold text-foreground flex items-center gap-2">
                <Link2 className="w-4 h-4 text-primary" /> Paste video link
              </label>
              <Input
                placeholder="https://tiktok.com/... or youtube.com/..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="bg-card border-border text-foreground placeholder:text-muted-foreground"
              />
              <div className="flex gap-2">
                {["TikTok", "Instagram", "YouTube"].map((p) => (
                  <button
                    key={p}
                    onClick={() => {
                      if (p === "YouTube") {
                        setUrl("https://youtube.com/watch?v=dQw4w9WgXcQ");
                      } else {
                        setUrl(`https://${p.toLowerCase()}.com/example`);
                      }
                    }}
                    className="text-xs px-3 py-1.5 rounded-full bg-muted text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button className="bg-card rounded-xl p-4 flex flex-col items-center gap-2 border border-border hover:border-primary/50 transition-colors">
                <Upload className="w-6 h-6 text-primary" />
                <span className="text-xs text-foreground font-medium">Upload Video</span>
              </button>
              <button className="bg-card rounded-xl p-4 flex flex-col items-center gap-2 border border-border hover:border-primary/50 transition-colors">
                <Share className="w-6 h-6 text-primary" />
                <span className="text-xs text-foreground font-medium">Share to App</span>
              </button>
            </div>

            <Button
              onClick={handleImport}
              disabled={!url.trim()}
              className="w-full bg-primary text-primary-foreground border-0 font-display font-semibold"
            >
              Import Recipe
            </Button>
          </motion.div>
        )}

        {step === "processing" && (
          <motion.div
            key="processing"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="px-4 pt-20 flex flex-col items-center gap-6"
          >
            <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center animate-pulse-glow">
              <Loader2 className="w-8 h-8 text-primary-foreground animate-spin" />
            </div>
            <div className="text-center space-y-2">
              <h2 className="font-display text-xl font-bold text-foreground">
                Analyzing {getPlatformFromUrl(url)} Video
              </h2>
              <p className="text-sm text-muted-foreground">
                Extracting ingredients and cooking steps...
              </p>
            </div>
            <div className="w-full max-w-xs space-y-2 mt-4">
              {["Detecting ingredients...", "Analyzing cooking steps...", "Estimating cook time..."].map(
                (task, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.8 }}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.8 + 0.6 }}
                    >
                      <Check className="w-4 h-4 text-success" />
                    </motion.div>
                    {task}
                  </motion.div>
                )
              )}
            </div>
          </motion.div>
        )}

        {step === "confirm" && (
          <motion.div
            key="confirm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="px-4 space-y-4"
          >
            {/* Embedded video at top */}
            <div className="rounded-xl overflow-hidden border border-border bg-foreground">
              {embedUrl ? (
                <iframe
                  src={embedUrl}
                  className="w-full aspect-video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Recipe video"
                />
              ) : (
                <div className="w-full aspect-video bg-foreground/5 flex flex-col items-center justify-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Play className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {getPlatformFromUrl(url)} video preview
                  </span>
                  <span className="text-[10px] text-muted-foreground/60 truncate max-w-[80%]">{url}</span>
                </div>
              )}
            </div>

            <div className="bg-card rounded-xl p-4 flex items-center gap-3 border border-border">
              <span className="text-2xl">🤔</span>
              <div>
                <p className="text-sm font-display font-semibold text-foreground">
                  Did we get this right?
                </p>
                <p className="text-xs text-muted-foreground">
                  Review and edit before saving
                </p>
              </div>
              <button
                onClick={() => setEditMode(!editMode)}
                className="ml-auto p-2 rounded-lg bg-muted"
              >
                <Edit3 className="w-4 h-4 text-foreground" />
              </button>
            </div>

            {/* Extracted recipe details */}
            <div className="bg-card rounded-xl overflow-hidden border border-border">
              <div className="p-4 space-y-3">
                <input
                  value={extracted.title}
                  onChange={(e) => setExtracted({ ...extracted, title: e.target.value })}
                  disabled={!editMode}
                  className="font-display text-lg font-bold text-foreground bg-transparent w-full outline-none disabled:opacity-100"
                />
                <div className="flex gap-3 text-xs text-muted-foreground">
                  <span>⏱ {extracted.cookTime}</span>
                  <span>👨‍🍳 {extracted.difficulty}</span>
                </div>

                {/* Ingredients */}
                <div>
                  <h4 className="text-xs font-display font-semibold text-foreground mb-1.5">
                    Ingredients
                  </h4>
                  {extracted.ingredients.map((ing, i) => (
                    <div key={i} className="flex items-center gap-2 py-1">
                      <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                          ing.confirmed
                            ? "bg-success/20 text-success"
                            : "bg-warning/20 text-warning"
                        }`}
                      >
                        {ing.confirmed ? "✓" : "?"}
                      </div>
                      <span className="text-sm text-foreground flex-1">{ing.name}</span>
                      <span className="text-xs text-muted-foreground">{ing.amount}</span>
                    </div>
                  ))}
                  {editMode && (
                    <button className="text-xs text-primary mt-1">+ Add ingredient</button>
                  )}
                </div>

                {/* Steps */}
                <div>
                  <h4 className="text-xs font-display font-semibold text-foreground mb-1.5">
                    Steps
                  </h4>
                  {extracted.steps.map((s, i) => (
                    <div key={i} className="flex gap-2 py-1">
                      <span className="w-5 h-5 rounded-full bg-secondary text-foreground text-[10px] flex items-center justify-center flex-shrink-0 font-bold">
                        {i + 1}
                      </span>
                      <span className="text-sm text-foreground/80">{s}</span>
                    </div>
                  ))}
                  {editMode && (
                    <button className="text-xs text-primary mt-1">+ Add step</button>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setStep("input")}
                className="flex-1 border-border text-foreground"
              >
                Re-import
              </Button>
              <Button
                onClick={handleConfirm}
                className="flex-1 bg-primary text-primary-foreground border-0 font-display font-semibold"
              >
                Looks Good! Save
              </Button>
            </div>
          </motion.div>
        )}

        {step === "done" && (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-4 pt-20 flex flex-col items-center gap-6 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="w-20 h-20 rounded-full bg-success flex items-center justify-center"
            >
              <Check className="w-10 h-10 text-primary-foreground" />
            </motion.div>
            <h2 className="font-display text-2xl font-bold text-foreground">Recipe Saved! 🎉</h2>
            <p className="text-sm text-muted-foreground max-w-xs">
              Your recipe has been added to your collection and is now visible in the feed.
            </p>
            <div className="flex gap-3 w-full">
              <Button
                variant="outline"
                onClick={() => { setStep("input"); setUrl(""); }}
                className="flex-1 border-border text-foreground"
              >
                Import Another
              </Button>
              <Button
                onClick={() => navigate("/")}
                className="flex-1 bg-primary text-primary-foreground border-0"
              >
                View Feed
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImportPage;
