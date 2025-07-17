
'use client';

import React, { useEffect, useState } from 'react';
import type { Animation } from '@/lib/types';

interface AnimatedBackgroundsProps {
  animation: Animation;
}

const useParticles = (count: number) => {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: count }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 50 + 40}s`,
      animationDelay: `-${Math.random() * 100}s`,
      size: Math.random() * 3 + 1,
      randomX: Math.random() * 500 - 250,
      randomY: Math.random() * 500 - 250,
    }));
    setParticles(newParticles);
  }, [count]);

  return particles;
};

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
    'particles': GentleParticlesAnimation,
    'spotlight': InteractiveSpotlightAnimation,
    'lines': MovingLinesAnimation,
    'polka': PolkaDotAnimation,
    'cubes': FloatingCubesAnimation,
  }[animation.value];

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden bg-background">
      {AnimationComponent && <AnimationComponent />}
      <div className="absolute top-0 left-0 w-full h-full bg-background/40" />
    </div>
  );
};


const MovingGradientAnimation = () => (
    <div className="relative w-full h-full">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary via-accent to-secondary animate-gradient-move opacity-80"></div>
        <style jsx>{`
            @keyframes gradient-move {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
            .animate-gradient-move {
                background-size: 200% 200%;
                animation: gradient-move 12s ease infinite;
            }
        `}</style>
    </div>
);

const GentleParticlesAnimation = () => {
    const particles = useParticles(200);
    return (
        <div className="w-full h-full">
            {particles.map((p, i) => (
                <div
                    key={i}
                    className="absolute bg-primary/95 rounded-full"
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
                    50% { transform: translate(var(--random-x), var(--random-y)) rotate(180deg); opacity: 0.7; }
                    to { transform: translate(0, 0) rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

const InteractiveSpotlightAnimation = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      className="w-full h-full"
      style={{
        background: `radial-gradient(800px at ${mousePosition.x}px ${mousePosition.y}px, hsl(var(--primary) / 0.25), transparent 80%)`,
      }}
    />
  );
};

const MovingLinesAnimation = () => (
  <div className="w-full h-full">
    <div className="lines-bg"></div>
    <style jsx>{`
      .lines-bg {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        background:
          linear-gradient(45deg, hsl(var(--border) / 0.7) 25%, transparent 25%, transparent 75%, hsl(var(--border) / 0.7) 75%),
          linear-gradient(45deg, hsl(var(--border) / 0.7) 25%, transparent 25%, transparent 75%, hsl(var(--border) / 0.7) 75%);
        background-size: 50px 50px;
        background-position: 0 0, 25px 25px;
        animation: move-lines 3s linear infinite;
      }

      @keyframes move-lines {
        0% {
          background-position: 0 0, 25px 25px;
        }
        100% {
          background-position: 50px 50px, 75px 75px;
        }
      }
    `}</style>
  </div>
);

const PolkaDotAnimation = () => (
    <div className="w-full h-full">
      <div className="polka-bg"></div>
      <style jsx>{`
        .polka-bg {
            width: 100%;
            height: 100%;
            background-image: radial-gradient(hsl(var(--primary) / 0.4) 1.5px, transparent 1.5px);
            background-size: 25px 25px;
            animation: pulse-dots 8s ease-in-out infinite;
        }

        @keyframes pulse-dots {
            0% { opacity: 0.6; }
            50% { opacity: 1; transform: scale(1.05); }
            100% { opacity: 0.6; }
        }
      `}</style>
    </div>
);

const FloatingCubesAnimation = () => {
  const cubes = useParticles(20);
  return (
    <div className="w-full h-full perspective-[1000px]">
      {cubes.map((cube, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: cube.left,
            top: cube.top,
            transformStyle: 'preserve-3d',
            animation: `cube-float ${cube.animationDuration} linear infinite`,
            animationDelay: cube.animationDelay,
          }}
        >
          <div
            className="cube"
            style={{
              animation: `cube-rotate ${Math.random() * 8 + 12}s linear infinite alternate`,
              animationDelay: `-${Math.random() * 6}s`
            }}
          >
            <div className="face front"></div>
            <div className="face back"></div>
            <div className="face right"></div>
            <div className="face left"></div>
            <div className="face top"></div>
            <div className="face bottom"></div>
          </div>
        </div>
      ))}
      <style jsx>{`
        .cube {
          position: relative;
          width: 45px;
          height: 45px;
          transform-style: preserve-3d;
        }
        .face {
          position: absolute;
          width: 45px;
          height: 45px;
          border: 1px solid hsl(var(--primary) / 0.9);
          background: hsl(var(--primary) / 0.3);
        }
        .front  { transform: translateZ(22.5px); }
        .back   { transform: rotateY(180deg) translateZ(22.5px); }
        .right  { transform: rotateY(90deg) translateZ(22.5px); }
        .left   { transform: rotateY(-90deg) translateZ(22.5px); }
        .top    { transform: rotateX(90deg) translateZ(22.5px); }
        .bottom { transform: rotateX(-90deg) translateZ(22.5px); }

        @keyframes cube-rotate {
          from { transform: rotateY(0deg) rotateX(0deg); }
          to   { transform: rotateY(360deg) rotateX(360deg); }
        }
        @keyframes cube-float {
            0% { transform: translateZ(0px) translateY(0px); opacity: 0.9; }
            50% { transform: translateZ(120px) translateY(-60px); opacity: 0.3; }
            100% { transform: translateZ(0px) translateY(0px); opacity: 0.9; }
        }
      `}</style>
    </div>
  );
};
