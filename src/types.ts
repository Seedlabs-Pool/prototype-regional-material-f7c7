export type RegionKey = 'north' | 'northeast' | 'east' | 'central' | 'southwest' | 'northwest';

export type StrategyKey = 'downsize' | 'share' | 'lightweight' | 'circular';

export type Mix = Record<StrategyKey, number>;

export type Status = 'on' | 'risk' | 'off';

export interface Sensitivities {
  downsize: number;
  share: number;
  lightweight: number;
  circular: number;
}

export interface Province {
  id: string;
  name: string;
  zh: string;
  region: RegionKey;
  /** light-duty fleet, millions of vehicles */
  fleet: number;
  /** Mt CO2e per year per million vehicles */
  ghgPer: number;
  /** Mt primary material per year per million vehicles */
  matPer: number;
  /** grid carbon intensity, gCO2/kWh */
  grid: number;
  /** required share cut by 2035 */
  target: number;
  /** share of baseline GHG removed at 100% adoption */
  sens: Sensitivities;
}

export interface StrategyMeta {
  key: StrategyKey;
  label: string;
  zh: string;
  /** share of province material use displaced at 100% adoption */
  matFactor: number;
  blurb: string;
}

export interface ProvinceResult {
  province: Province;
  baselineMt: number;
  materialMt: number;
  targetMt: number;
  cutMt: number;
  matSaved: number;
  ratio: number;
  status: Status;
}
