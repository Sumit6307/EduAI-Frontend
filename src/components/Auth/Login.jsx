import { useState, useCallback, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../../utils/api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Login component rendered:', { email, password, isLoading });
  }, [email, password, isLoading]);

  const handleInputChange = useCallback((setter, name) => (e) => {
    console.log(`Input changed: ${name} = ${e.target.value}`);
    setter(e.target.value);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    console.log('Login form submitted:', { email, password });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    try {
      const res = await api.post('/auth/login', { email, password });
      console.log('Login response:', res.data);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.msg || 'Invalid credentials');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 py-16">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-200"
      >
        {/* Logo */}
        <motion.div
          className="text-center mb-6"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h1 className="text-3xl font-extrabold text-blue-600">EduAI</h1>
          <p className="text-gray-500">Login to your AI-powered learning platform</p>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.p
            className="text-red-500 mb-4 text-center bg-red-100 p-2 rounded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {error}
          </motion.p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={handleInputChange(setEmail, 'email')}
              className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="relative">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={handleInputChange(setPassword, 'password')}
              className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 text-gray-500 hover:text-gray-700"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 10px rgba(0,0,0,0.2)' }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className={`w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 flex items-center justify-center ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
                />
              </svg>
            ) : null}
            {isLoading ? 'Logging In...' : 'Login'}
          </motion.button>
        </form>

        {/* Signup Link */}
        <motion.p
          className="text-center text-gray-600 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Don’t have an account?{' '}
          <Link
            to="/signup"
            className="text-blue-600 hover:underline font-medium"
            onClick={() => console.log('Signup link clicked')}
          >
            Sign Up
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}

export default Login;