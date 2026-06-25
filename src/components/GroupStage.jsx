import { GROUPS } from '../data/teams.js'
import GroupCard from './GroupCard.jsx'

export default function GroupStage({ matches, allStandings, predictions, onPredict, onSimulate }) {
  return (
    <div className="group-stage">
      <div className="stage-header">
        <div className="stage-header-row">
          <h2>Group Stage</h2>
          <button className="simulate-btn" onClick={onSimulate}>🎲 Simulate</button>
        </div>
        <p className="stage-subtitle">
          Predict pending matches by setting scores. Completed matches show real results.
        </p>
        <div className="legend">
          <span className="legend-item qualifier-dot">Top 2 qualify</span>
          <span className="legend-item third-dot">3rd — may qualify</span>
        </div>
      </div>
      <div className="groups-grid">
        {GROUPS.map(g => (
          <GroupCard
            key={g}
            group={g}
            matches={matches}
            standings={allStandings[g] ?? []}
            predictions={predictions}
            onPredict={onPredict}
          />
        ))}
      </div>
    </div>
  )
}
