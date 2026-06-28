import { useState, useEffect, useRef } from 'react'
import { GROUP_MATCHES } from '../data/matches.js'
import { fetchWCFixtures } from '../api/football.js'

const POLL_MS = 5 * 60 * 1000       // re-fetch fixtures.json every 5 min
const CACHE_TTL_MS = 4 * 60 * 1000  // treat cached result as fresh for 4 min
const CACHE_KEY = 'wc2026_fixtures_cache'

function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const { fixtures, timestamp } = JSON.parse(raw)
    if (Date.now() - timestamp < CACHE_TTL_MS) return { fixtures, timestamp }
  } catch {}
  return null
}

function writeCache(fixtures) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ fixtures, timestamp: Date.now() }))
  } catch {}
}

function mergeFixtures(fixtures) {
  const map = {}
  for (const f of fixtures) {
    map[`${f.homeCode}_${f.awayCode}`] = f
  }
  return GROUP_MATCHES.map(m => {
    const live = map[`${m.home}_${m.away}`]
    if (!live) return m
    if (live.finished) {
      return { ...m, status: 'completed', homeScore: live.homeScore, awayScore: live.awayScore }
    }
    if (live.live) {
      return { ...m, status: 'live', homeScore: live.homeScore, awayScore: live.awayScore }
    }
    return m
  })
}

export function useLiveMatches() {
  const cached = readCache()

  const [matches, setMatches] = useState(() => cached ? mergeFixtures(cached.fixtures) : GROUP_MATCHES)
  const [loading, setLoading] = useState(!cached)
  const [error, setError] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(() => cached ? new Date(cached.timestamp) : null)
  const timerRef = useRef(null)

  useEffect(() => {
    async function refresh() {
      try {
        const fixtures = await fetchWCFixtures()
        writeCache(fixtures)
        setMatches(mergeFixtures(fixtures))
        setLastUpdated(new Date())
        setError(null)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    const delay = cached ? Math.max(0, CACHE_TTL_MS - (Date.now() - cached.timestamp)) : 0
    const initialTimer = setTimeout(refresh, delay)
    timerRef.current = setInterval(refresh, POLL_MS)

    return () => {
      clearTimeout(initialTimer)
      clearInterval(timerRef.current)
    }
  }, [])

  return { matches, loading, error, lastUpdated }
}
