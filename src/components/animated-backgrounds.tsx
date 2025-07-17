
'use client';

import React, { useEffect, useState } from 'react';
import type { Animation } from '@/lib/types';

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
    'gradient': MovingGradientAnimation,
    'stars': ShootingStarsAnimation,
    'waves': WavingLinesAnimation,
    'particles': GentleParticlesAnimation,
    'grid': SubtleGridAnimation,
  }[animation.value];

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden bg-background">
      {AnimationComponent && <AnimationComponent />}
      <div className="absolute top-0 left-0 w-full h-full bg-background/60" />
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
    }));
    setParticles(newParticles);
  }, [count]);

  return particles;
};

const MovingGradientAnimation = () => (
    <div className="relative w-full h-full">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary via-accent to-secondary animate-gradient-move opacity-60"></div>
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
    const stars = useParticles(20);
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
            `}</style>
        </div>
    );
};

const WavingLinesAnimation = () => (
    <div className="w-full h-full relative overflow-hidden">
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <style jsx>{`
            .wave {
                background: hsl(var(--primary) / 0.2);
                border-radius: 1000% 1000% 0 0;
                position: absolute;
                width: 200%;
                height: 12em;
                animation: wave-move 15s ease-in-out infinite;
                transform: translate3d(0, 0, 0);
                opacity: 0.8;
                bottom: 0;
                left: 0;
            }
            .wave:nth-of-type(2) {
                bottom: -1.25em;
                animation: wave-move 18s cubic-bezier(0.55, 0.5, 0.45, 0.5) -1s infinite;
                background: hsl(var(--accent) / 0.2);
            }
            .wave:nth-of-type(3) {
                bottom: -2.5em;
                animation: wave-move 20s cubic-bezier(0.55, 0.5, 0.45, 0.5) -2s infinite;
                background: hsl(var(--secondary) / 0.2);
            }
            @keyframes wave-move {
                0% { transform: translateX(-50%); }
                50% { transform: translateX(0%); }
                100% { transform: translateX(-50%); }
            }
        `}</style>
    </div>
);


const GentleParticlesAnimation = () => {
    const particles = useParticles(100);
    return (
        <div className="w-full h-full">
            {particles.map((p, i) => (
                <div
                    key={i}
                    className="absolute bg-primary/80 rounded-full"
                    style={{
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        left: p.left,
                        top: p.top,
                        animation: `particle-drift ${p.animationDuration} linear infinite`,
                        animationDelay: p.animationDelay,
                    }}
                />
            ))}
            <style jsx>{`
                @keyframes particle-drift {
                    from { transform: translate(0, 0) rotate(0deg); }
                    50% { transform: translate(calc(var(--random-x) * 1px), calc(var(--random-y) * 1px)) rotate(180deg); opacity: 0.5; }
                    to { transform: translate(0, 0) rotate(360deg); }
                }

                div > div {
                    --random-x: ${Math.random() * 400 - 200};
                    --random-y: ${Math.random() * 400 - 200};
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
                background-size: 60px 60px;
                animation: pulse-grid 8s ease-in-out infinite;
            }

            @keyframes pulse-grid {
                0% { opacity: 0.6; transform: scale(1); }
                50% { opacity: 1; transform: scale(1.02); }
                100% { opacity: 0.6; transform: scale(1); }
            }
        `}</style>
    </div>
);
