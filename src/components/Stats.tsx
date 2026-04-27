import * as React from 'react';

export default function Stats() {
  return (
    <section className="stats">
      <div className="stats-grid">
        <div className="stat">
          <div className="stat-num"><em>47K+</em></div>
          <div className="stat-lbl">Americans helped through an emergency</div>
        </div>
        <div className="stat">
          <div className="stat-num">90<span style={{ fontSize: '0.5em', color: 'rgba(250,248,243,0.5)' }}>s</span></div>
          <div className="stat-lbl">Average time to see your options</div>
        </div>
        <div className="stat">
          <div className="stat-num">$50K</div>
          <div className="stat-lbl">Maximum loan options surfaced</div>
        </div>
        <div className="stat">
          <div className="stat-num"><em>100%</em></div>
          <div className="stat-lbl">Free — no cost to use this tool</div>
        </div>
      </div>
    </section>
  );
}
