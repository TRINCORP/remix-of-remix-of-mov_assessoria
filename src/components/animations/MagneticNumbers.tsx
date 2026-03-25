import { useRef, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface MagneticNumberProps {
  value: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  delay?: number;
}

export const MagneticNumber = ({ value, label, icon: Icon, delay = 0 }: MagneticNumberProps) => {
  const numberRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [displayValue, setDisplayValue] = useState("0");
  
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  // Animação de contagem dos números
  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        const numericValue = parseInt(value.replace(/\D/g, ''));
        const suffix = value.replace(/\d/g, '');
        
        let current = 0;
        const increment = numericValue / 60; // 60 frames para 1 segundo
        
        const counter = setInterval(() => {
          current += increment;
          if (current >= numericValue) {
            setDisplayValue(value);
            clearInterval(counter);
          } else {
            setDisplayValue(Math.floor(current) + suffix);
          }
        }, 16); // ~60fps
        
        return () => clearInterval(counter);
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [inView, value, delay]);

  // Efeito magnético
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current && isHovered) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = (e.clientX - centerX) * 0.15;
        const deltaY = (e.clientY - centerY) * 0.15;
        
        setMousePosition({ x: deltaX, y: deltaY });
      }
    };

    if (isHovered) {
      document.addEventListener('mousemove', handleMouseMove);
    }

    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [isHovered]);

  const resetPosition = () => {
    setMousePosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div 
      ref={(el) => {
        ref(el);
        if (containerRef.current !== el) {
          containerRef.current = el;
        }
      }}
      className="group cursor-pointer relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={resetPosition}
    >
      <div 
        ref={numberRef}
        className="flex items-center justify-center gap-3 mb-4 transition-all duration-300"
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px) ${isHovered ? 'scale(1.05)' : 'scale(1)'}`,
        }}
      >
        <div className="relative">
          <Icon className={`w-8 h-8 text-primary transition-all duration-300 ${
            isHovered ? 'drop-shadow-glow scale-110' : ''
          }`} />
          {isHovered && (
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
          )}
        </div>
        
        <div className="relative">
          <div className={`text-5xl md:text-6xl font-black text-gradient transition-all duration-300 ${
            isHovered ? 'drop-shadow-glow' : ''
          }`}>
            {displayValue}
          </div>
          
          {isHovered && (
            <>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-lg blur-xl animate-pulse" />
              <div className="absolute -inset-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg blur-2xl" />
            </>
          )}
        </div>
      </div>
      
      <div className={`text-muted-foreground font-semibold text-lg transition-all duration-300 ${
        isHovered ? 'text-primary/80 scale-105' : ''
      }`}>
        {label}
      </div>
      
      {/* Efeito de ondas magnéticas */}
      {isHovered && (
        <>
          <div className="absolute inset-0 border border-primary/30 rounded-xl animate-ping" />
          <div className="absolute inset-0 border border-primary/20 rounded-xl animate-ping animation-delay-300" />
          <div className="absolute inset-0 border border-primary/10 rounded-xl animate-ping animation-delay-600" />
        </>
      )}
    </div>
  );
};