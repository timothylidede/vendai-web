import { useEffect, useRef, useState } from "react";

/**
 * Cycles through a list of words, typing and deleting each word in sequence.
 * @param words Array of words to cycle through
 * @param typingSpeed ms per character typed
 * @param deletingSpeed ms per character deleted
 * @param pause ms to pause after typing/deleting
 */
export function useTypewriter(words: string[], typingSpeed = 100, deletingSpeed = 50, pause = 2000) {
  const [display, setDisplay] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const currentWordRef = useRef("");

  useEffect(() => {
    const currentWord = words[index % words.length];
    currentWordRef.current = currentWord;

    const getRandomSpeed = (baseSpeed: number) => {
      // Add some human-like randomness to typing speed
      return baseSpeed + Math.random() * 50 - 25;
    };

    if (!isDeleting && display.length < currentWord.length) {
      timeoutRef.current = setTimeout(() => {
        setDisplay(currentWord.slice(0, display.length + 1));
      }, getRandomSpeed(typingSpeed));
    } else if (!isDeleting && display.length === currentWord.length) {
      timeoutRef.current = setTimeout(() => setIsDeleting(true), pause);
    } else if (isDeleting && display.length > 0) {
      timeoutRef.current = setTimeout(() => {
        setDisplay(display.slice(0, -1));
      }, getRandomSpeed(deletingSpeed));
    } else if (isDeleting && display.length === 0) {
      timeoutRef.current = setTimeout(() => {
        setIsDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      }, 500);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [display, isDeleting, index, words, typingSpeed, deletingSpeed, pause]);

  return display;
}
