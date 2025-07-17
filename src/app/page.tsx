import { FluxLinksApp } from '@/components/flux-links-app';
import { AnimatedBackground } from '@/components/animated-background';

export default function Home() {
  return (
    <>
      <AnimatedBackground />
      <main className="relative z-10">
        <FluxLinksApp />
      </main>
    </>
  );
}
