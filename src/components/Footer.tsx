import * as React from 'react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="/" className="brand" aria-label="EmergencyFundGuides home">
              <span className="brand-mark" aria-hidden="true">e</span>
              <span className="brand-name">EmergencyFund<span className="amp">·</span>Guides</span>
            </a>
            <p>Free guidance for Americans facing an unexpected financial emergency. We help you understand every option — not just loans.</p>
          </div>
          <div className="footer-col">
            <h4>Get help</h4>
            <ul>
              <li><a href="/#calculator">Free analysis</a></li>
              <li><a href="/#calculator">Car repair</a></li>
              <li><a href="/#calculator">Medical bills</a></li>
              <li><a href="/#calculator">Rent &amp; housing</a></li>
              <li><a href="/#calculator">Utility shutoff</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Resources</h4>
            <ul>
              <li><a href="/resources">All guides</a></li>
              <li><a href="/resources/car-broke-down-no-savings">Car repair, no savings</a></li>
              <li><a href="/resources/medical-bill-cannot-pay">Medical bills you can&apos;t pay</a></li>
              <li><a href="/resources/behind-on-rent-every-option">Behind on rent</a></li>
              <li><a href="/resources/utility-shutoff-help">Utility shutoff help</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><a href="/about">About</a></li>
              <li><a href="/privacy">Privacy policy</a></li>
              <li><a href="/terms">Terms of service</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/disclosure">Advertiser disclosure</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-legal-block">
          <div className="lbl">Important disclosures</div>
          <p>
            <strong>EmergencyFundGuides is not a lender</strong> and does not make credit decisions. We are a free financial guidance service that connects consumers with third-party lenders and financial service providers. Completing our analysis tool does not guarantee approval for any financial product. Loan availability, amounts, rates, and terms vary by lender, state, and individual eligibility. APR ranges vary by lender. By submitting your information you agree to our <a href="/terms">Terms</a> and <a href="/privacy">Privacy Policy</a> and consent to be contacted by us and our lending partners regarding financial options. This site may receive compensation from lenders when consumers are connected with them. Compensation may influence which products appear and in what order, but does not affect the accuracy of our guidance. Always review loan terms carefully before accepting any offer.
          </p>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} EmergencyFundGuides. All rights reserved.</span>
          <span>
            <a href="/privacy" style={{ color: 'var(--ink-3)', textDecoration: 'none', marginRight: 16 }}>Privacy</a>
            <a href="/terms" style={{ color: 'var(--ink-3)', textDecoration: 'none' }}>Terms</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
