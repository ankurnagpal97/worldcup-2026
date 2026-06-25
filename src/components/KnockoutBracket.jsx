import BracketMatch from './BracketMatch.jsx'
import { TEAMS } from '../data/teams.js'

function RoundColumn({ title, matches, onPick, matchSize }) {
  return (
    <div className="bracket-round">
      <div className="round-title">{title}</div>
      <div className="round-matches">
        {matches.map(m => (
          <BracketMatch
            key={m.id}
            match={m}
            onPick={onPick}
            size={matchSize}
          />
        ))}
      </div>
    </div>
  )
}

export default function KnockoutBracket({ bracket, onPick, onSimulate }) {
  const { r32, r16, qf, sf, final } = bracket
  const champion = final[0]?.winner ? TEAMS[final[0].winner] : null

  return (
    <div className="knockout-section">
      <div className="stage-header">
        <div className="stage-header-row">
          <h2>Knockout Bracket</h2>
          <button className="simulate-btn" onClick={onSimulate}>🎲 Simulate</button>
        </div>
        <p className="stage-subtitle">
          Click a team's flag or name to advance them. Teams auto-populate from previous rounds.
        </p>
      </div>

      {champion && (
        <div className="champion-banner">
          <span className="champion-flag">{champion.flag}</span>
          <span className="champion-text">{champion.name} — Your Champion!</span>
        </div>
      )}

      <div className="bracket-scroll">
        <div className="bracket-grid">
          <RoundColumn title="Round of 32" matches={r32} onPick={onPick} />
          <RoundColumn title="Round of 16" matches={r16} onPick={onPick} />
          <RoundColumn title="Quarter-Finals" matches={qf} onPick={onPick} />
          <RoundColumn title="Semi-Finals" matches={sf} onPick={onPick} />
          <RoundColumn title="🏆 Final" matches={final} onPick={onPick} matchSize="large" />
        </div>
      </div>

      <div className="bracket-hint">
        <span>Complete the Group Stage first to populate the Round of 32 teams.</span>
      </div>
    </div>
  )
}
