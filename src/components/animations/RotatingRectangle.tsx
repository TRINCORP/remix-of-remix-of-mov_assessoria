import { memo } from 'react';
interface RotatingRectangleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  speed?: 'slow' | 'normal' | 'fast';
  children?: React.ReactNode;
}
export const RotatingRectangle = memo(({
  className = "",
  size = 'md',
  speed = 'normal',
  children
}: RotatingRectangleProps) => {
  const sizeClasses = {
    sm: 'w-32 h-20',
    md: 'w-48 h-28',
    lg: 'w-64 h-36'
  };
  const speedClasses = {
    slow: 'animate-rotate-slow',
    normal: 'animate-rotate-rectangle',
    fast: 'animate-rotate-fast'
  };
  return <div className={`relative ${className}`}>
      {/* Rotating rectangle background */}
      
      
      {/* Content */}
      
    </div>;
});
RotatingRectangle.displayName = 'RotatingRectangle';