import * as React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of service',
  description: 'The terms governing your use of EmergencyFundGuides.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <main className="legal-page">
      <div className="wrap-narrow">
        <span className="eyebrow eyebrow-dot">Legal</span>
        <h1>Terms of service</h1>
        <p className="lede">Last updated: March 2026.</p>
        <p>By using EmergencyFundGuides you agree to these terms. If you do not agree, please do not use the site.</p>
        <h2>Not a lender</h2>
        <p>EmergencyFundGuides is not a lender, broker, or financial advisor. We are a guidance service. We do not make credit decisions and do not guarantee approval for any financial product.</p>
        <h2>No advice</h2>
        <p>The content on this site is for informational purposes only and is not personalized financial, legal, or tax advice. Consult a qualified professional for advice specific to your situation.</p>
        <h2>Eligibility</h2>
        <p>You must be at least 18 years old and a U.S. resident to use our analyzer. By submitting the lead form you confirm that the information you provided is accurate.</p>
        <h2>Limitation of liability</h2>
        <p>To the maximum extent permitted by law, EmergencyFundGuides is not liable for any indirect, incidental, or consequential damages arising from your use of the site or any third-party financial product you obtain through us.</p>
        <h2>Changes</h2>
        <p>We may update these terms periodically. The current version will always be posted at this URL.</p>
        <h2>Contact</h2>
        <p>Questions: legal@emergencyfundguides.com.</p>
      </div>
    </main>
  );
}
