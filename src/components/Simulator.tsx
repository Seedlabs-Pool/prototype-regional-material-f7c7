import { PROVINCES, REGIONS, STRATEGIES } from '../data';
import { evaluate, nationalSummary, recommendedMix } from '../compute';
import type { Mix, RegionKey } from '../types';
import { C, card, ghostBtn, primaryBtn } from '../theme';
import { IconTarget, SectionHead, StatusBadge } from './Bits';
import RegionChart from './RegionChart';

interface Props {
  selectedId: string;
  region: RegionKey;
  onRegion: (r: RegionKey) => void;
  onSelect: (id: string) => void;
  mix: Mix;
  onMix: (m: Mix) => void;
}

const zeroMix: Mix = { downsize: 0, share: 0, lightweight: 0, circular: 0 };

export default function Simulator({ selectedId, region, onRegion, onSelect, mix, onMix }: Props) {
  const selected = PROVINCES.find((p) => p.id === selectedId) ?? PROVINCES[0];
  const res = evaluate(selected, mix);
  const nat = nationalSummary(mix);
  const provinces = PROVINCES.filter((p) => p.region === region);
  const progressPct = Math.min(100, Math.round(res.ratio * 100));
  const barColor = res.status === 'on' ? C.green : res.status === 'risk' ? C.amber : C.red;

  return (
    <section id="simulation" style={{ maxWidth: 1140, margin: '0 auto', padding: '56px 20px 8px', scrollMarginTop: 84 }}>
      <SectionHead
        eyebrow="Strategy simulator"
        title={`Tune a material-efficiency mix for ${selected.name}`}
        sub="Pick a province, move the four levers, and watch the compliance gap respond. The identical mix behaves very differently across regions."
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 18, alignItems: 'start', marginTop: 28 }}>
        <div style={{ ...card, padding: 18, minWidth: 0 }}>
          <StepLabel n="1" text="Choose a province" />
          <div aria-label="Regions" style={{ display: 'flex', flexWrap: 'wrap', gap: 6, margin: '4px 0 12px' }}>
            {(Object.keys(REGIONS) as RegionKey[]).map((k) => {
              const active = k === region;
              return (
                <button
                  key={k}
                  type="button"
                  onClick={() => onRegion(k)}
                  aria-pressed={active}
                  style={{
                    padding: '6px 11px',
                    borderRadius: 999,
                    cursor: 'pointer',
                    fontSize: 13.5,
                    fontWeight: 620,
                    border: '1.5px solid ' + (active ? C.accent : C.line),
                    background: active ? C.accent : '#ffffff',
                    color: active ? '#ffffff' : C.body,
                  }}
                >
                  {REGIONS[k].label}
                </button>
              );
            })}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(116px, 1fr))', gap: 8 }}>
            {provinces.map((p) => {
              const active = p.id === selected.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => onSelect(p.id)}
                  aria-pressed={active}
                  style={{
                    padding: '8px 10px',
                    borderRadius: 10,
                    textAlign: 'left',
                    cursor: 'pointer',
                    border: '1.5px solid ' + (active ? C.accent : C.line),
                    background: active ? C.accentSoft : '#ffffff',
                    color: C.ink,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                  }}
                >
                  <span style={{ fontWeight: 660, fontSize: 14 }}>{p.name}</span>
                  <span style={{ fontSize: 12, color: C.muted }}>
                    {p.zh} · {p.fleet}M veh
                  </span>
                </button>
              );
            })}
          </div>
          <dl style={{ margin: '16px 0 0', paddingTop: 14, borderTop: '1px solid ' + C.line, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px 14px' }}>
            <Fact dt="Fleet" dd={`${selected.fleet}M vehicles`} />
            <Fact dt="Grid intensity" dd={`${selected.grid} gCO₂/kWh`} />
            <Fact dt="Baseline footprint" dd={`${res.baselineMt.toFixed(1)} Mt CO₂e/yr`} />
            <Fact dt="2035 target cut" dd={`${Math.round(selected.target * 100)}% · ${res.targetMt.toFixed(1)} Mt`} />
          </dl>
        </div>

        <div style={{ ...card, padding: 18, minWidth: 0 }}>
          <StepLabel n="2" text="Set the material-efficiency mix" />
          <div style={{ display: 'grid', gap: 18, marginTop: 4 }}>
            {STRATEGIES.map((s) => {
              const effect = (mix[s.key] / 100) * selected.sens[s.key] * res.baselineMt;
              return (
                <div key={s.key}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
                    <label htmlFor={`lever-${s.key}`} style={{ fontSize: 15, fontWeight: 660 }}>
                      {s.label} <span style={{ color: C.muted, fontWeight: 500 }}>{s.zh}</span>
                    </label>
                    <span style={{ fontVariantNumeric: 'tabular-nums', fontSize: 14, fontWeight: 670, color: C.accentDark, background: C.accentSoft, padding: '2px 10px', borderRadius: 999 }}>
                      {mix[s.key]}%
                    </span>
                  </div>
                  <input
                    id={`lever-${s.key}`}
                    type="range"
                    min={0}
                    max={40}
                    step={1}
                    value={mix[s.key]}
                    aria-describedby={`lever-hint-${s.key}`}
                    onChange={(e) => {
                      const next: Mix = { ...mix };
                      next[s.key] = Number(e.target.value);
                      onMix(next);
                    }}
                  />
                  <p id={`lever-hint-${s.key}`} style={{ fontSize: 14, color: C.muted, marginTop: 2 }}>
                    {s.blurb}
                  </p>
                  <p style={{ fontSize: 14, fontWeight: 650, color: C.accentDark, marginTop: 3 }}>
                    −{effect.toFixed(1)} Mt CO₂e/yr in {selected.name}
                  </p>
                </div>
              );
            })}
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 18, paddingTop: 16, borderTop: '1px solid ' + C.line }}>
            <button type="button" data-cta="apply-recommended-mix" onClick={() => onMix(recommendedMix(selected))} style={primaryBtn}>
              <IconTarget size={18} /> Apply recommended mix
            </button>
            <button type="button" onClick={() => onMix(zeroMix)} style={ghostBtn}>
              Reset levers
            </button>
          </div>
          <p style={{ fontSize: 13.5, color: C.muted, marginTop: 10 }}>
            Recommended = greedy allocation to the levers with the highest sensitivity in {selected.name}, capped at 40% each. Provinces that still miss the
            cap need electrification and grid work to carry the rest — that is the tool flagging a structural gap, not a slider problem.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14, marginTop: 18 }}>
        <Kpi title={`GHG cut — ${selected.name}`} value={`${res.cutMt.toFixed(1)} Mt`} sub={`CO₂e/yr against a ${res.baselineMt.toFixed(1)} Mt baseline`} />
        <div style={{ ...card, padding: '16px 18px', minWidth: 0 }}>
          <p style={{ fontSize: 13, fontWeight: 660, color: C.muted }}>2035 target progress</p>
          <p style={{ fontSize: 30, fontWeight: 750, letterSpacing: '-0.02em', margin: '2px 0 8px' }}>{progressPct}%</p>
          <div style={{ height: 8, borderRadius: 99, background: C.track, overflow: 'hidden', marginBottom: 8 }}>
            <div style={{ height: '100%', width: progressPct + '%', background: barColor, borderRadius: 99, transition: 'width 0.25s ease' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 13.5, color: C.muted }}>
              {res.cutMt.toFixed(1)} of {res.targetMt.toFixed(1)} Mt target
            </span>
            <StatusBadge status={res.status} />
          </div>
        </div>
        <Kpi title="Primary material saved" value={`${res.matSaved.toFixed(2)} Mt`} sub="primary material production displaced per year" />
        <Kpi
          title="National effect of this mix"
          value={`${nat.cut.toFixed(0)} Mt`}
          sub={`CO₂e/yr if shipped across all 31 provinces · ${nat.matSaved.toFixed(1)} Mt material`}
        />
      </div>

      <RegionChart mix={mix} selectedRegion={selected.region} />
    </section>
  );
}

function StepLabel({ n, text }: { n: string; text: string }) {
  return (
    <p
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        fontSize: 12.5,
        fontWeight: 700,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: C.muted,
        margin: '0 0 10px',
      }}
    >
      <span
        style={{
          width: 20,
          height: 20,
          borderRadius: 99,
          background: C.accent,
          color: '#ffffff',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: 0,
          textTransform: 'none',
          flexShrink: 0,
        }}
      >
        {n}
      </span>
      {text}
    </p>
  );
}

function Fact({ dt, dd }: { dt: string; dd: string }) {
  return (
    <div style={{ minWidth: 0 }}>
      <dt style={{ fontSize: 12, color: C.muted, fontWeight: 620 }}>{dt}</dt>
      <dd style={{ fontSize: 14.5, fontWeight: 660, marginTop: 1 }}>{dd}</dd>
    </div>
  );
}

function Kpi({ title, value, sub }: { title: string; value: string; sub: string }) {
  return (
    <div style={{ ...card, padding: '16px 18px', minWidth: 0 }}>
      <p style={{ fontSize: 13, fontWeight: 660, color: C.muted }}>{title}</p>
      <p style={{ fontSize: 30, fontWeight: 750, letterSpacing: '-0.02em', margin: '2px 0 6px' }}>{value}</p>
      <p style={{ fontSize: 13.5, color: C.muted }}>{sub}</p>
    </div>
  );
}
