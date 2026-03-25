import { useState, useEffect, useRef } from 'react';
import { CheckCircle, XCircle, ArrowUpRight, Shield, Building2, TrendingUp } from 'lucide-react';

const ForWhoSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.15 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const idealClients = [
    {
      icon: Building2,
      title: "Empresas que já validaram o negócio",
      description: "Trabalhamos com empresas que já validaram seus serviços ou produtos e precisam dar o próximo passo com mais organização, clareza e direção estratégica no marketing.",
    },
    {
      icon: TrendingUp,
      title: "Negócios em fase de crescimento",
      description: "Atendemos negócios em crescimento ou transição de nível que exigem profissionalismo, método e visão de longo prazo para escalar com previsibilidade.",
    },
    {
      icon: Shield,
      title: "Quem trata marketing como investimento",
      description: "Nosso trabalho faz sentido para empresas que entendem o marketing digital como parte da estratégia do negócio. Não como gasto, mas como motor de crescimento.",
    },
  ];

  const notForUs = [
    "Ações pontuais sem continuidade",
    "Improviso e soluções isoladas",
    "Marketing sem método ou direção",
    "Decisões sem dados ou estratégia",
  ];

  return (
    <section
      ref={sectionRef}
      className="gsap-section relative py-28 md:py-40 overflow-hidden bg-background"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`absolute top-1/3 -left-32 w-[600px] h-[600px] rounded-full blur-[160px] transition-all duration-[2500ms] ${
            isVisible ? 'opacity-15' : 'opacity-0'
          }`}
          style={{ background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)' }}
        />
        <div
          className={`absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-[140px] transition-all duration-[2500ms] ${
            isVisible ? 'opacity-10' : 'opacity-0'
          }`}
          style={{ background: 'radial-gradient(circle, hsl(var(--primary-glow)) 0%, transparent 70%)' }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--primary) / 0.015) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.015) 1px, transparent 1px)`,
            backgroundSize: '100px 100px',
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 1.5s ease',
          }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20 md:mb-28">
          <div
            className={`inline-flex items-center gap-3 mb-8 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
            <span className="text-xs tracking-[0.4em] text-primary uppercase font-bold">
              Para Quem Somos
            </span>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
          </div>

          <h2
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[0.95] mb-8 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
            style={{ transitionDelay: '150ms' }}
          >
            <span className="text-foreground">Não atendemos</span>{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, hsl(45, 96%, 75%) 0%, hsl(45, 96%, 64%) 30%, hsl(38, 92%, 50%) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 4px 30px hsl(45, 96%, 64%, 0.3))',
              }}
            >
              qualquer empresa
            </span>
          </h2>

          <p
            className={`text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            Trabalhamos com quem leva o marketing a sério e enxerga{' '}
            <span className="text-primary font-semibold">crescimento real</span> como objetivo.
          </p>
        </div>

        {/* Ideal Client Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-20">
          {idealClients.map((client, index) => {
            const Icon = client.icon;
            return (
              <div
                key={index}
                className={`group relative transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
                }`}
                style={{ transitionDelay: `${400 + index * 150}ms` }}
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <div className="absolute -inset-1 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="relative h-full bg-muted/30 backdrop-blur-sm rounded-3xl p-8 md:p-10 border border-border/50 group-hover:border-primary/30 transition-all duration-500 overflow-hidden">
                  <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-500 group-hover:scale-110">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                    {client.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-[15px]">
                    {client.description}
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-primary/50 group-hover:text-primary transition-all duration-300">
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </div>

                  <div
                    className="absolute bottom-0 right-0 w-32 h-32 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500"
                    style={{
                      backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)`,
                      backgroundSize: '16px 16px',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* "Não é para quem busca" Section */}
        <div
          className={`relative max-w-3xl mx-auto transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
          style={{ transitionDelay: '800ms' }}
        >
          <div className="relative bg-muted/20 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-border/30 overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-red-500/60 via-red-500/30 to-transparent" />

            <div className="flex items-center gap-3 mb-6">
              <XCircle className="w-5 h-5 text-red-400/80" />
              <span className="text-sm font-bold tracking-wider uppercase text-red-400/80">
                Não somos para quem busca
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {notForUs.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 text-muted-foreground/80 group"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400/40 group-hover:bg-red-400/80 transition-colors duration-300" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForWhoSection;
