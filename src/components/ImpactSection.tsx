import { useInView } from 'react-intersection-observer';
import { MapPin, Wifi, Users, Award } from 'lucide-react';
import mapaBrasil from '@/assets/mapa-brasil.png';

const pulsePoints = [
  { x: '38%', y: '15%', size: 'lg', delay: 0 },
  { x: '62%', y: '27%', size: 'md', delay: 300 },
  { x: '44%', y: '42%', size: 'md', delay: 600 },
  { x: '58%', y: '55%', size: 'lg', delay: 200 },
  { x: '52%', y: '74%', size: 'lg', delay: 900 },
  { x: '70%', y: '33%', size: 'sm', delay: 450 },
  { x: '34%', y: '30%', size: 'sm', delay: 750 },
  { x: '65%', y: '60%', size: 'sm', delay: 1100 },
  { x: '48%', y: '58%', size: 'md', delay: 150 },
  { x: '55%', y: '82%', size: 'sm', delay: 850 },
];

const sizeMap = {
  sm: { dot: 'w-2 h-2', ping: 'w-6 h-6' },
  md: { dot: 'w-3 h-3', ping: 'w-8 h-8' },
  lg: { dot: 'w-4 h-4', ping: 'w-10 h-10' },
};

const highlights = [
  {
    icon: MapPin,
    title: 'Todo o Brasil',
    desc: 'Do Norte ao Sul, do interior ao litoral — onde seu negócio estiver, estamos.',
  },
  {
    icon: Wifi,
    title: 'Atendimento Personalizado',
    desc: 'Cada cliente recebe uma estratégia única, construída de acordo com seu negócio e seus objetivos.',
  },
  {
    icon: Users,
    title: 'Equipe Dedicada',
    desc: 'Um time estratégico focado exclusivamente nos seus resultados.',
  },
  {
    icon: Award,
    title: 'Resultados Reais',
    desc: 'Marketing que gera crescimento mensurável, não só curtidas.',
  },
];

const ImpactSection = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section ref={ref} className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-background via-background to-muted/20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(252,211,77,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(251,191,36,0.05),transparent_50%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center">

          {/* Left — Content */}
          <div className="space-y-10">
            {/* Badge */}
            <div className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <span className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 text-primary text-sm font-bold px-4 py-2 rounded-full">
                <MapPin className="w-4 h-4" />
                Presença Nacional
              </span>
            </div>

            {/* Title */}
            <div className={`transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight">
                Resultados que comprovam{' '}
                <span className="text-gradient">o que fazemos</span>
              </h2>
              <p className="mt-4 text-lg md:text-xl text-muted-foreground leading-relaxed">
                Estratégias de marketing que já movimentaram negócios em todas as regiões do Brasil de perto ou à distância, com o mesmo comprometimento.
              </p>
            </div>

            {/* Highlights grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {highlights.map((item, i) => (
                <div
                  key={i}
                  className={`flex gap-4 p-4 rounded-2xl bg-muted/30 border border-border/40 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300
                    ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                  style={{ transitionDelay: `${200 + i * 100}ms` }}
                >
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-bold text-foreground text-sm">{item.title}</div>
                    <div className="text-muted-foreground text-xs mt-0.5 leading-relaxed">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right — Map */}
          <div className={`relative transition-all duration-1000 delay-300 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto">
              {/* Glow behind map */}
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl scale-75 animate-pulse" />

              {/* Map */}
              <img
                src={mapaBrasil}
                alt="Mapa do Brasil"
                className="relative w-full h-auto object-contain drop-shadow-2xl"
                style={{ filter: 'brightness(1) contrast(1.05) saturate(1.1)' }}
              />

              {/* Pulse dots across Brazil */}
              {pulsePoints.map((point, i) => {
                const sizes = sizeMap[point.size as keyof typeof sizeMap];
                return (
                  <div
                    key={i}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: point.x, top: point.y }}
                  >
                    {/* Ping ring */}
                    <span
                      className={`absolute -translate-x-1/2 -translate-y-1/2 ${sizes.ping} rounded-full bg-primary/30 animate-ping`}
                      style={{ animationDelay: `${point.delay}ms`, animationDuration: '2.5s' }}
                    />
                    {/* Dot */}
                    <span className={`relative block ${sizes.dot} rounded-full bg-primary shadow-lg shadow-primary/50`} />
                  </div>
                );
              })}

              {/* "Todo o Brasil" label floating */}
              <div
                className={`absolute bottom-4 left-1/2 -translate-x-1/2 transition-all duration-700 delay-700
                  ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              >
                <div className="flex items-center gap-2 bg-background/90 backdrop-blur-sm border border-primary/30 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 shadow-xl whitespace-nowrap">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0" />
                  <span className="text-xs sm:text-sm font-bold text-foreground">Atendemos todo o Brasil</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};

export default ImpactSection;
