import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { Hotel, MapPin, Star, ShieldCheck } from 'lucide-react';

function Counter({ from = 0, to, duration = 2, suffix = '' }) {
  const [count, setCount] = useState(from);

  useEffect(() => {
    const controls = animate(from, to, {
      duration,
      onUpdate: (value) => setCount(Math.floor(value)),
    });
    return () => controls.stop();
  }, [from, to, duration]);

  return <>{count}{suffix}</>;
}

export default function Stats() {
  const statsList = [
    {
      label: 'Premium Hotels',
      value: 500,
      suffix: '+',
      icon: <Hotel className="text-indigo-600 dark:text-indigo-400" size={24} />,
      desc: 'Top quality verified locations',
    },
    {
      label: 'Prime Destinations',
      value: 12,
      suffix: ' Cities',
      icon: <MapPin className="text-pink-600 dark:text-pink-400" size={24} />,
      desc: 'All over key Indian metropolises',
    },
    {
      label: 'Average Guest Rating',
      value: 4,
      suffix: '.5 ★',
      icon: <Star className="text-amber-500" size={24} />,
      desc: 'Based on customer reviews',
    },
    {
      label: 'Trusted Partners',
      value: 100,
      suffix: '%',
      icon: <ShieldCheck className="text-emerald-600 dark:text-emerald-400" size={24} />,
      desc: 'Secure payments & bookings',
    },
  ];

  return (
    <section className="py-12 bg-gray-50/50 dark:bg-slate-900/30 transition-colors duration-300 border-y border-gray-100 dark:border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {statsList.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col items-center text-center p-6 bg-white dark:bg-slate-950 rounded-2xl border border-gray-150 dark:border-slate-800/80 shadow-sm"
            >
              <div className="p-3 rounded-xl bg-gray-50 dark:bg-slate-900 mb-4">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-1">
                <Counter to={stat.value} suffix={stat.suffix} />
              </h3>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                {stat.label}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {stat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
