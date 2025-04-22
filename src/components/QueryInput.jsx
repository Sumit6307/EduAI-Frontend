import { useState } from 'react';
import { motion } from 'framer-motion';
import useSpeechRecognition from '../hooks/useSpeechRecognition';

function QueryInput({ query, setQuery, onSubmit, loading }) {
  const { listening, startListening, stopListening } = useSpeechRecognition(setQuery);

  return (
    <div className="flex flex-col gap-4">
      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="Ask your question..."
        rows="4"
      />
      <div className="flex gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onSubmit}
          disabled={loading}
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Submit'}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={listening ? stopListening : startListening}
          className={`p-2 rounded ${listening ? 'bg-red-600' : 'bg-green-600'} text-white`}
        >
          {listening ? 'Stop' : 'Speak'}
        </motion.button>
      </div>
    </div>
  );
}

export default QueryInput;