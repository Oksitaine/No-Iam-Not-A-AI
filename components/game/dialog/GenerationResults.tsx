"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { useGameStore } from "@/lib/stores/game-store";
import { useGenerationStore } from "@/lib/stores/generation-store";
import { useAudio } from "@/hooks/use-audio";

export function GenerationResults() {
  const setDialogState = useGameStore((s) => s.setDialogState);
  const { currentResults, addToGallery, clearResults } = useGenerationStore();
  const { play } = useAudio();
  const [saved, setSaved] = useState(false);

  const handleSaveAll = () => {
    if (saved) return;
    currentResults.forEach((img) => addToGallery(img));
    setSaved(true);
    play("button-click");
  };

  const handleGenerateMore = () => {
    clearResults();
    play("screamer");
    setDialogState("screamer");
  };

  return (
    <motion.div
      className="space-y-3"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
      }}
    >
      {/* Image grid */}
      <div className="grid grid-cols-2 gap-2">
        {currentResults.map((img) => (
          <motion.div
            key={img.id}
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { opacity: 1, scale: 1 },
            }}
            className="relative aspect-square rounded-sm overflow-hidden border border-primary/10 group"
          >
            <Image
              src={img.url}
              alt={img.prompt}
              fill
              sizes="(max-width: 768px) 50vw, 250px"
              className="object-cover"
              draggable={false}
              unoptimized
            />
            <button
              onClick={() => {
                addToGallery(img);
                play("button-click");
              }}
              className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
            >
              <span className="text-2xs text-primary font-medium bg-background/80 px-2 py-1 rounded-sm">
                Sauvegarder
              </span>
            </button>
          </motion.div>
        ))}
      </div>

      {/* Actions — bigger CTAs */}
      <div className="flex gap-3">
        <button
          onClick={handleSaveAll}
          disabled={saved}
          className="dialog-panel flex-1 !py-4 text-base md:text-lg text-foreground/70 text-glow text-glitch tracking-wide hover:text-foreground hover:border-primary/20 transition-colors cursor-pointer text-center disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {saved ? "Garde" : "Garder"}
        </button>
        <button
          onClick={handleGenerateMore}
          className="dialog-panel flex-1 !py-4 text-base md:text-lg text-foreground/40 text-glitch tracking-wide hover:text-foreground/70 hover:border-primary/15 transition-colors cursor-pointer text-center"
        >
          Encore
        </button>
      </div>
    </motion.div>
  );
}
