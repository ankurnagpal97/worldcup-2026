// status: 'completed' | 'pending'
// For completed: homeScore and awayScore are set
// For pending: user predictions fill in

export const GROUP_MATCHES = [
  // ─── GROUP A ───────────────────────────────────────────────
  { id: 'A1', group: 'A', matchday: 1, home: 'MEX', away: 'RSA', date: '2026-06-12', status: 'pending' },
  { id: 'A2', group: 'A', matchday: 1, home: 'KOR', away: 'CZE', date: '2026-06-12', status: 'pending' },
  { id: 'A3', group: 'A', matchday: 2, home: 'MEX', away: 'KOR', date: '2026-06-18', homeScore: 1, awayScore: 0, status: 'completed' },
  { id: 'A4', group: 'A', matchday: 2, home: 'CZE', away: 'RSA', date: '2026-06-18', status: 'pending' },
  { id: 'A5', group: 'A', matchday: 3, home: 'MEX', away: 'CZE', date: '2026-06-24', status: 'pending' },
  { id: 'A6', group: 'A', matchday: 3, home: 'RSA', away: 'KOR', date: '2026-06-24', status: 'pending' },

  // ─── GROUP B ───────────────────────────────────────────────
  { id: 'B1', group: 'B', matchday: 1, home: 'CAN', away: 'BIH', date: '2026-06-12', homeScore: 1, awayScore: 1, status: 'completed' },
  { id: 'B2', group: 'B', matchday: 1, home: 'SUI', away: 'QAT', date: '2026-06-13', homeScore: 1, awayScore: 1, status: 'completed' },
  { id: 'B3', group: 'B', matchday: 2, home: 'SUI', away: 'BIH', date: '2026-06-18', homeScore: 4, awayScore: 1, status: 'completed' },
  { id: 'B4', group: 'B', matchday: 2, home: 'CAN', away: 'QAT', date: '2026-06-18', homeScore: 6, awayScore: 0, status: 'completed' },
  { id: 'B5', group: 'B', matchday: 3, home: 'SUI', away: 'CAN', date: '2026-06-24', status: 'pending' },
  { id: 'B6', group: 'B', matchday: 3, home: 'BIH', away: 'QAT', date: '2026-06-24', status: 'pending' },

  // ─── GROUP C ───────────────────────────────────────────────
  { id: 'C1', group: 'C', matchday: 1, home: 'BRA', away: 'MAR', date: '2026-06-13', homeScore: 1, awayScore: 1, status: 'completed' },
  { id: 'C2', group: 'C', matchday: 1, home: 'SCO', away: 'HAI', date: '2026-06-13', homeScore: 1, awayScore: 0, status: 'completed' },
  { id: 'C3', group: 'C', matchday: 2, home: 'MAR', away: 'SCO', date: '2026-06-19', homeScore: 1, awayScore: 0, status: 'completed' },
  { id: 'C4', group: 'C', matchday: 2, home: 'BRA', away: 'HAI', date: '2026-06-19', homeScore: 3, awayScore: 0, status: 'completed' },
  { id: 'C5', group: 'C', matchday: 3, home: 'BRA', away: 'SCO', date: '2026-06-24', status: 'pending' },
  { id: 'C6', group: 'C', matchday: 3, home: 'MAR', away: 'HAI', date: '2026-06-24', status: 'pending' },

  // ─── GROUP D ───────────────────────────────────────────────
  { id: 'D1', group: 'D', matchday: 1, home: 'USA', away: 'PAR', date: '2026-06-12', homeScore: 4, awayScore: 1, status: 'completed' },
  { id: 'D2', group: 'D', matchday: 1, home: 'AUS', away: 'TUR', date: '2026-06-13', homeScore: 2, awayScore: 0, status: 'completed' },
  { id: 'D3', group: 'D', matchday: 2, home: 'USA', away: 'AUS', date: '2026-06-19', homeScore: 2, awayScore: 0, status: 'completed' },
  { id: 'D4', group: 'D', matchday: 2, home: 'TUR', away: 'PAR', date: '2026-06-19', homeScore: 0, awayScore: 1, status: 'completed' },
  { id: 'D5', group: 'D', matchday: 3, home: 'USA', away: 'TUR', date: '2026-06-25', status: 'pending' },
  { id: 'D6', group: 'D', matchday: 3, home: 'PAR', away: 'AUS', date: '2026-06-25', status: 'pending' },

  // ─── GROUP E ───────────────────────────────────────────────
  { id: 'E1', group: 'E', matchday: 1, home: 'GER', away: 'CUR', date: '2026-06-14', homeScore: 7, awayScore: 1, status: 'completed' },
  { id: 'E2', group: 'E', matchday: 1, home: 'CIV', away: 'ECU', date: '2026-06-14', homeScore: 1, awayScore: 0, status: 'completed' },
  { id: 'E3', group: 'E', matchday: 2, home: 'GER', away: 'CIV', date: '2026-06-20', homeScore: 2, awayScore: 1, status: 'completed' },
  { id: 'E4', group: 'E', matchday: 2, home: 'ECU', away: 'CUR', date: '2026-06-20', homeScore: 0, awayScore: 0, status: 'completed' },
  { id: 'E5', group: 'E', matchday: 3, home: 'GER', away: 'ECU', date: '2026-06-25', status: 'pending' },
  { id: 'E6', group: 'E', matchday: 3, home: 'CIV', away: 'CUR', date: '2026-06-25', status: 'pending' },

  // ─── GROUP F ───────────────────────────────────────────────
  { id: 'F1', group: 'F', matchday: 1, home: 'NED', away: 'JPN', date: '2026-06-14', homeScore: 2, awayScore: 2, status: 'completed' },
  { id: 'F2', group: 'F', matchday: 1, home: 'SWE', away: 'TUN', date: '2026-06-14', homeScore: 5, awayScore: 1, status: 'completed' },
  { id: 'F3', group: 'F', matchday: 2, home: 'NED', away: 'SWE', date: '2026-06-20', homeScore: 5, awayScore: 1, status: 'completed' },
  { id: 'F4', group: 'F', matchday: 2, home: 'JPN', away: 'TUN', date: '2026-06-20', homeScore: 4, awayScore: 0, status: 'completed' },
  { id: 'F5', group: 'F', matchday: 3, home: 'NED', away: 'TUN', date: '2026-06-25', status: 'pending' },
  { id: 'F6', group: 'F', matchday: 3, home: 'JPN', away: 'SWE', date: '2026-06-25', status: 'pending' },

  // ─── GROUP G ───────────────────────────────────────────────
  { id: 'G1', group: 'G', matchday: 1, home: 'BEL', away: 'EGY', date: '2026-06-15', homeScore: 1, awayScore: 1, status: 'completed' },
  { id: 'G2', group: 'G', matchday: 1, home: 'IRN', away: 'NZL', date: '2026-06-15', status: 'pending' },
  { id: 'G3', group: 'G', matchday: 2, home: 'BEL', away: 'IRN', date: '2026-06-21', homeScore: 1, awayScore: 1, status: 'completed' },
  { id: 'G4', group: 'G', matchday: 2, home: 'EGY', away: 'NZL', date: '2026-06-21', status: 'pending' },
  { id: 'G5', group: 'G', matchday: 3, home: 'BEL', away: 'NZL', date: '2026-06-25', status: 'pending' },
  { id: 'G6', group: 'G', matchday: 3, home: 'EGY', away: 'IRN', date: '2026-06-25', status: 'pending' },

  // ─── GROUP H ───────────────────────────────────────────────
  { id: 'H1', group: 'H', matchday: 1, home: 'ESP', away: 'KSA', date: '2026-06-15', status: 'pending' },
  { id: 'H2', group: 'H', matchday: 1, home: 'URU', away: 'CPV', date: '2026-06-15', homeScore: 0, awayScore: 0, status: 'completed' },
  { id: 'H3', group: 'H', matchday: 2, home: 'ESP', away: 'CPV', date: '2026-06-21', status: 'pending' },
  { id: 'H4', group: 'H', matchday: 2, home: 'KSA', away: 'URU', date: '2026-06-21', status: 'pending' },
  { id: 'H5', group: 'H', matchday: 3, home: 'ESP', away: 'URU', date: '2026-06-26', status: 'pending' },
  { id: 'H6', group: 'H', matchday: 3, home: 'CPV', away: 'KSA', date: '2026-06-26', status: 'pending' },

  // ─── GROUP I ───────────────────────────────────────────────
  { id: 'I1', group: 'I', matchday: 1, home: 'NOR', away: 'IRQ', date: '2026-06-14', homeScore: 4, awayScore: 1, status: 'completed' },
  { id: 'I2', group: 'I', matchday: 1, home: 'FRA', away: 'SEN', date: '2026-06-14', status: 'pending' },
  { id: 'I3', group: 'I', matchday: 2, home: 'NOR', away: 'SEN', date: '2026-06-20', homeScore: 3, awayScore: 2, status: 'completed' },
  { id: 'I4', group: 'I', matchday: 2, home: 'FRA', away: 'IRQ', date: '2026-06-20', status: 'pending' },
  { id: 'I5', group: 'I', matchday: 3, home: 'NOR', away: 'FRA', date: '2026-06-25', status: 'pending' },
  { id: 'I6', group: 'I', matchday: 3, home: 'IRQ', away: 'SEN', date: '2026-06-25', status: 'pending' },

  // ─── GROUP J ───────────────────────────────────────────────
  { id: 'J1', group: 'J', matchday: 1, home: 'ARG', away: 'ALG', date: '2026-06-15', homeScore: 3, awayScore: 0, status: 'completed' },
  { id: 'J2', group: 'J', matchday: 1, home: 'AUT', away: 'JOR', date: '2026-06-15', status: 'pending' },
  { id: 'J3', group: 'J', matchday: 2, home: 'ARG', away: 'AUT', date: '2026-06-22', homeScore: 2, awayScore: 0, status: 'completed' },
  { id: 'J4', group: 'J', matchday: 2, home: 'ALG', away: 'JOR', date: '2026-06-22', status: 'pending' },
  { id: 'J5', group: 'J', matchday: 3, home: 'ARG', away: 'JOR', date: '2026-06-26', status: 'pending' },
  { id: 'J6', group: 'J', matchday: 3, home: 'ALG', away: 'AUT', date: '2026-06-26', status: 'pending' },

  // ─── GROUP K ───────────────────────────────────────────────
  { id: 'K1', group: 'K', matchday: 1, home: 'COL', away: 'UZB', date: '2026-06-16', homeScore: 3, awayScore: 1, status: 'completed' },
  { id: 'K2', group: 'K', matchday: 1, home: 'POR', away: 'COD', date: '2026-06-16', status: 'pending' },
  { id: 'K3', group: 'K', matchday: 2, home: 'COL', away: 'COD', date: '2026-06-22', homeScore: 1, awayScore: 0, status: 'completed' },
  { id: 'K4', group: 'K', matchday: 2, home: 'POR', away: 'UZB', date: '2026-06-22', status: 'pending' },
  { id: 'K5', group: 'K', matchday: 3, home: 'COL', away: 'POR', date: '2026-06-26', status: 'pending' },
  { id: 'K6', group: 'K', matchday: 3, home: 'UZB', away: 'COD', date: '2026-06-26', status: 'pending' },

  // ─── GROUP L ───────────────────────────────────────────────
  { id: 'L1', group: 'L', matchday: 1, home: 'ENG', away: 'PAN', date: '2026-06-16', status: 'pending' },
  { id: 'L2', group: 'L', matchday: 1, home: 'CRO', away: 'GHA', date: '2026-06-16', status: 'pending' },
  { id: 'L3', group: 'L', matchday: 2, home: 'ENG', away: 'GHA', date: '2026-06-23', homeScore: 0, awayScore: 0, status: 'completed' },
  { id: 'L4', group: 'L', matchday: 2, home: 'CRO', away: 'PAN', date: '2026-06-23', status: 'pending' },
  { id: 'L5', group: 'L', matchday: 3, home: 'ENG', away: 'CRO', date: '2026-06-26', status: 'pending' },
  { id: 'L6', group: 'L', matchday: 3, home: 'GHA', away: 'PAN', date: '2026-06-26', status: 'pending' },
]

export function getGroupMatches(group) {
  return GROUP_MATCHES.filter(m => m.group === group)
}
