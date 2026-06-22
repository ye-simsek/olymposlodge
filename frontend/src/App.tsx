import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import lenis from './lib/lenis'
import LoadingScreen from './components/LoadingScreen'
import './i18n'

const Layout          = lazy(() => import('./components/layout/Layout'))
const ActivitiesPage  = lazy(() => import('./pages/ActivitiesPage'))
const LodgePage       = lazy(() => import('./pages/LodgePage'))
const BookingPage     = lazy(() => import('./pages/BookingPage'))
const ContactPage   = lazy(() => import('./pages/ContactPage'))
const ExperiencesPage = lazy(() => import('./pages/ExperiencesPage'))
const GalleryPage   = lazy(() => import('./pages/GalleryPage'))
const HomePage      = lazy(() => import('./pages/HomePage'))
const LocationPage  = lazy(() => import('./pages/LocationPage'))
const NotFoundPage  = lazy(() => import('./pages/NotFoundPage'))
const OffersPage    = lazy(() => import('./pages/OffersPage'))
const PrivacyPage   = lazy(() => import('./pages/PrivacyPage'))
const RoomDetailPage = lazy(() => import('./pages/RoomDetailPage'))
const RoomsPage     = lazy(() => import('./pages/RoomsPage'))
const TermsPage     = lazy(() => import('./pages/TermsPage'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    lenis.scrollTo(0, { immediate: true })

    // Push page_view to dataLayer on every route change (SPA support for GTM)
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_path: pathname,
        page_location: window.location.href,
      })
    }
  }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <LoadingScreen />
      <Suspense>
        <ScrollToTop />
        <Routes>
          <Route path="booking" element={<BookingPage />} />
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="rooms" element={<RoomsPage />} />
            <Route path="rooms/:slug" element={<RoomDetailPage />} />
            <Route path="experiences" element={<ExperiencesPage />} />
            <Route path="activities" element={<ActivitiesPage />} />
            <Route path="lodge" element={<LodgePage />} />
            <Route path="location" element={<LocationPage />} />
            <Route path="gallery" element={<GalleryPage />} />
            <Route path="offers" element={<OffersPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="terms" element={<TermsPage />} />
            <Route path="privacy" element={<PrivacyPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
