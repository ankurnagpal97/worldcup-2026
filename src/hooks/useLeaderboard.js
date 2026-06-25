import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase.js'

export function useLeaderboard() {
  const [counts, setCounts] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
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
    setCounts(prev => ({ ...prev, [teamCode]: (prev[teamCode] ?? 0) + 1 }))
    await supabase.rpc('increment_wins', { p_team_code: teamCode })
  }, [])

  const clear = useCallback(async () => {
    setCounts({})
    await supabase.from('leaderboard').delete().neq('team_code', '')
  }, [])

  const sorted = Object.entries(counts)
    .map(([code, wins]) => ({ code, wins }))
    .sort((a, b) => b.wins - a.wins)

  return { sorted, recordWin, clear, loading }
}
