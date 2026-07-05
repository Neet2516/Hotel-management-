import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Heart, Menu, X, Landmark } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';

export default function Navbar() {
  const { favorites } = useFavorites();
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || 
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Explore', path: '/#explore' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/75 dark:bg-slate-950/75 border-b border-gray-200/50 dark:border-slate-800/50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-indigo-600 to-pink-500 text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
            <Landmark size={20} />
          </div>
          <span className="font-extrabold text-xl bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
            Roam<span className="text-indigo-600 dark:text-indigo-400">Reserve</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-medium transition-colors duration-300 relative py-1 ${
                location.pathname === link.path || (link.path.startsWith('/#') && location.hash === link.path.slice(1))
                  ? 'text-indigo-600 dark:text-indigo-400'
                  : 'text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400'
              }`}
            >
              {link.name}
              {(location.pathname === link.path) && (
                <motion.div
                  layoutId="activeNavLine"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-400"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {/* Favorites Button */}
          <Link
            to="/favorites"
            className="relative p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-600 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400 transition-colors duration-300"
            aria-label="Favorites"
          >
            <Heart size={20} fill={location.pathname === '/favorites' ? 'currentColor' : 'none'} className={location.pathname === '/favorites' ? 'text-red-500' : ''} />
            <AnimatePresence>
              {favorites.length > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute top-0.5 right-0.5 bg-red-500 text-white font-bold text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-white dark:border-slate-950"
                >
                  {favorites.length}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-600 dark:text-gray-300 transition-colors duration-300 cursor-pointer"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} className="text-slate-700" />}
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center gap-3">
          {/* Favorites Mobile Link */}
          <Link
            to="/favorites"
            className="relative p-2 rounded-xl text-gray-600 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400 transition-colors duration-300"
          >
            <Heart size={20} fill={location.pathname === '/favorites' ? 'currentColor' : 'none'} className={location.pathname === '/favorites' ? 'text-red-500' : ''} />
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white font-bold text-[9px] w-4.5 h-4.5 flex items-center justify-center rounded-full border border-white dark:border-slate-950">
                {favorites.length}
              </span>
            )}
          </Link>

          {/* Theme Toggle Mobile */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-xl text-gray-600 dark:text-gray-300 transition-colors duration-300 cursor-pointer"
          >
            {darkMode ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} />}
          </button>

          {/* Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors duration-300 cursor-pointer"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-gray-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-950 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-2.5 px-3 rounded-lg text-base font-medium transition-colors duration-300 ${
                    location.pathname === link.path
                      ? 'bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400'
                      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-slate-900/50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/favorites"
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2.5 px-3 rounded-lg text-base font-medium transition-colors duration-300 ${
                  location.pathname === '/favorites'
                    ? 'bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400'
                    : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-slate-900/50'
                }`}
              >
                Saved Favorites ({favorites.length})
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
