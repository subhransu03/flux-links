
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

  const AnimationComponent = {
    'floating-tech': FloatingTechAnimation,
    'floating-ui': FloatingUIAnimation,
    'matrix': MatrixAnimation,
    'bubbles': BubblesAnimation,
  }[animation.value];

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden bg-background">
      {AnimationComponent && <AnimationComponent />}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-background via-background/50 to-background" />
    </div>
  );
};

const useParticles = (count: number) => {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: count }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 40 + 20}s`,
      animationDelay: `${Math.random() * -60}s`,
      size: Math.random() * 40 + 20,
      translateX1: Math.random() * 200 - 100,
      translateY1: Math.random() * 200 - 100,
      rotate1: Math.random() * 90,
      translateX2: Math.random() * 200 - 100,
      translateY2: Math.random() * 200 - 100,
      rotate2: Math.random() * 180,
      translateX3: Math.random() * 200 - 100,
      translateY3: Math.random() * 200 - 100,
      rotate3: Math.random() * 270,
    }));
    setParticles(newParticles);
  }, [count]);

  return particles;
};


const FloatingTechAnimation = () => {
  const icons: React.FC<LucideProps>[] = [Code, GitBranch, Bot, Puzzle, Link2, FolderGit2, AtSign, Globe, Gamepad2, PenTool];
  const particles = useParticles(30);

  return (
    <>
      {particles.map((p, i) => {
        const Icon = icons[i % icons.length];
        const style = {
          left: p.left,
          top: p.top,
          animation: `drift-${i} ${p.animationDuration} linear infinite`,
          animationDelay: p.animationDelay,
        };
        return (
          <React.Fragment key={i}>
            <div
              className="absolute text-primary/20"
              style={style}
            >
              <Icon size={p.size} strokeWidth={1} />
            </div>
            <style>{`
              @keyframes drift-${i} {
                0% { transform: translate(0, 0) rotate(0deg); }
                25% { transform: translate(${p.translateX1}px, ${p.translateY1}px) rotate(${p.rotate1}deg); }
                50% { transform: translate(${p.translateX2}px, ${p.translateY2}px) rotate(${p.rotate2}deg); }
                75% { transform: translate(${p.translateX3}px, ${p.translateY3}px) rotate(${p.rotate3}deg); }
                100% { transform: translate(0, 0) rotate(360deg); }
              }
            `}</style>
          </React.Fragment>
        );
      })}
    </>
  );
};

const FloatingUIAnimation = () => {
    const particles = useParticles(40);
    return (
      <>
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute bg-primary/10 backdrop-blur-sm"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: p.left,
              top: p.top,
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
    const columns = useParticles(50);
    return (
      <div className="flex justify-between">
        {columns.map((p, i) => (
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
    const particles = useParticles(50);
    return (
      <>
        {particles.map((p, i) => (
           <React.Fragment key={i}>
            <div
              className="absolute bg-primary/20 rounded-full"
              style={{
                width: `${p.size}px`,
                height: `${p.size}px`,
                left: p.left,
                bottom: '-50px',
                animation: `bubble-rise-${i} ${Math.random() * 20 + 10}s linear infinite`,
                animationDelay: `${p.animationDelay}`,
              }}
            />
             <style>{`
              @keyframes bubble-rise-${i} {
                0% {
                  transform: translateY(0) translateX(0);
                  opacity: 1;
                }
                50% {
                    transform: translateX(${p.translateX1}px);
                }
                100% {
                  transform: translateY(-120vh) translateX(${p.translateX2}px);
                  opacity: 0;
                }
              }
            `}</style>
          </React.Fragment>
        ))}
      </>
    );
};
