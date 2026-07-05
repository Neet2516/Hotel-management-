import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Compass, MapPinOff } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 bg-gray-50/20 dark:bg-slate-950/20 transition-colors duration-300">
      <div className="max-w-md w-full text-center space-y-6">
        
        {/* Animated Compass Icon */}
        <div className="flex justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="p-5 bg-indigo-50 dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 rounded-full shadow-md"
          >
            <Compass size={48} className="stroke-[1.5]" />
          </motion.div>
        </div>

        {/* Text Details */}
        <div className="space-y-2">
          <h1 className="text-7xl font-extrabold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent tracking-tight">
            404
          </h1>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">
            Lost in Translation?
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs mx-auto">
            The page you are looking for has been moved, renamed, or is temporarily unavailable.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-500/20 active:scale-95 transition-all cursor-pointer"
          >
            <Home size={14} />
            <span>Go Back Home</span>
          </button>
          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-white dark:bg-slate-900 hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-600 dark:text-gray-300 border border-gray-250 dark:border-slate-800 font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer"
          >
            <span>Previous Page</span>
          </button>
        </div>
      </div>
    </div>
  );
}
