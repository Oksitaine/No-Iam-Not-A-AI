"use client";

import { useEffect, useRef } from "react";
import { audioManager, type SoundName } from "@/lib/audio-manager";
import { useGameStore } from "@/lib/stores/game-store";

const SOUND_CONFIG: Partial<Record<
  SoundName,
  { src: string[]; loop?: boolean; volume?: number }
>> = {
  "ambiance-loop": {
    src: ["/assets/sounds/ambiance.mp3"],
    loop: true,
    volume: 0.3,
  },
  screamer: { src: ["/assets/sounds/screamer.mp3"], volume: 0.8 },
};

export function useAudio() {
  const initialized = useRef(false);
  const isMuted = useGameStore((s) => s.isMuted);
  const masterVolume = useGameStore((s) => s.masterVolume);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    for (const [name, config] of Object.entries(SOUND_CONFIG)) {
      audioManager.register(name as SoundName, config);
    }
  }, []);

  useEffect(() => {
    audioManager.setMute(isMuted);
  }, [isMuted]);

  useEffect(() => {
    audioManager.setVolume(masterVolume);
  }, [masterVolume]);

  return {
    play: (name: SoundName) => audioManager.play(name),
    stop: (name: SoundName) => audioManager.stop(name),
    fade: (name: SoundName, from: number, to: number, duration: number) =>
      audioManager.fade(name, from, to, duration),
    stopAll: () => audioManager.stopAll(),
  };
}
