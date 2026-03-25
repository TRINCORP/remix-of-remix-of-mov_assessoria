import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Rocket,
  Sparkles,
  ArrowRight,
  Phone,
  Mail,
  MessageCircle,
  Zap,
  Target,
  CheckCircle,
  Loader2,
  ChevronDown,
  Check,
} from 'lucide-react';

const SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL as string;

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

const SEGMENTS = [
  'E-commerce / Varejo',
  'Saúde e Bem-estar',
  'Alimentação / Restaurante',
  'Serviços / Consultoria',
  'Imóveis',
  'Tecnologia',
  'Educação',
  'Outro',
];

const SERVICES = [
  'Redes Sociais',
  'Google / Meta Ads',
  'Criação de Site',
  'Identidade Visual',
  'Consultoria Estratégica',
  'Produção de Conteúdo',
  'Email Marketing',
  'SEO',
];

const BUDGETS = [
  'Ainda não invisto',
  'Até R$ 1.000/mês',
  'R$ 1.000 a R$ 3.000/mês',
  'R$ 3.000 a R$ 10.000/mês',
  'Acima de R$ 10.000/mês',
];

const formatPhone = (value: string) => {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : '';
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};

interface DropdownSelectProps {
  placeholder: string;
  options: string[];
  selected: string | string[];
  multi?: boolean;
  onChange: (val: string | string[]) => void;
  disabled?: boolean;
}

const DropdownSelect = ({ placeholder, options, selected, multi, onChange, disabled }: DropdownSelectProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const isSelected = (opt: string) =>
    multi ? (selected as string[]).includes(opt) : selected === opt;

  const toggle = (opt: string) => {
    if (multi) {
      const arr = selected as string[];
      onChange(arr.includes(opt) ? arr.filter(v => v !== opt) : [...arr, opt]);
    } else {
      onChange(selected === opt ? '' : opt);
      setOpen(false);
    }
  };

  const displayValue = multi
    ? (selected as string[]).length === 0
      ? placeholder
      : (selected as string[]).length === 1
        ? (selected as string[])[0]
        : `${(selected as string[]).length} selecionados`
    : (selected as string) || placeholder;

  const hasValue = multi ? (selected as string[]).length > 0 : !!(selected as string);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen(v => !v)}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-sm transition-all duration-200
          bg-background/50 border-border/50 hover:border-primary/60
          ${open ? 'border-primary ring-1 ring-primary/30' : ''}
          ${hasValue ? 'text-foreground' : 'text-muted-foreground'}
          disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <span className="truncate text-left">{displayValue}</span>
        <ChevronDown className={`w-4 h-4 ml-2 shrink-0 text-muted-foreground transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-xl border border-border/60 bg-background shadow-xl overflow-hidden">
          <div className="max-h-40 sm:max-h-52 overflow-y-auto py-1">
            {options.map(opt => (
              <button
                key={opt}
                type="button"
                onClick={() => toggle(opt)}
                className={`w-full flex items-center justify-between px-4 py-3 sm:py-2.5 text-sm text-left transition-colors hover:bg-primary/10
                  ${isSelected(opt) ? 'text-primary bg-primary/5' : 'text-foreground'}`}
              >
                <span>{opt}</span>
                {isSelected(opt) && <Check className="w-4 h-4 text-primary shrink-0" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const CTASection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    segment: '',
    services: [] as string[],
    budget: '',
  });
  const [status, setStatus] = useState<FormStatus>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const params = new URLSearchParams({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        segment: formData.segment,
        services: formData.services.join(', '),
        budget: formData.budget,
        t: Date.now().toString(),
      });

      await new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => resolve();
        img.src = `${SCRIPT_URL}?${params.toString()}`;
        setTimeout(resolve, 5000);
      });

      setStatus('success');
      setFormData({ name: '', email: '', phone: '', segment: '', services: [], budget: '' });
    } catch (err) {
      console.error('[CTASection] form error:', err);
      setStatus('error');
    }
  };

  const resetStatus = () => setStatus('idle');
  const isLoading = status === 'loading';

  return (
    <section className="gsap-section py-16 md:py-32 px-4 md:px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />

      <div className="absolute inset-0">
        <div className="gsap-parallax absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" data-speed="0.3" />
        <div className="gsap-parallax absolute bottom-20 right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" data-speed="0.5" />
        <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-accent rounded-full animate-ping" />
        <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-primary rounded-full animate-ping animation-delay-1000" />
        <div className="absolute top-2/3 left-1/3 w-3 h-3 bg-secondary rounded-full animate-ping animation-delay-2000" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main CTA */}
        <div className="text-center mb-10 md:mb-20">
          <div className="gsap-badge inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 rounded-full px-4 sm:px-8 py-2 sm:py-4 mb-6 md:mb-8">
            <Rocket className="w-5 h-5 sm:w-6 sm:h-6 text-primary animate-bounce" />
            <span className="text-sm sm:text-lg font-bold text-gradient">VAMOS CONVERSAR</span>
          </div>

          <h2 className="gsap-headline text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black mb-6 md:mb-8 leading-tight">
            <span className="block text-foreground">Pronto para</span>
            <span className="block text-gradient">estruturar o marketing</span>
            <span className="block text-foreground">da sua empresa?</span>
          </h2>

          <p className="gsap-paragraph text-base sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-2">
            Fale com um estrategista da MOV e descubra o que é possível para o seu negócio.
          </p>
          <p className="text-sm text-muted-foreground mb-8 md:mb-12">
            Atendemos todo o Brasil, online e presencial.
          </p>

          {/* Benefits */}
          <div className="gsap-cards-container grid grid-cols-3 gap-2 sm:gap-6 max-w-4xl mx-auto mb-8 md:mb-12">
            {[
              { icon: Zap, text: "Consultoria gratuita", color: "primary" },
              { icon: Target, text: "Estratégia personalizada", color: "secondary" },
              { icon: CheckCircle, text: "Sem compromisso", color: "accent" }
            ].map((benefit, index) => (
              <div key={index} className="gsap-card flex flex-col sm:flex-row items-center gap-1 sm:gap-3 justify-center">
                <benefit.icon className={`w-5 h-5 sm:w-6 sm:h-6 text-${benefit.color}`} />
                <span className="font-semibold text-foreground text-xs sm:text-base text-center">{benefit.text}</span>
              </div>
            ))}
          </div>

          {/* Quick Action Buttons */}
          <div className="gsap-cta flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center items-center mb-10 md:mb-20">
            <Button
              className="btn-hero group text-sm sm:text-base md:text-xl px-6 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 w-full sm:w-auto"
              onClick={() => window.open('https://wa.me/5519981134193', '_blank')}
            >
              <Sparkles className="mr-2 sm:mr-3 w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform shrink-0" />
              <span>Quero minha consultoria gratuita</span>
              <ArrowRight className="ml-2 sm:ml-3 w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform shrink-0" />
            </Button>

            <div className="flex gap-3">
              <Button variant="outline" className="btn-secondary p-3 sm:p-4" onClick={() => window.open('tel:+5519981134193', '_blank')}>
                <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
              </Button>
              <Button variant="outline" className="btn-secondary p-3 sm:p-4" onClick={() => window.open('mailto:comercial.movassessoria@gmail.com', '_blank')}>
                <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
              </Button>
              <Button variant="outline" className="btn-secondary p-3 sm:p-4" onClick={() => window.open('https://wa.me/5519981134193', '_blank')}>
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
              </Button>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="gsap-cards-container grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 lg:gap-12 items-start">
          {/* Form */}
          <div className="gsap-card card-glow">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground">Fale conosco</h3>
                <p className="text-sm text-muted-foreground">Leva menos de 1 minuto • Resposta em até 2 horas</p>
              </div>
            </div>

            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-9 h-9 text-green-500" />
                </div>
                <h4 className="text-2xl font-bold text-foreground">Mensagem enviada!</h4>
                <p className="text-muted-foreground max-w-xs">
                  Recebemos seu contato e retornaremos em até <span className="text-primary font-semibold">2 horas úteis</span>.
                </p>
                <Button variant="outline" className="btn-secondary mt-4" onClick={resetStatus}>
                  Enviar outra mensagem
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Nome Completo *
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Seu nome"
                    className="bg-background/50 border-border/50 focus:border-primary transition-colors"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    WhatsApp *
                  </label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: formatPhone(e.target.value) })}
                    placeholder="(00) 00000-0000"
                    className="bg-background/50 border-border/50 focus:border-primary transition-colors"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Email *
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="seu@email.com"
                    className="bg-background/50 border-border/50 focus:border-primary transition-colors"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Qual é o seu segmento?
                  </label>
                  <DropdownSelect
                    placeholder="Selecione seu segmento"
                    options={SEGMENTS}
                    selected={formData.segment}
                    onChange={(v) => setFormData({ ...formData, segment: v as string })}
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    O que você precisa?
                  </label>
                  <DropdownSelect
                    placeholder="Selecione um ou mais serviços"
                    options={SERVICES}
                    selected={formData.services}
                    multi
                    onChange={(v) => setFormData({ ...formData, services: v as string[] })}
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Investimento mensal em marketing hoje?
                  </label>
                  <DropdownSelect
                    placeholder="Selecione uma faixa"
                    options={BUDGETS}
                    selected={formData.budget}
                    onChange={(v) => setFormData({ ...formData, budget: v as string })}
                    disabled={isLoading}
                  />
                </div>

                {status === 'error' && (
                  <p className="text-sm text-red-500 text-center">
                    Erro ao enviar. Tente novamente ou fale diretamente pelo WhatsApp.
                  </p>
                )}

                <Button
                  type="submit"
                  className="btn-hero w-full text-lg py-4 group mt-2"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                      <span>Enviando...</span>
                    </>
                  ) : (
                    <>
                      <span>Quero minha consultoria gratuita</span>
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>

          {/* Contact Info & Stats */}
          <div className="space-y-8">
            <div className="card-glow">
              <h3 className="text-2xl font-bold text-foreground mb-6">Contatos diretos</h3>

              <div className="space-y-4">
                <a
                  href="tel:+5519981134193"
                  className="flex items-center gap-4 p-4 bg-primary/5 rounded-2xl hover:bg-primary/10 transition-colors cursor-pointer group"
                >
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Telefone</div>
                    <div className="text-muted-foreground">(19) 98113-4193</div>
                  </div>
                </a>

                <a
                  href="mailto:comercial.movassessoria@gmail.com"
                  className="flex items-center gap-4 p-4 bg-secondary/5 rounded-2xl hover:bg-secondary/10 transition-colors cursor-pointer group"
                >
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Email</div>
                    <div className="text-muted-foreground">comercial.movassessoria@gmail.com</div>
                  </div>
                </a>

                <a
                  href="https://wa.me/5519981134193"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-accent/5 rounded-2xl hover:bg-accent/10 transition-colors cursor-pointer group"
                >
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">WhatsApp</div>
                    <div className="text-muted-foreground">Resposta instantânea</div>
                  </div>
                </a>
              </div>
            </div>

            <div className="card-glow bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
              <div className="text-center">
                <Zap className="w-16 h-16 text-primary mx-auto mb-4 animate-pulse" />
                <h3 className="text-2xl font-bold text-foreground mb-2">Resposta Rápida</h3>
                <p className="text-muted-foreground mb-4">
                  Respondemos todos os contatos em até <span className="text-primary font-bold">2 horas úteis</span>
                </p>
                <div className="text-4xl font-black text-gradient">100%</div>
                <div className="text-sm text-muted-foreground">Taxa de resposta</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
