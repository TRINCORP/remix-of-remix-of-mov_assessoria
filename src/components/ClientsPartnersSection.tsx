import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Sparkles, Star, Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useIsMobile } from '@/hooks/use-mobile';

// Import all client logos from organized assets
import logoAlineBritto from '@/assets/clients/aline-britto.png';
import logoCafeAbelha from '@/assets/clients/cafe-abelha.png';
import logoCarolione from '@/assets/clients/carolione.png';
import logoCristianeLoureiro from '@/assets/clients/cristiane-loureiro.png';
import logoCruSemDisfarces from '@/assets/clients/cru-sem-disfarces.png';
import logoFYAudioVisual from '@/assets/clients/fy-audiovisual.png';
import logoFertiQuimica from '@/assets/clients/fertiquimica.png';
import logoGeloToy from '@/assets/clients/gelo-toy.png';
import logoKelbyFigueiredo from '@/assets/clients/kelby-figueiredo.png';
import logoLCTec from '@/assets/clients/lc-tec.png';
import logoMiriamVieira from '@/assets/clients/miriam-vieira.png';
import logoMundoZitrus from '@/assets/clients/mundo-zitrus.png';
import logoSDGGuincho from '@/assets/clients/sdg-guincho.png';
import logoWolfs from '@/assets/clients/wolfs.png';
import logoTrincorp from '@/assets/clients/trincorp.png';

// Logos that need a white background (circular/colored logos that don't work with invert)
const needsWhiteBg = new Set<string>();

const clients = [
  { name: "Aline Britto MMC", logo: logoAlineBritto },
  { name: "Café Abelha", logo: logoCafeAbelha },
  { name: "Carolione Social Media", logo: logoCarolione },
  { name: "Cristiane Loureiro", logo: logoCristianeLoureiro },
  { name: "Cru Sem Disfarces", logo: logoCruSemDisfarces },
  { name: "FY Audio Visual", logo: logoFYAudioVisual },
  { name: "FertiQuímica", logo: logoFertiQuimica },
  { name: "CocoToy", logo: logoGeloToy },
  { name: "Kelby Figueiredo", logo: logoKelbyFigueiredo },
  { name: "LC Tec", logo: logoLCTec },
  { name: "Miriam Vieira", logo: logoMiriamVieira },
  { name: "Mundo Zitrus", logo: logoMundoZitrus },
  { name: "SDG Guincho", logo: logoSDGGuincho },
  { name: "Wolfs", logo: logoWolfs },
  { name: "Trincorp", logo: logoTrincorp },
];

// 3D Floating Card Component with magnetic effect
const FloatingLogoCard = ({ 
  client, 
  index, 
  isHovered, 
  onHover, 
  onLeave,
  isLightMode
}: { 
  client: typeof clients[0]; 
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  isLightMode?: boolean;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(y, [-100, 100], [15, -15]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-15, 15]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    onLeave();
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative group cursor-pointer"
      initial={{ opacity: 0, y: 60, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={onHover}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: "1000px"
      }}
    >
      {/* Glow effect behind card - pure CSS */}
      <div 
        className="absolute -inset-3 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "radial-gradient(circle at center, hsl(var(--primary) / 0.4) 0%, transparent 70%)",
          filter: "blur(20px)",
          transform: "translateZ(-20px)"
        }}
      />
      
      {/* Main card */}
      <motion.div
        className="relative w-36 h-36 md:w-44 md:h-44 lg:w-48 lg:h-48 rounded-2xl overflow-hidden"
        style={{
          transformStyle: "preserve-3d",
          transform: "translateZ(0px)"
        }}
        whileHover={{ 
          scale: 1.08,
          transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
        }}
      >
        {/* Glass morphism background - dark bg forced in light mode for logo visibility */}
        <div className={`absolute inset-0 backdrop-blur-xl border border-border/50 ${
          isLightMode 
            ? 'bg-gradient-to-br from-gray-900/95 via-gray-900/90 to-gray-800/90' 
            : 'bg-gradient-to-br from-card/90 via-card/80 to-card/70'
        }`} />
        
        {/* Border gradient on hover - CSS only */}
        <div 
          className={`absolute inset-0 rounded-2xl transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          style={{
            background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 50%, hsl(var(--primary)) 100%)",
            padding: "2px",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "xor",
            WebkitMaskComposite: "xor"
          }}
        />
        
        {/* Logo container */}
        <div className="relative z-10 w-full h-full p-4 md:p-5 flex items-center justify-center">
          {needsWhiteBg.has(client.name) ? (
            <div 
              className="w-full h-full rounded-xl flex items-center justify-center p-3 md:p-4"
              style={{ 
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                transform: "translateZ(30px)"
              }}
            >
              <motion.img
                src={client.logo}
                alt={client.name}
                className="max-w-full max-h-full object-contain"
                style={{ filter: "grayscale(100%) contrast(1.1)" }}
                loading="lazy"
              />
            </div>
          ) : (
            <motion.img
              src={client.logo}
              alt={client.name}
              className="max-w-full max-h-full object-contain transition-all duration-500"
              style={{
                filter: "grayscale(100%) brightness(0) invert(1) opacity(0.85)",
                transform: "translateZ(30px)"
              }}
              loading="lazy"
            />
          )}
        </div>
        
        {/* Shine effect - CSS transition */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 45%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.15) 55%, transparent 60%)",
          }}
        />
        
        {/* Sparkle icon on hover - simplified, no AnimatePresence per particle */}
        {isHovered && (
          <div className="absolute top-2 right-2 text-primary animate-fade-in">
            <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
          </div>
        )}
      </motion.div>
      
      {/* Client name tooltip */}
      <motion.div
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-all duration-300"
        style={{ transform: "translateZ(40px) translateX(-50%)" }}
      >
        {client.name}
      </motion.div>
    </motion.div>
  );
};

// Floating orbs background - pure CSS animations for zero JS overhead
const FloatingOrbs = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(3)].map((_, i) => (
      <div
        key={i}
        className="absolute rounded-full animate-pulse"
        style={{
          width: `${120 + i * 80}px`,
          height: `${120 + i * 80}px`,
          background: `radial-gradient(circle at center, hsl(var(--primary) / ${0.06 - i * 0.015}) 0%, transparent 70%)`,
          left: `${15 + i * 30}%`,
          top: `${25 + (i % 2) * 30}%`,
          animationDuration: `${6 + i * 3}s`,
          animationDelay: `${i * 0.8}s`,
        }}
      />
    ))}
  </div>
);

// Animated counter
const AnimatedStat = ({ value, label, icon: Icon }: { value: string; label: string; icon: any }) => (
  <motion.div 
    className="flex flex-col items-center gap-2 p-4"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    <div className="flex items-center gap-2">
      <Icon className="w-5 h-5 text-primary" />
      <span className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
        {value}
      </span>
    </div>
    <span className="text-sm text-muted-foreground">{label}</span>
  </motion.div>
);

interface ClientsPartnersSectionProps {
  theme?: string;
}

const ClientsPartnersSection = ({ theme = 'dark' }: ClientsPartnersSectionProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  const autoplayPlugin = useRef(
    Autoplay({ delay: 2500, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true, 
      align: 'start',
      slidesToScroll: 1,
      dragFree: true,
    },
    [autoplayPlugin.current as any]
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const handleCardHover = (index: number) => {
    setHoveredIndex(index);
    setIsPaused(true);
    autoplayPlugin.current.stop();
  };

  const handleCardLeave = () => {
    setHoveredIndex(null);
    setIsPaused(false);
    autoplayPlugin.current.play();
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-b from-background via-background/95 to-background"
    >
      {/* Background effects */}
      <FloatingOrbs />
      
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.03)_0%,transparent_70%)]" />
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: "60px 60px"
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center max-w-4xl mx-auto mb-12 md:mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Badge */}
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Star className="w-4 h-4 text-primary fill-primary" />
            <span className="text-sm font-medium text-primary">Confiança que gera resultados</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-4 overflow-visible">
            <motion.span
              className="inline-block text-foreground"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              Nossos{" "}
            </motion.span>
            <motion.span
              className="relative inline-block"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Glow pulsante atrás do texto */}
              <motion.span
                className="absolute inset-0 -inset-x-4 blur-2xl rounded-full pointer-events-none"
                style={{ background: 'linear-gradient(to right, hsl(var(--primary) / 0.5), hsl(var(--secondary) / 0.6), hsl(var(--primary) / 0.5))' }}
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                aria-hidden="true"
              />
              <span
                className="relative bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent section-title-shimmer"
                style={{ backgroundSize: '200% auto' }}
              >
                Clientes & Parceiros
              </span>
              {/* Underline animada */}
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-primary via-secondary to-primary section-title-shimmer"
                style={{ backgroundSize: '200% auto' }}
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.7 }}
              />
            </motion.span>
          </h2>
          
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Marcas que escolheram transformar sua presença digital conosco.
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div 
          className="flex flex-wrap justify-center gap-6 md:gap-12 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <AnimatedStat value={`${clients.length}+`} label="Parceiros ativos" icon={Star} />
          <AnimatedStat value="100%" label="Satisfação" icon={Sparkles} />
          <AnimatedStat value="5+" label="Anos de experiência" icon={Zap} />
        </motion.div>

        {/* Carousel Container */}
        <div className="relative group">
          {/* Navigation Arrows */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 md:-left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-card/90 backdrop-blur-sm border border-border/50 flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-lg"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          
          <button
            onClick={scrollNext}
            className="absolute right-0 md:-right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-card/90 backdrop-blur-sm border border-border/50 flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-lg"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          {/* Carousel */}
          <div className="overflow-hidden px-4" ref={emblaRef}>
            <div className="flex gap-4 md:gap-6">
              {clients.map((client, index) => (
                <div 
                  key={client.name} 
                  className="flex-shrink-0"
                  style={{ 
                    width: isMobile ? 'calc(50% - 8px)' : 'calc(20% - 19.2px)'
                  }}
                >
                  <FloatingLogoCard
                    client={client}
                    index={index}
                    isHovered={hoveredIndex === index}
                    onHover={() => handleCardHover(index)}
                    onLeave={handleCardLeave}
                    isLightMode={theme === 'light'}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Pause indicator */}
          <AnimatePresence>
            {isPaused && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-xs text-primary"
              >
                Pausado
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-muted-foreground mb-4">
            Sua marca pode ser a próxima a fazer parte dessa história
          </p>
          <motion.a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground font-medium shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Sparkles className="w-4 h-4" />
            Seja nosso parceiro
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default ClientsPartnersSection;
