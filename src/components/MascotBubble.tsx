import { motion } from "framer-motion";
import raccoonMascot from "@/assets/raccoon-mascot.png";

interface MascotBubbleProps {
  message: string;
  show?: boolean;
}

const MascotBubble = ({ message, show = true }: MascotBubbleProps) => {
  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.9 }}
      className="flex items-end gap-2 px-4 py-2"
    >
      <img src={raccoonMascot} alt="PantryChef Raccoon" className="w-10 h-10 flex-shrink-0" />
      <div className="bg-card-elevated rounded-2xl rounded-bl-sm px-4 py-2.5 max-w-[280px]">
        <p className="text-sm text-foreground">{message}</p>
      </div>
    </motion.div>
  );
};

export default MascotBubble;
