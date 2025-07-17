'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export const AnimatedBackground = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  
  const particleCount = 50;
  const particles = Array.from({ length: particleCount });

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden bg-background">
      {particles.map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-primary/20"
          style={{
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `move ${Math.random() * 20 + 10}s linear infinite`,
            animationDelay: `${Math.random() * -30}s`,
            opacity: Math.random() * 0.5 + 0.1,
          }}
        />
      ))}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-background/80 via-transparent to-background/80" />
      <style jsx>{`
        @keyframes move {
          0% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px);
          }
          100% {
            transform: translate(0, 0);
          }
        }
      `}</style>
    </div>
  );
};
