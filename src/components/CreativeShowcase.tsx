import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Search, Map, Settings, BarChart3, Brain, ChevronLeft, ChevronRight } from 'lucide-react';

import imgDiagnostico from '@/assets/process/diagnostico-estrategico.jpg';
import imgPlanejamento from '@/assets/process/planejamento-direcionamento.png';
import imgEstrutura from '@/assets/process/estrutura-processos.jpg';
import imgExecucao from '@/assets/process/execucao-performance.png';
import imgDecisao from '@/assets/process/decisao-execucao.jpg';

interface ProcessStep {
  id: number;
  cardTitle: string;
  title: string;
  subtitle: string[];
  image: string;
  caption: string;
  icon: typeof Search;
}

const steps: ProcessStep[] = [
  {
    id: 1,
    cardTitle: 'Diagnóstico Estratégico',
    title: 'Tudo começa antes da primeira campanha',
    subtitle: [
      'Antes de qualquer ação de marketing, mergulhamos no cenário, nos números e no posicionamento do seu negócio.',
      'Diagnóstico antes de execução.',
    ],
    image: imgDiagnostico,
    caption: 'Diagnóstico estratégico',
    icon: Search,
  },
  {
    id: 2,
    cardTitle: 'Planejamento e Direcionamento',
    title: 'Clareza que organiza o crescimento do negócio',
    subtitle: [
      'Transformamos análise em plano estruturado de marketing, com prioridades definidas e metas alinhadas aos objetivos reais da empresa.',
    ],
    image: imgPlanejamento,
    caption: 'Planejamento estratégico',
    icon: Map,
  },
  {
    id: 3,
    cardTitle: 'Estrutura e Processos',
    title: 'Processos de marketing que sustentam escala',
    subtitle: [
      'Nada é improvisado. Trabalhamos com fluxos internos claros, acompanhamento contínuo e organização operacional para crescer com consistência.',
    ],
    image: imgEstrutura,
    caption: 'Estrutura operacional',
    icon: Settings,
  },
  {
    id: 4,
    cardTitle: 'Execução e Performance',
    title: 'Marketing digital orientado por dados',
    subtitle: [
      'Criatividade guiada por métricas.',
      'Performance construída com acompanhamento constante e otimização baseada em resultado real.',
    ],
    image: imgExecucao,
    caption: 'Performance estratégica',
    icon: BarChart3,
  },
  {
    id: 5,
    cardTitle: 'Decisão Acima de Execução',
    title: 'Estratégia antes de produção',
    subtitle: [
      'Não começamos criando. Começamos entendendo o que realmente precisa ser construído.',
      'Integramos estratégia, tecnologia, processo comercial e comunicação em uma estrutura única de crescimento para o seu negócio.',
    ],
    image: imgDecisao,
    caption: 'Sistema de crescimento',
    icon: Brain,
  },
];

const AUTOPLAY_INTERVAL = 6000;

const CreativeShowcase = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const startAutoplay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (progressRef.current) clearInterval(progressRef.current);

    setProgress(0);
    const startTime = Date.now();

    // Update progress at ~15fps instead of ~33fps
    progressRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      setProgress(Math.min((elapsed / AUTOPLAY_INTERVAL) * 100, 100));
    }, 66);

    intervalRef.current = setInterval(() => {
      setActiveStep(prev => (prev + 1) % steps.length);
    }, AUTOPLAY_INTERVAL);
  }, []);

  useEffect(() => {
    if (isVisible && !isPaused) startAutoplay();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [isVisible, isPaused, activeStep, startAutoplay]);

  const goTo = (index: number) => {
    setActiveStep(index);
    if (!isPaused) startAutoplay();
  };

  const goNext = () => goTo((activeStep + 1) % steps.length);
  const goPrev = () => goTo((activeStep - 1 + steps.length) % steps.length);

  const current = steps[activeStep];
  const Icon = current.icon;

  return (
    <section
      ref={containerRef}
      className="relative py-20 md:py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--muted) / 0.3) 50%, hsl(var(--background)) 100%)',
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Static SEO title */}
        <motion.div
          className="text-center max-w-4xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-6 py-2 mb-6">
            <Rocket className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold text-primary tracking-wider">COMO TRABALHAMOS</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-4 leading-tight">
            <span className="text-foreground">Um processo de marketing que gera </span>
            <span className="text-gradient">crescimento real</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Cada etapa foi pensada para transformar estratégia em resultado mensurável para o seu negócio.
          </p>
        </motion.div>

        {/* Main content area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* LEFT: Image showcase */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
                animate={{ opacity: 1, scale: 1, rotate: -2 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative mx-auto max-w-md lg:max-w-lg"
              >
                {/* Polaroid */}
                <div className="bg-white p-3 pb-14 rounded-lg shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
                  <div className="aspect-[4/3] overflow-hidden rounded-sm">
                    <img
                      src={current.image}
                      alt={current.caption}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <p
                    className="absolute bottom-3.5 left-0 right-0 text-center text-gray-500 text-lg"
                    style={{ fontFamily: "'Caveat', cursive" }}
                  >
                    {current.caption}
                  </p>
                </div>

                {/* Tape */}
                <div
                  className="absolute -top-3 left-1/2 w-20 h-7 rounded-sm opacity-70"
                  style={{
                    background: 'linear-gradient(135deg, hsla(45, 80%, 70%, 0.8), hsla(45, 80%, 60%, 0.6))',
                    transform: 'translateX(-50%) rotate(3deg)',
                  }}
                />

                {/* Step badge on image */}
                <motion.div
                  className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center font-black text-lg shadow-lg shadow-primary/30"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.2 }}
                >
                  {String(activeStep + 1).padStart(2, '0')}
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation arrows */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={goPrev}
                className="w-10 h-10 rounded-full bg-muted/80 border border-border/50 flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                aria-label="Etapa anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Dots with progress */}
              <div className="flex items-center gap-2">
                {steps.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className="relative h-2 rounded-full overflow-hidden transition-all duration-300"
                    style={{ width: i === activeStep ? '40px' : '10px' }}
                    aria-label={`Ir para etapa ${i + 1}`}
                  >
                    <div className="absolute inset-0 bg-muted-foreground/20 rounded-full" />
                    {i === activeStep && (
                      <motion.div
                        className="absolute inset-0 bg-primary rounded-full origin-left"
                        style={{ scaleX: progress / 100, transformOrigin: 'left' }}
                      />
                    )}
                    {i < activeStep && (
                      <div className="absolute inset-0 bg-primary rounded-full" />
                    )}
                  </button>
                ))}
              </div>

              <button
                onClick={goNext}
                className="w-10 h-10 rounded-full bg-muted/80 border border-border/50 flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                aria-label="Próxima etapa"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          {/* RIGHT: Text content + step tabs */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Step tabs - vertical timeline style */}
            <div className="space-y-2 mb-0">
              {steps.map((step, index) => {
                const StepIcon = step.icon;
                const isActive = activeStep === index;

                return (
                  <motion.button
                    key={step.id}
                    onClick={() => goTo(index)}
                    className={`w-full flex items-start gap-4 p-4 rounded-xl text-left transition-all duration-400 border ${
                      isActive
                        ? 'bg-primary/10 border-primary/40'
                        : 'bg-transparent border-transparent hover:bg-muted/50 hover:border-border/30'
                    }`}
                    initial={{ opacity: 0, x: 30 }}
                    animate={isVisible ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.08 }}
                  >
                    {/* Step number + icon */}
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      <StepIcon className="w-4 h-4" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className={`font-bold text-sm md:text-base transition-colors duration-300 ${
                        isActive ? 'text-primary' : 'text-foreground/70'
                      }`}>
                        {step.cardTitle}
                      </div>

                      {/* Expanded content for active */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="overflow-hidden"
                          >
                            <h3 className="text-lg md:text-xl lg:text-2xl font-black text-foreground mt-2 mb-2">
                              {step.title}
                            </h3>
                            {step.subtitle.map((line, i) => (
                              <p key={i} className="text-sm md:text-base text-muted-foreground leading-relaxed mb-1">
                                {line}
                              </p>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Progress bar at bottom of active card */}
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-muted-foreground/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&display=swap');
      `}</style>
    </section>
  );
};

export default CreativeShowcase;
