import { C, card } from '../theme';
import { IconDoc, IconFactory, IconPin, SectionHead } from './Bits';

const cards = [
  {
    icon: IconFactory,
    title: 'Electrification alone leaves a scope 3 gap',
    body: 'Once tailpipes go clean, battery, steel and aluminium production dominate lifecycle emissions. Material efficiency is the lever that closes what electrification cannot.',
  },
  {
    icon: IconPin,
    title: 'Regional sensitivity decides the return',
    body: 'Downsizing and ride-sharing cut 2–3× more GHG per vehicle in the Southwest and Northwest than on the coast, where cleaner grids already shrink use-phase emissions.',
  },
  {
    icon: IconDoc,
    title: 'Provincial accountability, built in',
    body: 'Each province carries its own intensity ambition. The ledger turns a vehicle roadmap into a per-province compliance position you can defend in an MEE review.',
  },
];

export default function Insights() {
  return (
    <section id="evidence" style={{ maxWidth: 1140, margin: '0 auto', padding: '56px 20px 8px', scrollMarginTop: 84 }}>
      <SectionHead
        eyebrow="Evidence"
        title="Why material efficiency, why by region"
        sub="The tool is calibrated to peer-reviewed modelling of China's light-duty fleet, which finds material-efficiency strategies can avoid over 1,000 Mt of primary material production — with impact that varies sharply by province."
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginTop: 26 }}>
        {cards.map((c) => (
          <div key={c.title} style={{ ...card, padding: 20, minWidth: 0 }}>
            <span style={{ display: 'inline-flex', padding: 9, borderRadius: 11, background: C.accentSoft, color: C.accentDark, marginBottom: 12 }}>
              <c.icon size={20} />
            </span>
            <h3 style={{ fontSize: 17.5, fontWeight: 720, lineHeight: 1.3 }}>{c.title}</h3>
            <p style={{ fontSize: 15, color: C.body, marginTop: 8 }}>{c.body}</p>
          </div>
        ))}
      </div>
      <div
        style={{
          ...card,
          padding: '18px 20px',
          marginTop: 16,
          background: C.accentSoft,
          border: '1px solid ' + C.accent,
        }}
      >
        <p style={{ fontSize: 15, color: C.ink }}>
          <strong>Model basis:</strong> provincial fleet, grid-intensity and material-intensity profiles are illustrative, scaled to published benchmarks for
          China's light-duty fleet. All figures in this prototype are for demonstration, not regulatory advice.
        </p>
      </div>
    </section>
  );
}
