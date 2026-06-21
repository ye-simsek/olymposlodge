import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './lib/lenis'
import './styles/base.css'
import './styles/home.css'
import './styles/rooms.css'
import './styles/offers.css'
import './styles/cirali.css'
import './styles/pages.css'
import './styles/contact.css'
import './styles/activities.css'
import './styles/location.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
)
