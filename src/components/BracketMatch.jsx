import { TEAMS } from '../data/teams.js'
import { winProb } from '../utils/probability.js'

export default function BracketMatch({ match, onPick, size = 'normal' }) {
  const teamA = match.teamA ? TEAMS[match.teamA] : null
  const teamB = match.teamB ? TEAMS[match.teamB] : null
  const winner = match.winner

  function handleClick(teamCode) {
    if (!teamCode) return
    if (!match.teamA || !match.teamB) return
    onPick(match.id, teamCode)
  }

  const showProb = match.teamA && match.teamB && !winner
  const prob = showProb ? winProb(match.teamA, match.teamB) : null

  const cls = size === 'large' ? 'bracket-match bracket-match--large' : 'bracket-match'

  return (
    <div className={cls}>
      <div
        className={`bracket-team ${winner === match.teamA ? 'bracket-team--winner' : ''} ${!teamA ? 'bracket-team--empty' : 'bracket-team--clickable'}`}
        onClick={() => handleClick(match.teamA)}
        title={teamA ? `Pick ${teamA.name}` : ''}
      >
        {teamA ? (
          <>
            <span className="bracket-flag">{teamA.flag}</span>
            <span className="bracket-name">{teamA.name}</span>
          </>
        ) : (
          <span className="bracket-tbd">{match.labelA}</span>
        )}
        {winner === match.teamA && <span className="bracket-check">✓</span>}
      </div>
      {showProb && (
        <div className="bracket-prob">
          <span>{Math.round(prob.probA * 100)}%</span>
          <div className="bracket-prob-track">
            <div className="bracket-prob-fill" style={{ width: `${Math.round(prob.probA * 100)}%` }} />
          </div>
          <span>{Math.round(prob.probB * 100)}%</span>
        </div>
      )}
      <div className="bracket-divider" />
      <div
        className={`bracket-team ${winner === match.teamB ? 'bracket-team--winner' : ''} ${!teamB ? 'bracket-team--empty' : 'bracket-team--clickable'}`}
        onClick={() => handleClick(match.teamB)}
        title={teamB ? `Pick ${teamB.name}` : ''}
      >
        {teamB ? (
          <>
            <span className="bracket-flag">{teamB.flag}</span>
            <span className="bracket-name">{teamB.name}</span>
          </>
        ) : (
          <span className="bracket-tbd">{match.labelB}</span>
        )}
        {winner === match.teamB && <span className="bracket-check">✓</span>}
      </div>
    </div>
  )
}
