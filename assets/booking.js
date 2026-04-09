/* ========================================
   OLYMPOS LODGE — Booking Engine UI
   Calendar, date selection, step navigation.
   PMS API integration to be added later.
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- State ---
  let currentMonth = new Date().getMonth();
  let currentYear = new Date().getFullYear();
  let arrivalDate = null;
  let departureDate = null;
  let currentStep = 1;

  // --- Month names (TR default, swapped by i18n) ---
  const monthNames = {
    tr: ['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'],
    en: ['January','February','March','April','May','June','July','August','September','October','November','December'],
    de: ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember']
  };

  const dayNames = {
    tr: ['Pz','Pt','Sa','Ça','Pe','Cu','Ct'],
    en: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
    de: ['So','Mo','Di','Mi','Do','Fr','Sa']
  };

  function getLang() {
    return localStorage.getItem('ol_lang') || document.documentElement.lang || 'tr';
  }

  // --- Elements ---
  const calendarEl = document.getElementById('calendarMonths');
  const prevBtn = document.getElementById('calPrev');
  const nextBtn = document.getElementById('calNext');
  const arrivalDayEl = document.getElementById('arrivalDay');
  const arrivalMonthEl = document.getElementById('arrivalMonth');
  const departureDayEl = document.getElementById('departureDay');
  const departureMonthEl = document.getElementById('departureMonth');
  const summaryEl = document.getElementById('sidebarSummary');
  const summaryTextEl = document.getElementById('summaryText');
  const btnCheck = document.getElementById('btnCheckAvailability');

  // --- Calendar rendering ---
  function renderCalendar() {
    const lang = getLang();
    const months = monthNames[lang] || monthNames.tr;
    const days = dayNames[lang] || dayNames.tr;
    const today = new Date();
    today.setHours(0,0,0,0);

    let html = '';

    for (let offset = 0; offset < 2; offset++) {
      let m = currentMonth + offset;
      let y = currentYear;
      if (m > 11) { m -= 12; y++; }

      const firstDay = new Date(y, m, 1).getDay();
      const daysInMonth = new Date(y, m + 1, 0).getDate();

      html += `<div class="calendar-month">`;
      html += `<div class="calendar-month__title">${months[m]} ${y}</div>`;
      html += `<div class="calendar-weekdays">`;
      days.forEach(d => { html += `<span>${d}</span>`; });
      html += `</div>`;
      html += `<div class="calendar-days">`;

      // Empty cells before first day
      for (let i = 0; i < firstDay; i++) {
        html += `<div class="calendar-day calendar-day--empty"></div>`;
      }

      for (let d = 1; d <= daysInMonth; d++) {
        const date = new Date(y, m, d);
        date.setHours(0,0,0,0);
        const isPast = date < today;
        const isToday = date.getTime() === today.getTime();

        let classes = 'calendar-day';
        if (isPast) classes += ' calendar-day--past';
        if (isToday) classes += ' calendar-day--today';

        // Selection state
        if (arrivalDate && date.getTime() === arrivalDate.getTime()) {
          classes += ' calendar-day--arrival';
        } else if (departureDate && date.getTime() === departureDate.getTime()) {
          classes += ' calendar-day--departure';
        } else if (arrivalDate && departureDate && date > arrivalDate && date < departureDate) {
          classes += ' calendar-day--in-range';
        }

        // Placeholder price (to be replaced by PMS API)
        const price = isPast ? '' : formatPrice(y, m, d);

        html += `<div class="${classes}" data-date="${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}">`;
        html += `<span class="calendar-day__number">${d}</span>`;
        if (price) html += `<span class="calendar-day__price">${price}</span>`;
        html += `</div>`;
      }

      html += `</div></div>`;
    }

    calendarEl.innerHTML = html;

    // Bind day clicks
    calendarEl.querySelectorAll('.calendar-day:not(.calendar-day--empty):not(.calendar-day--past)').forEach(el => {
      el.addEventListener('click', () => onDayClick(el.dataset.date));
    });

    // Disable prev if showing current month
    const now = new Date();
    prevBtn.disabled = (currentYear === now.getFullYear() && currentMonth <= now.getMonth());
  }

  // Season check: May 1 – Oct 31 = high season (+€100)
  function isSummer(year, month, day) {
    // month is 0-indexed: April=3, May=4, Oct=9, Nov=10
    const d = new Date(year, month, day);
    const may1 = new Date(year, 4, 1);
    const nov1 = new Date(year, 10, 1);
    return d >= may1 && d < nov1;
  }

  // Calendar shows the cheapest room rate (Standard 1-person)
  function formatPrice(year, month, day) {
    const base = 245; // Standard room, 1 person
    const surcharge = isSummer(year, month, day) ? 100 : 0;
    return `€${base + surcharge}`;
  }

  // --- Date selection ---
  function onDayClick(dateStr) {
    const [y, m, d] = dateStr.split('-').map(Number);
    const clicked = new Date(y, m - 1, d);
    clicked.setHours(0,0,0,0);

    if (!arrivalDate || (arrivalDate && departureDate) || clicked <= arrivalDate) {
      // Start new selection
      arrivalDate = clicked;
      departureDate = null;
    } else {
      // Set departure
      departureDate = clicked;
    }

    updateSidebar();
    renderCalendar();
  }

  function updateSidebar() {
    const lang = getLang();
    const months = monthNames[lang] || monthNames.tr;

    if (arrivalDate) {
      arrivalDayEl.textContent = String(arrivalDate.getDate()).padStart(2, '0');
      arrivalMonthEl.textContent = months[arrivalDate.getMonth()].toUpperCase();
    } else {
      arrivalDayEl.textContent = '—';
      arrivalMonthEl.textContent = '';
    }

    if (departureDate) {
      departureDayEl.textContent = String(departureDate.getDate()).padStart(2, '0');
      departureMonthEl.textContent = months[departureDate.getMonth()].toUpperCase();
    } else {
      departureDayEl.textContent = '—';
      departureMonthEl.textContent = '';
    }

    // Summary
    if (arrivalDate && departureDate) {
      const nights = Math.round((departureDate - arrivalDate) / (1000 * 60 * 60 * 24));
      const nightLabel = lang === 'en' ? (nights === 1 ? 'night' : 'nights') :
                          lang === 'de' ? (nights === 1 ? 'Nacht' : 'Nächte') :
                          'gece';
      summaryTextEl.textContent = `${nights} ${nightLabel}`;
      summaryEl.style.display = 'block';
      btnCheck.disabled = false;
    } else {
      summaryEl.style.display = 'none';
      btnCheck.disabled = true;
    }
  }

  // --- Navigation ---
  prevBtn.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) { currentMonth = 11; currentYear--; }
    renderCalendar();
  });

  nextBtn.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) { currentMonth = 0; currentYear++; }
    renderCalendar();
  });

  // --- Step navigation ---
  function goToStep(step) {
    currentStep = step;
    document.querySelectorAll('.booking-step').forEach(el => el.classList.remove('booking-step--active'));
    const target = document.getElementById('step' + step);
    if (target) target.classList.add('booking-step--active');

    // Update progress
    document.querySelectorAll('.progress-step').forEach(el => {
      const s = parseInt(el.dataset.step);
      el.classList.remove('active', 'completed');
      if (s === step) el.classList.add('active');
      if (s < step) el.classList.add('completed');
    });

    window.scrollTo(0, 0);
  }

  // Check availability → go to step 2
  btnCheck.addEventListener('click', () => {
    if (!arrivalDate || !departureDate) return;
    renderStep2();
    goToStep(2);
  });

  // Back to step 1
  document.getElementById('backToStep1').addEventListener('click', () => {
    goToStep(1);
  });

  // Re-render room cards when adult count changes (Standard single/double pricing)
  const step2AdultsEl = document.getElementById('step2Adults');
  if (step2AdultsEl) {
    step2AdultsEl.addEventListener('change', () => { renderStep2(); });
  }

  // --- Selected room state ---
  let selectedRoom = null;
  let selectedPrice = 0;

  // --- Step 2: Room cards ---
  // Base prices (off-season). May 1 – Oct 31 adds €100.
  // Standard has single/double pricing; all others are per-room.
  const rooms = [
    {
      id: 'aqua-super-deluxe',
      name: 'Aqua Super Deluxe',
      size: '105 m²',
      view: 'Garden & Sea',
      features: ['105 m² — garden & sea view', 'King bed', 'Indoor waterfall & glass floor', 'Private jacuzzi', 'Private terrace with sun loungers'],
      amenities: ['wifi', 'ac', 'minibar', 'terrace'],
      image: 'https://www.olymposlodge.com.tr/wp-content/uploads/2024/11/olympos-lodge-aqua-super-deluxe-oda-2.jpg',
      price: 590
    },
    {
      id: 'super-deluxe',
      name: 'Super Deluxe',
      size: '105 m²',
      view: 'Garden',
      features: ['105 m² — garden view', 'Queen bed', 'Jacuzzi bathtub', 'Spacious living area', 'Private terrace with sun loungers'],
      amenities: ['wifi', 'ac', 'minibar', 'terrace'],
      image: 'https://www.olymposlodge.com.tr/wp-content/uploads/2024/11/olympos-lodge-super-deluxe-double-room-7.jpg',
      price: 490
    },
    {
      id: 'deluxe',
      name: 'Deluxe',
      size: '70 m²',
      view: 'Garden',
      features: ['70 m² — garden view', 'Queen bed', 'Fireplace', 'Jacuzzi', 'Large private terrace'],
      amenities: ['wifi', 'ac', 'minibar', 'terrace'],
      image: 'https://www.olymposlodge.com.tr/wp-content/uploads/2024/11/olympos-lodge-deluxe-double-room-1-890x664.jpg',
      price: 390
    },
    {
      id: 'gol-evi',
      name: 'Göl Evi',
      nameEn: 'Lake House',
      nameDe: 'Seehaus',
      size: '60 m²',
      view: 'Lake',
      features: ['60 m² — lake view', 'Queen bed', 'Fireplace', 'Detached cottage', 'Private terrace with sun loungers'],
      amenities: ['wifi', 'ac', 'minibar', 'terrace'],
      image: 'https://www.olymposlodge.com.tr/wp-content/uploads/2025/11/Lake-House-Deluxe-room-9.jpg',
      price: 390
    },
    {
      id: 'antik',
      name: 'Antik Oda',
      nameEn: 'Antique Room',
      nameDe: 'Antikes Zimmer',
      size: '45 m²',
      view: 'Garden',
      features: ['Garden view', 'Brass bed', 'Antique furniture', 'Quiet corner location', 'Private terrace'],
      amenities: ['wifi', 'ac', 'minibar', 'terrace'],
      image: 'https://www.olymposlodge.com.tr/wp-content/uploads/2024/11/olympos-lodge-antique-room-3.jpg',
      price: 370
    },
    {
      id: 'standart',
      name: 'Standart Oda',
      nameEn: 'Standard Room',
      nameDe: 'Standardzimmer',
      size: '35 m²',
      view: 'Garden',
      features: ['35 m² — garden view', 'Queen bed', 'Clean, modern design', 'Private terrace with sun loungers'],
      amenities: ['wifi', 'ac', 'minibar', 'terrace'],
      image: 'https://www.olymposlodge.com.tr/wp-content/uploads/2024/11/olympos-lodge-double-room-1.jpg',
      price: 245,
      priceDouble: 275
    }
  ];

  const amenityIcons = {
    wifi: `<svg viewBox="0 0 24 24"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1"/></svg>`,
    ac: `<svg viewBox="0 0 24 24"><path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07"/></svg>`,
    minibar: `<svg viewBox="0 0 24 24"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="4" y1="10" x2="20" y2="10"/><circle cx="8" cy="6" r="1"/></svg>`,
    terrace: `<svg viewBox="0 0 24 24"><path d="M3 21h18M5 21V7l7-4 7 4v14"/><rect x="9" y="13" width="6" height="8"/></svg>`,
    pet: `<svg viewBox="0 0 24 24"><circle cx="11" cy="4" r="2"/><circle cx="18" cy="8" r="2"/><circle cx="4" cy="8" r="2"/><path d="M12 18c-4 0-6-2-6-5s4-5 6-5 6 2 6 5-2 5-6 5z"/></svg>`
  };

  function renderStep2() {
    const lang = getLang();
    const months = monthNames[lang] || monthNames.tr;

    // Header dates
    const datesEl = document.getElementById('step2Dates');
    if (arrivalDate && departureDate) {
      const arrStr = `${String(arrivalDate.getDate()).padStart(2,'0')}/${String(arrivalDate.getMonth()+1).padStart(2,'0')}/${arrivalDate.getFullYear()}`;
      const depStr = `${String(departureDate.getDate()).padStart(2,'0')}/${String(departureDate.getMonth()+1).padStart(2,'0')}/${departureDate.getFullYear()}`;
      const arrLabel = lang === 'en' ? 'ARRIVE' : lang === 'de' ? 'ANREISE' : 'GİRİŞ';
      const depLabel = lang === 'en' ? 'DEPART' : lang === 'de' ? 'ABREISE' : 'ÇIKIŞ';
      datesEl.textContent = `${arrLabel}: ${arrStr}  |  ${depLabel}: ${depStr}`;
    }

    // Filter by room type selection
    const selectedType = document.getElementById('roomType').value;
    const filtered = selectedType ? rooms.filter(r => r.id === selectedType) : rooms;

    const nights = arrivalDate && departureDate
      ? Math.round((departureDate - arrivalDate) / (1000 * 60 * 60 * 24))
      : 1;

    const cardsEl = document.getElementById('roomCards');
    const nightLabel = lang === 'en' ? 'Night' : lang === 'de' ? 'Nacht' : 'Gece';
    const fromLabel = lang === 'en' ? 'From' : lang === 'de' ? 'Ab' : 'Başlangıç';
    const feesLabel = lang === 'en' ? 'incl. Taxes & Fees' : lang === 'de' ? 'inkl. Steuern & Gebühren' : 'Vergiler dahil';
    const viewRatesLabel = lang === 'en' ? 'VIEW RATES' : lang === 'de' ? 'PREISE ANSEHEN' : 'FİYATLARI GÖR';

    // Seasonal surcharge based on arrival date
    const summer = arrivalDate ? isSummer(arrivalDate.getFullYear(), arrivalDate.getMonth(), arrivalDate.getDate()) : false;
    const surcharge = summer ? 100 : 0;

    // Guest count for Standard single/double pricing
    const step2AdultsSelect = document.getElementById('step2Adults');
    const adults = step2AdultsSelect ? parseInt(step2AdultsSelect.value) : (parseInt(document.getElementById('adultCount').value) || 2);

    cardsEl.innerHTML = filtered.map(room => {
      const displayName = lang === 'en' && room.nameEn ? room.nameEn :
                          lang === 'de' && room.nameDe ? room.nameDe : room.name;

      // Standard room: single vs double base price
      let basePrice = room.price;
      if (room.id === 'standart' && adults >= 2 && room.priceDouble) {
        basePrice = room.priceDouble;
      }
      const displayPrice = basePrice + surcharge;

      return `
        <div class="room-card">
          <div class="room-card__gallery">
            <img src="${room.image}" alt="${displayName}" loading="lazy" />
          </div>
          <div class="room-card__info">
            <h3 class="room-card__name">${displayName}</h3>
            <ul class="room-card__features">
              ${room.features.map(f => `<li>${f}</li>`).join('')}
            </ul>
            <div class="room-card__amenities">
              ${room.amenities.map(a => `
                <span class="room-card__amenity">
                  ${amenityIcons[a] || ''}
                  <span>${a === 'wifi' ? 'Wi-Fi' : a === 'ac' ? 'A/C' : a === 'minibar' ? 'Minibar' : a === 'terrace' ? 'Terrace' : 'Pet Friendly'}</span>
                </span>
              `).join('')}
            </div>
            <div class="room-card__footer">
              <div class="room-card__price">
                ${fromLabel}
                <strong>€${displayPrice} / ${nightLabel}</strong>
                ${feesLabel}
              </div>
              <button class="room-card__cta" data-room-id="${room.id}" data-room-price="${displayPrice}">${viewRatesLabel}</button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Bind room selection
    cardsEl.querySelectorAll('.room-card__cta').forEach(btn => {
      btn.addEventListener('click', () => {
        const roomId = btn.dataset.roomId;
        selectedRoom = rooms.find(r => r.id === roomId);
        selectedPrice = parseInt(btn.dataset.roomPrice);
        renderStep3();
        goToStep(3);
      });
    });
  }

  // --- Step 3: Guest details ---
  document.getElementById('backToStep2').addEventListener('click', () => {
    goToStep(2);
  });

  function renderStep3() {
    const lang = getLang();
    const months = monthNames[lang] || monthNames.tr;

    if (!selectedRoom || !arrivalDate || !departureDate) return;

    const nights = Math.round((departureDate - arrivalDate) / (1000 * 60 * 60 * 24));
    const total = selectedPrice * nights;

    const displayName = lang === 'en' && selectedRoom.nameEn ? selectedRoom.nameEn :
                        lang === 'de' && selectedRoom.nameDe ? selectedRoom.nameDe : selectedRoom.name;

    document.getElementById('summaryRoomName').textContent = displayName;

    const fmtDate = (d) => `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
    document.getElementById('summaryArrival').textContent = fmtDate(arrivalDate);
    document.getElementById('summaryDeparture').textContent = fmtDate(departureDate);

    const nightLabel = lang === 'en' ? (nights === 1 ? 'night' : 'nights') :
                       lang === 'de' ? (nights === 1 ? 'Nacht' : 'Nächte') : 'gece';
    document.getElementById('summaryNights').textContent = `${nights} ${nightLabel}`;
    document.getElementById('summaryNightPrice').textContent = `${nights} × €${selectedPrice}`;
    document.getElementById('summaryTotal').textContent = `€${total}`;
  }

  // --- Step 4: Confirmation ---
  document.getElementById('btnConfirmBooking').addEventListener('click', () => {
    const firstName = document.getElementById('guestFirstName').value.trim();
    const lastName = document.getElementById('guestLastName').value.trim();
    const email = document.getElementById('guestEmail').value.trim();
    const phone = document.getElementById('guestPhone').value.trim();

    if (!firstName || !lastName || !email || !phone) {
      // Highlight empty required fields
      ['guestFirstName','guestLastName','guestEmail','guestPhone'].forEach(id => {
        const el = document.getElementById(id);
        if (!el.value.trim()) {
          el.classList.add('field--error');
          el.addEventListener('input', () => el.classList.remove('field--error'), { once: true });
        }
      });

      // Show inline notification
      let toast = document.querySelector('.form-toast');
      if (!toast) {
        toast = document.createElement('div');
        toast.className = 'form-toast';
        document.querySelector('.guest-form').prepend(toast);
      }
      const lang = getLang();
      toast.textContent = lang === 'en' ? 'Please fill in all required fields.' :
                          lang === 'de' ? 'Bitte füllen Sie alle Pflichtfelder aus.' :
                          'Lütfen tüm zorunlu alanları doldurun.';
      toast.classList.add('form-toast--visible');
      setTimeout(() => toast.classList.remove('form-toast--visible'), 4000);
      return;
    }

    const lang = getLang();
    const months = monthNames[lang] || monthNames.tr;
    const nights = Math.round((departureDate - arrivalDate) / (1000 * 60 * 60 * 24));
    const total = selectedPrice * nights;

    const displayName = lang === 'en' && selectedRoom.nameEn ? selectedRoom.nameEn :
                        lang === 'de' && selectedRoom.nameDe ? selectedRoom.nameDe : selectedRoom.name;

    // Generate a placeholder reference (will come from PMS later)
    const ref = 'OL-' + Date.now().toString(36).toUpperCase().slice(-6);

    const fmtDate = (d) => `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;

    document.getElementById('confirmRef').textContent = ref;
    document.getElementById('confirmGuest').textContent = `${firstName} ${lastName}`;
    document.getElementById('confirmRoom').textContent = displayName;
    document.getElementById('confirmDates').textContent = `${fmtDate(arrivalDate)} – ${fmtDate(departureDate)}`;
    document.getElementById('confirmTotal').textContent = `€${total}`;

    goToStep(4);
  });

  // --- Language switcher (reuse pattern from main site) ---
  const langSwitch = document.getElementById('langSwitch');
  if (langSwitch) {
    const langCurrent = langSwitch.querySelector('.lang-current');
    const langLinks = langSwitch.querySelectorAll('[data-lang]');

    langCurrent.addEventListener('click', (e) => {
      e.stopPropagation();
      langSwitch.classList.toggle('open');
    });

    langLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const lang = link.dataset.lang;
        localStorage.setItem('ol_lang', lang);
        document.documentElement.lang = lang;
        langCurrent.textContent = lang.toUpperCase();
        langLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        langSwitch.classList.remove('open');

        // Re-render calendar with new language
        renderCalendar();
        updateSidebar();

        // Apply translations if available
        if (typeof olTranslations !== 'undefined') {
          applyTranslations(lang);
        }
      });
    });

    document.addEventListener('click', () => langSwitch.classList.remove('open'));
  }

  function applyTranslations(lang) {
    if (typeof olTranslations === 'undefined') return;
    const t = olTranslations[lang];
    if (!t) return;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (t[key]) el.textContent = t[key];
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (t[key]) el.placeholder = t[key];
    });
  }

  // --- Init ---
  // Set language from storage
  const savedLang = getLang();
  if (savedLang !== 'tr') {
    document.documentElement.lang = savedLang;
    const langBtn = langSwitch?.querySelector('.lang-current');
    if (langBtn) langBtn.textContent = savedLang.toUpperCase();
    langSwitch?.querySelectorAll('[data-lang]').forEach(l => {
      l.classList.toggle('active', l.dataset.lang === savedLang);
    });
  }

  renderCalendar();

  // Re-render on bfcache restore (back/forward navigation)
  window.addEventListener('pageshow', e => {
    if (e.persisted) {
      renderCalendar();
      updateSidebar();
    }
  });

  // Apply translations on load
  if (typeof olTranslations !== 'undefined') {
    applyTranslations(savedLang);
  }

});
