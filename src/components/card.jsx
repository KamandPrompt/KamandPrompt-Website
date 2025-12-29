import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Linkedin } from 'lucide-react';
import { cn } from '@/lib/utils';

const TeamCard = ({ imageUrl, name, role, linkedin, instagram, className }) => {
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div
      className={cn(
        "group relative w-full sm:max-w-[200px] md:max-w-[240px] lg:max-w-[280px] overflow-hidden",
        "bg-black border border-white/20",
        "hover:border-white/60 transition-all duration-200",
        "font-mono",
        className
      )}
    >
      {/* Terminal Header */}
      <div className="px-3 py-2 border-b border-white/20 bg-white/5">
        <span className="text-xs text-white/50 tracking-wider">member.sh</span>
      </div>

      {/* Image Container - Fixed, no animation on image itself */}
      <div className="relative aspect-[3/4] overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            loading="lazy"
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300 will-change-transform"
          />
        ) : (
          <div className="w-full h-full bg-white/5 flex items-center justify-center">
            <span className="text-4xl font-bold text-white/30">
              {getInitials(name)}
            </span>
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80" />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        {/* Role */}
        {role && (
          <div className="mb-1 sm:mb-2 text-[10px] sm:text-xs text-white/50 group-hover:text-white/30 uppercase tracking-wider transition-colors duration-300">
            {role}
          </div>
        )}

        {/* Name */}
        <h3 className="text-sm sm:text-base lg:text-lg font-bold text-white group-hover:text-white/60 uppercase tracking-wider mb-2 sm:mb-3 transition-colors duration-300">
          {name}
        </h3>

        {/* Social Links */}
        <div className="flex items-center gap-2">
          {instagram && (
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border border-white/30 text-white/60 hover:text-white hover:border-white transition-all duration-200"
            >
              <Instagram className="w-4 h-4" />
            </a>
          )}
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border border-white/30 text-white/60 hover:text-white hover:border-white transition-all duration-200"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
