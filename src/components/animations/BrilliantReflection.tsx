import { memo } from 'react';

interface BrilliantReflectionProps {
  className?: string;
}

export const BrilliantReflection = memo(({ className = "" }: BrilliantReflectionProps) => {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {/* Main reflection sweep */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 animate-reflection-sweep" />
      
      {/* Secondary shimmer */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent -skew-x-12 animate-shimmer-wave" />
      
      {/* Sparkle particles */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-sparkle"
            style={{
              top: `${20 + (i * 15)}%`,
              left: `${10 + (i * 16)}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${1.5 + (i % 3) * 0.5}s`
            }}
          />
        ))}
      </div>
    </div>
  );
});

BrilliantReflection.displayName = 'BrilliantReflection';