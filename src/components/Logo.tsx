
import React from 'react';
import { Star } from 'lucide-react';

const Logo = () => {
  return (
    <div className="flex items-center space-x-2">
      <div className="relative">
        <Star className="h-8 w-8 text-neon-yellow animate-glow-pulse" />
        <div className="absolute inset-0 bg-neon-yellow/20 blur-lg rounded-full"></div>
      </div>
      <span className="font-display text-xl font-bold tracking-wider gradient-text-yellow">ClimbUp</span>
    </div>
  );
};

export default Logo;
