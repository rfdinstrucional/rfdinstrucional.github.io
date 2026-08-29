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
 * Animate modal opening (clean, smooth expansion)
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
      if (windowEl) {
        gsap.set(windowEl, { clearProps: 'all' });
      }
      if (onComplete) onComplete();
    }
  });

  if (backdrop) {
    tl.fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' }, 0);
  }

  if (windowEl) {
    tl.fromTo(
      windowEl,
      {
        opacity: 0,
        scale: 0.94,
        y: 20,
        transformOrigin: 'center center'
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.4,
        ease: 'power3.out'
      },
      0
    );
  }

  if (contentEls.length) {
    tl.fromTo(
      contentEls,
      { opacity: 0, y: 12 },
      {
        opacity: 1,
        y: 0,
        duration: 0.35,
        stagger: 0.04,
        ease: 'power2.out'
      },
      0.1
    );
  }
}

/**
 * Animate modal closing (clean, smooth exit)
 */
export function animateModalClose(modalEl, onComplete) {
  if (prefersReducedMotion) {
    if (onComplete) onComplete();
    return;
  }

  const backdrop = modalEl.querySelector('.modal-backdrop');
  const windowEl = modalEl.querySelector('.modal-window');

  gsap.killTweensOf([backdrop, windowEl]);

  const tl = gsap.timeline({
    onComplete: () => {
      if (windowEl) {
        gsap.set(windowEl, { clearProps: 'all' });
      }
      if (onComplete) onComplete();
    }
  });

  if (windowEl) {
    tl.to(windowEl, {
      opacity: 0,
      scale: 0.96,
      y: 15,
      duration: 0.22,
      ease: 'power2.in'
    }, 0);
  }

  if (backdrop) {
    tl.to(backdrop, {
      opacity: 0,
      duration: 0.22,
      ease: 'power2.in'
    }, 0.04);
  }
}
