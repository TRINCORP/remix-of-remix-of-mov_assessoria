import { useState, useRef, useEffect } from 'react';
import { Play, X, Volume2, VolumeX, Pause } from 'lucide-react';

const ShowreelSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // Sample showreel video - using a cinematic marketing reel
  const showreelUrl = "https://player.vimeo.com/external/434045526.hd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d&profile_id=175";

  useEffect(() => {
    if (isPlaying && videoRef.current) {
      videoRef.current.play();
    }
  }, [isPlaying]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      const percent = (video.currentTime / video.duration) * 100;
      setProgress(percent);
    };

    video.addEventListener('timeupdate', updateProgress);
    return () => video.removeEventListener('timeupdate', updateProgress);
  }, [isPlaying]);

  const handlePlay = () => {
    setIsPlaying(true);
    setIsPaused(false);
    document.body.style.overflow = 'hidden';
  };

  const handleClose = () => {
    setIsPlaying(false);
    setIsPaused(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    document.body.style.overflow = 'auto';
  };

  const togglePause = () => {
    if (videoRef.current) {
      if (isPaused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
      setIsPaused(!isPaused);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current && progressRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = percent * videoRef.current.duration;
    }
  };

  return (
    <>
      {/* Preview Section */}
      <section className="gsap-section relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
        {/* Background Video Preview (muted, looping) */}
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-30"
          >
            <source src={showreelUrl} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background" />
        </div>

        {/* Scanline Effect */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
          <div className="w-full h-full" style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)'
          }} />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          {/* Label */}
          <div className="gsap-badge inline-flex items-center gap-2 mb-8">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-primary uppercase tracking-[0.3em] text-sm font-medium">
              Showreel 2024
            </span>
          </div>

          {/* Main Title */}
          <h2 className="gsap-headline text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-none">
            <span className="text-foreground">VEJA NOSSO</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-300 to-primary">
              TRABALHO
            </span>
          </h2>

          {/* Subtitle */}
          <p className="gsap-paragraph text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-12">
            Uma compilação dos nossos melhores momentos, campanhas épicas e resultados 
            que transformaram marcas em fenômenos digitais.
          </p>

          {/* Play Button */}
          <button
            onClick={handlePlay}
            data-cursor="play"
            className="gsap-rotate-in group relative inline-flex items-center justify-center"
          >
            {/* Outer Ring Animation */}
            <div className="absolute w-40 h-40 md:w-48 md:h-48 rounded-full border border-primary/20 animate-ping" 
                 style={{ animationDuration: '2s' }} />
            <div className="absolute w-40 h-40 md:w-48 md:h-48 rounded-full border border-primary/10" />
            
            {/* Main Button */}
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-primary to-yellow-500 
                          flex items-center justify-center transition-all duration-500 
                          group-hover:scale-110 group-hover:shadow-[0_0_60px_rgba(234,179,8,0.5)]">
              <Play className="w-12 h-12 md:w-16 md:h-16 text-background fill-background ml-2" />
            </div>

            {/* Rotating Text */}
            <svg className="absolute w-48 h-48 md:w-56 md:h-56 animate-spin" style={{ animationDuration: '20s' }}>
              <defs>
                <path
                  id="circlePath"
                  d="M 96,96 m -80,0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0"
                />
              </defs>
              <text className="fill-primary/60 text-[10px] uppercase tracking-[0.3em]">
                <textPath href="#circlePath">
                  PLAY SHOWREEL • PLAY SHOWREEL • PLAY SHOWREEL •
                </textPath>
              </text>
            </svg>
          </button>

          {/* Duration Badge */}
          <div className="mt-12 inline-flex items-center gap-4 text-muted-foreground text-sm">
            <span className="flex items-center gap-2">
              <div className="w-1 h-1 bg-primary rounded-full" />
              2:30 min
            </span>
            <span className="flex items-center gap-2">
              <div className="w-1 h-1 bg-primary rounded-full" />
              4K Cinematic
            </span>
            <span className="flex items-center gap-2">
              <div className="w-1 h-1 bg-primary rounded-full" />
              2024 Highlights
            </span>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-8 left-8 text-muted-foreground/30 text-xs font-mono hidden md:block">
          <div>FRAME: 001</div>
          <div>CODEC: H.264</div>
        </div>
        <div className="absolute bottom-8 right-8 text-muted-foreground/30 text-xs font-mono hidden md:block">
          <div>RES: 4096x2160</div>
          <div>FPS: 24</div>
        </div>
      </section>

      {/* Fullscreen Video Modal */}
      {isPlaying && (
        <div className="fixed inset-0 z-[9999] bg-black">
          {/* Video */}
          <video
            ref={videoRef}
            autoPlay
            muted={isMuted}
            playsInline
            className="w-full h-full object-contain"
            onEnded={handleClose}
          >
            <source src={showreelUrl} type="video/mp4" />
          </video>

          {/* Overlay Controls */}
          <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-8">
            {/* Top Bar */}
            <div className="flex justify-between items-start">
              <div className="text-white/60 text-sm font-mono">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  PLAYING
                </div>
              </div>
              
              <button
                onClick={handleClose}
                className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center
                         hover:bg-white/20 transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Center Play/Pause (click anywhere) */}
            <div 
              className="flex-1 flex items-center justify-center cursor-pointer"
              onClick={togglePause}
            >
              {isPaused && (
                <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center
                              animate-fade-in">
                  <Play className="w-12 h-12 text-white fill-white ml-1" />
                </div>
              )}
            </div>

            {/* Bottom Bar */}
            <div className="space-y-4">
              {/* Progress Bar */}
              <div 
                ref={progressRef}
                onClick={handleProgressClick}
                className="w-full h-1 bg-white/20 rounded-full cursor-pointer group"
              >
                <div 
                  className="h-full bg-primary rounded-full relative transition-all"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full 
                                opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>

              {/* Controls */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <button
                    onClick={togglePause}
                    className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center
                             hover:bg-white/20 transition-colors"
                  >
                    {isPaused ? (
                      <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                    ) : (
                      <Pause className="w-5 h-5 text-white fill-white" />
                    )}
                  </button>
                  
                  <button
                    onClick={toggleMute}
                    className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center
                             hover:bg-white/20 transition-colors"
                  >
                    {isMuted ? (
                      <VolumeX className="w-5 h-5 text-white" />
                    ) : (
                      <Volume2 className="w-5 h-5 text-white" />
                    )}
                  </button>
                </div>

                <div className="text-white/60 text-sm font-mono">
                  MOV MARKETING • SHOWREEL 2024
                </div>
              </div>
            </div>
          </div>

          {/* Film Grain Effect */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-overlay"
               style={{
                 backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
               }} />
        </div>
      )}
    </>
  );
};

export default ShowreelSection;
