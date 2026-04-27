'use client';

// Client component: emits a custom event picked up by the Calculator below it.
// We use a window event instead of prop drilling so the homepage tree
// can keep server-rendered components above the calculator.

import * as React from 'react';
import { CarIcon, MedicalIcon, HouseIcon, BoltIcon, BriefcaseIcon, DocIcon, ArrowOutCorner } from './icons';

const items = [
  { type: 'car', label: <>Car repair<br />emergency</>, Icon: CarIcon },
  { type: 'medical', label: <>Medical bill<br />you can&apos;t pay</>, Icon: MedicalIcon },
  { type: 'rent', label: <>Behind on<br />rent or mortgage</>, Icon: HouseIcon },
  { type: 'utility', label: <>Utility<br />shutoff notice</>, Icon: BoltIcon },
  { type: 'job', label: <>Lost income<br />recently</>, Icon: BriefcaseIcon },
  { type: 'other', label: <>Something<br />else</>, Icon: DocIcon },
];

export default function Situations() {
  function preselect(type: string) {
    if (typeof window === 'undefined') return;
    window.dispatchEvent(new CustomEvent('efg:preselect', { detail: { type } }));
  }

  return (
    <section className="situations">
      <div className="wrap">
        <div className="situations-head">
          <h2>What are you dealing with right now?</h2>
          <span className="hint">Tap one to start →</span>
        </div>
        <div className="sit-grid" role="list">
          {items.map(({ type, label, Icon }) => (
            <a
              key={type}
              href="#calculator"
              className="sit-card"
              role="listitem"
              onClick={() => preselect(type)}
            >
              <Icon className="sit-icon" />
              <span className="sit-label">{label}</span>
              <ArrowOutCorner className="sit-arrow" fill="none" strokeWidth="1.8" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
