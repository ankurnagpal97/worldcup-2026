import { useEffect } from 'react'
import { useWorldCup } from './hooks/useWorldCup.js'
import { useLiveMatches } from './hooks/useLiveMatches.js'
import { useLeaderboard } from './hooks/useLeaderboard.js'
import GroupStage from './components/GroupStage.jsx'
import KnockoutBracket from './components/KnockoutBracket.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Celebration from './components/Celebration.jsx'

const API_KEY = import.meta.env.VITE_FOOTBALL_DATA_KEY

export default function App() {
  const { matches, loading, error, lastUpdated } = useLiveMatches(API_KEY)
  const { sorted: leaderboard, recordWin, clear: clearLeaderboard } = useLeaderboard()
  const {
    state,
    allStandings,
    knockoutBracket,
    setGroupPrediction,
    setKnockoutPick,
    setTab,
    clearChampion,
    reset,
    simulateGroups,
    simulateKnockout,
  } = useWorldCup(matches, recordWin)

  // Show celebration when final is picked
  const showCelebration = !!state.champion

  // Auto-dismiss celebration on ESC
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape' && showCelebration) clearChampion()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [showCelebration, clearChampion])

  function handleKnockoutPick(matchId, teamCode) {
    setKnockoutPick(matchId, teamCode)
    // Trigger celebration when final is picked
    if (matchId === 'FINAL') {
      setTimeout(() => {}, 0) // handled via state.champion
    }
  }

  function handleReset() {
    if (window.confirm('Reset all predictions? This cannot be undone.')) {
      reset()
    }
  }

  return (
    <div className="app">
      {showCelebration && (
        <Celebration champion={state.champion} onClose={clearChampion} />
      )}

      <header className="app-header">
        <div className="header-inner">
          <div className="header-brand">
            <span className="header-trophy">🏆</span>
            <div>
              <h1 className="header-title">FIFA World Cup 2026™</h1>
              <p className="header-sub">Predictor — USA · Canada · Mexico</p>
            </div>
          </div>
          <button className="reset-btn" onClick={handleReset}>
            ↺ Reset All
          </button>
        </div>

        <nav className="tab-bar">
          <button
            className={`tab-btn ${state.activeTab === 'groups' ? 'active' : ''}`}
            onClick={() => setTab('groups')}
          >
            Group Stage
          </button>
          <button
            className={`tab-btn ${state.activeTab === 'knockout' ? 'active' : ''}`}
            onClick={() => setTab('knockout')}
          >
            Knockout Bracket
          </button>
          <button
            className={`tab-btn ${state.activeTab === 'leaderboard' ? 'active' : ''}`}
            onClick={() => setTab('leaderboard')}
          >
            Leaderboard {leaderboard.length > 0 && `(${leaderboard.reduce((s, e) => s + e.wins, 0)})`}
          </button>
        </nav>
      </header>

      <main className="app-main">
        {state.activeTab === 'groups' ? (
          <GroupStage
            matches={matches}
            allStandings={allStandings}
            predictions={state.groupPredictions}
            onPredict={setGroupPrediction}
            onSimulate={simulateGroups}
          />
        ) : state.activeTab === 'knockout' ? (
          <KnockoutBracket
            bracket={knockoutBracket}
            onPick={handleKnockoutPick}
            onSimulate={simulateKnockout}
          />
        ) : (
          <Leaderboard sorted={leaderboard} onClear={clearLeaderboard} />
        )}
      </main>

      <footer className="app-footer">
        {API_KEY && API_KEY !== 'your_football_data_key_here' ? (
          loading ? (
            <span>Fetching live data…</span>
          ) : error ? (
            <span className="footer-error">Live data error: {error}</span>
          ) : lastUpdated ? (
            <span>Live data · Updated {lastUpdated.toLocaleTimeString()} · Predictions saved locally</span>
          ) : null
        ) : (
          <span>Static data · Add VITE_FOOTBALL_DATA_KEY to .env for live updates · Predictions saved locally</span>
        )}
      </footer>
    </div>
  )
}
