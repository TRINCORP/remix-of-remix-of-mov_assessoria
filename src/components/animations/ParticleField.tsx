import { useRef, useMemo, memo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { SafeThreeProvider } from './SafeThreeProvider';
import { useThreeGuard } from '@/hooks/useThreeGuard';

const AnimatedParticles = memo(() => {
  const ref = useRef<THREE.Points>(null);
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(1000 * 3); // Reduced particles
    const colors = new Float32Array(1000 * 3);
    
    for (let i = 0; i < 1000; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 80;
      positions[i3 + 1] = (Math.random() - 0.5) * 80;
      positions[i3 + 2] = (Math.random() - 0.5) * 40;
      
      colors[i3] = Math.random() * 0.5 + 0.5;
      colors[i3 + 1] = Math.random() * 0.3 + 0.7;
      colors[i3 + 2] = 1;
    }
    
    return [positions, colors];
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.1;
      
      const positions = ref.current.geometry.attributes.position.array as Float32Array;
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] += Math.sin(state.clock.elapsedTime + positions[i] * 0.01) * 0.005;
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points ref={ref} positions={positions} colors={colors} stride={3}>
      <PointMaterial 
        transparent 
        vertexColors 
        size={1.2} 
        sizeAttenuation 
        opacity={0.3}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
});

AnimatedParticles.displayName = 'AnimatedParticles';

interface ParticleFieldProps {
  className?: string;
}

export const ParticleField = memo(({ className = "" }: ParticleFieldProps) => {
  const canRender = useThreeGuard();
  
  if (!canRender) {
    return <div className={`hidden ${className}`} />;
  }

  return (
    <div className={`fixed inset-0 pointer-events-none ${className}`}>
      <SafeThreeProvider>
        <Canvas
          camera={{ 
            position: [0, 0, 30], 
            fov: 75,
            near: 0.1,
            far: 1000
          }}
          style={{ background: 'transparent' }}
          gl={{ 
            alpha: true, 
            antialias: false,
            powerPreference: "high-performance",
            preserveDrawingBuffer: false,
            failIfMajorPerformanceCaveat: true
          }}
          dpr={[1, 1.5]} // Limit pixel ratio
          performance={{ min: 0.8 }} // Auto-degrade if performance drops
        >
          <AnimatedParticles />
        </Canvas>
      </SafeThreeProvider>
    </div>
  );
});

ParticleField.displayName = 'ParticleField';