import { useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import { PROVINCES, REGIONS } from '../data';
import { evaluate } from '../compute';
import type { Mix, RegionKey } from '../types';
import { C, card } from '../theme';
import { SectionHead, StatusBadge } from './Bits';

const td: CSSProperties = { padding: '10px 14px', borderBottom: '1px solid ' + C.line, fontSize: 14.5, whiteSpace: 'nowrap' };
const tdNum: CSSProperties = { ...td, textAlign: 'right', fontVariantNumeric: 'tabular-nums' };
const th: CSSProperties = {
  padding: '10px 14px',
  background: '#edf2ee',
  borderBottom: '1px solid ' + C.line,
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  color: C.muted,
  whiteSpace: 'nowrap',
  textAlign: 'left',
};
const thNum: CSSProperties = { ...th, textAlign: 'right' };
const srOnly: CSSProperties = {
  position: 'absolute',
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap',
  border: 0,
};

export default function Ledger({ mix, selectedId, onSelect }: { mix: Mix; selectedId: string; onSelect: (id: string) => void }) {
  const [filter, setFilter] = useState<RegionKey | 'all'>('all');
  const rows = useMemo(
    () => PROVINCES.map((p) => evaluate(p, mix)).sort((a, b) => b.baselineMt - a.baselineMt),
    [mix]
  );
  const shown = filter === 'all' ? rows : rows.filter((r) => r.province.region === filter);
  const totals = rows.reduce(
    (acc, r) => ({
      baseline: acc.baseline + r.baselineMt,
      target: acc.target + r.targetMt,
      cut: acc.cut + r.cutMt,
      mat: acc.mat + r.matSaved,
    }),
    { baseline: 0, target: 0, cut: 0, mat: 0 }
  );
  const counts = {
    on: rows.filter((r) => r.status === 'on').length,
    risk: rows.filter((r) => r.status === 'risk').length,
    off: rows.filter((r) => r.status === 'off').length,
  };
  const pct = Math.min(100, Math.round((totals.cut / totals.target) * 100));

  return (
    <section id="ledger" style={{ maxWidth: 1140, margin: '0 auto', padding: '56px 20px 8px', scrollMarginTop: 84 }}>
      <SectionHead
        eyebrow="Compliance ledger"
        title="Every province, one defensible position"
        sub="The current mix applied across the fleet, scored province by province against 2035 intensity targets. Select any province to model it in the simulator."
      />

      <div style={{ ...card, padding: '18px 20px', marginTop: 24, display: 'grid', gap: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
          <strong style={{ fontSize: 16 }}>National position under the current mix</strong>
          <span style={{ fontSize: 14, color: C.body }}>
            <strong style={{ color: C.green }}>{counts.on}</strong> on track · <strong style={{ color: C.amber }}>{counts.risk}</strong> at risk ·{' '}
            <strong style={{ color: C.red }}>{counts.off}</strong> off track
          </span>
        </div>
        <div>
          <div style={{ height: 10, borderRadius: 99, background: C.track, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: pct + '%', background: C.accent, borderRadius: 99, transition: 'width 0.25s ease' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13.5, color: C.muted, marginTop: 6, flexWrap: 'wrap', gap: 6 }}>
            <span>
              {totals.cut.toFixed(0)} of {totals.target.toFixed(0)} Mt CO₂e/yr target cut achieved ({pct}%)
            </span>
            <span>{totals.mat.toFixed(1)} Mt primary material displaced</span>
          </div>
        </div>
        <p style={{ fontSize: 14.5, color: C.body }}>
          One national mix leaves provinces exposed: the Southwest clears its targets while coastal and northern provinces stay short. This is the case for
          regionally tailored material-efficiency programs.
        </p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, margin: '16px 0 10px' }}>
        {(['all', ...(Object.keys(REGIONS) as RegionKey[])] as (RegionKey | 'all')[]).map((k) => {
          const active = k === filter;
          return (
            <button
              key={k}
              type="button"
              onClick={() => setFilter(k)}
              aria-pressed={active}
              style={{
                padding: '6px 12px',
                borderRadius: 999,
                cursor: 'pointer',
                fontSize: 13.5,
                fontWeight: 620,
                border: '1.5px solid ' + (active ? C.accent : C.line),
                background: active ? C.accent : '#ffffff',
                color: active ? '#ffffff' : C.body,
              }}
            >
              {k === 'all' ? 'All regions' : REGIONS[k].label}
            </button>
          );
        })}
      </div>

      <div style={{ ...card, padding: 0, minWidth: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', minWidth: 700, borderCollapse: 'collapse' }}>
            <caption style={srOnly}>Compliance position by province under the current material-efficiency mix</caption>
            <thead>
              <tr>
                <th style={th}>Province</th>
                <th style={th}>Region</th>
                <th style={thNum}>Baseline (Mt)</th>
                <th style={thNum}>Target cut (Mt)</th>
                <th style={thNum}>Achieved (Mt)</th>
                <th style={thNum}>Gap (Mt)</th>
                <th style={th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {shown.map((r) => {
                const gap = Math.max(0, r.targetMt - r.cutMt);
                const isSel = r.province.id === selectedId;
                return (
                  <tr key={r.province.id} className="datarow" style={{ background: isSel ? C.accentSoft : undefined }}>
                    <td style={td}>
                      <button
                        type="button"
                        className="provlink"
                        onClick={() => onSelect(r.province.id)}
                        aria-label={`Model ${r.province.name} in the simulator`}
                      >
                        {r.province.name}
                        <span style={{ fontSize: 12, color: C.muted, fontWeight: 500 }}>{r.province.zh}</span>
                      </button>
                    </td>
                    <td style={{ ...td, color: C.muted }}>{REGIONS[r.province.region].label}</td>
                    <td style={tdNum}>{r.baselineMt.toFixed(1)}</td>
                    <td style={tdNum}>{r.targetMt.toFixed(1)}</td>
                    <td style={{ ...tdNum, fontWeight: 660, color: C.accentDark }}>{r.cutMt.toFixed(1)}</td>
                    <td style={{ ...tdNum, color: gap <= 0 ? C.green : C.red, fontWeight: gap <= 0 ? 650 : 500 }}>
                      {gap <= 0 ? 'Met' : gap.toFixed(1)}
                    </td>
                    <td style={td}>
                      <StatusBadge status={r.status} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr style={{ background: '#edf2ee' }}>
                <td style={{ ...td, fontWeight: 700 }}>All 31 provinces</td>
                <td style={{ ...td, color: C.muted }}>—</td>
                <td style={{ ...tdNum, fontWeight: 700 }}>{totals.baseline.toFixed(0)}</td>
                <td style={{ ...tdNum, fontWeight: 700 }}>{totals.target.toFixed(0)}</td>
                <td style={{ ...tdNum, fontWeight: 700, color: C.accentDark }}>{totals.cut.toFixed(0)}</td>
                <td style={{ ...tdNum, fontWeight: 700 }}>{Math.max(0, totals.target - totals.cut).toFixed(0)}</td>
                <td style={td}>
                  <span style={{ fontSize: 13, color: C.muted, fontWeight: 600 }}>{pct}% of target</span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <p style={{ fontSize: 13.5, color: C.muted, marginTop: 10 }}>
        Units: Mt CO₂e per year, lifecycle scope for the in-province light-duty fleet. Status: on track ≥ 100% of the target cut, at risk ≥ 70%, off track
        below that.
      </p>
    </section>
  );
}
