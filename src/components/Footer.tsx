import * as React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/" className="brand" aria-label="EmergencyFundGuides home">
              <span className="brand-mark" aria-hidden="true">e</span>
              <span className="brand-name">EmergencyFund<span className="amp">·</span>Guides</span>
            </Link>
            <p>Free guidance for Americans facing an unexpected financial emergency. We help you understand every option — not just loans.</p>
          </div>
          <div className="footer-col">
            <h4>Get help</h4>
            <ul>
              <li><Link href="/#calculator">Free analysis</Link></li>
              <li><Link href="/#calculator">Car repair</Link></li>
              <li><Link href="/#calculator">Medical bills</Link></li>
              <li><Link href="/#calculator">Rent &amp; housing</Link></li>
              <li><Link href="/#calculator">Utility shutoff</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Resources</h4>
            <ul>
              <li><Link href="/resources">All guides</Link></li>
              <li><Link href="/resources/car-broke-down-no-savings">Car repair, no savings</Link></li>
              <li><Link href="/resources/medical-bill-cannot-pay">Medical bills you can&apos;t pay</Link></li>
              <li><Link href="/resources/behind-on-rent-every-option">Behind on rent</Link></li>
              <li><Link href="/resources/utility-shutoff-help">Utility shutoff help</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/privacy">Privacy policy</Link></li>
              <li><Link href="/terms">Terms of service</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/disclosure">Advertiser disclosure</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-legal-block">
          <div className="lbl">Important disclosures</div>
          <p>
            <strong>EmergencyFundGuides is not a lender</strong> and does not make credit decisions. We are a free financial guidance service that connects consumers with third-party lenders and financial service providers. Completing our analysis tool does not guarantee approval for any financial product. Loan availability, amounts, rates, and terms vary by lender, state, and individual eligibility. APR ranges vary by lender. By submitting your information you agree to our <Link href="/terms">Terms</Link> and <Link href="/privacy">Privacy Policy</Link> and consent to be contacted by us and our lending partners regarding financial options. This site may receive compensation from lenders when consumers are connected with them. Compensation may influence which products appear and in what order, but does not affect the accuracy of our guidance. Always review loan terms carefully before accepting any offer.
          </p>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} EmergencyFundGuides. All rights reserved.</span>
          <span>
            <Link href="/privacy" style={{ color: 'var(--ink-3)', textDecoration: 'none', marginRight: 16 }}>Privacy</Link>
            <Link href="/terms" style={{ color: 'var(--ink-3)', textDecoration: 'none' }}>Terms</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
