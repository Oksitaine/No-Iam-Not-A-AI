"use client";

import { useState } from "react";
import { useGameStore } from "@/lib/stores/game-store";
import { useAudio } from "@/hooks/use-audio";

export function EmailConnect() {
  const [email, setEmail] = useState("");
  const setDialogState = useGameStore((s) => s.setDialogState);
  const { play } = useAudio();

  const handleSubmit = () => {
    if (!email.trim()) return;
    play("button-click");
    setDialogState("prompt");
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="dialog-panel !p-0">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="votre@email.com"
          className="relative z-10 w-full bg-transparent px-7 py-5 text-base md:text-lg text-foreground/90 text-glow placeholder:text-foreground/40 focus:outline-none tracking-wide"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSubmit();
            }
          }}
          autoFocus
        />
      </div>
      <button
        onClick={handleSubmit}
        disabled={!email.trim()}
        className="dialog-panel !py-4 text-base md:text-lg text-foreground/70 text-glow tracking-wide hover:text-foreground hover:border-primary/20 transition-all duration-200 cursor-pointer disabled:opacity-25 disabled:cursor-not-allowed text-center"
      >
        Continuer
      </button>
    </div>
  );
}
