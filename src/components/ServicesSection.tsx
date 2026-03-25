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
    stats: [
      { value: "12x", label: "ROAS" },
      { value: "-65%", label: "CAC" },
    ],
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
    stats: [
      { value: "3x", label: "conversões" },
      { value: "+200%", label: "eficiência" },
    ],
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
    stats: [
      { value: "+180%", label: "conversão" },
      { value: "50+", label: "projetos" },
    ],
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
    stats: [
      { value: "5M+", label: "alcance" },
      { value: "+320%", label: "engajamento" },
    ],
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
    stats: [
      { value: "4K+", label: "qualidade" },
      { value: "100+", label: "produções" },
    ],
  },
];

const ServicesSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const minSwipeDistance = 50;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const navigate = useCallback((dir: 'next' | 'prev') => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(dir);
    setPrevIndex(currentIndex);
    
    if (dir === 'next') {
      setCurrentIndex((prev) => (prev + 1) % services.length);
    } else {
      setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
    }
    
    setTimeout(() => setIsAnimating(false), 600);
  }, [isAnimating, currentIndex]);

  const goToSlide = useCallback((index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setDirection(index > currentIndex ? 'next' : 'prev');
    setPrevIndex(currentIndex);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 600);
  }, [isAnimating, currentIndex]);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      navigate('next');
    } else if (isRightSwipe) {
      navigate('prev');
    }
  };

  const currentService = services[currentIndex];

  // Mobile Card Component
  const MobileCard = ({ service, isActive }: { service: Service; isActive: boolean }) => {
    const Icon = service.icon;
    
    return (
      <div
        className={`
          flex-shrink-0 w-[85vw] max-w-[320px] mx-auto
          transition-all duration-500 ease-out
          ${isActive ? 'opacity-100 scale-100' : 'opacity-40 scale-95'}
        `}
      >
        <div 
          className="bg-card/95 backdrop-blur-md rounded-2xl overflow-hidden border border-border/30"
          style={{
            boxShadow: isActive 
              ? `0 20px 60px -15px ${service.color}40, 0 10px 30px -10px rgba(0,0,0,0.3)` 
              : '0 5px 20px -5px rgba(0,0,0,0.15)',
            borderColor: isActive ? `${service.color}40` : undefined,
          }}
        >
          <div className="relative h-36 overflow-hidden">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div 
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to top, hsl(var(--card)) 5%, ${service.color}15 60%, transparent 100%)`,
              }}
            />
            
            <div 
              className="absolute top-3 left-3 w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ 
                backgroundColor: service.color,
                boxShadow: `0 6px 20px ${service.color}50`,
              }}
            >
              <Icon className="w-5 h-5 text-black" />
            </div>
          </div>

          <div className="p-4">
            <span 
              className="text-[10px] font-bold tracking-[0.15em] uppercase mb-1 block"
              style={{ color: service.color }}
            >
              {service.tagline}
            </span>

            <h3 className="text-lg font-black text-foreground mb-2 tracking-tight">
              {service.title}
            </h3>

            <p className="text-muted-foreground text-xs mb-3 leading-relaxed">
              {service.description}
            </p>

            <div className="flex flex-wrap gap-1.5 mb-3">
              {service.features.map((feature, i) => (
                <span 
                  key={i}
                  className="px-2 py-0.5 rounded-full text-[9px] font-medium bg-muted/50 text-muted-foreground border border-border/30"
                >
                  {feature}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4 pt-3 border-t border-border/30">
              {service.stats.map((stat, i) => (
                <div key={i}>
                  <span 
                    className="text-lg font-black block"
                    style={{ color: service.color }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-[9px] text-muted-foreground uppercase tracking-wider">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Desktop Card with 3D effect
  const DesktopCarousel = () => {
    const getVisibleCards = () => {
      const result = [];
      for (let i = -2; i <= 2; i++) {
        const index = (currentIndex + i + services.length) % services.length;
        result.push({ ...services[index], position: i, originalIndex: index });
      }
      return result;
    };

    const visibleCards = getVisibleCards();

    return (
      <div className="relative h-[520px] flex items-center justify-center">
        <div className="relative w-full h-full" style={{ perspective: '1200px' }}>
          {visibleCards.map((service) => {
            const Icon = service.icon;
            const isCenter = service.position === 0;
            const isLeft = service.position === -1;
            const isRight = service.position === 1;
            const isFarLeft = service.position === -2;
            const isFarRight = service.position === 2;
            
            let translateX = '0%';
            let translateZ = '0px';
            let rotateY = '0deg';
            let scale = 1;
            let opacity = 1;
            let blur = 0;
            let grayscale = 0;
            let zIndex = 0;

            if (isCenter) {
              translateX = '-50%';
              translateZ = '60px';
              rotateY = '0deg';
              scale = 1;
              opacity = 1;
              zIndex = 50;
            } else if (isLeft) {
              translateX = '-130%';
              translateZ = '-50px';
              rotateY = '20deg';
              scale = 0.82;
              opacity = 0.6;
              blur = 2;
              grayscale = 30;
              zIndex = 30;
            } else if (isRight) {
              translateX = '30%';
              translateZ = '-50px';
              rotateY = '-20deg';
              scale = 0.82;
              opacity = 0.6;
              blur = 2;
              grayscale = 30;
              zIndex = 30;
            } else if (isFarLeft) {
              translateX = '-200%';
              translateZ = '-120px';
              rotateY = '35deg';
              scale = 0.6;
              opacity = 0.2;
              blur = 4;
              grayscale = 60;
              zIndex = 10;
            } else if (isFarRight) {
              translateX = '100%';
              translateZ = '-120px';
              rotateY = '-35deg';
              scale = 0.6;
              opacity = 0.2;
              blur = 4;
              grayscale = 60;
              zIndex = 10;
            }

            return (
              <div
                key={`${service.id}-${service.position}`}
                className={`absolute left-1/2 top-1/2 w-[340px] ${
                  isCenter ? 'cursor-default' : 'cursor-pointer'
                }`}
                style={{
                  transform: `translateX(${translateX}) translateY(-50%) translateZ(${translateZ}) rotateY(${rotateY}) scale(${scale})`,
                  zIndex,
                  opacity,
                  filter: `blur(${blur}px) grayscale(${grayscale}%)`,
                  transition: 'all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  transformStyle: 'preserve-3d',
                  willChange: 'transform, opacity, filter',
                }}
                onClick={() => !isCenter && goToSlide(service.originalIndex)}
              >
                <div 
                  className="bg-card/95 backdrop-blur-md rounded-2xl overflow-hidden border"
                  style={{
                    borderColor: isCenter ? `${service.color}50` : 'hsl(var(--border) / 0.2)',
                    boxShadow: isCenter 
                      ? `0 30px 80px -20px ${service.color}50, 0 15px 40px -15px rgba(0,0,0,0.35)` 
                      : '0 10px 30px -10px rgba(0,0,0,0.2)',
                    transition: 'box-shadow 0.7s ease, border-color 0.5s ease',
                  }}
                >
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700"
                      style={{
                        transform: isCenter ? 'scale(1.05)' : 'scale(1)',
                      }}
                      loading="lazy"
                    />
                    <div 
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(to top, hsl(var(--card)) 5%, ${service.color}15 60%, transparent 100%)`,
                      }}
                    />
                    
                    <div 
                      className="absolute top-4 left-4 w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-500"
                      style={{ 
                        backgroundColor: service.color,
                        boxShadow: `0 8px 24px ${service.color}50`,
                        transform: isCenter ? 'scale(1.1)' : 'scale(1)',
                      }}
                    >
                      <Icon className="w-6 h-6 text-black" />
                    </div>
                  </div>

                  <div className="p-5">
                    <span 
                      className="text-[10px] font-bold tracking-[0.2em] uppercase mb-1 block transition-colors duration-500"
                      style={{ color: service.color }}
                    >
                      {service.tagline}
                    </span>

                    <h3 className="text-xl font-black text-foreground mb-2 tracking-tight">
                      {service.title}
                    </h3>

                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {service.features.map((feature, i) => (
                        <span 
                          key={i}
                          className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-muted/40 text-muted-foreground border border-border/30"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-5 pt-4 border-t border-border/30">
                      {service.stats.map((stat, i) => (
                        <div key={i}>
                          <span 
                            className="text-xl font-black block transition-colors duration-500"
                            style={{ color: service.color }}
                          >
                            {stat.value}
                          </span>
                          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                            {stat.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <section ref={containerRef} className="relative py-16 md:py-28 overflow-hidden bg-background">
      {/* Animated background */}
      <div 
        className="absolute inset-0 transition-all duration-700 ease-out"
        style={{
          background: `radial-gradient(ellipse 80% 50% at 50% 100%, ${currentService.color}12 0%, transparent 60%)`,
        }}
      />

      {/* Floating particles - hidden on mobile for performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className={`text-center mb-10 md:mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="flex items-center justify-center gap-2 md:gap-3 mb-4 md:mb-6">
            <Sparkles 
              className="w-4 h-4 md:w-5 md:h-5 transition-colors duration-600"
              style={{ color: currentService.color }}
            />
            <span 
              className="text-xs md:text-sm font-bold tracking-widest uppercase transition-colors duration-600"
              style={{ color: currentService.color }}
            >
              Nossos Serviços
            </span>
            <Sparkles 
              className="w-4 h-4 md:w-5 md:h-5 transition-colors duration-600"
              style={{ color: currentService.color }}
            />
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-4 md:mb-6 section-title-animate">
            <span className="text-foreground block sm:inline">Soluções de marketing digital que</span>
            <br className="hidden sm:block" />
            <span 
              className="inline-block transition-all duration-700 ease-out relative"
              style={{
                color: currentService.color,
                textShadow: `0 0 30px ${currentService.color}40, 0 4px 20px ${currentService.color}25`,
              }}
            >
              transformam negócios
            </span>
          </h2>
          
          <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base px-4">
            Cada serviço foi estruturado para gerar resultado real e impulsionar o crescimento da sua empresa.
          </p>
        </div>

        {/* Carousel */}
        <div 
          className={`relative transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {isMobile ? (
            <div className="relative overflow-hidden" style={{ minHeight: '380px' }}>
              <div
                key={currentIndex}
                className="mobile-card-enter"
                style={{
                  animation: `slide-in-${direction === 'next' ? 'left' : 'right'} 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`,
                }}
              >
                <MobileCard service={currentService} isActive={true} />
              </div>
            </div>
          ) : (
            <DesktopCarousel />
          )}

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 md:gap-6 mt-8 md:mt-10">
            <button
              onClick={() => navigate('prev')}
              disabled={isAnimating}
              className="group w-10 h-10 md:w-11 md:h-11 rounded-full border border-border/30 bg-card/30 backdrop-blur-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-primary/5 disabled:opacity-30 transition-all duration-400"
              aria-label="Serviço anterior"
            >
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-300" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2 md:gap-2.5">
              {services.map((service, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className="group relative p-1"
                  aria-label={`Ir para ${service.title}`}
                >
                  <span 
                    className="block rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: index === currentIndex ? (isMobile ? '20px' : '24px') : '6px',
                      height: '6px',
                      backgroundColor: index === currentIndex ? service.color : 'hsl(var(--muted-foreground) / 0.2)',
                      boxShadow: index === currentIndex ? `0 0 14px ${service.color}60` : 'none',
                    }}
                  />
                </button>
              ))}
            </div>

            <button
              onClick={() => navigate('next')}
              disabled={isAnimating}
              className="group w-10 h-10 md:w-11 md:h-11 rounded-full border border-border/30 bg-card/30 backdrop-blur-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-primary/5 disabled:opacity-30 transition-all duration-400"
              aria-label="Próximo serviço"
            >
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
            </button>
          </div>
        </div>

        {/* CTA */}
        <div className={`flex flex-col items-center justify-center gap-4 md:gap-6 mt-12 md:mt-16 transition-all duration-1000 delay-400 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <Button 
            className="btn-hero group text-sm md:text-base px-6 md:px-8 py-5 md:py-6"
            onClick={() => window.open('https://wa.me/5519981134193', '_blank')}
          >
            <span>Solicitar Orçamento</span>
            <ArrowUpRight className="ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Button>
          
          <p className="text-xs md:text-sm text-muted-foreground">
            <Sparkles className="w-3.5 h-3.5 inline-block text-primary mr-1" /> Resposta em até <span className="text-primary font-bold">24 horas</span>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.2; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 0.5; }
        }
        .animate-float {
          animation: float linear infinite;
        }
        @keyframes slide-in-left {
          0% { transform: translateX(60px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        @keyframes slide-in-right {
          0% { transform: translateX(-60px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </section>
  );
};

export default ServicesSection;
