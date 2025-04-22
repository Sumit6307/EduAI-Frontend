import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import AskQuestion from './pages/AskQuestion';
import ExploreTopics from './pages/ExploreTopics';
import LearningHistory from './pages/LearningHistory';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Footer from './components/Footer';
import { BoardProvider } from './contexts/BoardContext';

function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <BoardProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/" element={<Home />} />
              <Route
                path="/dashboard"
                element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
              />
              <Route
                path="/ask"
                element={isAuthenticated ? <AskQuestion /> : <Navigate to="/login" />}
              />
              <Route
                path="/explore"
                element={isAuthenticated ? <ExploreTopics /> : <Navigate to="/login" />}
              />
              <Route
                path="/history"
                element={isAuthenticated ? <LearningHistory /> : <Navigate to="/login" />}
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </BoardProvider>
  );
}

export default App;