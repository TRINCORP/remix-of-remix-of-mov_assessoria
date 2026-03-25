import { useEffect, useState } from 'react';

export const useThreeGuard = () => {
  const [canRenderThree, setCanRenderThree] = useState(false);

  useEffect(() => {
    // Delay Three.js initialization to ensure React context is stable
    const timer = setTimeout(() => {
      // Check if WebGL is supported
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      
      if (gl) {
        setCanRenderThree(true);
      } else {
        console.warn('WebGL not supported, Three.js animations disabled');
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return canRenderThree;
};