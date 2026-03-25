import { useEffect, useState, useRef } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) return;

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorType = target.closest('[data-cursor]')?.getAttribute('data-cursor');
      const isButton = target.closest('button, a, [role="button"]');
      const isVideo = target.closest('video, [data-cursor="play"]');
      const isCard = target.closest('[data-cursor="view"]');
      const isDrag = target.closest('[data-cursor="drag"]');

      if (cursorType) {
        setIsHovering(true);
        setCursorText(cursorType.toUpperCase());
      } else if (isVideo) {
        setIsHovering(true);
        setCursorText('PLAY');
      } else if (isDrag) {
        setIsHovering(true);
        setCursorText('DRAG');
      } else if (isCard) {
        setIsHovering(true);
        setCursorText('VIEW');
      } else if (isButton) {
        setIsHovering(true);
        setCursorText('');
      } else {
        setIsHovering(false);
        setCursorText('');
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.body.style.cursor = 'none';

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'auto';
    };
  }, []);

  if (typeof window !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    return null;
  }

  return (
    <>
      {/* Main cursor dot */}
      <div
        ref={cursorRef}
        className={`fixed pointer-events-none z-[9999] transition-transform duration-150 ease-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          left: position.x,
          top: position.y,
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.8 : 1})`,
        }}
      >
        {/* Outer ring */}
        <div
          className={`absolute rounded-full border-2 border-primary transition-all duration-300 ease-out ${
            isHovering ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
          }`}
          style={{
            width: cursorText ? '80px' : '50px',
            height: cursorText ? '80px' : '50px',
            transform: 'translate(-50%, -50%)',
            left: '50%',
            top: '50%',
            backgroundColor: cursorText ? 'hsl(var(--primary))' : 'transparent',
          }}
        >
          {cursorText && (
            <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-primary-foreground tracking-wider">
              {cursorText}
            </span>
          )}
        </div>

        {/* Inner dot */}
        <div
          className={`rounded-full bg-primary transition-all duration-150 ${
            isHovering && cursorText ? 'scale-0' : 'scale-100'
          }`}
          style={{
            width: isHovering ? '12px' : '8px',
            height: isHovering ? '12px' : '8px',
            boxShadow: '0 0 20px hsl(var(--primary) / 0.5)',
          }}
        />
      </div>

      {/* Trailing cursor */}
      <div
        className={`fixed pointer-events-none z-[9998] rounded-full border border-primary/30 transition-all duration-500 ease-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          left: position.x,
          top: position.y,
          width: '40px',
          height: '40px',
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`,
        }}
      />

      {/* Global style to hide cursor on interactive elements */}
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
