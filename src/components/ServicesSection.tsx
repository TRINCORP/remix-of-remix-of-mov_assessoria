import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Brain, Rocket, Target, Megaphone, Palette,
  BarChart3, ChevronLeft, ChevronRight, ArrowUpRight, Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface Service {
  id: number;
  icon: typeof Brain;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  image: string;
  color: string;
  stats: { value: string; label: string }[];
}

const services: Service[] = [
  {
    id: 1,
    icon: Target,
    title: "Gestão de Tráfego Pago",
    tagline: "Demanda previsível",
    description: "Aquisição previsível de clientes através de campanhas no Google Ads e Meta Ads, alinhadas à estratégia do negócio.",
    features: ["Meta Ads", "Google Ads", "Analytics"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    color: "#FFD93D",
    stats: [{ value: "12x", label: "ROAS" }, { value: "-65%", label: "CAC" }],
  },
  {
    id: 2,
    icon: Rocket,
    title: "Estruturação Comercial",
    tagline: "Escale com processo",
    description: "Processos, posicionamento e vendas organizadas para pequenas e médias empresas escalarem com previsibilidade e método.",
    features: ["Processos", "Vendas", "Posicionamento"],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    color: "#FF6B6B",
    stats: [{ value: "3x", label: "conversões" }, { value: "+200%", label: "eficiência" }],
  },
  {
    id: 3,
    icon: Palette,
    title: "Desenvolvimento de Sites e Landing Pages",
    tagline: "Presença que converte",
    description: "Presença digital estruturada para conversão, autoridade e crescimento. Sites otimizados para SEO e experiência do usuário.",
    features: ["Landing Pages", "UI/UX", "SEO"],
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=600&fit=crop",
    color: "#4ECDC4",
    stats: [{ value: "+180%", label: "conversão" }, { value: "50+", label: "projetos" }],
  },
  {
    id: 4,
    icon: Megaphone,
    title: "Social Media e Gestão de Redes Sociais",
    tagline: "Marca com confiança",
    description: "Comunicação estratégica que constrói marca, gera confiança e aproxima sua empresa do cliente certo.",
    features: ["Conteúdo", "Gestão", "Estratégia"],
    image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&h=600&fit=crop",
    color: "#F472B6",
    stats: [{ value: "5M+", label: "alcance" }, { value: "+320%", label: "engajamento" }],
  },
  {
    id: 5,
    icon: BarChart3,
    title: "Produção Audiovisual para Empresas",
    tagline: "Produções de autoridade",
    description: "Vídeos e fotografias profissionais que elevam a percepção de marca e constroem autoridade no mercado digital.",
    features: ["Vídeos", "Fotografia", "Edição"],
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=600&fit=crop",
    color: "#06B6D4",
    stats: [{ value: "4K+", label: "qualidade" }, { value: "100+", label: "produções" }],
  },
];

// ─── Card shared between mobile peek and desktop carousel ────────────
const ServiceCard = ({
  service,
  isActive,
  compact = false,
}: {
  service: Service;
  isActive: boolean;
  compact?: boolean;
}) => {
  const Icon = service.icon;
  return (
    <div
      className="bg-card/95 rounded-2xl overflow-hidden border transition-all duration-500"
      style={{
        borderColor: isActive ? `${service.color}50` : 'hsl(var(--border) / 0.2)',
        boxShadow: isActive
          ? `0 24px 64px -16px ${service.color}45, 0 8px 32px -8px rgba(0,0,0,0.3)`
          : '0 4px 20px -4px rgba(0,0,0,0.15)',
      }}
    >
      {/* Image */}
      <div className={`relative overflow-hidden ${compact ? 'h-32' : 'h-40'}`}>
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-700"
          style={{ transform: isActive ? 'scale(1.05)' : 'scale(1)' }}
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, hsl(var(--card)) 5%, ${service.color}15 60%, transparent 100%)`,
          }}
        />
        <div
          className="absolute top-3 left-3 rounded-xl flex items-center justify-center transition-transform duration-500"
          style={{
            width: compact ? '36px' : '44px',
            height: compact ? '36px' : '44px',
            backgroundColor: service.color,
            boxShadow: `0 6px 20px ${service.color}50`,
            transform: isActive ? 'scale(1.08)' : 'scale(1)',
          }}
        >
          <Icon className={`${compact ? 'w-4 h-4' : 'w-5 h-5'} text-black`} />
        </div>
      </div>

      {/* Content */}
      <div className={compact ? 'p-4' : 'p-5'}>
        <span
          className="text-[10px] font-bold tracking-[0.18em] uppercase mb-1 block"
          style={{ color: service.color }}
        >
          {service.tagline}
        </span>
        <h3 className={`font-black text-foreground mb-2 tracking-tight ${compact ? 'text-base' : 'text-xl'}`}>
          {service.title}
        </h3>
        <p className="text-muted-foreground text-xs mb-3 leading-relaxed line-clamp-3">
          {service.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {service.features.map((f, i) => (
            <span
              key={i}
              className="px-2 py-0.5 rounded-full text-[9px] font-medium bg-muted/50 text-muted-foreground border border-border/30"
            >
              {f}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-4 pt-3 border-t border-border/30">
          {service.stats.map((s, i) => (
            <div key={i}>
              <span className="font-black block text-base" style={{ color: service.color }}>
                {s.value}
              </span>
              <span className="text-[9px] text-muted-foreground uppercase tracking-wider">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── Mobile peek carousel ────────────────────────────────────────────
const MobilePeekCarousel = ({
  currentIndex,
  navigate,
  goToSlide,
}: {
  currentIndex: number;
  navigate: (d: 'next' | 'prev') => void;
  goToSlide: (i: number) => void;
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  // 82 vw per card, 9vw peek on each side, 8px gap
  const CARD_W = 82; // vw
  const PEEK = (100 - CARD_W) / 2; // vw each side ≈ 9vw

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchStartY.current = e.targetTouches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = touchStartX.current - e.changedTouches[0].clientX;
    const dy = Math.abs(touchStartY.current - e.changedTouches[0].clientY);
    if (Math.abs(dx) > 40 && Math.abs(dx) > dy) {
      dx > 0 ? navigate('next') : navigate('prev');
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <div className="w-full">
      {/* Peek track */}
      <div
        className="overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          ref={trackRef}
          className="flex"
          style={{
            transform: `translateX(calc(${PEEK}vw - ${currentIndex} * (${CARD_W}vw + 8px)))`,
            transition: 'transform 0.42s cubic-bezier(0.25,0.46,0.45,0.94)',
            gap: '8px',
            willChange: 'transform',
          }}
        >
          {services.map((service, i) => (
            <div
              key={service.id}
              className="flex-shrink-0"
              style={{
                width: `${CARD_W}vw`,
                opacity: i === currentIndex ? 1 : 0.38,
                transform: i === currentIndex ? 'scale(1)' : 'scale(0.95)',
                transition: 'opacity 0.4s, transform 0.4s',
                pointerEvents: i !== currentIndex ? 'none' : 'auto',
              }}
            >
              <ServiceCard service={service} isActive={i === currentIndex} compact />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation row */}
      <div className="flex items-center justify-between px-4 mt-5">
        {/* Prev */}
        <button
          onClick={() => navigate('prev')}
          className="w-9 h-9 rounded-full border border-border/30 bg-card/40 backdrop-blur-sm flex items-center justify-center text-muted-foreground active:scale-90 transition-transform"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Service title pill */}
        <div className="flex-1 mx-3 text-center">
          <p
            className="text-xs font-bold tracking-wide truncate transition-colors duration-400"
            style={{ color: services[currentIndex].color }}
          >
            {String(currentIndex + 1).padStart(2, '0')} / {String(services.length).padStart(2, '0')}
            &nbsp;·&nbsp;
            {services[currentIndex].tagline}
          </p>
        </div>

        {/* Next */}
        <button
          onClick={() => navigate('next')}
          className="w-9 h-9 rounded-full border border-border/30 bg-card/40 backdrop-blur-sm flex items-center justify-center text-muted-foreground active:scale-90 transition-transform"
          aria-label="Próximo"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-1.5 mt-3">
        {services.map((service, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            aria-label={`Ir para ${service.title}`}
            style={{
              width: i === currentIndex ? '20px' : '6px',
              height: '6px',
              borderRadius: '9999px',
              backgroundColor: i === currentIndex ? service.color : 'hsl(var(--muted-foreground)/0.25)',
              boxShadow: i === currentIndex ? `0 0 10px ${service.color}70` : 'none',
              transition: 'all 0.4s ease',
            }}
          />
        ))}
      </div>
    </div>
  );
};

// ─── Desktop 3-D carousel (unchanged) ────────────────────────────────
const DesktopCarousel = ({
  currentIndex,
  goToSlide,
}: {
  currentIndex: number;
  goToSlide: (i: number) => void;
}) => {
  const getVisible = () => {
    const res = [];
    for (let i = -2; i <= 2; i++) {
      const idx = (currentIndex + i + services.length) % services.length;
      res.push({ ...services[idx], position: i, originalIndex: idx });
    }
    return res;
  };

  return (
    <div className="relative h-[520px] flex items-center justify-center">
      <div className="relative w-full h-full" style={{ perspective: '1200px' }}>
        {getVisible().map((service) => {
          const pos = service.position;
          const isCenter = pos === 0;
          const cfg: Record<number, { tx: string; tz: string; ry: string; scale: number; opacity: number; blur: number; gray: number; z: number }> = {
            0:  { tx: '-50%', tz: '60px',   ry: '0deg',   scale: 1,    opacity: 1,   blur: 0, gray: 0,  z: 50 },
            [-1]: { tx: '-130%', tz: '-50px', ry: '20deg',  scale: 0.82, opacity: 0.6, blur: 2, gray: 30, z: 30 },
            1:  { tx: '30%',   tz: '-50px', ry: '-20deg', scale: 0.82, opacity: 0.6, blur: 2, gray: 30, z: 30 },
            [-2]: { tx: '-200%', tz: '-120px',ry: '35deg',  scale: 0.6,  opacity: 0.2, blur: 4, gray: 60, z: 10 },
            2:  { tx: '100%',  tz: '-120px',ry: '-35deg', scale: 0.6,  opacity: 0.2, blur: 4, gray: 60, z: 10 },
          };
          const c = cfg[pos];
          if (!c) return null;
          return (
            <div
              key={`${service.id}-${pos}`}
              className={`absolute left-1/2 top-1/2 w-[340px] ${isCenter ? 'cursor-default' : 'cursor-pointer'}`}
              style={{
                transform: `translateX(${c.tx}) translateY(-50%) translateZ(${c.tz}) rotateY(${c.ry}) scale(${c.scale})`,
                zIndex: c.z,
                opacity: c.opacity,
                filter: `blur(${c.blur}px) grayscale(${c.gray}%)`,
                transition: 'all 0.7s cubic-bezier(0.25,0.46,0.45,0.94)',
                transformStyle: 'preserve-3d',
                willChange: 'transform, opacity, filter',
              }}
              onClick={() => !isCenter && goToSlide(service.originalIndex)}
            >
              <ServiceCard service={service} isActive={isCenter} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ─── Main section ─────────────────────────────────────────────────────
const ServicesSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setIsVisible(true); },
      { threshold: 0.05 }
    );
    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  const navigate = useCallback((dir: 'next' | 'prev') => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) =>
      dir === 'next' ? (prev + 1) % services.length : (prev - 1 + services.length) % services.length
    );
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  const goToSlide = useCallback((i: number) => {
    if (isAnimating || i === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(i);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, currentIndex]);

  const current = services[currentIndex];

  return (
    <section
      ref={containerRef}
      id="services"
      className="relative overflow-hidden bg-background"
      style={{ paddingBottom: isMobile ? '2rem' : '7rem' }}
    >
      {/* Ambient bg */}
      <div
        className="absolute inset-0 transition-all duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 70% 50% at 50% 100%, ${current.color}12 0%, transparent 65%)`,
        }}
      />

      {/* Floating particles — desktop only, reduced count */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/20 animate-pulse"
            style={{
              left: `${(i * 20) % 100}%`,
              top: `${(i * 18) % 100}%`,
              animationDuration: `${6 + i * 1.5}s`,
              animationDelay: `${i * 0.8}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 md:px-6">

        {/* ── Header ─────────────────────────────────────────── */}
        <div
          className={`text-center transition-all duration-800 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          } ${isMobile ? 'pt-10 pb-6' : 'pt-16 pb-16'}`}
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="w-4 h-4" style={{ color: current.color }} />
            <span
              className="text-xs font-bold tracking-widest uppercase transition-colors duration-500"
              style={{ color: current.color }}
            >
              Nossos Serviços
            </span>
            <Sparkles className="w-4 h-4" style={{ color: current.color }} />
          </div>

          <h2
            className={`font-black leading-tight section-title-animate ${
              isMobile
                ? 'text-2xl mb-2'
                : 'text-4xl md:text-5xl lg:text-6xl mb-4'
            }`}
          >
            <span className="text-foreground">Soluções de marketing digital que</span>
            {!isMobile && <br />}
            {isMobile && ' '}
            <span
              className="transition-all duration-700"
              style={{
                color: current.color,
                textShadow: `0 0 28px ${current.color}40`,
              }}
            >
              transformam negócios
            </span>
          </h2>

          {!isMobile && (
            <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
              Cada serviço foi estruturado para gerar resultado real e impulsionar o crescimento da sua empresa.
            </p>
          )}
        </div>

        {/* ── Carousel area ───────────────────────────────────── */}
        <div
          className={`transition-all duration-800 delay-150 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {isMobile ? (
            /* -mx-4 cancela o px-4 do container, alinhando o carousel à borda real da tela */
            <div className="-mx-4">
              <MobilePeekCarousel
                currentIndex={currentIndex}
                navigate={navigate}
                goToSlide={goToSlide}
              />
            </div>
          ) : (
            <>
              <DesktopCarousel currentIndex={currentIndex} goToSlide={goToSlide} />

              {/* Desktop navigation */}
              <div className="flex items-center justify-center gap-5 mt-8">
                <button
                  onClick={() => navigate('prev')}
                  disabled={isAnimating}
                  className="group w-11 h-11 rounded-full border border-border/30 bg-card/30 backdrop-blur-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-primary/5 disabled:opacity-30 transition-all duration-300"
                  aria-label="Anterior"
                >
                  <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                </button>
                <div className="flex items-center gap-2">
                  {services.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => goToSlide(i)}
                      aria-label={`Ir para ${s.title}`}
                      style={{
                        width: i === currentIndex ? '24px' : '6px',
                        height: '6px',
                        borderRadius: '9999px',
                        backgroundColor: i === currentIndex ? s.color : 'hsl(var(--muted-foreground)/0.2)',
                        boxShadow: i === currentIndex ? `0 0 12px ${s.color}60` : 'none',
                        transition: 'all 0.4s ease',
                      }}
                    />
                  ))}
                </div>
                <button
                  onClick={() => navigate('next')}
                  disabled={isAnimating}
                  className="group w-11 h-11 rounded-full border border-border/30 bg-card/30 backdrop-blur-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-primary/5 disabled:opacity-30 transition-all duration-300"
                  aria-label="Próximo"
                >
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </>
          )}
        </div>

        {/* ── CTA ─────────────────────────────────────────────── */}
        <div
          className={`flex flex-col items-center gap-3 transition-all duration-800 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          } ${isMobile ? 'mt-6' : 'mt-12'}`}
        >
          <Button
            className="btn-hero group text-sm px-7 py-5"
            onClick={() => window.open('https://wa.me/5519981134193', '_blank')}
          >
            <span>Solicitar Orçamento</span>
            <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Button>
          <p className="text-xs text-muted-foreground">
            <Sparkles className="w-3 h-3 inline-block text-primary mr-1" />
            Resposta em até <span className="text-primary font-bold">24 horas</span>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.2; }
          50% { transform: translateY(-18px) rotate(180deg); opacity: 0.45; }
        }
        .animate-float { animation: float linear infinite; }
      `}</style>
    </section>
  );
};

export default ServicesSection;
