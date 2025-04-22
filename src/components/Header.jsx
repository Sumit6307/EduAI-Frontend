import { useState, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BoardContext } from '../contexts/BoardContext';

// Debug render
console.log('Header.jsx imported');

function Header() {
  const navigate = useNavigate();
  const { board, setBoard } = useContext(BoardContext);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const isAuthenticated = !!localStorage.getItem('token');

  const navItems = [
    { name: 'Home', path: '/', icon: '🏠' },
    {
      name: 'Learn',
      icon: '📚',
      subItems: [
        { name: 'Ask Question', path: '/ask', icon: '❓' },
        { name: 'Explore Topics', path: '/explore', icon: '🔍' },
        { name: 'History', path: '/history', icon: '📜' },
      ],
    },
    { name: 'Dashboard', path: '/dashboard', icon: '📊' },
    ...(isAuthenticated
      ? [
          { name: 'Profile', path: '/profile', icon: '👤' },
          {
            name: 'Logout',
            path: '/logout',
            icon: '🚪',
            action: () => {
              console.log('Logging out');
              localStorage.removeItem('token');
              navigate('/login');
            },
          },
        ]
      : [
          { name: 'Login', path: '/login', icon: '🔑' },
          { name: 'Signup', path: '/signup', icon: '✍️' },
        ]),
  ];

  const boards = ['CBSE', 'ICSE', 'State Board'];

  // Handle search (mock)
  const handleSearch = useCallback((e) => {
    e.preventDefault();
    console.log('Search submitted:', e.target.search.value);
    alert('Search functionality coming soon!');
  }, []);

  // Toggle dropdown
  const toggleDropdown = useCallback((name) => {
    console.log('Toggling dropdown:', name);
    setDropdownOpen(dropdownOpen === name ? null : name);
  }, [dropdownOpen]);

  // Handle board change
  const handleBoardChange = useCallback((newBoard) => {
    console.log('Changing board to:', newBoard);
    setBoard(newBoard);
  }, [setBoard]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
      className="bg-gradient-to-r from-blue-700 via-indigo-800 to-purple-800 text-white sticky top-0 z-50 shadow-lg"
    >
      {/* Radial Overlay */}
      <div className="absolute inset-0 bg-radial opacity-10 z-[-1]" />

      <div className="container mx-auto px-4 py-4 flex items-center justify-between relative z-10">
        {/* Logo */}
        <motion.div
          className="text-2xl font-bold cursor-pointer bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-purple-200"
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate('/')}
          aria-label="EduAI Home"
        >
          EduAI
        </motion.div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <div key={item.name} className="relative">
              {item.subItems ? (
                <>
                  <motion.button
                    className="text-lg flex items-center gap-2 hover:text-blue-200 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleDropdown(item.name)}
                    aria-label={`Toggle ${item.name} dropdown`}
                    style={{ pointerEvents: 'auto' }}
                  >
                    <span>{item.icon}</span>
                    {item.name}
                  </motion.button>
                  {dropdownOpen === item.name && (
                    <motion.ul
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute left-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg p-2"
                    >
                      {item.subItems.map((subItem) => (
                        <motion.li
                          key={subItem.name}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <a
                            href={subItem.path}
                            className="flex items-center gap-2 px-4 py-2 hover:bg-blue-100 rounded"
                            onClick={() => setDropdownOpen(null)}
                            aria-label={`Navigate to ${subItem.name}`}
                            style={{ pointerEvents: 'auto' }}
                          >
                            <span>{subItem.icon}</span>
                            {subItem.name}
                          </a>
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </>
              ) : (
                <motion.a
                  key={item.name}
                  href={item.path}
                  onClick={(e) => {
                    if (item.action) {
                      e.preventDefault();
                      item.action();
                    }
                  }}
                  className="text-lg flex items-center gap-2 hover:text-blue-200 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`Navigate to ${item.name}`}
                  style={{ pointerEvents: 'auto' }}
                >
                  <span>{item.icon}</span>
                  {item.name}
                </motion.a>
              )}
            </div>
          ))}

          {/* Board Switcher */}
          <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              className="text-lg flex items-center gap-2 hover:text-blue-200 transition-colors"
              whileHover={{ scale: 1.1 }}
              onClick={() => toggleDropdown('board')}
              aria-label="Select education board"
              style={{ pointerEvents: 'auto' }}
            >
              <span>📋</span>
              {board}
            </motion.button>
            {dropdownOpen === 'board' && (
              <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute right-0 mt-2 w-32 bg-white text-gray-800 rounded-lg shadow-lg p-2"
              >
                {boards.map((b) => (
                  <motion.li
                    key={b}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <button
                      onClick={() => {
                        handleBoardChange(b);
                        setDropdownOpen(null);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-blue-100 rounded"
                      aria-label={`Switch to ${b}`}
                      style={{ pointerEvents: 'auto' }}
                    >
                      {b}
                    </button>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </motion.div>

          {/* Search Bar */}
          <motion.form
            onSubmit={handleSearch}
            className="flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <input
              type="text"
              name="search"
              placeholder="Search..."
              className="px-3 py-1 rounded-l-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-200"
              aria-label="Search EduAI"
            />
            <motion.button
              type="submit"
              className="px-3 py-1 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Submit search"
              style={{ pointerEvents: 'auto' }}
            >
              🔍
            </motion.button>
          </motion.form>
        </nav>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          style={{ pointerEvents: 'auto' }}
        >
          {isOpen ? '✕' : '☰'}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.nav
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-blue-700 backdrop-blur-md bg-opacity-90"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navItems.map((item) => (
              <div key={item.name}>
                {item.subItems ? (
                  <>
                    <motion.button
                      className="text-lg flex items-center gap-2 hover:text-blue-200 transition-colors"
                      onClick={() => toggleDropdown(item.name)}
                      aria-label={`Toggle ${item.name} dropdown`}
                      style={{ pointerEvents: 'auto' }}
                    >
                      <span>{item.icon}</span>
                      {item.name}
                    </motion.button>
                    {dropdownOpen === item.name && (
                      <ul className="pl-4 mt-2 space-y-2">
                        {item.subItems.map((subItem) => (
                          <li key={subItem.name}>
                            <motion.a
                              href={subItem.path}
                              className="flex items-center gap-2 text-gray-200 hover:text-white"
                              onClick={() => setIsOpen(false)}
                              whileHover={{ scale: 1.05 }}
                              aria-label={`Navigate to ${subItem.name}`}
                              style={{ pointerEvents: 'auto' }}
                            >
                              <span>{subItem.icon}</span>
                              {subItem.name}
                            </motion.a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <motion.a
                    key={item.name}
                    href={item.path}
                    onClick={(e) => {
                      if (item.action) {
                        e.preventDefault();
                        item.action();
                      }
                      setIsOpen(false);
                    }}
                    className="text-lg flex items-center gap-2 hover:text-blue-200 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    aria-label={`Navigate to ${item.name}`}
                    style={{ pointerEvents: 'auto' }}
                  >
                    <span>{item.icon}</span>
                    {item.name}
                  </motion.a>
                )}
              </div>
            ))}
            {/* Board Switcher (Mobile) */}
            <div>
              <motion.button
                className="text-lg flex items-center gap-2 hover:text-blue-200 transition-colors"
                onClick={() => toggleDropdown('board')}
                aria-label="Select education board"
                style={{ pointerEvents: 'auto' }}
              >
                <span>📋</span>
                {board}
              </motion.button>
              {dropdownOpen === 'board' && (
                <ul className="pl-4 mt-2 space-y-2">
                  {boards.map((b) => (
                    <li key={b}>
                      <motion.button
                        onClick={() => {
                          handleBoardChange(b);
                          setDropdownOpen(null);
                          setIsOpen(false);
                        }}
                        className="text-gray-200 hover:text-white"
                        whileHover={{ scale: 1.05 }}
                        aria-label={`Switch to ${b}`}
                        style={{ pointerEvents: 'auto' }}
                      >
                        {b}
                      </motion.button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {/* Search Bar (Mobile) */}
            <motion.form
              onSubmit={handleSearch}
              className="flex"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <input
                type="text"
                name="search"
                placeholder="Search..."
                className="flex-1 px-3 py-1 rounded-l-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-200"
                aria-label="Search EduAI"
              />
              <motion.button
                type="submit"
                className="px-3 py-1 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Submit search"
                style={{ pointerEvents: 'auto' }}
              >
                🔍
              </motion.button>
            </motion.form>
          </div>
        </motion.nav>
      )}
    </motion.header>
  );
}

export default Header;