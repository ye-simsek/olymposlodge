/* ========================================
   OLYMPOS LODGE — Interactions
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- Header scroll behavior ---
  const header = document.getElementById('header');
  let lastScroll = 0;

  function onScroll() {
    const scrollY = window.scrollY;
    if (scrollY > 5) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScroll = scrollY;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // --- Menu toggle ---
  const menuToggle = document.getElementById('menuToggle');
  const navOverlay = document.getElementById('navOverlay');
  const navLinks = document.querySelectorAll('[data-nav]');

  menuToggle.addEventListener('click', () => {
    const isOpen = navOverlay.classList.contains('open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  function openMenu() {
    navOverlay.classList.add('open');
    menuToggle.classList.add('active');
    header.classList.add('menu-open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    navOverlay.classList.remove('open');
    menuToggle.classList.remove('active');
    header.classList.remove('menu-open');
    document.body.style.overflow = '';
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // --- Language switch ---
  const langSwitch = document.getElementById('langSwitch');
  const langCurrent = langSwitch.querySelector('.lang-current');

  langCurrent.addEventListener('click', (e) => {
    e.stopPropagation();
    langSwitch.classList.toggle('open');
  });

  document.addEventListener('click', () => {
    langSwitch.classList.remove('open');
  });

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 0;
        const y = target.getBoundingClientRect().top + window.scrollY + offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });

  // --- Scroll reveal animations ---
  const revealElements = document.querySelectorAll(
    '.intro-content, .about-content, .section-header, .room-card, ' +
    '.nature-content .container, .experience-card, .voice-card, ' +
    '.gallery-teaser .section-header, .footer-brand, .footer-col'
  );

  revealElements.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -60px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // Add staggered delays to grid items
  document.querySelectorAll('.rooms-grid .room-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.1}s`;
  });

  document.querySelectorAll('.voices-grid .voice-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.15}s`;
  });

  document.querySelectorAll('.footer-grid > *').forEach((col, i) => {
    col.style.transitionDelay = `${i * 0.1}s`;
  });

  // --- Gallery horizontal drag scroll ---
  const galleryScroll = document.querySelector('.gallery-scroll');
  if (galleryScroll) {
    let isDown = false;
    let startX;
    let scrollLeft;

    galleryScroll.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - galleryScroll.offsetLeft;
      scrollLeft = galleryScroll.scrollLeft;
    });

    galleryScroll.addEventListener('mouseleave', () => {
      isDown = false;
    });

    galleryScroll.addEventListener('mouseup', () => {
      isDown = false;
    });

    galleryScroll.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - galleryScroll.offsetLeft;
      const walk = (x - startX) * 1.5;
      galleryScroll.scrollLeft = scrollLeft - walk;
    });
  }

  // --- Parallax effect on quote section ---
  const parallaxBg = document.querySelector('.parallax-bg');
  if (parallaxBg) {
    const parallaxSection = document.querySelector('.parallax-quote');
    window.addEventListener('scroll', () => {
      const rect = parallaxSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (rect.top < windowHeight && rect.bottom > 0) {
        const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
        const translate = (progress - 0.5) * 80;
        parallaxBg.style.transform = `translateY(${translate}px)`;
      }
    }, { passive: true });
  }

  // --- Image lazy reveal with fade ---
  const images = document.querySelectorAll('.room-card__image img, .experience-card__image img, .gallery-item img');
  images.forEach(img => {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.8s ease, transform 1.2s cubic-bezier(0.25, 0.1, 0.25, 1)';

    if (img.complete) {
      img.style.opacity = '1';
    } else {
      img.addEventListener('load', () => {
        img.style.opacity = '1';
      });
    }
  });

});
