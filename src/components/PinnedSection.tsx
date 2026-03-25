import { useState, useEffect, useRef } from 'react';
import { ArrowDown, Sparkles, Zap, Target, TrendingUp, Play, Volume2, VolumeX } from 'lucide-react';

// Dados das "slides" com estética Goat Agency
const slides = [
  {
    id: 1,
    headline: "ESTRATÉGIA",
    subline: "que gera resultados consistentes",
    description: "Não criamos campanhas bonitas. Criamos máquinas de crescimento sustentáveis no longo prazo.",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&h=1080&fit=crop&q=80",
    accent: "hsl(var(--primary))",
    icon: Target,
  },
  {
    id: 2,
    headline: "VELOCIDADE",
    subline: "com direção e execução",
    description: "Decisões rápidas, execução ágil e foco no que realmente move o negócio. Agilidade sem perder estratégia.",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1920&h=1080&fit=crop&q=80",
    accent: "hsl(var(--secondary))",
    icon: Zap,
  },
  {
    id: 3,
    headline: "PERFORMANCE",
    subline: "de alto impacto orientada a resultado real",
    description: "Dados, métricas e otimização contínua para transformar marketing em crescimento mensurável.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1920&h=1080&fit=crop&q=80",
    accent: "hsl(var(--primary-glow))",
    icon: TrendingUp,
  },
  {
    id: 4,
    headline: "CRIATIVIDADE",
    subline: "com propósito e resultado",
    description: "Ideias que não existem apenas para chamar atenção, mas para sustentar posicionamento, conversão e legado.",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1920&h=1080&fit=crop&q=80",
    accent: "hsl(var(--primary))",
    icon: Sparkles,
  },
];

const PinnedSection = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showFinalReveal, setShowFinalReveal] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [videoMuted, setVideoMuted] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = rect.height;
      
      if (rect.top <= windowHeight && rect.bottom >= 0) {
        let progress = 0;
        
        if (rect.top <= 0) {
          progress = Math.abs(rect.top) / (sectionHeight - windowHeight);
        } else {
          progress = (windowHeight - rect.top) / windowHeight * 0.1;
        }
        
        const clampedProgress = Math.min(Math.max(progress, 0), 1);
        setScrollProgress(clampedProgress);
        
        // Determina qual slide mostrar
        const slideIndex = Math.min(
          Math.floor(clampedProgress * slides.length),
          slides.length - 1
        );
        setCurrentSlide(slideIndex);

        // Trigger final reveal when reaching 100%
        if (clampedProgress >= 0.98 && !showFinalReveal) {
          setShowFinalReveal(true);
        } else if (clampedProgress < 0.95) {
          setShowFinalReveal(false);
          setVideoPlaying(false);
        }
      } else {
        setScrollProgress(0);
        setCurrentSlide(0);
        setShowFinalReveal(false);
      }
    };

    let ticking = false;
    const optimizedHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    optimizedHandleScroll();
    window.addEventListener('scroll', optimizedHandleScroll, { passive: true });
    window.addEventListener('resize', optimizedHandleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', optimizedHandleScroll);
      window.removeEventListener('resize', optimizedHandleScroll);
    };
  }, [showFinalReveal]);

  // Handle video playback
  useEffect(() => {
    if (videoRef.current) {
      if (videoPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [videoPlaying]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = videoMuted;
    }
  }, [videoMuted]);

  const slide = slides[currentSlide];
  const Icon = slide?.icon || Target;

  return (
    <section 
      ref={sectionRef}
      className="relative h-[200vh] sm:h-[250vh] md:h-[400vh] lg:h-[500vh] bg-background"
    >
      {/* Conteúdo fixo */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        
        {/* Background slides */}
        {slides.map((s, index) => (
          <div 
            key={s.id}
            className="absolute inset-0 transition-all duration-1000 ease-out"
            style={{
              backgroundImage: `url('${s.image}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: currentSlide === index && !showFinalReveal ? 0.4 : 0,
              transform: `scale(${currentSlide === index ? 1.05 : 1.1})`,
              filter: 'brightness(0.5) contrast(1.1)',
            }}
          />
        ))}

        {/* Video background for final reveal */}
        <div 
          className={`absolute inset-0 transition-opacity duration-1000 ${
            showFinalReveal ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            loop
            playsInline
            muted={videoMuted}
            poster="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&h=1080&fit=crop&q=80"
          >
            <source src="https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/40" />
        </div>
        
        {/* Dynamic gradient overlay */}
        <div 
          className={`absolute inset-0 transition-all duration-700 ${showFinalReveal ? 'opacity-0' : 'opacity-100'}`}
          style={{
            background: `linear-gradient(135deg, 
              hsl(var(--background) / 0.9) 0%, 
              hsl(var(--background) / 0.7) 50%,
              hsl(var(--background) / 0.85) 100%)`,
          }}
        />

        {/* Animated grid background */}
        <div 
          className={`absolute inset-0 transition-opacity duration-1000 ${showFinalReveal ? 'opacity-0' : 'opacity-100'}`}
          style={{
            backgroundImage: `
              linear-gradient(${slide?.accent || 'hsl(var(--primary))'} 1px, transparent 1px),
              linear-gradient(90deg, ${slide?.accent || 'hsl(var(--primary))'} 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            opacity: 0.03 + scrollProgress * 0.02,
          }}
        />

        {/* Floating accent shapes */}
        <div 
          className={`absolute top-10 right-5 sm:top-20 sm:right-20 w-32 sm:w-64 h-32 sm:h-64 rounded-full blur-3xl transition-all duration-1000 ${showFinalReveal ? 'opacity-0' : 'opacity-100'}`}
          style={{
            background: slide?.accent || 'hsl(var(--primary))',
            opacity: 0.1 + scrollProgress * 0.1,
            transform: `translate(${scrollProgress * -50}px, ${scrollProgress * 30}px)`,
          }}
        />
        <div 
          className={`absolute bottom-10 left-5 sm:bottom-20 sm:left-20 w-24 sm:w-48 h-24 sm:h-48 rounded-full blur-3xl transition-all duration-1000 ${showFinalReveal ? 'opacity-0' : 'opacity-100'}`}
          style={{
            background: 'hsl(var(--secondary))',
            opacity: 0.1 + scrollProgress * 0.1,
            transform: `translate(${scrollProgress * 50}px, ${scrollProgress * -30}px)`,
          }}
        />

        {/* Main content */}
        <div className={`relative z-10 container mx-auto px-4 sm:px-6 transition-all duration-700 ${showFinalReveal ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            
            {/* Left: Text content */}
            <div className="text-center lg:text-left">
              {/* Slide indicator */}
              <div className="flex items-center gap-4 mb-8 justify-center lg:justify-start">
                <div 
                  className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-500"
                  style={{ 
                    background: slide?.accent || 'hsl(var(--primary))',
                    boxShadow: `0 0 40px ${slide?.accent || 'hsl(var(--primary))'}40`,
                  }}
                >
                  <Icon className="w-5 h-5 sm:w-7 sm:h-7 text-background" />
                </div>
                <div className="text-sm text-muted-foreground">
                  <span className="text-primary font-bold">{String(currentSlide + 1).padStart(2, '0')}</span>
                  <span className="mx-2">/</span>
                  <span>{String(slides.length).padStart(2, '0')}</span>
                </div>
              </div>

              {/* Headline with animated transition */}
              <div className="overflow-hidden mb-4">
              <h2 
                  key={slide?.headline}
                  className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-black animate-fade-in leading-tight section-title-animate"
                  style={{ 
                    color: slide?.accent || 'hsl(var(--primary))',
                    textShadow: `0 0 60px ${slide?.accent || 'hsl(var(--primary))'}40`,
                  }}
                >
                  {slide?.headline}
                </h2>
              </div>
              
              <div className="overflow-hidden mb-4 sm:mb-6">
              <h3 
                  key={slide?.subline}
                  className="text-base sm:text-xl md:text-3xl lg:text-4xl font-bold text-foreground animate-fade-in leading-snug"
                  style={{ animationDelay: '100ms' }}
                >
                  {slide?.subline}
                </h3>
              </div>
              
              <p 
                key={slide?.description}
                className="text-sm sm:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 animate-fade-in leading-relaxed"
                style={{ animationDelay: '200ms' }}
              >
                {slide?.description}
              </p>
            </div>

            {/* Right: Visual element */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative">
                {/* Orbital rings */}
                <div 
                  className="absolute inset-0 w-80 h-80 border-2 rounded-full animate-spin-slow"
                  style={{ 
                    borderColor: `${slide?.accent || 'hsl(var(--primary))'}30`,
                    animationDuration: '20s',
                  }}
                />
                <div 
                  className="absolute inset-4 w-72 h-72 border rounded-full animate-spin-slow"
                  style={{ 
                    borderColor: `${slide?.accent || 'hsl(var(--primary))'}20`,
                    animationDuration: '15s',
                    animationDirection: 'reverse',
                  }}
                />
                
                {/* Center element */}
                <div 
                  className="relative w-80 h-80 rounded-full flex items-center justify-center"
                  style={{
                    background: `radial-gradient(circle, ${slide?.accent || 'hsl(var(--primary))'}15 0%, transparent 70%)`,
                  }}
                >
                  {/* Progress percentage */}
                  <div className="text-center">
                    <div 
                      className="text-7xl md:text-8xl font-black mb-2 transition-all duration-300"
                      style={{ 
                        color: slide?.accent || 'hsl(var(--primary))',
                        textShadow: `0 0 40px ${slide?.accent || 'hsl(var(--primary))'}60`,
                      }}
                    >
                      {Math.round(scrollProgress * 100)}%
                    </div>
                    <div className="text-muted-foreground font-medium">
                      IMERSÃO COMPLETA
                    </div>
                  </div>
                </div>

                {/* Floating dots */}
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-3 h-3 rounded-full animate-float"
                    style={{
                      background: slide?.accent || 'hsl(var(--primary))',
                      top: `${20 + i * 12}%`,
                      left: i % 2 === 0 ? '-10%' : '105%',
                      animationDelay: `${i * 0.3}s`,
                      opacity: 0.6,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Progress bar - Goat style */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-md px-4">
            <div className="flex items-center gap-2 mb-4 justify-center">
              {slides.map((_, index) => (
                <div 
                  key={index}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    index === currentSlide ? 'w-12' : 'w-4'
                  }`}
                  style={{
                    background: index === currentSlide 
                      ? slide?.accent || 'hsl(var(--primary))'
                      : 'hsl(var(--muted-foreground) / 0.2)',
                    boxShadow: index === currentSlide 
                      ? `0 0 10px ${slide?.accent || 'hsl(var(--primary))'}60` 
                      : 'none',
                  }}
                />
              ))}
            </div>
            
            {/* Scroll indicator */}
          </div>
        </div>

        {/* FINAL REVEAL - "Nós somos 100%" with Video */}
        <div 
          className={`absolute inset-0 z-20 flex items-center justify-center transition-all duration-1000 ${
            showFinalReveal ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="container mx-auto px-4">
            <div className="text-center">
              {/* "Nós somos" text */}
              <div 
                className={`transition-all duration-700 ${
                  showFinalReveal ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: '200ms' }}
              >
                <span className="text-xl sm:text-2xl md:text-4xl font-medium text-foreground/80 tracking-wide">
                  Nós somos
                </span>
              </div>

              {/* Animated 100% moving to the right */}
              <div 
                className={`relative mt-4 mb-8 transition-all duration-1000 ${
                  showFinalReveal ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div 
                  className={`inline-block transition-all duration-1000 ease-out ${
                    showFinalReveal ? 'translate-x-0 md:translate-x-20 lg:translate-x-32' : 'translate-x-0'
                  }`}
                  style={{ transitionDelay: '400ms' }}
                >
                <span 
                    className="text-5xl sm:text-7xl md:text-[10rem] lg:text-[14rem] font-black"
                    style={{
                      background: 'linear-gradient(135deg, hsl(45, 96%, 75%) 0%, hsl(45, 96%, 64%) 40%, hsl(38, 92%, 50%) 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      filter: 'drop-shadow(0 0 40px hsla(45, 96%, 64%, 0.5))',
                    }}
                  >
                    100%
                  </span>
                </div>
              </div>

              {/* Marketing Digital label */}
              <div 
                className={`transition-all duration-700 ${
                  showFinalReveal ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: '600ms' }}
              >
                <span 
                   className="text-xl md:text-3xl lg:text-4xl font-bold tracking-widest uppercase"
                   style={{ color: 'hsl(var(--primary))' }}
                 >
                   Resultado
                 </span>
              </div>

              {/* Play video button */}
              <div 
                className={`mt-12 flex items-center justify-center gap-4 transition-all duration-700 ${
                  showFinalReveal ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: '800ms' }}
              >
                <button
                  onClick={() => setVideoPlaying(!videoPlaying)}
                  className="group relative flex items-center gap-3 px-8 py-4 rounded-full bg-primary/20 border border-primary/40 hover:bg-primary/30 transition-all duration-300"
                >
                  <Play 
                    className={`w-6 h-6 text-primary transition-transform duration-300 ${
                      videoPlaying ? 'scale-0' : 'scale-100'
                    }`}
                    fill="currentColor"
                  />
                  <span className="text-foreground font-semibold">
                    {videoPlaying ? 'Pausar' : 'Ver em ação'}
                  </span>
                  
                  {/* Pulse ring */}
                  {!videoPlaying && (
                    <div className="absolute inset-0 rounded-full border-2 border-primary animate-ping opacity-30" />
                  )}
                </button>

                {videoPlaying && (
                  <button
                    onClick={() => setVideoMuted(!videoMuted)}
                    className="p-4 rounded-full bg-muted/30 hover:bg-muted/50 transition-all duration-300"
                  >
                    {videoMuted ? (
                      <VolumeX className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <Volume2 className="w-5 h-5 text-primary" />
                    )}
                  </button>
                )}
              </div>

              {/* Decorative elements */}
              <div 
                className={`absolute bottom-20 left-1/2 -translate-x-1/2 transition-all duration-700 ${
                  showFinalReveal ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ transitionDelay: '1000ms' }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-px bg-gradient-to-r from-transparent to-primary" />
                  <span className="text-xs tracking-[0.3em] text-muted-foreground uppercase">
                    MOV Marketing
                  </span>
                  <div className="w-16 h-px bg-gradient-to-l from-transparent to-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Side progress indicator */}
        <div className={`absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 transition-opacity duration-500 ${showFinalReveal ? 'opacity-0' : 'opacity-100'}`}>
          <div className="flex flex-col items-center gap-3">
            {slides.map((_, index) => (
              <div 
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-500 ${
                  index === currentSlide ? 'scale-150' : 'scale-100'
                }`}
                style={{
                  background: index === currentSlide 
                    ? slide?.accent || 'hsl(var(--primary))'
                    : 'hsl(var(--muted-foreground) / 0.3)',
                  boxShadow: index === currentSlide 
                    ? `0 0 15px ${slide?.accent || 'hsl(var(--primary))'}` 
                    : 'none',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Custom styles */}
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow linear infinite;
        }
      `}</style>
    </section>
  );
};

export default PinnedSection;
