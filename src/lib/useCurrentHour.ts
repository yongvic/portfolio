import { useState, useEffect } from 'react';

export const useCurrentTime = () => {
  const [timeChars, setTimeChars] = useState<string[]>('--:--:--'.split(''));

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      const newTime = now.toLocaleTimeString([], options);

      const newChars = newTime.split('');

      // On force le re-render avec les nouveaux caractères
      setTimeChars(newChars);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return { timeChars };
};
