'use client';

import { useEffect, useState } from 'react';

export const BlogProgress = () => {
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const calculatePercentage = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const percentage = (scrolled / total) * 100;
      setReadingProgress(percentage);
    };

    window.addEventListener('scroll', calculatePercentage);
    return () => window.removeEventListener('scroll', calculatePercentage);
  }, []);

  return (
    <div
      data-testid="reading-progress"
      className="fixed z-10 top-13 md:top-0 h-1 bg-primary border-none appearance-none left-0 w-full opacity-60 md:opacity-100"
      style={{ width: `${readingProgress}%` }}
    />
  );
};
