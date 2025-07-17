'use client';

import React, { useEffect, useState } from 'react';
import type { Animation } from '@/lib/types';
import { AtSign, Bot, Code, FolderGit2, Gamepad2, GitBranch, Globe, Link2, LucideProps, PenTool, Puzzle } from 'lucide-react';

interface AnimatedBackgroundsProps {
  animation: Animation;
}

export const AnimatedBackgrounds = ({ animation }: AnimatedBackgroundsProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || animation.value === 'off') {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden bg-background">
      {animation.value === 'floating-tech' && <FloatingTechAnimation />}
      {animation.value === 'floating-ui' && <FloatingUIAnimation />}
      {animation.value === 'matrix' && <MatrixAnimation />}
      {animation.value === 'bubbles' && <BubblesAnimation />}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-background via-background/50 to-background" />
    </div>
  );
};

const FloatingTechAnimation = () => {
  const icons: React.FC<LucideProps>[] = [Code, GitBranch, Bot, Puzzle, Link2, FolderGit2, AtSign, Globe, Gamepad2, PenTool];
  const particles = Array.from({ length: 30 });
  return (
    <>
      {particles.map((_, i) => {
        const Icon = icons[i % icons.length];
        return (
          <div
            key={i}
            className="absolute text-primary/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `drift ${Math.random() * 40 + 20}s linear infinite`,
              animationDelay: `${Math.random() * -60}s`,
            }}
          >
            <Icon size={Math.random() * 40 + 20} strokeWidth={1} />
          </div>
        );
      })}
      <style jsx>{`
        @keyframes drift {
          0% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) rotate(${Math.random() * 90}deg); }
          50% { transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) rotate(${Math.random() * 180}deg); }
          75% { transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) rotate(${Math.random() * 270}deg); }
          100% { transform: translate(0, 0) rotate(360deg); }
        }
      `}</style>
    </>
  );
};

const FloatingUIAnimation = () => {
    const particles = Array.from({ length: 40 });
    return (
      <>
        {particles.map((_, i) => (
          <div
            key={i}
            className="absolute bg-primary/10 backdrop-blur-sm"
            style={{
              width: `${Math.random() * 80 + 20}px`,
              height: `${Math.random() * 80 + 20}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              borderRadius: `${Math.random() * 50 + 10}%`,
              animation: `float-ui ${Math.random() * 30 + 15}s ease-in-out infinite`,
              animationDelay: `${Math.random() * -45}s`,
            }}
          />
        ))}
        <style jsx>{`
          @keyframes float-ui {
            0% { transform: translateY(0) rotate(0deg); opacity: 0; }
            50% { opacity: 0.7; }
            100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
          }
        `}</style>
      </>
    );
  };

const MatrixAnimation = () => {
    const icons: React.FC<LucideProps>[] = [Code, GitBranch, Link2, AtSign, Puzzle];
    const columns = Array.from({ length: 50 });
    return (
      <div className="flex justify-between">
        {columns.map((_, i) => (
          <div
            key={i}
            className="flex flex-col"
            style={{
              animation: `fall ${Math.random() * 10 + 5}s linear infinite`,
              animationDelay: `${Math.random() * -15}s`,
            }}
          >
            {Array.from({ length: 30 }).map((_, j) => {
                const Icon = icons[Math.floor(Math.random() * icons.length)];
                return <Icon key={j} className="text-primary/70 my-2" size={20} strokeWidth={1.5}/>
            })}
          </div>
        ))}
        <style jsx>{`
            @keyframes fall {
                from { transform: translateY(-100vh); }
                to { transform: translateY(100vh); }
            }
        `}</style>
      </div>
    );
  };

const BubblesAnimation = () => {
    const particles = Array.from({ length: 50 });
    return (
      <>
        {particles.map((_, i) => (
          <div
            key={i}
            className="absolute bg-primary/20 rounded-full"
            style={{
              width: `${Math.random() * 40 + 10}px`,
              height: `${Math.random() * 40 + 10}px`,
              left: `${Math.random() * 100}%`,
              bottom: '-50px',
              animation: `bubble-rise ${Math.random() * 20 + 10}s linear infinite`,
              animationDelay: `${Math.random() * -30}s`,
            }}
          />
        ))}
        <style jsx>{`
          @keyframes bubble-rise {
            0% {
              transform: translateY(0) translateX(0);
              opacity: 1;
            }
            50% {
                transform: translateX(${Math.random() * 100 - 50}px);
            }
            100% {
              transform: translateY(-120vh) translateX(${Math.random() * 200 - 100}px);
              opacity: 0;
            }
          }
        `}</style>
      </>
    );
};
