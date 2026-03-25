import { useEffect, useState } from 'react';

interface LoadingAnimationProps {
  onComplete: () => void;
}

const LoadingAnimation = ({ onComplete }: LoadingAnimationProps) => {
  const [phase, setPhase] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  // Phase progression - punchy and fast
  useEffect(() => {
    const sequence = [
      { delay: 100, action: () => setPhase(1) },   // Logo appears
      { delay: 800, action: () => setPhase(2) },   // Tagline
      { delay: 2000, action: () => {
        setIsExiting(true);
        setTimeout(onComplete, 500);
      }},
    ];

    const timers = sequence.map(({ delay, action }) => 
      setTimeout(action, delay)
    );

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden transition-all duration-500 ${
        isExiting ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
      }`}
      style={{ backgroundColor: 'hsl(0 0% 2%)' }}
    >
      {/* Subtle radial gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, hsl(var(--primary) / 0.08) 0%, transparent 60%)',
        }}
      />

      {/* Main content */}
      <div className="relative z-10 text-center">
        
        {/* Logo mark */}
        <div 
          className={`transition-all duration-700 ${
            phase >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
        >
          <h1 
            className="text-[4rem] md:text-[8rem] lg:text-[10rem] font-black tracking-tighter leading-none"
            style={{
              background: 'linear-gradient(135deg, hsl(45, 96%, 72%) 0%, hsl(45, 96%, 64%) 50%, hsl(38, 92%, 50%) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 30px hsla(45, 96%, 64%, 0.4))',
            }}
          >
            MOV
          </h1>
        </div>

        {/* Tagline - Marketing punch */}
        <div 
          className={`mt-4 transition-all duration-500 ${
            phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <p className="text-sm md:text-base tracking-[0.25em] text-muted-foreground uppercase font-medium">
            Marketing que <span className="text-primary font-bold">move</span>
          </p>
        </div>

        {/* Underline accent */}
        <div 
          className={`mt-6 mx-auto transition-all duration-700 ${
            phase >= 1 ? 'w-20 opacity-100' : 'w-0 opacity-0'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          <div 
            className="h-0.5 bg-primary rounded-full"
            style={{ boxShadow: '0 0 15px hsl(var(--primary))' }}
          />
        </div>
      </div>

      {/* Corner marks - Editorial style */}
      <div 
        className={`absolute top-6 left-6 transition-all duration-500 ${
          phase >= 1 ? 'opacity-40' : 'opacity-0'
        }`}
      >
        <div className="w-6 h-6 border-l-2 border-t-2 border-primary/50" />
      </div>
      <div 
        className={`absolute top-6 right-6 transition-all duration-500 ${
          phase >= 1 ? 'opacity-40' : 'opacity-0'
        }`}
      >
        <div className="w-6 h-6 border-r-2 border-t-2 border-primary/50" />
      </div>
      <div 
        className={`absolute bottom-6 left-6 transition-all duration-500 ${
          phase >= 1 ? 'opacity-40' : 'opacity-0'
        }`}
      >
        <div className="w-6 h-6 border-l-2 border-b-2 border-primary/50" />
      </div>
      <div 
        className={`absolute bottom-6 right-6 transition-all duration-500 ${
          phase >= 1 ? 'opacity-40' : 'opacity-0'
        }`}
      >
        <div className="w-6 h-6 border-r-2 border-b-2 border-primary/50" />
      </div>

      {/* Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 50%, hsl(0 0% 2% / 0.6) 100%)',
        }}
      />
    </div>
  );
};

export default LoadingAnimation;
