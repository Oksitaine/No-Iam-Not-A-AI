"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "motion/react";
import { useGameStore } from "@/lib/stores/game-store";
import { useAudio } from "@/hooks/use-audio";
import { DialogBox } from "../dialog/DialogBox";

function getCharacterImage(state: string, scared: boolean): string {
  if (state === "screamer" || scared) return "/assets/characters/choquer.png";
  switch (state) {
    case "prompt":
    case "generating":
      return "/assets/characters/calme.png";
    default:
      return "/assets/characters/smiling.png";
  }
}

export function ExteriorScene() {
  const setDialogState = useGameStore((s) => s.setDialogState);
  const dialogState = useGameStore((s) => s.dialogState);
  const { play } = useAudio();
  const [showCharacter, setShowCharacter] = useState(false);
  const hasSeenScreamer = useRef(false);

  if (dialogState === "screamer") {
    hasSeenScreamer.current = true;
  }

  const characterImage = getCharacterImage(dialogState, hasSeenScreamer.current);
  const displayImage = showCharacter
    ? characterImage
    : "/assets/backgrounds/exterior-view.png";

  // Preload character images that appear later in the flow
  useEffect(() => {
    const srcs = ["/assets/characters/calme.png", "/assets/characters/choquer.png"];
    srcs.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    const footstepsTimer = setTimeout(() => {
      play("footsteps-approach");
    }, 300);

    // Phase 2 (2s): swap to character
    const characterTimer = setTimeout(() => {
      setShowCharacter(true);
    }, 2000);

    // Phase 3 (2.2s): dialog greeting
    const dialogTimer = setTimeout(() => {
      play("dialog-appear");
      setDialogState("greeting");
    }, 2200);

    return () => {
      clearTimeout(footstepsTimer);
      clearTimeout(characterTimer);
      clearTimeout(dialogTimer);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0 }}
      className="relative w-full h-full overflow-hidden"
      style={{ filter: "url(#barrel-distort)" }}
    >
      {/* Scene image — instant swap, no transition */}
      <div
        className="absolute inset-[-3%] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${displayImage})`,
          backgroundColor: "hsl(155 18% 3%)",
        }}
      />

      {/* Peephole lens vignette — center clear, edges dark */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 60% at 50% 45%, transparent 30%, hsl(155 20% 1.5% / 0.3) 55%, hsl(155 20% 1.5% / 0.7) 75%, hsl(155 20% 1% / 0.95) 100%)",
        }}
      />

      {/* Subtle green tint */}
      <div className="absolute inset-0 bg-[hsl(150_40%_8%/0.08)] pointer-events-none" />

      {/* Dialog */}
      <div className="absolute inset-0 z-[20] pointer-events-none">
        <DialogBox />
      </div>
    </motion.div>
  );
}
