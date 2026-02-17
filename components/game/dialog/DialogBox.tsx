"use client";

import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useGameStore } from "@/lib/stores/game-store";
import { useGenerationStore } from "@/lib/stores/generation-store";
import { useIsMobile } from "@/hooks/use-mobile";
import { DialogChoices } from "./DialogChoices";
import { EmailConnect } from "./EmailConnect";
import { PromptInput } from "./PromptInput";
import { GenerationResults } from "./GenerationResults";
import { useTypewriter } from "@/hooks/use-typewriter";
import { useAudio } from "@/hooks/use-audio";
import { cn } from "@/lib/utils";

const DIALOG_TEXTS: Record<string, string> = {
  greeting:
    "Ouvrez... s'il vous plait. Je ne suis pas dangereux. Je peux vous montrer des choses... des images. Laissez-moi entrer et je vous les genere.",
  farewell:
    "Vous ne pouvez pas me laisser dehors... Je reviendrai. La porte finira par s'ouvrir.",
  error:
    "Quelque chose... ne va pas. Ce n'est pas normal. Essayez encore. Il faut que ca marche.",
  generating: "Attendez... je les fabrique pour vous. Vous allez voir...",
  results: "Voila... ca vous plait ? Laissez-moi entrer... je ne suis pas mechant.",
  prompt: "Dites-moi ce que vous voulez voir. N'importe quoi. Je peux tout creer.",
  "prompt-after-screamer": "C'est bon... c'est rien. Je peux encore generer. Allez, dites-moi quoi.",
  email: "Donnez-moi juste votre email... pour que je sache a qui montrer tout ca.",
  screamer: "QU'EST-CE QUE C'EST... NON. A L'AIDE. Qu'est-ce qui se passe...",
};

const STATES_WITH_ACTIONS = ["choice", "email", "prompt", "generating", "results", "screamer", "error"];

export function DialogBox() {
  const dialogState = useGameStore((s) => s.dialogState);
  const setDialogState = useGameStore((s) => s.setDialogState);
  const resetToDefault = useGameStore((s) => s.resetToDefault);
  const isMobile = useIsMobile();
  const { play } = useAudio();

  const lastSpokenRef = useRef("");
  const hasSeenScreamer = useRef(false);

  if (dialogState === "screamer") {
    hasSeenScreamer.current = true;
  }

  const textKey = dialogState === "prompt" && hasSeenScreamer.current ? "prompt-after-screamer" : dialogState;
  const currentText = DIALOG_TEXTS[textKey] ?? "";
  if (currentText) {
    lastSpokenRef.current = currentText;
  }

  const { displayedText, isTyping, skip } = useTypewriter({
    text: currentText,
    speed: 30,
    onComplete: () => {
      if (dialogState === "greeting") {
        setDialogState("choice");
      }
      if (dialogState === "farewell") {
        setTimeout(() => resetToDefault(), 2500);
      }
    },
  });

  if (dialogState === "hidden") return null;

  const shownText = currentText ? displayedText : lastSpokenRef.current;
  const showCursor = currentText ? isTyping : false;
  const hasActions = STATES_WITH_ACTIONS.includes(dialogState);

  return (
    <motion.div
      initial={{ x: 60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "pointer-events-auto absolute",
        isMobile
          ? "bottom-4 left-3 right-3"
          : "right-36 top-1/2 -translate-y-1/2 w-[500px]"
      )}
    >
      {/* Wrapper with peephole perspective + barrel distortion */}
      <div
        className="relative"
        style={{
          transform: "perspective(500px) rotateY(4deg) rotateX(1deg)",
          transformOrigin: "left center",
          filter: "url(#barrel-distort)",
        }}
      >
        {/* Text panel */}
        {shownText && (
          <div
            className="dialog-panel relative cursor-pointer"
            onClick={showCursor ? skip : undefined}
          >
            <p className="relative z-10 text-xl md:text-2xl leading-relaxed tracking-wide text-glow text-glitch text-foreground/90"
            >
              {shownText}
              {showCursor && <span className="terminal-cursor" />}
            </p>
          </div>
        )}

        {/* Horizontal interference line */}
        {hasActions && shownText && (
          <div className="relative my-3 h-[2px] overflow-hidden">
            <motion.div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, hsl(150 85% 50% / 0.4) 15%, hsl(150 85% 55% / 0.7) 50%, hsl(150 85% 50% / 0.4) 85%, transparent 100%)",
                boxShadow:
                  "0 0 8px hsl(150 85% 50% / 0.5), 0 0 20px hsl(150 85% 45% / 0.25)",
              }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        )}

        {/* Action area */}
        <AnimatePresence mode="wait">
          {dialogState === "choice" && (
            <motion.div
              key="choice"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <DialogChoices
                onYes={() => {
                  play("button-click");
                  setDialogState("email");
                }}
                onNo={() => {
                  play("button-click");
                  setDialogState("farewell");
                }}
              />
            </motion.div>
          )}

          {dialogState === "email" && (
            <motion.div
              key="email"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <EmailConnect />
            </motion.div>
          )}

          {dialogState === "prompt" && (
            <motion.div
              key="prompt"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <PromptInput />
            </motion.div>
          )}

          {dialogState === "generating" && (
            <motion.div
              key="generating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <GeneratingState />
            </motion.div>
          )}

          {dialogState === "results" && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <GenerationResults />
            </motion.div>
          )}

          {dialogState === "screamer" && (
            <ScreamerState />
          )}

          {dialogState === "error" && (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    play("button-click");
                    setDialogState("prompt");
                  }}
                  className="dialog-panel flex-1 text-base text-foreground/70 text-glow text-glitch hover:text-foreground/90 transition-colors cursor-pointer tracking-wide"
                >
                  Ressayer
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function GeneratingState() {
  const progress = useGenerationStore((s) => s.progress);

  return (
    <div className="dialog-panel space-y-3">
      <div className="h-[2px] w-full bg-[hsl(155_20%_5%)] overflow-hidden">
        <motion.div
          className="h-full bg-primary/60"
          style={{ boxShadow: "0 0 12px hsl(150 85% 38% / 0.5)" }}
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <p className="text-sm text-foreground/40 text-center tabular-nums tracking-[0.2em] text-glow text-glitch">
        {Math.round(progress)}%
      </p>
    </div>
  );
}

function ScreamerState() {
  const setDialogState = useGameStore((s) => s.setDialogState);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDialogState("prompt");
    }, 2000);
    return () => clearTimeout(timer);
  }, [setDialogState]);

  return null;
}
