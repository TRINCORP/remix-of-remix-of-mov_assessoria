import { useState, useEffect, useRef } from 'react';
import { AlertTriangle, ArrowRight, Puzzle, BarChart3, GitBranch, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ProblemsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredProblem, setHoveredProblem] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.12 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const problems = [
    {
      icon: Puzzle,
      label: "Descentralizado",
      title: "Marketing fragmentado sem integração",
      description: "Ações espalhadas, sem integração entre canais, equipes e mensagens. Esforço alto, retorno baixo.",
    },
    {
      icon: Target,
      label: "Sem direção",
      title: "Falta de estratégia de marketing clara",
      description: "Sem clareza sobre posicionamento, canais prioritários e métricas. Decisões reativas em vez de planejadas.",
    },
    {
      icon: GitBranch,
      label: "Isolado",
      title: "Dependência de canais isolados",
      description: "Apostas em ações soltas que não se conectam ao negócio. Resultados que não se sustentam no médio prazo.",
    },
    {
      icon: BarChart3,
      label: "Sem resultado",
      title: "Investimento em marketing sem retorno",
      description: "Muito investimento, pouca conversão. Dificuldade em transformar marketing em crescimento mensurável para o negócio.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="gsap-section relative py-28 md:py-40 overflow-hidden bg-background"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`absolute inset-0 transition-opacity duration-[2000ms] ${isVisible ? 'opacity-100' : 'opacity-0'}`}
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 100%, hsl(0 60% 20% / 0.08), transparent)',
          }}
        />
        <div
          className={`absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[150px] transition-all duration-[2500ms] ${
            isVisible ? 'opacity-10' : 'opacity-0'
          }`}
          style={{ background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)' }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground) / 0.015) 1px, transparent 0)`,
            backgroundSize: '32px 32px',
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 2s ease',
          }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-20 md:mb-28">
          <div
            className={`inline-flex items-center gap-3 mb-8 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
            <span className="text-xs tracking-[0.4em] text-primary uppercase font-bold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Problemas que Resolvemos
            </span>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
          </div>

          <h2
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[0.95] mb-8 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
            style={{ transitionDelay: '150ms' }}
          >
            <span className="text-foreground">Seu marketing existe, mas</span>
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, hsl(0, 70%, 60%) 0%, hsl(30, 90%, 55%) 50%, hsl(45, 96%, 64%) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 4px 20px hsl(0, 70%, 50%, 0.2))',
              }}
            >
              não gera resultado?
            </span>
          </h2>

          <p
            className={`text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            Empresas em crescimento costumam enfrentar o mesmo cenário: o marketing existe, mas está{' '}
            <span className="text-foreground font-semibold">descentralizado</span>, pouco integrado à estratégia e 
            dependente de ações isoladas que não se sustentam.
          </p>
        </div>

        {/* Problems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto mb-20">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            const isHovered = hoveredProblem === index;
            return (
              <div
                key={index}
                className={`group relative transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
                }`}
                style={{ transitionDelay: `${400 + index * 120}ms` }}
                onMouseEnter={() => setHoveredProblem(index)}
                onMouseLeave={() => setHoveredProblem(null)}
              >
                <div className={`absolute -inset-1 rounded-3xl blur-xl transition-opacity duration-700 ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`}
                  style={{
                    background: 'linear-gradient(135deg, hsl(var(--primary) / 0.15), hsl(var(--primary) / 0.05))',
                  }}
                />

                <div className="relative h-full bg-muted/20 backdrop-blur-sm rounded-3xl p-8 md:p-10 border border-border/40 group-hover:border-primary/25 transition-all duration-500 overflow-hidden group-hover:bg-muted/30">
                  <div
                    className="absolute -top-4 -right-2 text-[8rem] font-black leading-none select-none pointer-events-none transition-all duration-700"
                    style={{
                      color: isHovered
                        ? 'hsl(var(--primary) / 0.06)'
                        : 'hsl(var(--foreground) / 0.02)',
                    }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  <div className="flex items-start gap-4 mb-5 relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/15 flex items-center justify-center shrink-0 group-hover:bg-primary/15 group-hover:border-primary/30 group-hover:scale-110 transition-all duration-500">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-primary/60 group-hover:text-primary/80 transition-colors duration-300">
                        {problem.label}
                      </span>
                      <h3 className="text-lg font-bold text-foreground mt-1 group-hover:text-primary transition-colors duration-300">
                        {problem.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-[15px] leading-relaxed relative z-10 pl-0 sm:pl-16">
                    {problem.description}
                  </p>

                  <div className="absolute bottom-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Solution CTA */}
        <div
          className={`text-center max-w-3xl mx-auto transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
          style={{ transitionDelay: '900ms' }}
        >
          <div className="relative bg-gradient-to-br from-muted/30 via-muted/15 to-muted/30 backdrop-blur-sm rounded-3xl p-10 md:p-14 border border-primary/15 overflow-hidden">
            <div className="absolute top-0 left-0 w-20 h-20 border-l border-t border-primary/20 rounded-tl-3xl" />
            <div className="absolute bottom-0 right-0 w-20 h-20 border-r border-b border-primary/20 rounded-br-3xl" />

            <p className="text-xl md:text-2xl text-foreground font-semibold leading-relaxed mb-4">
              Nossa atuação começa exatamente nesse ponto:
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Organizando o marketing como um{' '}
              <span
                className="font-bold"
                style={{
                  background: 'linear-gradient(135deg, hsl(45, 96%, 70%) 0%, hsl(45, 96%, 64%) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                sistema estratégico
              </span>
              , alinhado aos objetivos reais da sua empresa.
            </p>

            <Button
              onClick={() => window.open('https://wa.me/5519981134193', '_blank')}
              className="group relative h-14 px-10 text-base font-bold bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(234,179,8,0.3)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                Fale com um estrategista
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemsSection;
