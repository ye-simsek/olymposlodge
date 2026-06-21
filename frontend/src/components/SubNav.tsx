import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function SubNav() {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const navRef      = useRef<HTMLElement>(null)
  const pageNameRef = useRef<HTMLSpanElement>(null)

  const activeTab = pathname.startsWith('/activities') ? 'activities'
    : pathname.startsWith('/lodge') ? 'lodge'
    : 'experiences'

  const pageName = activeTab === 'activities' ? t('nav.activities')
    : activeTab === 'lodge' ? t('nav.at_lodge')
    : t('nav.experiences')

  useEffect(() => {
    const el         = navRef.current
    const pageNameEl = pageNameRef.current
    if (!el) return

    let wasSticky = false

    const onScroll = () => {
      const isSticky = wasSticky ? window.scrollY > 3 : window.scrollY > 10
      if (isSticky === wasSticky) return
      wasSticky = isSticky
      el.classList.toggle('sticky', isSticky)
      if (pageNameEl) {
        if (isSticky) {
          setTimeout(() => pageNameEl.classList.add('is-visible'), 50)
        } else {
          pageNameEl.classList.remove('is-visible')
        }
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav id="subnav" ref={navRef}>
      <span className="page-name" ref={pageNameRef}>{pageName}</span>
      <div className="row">
        <ul>
          <li>
            <Link
              to="/experiences"
              className={activeTab === 'experiences' ? 'active' : ''}
              style={{ '--icon': "url('/images/icons/cirali-column.svg')" } as React.CSSProperties}
            >
              {t('nav.experiences')}
            </Link>
          </li>
          <li>
            <Link
              to="/activities"
              className={activeTab === 'activities' ? 'active' : ''}
              style={{ '--icon': "url('/images/icons/activities-signpost.svg')" } as React.CSSProperties}
            >
              {t('nav.activities')}
            </Link>
          </li>
          <li>
            <Link
              to="/lodge"
              className={activeTab === 'lodge' ? 'active' : ''}
              style={{ '--icon': "url('/images/icons/lodge-key.svg')" } as React.CSSProperties}
            >
              {t('nav.at_lodge')}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
