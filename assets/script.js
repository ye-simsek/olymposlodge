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
      nav_nature: 'Doğa', nav_experience: 'Deneyim', nav_gallery: 'Galeri', nav_contact: 'İletişim', nav_experiences: 'Deneyimler', nav_location: 'Konum', loc_hero_title: 'Nasıl Gelinir',
      nav_cirali_tab: 'Çıralı', nav_activities_tab: 'Aktiviteler',
      hero_title: 'Zaman burada<br>farklı akar.',
      hero_subtitle: 'Gürültü yumuşar, duyular uyanır.<br>Doğa kendi sesini duyurur.',
      conviction_sentence: 'Gereksiz olanı çıkardığınızda, asıl önemli olan kalır.',
      intro_title: 'Olympos Lodge: Likya Kıyısında Samimi Bir Sığınak',
      intro_label: 'Hakkında',
      intro_p1: 'Zümrüt bir vadinin denize açıldığı noktada, zaman farklı akar. Olympos Lodge burada 1985\'ten beri ayakta, gereksiz olanı çıkardığınızda geriye daha ince bir şeyin kaldığı inancıyla. Geride kalan acelesi olmayan bir şey: bir bahçe, bir kıyı, sizi hiçbir şey talep etmeyen bir sessizlik.',
      intro_p2: 'On yedi oda, 20.000 metrekare bahçenin içinde. Akdeniz\'in en el değmemiş kıyılarından birine adım mesafesinde; bu kıyıya adını veren antik kentin hemen yanı başında. Bahçe, plaj, restoran: hepsi yalnızca misafirlerimize ayrılmış.',
      intro_p4: 'Günler burada ajansız açılır. Plajdaki bir şezlonga uzanın, sabahı geçsin. Bir kano çıkarın ve kıyıyı kendi hızınızda keşfedin, ya da daha uzağa bir tekne turu için konsiyer ile iletişime geçin. Ön bahçe, bir yoga matının da bir kitabın da eşit anlam taşıdığı türden bir yer. Bisikletler Çıralı köyünü ve çevresindeki yolları keşfetmek için hazır.',
      intro_p6: 'Akşamları bahçede ateşler yakılır: toplanmak, içki içmek ve sohbetin kendi akışını bulmasına izin vermek için. Ve gün hiçbir şey istemediğinde, özel spa orada: jakuzi, sauna, buhar odası, tamamen sizin.',
      story_section_title: 'Hikayemiz & Felsefemiz',
      about_label: 'Hikayemiz',
      about_heading: 'Yıllar önce, bir adam Akdeniz\'in en el değmemiş kıyılarından birine ulaştı.',
      about_p1: 'Zümrüt yeşili bir vadiden geçerek bu yere vardı. Yol boyunca karşılaştığı güzellik, sessizce yüklerini bırakmasına izin verdi. Vadinin bir dere aracılığıyla denizle buluştuğu noktada, zaman onunla birlikte durdu.',
      about_p2: 'O andan itibaren bir hayal başladı. Bugün hâlâ devam eden, hâlâ paylaşılan bir hayal.',
      about_p3: 'Olympos Lodge bu hayalden doğdu. 20.000 m² bahçe içinde doğayla uyum halinde yerleştirilmiş on yedi oda. Her biri sade bir zarafetle döşenmiş; temiz, aydınlık ve dört mevsim yaşanabilir.',
      rooms_label: 'Odalar', rooms_heading: 'Aynı bahçe,<br>farklı bir dünya.',
      room1_name: 'Aqua Super Deluxe', room1_desc: 'Bahçenin en eşsiz odası, ucunda müstakil bir yapı olarak konumlanmış. İç mekandaki şelale duvarı ve ayaklarınızın altında suyu gösteren bir sıra cam zemin paneli tonu belirliyor. Mimari ile doğa arasındaki sınır neredeyse ortadan kalkıyor.',
      room2_name: 'Super Deluxe', room2_desc: 'Her yönüyle ferah, Super Deluxe geniş özel terası aracılığıyla doğrudan ön bahçeye açılıyor; deniz ağaçların arasından süzülüyor. Jakuzi küvet uzun akşamlara davet ediyor. Dışarı çıkmak kadar içeride kalmak için de tasarlanmış bir oda.',
      room3_name: 'Deluxe', room3_desc: 'Bir konut kadar ferah, bir sığınak kadar samimi. Deluxe, jakuzi<br>ve şömineyi bahçeye bakan geniş bir terasla buluşturuyor. Dekorasyonun büyük kısmını üstlenen Akdeniz ışığı ile sakin bir<br>konfor kompozisyonu.',
      room4_name: 'Göl Evi', room4_desc: 'Tesisin geri kalanından ayrı konumlanan müstakil bir oda; terasın ötesinde bir gölet uzanıyor. Yüzeyi bahçenin ışığını, aydınlık gecelerde ise ayı ikiye katlıyor. Şömineli iç mekan, mahremiyetini mimarinin içine işlemiş olanlar için kendi başına yeten bir dünya tamamlıyor.',
      room5_name: 'Antik Oda', room5_desc: 'Merkezde pirinç bir karyola; etrafında onlarca yılda özenle toplanmış antika mobilyalar ve zamanın ağırlığını taşıyan objeler. Bahçenin tamamen size ait hissettirdiği sessiz bir köşeye sığınmış, derin bir durgunluğa açılan terasla birleşiyor. Burada hiçbir şey dün gelmiş gibi görünmüyor.',
      room6_name: 'Standart Oda', room6_desc: 'Sade çizgiler, çift kişilik yatak ve bahçe manzaralı özel teras. İhtiyacınız olan her şey var, araya giren hiçbir şey yok. Sadelik ile cömertliğin zıt olmadığını kanıtlayan bir oda.',
      room_discover: 'Keşfet →',
      view_garden: 'BAHÇE MANZARASI', view_lake: 'GÖL MANZARASI',
      feature_title: 'Akdeniz\'de Bir Yaz',
      feature_p1: 'Haziran\'da günler uzar, deniz ısınır ve zaman farklı akmaya başlar. Çıralı\'da sabahlar erken, sessiz ve parlaktır. Sis vadiden çekilirken sahil boştur; ilk yüzüş yalnızca sizindir. Öğle sıcağı bahçeye çöktüğünde çardak altında kitap okunur, hamakta uyunur; bir sonraki saate dair hiçbir plan yoktur.',
      feature_p2: 'Akşam yavaş gelir. Güneş Tahtalı\'nın ardına düşerken deniz renk değiştirir. Ateş yakılır, sohbet açılır. Burada Akdeniz\'i hissetmek için denize girmek şart değil; sadece oturmak, dinlemek yeterlidir. Bir yazı bu kadar tam kılan başka pek az yer vardır.',
      rooms_page_intro: 'On yedi oda, her biri kendi karakteriyle, kendi manzarasıyla ve arazinin ritmiyle şekillenmiş. Bazıları suyun kenarında, bazıları bahçenin derinliğinde. Hepsi aynı özeni taşır.',
      rooms_includes_label: 'Her Odada',
      rooms_include_breakfast: 'Kahvaltı Dahil',
      rooms_include_wifi: 'Ücretsiz Wi-Fi',
      rooms_include_ac: 'Klima',
      rooms_include_terrace: 'Özel Teras',
      nature_label: 'Bahçe, Deniz, Doğa',
      nature_heading: 'Doğa zaten mükemmel; ona saygı duy, onu dinle ve onunla birlikte yarat.',
      nature_p1: 'Olympos Lodge, bu yerin kendisinden öğrendi. Her yapı, arazinin izin verdiği yere saygıyla yerleştirildi; ağaçların arasına değil, ağaçlarla birlikte. Kökler yerinde kaldı, taşlar bozulmadı. Burada doğa bir arka plan değil, asıl mimardır.',
      nature_p2: 'Gece, ışık kirliliğinden uzak bu kıyıda gökyüzü nadiren görülen bir berraklıkla açılır. Sabah, deniz kokusu ormanın sesiyle iç içe geçer. Çıralı\'nın deresi sessizce denize karışır; bir an için, dünyanın geri kalanının ne kadar gürültülü olduğunu anlarsınız.',
      exp_label: 'Deneyim', exp_heading: 'Her an, bir keşif.',
      spa_title: 'Spa & Dinlenme', spa_desc: 'Bahçenin kalbinde, taşların arasına yerleştirilmiş bir sauna… Burada sessizlik bir lüks değil, yerin doğal hali.',
      rest_title: 'Restoran', rest_desc: 'Nar ağaçlarının gölgesinde uzayan kahvaltı sofraları, akşamları yıldızların altında deniz meltemi eşliğinde yemekler.',
      exp_discover: 'Keşfet →',
      quote: 'Zaman yavaşlar.<br>Hayat hafifler.<br>Ve doğa sessizce yanınıza oturur.',
      voices_label: 'Misafir Defteri', voices_heading: 'Hatıralar, kelimelerle.',
      voice1_text: '"Burada geçirdiğimiz günler, hayatımızda bir durak değil, bir dönüm noktası oldu. Sessizliğin içinde kendimizi yeniden bulduk."',
      voice1_author: 'Bir misafir, 2024',
      voice2_text: '"Sabah kuş sesleriyle uyanmak, akşam yıldızların altında yürümek… Olympos Lodge sadece bir tatil değil, bir hatırlama."',
      voice2_author: 'Bir misafir, 2024',
      voice3_text: '"Bu bahçede yürürken, zamanın gerçekten durduğunu hissettim. Her köşede huzur, her detayda özen."',
      voice3_author: 'Bir misafir, 2023',
      gallery_label: 'Galeri', gallery_heading: 'Bir bakış.',
      footer_tagline: 'Çıralı\'nın kutsal kıyılarında, doğayla uyum içinde.',
      footer_contact_title: 'İletişim', footer_explore_title: 'Keşfet', footer_follow_title: 'Bizi Takip Edin',
      footer_nature_link: 'Bahçe & Doğa',
      footer_address: 'Çıralı, Ulupınar Mahallesi<br>Kemer / Antalya, Türkiye',
      footer_copyright: '© 2025 Olympos Lodge. Tüm hakları saklıdır.',
      footer_terms: 'Ön Bilgilendirme Formu',
      footer_privacy: 'Gizlilik ve KVKK Bilgilendirme',
      c_intro_title: 'Başka Bir Kıyı: Çıralı',
      c_intro_p1: 'Türkiye\'nin güney kıyısında, Toros dağlarının denize kavuştuğu noktada küçük bir vadi uzanır. Çıralı, 1990\'lardan bu yana kıyı koruma statüsüyle güvence altına alınmış, yapılaşmanın sınırlandırıldığı nadir yerleşimlerden biridir; bu yüzden burada yüksek oteller, beton rıhtımlar ya da kalabalık sahil şeritleri göremezsiniz. 3,5 kilometre uzunluğundaki plaj, Caretta caretta deniz kaplumbağaları için her yıl yuvalamanın sürdüğü alan olarak uluslararası koruma statüsü taşımaktadır.',
      c_intro_p2: 'Çıralı\'nın arka planı, yerleşim kadar eskidir. MÖ 2. yüzyılda kurulmuş Antik Olympos kenti, otelin hemen bitişiğinde, Likya Birliği\'nin önemli liman şehirlerinden biriydi; bugün Roma dönemi mezarları ve tiyatro kalıntıları vadinin içine karışmış durumdadır. Birkaç kilometre ötede, Yanartaş\'ta yeraltından sızan doğal gazın 2.500 yıldır yakıp tuttuğu alevler Homeros\'un Chimaera efsanesine ilham kaynağı olmuştur. Çıralı, mitoloji, tarih ve doğanın bu kadar iç içe geçtiği ender yerlerden biridir.',
      c_ch1_cat: 'Plaj', c_ch1_title: '3,5 km\'lik Dokunulmamış Kıyı',
      c_ch1_lead: 'Yaklaşık 3,5 kilometre uzunluğunda, ince çakıl ve kumdan oluşan el değmemiş bir Akdeniz kıyısı. Kıyı şeridinin tamamı doğal sit alanı; oteller ve restoranlar beachfront\'a inşa edilemez. Her yıl Mayıs\'tan Ekim\'e kadar Caretta caretta deniz kaplumbağaları bu plajda yumurtalar.',
      c_ch1_f1: '<span>Mesafe</span><strong>30 m · 1 dk</strong>', c_ch1_f2: '<span>Uzunluk</span><strong>~3,5 km</strong>',
      c_ch1_f3: '<span>Statü</span><strong>Doğal sit, Caretta koruma bölgesi</strong>', c_ch1_f4: '<span>Kaplumbağa Sezonu</span><strong>Mayıs – Ekim</strong>',
      c_ch2_cat: 'Arkeoloji', c_ch2_title: 'Olympos Antik Kenti',
      c_ch2_lead: 'Lodge\'un ismini aldığı antik kent, otelin hemen bitişiğindedir; bahçeden çıkıp on dakika yürüdüğünüzde Likya\'nın en iyi korunmuş kentlerinden birinin içindesinizdir. Roma döneminden kalma mezarlar, tiyatro kalıntıları ve denize uzanan surlar.',
      c_ch2_f1: '<span>Mesafe</span><strong>800 m · 10 dk</strong>', c_ch2_f2: '<span>Dönem</span><strong>Likya, Roma, Bizans</strong>',
      c_ch2_f3: '<span>En İyi Zaman</span><strong>Sabah erken, akşam geç</strong>', c_ch2_f4: '<span>Giriş</span><strong>Ücretli</strong>',
      c_ch3_cat: 'Doğa', c_ch3_title: 'Yanartaş: Sönmeyen Alevler',
      c_ch3_lead: 'Yeraltından sızan doğal gazın yüzeyde tutuşmasıyla oluşan, 2.500 yıldır kesintisiz yanan alevler. Mitolojide Chimaera canavarının nefesidir. Gece yürüyüşü önerilir; karanlıkta kayalar arasından çıkan alevler zaman kavramını askıya alır.',
      c_ch3_f1: '<span>Mesafe</span><strong>3,5 km · 10 dk arabayla</strong>', c_ch3_f2: '<span>En İyi Zaman</span><strong>Gün batımından sonra</strong>',
      c_ch3_f3: '<span>Süre</span><strong>~2–3 saat (gidiş-dönüş)</strong>', c_ch3_f4: '<span>Yanınıza Alın</span><strong>El feneri, sağlam ayakkabı</strong>',
      c_ch4_cat: 'Yürüyüş', c_ch4_title: 'Likya Yolu',
      c_ch4_lead: 'The Sunday Times\'ın dünyanın en iyi on yürüyüş rotasından biri seçtiği 540 kilometrelik patika, Çıralı\'dan geçer. Antik kentler, Likya mezarları, ıssız koylar ve dağ köyleri birbirini izler. Çıralı bölümü Olympos–Adrasan hattını kapsar.',
      c_ch4_f1: '<span>Toplam Uzunluk</span><strong>540 km</strong>', c_ch4_f2: '<span>Çıralı Bölümü</span><strong>Olympos – Adrasan</strong>',
      c_ch4_f3: '<span>Zorluk</span><strong>Orta – Zor</strong>', c_ch4_f4: '<span>Sezon</span><strong>Nis – Haz, Eyl – Kas</strong>',
      c_pullquote: 'Bazı yerler sizi değiştirmez. Sadece kendinizi hatırlatır.',
      c_act_label: 'Aktiviteler',
      c_tekne_label: 'Deniz', c_tekne_title: 'Tekne Turu',
      c_tekne_desc: 'Olympos koyları, Adrasan ve çevre adacıklar arasında günübirlik mavi tur. Berrak sularda yüzme molaları, ıssız koy sığınakları, açık denizin sessizliği.',
      c_tekne_f1: '<span>Süre</span><strong>Tam gün</strong>', c_tekne_f2: '<span>Güzergah</span><strong>Olympos – Adrasan koyları</strong>', c_tekne_f3: '<span>Organizasyon</span><strong>Konsiyer</strong>',
      c_act1_tag: 'Deniz · Ücretsiz', c_act1_title: 'Yüzme & Şnorkel',
      c_act1_desc: 'Caretta caretta plajında Akdeniz\'in berrak sularında yüzme. Şnorkel ekipmanı otel tarafından sağlanır.',
      c_act2_tag: 'Deniz · Ücretsiz', c_act2_title: 'Kano & SUP',
      c_act2_desc: 'Konaklayan misafirlere kano ve SUP (stand-up paddleboard) kullanımı ücretsiz olarak sunulur.',
      c_act3_tag: 'Deniz · Ücretli', c_act3_title: 'Dalış',
      c_act3_desc: 'Mevsimsel olarak üçüncü taraf operatör aracılığıyla düzenlenir. Detaylar resepsiyondan alınabilir.',
      c_act4_tag: 'Keşif · Ücretsiz', c_act4_title: 'Bisiklet Turu',
      c_act4_desc: 'Konaklayan misafirlere bisiklet ücretsiz sunulur. Çıralı vadisi boyunca ideal güzergahlar mevcuttur.',
      c_tahtali_label: 'Panorama', c_tahtali_title: 'Tahtalı Teleferik',
      c_tahtali_desc: '2.365 metre zirveye çıkış. Akdeniz\'in ve Çıralı vadisinin kuş bakışı panoramik görünümü. Dünyanın en uzun tek geçişli teleferiklerinden biri.',
      c_tahtali_f1: '<span>Mesafe</span><strong>15 km</strong>', c_tahtali_f2: '<span>Zirve</span><strong>2.365 m</strong>', c_tahtali_f3: '<span>Sezon</span><strong>Nisan – Kasım</strong>',
      c_nearby_label: 'Çıralı\'nın Ötesi',
      c_nearby1_title: 'Ulupınar', c_nearby1_desc: 'Dağ kaynağından beslenen çay restoranları. Alabalık ve doğal serinlik.',
      c_nearby2_title: 'Tahtalı Teleferik', c_nearby2_desc: '2.365 metre zirveye çıkış. Akdeniz, Çıralı ve Kemer\'in panoramik görünümü.',
      c_nearby3_title: 'Phaselis', c_nearby3_desc: 'Üç limanıyla eşsiz konumda Likya-Roma kenti. Denize uzanan kalıntılar arasında yüzmek mümkün.',
      c_nearby4_title: 'Kemer', c_nearby4_desc: 'Pazarlar, eczaneler, bankalar ve marina için en yakın ilçe merkezi.',
      c_nearby5_title: 'Antalya', c_nearby5_desc: 'Tarihi Kaleiçi, müzeler ve uluslararası uçuşlar için Antalya Havalimanı (AYT).',
      c_cta_quote: 'Çıralı; plajıyla, harabeleriyle, alevleriyle ve korunan sessizliğiyle, Türkiye\'de başka yerde bulunması giderek zorlaşan bir şeydir.',
      c_cta_rooms: 'Odalar',
      loc_page_title: 'Konum',
      loc_intro_title: 'Vadinin Denizle Buluştuğu Yer',
      loc_intro_body: 'Torosların denizle buluştuğu korunaklı bir vadinin ucunda yer alan Olympos Lodge, Türkiye\'nin en sessiz ve sıra dışı kıyılarından birindedir. Çıralı, farklı bir yer. Yüksek binalar yok, plaj kulüpleri yok, gürültü yok. Sadece uzun ve doğal bir koy, yürüyerek ulaşabileceğiniz antik kalıntılar ve binlerce yıldır yamaçlardan yükselen Yanartaş\'ın mitolojik alevleri. Yüzmek, yürümek ya da sadece dinlenmek için geliyor olun; vadi sizi içine alır.',
      loc_lead: 'Çıralı\'ya ulaşmak, tatile başladığınız andır. Vadiye girdiğinizde şehri geride bıraktığınızı hissedersiniz.',
      loc_method_car_title: 'Araçla',
      loc_method_car_body: 'Antalya Havalimanı\'ndan yaklaşık 1,5 saat. D400\'den Ulupınar tabelasını takip edin. Vadiye girişten sonraki 7 km, ormanın içinden geçen güzel bir sürüş.',
      loc_method_car_note: 'Ücretsiz otopark tesis içindedir.',
      loc_method_fly_title: 'Uçakla',
      loc_method_fly_body: 'En yakın havalimanı Antalya (AYT), yaklaşık 90 km mesafede. İstanbul, Ankara ve pek çok Avrupa şehrinden doğrudan sefer mevcuttur.',
      loc_method_fly_note: 'Transfer için bize ulaşın.',
      loc_method_transfer_title: 'Otel Transferi',
      loc_method_transfer_body: 'Antalya Havalimanı\'ndan özel araç ile kapıdan kapıya transfer. Varış saatinizi iletmeniz yeterlidir; gerisini biz hallederiz.',
      loc_dist_walking: 'yürüyüş mesafesi',
      loc_cta_title: 'Buraya varmak, tatile başlamaktır.',
      loc_cta_sub: 'Transfer rezervasyonu veya yol tarifi için bize yazabilirsiniz. Gerisini biz hallederiz.',
      loc_cta_contact: 'İletişime Geç',
      loc_teaser_title: 'Bulunması Zor,\nBırakılması Daha Zor.',
      loc_teaser_body: 'Torosların eteklerinden inen bir vadinin ucunda, sessiz bir kıyıda. Antik kalıntılar, yanmaya devam eden efsanevi alevler ve masmavi bir deniz.',
      loc_teaser_cta: 'Keşfet →',
      loc_exp_title: 'Deneyimler',
      loc_exp_body: 'Yanartaş\'ın efsanevi alevleri, Olympos antik kenti kalıntıları, Chimaera yürüyüşü, Akdeniz\'de kano ve yüzme. Çıralı\'da her gün kendi ritmiyle şekillenir.',
      loc_exp_cta: 'Keşfet →',
      nav_lodge_tab: 'Konaklamada',
      lodge_hero_title: 'Olympos Lodge\'da',
      lodge_intro_title: 'Köyde Bir Günün Ritmi',
      lodge_intro_p1: 'Olympos Lodge\'da bir gün çok az şeyden oluşur: sabah güneşi, taze bir kahvaltı, plaja yürüyüş. Bahçede havalanmak, akşam ateşinin etrafında oturmak. Sunduğumuz her şey bu ritmi tamamlamak için tasarlandı.',
      lodge_spa_label: 'Spa & Dinlenme',
      lodge_spa_title: 'Spa: Jakuzi, Sauna & Buhar Odası',
      lodge_spa_desc: 'Jakuzi (6 kişilik), sauna ve buhar odası misafirlere konaklama kapsamında ücretsiz sunulmaktadır. Masaj servisi ek ücretle mevcuttur; en az 2 saat önceden rezervasyon yapılması gerekmektedir.',
      lodge_spa_f1: '<span>Durum</span><strong>Konaklamaya dahil</strong>',
      lodge_spa_f2: '<span>Kapasite</span><strong>Jakuzi: 6 kişi</strong>',
      lodge_spa_f3: '<span>Masaj</span><strong>Ek ücret, rezervasyon gerekli</strong>',
      lodge_beach_label: 'Plaj',
      lodge_beach_title: 'Loca & Şezlong',
      lodge_beach_desc: '30 metre mesafedeki plajda özel şezlong, şemsiye, havlu ve kabana misafirlere ücretsiz olarak ayrılmaktadır. Caretta caretta deniz kaplumbağalarının yuvalaması nedeniyle korunan kıyı şeridine yürüyerek ulaşabilirsiniz.',
      lodge_beach_f1: '<span>Mesafe</span><strong>30 m</strong>',
      lodge_beach_f2: '<span>Dahil</span><strong>Şezlong, şemsiye, havlu, kabana</strong>',
      lodge_beach_f3: '<span>Statü</span><strong>Korunan kıyı, Caretta bölgesi</strong>',
      lodge_garden_label: 'Bahçe & Doğa',
      lodge_garden_title: '20.000 m² Tematik Bahçe',
      lodge_garden_desc: 'Otelin geniş bahçesi meyve ağaçları, doğal bitkiler ve tematik alanlarla kaplıdır. Hamaklar, bahçe mobilyaları ve sessiz köşeler günün her saatinde keşfedilmeyi bekler.',
      lodge_act_label: 'Aktiviteler',
      lodge_act1_tag: 'Deniz · Ücretsiz', lodge_act1_title: 'Kano & SUP',
      lodge_act1_desc: 'Kano ve SUP (stand-up paddleboard) konaklayan misafirlere ücretsiz sunulur.',
      lodge_act2_tag: 'Keşif · Ücretsiz', lodge_act2_title: 'Bisiklet',
      lodge_act2_desc: 'Çıralı vadisini keşfetmek için bisikletler ücretsiz olarak kullanılabilir.',
      lodge_act3_tag: 'Deniz · Ücretsiz', lodge_act3_title: 'Şnorkel Ekipmanı',
      lodge_act3_desc: 'Şnorkel ekipmanı konuklara ücretsiz sağlanmaktadır.',
      lodge_act4_tag: 'Ekstra · Ücretli', lodge_act4_title: 'Araç Şarjı',
      lodge_act4_desc: 'Tesiste elektrikli araç şarj istasyonu bulunmaktadır.',
      lodge_firepit_label: 'Akşamlar',
      lodge_firepit_title: 'Ateş & Kütüphane',
      lodge_firepit_desc: 'Geceleri bahçedeki ateş çukurunda (fire pit) oturmak, Olympos Lodge\'un en sade ve en derin anlarından biridir. Kütüphane, sakin bir öğle ya da akşamın geri kalanı için güvenli bir limandır.',
      lodge_firepit_f1: '<span>Ateş</span><strong>Akşamları aktif</strong>',
      lodge_firepit_f2: '<span>Kütüphane</span><strong>Her zaman açık</strong>',
      spa_hero_title: 'Spa',
      spa_intro_title: 'Sessizlik İçin Bir Alan',
      spa_intro_p1: 'Olympos Lodge\'un spa alanı gösteriş için tasarlanmadı. Burada amaç sadece yavaşlamak: suyun sıcaklığında, buharda, sessizlikte. Jakuzi, sauna ve buhar odası konaklama kapsamında tüm misafirlere açıktır.',
      spa_intro_p2: 'Masaj hizmetleri ek ücretle sunulmaktadır. Rezervasyon için resepsiyona başvurunuz ya da check-in\'den en az 2 saat önce bize ulaşınız.',
      spa_jac_label: 'Jakuzi',
      spa_jac_title: '6 Kişilik Jakuzi',
      spa_jac_desc: 'Kasları gevşeten sıcak su jetleri. Altı kişilik kapasitesiyle hem bireysel hem de grup kullanımına uygundur. Konaklama kapsamında ücretsiz olarak sunulmaktadır.',
      spa_jac_f1: '<span>Kapasite</span><strong>6 kişi</strong>',
      spa_jac_f2: '<span>Dahil</span><strong>Konaklamaya dahil</strong>',
      spa_sauna_label: 'Sauna',
      spa_sauna_title: 'Kuru Sauna',
      spa_sauna_desc: 'Geleneksel kuru sauna. Dolaşımı canlandırır, kasları gevşetir ve zihinsel dinginlik sağlar.',
      spa_sauna_f1: '<span>Tür</span><strong>Kuru sauna</strong>',
      spa_sauna_f2: '<span>Dahil</span><strong>Konaklamaya dahil</strong>',
      spa_steam_label: 'Buhar Odası',
      spa_steam_title: 'Buhar Odası',
      spa_steam_desc: 'Islak buhar ortamında derin bir nefes alma ritüeli. Nemi yoğun, sıcaklığı sarmaleyici.',
      spa_steam_f1: '<span>Tür</span><strong>Islak buhar</strong>',
      spa_steam_f2: '<span>Dahil</span><strong>Konaklamaya dahil</strong>',
      spa_massage_label: 'Masaj',
      spa_massage_title: 'Masaj Servisi',
      spa_massage_desc: 'Talep üzerine sunulan masaj servisi ek ücrete tabidir. Rezervasyon için lütfen check-in\'den en az 2 saat önce resepsiyona başvurunuz ya da bize yazınız.',
      spa_massage_f1: '<span>Ücret</span><strong>Ek ücretli</strong>',
      spa_massage_f2: '<span>Rezervasyon</span><strong>En az 2 saat önceden</strong>',
      spa_cta: 'Rezervasyon'
    },
    en: {
      btn_reserve: 'Reserve',
      nav_home: 'Home', nav_story: 'Our Story', nav_rooms: 'Rooms',
      nav_nature: 'Nature', nav_experience: 'Experience', nav_gallery: 'Gallery', nav_contact: 'Contact', nav_experiences: 'Experiences', nav_location: 'Location', loc_hero_title: 'Getting Here',
      nav_cirali_tab: 'Çıralı', nav_activities_tab: 'Activities',
      hero_title: 'Time flows<br>differently here.',
      hero_subtitle: 'Noise softens, senses awaken.<br>Nature makes itself heard.',
      conviction_sentence: 'A place stripped of the unnecessary becomes something finer.',
      intro_title: 'Olympos Lodge: An Intimate Retreat on the Lycian Coast',
      intro_label: 'About',
      intro_p1: 'Where a green valley opens onto the sea, time moves differently. Olympos Lodge has stood here since 1985, built on the conviction that a place stripped of the unnecessary becomes something finer. What remains is unhurried: a garden, a shore, the kind of silence that asks nothing of you.',
      intro_p2: 'Seventeen rooms among 20,000 square metres of garden, steps from one of the Mediterranean\'s most unspoiled beaches. A short walk from the ancient city that lends this coast its name. The garden, the beach, the restaurant: all of it exclusively for guests.',
      intro_p4: 'Days here unfold without agenda. Claim a cabana on the beach and let the morning pass. Take out a canoe and explore the coastline at your own pace, or have the concierge arrange a boat tour for something further. The front garden is the kind of place where a yoga mat or a book both make equal sense. Bicycles are there to explore Çıralı village and the roads beyond.',
      intro_p6: 'In the evening, firepits are lit: a place to gather, pour a drink, and let the conversation find its own current. And when the day asks for nothing at all, the private spa is there: jacuzzi, sauna, steam room, entirely yours.',
      story_section_title: 'Our Story & Philosophy',
      about_label: 'Our Story',
      about_heading: 'Years ago, a man arrived at one of the Mediterranean\'s most untouched shores.',
      about_p1: 'He found his way here through an emerald valley. The beauty he encountered along the road allowed him to quietly set down his burdens. At the point where the valley meets the sea through a stream, time stopped with him.',
      about_p2: 'From that moment, a dream began. A dream that continues today, still being shared.',
      about_p3: 'Olympos Lodge was born from that dream. Seventeen rooms set in harmony with nature across 20,000 m² of garden. Each furnished with understated elegance: clean, light-filled, and liveable in every season.',
      rooms_label: 'Rooms', rooms_heading: 'Same garden,<br>different world.',
      room1_name: 'Aqua Super Deluxe', room1_desc: 'The most singular room on the grounds, set apart in its own detached structure at the garden\'s edge. An indoor waterfall wall and a line of glass floor panels revealing water beneath your feet set the tone. The boundary between architecture and nature all but disappears.',
      room2_name: 'Super Deluxe', room2_desc: 'Generous in every dimension, the Super Deluxe opens directly onto the front garden through a broad private terrace where the sea threads between the trees. The jacuzzi bathtub invites long evenings. This is a room designed for staying in as much as stepping out.',
      room3_name: 'Deluxe', room3_desc: 'Spacious enough to feel like a residence, intimate enough to feel like a hideaway. The Deluxe pairs a jacuzzi and fireplace with a large terrace overlooking the garden. A quiet composition of comfort where Mediterranean light does most of the decorating.',
      room4_name: 'Lake House', room4_desc: 'A detached cottage set apart from the rest of the property, with a pond stretching beyond the terrace. Its surface doubles the garden\'s light and, on bright nights, the moon. The fireplace-warmed interior completes a self-contained world, ideal for those who prefer their privacy built into the architecture.',
      room5_name: 'Antique Room', room5_desc: 'A brass bed at the centre, surrounded by decades of carefully gathered antique furniture and objects that carry the weight of time. Tucked into a quiet corner where the garden feels entirely your own, paired with a terrace that opens onto deep stillness. Nothing here looks like it arrived yesterday.',
      room6_name: 'Standard Room', room6_desc: 'Clean lines, a queen bed, and a private terrace with garden view. Everything you need and nothing that gets in the way. This is a room that proves simplicity and generosity are not opposites.',
      room_discover: 'Discover →',
      view_garden: 'GARDEN VIEW', view_lake: 'LAKE VIEW',
      feature_title: 'Summer by the Mediterranean',
      feature_p1: 'In June, the days lengthen, the sea warms, and time begins to move differently. Mornings in Çıralı are early, quiet, and bright. While the mist retreats from the hills, the beach is empty; that first swim is entirely yours. When the midday heat settles over the garden, you read in the shade, drift off in a hammock, with no plan for the next hour.',
      feature_p2: 'Evening comes slowly. As the sun drops behind Tahtalı, the sea changes colour. The fire is lit, conversation opens. Here, you do not need to be in the water to feel the Mediterranean; sitting still and listening is enough. Few places make a summer feel this complete.',
      rooms_page_intro: 'Seventeen rooms, each shaped by its own character, its own view, its own relationship with the land. Some sit at the water\'s edge, some within the depth of the garden. All share the same care.',
      rooms_includes_label: 'In Every Room',
      rooms_include_breakfast: 'Breakfast Included',
      rooms_include_wifi: 'Free Wi-Fi',
      rooms_include_ac: 'Air Conditioning',
      rooms_include_terrace: 'Private Terrace',
      nature_label: 'Garden, Sea, Nature',
      nature_heading: 'Nature is already perfect; respect it, listen to it, and create alongside it.',
      nature_p1: 'Olympos Lodge learned from the place itself. Every structure was placed with care for what was already here, not carved between trees, but settled where the land allowed. Roots stayed intact, stones undisturbed. Here, nature is not a backdrop. It is the architect.',
      nature_p2: 'At night, far from any light pollution, the sky opens with rare clarity. In the morning, the scent of the sea weaves through the sounds of the forest. The stream of Çıralı quietly finds its way to the sea, and for a moment, you understand just how loud the rest of the world really is.',
      exp_label: 'Experience', exp_heading: 'Every moment, a discovery.',
      spa_title: 'Spa & Relaxation', spa_desc: 'A sauna nestled among stones at the heart of the garden… Here silence is not a luxury, but the natural state of the place.',
      rest_title: 'Restaurant', rest_desc: 'Breakfast tables stretching under pomegranate trees, evening meals beneath the stars with a sea breeze.',
      exp_discover: 'Discover →',
      quote: 'Time slows.<br>Life becomes lighter.<br>And nature quietly takes a seat beside you.',
      voices_label: 'Guest Book', voices_heading: 'Memories, in words.',
      voice1_text: '"The days we spent here were not a pause in our lives, but a turning point. In the silence, we found ourselves again."',
      voice1_author: 'A guest, 2024',
      voice2_text: '"Waking to birdsong in the morning, walking under the stars at night… Olympos Lodge is not just a holiday, but a remembering."',
      voice2_author: 'A guest, 2024',
      voice3_text: '"Walking through this garden, I truly felt time stop. Peace in every corner, care in every detail."',
      voice3_author: 'A guest, 2023',
      gallery_label: 'Gallery', gallery_heading: 'A glimpse.',
      footer_tagline: 'On the sacred shores of Çıralı, in harmony with nature.',
      footer_contact_title: 'Contact', footer_explore_title: 'Explore', footer_follow_title: 'Follow Us',
      footer_nature_link: 'Garden & Nature',
      footer_address: 'Çıralı, Ulupınar Mahallesi<br>Kemer / Antalya, Turkey',
      footer_copyright: '© 2025 Olympos Lodge. All rights reserved.',
      footer_terms: 'Preliminary Information Form',
      footer_privacy: 'Privacy & KVKK Notice',
      c_intro_title: 'A Coast Apart: Çıralı',
      c_intro_p1: 'On Turkey\'s southern coast, where the Taurus mountains meet the sea, a small valley unfolds. Çıralı has been under coastal protection since the 1990s, one of the rare settlements where development is restricted — no high-rise hotels, no concrete piers, no crowded shorelines. The 3.5-kilometre beach holds international protection status as an active nesting ground for Caretta caretta sea turtles.',
      c_intro_p2: 'The valley\'s past runs as deep as its present. Founded in the 2nd century BC, the ancient city of Olympos — which lends the lodge its name — was once a key port of the Lycian League; today, Roman-era tombs and theatre ruins are woven into the landscape beside us. A few kilometres inland, at Yanartaş, natural gas seeping from the earth has burned continuously for 2,500 years and is said to have inspired Homer\'s legend of the Chimaera. Çıralı is one of the few places where mythology, history, and nature remain this inseparably entwined.',
      c_ch1_cat: 'Beach', c_ch1_title: '3.5 km of Untouched Shore',
      c_ch1_lead: 'A pristine Mediterranean shoreline of fine pebble and sand, stretching approximately 3.5 kilometres. The entire coastal strip is a protected natural area — hotels and restaurants cannot be built on the beachfront. Each year from May to October, Caretta caretta sea turtles nest along this shore.',
      c_ch1_f1: '<span>Distance</span><strong>30 m · 1 min</strong>', c_ch1_f2: '<span>Length</span><strong>~3.5 km</strong>',
      c_ch1_f3: '<span>Status</span><strong>Protected area, Caretta nesting zone</strong>', c_ch1_f4: '<span>Turtle Season</span><strong>May – October</strong>',
      c_ch2_cat: 'Archaeology', c_ch2_title: 'Ancient City of Olympos',
      c_ch2_lead: 'The ancient city that lends the lodge its name lies directly beside us — step through the garden and walk ten minutes to find yourself inside one of Lycia\'s best-preserved cities. Roman-era tombs, theatre ruins, and walls that reach toward the sea.',
      c_ch2_f1: '<span>Distance</span><strong>800 m · 10 min</strong>', c_ch2_f2: '<span>Period</span><strong>Lycian, Roman, Byzantine</strong>',
      c_ch2_f3: '<span>Best Time</span><strong>Early morning, late afternoon</strong>', c_ch2_f4: '<span>Admission</span><strong>Paid</strong>',
      c_ch3_cat: 'Nature', c_ch3_title: 'Yanartaş: The Eternal Flames',
      c_ch3_lead: 'Natural gas seeping from the earth ignites at the surface, burning without interruption for 2,500 years. In mythology, this was the breath of the Chimaera. A night hike is recommended — flames rising between rocks in the dark suspend all sense of time.',
      c_ch3_f1: '<span>Distance</span><strong>3.5 km · 10 min by car</strong>', c_ch3_f2: '<span>Best Time</span><strong>After sunset</strong>',
      c_ch3_f3: '<span>Duration</span><strong>~2–3 hours (round trip)</strong>', c_ch3_f4: '<span>Bring Along</span><strong>Torch, sturdy shoes</strong>',
      c_ch4_cat: 'Hiking', c_ch4_title: 'Lycian Way',
      c_ch4_lead: 'Named one of the world\'s ten finest walking routes by The Sunday Times, this 540-kilometre trail passes through Çıralı. Ancient cities, Lycian tombs, remote coves, and mountain villages follow one another in turn. The Çıralı section covers the Olympos–Adrasan stretch.',
      c_ch4_f1: '<span>Total Length</span><strong>540 km</strong>', c_ch4_f2: '<span>Çıralı Section</span><strong>Olympos – Adrasan</strong>',
      c_ch4_f3: '<span>Difficulty</span><strong>Moderate – Difficult</strong>', c_ch4_f4: '<span>Season</span><strong>Apr – Jun, Sep – Nov</strong>',
      c_pullquote: 'Some places do not change you. They simply remind you of yourself.',
      c_act_label: 'Activities',
      c_tekne_label: 'Sea', c_tekne_title: 'Boat Trip',
      c_tekne_desc: 'A full-day blue voyage among the coves of Olympos, Adrasan and the surrounding inlets. Swimming stops in clear water, shelter in secluded bays, the quiet of open sea.',
      c_tekne_f1: '<span>Duration</span><strong>Full day</strong>', c_tekne_f2: '<span>Route</span><strong>Olympos – Adrasan bays</strong>', c_tekne_f3: '<span>Arrangements</span><strong>Concierge</strong>',
      c_act1_tag: 'Sea · Complimentary', c_act1_title: 'Swimming & Snorkelling',
      c_act1_desc: 'Swimming in the clear waters of the Mediterranean on a Caretta caretta beach. Snorkelling equipment is provided by the hotel.',
      c_act2_tag: 'Sea · Complimentary', c_act2_title: 'Canoe & SUP',
      c_act2_desc: 'Canoes and stand-up paddleboards are available to guests at no charge.',
      c_act3_tag: 'Sea · Paid', c_act3_title: 'Diving',
      c_act3_desc: 'Organised seasonally through a third-party operator. Details available at reception.',
      c_act4_tag: 'Explore · Complimentary', c_act4_title: 'Cycling',
      c_act4_desc: 'Bicycles are available to guests at no charge. Ideal routes run the length of the Çıralı valley.',
      c_tahtali_label: 'Panorama', c_tahtali_title: 'Tahtalı Cable Car',
      c_tahtali_desc: 'A ride to the 2,365-metre summit. Panoramic views over the Mediterranean, the Çıralı valley, and the coast. One of the world\'s longest single-span cable cars.',
      c_tahtali_f1: '<span>Distance</span><strong>15 km</strong>', c_tahtali_f2: '<span>Summit</span><strong>2,365 m</strong>', c_tahtali_f3: '<span>Season</span><strong>April – November</strong>',
      c_nearby_label: 'Beyond Çıralı',
      c_nearby1_title: 'Ulupınar', c_nearby1_desc: 'Mountain-spring trout restaurants. Trout and natural cool in a village setting.',
      c_nearby2_title: 'Tahtalı Cable Car', c_nearby2_desc: 'Ascent to 2,365 metres. Panoramic views over the Mediterranean, Çıralı, and Kemer.',
      c_nearby3_title: 'Phaselis', c_nearby3_desc: 'A Lycian-Roman city uniquely positioned between three harbours. Swimming among ruins that reach into the sea.',
      c_nearby4_title: 'Kemer', c_nearby4_desc: 'The nearest town for markets, pharmacies, banks, and a marina.',
      c_nearby5_title: 'Antalya', c_nearby5_desc: 'Historic Kaleiçi, museums, and Antalya Airport (AYT) for international flights.',
      c_cta_quote: 'Çıralı — with its beach, its ruins, its flames, and its protected quiet — is something that is becoming harder to find anywhere else in Turkey.',
      c_cta_rooms: 'Rooms',
      loc_page_title: 'Location',
      loc_intro_title: 'Where the Valley Meets the Sea',
      loc_intro_body: 'Tucked at the end of a protected valley where the Taurus Mountains meet the sea, Olympos Lodge sits within one of Turkey\'s most quietly extraordinary stretches of coastline. Çıralı is a place apart. No high-rises, no beach clubs, no noise. Just a long curve of undeveloped shore, ancient ruins you can walk to, and the mythological flames of the Chimaera burning from the hillside as they have for thousands of years. Whether you come to swim, to hike, to simply do nothing at all, the valley holds you.',
      loc_lead: 'Arriving in Çıralı is where the holiday begins. The moment you enter the valley, you feel the city fall away.',
      loc_method_car_title: 'By Car',
      loc_method_car_body: 'About 1.5 hours from Antalya Airport. Follow the D400 and take the Ulupınar turn-off. The final 7 km through the valley is a scenic drive through the forest.',
      loc_method_car_note: 'Free parking on site.',
      loc_method_fly_title: 'By Plane',
      loc_method_fly_body: 'The nearest airport is Antalya (AYT), approximately 90 km away. Direct flights are available from Istanbul, Ankara and many European cities.',
      loc_method_fly_note: 'Contact us for a transfer.',
      loc_method_transfer_title: 'Hotel Transfer',
      loc_method_transfer_body: 'Private door-to-door transfer from Antalya Airport. Share your arrival time and we will take care of the rest.',
      loc_dist_walking: 'walking distance',
      loc_cta_title: 'Arriving is where the holiday begins.',
      loc_cta_sub: 'Write to us for a transfer or directions. We will handle the rest.',
      loc_cta_contact: 'Get in Touch',
      loc_teaser_title: 'Hard to Find.\nHarder to Leave.',
      loc_teaser_body: 'At the end of a valley where the Taurus Mountains meet the sea. Ancient ruins, mythological flames, and the calm of the Mediterranean.',
      loc_teaser_cta: 'Explore →',
      loc_exp_title: 'Experiences',
      loc_exp_body: 'The mythological flames of the Chimaera, ancient Olympos ruins, coastal hikes, kayaking and swimming in the Mediterranean. Every day in Çıralı unfolds at its own pace.',
      loc_exp_cta: 'Explore →',
      nav_lodge_tab: 'At The Lodge',
      lodge_hero_title: 'At Olympos Lodge',
      lodge_intro_title: 'The Rhythm of a Day at the Lodge',
      lodge_intro_p1: 'A day at Olympos Lodge is made of very little: morning light, a fresh breakfast, the walk to the beach. Time in the garden, the fire at dusk. Everything we offer is designed to complete that rhythm — not to interrupt it.',
      lodge_spa_label: 'Spa & Wellness',
      lodge_spa_title: 'Spa: Jacuzzi, Sauna & Steam Room',
      lodge_spa_desc: 'A 6-person jacuzzi, sauna, and steam room are included in the accommodation rate. Massage treatments are available at an additional fee and must be reserved at least two hours in advance.',
      lodge_spa_f1: '<span>Included</span><strong>In accommodation rate</strong>',
      lodge_spa_f2: '<span>Jacuzzi</span><strong>6 persons</strong>',
      lodge_spa_f3: '<span>Massage</span><strong>Paid, reservation required</strong>',
      lodge_beach_label: 'Beach',
      lodge_beach_title: 'Cabanas & Sun Loungers',
      lodge_beach_desc: 'Sun loungers, umbrellas, towels and a cabana on the beach are reserved for guests at no charge. The shore — 30 metres from the lodge — is a protected Caretta caretta nesting ground.',
      lodge_beach_f1: '<span>Distance</span><strong>30 m</strong>',
      lodge_beach_f2: '<span>Included</span><strong>Lounger, umbrella, towel, cabana</strong>',
      lodge_beach_f3: '<span>Status</span><strong>Protected shore, Caretta zone</strong>',
      lodge_garden_label: 'Garden & Nature',
      lodge_garden_title: '20,000 m² Themed Garden',
      lodge_garden_desc: 'The lodge grounds span 20,000 square metres of terraced gardens, fruit trees, and native plantings. Hammocks, garden furniture, and quiet corners are there to be found at any hour.',
      lodge_act_label: 'Activities',
      lodge_act1_tag: 'Sea · Complimentary', lodge_act1_title: 'Canoe & SUP',
      lodge_act1_desc: 'Canoes and stand-up paddleboards are available to guests at no charge.',
      lodge_act2_tag: 'Explore · Complimentary', lodge_act2_title: 'Cycling',
      lodge_act2_desc: 'Bicycles are complimentary for guests. Ideal routes run the full length of the Çıralı valley.',
      lodge_act3_tag: 'Sea · Complimentary', lodge_act3_title: 'Snorkelling Equipment',
      lodge_act3_desc: 'Snorkelling equipment is provided to guests at no charge.',
      lodge_act4_tag: 'Extra · On Site', lodge_act4_title: 'EV Charging',
      lodge_act4_desc: 'An electric vehicle charging station is available on site.',
      lodge_firepit_label: 'Evenings',
      lodge_firepit_title: 'Fire Pit & Library',
      lodge_firepit_desc: 'Evenings at the fire pit in the garden are among the lodge\'s quietest and most enduring pleasures. The library is a reliable refuge for a slow afternoon or the end of a long day.',
      lodge_firepit_f1: '<span>Fire Pit</span><strong>Active evenings</strong>',
      lodge_firepit_f2: '<span>Library</span><strong>Always open</strong>',
      spa_hero_title: 'Spa',
      spa_intro_title: 'A Space for Stillness',
      spa_intro_p1: 'The spa at Olympos Lodge was not designed to impress. It was designed for one thing: slowing down. In the warmth of the water, in steam, in quiet. The jacuzzi, sauna and steam room are open to all guests as part of their stay.',
      spa_intro_p2: 'Massage treatments are available at an additional fee. Please contact reception or reach out to us at least 2 hours before your preferred time.',
      spa_jac_label: 'Jacuzzi',
      spa_jac_title: '6-Person Jacuzzi',
      spa_jac_desc: 'Hot water jets for deep muscle relaxation. Accommodates up to six guests, suited for both individual and group use. Included in the accommodation rate.',
      spa_jac_f1: '<span>Capacity</span><strong>6 persons</strong>',
      spa_jac_f2: '<span>Included</span><strong>In accommodation rate</strong>',
      spa_sauna_label: 'Sauna',
      spa_sauna_title: 'Dry Sauna',
      spa_sauna_desc: 'A traditional dry sauna. Stimulates circulation, relaxes muscles, and settles the mind.',
      spa_sauna_f1: '<span>Type</span><strong>Dry sauna</strong>',
      spa_sauna_f2: '<span>Included</span><strong>In accommodation rate</strong>',
      spa_steam_label: 'Steam Room',
      spa_steam_title: 'Steam Room',
      spa_steam_desc: 'A deep-breathing ritual in warm, enveloping steam. Dense humidity, steady heat.',
      spa_steam_f1: '<span>Type</span><strong>Wet steam</strong>',
      spa_steam_f2: '<span>Included</span><strong>In accommodation rate</strong>',
      spa_massage_label: 'Massage',
      spa_massage_title: 'Massage Service',
      spa_massage_desc: 'Massage treatments are available on request at an additional fee. Please contact reception or write to us at least 2 hours before your preferred time.',
      spa_massage_f1: '<span>Fee</span><strong>Additional charge</strong>',
      spa_massage_f2: '<span>Reservation</span><strong>At least 2 hours in advance</strong>',
      spa_cta: 'Reserve'
    },
    de: {
      btn_reserve: 'Reservieren',
      nav_home: 'Startseite', nav_story: 'Unsere Geschichte', nav_rooms: 'Zimmer',
      nav_nature: 'Natur', nav_experience: 'Erlebnis', nav_gallery: 'Galerie', nav_contact: 'Kontakt', nav_experiences: 'Erlebnisse', nav_location: 'Lage', loc_hero_title: 'Anreise',
      nav_cirali_tab: 'Çıralı', nav_activities_tab: 'Aktivitäten',
      hero_title: 'Die Zeit fließt<br>hier anders.',
      hero_subtitle: 'Der Lärm verstummt, die Sinne erwachen.<br>Die Natur macht sich hörbar.',
      conviction_sentence: 'Ein Ort, dem das Unnötige genommen wurde, wird zu etwas Feinerem.',
      intro_title: 'Olympos Lodge: Ein Intimes Refugium an der Lykischen Küste',
      intro_label: 'Über uns',
      intro_p1: 'Wo ein grünes Tal auf das Meer trifft, vergeht die Zeit anders. Olympos Lodge steht hier seit 1985, gegründet auf die Überzeugung, dass ein Ort, dem alles Überflüssige genommen wurde, zu etwas Feinerem wird. Was bleibt, ist ungehetzt: ein Garten, eine Küste, die Art von Stille, die nichts von Ihnen verlangt.',
      intro_p2: 'Siebzehn Zimmer in 20.000 Quadratmetern Garten, unweit eines der unberührtesten Strände des Mittelmeers. Ein kurzer Spaziergang von der antiken Stadt entfernt, die dieser Küste ihren Namen gab. Der Garten, der Strand, das Restaurant: alles ausschließlich für unsere Gäste.',
      intro_p4: 'Die Tage hier entfalten sich ohne Tagesordnung. Beziehen Sie eine Cabana am Strand und lassen Sie den Morgen vergehen. Nehmen Sie ein Kanu und erkunden Sie die Küste in Ihrem eigenen Tempo, oder bitten Sie den Concierge, eine Bootstour zu arrangieren. Der Vorgarten ist genau der Ort, an dem eine Yogamatte und ein Buch gleichermaßen Sinn ergeben. Fahrräder stehen bereit, um das Dorf Çıralı und die umliegenden Straßen zu erkunden.',
      intro_p6: 'Abends werden im Garten Feuer entzündet: zum Zusammenkommen, um einen Drink zu genießen und das Gespräch seinen eigenen Lauf nehmen zu lassen. Und wenn der Tag nichts mehr verlangt, ist das private Spa da: Whirlpool, Sauna, Dampfbad, ganz für Sie allein.',
      story_section_title: 'Unsere Geschichte & Philosophie',
      about_label: 'Unsere Geschichte',
      about_heading: 'Vor Jahren kam ein Mann an eine der unberührtesten Küsten des Mittelmeers.',
      about_p1: 'Er fand seinen Weg hierher durch ein smaragdgrünes Tal. Die Schönheit, der er begegnete, erlaubte ihm, seine Last still abzulegen. An dem Punkt, wo das Tal durch einen Bach das Meer trifft, blieb die Zeit mit ihm stehen.',
      about_p2: 'Von diesem Moment an begann ein Traum. Ein Traum, der bis heute andauert und geteilt wird.',
      about_p3: 'Olympos Lodge wurde aus diesem Traum geboren. Siebzehn Zimmer, in Harmonie mit der Natur über 20.000 m² Garten verteilt. Jedes schlicht und elegant eingerichtet: klar, lichtdurchflutet und in jeder Jahreszeit bewohnbar.',
      rooms_label: 'Zimmer', rooms_heading: 'Derselbe Garten,<br>eine andere Welt.',
      room1_name: 'Aqua Super Deluxe', room1_desc: 'Das einzigartigste Zimmer der Anlage, in einem eigenen freistehenden Gebäude am Rand des Gartens. Eine Indoor-Wasserwand und Glasfußbodenpaneele, die das Wasser unter Ihren Füßen enthüllen, setzen den Ton. Die Grenze zwischen Architektur und Natur verschwindet nahezu.',
      room2_name: 'Super Deluxe', room2_desc: 'In jeder Dimension großzügig, öffnet sich die Super Deluxe über eine breite private Terrasse direkt zum Vorgarten, wo das Meer sich zwischen den Bäumen hindurchfädelt. Die Whirlpool-Badewanne lädt zu langen Abenden ein. Ein Zimmer, das ebenso zum Bleiben wie zum Aufbrechen gestaltet ist.',
      room3_name: 'Deluxe', room3_desc: 'Geräumig genug für eine Residenz, intim genug für ein Refugium. Das Deluxe verbindet Whirlpool und Kamin mit einer großen Terrasse mit Gartenblick. Eine ruhige Komposition des Komforts, bei der das mediterrane Licht den größten Teil der Dekoration übernimmt.',
      room4_name: 'Seehaus', room4_desc: 'Ein freistehendes Häuschen, abseits vom Rest der Anlage, mit einem Teich jenseits der Terrasse. Seine Oberfläche verdoppelt das Licht des Gartens und in hellen Nächten den Mond. Das kaminbeheizte Interieur vollendet eine in sich geschlossene Welt — ideal für jene, die ihre Privatsphäre in die Architektur eingebaut bevorzugen.',
      room5_name: 'Antikes Zimmer', room5_desc: 'Ein Messingbett im Zentrum, umgeben von jahrzehntelang sorgfältig gesammelten Antiquitäten und Objekten, die das Gewicht der Zeit tragen. Eingebettet in eine ruhige Ecke, wo der Garten sich ganz nach Ihrem eigenen anfühlt, gepaart mit einer Terrasse, die sich auf tiefe Stille öffnet. Nichts hier sieht aus, als wäre es gestern angekommen.',
      room6_name: 'Standardzimmer', room6_desc: 'Klare Linien, ein Doppelbett und eine private Terrasse mit Gartenblick. Alles, was Sie brauchen, und nichts, was im Weg steht. Ein Zimmer, das beweist, dass Schlichtheit und Großzügigkeit keine Gegensätze sind.',
      room_discover: 'Entdecken →',
      view_garden: 'GARTENBLICK', view_lake: 'SEEBLICK',
      feature_title: 'Sommer am Mittelmeer',
      feature_p1: 'Im Juni werden die Tage länger, das Meer wärmt sich auf und die Zeit beginnt sich anders anzufühlen. Die Morgen in Çıralı sind früh, still und hell. Während der Nebel von den Hügeln zurückweicht, ist der Strand leer; das erste Bad gehört ganz Ihnen. Wenn die Mittagshitze über den Garten zieht, liest man im Schatten, döst in der Hängematte, ohne jeden Plan für die nächste Stunde.',
      feature_p2: 'Der Abend kommt langsam. Wenn die Sonne hinter dem Tahtalı versinkt, wechselt das Meer die Farbe. Das Feuer wird entzündet, Gespräche entfalten sich. Hier muss man nicht im Wasser sein, um das Mittelmeer zu spüren; es genügt, still zu sitzen und zu lauschen. Nur wenige Orte lassen einen Sommer so vollständig werden.',
      rooms_page_intro: 'Siebzehn Zimmer, jedes mit eigenem Charakter, eigener Aussicht und eigenem Bezug zum Land. Manche am Ufer des Wassers, manche in der Tiefe des Gartens. Alle verbindet dieselbe Sorgfalt.',
      rooms_includes_label: 'In Jedem Zimmer',
      rooms_include_breakfast: 'Frühstück Inklusive',
      rooms_include_wifi: 'Kostenloses WLAN',
      rooms_include_ac: 'Klimaanlage',
      rooms_include_terrace: 'Private Terrasse',
      nature_label: 'Garten, Meer, Natur',
      nature_heading: 'Die Natur ist bereits vollkommen; respektiere sie, höre ihr zu und erschaffe mit ihr.',
      nature_p1: 'Olympos Lodge hat von diesem Ort selbst gelernt. Jedes Gebäude wurde mit Respekt vor dem gesetzt, was bereits vorhanden war, nicht zwischen die Bäume geschnitten, sondern dort, wo die Erde es zuließ. Wurzeln blieben unberührt, Steine unverrückt. Hier ist die Natur keine Kulisse. Sie ist die Architektin.',
      nature_p2: 'Nachts öffnet sich der Himmel an dieser lichtfreien Küste mit seltener Klarheit. Am Morgen mischt sich der Duft des Meeres mit den Geräuschen des Waldes. Der Bach von Çıralı findet still seinen Weg ins Meer, und für einen Moment begreift man, wie laut der Rest der Welt eigentlich ist.',
      exp_label: 'Erlebnis', exp_heading: 'Jeder Augenblick, eine Entdeckung.',
      spa_title: 'Spa & Entspannung', spa_desc: 'Eine Sauna zwischen Steinen im Herzen des Gartens… Hier ist Stille kein Luxus, sondern der natürliche Zustand des Ortes.',
      rest_title: 'Restaurant', rest_desc: 'Frühstückstafeln im Schatten von Granatapfelbäumen, abendliche Mahlzeiten unter dem Sternenhimmel mit Meeresbrise.',
      exp_discover: 'Entdecken →',
      quote: 'Die Zeit verlangsamt sich.<br>Das Leben wird leichter.<br>Und die Natur nimmt still neben Ihnen Platz.',
      voices_label: 'Gästebuch', voices_heading: 'Erinnerungen in Worten.',
      voice1_text: '"Die Tage, die wir hier verbracht haben, waren kein Innehalten, sondern ein Wendepunkt. In der Stille fanden wir uns selbst wieder."',
      voice1_author: 'Ein Gast, 2024',
      voice2_text: '"Morgens mit Vogelgesang aufwachen, abends unter den Sternen spazieren… Olympos Lodge ist nicht nur Urlaub, sondern Erinnerung."',
      voice2_author: 'Ein Gast, 2024',
      voice3_text: '"Beim Spaziergang durch diesen Garten spürte ich, wie die Zeit wirklich stehen blieb. Frieden in jeder Ecke, Sorgfalt in jedem Detail."',
      voice3_author: 'Ein Gast, 2023',
      gallery_label: 'Galerie', gallery_heading: 'Ein Blick.',
      footer_tagline: 'An den heiligen Ufern von Çıralı, im Einklang mit der Natur.',
      footer_contact_title: 'Kontakt', footer_explore_title: 'Entdecken', footer_follow_title: 'Folgen Sie uns',
      footer_nature_link: 'Garten & Natur',
      footer_address: 'Çıralı, Ulupınar Mahallesi<br>Kemer / Antalya, Türkei',
      footer_copyright: '© 2025 Olympos Lodge. Alle Rechte vorbehalten.',
      footer_terms: 'Vorabinformationsformular',
      footer_privacy: 'Datenschutz & KVKK',
      c_intro_title: 'Eine Küste für sich: Çıralı',
      c_intro_p1: 'An der Südküste der Türkei, wo die Taurusberge auf das Meer treffen, erstreckt sich ein kleines Tal. Çıralı steht seit den 1990er Jahren unter Küstenschutz und gehört zu den seltenen Siedlungen, in denen Bebauung eingeschränkt ist; keine Hochhaushotels, keine Betonpiers, keine überfüllten Strandabschnitte. Der 3,5 Kilometer lange Strand genießt internationalen Schutzstatus als aktives Nistgebiet der Meeresschildkröte Caretta caretta.',
      c_intro_p2: 'Die Vergangenheit des Tals reicht so weit zurück wie seine Gegenwart. Die im 2. Jahrhundert v. Chr. gegründete antike Stadt Olympos, die dem Lodge ihren Namen verleiht, war einst ein bedeutender Hafen der Lykischen Liga; heute sind Grabmäler aus der Römerzeit und Theaterreste in die Landschaft eingewoben. Wenige Kilometer entfernt, am Yanartaş, brennt aus der Erde aufsteigendes Erdgas seit 2.500 Jahren ununterbrochen und soll Homers Chimaera-Legende inspiriert haben. Çıralı ist einer der wenigen Orte, an denen Mythologie, Geschichte und Natur so untrennbar miteinander verwoben sind.',
      c_ch1_cat: 'Strand', c_ch1_title: '3,5 km unberührte Küste',
      c_ch1_lead: 'Eine unberührte Mittelmeerküste aus feinem Kies und Sand, etwa 3,5 Kilometer lang. Der gesamte Küstenstreifen ist Naturschutzgebiet; Hotels und Restaurants dürfen nicht am Strand gebaut werden. Jedes Jahr von Mai bis Oktober legen Caretta-caretta-Meeresschildkröten hier ihre Eier ab.',
      c_ch1_f1: '<span>Entfernung</span><strong>30 m · 1 Min.</strong>', c_ch1_f2: '<span>Länge</span><strong>~3,5 km</strong>',
      c_ch1_f3: '<span>Status</span><strong>Schutzgebiet, Caretta-Nistzone</strong>', c_ch1_f4: '<span>Schildkrötensaison</span><strong>Mai – Oktober</strong>',
      c_ch2_cat: 'Archäologie', c_ch2_title: 'Antike Stadt Olympos',
      c_ch2_lead: 'Die antike Stadt, die dem Lodge ihren Namen gibt, liegt direkt nebenan; treten Sie durch den Garten und gehen Sie zehn Minuten, um sich in einer der besterhaltenen Städte Lykiens wiederzufinden. Grabmäler aus der Römerzeit, Theaterreste und Mauern, die sich zum Meer hin erstrecken.',
      c_ch2_f1: '<span>Entfernung</span><strong>800 m · 10 Min.</strong>', c_ch2_f2: '<span>Epoche</span><strong>Lykisch, Römisch, Byzantinisch</strong>',
      c_ch2_f3: '<span>Beste Zeit</span><strong>Früh morgens, später Nachmittag</strong>', c_ch2_f4: '<span>Eintritt</span><strong>Kostenpflichtig</strong>',
      c_ch3_cat: 'Natur', c_ch3_title: 'Yanartaş: Die ewigen Flammen',
      c_ch3_lead: 'Aus der Erde aufsteigendes Erdgas entzündet sich an der Oberfläche und brennt seit 2.500 Jahren ohne Unterbrechung. In der Mythologie war dies der Atem der Chimaera. Eine Nachtwanderung wird empfohlen; Flammen, die im Dunkeln zwischen den Felsen aufsteigen, heben jedes Zeitgefühl auf.',
      c_ch3_f1: '<span>Entfernung</span><strong>3,5 km · 10 Min. mit dem Auto</strong>', c_ch3_f2: '<span>Beste Zeit</span><strong>Nach Sonnenuntergang</strong>',
      c_ch3_f3: '<span>Dauer</span><strong>~2–3 Std. (Hin- und Rückweg)</strong>', c_ch3_f4: '<span>Mitbringen</span><strong>Taschenlampe, festes Schuhwerk</strong>',
      c_ch4_cat: 'Wandern', c_ch4_title: 'Lykischer Weg',
      c_ch4_lead: 'Der 540 Kilometer lange Wanderweg, von The Sunday Times als einer der zehn schönsten der Welt ausgezeichnet, führt durch Çıralı. Antike Städte, lykische Gräber, abgelegene Buchten und Bergdörfer wechseln einander ab. Der Çıralı-Abschnitt umfasst die Strecke Olympos–Adrasan.',
      c_ch4_f1: '<span>Gesamtlänge</span><strong>540 km</strong>', c_ch4_f2: '<span>Çıralı-Abschnitt</span><strong>Olympos – Adrasan</strong>',
      c_ch4_f3: '<span>Schwierigkeit</span><strong>Mittel – Anspruchsvoll</strong>', c_ch4_f4: '<span>Saison</span><strong>Apr – Jun, Sep – Nov</strong>',
      c_pullquote: 'Manche Orte verändern einen nicht. Sie erinnern einen nur an sich selbst.',
      c_act_label: 'Aktivitäten',
      c_tekne_label: 'Meer', c_tekne_title: 'Bootsausflug',
      c_tekne_desc: 'Ein ganztägiger Bootsausflug zwischen den Buchten von Olympos, Adrasan und den umliegenden Inselchen. Schwimmstopps in klarem Wasser, Zuflucht in abgelegenen Buchten, die Stille des offenen Meeres.',
      c_tekne_f1: '<span>Dauer</span><strong>Ganzer Tag</strong>', c_tekne_f2: '<span>Route</span><strong>Olympos – Adrasan-Buchten</strong>', c_tekne_f3: '<span>Organisation</span><strong>Concierge</strong>',
      c_act1_tag: 'Meer · Kostenfrei', c_act1_title: 'Schwimmen & Schnorcheln',
      c_act1_desc: 'Schwimmen im klaren Mittelmeer an einem Caretta-caretta-Strand. Schnorchelausrüstung wird vom Hotel bereitgestellt.',
      c_act2_tag: 'Meer · Kostenfrei', c_act2_title: 'Kanu & SUP',
      c_act2_desc: 'Kanus und Stand-Up-Paddleboards stehen Gästen kostenlos zur Verfügung.',
      c_act3_tag: 'Meer · Kostenpflichtig', c_act3_title: 'Tauchen',
      c_act3_desc: 'Saisonal durch einen Drittanbieter organisiert. Details an der Rezeption erhältlich.',
      c_act4_tag: 'Erkunden · Kostenfrei', c_act4_title: 'Radtour',
      c_act4_desc: 'Fahrräder stehen Gästen kostenlos zur Verfügung. Ideale Routen verlaufen durch das Çıralı-Tal.',
      c_tahtali_label: 'Panorama', c_tahtali_title: 'Tahtalı Seilbahn',
      c_tahtali_desc: 'Auffahrt zum 2.365 Meter hohen Gipfel. Panoramablick über das Mittelmeer, das Çıralı-Tal und die Küste. Eine der längsten Einseilumlaufbahnen der Welt.',
      c_tahtali_f1: '<span>Entfernung</span><strong>15 km</strong>', c_tahtali_f2: '<span>Gipfel</span><strong>2.365 m</strong>', c_tahtali_f3: '<span>Saison</span><strong>April – November</strong>',
      c_nearby_label: 'Rund um Çıralı',
      c_nearby1_title: 'Ulupınar', c_nearby1_desc: 'Forellenrestaurants an Bergquellen. Forelle und natürliche Kühle in einer Dorfumgebung.',
      c_nearby2_title: 'Tahtalı Seilbahn', c_nearby2_desc: 'Aufstieg auf 2.365 Meter. Panoramablick über das Mittelmeer, Çıralı und Kemer.',
      c_nearby3_title: 'Phaselis', c_nearby3_desc: 'Eine lykisch-römische Stadt in einzigartiger Lage zwischen drei Häfen. Schwimmen zwischen Ruinen, die ins Meer reichen.',
      c_nearby4_title: 'Kemer', c_nearby4_desc: 'Der nächste Ort für Märkte, Apotheken, Banken und einen Yachthafen.',
      c_nearby5_title: 'Antalya', c_nearby5_desc: 'Historisches Kaleiçi, Museen und der Flughafen Antalya (AYT) für internationale Flüge.',
      c_cta_quote: 'Çıralı mit seinem Strand, seinen Ruinen, seinen Flammen und seiner geschützten Stille ist etwas, das anderswo in der Türkei immer schwerer zu finden ist.',
      c_cta_rooms: 'Zimmer',
      loc_page_title: 'Lage',
      loc_intro_title: 'Wo das Tal auf das Meer trifft',
      loc_intro_body: 'Am Ende eines geschützten Tals, wo die Taurusberge auf das Meer treffen, liegt Olympos Lodge inmitten einer der stillsten und außergewöhnlichsten Küstenregionen der Türkei. Çıralı ist ein besonderer Ort. Keine Hochhäuser, keine Strandclubs, kein Lärm. Nur eine lange, unberührte Bucht, antike Ruinen zum Hinlaufen und die mythologischen Flammen der Chimäre, die seit Jahrtausenden vom Hang aufsteigen. Ob zum Schwimmen, Wandern oder einfach Nichtstun — das Tal nimmt Sie auf.',
      loc_lead: 'In Çıralı anzukommen bedeutet, den Urlaub zu beginnen. Sobald Sie das Tal befahren, spüren Sie, wie die Stadt hinter Ihnen zurückbleibt.',
      loc_method_car_title: 'Mit dem Auto',
      loc_method_car_body: 'Etwa 1,5 Stunden vom Flughafen Antalya. Folgen Sie der D400 und nehmen Sie die Ausfahrt Ulupınar. Die letzten 7 km durch das Tal sind eine malerische Fahrt durch den Wald.',
      loc_method_car_note: 'Kostenloser Parkplatz auf dem Gelände.',
      loc_method_fly_title: 'Mit dem Flugzeug',
      loc_method_fly_body: 'Der nächste Flughafen ist Antalya (AYT), etwa 90 km entfernt. Direktflüge sind ab Istanbul, Ankara und vielen europäischen Städten verfügbar.',
      loc_method_fly_note: 'Kontaktieren Sie uns für einen Transfer.',
      loc_method_transfer_title: 'Hoteltransfer',
      loc_method_transfer_body: 'Privater Tür-zu-Tür-Transfer vom Flughafen Antalya. Teilen Sie Ihre Ankunftszeit mit und wir kümmern uns um den Rest.',
      loc_dist_walking: 'zu Fuß erreichbar',
      loc_cta_title: 'Die Ankunft ist der Beginn des Urlaubs.',
      loc_cta_sub: 'Schreiben Sie uns für einen Transfer oder eine Wegbeschreibung. Wir kümmern uns um alles.',
      loc_cta_contact: 'Kontakt aufnehmen',
      loc_teaser_title: 'Schwer zu Finden.\nNoch Schwerer zu Verlassen.',
      loc_teaser_body: 'Am Ende eines Tals, wo die Taurusberge auf das Meer treffen. Antike Ruinen, mythologische Flammen und die Stille des Mittelmeers.',
      loc_teaser_cta: 'Entdecken →',
      loc_exp_title: 'Erlebnisse',
      loc_exp_body: 'Die mythologischen Flammen der Chimäre, antike Ruinen von Olympos, Küstenwanderungen, Kajak- und Schwimmtouren im Mittelmeer. Jeder Tag in Çıralı entfaltet sich in seinem eigenen Rhythmus.',
      loc_exp_cta: 'Entdecken →',
      nav_lodge_tab: 'Im Hotel',
      lodge_hero_title: 'Im Olympos Lodge',
      lodge_intro_title: 'Der Rhythmus eines Tages im Lodge',
      lodge_intro_p1: 'Ein Tag im Olympos Lodge besteht aus sehr wenigen Dingen: Morgenlicht, ein frisches Frühstück, der Weg zum Strand. Zeit im Garten, das Feuer in der Dämmerung. Alles, was wir anbieten, ist darauf ausgerichtet, diesen Rhythmus zu ergänzen — nicht zu unterbrechen.',
      lodge_spa_label: 'Spa & Wellness',
      lodge_spa_title: 'Spa: Whirlpool, Sauna & Dampfbad',
      lodge_spa_desc: 'Ein 6-Personen-Whirlpool, Sauna und Dampfbad sind im Übernachtungspreis inbegriffen. Massagebehandlungen sind gegen Aufpreis erhältlich und müssen mindestens zwei Stunden im Voraus reserviert werden.',
      lodge_spa_f1: '<span>Enthalten</span><strong>Im Übernachtungspreis</strong>',
      lodge_spa_f2: '<span>Whirlpool</span><strong>6 Personen</strong>',
      lodge_spa_f3: '<span>Massage</span><strong>Kostenpflichtig, Reservierung erforderlich</strong>',
      lodge_beach_label: 'Strand',
      lodge_beach_title: 'Cabanas & Liegestühle',
      lodge_beach_desc: 'Liegestühle, Sonnenschirme, Handtücher und eine Cabana am Strand stehen Gästen kostenlos zur Verfügung. Der Strand — 30 Meter vom Lodge entfernt — ist ein geschütztes Caretta-caretta-Nistgebiet.',
      lodge_beach_f1: '<span>Entfernung</span><strong>30 m</strong>',
      lodge_beach_f2: '<span>Enthalten</span><strong>Liegestuhl, Schirm, Handtuch, Cabana</strong>',
      lodge_beach_f3: '<span>Status</span><strong>Geschützte Küste, Caretta-Zone</strong>',
      lodge_garden_label: 'Garten & Natur',
      lodge_garden_title: '20.000 m² Themengarten',
      lodge_garden_desc: 'Das Gelände des Lodge erstreckt sich über 20.000 Quadratmeter mit terrassierten Gärten, Obstbäumen und einheimischen Pflanzen. Hängematten, Gartenmöbel und ruhige Ecken laden zu jeder Tageszeit zum Verweilen ein.',
      lodge_act_label: 'Aktivitäten',
      lodge_act1_tag: 'Meer · Kostenfrei', lodge_act1_title: 'Kanu & SUP',
      lodge_act1_desc: 'Kanus und Stand-Up-Paddleboards stehen Gästen kostenlos zur Verfügung.',
      lodge_act2_tag: 'Erkunden · Kostenfrei', lodge_act2_title: 'Radfahren',
      lodge_act2_desc: 'Fahrräder sind für Gäste kostenfrei. Ideale Routen führen durch das gesamte Çıralı-Tal.',
      lodge_act3_tag: 'Meer · Kostenfrei', lodge_act3_title: 'Schnorchelausrüstung',
      lodge_act3_desc: 'Schnorchelausrüstung wird Gästen kostenlos bereitgestellt.',
      lodge_act4_tag: 'Extra · Vor Ort', lodge_act4_title: 'E-Auto-Laden',
      lodge_act4_desc: 'Eine Ladestation für Elektrofahrzeuge ist auf dem Gelände vorhanden.',
      lodge_firepit_label: 'Abende',
      lodge_firepit_title: 'Feuerstelle & Bibliothek',
      lodge_firepit_desc: 'Abende an der Feuerstelle im Garten gehören zu den stillen, bleibenden Freuden des Lodge. Die Bibliothek ist ein verlässlicher Zufluchtsort für einen ruhigen Nachmittag oder das Ende eines langen Tages.',
      lodge_firepit_f1: '<span>Feuerstelle</span><strong>Abends aktiv</strong>',
      lodge_firepit_f2: '<span>Bibliothek</span><strong>Immer geöffnet</strong>',
      spa_hero_title: 'Spa',
      spa_intro_title: 'Ein Ort der Stille',
      spa_intro_p1: 'Das Spa im Olympos Lodge wurde nicht für Aufsehen entworfen. Es wurde für eines konzipiert: das Verlangsamen. In der Wärme des Wassers, im Dampf, in der Stille. Whirlpool, Sauna und Dampfbad stehen allen Gästen im Rahmen ihres Aufenthalts offen.',
      spa_intro_p2: 'Massagebehandlungen sind gegen Aufpreis erhältlich. Bitte wenden Sie sich mindestens 2 Stunden vor Ihrer Wunschzeit an die Rezeption oder schreiben Sie uns.',
      spa_jac_label: 'Whirlpool',
      spa_jac_title: '6-Personen-Whirlpool',
      spa_jac_desc: 'Heißwasserdüsen zur tiefen Muskelentspannung. Fasst bis zu sechs Gäste — geeignet für Einzel- und Gruppennutzung. Im Übernachtungspreis enthalten.',
      spa_jac_f1: '<span>Kapazität</span><strong>6 Personen</strong>',
      spa_jac_f2: '<span>Enthalten</span><strong>Im Übernachtungspreis</strong>',
      spa_sauna_label: 'Sauna',
      spa_sauna_title: 'Trockensauna',
      spa_sauna_desc: 'Eine traditionelle Trockensauna. Regt den Kreislauf an, entspannt die Muskeln und beruhigt den Geist.',
      spa_sauna_f1: '<span>Typ</span><strong>Trockensauna</strong>',
      spa_sauna_f2: '<span>Enthalten</span><strong>Im Übernachtungspreis</strong>',
      spa_steam_label: 'Dampfbad',
      spa_steam_title: 'Dampfbad',
      spa_steam_desc: 'Ein tief atemdes Ritual in warmem, hüllendem Dampf. Dichte Feuchtigkeit, gleichmäßige Wärme.',
      spa_steam_f1: '<span>Typ</span><strong>Nassdampf</strong>',
      spa_steam_f2: '<span>Enthalten</span><strong>Im Übernachtungspreis</strong>',
      spa_massage_label: 'Massage',
      spa_massage_title: 'Massageservice',
      spa_massage_desc: 'Massagebehandlungen sind auf Anfrage gegen Aufpreis erhältlich. Bitte wenden Sie sich mindestens 2 Stunden vor Ihrer Wunschzeit an die Rezeption oder schreiben Sie uns.',
      spa_massage_f1: '<span>Gebühr</span><strong>Kostenpflichtig</strong>',
      spa_massage_f2: '<span>Reservierung</span><strong>Mindestens 2 Stunden im Voraus</strong>',
      spa_cta: 'Reservieren'
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
      document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
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

    // Slide in when footer enters viewport
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        panel.classList.toggle('is-visible', entry.isIntersecting);
      });
    }, { threshold: 0.35 });

    observer.observe(footer);
  }

  initWeatherPanel();

  // --- IP-based language detection (first visit only) ---
  if (!localStorage.getItem('ol_lang')) {
    fetch('https://ipapi.co/json/')
      .then(r => r.json())
      .then(data => {
        const country = data.country_code;
        let lang = 'en';
        if (country === 'TR') lang = 'tr';
        else if (country === 'DE' || country === 'AT' || country === 'CH') lang = 'de';
        setLanguage(lang);
      })
      .catch(() => {});
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
          window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
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


});
