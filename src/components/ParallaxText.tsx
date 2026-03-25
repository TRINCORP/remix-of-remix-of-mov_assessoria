import { useEffect, useRef, useState } from 'react';

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
  const [offset, setOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Only animate when in viewport
      if (rect.top < windowHeight && rect.bottom > 0) {
        const scrolled = window.scrollY;
        const newOffset = scrolled * speed * (direction === 'left' ? -1 : 1);
        setOffset(newOffset);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [direction, speed]);

  // Repeat text enough times to fill the screen
  const repeatedText = Array(5).fill(text).join(' • ');

  return (
    <div 
      ref={containerRef}
      className={`overflow-hidden py-8 md:py-12 ${className}`}
    >
      <div 
        className="whitespace-nowrap"
        style={{ 
          transform: `translateX(${offset}px)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        <span 
          className="text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black tracking-tighter text-transparent"
          style={{
            WebkitTextStroke: '1px hsl(var(--primary) / 0.2)',
          }}
        >
          {repeatedText}
        </span>
      </div>
    </div>
  );
};

// Dual Parallax Section - two lines moving in opposite directions
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
      {/* Background glow */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(var(--primary) / 0.1) 0%, transparent 70%)',
        }}
      />
      
      <ParallaxText 
        text={topText} 
        direction="left" 
        speed={speed}
      />
      <ParallaxText 
        text={bottomText} 
        direction="right" 
        speed={speed * 0.7}
        className="-mt-4 md:-mt-8"
      />
    </div>
  );
};

export default ParallaxText;
