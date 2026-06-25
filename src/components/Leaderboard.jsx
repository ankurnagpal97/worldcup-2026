import { TEAMS } from '../data/teams.js'

const MEDALS = ['🥇', '🥈', '🥉']

export default function Leaderboard({ sorted, onClear }) {
  const maxWins = sorted[0]?.wins ?? 1

  return (
    <div className="leaderboard">
      <div className="stage-header">
        <div className="stage-header-row">
          <h2>Leaderboard</h2>
          {sorted.length > 0 && (
            <button className="simulate-btn" onClick={onClear}>✕ Clear</button>
          )}
        </div>
        <p className="stage-subtitle">
          Tracks how many times each country has been predicted as World Cup winner — manually or via simulate.
        </p>
      </div>

      {sorted.length === 0 ? (
        <div className="leaderboard-empty">
          No predictions yet. Pick a winner in the Knockout Bracket or hit Simulate.
        </div>
      ) : (
        <div className="leaderboard-list">
          {sorted.map(({ code, wins }, i) => {
            const team = TEAMS[code]
            const pct = Math.round((wins / maxWins) * 100)
            return (
              <div key={code} className="leaderboard-row">
                <span className="lb-rank">{MEDALS[i] ?? `${i + 1}.`}</span>
                <span className="lb-flag">{team?.flag}</span>
                <span className="lb-name">{team?.name ?? code}</span>
                <div className="lb-bar-wrap">
                  <div className="lb-bar" style={{ width: `${pct}%` }} />
                </div>
                <span className="lb-count">{wins}×</span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
