import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { getEvents, getAssetUrl } from '../api';



const ModernCarousel = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEvents()
      .then(data => {
        const homeSlides = data.events
          .filter(event => event.home)
          .map(event => ({
            url: getAssetUrl(event.image),
            title: event.title,
            description: event.description,
            index: event.index
          }));
        setSlides(homeSlides);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load carousel data:', err);
        setLoading(false);
      });
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const dragX = useMotionValue(0);
  const containerRef = useRef(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (!isAutoPlaying || isDragging) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, isDragging, nextSlide]);

  // Drag handling
  const handleDragEnd = (e, { offset, velocity }) => {
    setIsDragging(false);
    const swipe = offset.x;

    if (swipe < -100 || velocity.x < -500) {
      nextSlide();
    } else if (swipe > 100 || velocity.x > 500) {
      prevSlide();
    }
  };

  // Progress calculation
  const progress = ((currentIndex + 1) / slides.length) * 100;

  // Slide variants for 3D effect
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      scale: 0.9,
      opacity: 0,
      rotateY: direction > 0 ? 15 : -15,
    }),
    center: {
      x: 0,
      scale: 1,
      opacity: 1,
      rotateY: 0,
      transition: {
        duration: 0.6,
        ease: [0.32, 0.72, 0, 1],
      },
    },
    exit: (direction) => ({
      x: direction < 0 ? '100%' : '-100%',
      scale: 0.9,
      opacity: 0,
      rotateY: direction < 0 ? 15 : -15,
      transition: {
        duration: 0.6,
        ease: [0.32, 0.72, 0, 1],
      },
    }),
  };

  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection) => {
    if (newDirection === 1) {
      setPage([page + 1, 1]);
      nextSlide();
    } else {
      setPage([page - 1, -1]);
      prevSlide();
    }
  };

  if (loading || slides.length === 0) return null;

  return (
    <div className="relative w-full max-w-6xl mx-auto font-mono">
      {/* Progress Bar */}
      <div className="absolute -top-8 left-0 right-0 h-[1px] bg-white/10">
        <motion.div
          className="h-full bg-white"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Main Container */}
      <div
        ref={containerRef}
        className="group relative aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-black"
        style={{ perspective: '1200px' }}
      >
        {/* Slides */}
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Image */}
            <img
              src={slides[currentIndex].url}
              alt={slides[currentIndex].title}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              draggable={false}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-6xl md:text-8xl font-bold text-white/20">
                    {slides[currentIndex].index}
                  </span>
                  <div className="w-16 h-[1px] bg-white/30" />
                </div>
                <h3 className="text-4xl md:text-6xl font-bold text-white uppercase tracking-wider mb-2">
                  {slides[currentIndex].title}
                </h3>
                <p className="text-lg text-white/60">
                  {slides[currentIndex].description}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={() => paginate(-1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center border border-white/20 text-white/40 hover:text-white hover:border-white/60 hover:bg-white/5 transition-all z-10"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => paginate(1)}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center border border-white/20 text-white/40 hover:text-white hover:border-white/60 hover:bg-white/5 transition-all z-10"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Play/Pause */}
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center border border-white/20 text-white/40 hover:text-white hover:border-white/60 transition-all z-10"
        >
          {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="flex justify-center items-center gap-6 mt-6">
        {slides.map((slide, index) => (
          <button
            key={index}
            onClick={() => {
              setPage([index, index > currentIndex ? 1 : -1]);
              setCurrentIndex(index);
            }}
            className="group relative"
          >
            <span className={`text-sm font-mono transition-all ${currentIndex === index ? 'text-white' : 'text-white/30 hover:text-white/60'
              }`}>
              {slide.index}
            </span>
            {currentIndex === index && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute -bottom-2 left-0 right-0 h-[2px] bg-white"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ModernCarousel;