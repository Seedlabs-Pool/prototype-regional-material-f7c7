import type { ReactNode } from 'react';
import { card, C, ghostBtn, primaryBtn } from '../theme';
import { PROVINCES, REGIONS, STRATEGIES } from '../data';
import { baselineGhg, evaluate, recommendedMix } from '../compute';
import { IconArrow, IconChart, IconLayers, IconPin, StatusBadge } from './Bits';

export default function Hero({ onStart }: { onStart: () => void }) {
  const sichuan = PROVINCES.find((p) => p.id === 'sichuan') ?? PROVINCES[0];
  const mix = recommendedMix(sichuan);
  const res = evaluate(sichuan, mix);
  const remaining = res.baselineMt - res.cutMt;
  const downs = PROVINCES.map((p) => p.sens.downsize);
  const leverage = (Math.max(...downs) / Math.min(...downs)).toFixed(1);
  const totalBase = PROVINCES.reduce((a, p) => a + baselineGhg(p), 0);

  return (
    <section
      style={{
        background: 'radial-gradient(1100px 480px at 12% -12%, #dcefe6 0%, rgba(220,239,230,0) 60%), ' + C.bg,
        padding: '60px 20px 40px',
      }}
    >
      <div style={{ maxWidth: 1140, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 36, alignItems: 'center' }}>
        <div style={{ minWidth: 0 }}>
          <p
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: '0.07em',
              textTransform: 'uppercase',
              color: C.accentDark,
              background: C.accentSoft,
              padding: '6px 12px',
              borderRadius: 999,
              marginBottom: 18,
            }}
          >
            <IconPin size={15} /> Material efficiency for China's auto industry
          </p>
          <h1 style={{ fontSize: 'clamp(30px, 4.8vw, 46px)', lineHeight: 1.1, letterSpacing: '-0.02em', fontWeight: 780, maxWidth: 620 }}>
            Hit provincial climate targets with material efficiency — not electrification alone.
          </h1>
          <p style={{ marginTop: 16, fontSize: 17.5, color: C.body, maxWidth: 580 }}>
            ME Compass simulates downsizing, ride-sharing, lightweighting and circularity across all 31 provinces, showing exactly where your vehicle roadmap closes the GHG gap — and where it falls short.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 26 }}>
            <button type="button" data-cta="run-simulation" onClick={onStart} style={primaryBtn}>
              Run the compliance simulation <IconArrow size={18} />
            </button>
            <a href="#evidence" style={{ ...ghostBtn, textDecoration: 'none' }}>
              See the regional evidence
            </a>
          </div>
          <p style={{ marginTop: 18, fontSize: 14, color: C.muted }}>
            Built for OEM sustainability teams and MEE-aligned provincial reviews · 31 provinces · 6 regions
          </p>
        </div>

        <div style={{ ...card, padding: 22, minWidth: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
            <p style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: 15.5 }}>
              <IconPin size={17} /> Spotlight — {sichuan.name} · {REGIONS[sichuan.region].label}
            </p>
            <StatusBadge status={res.status} />
          </div>
          <Bar label="Baseline footprint" value={res.baselineMt} max={res.baselineMt} color={C.track} note={`${res.baselineMt.toFixed(1)} Mt CO₂e/yr`} />
          <div style={{ height: 12 }} />
          <Bar label="With recommended mix" value={remaining} max={res.baselineMt} color={C.accent} note={`${remaining.toFixed(1)} Mt CO₂e/yr`} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 16 }}>
            {STRATEGIES.filter((s) => mix[s.key] > 0).map((s) => (
              <span key={s.key} style={{ fontSize: 13, fontWeight: 600, color: C.accentDark, background: C.accentSoft, padding: '4px 10px', borderRadius: 8 }}>
                {s.label} · {mix[s.key]}%
              </span>
            ))}
          </div>
          <p style={{ marginTop: 14, fontSize: 13.5, color: C.muted }}>
            Cuts {res.cutMt.toFixed(1)} Mt CO₂e/yr and displaces {res.matSaved.toFixed(2)} Mt of primary material — {Math.round(res.ratio * 100)}% of {sichuan.name}'s 2035 target.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1140, margin: '40px auto 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
        <Stat icon={<IconChart size={18} />} value="31 / 6" label="provinces and regions modeled with fleet, grid and material profiles" />
        <Stat icon={<IconLayers size={18} />} value={`${Math.round(totalBase)} Mt`} label="CO₂e/yr baseline footprint in scope, material production through use" />
        <Stat icon={<IconPin size={18} />} value={`${leverage}×`} label="more GHG leverage per point of downsizing in the top province vs the lowest" />
      </div>
    </section>
  );
}

function Bar({ label, value, max, color, note }: { label: string; value: number; max: number; color: string; note: string }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13.5, color: C.muted, marginBottom: 5, gap: 8, flexWrap: 'wrap' }}>
        <span>{label}</span>
        <span style={{ fontWeight: 650, color: C.ink }}>{note}</span>
      </div>
      <div style={{ height: 14, borderRadius: 7, background: C.track, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${Math.max(2, (value / max) * 100)}%`, background: color, borderRadius: 7 }} />
      </div>
    </div>
  );
}

function Stat({ icon, value, label }: { icon: ReactNode; value: string; label: string }) {
  return (
    <div style={{ ...card, padding: '16px 18px', display: 'flex', gap: 12, alignItems: 'flex-start', minWidth: 0 }}>
      <span style={{ color: C.accentDark, background: C.accentSoft, borderRadius: 10, padding: 8, display: 'inline-flex', flexShrink: 0 }}>{icon}</span>
      <span style={{ minWidth: 0 }}>
        <strong style={{ display: 'block', fontSize: 22, letterSpacing: '-0.01em' }}>{value}</strong>
        <span style={{ display: 'block', fontSize: 14, color: C.muted, marginTop: 2 }}>{label}</span>
      </span>
    </div>
  );
}
