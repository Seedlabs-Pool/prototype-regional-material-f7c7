import { PROVINCES, REGIONS, STRATEGIES } from './data';
import type { Mix, Province, ProvinceResult, RegionKey } from './types';

export const baselineGhg = (p: Province) => p.fleet * p.ghgPer;

export const materialUse = (p: Province) => p.fleet * p.matPer;

export function evaluate(p: Province, mix: Mix): ProvinceResult {
  const baselineMt = baselineGhg(p);
  const materialMt = materialUse(p);
  let cutMt = 0;
  let matSaved = 0;
  for (const s of STRATEGIES) {
    const f = mix[s.key] / 100;
    cutMt += f * p.sens[s.key] * baselineMt;
    matSaved += f * s.matFactor * materialMt;
  }
  const targetMt = baselineMt * p.target;
  const ratio = targetMt > 0 ? cutMt / targetMt : 0;
  return {
    province: p,
    baselineMt,
    materialMt,
    targetMt,
    cutMt,
    matSaved: Math.min(matSaved, materialMt),
    ratio,
    status: ratio >= 1 ? 'on' : ratio >= 0.7 ? 'risk' : 'off',
  };
}

/** Greedy allocation to the highest-sensitivity levers, each capped at 40%. */
export function recommendedMix(p: Province): Mix {
  const mix: Mix = { downsize: 0, share: 0, lightweight: 0, circular: 0 };
  let need = p.target * 1.06;
  const order = [...STRATEGIES].sort((a, b) => p.sens[b.key] - p.sens[a.key]);
  for (const s of order) {
    if (need <= 0.004) break;
    const take = Math.min(0.4, need / p.sens[s.key]);
    mix[s.key] = Math.round(take * 100);
    need -= take * p.sens[s.key];
  }
  return mix;
}

export interface RegionRow {
  key: RegionKey;
  label: string;
  baseline: number;
  cut: number;
}

export function regionSummary(mix: Mix): RegionRow[] {
  return (Object.keys(REGIONS) as RegionKey[]).map((key) => {
    const provs = PROVINCES.filter((p) => p.region === key);
    const baseline = provs.reduce((a, p) => a + baselineGhg(p), 0);
    const cut = provs.reduce((a, p) => a + evaluate(p, mix).cutMt, 0);
    return { key, label: REGIONS[key].label, baseline, cut };
  });
}

export interface NationalSummary {
  baseline: number;
  target: number;
  cut: number;
  matSaved: number;
}

export function nationalSummary(mix: Mix): NationalSummary {
  return PROVINCES.reduce(
    (acc, p) => {
      const r = evaluate(p, mix);
      return {
        baseline: acc.baseline + r.baselineMt,
        target: acc.target + r.targetMt,
        cut: acc.cut + r.cutMt,
        matSaved: acc.matSaved + r.matSaved,
      };
    },
    { baseline: 0, target: 0, cut: 0, matSaved: 0 }
  );
}
