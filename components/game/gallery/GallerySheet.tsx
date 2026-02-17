"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { useGenerationStore, type GeneratedImage } from "@/lib/stores/generation-store";
import { useAudio } from "@/hooks/use-audio";

interface GallerySheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GallerySheet({ open, onOpenChange }: GallerySheetProps) {
  const { play } = useAudio();
  const gallery = useGenerationStore((s) => s.gallery);

  const handleDownloadAll = async () => {
    play("button-click");
    for (const img of gallery) {
      const link = document.createElement("a");
      link.href = img.url;
      link.download = `nianh-${img.id}.png`;
      link.click();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[200] bg-[hsl(155_20%_2%/0.90)] flex flex-col"
          style={{ filter: "url(#barrel-distort)" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-8 pt-8 pb-4">
            <div>
              <h2 className="text-xl text-glow text-glitch text-foreground/90 tracking-wide">
                Galerie
              </h2>
              <p className="text-xs text-muted-foreground/40 mt-1 tracking-wide">
                Vos images generees
              </p>
            </div>
            <div className="flex items-center gap-3">
              {gallery.length > 0 && (
                <button
                  onClick={handleDownloadAll}
                  onMouseEnter={() => play("button-hover")}
                  className="dialog-panel !py-2 !px-4 text-sm text-foreground/50 hover:text-foreground/80 transition-colors cursor-pointer tracking-wide"
                >
                  Tout telecharger
                </button>
              )}
              <button
                onClick={() => {
                  play("button-click");
                  onOpenChange(false);
                }}
                onMouseEnter={() => play("button-hover")}
                className="dialog-panel !py-2 !px-4 text-sm text-foreground/50 hover:text-foreground/80 transition-colors cursor-pointer tracking-wide"
              >
                Fermer
              </button>
            </div>
          </div>

          {/* Separator */}
          <div className="mx-8 h-[1px] bg-primary/10" />

          {/* Grid */}
          <div className="flex-1 overflow-auto px-8 py-6">
            <GalleryGrid />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function GalleryGrid() {
  const gallery = useGenerationStore((s) => s.gallery);
  const removeFromGallery = useGenerationStore((s) => s.removeFromGallery);

  if (gallery.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-foreground/60">
        <p className="text-lg text-glow text-glitch">Aucune image sauvegardee</p>
        <p className="text-sm mt-2 text-foreground/35">
          Generez des images et sauvegardez-les ici
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {gallery.map((img: GeneratedImage) => (
        <div
          key={img.id}
          className="relative group overflow-hidden border border-primary/8 hover:border-primary/25 transition-colors"
          style={{
            background: "hsl(155 20% 3% / 0.8)",
          }}
        >
          <div className="aspect-square relative">
            <Image
              src={img.url}
              alt={img.prompt}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover"
              draggable={false}
              unoptimized
            />
          </div>
          {/* Grain overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              backgroundSize: "200px 200px",
              mixBlendMode: "overlay",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(155_20%_2%/0.85)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <p className="text-xs text-foreground/60 text-glitch line-clamp-2">
                {img.prompt}
              </p>
              <div className="flex items-center justify-between mt-2">
                <a
                  href={img.url}
                  download={`nianh-${img.id}.png`}
                  className="text-2xs text-foreground/40 hover:text-foreground/70 cursor-pointer"
                >
                  Telecharger
                </a>
                <button
                  onClick={() => removeFromGallery(img.id)}
                  className="text-2xs text-destructive/50 hover:text-destructive/80 cursor-pointer"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
