import { useState, useEffect, useCallback, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCopy, FaMicrophone } from 'react-icons/fa';
import api from '../utils/api';
import BoardSelector from '../components/BoardSelector';
import HistoryPanel from '../components/HistoryPanel';
import { BoardContext } from '../contexts/BoardContext';

// Animation Variants
const backButtonVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  hover: {
    scale: 1.05,
    backgroundColor: '#e5e7eb',
    transition: { duration: 0.2 },
  },
  tap: { scale: 0.95 },
};

function AskQuestion() {
  const navigate = useNavigate();
  const { board } = useContext(BoardContext);
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [suggestion, setSuggestion] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [mediaType, setMediaType] = useState('all'); // text, image, video, all

  // Set suggestion based on board
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
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!query.trim()) {
        console.log('Submit blocked: Empty query');
        setError('Please enter a question.');
        return;
      }
      setLoading(true);
      setResponse(null);
      setError(null);
      console.log('Submitting query:', { query, board, mediaType });

      try {
        const res = await api.post('/query', { query, board, mediaType });
        setResponse(res.data);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
      } catch (err) {
        const errorMsg = err.response?.data?.error || err.message || 'Failed to fetch response';
        setError(errorMsg);
        console.error('Query error:', err);
      }
      setLoading(false);
    },
    [query, board, mediaType]
  );

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
    } else {
      alert('No text response to copy.');
    }
  };

  // Voice input
  const startVoiceInput = () => {
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
      alert('Voice input is not supported in this browser.');
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setLoading(true);
    recognition.onend = () => setLoading(false);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
    };
    recognition.onerror = () => {
      setLoading(false);
      alert('Voice recognition failed.');
    };

    recognition.start();
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 flex flex-col relative">
      {/* Back Button */}
      <motion.button
        variants={backButtonVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        whileTap="tap"
        onClick={() => navigate(-1) || navigate('/')}
        className="fixed top-4 left-4 z-20 flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-600 font-medium shadow-sm hover:text-blue-600"
      >
        <FaArrowLeft className="text-sm" /> Back
      </motion.button>

      <div className="container mx-auto px-4 py-16 flex-grow">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-blue-600 font-sans">
            EduAI Learning Hub
          </h1>
          <p className="text-lg text-gray-600 mt-2">Your trusted companion for academic excellence</p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-md p-6 grid grid-cols-1 lg:grid-cols-4 gap-6"
        >
          {/* Main Content */}
          <motion.div
            className="col-span-3 space-y-6"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Board Selector */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <BoardSelector />
            </motion.div>

            {/* Query Input */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <label className="block text-gray-700 font-medium mb-2 font-sans">
                Ask Your Question
              </label>
              <textarea
                value={query}
                onChange={handleQueryChange}
                placeholder={suggestion}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
                rows={4}
                aria-label="Enter your question"
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-gray-500 text-sm">{query.length}/500 characters</p>
                {loading && (
                  <motion.div
                    className="h-1 bg-blue-500 rounded-full w-full"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                  />
                )}
              </div>
              {/* Media Type Toggle */}
              <div className="flex gap-2 mt-3">
                {['all', 'text', 'image', 'video'].map((type) => (
                  <motion.button
                    key={type}
                    onClick={() => setMediaType(type)}
                    className={`px-3 py-1 rounded-md text-sm font-medium ${
                      mediaType === type
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </motion.button>
                ))}
              </div>
              <div className="flex gap-3 mt-3">
                <motion.button
                  onClick={handleSubmit}
                  disabled={loading || !query.trim()}
                  className={`flex-1 p-3 rounded-md font-medium bg-blue-500 text-white ${
                    loading || !query.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {loading ? 'Processing...' : 'Ask Question'}
                </motion.button>
                <motion.button
                  onClick={startVoiceInput}
                  className="p-3 rounded-md bg-gray-100 text-blue-500 border border-gray-300 hover:bg-gray-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Voice input"
                >
                  <FaMicrophone />
                </motion.button>
                <motion.button
                  onClick={clearQuery}
                  className="p-3 rounded-md font-medium text-gray-600 bg-gray-100 border border-gray-300 hover:bg-gray-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Clear
                </motion.button>
              </div>
            </motion.div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="text-red-600 bg-red-50 p-3 rounded-md flex justify-between items-center border border-red-200"
                >
                  <p>{error}</p>
                  <motion.button
                    onClick={retryQuery}
                    className="px-3 py-1 rounded-md bg-red-500 text-white text-sm hover:bg-red-600"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Retry
                  </motion.button>
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
                  className="absolute top-4 right-4 bg-green-500 text-white p-2 rounded-full"
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
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                >
                  {/* Text Response */}
                  {response.text && (
                    <motion.div
                      className="p-4 bg-gray-50 rounded-md border border-gray-200"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                    >
                      <h3 className="font-semibold text-blue-600 mb-2 font-sans">Text Answer</h3>
                      <p className="text-gray-700">{response.text}</p>
                      <motion.button
                        onClick={copyResponse}
                        className="mt-3 px-4 py-2 rounded-md bg-blue-500 text-white font-medium hover:bg-blue-600"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaCopy className="inline mr-2" /> Copy Answer
                      </motion.button>
                    </motion.div>
                  )}
                  {/* Image Response */}
                  {response.visual && (
                    <motion.div
                      className="p-4 bg-gray-50 rounded-md border border-gray-200"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      <h3 className="font-semibold text-blue-600 mb-2 font-sans">Diagram</h3>
                      <img
                        src={response.visual}
                        alt={`Diagram for ${query}`}
                        className="w-full max-w-md rounded-md border border-gray-200"
                        loading="lazy"
                      />
                    </motion.div>
                  )}
                  {/* Video Response */}
                  {response.video && (
                    <motion.div
                      className="p-4 bg-gray-50 rounded-md border border-gray-200"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                    >
                      <h3 className="font-semibold text-blue-600 mb-2 font-sans">Video Explanation</h3>
                      <video
                        src={response.video}
                        controls
                        className="w-full max-w-md rounded-md border border-gray-200"
                        loading="lazy"
                      >
                        Your browser does not support the video tag.
                      </video>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* History Panel */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
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