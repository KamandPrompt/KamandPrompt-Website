import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Terminal, ExternalLink, ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getProjects } from '../api';

gsap.registerPlugin(ScrollTrigger);

const ProjectShowcase = () => {
  const [projects, setProjects] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects data:', error);
      }
    };
    fetchData();
  }, []);

  // GSAP ScrollTrigger for section animations
  useEffect(() => {
    if (!containerRef.current || projects.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.project-item',
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        '.projects-title',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [projects]);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section
      ref={containerRef}
      className="relative py-32 overflow-hidden bg-black font-mono"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="projects-title mb-16">
          <div className="flex items-center gap-4 mb-6">
            <Terminal className="w-5 h-5 text-white/40" />
            <span className="text-sm text-white/40 uppercase tracking-widest">
              $ ls /projects
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold text-white uppercase tracking-tight mb-4">
            OUR PROJECTS
          </h2>
          <p className="text-white/40 text-lg max-w-xl">
            Open source contributions from the programming club
          </p>
        </div>

        {/* Projects List */}
        <div className="space-y-0">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-item border-t border-white/10"
            >
              {/* Main Row - Clickable */}
              <button
                onClick={() => toggleExpand(index)}
                className="w-full py-6 hover:bg-white/5 transition-colors text-left"
              >
                <div className="flex items-center justify-between">
                  {/* Left: Number + Title */}
                  <div className="flex items-center gap-6">
                    <span className="text-sm text-white/20 font-mono w-8">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-xl md:text-3xl font-bold text-white/70 hover:text-white uppercase tracking-wide transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  {/* Right: GitHub + Expand */}
                  <div className="flex items-center gap-4">
                    <a
                      href={project.Link || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 text-white/30 hover:text-white transition-colors"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    <ChevronDown
                      className={`w-5 h-5 text-white/30 transition-transform duration-300 ${expandedIndex === index ? 'rotate-180' : ''
                        }`}
                    />
                  </div>
                </div>
              </button>

              {/* Expanded Content */}
              <AnimatePresence>
                {expandedIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pb-6 pl-14 pr-4">
                      <p className="text-white/50 text-sm md:text-base max-w-3xl leading-relaxed">
                        {project.description || 'No description available.'}
                      </p>
                      <a
                        href={project.Link || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-4 text-sm text-white/60 hover:text-white transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View on GitHub
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* View All */}
        <div className="mt-12 pt-6 border-t border-white/10">
          <a
            href="https://github.com/KamandPrompt"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-white/50 hover:text-white transition-colors"
          >
            <Github className="w-4 h-4" />
            <span className="text-sm uppercase tracking-wider">View all on GitHub</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcase;
