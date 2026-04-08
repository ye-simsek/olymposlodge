/* ========================================
   OLYMPOS LODGE — Interactions
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- Lenis smooth scroll ---
  let lenis = null;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  // --- Header scroll behavior ---
  const header = document.getElementById('header');

  function onScroll() {
    const scrollY = window.scrollY;
    if (scrollY > 5) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
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
    if (lenis) lenis.stop();
    else document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    navOverlay.classList.remove('open');
    menuToggle.classList.remove('active');
    header.classList.remove('menu-open');
    if (lenis) lenis.start();
    else document.body.style.overflow = '';
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // --- Language switch ---
  const translations = olTranslations;

  function setLanguage(lang) {
    const t = translations[lang];
    if (!t) return;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (t[key] !== undefined) el.textContent = t[key];
    });
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      if (t[key] !== undefined) el.innerHTML = t[key];
    });
    document.querySelector('.lang-current').textContent = lang.toUpperCase();
    document.querySelectorAll('.lang-dropdown a').forEach(a => {
      a.classList.toggle('active', a.getAttribute('data-lang') === lang);
    });
    document.documentElement.lang = lang;
    localStorage.setItem('ol_lang', lang);
  }

  const langSwitch = document.getElementById('langSwitch');
  const langCurrent = langSwitch.querySelector('.lang-current');

  langCurrent.addEventListener('click', (e) => {
    e.stopPropagation();
    langSwitch.classList.toggle('open');
  });

  langSwitch.querySelectorAll('[data-lang]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      setLanguage(link.getAttribute('data-lang'));
      langSwitch.classList.remove('open');
    });
  });

  document.addEventListener('click', () => {
    langSwitch.classList.remove('open');
  });

  // Restore saved language, or detect from browser on first visit
  const savedLang = localStorage.getItem('ol_lang');
  if (savedLang) {
    setLanguage(savedLang);
  } else {
    const browserLang = (navigator.language || '').slice(0, 2).toLowerCase();
    const supported = { tr: 'tr', en: 'en', de: 'de' };
    setLanguage(supported[browserLang] || 'en');
  }

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        if (lenis) {
          lenis.scrollTo(target);
        } else {
          const y = target.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
    });
  });

  // --- Scroll reveal animations ---

  // Fade-up for general sections
  [
    '.intro-body', '.about-content', '.section-header',
    '.nature-content .container', '.experience-card',
    '.voice-card', '.gallery-teaser .section-header',
    '.footer-brand', '.footer-col',
    '.dest-chapter__body', '.dest-activity', '.dest-nearby__item'
  ].forEach(sel => {
    document.querySelectorAll(sel).forEach(el => el.classList.add('reveal'));
  });

  // Room rows — split directional fade (image ↔ content)
  document.querySelectorAll('.room-row:not(.room-row--reverse) .room-row__image').forEach(el => el.classList.add('reveal-left'));
  document.querySelectorAll('.room-row:not(.room-row--reverse) .room-row__content').forEach(el => {
    el.classList.add('reveal-right');
    el.style.transitionDelay = '0.12s';
  });
  document.querySelectorAll('.room-row--reverse .room-row__image').forEach(el => el.classList.add('reveal-right'));
  document.querySelectorAll('.room-row--reverse .room-row__content').forEach(el => {
    el.classList.add('reveal-left');
    el.style.transitionDelay = '0.12s';
  });

  // Stagger voices and footer columns
  document.querySelectorAll('.voices-grid .voice-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.12}s`;
  });
  document.querySelectorAll('.footer-grid > *').forEach((col, i) => {
    col.style.transitionDelay = `${i * 0.1}s`;
  });

  // Single observer for everything — deferred to let layout settle
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0,
    rootMargin: '0px 0px -60px 0px'
  });

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .breathe, .dest-chapter__num, .dest-chapter__cat').forEach(el => {
        revealObserver.observe(el);
      });
    });
  });

  // --- Voices carousel (mobile) ---
  const voicesGrid = document.querySelector('.voices-grid');
  const voicesDots = document.getElementById('voicesDots');
  if (voicesGrid && voicesDots) {
    const cards = voicesGrid.querySelectorAll('.voice-card');

    // Build dots
    cards.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.className = 'voices-dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => {
        voicesGrid.scrollTo({ left: cards[i].offsetLeft - voicesGrid.offsetLeft, behavior: 'smooth' });
      });
      voicesDots.appendChild(dot);
    });

    const dots = voicesDots.querySelectorAll('.voices-dot');

    voicesGrid.addEventListener('scroll', () => {
      const center = voicesGrid.scrollLeft + voicesGrid.offsetWidth / 2;
      let closest = 0;
      cards.forEach((card, i) => {
        const cardCenter = card.offsetLeft - voicesGrid.offsetLeft + card.offsetWidth / 2;
        if (Math.abs(cardCenter - center) < Math.abs(cards[closest].offsetLeft - voicesGrid.offsetLeft + cards[closest].offsetWidth / 2 - center)) {
          closest = i;
        }
      });
      dots.forEach((d, i) => d.classList.toggle('active', i === closest));
    }, { passive: true });

    // Drag scroll
    let isDown = false, startX, scrollLeft;
    voicesGrid.addEventListener('mousedown', e => { isDown = true; startX = e.pageX - voicesGrid.offsetLeft; scrollLeft = voicesGrid.scrollLeft; });
    voicesGrid.addEventListener('mouseleave', () => { isDown = false; });
    voicesGrid.addEventListener('mouseup', () => { isDown = false; });
    voicesGrid.addEventListener('mousemove', e => {
      if (!isDown) return;
      e.preventDefault();
      voicesGrid.scrollLeft = scrollLeft - (e.pageX - voicesGrid.offsetLeft - startX) * 1.5;
    });
  }

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

  // --- Weather Panel ---
  function initWeatherPanel() {
    const panel = document.getElementById('weather-panel');
    const footer = document.querySelector('.site-footer');
    if (!panel || !footer) return;

    const LAT = 36.4166, LON = 30.4742;
    const API = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=temperature_2m,weathercode,windspeed_10m,winddirection_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,windspeed_10m_max,winddirection_10m_dominant&timezone=Europe%2FIstanbul&forecast_days=5`;

    const WMO = {
      0:'Clear sky',1:'Mainly clear',2:'Partly cloudy',3:'Overcast',
      45:'Foggy',48:'Foggy',51:'Light drizzle',53:'Drizzle',55:'Heavy drizzle',
      61:'Light rain',63:'Rain',65:'Heavy rain',71:'Light snow',73:'Snow',
      75:'Heavy snow',80:'Showers',81:'Showers',82:'Heavy showers',
      95:'Thunderstorm',99:'Thunderstorm'
    };
    const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

    function wmoDesc(c) { return WMO[c] || 'Clear sky'; }
    function degCompass(d) { return ['N','NE','E','SE','S','SW','W','NW'][Math.round(d/45)%8]; }

    // Date header
    const now = new Date();
    document.getElementById('wp-year').textContent = now.getFullYear();
    document.getElementById('wp-daydate').textContent = `${['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][now.getDay()]} · ${now.getDate()} ${MONTHS[now.getMonth()]}`;

    let data = null;

    function renderDay(i) {
      if (!data) return;
      const isToday = i === 0;
      const temp = isToday ? Math.round(data.current.temperature_2m) : Math.round(data.daily.temperature_2m_max[i]);
      const desc = wmoDesc(isToday ? data.current.weathercode : data.daily.weathercode[i]);
      const windSpeed = isToday ? data.current.windspeed_10m : data.daily.windspeed_10m_max[i];
      const windDir = degCompass(isToday ? data.current.winddirection_10m : data.daily.winddirection_10m_dominant[i]);

      document.getElementById('wp-temp').textContent = temp + '°';
      document.getElementById('wp-desc').textContent = desc;
      document.getElementById('wp-wind').textContent = `${windDir} · ${windSpeed} km/h`;
      document.querySelectorAll('.wp-tab').forEach((t, j) => t.classList.toggle('is-active', j === i));
    }

    function buildPanel(d) {
      data = d;
      // Tabs
      const tabsEl = document.getElementById('wp-tabs');
      tabsEl.innerHTML = '';
      d.daily.time.slice(0, 5).forEach((dateStr, i) => {
        const btn = document.createElement('button');
        btn.className = 'wp-tab';
        btn.textContent = i === 0 ? 'Today' : DAYS[new Date(dateStr).getDay()];
        btn.addEventListener('click', () => renderDay(i));
        tabsEl.appendChild(btn);
      });
      // Strip
      const strip = document.getElementById('wp-strip');
      strip.innerHTML = '';
      d.daily.time.slice(0, 5).forEach((dateStr, i) => {
        const cell = document.createElement('div');
        cell.className = 'wp-strip-cell';
        cell.innerHTML = `<span class="wp-strip-day">${i === 0 ? 'Today' : DAYS[new Date(dateStr).getDay()]}</span><span class="wp-strip-desc">${wmoDesc(d.daily.weathercode[i])}</span><span class="wp-strip-temp">${Math.round(d.daily.temperature_2m_max[i])}°</span>`;
        strip.appendChild(cell);
      });
      renderDay(0);
    }

    fetch(API).then(r => r.json()).then(buildPanel).catch(() => {
      document.getElementById('wp-desc').textContent = 'Unavailable';
    });

    // Slide up when footer enters viewport
    const footerMain = document.getElementById('footer-main');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (footerMain) footerMain.classList.toggle('is-visible', entry.isIntersecting);
      });
    }, { threshold: 0.15 });

    observer.observe(footer);
  }

  initWeatherPanel();


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

  // --- Dest page: snap icons behind header at 55% coverage ---
  const destIconsRow = document.querySelector('.dest-icons-row');
  if (destIconsRow) {
    let snapped = false;
    let snapScrollY = null;
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
      const headerBottom = header.offsetHeight;
      // Use offsetTop for layout position (unaffected by transform)
      const naturalTop = destIconsRow.offsetTop - window.scrollY;
      const totalH = destIconsRow.offsetHeight;
      const covered = Math.max(0, headerBottom - naturalTop);
      const pct = totalH > 0 ? covered / totalH : 0;
      if (!snapped && pct >= 0.55) {
        snapped = true;
        snapScrollY = window.scrollY;
        destIconsRow.classList.add('dest-icons--snap');
      } else if (snapped && window.scrollY < snapScrollY - 5) {
        snapped = false;
        snapScrollY = null;
        destIconsRow.classList.remove('dest-icons--snap');
      }
    }, { passive: true });
  }

  // --- Activities sub-nav ---
  const actSubnav = document.getElementById('actSubnav');
  if (actSubnav) {
    const sections = document.querySelectorAll('.act-section');
    const navItems = actSubnav.querySelectorAll('.act-subnav__item');
    let stickScrollY = null;

    window.addEventListener('scroll', () => {
      // Collapse icons only after scrolling 80px past the point where subnav first stuck
      const headerH = document.getElementById('header').offsetHeight;
      const rect = actSubnav.getBoundingClientRect();
      const isStuck = rect.top <= headerH + 2;
      if (isStuck && stickScrollY === null) stickScrollY = window.scrollY;
      if (!isStuck) stickScrollY = null;
      const collapsed = stickScrollY !== null && (window.scrollY - stickScrollY) > 80;
      actSubnav.classList.toggle('is-collapsed', collapsed);

      // Active section highlight
      let current = null;
      sections.forEach(sec => {
        const top = sec.getBoundingClientRect().top;
        if (top <= window.innerHeight * 0.4) current = sec.id;
      });
      navItems.forEach(item => {
        const link = item.querySelector('.act-subnav__link');
        const active = link && link.getAttribute('href') === '#' + current;
        item.classList.toggle('act-subnav__item--active', active);
      });
    }, { passive: true });

    // Smooth scroll for sub-nav links
    actSubnav.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
          const offset = actSubnav.offsetHeight + document.getElementById('header').offsetHeight;
          if (lenis) {
            lenis.scrollTo(target, { offset: -offset });
          } else {
            window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
          }
        }
      });
    });
  }

  // --- Cookie panel ---
  const cookieFab   = document.getElementById('cookieFab');
  const cookiePanel = document.getElementById('cookiePanel');
  const cookieClose = document.getElementById('cookiePanelClose');

  if (cookieFab && cookiePanel) {
    cookieFab.addEventListener('click', () => {
      cookiePanel.classList.toggle('is-open');
    });
    cookieClose && cookieClose.addEventListener('click', () => {
      cookiePanel.classList.remove('is-open');
    });
    document.addEventListener('click', (e) => {
      if (!cookiePanel.contains(e.target) && !cookieFab.contains(e.target)) {
        cookiePanel.classList.remove('is-open');
      }
    });
  }

  // --- Photo Gallery Lightbox ---
  const photoGrid = document.querySelector('.photo-grid');
  if (photoGrid) {
    // Fade in images on load
    photoGrid.querySelectorAll('img').forEach(img => {
      if (img.complete) { img.classList.add('is-loaded'); }
      else { img.addEventListener('load', () => img.classList.add('is-loaded')); }
    });

    // Build lightbox
    const lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('aria-label', 'Photo viewer');
    lb.innerHTML = `
      <button class="lightbox__close" aria-label="Close">&#215;</button>
      <button class="lightbox__arrow lightbox__arrow--prev" aria-label="Previous">&#8592;</button>
      <img class="lightbox__img" src="" alt="" />
      <button class="lightbox__arrow lightbox__arrow--next" aria-label="Next">&#8594;</button>
    `;
    document.body.appendChild(lb);

    const lbImg = lb.querySelector('.lightbox__img');
    const lbClose = lb.querySelector('.lightbox__close');
    const lbPrev = lb.querySelector('.lightbox__arrow--prev');
    const lbNext = lb.querySelector('.lightbox__arrow--next');
    const focusable = [lbClose, lbPrev, lbNext];
    const items = Array.from(photoGrid.querySelectorAll('.photo-grid__item'));
    let current = 0;
    let triggerEl = null;

    function openLightbox(i) {
      triggerEl = document.activeElement;
      current = i;
      lbImg.src = items[i].querySelector('img').src;
      lbImg.alt = items[i].querySelector('img').alt;
      lb.classList.add('is-open');
      lbClose.focus();
      if (lenis) lenis.stop();
      else document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lb.classList.remove('is-open');
      if (triggerEl) triggerEl.focus();
      if (lenis) lenis.start();
      else document.body.style.overflow = '';
    }

    function navigate(dir) {
      current = (current + dir + items.length) % items.length;
      lbImg.src = items[current].querySelector('img').src;
      lbImg.alt = items[current].querySelector('img').alt;
    }

    items.forEach((item, i) => item.addEventListener('click', () => openLightbox(i)));
    lbClose.addEventListener('click', closeLightbox);
    lbPrev.addEventListener('click', () => navigate(-1));
    lbNext.addEventListener('click', () => navigate(1));
    lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });
    document.addEventListener('keydown', e => {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigate(-1);
      if (e.key === 'ArrowRight') navigate(1);
      if (e.key === 'Tab') {
        const idx = focusable.indexOf(document.activeElement);
        if (e.shiftKey) {
          e.preventDefault();
          focusable[(idx <= 0 ? focusable.length : idx) - 1].focus();
        } else {
          e.preventDefault();
          focusable[(idx + 1) % focusable.length].focus();
        }
      }
    });
  }

});
