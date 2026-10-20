/**
 * Portfolio Website - Main JavaScript
 * Pure vanilla JS with modern ES6+ syntax
 * No external libraries required
 */

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // ============================================================
  // 1. PRELOADER — fade out after page load
  // ============================================================
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.style.opacity = '0';
      preloader.style.transition = 'opacity 0.6s ease';
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 600);
    });
  }

  // ============================================================
  // 2. TYPING EFFECT — cycles through professional titles
  // ============================================================
  const typingElement = document.querySelector('.typing-text');

  if (typingElement) {
    const titles = [
      'Senior Software Engineer',
      'FinTech Specialist',
      'Digital Payments Expert',
      'Backend Architect',
      'ISO 8583 & ISO 20022',
      'Clean Code Advocate',
    ];

    const TYPING_SPEED = 80;
    const DELETING_SPEED = 40;
    const PAUSE_AFTER_WORD = 1800;
    const PAUSE_BEFORE_TYPE = 400;

    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const type = () => {
      const currentTitle = titles[titleIndex];

      if (isDeleting) {
        charIndex--;
        typingElement.textContent = currentTitle.substring(0, charIndex);

        if (charIndex === 0) {
          isDeleting = false;
          titleIndex = (titleIndex + 1) % titles.length;
          setTimeout(type, PAUSE_BEFORE_TYPE);
          return;
        }

        setTimeout(type, DELETING_SPEED);
      } else {
        charIndex++;
        typingElement.textContent = currentTitle.substring(0, charIndex);

        if (charIndex === currentTitle.length) {
          isDeleting = true;
          setTimeout(type, PAUSE_AFTER_WORD);
          return;
        }

        setTimeout(type, TYPING_SPEED);
      }
    };

    type();
  }

  // ============================================================
  // 3. INTERACTIVE CHARACTER — Waving on Entry & Pointer Tracking
  // ============================================================
  const mascot = document.getElementById('cyber-mascot');
  const pupils = document.getElementById('mascot-pupils');
  const mascotHead = document.getElementById('mascot-head');
  const mascotSpeech = document.getElementById('mascot-speech');
  const mascotMouth = document.getElementById('mascot-mouth');

  if (mascot && pupils && mascotHead) {
    const greetings = [
      "Hi! Welcome to Mutaher's Space 👋",
      "Building FinTech & ISO 20022 Rails 🚀",
      "Looking for a Backend Architect? 💻",
      "Let's connect in the Contact section! ✨",
    ];
    let greetingIdx = 0;

    // Trigger wave + speech bubble
    const triggerMascotWave = (customText) => {
      if (customText && mascotSpeech) {
        mascotSpeech.textContent = customText;
      }
      mascot.classList.remove('is-waving');
      void mascot.offsetWidth; // Force reflow to restart animation
      mascot.classList.add('is-waving', 'show-speech');

      if (mascotMouth) {
        mascotMouth.setAttribute('d', 'M 88 90 Q 100 104 112 90');
      }

      setTimeout(() => {
        mascot.classList.remove('is-waving');
        if (mascotMouth) {
          mascotMouth.setAttribute('d', 'M 91 92 Q 100 100 109 92');
        }
      }, 2800);

      setTimeout(() => {
        mascot.classList.remove('show-speech');
      }, 4500);
    };

    // Wave automatically when user enters the website
    setTimeout(() => {
      triggerMascotWave(greetings[0]);
    }, 900);

    // Wave and cycle message on click or keyboard enter
    mascot.addEventListener('click', () => {
      greetingIdx = (greetingIdx + 1) % greetings.length;
      triggerMascotWave(greetings[greetingIdx]);
    });

    mascot.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        greetingIdx = (greetingIdx + 1) % greetings.length;
        triggerMascotWave(greetings[greetingIdx]);
      }
    });

    // Real-time Cursor / Pointer Direction Tracking
    if (!prefersReducedMotion.matches) {
      let mouseX = window.innerWidth / 2;
      let mouseY = window.innerHeight / 2;
      let rafPending = false;

      const updateMascotLook = () => {
        rafPending = false;
        const rect = mascot.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height * 0.42; // Eye level

        const deltaX = mouseX - centerX;
        const deltaY = mouseY - centerY;
        const angle = Math.atan2(deltaY, deltaX);
        const distance = Math.min(Math.hypot(deltaX, deltaY) / 35, 5.5);

        const pupilX = Math.cos(angle) * distance;
        const pupilY = Math.sin(angle) * distance;

        // Move pupils toward pointer
        pupils.style.transform = `translate(${pupilX.toFixed(2)}px, ${pupilY.toFixed(2)}px)`;

        // Subtle head tilt & shift toward pointer
        const headShiftX = Math.max(-4, Math.min(4, deltaX / 90));
        const headShiftY = Math.max(-3, Math.min(3, deltaY / 90));
        const headTilt = Math.max(-5, Math.min(5, deltaX / 140));

        mascotHead.style.transform = `translate(${headShiftX.toFixed(2)}px, ${headShiftY.toFixed(2)}px) rotate(${headTilt.toFixed(2)}deg)`;
      };

      window.addEventListener(
        'mousemove',
        (e) => {
          mouseX = e.clientX;
          mouseY = e.clientY;
          if (!rafPending) {
            rafPending = true;
            requestAnimationFrame(updateMascotLook);
          }
        },
        { passive: true }
      );
    }
  }

  // ============================================================
  // 4. HERO FINTECH PARTICLE CONSTELLATION (Canvas)
  // ============================================================
  const particlesContainer = document.querySelector('.hero-particles');

  if (particlesContainer && !prefersReducedMotion.matches) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    particlesContainer.appendChild(canvas);

    let width = (canvas.width = particlesContainer.offsetWidth);
    let height = (canvas.height = particlesContainer.offsetHeight);

    const pointer = { x: null, y: null, radius: 130 };

    window.addEventListener(
      'mousemove',
      (e) => {
        const rect = canvas.getBoundingClientRect();
        pointer.x = e.clientX - rect.left;
        pointer.y = e.clientY - rect.top;
      },
      { passive: true }
    );

    window.addEventListener('mouseleave', () => {
      pointer.x = null;
      pointer.y = null;
    });

    window.addEventListener(
      'resize',
      () => {
        width = canvas.width = particlesContainer.offsetWidth;
        height = canvas.height = particlesContainer.offsetHeight;
      },
      { passive: true }
    );

    const particleCount = Math.min(55, Math.floor((width * height) / 18000));
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.55,
      vy: (Math.random() - 0.5) * 0.55,
      size: Math.random() * 2 + 1,
      color: Math.random() > 0.35 ? '#00d4aa' : '#7b68ee',
    }));

    const renderParticles = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Draw node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.55;
        ctx.fill();

        // Connect nearby nodes
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < 125) {
            ctx.beginPath();
            ctx.strokeStyle = '#00d4aa';
            ctx.globalAlpha = (1 - dist / 125) * 0.18;
            ctx.lineWidth = 1;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Connect to mouse pointer
        if (pointer.x !== null && pointer.y !== null) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (dist < pointer.radius) {
            ctx.beginPath();
            ctx.strokeStyle = '#00d4aa';
            ctx.globalAlpha = (1 - dist / pointer.radius) * 0.45;
            ctx.lineWidth = 1.2;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(pointer.x, pointer.y);
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(renderParticles);
    };

    renderParticles();
  }

  // ============================================================
  // 5. DYNAMIC SCROLL-TRIGGERED REVEALS (Auto-Attached)
  // ============================================================
  const autoRevealSelectors = [
    '.section-header',
    '.about-text p',
    '.info-card',
    '.stat-card',
    '.skill-category',
    '.timeline-item',
    '.project-card',
    '.contact-form-wrapper',
    '.contact-info-card',
  ];

  autoRevealSelectors.forEach((selector) => {
    const items = document.querySelectorAll(selector);
    items.forEach((el, index) => {
      el.classList.add('reveal-item');
      // Stagger items within grids
      const delay = (index % 4) * 90;
      el.style.transitionDelay = `${delay}ms`;
    });
  });

  const revealElements = document.querySelectorAll('.animate-on-scroll, .reveal-item');

  if (revealElements.length > 0) {
    const scrollObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach((el) => scrollObserver.observe(el));
  }

  // ============================================================
  // 6. CARD SPOTLIGHT GLOW & SUBTLE 3D TILT
  // ============================================================
  const interactiveCards = document.querySelectorAll(
    '.skill-category, .project-card, .stat-card, .timeline-content'
  );

  if (!prefersReducedMotion.matches) {
    interactiveCards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Set CSS variables for radial spotlight glow
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);

        // Calculate subtle 3D tilt
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -3.5;
        const rotateY = ((x - centerX) / centerX) * 3.5;

        card.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // ============================================================
  // 7. NAVBAR SCROLL EFFECT — add .scrolled class after 50px
  // ============================================================
  const navbar = document.querySelector('.navbar');

  const handleNavbarScroll = () => {
    if (!navbar) return;
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  // ============================================================
  // 8. SMOOTH SCROLL — for anchor links with fixed-nav offset
  // ============================================================
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const navbarHeight = navbar ? navbar.offsetHeight : 0;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    });
  });

  // ============================================================
  // 9. MOBILE MENU TOGGLE
  // ============================================================
  const hamburger = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const isExpanded = hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', isExpanded);
    });

    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ============================================================
  // 10. SCROLL-TO-TOP BUTTON — show after 500px
  // ============================================================
  const scrollTopBtn = document.querySelector('.scroll-to-top');

  const handleScrollTopVisibility = () => {
    if (!scrollTopBtn) return;
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', handleScrollTopVisibility, { passive: true });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ============================================================
  // 11. ACTIVE NAVIGATION HIGHLIGHT — based on scroll position
  // ============================================================
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-menu .nav-link');

  const highlightActiveNav = () => {
    if (sections.length === 0 || navItems.length === 0) return;

    const scrollPos = window.scrollY;
    const navbarHeight = navbar ? navbar.offsetHeight : 0;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - navbarHeight - 100;
      const sectionBottom = sectionTop + section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
        navItems.forEach((item) => {
          item.classList.remove('active');
          if (item.getAttribute('href') === `#${sectionId}`) {
            item.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightActiveNav, { passive: true });
  highlightActiveNav();

  // ============================================================
  // 11.5. SET CURRENT YEAR in footer
  // ============================================================
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ============================================================
  // 12. COUNTER ANIMATION — count up from 0 to data-count
  // ============================================================
  const counters = document.querySelectorAll('.stat-number[data-count]');

  if (counters.length > 0) {
    const COUNTER_DURATION = 2000;

    const animateCounter = (counter) => {
      const target = parseInt(counter.getAttribute('data-count'), 10);
      if (isNaN(target)) return;

      const startTime = performance.now();

      const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / COUNTER_DURATION, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(easedProgress * target);

        counter.textContent = currentValue.toLocaleString();

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target.toLocaleString();
        }
      };

      requestAnimationFrame(updateCounter);
    };

    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    counters.forEach((counter) => counterObserver.observe(counter));
  }

  // ============================================================
  // 13. CONTACT FORM HANDLING — client-side with Formspree
  // ============================================================
  const contactForm = document.querySelector('#contact-form');

  const showFormMessage = (message, type) => {
    if (!contactForm) return;

    const existingMsg = contactForm.parentElement.querySelector('.form-message');
    if (existingMsg) existingMsg.remove();

    const msgElement = document.createElement('div');
    msgElement.className = `form-message ${type}`;
    msgElement.textContent = message;
    msgElement.style.cssText = `
      padding: 12px 20px;
      margin-top: 16px;
      border-radius: 8px;
      font-weight: 500;
      animation: fadeInUp 0.4s ease;
      color: ${type === 'success' ? '#10b981' : '#ef4444'};
      background: ${type === 'success' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)'};
      border: 1px solid ${type === 'success' ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'};
    `;

    contactForm.parentElement.appendChild(msgElement);

    setTimeout(() => {
      msgElement.style.opacity = '0';
      msgElement.style.transition = 'opacity 0.4s ease';
      setTimeout(() => msgElement.remove(), 400);
    }, 5000);
  };

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('.btn-submit');
      if (submitBtn) submitBtn.classList.add('loading');

      const formData = new FormData(contactForm);
      const actionUrl = contactForm.getAttribute('action');

      if (actionUrl) {
        fetch(actionUrl, {
          method: 'POST',
          body: formData,
          headers: { Accept: 'application/json' },
        })
          .then((response) => {
            if (submitBtn) submitBtn.classList.remove('loading');
            if (response.ok) {
              showFormMessage('Thank you! Your message has been sent successfully.', 'success');
              contactForm.reset();
            } else {
              showFormMessage('Oops! Something went wrong. Please try again.', 'error');
            }
          })
          .catch(() => {
            if (submitBtn) submitBtn.classList.remove('loading');
            showFormMessage('Network error. Please check your connection and try again.', 'error');
          });
      } else {
        if (submitBtn) submitBtn.classList.remove('loading');
        showFormMessage('Thank you! Your message has been sent successfully.', 'success');
        contactForm.reset();
      }
    });
  }

  // ============================================================
  // 14. SKILL TAGS ANIMATION — staggered pop reveal
  // ============================================================
  const skillContainers = document.querySelectorAll('.skill-category');

  if (skillContainers.length > 0) {
    const skillObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const tags = entry.target.querySelectorAll('.skill-tag');
            tags.forEach((tag, index) => {
              setTimeout(() => {
                tag.classList.add('animated');
              }, index * 75);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    skillContainers.forEach((container) => skillObserver.observe(container));
  }

  // ============================================================
  // 15. ACCESSIBILITY — reduced motion fallback
  // ============================================================
  if (prefersReducedMotion.matches) {
    revealElements.forEach((el) => el.classList.add('animated'));
    document.querySelectorAll('.skill-tag').forEach((el) => el.classList.add('animated'));
  }
});
});
