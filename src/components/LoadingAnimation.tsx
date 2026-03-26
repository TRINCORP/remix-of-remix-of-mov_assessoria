import { useEffect, useState } from 'react';

interface LoadingAnimationProps {
  onComplete: () => void;
}

const LoadingAnimation = ({ onComplete }: LoadingAnimationProps) => {
  const [phase, setPhase] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 150),   // logo entra
      setTimeout(() => setPhase(2), 900),   // tagline entra
      setTimeout(() => setPhase(3), 1700),  // scan line
      setTimeout(() => {
        setIsExiting(true);
        setTimeout(onComplete, 700);
      }, 2600),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden dark-section"
      style={{
        backgroundColor: 'hsl(0 0% 2%)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
        opacity: isExiting ? 0 : 1,
        transform: isExiting ? 'scale(1.06)' : 'scale(1)',
      }}
    >
      {/* Radial glow background */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, hsl(var(--primary) / 0.12) 0%, transparent 70%)',
          opacity: phase >= 1 ? 1 : 0,
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center">

        {/* Logo container */}
        <div className="relative flex items-center justify-center mb-8">

          {/* Pulse ring 1 */}
          <div
            className="absolute rounded-full border border-primary/30"
            style={{
              width: '180px',
              height: '180px',
              transition: 'opacity 0.4s ease',
              opacity: phase >= 1 ? 1 : 0,
              animation: phase >= 1 ? 'ring-pulse 2s ease-out infinite' : 'none',
            }}
          />

          {/* Pulse ring 2 — delayed */}
          <div
            className="absolute rounded-full border border-primary/20"
            style={{
              width: '240px',
              height: '240px',
              transition: 'opacity 0.4s ease',
              opacity: phase >= 1 ? 1 : 0,
              animation: phase >= 1 ? 'ring-pulse 2s ease-out 0.5s infinite' : 'none',
            }}
          />

          {/* Pulse ring 3 — more delayed */}
          <div
            className="absolute rounded-full border border-primary/10"
            style={{
              width: '320px',
              height: '320px',
              transition: 'opacity 0.4s ease',
              opacity: phase >= 1 ? 1 : 0,
              animation: phase >= 1 ? 'ring-pulse 2s ease-out 1s infinite' : 'none',
            }}
          />

          {/* Glow bloom behind logo */}
          <div
            className="absolute rounded-full blur-3xl transition-all duration-1000"
            style={{
              width: '200px',
              height: '200px',
              background: 'radial-gradient(circle, hsl(var(--primary) / 0.35) 0%, transparent 70%)',
              opacity: phase >= 1 ? 1 : 0,
              transform: phase >= 1 ? 'scale(1)' : 'scale(0.3)',
            }}
          />

          {/* Logo image */}
          <div
            style={{
              transition: 'opacity 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
              opacity: phase >= 1 ? 1 : 0,
              transform: phase >= 1 ? 'scale(1)' : 'scale(0.55)',
              filter: phase >= 1
                ? 'drop-shadow(0 0 24px hsl(var(--primary) / 0.7)) drop-shadow(0 0 60px hsl(var(--primary) / 0.3))'
                : 'none',
            }}
          >
            <img
              src="/lovable-uploads/mov-logo-gold.png"
              alt="MOV"
              className="w-28 h-28 md:w-36 md:h-36 object-contain"
            />
          </div>
        </div>

        {/* Tagline */}
        <div
          style={{
            transition: 'opacity 0.5s ease, transform 0.5s ease',
            opacity: phase >= 2 ? 1 : 0,
            transform: phase >= 2 ? 'translateY(0)' : 'translateY(14px)',
          }}
        >
          <p className="text-xs md:text-sm tracking-[0.35em] uppercase font-medium text-center"
            style={{ color: 'hsl(var(--muted-foreground))' }}
          >
            Marketing que{' '}
            <span
              className="font-black"
              style={{
                color: 'hsl(var(--primary))',
                textShadow: '0 0 20px hsl(var(--primary) / 0.6)',
              }}
            >
              move
            </span>
          </p>
        </div>

        {/* Scan line reveal under logo */}
        <div
          className="mt-8 overflow-hidden"
          style={{
            transition: 'width 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
            width: phase >= 3 ? '80px' : '0px',
            height: '1px',
          }}
        >
          <div
            className="h-full w-full rounded-full"
            style={{
              background: 'linear-gradient(to right, transparent, hsl(var(--primary)), transparent)',
              boxShadow: '0 0 12px hsl(var(--primary))',
            }}
          />
        </div>
      </div>

      {/* Corner marks */}
      {[
        'top-6 left-6 border-l-2 border-t-2',
        'top-6 right-6 border-r-2 border-t-2',
        'bottom-6 left-6 border-l-2 border-b-2',
        'bottom-6 right-6 border-r-2 border-b-2',
      ].map((cls, i) => (
        <div
          key={i}
          className={`absolute ${cls} w-5 h-5 border-primary/30 transition-all duration-500`}
          style={{
            opacity: phase >= 1 ? 0.5 : 0,
            transitionDelay: `${i * 80}ms`,
          }}
        />
      ))}

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 45%, hsl(0 0% 2% / 0.7) 100%)',
        }}
      />

      <style>{`
        @keyframes ring-pulse {
          0%   { transform: scale(0.85); opacity: 0.6; }
          100% { transform: scale(1.4);  opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default LoadingAnimation;
