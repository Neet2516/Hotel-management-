import React from 'react';
import { Link } from 'react-router-dom';
import { Landmark, Mail, Heart } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-gray-200/50 dark:border-slate-800/50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo & description */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-gradient-to-tr from-indigo-600 to-pink-500 text-white shadow-md">
                <Landmark size={18} />
              </div>
              <span className="font-extrabold text-lg bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                Roam<span className="text-indigo-600 dark:text-indigo-400">Reserve</span>
              </span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm">
              Discover and book world-class stays instantly. Filter by price, location, rating and explore beautiful getaways tailored to your travel plans.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-400 hover:text-slate-900 dark:bg-slate-900 dark:hover:bg-slate-800 dark:hover:text-white transition-colors duration-300"
              >
                <FaGithub size={16} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-400 hover:text-indigo-600 dark:bg-slate-900 dark:hover:bg-slate-800 dark:hover:text-indigo-400 transition-colors duration-300"
              >
                <FaLinkedin size={16} />
              </a>
              <a
                href="mailto:contact@roamreserve.com"
                className="p-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-400 hover:text-pink-600 dark:bg-slate-900 dark:hover:bg-slate-800 dark:hover:text-pink-400 transition-colors duration-300"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">
              Explore
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors">
                  All Hotels
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="text-sm text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors">
                  Your Favorites
                </Link>
              </li>
              <li>
                <a href="#explore" className="text-sm text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors">
                  Top Destinations
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">
              Legal & Info
            </h3>
            <ul className="space-y-2">
              <li>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Terms of Service
                </span>
              </li>
              <li>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  API Documentation
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200/50 dark:border-slate-800/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} RoamReserve. All rights reserved.
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
            Made with <Heart size={12} className="text-red-500 fill-current animate-pulse" /> for travelers worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
}
