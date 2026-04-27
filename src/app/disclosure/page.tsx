import * as React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Advertiser disclosure',
  description: 'How EmergencyFundGuides is compensated and how that affects what you see.',
  alternates: { canonical: '/disclosure' },
};

export default function DisclosurePage() {
  return (
    <main className="legal-page">
      <div className="wrap-narrow">
        <span className="eyebrow eyebrow-dot">Legal</span>
        <h1>Advertiser disclosure</h1>
        <p className="lede">EmergencyFundGuides is a free service for consumers and is funded by lending partners.</p>
        <p>When you complete our analyzer and submit your contact details, we may share your information with one or more lending partners whose products match your profile. If you accept an offer from one of these partners, we may receive compensation. You are never charged a fee, and you are under no obligation to accept any offer.</p>
        <p>Compensation from partners may influence the order in which loan products appear in your ranked list — but it does not influence the non-loan guidance we provide (assistance programs, employer advances, creditor negotiation), and it does not influence what we publish in our editorial guides.</p>
        <p>We work to recommend products that are genuinely useful for your situation. If a product is predatory or unlikely to fit your profile, we do not surface it regardless of compensation.</p>
      </div>
    </main>
  );
}
