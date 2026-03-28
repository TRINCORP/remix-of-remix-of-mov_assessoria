import { useEffect, useRef, useCallback } from 'react';

const CustomCursor = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const outerRingRef = useRef<HTMLDivElement>(null);
  const innerDotRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLSpanElement>(null);
  const rafId = useRef<number>(0);
  const pos = useRef({ x: 0, y: 0 });
  const trailPos = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);
  const cursorText = useRef('');
  const isVisible = useRef(false);

  const updateTrail = useCallback(() => {
    // Lerp trail towards main cursor
    trailPos.current.x += (pos.current.x - trailPos.current.x) * 0.15;
    trailPos.current.y += (pos.current.y - trailPos.current.y) * 0.15;

    if (trailRef.current) {
      trailRef.current.style.transform = `translate3d(${trailPos.current.x - 20}px, ${trailPos.current.y - 20}px, 0) scale(${isHovering.current ? 1.5 : 1})`;
    }

    rafId.current = requestAnimationFrame(updateTrail);
  }, []);

  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) return;

    const updatePosition = (e: MouseEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;

      if (!isVisible.current) {
        isVisible.current = true;
        if (mainRef.current) mainRef.current.style.opacity = '1';
        if (trailRef.current) trailRef.current.style.opacity = '1';
      }

      // Direct DOM update for main cursor (no React re-render)
      if (mainRef.current) {
        mainRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const handleMouseDown = () => {
      if (mainRef.current) mainRef.current.style.scale = '0.8';
    };
    const handleMouseUp = () => {
      if (mainRef.current) mainRef.current.style.scale = '1';
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorType = target.closest('[data-cursor]')?.getAttribute('data-cursor');
      const isButton = target.closest('button, a, [role="button"]');
      const isVideo = target.closest('video, [data-cursor="play"]');
      const isCard = target.closest('[data-cursor="view"]');
      const isDrag = target.closest('[data-cursor="drag"]');

      let newText = '';
      let hovering = false;

      if (cursorType) { hovering = true; newText = cursorType.toUpperCase(); }
      else if (isVideo) { hovering = true; newText = 'PLAY'; }
      else if (isDrag) { hovering = true; newText = 'DRAG'; }
      else if (isCard) { hovering = true; newText = 'VIEW'; }
      else if (isButton) { hovering = true; newText = ''; }

      if (hovering !== isHovering.current || newText !== cursorText.current) {
        isHovering.current = hovering;
        cursorText.current = newText;

        // Update DOM directly
        if (outerRingRef.current) {
          const size = newText ? '80px' : '50px';
          outerRingRef.current.style.width = size;
          outerRingRef.current.style.height = size;
          outerRingRef.current.style.backgroundColor = newText ? 'hsl(var(--primary))' : 'transparent';
          outerRingRef.current.style.transform = `translate(-50%, -50%) scale(${hovering ? 1 : 0.5})`;
          outerRingRef.current.style.opacity = hovering ? '1' : '0';
        }
        if (cursorTextRef.current) {
          cursorTextRef.current.textContent = newText;
          cursorTextRef.current.style.display = newText ? 'flex' : 'none';
        }
        if (innerDotRef.current) {
          innerDotRef.current.style.transform = `scale(${hovering && newText ? 0 : 1})`;
          const dotSize = hovering ? '12px' : '8px';
          innerDotRef.current.style.width = dotSize;
          innerDotRef.current.style.height = dotSize;
        }
      }
    };

    const handleMouseLeave = () => {
      isVisible.current = false;
      if (mainRef.current) mainRef.current.style.opacity = '0';
      if (trailRef.current) trailRef.current.style.opacity = '0';
    };

    document.addEventListener('mousemove', updatePosition, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.body.style.cursor = 'none';

    rafId.current = requestAnimationFrame(updateTrail);

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'auto';
      cancelAnimationFrame(rafId.current);
    };
  }, [updateTrail]);

  if (typeof window !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    return null;
  }

  return (
    <>
      {/* Main cursor - positioned via transform, no React state */}
      <div
        ref={mainRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform"
        style={{ opacity: 0, transition: 'scale 0.15s ease-out' }}
      >
        {/* Outer ring */}
        <div
          ref={outerRingRef}
          className="absolute rounded-full border-2 border-primary"
          style={{
            width: '50px',
            height: '50px',
            transform: 'translate(-50%, -50%) scale(0.5)',
            left: '0',
            top: '0',
            opacity: 0,
            transition: 'all 0.3s ease-out',
          }}
        >
          <span
            ref={cursorTextRef}
            className="absolute inset-0 items-center justify-center text-xs font-bold text-primary-foreground tracking-wider"
            style={{ display: 'none' }}
          />
        </div>

        {/* Inner dot */}
        <div
          ref={innerDotRef}
          className="rounded-full bg-primary"
          style={{
            width: '8px',
            height: '8px',
            boxShadow: '0 0 20px hsl(var(--primary) / 0.5)',
            transform: 'translate(-50%, -50%)',
            transition: 'all 0.15s ease-out',
          }}
        />
      </div>

      {/* Trailing cursor - lerped via RAF */}
      <div
        ref={trailRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border border-primary/30 will-change-transform"
        style={{
          width: '40px',
          height: '40px',
          opacity: 0,
        }}
      />

      <style>{`* { cursor: none !important; }`}</style>
    </>
  );
};

export default CustomCursor;
