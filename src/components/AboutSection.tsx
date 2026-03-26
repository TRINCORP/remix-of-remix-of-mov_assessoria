import { useState, useRef, useEffect } from 'react';
import { ArrowRight, Rocket, Target, Sparkles, Zap, Users, TrendingUp, Crown, Star, Diamond } from 'lucide-react';
import { Button } from '@/components/ui/button';

// ── Holographic stat card ────────────────────────────────────────────
const StatCard = ({
  stat,
  index,
  isVisible,
}: {
  stat: { value: string; label: string; icon: typeof Star };
  index: number;
  isVisible: boolean;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [pointer, setPointer] = useState({ x: 0.5, y: 0.5 });
  const [hovered, setHovered] = useState(false);
  const [entered, setEntered] = useState(false);
  const [count, setCount] = useState('0');
  const Icon = stat.icon;

  // Staggered fade-up entry
  useEffect(() => {
    if (!isVisible || entered) return;
    const t = setTimeout(() => setEntered(true), index * 150);
    return () => clearTimeout(t);
  }, [isVisible, entered, index]);

  // Smooth counter animation
  useEffect(() => {
    if (!entered) return;
    const numeric = parseInt(stat.value.replace(/\D/g, ''), 10);
    if (isNaN(numeric)) { setCount(stat.value); return; }
    const suffix = stat.value.replace(/[\d]/g, '');
    const duration = 1200;
    let start: number | null = null;
    const raf = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * numeric) + suffix);
      if (p < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [entered, stat.value]);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    setPointer({
      x: (e.clientX - r.left) / r.width,
      y: (e.clientY - r.top) / r.height,
    });
  };

  // Holographic gradient angles driven by mouse position
  const rotateX = hovered ? (pointer.y - 0.5) * -22 : 0;
  const rotateY = hovered ? (pointer.x - 0.5) * 22 : 0;
  const hueShift = Math.round(pointer.x * 180);
  const shine = `radial-gradient(
    circle at ${pointer.x * 100}% ${pointer.y * 100}%,
    hsla(${hueShift}, 100%, 80%, 0.28) 0%,
    hsla(${hueShift + 60}, 90%, 70%, 0.18) 30%,
    hsla(${hueShift + 120}, 80%, 65%, 0.10) 55%,
    transparent 70%
  )`;

  return (
    <div
      ref={cardRef}
      className="relative cursor-default select-none"
      style={{ perspective: '900px' }}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPointer({ x: 0.5, y: 0.5 }); }}
    >
      <div
        className="rounded-2xl border border-border/50 bg-card overflow-hidden p-6 md:p-8"
        style={{
          transform: entered
            ? `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${hovered ? 10 : 0}px) translateY(0) scale(1)`
            : 'translateY(32px) scale(0.96)',
          opacity: entered ? 1 : 0,
          transition: hovered
            ? 'transform 0.08s linear'
            : entered
              ? 'transform 0.7s cubic-bezier(0.22,1,0.36,1), opacity 0.6s ease'
              : 'none',
          boxShadow: hovered
            ? `0 20px 60px -10px hsl(${hueShift} 80% 50% / 0.25), 0 0 0 1px hsl(${hueShift} 80% 60% / 0.2)`
            : '0 4px 24px -4px hsl(0 0% 0% / 0.15)',
          willChange: 'transform',
        }}
      >
        {/* Holographic foil overlay */}
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            background: hovered ? shine : 'transparent',
            transition: hovered ? 'none' : 'background 0.4s',
            mixBlendMode: 'screen',
          }}
        />
        {/* Subtle gloss line */}
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            background: hovered
              ? `linear-gradient(${105 + rotateY * 2}deg, transparent 40%, rgba(255,255,255,0.07) 50%, transparent 60%)`
              : 'transparent',
            transition: 'background 0.08s',
          }}
        />

        <Icon className="relative z-10 w-6 h-6 text-primary mb-4" />
        <div className="relative z-10 text-4xl md:text-5xl font-black mb-2 text-gradient-brand tabular-nums">
          {count}
        </div>
        <div className="relative z-10 text-sm text-muted-foreground font-medium tracking-wide">
          {stat.label}
        </div>
      </div>
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, { threshold: 0.1 });
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Parallax mouse effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cardsRef.current) {
        const rect = cardsRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left - rect.width / 2) / 25,
          y: (e.clientY - rect.top - rect.height / 2) / 25,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const differentials = [
    {
      icon: Crown,
      title: "Tratamento VIP",
      description: "Cada cliente é tratado como único. Atenção personalizada e dedicação exclusiva ao seu projeto.",
      gradient: "from-amber-500 to-yellow-400",
      delay: 0,
    },
    {
      icon: Rocket,
      title: "Velocidade Real",
      description: "Sem burocracia. Decisões rápidas e execução ágil para resultados que não esperam.",
      gradient: "from-orange-500 to-red-400",
      delay: 100,
    },
    {
      icon: Target,
      title: "Foco em ROI",
      description: "Cada centavo investido é monitorado. Transparência total nos resultados que importam.",
      gradient: "from-emerald-500 to-teal-400",
      delay: 200,
    },
    {
      icon: Zap,
      title: "Energia Incansável",
      description: "Uma equipe jovem e faminta por resultados. Sua marca recebe 100% da nossa energia.",
      gradient: "from-violet-500 to-purple-400",
      delay: 300,
    },
  ];

  const stats = [
    { value: "100%", label: "Dedicação Total", icon: Star },
    { value: "24/7", label: "Sempre Disponíveis", icon: Users },
    { value: "∞", label: "Possibilidades", icon: Diamond },
    { value: "1°", label: "Você em Primeiro", icon: Crown },
  ];

  return (
    <section 
      ref={sectionRef} 
      id="about" 
      className="gsap-section relative py-16 sm:py-24 md:py-40 overflow-hidden bg-background"
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <div 
          className={`absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[150px] transition-all duration-[2000ms] ${
            isVisible ? 'opacity-20' : 'opacity-0'
          }`}
          style={{
            background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)',
            transform: `translate(${mousePosition.x * -2}px, ${mousePosition.y * -2}px)`,
          }}
        />
        <div 
          className={`absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[120px] transition-all duration-[2000ms] ${
            isVisible ? 'opacity-15' : 'opacity-0'
          }`}
          style={{
            background: 'radial-gradient(circle, hsl(var(--primary-glow)) 0%, transparent 70%)',
            transform: `translate(${mousePosition.x * 2}px, ${mousePosition.y * 2}px)`,
          }}
        />
        
        {/* Subtle grid */}
        <div 
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--primary) / 0.02) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--primary) / 0.02) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            opacity: isVisible ? 1 : 0,
          }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Hero Header - Cinematic Reveal */}
        <div className="text-center mb-12 sm:mb-20 md:mb-32">
          <div 
            className={`inline-flex items-center gap-3 mb-8 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
            <span className="text-xs tracking-[0.4em] text-primary uppercase font-bold flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Quem Somos
              <Sparkles className="w-4 h-4" />
            </span>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
          </div>
          
          <h2 
            className={`text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-black mb-6 sm:mb-8 leading-[1] transition-all duration-1000 section-title-animate section-title-glow ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
            style={{ transitionDelay: '150ms' }}
          >
            <span className="text-foreground block">Não somos uma</span>
            <span className="block mt-2 text-gradient-brand">
              agência comum
            </span>
          </h2>
          
          <p 
            className={`text-base sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            Enquanto outros prometem, nós <span className="text-primary font-semibold">entregamos</span>. 
            Sua marca merece mais do que relatórios bonitos — merece{' '}
            <span className="text-primary font-semibold">resultados reais</span>.
          </p>
        </div>

        {/* Stats Strip - Animated Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-12 sm:mb-20 md:mb-32"
        >
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} isVisible={isVisible} />
          ))}
        </div>


        {/* Final CTA - Impactful */}
        <div 
          className={`relative transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
          style={{ transitionDelay: '900ms' }}
        >
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/20 to-primary/10 rounded-[3rem] blur-3xl" />
          
          <div className="relative bg-gradient-to-br from-muted/40 via-muted/20 to-muted/40 backdrop-blur-xl rounded-2xl sm:rounded-[2rem] md:rounded-[3rem] p-6 sm:p-10 md:p-16 border border-primary/20 overflow-hidden">
            {/* Animated background pattern */}
            <div 
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)`,
                backgroundSize: '32px 32px',
              }}
            />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-10">
              <div className="text-center lg:text-left max-w-2xl">
                <div className="inline-flex items-center gap-2 mb-6">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <span className="text-sm font-bold text-primary tracking-wider uppercase">
                    Pronto para Crescer?
                  </span>
                </div>
                
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4 leading-tight">
                  Sua marca merece{' '}
                  <span className="text-gradient-brand">
                    atenção total
                  </span>
                </h3>
                
                <p className="text-lg text-muted-foreground">
                  Seja um dos nossos parceiros exclusivos. Vagas limitadas para garantir 
                  a qualidade que sua marca merece.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="group relative h-12 sm:h-14 md:h-16 px-6 sm:px-10 md:px-12 text-base sm:text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(234,179,8,0.4)]"
                  onClick={() => window.open('https://wa.me/5519981134193', '_blank')}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Quero Começar
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                </Button>
                
                <Button 
                  variant="outline"
                  className="h-12 sm:h-14 md:h-16 px-6 sm:px-10 md:px-12 text-base sm:text-lg font-semibold rounded-xl sm:rounded-2xl border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
                  onClick={() => window.open('https://wa.me/5519981134193', '_blank')}
                >
                  <Users className="w-5 h-5 mr-2" />
                  Falar Conosco
                </Button>
              </div>
            </div>

            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-primary/20 rounded-tl-[3rem]" />
            <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-primary/20 rounded-br-[3rem]" />
          </div>
        </div>
      </div>

    </section>
  );
};

export default AboutSection;
