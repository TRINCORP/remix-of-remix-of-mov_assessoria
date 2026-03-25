import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, Rocket, Target } from 'lucide-react';

const VideoHeroBanner = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (videoRef.current) {
          if (entry.isIntersecting) {
            videoRef.current.play();
            setIsPlaying(true);
          } else {
            videoRef.current.pause();
            setIsPlaying(false);
          }
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section 
      ref={containerRef}
      className="relative h-[60vh] md:h-[70vh] overflow-hidden"
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&h=1080&fit=crop"
      >
        <source 
          src="https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d&profile_id=165" 
          type="video/mp4" 
        />
      </video>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      
      {/* Animated color accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl animate-pulse"
          style={{ background: 'hsla(var(--primary), 0.2)' }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full blur-3xl animate-pulse animation-delay-1000"
          style={{ background: 'hsla(var(--secondary), 0.15)' }}
        />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className={`text-center transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Glitch text effect */}
      <h2 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-4 relative glitch-container">
            <span className="glitch-text text-white relative">
              MARKETING
            </span>
          </h2>
          <h2 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-6">
            <span className="text-gradient">QUE MOVE</span>
          </h2>
          
          {/* Animated subtitle */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 text-sm sm:text-xl md:text-2xl text-white/80 flex-wrap">
            <Rocket className="w-4 h-4 sm:w-5 sm:h-5 text-primary animate-pulse" />
            <span>Estratégia</span>
            <span className="text-primary">•</span>
            <span>Performance</span>
            <span className="text-primary">•</span>
            <span>Resultados</span>
            <Target className="w-4 h-4 sm:w-5 sm:h-5 text-primary animate-pulse" />
          </div>
        </div>
      </div>

      {/* Video controls */}
      <div className="absolute bottom-6 right-6 flex gap-3">
        <button
          onClick={togglePlay}
          className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors border border-white/30"
          aria-label={isPlaying ? 'Pausar' : 'Reproduzir'}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 text-white" />
          ) : (
            <Play className="w-5 h-5 text-white ml-0.5" />
          )}
        </button>
        <button
          onClick={toggleMute}
          className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors border border-white/30"
          aria-label={isMuted ? 'Ativar som' : 'Silenciar'}
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5 text-white" />
          ) : (
            <Volume2 className="w-5 h-5 text-white" />
          )}
        </button>
      </div>

      {/* Scroll indicator - hidden on very small screens to avoid overlap */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 hidden sm:flex flex-col items-center gap-2">
        <span className="text-xs text-white/60 uppercase tracking-widest">Role para explorar</span>
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce" />
        </div>
      </div>

      {/* Decorative film borders - hidden on small mobile */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/50 to-transparent hidden sm:flex flex-col justify-around py-8">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="w-4 h-5 bg-black/40 rounded-sm mx-2" />
        ))}
      </div>
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/50 to-transparent hidden sm:flex flex-col justify-around py-8">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="w-4 h-5 bg-black/40 rounded-sm mx-2" />
        ))}
      </div>

      {/* Glitch effect styles */}
      <style>{`
        .glitch-container {
          position: relative;
        }

        .glitch-text {
          text-shadow: 
            0.05em 0 0 rgba(255, 0, 0, 0.75),
            -0.025em -0.05em 0 rgba(0, 255, 0, 0.75),
            0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
          animation: glitch 500ms infinite;
        }

        @keyframes glitch {
          0% {
            text-shadow: 
              0.05em 0 0 rgba(255, 0, 0, 0.75),
              -0.05em -0.025em 0 rgba(0, 255, 0, 0.75),
              -0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
          }
          14% {
            text-shadow: 
              0.05em 0 0 rgba(255, 0, 0, 0.75),
              -0.05em -0.025em 0 rgba(0, 255, 0, 0.75),
              -0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
          }
          15% {
            text-shadow: 
              -0.05em -0.025em 0 rgba(255, 0, 0, 0.75),
              0.025em 0.025em 0 rgba(0, 255, 0, 0.75),
              -0.05em -0.05em 0 rgba(0, 0, 255, 0.75);
          }
          49% {
            text-shadow: 
              -0.05em -0.025em 0 rgba(255, 0, 0, 0.75),
              0.025em 0.025em 0 rgba(0, 255, 0, 0.75),
              -0.05em -0.05em 0 rgba(0, 0, 255, 0.75);
          }
          50% {
            text-shadow: 
              0.025em 0.05em 0 rgba(255, 0, 0, 0.75),
              0.05em 0 0 rgba(0, 255, 0, 0.75),
              0 -0.05em 0 rgba(0, 0, 255, 0.75);
          }
          99% {
            text-shadow: 
              0.025em 0.05em 0 rgba(255, 0, 0, 0.75),
              0.05em 0 0 rgba(0, 255, 0, 0.75),
              0 -0.05em 0 rgba(0, 0, 255, 0.75);
          }
          100% {
            text-shadow: 
              -0.025em 0 0 rgba(255, 0, 0, 0.75),
              -0.025em -0.025em 0 rgba(0, 255, 0, 0.75),
              -0.025em -0.05em 0 rgba(0, 0, 255, 0.75);
          }
        }
      `}</style>
    </section>
  );
};

export default VideoHeroBanner;
