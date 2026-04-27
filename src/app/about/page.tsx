import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from '@/components/icons';

export const metadata: Metadata = {
  title: 'About — our mission and how we make money',
  description: 'EmergencyFundGuides is a free guidance service for Americans facing a financial emergency. Here is how we operate and how we are funded.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <main className="legal-page">
      <div className="wrap-narrow">
        <span className="eyebrow eyebrow-dot">About</span>
        <h1>We help Americans see <em>every option</em> before they borrow.</h1>
        <p className="lede">EmergencyFundGuides is a free, independent guidance service. We are not a lender, and we don&apos;t make credit decisions.</p>

        <h2>What we do</h2>
        <p>When you finish our 90-second analysis, we show you a ranked list of every option available for your specific situation — including options that are not loans. Employer pay advances, state assistance programs, hospital charity care, and creditor negotiation tactics often outrank every loan we could surface. We surface them anyway.</p>

        <h2>How we&apos;re funded</h2>
        <p>We receive compensation from lending partners <strong>only</strong> when a consumer chooses to be connected with them. There is no charge to consumers, ever. Compensation may influence which loan products appear in your ranked list, but does not affect the non-loan guidance, the assistance program links, or the educational content on this site.</p>

        <h2>Editorial independence</h2>
        <p>Our guides are written and reviewed by an in-house editorial team. No lender pays for placement in our articles or determines what we publish. If we find a financial product to be predatory, we say so.</p>

        <Link href="/#calculator" className="btn btn-primary" style={{ marginTop: 24 }}>
          Start your free analysis
          <ArrowRight />
        </Link>
      </div>
    </main>
  );
}
