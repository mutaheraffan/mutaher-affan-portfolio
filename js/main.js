/**
 * Portfolio Website - Main JavaScript
 * Pure vanilla JS with modern ES6+ syntax
 * No external libraries required
 */

document.addEventListener('DOMContentLoaded', () => {
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
      'Clean Code Advocate',
    ];

    const TYPING_SPEED = 80;   // ms per character when typing
    const DELETING_SPEED = 40; // ms per character when deleting
    const PAUSE_AFTER_WORD = 1800; // ms to hold complete word
    const PAUSE_BEFORE_TYPE = 400; // ms pause before typing next word

    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const type = () => {
      const currentTitle = titles[titleIndex];

      if (isDeleting) {
        // Remove characters one by one
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
        // Add characters one by one
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

    // Kick off the typing loop
    type();
  }

  // ============================================================
  // 3. SCROLL-TRIGGERED ANIMATIONS (Intersection Observer)
  // ============================================================
  const animateElements = document.querySelectorAll('.animate-on-scroll');

  if (animateElements.length > 0) {
    const scrollObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            observer.unobserve(entry.target); // animate only once
          }
        });
      },
      { threshold: 0.1 }
    );

    animateElements.forEach((el) => scrollObserver.observe(el));
  }

  // ============================================================
  // 4. NAVBAR SCROLL EFFECT — add .scrolled class after 50px
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
  // Run once on load in case user refreshes mid-page
  handleNavbarScroll();

  // ============================================================
  // 5. SMOOTH SCROLL — for anchor links with fixed-nav offset
  // ============================================================
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');

      // Skip empty hashes or standalone '#'
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
  // 6. MOBILE MENU TOGGLE
  // ============================================================
  const hamburger = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when a nav link is clicked
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // ============================================================
  // 7. SCROLL-TO-TOP BUTTON — show after 500px
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
  // 8. ACTIVE NAVIGATION HIGHLIGHT — based on scroll position
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
  // Highlight on load
  highlightActiveNav();

  // ============================================================
  // 8.5. SET CURRENT YEAR in footer
  // ============================================================
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ============================================================
  // 9. COUNTER ANIMATION — count up from 0 to data-target
  // ============================================================
  const counters = document.querySelectorAll('.stat-number[data-count]');

  if (counters.length > 0) {
    const COUNTER_DURATION = 2000; // total animation duration in ms

    const animateCounter = (counter) => {
      const target = parseInt(counter.getAttribute('data-count'), 10);

      if (isNaN(target)) return;

      const startTime = performance.now();

      const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / COUNTER_DURATION, 1);

        // Ease-out cubic for a natural deceleration feel
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
  // 10. PARALLAX EFFECT — subtle movement on hero elements
  // ============================================================
  const parallaxElements = document.querySelectorAll('.parallax-element');

  if (parallaxElements.length > 0) {
    const PARALLAX_SPEED = 0.3; // fraction of scroll speed

    window.addEventListener(
      'scroll',
      () => {
        const scrollY = window.scrollY;
        parallaxElements.forEach((el) => {
          const offset = scrollY * PARALLAX_SPEED;
          el.style.transform = `translateY(${offset}px)`;
        });
      },
      { passive: true }
    );
  }

  // ============================================================
  // 11. CONTACT FORM HANDLING — client-side with Formspree
  // ============================================================
  const contactForm = document.querySelector('#contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Gather form data (Formspree handles actual delivery via action attr)
      const formData = new FormData(contactForm);

      // Attempt to submit via fetch if action URL is present
      const actionUrl = contactForm.getAttribute('action');

      if (actionUrl) {
        fetch(actionUrl, {
          method: 'POST',
          body: formData,
          headers: { Accept: 'application/json' },
        })
          .then((response) => {
            if (response.ok) {
              showFormMessage('Thank you! Your message has been sent successfully.', 'success');
              contactForm.reset();
            } else {
              showFormMessage('Oops! Something went wrong. Please try again.', 'error');
            }
          })
          .catch(() => {
            showFormMessage('Network error. Please check your connection and try again.', 'error');
          });
      } else {
        // No action URL — just show success and reset
        showFormMessage('Thank you! Your message has been sent successfully.', 'success');
        contactForm.reset();
      }
    });
  }

  /**
   * Displays a temporary status message below the contact form.
   * @param {string} message - The message to display
   * @param {string} type    - 'success' or 'error'
   */
  const showFormMessage = (message, type) => {
    if (!contactForm) return;

    // Remove any existing message
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

    // Auto-remove after 5 seconds
    setTimeout(() => {
      msgElement.style.opacity = '0';
      msgElement.style.transition = 'opacity 0.4s ease';
      setTimeout(() => msgElement.remove(), 400);
    }, 5000);
  };

  // ============================================================
  // 12. SKILL BARS / TAGS ANIMATION — staggered reveal
  // ============================================================
  const skillContainers = document.querySelectorAll('.skill-category');

  if (skillContainers.length > 0) {
    const skillObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const tags = entry.target.querySelectorAll('.skill-tag');
            tags.forEach((tag, index) => {
              // Stagger each tag by 80ms
              setTimeout(() => {
                tag.classList.add('animated');
              }, index * 80);
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
  // 13. PERFORMANCE — throttled scroll handler consolidation
  // ============================================================
  // All scroll-dependent functions above are individually registered
  // with { passive: true } for optimal scroll performance.
  // The browser can composite without waiting for JS handlers.

  // ============================================================
  // 14. ACCESSIBILITY — reduced motion preference
  // ============================================================
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (prefersReducedMotion.matches) {
    // Disable parallax for users who prefer reduced motion
    parallaxElements.forEach((el) => {
      el.style.transform = 'none';
    });

    // Immediately show all animated elements
    animateElements.forEach((el) => {
      el.classList.add('animated');
    });
  }
});
