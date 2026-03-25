import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Target, TrendingUp, Handshake } from 'lucide-react';
import { useGSAPNavigation } from '@/hooks/useGSAPNavigation';
import heroBg from '@/assets/hero-bg.jpg';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useGSAPNavigation();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleCTAClick = () => {
    console.log('CTA Hero clicked');
    window.open('https://wa.me/5519981134193', '_blank');
  };

  return (
    <section 
      ref={heroRef} 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-background/85" />
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 50% -20%, hsl(var(--primary) / 0.2), transparent),
              radial-gradient(ellipse 60% 40% at 80% 50%, hsl(var(--primary) / 0.1), transparent),
              radial-gradient(ellipse 50% 30% at 20% 80%, hsl(var(--primary) / 0.08), transparent)
            `,
          }}
        />
      </div>

      {/* Animated Glow Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className={`absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] transition-all duration-[2000ms] ${
            isVisible ? 'opacity-60 scale-100' : 'opacity-0 scale-50'
          }`}
        />
        <div 
          className={`absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/15 rounded-full blur-[100px] transition-all duration-[2500ms] ${
            isVisible ? 'opacity-50 scale-100' : 'opacity-0 scale-50'
          }`}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          
          {/* Eyebrow Badge */}
          <div 
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 text-xs font-medium tracking-[0.2em] text-primary uppercase backdrop-blur-sm">
              <Sparkles className="w-3 h-3" />
              Assessoria de marketing digital
              <Sparkles className="w-3 h-3" />
            </span>
          </div>

          {/* Main Headline - H1 */}
          <h1 
            className={`transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <span className="block text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.05] tracking-tight text-foreground section-title-animate">
              Marketing que faz pequenos e médios negócios{' '}
              <span className="text-gradient-brand">
                crescerem de verdade
              </span>
            </span>
          </h1>

          {/* Subheadline */}
          <p 
            className={`text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            Tráfego pago, social media, sites e estruturação comercial. Tudo integrado para você <span className="text-primary font-semibold">escalar com previsibilidade</span>.
          </p>

          {/* CTA Button */}
          <div 
            className={`flex justify-center pt-2 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '600ms' }}
          >
            <Button 
              onClick={handleCTAClick}
              size="lg"
              className="group relative px-6 sm:px-10 py-5 sm:py-7 text-base sm:text-lg font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-500 overflow-hidden rounded-full shadow-[0_0_40px_rgba(234,179,8,0.3)] hover:shadow-[0_0_60px_rgba(234,179,8,0.5)] hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-yellow-400 to-primary bg-[length:200%_100%] animate-[shimmer_2s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10 flex items-center gap-3">
                <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                Quero estruturar meu marketing
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 rounded-full border-2 border-primary/50 animate-ping opacity-20" />
            </Button>
          </div>

          {/* Pillars */}
          <div 
            className={`flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 pt-10 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '800ms' }}
          >
            {[
              { icon: 'target', title: 'Posicionamento', desc: 'Clareza na mensagem e no mercado' },
              { icon: 'trending-up', title: 'Geração de Demanda', desc: 'Estratégias que atraem clientes' },
              { icon: 'handshake', title: 'Ao lado do gestor', desc: 'Parceria com quem decide' },
            ].map((pillar, i) => (
              <div 
                key={i}
                className="group flex flex-col items-center text-center max-w-[200px] cursor-default"
              >
                <span className="mb-2 group-hover:scale-125 transition-transform duration-300 text-primary">
                  {pillar.icon === 'target' && <Target className="w-6 h-6" />}
                  {pillar.icon === 'trending-up' && <TrendingUp className="w-6 h-6" />}
                  {pillar.icon === 'handshake' && <Handshake className="w-6 h-6" />}
                </span>
                <span className="text-sm font-bold text-foreground tracking-wide">{pillar.title}</span>
                <span className="text-xs text-muted-foreground mt-1">{pillar.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Corner Accents */}
      <div 
        className={`absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-primary/30 transition-all duration-1000 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
        }`}
        style={{ transitionDelay: '800ms' }}
      />
      <div 
        className={`absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-primary/30 transition-all duration-1000 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
        }`}
        style={{ transitionDelay: '800ms' }}
      />
    </section>
  );
};

export default HeroSection;
