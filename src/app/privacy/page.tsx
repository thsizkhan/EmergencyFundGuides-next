import * as React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy policy',
  description: 'How EmergencyFundGuides collects, uses, and protects your information.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <div className="wrap-narrow">
        <span className="eyebrow eyebrow-dot">Legal</span>
        <h1>Privacy policy</h1>
        <p className="lede">Last updated: March 2026.</p>
        <p>This policy describes how EmergencyFundGuides (&quot;we&quot;, &quot;us&quot;) collects, uses, and shares information from users of this website.</p>
        <h2>Information we collect</h2>
        <p>We collect information you provide when using the analyzer (situation, urgency, amount, income range, credit range, employment, state, name, email, optional phone number, optional comment). We also collect basic technical information automatically (IP address, device type, referring URL) for analytics and fraud prevention.</p>
        <h2>How we use it</h2>
        <p>We use the information you provide to generate your personalized action plan, send you the plan by email, improve our guidance over time, and — only if you submit the form — to connect you with relevant lending partners and assistance programs.</p>
        <h2>How we share it</h2>
        <p>We share your information with lending partners only after you submit the lead form and only with partners whose products are relevant to your profile. We do not sell your information for advertising. We may share aggregated, de-identified data publicly.</p>
        <h2>Your choices</h2>
        <p>You can request access, correction, or deletion of your personal information at any time by emailing privacy@emergencyfundguides.com. California, Virginia, Colorado, and other state residents have additional rights under their state privacy laws.</p>
        <h2>Cookies</h2>
        <p>We use a small number of first-party cookies for analytics and to remember your preferences. You can disable cookies in your browser settings; the site will continue to function.</p>
        <h2>Contact</h2>
        <p>Questions: privacy@emergencyfundguides.com.</p>
      </div>
    </main>
  );
}
