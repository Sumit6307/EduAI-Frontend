import { useState, useEffect, useCallback, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../utils/api';
import BoardSelector from '../components/BoardSelector';
import HistoryPanel from '../components/HistoryPanel';
import { BoardContext } from '../contexts/BoardContext';

// Debug imports
console.log('BoardSelector imported:', typeof BoardSelector);
console.log('HistoryPanel imported:', typeof HistoryPanel);

function AskQuestion() {
  const { board } = useContext(BoardContext);
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [suggestion, setSuggestion] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  // Log render
  useEffect(() => {
    console.log('AskQuestion rendered:', { board, query, loading });
  }, [board, query, loading]);

  // Set suggestion
  useEffect(() => {
    const suggestions = {
      CBSE: 'What is Newton’s First Law?',
      ICSE: 'Explain the structure of an atom.',
      'State Board': 'Define photosynthesis.',
    };
    setSuggestion(suggestions[board] || 'Enter your question...');
  }, [board]);

  // Handle query change
  const handleQueryChange = (e) => {
    const value = e.target.value;
    console.log('Query changed:', value);
    setQuery(value);
  };

  // Handle submit
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      console.log('Submit blocked: Empty query');
      return;
    }
    setLoading(true);
    setResponse(null);
    setError(null);
    console.log('Submitting query:', { query, board });

    try {
      const res = await api.post('/query', { query, board });
      setResponse(res.data);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.message || 'Failed to fetch response';
      setError(errorMsg);
      console.error('Query error:', err);
    }
    setLoading(false);
  }, [query, board]);

  // Retry query
  const retryQuery = useCallback(() => {
    console.log('Retrying query');
    handleSubmit({ preventDefault: () => {} });
  }, [handleSubmit]);

  // Clear query
  const clearQuery = () => {
    console.log('Clearing query');
    setQuery('');
    setResponse(null);
    setError(null);
  };

  // Copy response
  const copyResponse = () => {
    if (response?.text) {
      console.log('Copying response:', response.text.slice(0, 50) + '...');
      navigator.clipboard.writeText(response.text);
      alert('Response copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-indigo-900 to-teal-800 py-16 relative">
      {/* Animated Wave Background */}
      <div className="absolute inset-0 bg-wave opacity-20 z-[-1]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300 drop-shadow-md">
            EduAI
          </h1>
          <p className="text-blue-200 mt-2">Discover knowledge with precision</p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-xl p-8 shadow-lg border border-blue-200/30 grid grid-cols-1 lg:grid-cols-4 gap-6"
        >
          {/* Main Content */}
          <motion.div
            className="col-span-3 space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Board Selector */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <BoardSelector />
            </motion.div>

            {/* Query Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <label className="block text-gray-800 font-medium mb-2">
                Your Question
              </label>
              <textarea
                value={query}
                onChange={handleQueryChange}
                placeholder={suggestion}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-gray-50 text-gray-800"
                rows={4}
                aria-label="Enter your question"
                style={{ pointerEvents: 'auto', userSelect: 'auto' }}
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-gray-600 text-sm">{query.length}/500 characters</p>
                {loading && (
                  <motion.div
                    className="h-1 bg-blue-600 rounded-full w-full"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                  />
                )}
              </div>
              <div className="flex gap-3 mt-3">
                <button
                  onClick={handleSubmit}
                  disabled={loading || !query.trim()}
                  className={`flex-1 p-3 rounded-lg font-semibold text-white bg-blue-600 ${loading || !query.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700 hover:shadow-lg'}`}
                  style={{ pointerEvents: 'auto' }}
                >
                  {loading ? 'Processing...' : 'Ask Question'}
                </button>
                <button
                  onClick={clearQuery}
                  className="p-3 rounded-lg font-semibold text-gray-800 bg-gray-200 hover:bg-gray-300 hover:shadow-lg"
                  style={{ pointerEvents: 'auto' }}
                >
                  Clear
                </button>
              </div>
            </motion.div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="text-red-600 bg-red-100 p-3 rounded-lg flex justify-between items-center"
                >
                  <p>{error}</p>
                  <button
                    onClick={retryQuery}
                    className="px-3 py-1 rounded-lg bg-red-600 text-white text-sm hover:bg-red-700"
                    style={{ pointerEvents: 'auto' }}
                  >
                    Retry
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Success Animation */}
            <AnimatePresence>
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Response */}
            <AnimatePresence>
              {response && !error && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4"
                >
                  <motion.div
                    className="p-4 bg-gray-50 rounded-lg"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <h3 className="font-semibold text-blue-600 mb-2">Answer</h3>
                    <p className="text-gray-800">{response.text || 'No response text available'}</p>
                    <button
                      onClick={copyResponse}
                      className="mt-3 px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 hover:shadow-lg"
                      style={{ pointerEvents: 'auto' }}
                    >
                      Copy Answer
                    </button>
                  </motion.div>
                  {response.visual && (
                    <motion.div
                      className="p-4 bg-gray-50 rounded-lg"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <h3 className="font-semibold text-blue-600 mb-2">Visualization</h3>
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        {/* Placeholder for VisualCanvas */}
                        <p className="text-gray-600">
                          {JSON.stringify(response.visual, null, 2)}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* History Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="lg:col-span-1"
          >
            <HistoryPanel />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default AskQuestion;