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
      intro_title: 'Olympos Lodge: Likya Kıyısında Samimi Bir Sığınak',
      intro_label: 'Hakkında',
      intro_p1: 'Zümrüt bir vadinin denize açıldığı noktada, zaman farklı akar. Olympos Lodge burada 1985\'ten beri ayakta — gereksiz olanı çıkardığınızda geriye daha ince bir şeyin kaldığı inancıyla.',
      intro_p2: 'On yedi oda, 20.000 metrekare bahçenin içinde. Akdeniz\'in en el değmemiş kıyılarından birine adım mesafesinde; bu kıyıya adını veren antik kentin hemen yanı başında. Bahçe, plaj, restoran — hepsi yalnızca misafirlerimize ayrılmış.',
      intro_p4: 'Günler burada ajansız açılır. Plajdaki bir şezlonga uzanın, sabahı geçsin. Bir kano çıkarın ve kıyıyı kendi hızınızda keşfedin — ya da daha uzağa bir tekne turu için konsiyer ile iletişime geçin. Ön bahçe, bir yoga matının da bir kitabın da eşit anlam taşıdığı türden bir yer. Bisikletler Çıralı köyünü ve çevresindeki yolları keşfetmek için hazır.',
      intro_p6: 'Akşamları bahçede ateşler yakılır — toplanmak, içki içmek ve sohbetin kendi akışını bulmasına izin vermek için. Ve gün hiçbir şey istemediğinde, özel spa orada: jakuzi, sauna, buhar odası — tamamen sizin.',
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
      room6_name: 'Standart Oda', room6_desc: 'İhtiyacınız olan her şey, fazlası değil.',
      room_discover: 'Keşfet →',
      rooms_page_intro: 'On yedi oda — her biri kendi karakteriyle, kendi manzarasıyla ve arazinin ritmiyle şekillenmiş. Bazıları suyun kenarında, bazıları bahçenin derinliğinde. Hepsi aynı özeni taşır.',
      rooms_includes_label: 'Her Odada',
      rooms_include_breakfast: 'Kahvaltı Dahil',
      rooms_include_wifi: 'Ücretsiz Wi-Fi',
      rooms_include_ac: 'Klima',
      rooms_include_terrace: 'Özel Teras',
      nature_label: 'Bahçe, Deniz, Doğa',
      nature_heading: 'Doğa zaten mükemmel; ona saygı duy, onu dinle ve onunla birlikte yarat.',
      nature_p1: 'Olympos Lodge, bu yerin kendisinden öğrendi. Her yapı, arazinin izin verdiği yere saygıyla yerleştirildi — ağaçların arasına değil, ağaçlarla birlikte. Kökler yerinde kaldı, taşlar bozulmadı. Burada doğa bir arka plan değil, asıl mimardır.',
      nature_p2: 'Gece, ışık kirliliğinden uzak bu kıyıda gökyüzü nadiren görülen bir berraklıkla açılır. Sabah, deniz kokusu ormanın sesiyle iç içe geçer. Çıralı\'nın deresi sessizce denize karışır — ve bir an için, dünyanın geri kalanının ne kadar gürültülü olduğunu anlarsınız.',
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
      footer_copyright: '© 2025 Olympos Lodge. Tüm hakları saklıdır.',
      footer_terms: 'Ön Bilgilendirme Formu',
      footer_privacy: 'Gizlilik ve KVKK Bilgilendirme'
    },
    en: {
      btn_reserve: 'Reserve',
      nav_home: 'Home', nav_story: 'Our Story', nav_rooms: 'Rooms',
      nav_nature: 'Nature', nav_experience: 'Experience', nav_gallery: 'Gallery', nav_contact: 'Contact',
      hero_title: 'Time flows<br>differently here.',
      hero_subtitle: 'Noise softens, senses awaken.<br>Nature makes itself heard.',
      intro_title: 'Olympos Lodge: An Intimate Retreat on the Lycian Coast',
      intro_label: 'About',
      intro_p1: 'Where a green valley opens onto the sea, time moves differently. Olympos Lodge has stood here since 1985 — built on the conviction that a place stripped of the unnecessary becomes something finer.',
      intro_p2: 'Seventeen rooms among 20,000 square metres of garden, steps from one of the Mediterranean\'s most unspoiled beaches. A short walk from the ancient city that lends this coast its name. The garden, the beach, the restaurant — all of it exclusively for guests.',
      intro_p4: 'Days here unfold without agenda. Claim a cabana on the beach and let the morning pass. Take out a canoe and explore the coastline at your own pace — or have the concierge arrange a boat tour for something further. The front garden is the kind of place where a yoga mat or a book both make equal sense. Bicycles are there to explore Çıralı village and the roads beyond.',
      intro_p6: 'In the evening, firepits are lit — a place to gather, pour a drink, and let the conversation find its own current. And when the day asks for nothing at all, the private spa is there: jacuzzi, sauna, steam room — entirely yours.',
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
      room6_name: 'Standard Room', room6_desc: 'Everything you need, nothing more.',
      room_discover: 'Discover →',
      rooms_page_intro: 'Seventeen rooms — each shaped by its own character, its own view, its own relationship with the land. Some sit at the water\'s edge, some within the depth of the garden. All share the same care.',
      rooms_includes_label: 'In Every Room',
      rooms_include_breakfast: 'Breakfast Included',
      rooms_include_wifi: 'Free Wi-Fi',
      rooms_include_ac: 'Air Conditioning',
      rooms_include_terrace: 'Private Terrace',
      nature_label: 'Garden, Sea, Nature',
      nature_heading: 'Nature is already perfect; respect it, listen to it, and create alongside it.',
      nature_p1: 'Olympos Lodge learned from the place itself. Every structure was placed with care for what was already here — not carved between trees, but settled where the land allowed. Roots stayed intact, stones undisturbed. Here, nature is not a backdrop. It is the architect.',
      nature_p2: 'At night, far from any light pollution, the sky opens with rare clarity. In the morning, the scent of the sea weaves through the sounds of the forest. The stream of Çıralı quietly finds its way to the sea — and for a moment, you understand just how loud the rest of the world really is.',
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
      intro_title: 'Olympos Lodge: Ein Intimes Refugium an der Lykischen Küste',
      intro_label: 'Über uns',
      intro_p1: 'Wo ein grünes Tal auf das Meer trifft, vergeht die Zeit anders. Olympos Lodge steht hier seit 1985 — gegründet auf die Überzeugung, dass ein Ort, dem alles Überflüssige genommen wurde, zu etwas Feinerem wird.',
      intro_p2: 'Siebzehn Zimmer in 20.000 Quadratmetern Garten, unweit eines der unberührtesten Strände des Mittelmeers. Ein kurzer Spaziergang von der antiken Stadt entfernt, die dieser Küste ihren Namen gab. Der Garten, der Strand, das Restaurant — alles ausschließlich für unsere Gäste.',
      intro_p4: 'Die Tage hier entfalten sich ohne Tagesordnung. Beziehen Sie eine Cabana am Strand und lassen Sie den Morgen vergehen. Nehmen Sie ein Kanu und erkunden Sie die Küste in Ihrem eigenen Tempo — oder bitten Sie den Concierge, eine Bootstour zu arrangieren. Der Vorgarten ist genau der Ort, an dem eine Yogamatte und ein Buch gleichermaßen Sinn ergeben. Fahrräder stehen bereit, um das Dorf Çıralı und die umliegenden Straßen zu erkunden.',
      intro_p6: 'Abends werden im Garten Feuer entzündet — zum Zusammenkommen, um einen Drink zu genießen und das Gespräch seinen eigenen Lauf nehmen zu lassen. Und wenn der Tag nichts mehr verlangt, ist das private Spa da: Whirlpool, Sauna, Dampfbad — ganz für Sie allein.',
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
      room6_name: 'Standardzimmer', room6_desc: 'Alles was Sie brauchen, nichts mehr.',
      room_discover: 'Entdecken →',
      rooms_page_intro: 'Siebzehn Zimmer — jedes mit eigenem Charakter, eigener Aussicht und eigenem Bezug zum Land. Manche am Ufer des Wassers, manche in der Tiefe des Gartens. Alle verbindet dieselbe Sorgfalt.',
      rooms_includes_label: 'In Jedem Zimmer',
      rooms_include_breakfast: 'Frühstück Inklusive',
      rooms_include_wifi: 'Kostenloses WLAN',
      rooms_include_ac: 'Klimaanlage',
      rooms_include_terrace: 'Private Terrasse',
      nature_label: 'Garten, Meer, Natur',
      nature_heading: 'Die Natur ist bereits vollkommen; respektiere sie, höre ihr zu und erschaffe mit ihr.',
      nature_p1: 'Olympos Lodge hat von diesem Ort selbst gelernt. Jedes Gebäude wurde mit Respekt vor dem gesetzt, was bereits vorhanden war — nicht zwischen die Bäume geschnitten, sondern dort, wo die Erde es zuließ. Wurzeln blieben unberührt, Steine unverrückt. Hier ist die Natur keine Kulisse. Sie ist die Architektin.',
      nature_p2: 'Nachts öffnet sich der Himmel an dieser lichtfreien Küste mit seltener Klarheit. Am Morgen mischt sich der Duft des Meeres mit den Geräuschen des Waldes. Der Bach von Çıralı findet still seinen Weg ins Meer — und für einen Moment begreift man, wie laut der Rest der Welt eigentlich ist.',
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
  if (savedLang) setLanguage(savedLang);

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

  // Fade-up for general sections
  [
    '.intro-body', '.about-content', '.section-header',
    '.nature-content .container', '.experience-card',
    '.voice-card', '.gallery-teaser .section-header',
    '.footer-brand', '.footer-col'
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

  // Single observer for everything
  const allReveal = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  allReveal.forEach(el => revealObserver.observe(el));

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

    // Slide in when footer enters viewport
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        panel.classList.toggle('is-visible', entry.isIntersecting);
      });
    }, { threshold: 0.35 });

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

});
