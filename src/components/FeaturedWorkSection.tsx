import { useState, useRef, useEffect } from 'react';
import { Play, ArrowUpRight, Zap, TrendingUp, Eye, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WorkItem {
  id: number;
  title: string;
  client: string;
  category: string;
  thumbnail: string;
  video?: string;
  color: string;
  stats: { label: string; value: string }[];
  size: 'large' | 'medium' | 'small';
}

const featuredWork: WorkItem[] = [
  {
    id: 1,
    title: "Explosão Digital",
    client: "TechBrand",
    category: "Social Media",
    thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop",
    video: "https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4",
    color: "#FF6B35",
    stats: [
      { label: "Engajamento", value: "+340%" },
      { label: "Alcance", value: "2.5M" },
    ],
    size: 'large',
  },
  {
    id: 2,
    title: "Campanha Viral",
    client: "FoodCo",
    category: "Influencer Marketing",
    thumbnail: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop",
    video: "https://videos.pexels.com/video-files/5973040/5973040-uhd_2560_1440_24fps.mp4",
    color: "#F59E0B",
    stats: [
      { label: "Views", value: "5.2M" },
      { label: "ROI", value: "12x" },
    ],
    size: 'medium',
  },
  {
    id: 3,
    title: "Rebranding Completo",
    client: "StyleBrand",
    category: "Branding",
    thumbnail: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
    color: "#8B5CF6",
    stats: [
      { label: "Vendas", value: "+180%" },
      { label: "Awareness", value: "3x" },
    ],
    size: 'medium',
  },
  {
    id: 4,
    title: "Lançamento Game",
    client: "GameStudio",
    category: "Launch Campaign",
    thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop",
    video: "https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4",
    color: "#EC4899",
    stats: [
      { label: "Downloads", value: "500K" },
      { label: "Trend #1", value: "3 dias" },
    ],
    size: 'small',
  },
  {
    id: 5,
    title: "Influencer Hub",
    client: "BeautyBrand",
    category: "Creator Economy",
    thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
    video: "https://videos.pexels.com/video-files/4625514/4625514-uhd_2560_1440_30fps.mp4",
    color: "#06B6D4",
    stats: [
      { label: "Creators", value: "150+" },
      { label: "Impressões", value: "20M" },
    ],
    size: 'small',
  },
];

// Card de trabalho com hover video
const WorkCard = ({ item, index }: { item: WorkItem; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isHovered) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isHovered]);

  const sizeClasses = {
    large: 'col-span-1 sm:col-span-2 row-span-1 sm:row-span-2',
    medium: 'col-span-1 row-span-1 sm:row-span-2',
    small: 'col-span-1 row-span-1',
  };

  const heightClasses = {
    large: 'h-[280px] sm:h-[400px] md:h-[500px] lg:h-[600px]',
    medium: 'h-[260px] sm:h-[350px] md:h-[500px]',
    small: 'h-[220px] sm:h-[250px] md:h-[280px]',
  };

  return (
    <div 
      className={`gsap-card ${sizeClasses[item.size]} ${heightClasses[item.size]} relative group cursor-pointer overflow-hidden rounded-2xl md:rounded-3xl`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-cursor="view"
    >
      {/* Background - Image or Video */}
      <div className="absolute inset-0">
        <img 
          src={item.thumbnail} 
          alt={item.title}
          className={`w-full h-full object-cover transition-all duration-700 ${
            isHovered && item.video ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
          }`}
        />
        
        {/* Video overlay on hover */}
        {item.video && (
          <video
            ref={videoRef}
            src={item.video}
            muted
            loop
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}
      </div>

      {/* Gradient overlay */}
      <div 
        className={`absolute inset-0 transition-all duration-500 ${
          isHovered 
            ? 'bg-gradient-to-t from-black/90 via-black/40 to-transparent' 
            : 'bg-gradient-to-t from-black/70 via-black/20 to-transparent'
        }`}
      />

      {/* Colored accent border on hover */}
      <div 
        className={`absolute inset-0 rounded-2xl md:rounded-3xl transition-all duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          boxShadow: `inset 0 0 0 3px ${item.color}`,
        }}
      />

      {/* Category tag */}
      <div className="absolute top-4 left-4 z-10">
        <span 
          className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md transition-all duration-300"
          style={{
            backgroundColor: `${item.color}20`,
            color: item.color,
            border: `1px solid ${item.color}40`,
          }}
        >
          {item.category}
        </span>
      </div>

      {/* Play indicator for video items */}
      {item.video && (
        <div className={`absolute top-4 right-4 z-10 transition-all duration-300 ${
          isHovered ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
        }`}>
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md"
            style={{ backgroundColor: `${item.color}30` }}
          >
            <Play className="w-4 h-4 text-white ml-0.5" fill="white" />
          </div>
        </div>
      )}

      {/* Content */}
      <div className={`absolute inset-x-0 bottom-0 p-5 md:p-6 z-10 transition-all duration-500 ${
        isHovered ? 'translate-y-0' : 'translate-y-2'
      }`}>
        {/* Client */}
        <span 
          className="text-xs font-bold tracking-widest uppercase mb-2 block transition-colors duration-300"
          style={{ color: isHovered ? item.color : 'rgba(255,255,255,0.7)' }}
        >
          {item.client}
        </span>

        {/* Title */}
        <h3 className={`font-black text-white mb-4 transition-all duration-300 ${
          item.size === 'large' 
            ? 'text-3xl md:text-4xl lg:text-5xl' 
            : item.size === 'medium'
            ? 'text-2xl md:text-3xl'
            : 'text-xl md:text-2xl'
        }`}>
          {item.title}
        </h3>

        {/* Stats */}
        <div className={`flex gap-4 md:gap-6 transition-all duration-500 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          {item.stats.map((stat, i) => (
            <div key={i} className="flex flex-col">
              <span 
                className="text-2xl md:text-3xl font-black"
                style={{ color: item.color }}
              >
                {stat.value}
              </span>
              <span className="text-xs text-white/60 uppercase tracking-wide">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Arrow indicator */}
        <div className={`absolute right-5 md:right-6 bottom-5 md:bottom-6 transition-all duration-500 ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
        }`}>
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: item.color }}
          >
            <ArrowUpRight className="w-5 h-5 text-black" />
          </div>
        </div>
      </div>

      {/* Glitch effect on hover */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute inset-0 opacity-10 mix-blend-overlay"
            style={{
              backgroundImage: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                ${item.color}20 2px,
                ${item.color}20 4px
              )`,
              animation: 'scanline 0.1s linear infinite',
            }}
          />
        </div>
      )}
    </div>
  );
};

// Marquee de texto
const TextMarquee = () => {
  const phrases = [
    "SOCIAL FIRST",
    "CREATOR ECONOMY",
    "VIRAL CONTENT",
    "BRAND BUILDING",
    "INFLUENCER MARKETING",
    "DIGITAL STRATEGY",
  ];

  return (
    <div className="overflow-hidden py-4 border-y border-primary/20 bg-primary/5">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...phrases, ...phrases, ...phrases].map((phrase, i) => (
          <span key={i} className="mx-8 text-lg md:text-xl font-black text-primary/60 flex items-center gap-4">
            <Zap className="w-4 h-4" />
            {phrase}
          </span>
        ))}
      </div>
    </div>
  );
};

const FeaturedWorkSection = () => {
  const [isVisible, setIsVisible] = useState(false);
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

  return (
    <section ref={containerRef} className="gsap-section relative py-16 md:py-24 overflow-hidden bg-background">
      {/* Animated background grid */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Marquee */}
      <TextMarquee />

      <div className="container mx-auto px-4 md:px-6 mt-12 md:mt-16">
        {/* Section Header - Editorial Style */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
          <div>
            <div className="gsap-badge flex items-center gap-3 mb-4">
              <div className="gsap-line w-12 h-[2px] bg-primary" />
              <span className="text-sm font-bold text-primary tracking-widest uppercase">Nosso Trabalho</span>
            </div>
            
            <h2 className="gsap-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-none">
              <span className="text-foreground">Cases que</span>
              <br />
              <span className="text-gradient">quebram a internet</span>
            </h2>
          </div>

          <div className="gsap-stats flex flex-col items-start md:items-end gap-4">
            <div className="flex items-center gap-6 text-muted-foreground">
              <div className="gsap-stat flex items-center gap-2">
                <Eye className="w-5 h-5 text-primary" />
                <span className="font-bold">50M+</span>
                <span className="text-sm">alcance</span>
              </div>
              <div className="gsap-stat flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" />
                <span className="font-bold">98%</span>
                <span className="text-sm">satisfação</span>
              </div>
              <div className="gsap-stat flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span className="font-bold">500+</span>
                <span className="text-sm">campanhas</span>
              </div>
            </div>
          </div>
        </div>

        {/* Work Grid - Bento Style */}
        <div className="gsap-cards-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-12">
          {featuredWork.map((item, index) => (
            <WorkCard key={item.id} item={item} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="gsap-cta flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <Button 
            className="btn-hero group text-base px-8 py-5"
            onClick={() => window.open('https://wa.me/5519981134193', '_blank')}
          >
            <span>Quero resultados assim</span>
            <ArrowUpRight className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Button>
          
          <p className="text-sm text-muted-foreground">
            Veja como podemos <span className="text-primary font-bold">transformar sua marca</span>
          </p>
        </div>
      </div>

      {/* Bottom Marquee */}
      <div className="mt-16">
        <TextMarquee />
      </div>

      {/* Scanline animation */}
      <style>{`
        @keyframes scanline {
          0% { transform: translateY(0); }
          100% { transform: translateY(4px); }
        }
        
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default FeaturedWorkSection;
