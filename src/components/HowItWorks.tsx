import * as React from 'react';

const steps = [
  {
    n: 'Step 01',
    title: 'Tell us what happened.',
    desc: 'Eight questions about the emergency, your income, your credit range, and what you already have. No Social Security number. No document uploads.',
    time: '— 90 seconds',
  },
  {
    n: 'Step 02',
    title: 'See every real option.',
    desc: "Instant ranked list: loans you'd actually qualify for, employer advances, assistance programs, credit negotiation, and non-loan paths most people miss.",
    time: '— Instant',
  },
  {
    n: 'Step 03',
    title: 'Get your written plan.',
    desc: 'A full personalized action plan emailed to you — step-by-step, with state-specific programs, scripts for calling creditors, and links to every resource.',
    time: '— Sent in 30 seconds',
  },
];

export default function HowItWorks() {
  return (
    <section className="hiw" id="how-it-works">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow eyebrow-dot">How it works</span>
          <h2>Clarity first, <em>then</em> a decision you can defend.</h2>
          <p>We are not a lender. We don&apos;t push a product. We help you understand every option available for your specific situation — then connect you with the right solution if you want one.</p>
        </div>

        <div className="hiw-grid">
          {steps.map((s) => (
            <div className="hiw-card reveal in" key={s.n}>
              <div className="hiw-num">{s.n}</div>
              <h3 className="hiw-title">{s.title}</h3>
              <p className="hiw-desc">{s.desc}</p>
              <span className="hiw-time">{s.time}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
