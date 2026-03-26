import { useState, useEffect, useRef } from 'react';
import { Star, Quote, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';


const testimonials = [
  {
    rating: 5,
    text: "Antes, nosso marketing era desorganizado e reativo. Hoje temos clareza de estratégia, processos definidos e decisões muito mais seguras para o negócio.",
    results: "Marketing estruturado",
    metrics: [
      { label: "Organização", before: "Reativo", after: "Estruturado" },
      { label: "Decisões", before: "Intuitivas", after: "Baseadas em dados" },
    ],
  },
  {
    rating: 5,
    text: "O diferencial foi a visão estratégica. A MOV não entrega apenas execução de marketing, entrega direção.",
    results: "Visão estratégica",
    metrics: [
      { label: "Estratégia", before: "Inexistente", after: "Definida" },
      { label: "Direção", before: "Sem foco", after: "Clara" },
    ],
  },
  {
    rating: 5,
    text: "É uma assessoria que entende de negócio, não só de marketing. Isso muda completamente o nível da conversa e dos resultados.",
    results: "Parceiro estratégico",
    metrics: [
      { label: "Conversas", before: "Operacionais", after: "Estratégicas" },
      { label: "Resultados", before: "Inconstantes", after: "Consistentes" },
    ],
  },
  {
    rating: 5,
    text: "Com a MOV conseguimos crescer com mais previsibilidade e muito menos improviso.",
    results: "Crescimento previsível",
    metrics: [
      { label: "Crescimento", before: "Imprevisível", after: "Previsível" },
      { label: "Processo", before: "Improviso", after: "Método" },
    ],
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const pauseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Próprio IntersectionObserver — não depende do GSAP hook
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const id = setInterval(() => goTo((prev) => (prev + 1) % testimonials.length, 'next'), 4500);
    return () => clearInterval(id);
  }, [isAutoPlaying]);

  const goTo = (updater: (p: number) => number, dir: 'next' | 'prev') => {
    if (animating) return;
    setAnimating(true);
    setDirection(dir);
    setCurrent(updater);
    setTimeout(() => setAnimating(false), 420);
  };

  const navigate = (dir: 'next' | 'prev') => {
    if (pauseTimer.current) clearTimeout(pauseTimer.current);
    setIsAutoPlaying(false);
    goTo(
      (p) => dir === 'next' ? (p + 1) % testimonials.length : (p - 1 + testimonials.length) % testimonials.length,
      dir,
    );
    pauseTimer.current = setTimeout(() => setIsAutoPlaying(true), 6000);
  };

  const jumpTo = (i: number) => {
    if (i === current || animating) return;
    if (pauseTimer.current) clearTimeout(pauseTimer.current);
    setIsAutoPlaying(false);
    goTo(() => i, i > current ? 'next' : 'prev');
    pauseTimer.current = setTimeout(() => setIsAutoPlaying(true), 6000);
  };

  const t = testimonials[current];

  return (
    <section ref={sectionRef} className="relative py-14 md:py-28 overflow-hidden bg-background">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-16 left-8 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-16 right-8 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">

        {/* ── Header ─────────────────────────────────── */}
        <div className="text-center mb-10 md:mb-16">
          <div
            className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/20 rounded-full px-5 py-2 mb-5 transition-all duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
            }}
          >
            <Quote className="w-4 h-4 text-secondary animate-pulse" />
            <span className="text-xs font-bold tracking-widest text-secondary uppercase">Depoimentos</span>
          </div>

          <h2
            className="text-2xl sm:text-4xl md:text-5xl font-black mb-3 leading-tight transition-all duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: '100ms',
            }}
          >
            <span className="text-gradient silver-shine-text">O QUE NOSSOS</span>
            <br />
            <span className="text-foreground">CLIENTES FALAM</span>
          </h2>

          <p
            className="text-sm md:text-lg text-muted-foreground max-w-xl mx-auto transition-all duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
              transitionDelay: '200ms',
            }}
          >
            Quem contratou a MOV{' '}
            <span className="text-secondary font-bold">não voltou ao improviso</span>.
          </p>
        </div>

        {/* ── Main card + metrics ───────────────────── */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 md:gap-10 items-start mb-8 md:mb-12">

          {/* Testimonial card */}
          <div
            className="relative bg-card border border-border/40 rounded-2xl p-6 sm:p-8 overflow-hidden w-full"
            style={{
              boxShadow: '0 8px 40px -8px hsl(var(--primary)/0.12)',
              transition: 'opacity 0.35s, transform 0.35s',
              opacity: animating ? 0 : 1,
              transform: animating
                ? `translateX(${direction === 'next' ? '-18px' : '18px'})`
                : 'translateX(0)',
            }}
          >
            {/* Big quote mark */}
            <Quote className="absolute top-5 left-5 w-10 h-10 text-primary/10" />

            {/* Results badge */}
            <span
              className="absolute top-4 right-4 text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full text-white"
              style={{ background: 'linear-gradient(135deg, hsl(var(--secondary)), hsl(var(--primary)))' }}
            >
              {t.results}
            </span>

            {/* Stars */}
            <div className="flex gap-1 mt-8 mb-5">
              {[...Array(t.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
              ))}
            </div>

            {/* Quote text */}
            <blockquote className="text-base sm:text-lg font-medium text-foreground leading-relaxed">
              "{t.text}"
            </blockquote>

            {/* Bottom divider line */}
            <div
              className="mt-6 h-px w-full rounded-full"
              style={{ background: 'linear-gradient(to right, hsl(var(--primary)/0.4), transparent)' }}
            />
          </div>

          {/* Metrics + navigation */}
          <div className="w-full flex flex-col gap-5">
            {/* Metric cards */}
            <div
              className="grid grid-cols-2 gap-3 sm:gap-4"
              style={{
                transition: 'opacity 0.35s',
                opacity: animating ? 0 : 1,
              }}
            >
              {t.metrics.map((m, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-primary/10 bg-gradient-to-br from-primary/5 to-secondary/5 p-4 sm:p-5 text-center"
                >
                  <TrendingUp className="w-5 h-5 text-primary mx-auto mb-2" />
                  <p className="text-[11px] text-muted-foreground font-semibold mb-2 uppercase tracking-wide">
                    {m.label}
                  </p>
                  <p className="text-sm text-muted-foreground line-through opacity-50 mb-0.5">
                    {m.before}
                  </p>
                  <p className="text-lg sm:text-2xl font-black text-gradient leading-none">
                    {m.after}
                  </p>
                </div>
              ))}
            </div>

            {/* Dots */}
            <div className="flex items-center justify-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => jumpTo(i)}
                  aria-label={`Depoimento ${i + 1}`}
                  className="transition-all duration-400"
                  style={{
                    width: i === current ? '24px' : '7px',
                    height: '7px',
                    borderRadius: '9999px',
                    background: i === current
                      ? 'hsl(var(--primary))'
                      : 'hsl(var(--muted-foreground)/0.25)',
                    boxShadow: i === current ? '0 0 10px hsl(var(--primary)/0.6)' : 'none',
                  }}
                />
              ))}
            </div>

            {/* Prev / Next buttons */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => navigate('prev')}
                className="group flex items-center gap-2 px-5 py-2.5 rounded-full border border-border/40 bg-card/50 text-sm font-semibold text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all duration-300"
                aria-label="Anterior"
              >
                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                Anterior
              </button>
              <button
                onClick={() => navigate('next')}
                className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 transition-all duration-300 hover:shadow-[0_0_20px_hsl(var(--primary)/0.4)]"
                aria-label="Próximo"
              >
                Próximo
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* ── CTA ──────────────────────────────────── */}
        <div
          className="text-center transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
            transitionDelay: '300ms',
          }}
        >
          <button
            className="btn-hero group inline-flex items-center gap-2 text-sm sm:text-base px-7 py-4"
            onClick={() => window.open('https://wa.me/5519981134193', '_blank')}
          >
            <span>Seja o Próximo Case de Sucesso</span>
            <TrendingUp className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
