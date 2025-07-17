
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
    'aurora': AuroraAnimation,
    'particles': GentleParticlesAnimation,
    'grid': SubtleGridAnimation,
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
      size: Math.random() * 2 + 1,
    }));
    setParticles(newParticles);
  }, [count]);

  return particles;
};

const AuroraAnimation = () => (
    <div className="relative w-full h-full opacity-70">
        <div className="aurora__item"></div>
        <div className="aurora__item"></div>
        <div className="aurora__item"></div>
        <div className="aurora__item"></div>
        <style jsx>{`
            .aurora__item {
                position: absolute;
                top: 50%;
                left: 50%;
                width: 140vmax;
                height: 140vmax;
                border-radius: 9999px;
                mix-blend-mode: screen;
                animation: aurora-move 12s infinite linear;
                filter: blur(80px);
            }
            .aurora__item:nth-of-type(1) {
                background: hsl(var(--primary) / 0.4);
                animation-duration: 12s;
            }
            .aurora__item:nth-of-type(2) {
                background: hsl(var(--accent) / 0.4);
                animation-duration: 15s;
            }
            .aurora__item:nth-of-type(3) {
                background: hsl(var(--secondary) / 0.4);
                animation-duration: 18s;
            }
             .aurora__item:nth-of-type(4) {
                background: hsl(var(--foreground) / 0.2);
                animation-duration: 21s;
            }

            @keyframes aurora-move {
                0% { transform: translate(-50%, -50%) rotate(0deg) scale(1); }
                50% { transform: translate(-50%, -50%) rotate(180deg) scale(1.2); }
                100% { transform: translate(-50%, -50%) rotate(360deg) scale(1); }
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
                    className="absolute bg-primary/70 rounded-full"
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
                    from { transform: translate(0, 0); }
                    to { transform: translate(calc(var(--random-x) * 1px), calc(var(--random-y) * 1px)); }
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
                    linear-gradient(to right, hsl(var(--border) / 0.8) 1px, transparent 1px),
                    linear-gradient(to bottom, hsl(var(--border) / 0.8) 1px, transparent 1px);
                background-size: 50px 50px;
                animation: pulse-grid 10s ease-in-out infinite;
            }

            @keyframes pulse-grid {
                0% { opacity: 0.4; }
                50% { opacity: 0.8; }
                100% { opacity: 0.4; }
            }
        `}</style>
    </div>
);
