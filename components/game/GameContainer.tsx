"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence } from "motion/react";
import { useGameStore } from "@/lib/stores/game-store";
import { useAudio } from "@/hooks/use-audio";
import { DoorScene } from "./scenes/DoorScene";
import { ScanlineOverlay } from "./effects/ScanlineOverlay";
import { VignetteOverlay } from "./effects/VignetteOverlay";
import { GalleryButton } from "./gallery/GalleryButton";

const ExteriorScene = dynamic(
  () => import("./scenes/ExteriorScene").then((m) => m.ExteriorScene),
  { ssr: false }
);

const GallerySheet = dynamic(
  () => import("./gallery/GallerySheet").then((m) => m.GallerySheet),
  { ssr: false }
);

export function GameContainer() {
  const currentScene = useGameStore((s) => s.currentScene);
  const resetToDefault = useGameStore((s) => s.resetToDefault);
  const setDialogState = useGameStore((s) => s.setDialogState);
  const { stop } = useAudio();
  const [galleryOpen, setGalleryOpen] = useState(false);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;

      if (galleryOpen) {
        setGalleryOpen(false);
        return;
      }

      if (currentScene === "exterior") {
        stop("ambiance-loop");
        setDialogState("hidden");
        resetToDefault();
      }
    },
    [currentScene, galleryOpen, resetToDefault, setDialogState, stop]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="fixed inset-0 bg-[hsl(155_20%_1.5%)] overflow-hidden">
      {/* SVG filter — barrel distortion shared by all game components */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="barrel-distort" x="-3%" y="-3%" width="106%" height="106%">
            <feTurbulence
              type="turbulence"
              baseFrequency="0.009 0.007"
              numOctaves="2"
              seed="7"
              result="warp"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="warp"
              scale="3"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <AnimatePresence mode="wait">
        {currentScene === "door" && <DoorScene key="door" />}
        {currentScene === "exterior" && <ExteriorScene key="exterior" />}
      </AnimatePresence>

      <ScanlineOverlay />
      <VignetteOverlay />

      <GalleryButton onClick={() => setGalleryOpen(true)} />
      <GallerySheet open={galleryOpen} onOpenChange={setGalleryOpen} />

      {currentScene === "exterior" && (
        <div className="fixed top-4 left-4 z-[100] text-2xs text-muted-foreground/30 tracking-wider text-glitch">
          ESC pour revenir
        </div>
      )}
    </div>
  );
}
