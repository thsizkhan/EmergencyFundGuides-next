import * as React from 'react';
import { ArrowRight, Shield, Check } from './icons';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-grid">
          <div>
            <div className="hero-badge">
              <span className="pulse" aria-hidden="true"></span>
              Free · 90-second analysis
            </div>
            <h1>
              See <em>every option</em><br />
              before you <span className="u">borrow</span>.
            </h1>
            <p className="hero-sub">
              A free tool for Americans facing a financial emergency. Answer 8 quick questions — we&apos;ll show every option available for <em>your</em> situation, ranked by what actually makes sense. No credit check.
            </p>
            <div className="hero-cta-row">
              <a href="#calculator" className="btn btn-primary">
                Start free analysis
                <ArrowRight />
              </a>
              <a href="#how-it-works" className="btn btn-ghost">How it works</a>
            </div>
          </div>

          <aside className="hero-meta" aria-label="Site at a glance">
            <div className="hero-stat-line">
              <div className="n"><em>47,832</em></div>
              <div className="l">Americans helped through an emergency</div>
            </div>
            <div className="hero-stat-line">
              <div className="n">$0</div>
              <div className="l">Cost to use this tool — always free</div>
            </div>
            <div className="hero-trust-row">
              <span><Shield fill="none" strokeWidth="2" /> Private</span>
              <span><ArrowRight /> No credit check</span>
              <span><Check fill="none" strokeWidth="2" /> SSL encrypted</span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
