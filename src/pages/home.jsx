import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../components/hero';
import Carousel from '../components/carousel';
import EatCodeRepeat from '../components/EatCodeRepeat';
import ProjectShowcase from '../components/ProjectsShowcase';

const Home = () => {
  return (
    <main className="min-h-screen bg-black font-mono relative">
      {/* Hero Section */}
      <HeroSection />

      {/* Events Section */}
      <section className="relative py-24 border-t border-white/20 bg-black">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="text-sm text-white/50 mb-4">
              $ cat /events/README.md
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white uppercase  tracking-wider mb-4">
              OUR_EVENTS
            </h2>
            <p className="text-white/50">
              WORKSHOPS // BOOTCAMPS // HACKATHONS
            </p>
          </motion.div>

          {/* Carousel */}
          <Carousel />
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-white/20" />

      {/* Projects Section */}
      <ProjectShowcase />

      {/* Divider */}
      <div className="border-t border-white/20" />

      {/* Eat Code Repeat */}
      <EatCodeRepeat />
    </main>
  );
};

export default Home;
