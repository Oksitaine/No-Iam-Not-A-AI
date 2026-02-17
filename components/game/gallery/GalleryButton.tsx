"use client";

import { useGenerationStore } from "@/lib/stores/generation-store";
import { useAudio } from "@/hooks/use-audio";

interface GalleryButtonProps {
  onClick: () => void;
}

export function GalleryButton({ onClick }: GalleryButtonProps) {
  const gallery = useGenerationStore((s) => s.gallery);
  const { play } = useAudio();

  return (
    <button
      onClick={() => {
        play("gallery-open");
        onClick();
      }}
      onMouseEnter={() => play("button-hover")}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] h-10 px-6 bg-[hsl(155_20%_2%/0.92)] border border-primary/12 text-foreground/50 text-xs hover:text-foreground/70 hover:border-primary/25 transition-colors cursor-pointer flex items-center gap-2 text-glitch"
      style={{ filter: "url(#barrel-distort)" }}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
        <circle cx="9" cy="9" r="2" />
        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
      </svg>
      Galerie
      {gallery.length > 0 && (
        <span className="min-w-[18px] h-[18px] bg-primary/20 text-foreground/60 text-2xs flex items-center justify-center">
          {gallery.length}
        </span>
      )}
    </button>
  );
}
