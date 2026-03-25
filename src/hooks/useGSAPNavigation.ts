import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export const useGSAPNavigation = () => {
  useEffect(() => {
    // Configuração global do GSAP
    gsap.config({
      nullTargetWarn: false,
    });

    // Navegação suave para links internos
    const handleSmoothScroll = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetId = target.getAttribute('href')?.slice(1);
        const targetElement = document.getElementById(targetId!);
        
        if (targetElement) {
          gsap.to(window, {
            duration: 1.2,
            scrollTo: { y: targetElement, offsetY: 80 },
            ease: "power3.inOut"
          });
        }
      }
    };

    // ============================================
    // SEÇÕES PRINCIPAIS - Reveal cinematográfico
    // ============================================
    const mainSections = gsap.utils.toArray('.gsap-section');
    mainSections.forEach((section: any) => {
      // Fade in da seção inteira
      gsap.fromTo(section, {
        opacity: 0,
      }, {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 90%",
          toggleActions: "play none none none"
        }
      });
    });

    // ============================================
    // HEADLINES - Slide up com stagger
    // ============================================
    const headlines = gsap.utils.toArray('.gsap-headline');
    headlines.forEach((headline: any) => {
      gsap.fromTo(headline, {
        y: 80,
        opacity: 0,
        skewY: 3,
      }, {
        y: 0,
        opacity: 1,
        skewY: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headline,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });
    });

    // ============================================
    // PARÁGRAFOS - Fade up suave
    // ============================================
    const paragraphs = gsap.utils.toArray('.gsap-paragraph');
    paragraphs.forEach((paragraph: any) => {
      gsap.fromTo(paragraph, {
        y: 40,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: paragraph,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });
    });

    // ============================================
    // CARDS - Staggered reveal
    // ============================================
    const cardContainers = gsap.utils.toArray('.gsap-cards-container');
    cardContainers.forEach((container: any) => {
      const cards = container.querySelectorAll('.gsap-card');
      gsap.fromTo(cards, {
        y: 100,
        opacity: 0,
        scale: 0.95,
      }, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });
    });

    // ============================================
    // IMAGENS - Scale reveal cinematográfico
    // ============================================
    const images = gsap.utils.toArray('.gsap-image');
    images.forEach((image: any) => {
      gsap.fromTo(image, {
        scale: 1.2,
        opacity: 0,
      }, {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: image,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });
    });

    // ============================================
    // LINHAS HORIZONTAIS - Draw effect
    // ============================================
    const lines = gsap.utils.toArray('.gsap-line');
    lines.forEach((line: any) => {
      gsap.fromTo(line, {
        scaleX: 0,
        transformOrigin: "left center",
      }, {
        scaleX: 1,
        duration: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: line,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });
    });

    // ============================================
    // BADGES/LABELS - Pop in
    // ============================================
    const badges = gsap.utils.toArray('.gsap-badge');
    badges.forEach((badge: any) => {
      gsap.fromTo(badge, {
        scale: 0,
        opacity: 0,
      }, {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: badge,
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      });
    });

    // ============================================
    // SPLIT TEXT - Reveal por caractere
    // ============================================
    const splitTexts = gsap.utils.toArray('.gsap-split-text');
    splitTexts.forEach((text: any) => {
      gsap.fromTo(text, {
        clipPath: "inset(0 100% 0 0)",
      }, {
        clipPath: "inset(0 0% 0 0)",
        duration: 1.5,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: text,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });
    });

    // ============================================
    // NÚMEROS/STATS - Count up effect
    // ============================================
    const stats = gsap.utils.toArray('.gsap-stat');
    stats.forEach((stat: any) => {
      gsap.fromTo(stat, {
        y: 60,
        opacity: 0,
        rotateX: 45,
      }, {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: stat,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });
    });

    // ============================================
    // BOTÕES CTA - Slide + fade
    // ============================================
    const ctas = gsap.utils.toArray('.gsap-cta');
    ctas.forEach((cta: any) => {
      gsap.fromTo(cta, {
        y: 30,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cta,
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      });
    });

    // ============================================
    // ELEMENTOS LATERAIS - Slide from sides
    // ============================================
    const slideLeftElements = gsap.utils.toArray('.gsap-slide-left');
    slideLeftElements.forEach((element: any) => {
      gsap.fromTo(element, {
        x: -100,
        opacity: 0,
      }, {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });
    });

    const slideRightElements = gsap.utils.toArray('.gsap-slide-right');
    slideRightElements.forEach((element: any) => {
      gsap.fromTo(element, {
        x: 100,
        opacity: 0,
      }, {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });
    });

    // ============================================
    // PARALLAX SUAVE
    // ============================================
    const parallaxElements = gsap.utils.toArray('.gsap-parallax');
    parallaxElements.forEach((element: any) => {
      const speed = element.dataset.speed || 0.5;
      gsap.fromTo(element, {
        y: -50 * speed,
      }, {
        y: 50 * speed,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5
        }
      });
    });

    // ============================================
    // FADE SCRUB - Elementos que fazem fade baseado no scroll
    // ============================================
    const fadeScrubElements = gsap.utils.toArray('.gsap-fade-scrub');
    fadeScrubElements.forEach((element: any) => {
      gsap.fromTo(element, {
        opacity: 0,
        y: 30,
      }, {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          end: "top 50%",
          scrub: 1
        }
      });
    });

    // ============================================
    // ROTATE IN - Elementos que rotacionam ao entrar
    // ============================================
    const rotateElements = gsap.utils.toArray('.gsap-rotate-in');
    rotateElements.forEach((element: any) => {
      gsap.fromTo(element, {
        rotate: -10,
        opacity: 0,
        scale: 0.9,
      }, {
        rotate: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });
    });

    // Legacy classes support
    const sections = gsap.utils.toArray('.section-animate');
    sections.forEach((section: any) => {
      gsap.fromTo(section, {
        y: 100,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });
    });

    const revealTexts = gsap.utils.toArray('.text-reveal');
    revealTexts.forEach((text: any) => {
      gsap.fromTo(text, {
        clipPath: "inset(0 100% 0 0)"
      }, {
        clipPath: "inset(0 0% 0 0)",
        duration: 1.5,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: text,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });
    });

    document.addEventListener('click', handleSmoothScroll);
    
    return () => {
      document.removeEventListener('click', handleSmoothScroll);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
};