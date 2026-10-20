/**
 * Portfolio Website - Main JavaScript
 * Pure vanilla JS with modern ES6+ syntax
 * No external libraries required
 */

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

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
  // 3. INTERACTIVE CHARACTER + RESUME-BOUND AI CHATBOT
  // ============================================================
  const assistantRoot = document.getElementById('ai-assistant-root');
  const mascot = document.getElementById('cyber-mascot');
  const pupils = document.getElementById('mascot-pupils');
  const mascotHead = document.getElementById('mascot-head');
  const mascotSpeechText = document.getElementById('mascot-speech-text');
  const mascotMouth = document.getElementById('mascot-mouth');

  const chatWindow = document.getElementById('resume-chat-window');
  const chatCloseBtn = document.getElementById('chat-close-btn');
  const chatMessages = document.getElementById('chat-messages');
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const quickChips = document.querySelectorAll('.chat-chip');

  // Structured Resume Knowledge Base (Synced with Mutaher Affan's Portfolio)
  const RESUME_DATA = {
    name: 'Mutaher Affan',
    title: 'Senior Software Engineer | Consultant — App Development',
    location: 'Karachi, Pakistan',
    experienceYears: '4+ Years',
    education: 'Bachelor degree from University of Sindh',
    email: 'mutaheraffan@gmail.com',
    linkedin: 'https://linkedin.com/in/mutaher-affan',
    github: 'https://github.com/mutaher-affan',
    resumePdf: 'documents/resume.pdf',
    currentRole: {
      role: 'Consultant — App Development',
      company: 'Systems Limited',
      period: 'Feb 2026 — Present',
      details: 'Currently engaged with CelcomDigi (leading Malaysian telecommunications and digital services company), building scalable Java microservices and Keycloak identity management solutions.',
    },
    previousRoles: [
      'Senior Software Engineer at Paysys Labs (Sep 2025 – Feb 2026)',
      'Software Engineer at Paysys Labs (Jan 2025 – Sep 2025)',
      'Associate Software Engineer at Paysys Labs (Dec 2022 – Jan 2025)',
      'Software Design Engineer at Teresol Pvt. Ltd. (Mar 2022 – Dec 2022)',
      'Django Developer at GBS (Feb 2021 – May 2021)',
    ],
  };

  // Intelligent Resume Intent Matcher
  const generateResumeReply = (rawQuery) => {
    const q = rawQuery.toLowerCase().trim();

    // 1. Greeting
    if (/^(hi|hello|hey|salam|assalam|good morning|good evening)\b/.test(q)) {
      return `Hello! 👋 I'm Mutaher's AI Resume Assistant. You can ask me about his <strong>4+ years of experience</strong>, his current work at <strong>Systems Limited (CelcomDigi)</strong>, his <strong>FinTech &amp; ISO 20022 projects in Ethiopia &amp; Pakistan</strong>, or his <strong>Java/Spring Boot</strong> expertise!`;
    }

    // 2. Current Role / Systems Limited / CelcomDigi / Malaysia
    if (q.includes('current') || q.includes('now') || q.includes('systems limited') || q.includes('celcom') || q.includes('malaysia') || q.includes('present')) {
      return `Mutaher is currently working at <strong>Systems Limited</strong> as a <strong>Consultant — App Development</strong> (Feb 2026 – Present) in Karachi.<br><br>He is engaged with <strong>CelcomDigi</strong>, a premier Malaysian telecom &amp; digital services company, developing backend services with <strong>Java, Microservices, and Keycloak</strong>.`;
    }

    // 3. Ethiopia / EthSwitch / RTGS / ISO 20022 / Payment Standards
    if (q.includes('ethiopia') || q.includes('ethswitch') || q.includes('rtgs') || q.includes('20022') || q.includes('8583') || q.includes('pacs') || q.includes('fintech') || q.includes('payment') || q.includes('ips')) {
      return `Mutaher is a <strong>FinTech &amp; Digital Payments specialist</strong> with deep hands-on experience in <strong>ISO 20022</strong> and <strong>ISO 8583</strong>:<br><br>
      &bull; <strong>EthSwitch IPS (Onsite in Ethiopia):</strong> Integrated the Instant Payment System with Ethiopian payment rails using ISO 20022 PACS messages for real-time P2P &amp; P2M transactions.<br>
      &bull; <strong>National Bank of Ethiopia (RTGS Open Connect):</strong> Spearheaded the ISO 20022 migration utility which launched <em>ahead of schedule</em>.<br>
      &bull; <strong>Pakistan Banking (NBP, CDNS, PayVay PSO):</strong> Built high-throughput payment middleware and integration layers at Paysys Labs.`;
    }

    // 4.Paysys Labs / Past Experience / Career History
    if (q.includes('experience') || q.includes('work') || q.includes('history') || q.includes('career') || q.includes('paysys') || q.includes('teresol') || q.includes('gbs') || q.includes('companies') || q.includes('years')) {
      return `Mutaher has <strong>${RESUME_DATA.experienceYears}</strong> of software engineering experience across 3+ countries:<br><br>
      1. <strong>Systems Limited</strong> — Consultant, App Dev (Feb 2026 – Present)<br>
      2. <strong>Paysys Labs</strong> — Promoted from Associate SE &rarr; SE &rarr; <strong>Senior Software Engineer</strong> (Dec 2022 – Feb 2026)<br>
      3. <strong>Teresol Pvt. Ltd.</strong> — Software Design Engineer (Mar 2022 – Dec 2022)<br>
      4. <strong>GBS</strong> — Django Developer (Feb 2021 – May 2021)`;
    }

    // 5. Technical Skills / Stack / Java / Spring / Databases / DevOps
    if (q.includes('skill') || q.includes('stack') || q.includes('tech') || q.includes('java') || q.includes('spring') || q.includes('quarkus') || q.includes('python') || q.includes('database') || q.includes('docker') || q.includes('keycloak')) {
      return `Here is Mutaher's core technical stack:<br><br>
      &bull; <strong>Languages:</strong> Java, Python, JavaScript, SQL<br>
      &bull; <strong>Frameworks:</strong> Spring Boot, Quarkus, Spring Security, Django, VueJS<br>
      &bull; <strong>Payments &amp; FinTech:</strong> ISO 8583, ISO 20022, PACS Messaging, IPS &amp; RTGS<br>
      &bull; <strong>Databases &amp; Caching:</strong> PostgreSQL, MySQL, Redis<br>
      &bull; <strong>DevOps &amp; Auth:</strong> Docker, Keycloak, ELK Stack, Prometheus, Grafana, JUnit5, Mockito`;
    }

    // 6. Projects
    if (q.includes('project') || q.includes('built') || q.includes('portfolio') || q.includes('nbp') || q.includes('cdns') || q.includes('payvay')) {
      return `Mutaher's flagship production projects include:<br><br>
      1. <strong>EthSwitch IPS Integration (Ethiopia):</strong> National switch real-time P2P/P2M payments via ISO 20022.<br>
      2. <strong>RTGS Open Connect Utility:</strong> National Bank of Ethiopia ISO 20022 migration.<br>
      3. <strong>NBP, CDNS &amp; PayVay PSO (Pakistan):</strong> Core digital banking middleware, Spring Security modernization &amp; Redis caching.<br>
      4. <strong>CelcomDigi (Malaysia):</strong> Telecom digital services &amp; Keycloak IAM integration.`;
    }

    // 7. Education / University
    if (q.includes('education') || q.includes('university') || q.includes('degree') || q.includes('study') || q.includes('sindh') || q.includes('college')) {
      return `Mutaher is an alumnus of the <strong>University of Sindh</strong> and is based in <strong>Karachi, Pakistan</strong>.`;
    }

    // 8. Contact / Hire / Email / Resume PDF / Location
    if (q.includes('contact') || q.includes('hire') || q.includes('email') || q.includes('reach') || q.includes('resume') || q.includes('cv') || q.includes('linkedin') || q.includes('location') || q.includes('karachi')) {
      return `You can reach or hire Mutaher directly via:<br><br>
      📧 <strong>Email:</strong> <a href="mailto:${RESUME_DATA.email}">${RESUME_DATA.email}</a><br>
      💼 <strong>LinkedIn:</strong> <a href="${RESUME_DATA.linkedin}" target="_blank" rel="noopener">linkedin.com/in/mutaher-affan</a><br>
      💻 <strong>GitHub:</strong> <a href="${RESUME_DATA.github}" target="_blank" rel="noopener">github.com/mutaher-affan</a><br>
      📄 <strong>Resume:</strong> <a href="${RESUME_DATA.resumePdf}" download="Mutaher-Affan-Resume.pdf">Download PDF Resume</a>`;
    }

    // 9. Smart Fallback Summary
    return `Here's a quick summary of <strong>Mutaher Affan</strong>:<br><br>
    He is a <strong>Senior Software Engineer &amp; Consultant at Systems Limited</strong> with <strong>4+ years of experience</strong> specializing in <strong>Java (Spring Boot, Quarkus), FinTech, ISO 8583 &amp; ISO 20022</strong> across Pakistan, Ethiopia, and Malaysia.<br><br>
    Try asking about his <strong>projects</strong>, <strong>payment standards</strong>, <strong>work history</strong>, or <a href="${RESUME_DATA.resumePdf}" download="Mutaher-Affan-Resume.pdf">download his full Resume PDF</a>!`;
  };

  // Wave & Speech Bubble Control
  const triggerMascotWave = (customText) => {
    if (!mascot) return;
    if (customText && mascotSpeechText) {
      mascotSpeechText.textContent = customText;
    }
    mascot.classList.remove('is-waving');
    void mascot.offsetWidth;
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
    }, 5500);
  };

  // Wave automatically on page entry
  setTimeout(() => {
    triggerMascotWave("Hi! Ask me about Mutaher's Resume 👋");
  }, 850);

  // Toggle Chat Window open/close
  const toggleChatWindow = (forceState) => {
    if (!assistantRoot || !chatWindow || !mascot) return;
    const willOpen =
      typeof forceState === 'boolean'
        ? forceState
        : !assistantRoot.classList.contains('chat-open');

    assistantRoot.classList.toggle('chat-open', willOpen);
    chatWindow.setAttribute('aria-hidden', String(!willOpen));
    mascot.setAttribute('aria-expanded', String(willOpen));

    if (willOpen) {
      triggerMascotWave();
      setTimeout(() => {
        if (chatInput && !isTouchDevice) chatInput.focus();
      }, 250);
    }
  };

  if (mascot) {
    mascot.addEventListener('click', () => toggleChatWindow());
    mascot.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleChatWindow();
      }
    });
  }

  if (chatCloseBtn) {
    chatCloseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleChatWindow(false);
    });
  }

  // Close chat on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && assistantRoot && assistantRoot.classList.contains('chat-open')) {
      toggleChatWindow(false);
    }
  });

  // Append Message Helper
  const appendChatMessage = (htmlContent, sender = 'bot') => {
    if (!chatMessages) return;
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg chat-msg--${sender}`;

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    msgDiv.innerHTML = `
      <div class="chat-msg-bubble">${htmlContent}</div>
      <span class="chat-msg-time">${timeStr}</span>
    `;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  };

  // Handle User Question & Typing Indicator
  const handleUserQuestion = (questionText) => {
    if (!questionText || !questionText.trim()) return;
    const cleanQuestion = questionText.trim();

    // Render user bubble safely
    const escapedUserText = cleanQuestion
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    appendChatMessage(escapedUserText, 'user');

    // Show typing indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'chat-msg chat-msg--bot';
    typingIndicator.innerHTML = `
      <div class="chat-msg-bubble">
        <div class="typing-dots"><span></span><span></span><span></span></div>
      </div>
    `;
    chatMessages.appendChild(typingIndicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Mascot waves happily while answering
    triggerMascotWave();

    setTimeout(() => {
      typingIndicator.remove();
      const answerHtml = generateResumeReply(cleanQuestion);
      appendChatMessage(answerHtml, 'bot');
    }, 520);
  };

  if (chatForm && chatInput) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = chatInput.value;
      chatInput.value = '';
      handleUserQuestion(query);
    });
  }

  quickChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const query = chip.getAttribute('data-query');
      handleUserQuestion(query);
    });
  });

  // Real-time Cursor AND Mobile Touch Direction Tracking for Character
  if (mascot && pupils && mascotHead && !prefersReducedMotion.matches) {
    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let rafPending = false;

    const updateMascotLook = () => {
      rafPending = false;
      const rect = mascot.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height * 0.42;

      const deltaX = pointerX - centerX;
      const deltaY = pointerY - centerY;
      const angle = Math.atan2(deltaY, deltaX);
      const distance = Math.min(Math.hypot(deltaX, deltaY) / 35, 5.5);

      const pupilX = Math.cos(angle) * distance;
      const pupilY = Math.sin(angle) * distance;

      pupils.style.transform = `translate(${pupilX.toFixed(2)}px, ${pupilY.toFixed(2)}px)`;

      const headShiftX = Math.max(-4, Math.min(4, deltaX / 90));
      const headShiftY = Math.max(-3, Math.min(3, deltaY / 90));
      const headTilt = Math.max(-5, Math.min(5, deltaX / 140));

      mascotHead.style.transform = `translate(${headShiftX.toFixed(2)}px, ${headShiftY.toFixed(2)}px) rotate(${headTilt.toFixed(2)}deg)`;
    };

    const scheduleLookUpdate = (x, y) => {
      pointerX = x;
      pointerY = y;
      if (!rafPending) {
        rafPending = true;
        requestAnimationFrame(updateMascotLook);
      }
    };

    // Desktop Mouse Tracking
    window.addEventListener(
      'mousemove',
      (e) => scheduleLookUpdate(e.clientX, e.clientY),
      { passive: true }
    );

    // Mobile Touch Tracking (character looks where user taps/scrolls)
    window.addEventListener(
      'touchmove',
      (e) => {
        if (e.touches && e.touches[0]) {
          scheduleLookUpdate(e.touches[0].clientX, e.touches[0].clientY);
        }
      },
      { passive: true }
    );

    window.addEventListener(
      'touchstart',
      (e) => {
        if (e.touches && e.touches[0]) {
          scheduleLookUpdate(e.touches[0].clientX, e.touches[0].clientY);
        }
      },
      { passive: true }
    );
  }

  // ============================================================
  // 4. HERO FINTECH PARTICLE CONSTELLATION (Responsive Canvas)
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

    const pointer = { x: null, y: null, radius: isTouchDevice ? 90 : 130 };

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

    // Fewer particles on mobile for 60fps battery-friendly performance
    const maxNodes = isTouchDevice ? 26 : 55;
    const particleCount = Math.min(maxNodes, Math.floor((width * height) / 18000));
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
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

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.55;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);

          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = '#00d4aa';
            ctx.globalAlpha = (1 - dist / 120) * 0.18;
            ctx.lineWidth = 1;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        if (pointer.x !== null && pointer.y !== null) {
          const dist = Math.hypot(p.x - pointer.x, p.y - pointer.y);
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
  // 5. DYNAMIC SCROLL-TRIGGERED REVEALS
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
      const delay = (index % 4) * 80;
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
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );

    revealElements.forEach((el) => scrollObserver.observe(el));
  }

  // ============================================================
  // 6. CARD SPOTLIGHT GLOW & 3D TILT (Desktop Pointer Only)
  // ============================================================
  const interactiveCards = document.querySelectorAll(
    '.skill-category, .project-card, .stat-card, .timeline-content'
  );

  if (!prefersReducedMotion.matches && !isTouchDevice) {
    interactiveCards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -3;
        const rotateY = ((x - centerX) / centerX) * 3;

        card.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // ============================================================
  // 7. NAVBAR SCROLL EFFECT
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
  // 8. SMOOTH SCROLL
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
  // 10. SCROLL-TO-TOP BUTTON
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
  // 11. ACTIVE NAVIGATION HIGHLIGHT
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
  // 11.5. SET CURRENT YEAR
  // ============================================================
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ============================================================
  // 12. COUNTER ANIMATION
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
  // 13. CONTACT FORM HANDLING
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
  // 14. SKILL TAGS ANIMATION
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
