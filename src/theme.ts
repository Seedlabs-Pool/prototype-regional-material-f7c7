import type { CSSProperties } from 'react';

export const C = {
  bg: '#f2f5f1',
  surface: '#ffffff',
  ink: '#13251e',
  body: '#31443c',
  muted: '#5c6d65',
  line: '#dce4de',
  accent: '#0e7a5a',
  accentDark: '#0a5b43',
  accentSoft: '#e2f1ea',
  track: '#e8eee9',
  green: '#177143',
  greenSoft: '#e1f3e7',
  amber: '#9a5b00',
  amberSoft: '#fcf0dc',
  red: '#b3261e',
  redSoft: '#fbe9e7',
};

export const font =
  '"Segoe UI","PingFang SC","Hiragino Sans GB","Microsoft YaHei",system-ui,-apple-system,Arial,sans-serif';

export const card: CSSProperties = {
  background: C.surface,
  border: '1px solid ' + C.line,
  borderRadius: 16,
  boxShadow: '0 1px 2px rgba(19,37,30,0.05), 0 10px 28px rgba(19,37,30,0.06)',
};

export const primaryBtn: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  background: C.accent,
  color: '#ffffff',
  border: 'none',
  borderRadius: 12,
  padding: '13px 20px',
  fontWeight: 650,
  fontSize: 16,
  cursor: 'pointer',
  boxShadow: '0 8px 18px rgba(14,122,90,0.28)',
};

export const ghostBtn: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  background: 'transparent',
  color: C.accentDark,
  border: '1.5px solid ' + C.accent,
  borderRadius: 12,
  padding: '12px 18px',
  fontWeight: 600,
  fontSize: 15.5,
  cursor: 'pointer',
};

export const globalCss = `
* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { margin: 0; background: ${C.bg}; color: ${C.ink}; font-family: ${font}; font-size: 16px; line-height: 1.55; -webkit-font-smoothing: antialiased; }
h1, h2, h3, h4, p, dl, dd, dt { margin: 0; }
button { font: inherit; color: inherit; }
input[type="range"] { accent-color: ${C.accent}; width: 100%; cursor: pointer; }
:focus-visible { outline: 3px solid ${C.accent}; outline-offset: 2px; border-radius: 4px; }
table { border-spacing: 0; }
.navlink { padding: 8px 12px; border-radius: 10px; color: ${C.body}; text-decoration: none; font-size: 14.5px; font-weight: 550; }
.navlink:hover { background: ${C.accentSoft}; color: ${C.accentDark}; }
.provlink { background: none; border: none; padding: 0; text-align: left; cursor: pointer; color: ${C.ink}; font-weight: 650; font-size: 14.5px; display: flex; flex-direction: column; align-items: flex-start; gap: 1px; }
.provlink:hover { color: ${C.accentDark}; text-decoration: underline; }
tr.datarow:hover { background: ${C.accentSoft}; }
`;
