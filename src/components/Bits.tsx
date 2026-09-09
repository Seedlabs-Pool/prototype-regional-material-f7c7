import type { SVGProps } from 'react';
import { C } from '../theme';
import type { Status } from '../types';

export function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div style={{ maxWidth: 740 }}>
      <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: C.accentDark, marginBottom: 8 }}>{eyebrow}</p>
      <h2 style={{ fontSize: 'clamp(24px, 3.4vw, 32px)', lineHeight: 1.18, letterSpacing: '-0.015em', fontWeight: 740 }}>{title}</h2>
      {sub ? <p style={{ marginTop: 10, fontSize: 16, color: C.body }}>{sub}</p> : null}
    </div>
  );
}

const statusMeta: Record<Status, { label: string; bg: string; fg: string }> = {
  on: { label: 'On track', bg: C.greenSoft, fg: C.green },
  risk: { label: 'At risk', bg: C.amberSoft, fg: C.amber },
  off: { label: 'Off track', bg: C.redSoft, fg: C.red },
};

export function StatusBadge({ status }: { status: Status }) {
  const m = statusMeta[status];
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 10px', borderRadius: 999, background: m.bg, color: m.fg, fontWeight: 650, fontSize: 13, whiteSpace: 'nowrap' }}>
      <span aria-hidden="true" style={{ width: 7, height: 7, borderRadius: 99, background: m.fg, display: 'inline-block' }} />
      {m.label}
    </span>
  );
}

function svg(size: number): SVGProps<SVGSVGElement> {
  return {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
    focusable: 'false',
  };
}

export const IconFactory = ({ size = 20 }: { size?: number }) => (
  <svg {...svg(size)}>
    <path d="M3 20V8.5l5.5 3V8.5l5.5 3V8.5l5.5 3V20H3z" />
    <path d="M7 16.5h2M11 16.5h2M15 16.5h2" />
  </svg>
);

export const IconPin = ({ size = 20 }: { size?: number }) => (
  <svg {...svg(size)}>
    <path d="M12 21c-4-4.2-6-7.2-6-10a6 6 0 1 1 12 0c0 2.8-2 5.8-6 10z" />
    <circle cx="12" cy="10.8" r="2.2" />
  </svg>
);

export const IconDoc = ({ size = 20 }: { size?: number }) => (
  <svg {...svg(size)}>
    <path d="M9 4h6v3H9z" />
    <path d="M15 5h3a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h3" />
    <path d="M9 13.5l2 2 4-4" />
  </svg>
);

export const IconArrow = ({ size = 20 }: { size?: number }) => (
  <svg {...svg(size)}>
    <path d="M4 12h15" />
    <path d="M13 6l6 6-6 6" />
  </svg>
);

export const IconChart = ({ size = 20 }: { size?: number }) => (
  <svg {...svg(size)}>
    <path d="M3 20h18" />
    <path d="M6 20v-6" />
    <path d="M11 20V8" />
    <path d="M16 20v-9" />
  </svg>
);

export const IconLayers = ({ size = 20 }: { size?: number }) => (
  <svg {...svg(size)}>
    <path d="M12 3l9 5-9 5-9-5 9-5z" />
    <path d="M3 13.5l9 5 9-5" />
  </svg>
);

export const IconTarget = ({ size = 20 }: { size?: number }) => (
  <svg {...svg(size)}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="4.5" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
  </svg>
);
