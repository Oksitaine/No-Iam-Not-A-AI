"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { audioManager } from "@/lib/audio-manager";

interface UseTypewriterOptions {
  text: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
}

export function useTypewriter({
  text,
  speed = 40,
  delay = 0,
  onComplete,
}: UseTypewriterOptions) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const indexRef = useRef(0);
  const charCountRef = useRef(0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    setDisplayedText("");
    indexRef.current = 0;
    charCountRef.current = 0;
    setIsTyping(true);

    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (indexRef.current >= text.length) {
          clearInterval(interval);
          setIsTyping(false);
          onCompleteRef.current?.();
          return;
        }

        indexRef.current++;
        charCountRef.current++;
        setDisplayedText(text.slice(0, indexRef.current));

        // Play keystroke every 3 characters
        if (charCountRef.current % 3 === 0) {
          audioManager.play("keystroke");
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, speed, delay]);

  const skip = useCallback(() => {
    indexRef.current = text.length;
    setDisplayedText(text);
    setIsTyping(false);
    onCompleteRef.current?.();
  }, [text]);

  return { displayedText, isTyping, skip };
}
