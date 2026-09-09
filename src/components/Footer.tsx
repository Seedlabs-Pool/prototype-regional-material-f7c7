import { C } from '../theme';

export default function Footer() {
  return (
    <footer style={{ background: C.ink, color: '#d9e5de', marginTop: 64 }}>
      <div
        style={{
          maxWidth: 1140,
          margin: '0 auto',
          padding: '36px 20px 28px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 24,
        }}
      >
        <div>
          <p style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 730, fontSize: 17, color: '#ffffff' }}>
            <svg width="30" height="30" viewBox="0 0 40 40" aria-hidden="true" focusable="false" style={{ flexShrink: 0 }}>
              <circle cx="20" cy="20" r="19" fill={C.accent} />
              <path d="M20 7.5 L23.6 20 L20 32.5 L16.4 20 Z" fill="#ffffff" />
              <circle cx="20" cy="20" r="2" fill={C.accent} />
            </svg>
            ME Compass
          </p>
          <p style={{ fontSize: 14, color: '#a9bcb2', marginTop: 8 }}>Regional material-efficiency compliance for China's automotive roadmaps.</p>
        </div>
        <div>
          <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#8fa89c', marginBottom: 8 }}>Built for</p>
          <p style={{ fontSize: 14.5, color: '#d9e5de' }}>
            OEM sustainability and regulatory teams — BYD, Geely and their MEE counterparts — who must show province-level decarbonization progress, not just
            fleet-average EV share.
          </p>
        </div>
        <div>
          <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#8fa89c', marginBottom: 8 }}>Prototype note</p>
          <p style={{ fontSize: 14.5, color: '#d9e5de' }}>All figures are illustrative model outputs. Not regulatory advice.</p>
        </div>
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.14)', padding: '14px 20px', textAlign: 'center', fontSize: 13, color: '#a9bcb2' }}>
        ME Compass — material efficiency, measured where it matters.
      </div>
    </footer>
  );
}
