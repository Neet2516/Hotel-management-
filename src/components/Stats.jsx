import React, { useEffect, useState } from 'react';
import { motion, animate } from 'framer-motion';

function Counter({ from = 0, to, duration = 1.5, suffix = '' }) {
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
      num: '01',
      label: 'ARCHITECTURAL RIGOR',
      value: 500,
      suffix: '+ Properties',
      desc: 'Sanctuaries selected exclusively for their structural poetry, light interplay, and design integrity.',
    },
    {
      num: '02',
      label: 'LOCAL AUTHENTICITY',
      value: 12,
      suffix: ' Key Regions',
      desc: 'Stays situated inside rich architectural contexts, reflecting local materials and geographic history.',
    },
    {
      num: '03',
      label: 'UNCOMPROMISING CALM',
      value: 98,
      suffix: '% Silence',
      desc: 'Curated properties designed for deep peace, featuring acoustic mastery and low density layouts.',
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-luxury-gray-dark border-t border-b border-neutral-200 dark:border-neutral-850 select-none transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
        
        {/* Section Header with Fade-In-Up Entry */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-xl text-left mb-16 space-y-4"
        >
          <span className="text-[9px] font-bold tracking-[0.3em] text-neutral-400 uppercase">
            WHY ROAM RESERVE
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl text-neutral-900 dark:text-white leading-tight font-light">
            Sovereign quiet, engineered by architectural precision.
          </h2>
        </motion.div>

        {/* Stats Grid with Staggered Fade-In-Up & Interactive Hover Lift */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-16">
          {statsList.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: idx * 0.2, ease: 'easeOut' }}
              className="space-y-4 flex flex-col justify-start text-left group hover:-translate-y-1 transition-all duration-500 ease-out cursor-default"
            >
              {/* Large Index Number */}
              <div className="text-[10px] font-bold tracking-[0.25em] text-neutral-300 dark:text-neutral-600 font-sans border-b border-neutral-100 dark:border-neutral-800 pb-3 transition-colors duration-300 group-hover:text-neutral-600 dark:group-hover:text-neutral-400 group-hover:border-neutral-300 dark:group-hover:border-neutral-700">
                {stat.num}
              </div>

              {/* Title & Stats Value */}
              <div className="space-y-2">
                <h3 className="text-[10px] font-extrabold tracking-[0.2em] text-neutral-850 dark:text-neutral-250 font-sans transition-colors duration-300 group-hover:text-neutral-950 dark:group-hover:text-white">
                  {stat.label}
                </h3>
                <div className="text-xl font-light font-editorial text-neutral-900 dark:text-white">
                  <Counter to={stat.value} suffix={stat.suffix} />
                </div>
              </div>

              {/* Description (subtle contrast sharpening on hover) */}
              <p className="text-xs text-neutral-400 dark:text-neutral-500 font-light leading-relaxed font-sans transition-colors duration-300 group-hover:text-neutral-600 dark:group-hover:text-neutral-400">
                {stat.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
