import { FIFA_RANK } from '../data/rankings.js'

const DEFAULT_RANK = 120

// Strength is inverse of sqrt(rank): rank 1 is strongest
function strength(code) {
  return 1 / Math.sqrt(FIFA_RANK[code] ?? DEFAULT_RANK)
}

// Returns win probability for each team in a head-to-head (no draw)
export function winProb(codeA, codeB) {
  const sA = strength(codeA)
  const sB = strength(codeB)
  const probA = sA / (sA + sB)
  return { probA, probB: 1 - probA }
}

const DRAW_RATE = 0.27
const HOME_WIN_SCORES = [[1,0],[1,0],[2,0],[2,1],[2,1],[3,0],[3,1],[3,2],[4,1]]
const DRAW_SCORES     = [[0,0],[1,1],[1,1],[1,1],[2,2]]

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)] }

export function simulateGroupMatch(homeCode, awayCode) {
  const { probA } = winProb(homeCode, awayCode)
  const r = Math.random()
  const homeWinCutoff = probA * (1 - DRAW_RATE)
  const drawCutoff    = homeWinCutoff + DRAW_RATE

  if (r < homeWinCutoff) {
    const [h, a] = pick(HOME_WIN_SCORES)
    return { homeScore: h, awayScore: a }
  } else if (r < drawCutoff) {
    const [h, a] = pick(DRAW_SCORES)
    return { homeScore: h, awayScore: a }
  } else {
    const [h, a] = pick(HOME_WIN_SCORES) // flip for away win
    return { homeScore: a, awayScore: h }
  }
}

export function simulateKnockoutMatch(codeA, codeB) {
  const { probA } = winProb(codeA, codeB)
  return Math.random() < probA ? codeA : codeB
}

// Simulate the full knockout bracket from R32 onwards.
// r32Matches must be the pre-built array from buildR32().
export function simulateFullKnockout(r32Matches) {
  const picks = {}

  function sim(id, teamA, teamB) {
    if (!teamA && !teamB) return null
    const winner = teamA && teamB ? simulateKnockoutMatch(teamA, teamB) : (teamA ?? teamB)
    picks[id] = winner
    return winner
  }

  const r32 = r32Matches.map(m => ({ ...m, winner: sim(m.id, m.teamA, m.teamB) }))

  function buildAndSim(prev, roundId) {
    const out = []
    for (let i = 0; i < prev.length; i += 2) {
      const id = `${roundId}_${Math.floor(i / 2) + 1}`
      const teamA = prev[i]?.winner ?? null
      const teamB = prev[i + 1]?.winner ?? null
      out.push({ id, teamA, teamB, winner: sim(id, teamA, teamB) })
    }
    return out
  }

  const r16 = buildAndSim(r32, 'R16')
  const qf  = buildAndSim(r16, 'QF')
  const sf  = buildAndSim(qf,  'SF')

  const finalTeamA = sf[0]?.winner ?? null
  const finalTeamB = sf[1]?.winner ?? null
  const champion = sim('FINAL', finalTeamA, finalTeamB)

  return { picks, champion }
}
