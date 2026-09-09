import { C } from '../theme';

const links = [
  { href: '#simulation', label: 'Simulator' },
  { href: '#ledger', label: 'Compliance ledger' },
  { href: '#evidence', label: 'Evidence' },
];

function Logo() {
  return (
    <svg width="38" height="38" viewBox="0 0 40 40" aria-hidden="true" focusable="false" style={{ flexShrink: 0 }}>
      <circle cx="20" cy="20" r="19" fill={C.accent} />
      <circle cx="20" cy="20" r="15.5" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.4" />
      <path d="M20 7.5 L23.6 20 L20 32.5 L16.4 20 Z" fill="#ffffff" />
      <path d="M20 13.5 L21.7 20 L20 26.5 L18.3 20 Z" fill={C.accent} />
      <circle cx="20" cy="20" r="2" fill="#ffffff" />
    </svg>
  );
}

export default function Header() {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 30,
        background: 'rgba(242,245,241,0.92)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid ' + C.line,
      }}
    >
      <div style={{ maxWidth: 1140, margin: '0 auto', padding: '11px 20px', display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
        <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: C.ink, minWidth: 0 }}>
          <Logo />
          <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.18, minWidth: 0 }}>
            <span style={{ fontWeight: 750, fontSize: 17, letterSpacing: '-0.01em' }}>ME Compass</span>
            <span style={{ fontSize: 12.5, color: C.muted, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              Regional Material-Efficiency Compliance
            </span>
          </span>
        </a>
        <nav aria-label="Sections" style={{ marginLeft: 'auto', display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {links.map((l) => (
            <a key={l.href} className="navlink" href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
