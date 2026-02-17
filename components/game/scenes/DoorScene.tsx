"use client";

import { motion } from "motion/react";
import { useGameStore } from "@/lib/stores/game-store";
import { useAudio } from "@/hooks/use-audio";

export function DoorScene() {
  const setScene = useGameStore((s) => s.setScene);
  const { play } = useAudio();

  const handlePeepholeClick = () => {
    play("ambiance-loop");
    play("peephole-open");
    setScene("exterior");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="relative w-full h-full"
      style={{ filter: "url(#barrel-distort)" }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url(/assets/backgrounds/door-interior.png)",
          backgroundColor: "hsl(155 20% 3%)",
        }}
      />

      <div className="absolute inset-0 bg-[hsl(155_20%_2%/0.15)]" />

      {/* Peephole hotspot */}
      <div className="absolute top-[50%] left-[50.2%] -translate-x-[50%] -translate-y-1/2">
        <motion.button
          onClick={handlePeepholeClick}
          className="relative w-24 h-24 md:w-56 md:h-56 rounded-full cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary/40 peephole-glow"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute inset-[-8px] rounded-full border border-primary/15"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute inset-2 rounded-full"
            animate={{ opacity: [0.05, 0.2, 0.05] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            style={{ background: "radial-gradient(circle, hsl(150 85% 45% / 0.3), transparent)" }}
          />
        </motion.button>
      </div>

      {/* Dialog-panel instruction */}
      <motion.div
        className="absolute bottom-24 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <div className="dialog-panel !py-3 !px-8">
          <div className="absolute top-0 left-0 right-0 h-[1.5px] overflow-hidden">
            <motion.div
              className="h-full w-full"
              style={{
                background: "linear-gradient(90deg, transparent 0%, hsl(150 85% 50% / 0.5) 20%, hsl(150 85% 55% / 0.8) 50%, hsl(150 85% 50% / 0.5) 80%, transparent 100%)",
                boxShadow: "0 0 8px hsl(150 85% 50% / 0.4), 0 0 16px hsl(150 85% 45% / 0.2)",
              }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <motion.p
            className="text-sm md:text-base text-foreground/70 text-glow text-glitch tracking-[0.15em] uppercase text-center whitespace-nowrap"
            animate={{ opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Quelqu'un frappe a la porte
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
}
