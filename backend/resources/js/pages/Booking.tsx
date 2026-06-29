import { Fragment, useEffect, useRef, useState } from 'react'
import { Link } from '@inertiajs/react'
import { useTranslation } from '@/hooks/use-translation'
import { usePageProps } from '@/hooks/use-page-props'
import { localePath } from '@/lib/routes'
import SeoHead from '@/components/SeoHead'
import ClientOnly from '@/components/ClientOnly'

// ─── Types ────────────────────────────────────────────────────────────────────

interface Room {
  id: number
  slug: string
  key_prefix?: string
  name: string
  name_de?: string
  name_en?: string
  name_tr?: string
  price_per_night: number | null
  capacity: number
  currency?: string
}

type Lang = 'de' | 'en' | 'tr'
type Step = 1 | 2 | 3 | 4

// ─── Static room data ─────────────────────────────────────────────────────────

const LOGO = 'https://www.olymposlodge.com.tr/wp-content/uploads/2024/11/olympos-lodge-logo-e1730775765361.png'

const ROOM_IMAGES: Record<string, string> = {
  'aqua-super-deluxe': 'https://www.olymposlodge.com.tr/wp-content/uploads/2024/11/olympos-lodge-aqua-super-deluxe-oda-2.jpg',
  'super-deluxe':      'https://www.olymposlodge.com.tr/wp-content/uploads/2024/11/olympos-lodge-super-deluxe-double-room-7.jpg',
  'deluxe':            'https://www.olymposlodge.com.tr/wp-content/uploads/2024/11/olympos-lodge-deluxe-double-room-1-890x664.jpg',
  'gol-evi':           'https://www.olymposlodge.com.tr/wp-content/uploads/2025/11/Lake-House-Deluxe-room-9.jpg',
  'antik':             'https://www.olymposlodge.com.tr/wp-content/uploads/2024/11/olympos-lodge-antique-room-3.jpg',
  'standart':          'https://www.olymposlodge.com.tr/wp-content/uploads/2024/11/olympos-lodge-double-room-1.jpg',
}

const ROOM_FEATURES: Record<string, Record<Lang, string[]>> = {
  'aqua-super-deluxe': {
    de: ['105 m² · freistehendes Gebäude', 'Whirlpool & Kamin', 'Wasserfall-Wand & Glasbodenplatten', 'Innen- & Außen-Regendusche', 'Espressomaschine · Minibar', 'Private Veranda'],
    en: ['105 m² · detached building', 'Jacuzzi & fireplace', 'Waterfall wall & glass floor panels', 'Indoor & outdoor rain showers', 'Espresso machine · Minibar', 'Private veranda'],
    tr: ['105 m² · bağımsız yapı', 'Jakuzi & şömine', 'Şelale duvarı & cam zemin paneller', 'İç ve dış yağmur duşu', 'Espresso makinesi · Minibar', 'Özel veranda'],
  },
  'super-deluxe': {
    de: ['105 m² · Gartenblick', 'Whirlpool & Kamin', 'Regendusche', 'Espressomaschine · Minibar', 'Private Terrasse zum Garten', 'Handgefertigte Möbel'],
    en: ['105 m² · garden view', 'Jacuzzi & fireplace', 'Rain shower', 'Espresso machine · Minibar', 'Private terrace to garden', 'Handcrafted furniture'],
    tr: ['105 m² · bahçe manzarası', 'Jakuzi & şömine', 'Yağmur duşu', 'Espresso makinesi · Minibar', 'Bahçeye açılan özel teras', 'El yapımı mobilyalar'],
  },
  'deluxe': {
    de: ['70 m² · Gartenblick', 'Whirlpool & Kamin', 'Regendusche', 'Espressomaschine · Minibar', 'Großzügige Gartenterrasse'],
    en: ['70 m² · garden view', 'Jacuzzi & fireplace', 'Rain shower', 'Espresso machine · Minibar', 'Generous garden terrace'],
    tr: ['70 m² · bahçe manzarası', 'Jakuzi & şömine', 'Yağmur duşu', 'Espresso makinesi · Minibar', 'Geniş bahçe terası'],
  },
  'gol-evi': {
    de: ['60 m² · Teichblick', 'Kamin & Regendusche', 'Espressomaschine · Minibar', 'Freistehendes Haus mit Privatcharakter', 'Abseits der anderen Zimmer'],
    en: ['60 m² · pond view', 'Fireplace & rain shower', 'Espresso machine · Minibar', 'Detached house, full privacy', 'Set apart from other rooms'],
    tr: ['60 m² · göl manzarası', 'Şömine & yağmur duşu', 'Espresso makinesi · Minibar', 'Bağımsız ev, tam mahremiyet', 'Diğer odalardan ayrı konumda'],
  },
  'antik': {
    de: ['Gartenblick', 'Messingbett & Antiquitäten', 'Regendusche · Minibar', 'Gartenterrasse', 'Historische Objekte aus Jahrzehnten'],
    en: ['Garden view', 'Brass bed & antiques', 'Rain shower · Minibar', 'Garden terrace', 'Historical objects from decades of collecting'],
    tr: ['Bahçe manzarası', 'Pirinç yatak & antikalar', 'Yağmur duşu · Minibar', 'Bahçe terası', 'Onlarca yıllık tarihi objeler'],
  },
  'standart': {
    de: ['35 m² · Gartenblick', 'Regendusche · Minibar', 'Private Terrasse', 'Doppelbett · Klimaanlage'],
    en: ['35 m² · garden view', 'Rain shower · Minibar', 'Private terrace', 'Double bed · Air conditioning'],
    tr: ['35 m² · bahçe manzarası', 'Yağmur duşu · Minibar', 'Özel teras', 'Çift kişilik yatak · Klima'],
  },
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const MONTH_NAMES: Record<Lang, string[]> = {
  de: ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'],
  en: ['January','February','March','April','May','June','July','August','September','October','November','December'],
  tr: ['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'],
}
const DAY_LABELS: Record<Lang, string[]> = {
  de: ['Mo','Di','Mi','Do','Fr','Sa','So'],
  en: ['Mo','Tu','We','Th','Fr','Sa','Su'],
  tr: ['Pt','Sa','Ça','Pe','Cu','Ct','Pz'],
}

function toStr(d: Date) { return d.toISOString().split('T')[0] }
function todayStr() { return toStr(new Date()) }
function nightsCount(a: string, b: string) {
  return Math.max(0, (new Date(b).getTime() - new Date(a).getTime()) / 86400000)
}
function daysInMonth(y: number, m: number) { return new Date(y, m + 1, 0).getDate() }
function weekdayOf(y: number, m: number) { return (new Date(y, m, 1).getDay() + 6) % 7 }

function parseDateParts(s: string, lang: Lang) {
  const d = new Date(s + 'T00:00:00')
  return {
    day: d.getDate(),
    month: MONTH_NAMES[lang][d.getMonth()],
    year: d.getFullYear(),
  }
}

function formatDate(s: string, lang: Lang) {
  return new Date(s + 'T00:00:00').toLocaleDateString(
    lang === 'de' ? 'de-DE' : lang === 'tr' ? 'tr-TR' : 'en-GB',
    { day: 'numeric', month: 'long' }
  )
}

// ─── Calendar ─────────────────────────────────────────────────────────────────

interface CalProps {
  checkIn: string | null
  checkOut: string | null
  onSelect: (ci: string | null, co: string | null) => void
  lang: Lang
  viewYear: number
  viewMonth: number
  onViewChange: (y: number, m: number) => void
  blockedDates?: Set<string>
  pricePerNight?: number | null
}

function Calendar({ checkIn, checkOut, onSelect, lang, viewYear, viewMonth, onViewChange, blockedDates, pricePerNight }: CalProps) {
  const now = new Date()
  const [hover, setHover] = useState<string | null>(null)

  const vy = viewYear
  const vm = viewMonth
  const m2 = vm === 11 ? 0 : vm + 1
  const y2 = vm === 11 ? vy + 1 : vy
  const canPrev = !(vy === now.getFullYear() && vm === now.getMonth())
  const withPrices = !!(pricePerNight && pricePerNight > 0)

  function prev() {
    if (vm === 0) onViewChange(vy - 1, 11)
    else          onViewChange(vy, vm - 1)
  }
  function next() {
    if (vm === 11) onViewChange(vy + 1, 0)
    else           onViewChange(vy, vm + 1)
  }

  function handleClick(date: string) {
    if (date < todayStr() || blockedDates?.has(date)) return
    if (!checkIn || (checkIn && checkOut)) {
      onSelect(date, null)
    } else if (date === checkIn) {
      onSelect(null, null)
    } else if (date > checkIn) {
      onSelect(checkIn, date)
    } else {
      onSelect(date, null)
    }
  }

  function renderMonth(year: number, month: number) {
    const days = daysInMonth(year, month)
    const startWd = weekdayOf(year, month)
    const cells: (string | null)[] = Array(startWd).fill(null)
    for (let d = 1; d <= days; d++) {
      cells.push(`${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`)
    }
    while (cells.length % 7 !== 0) cells.push(null)

    const rangeEnd = checkOut ?? (checkIn && !checkOut && hover && hover > checkIn ? hover : null)

    return (
      <div className="cal__month" key={`${year}-${month}`}>
        <div className="cal__month-name">{MONTH_NAMES[lang][month]} {year}</div>
        <div className="cal__grid">
          {DAY_LABELS[lang].map(d => (
            <span key={d} className="cal__day-name">{d}</span>
          ))}
          {cells.map((date, i) => {
            if (!date) return <span key={i} className="cal__day cal__day--empty" />
            const past      = date < todayStr()
            const isBlocked = !past && !!blockedDates?.has(date)
            const isCI      = date === checkIn
            const isCO      = date === checkOut
            const inRange   = !!(checkIn && rangeEnd && date > checkIn && date < rangeEnd)
            const isToday   = date === todayStr()
            let cls = 'cal__day'
            if (past)      cls += ' cal__day--past'
            if (isBlocked) cls += ' cal__day--blocked'
            if (isCI)      cls += ' cal__day--ci'
            if (isCO)      cls += ' cal__day--co'
            if (inRange)   cls += ' cal__day--range'
            if (isToday)   cls += ' cal__day--today'
            return (
              <button
                key={date}
                type="button"
                className={cls}
                disabled={past || isBlocked}
                onClick={() => handleClick(date)}
                onMouseEnter={() => { if (checkIn && !checkOut && !isBlocked) setHover(date) }}
                onMouseLeave={() => setHover(null)}
              >
                <span>{parseInt(date.split('-')[2])}</span>
                {withPrices && !isBlocked && !isCI && !isCO && (
                  <small className="cal__day__price">€{pricePerNight}</small>
                )}
                {withPrices && isBlocked && (
                  <small className="cal__day__blocked-icon">✕</small>
                )}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  const { t: tl } = useTranslation()
  const legendUnavail = tl('booking.legend_unavail')

  return (
    <div className="calendar-panel">
      <div className="calendar-nav">
        <button
          type="button"
          className="calendar-arrow"
          onClick={prev}
          disabled={!canPrev}
          aria-label="Previous month"
        >‹</button>
        <button
          type="button"
          className="calendar-arrow"
          onClick={next}
          aria-label="Next month"
        >›</button>
      </div>
      <div className={`cal${withPrices ? ' cal--with-prices' : ''}`}>
        <div className="cal__months">
          {renderMonth(vy, vm)}
          {renderMonth(y2, m2)}
        </div>
        <div className="cal__legend">
          <span><span className="cal__legend-dot cal__legend-dot--ci" />{tl('booking.legend_checkin')}</span>
          <span><span className="cal__legend-dot cal__legend-dot--range" />{tl('booking.legend_stay')}</span>
          <span><span className="cal__legend-dot cal__legend-dot--co" />{tl('booking.legend_checkout')}</span>
          {withPrices && (
            <span><span className="cal__legend-dot cal__legend-dot--blocked">✕</span>{legendUnavail}</span>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Progress bar ─────────────────────────────────────────────────────────────

function ProgressBar({ step, labels }: { step: Step; labels: string[] }) {
  return (
    <div className="booking-progress">
      {labels.map((label, i) => {
        const n = i + 1
        const done   = n < step
        const active = n === step
        return (
          <Fragment key={n}>
            {i > 0 && <div className={`progress-line${done ? ' done' : ''}`} />}
            <div className={`progress-step${active ? ' active' : done ? ' completed' : ''}`}>
              <div className="step-number">{n}</div>
              <div className="step-label">{label}</div>
            </div>
          </Fragment>
        )
      })}
    </div>
  )
}

// ─── Booking Header (SSR-safe, Inertia lang-switch) ────────────────────────────

function BookingHeader({ lang, locale }: { lang: Lang; locale: string }) {
  const [langOpen, setLangOpen] = useState(false)
  const langRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <header className="booking-header">
      <Link href={localePath(locale)} className="booking-close" aria-label="Close booking">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </Link>
      <Link href={localePath(locale)} className="booking-logo">
        <img src={LOGO} alt="Olympos Lodge" width="1000" height="500" />
      </Link>
      <div className="booking-header-right">
        <div className={`lang-switch${langOpen ? ' open' : ''}`} ref={langRef}>
          <button className="lang-current" onClick={() => setLangOpen(o => !o)}>
            {lang.toUpperCase()}
          </button>
          <ul className="lang-dropdown">
            {(['tr', 'en', 'de'] as Lang[]).map(l => (
              <li key={l}>
                <Link href={localePath(l, 'booking')} className={locale === l ? 'active' : ''}>
                  {l === 'tr' ? 'Türkçe' : l === 'en' ? 'English' : 'Deutsch'}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function Booking({ rooms, preselectRoom }: { rooms: Room[]; preselectRoom: string | null }) {
  const { t } = useTranslation()
  const { locale } = usePageProps()
  const lang = locale as Lang

  return (
    <div className="booking-page-wrap">
      <SeoHead title={t('meta.booking_title')} />
      <BookingHeader lang={lang} locale={locale} />
      <ClientOnly>
        <BookingWizard rooms={rooms} preselectRoom={preselectRoom} lang={lang} />
      </ClientOnly>
    </div>
  )
}

function BookingWizard({ rooms, preselectRoom, lang }: { rooms: Room[]; preselectRoom: string | null; lang: Lang }) {
  const { t } = useTranslation()

  const [step, setStep] = useState<Step>(1)
  function goToStep(n: Step) { setStep(n); window.scrollTo({ top: 0 }) }

  const [checkIn, setCheckIn] = useState<string | null>(null)
  const [checkOut, setCheckOut] = useState<string | null>(null)
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [roomCount, setRoomCount] = useState(1)

  const now0 = new Date()
  const [viewYear, setViewYear] = useState(now0.getFullYear())
  const [viewMonth, setViewMonth] = useState(now0.getMonth())

  // Visual-shell: room-type pre-filter is inert (its only job was the calendar pre-fetch).
  const [filterRoomId, setFilterRoomId] = useState<number | null>(null)

  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(
    preselectRoom ? (rooms.find(r => r.slug === preselectRoom)?.id ?? null) : null
  )

  // Guest form fields (collected but not submitted in the shell)
  const [guestTitle, setGuestTitle] = useState('')
  const [guestFirstName, setGuestFirstName] = useState('')
  const [guestLastName, setGuestLastName] = useState('')
  const [guestEmail, setGuestEmail] = useState('')
  const [guestPhone, setGuestPhone] = useState('')
  const [guestCountry, setGuestCountry] = useState('')
  const [guestArrival, setGuestArrival] = useState('')
  const [guestNotes, setGuestNotes] = useState('')

  const nights = checkIn && checkOut ? nightsCount(checkIn, checkOut) : 0
  const selectedRoom = rooms.find(r => r.id === selectedRoomId)
  const roomName = (r: Room) => (r[`name_${lang}` as keyof Room] as string) ?? r.name
  const pricePerNight = selectedRoom?.price_per_night ?? null
  const totalPrice = pricePerNight && nights > 0 ? pricePerNight * nights : null

  const b = (k: string) => t(`booking.${k}`)
  const L = {
    checkin: b('checkin'), checkout: b('checkout'), nights: b('nights'),
    adults: b('adults'), children: b('children'), perNight: b('per_night'),
    total: b('total'), showRooms: b('show_rooms'), selectCI: b('select_ci'),
    selectCO: b('select_co'), roomSingular: b('room_singular'), roomPlural: b('room_plural'),
    allTypes: b('all_types'), back: b('back'), select: b('select'),
    guestTitle: b('guest_title'), firstName: b('first_name'), lastName: b('last_name'),
    email: b('email'), phone: b('phone'), country: b('country'), arrival: b('arrival'),
    notes: b('notes'), summary: b('summary'), paymentNote: b('payment_note'),
    comingSoon: b('coming_soon'),
  }

  const TITLES: Record<Lang, string[]> = {
    de: ['Herr', 'Frau', 'Mx.', 'Dr.', 'Prof.'],
    en: ['Mr', 'Mrs', 'Ms', 'Dr', 'Prof'],
    tr: ['Bay', 'Bayan', 'Dr.', 'Prof.'],
  }
  const COUNTRIES: Record<Lang, { code: string; label: string }[]> = {
    de: [
      { code: 'DE', label: 'Deutschland' }, { code: 'AT', label: 'Österreich' }, { code: 'CH', label: 'Schweiz' },
      { code: 'TR', label: 'Türkei' }, { code: 'GB', label: 'Großbritannien' }, { code: 'NL', label: 'Niederlande' },
      { code: 'FR', label: 'Frankreich' }, { code: 'US', label: 'USA' }, { code: 'RU', label: 'Russland' }, { code: 'XX', label: 'Sonstiges' },
    ],
    en: [
      { code: 'GB', label: 'United Kingdom' }, { code: 'US', label: 'United States' }, { code: 'DE', label: 'Germany' },
      { code: 'TR', label: 'Turkey' }, { code: 'NL', label: 'Netherlands' }, { code: 'FR', label: 'France' },
      { code: 'AT', label: 'Austria' }, { code: 'CH', label: 'Switzerland' }, { code: 'RU', label: 'Russia' }, { code: 'XX', label: 'Other' },
    ],
    tr: [
      { code: 'TR', label: 'Türkiye' }, { code: 'DE', label: 'Almanya' }, { code: 'GB', label: 'Birleşik Krallık' },
      { code: 'NL', label: 'Hollanda' }, { code: 'FR', label: 'Fransa' }, { code: 'US', label: 'ABD' },
      { code: 'RU', label: 'Rusya' }, { code: 'XX', label: 'Diğer' },
    ],
  }
  const ARRIVAL_TIMES = ['12:00–14:00', '14:00–16:00', '16:00–18:00', '18:00–20:00', '20:00–22:00', '22:00+']

  const ciParts = checkIn ? parseDateParts(checkIn, lang) : null
  const coParts = checkOut ? parseDateParts(checkOut, lang) : null

  return (
    <>
      <ProgressBar step={step} labels={[b('step_calendar'), b('step_room_rate'), b('step_details'), b('step_confirmation')]} />

      {step === 1 && (
        <>
          <h1 className="booking-title">{L.selectCI}</h1>
          <div className="booking-layout">
            <Calendar
              checkIn={checkIn}
              checkOut={checkOut}
              onSelect={(ci, co) => { setCheckIn(ci); setCheckOut(co) }}
              lang={lang}
              viewYear={viewYear}
              viewMonth={viewMonth}
              onViewChange={(y, m) => { setViewYear(y); setViewMonth(m) }}
              blockedDates={new Set<string>()}
              pricePerNight={null}
            />
            <div className="booking-sidebar">
              <div className="sidebar-dates">
                <div className="sidebar-date">
                  <span className="sidebar-date__label">{L.checkin}</span>
                  <span className="sidebar-date__day">{ciParts ? ciParts.day : '—'}</span>
                  <span className="sidebar-date__month">{ciParts ? `${ciParts.month} ${ciParts.year}` : ''}</span>
                </div>
                <div className="sidebar-date">
                  <span className="sidebar-date__label">{L.checkout}</span>
                  <span className="sidebar-date__day">{coParts ? coParts.day : '—'}</span>
                  <span className="sidebar-date__month">{coParts ? `${coParts.month} ${coParts.year}` : ''}</span>
                </div>
              </div>
              {nights > 0 && (
                <div className="sidebar-nights">{nights} {L.nights}</div>
              )}
              <div className="sidebar-fields">
                <div className="sidebar-select">
                  <select value={roomCount} onChange={e => setRoomCount(Number(e.target.value))}>
                    {[1,2,3,4].map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? L.roomSingular : L.roomPlural}</option>
                    ))}
                  </select>
                </div>
                <div className="sidebar-select">
                  <select
                    value={filterRoomId ?? ''}
                    onChange={e => setFilterRoomId(e.target.value ? Number(e.target.value) : null)}
                  >
                    <option value="">{L.allTypes}</option>
                    {rooms.map(r => (
                      <option key={r.id} value={r.id}>{roomName(r)}</option>
                    ))}
                  </select>
                </div>
                <div className="sidebar-select">
                  <select value={adults} onChange={e => setAdults(Number(e.target.value))}>
                    {[1,2,3,4,5,6,7,8].map(n => (
                      <option key={n} value={n}>{n} {L.adults}</option>
                    ))}
                  </select>
                </div>
                <div className="sidebar-select">
                  <select value={children} onChange={e => setChildren(Number(e.target.value))}>
                    {[0,1,2,3,4,5,6].map(n => (
                      <option key={n} value={n}>{n} {L.children}</option>
                    ))}
                  </select>
                </div>
              </div>
              {checkIn && !checkOut && (
                <div className="sidebar-summary">{L.selectCO}</div>
              )}
              <button
                className="btn-check-availability"
                disabled={!(checkIn && checkOut)}
                onClick={() => goToStep(2)}
              >
                {L.showRooms}
              </button>
              <div style={{ marginTop: '0.75rem', textAlign: 'center' }}>
                <button
                  type="button"
                  onClick={() => window.history.back()}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--color-text-muted)', textDecoration: 'underline' }}
                >
                  {L.back}
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <div className="step2-header">
            <button type="button" className="step2-back" onClick={() => goToStep(1)}>{L.back}</button>
            {checkIn && checkOut && (
              <span className="step2-dates">
                {formatDate(checkIn, lang)} → {formatDate(checkOut, lang)} · {nights} {L.nights}
              </span>
            )}
          </div>
          <div className="room-cards">
            {rooms.map(room => {
              const isSelected = selectedRoomId === room.id
              const features = ROOM_FEATURES[room.slug]?.[lang] ?? []
              const img = ROOM_IMAGES[room.slug]
              const rPPN = room.price_per_night
              return (
                <div
                  key={room.id}
                  className={`room-card-new${isSelected ? ' room-card-new--selected' : ''}`}
                  onClick={() => setSelectedRoomId(room.id)}
                >
                  <div className="room-card-new__gallery">
                    {img && <img src={img} alt={roomName(room)} loading="lazy" />}
                  </div>
                  <div className="room-card-new__info">
                    <div className="room-card-new__name">{roomName(room)}</div>
                    {features.length > 0 && (
                      <ul className="room-card-new__features">
                        {features.map((f, i) => <li key={i}>{f}</li>)}
                      </ul>
                    )}
                    <div className="room-card-new__footer">
                      <div className="room-card-new__price-block">
                        {rPPN && (
                          <>
                            <span className="room-card-new__price-from">{b('from')}</span>
                            <span className="room-card-new__price-amount">€ {rPPN} <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>{L.perNight}</span></span>
                          </>
                        )}
                      </div>
                      <button
                        type="button"
                        className="room-card-new__cta"
                        onClick={e => { e.stopPropagation(); setSelectedRoomId(room.id); goToStep(3) }}
                      >
                        {L.select}
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <div className="step3-header">
            <button type="button" className="step3-back" onClick={() => goToStep(2)}>{L.back}</button>
            {checkIn && checkOut && (
              <span className="step2-dates">{formatDate(checkIn, lang)} → {formatDate(checkOut, lang)}</span>
            )}
          </div>
          <form onSubmit={e => e.preventDefault()} noValidate className="step3-layout">
            <div>
              <h2 className="guest-form__title">{L.summary}</h2>

              <div className="guest-form__row guest-form__row--three">
                <div className="guest-form__field">
                  <label>{L.guestTitle}</label>
                  <select value={guestTitle} onChange={e => setGuestTitle(e.target.value)}>
                    <option value="">—</option>
                    {TITLES[lang].map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="guest-form__field">
                  <label className="required">{L.firstName}</label>
                  <input type="text" value={guestFirstName} onChange={e => setGuestFirstName(e.target.value)} required />
                </div>
                <div className="guest-form__field">
                  <label className="required">{L.lastName}</label>
                  <input type="text" value={guestLastName} onChange={e => setGuestLastName(e.target.value)} required />
                </div>
              </div>

              <div className="guest-form__row">
                <div className="guest-form__field">
                  <label className="required">{L.email}</label>
                  <input type="email" value={guestEmail} onChange={e => setGuestEmail(e.target.value)} required />
                </div>
                <div className="guest-form__field">
                  <label>{L.phone}</label>
                  <input type="tel" value={guestPhone} onChange={e => setGuestPhone(e.target.value)} placeholder="+49 …" />
                </div>
              </div>

              <div className="guest-form__row">
                <div className="guest-form__field">
                  <label>{L.country}</label>
                  <select value={guestCountry} onChange={e => setGuestCountry(e.target.value)}>
                    <option value="">—</option>
                    {COUNTRIES[lang].map(c => <option key={c.code} value={c.code}>{c.label}</option>)}
                  </select>
                </div>
                <div className="guest-form__field">
                  <label>{L.arrival}</label>
                  <select value={guestArrival} onChange={e => setGuestArrival(e.target.value)}>
                    <option value="">—</option>
                    {ARRIVAL_TIMES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <div className="guest-form__field">
                <label>{L.notes}</label>
                <textarea value={guestNotes} onChange={e => setGuestNotes(e.target.value)} rows={3} />
              </div>
            </div>

            <aside className="step3-summary">
              <div className="step3-summary__title">{L.summary}</div>
              {selectedRoom && (
                <div className="step3-summary__room">{roomName(selectedRoom)}</div>
              )}
              {checkIn && checkOut && (
                <div className="step3-summary__dates">
                  <div>
                    <span className="step3-summary__date-label">{L.checkin}</span>
                    <span className="step3-summary__date-val">{formatDate(checkIn, lang)}</span>
                  </div>
                  <div>
                    <span className="step3-summary__date-label">{L.checkout}</span>
                    <span className="step3-summary__date-val">{formatDate(checkOut, lang)}</span>
                  </div>
                </div>
              )}
              {nights > 0 && (
                <div className="step3-summary__line">
                  <span>{nights} {L.nights} {pricePerNight ? `× € ${pricePerNight}` : ''}</span>
                  {totalPrice && <span>€ {totalPrice.toFixed(0)}</span>}
                </div>
              )}
              {totalPrice && (
                <div className="step3-summary__total">
                  <span>{L.total}</span>
                  <span>€ {totalPrice.toFixed(0)}</span>
                </div>
              )}
              <button type="submit" className="btn-confirm" disabled>
                {L.comingSoon}
              </button>
              <p className="step3-summary__payment-note">{L.paymentNote}</p>
            </aside>
          </form>
        </>
      )}

      {/* Step 4 unreachable in the visual shell; Sabee will wire confirmation */}
      {step === 4 && (
        <div className="step4-wrap">
          <div className="step4-content">
            <div className="step4-icon">✓</div>
            <h1 className="step4-title">{b('confirm_title')}</h1>
            <p className="step4-subtitle">{b('confirm_text')}</p>
            <Link href={localePath(lang)} className="step4-home">{b('back_home')}</Link>
          </div>
        </div>
      )}
    </>
  )
}
