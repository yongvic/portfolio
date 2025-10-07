'use client';

import React, { useEffect, useState } from 'react';

interface Bubble {
  id: number;
  style: React.CSSProperties;
  className: string;
}

const AnimatedBubbles = () => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    const newBubbles: Bubble[] = Array.from({ length: 25 }).map((_, i) => {
      const size = Math.random() * 4 + 1; // Bubbles between 1rem and 5rem
      const duration = Math.random() * 20 + 15; // 15s to 35s
      const delay = Math.random() * 10; // 0s to 10s
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const colors = ['bg-brand-pink/10', 'bg-accent-violet/10', 'bg-brand-mauve/10'];
      const color = colors[Math.floor(Math.random() * colors.length)];

      return {
        id: i,
        style: {
          width: `${size}rem`,
          height: `${size}rem`,
          left: `${x}vw`,
          top: `${y}vh`,
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
        },
        className: `absolute rounded-full filter blur-sm animate-float ${color}`,
      };
    });
    setBubbles(newBubbles);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className={bubble.className}
          style={bubble.style}
        />
      ))}
    </div>
  );
};

export default AnimatedBubbles;
