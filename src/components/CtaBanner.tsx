import * as React from 'react';
import { ArrowRight } from './icons';

export default function CtaBanner() {
  return (
    <section className="cta-banner">
      <div className="cta-banner-inner">
        <h2>Don&apos;t borrow <em>blindly.</em><br />See every option first.</h2>
        <p>Free tool. 90 seconds. No credit check required to use the analyzer.</p>
        <a href="#calculator" className="btn btn-on-accent">
          Start my free analysis
          <ArrowRight />
        </a>
      </div>
    </section>
  );
}
