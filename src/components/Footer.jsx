import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-luxury-gray-dark border-t border-neutral-200 dark:border-neutral-850 select-none transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-12 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        
        {/* Left: Logo & Copyright */}
        <div className="space-y-2">
          <Link to="/" className="flex items-center justify-center sm:justify-start">
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-neutral-900 dark:text-neutral-100">
              Roam<span className="font-light text-neutral-400">Reserve</span>
            </span>
          </Link>
          <p className="text-[9px] text-neutral-400 uppercase tracking-wider">
            &copy; {new Date().getFullYear()} ROAM RESERVE. ALL RIGHTS RESERVED.
          </p>
        </div>

        {/* Center: Curated Series Label */}
        <div className="hidden lg:block text-[9px] text-neutral-300 dark:text-neutral-700 tracking-[0.3em] uppercase">
          — ARCHITECTURAL QUIETUDE SERIES —
        </div>

        {/* Right: Social & Info Links */}
        <div className="flex items-center gap-6">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <FaGithub size={14} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={14} />
          </a>
          <span className="text-neutral-300 dark:text-neutral-800">|</span>
          <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-[0.2em]">
            TERMS
          </span>
          <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-[0.2em]">
            PRIVACY
          </span>
        </div>

      </div>
    </footer>
  );
}
