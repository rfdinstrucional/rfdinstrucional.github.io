import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initAnimations() {
  if (prefersReducedMotion) return;

  // 1. Header initial entrance
  gsap.from('.site-header', {
    y: -30,
    opacity: 0,
    duration: 0.9,
    ease: 'power3.out'
  });

  gsap.from('.nav > *', {
    y: -12,
    opacity: 0,
    duration: 0.6,
    stagger: 0.06,
    ease: 'power2.out',
    delay: 0.25
  });

  // 2. Section Headings Reveal
  document.querySelectorAll('.section').forEach((section) => {
    const head = section.querySelector('.section-head');
    if (!head) return;

    const title = head.querySelector('h2');
    const line = head.querySelector('.section-line');

    if (title) {
      gsap.from(title, {
        x: -25,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: head,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      });
    }

    if (line) {
      gsap.from(line, {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: head,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      });
    }
  });

  // 3. About Section Load Sequence
  const aboutCard = document.querySelector('.about-card');
  if (aboutCard) {
    const photo = aboutCard.querySelector('.about-photo');
    const name = aboutCard.querySelector('.about-name');
    const role = aboutCard.querySelector('.about-role');
    const text = aboutCard.querySelector('.about-text');
    const tools = aboutCard.querySelectorAll('.tools li');
    const edu = aboutCard.querySelector('.edu');
    const status = aboutCard.querySelector('.status');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: aboutCard,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });

    if (photo) {
      tl.from(photo, {
        scale: 0.94,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.out'
      }, 0);
    }

    if (name) {
      tl.from(name, {
        y: 24,
        opacity: 0,
        duration: 0.75,
        ease: 'power3.out'
      }, 0.15);
    }

    if (role) {
      tl.from(role, {
        x: -15,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out'
      }, 0.3);
    }

    if (text) {
      tl.from(text, {
        y: 16,
        opacity: 0,
        duration: 0.65,
        ease: 'power2.out'
      }, 0.4);
    }

    if (tools.length) {
      tl.from(tools, {
        opacity: 0,
        y: 8,
        stagger: 0.04,
        duration: 0.4,
        ease: 'power2.out'
      }, 0.55);
    }

    if (edu) {
      tl.from(edu, {
        opacity: 0,
        y: 16,
        duration: 0.6,
        ease: 'power2.out'
      }, 0.7);
    }

    if (status) {
      tl.from(status, {
        scale: 0.95,
        opacity: 0,
        duration: 0.5,
        ease: 'back.out(1.4)'
      }, 0.85);
    }
  }

  // 4. Services Grid Cards
  const serviceCards = document.querySelectorAll('.service-card');
  if (serviceCards.length) {
    gsap.from(serviceCards, {
      y: 45,
      opacity: 0,
      duration: 0.8,
      stagger: 0.14,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#services .services-grid',
        start: 'top 82%',
        toggleActions: 'play none none none'
      }
    });
  }

  // 5. Portfolio Grid Cards
  const tiles = document.querySelectorAll('.tile');
  if (tiles.length) {
    gsap.from(tiles, {
      y: 50,
      opacity: 0,
      duration: 0.75,
      stagger: 0.08,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#gallery',
        start: 'top 82%',
        toggleActions: 'play none none none'
      }
    });
  }

  // 6. Clients Grid Cards
  const clientCards = document.querySelectorAll('.client-card');
  if (clientCards.length) {
    gsap.from(clientCards, {
      y: 40,
      opacity: 0,
      duration: 0.75,
      stagger: 0.09,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#clients .clients-grid',
        start: 'top 82%',
        toggleActions: 'play none none none'
      }
    });
  }

  // 7. Contact / CTA Card
  const ctaCard = document.querySelector('.cta-card');
  if (ctaCard) {
    const ctaTitle = ctaCard.querySelector('.cta-title');
    const ctaDesc = ctaCard.querySelector('.cta-desc');
    const ctaLinks = ctaCard.querySelectorAll('.contact-links a');

    const tlCta = gsap.timeline({
      scrollTrigger: {
        trigger: ctaCard,
        start: 'top 82%',
        toggleActions: 'play none none none'
      }
    });

    tlCta.from(ctaCard, {
      scale: 0.96,
      opacity: 0,
      duration: 0.85,
      ease: 'power3.out'
    });

    if (ctaTitle) {
      tlCta.from(ctaTitle, {
        y: 22,
        opacity: 0,
        duration: 0.65,
        ease: 'power3.out'
      }, 0.2);
    }

    if (ctaDesc) {
      tlCta.from(ctaDesc, {
        y: 16,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out'
      }, 0.35);
    }

    if (ctaLinks.length) {
      tlCta.from(ctaLinks, {
        y: 15,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: 'back.out(1.5)'
      }, 0.5);
    }
  }

  // 8. 3D Tilt & Interactive Mouse Glow for Cards
  initCardInteractions();

  // 9. Magnetic Buttons
  initMagneticButtons();

  // 10. Cyber Glitch for Nav Items & Contact Buttons
  initGlitchEffects();
}

/**
 * 3D Tilt & Mouse Spotlight for interactive cards
 */
function initCardInteractions() {
  const cards = document.querySelectorAll('.service-card, .client-card, .tile');

  cards.forEach((card) => {
    const sweep = card.querySelector('.service-sweep, .client-sweep, .tile-sweep');

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Subtle 3D rotation
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      gsap.to(card, {
        rotationX: rotateX,
        rotationY: rotateY,
        transformPerspective: 900,
        transformOrigin: 'center center',
        duration: 0.3,
        ease: 'power1.out'
      });

      // Update sweep radial position
      if (sweep) {
        sweep.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0) 65%)`;
      }
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.6,
        ease: 'power2.out'
      });

      if (sweep) {
        sweep.style.background = '';
      }
    });
  });
}

/**
 * Magnetic button micro-interactions
 */
function initMagneticButtons() {
  const magneticEls = document.querySelectorAll('.contact-links a, .modal-close, .modal-lang, .lang-toggle');

  magneticEls.forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(el, {
        x: x * 0.25,
        y: y * 0.25,
        duration: 0.3,
        ease: 'power1.out'
      });
    });

    el.addEventListener('mouseleave', () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.4)'
      });
    });
  });
}

/**
 * Terminal Character Scramble & Chromatic Cyber Glitch
 */
const GLITCH_CHARS = '_X10/#<>{}~$!*';

function scrambleText(el, originalText, duration = 240) {
  if (el._scrambleTimer) clearInterval(el._scrambleTimer);

  const length = originalText.length;
  const startTime = Date.now();

  el._scrambleTimer = setInterval(() => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(1, elapsed / duration);
    const resolvedCharsCount = Math.floor(progress * length);

    let result = '';
    for (let i = 0; i < length; i++) {
      if (originalText[i] === ' ' || originalText[i] === '\n') {
        result += originalText[i];
      } else if (i < resolvedCharsCount) {
        result += originalText[i];
      } else {
        result += GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
      }
    }

    el.textContent = result;

    if (progress >= 1) {
      clearInterval(el._scrambleTimer);
      el._scrambleTimer = null;
      el.textContent = originalText;
    }
  }, 28);
}

function triggerGlitch(el) {
  if (prefersReducedMotion) return;

  const currentText = el.textContent.trim();
  // Only scramble if it has text and no image/svg
  if (currentText && !el.querySelector('img, svg')) {
    scrambleText(el, currentText, 240);
  }

  // Chromatic and cyber glitch flash
  gsap.killTweensOf(el, 'skewX,textShadow,filter,boxShadow');
  const tl = gsap.timeline({
    onComplete: () => {
      gsap.set(el, { clearProps: 'skewX,textShadow,filter,boxShadow' });
    }
  });

  tl.to(el, {
    skewX: 6,
    textShadow: '2px 0 #8ddca4, -2px 0 #ff0055',
    boxShadow: '0 0 10px rgba(141, 220, 164, 0.45)',
    filter: 'brightness(1.5) contrast(1.2)',
    duration: 0.04,
    ease: 'steps(1)'
  })
  .to(el, {
    skewX: -4,
    textShadow: '-2px 0 #00ffff, 2px 0 #ff0055',
    filter: 'brightness(0.9)',
    duration: 0.04,
    ease: 'steps(1)'
  })
  .to(el, {
    skewX: 2,
    textShadow: '1.5px 0 #8ddca4, -1.5px 0 #ffffff',
    filter: 'brightness(1.3)',
    duration: 0.04,
    ease: 'steps(1)'
  })
  .to(el, {
    skewX: 0,
    textShadow: 'none',
    boxShadow: 'none',
    filter: 'none',
    duration: 0.08,
    ease: 'power1.out'
  });
}

function initGlitchEffects() {
  const glitchTargets = document.querySelectorAll('.nav a, .contact-links a, .lang-toggle');

  glitchTargets.forEach((el) => {
    el.addEventListener('mouseenter', () => triggerGlitch(el));
    el.addEventListener('focus', () => triggerGlitch(el));
  });
}

/**
 * Animate modal opening with CRT TV / Signal Beam + Glitch effect
 * (Center dot -> Expands horizontally to beam -> Unfolds vertically -> Cyber Glitch flicker)
 */
export function animateModalOpen(modalEl, onComplete) {
  if (prefersReducedMotion) {
    if (onComplete) onComplete();
    return;
  }

  const backdrop = modalEl.querySelector('.modal-backdrop');
  const windowEl = modalEl.querySelector('.modal-window');
  const contentEls = windowEl ? windowEl.querySelectorAll('.modal-sticky, .modal-gallery, .modal-video, .modal-desc, .modal-actions') : [];

  gsap.killTweensOf([backdrop, windowEl, contentEls]);

  const tl = gsap.timeline({
    onComplete: () => {
      // Clean up inline filters and transforms after animation completes
      if (windowEl) {
        gsap.set(windowEl, { clearProps: 'filter,x,scaleX,scaleY' });
      }
      if (onComplete) onComplete();
    }
  });

  // Initial setup: start as a tiny centered dot/beam with high brightness
  if (backdrop) {
    tl.fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power2.out' }, 0);
  }

  if (windowEl) {
    tl.set(windowEl, {
      opacity: 0,
      scaleX: 0.002,
      scaleY: 0.004,
      x: 0,
      transformOrigin: 'center center',
      filter: 'brightness(3) contrast(1.5)'
    }, 0);

    // Step 1: Open horizontally as a thin, intense beam of light
    tl.to(windowEl, {
      opacity: 1,
      scaleX: 1,
      scaleY: 0.005,
      duration: 0.18,
      ease: 'power3.inOut'
    }, 0.05);

    // Step 2: Unfold vertically to full height with slight CRT bounce
    tl.to(windowEl, {
      scaleY: 1.03,
      filter: 'brightness(1.6) contrast(1.2)',
      duration: 0.22,
      ease: 'power4.out'
    }, 0.23);

    tl.to(windowEl, {
      scaleY: 1.0,
      duration: 0.08,
      ease: 'power2.out'
    }, 0.45);

    // Step 3: Cyber Glitch / Signal Flicker Burst
    tl.to(windowEl, {
      x: -4,
      filter: 'brightness(1.8) hue-rotate(90deg)',
      duration: 0.04,
      ease: 'steps(1)'
    }, 0.48);

    tl.to(windowEl, {
      x: 3,
      filter: 'brightness(0.85) hue-rotate(-45deg)',
      duration: 0.04,
      ease: 'steps(1)'
    }, 0.52);

    tl.to(windowEl, {
      x: -2,
      filter: 'brightness(1.4) hue-rotate(0deg)',
      duration: 0.04,
      ease: 'steps(1)'
    }, 0.56);

    tl.to(windowEl, {
      x: 0,
      filter: 'brightness(1)',
      duration: 0.06,
      ease: 'power1.out'
    }, 0.6);
  }

  // Step 4: Stagger in inner content cleanly right after unfolding
  if (contentEls.length) {
    tl.fromTo(
      contentEls,
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: 0.3,
        stagger: 0.03,
        ease: 'power2.out'
      },
      0.38
    );
  }
}

/**
 * Animate modal closing with CRT TV / Signal Collapse + Glitch effect
 * (Glitch flicker -> Collapses vertically to beam -> Collapses horizontally to dot -> Off)
 */
export function animateModalClose(modalEl, onComplete) {
  if (prefersReducedMotion) {
    if (onComplete) onComplete();
    return;
  }

  const backdrop = modalEl.querySelector('.modal-backdrop');
  const windowEl = modalEl.querySelector('.modal-window');
  const contentEls = windowEl ? windowEl.querySelectorAll('.modal-sticky, .modal-gallery, .modal-video, .modal-desc, .modal-actions') : [];

  gsap.killTweensOf([backdrop, windowEl, contentEls]);

  const tl = gsap.timeline({
    onComplete: () => {
      if (windowEl) {
        gsap.set(windowEl, { clearProps: 'all' });
      }
      if (onComplete) onComplete();
    }
  });

  // Step 1: Micro glitch & content quick fade out
  if (windowEl) {
    tl.set(windowEl, { transformOrigin: 'center center' }, 0);

    tl.to(windowEl, {
      x: 4,
      filter: 'brightness(1.8) hue-rotate(90deg)',
      duration: 0.04,
      ease: 'steps(1)'
    }, 0);

    tl.to(windowEl, {
      x: -3,
      filter: 'brightness(1.4) hue-rotate(-30deg)',
      duration: 0.04,
      ease: 'steps(1)'
    }, 0.04);
  }

  if (contentEls.length) {
    tl.to(contentEls, {
      opacity: 0,
      duration: 0.06,
      ease: 'power1.in'
    }, 0);
  }

  if (windowEl) {
    // Step 2: Collapse vertically into thin horizontal beam
    tl.to(windowEl, {
      scaleY: 0.005,
      scaleX: 1,
      x: 0,
      filter: 'brightness(3) contrast(2)',
      duration: 0.16,
      ease: 'power4.in'
    }, 0.08);

    // Step 3: Collapse horizontally into a point and vanish
    tl.to(windowEl, {
      scaleX: 0,
      scaleY: 0,
      opacity: 0,
      duration: 0.14,
      ease: 'power3.in'
    }, 0.24);
  }

  // Step 4: Fade out backdrop
  if (backdrop) {
    tl.to(backdrop, {
      opacity: 0,
      duration: 0.22,
      ease: 'power2.in'
    }, 0.16);
  }
}
