import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import '../styles/chat.css'

interface Message {
  role: 'user' | 'model'
  text: string
}

const WELCOME: Record<string, string> = {
  de: 'Willkommen beim Olympos Lodge! Wie kann ich Ihnen helfen?',
  en: 'Welcome to Olympos Lodge! How can I help you?',
  tr: 'Olympos Lodge\'a hoş geldiniz! Size nasıl yardımcı olabilirim?',
}

const PLACEHOLDER: Record<string, string> = {
  de: 'Ihre Nachricht…',
  en: 'Type your message…',
  tr: 'Mesajınızı yazın…',
}

const ERROR_MSG: Record<string, string> = {
  de: 'Verbindungsfehler. Bitte versuche es erneut.',
  en: 'Connection error. Please try again.',
  tr: 'Bağlantı hatası. Lütfen tekrar deneyin.',
}

function renderMarkdown(text: string): string {
  return text
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^[-•]\s+(.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>')
    .replace(/\n{2,}/g, '</p><p>')
    .replace(/\n/g, '<br>')
    .replace(/^/, '<p>').replace(/$/, '</p>')
    .replace(/<p><\/p>/g, '')
}

export default function ChatWidget() {
  const { i18n } = useTranslation()
  const lang = i18n.language?.slice(0, 2) || 'de'

  const [open, setOpen]        = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput]      = useState('')
  const [loading, setLoading]  = useState(false)
  const bottomRef              = useRef<HTMLDivElement>(null)
  const inputRef               = useRef<HTMLInputElement>(null)
  const conversationId         = useRef(crypto.randomUUID())

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300)
  }, [open])

  async function send() {
    const text = input.trim()
    if (!text || loading) return
    setInput('')

    const next: Message[] = [...messages, { role: 'user', text }]
    setMessages(next)
    setLoading(true)

    try {
      const res = await fetch('/api/v1/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ messages: next, conversation_id: conversationId.current, language: lang }),
      })
      const data = await res.json()
      setMessages(m => [...m, { role: 'model', text: data.text ?? data.error ?? '…' }])
    } catch {
      setMessages(m => [...m, { role: 'model', text: ERROR_MSG[lang] ?? ERROR_MSG.en }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div
        className={`chat-panel${open ? ' chat-panel--open' : ''}`}
        role="dialog"
        aria-label="Olympos Assistant"
        aria-hidden={!open}
      >
        <div className="chat-panel__header">
          <div className="chat-panel__title">
            <span className="chat-panel__dot" />
            Olympos Assistant
          </div>
          <button className="chat-panel__close" onClick={() => setOpen(false)} aria-label="Schließen">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="chat-panel__messages">
          <div className="chat-msg chat-msg--model">
            <p>{WELCOME[lang] ?? WELCOME.de}</p>
          </div>
          {messages.map((m, i) => (
            <div key={i} className={`chat-msg chat-msg--${m.role}`}>
              {m.role === 'model'
                ? <div dangerouslySetInnerHTML={{ __html: renderMarkdown(m.text) }} />
                : <p>{m.text}</p>
              }
            </div>
          ))}
          {loading && (
            <div className="chat-msg chat-msg--model chat-msg--typing" aria-label="Schreibt…">
              <span /><span /><span />
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="chat-panel__input">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            placeholder={PLACEHOLDER[lang] ?? PLACEHOLDER.de}
            disabled={loading}
            autoComplete="off"
          />
          <button onClick={send} disabled={loading || !input.trim()} aria-label="Senden">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      <button
        className={`chat-fab${open ? ' chat-fab--open' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Chat schließen' : 'Chat öffnen'}
        aria-expanded={open}
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
              stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>
    </>
  )
}
