"use client";

import { motion } from "motion/react";
import { useAudio } from "@/hooks/use-audio";

interface DialogChoicesProps {
  onYes: () => void;
  onNo: () => void;
}

export function DialogChoices({ onYes, onNo }: DialogChoicesProps) {
  const { play } = useAudio();

  return (
    <div className="flex gap-3">
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.1 }}
        onClick={onYes}
        onMouseEnter={() => play("button-hover")}
        className="dialog-panel flex-1 !py-4 text-base md:text-lg text-foreground/70 text-glow text-glitch tracking-wide hover:text-foreground hover:border-primary/20 transition-colors cursor-pointer text-center"
      >
        Montrez-moi
      </motion.button>
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.1, delay: 0.05 }}
        onClick={onNo}
        onMouseEnter={() => play("button-hover")}
        className="dialog-panel flex-1 !py-4 text-base md:text-lg text-foreground/40 text-glitch tracking-wide hover:text-foreground/70 hover:border-primary/15 transition-colors cursor-pointer text-center"
      >
        Partez
      </motion.button>
    </div>
  );
}
