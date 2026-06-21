import { useEffect } from 'react'
import { useLocation, Outlet } from 'react-router-dom'
import ChatWidget from '../ChatWidget'
import CookieConsent from '../CookieConsent'
import Footer from './Footer'
import Header from './Header'

function ScrollReveal() {
  const { pathname } = useLocation()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )

    const els = document.querySelectorAll<HTMLElement>('.reveal, .reveal-left, .reveal-right, .breathe')
    els.forEach((el, i) => {
      if (!el.style.transitionDelay) el.style.transitionDelay = `${i * 0.06}s`
      observer.observe(el)
    })

    const storyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed')
            storyObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08 }
    )
    document.querySelectorAll<HTMLElement>('.story-block__content').forEach(el => storyObserver.observe(el))

    return () => { observer.disconnect(); storyObserver.disconnect() }
  }, [pathname])

  return null
}

export default function Layout() {
  return (
    <>
      <Header />
      <ScrollReveal />
      <main>
        <Outlet />
      </main>
      <Footer />
      <CookieConsent />
      <ChatWidget />
    </>
  )
}
