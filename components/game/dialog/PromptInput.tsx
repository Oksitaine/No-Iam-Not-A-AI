"use client";

import { useState } from "react";
import { useGameStore } from "@/lib/stores/game-store";
import { useGenerationStore } from "@/lib/stores/generation-store";
import { useAudio } from "@/hooks/use-audio";

export function PromptInput() {
  const [localPrompt, setLocalPrompt] = useState("");
  const setDialogState = useGameStore((s) => s.setDialogState);
  const { setPrompt, startGeneration } = useGenerationStore();
  const { play, stop } = useAudio();

  const handleGenerate = async () => {
    if (!localPrompt.trim()) return;

    setPrompt(localPrompt);
    setDialogState("generating");
    play("generation-start");

    setTimeout(() => play("generation-loop"), 500);

    try {
      await startGeneration();
      stop("generation-loop");
      play("generation-complete");
      setDialogState("results");
    } catch {
      stop("generation-loop");
      play("error-sound");
      setDialogState("error");
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="dialog-panel !p-0">
        <textarea
          value={localPrompt}
          onChange={(e) => setLocalPrompt(e.target.value)}
          placeholder="Qu'est-ce que vous voulez voir..."
          className="relative z-10 w-full min-h-[80px] bg-transparent px-7 py-5 text-base md:text-lg text-foreground/90 text-glow placeholder:text-foreground/40 resize-none focus:outline-none tracking-wide leading-relaxed"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleGenerate();
            }
          }}
          autoFocus
        />
      </div>
      <button
        onClick={handleGenerate}
        disabled={!localPrompt.trim()}
        className="dialog-panel !py-4 text-base md:text-lg text-foreground/70 text-glow tracking-wide hover:text-foreground hover:border-primary/20 transition-all duration-200 cursor-pointer disabled:opacity-25 disabled:cursor-not-allowed text-center"
      >
        Montrez-moi
      </button>
    </div>
  );
}
