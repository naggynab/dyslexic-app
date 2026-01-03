import { useCallback } from 'react';

export function useSpeech() {
  const speak = useCallback((text, options = {}) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = options.lang || 'ne-NP';
      utterance.rate = options.rate || 0.8;
      utterance.pitch = options.pitch || 1;
      
      window.speechSynthesis.speak(utterance);
    } else {
      console.warn('Text-to-speech not supported in this browser');
    }
  }, []);

  return { speak };
}