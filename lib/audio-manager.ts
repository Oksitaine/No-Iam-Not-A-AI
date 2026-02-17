import { Howl, Howler } from "howler";

type SoundName =
  | "ambiance-loop"
  | "door-creak"
  | "peephole-open"
  | "footsteps-approach"
  | "dialog-appear"
  | "keystroke"
  | "button-hover"
  | "button-click"
  | "generation-start"
  | "generation-loop"
  | "generation-complete"
  | "error-sound"
  | "gallery-open"
  | "piano-note"
  | "screamer";

interface SoundConfig {
  src: string[];
  loop?: boolean;
  volume?: number;
}

class AudioManager {
  private static instance: AudioManager;
  private sounds: Map<string, Howl> = new Map();
  private isMuted = false;
  private masterVolume = 0.7;

  static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  register(name: SoundName, config: SoundConfig): void {
    if (this.sounds.has(name)) return;
    const howl = new Howl({
      src: config.src,
      loop: config.loop ?? false,
      volume: (config.volume ?? 1) * this.masterVolume,
      preload: true,
    });
    this.sounds.set(name, howl);
  }

  play(name: SoundName): number | undefined {
    if (this.isMuted) return;
    const sound = this.sounds.get(name);
    if (!sound) return;
    if (sound.playing()) return;
    return sound.play();
  }

  stop(name: SoundName): void {
    const sound = this.sounds.get(name);
    if (sound) sound.stop();
  }

  fade(name: SoundName, from: number, to: number, duration: number): void {
    const sound = this.sounds.get(name);
    if (sound) sound.fade(from, to, duration);
  }

  setMute(muted: boolean): void {
    this.isMuted = muted;
    Howler.mute(muted);
  }

  setVolume(volume: number): void {
    this.masterVolume = volume;
    Howler.volume(volume);
  }

  stopAll(): void {
    Howler.stop();
  }
}

export const audioManager = AudioManager.getInstance();
export type { SoundName };
