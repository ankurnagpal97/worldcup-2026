import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase.js'

const LOCAL_KEY = 'wc2026_leaderboard'

function localLoad() {
  try { return JSON.parse(localStorage.getItem(LOCAL_KEY) ?? '{}') } catch { return {} }
}
function localSave(data) {
  try { localStorage.setItem(LOCAL_KEY, JSON.stringify(data)) } catch {}
}

export function useLeaderboard() {
  const [counts, setCounts] = useState(localLoad)
  const [loading, setLoading] = useState(!!supabase)

  useEffect(() => {
    if (!supabase) return
    supabase
      .from('leaderboard')
      .select('team_code, wins')
      .then(({ data }) => {
        if (data) {
          const obj = {}
          data.forEach(row => { obj[row.team_code] = row.wins })
          setCounts(obj)
        }
        setLoading(false)
      })
  }, [])

  const recordWin = useCallback(async (teamCode) => {
    setCounts(prev => {
      const next = { ...prev, [teamCode]: (prev[teamCode] ?? 0) + 1 }
      if (!supabase) localSave(next)
      return next
    })
    if (supabase) await supabase.rpc('increment_wins', { p_team_code: teamCode })
  }, [])

  const clear = useCallback(async () => {
    setCounts({})
    if (supabase) {
      await supabase.from('leaderboard').delete().neq('team_code', '')
    } else {
      localSave({})
    }
  }, [])

  const sorted = Object.entries(counts)
    .map(([code, wins]) => ({ code, wins }))
    .sort((a, b) => b.wins - a.wins)

  return { sorted, recordWin, clear, loading }
}
