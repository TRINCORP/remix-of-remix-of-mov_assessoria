import { useState, useEffect, useRef } from 'react';
import {
  Facebook, Instagram, Linkedin, Twitter,
  Mail, Phone, MapPin, ArrowUpRight, Send
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
            style={{ WebkitTextStroke: '1px hsl(var(--primary) / 0.3)' }}
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
  const [subscribed, setSubscribed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.05 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
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

      {/* Animated background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-40 left-1/4 w-[500px] h-[500px] rounded-full blur-[160px] transition-opacity duration-[2000ms]"
          style={{
            background: 'radial-gradient(circle, hsl(var(--primary) / 0.12) 0%, transparent 70%)',
            opacity: isVisible ? 1 : 0,
          }}
        />
        <div
          className="absolute bottom-0 right-1/3 w-[400px] h-[400px] rounded-full blur-[130px] transition-opacity duration-[2000ms]"
          style={{
            background: 'radial-gradient(circle, hsl(var(--secondary) / 0.1) 0%, transparent 70%)',
            opacity: isVisible ? 1 : 0,
          }}
        />
        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 transition-opacity duration-[2000ms]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--primary) / 0.06) 1px, transparent 0)',
            backgroundSize: '40px 40px',
            opacity: isVisible ? 1 : 0,
          }}
        />
      </div>

      {/* Marquee */}
      <FooterMarquee />

      {/* Main Footer Content */}
      <div className="relative py-14 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">

            {/* Brand Column */}
            <div
              className="sm:col-span-2 lg:col-span-1 transition-all duration-700"
              style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(24px)' }}
            >
              {/* Logo */}
              <div className="flex items-center gap-3 mb-5">
                <div className="relative w-14 h-14 flex-shrink-0">
                  <div
                    className="absolute inset-0 rounded-xl blur-md"
                    style={{ background: 'linear-gradient(135deg, hsl(var(--primary)/0.6), hsl(var(--secondary)/0.4))' }}
                  />
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, hsl(var(--primary)/0.15), hsl(var(--secondary)/0.1))' }}
                  >
                    <img
                      src="/lovable-uploads/mov-logo-gold.png"
                      alt="MOV Logo"
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                </div>
                <div>
                  <span className="block text-2xl font-black text-gradient leading-none">MOV</span>
                  <span className="block text-[10px] tracking-[0.2em] text-muted-foreground uppercase font-medium">Assessoria</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                Marketing estratégico para pequenos e médios negócios. Indaiatuba, SP — atendemos todo o Brasil.
              </p>

              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    aria-label={social.label}
                    className="w-9 h-9 rounded-full bg-muted/30 border border-border/30 flex items-center justify-center text-muted-foreground hover:text-white transition-all duration-300 hover:scale-110 hover:border-transparent"
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = social.color; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = ''; }}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div
              className="transition-all duration-700"
              style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(24px)', transitionDelay: '100ms' }}
            >
              <h3 className="text-sm font-bold text-foreground mb-5 uppercase tracking-widest">Navegação</h3>
              <ul className="space-y-3">
                {quickLinks.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0 flex-shrink-0" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div
              className="transition-all duration-700"
              style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(24px)', transitionDelay: '200ms' }}
            >
              <h3 className="text-sm font-bold text-foreground mb-5 uppercase tracking-widest">Serviços</h3>
              <ul className="space-y-3">
                {services.map((service, i) => (
                  <li key={i}>
                    <a
                      href="#services"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0 flex-shrink-0" />
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Newsletter */}
            <div
              className="sm:col-span-2 lg:col-span-1 transition-all duration-700"
              style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(24px)', transitionDelay: '300ms' }}
            >
              <h3 className="text-sm font-bold text-foreground mb-5 uppercase tracking-widest">Contato</h3>

              <div className="space-y-3 mb-8">
                <a
                  href="mailto:comercial.movassessoria@gmail.com"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group"
                >
                  <Mail className="w-4 h-4 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
                  comercial.movassessoria@gmail.com
                </a>
                <a
                  href="https://wa.me/5519981134193"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group"
                >
                  <Phone className="w-4 h-4 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
                  (19) 98113-4193
                </a>
                <div className="flex items-start gap-3 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Indaiatuba, SP — Brasil</span>
                </div>
              </div>

              {/* Newsletter */}
              <div>
                <p className="text-xs text-muted-foreground mb-3 font-medium uppercase tracking-wider">
                  Insights exclusivos
                </p>
                {subscribed ? (
                  <p className="text-sm text-primary font-semibold">Obrigado por se inscrever!</p>
                ) : (
                  <div className="flex gap-2">
                    <Input
                      type="email"
                      placeholder="Seu email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && email) { setSubscribed(true); setEmail(''); }
                      }}
                      className="bg-muted/30 border-border/50 focus:border-primary text-sm h-9"
                    />
                    <Button
                      className="px-3 h-9 bg-primary hover:bg-primary/90 flex-shrink-0"
                      onClick={() => { if (email) { setSubscribed(true); setEmail(''); } }}
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/20 py-5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-center sm:text-left">
              <p className="text-xs text-muted-foreground">
                © 2024 MOV Assessoria de Marketing · Indaiatuba, SP
              </p>
              <p className="text-xs text-muted-foreground/60 mt-0.5 sm:hidden">
                (19) 98113-4193 · comercial.movassessoria@gmail.com
              </p>
            </div>
            <div className="flex items-center gap-5 text-xs text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Privacidade</a>
              <a href="#" className="hover:text-primary transition-colors">Termos</a>
            </div>
          </div>
        </div>
      </div>

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
