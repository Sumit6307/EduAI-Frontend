import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import api from '../utils/api';

// Debug render
console.log('LearningHistory.jsx imported');

function LearningHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch history
  const fetchHistory = useCallback(async () => {
    console.log('Fetching history');
    try {
      const res = await api.get('/history');
      setHistory(res.data);
    } catch (err) {
      console.error('Failed to fetch history:', err);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-700 py-16 relative">
      {/* Subtle Radial Overlay */}
      <div className="absolute inset-0 bg-radial opacity-10 z-[-1]" />

      <div className="container mx-auto px-4 relative z-10 flex">
        {/* Sidebar */}
        <motion.aside
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="hidden lg:block w-64 mr-6 sticky top-16 h-fit"
        >
          <div className="bg-white rounded-xl p-4 shadow-lg border border-indigo-200/50">
            <h3 className="text-lg font-bold text-blue-600 mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#history"
                  className="text-gray-800 hover:text-blue-600"
                  style={{ pointerEvents: 'auto' }}
                >
                  Recent Queries
                </a>
              </li>
            </ul>
          </div>
        </motion.aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-8"
            id="header"
          >
            <h1 className="text-4xl font-bold text-white drop-shadow-md">
              Your Learning Journey
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-blue-200 mt-2 text-lg"
            >
              Relive Your Curiosity with EduAI
            </motion.p>
          </motion.div>

          {/* History Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-lg border border-indigo-200/50"
            id="history"
          >
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Learning History</h2>
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <div className="spinner border-t-4 border-blue-600 rounded-full w-8 h-8 animate-spin"></div>
              </div>
            ) : history.length === 0 ? (
              <p className="text-gray-600 text-center">No history found. Start exploring with EduAI!</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {history.map((item, index) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    whileHover={{ scale: 1.03, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                    style={{ pointerEvents: 'auto' }}
                    aria-label={`Query: ${item.query}`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-blue-600 text-lg">🕒</span>
                      <div>
                        <p className="font-semibold text-gray-800">{item.query}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(item.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default LearningHistory;