import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Link2, UserPlus, Send, Image, Smile, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MascotBubble from "@/components/MascotBubble";
import { getRandomMascotMessage, recipes } from "@/lib/recipe-data";

type Step = "invite" | "cooking" | "finished";

interface Participant {
  name: string;
  avatar: string;
  currentStep: number;
  totalSteps: number;
  finished: boolean;
  dishPhoto?: string;
}

const CookTogetherPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const recipeId = searchParams.get("recipe") || "1";
  const recipe = recipes.find((r) => r.id === recipeId) || recipes[0];

  const [step, setStep] = useState<Step>("invite");
  const [inviteLink] = useState("pantrychef.app/cook/abc123");
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState("");
  const [myStep, setMyStep] = useState(1);
  const [messages, setMessages] = useState([
    { user: "Jamie", text: "Let's gooo! 🔥", time: "just now" },
    { user: "You", text: "Starting the pasta water!", time: "just now" },
  ]);

  const [participants] = useState<Participant[]>([
    { name: "You", avatar: "Y", currentStep: 3, totalSteps: recipe.steps.length, finished: false },
    { name: "Alex", avatar: "A", currentStep: 2, totalSteps: recipe.steps.length, finished: false },
    { name: "Jamie", avatar: "J", currentStep: 4, totalSteps: recipe.steps.length, finished: false },
    { name: "Chris", avatar: "C", currentStep: 1, totalSteps: recipe.steps.length, finished: false },
  ]);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sendMessage = () => {
    if (!message.trim()) return;
    setMessages([...messages, { user: "You", text: message, time: "just now" }]);
    setMessage("");
  };

  const handleFinish = () => {
    setStep("finished");
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="font-display text-lg font-bold text-foreground">Cook Together</h1>
      </div>

      <AnimatePresence mode="wait">
        {step === "invite" && (
          <motion.div
            key="invite"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="px-4 space-y-5"
          >
            <MascotBubble message={getRandomMascotMessage("cookTogether")} />

            {/* Recipe preview */}
            <div className="bg-card rounded-xl overflow-hidden border border-border flex items-center">
              <img src={recipe.image} alt={recipe.title} className="w-20 h-20 object-cover" />
              <div className="p-3">
                <h3 className="font-display font-semibold text-foreground text-sm">{recipe.title}</h3>
                <p className="text-xs text-muted-foreground">{recipe.cookTime} · {recipe.difficulty}</p>
              </div>
            </div>

            {/* Invite methods */}
            <div className="space-y-3">
              <h3 className="text-sm font-display font-semibold text-foreground">
                Invite friends to cook with you
              </h3>

              {/* Share link */}
              <div className="flex gap-2">
                <div className="flex-1 bg-card rounded-lg px-3 py-2.5 flex items-center gap-2 border border-border">
                  <Link2 className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground truncate">{inviteLink}</span>
                </div>
                <Button onClick={handleCopy} variant="outline" className="border-border text-foreground">
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </div>

              {/* Search by username */}
              <div className="relative">
                <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by username..."
                  className="pl-10 bg-card border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>

              {/* Social share buttons */}
              <div className="flex gap-2">
                {["Snapchat", "Instagram", "TikTok"].map((platform) => (
                  <button
                    key={platform}
                    className="flex-1 bg-card rounded-lg py-2.5 text-xs font-medium text-foreground border border-border hover:border-primary/30 transition-colors"
                  >
                    {platform}
                  </button>
                ))}
              </div>
            </div>

            {/* Waiting room preview */}
            <div className="bg-card-elevated rounded-xl p-4">
              <h4 className="text-xs font-display font-semibold text-foreground mb-2">
                Waiting Room (3 joined)
              </h4>
              <div className="flex -space-x-2">
                {["Y", "A", "J", "C"].map((a, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full gradient-warm flex items-center justify-center text-xs font-bold text-primary-foreground border-2 border-card-elevated"
                  >
                    {a}
                  </div>
                ))}
              </div>
            </div>

            <Button
              onClick={() => setStep("cooking")}
              className="w-full gradient-warm text-primary-foreground border-0 font-display font-semibold"
            >
              Start Cooking Session 🔥
            </Button>
          </motion.div>
        )}

        {step === "cooking" && (
          <motion.div
            key="cooking"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="px-4 space-y-4"
          >
            {/* Progress tracker */}
            <div className="bg-card rounded-xl p-4 border border-border space-y-3">
              <h3 className="text-sm font-display font-semibold text-foreground">
                Cooking: {recipe.title}
              </h3>
              {participants.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-full gradient-warm flex items-center justify-center text-xs font-bold text-primary-foreground">
                    {p.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-medium text-foreground">{p.name}</span>
                      <span className="text-[10px] text-muted-foreground">
                        Step {p.currentStep}/{p.totalSteps}
                      </span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full gradient-warm"
                        initial={{ width: 0 }}
                        animate={{
                          width: `${(p.currentStep / p.totalSteps) * 100}%`,
                        }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick reactions */}
            <div className="flex gap-2">
              {["🔥", "😍", "👨‍🍳", "💪", "😋", "👀"].map((emoji) => (
                <button
                  key={emoji}
                  className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-lg hover:scale-110 transition-transform"
                >
                  {emoji}
                </button>
              ))}
            </div>

            {/* Chat */}
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="p-3 space-y-2 max-h-40 overflow-y-auto">
                {messages.map((msg, i) => (
                  <div key={i} className="flex gap-2">
                    <span className="text-xs font-semibold text-primary">{msg.user}</span>
                    <span className="text-xs text-foreground">{msg.text}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border p-2 flex gap-2">
                <button className="p-1.5 text-muted-foreground">
                  <Image className="w-4 h-4" />
                </button>
                <button className="p-1.5 text-muted-foreground">
                  <Smile className="w-4 h-4" />
                </button>
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Message..."
                  className="flex-1 h-8 bg-muted border-0 text-sm text-foreground placeholder:text-muted-foreground"
                />
                <button onClick={sendMessage} className="p-1.5 text-primary">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Current step */}
            <div className="bg-card rounded-xl p-4 border border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">Your current step</span>
                <span className="text-xs text-primary font-medium">
                  {myStep}/{recipe.steps.length}
                </span>
              </div>
              <p className="text-sm text-foreground mb-3">
                {recipe.steps[myStep - 1]}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={myStep <= 1}
                  onClick={() => setMyStep(myStep - 1)}
                  className="border-border text-foreground"
                >
                  Prev
                </Button>
                {myStep < recipe.steps.length ? (
                  <Button
                    size="sm"
                    onClick={() => setMyStep(myStep + 1)}
                    className="gradient-warm text-primary-foreground border-0 flex-1"
                  >
                    Next Step
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    onClick={handleFinish}
                    className="gradient-cool text-secondary-foreground border-0 flex-1"
                  >
                    I'm Done! 🎉
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {step === "finished" && (
          <motion.div
            key="finished"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-4 space-y-5"
          >
            {/* Result card */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-card rounded-2xl overflow-hidden border border-border shadow-card"
            >
              <div className="gradient-warm p-4 text-center">
                <h2 className="font-display text-2xl font-bold text-primary-foreground">
                  Cooked Together 🔥
                </h2>
                <p className="text-sm text-primary-foreground/80">{recipe.title}</p>
              </div>

              <div className="p-4">
                <div className="grid grid-cols-2 gap-2">
                  {participants.map((p, i) => (
                    <div key={i} className="relative rounded-lg overflow-hidden">
                      <img
                        src={recipe.image}
                        alt={`${p.name}'s dish`}
                        className="w-full h-28 object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-background/70 backdrop-blur-sm px-2 py-1">
                        <span className="text-xs font-medium text-foreground">{p.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <div className="flex gap-2">
              <Button
                onClick={() => {}}
                className="flex-1 gradient-warm text-primary-foreground border-0 font-display"
              >
                <Share2 className="w-4 h-4 mr-2" /> Share to Social
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/")}
                className="border-border text-foreground"
              >
                Done
              </Button>
            </div>

            {/* Share platforms */}
            <div className="flex gap-2 justify-center">
              {["TikTok", "Instagram", "Snapchat"].map((p) => (
                <button
                  key={p}
                  className="text-xs px-4 py-2 rounded-full bg-card border border-border text-foreground hover:border-primary/30 transition-colors"
                >
                  {p}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CookTogetherPage;
