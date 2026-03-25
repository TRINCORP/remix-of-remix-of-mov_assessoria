import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Star, Quote, TrendingUp, Users, Award } from 'lucide-react';

const testimonials = [
  {
    name: "Cliente 1",
    position: "Cargo",
    company: "Empresa",
    rating: 5,
    text: "Antes, nosso marketing era desorganizado e reativo. Hoje temos clareza de estratégia, processos definidos e decisões muito mais seguras para o negócio.",
    results: "Marketing estruturado",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face",
    metrics: [
      { label: "Organização", before: "Reativo", after: "Estruturado" },
      { label: "Decisões", before: "Intuitivas", after: "Baseadas em dados" }
    ]
  },
  {
    name: "Cliente 2",
    position: "Cargo",
    company: "Empresa",
    rating: 5,
    text: "O diferencial foi a visão estratégica. A MOV não entrega apenas execução de marketing, entrega direção.",
    results: "Visão estratégica",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
    metrics: [
      { label: "Estratégia", before: "Inexistente", after: "Definida" },
      { label: "Direção", before: "Sem foco", after: "Clara" }
    ]
  },
  {
    name: "Cliente 3",
    position: "Cargo",
    company: "Empresa",
    rating: 5,
    text: "É uma assessoria que entende de negócio, não só de marketing. Isso muda completamente o nível da conversa e dos resultados.",
    results: "Parceiro estratégico",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
    metrics: [
      { label: "Conversas", before: "Operacionais", after: "Estratégicas" },
      { label: "Resultados", before: "Inconstantes", after: "Consistentes" }
    ]
  },
  {
    name: "Cliente 4",
    position: "Cargo",
    company: "Empresa",
    rating: 5,
    text: "Com a MOV conseguimos crescer com mais previsibilidade e muito menos improviso.",
    results: "Crescimento previsível",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
    metrics: [
      { label: "Crescimento", before: "Imprevisível", after: "Previsível" },
      { label: "Processo", before: "Improviso", after: "Método" }
    ]
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="gsap-section py-16 md:py-32 px-4 md:px-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="gsap-parallax absolute top-20 left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" data-speed="0.3" />
        <div className="gsap-parallax absolute bottom-20 right-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl" data-speed="0.5" />
        <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-secondary rounded-full animate-ping" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-20">
          <div className="gsap-badge inline-flex items-center gap-2 bg-secondary/10 border border-secondary/20 rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-6 md:mb-8">
            <Quote className="w-5 h-5 text-secondary animate-pulse" />
            <span className="text-sm font-semibold text-secondary">DEPOIMENTOS</span>
          </div>
          
          <h2 className="gsap-headline text-3xl sm:text-4xl md:text-6xl font-black mb-4 md:mb-6">
            <span className="text-gradient silver-shine-text">O QUE NOSSOS</span>
            <br />
            <span className="text-foreground">CLIENTES FALAM</span>
          </h2>
          
          <p className="gsap-paragraph text-base md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Quem contratou a MOV{' '}
            <span className="text-secondary font-bold">não voltou ao improviso</span>.
          </p>
        </div>

        {/* Main Testimonial Display */}
        <div className="gsap-cards-container grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center mb-10 md:mb-20">
          {/* Testimonial Card */}
          <Card className="gsap-card card-glow relative overflow-hidden">
            <div className="absolute top-6 left-6">
              <Quote className="w-12 h-12 text-primary/20" />
            </div>
            
            <div className="pt-16 pb-8">
              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-lg text-foreground leading-relaxed mb-8 font-medium">
                "{currentTestimonial.text}"
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center gap-4">
                <img
                  src={currentTestimonial.image}
                  alt={currentTestimonial.name}
                  className="w-16 h-16 rounded-full border-2 border-primary/20"
                  loading="lazy"
                />
                <div>
                  <div className="font-bold text-foreground">{currentTestimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{currentTestimonial.position}</div>
                  <div className="text-sm text-primary font-semibold">{currentTestimonial.company}</div>
                </div>
              </div>
            </div>

            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-gradient-to-r from-secondary to-accent text-white px-2 py-1 sm:px-4 sm:py-2 rounded-full text-[10px] sm:text-sm font-bold max-w-[140px] sm:max-w-none text-center">
              {currentTestimonial.results}
            </div>
          </Card>

          {/* Stats & Navigation */}
          <div className="space-y-8">
            <div className="gsap-cards-container grid grid-cols-2 gap-6">
              {currentTestimonial.metrics.map((metric, index) => (
                <div key={index} className="gsap-card text-center p-6 bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/10 rounded-2xl">
                  <TrendingUp className="w-8 h-8 text-primary mx-auto mb-3" />
                  <div className="text-sm text-muted-foreground font-semibold mb-2">{metric.label}</div>
                  <div className="space-y-1">
                    <div className="text-lg text-muted-foreground line-through opacity-60">
                      {metric.before}
                    </div>
                    <div className="text-3xl font-black text-gradient">
                      {metric.after}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    setIsAutoPlaying(false);
                    setTimeout(() => setIsAutoPlaying(true), 5000);
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-primary w-8' 
                      : 'bg-muted-foreground/30 hover:bg-primary/50'
                  }`}
                />
              ))}
            </div>

            {/* Navigation Controls */}
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
                  setIsAutoPlaying(false);
                }}
                className="btn-secondary px-6 py-3 text-sm"
              >
                Anterior
              </button>
              
              <button
                onClick={() => {
                  setCurrentIndex((prev) => (prev + 1) % testimonials.length);
                  setIsAutoPlaying(false);
                }}
                className="btn-hero px-6 py-3 text-sm"
              >
                Próximo
              </button>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="gsap-cta text-center mt-16">
          <button className="btn-hero group">
            <span>Seja o Próximo Case de Sucesso</span>
            <TrendingUp className="ml-2 w-5 h-5 group-hover:translate-y-[-2px] transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
