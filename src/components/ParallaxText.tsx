import { useEffect, useRef } from 'react';

interface ParallaxTextProps {
  text: string;
  direction?: 'left' | 'right';
  speed?: number;
  className?: string;
}

const ParallaxText = ({ 
  text, 
  direction = 'left', 
  speed = 0.5,
  className = '' 
}: ParallaxTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (!containerRef.current || !innerRef.current) { ticking = false; return; }
        const rect = containerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (rect.top < windowHeight && rect.bottom > 0) {
          const offset = window.scrollY * speed * (direction === 'left' ? -1 : 1);
          innerRef.current.style.transform = `translate3d(${offset}px, 0, 0)`;
        }
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [direction, speed]);

  const repeatedText = Array(5).fill(text).join(' • ');

  return (
    <div ref={containerRef} className={`overflow-hidden py-8 md:py-12 ${className}`}>
      <div ref={innerRef} className="whitespace-nowrap will-change-transform">
        <span 
          className="text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black tracking-tighter text-transparent"
          style={{ WebkitTextStroke: '1px hsl(var(--primary) / 0.2)' }}
        >
          {repeatedText}
        </span>
      </div>
    </div>
  );
};

export const DualParallaxText = ({ 
  topText, 
  bottomText,
  speed = 0.3,
}: { 
  topText: string; 
  bottomText: string;
  speed?: number;
}) => {
  return (
    <div className="relative py-8 md:py-16 overflow-hidden bg-background">
      <div 
        className="absolute inset-0 opacity-30"
        style={{ background: 'radial-gradient(ellipse at center, hsl(var(--primary) / 0.1) 0%, transparent 70%)' }}
      />
      <ParallaxText text={topText} direction="left" speed={speed} />
      <ParallaxText text={bottomText} direction="right" speed={speed * 0.7} className="-mt-4 md:-mt-8" />
    </div>
  );
};

export default ParallaxText;
