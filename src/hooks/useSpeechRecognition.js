import { useState, useEffect } from 'react';

const useSpeechRecognition = (setQuery) => {
  const [listening, setListening] = useState(false);
  let recognition = null;

  if ('webkitSpeechRecognition' in window) {
    recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join('');
      setQuery(transcript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };
  }

  const startListening = () => {
    if (recognition) {
      recognition.start();
      setListening(true);
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setListening(false);
    }
  };

  useEffect(() => {
    return () => {
      if (recognition) recognition.stop();
    };
  }, []);

  return { listening, startListening, stopListening };
};

export default useSpeechRecognition;