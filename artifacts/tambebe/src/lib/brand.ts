/**
 * Homepage-only design tokens — "inspection ledger" identity.
 * Scoped intentionally: only Home.tsx and its section components import this,
 * so the rest of the app (Shop, Admin, ProductDetail, etc.) is untouched.
 */
export const brand = {
  navy: "#16233A",
  navyLight: "#223349",
  navySoft: "#2C3F58",
  paper: "#F6F0E2",
  paperDark: "#ECE2C9",
  paperLine: "#D9CBA6",
  stamp: "#B23C27",
  stampDark: "#8C2E1D",
  pine: "#2F5233",
  pineLight: "#3F6B45",
  ink: "#201D18",
  inkMuted: "#6E6656",
} as const;

export const fonts = {
  display: "'Fraunces', serif",
  body: "'Inter', sans-serif",
  mono: "'Space Mono', monospace",
} as const;
