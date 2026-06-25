import { TEAMS } from '../data/teams.js'
import { winProb } from '../utils/probability.js'

function WinProbBar({ home, away }) {
  const { probA } = winProb(home, away)
  const homePct = Math.round(probA * 100)
  const awayPct = 100 - homePct
  return (
    <div className="win-prob-bar">
      <span className="prob-label">{homePct}%</span>
      <div className="prob-track">
        <div className="prob-fill" style={{ width: `${homePct}%` }} />
      </div>
      <span className="prob-label">{awayPct}%</span>
    </div>
  )
}

function ScoreInput({ value, onChange, disabled }) {
  return (
    <div className="score-input">
      <button
        className="score-btn"
        onClick={() => !disabled && onChange(Math.max(0, value - 1))}
        disabled={disabled}
      >−</button>
      <span className="score-value">{value}</span>
      <button
        className="score-btn"
        onClick={() => !disabled && onChange(value + 1)}
        disabled={disabled}
      >+</button>
    </div>
  )
}

function MatchRow({ match, prediction, onPredict }) {
  const home = TEAMS[match.home]
  const away = TEAMS[match.away]
  const completed = match.status === 'completed' || match.status === 'live'

  const hScore = completed ? match.homeScore : (prediction?.homeScore ?? 0)
  const aScore = completed ? match.awayScore : (prediction?.awayScore ?? 0)

  return (
    <div className={`match-row ${completed ? 'completed' : 'pending'}`}>
      <div className="match-team home">
        <span className="flag">{home.flag}</span>
        <span className="team-name">{home.name}</span>
      </div>
      {completed ? (
        <div className="score-display completed-score">
          <span>{hScore}</span>
          <span className="score-sep">–</span>
          <span>{aScore}</span>
        </div>
      ) : (
        <div className="score-display predict-score">
          <ScoreInput
            value={hScore}
            onChange={v => onPredict(match.id, v, aScore)}
          />
          <span className="score-sep vs-text">vs</span>
          <ScoreInput
            value={aScore}
            onChange={v => onPredict(match.id, hScore, v)}
          />
        </div>
      )}
      <div className="match-team away">
        <span className="team-name">{away.name}</span>
        <span className="flag">{away.flag}</span>
      </div>
      {!completed && (
        <span className="pending-badge">Predict</span>
      )}
      {match.status === 'live' && (
        <span className="live-badge">LIVE</span>
      )}
      {!completed && (
        <WinProbBar home={match.home} away={match.away} />
      )}
    </div>
  )
}

export default function GroupCard({ group, matches, standings, predictions, onPredict }) {
  const groupMatches = matches.filter(m => m.group === group)
  const matchdays = [1, 2, 3]

  return (
    <div className="group-card">
      <h3 className="group-title">Group {group}</h3>
      <table className="standings-table">
        <thead>
          <tr>
            <th className="rank-col">#</th>
            <th className="team-col">Team</th>
            <th>P</th>
            <th>W</th>
            <th>D</th>
            <th>L</th>
            <th>GD</th>
            <th>Pts</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((row, i) => {
            const team = TEAMS[row.team]
            return (
              <tr key={row.team} className={i < 2 ? 'qualifier' : i === 2 ? 'third-place' : ''}>
                <td className="rank-col">{i + 1}</td>
                <td className="team-col">
                  <span className="flag">{team?.flag}</span>
                  <span>{team?.name}</span>
                </td>
                <td>{row.played}</td>
                <td>{row.won}</td>
                <td>{row.drawn}</td>
                <td>{row.lost}</td>
                <td>{row.gd > 0 ? '+' : ''}{row.gd}</td>
                <td className="pts">{row.pts}</td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <div className="matches-section">
        {matchdays.map(md => {
          const mdMatches = groupMatches.filter(m => m.matchday === md)
          return (
            <div key={md} className="matchday">
              <div className="matchday-label">Matchday {md}</div>
              {mdMatches.map(m => (
                <MatchRow
                  key={m.id}
                  match={m}
                  prediction={predictions[m.id]}
                  onPredict={(id, h, a) => onPredict(id, h, a)}
                />
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}
