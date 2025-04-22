import { createContext, useState } from 'react';

export const BoardContext = createContext();

export const BoardProvider = ({ children }) => {
  const [board, setBoard] = useState('CBSE');

  return (
    <BoardContext.Provider value={{ board, setBoard }}>
      {children}
    </BoardContext.Provider>
  );
};