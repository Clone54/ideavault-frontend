import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Ideas from './pages/Ideas';
import IdeaDetails from './pages/IdeaDetails';
import AddIdea from './pages/AddIdea';
import MyIdeas from './pages/MyIdeas';
import MyInteractions from './pages/MyInteractions';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="flex justify-center my-32"><span className="loading loading-spinner text-primary"></span></div>;
  
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return <>{children}</>;
};


const RouteObserver = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    const routesMap = {
      '/': 'IdeaVault - Home',
      '/ideas': 'Explore Ideas - IdeaVault',
      '/add-idea': 'Add Idea - IdeaVault',
      '/my-ideas': 'My Ideas - IdeaVault',
      '/my-interactions': 'My Interactions - IdeaVault',
      '/login': 'Login - IdeaVault',
      '/register': 'Register - IdeaVault',
    };
    document.title = routesMap[location.pathname] || 'IdeaVault - Startup Ideas';
  }, [location.pathname]);
  return null;
};

export default function AppRouter() {
  return (
    <>
      <RouteObserver />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/ideas" element={<Ideas />} />
          <Route path="/ideas/:id" element={<IdeaDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/add-idea" element={<ProtectedRoute><AddIdea /></ProtectedRoute>} />
          <Route path="/my-ideas" element={<ProtectedRoute><MyIdeas /></ProtectedRoute>} />
          <Route path="/my-interactions" element={<ProtectedRoute><MyInteractions /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
