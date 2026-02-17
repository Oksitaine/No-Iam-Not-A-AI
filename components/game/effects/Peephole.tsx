"use client";

import { cn } from "@/lib/utils";

interface PeepholeProps {
  radius?: string;
  centerX?: string;
  centerY?: string;
  className?: string;
  children: React.ReactNode;
  showFrame?: boolean;
}

export function Peephole({
  radius = "38%",
  centerX = "50%",
  centerY = "50%",
  className,
  children,
  showFrame = true,
}: PeepholeProps) {
  return (
    <div
      className={cn("relative w-full h-full overflow-hidden", className)}
      style={{
        clipPath: `circle(${radius} at ${centerX} ${centerY})`,
      }}
    >
      {children}
      {showFrame && (
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, transparent 30%, hsl(155 20% 2.5% / 0.6) 45%, hsl(155 20% 2.5% / 0.95) 55%)",
          }}
        />
      )}
      {/* Lens distortion edge */}
      <div
        className="absolute inset-0 pointer-events-none z-10 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, transparent 60%, hsl(150 85% 38% / 0.05) 80%, hsl(150 85% 38% / 0.1) 100%)",
        }}
      />
    </div>
  );
}
