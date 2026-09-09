import { REGIONS } from '../data';
import { regionSummary } from '../compute';
import type { Mix, RegionKey } from '../types';
import { C, card } from '../theme';

export default function RegionChart({ mix, selectedRegion }: { mix: Mix; selectedRegion: RegionKey }) {
  const rows = regionSummary(mix);
  const max = Math.max(...rows.map((r) => r.baseline));

  return (
    <div style={{ ...card, padding: '20px 22px', marginTop: 20, minWidth: 0 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12, flexWrap: 'wrap', marginBottom: 18 }}>
        <div style={{ maxWidth: 560, minWidth: 0 }}>
          <h3 style={{ fontSize: 18.5, fontWeight: 730 }}>Where the same mix lands hardest</h3>
          <p style={{ fontSize: 14.5, color: C.muted, marginTop: 4 }}>
            Baseline footprint by region with the cut achieved by the current mix overlaid. {REGIONS[selectedRegion].label} is highlighted.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 14, fontSize: 13, color: C.body, alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 14, height: 10, borderRadius: 3, background: '#c9d7cc', display: 'inline-block' }} /> baseline
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 14, height: 10, borderRadius: 3, background: C.accent, display: 'inline-block' }} /> cut achieved
          </span>
        </div>
      </div>

      <div style={{ display: 'grid', gap: 6 }}>
        {rows.map((r) => (
          <div
            key={r.key}
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(92px, 132px) minmax(0, 1fr)',
              gap: '4px 14px',
              alignItems: 'center',
              padding: '8px 10px',
              borderRadius: 12,
              background: r.key === selectedRegion ? C.accentSoft : 'transparent',
            }}
          >
            <div style={{ minWidth: 0 }}>
              <span style={{ display: 'block', fontWeight: 670, fontSize: 14 }}>{r.label}</span>
              <span style={{ fontSize: 12, color: C.muted }}>{REGIONS[r.key].zh}</span>
            </div>
            <div style={{ minWidth: 0 }}>
              <div
                role="img"
                aria-label={`${r.label}: baseline ${r.baseline.toFixed(0)} Mt CO2e per year, cut achieved ${r.cut.toFixed(0)} Mt`}
                style={{ height: 14, borderRadius: 7, background: C.track, position: 'relative', overflow: 'hidden' }}
              >
                <span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${(r.baseline / max) * 100}%`, background: '#c9d7cc', borderRight: '2px solid #7f958a' }} />
                <span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${(r.cut / max) * 100}%`, background: C.accent }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap', fontSize: 12.5, color: C.muted, marginTop: 3 }}>
                <span>baseline {r.baseline.toFixed(0)} Mt</span>
                <span style={{ fontWeight: 670, color: C.accentDark }}>
                  −{r.cut.toFixed(0)} Mt · {Math.round((r.cut / r.baseline) * 100)}% of baseline
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p style={{ fontSize: 14.5, color: C.body, marginTop: 16, borderTop: '1px solid ' + C.line, paddingTop: 14 }}>
        Sensitivity profiles mean the Southwest and Northwest respond far more per point of downsizing and ride-sharing than coastal grids — the same
        national program, very different compliance outcomes.
      </p>
    </div>
  );
}
