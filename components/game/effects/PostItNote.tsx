"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface PostItNoteProps {
  text: string;
  className?: string;
}

export function PostItNote({ text, className }: PostItNoteProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotate: -4 }}
      animate={{ opacity: 1, y: 0, rotate: -2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn(
        "absolute px-4 py-3 max-w-[200px]",
        "bg-[hsl(45_60%_70%/0.9)] text-[hsl(30_20%_15%)]",
        "text-xs leading-relaxed font-medium",
        "shadow-md rotate-[-2deg]",
        "before:absolute before:inset-0 before:bg-[linear-gradient(135deg,transparent_40%,hsl(45_40%_60%/0.3)_100%)]",
        className
      )}
    >
      <span className="relative z-10">{text}</span>
      {/* Tape effect */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-4 bg-[hsl(45_20%_85%/0.6)] opacity-70" />
    </motion.div>
  );
}
