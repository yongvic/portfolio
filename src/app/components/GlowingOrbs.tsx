// src/app/components/GlowingOrbs.tsx
import React from 'react';

const GlowingOrbs = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
      <div className="absolute w-[500px] h-[500px] bg-brand-mauve rounded-full filter blur-3xl opacity-20 animate-orb-1"></div>
      <div className="absolute w-[450px] h-[450px] bg-brand-pink rounded-full filter blur-3xl opacity-20 animate-orb-2"></div>
      <div className="absolute w-[400px] h-[400px] bg-accent-violet rounded-full filter blur-3xl opacity-10 animate-orb-3"></div>
      <div className="absolute w-[350px] h-[350px] bg-brand-purple-light rounded-full filter blur-3xl opacity-20 animate-orb-4"></div>
      <div className="absolute w-[300px] h-[300px] bg-brand-mauve rounded-full filter blur-3xl opacity-10 animate-orb-5"></div>
      <div className="absolute w-[250px] h-[250px] bg-brand-pink rounded-full filter blur-3xl opacity-20 animate-orb-6"></div>
      <div className="absolute w-[200px] h-[200px] bg-accent-violet rounded-full filter blur-3xl opacity-10 animate-orb-7"></div>
    </div>
  );
};

export default GlowingOrbs;
