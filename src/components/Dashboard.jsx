import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

console.log('Dashboard.jsx imported');

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: 'Guest' }); // Mock user
  const [loading, setLoading] = useState(false);
  const [recentQueries, setRecentQueries] = useState([]); // Mock recent queries

  useEffect(() => {
    console.log('Dashboard rendered:', { user, loading });
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
    const history = JSON.parse(localStorage.getItem('queryHistory')) || [];
    setRecentQueries(history.slice(0, 3));
  }, []);

  const handleNavigate = useCallback((path) => {
    console.log('Navigating to:', path);
    setLoading(true);
    setTimeout(() => {
      navigate(path);
      setLoading(false);
    }, 300); // Simulate navigation delay
  }, [navigate]);

  const handleLogout = () => {
    console.log('Logging out');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const options = [
    { label: 'Ask a Question', path: '/ask' },
    { label: 'Explore Topics', path: '/explore' },
    { label: 'View History', path: '/history' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-700 py-16 relative">
      {/* Subtle Radial Overlay */}
      <div className="absolute inset-0 bg-radial opacity-10 z-[-1]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white drop-shadow-md">EduAI</h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-blue-200 mt-2"
          >
            Welcome, {user.username}! Start your learning journey.
          </motion.p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-white rounded-xl p-8 shadow-lg max-w-3xl w-full mx-auto border border-indigo-200/50"
        >
          {/* User Profile */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-between items-center mb-6"
          >
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                Hello, {user.username}
              </h3>
              <p className="text-gray-600 text-sm">Explore knowledge with EduAI</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}
              whileTap={{ scale: 0.97 }}
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700"
              style={{ pointerEvents: 'auto' }}
              aria-label="Log out"
            >
              Logout
            </motion.button>
          </motion.div>

          {/* Navigation Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {options.map((option, index) => (
              <motion.button
                key={option.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.03, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleNavigate(option.path)}
                className="bg-blue-600 text-white p-4 rounded-lg font-semibold hover:bg-blue-700 relative overflow-hidden"
                style={{ pointerEvents: 'auto' }}
                disabled={loading}
                aria-label={`Navigate to ${option.label}`}
              >
                {loading && (
                  <motion.div
                    className="absolute top-0 left-0 h-1 bg-blue-400"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                )}
                {option.label}
              </motion.button>
            ))}
          </div>

          {/* Recent Queries */}
          {recentQueries.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <h3 className="text-lg font-semibold text-blue-600 mb-3">
                Recent Queries
              </h3>
              <ul className="space-y-2">
                {recentQueries.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                    className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleNavigate('/history')}
                    style={{ pointerEvents: 'auto' }}
                    aria-label={`View query: ${item.query}`}
                  >
                    <p className="text-gray-800 truncate">{item.query}</p>
                    <p className="text-gray-500 text-sm">
                      {new Date(item.timestamp).toLocaleDateString()}
                    </p>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default Dashboard;