import { create } from "zustand";

export type Scene = "door" | "exterior";
export type DialogState =
  | "hidden"
  | "greeting"
  | "choice"
  | "email"
  | "prompt"
  | "generating"
  | "results"
  | "screamer"
  | "error"
  | "farewell";
export type CharacterExpression =
  | "idle"
  | "greeting"
  | "happy"
  | "thinking"
  | "presenting"
  | "sad"
  | "goodbye";

interface GameState {
  currentScene: Scene;
  dialogState: DialogState;
  characterExpression: CharacterExpression;
  isMuted: boolean;
  masterVolume: number;

  setScene: (scene: Scene) => void;
  setDialogState: (state: DialogState) => void;
  setCharacterExpression: (expression: CharacterExpression) => void;
  toggleMute: () => void;
  setMasterVolume: (volume: number) => void;
  resetToDefault: () => void;
}

const EXPRESSION_MAP: Record<DialogState, CharacterExpression> = {
  hidden: "idle",
  greeting: "greeting",
  choice: "greeting",
  email: "greeting",
  prompt: "idle",
  generating: "thinking",
  results: "presenting",
  screamer: "sad",
  error: "sad",
  farewell: "goodbye",
};

export const useGameStore = create<GameState>((set) => ({
  currentScene: "door",
  dialogState: "hidden",
  characterExpression: "idle",
  isMuted: false,
  masterVolume: 0.7,

  setScene: (scene) => set({ currentScene: scene }),
  setDialogState: (state) =>
    set({
      dialogState: state,
      characterExpression: EXPRESSION_MAP[state],
    }),
  setCharacterExpression: (expression) =>
    set({ characterExpression: expression }),
  toggleMute: () => set((s) => ({ isMuted: !s.isMuted })),
  setMasterVolume: (volume) => set({ masterVolume: volume }),
  resetToDefault: () =>
    set({
      currentScene: "door",
      dialogState: "hidden",
      characterExpression: "idle",
    }),
}));
