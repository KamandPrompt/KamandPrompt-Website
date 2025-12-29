import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Terminal, Code2, Users, Trophy } from 'lucide-react';
import MagneticButton from './MagneticButton';

const HeroSection = () => {
  const containerRef = useRef(null);

  // Smooth mouse tracking for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // Parallax transforms
  const orbX = useTransform(smoothX, [-500, 500], [-30, 30]);
  const orbY = useTransform(smoothY, [-500, 500], [-30, 30]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      mouseX.set(clientX - centerX);
      mouseY.set(clientY - centerY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const stats = [
    { icon: Users, value: '50+', label: 'MEMBERS' },
    { icon: Trophy, value: '15+', label: 'GSOC' },
    { icon: Code2, value: '20+', label: 'PROJECTS' },
  ];



  // Counter animation for stats
  const AnimatedCounter = ({ value }) => {
    const [count, setCount] = useState(0);
    const numericValue = parseInt(value);
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => setIsVisible(entry.isIntersecting),
        { threshold: 0.5 }
      );
      if (ref.current) observer.observe(ref.current);
      return () => observer.disconnect();
    }, []);

    useEffect(() => {
      if (isVisible) {
        let start = 0;
        const duration = 800;
        const startTime = performance.now();

        const animate = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeProgress = 1 - Math.pow(1 - progress, 4);
          setCount(Math.floor(easeProgress * numericValue));

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };

        requestAnimationFrame(animate);
      }
    }, [isVisible, numericValue]);

    return <span ref={ref}>{count}+</span>;
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-black"
    >
      {/* Animated Gradient Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
          x: orbX,
          y: orbY,
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
          x: useTransform(orbX, v => -v * 0.5),
          y: useTransform(orbY, v => -v * 0.5),
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Terminal Prompt */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 border border-white/20 mb-8 font-mono text-sm text-white/60"
        >
          <Terminal className="w-4 h-4" />
          <span>$ cd /iit-mandi/programming-club</span>
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
          >
            █
          </motion.span>
        </motion.div>

        {/* Main Title */}
        <div className="mb-8">
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-bold text-white uppercase tracking-tighter leading-none">
            KAMAND
          </h1>
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-bold text-white uppercase tracking-tighter leading-none">
            PROMPT
          </h1>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="text-lg sm:text-xl md:text-2xl text-white/50 max-w-2xl mx-auto mb-12 font-mono"
        >
          THE PROGRAMMING CLUB @ IIT MANDI
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          role="group"
          aria-label="Call to action buttons"
        >
          <MagneticButton
            onClick={() => window.open('https://www.instagram.com/kamandprompt/', '_blank')}
            className="group px-8 py-4 bg-white text-black font-bold uppercase tracking-wider hover:bg-white/90 transition-colors flex items-center gap-2"
            aria-label="Join Kamand Prompt on Instagram"
          >
            $ ./join.sh
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </MagneticButton>
          <MagneticButton
            onClick={() => window.open('https://github.com/KamandPrompt', '_blank')}
            className="px-8 py-4 border-2 border-white/50 text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-all"
            aria-label="View projects on GitHub"
          >
            $ cat projects
          </MagneticButton>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.05, borderColor: 'rgba(255,255,255,0.8)' }}
              className="border border-white/20 p-4 sm:p-6 transition-all duration-300 group cursor-default"
            >
              <stat.icon className="w-6 h-6 mx-auto mb-2 text-white/40 group-hover:text-white transition-colors" />
              <div className="text-2xl sm:text-4xl font-bold text-white mb-1 font-mono">
                <AnimatedCounter value={stat.value} />
              </div>
              <div className="text-xs sm:text-sm text-white/40 uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>


    </section>
  );
};

export default HeroSection;