import { useState, useCallback, useMemo } from 'react'
import { GROUP_MATCHES } from '../data/matches.js'
import { calcAllStandings, buildR32 } from '../utils/standings.js'
import { simulateGroupMatch, simulateFullKnockout } from '../utils/probability.js'

const STORAGE_KEY = 'wc2026_state'

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return null
}

function defaultState() {
  return {
    // Group stage: { matchId: { homeScore, awayScore } }
    groupPredictions: {},
    // Knockout: { matchId: teamCode }
    knockoutPicks: {},
    activeTab: 'groups',
    champion: null,
  }
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {}
}

export function useWorldCup(matches = GROUP_MATCHES, onChampion = null) {
  const [state, setState] = useState(() => loadState() ?? defaultState())

  const update = useCallback((updater) => {
    setState(prev => {
      const next = updater(prev)
      saveState(next)
      return next
    })
  }, [])

  const setGroupPrediction = useCallback((matchId, homeScore, awayScore) => {
    update(prev => ({
      ...prev,
      groupPredictions: {
        ...prev.groupPredictions,
        [matchId]: { homeScore, awayScore },
      },
    }))
  }, [update])

  const setKnockoutPick = useCallback((matchId, teamCode) => {
    update(prev => {
      const next = {
        ...prev,
        knockoutPicks: { ...prev.knockoutPicks, [matchId]: teamCode },
      }
      if (matchId === 'FINAL') {
        next.champion = teamCode
        onChampion?.(teamCode)
      }
      return next
    })
  }, [update, onChampion])

  const setTab = useCallback((tab) => {
    update(prev => ({ ...prev, activeTab: tab }))
  }, [update])

  const clearChampion = useCallback(() => {
    update(prev => ({ ...prev, champion: null }))
  }, [update])

  const reset = useCallback(() => {
    const fresh = defaultState()
    saveState(fresh)
    setState(fresh)
  }, [])

  const allStandings = useMemo(
    () => calcAllStandings(state.groupPredictions, matches),
    [state.groupPredictions, matches]
  )

  const r32Matches = useMemo(
    () => buildR32(allStandings),
    [allStandings]
  )

  // Build the full knockout bracket from R32 picks
  const knockoutBracket = useMemo(() => {
    const picks = state.knockoutPicks

    const r32 = r32Matches.map(m => ({
      ...m,
      winner: picks[m.id] ?? null,
    }))

    const buildRound = (roundId, prevMatches) => {
      const matches = []
      for (let i = 0; i < prevMatches.length; i += 2) {
        const a = prevMatches[i]
        const b = prevMatches[i + 1]
        const id = `${roundId}_${Math.floor(i / 2) + 1}`
        const teamA = a?.winner ?? null
        const teamB = b?.winner ?? null
        matches.push({
          id,
          labelA: a ? `W(${a.id})` : '?',
          labelB: b ? `W(${b.id})` : '?',
          teamA,
          teamB,
          winner: picks[id] ?? null,
        })
      }
      return matches
    }

    const r16 = buildRound('R16', r32)
    const qf = buildRound('QF', r16)
    const sf = buildRound('SF', qf)

    const finalTeamA = sf[0]?.winner ?? null
    const finalTeamB = sf[1]?.winner ?? null
    const final = [{
      id: 'FINAL',
      labelA: 'SF1 Winner',
      labelB: 'SF2 Winner',
      teamA: finalTeamA,
      teamB: finalTeamB,
      winner: picks['FINAL'] ?? null,
    }]

    return { r32, r16, qf, sf, final }
  }, [r32Matches, state.knockoutPicks])

  const simulateGroups = useCallback(() => {
    const newPredictions = {}
    for (const m of matches) {
      if (m.status !== 'pending') continue
      newPredictions[m.id] = simulateGroupMatch(m.home, m.away)
    }
    update(prev => ({
      ...prev,
      groupPredictions: { ...prev.groupPredictions, ...newPredictions },
    }))
  }, [matches, update])

  const simulateKnockout = useCallback(() => {
    const { picks, champion } = simulateFullKnockout(r32Matches)
    update(prev => ({ ...prev, knockoutPicks: picks, champion }))
    if (champion) onChampion?.(champion)
  }, [r32Matches, update, onChampion])

  return {
    state,
    allStandings,
    r32Matches,
    knockoutBracket,
    setGroupPrediction,
    setKnockoutPick,
    setTab,
    clearChampion,
    reset,
    simulateGroups,
    simulateKnockout,
  }
}
