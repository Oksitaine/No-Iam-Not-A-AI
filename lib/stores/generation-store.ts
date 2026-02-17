import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  timestamp: number;
}

interface GenerationState {
  prompt: string;
  isGenerating: boolean;
  progress: number;
  currentResults: GeneratedImage[];
  gallery: GeneratedImage[];

  setPrompt: (prompt: string) => void;
  startGeneration: () => Promise<void>;
  addToGallery: (image: GeneratedImage) => void;
  removeFromGallery: (id: string) => void;
  clearResults: () => void;
}

export const useGenerationStore = create<GenerationState>()(
  persist(
    (set, get) => ({
      prompt: "",
      isGenerating: false,
      progress: 0,
      currentResults: [],
      gallery: [],

      setPrompt: (prompt) => set({ prompt }),

      startGeneration: async () => {
        const { prompt } = get();
        if (!prompt.trim()) return;

        set({ isGenerating: true, progress: 0, currentResults: [] });

        // Simulate progress
        const progressInterval = setInterval(() => {
          set((s) => {
            const next = Math.min(s.progress + Math.random() * 15 + 5, 95);
            return { progress: next };
          });
        }, 200);

        try {
          const res = await fetch("/api/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt }),
          });

          clearInterval(progressInterval);

          if (!res.ok) throw new Error("Generation failed");

          const data = await res.json();
          const results: GeneratedImage[] = data.images.map(
            (url: string, i: number) => ({
              id: `${Date.now()}-${i}`,
              url,
              prompt,
              timestamp: Date.now(),
            })
          );

          set({ isGenerating: false, progress: 100, currentResults: results });
        } catch {
          clearInterval(progressInterval);
          set({ isGenerating: false, progress: 0 });
          throw new Error("Generation failed");
        }
      },

      addToGallery: (image) =>
        set((s) => ({ gallery: [image, ...s.gallery] })),

      removeFromGallery: (id) =>
        set((s) => ({ gallery: s.gallery.filter((img) => img.id !== id) })),

      clearResults: () => set({ currentResults: [], prompt: "" }),
    }),
    {
      name: "nianh-gallery",
      partialize: (state) => ({ gallery: state.gallery }),
    }
  )
);
