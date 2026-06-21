import { useEffect } from 'react'

export default function useScrollReveal(selector = '.reveal, .reveal-left, .reveal-right') {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(selector)
    if (!els.length) return

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

    els.forEach((el, i) => {
      if (!el.style.transitionDelay) {
        el.style.transitionDelay = `${i * 0.06}s`
      }
      observer.observe(el)
    })

    return () => observer.disconnect()
  })
}
