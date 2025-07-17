
'use client';

import React, { useEffect, useState } from 'react';
import type { Animation } from '@/lib/types';
import { Github, Gitlab, Linkedin, Code, Bot, BrainCircuit, Database } from 'lucide-react';

interface AnimatedBackgroundsProps {
  animation: Animation;
}

const ICONS = [Github, Gitlab, Linkedin, Code, Bot, BrainCircuit, Database];

export const AnimatedBackgrounds = ({ animation }: AnimatedBackgroundsProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || animation.value === 'off') {
    return null;
  }

  const AnimationComponent = {
    'gradient': MovingGradientAnimation,
    'stars': ShootingStarsAnimation,
    'particles': GentleParticlesAnimation,
    'grid': SubtleGridAnimation,
    'icons': FloatingIconsAnimation,
    'matrix': MatrixRainAnimation,
  }[animation.value];

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden bg-background">
      {AnimationComponent && <AnimationComponent />}
      <div className="absolute top-0 left-0 w-full h-full bg-background/50" />
    </div>
  );
};

const useParticles = (count: number) => {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: count }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 50 + 50}s`,
      animationDelay: `-${Math.random() * 100}s`,
      size: Math.random() * 2.5 + 1,
      randomX: Math.random() * 400 - 200,
      randomY: Math.random() * 400 - 200,
    }));
    setParticles(newParticles);
  }, [count]);

  return particles;
};

const MovingGradientAnimation = () => (
    <div className="relative w-full h-full">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary via-accent to-secondary animate-gradient-move opacity-75"></div>
        <style jsx>{`
            @keyframes gradient-move {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
            .animate-gradient-move {
                background-size: 200% 200%;
                animation: gradient-move 15s ease infinite;
            }
        `}</style>
    </div>
);

const ShootingStarsAnimation = () => {
    const stars = useParticles(30);
    return (
        <div className="w-full h-full overflow-hidden">
            {stars.map((star, i) => (
                <div
                    key={i}
                    className="absolute bg-primary rounded-full animate-star-fall"
                    style={{
                        top: '-10px',
                        left: `${Math.random() * 100}%`,
                        width: `${star.size}px`,
                        height: `${star.size}px`,
                        animationDelay: `${Math.random() * 10}s`,
                        animationDuration: `${Math.random() * 2 + 1}s`,
                    }}
                ></div>
            ))}
            <style jsx>{`
                @keyframes star-fall {
                    from { transform: translateY(0) translateX(0) scale(1); opacity: 1; }
                    to { transform: translateY(100vh) translateX(-100vw) scale(0.5); opacity: 0; }
                }
                .animate-star-fall {
                    animation-name: star-fall;
                    animation-timing-function: linear;
                    animation-iteration-count: infinite;
                    opacity: 0.9;
                }
            `}</style>
        </div>
    );
};

const GentleParticlesAnimation = () => {
    const particles = useParticles(150);
    return (
        <div className="w-full h-full">
            {particles.map((p, i) => (
                <div
                    key={i}
                    className="absolute bg-primary/90 rounded-full"
                    style={{
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        left: p.left,
                        top: p.top,
                        animation: `particle-drift ${p.animationDuration} linear infinite`,
                        animationDelay: p.animationDelay,
                        '--random-x': `${p.randomX}px`,
                        '--random-y': `${p.randomY}px`,
                    } as React.CSSProperties}
                />
            ))}
            <style jsx>{`
                @keyframes particle-drift {
                    from { transform: translate(0, 0) rotate(0deg); }
                    50% { transform: translate(var(--random-x), var(--random-y)) rotate(180deg); opacity: 0.8; }
                    to { transform: translate(0, 0) rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

const SubtleGridAnimation = () => (
    <div className="w-full h-full">
        <div className="grid-bg"></div>
        <style jsx>{`
            .grid-bg {
                width: 100%;
                height: 100%;
                background-image:
                    linear-gradient(to right, hsl(var(--border) / 1) 1px, transparent 1px),
                    linear-gradient(to bottom, hsl(var(--border) / 1) 1px, transparent 1px);
                background-size: 50px 50px;
                animation: pulse-grid 8s ease-in-out infinite;
            }

            @keyframes pulse-grid {
                0% { opacity: 1; transform: scale(1); }
                50% { opacity: 1; transform: scale(1.01); }
                100% { opacity: 1; transform: scale(1); }
            }
        `}</style>
    </div>
);


const FloatingIconsAnimation = () => {
  const icons = useParticles(35);
  return (
    <div className="w-full h-full">
      {icons.map((icon, i) => {
        const IconComponent = ICONS[i % ICONS.length];
        return (
          <div
            key={i}
            className="absolute text-primary/80"
            style={{
              left: icon.left,
              top: icon.top,
              animation: `particle-drift ${icon.animationDuration} linear infinite`,
              animationDelay: icon.animationDelay,
              '--random-x': `${icon.randomX}px`,
              '--random-y': `${icon.randomY}px`,
            } as React.CSSProperties}
          >
            <IconComponent style={{ width: `${icon.size * 10}px`, height: `${icon.size * 10}px` }}/>
          </div>
        );
      })}
       <style jsx>{`
            @keyframes particle-drift {
                from { transform: translate(0, 0) rotate(0deg); }
                50% { transform: translate(var(--random-x), var(--random-y)) rotate(180deg); opacity: 0.6; }
                to { transform: translate(0, 0) rotate(360deg); }
            }
        `}</style>
    </div>
  );
};

const MatrixRainAnimation = () => {
    const drops = useParticles(60);
    return (
      <div className="w-full h-full overflow-hidden">
        {drops.map((drop, i) => {
           const IconComponent = ICONS[i % ICONS.length];
           return (
            <div
                key={i}
                className="absolute text-primary animate-matrix-fall"
                style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${Math.random() * 3 + 2}s`,
                    fontSize: `${Math.random() * 16 + 12}px`,
                }}
            >
                <IconComponent />
            </div>
           )
        })}
        <style jsx>{`
            @keyframes matrix-fall {
                from { transform: translateY(-10vh); opacity: 1; }
                to { transform: translateY(110vh); opacity: 0.8; }
            }
            .animate-matrix-fall {
                animation-name: matrix-fall;
                animation-timing-function: linear;
                animation-iteration-count: infinite;
            }
        `}</style>
      </div>
    );
};


