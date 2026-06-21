import { useEffect, useState } from 'react'
import lenis from '../lib/lenis'

const LOGO = 'https://www.olymposlodge.com.tr/wp-content/uploads/2024/11/olympos-lodge-logo-e1730775765361.png'

export default function LoadingScreen() {
  const [phase, setPhase] = useState<'in' | 'out' | 'done'>('in')

  useEffect(() => {
    lenis.stop()

    const finish = () => {
      setTimeout(() => {
        setPhase('out')
        setTimeout(() => {
          setPhase('done')
          lenis.start()
        }, 1000)
      }, 1000)
    }

    if (document.readyState === 'complete') {
      finish()
    } else {
      window.addEventListener('load', finish, { once: true })
      return () => window.removeEventListener('load', finish)
    }
  }, [])

  if (phase === 'done') return null

  return (
    <div className={`loading-screen${phase === 'out' ? ' loading-screen--out' : ''}`}>
      <img
        src={LOGO}
        alt="Olympos Lodge"
        className="loading-screen__logo"
        width={280}
        height={140}
      />
    </div>
  )
}
