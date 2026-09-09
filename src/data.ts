import type { Province, RegionKey, StrategyMeta } from './types';

export const REGIONS: Record<RegionKey, { label: string; zh: string }> = {
  north: { label: 'North China', zh: '华北' },
  northeast: { label: 'Northeast', zh: '东北' },
  east: { label: 'East coast', zh: '华东' },
  central: { label: 'South Central', zh: '中南' },
  southwest: { label: 'Southwest', zh: '西南' },
  northwest: { label: 'Northwest', zh: '西北' },
};

export const STRATEGIES: StrategyMeta[] = [
  {
    key: 'downsize',
    label: 'Vehicle downsizing',
    zh: '小型化',
    matFactor: 0.42,
    blurb: 'Shift the sales mix toward A0/B-segment and micro-EVs — less material per vehicle and less energy in use.',
  },
  {
    key: 'share',
    label: 'Ride-sharing integration',
    zh: '共享出行',
    matFactor: 0.18,
    blurb: 'Fleet-sharing and ride-hailing partnerships that raise occupancy and shrink the vehicle stock a region needs.',
  },
  {
    key: 'lightweight',
    label: 'Lightweight substitution',
    zh: '轻量化',
    matFactor: 0.3,
    blurb: 'High-strength steel, aluminium and composites that cut mass per vehicle across the platform.',
  },
  {
    key: 'circular',
    label: 'Remanufacturing & circularity',
    zh: '再制造',
    matFactor: 0.35,
    blurb: 'Closed-loop components and scrap-fed supply chains that displace primary material production.',
  },
];

export const PROVINCES: Province[] = [
  { id: 'beijing', name: 'Beijing', zh: '北京', region: 'north', fleet: 6.5, ghgPer: 2.0, matPer: 0.26, grid: 500, target: 0.38, sens: { downsize: 0.2, share: 0.18, lightweight: 0.22, circular: 0.18 } },
  { id: 'tianjin', name: 'Tianjin', zh: '天津', region: 'north', fleet: 4.0, ghgPer: 2.2, matPer: 0.27, grid: 570, target: 0.36, sens: { downsize: 0.21, share: 0.19, lightweight: 0.21, circular: 0.18 } },
  { id: 'hebei', name: 'Hebei', zh: '河北', region: 'north', fleet: 18.0, ghgPer: 2.6, matPer: 0.29, grid: 640, target: 0.34, sens: { downsize: 0.23, share: 0.2, lightweight: 0.19, circular: 0.17 } },
  { id: 'shanxi', name: 'Shanxi', zh: '山西', region: 'north', fleet: 8.0, ghgPer: 2.7, matPer: 0.3, grid: 700, target: 0.32, sens: { downsize: 0.26, share: 0.23, lightweight: 0.19, circular: 0.17 } },
  { id: 'inner-mongolia', name: 'Inner Mongolia', zh: '内蒙古', region: 'north', fleet: 6.5, ghgPer: 2.8, matPer: 0.31, grid: 760, target: 0.3, sens: { downsize: 0.27, share: 0.24, lightweight: 0.18, circular: 0.16 } },

  { id: 'liaoning', name: 'Liaoning', zh: '辽宁', region: 'northeast', fleet: 11.0, ghgPer: 2.5, matPer: 0.28, grid: 620, target: 0.33, sens: { downsize: 0.27, share: 0.23, lightweight: 0.2, circular: 0.17 } },
  { id: 'jilin', name: 'Jilin', zh: '吉林', region: 'northeast', fleet: 6.0, ghgPer: 2.5, matPer: 0.28, grid: 600, target: 0.32, sens: { downsize: 0.28, share: 0.24, lightweight: 0.2, circular: 0.17 } },
  { id: 'heilongjiang', name: 'Heilongjiang', zh: '黑龙江', region: 'northeast', fleet: 6.5, ghgPer: 2.5, matPer: 0.28, grid: 590, target: 0.32, sens: { downsize: 0.29, share: 0.24, lightweight: 0.2, circular: 0.17 } },

  { id: 'shanghai', name: 'Shanghai', zh: '上海', region: 'east', fleet: 8.5, ghgPer: 1.9, matPer: 0.25, grid: 430, target: 0.4, sens: { downsize: 0.16, share: 0.14, lightweight: 0.24, circular: 0.2 } },
  { id: 'jiangsu', name: 'Jiangsu', zh: '江苏', region: 'east', fleet: 22.0, ghgPer: 2.1, matPer: 0.26, grid: 480, target: 0.38, sens: { downsize: 0.17, share: 0.15, lightweight: 0.23, circular: 0.19 } },
  { id: 'zhejiang', name: 'Zhejiang', zh: '浙江', region: 'east', fleet: 19.0, ghgPer: 2.0, matPer: 0.25, grid: 450, target: 0.38, sens: { downsize: 0.17, share: 0.15, lightweight: 0.23, circular: 0.19 } },
  { id: 'anhui', name: 'Anhui', zh: '安徽', region: 'east', fleet: 13.0, ghgPer: 2.3, matPer: 0.27, grid: 540, target: 0.35, sens: { downsize: 0.24, share: 0.21, lightweight: 0.21, circular: 0.18 } },
  { id: 'fujian', name: 'Fujian', zh: '福建', region: 'east', fleet: 9.0, ghgPer: 2.1, matPer: 0.26, grid: 500, target: 0.36, sens: { downsize: 0.19, share: 0.16, lightweight: 0.22, circular: 0.19 } },
  { id: 'jiangxi', name: 'Jiangxi', zh: '江西', region: 'east', fleet: 7.0, ghgPer: 2.3, matPer: 0.27, grid: 520, target: 0.34, sens: { downsize: 0.25, share: 0.22, lightweight: 0.2, circular: 0.18 } },
  { id: 'shandong', name: 'Shandong', zh: '山东', region: 'east', fleet: 27.0, ghgPer: 2.4, matPer: 0.28, grid: 600, target: 0.35, sens: { downsize: 0.19, share: 0.16, lightweight: 0.21, circular: 0.18 } },

  { id: 'henan', name: 'Henan', zh: '河南', region: 'central', fleet: 21.0, ghgPer: 2.4, matPer: 0.28, grid: 580, target: 0.34, sens: { downsize: 0.25, share: 0.22, lightweight: 0.2, circular: 0.18 } },
  { id: 'hubei', name: 'Hubei', zh: '湖北', region: 'central', fleet: 12.0, ghgPer: 2.2, matPer: 0.27, grid: 520, target: 0.35, sens: { downsize: 0.25, share: 0.22, lightweight: 0.21, circular: 0.18 } },
  { id: 'hunan', name: 'Hunan', zh: '湖南', region: 'central', fleet: 13.0, ghgPer: 2.2, matPer: 0.27, grid: 500, target: 0.35, sens: { downsize: 0.26, share: 0.23, lightweight: 0.21, circular: 0.18 } },
  { id: 'guangdong', name: 'Guangdong', zh: '广东', region: 'central', fleet: 30.0, ghgPer: 2.0, matPer: 0.25, grid: 460, target: 0.38, sens: { downsize: 0.16, share: 0.14, lightweight: 0.23, circular: 0.19 } },
  { id: 'guangxi', name: 'Guangxi', zh: '广西', region: 'central', fleet: 9.5, ghgPer: 2.3, matPer: 0.27, grid: 530, target: 0.33, sens: { downsize: 0.27, share: 0.24, lightweight: 0.2, circular: 0.18 } },
  { id: 'hainan', name: 'Hainan', zh: '海南', region: 'central', fleet: 2.0, ghgPer: 2.1, matPer: 0.26, grid: 490, target: 0.36, sens: { downsize: 0.22, share: 0.19, lightweight: 0.21, circular: 0.18 } },

  { id: 'chongqing', name: 'Chongqing', zh: '重庆', region: 'southwest', fleet: 7.5, ghgPer: 2.2, matPer: 0.27, grid: 500, target: 0.36, sens: { downsize: 0.33, share: 0.3, lightweight: 0.21, circular: 0.18 } },
  { id: 'sichuan', name: 'Sichuan', zh: '四川', region: 'southwest', fleet: 16.0, ghgPer: 2.0, matPer: 0.26, grid: 400, target: 0.37, sens: { downsize: 0.35, share: 0.32, lightweight: 0.22, circular: 0.19 } },
  { id: 'guizhou', name: 'Guizhou', zh: '贵州', region: 'southwest', fleet: 7.0, ghgPer: 2.3, matPer: 0.27, grid: 480, target: 0.34, sens: { downsize: 0.34, share: 0.31, lightweight: 0.2, circular: 0.18 } },
  { id: 'yunnan', name: 'Yunnan', zh: '云南', region: 'southwest', fleet: 9.0, ghgPer: 2.0, matPer: 0.26, grid: 340, target: 0.35, sens: { downsize: 0.36, share: 0.33, lightweight: 0.22, circular: 0.19 } },
  { id: 'tibet', name: 'Tibet', zh: '西藏', region: 'southwest', fleet: 0.6, ghgPer: 2.1, matPer: 0.26, grid: 300, target: 0.33, sens: { downsize: 0.38, share: 0.33, lightweight: 0.21, circular: 0.18 } },

  { id: 'shaanxi', name: 'Shaanxi', zh: '陕西', region: 'northwest', fleet: 8.5, ghgPer: 2.4, matPer: 0.28, grid: 570, target: 0.34, sens: { downsize: 0.28, share: 0.25, lightweight: 0.2, circular: 0.18 } },
  { id: 'gansu', name: 'Gansu', zh: '甘肃', region: 'northwest', fleet: 4.5, ghgPer: 2.5, matPer: 0.28, grid: 620, target: 0.32, sens: { downsize: 0.31, share: 0.28, lightweight: 0.19, circular: 0.17 } },
  { id: 'qinghai', name: 'Qinghai', zh: '青海', region: 'northwest', fleet: 1.5, ghgPer: 2.4, matPer: 0.28, grid: 480, target: 0.32, sens: { downsize: 0.32, share: 0.29, lightweight: 0.2, circular: 0.18 } },
  { id: 'ningxia', name: 'Ningxia', zh: '宁夏', region: 'northwest', fleet: 2.0, ghgPer: 2.7, matPer: 0.29, grid: 720, target: 0.31, sens: { downsize: 0.31, share: 0.28, lightweight: 0.18, circular: 0.16 } },
  { id: 'xinjiang', name: 'Xinjiang', zh: '新疆', region: 'northwest', fleet: 6.0, ghgPer: 2.6, matPer: 0.29, grid: 680, target: 0.31, sens: { downsize: 0.3, share: 0.27, lightweight: 0.19, circular: 0.17 } },
];
