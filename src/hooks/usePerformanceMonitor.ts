import { useEffect, useRef } from 'react';

export const usePerformanceMonitor = () => {
  const frameTimeRef = useRef<number[]>([]);
  const lastFrameTime = useRef<number>(performance.now());

  useEffect(() => {
    let animationId: number;

    const checkPerformance = () => {
      const now = performance.now();
      const deltaTime = now - lastFrameTime.current;
      
      frameTimeRef.current.push(deltaTime);
      
      // Keep only last 60 frames for FPS calculation
      if (frameTimeRef.current.length > 60) {
        frameTimeRef.current.shift();
      }
      
      // Calculate average FPS
      const avgFrameTime = frameTimeRef.current.reduce((a, b) => a + b, 0) / frameTimeRef.current.length;
      const fps = 1000 / avgFrameTime;
      
      // If FPS drops below 45, reduce particle count or effects
      if (fps < 45 && frameTimeRef.current.length >= 30) {
        // Reduce Three.js particles quality
        const canvases = document.querySelectorAll('canvas');
        canvases.forEach(canvas => {
          const gl = canvas.getContext('webgl') || canvas.getContext('webgl2');
          if (gl) {
            // Reduce canvas resolution for better performance
            const pixelRatio = Math.min(window.devicePixelRatio, fps < 30 ? 0.5 : 0.75);
            canvas.style.transform = `scale(${1 / pixelRatio})`;
            canvas.style.transformOrigin = 'top left';
          }
        });
      }
      
      lastFrameTime.current = now;
      animationId = requestAnimationFrame(checkPerformance);
    };

    // Start performance monitoring
    animationId = requestAnimationFrame(checkPerformance);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return {
    getCurrentFPS: () => {
      if (frameTimeRef.current.length === 0) return 60;
      const avgFrameTime = frameTimeRef.current.reduce((a, b) => a + b, 0) / frameTimeRef.current.length;
      return Math.round(1000 / avgFrameTime);
    }
  };
};
