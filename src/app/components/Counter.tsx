'use client';

import { useEffect, useRef } from 'react';
// CORRECTION : On importe 'useInView' en plus de 'animate'
import { animate, useInView } from 'framer-motion';

interface CounterProps {
  from?: number;
  to: number;
}

const Counter: React.FC<CounterProps> = ({ from = 0, to }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);

  //  Utilisation du hook useInView
  // Ce hook prend une référence à un élément et retourne `true` si cet élément est visible à l'écran.
  // L'option `once: true` est très importante : elle garantit que l'animation ne se déclenchera qu'une seule fois.
  const isInView = useInView(nodeRef, { once: true });

  // L'animation est maintenant déclenchée par `isInView`
  useEffect(() => {
    // On vérifie si l'élément est bien visible avant de lancer l'animation
    if (isInView) {
      const node = nodeRef.current;
      if (!node) return;

      const controls = animate(from, to, {
        duration: 2,
        ease: 'easeOut',
        onUpdate(value) {
          // La logique de mise à jour 
          node.textContent = `+${Math.round(value).toLocaleString()}`;
        },
      });

      // La fonction de nettoyage pour arrêter l'animation est toujours là, c'est une bonne pratique.
      return () => controls.stop();
    }
  }, [from, to, isInView]); // On ajoute `isInView` aux dépendances du useEffect

  // L'élément JSX est le même, mais il est maintenant observé par le hook useInView
  return <span ref={nodeRef} />;
};

export default Counter;