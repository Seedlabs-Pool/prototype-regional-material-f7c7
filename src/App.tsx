import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Simulator from './components/Simulator';
import Ledger from './components/Ledger';
import Insights from './components/Insights';
import Footer from './components/Footer';
import { PROVINCES } from './data';
import { C, globalCss } from './theme';
import type { Mix, RegionKey } from './types';

const scrollToSimulator = () => {
  const el = document.getElementById('simulation');
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

export default function App() {
  const [selectedId, setSelectedId] = useState('sichuan');
  const [region, setRegion] = useState<RegionKey>('southwest');
  const [mix, setMix] = useState<Mix>({ downsize: 15, share: 10, lightweight: 12, circular: 8 });

  const pickInSimulator = (id: string) => setSelectedId(id);

  const openProvince = (id: string) => {
    setSelectedId(id);
    const p = PROVINCES.find((x) => x.id === id);
    if (p) setRegion(p.region);
    scrollToSimulator();
  };

  const changeRegion = (r: RegionKey) => {
    setRegion(r);
    const stillVisible = PROVINCES.find((p) => p.id === selectedId && p.region === r);
    if (!stillVisible) {
      const first = PROVINCES.find((p) => p.region === r);
      if (first) setSelectedId(first.id);
    }
  };

  return (
    <div id="top" style={{ minHeight: '100vh', background: C.bg }}>
      <style dangerouslySetInnerHTML={{ __html: globalCss }} />
      <Header />
      <main>
        <Hero onStart={scrollToSimulator} />
        <Simulator
          selectedId={selectedId}
          region={region}
          onRegion={changeRegion}
          onSelect={pickInSimulator}
          mix={mix}
          onMix={setMix}
        />
        <Ledger mix={mix} selectedId={selectedId} onSelect={openProvince} />
        <Insights />
      </main>
      <Footer />
    </div>
  );
}
