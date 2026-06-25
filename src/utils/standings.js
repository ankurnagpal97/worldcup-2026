import { GROUP_MATCHES } from '../data/matches.js'
import { GROUPS, getGroupTeams } from '../data/teams.js'

function applyMatch(standing, isHome, hScore, aScore) {
  const s = { ...standing }
  const homeGoals = hScore ?? 0
  const awayGoals = aScore ?? 0
  s.played += 1
  if (isHome) {
    s.gf += homeGoals
    s.ga += awayGoals
    if (homeGoals > awayGoals) { s.won += 1; s.pts += 3 }
    else if (homeGoals === awayGoals) { s.drawn += 1; s.pts += 1 }
    else s.lost += 1
  } else {
    s.gf += awayGoals
    s.ga += homeGoals
    if (awayGoals > homeGoals) { s.won += 1; s.pts += 3 }
    else if (homeGoals === awayGoals) { s.drawn += 1; s.pts += 1 }
    else s.lost += 1
  }
  s.gd = s.gf - s.ga
  return s
}

export function calcGroupStandings(group, userPredictions, allMatches = GROUP_MATCHES) {
  const teams = getGroupTeams(group)
  const table = {}
  for (const t of teams) {
    table[t.code] = { team: t.code, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 0 }
  }

  const matches = allMatches.filter(m => m.group === group)
  for (const m of matches) {
    let hScore, aScore
    if (m.status === 'completed') {
      hScore = m.homeScore
      aScore = m.awayScore
    } else {
      const pred = userPredictions[m.id]
      if (!pred) continue
      hScore = pred.homeScore
      aScore = pred.awayScore
    }
    if (hScore === undefined || aScore === undefined) continue
    table[m.home] = applyMatch(table[m.home], true, hScore, aScore)
    table[m.away] = applyMatch(table[m.away], false, hScore, aScore)
  }

  return Object.values(table).sort((a, b) =>
    b.pts - a.pts || b.gd - a.gd || b.gf - a.gf || a.team.localeCompare(b.team)
  )
}

export function calcAllStandings(userPredictions, allMatches = GROUP_MATCHES) {
  const result = {}
  for (const g of GROUPS) {
    result[g] = calcGroupStandings(g, userPredictions, allMatches)
  }
  return result
}

export function getQualifiers(allStandings) {
  // Top 2 from each group
  const top2 = []
  for (const g of GROUPS) {
    const st = allStandings[g]
    top2.push({ team: st[0]?.team, pos: '1', group: g })
    top2.push({ team: st[1]?.team, pos: '2', group: g })
  }

  // Best 8 third-place teams
  const thirds = GROUPS.map(g => {
    const st = allStandings[g]
    return { team: st[2]?.team, group: g, pts: st[2]?.pts ?? 0, gd: st[2]?.gd ?? 0, gf: st[2]?.gf ?? 0 }
  }).sort((a, b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf)

  const best8thirds = thirds.slice(0, 8)
  return { top2, best8thirds }
}

// Build the 16 R32 matchups
export function buildR32(allStandings) {
  const { top2, best8thirds } = getQualifiers(allStandings)

  const slot = (pos, group) => top2.find(t => t.pos === pos && t.group === group)?.team ?? null
  const t3 = (idx) => best8thirds[idx]?.team ?? null

  return [
    // Section 1: Groups A, B, C (4 matches)
    { id: 'R32_1', labelA: '1A', labelB: '3rd(B/C)', teamA: slot('1','A'), teamB: t3(0) },
    { id: 'R32_2', labelA: '1B', labelB: '3rd(A/C)', teamA: slot('1','B'), teamB: t3(1) },
    { id: 'R32_3', labelA: '2A', labelB: '2B',       teamA: slot('2','A'), teamB: slot('2','B') },
    { id: 'R32_4', labelA: '1C', labelB: '2C',       teamA: slot('1','C'), teamB: slot('2','C') },
    // Section 2: Groups D, E, F (4 matches)
    { id: 'R32_5', labelA: '1D', labelB: '3rd(E/F)', teamA: slot('1','D'), teamB: t3(2) },
    { id: 'R32_6', labelA: '1E', labelB: '3rd(D/F)', teamA: slot('1','E'), teamB: t3(3) },
    { id: 'R32_7', labelA: '2D', labelB: '2E',       teamA: slot('2','D'), teamB: slot('2','E') },
    { id: 'R32_8', labelA: '1F', labelB: '2F',       teamA: slot('1','F'), teamB: slot('2','F') },
    // Section 3: Groups G, H, I (4 matches)
    { id: 'R32_9',  labelA: '1G', labelB: '3rd(H/I)', teamA: slot('1','G'), teamB: t3(4) },
    { id: 'R32_10', labelA: '1H', labelB: '3rd(G/I)', teamA: slot('1','H'), teamB: t3(5) },
    { id: 'R32_11', labelA: '2G', labelB: '2H',        teamA: slot('2','G'), teamB: slot('2','H') },
    { id: 'R32_12', labelA: '1I', labelB: '2I',        teamA: slot('1','I'), teamB: slot('2','I') },
    // Section 4: Groups J, K, L (4 matches)
    { id: 'R32_13', labelA: '1J', labelB: '3rd(K/L)', teamA: slot('1','J'), teamB: t3(6) },
    { id: 'R32_14', labelA: '1K', labelB: '3rd(J/L)', teamA: slot('1','K'), teamB: t3(7) },
    { id: 'R32_15', labelA: '2J', labelB: '2K',        teamA: slot('2','J'), teamB: slot('2','K') },
    { id: 'R32_16', labelA: '1L', labelB: '2L',        teamA: slot('1','L'), teamB: slot('2','L') },
  ]
}
