import { useState, useCallback } from 'react'

const STORAGE_KEY = 'wc2026_leaderboard'

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch { return {} }
}

function save(data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)) } catch {}
}

export function useLeaderboard() {
  const [counts, setCounts] = useState(load)

  const recordWin = useCallback((teamCode) => {
    setCounts(prev => {
      const next = { ...prev, [teamCode]: (prev[teamCode] ?? 0) + 1 }
      save(next)
      return next
    })
  }, [])

  const clear = useCallback(() => {
    setCounts({})
    save({})
  }, [])

  const sorted = Object.entries(counts)
    .map(([code, wins]) => ({ code, wins }))
    .sort((a, b) => b.wins - a.wins)

  return { sorted, recordWin, clear }
}
