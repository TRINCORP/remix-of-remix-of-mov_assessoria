import { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

const ParallaxSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
      // Animate text split
      if (textRef.current) {
        const words = textRef.current.querySelectorAll('.word');
        words.forEach((word, index) => {
          setTimeout(() => {
            word.classList.add('animate');
          }, index * 100);
        });
      }
    }
  }, [inView]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const splitText = (text: string) => {
    return text.split(' ').map((word, index) => (
      <span key={index} className="word inline-block overflow-hidden">
        <span className="inline-block transform translate-y-full">{word}&nbsp;</span>
      </span>
    ));
  };

  return (
    <section 
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1920&h=1080&fit=crop')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        transform: `translateY(${scrollY * 0.5}px)`
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70" />
      
      {/* Animated Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float animation-delay-1000" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <div 
          ref={textRef}
          className={`text-split transition-all duration-1000 ${isVisible ? 'animate' : ''}`}
        >
          <h2 className="text-6xl md:text-8xl font-black mb-8 text-white leading-tight">
            {splitText('TRANSFORMAMOS')}
            <br />
            <span className="text-gradient">
              {splitText('MARCAS EM')}
            </span>
            <br />
            {splitText('FENÔMENOS DIGITAIS')}
          </h2>
        </div>
        
        <div className={`transition-all duration-1000 delay-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Cada projeto é uma oportunidade de reescrever a história de uma marca. 
            Criamos estratégias que não apenas impressionam, mas que <span className="text-primary font-bold">conquistam corações</span> e 
            <span className="text-primary font-bold"> transformam negócios</span>.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-black text-gradient mb-2 group-hover:scale-110 transition-transform">
                15+
              </div>
              <div className="text-white/80 font-semibold">Anos de Experiência</div>
            </div>
            
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-black text-gradient mb-2 group-hover:scale-110 transition-transform">
                500%
              </div>
              <div className="text-white/80 font-semibold">ROI Médio dos Clientes</div>
            </div>
            
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-black text-gradient mb-2 group-hover:scale-110 transition-transform">
                100%
              </div>
              <div className="text-white/80 font-semibold">Dedicação aos Resultados</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParallaxSection;