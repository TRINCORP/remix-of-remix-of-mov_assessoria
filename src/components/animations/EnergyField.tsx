import { useRef, useMemo, memo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { SafeThreeProvider } from './SafeThreeProvider';
import { useThreeGuard } from '@/hooks/useThreeGuard';

const EnergyParticles = memo(() => {
  const ref = useRef<THREE.Points>(null);
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(800 * 3); // Reduced particles
    const colors = new Float32Array(800 * 3);
    
    for (let i = 0; i < 800; i++) {
      const i3 = i * 3;
      const radius = Math.random() * 60;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = (Math.random() - 0.5) * 50;
      positions[i3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
      
      const energyType = Math.random();
      if (energyType > 0.7) {
        colors[i3] = 1;
        colors[i3 + 1] = 0.8;
        colors[i3 + 2] = 0.2;
      } else {
        colors[i3] = 0.2;
        colors[i3 + 1] = 0.6;
        colors[i3 + 2] = 1;
      }
    }
    
    return [positions, colors];
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.05;
      
      const positions = ref.current.geometry.attributes.position.array as Float32Array;
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] += Math.sin(state.clock.elapsedTime * 2 + positions[i] * 0.02) * 0.01;
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points ref={ref} positions={positions} colors={colors} stride={3}>
      <PointMaterial 
        transparent 
        vertexColors 
        size={1.5} 
        sizeAttenuation 
        opacity={0.4}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
});

EnergyParticles.displayName = 'EnergyParticles';

interface EnergyFieldProps {
  className?: string;
  intensity?: number;
}

export const EnergyField = memo(({ className = "", intensity = 0.3 }: EnergyFieldProps) => {
  const canRender = useThreeGuard();
  
  if (!canRender) {
    return <div className={`hidden ${className}`} />;
  }

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`} style={{ opacity: intensity }}>
      <SafeThreeProvider>
        <Canvas
          camera={{ 
            position: [0, 0, 35], 
            fov: 60,
            near: 0.1,
            far: 200
          }}
          style={{ background: 'transparent' }}
          gl={{ 
            alpha: true, 
            antialias: false,
            powerPreference: "high-performance",
            preserveDrawingBuffer: false,
            failIfMajorPerformanceCaveat: true
          }}
          dpr={[1, 1.5]}
          performance={{ min: 0.8 }}
        >
          <EnergyParticles />
        </Canvas>
      </SafeThreeProvider>
    </div>
  );
});

EnergyField.displayName = 'EnergyField';