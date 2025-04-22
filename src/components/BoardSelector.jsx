import { useContext } from 'react';
import { motion } from 'framer-motion';
import { BoardContext } from '../contexts/BoardContext';

function BoardSelector() {
  const { board, setBoard } = useContext(BoardContext);

  const boards = ['CBSE', 'ICSE', 'State Board'];

  return (
    <div className="mb-4">
      <label className="block text-gray-700 mb-2">Select Board</label>
      <div className="flex gap-2">
        {boards.map((b) => (
          <motion.button
            key={b}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setBoard(b)}
            className={`p-2 rounded ${board === b ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            {b}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

export default BoardSelector;