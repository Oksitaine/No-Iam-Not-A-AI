"use client";

import { motion } from "motion/react";
import { useGameStore } from "@/lib/stores/game-store";
import { useAudio } from "@/hooks/use-audio";

export function PeepholeTransition() {
  const setScene = useGameStore((s) => s.setScene);
  const { play } = useAudio();

  return (
    <motion.div
      className="relative w-full h-full bg-[hsl(155_20%_1.5%)]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Exterior background visible through expanding circle */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url(/assets/backgrounds/exterior-view.png)",
          backgroundColor: "hsl(155 18% 5%)",
        }}
        initial={{ clipPath: "circle(0% at 50% 48%)" }}
        animate={{ clipPath: "circle(38% at 50% 50%)" }}
        transition={{
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        onAnimationComplete={() => {
          play("door-creak");
          setScene("exterior");
        }}
      />

      {/* Dark frame around the expanding circle */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div
          className="w-full h-full"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, transparent 20%, hsl(155 20% 1.5%) 42%)",
          }}
        />
      </div>
    </motion.div>
  );
}
