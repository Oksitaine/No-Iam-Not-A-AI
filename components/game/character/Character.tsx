"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useGameStore, type CharacterExpression } from "@/lib/stores/game-store";

const EXPRESSION_SPRITES: Record<CharacterExpression, string> = {
  idle: "/assets/characters/visitor-idle.webp",
  greeting: "/assets/characters/visitor-greeting.webp",
  happy: "/assets/characters/visitor-happy.webp",
  thinking: "/assets/characters/visitor-thinking.webp",
  presenting: "/assets/characters/visitor-presenting.webp",
  sad: "/assets/characters/visitor-sad.webp",
  goodbye: "/assets/characters/visitor-goodbye.webp",
};

export function Character() {
  const expression = useGameStore((s) => s.characterExpression);

  // Preload all sprites
  useEffect(() => {
    Object.values(EXPRESSION_SPRITES).forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <div className="relative w-full h-full flex items-end justify-center">
      <AnimatePresence mode="wait">
        <motion.img
          key={expression}
          src={EXPRESSION_SPRITES[expression]}
          alt="Visitor"
          className="h-[70%] w-auto object-contain drop-shadow-[0_0_20px_hsl(150_85%_38%/0.15)]"
          initial={{ scale: 0.98, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.98, opacity: 0.8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          draggable={false}
        />
      </AnimatePresence>
    </div>
  );
}
