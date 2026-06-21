import { useState, useEffect } from 'react'

type MediaMap = Record<string, string>

let globalMedia: MediaMap = {}
let fetchPromise: Promise<void> | null = null

function fetchMedia(): Promise<void> {
  if (fetchPromise) return fetchPromise
  fetchPromise = fetch('/api/v1/media')
    .then(r => r.ok ? r.json() : {})
    .then((data: MediaMap) => { globalMedia = data })
    .catch(() => {})
  return fetchPromise
}

export function useSiteMedia(): (key: string, fallback: string) => string {
  const [, forceUpdate] = useState(0)

  useEffect(() => {
    fetchMedia().then(() => forceUpdate(n => n + 1))
  }, [])

  return (key: string, fallback: string) => globalMedia[key] ?? fallback
}
