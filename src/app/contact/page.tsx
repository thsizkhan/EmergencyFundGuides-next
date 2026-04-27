import * as React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact us',
  description: 'Reach the EmergencyFundGuides team for press, partnerships, privacy requests, or general questions.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <main className="legal-page">
      <div className="wrap-narrow">
        <span className="eyebrow eyebrow-dot">Contact</span>
        <h1>Get in touch.</h1>
        <p className="lede">For help with the analyzer, please use the form on the homepage. For all other inquiries, the addresses below are monitored Monday–Friday.</p>
        <h2>General questions</h2>
        <p>hello@emergencyfundguides.com</p>
        <h2>Press</h2>
        <p>press@emergencyfundguides.com</p>
        <h2>Partnerships</h2>
        <p>partners@emergencyfundguides.com</p>
        <h2>Privacy and data requests</h2>
        <p>privacy@emergencyfundguides.com</p>
        <h2>Legal</h2>
        <p>legal@emergencyfundguides.com</p>
      </div>
    </main>
  );
}
