import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../utils/api';

function HistoryPanel() {
  const [history, setHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expanded, setExpanded] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get('/history');
        setHistory(res.data);
        setFilteredHistory(res.data);
      } catch (err) {
        setError('Failed to fetch history: ' + (err.response?.data?.msg || err.message));
        console.error('Failed to fetch history:', err);
        const localHistory = JSON.parse(localStorage.getItem('queryHistory')) || [];
        setHistory(localHistory);
        setFilteredHistory(localHistory);
      }
      setLoading(false);
    };
    fetchHistory();
  }, []);

  useEffect(() => {
    setFilteredHistory(
      history.filter((item) =>
        item.query.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, history]);

  const clearHistory = () => {
    console.log('Clearing history');
    setHistory([]);
    setFilteredHistory([]);
    localStorage.removeItem('queryHistory');
    api.delete('/history').catch((err) => console.error('Failed to clear history:', err));
  };

  const toggleExpand = (id) => {
    console.log('Toggling expand:', id);
    setExpanded(expanded === id ? null : id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 bg-gray-50 rounded-lg border border-gray-200"
      style={{ pointerEvents: 'auto' }}
    >
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-blue-600">Recent Queries</h3>
        <motion.button
          whileHover={{ scale: 1.02, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}
          whileTap={{ scale: 0.98 }}
          onClick={clearHistory}
          className="px-3 py-1 rounded-lg bg-gray-200 text-gray-800 text-sm font-semibold hover:bg-gray-300 hover:shadow-lg"
          style={{ pointerEvents: 'auto' }}
        >
          Clear
        </motion.button>
      </div>
      <input
        type="text"
        value={search}
        onChange={(e) => {
          console.log('Search input:', e.target.value);
          setSearch(e.target.value);
        }}
        placeholder="Search queries..."
        className="w-full p-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white text-gray-800"
        aria-label="Search query history"
        style={{ pointerEvents: 'auto', userSelect: 'auto' }}
      />
      {error && <p className="text-red-600 bg-red-100 p-2 rounded mb-2">{error}</p>}
      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : filteredHistory.length === 0 ? (
        <p className="text-gray-600">No queries found</p>
      ) : (
        <ul className="space-y-2 max-h-[500px] overflow-y-auto">
          {filteredHistory.slice(0, 5).map((item) => (
            <motion.li
              key={item._id || item.query}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-3 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 cursor-pointer"
              onClick={() => toggleExpand(item._id || item.query)}
              style={{ pointerEvents: 'auto' }}
            >
              <div className="flex justify-between items-center">
                <p className="text-gray-800 font-medium truncate">{item.query}</p>
                <span className="text-gray-500 text-sm">
                  {new Date(item.createdAt || item.timestamp).toLocaleDateString()}
                </span>
              </div>
              <AnimatePresence>
                {expanded === (item._id || item.query) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-2 text-gray-600 text-sm"
                  >
                    <p>{item.response?.text?.slice(0, 100) || 'No response available'}...</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}

export default HistoryPanel;