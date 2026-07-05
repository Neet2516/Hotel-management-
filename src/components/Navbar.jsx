import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, User, Sun, Moon, Menu, X } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';

export default function Navbar() {
  const { favorites } = useFavorites();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || 
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    { name: 'Favorites', path: '/favorites' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out select-none ${
        scrolled
          ? 'bg-white/95 dark:bg-luxury-gray-dark/95 border-b border-neutral-200 dark:border-neutral-850 py-4 shadow-sm'
          : 'bg-transparent border-b border-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">
        
        {/* Logo left */}
        <Link to="/" className="flex items-center group">
          <span className="font-sans text-sm font-semibold uppercase tracking-[0.25em] text-neutral-900 dark:text-neutral-100 transition-colors">
            Roam<span className="font-light text-neutral-400">Reserve</span>
          </span>
        </Link>

        {/* Links centered (Desktop) */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-xs font-semibold uppercase tracking-[0.15em] transition-colors duration-300 relative py-1 ${
                location.pathname === link.path || (link.path.startsWith('/#') && location.hash === link.path.slice(1))
                  ? 'text-neutral-900 dark:text-white font-bold'
                  : 'text-neutral-400 hover:text-neutral-950 dark:hover:text-white'
              }`}
            >
              {link.name}
              {(location.pathname === link.path) && (
                <motion.div
                  layoutId="activeNavLineEditorial"
                  className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-neutral-900 dark:bg-white"
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Icons right (Desktop) */}
        <div className="hidden md:flex items-center gap-5">
          {/* Wishlist Link */}
          <Link
            to="/favorites"
            className="relative p-1.5 text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors duration-300"
            aria-label="Wishlist"
          >
            <Heart size={16} fill={location.pathname === '/favorites' ? 'currentColor' : 'none'} className={location.pathname === '/favorites' ? 'text-neutral-900 dark:text-white' : ''} />
            {favorites.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-sans font-bold text-[8px] w-4 h-4 flex items-center justify-center rounded-full">
                {favorites.length}
              </span>
            )}
          </Link>

          {/* User Account Mock */}
          <button
            className="p-1.5 text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors duration-300 cursor-pointer"
            aria-label="Account"
          >
            <User size={16} />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-1.5 text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors duration-300 cursor-pointer"
            aria-label="Toggle Theme"
          >
            {darkMode ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-3">
          <Link
            to="/favorites"
            className="relative p-1.5 text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors"
          >
            <Heart size={16} fill={location.pathname === '/favorites' ? 'currentColor' : 'none'} className={location.pathname === '/favorites' ? 'text-neutral-900 dark:text-white' : ''} />
            {favorites.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-sans font-bold text-[7px] w-3.5 h-3.5 flex items-center justify-center rounded-full">
                {favorites.length}
              </span>
            )}
          </Link>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-1.5 text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer"
          >
            {darkMode ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="absolute top-full left-0 right-0 bg-white dark:bg-luxury-gray-dark border-b border-neutral-200 dark:border-neutral-850 p-6 md:hidden shadow-lg overflow-hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-xs font-semibold uppercase tracking-[0.2em] py-2 border-b border-neutral-100 dark:border-neutral-800 ${
                    location.pathname === link.path
                      ? 'text-neutral-900 dark:text-white font-bold'
                      : 'text-neutral-400'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
