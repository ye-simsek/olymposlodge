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
  const translations = {
    tr: {
      btn_reserve: 'Rezervasyon',
      nav_home: 'Ana Sayfa', nav_story: 'Hikayemiz', nav_rooms: 'Odalar',
      nav_nature: 'Doğa', nav_experience: 'Deneyim', nav_gallery: 'Galeri', nav_contact: 'İletişim',
      hero_title: 'Zaman burada<br>farklı akar.',
      hero_subtitle: 'Gürültü yumuşar, duyular uyanır.<br>Doğa kendi sesini duyurur.',
      intro_lead: 'Olympos Lodge, Akdeniz\'in en sakin kıyılarından birinde, Çıralı\'nın eşsiz doğal peyzajı içinde yer alır.',
      intro_text: 'Denize sıfır konumda, yirmi dönümlük bir bahçeye yayılan bu yer, yalnızca konuklarına ayrılmış sessiz bir evren sunar. Bu yaşam alanının her köşesi özenle düşünülmüş; doğaya saygıyla, gereksiz hiçbir şey eklenmeden tasarlanmıştır.',
      about_label: 'Hikayemiz',
      about_heading: 'Yıllar önce, bir adam Akdeniz\'in en el değmemiş kıyılarından birine ulaştı.',
      about_p1: 'Zümrüt yeşili bir vadiden geçerek bu yere vardı. Yol boyunca karşılaştığı güzellik, sessizce yüklerini bırakmasına izin verdi. Vadinin bir dere aracılığıyla denizle buluştuğu noktada, zaman onunla birlikte durdu.',
      about_p2: 'O andan itibaren bir hayal başladı. Bugün hâlâ devam eden, hâlâ paylaşılan bir hayal.',
      about_p3: 'Olympos Lodge bu hayalden doğdu. Yirmi dönümlük bir bahçe içinde doğayla uyum halinde yerleştirilmiş on dört oda… Her biri mütevazı bir zarafetle döşenmiş; temiz, aydınlık ve dört mevsim yaşanabilir.',
      rooms_label: 'Odalar', rooms_heading: 'Her biri doğanın ritmiyle<br>uyum içinde.',
      room1_name: 'Aqua Super Deluxe', room1_desc: 'Doğanın kalbinde, suyun huzuruyla çevrelenmiş özel bir sığınak.',
      room2_name: 'Super Deluxe', room2_desc: 'Geniş alan, rafine dokunuşlar ve bahçe manzarası.',
      room3_name: 'Deluxe', room3_desc: 'Sade zarafet, doğal ışık ve huzurlu bir atmosfer.',
      room4_name: 'Göl Evi', room4_desc: 'Suyun kenarında, zamandan uzak bir dünya.',
      room5_name: 'Antik Oda', room5_desc: 'Tarihin izleri, zamanın ötesinde bir deneyim.',
      room6_name: 'Çift Kişilik', room6_desc: 'İhtiyacınız olan her şey, fazlası değil.',
      room_discover: 'Keşfet →',
      nature_label: 'Bahçe, Deniz, Doğa',
      nature_heading: 'Doğa zaten mükemmel; ona saygı duy, onu dinle ve onunla birlikte yarat.',
      nature_p1: 'Bu yerin ilham kaynaklarından biri, Lanzarote\'de mimariyi doğayla kusursuz bir şekilde birleştiren sanatçı ve çevreci César Manrique\'dir. Onun yaklaşımı Olympos Lodge\'un temel felsefesiyle örtüşür. Burada doğaya müdahale edilmez; onun ritmi takip edilir. Ağaçlar yön verir, taşlar yerinde kalır.',
      nature_p2: 'Camus\'nün karakterleri gibi, burada da insan doğanın karşısında çıplak durur — yalnız, ama özgür. Sessizlik ve sükunetle geçen günlerde varoluşsal sorular yüzeye çıkabilir; ama huzur veren cevabın kendisi değil, sorunun içinde kalabilmektir.',
      exp_label: 'Deneyim', exp_heading: 'Her an, bir keşif.',
      spa_title: 'Spa & Dinlenme', spa_desc: 'Bahçenin kalbinde, taşların arasına yerleştirilmiş bir sauna… Burada sessizlik bir lüks değil, yerin doğal hali.',
      rest_title: 'Restoran', rest_desc: 'Nar ağaçlarının gölgesinde uzayan kahvaltı sofraları, akşamları yıldızların altında deniz meltemi eşliğinde yemekler.',
      exp_discover: 'Keşfet →',
      quote: 'Zaman yavaşlar.<br>Hayat hafifler.<br>Ve doğa sessizce yanınıza oturur.',
      voices_label: 'Misafir Defteri', voices_heading: 'Hatıralar, kelimelerle.',
      voice1_text: '"Burada geçirdiğimiz günler, hayatımızda bir durak değil, bir dönüm noktası oldu. Sessizliğin içinde kendimizi yeniden bulduk."',
      voice1_author: '— Bir misafir, 2024',
      voice2_text: '"Sabah kuş sesleriyle uyanmak, akşam yıldızların altında yürümek… Olympos Lodge sadece bir tatil değil, bir hatırlama."',
      voice2_author: '— Bir misafir, 2024',
      voice3_text: '"Bu bahçede yürürken, zamanın gerçekten durduğunu hissettim. Her köşede huzur, her detayda özen."',
      voice3_author: '— Bir misafir, 2023',
      gallery_label: 'Galeri', gallery_heading: 'Bir bakış.',
      footer_tagline: 'Çıralı\'nın kutsal kıyılarında, doğayla uyum içinde.',
      footer_contact_title: 'İletişim', footer_explore_title: 'Keşfet', footer_follow_title: 'Bizi Takip Edin',
      footer_nature_link: 'Bahçe & Doğa',
      footer_address: 'Çıralı, Ulupınar Mahallesi<br>Kemer / Antalya, Türkiye',
      footer_copyright: '© 2025 Olympos Lodge. Tüm hakları saklıdır.'
    },
    en: {
      btn_reserve: 'Reserve',
      nav_home: 'Home', nav_story: 'Our Story', nav_rooms: 'Rooms',
      nav_nature: 'Nature', nav_experience: 'Experience', nav_gallery: 'Gallery', nav_contact: 'Contact',
      hero_title: 'Time flows<br>differently here.',
      hero_subtitle: 'Noise softens, senses awaken.<br>Nature makes itself heard.',
      intro_lead: 'Olympos Lodge sits on one of the Mediterranean\'s most serene shores, nestled within the extraordinary natural landscape of Çıralı.',
      intro_text: 'Set directly on the sea, sprawling across twenty acres of garden, this place offers guests a quiet universe all their own. Every corner has been thoughtfully considered — designed with reverence for nature, with nothing unnecessary added.',
      about_label: 'Our Story',
      about_heading: 'Years ago, a man arrived at one of the Mediterranean\'s most untouched shores.',
      about_p1: 'He found his way here through an emerald valley. The beauty he encountered along the road allowed him to quietly set down his burdens. At the point where the valley meets the sea through a stream, time stopped with him.',
      about_p2: 'From that moment, a dream began. A dream that continues today, still being shared.',
      about_p3: 'Olympos Lodge was born from that dream. Fourteen rooms set in harmony with nature across twenty acres of garden… Each furnished with understated elegance — clean, light-filled, and liveable in every season.',
      rooms_label: 'Rooms', rooms_heading: 'Each one in harmony<br>with the rhythm of nature.',
      room1_name: 'Aqua Super Deluxe', room1_desc: 'A private sanctuary at the heart of nature, surrounded by the calm of water.',
      room2_name: 'Super Deluxe', room2_desc: 'Generous space, refined touches and garden views.',
      room3_name: 'Deluxe', room3_desc: 'Understated elegance, natural light and a tranquil atmosphere.',
      room4_name: 'Lake House', room4_desc: 'At the water\'s edge — a world beyond time.',
      room5_name: 'Antique Room', room5_desc: 'The traces of history — an experience beyond time.',
      room6_name: 'Double Room', room6_desc: 'Everything you need, nothing more.',
      room_discover: 'Discover →',
      nature_label: 'Garden, Sea, Nature',
      nature_heading: 'Nature is already perfect; respect it, listen to it, and create alongside it.',
      nature_p1: 'One of the inspirations for this place is César Manrique — artist and environmentalist from Lanzarote, who fused architecture with nature in a flawless way. His approach resonates with the core philosophy of Olympos Lodge. Here, nature is not intervened upon; its rhythm is followed. Trees give direction, stones remain in place.',
      nature_p2: 'Like Camus\'s characters, here too a person stands naked before nature — alone, but free. In days of silence and serenity, existential questions may surface; but the comfort lies not in the answer, but in being able to remain within the question.',
      exp_label: 'Experience', exp_heading: 'Every moment, a discovery.',
      spa_title: 'Spa & Relaxation', spa_desc: 'A sauna nestled among stones at the heart of the garden… Here silence is not a luxury, but the natural state of the place.',
      rest_title: 'Restaurant', rest_desc: 'Breakfast tables stretching under pomegranate trees, evening meals beneath the stars with a sea breeze.',
      exp_discover: 'Discover →',
      quote: 'Time slows.<br>Life becomes lighter.<br>And nature quietly takes a seat beside you.',
      voices_label: 'Guest Book', voices_heading: 'Memories, in words.',
      voice1_text: '"The days we spent here were not a pause in our lives, but a turning point. In the silence, we found ourselves again."',
      voice1_author: '— A guest, 2024',
      voice2_text: '"Waking to birdsong in the morning, walking under the stars at night… Olympos Lodge is not just a holiday, but a remembering."',
      voice2_author: '— A guest, 2024',
      voice3_text: '"Walking through this garden, I truly felt time stop. Peace in every corner, care in every detail."',
      voice3_author: '— A guest, 2023',
      gallery_label: 'Gallery', gallery_heading: 'A glimpse.',
      footer_tagline: 'On the sacred shores of Çıralı, in harmony with nature.',
      footer_contact_title: 'Contact', footer_explore_title: 'Explore', footer_follow_title: 'Follow Us',
      footer_nature_link: 'Garden & Nature',
      footer_address: 'Çıralı, Ulupınar Mahallesi<br>Kemer / Antalya, Turkey',
      footer_copyright: '© 2025 Olympos Lodge. All rights reserved.'
    },
    de: {
      btn_reserve: 'Reservieren',
      nav_home: 'Startseite', nav_story: 'Unsere Geschichte', nav_rooms: 'Zimmer',
      nav_nature: 'Natur', nav_experience: 'Erlebnis', nav_gallery: 'Galerie', nav_contact: 'Kontakt',
      hero_title: 'Die Zeit fließt<br>hier anders.',
      hero_subtitle: 'Der Lärm verstummt, die Sinne erwachen.<br>Die Natur macht sich hörbar.',
      intro_lead: 'Olympos Lodge liegt an einer der ruhigsten Küsten des Mittelmeers, eingebettet in die einzigartige Naturlandschaft von Çıralı.',
      intro_text: 'Direkt am Meer gelegen und über zwanzig Morgen Garten verteilt, bietet dieser Ort seinen Gästen ein stilles Universum ganz für sich. Jede Ecke wurde sorgfältig durchdacht — mit Respekt vor der Natur gestaltet, ohne Überflüssiges.',
      about_label: 'Unsere Geschichte',
      about_heading: 'Vor Jahren kam ein Mann an eine der unberührtesten Küsten des Mittelmeers.',
      about_p1: 'Er fand seinen Weg hierher durch ein smaragdgrünes Tal. Die Schönheit, der er begegnete, erlaubte ihm, seine Last still abzulegen. An dem Punkt, wo das Tal durch einen Bach das Meer trifft, blieb die Zeit mit ihm stehen.',
      about_p2: 'Von diesem Moment an begann ein Traum. Ein Traum, der bis heute andauert und geteilt wird.',
      about_p3: 'Olympos Lodge wurde aus diesem Traum geboren. Vierzehn Zimmer, in Harmonie mit der Natur über zwanzig Morgen Garten verteilt… Jedes mit zurückhaltendem Charme eingerichtet — klar, lichtdurchflutet und in jeder Jahreszeit bewohnbar.',
      rooms_label: 'Zimmer', rooms_heading: 'Jedes im Einklang<br>mit dem Rhythmus der Natur.',
      room1_name: 'Aqua Super Deluxe', room1_desc: 'Ein privater Rückzugsort im Herzen der Natur, umgeben von der Ruhe des Wassers.',
      room2_name: 'Super Deluxe', room2_desc: 'Großzügiger Raum, verfeinerte Details und Gartenblick.',
      room3_name: 'Deluxe', room3_desc: 'Schlichte Eleganz, natürliches Licht und eine ruhige Atmosphäre.',
      room4_name: 'Seehaus', room4_desc: 'Am Ufer des Wassers — eine Welt jenseits der Zeit.',
      room5_name: 'Antikes Zimmer', room5_desc: 'Die Spuren der Geschichte — ein Erlebnis jenseits der Zeit.',
      room6_name: 'Doppelzimmer', room6_desc: 'Alles was Sie brauchen, nichts mehr.',
      room_discover: 'Entdecken →',
      nature_label: 'Garten, Meer, Natur',
      nature_heading: 'Die Natur ist bereits vollkommen; respektiere sie, höre ihr zu und erschaffe mit ihr.',
      nature_p1: 'Eine der Inspirationsquellen dieses Ortes ist César Manrique — Künstler und Umweltschützer aus Lanzarote, der Architektur und Natur auf vollkommene Weise verband. Sein Ansatz deckt sich mit der Kernphilosophie von Olympos Lodge. Hier wird in die Natur nicht eingegriffen; ihrem Rhythmus wird gefolgt. Bäume geben die Richtung vor, Steine bleiben an ihrem Platz.',
      nature_p2: 'Wie Camus\' Charaktere steht auch hier der Mensch nackt vor der Natur — allein, aber frei. In Tagen der Stille können existenzielle Fragen auftauchen; aber der Trost liegt nicht in der Antwort, sondern darin, in der Frage verweilen zu können.',
      exp_label: 'Erlebnis', exp_heading: 'Jeder Augenblick, eine Entdeckung.',
      spa_title: 'Spa & Entspannung', spa_desc: 'Eine Sauna zwischen Steinen im Herzen des Gartens… Hier ist Stille kein Luxus, sondern der natürliche Zustand des Ortes.',
      rest_title: 'Restaurant', rest_desc: 'Frühstückstafeln im Schatten von Granatapfelbäumen, abendliche Mahlzeiten unter dem Sternenhimmel mit Meeresbrise.',
      exp_discover: 'Entdecken →',
      quote: 'Die Zeit verlangsamt sich.<br>Das Leben wird leichter.<br>Und die Natur nimmt still neben Ihnen Platz.',
      voices_label: 'Gästebuch', voices_heading: 'Erinnerungen in Worten.',
      voice1_text: '"Die Tage, die wir hier verbracht haben, waren kein Innehalten — sondern ein Wendepunkt. In der Stille fanden wir uns selbst wieder."',
      voice1_author: '— Ein Gast, 2024',
      voice2_text: '"Morgens mit Vogelgesang aufwachen, abends unter den Sternen spazieren… Olympos Lodge ist nicht nur Urlaub, sondern Erinnerung."',
      voice2_author: '— Ein Gast, 2024',
      voice3_text: '"Beim Spaziergang durch diesen Garten spürte ich, wie die Zeit wirklich stehen blieb. Frieden in jeder Ecke, Sorgfalt in jedem Detail."',
      voice3_author: '— Ein Gast, 2023',
      gallery_label: 'Galerie', gallery_heading: 'Ein Blick.',
      footer_tagline: 'An den heiligen Ufern von Çıralı, im Einklang mit der Natur.',
      footer_contact_title: 'Kontakt', footer_explore_title: 'Entdecken', footer_follow_title: 'Folgen Sie uns',
      footer_nature_link: 'Garten & Natur',
      footer_address: 'Çıralı, Ulupınar Mahallesi<br>Kemer / Antalya, Türkei',
      footer_copyright: '© 2025 Olympos Lodge. Alle Rechte vorbehalten.'
    }
  };

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

  // Restore saved language
  const savedLang = localStorage.getItem('ol_lang');
  if (savedLang && savedLang !== 'tr') setLanguage(savedLang);

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
