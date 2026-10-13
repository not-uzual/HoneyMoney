// Universal color palette — matches user provided colors
export const Colors = {
  // Primary background
  lightBg: '#f9ffe6',
  // Accent colors
  mint: '#a4eaa1',
  lime: '#d1ff33',
  pink: '#f7a3eb',
  blue: '#505dd6',
  // Core neutrals
  white: '#ffffff',
  black: '#111111',
  gray: '#7b7b73',

  // Legacy aliases — kept for backward compat with old components
  paper: '#FFF4F4',          // same as lightBg
  line: '#e2e8f0',           // slate divider
  red: '#ef4444',            // debit amount color
  green: '#16a34a',          // credit amount color

  // Semantic aliases
  balanceCardLabel: '#4b6100',
  balanceStatsLabel: '#526800',
  balanceBg: 'rgba(255, 255, 255, 0.35)',
  addBannerMuted: '#a0a099',
  profileStatsBg: '#f1f5f9',
  bodyBg: '#171717',
} as const;
