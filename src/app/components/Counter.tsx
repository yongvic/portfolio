// src/app/components/Counter.tsx
'use client';

import { useEffect, useRef } from 'react';
import { animate } from 'framer-motion';

interface CounterProps {
  from?: number;
  to: number;
}

const Counter: React.FC<CounterProps> = ({ from = 0, to }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const controls = animate(from, to, {
      duration: 2,
      ease: 'easeOut',
      onUpdate(value) {
        // Ajoute un '+' et formate le nombre si nécessaire
        node.textContent = `+${Math.round(value).toLocaleString()}`;
      },
    });

    return () => controls.stop();
  }, [from, to]);

  return <span ref={nodeRef} />;
};

export default Counter;