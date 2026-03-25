import { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, Facebook, Instagram, Linkedin, Twitter, 
  Mail, Phone, MapPin, ArrowUpRight, Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Big Text Marquee
const FooterMarquee = () => {
  return (
    <div className="overflow-hidden py-8 md:py-12 border-b border-primary/20">
      <div className="flex animate-marquee-slow whitespace-nowrap">
        {[1, 2, 3].map((_, i) => (
          <span 
            key={i} 
            className="mx-3 sm:mx-6 text-2xl sm:text-4xl md:text-6xl lg:text-8xl font-black text-transparent tracking-tighter"
            style={{
              WebkitTextStroke: '1px hsl(var(--primary) / 0.3)',
            }}
          >
            VAMOS CRIAR ALGO INCRÍVEL JUNTOS
            <span className="mx-8 text-primary">•</span>
          </span>
        ))}
      </div>
    </div>
  );
};

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram', color: '#E4405F' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', color: '#0A66C2' },
    { icon: Facebook, href: '#', label: 'Facebook', color: '#1877F2' },
    { icon: Twitter, href: '#', label: 'Twitter', color: '#1DA1F2' },
  ];

  const quickLinks = [
    { label: 'Sobre', href: '#about' },
    { label: 'Serviços', href: '#services' },
    { label: 'Cases', href: '#cases' },
    { label: 'Contato', href: '#contact' },
  ];

  const services = [
    'Gestão de Tráfego Pago',
    'Estruturação Comercial',
    'Desenvolvimento de Sites',
    'Social Media',
    'Produção Audiovisual',
  ];

  return (
    <footer ref={containerRef} className="relative overflow-hidden bg-background">

      {/* Marquee */}
      <FooterMarquee />

      {/* Main Footer Content */}
      <div className="relative py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12">
            
            {/* Brand Column */}
            <div className={`lg:col-span-1 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}>
              <div className="flex items-center gap-3 mb-6">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))',
                  }}
                >
                  <Sparkles className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="text-3xl font-black text-gradient">MOV</span>
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                MOV Assessoria de Marketing — Indaiatuba, SP — Atendemos todo o Brasil.
              </p>

              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-muted/30 flex items-center justify-center text-muted-foreground hover:text-white transition-all duration-300 hover:scale-110"
                    style={{ 
                      '--hover-bg': social.color,
                    } as React.CSSProperties}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = social.color;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '';
                    }}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className={`transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}>
              <h3 className="text-lg font-bold text-foreground mb-6">Navegação</h3>
              <ul className="space-y-3">
                {quickLinks.map((link, i) => (
                  <li key={i}>
                    <a 
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className={`transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}>
              <h3 className="text-lg font-bold text-foreground mb-6">Serviços</h3>
              <ul className="space-y-3">
                {services.map((service, i) => (
                  <li key={i}>
                    <a 
                      href="#services"
                      className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0" />
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Newsletter */}
            <div className={`transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}>
              <h3 className="text-lg font-bold text-foreground mb-6">Contato</h3>
              
              <div className="space-y-4 mb-8">
                <a 
                  href="mailto:contato@mov.marketing"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
                >
                  <Mail className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                  contato@mov.marketing
                </a>
                
                <a 
                  href="https://wa.me/5519981134193" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
                >
                  <Phone className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                  (19) 98113-4193
                </a>
                
                <div className="flex items-start gap-3 text-muted-foreground">
                  <MapPin className="w-5 h-5 text-primary mt-0.5" />
                  <span>Indaiatuba, SP — Brasil</span>
                </div>
              </div>

              {/* Newsletter */}
              <div>
                <p className="text-sm text-muted-foreground mb-3">
                  Receba insights exclusivos
                </p>
                <div className="flex gap-2">
                  <Input 
                    type="email"
                    placeholder="Seu email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-muted/30 border-border/50 focus:border-primary" 
                  />
                  <Button 
                    className="px-4 bg-primary hover:bg-primary/90"
                    onClick={() => {
                      if (email) {
                        alert('Obrigado por se inscrever!');
                        setEmail('');
                      }
                    }}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/30 py-6">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © 2024 MOV Assessoria de Marketing | Indaiatuba, SP | (19) 98113-4193 | contato@mov.marketing | Atendemos todo o Brasil
            </p>
            
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Privacidade</a>
              <a href="#" className="hover:text-primary transition-colors">Termos</a>
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes marquee-slow {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        
        .animate-marquee-slow {
          animation: marquee-slow 40s linear infinite;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
