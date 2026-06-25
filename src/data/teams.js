export const TEAMS = {
  // Group A
  MEX: { code: 'MEX', name: 'Mexico', flag: '🇲🇽', group: 'A' },
  KOR: { code: 'KOR', name: 'South Korea', flag: '🇰🇷', group: 'A' },
  CZE: { code: 'CZE', name: 'Czechia', flag: '🇨🇿', group: 'A' },
  RSA: { code: 'RSA', name: 'South Africa', flag: '🇿🇦', group: 'A' },
  // Group B
  CAN: { code: 'CAN', name: 'Canada', flag: '🇨🇦', group: 'B' },
  BIH: { code: 'BIH', name: 'Bosnia & Herz.', flag: '🇧🇦', group: 'B' },
  QAT: { code: 'QAT', name: 'Qatar', flag: '🇶🇦', group: 'B' },
  SUI: { code: 'SUI', name: 'Switzerland', flag: '🇨🇭', group: 'B' },
  // Group C
  BRA: { code: 'BRA', name: 'Brazil', flag: '🇧🇷', group: 'C' },
  MAR: { code: 'MAR', name: 'Morocco', flag: '🇲🇦', group: 'C' },
  HAI: { code: 'HAI', name: 'Haiti', flag: '🇭🇹', group: 'C' },
  SCO: { code: 'SCO', name: 'Scotland', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', group: 'C' },
  // Group D
  USA: { code: 'USA', name: 'USA', flag: '🇺🇸', group: 'D' },
  PAR: { code: 'PAR', name: 'Paraguay', flag: '🇵🇾', group: 'D' },
  AUS: { code: 'AUS', name: 'Australia', flag: '🇦🇺', group: 'D' },
  TUR: { code: 'TUR', name: 'Türkiye', flag: '🇹🇷', group: 'D' },
  // Group E
  GER: { code: 'GER', name: 'Germany', flag: '🇩🇪', group: 'E' },
  CUR: { code: 'CUR', name: 'Curaçao', flag: '🇨🇼', group: 'E' },
  CIV: { code: 'CIV', name: "Côte d'Ivoire", flag: '🇨🇮', group: 'E' },
  ECU: { code: 'ECU', name: 'Ecuador', flag: '🇪🇨', group: 'E' },
  // Group F
  NED: { code: 'NED', name: 'Netherlands', flag: '🇳🇱', group: 'F' },
  JPN: { code: 'JPN', name: 'Japan', flag: '🇯🇵', group: 'F' },
  SWE: { code: 'SWE', name: 'Sweden', flag: '🇸🇪', group: 'F' },
  TUN: { code: 'TUN', name: 'Tunisia', flag: '🇹🇳', group: 'F' },
  // Group G
  BEL: { code: 'BEL', name: 'Belgium', flag: '🇧🇪', group: 'G' },
  EGY: { code: 'EGY', name: 'Egypt', flag: '🇪🇬', group: 'G' },
  IRN: { code: 'IRN', name: 'IR Iran', flag: '🇮🇷', group: 'G' },
  NZL: { code: 'NZL', name: 'New Zealand', flag: '🇳🇿', group: 'G' },
  // Group H
  ESP: { code: 'ESP', name: 'Spain', flag: '🇪🇸', group: 'H' },
  CPV: { code: 'CPV', name: 'Cabo Verde', flag: '🇨🇻', group: 'H' },
  KSA: { code: 'KSA', name: 'Saudi Arabia', flag: '🇸🇦', group: 'H' },
  URU: { code: 'URU', name: 'Uruguay', flag: '🇺🇾', group: 'H' },
  // Group I
  FRA: { code: 'FRA', name: 'France', flag: '🇫🇷', group: 'I' },
  SEN: { code: 'SEN', name: 'Senegal', flag: '🇸🇳', group: 'I' },
  IRQ: { code: 'IRQ', name: 'Iraq', flag: '🇮🇶', group: 'I' },
  NOR: { code: 'NOR', name: 'Norway', flag: '🇳🇴', group: 'I' },
  // Group J
  ARG: { code: 'ARG', name: 'Argentina', flag: '🇦🇷', group: 'J' },
  ALG: { code: 'ALG', name: 'Algeria', flag: '🇩🇿', group: 'J' },
  AUT: { code: 'AUT', name: 'Austria', flag: '🇦🇹', group: 'J' },
  JOR: { code: 'JOR', name: 'Jordan', flag: '🇯🇴', group: 'J' },
  // Group K
  POR: { code: 'POR', name: 'Portugal', flag: '🇵🇹', group: 'K' },
  COD: { code: 'COD', name: 'DR Congo', flag: '🇨🇩', group: 'K' },
  UZB: { code: 'UZB', name: 'Uzbekistan', flag: '🇺🇿', group: 'K' },
  COL: { code: 'COL', name: 'Colombia', flag: '🇨🇴', group: 'K' },
  // Group L
  ENG: { code: 'ENG', name: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', group: 'L' },
  CRO: { code: 'CRO', name: 'Croatia', flag: '🇭🇷', group: 'L' },
  GHA: { code: 'GHA', name: 'Ghana', flag: '🇬🇭', group: 'L' },
  PAN: { code: 'PAN', name: 'Panama', flag: '🇵🇦', group: 'L' },
}

export const GROUPS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']

export function getGroupTeams(group) {
  return Object.values(TEAMS).filter(t => t.group === group)
}
