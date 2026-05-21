import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Lightbulb, LogOut, User, Menu } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out successfully');
  };

  const navLinks = (
    <>
      <NavLink to="/" className={({ isActive }) => `block px-3 py-2 rounded-md font-medium hover:text-indigo-600 transition-colors ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-700 dark:text-gray-300'}`}>Home</NavLink>
      <NavLink to="/ideas" className={({ isActive }) => `block px-3 py-2 rounded-md font-medium hover:text-indigo-600 transition-colors ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-700 dark:text-gray-300'}`}>Ideas</NavLink>
      {user && (
        <>
          <NavLink to="/add-idea" className={({ isActive }) => `block px-3 py-2 rounded-md font-medium hover:text-indigo-600 transition-colors ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-700 dark:text-gray-300'}`}>Add Idea</NavLink>
          <NavLink to="/my-ideas" className={({ isActive }) => `block px-3 py-2 rounded-md font-medium hover:text-indigo-600 transition-colors ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-700 dark:text-gray-300'}`}>My Ideas</NavLink>
          <NavLink to="/my-interactions" className={({ isActive }) => `block px-3 py-2 rounded-md font-medium hover:text-indigo-600 transition-colors ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-700 dark:text-gray-300'}`}>My Interactions</NavLink>
        </>
      )}
    </>
  );

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <Lightbulb className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">IdeaVault</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-2">
            {navLinks}
          </div>

          <div className="flex items-center space-x-4">
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300">
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center w-8 h-8 rounded-full overflow-hidden border-2 border-indigo-600 dark:border-indigo-400"
                >
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-full h-full p-1 bg-gray-200 text-gray-600" />
                  )}
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-50">
                    <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user.displayName || 'User'}</p>
                    </div>
                    <Link to="/profile" onClick={() => setDropdownOpen(false)} className="flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                      <User className="w-4 h-4 mr-2" /> Profile
                    </Link>
                    <button onClick={() => { setDropdownOpen(false); handleLogout(); }} className="flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                      <LogOut className="w-4 h-4 mr-2" /> Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Link to="/login" className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 transition-colors">Log in</Link>
                <Link to="/register" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors">Register</Link>
              </div>
            )}

            <div className="md:hidden flex items-center">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-gray-600 dark:text-gray-300">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks}
            {!user && (
              <>
                <Link to="/login" className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300">Log in</Link>
                <Link to="/register" className="block px-3 py-2 text-base font-medium text-indigo-600 dark:text-indigo-400">Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
