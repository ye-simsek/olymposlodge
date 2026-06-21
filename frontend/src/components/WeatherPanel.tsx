import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { degCompass, wmoDesc } from '../utils/wmo'

const LAT = 36.4166
const LON = 30.4742
const WEATHER_API = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=temperature_2m,weathercode,windspeed_10m,winddirection_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,windspeed_10m_max,winddirection_10m_dominant&timezone=Europe%2FIstanbul&forecast_days=5`
const MARINE_API = `https://marine-api.open-meteo.com/v1/marine?latitude=${LAT}&longitude=${LON}&daily=sea_surface_temperature_max&timezone=Europe%2FIstanbul&forecast_days=5`

interface WeatherData {
  current: {
    temperature_2m: number
    weathercode: number
    windspeed_10m: number
    winddirection_10m: number
  }
  daily: {
    time: string[]
    weathercode: number[]
    temperature_2m_max: number[]
    temperature_2m_min: number[]
    windspeed_10m_max: number[]
    winddirection_10m_dominant: number[]
  }
}

interface MarineData {
  daily: { sea_surface_temperature_max: number[] }
}

export default function WeatherPanel() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language?.split('-')[0] || 'tr'

  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [marine, setMarine] = useState<MarineData | null>(null)
  const [activeDay, setActiveDay] = useState(0)
  const [status, setStatus] = useState<'loading' | 'ok' | 'error'>('loading')
  const fetched = useRef(false)

  useEffect(() => {
    if (fetched.current) return
    fetched.current = true
    Promise.all([
      fetch(WEATHER_API).then((r) => r.json()),
      fetch(MARINE_API).then((r) => r.json()).catch(() => null),
    ]).then(([w, m]) => {
      setWeather(w)
      setMarine(m)
      setStatus('ok')
    }).catch(() => setStatus('error'))
  }, [])

  const days = t('weather.days', { returnObjects: true }) as string[]
  const fullDays = t('weather.full_days', { returnObjects: true }) as string[]
  const months = t('weather.months', { returnObjects: true }) as string[]

  const now = new Date()
  const daydate = `${fullDays[now.getDay()]} · ${now.getDate()} ${months[now.getMonth()]}`

  function getDayLabel(dateStr: string, i: number) {
    return i === 0 ? t('weather.today') : days[new Date(dateStr).getDay()]
  }

  const current = weather
    ? activeDay === 0
      ? {
          temp: Math.round(weather.current.temperature_2m),
          desc: wmoDesc(weather.current.weathercode, lang),
          wind: `${degCompass(weather.current.winddirection_10m)} · ${weather.current.windspeed_10m} km/h`,
          sea: marine?.daily?.sea_surface_temperature_max?.[0] != null
            ? `${t('weather.sea')} · ${Math.round(marine.daily.sea_surface_temperature_max[0])}°`
            : '',
        }
      : {
          temp: Math.round(weather.daily.temperature_2m_max[activeDay]),
          desc: wmoDesc(weather.daily.weathercode[activeDay], lang),
          wind: `${degCompass(weather.daily.winddirection_10m_dominant[activeDay])} · ${weather.daily.windspeed_10m_max[activeDay]} km/h`,
          sea: marine?.daily?.sea_surface_temperature_max?.[activeDay] != null
            ? `${t('weather.sea')} · ${Math.round(marine.daily.sea_surface_temperature_max[activeDay])}°`
            : '',
        }
    : null

  return (
    <div className="weather-panel" aria-label="Live weather in Çıralı">
      <div className="weather-panel__date">
        <div className="weather-panel__year">{now.getFullYear()}</div>
        <div className="weather-panel__daydate">{daydate}</div>
      </div>
      <div className="weather-panel__rule" />
      <div className="weather-panel__tabs">
        {weather?.daily.time.slice(0, 5).map((dateStr, i) => (
          <button
            key={i}
            className={`wp-tab${activeDay === i ? ' is-active' : ''}`}
            onClick={() => setActiveDay(i)}
          >
            {getDayLabel(dateStr, i)}
          </button>
        ))}
      </div>
      <div className="weather-panel__rule" />
      <div className="weather-panel__body">
        <div className="weather-panel__temp">
          {status === 'loading' ? '—' : status === 'error' ? '—' : `${current?.temp}°`}
        </div>
        <div className="weather-panel__desc">
          {status === 'loading'
            ? t('weather.loading')
            : status === 'error'
            ? t('weather.unavailable')
            : current?.desc}
        </div>
        {current?.wind && <div className="weather-panel__wind">{current.wind}</div>}
        {current?.sea && <div className="weather-panel__sea">{current.sea}</div>}
      </div>
      <div className="weather-panel__rule" />
      <div className="weather-panel__strip">
        {weather?.daily.time.slice(0, 5).map((dateStr, i) => (
          <div className="wp-strip-cell" key={i}>
            <span className="wp-strip-day">{getDayLabel(dateStr, i)}</span>
            <span className="wp-strip-desc">{wmoDesc(weather.daily.weathercode[i], lang)}</span>
            <span className="wp-strip-temp">{Math.round(weather.daily.temperature_2m_max[i])}°</span>
          </div>
        ))}
      </div>
      <div className="weather-panel__location">Çıralı · Antalya</div>
    </div>
  )
}
