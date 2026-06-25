// football-data.org TLA codes that differ from this app's 3-letter codes
const TLA_REMAP = {
  'CUW': 'CUR', // Curaçao
  'CPV': 'CPV', // Cabo Verde (same)
  'IRN': 'IRN', // Iran (same)
}

const FINISHED = new Set(['FINISHED'])
const IN_PLAY  = new Set(['IN_PLAY', 'PAUSED', 'HALFTIME', 'EXTRA_TIME', 'PENALTY_SHOOTOUT'])

// In dev, use the Vite proxy to avoid CORS on localhost.
// In production (GitHub Pages), call the API directly — football-data.org supports CORS on real domains.
const API_URL = import.meta.env.DEV
  ? '/football-api/v4/competitions/WC/matches'
  : 'https://api.football-data.org/v4/competitions/WC/matches'

export async function fetchWCFixtures(apiKey) {
  const res = await fetch(API_URL, {
    headers: { 'X-Auth-Token': apiKey },
  })
  if (!res.ok) throw new Error(`football-data.org error ${res.status}`)
  const json = await res.json()

  return json.matches.flatMap(m => {
    const homeCode = TLA_REMAP[m.homeTeam.tla] ?? m.homeTeam.tla
    const awayCode = TLA_REMAP[m.awayTeam.tla] ?? m.awayTeam.tla
    if (!homeCode || !awayCode) return []
    const status = m.status
    return [{
      homeCode,
      awayCode,
      homeScore: m.score.fullTime.home ?? 0,
      awayScore: m.score.fullTime.away ?? 0,
      finished: FINISHED.has(status),
      live: IN_PLAY.has(status),
    }]
  })
}
