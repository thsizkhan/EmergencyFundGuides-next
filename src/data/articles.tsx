// Article content store. Pure data — server-rendered into article pages and
// the homepage card grid. Add a new article by appending an entry below.

import type { ReactNode } from 'react';

export type ContentBlock =
  | { type: 'p'; html: string }                    // paragraph (HTML allowed for <strong>, <em>, <a>)
  | { type: 'h2'; text: string; id?: string }       // section heading
  | { type: 'h3'; text: string; id?: string }       // subheading
  | { type: 'ul'; items: string[] }                 // bullet list
  | { type: 'ol'; items: string[] }                 // numbered list
  | { type: 'callout'; html: string }               // emphasised box
  | { type: 'quote'; html: string; cite?: string }; // pull-quote

export type FaqItem = { q: string; a: string };

export type CtaBlock = {
  heading: string;
  body: string;
  buttonLabel: string;
  buttonHref: string; // e.g. '/#calculator'
};

export type Article = {
  slug: string;             // URL slug — must be stable
  title: string;            // <h1> + <title>
  description: string;      // meta description (~155 chars)
  category: string;
  updated: string;          // ISO date 'YYYY-MM-DD'
  published?: string;       // ISO date 'YYYY-MM-DD' (optional, falls back to updated)
  author: string;
  readTime: string;         // human-readable, e.g. '6 min read'
  excerpt: string;          // shown on card + at top of article
  content: ContentBlock[];  // ordered body content
  faq: FaqItem[];
  cta: CtaBlock;
  disclosure: string;       // shown at bottom of every article
  cardArt?: ReactNode;      // optional inline SVG for the homepage card visual (server-rendered)
  cardBg?: ReactNode;       // optional inline SVG background pattern for the card
  related?: string[];       // slugs of related articles for internal linking
};

const standardDisclosure =
  'EmergencyFundGuides is not a lender. We are a free financial guidance service that connects consumers with third-party lenders. Completing our analysis tool does not guarantee approval for any financial product. APR ranges, loan amounts, and terms vary by lender, state, and individual eligibility. This site may receive compensation from lenders when consumers are connected with them. Compensation may influence which products appear and in what order. Always review loan terms carefully before accepting any offer.';

const standardCta: CtaBlock = {
  heading: 'See every option for your situation.',
  body: 'Free 90-second analysis. No credit check. We rank the options that actually make sense for your specific emergency, income, and credit range.',
  buttonLabel: 'Start free analysis',
  buttonHref: '/#calculator',
};

export const articles: Article[] = [
  {
    slug: 'car-broke-down-no-savings',
    title: 'Car broke down with no savings — your exact options in 2026',
    description:
      "Mechanic quoted you $1,800 and you have no savings? Here's what saying no actually costs — plus the options most people never consider before panicking.",
    category: 'Car repair',
    updated: '2026-03-12',
    published: '2025-09-04',
    author: 'EmergencyFundGuides Editorial',
    readTime: '6 min read',
    excerpt:
      'Your mechanic quoted $1,800. Here\'s what saying no actually costs you — and the options most people never consider before panicking.',
    content: [
      { type: 'p', html: 'You need your car to keep your job. The mechanic just quoted $1,800. You have $200 in checking. This is one of the most common emergencies in America, and there is almost always a path forward — but the path you pick has consequences for the next 12 months. Here is the practical breakdown.' },
      { type: 'h2', text: 'Step 1 — Confirm the repair is actually needed' },
      { type: 'p', html: 'Before you borrow a dollar, ask the mechanic three questions: <strong>Is this safety-critical?</strong> Is this the cheapest fix that solves it? Can the car be driven for two weeks while I arrange funds? Most quotes contain optional work. Some are urgent.' },
      { type: 'h2', text: 'Step 2 — Look at what you already have' },
      { type: 'ul', items: [
        'Credit card with available balance — usually cheaper than a payday loan if you can pay it down within 60–90 days.',
        'Employer pay advance — many employers offer interest-free advances. Most employees never ask.',
        '0% APR balance-transfer offer — if you have one in your inbox, this is often the lowest-cost path for $500–$2,500.',
        'Friends or family — uncomfortable, but interest-free and worth considering.',
      ] },
      { type: 'h2', text: 'Step 3 — Know what each loan really costs' },
      { type: 'p', html: 'A $1,500 payday loan rolled over twice can cost you $700+ in fees. The same $1,500 on a fair-credit personal installment loan repaid over 12 months might cost $250 in interest. The headline rate is misleading — what matters is total cost over your real repayment timeline.' },
      { type: 'callout', html: 'If the repair is under $1,500 and you have any credit card available, the card is almost always cheaper than a short-term loan — even at 24% APR. Compare the math, not the marketing.' },
      { type: 'h2', text: 'Step 4 — Negotiate before you borrow' },
      { type: 'ol', items: [
        'Ask the shop if they offer financing — many partner with Synchrony or Snap Finance and the rate is sometimes better than a payday loan.',
        'Ask if they accept 50% now, 50% in 30 days. Most independent shops will say yes.',
        'Ask for the cash discount. Some shops quietly take 5–10% off if you skip the credit card.',
      ] },
      { type: 'h2', text: 'Step 5 — Pick the smallest commitment that solves it' },
      { type: 'p', html: 'The right option is usually the one with the shortest repayment window you can actually meet. Long-term debt for a $1,800 repair compounds. Short-term, paid-on-time debt is mostly painless.' },
    ],
    faq: [
      { q: 'Should I use a payday loan for car repair?', a: 'Usually no. Payday loans typically run 300–600% APR. Almost any other option — including a higher-rate personal installment loan — costs less in total fees if you can repay over 6–12 months.' },
      { q: 'What if I have bad credit and no credit card?', a: 'Look at bad-credit personal installment loans, secured credit cards, and shop financing through the mechanic before any payday product. Income and employment matter more than score for these lenders.' },
      { q: 'Can I drive without fixing it?', a: 'Only if the mechanic confirms the issue is not safety-critical. Worn brakes, suspension, or steering should never be deferred. A non-critical issue (e.g. cosmetic, A/C, minor leaks) can wait while you arrange funds.' },
      { q: 'Will my insurance cover any of this?', a: 'Standard auto insurance does not cover mechanical breakdown. If you have an extended warranty, mechanical breakdown insurance, or roadside coverage, call them before paying out of pocket.' },
    ],
    cta: standardCta,
    disclosure: standardDisclosure,
    related: ['medical-bill-cannot-pay', 'behind-on-rent-every-option'],
    cardBg: (
      <svg className="bg" viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <pattern id="p1" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="12" stroke="#1f4a38" strokeWidth="1" opacity="0.12" />
          </pattern>
        </defs>
        <rect width="400" height="225" fill="url(#p1)" />
      </svg>
    ),
    cardArt: (
      <svg className="art" viewBox="0 0 160 120">
        <path d="M20 80V60l8-20h104l8 20v20" />
        <path d="M20 80h120v20H20z" />
        <circle cx="45" cy="100" r="8" />
        <circle cx="115" cy="100" r="8" />
        <path d="M40 60h80" />
      </svg>
    ),
  },
  {
    slug: 'medical-bill-cannot-pay',
    title: 'Unexpected medical bill you cannot pay — what happens if you ignore it',
    description:
      'Medical debt goes to collections in about 90 days. Here\'s what that costs you long-term, and the negotiation options most patients never use.',
    category: 'Medical bills',
    updated: '2026-02-28',
    published: '2025-08-19',
    author: 'EmergencyFundGuides Editorial',
    readTime: '8 min read',
    excerpt:
      'Medical debt goes to collections in 90 days. Here\'s what that costs you long-term and the negotiation options most patients never use.',
    content: [
      { type: 'p', html: 'A surprise medical bill is one of the most stressful pieces of mail in America. The good news: medical debt has more flexibility than nearly any other kind. Hospitals and clinics expect to negotiate — and there are protections most patients are never told about.' },
      { type: 'h2', text: 'Do not ignore it. But do not panic-pay either.' },
      { type: 'p', html: 'Medical bills usually go to collections after about 90 days of non-payment. Once in collections, the impact on your credit is real but smaller than other debt: under recent rules, paid medical collections under $500 do not appear on credit reports at all.' },
      { type: 'h2', text: 'Step 1 — Ask for an itemised bill' },
      { type: 'p', html: 'Hospital billing departments will send an itemised bill on request. Studies routinely find double-charges, services never received, and incorrect billing codes. <strong>Ask for the itemised bill before paying anything.</strong>' },
      { type: 'h2', text: 'Step 2 — Apply for charity care or financial assistance' },
      { type: 'p', html: 'Every nonprofit hospital is required by federal law to offer financial assistance. Eligibility is broader than most patients expect — often up to 300%–400% of the federal poverty line. The application is usually a single form. Ask the billing office for the financial assistance application.' },
      { type: 'h2', text: 'Step 3 — Negotiate the price' },
      { type: 'ol', items: [
        'Ask for the cash-pay rate, even if you have insurance. Sometimes it\'s lower than your insurance-negotiated rate.',
        'Offer a lump sum at 30–50% of the balance. Many hospital billers will accept this to close the file.',
        'Ask for an interest-free payment plan. Most hospitals will agree to 12–24 months at $0 interest.',
      ] },
      { type: 'callout', html: 'Never put a medical bill on a high-APR credit card or take a personal loan to pay it before negotiating. Once you pay, your leverage is gone.' },
      { type: 'h2', text: 'Step 4 — Compare loans only after negotiation' },
      { type: 'p', html: 'If a payment plan and assistance still leave a gap, a personal installment loan is usually the lowest-cost borrowing option for medical debt. Avoid medical-specific credit cards (CareCredit, etc.) — the deferred-interest clauses can add 26%+ APR retroactively if you miss the promo period.' },
    ],
    faq: [
      { q: 'How long before a medical bill goes to collections?', a: 'Typically 90–180 days. Each provider sets its own threshold — call them and ask. Even after it is sent to collections, you have time and options to dispute, negotiate, or apply for assistance.' },
      { q: 'Will medical debt destroy my credit score?', a: 'It will hurt, but less than other debt. Paid medical collections under $500 do not appear on credit reports. Unpaid collections take a year to appear, giving you time to act.' },
      { q: 'Can a hospital refuse to treat me if I owe them money?', a: 'For non-emergency, scheduled care — yes, in some states. For emergency care — no. The federal EMTALA law requires hospitals to stabilise emergency patients regardless of ability to pay.' },
      { q: 'Should I use CareCredit?', a: 'Be careful. CareCredit and similar medical credit cards use deferred-interest promotions: if you don\'t pay the balance in full by the end of the promo period, you owe interest from day one. A standard personal loan is often safer.' },
    ],
    cta: standardCta,
    disclosure: standardDisclosure,
    related: ['car-broke-down-no-savings', 'behind-on-rent-every-option'],
    cardBg: (
      <svg className="bg" viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <pattern id="p2" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="8" cy="8" r="1" fill="#1f4a38" opacity="0.2" />
          </pattern>
        </defs>
        <rect width="400" height="225" fill="url(#p2)" />
      </svg>
    ),
    cardArt: (
      <svg className="art" viewBox="0 0 160 120">
        <rect x="30" y="20" width="100" height="90" rx="4" />
        <path d="M45 45h70M45 60h70M45 75h50" />
        <circle cx="120" cy="85" r="14" />
        <path d="M120 78v14M113 85h14" />
      </svg>
    ),
  },
  {
    slug: 'behind-on-rent-every-option',
    title: 'Behind on rent with no way to catch up — every option available',
    description:
      'Late rent is more dangerous than late credit-card debt. Here\'s the true cost of catching up vs. the rental assistance programs most tenants don\'t know exist.',
    category: 'Housing',
    updated: '2026-03-04',
    published: '2025-09-22',
    author: 'EmergencyFundGuides Editorial',
    readTime: '7 min read',
    excerpt:
      "The true cost of a late rent payment vs. a short-term loan — plus rental assistance programs most tenants don't know exist.",
    content: [
      { type: 'p', html: 'Late rent is more dangerous than late credit-card debt. A missed credit-card payment costs you a fee and a credit ding. A missed rent payment can start an eviction filing — and an eviction record is much harder to recover from than a low credit score. Move fast.' },
      { type: 'h2', text: 'Step 1 — Talk to your landlord today' },
      { type: 'p', html: 'Most landlords prefer a paying tenant on a payment plan to an empty unit. Email or call before you miss the payment, not after. <strong>Ask in writing for a 14-day grace period or a 60-day catch-up plan.</strong> Get the answer in writing.' },
      { type: 'h2', text: 'Step 2 — Apply for emergency rental assistance' },
      { type: 'p', html: 'Most states still have emergency rental assistance programs (ERAP) funded after 2021. Check your state\'s housing department website or 211. The application can take 2–6 weeks but landlords will often pause an eviction filing once they know the application is in progress.' },
      { type: 'h2', text: 'Step 3 — Tap local nonprofits' },
      { type: 'ul', items: [
        'Catholic Charities and Salvation Army both run rent-assistance programs in most metro areas.',
        '211.org connects you with local emergency rent funds.',
        'Modest Needs and similar microgrants pay landlords directly — no repayment.',
      ] },
      { type: 'h2', text: 'Step 4 — Compare borrowing options' },
      { type: 'p', html: 'If you must borrow, a personal installment loan is usually the lowest-cost option. Avoid payday loans for rent — repayment lands on your next paycheck and creates a worse problem 14 days later. If you have a 401(k) or HSA, a 401(k) loan is sometimes the cheapest path.' },
      { type: 'callout', html: 'Never sign a "cash-for-keys" agreement, voluntary move-out, or new lease modification under pressure. Get the written terms and 24 hours to read them. Many tenants give up rights they didn\'t know they had.' },
    ],
    faq: [
      { q: 'How long before my landlord can evict me?', a: 'Varies by state — anywhere from 3 days (Texas) to 30 days notice before the filing. The court process then adds 2–6 weeks. You usually have more time than the notice suggests, but do not wait.' },
      { q: 'Will applying for rental assistance hurt my credit?', a: 'No. Government rental assistance programs do not pull credit and do not appear on credit reports. The money is paid directly to your landlord.' },
      { q: 'Is a 401(k) loan a good idea for rent?', a: 'Sometimes. The interest goes back to your own account, and there is no credit check. The risk: if you leave or lose your job, the loan is often due in full. Use only if your job is stable.' },
      { q: 'Can my landlord refuse a partial payment?', a: 'In some states, yes. In others, accepting a partial payment can pause the eviction process. Always offer the partial payment in writing and ask for written confirmation of how it is applied.' },
    ],
    cta: standardCta,
    disclosure: standardDisclosure,
    related: ['utility-shutoff-help', 'medical-bill-cannot-pay'],
    cardBg: (
      <svg className="bg" viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <pattern id="p3" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M0 20L20 0" stroke="#1f4a38" strokeWidth="1" opacity="0.14" />
          </pattern>
        </defs>
        <rect width="400" height="225" fill="url(#p3)" />
      </svg>
    ),
    cardArt: (
      <svg className="art" viewBox="0 0 160 120">
        <path d="M20 60L80 20l60 40" />
        <path d="M35 55v55h90V55" />
        <path d="M65 110V80h30v30" />
      </svg>
    ),
  },
  {
    slug: 'utility-shutoff-help',
    title: 'Utility shutoff notice — exactly what to do in the next 24 hours',
    description:
      'Got a disconnect notice for electric, gas, or water? Here are the federal and state programs that can stop the shutoff, and the timeline you actually have.',
    category: 'Utilities',
    updated: '2026-03-18',
    published: '2025-10-08',
    author: 'EmergencyFundGuides Editorial',
    readTime: '5 min read',
    excerpt:
      'Got a disconnect notice for electric, gas, or water? Here are the federal and state programs that can stop the shutoff, and the timeline you actually have.',
    content: [
      { type: 'p', html: 'A utility shutoff notice looks final. It rarely is. Most utilities are required by state law to give you a grace period, accept partial payment, and pause shutoffs if you qualify for assistance. Here is the action sequence.' },
      { type: 'h2', text: 'Step 1 — Call the utility today and ask for a payment arrangement' },
      { type: 'p', html: 'Every major utility has a hardship desk. Ask for a deferred payment agreement (DPA) — typically 3–12 months to catch up while staying on. Most utilities will grant one DPA per year automatically.' },
      { type: 'h2', text: 'Step 2 — Apply for LIHEAP' },
      { type: 'p', html: 'The Low Income Home Energy Assistance Program is federal money distributed by your state. It can pay anywhere from $200 to $1,500+ toward your bill, sometimes as a one-time crisis grant within 48 hours. <strong>This is the single most under-used program in this category.</strong>' },
      { type: 'h2', text: 'Step 3 — Check seasonal shutoff protections' },
      { type: 'ul', items: [
        'Most northern states ban heating shutoffs in winter (Nov–Apr).',
        'Several southern states ban electric shutoffs during summer heat advisories.',
        'A medical emergency certificate from your doctor can pause a shutoff for 30+ days.',
      ] },
      { type: 'h2', text: 'Step 4 — Tap nonprofits and the utility\'s own fund' },
      { type: 'p', html: 'Most utilities have a customer-funded hardship pot (often called HEAT, Share, Neighbor-to-Neighbor). Salvation Army administers many of them. A single phone call can yield $300–$600 toward the bill.' },
      { type: 'callout', html: 'Don\'t take a payday loan to pay a utility bill. The shutoff timeline is almost always longer than the notice suggests — use that time to apply for assistance instead.' },
    ],
    faq: [
      { q: 'How long does a utility shutoff notice actually last?', a: 'Most states require 5–15 days notice before disconnection. Some require multiple notices. Once you call and request a payment arrangement, the shutoff is usually paused while the request is processed.' },
      { q: 'Can my utility be shut off in winter?', a: 'In most northern states, no — winter heating shutoff moratoriums are law from roughly November through April. Check your state public utilities commission for exact dates.' },
      { q: 'What is LIHEAP and how do I apply?', a: 'LIHEAP is a federal program that helps with home energy costs. Apply through your state energy assistance agency or call 211. Many states accept online applications and prioritise active shutoff cases.' },
      { q: 'Will the utility company pull my credit?', a: 'For payment arrangements: usually no. For new service after a disconnect: sometimes. Hardship desk arrangements are designed to keep you on without a credit pull.' },
    ],
    cta: standardCta,
    disclosure: standardDisclosure,
    related: ['behind-on-rent-every-option', 'car-broke-down-no-savings'],
    cardBg: (
      <svg className="bg" viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <pattern id="p4" width="14" height="14" patternUnits="userSpaceOnUse">
            <path d="M0 0h14v14H0z" fill="none" />
            <path d="M3 3l8 8M11 3l-8 8" stroke="#1f4a38" strokeWidth="0.7" opacity="0.18" />
          </pattern>
        </defs>
        <rect width="400" height="225" fill="url(#p4)" />
      </svg>
    ),
    cardArt: (
      <svg className="art" viewBox="0 0 160 120">
        <path d="M70 20L40 70h25l-5 30 35-50H70l5-30z" />
      </svg>
    ),
  },
];

// Lookup helpers used by the article route + homepage card grid.

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getAllSlugs(): string[] {
  return articles.map((a) => a.slug);
}

export function getRelatedArticles(slug: string, limit = 2): Article[] {
  const a = getArticleBySlug(slug);
  if (!a || !a.related) return [];
  return a.related
    .map((s) => getArticleBySlug(s))
    .filter((x): x is Article => Boolean(x))
    .slice(0, limit);
}
