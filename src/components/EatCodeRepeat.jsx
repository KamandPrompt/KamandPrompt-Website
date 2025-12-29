import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const EatCodeRepeat = () => {
  const text = "EAT. CODE. REPEAT.";
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.5 });
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  // Typewriter effect
  useEffect(() => {
    if (isInView) {
      setDisplayedText('');
      let currentIndex = 0;

      const typeInterval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typeInterval);
        }
      }, 60);

      return () => clearInterval(typeInterval);
    } else {
      setDisplayedText('');
    }
  }, [isInView]);

  // Blinking cursor
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-32 overflow-hidden bg-black font-mono"
    >
      {/* Top Border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-white/10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 1 : 0 }}
            className="relative inline-block"
          >
            <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white uppercase tracking-tight leading-none whitespace-nowrap">
              {displayedText}
              <span
                className={`inline-block w-[4px] h-[0.8em] bg-white ml-2 align-middle transition-opacity ${showCursor ? 'opacity-100' : 'opacity-0'
                  }`}
              />
            </span>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="mt-8 text-white/30 text-lg tracking-widest uppercase"
          >
            // The Developer Mantra
          </motion.p>
        </div>
      </div>

      {/* Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
    </section>
  );
};

export default EatCodeRepeat;
