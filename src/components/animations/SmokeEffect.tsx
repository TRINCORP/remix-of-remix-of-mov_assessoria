import { useEffect, useRef } from 'react';

export const SmokeEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Get actual color values from CSS variables
    const getColorValue = (cssVar: string) => {
      const style = getComputedStyle(document.documentElement);
      const hslString = style.getPropertyValue(cssVar).trim();
      return hslString;
    };

    const accentColor = getColorValue('--accent');
    const primaryColor = getColorValue('--primary');

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      fadeRate: number;
    }> = [];

    const createParticle = () => {
      return {
        x: Math.random() * canvas.width,
        y: canvas.height + 20,
        size: Math.random() * 60 + 40,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: -(Math.random() * 0.8 + 0.3),
        opacity: Math.random() * 0.3 + 0.1,
        fadeRate: 0.002,
      };
    };

    // Initialize particles
    for (let i = 0; i < 8; i++) {
      particles.push(createParticle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.opacity -= particle.fadeRate;
        particle.size += 0.2;

        if (particle.opacity <= 0 || particle.y < -100) {
          particles[index] = createParticle();
        }

        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size
        );

        // Use actual HSL values with opacity in proper format
        // CSS variables store values like "45 96% 64%", we need "hsla(45, 96%, 64%, opacity)"
        const accentHsla = accentColor.split(' ');
        const primaryHsla = primaryColor.split(' ');
        
        gradient.addColorStop(
          0, 
          `hsla(${accentHsla[0]}, ${accentHsla[1]}, ${accentHsla[2]}, ${particle.opacity})`
        );
        gradient.addColorStop(
          0.5, 
          `hsla(${primaryHsla[0]}, ${primaryHsla[1]}, ${primaryHsla[2]}, ${particle.opacity * 0.5})`
        );
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};
