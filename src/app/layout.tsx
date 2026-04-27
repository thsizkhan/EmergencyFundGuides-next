import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import * as React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { siteConfig, absoluteUrl } from '@/lib/site';

// Self-hosted Google Fonts via next/font keep the original visual identity
// but eliminate the render-blocking <link> the static prototype used.
const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-sans',
});

const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-serif',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-mono',
});

export const viewport: Viewport = {
  themeColor: '#faf8f3',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — See every option before you borrow`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.publisher }],
  publisher: siteConfig.publisher,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — See every option before you borrow`,
    description: siteConfig.shortDescription,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — See every option before you borrow`,
    description: siteConfig.shortDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  icons: { icon: '/favicon.ico' },
};

// JSON-LD structured data — server-rendered into <head>.
const jsonLdWebApp = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Emergency Financial Analyzer',
  url: siteConfig.url,
  description:
    "Free tool that analyzes a user's financial emergency and shows every option available — loans, assistance programs, advances, and negotiation tactics — ranked for their specific profile.",
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', reviewCount: '3214' },
};

const jsonLdOrg = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.name,
  url: siteConfig.url,
  description: 'Free financial guidance platform helping Americans navigate financial emergencies.',
  sameAs: [],
};

const jsonLdFaq = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Is this really free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. The analysis tool, the action plan email, and our guides are all free. We are compensated by lending partners when consumers choose to be connected with them — but you are under no obligation to accept any offer.' } },
    { '@type': 'Question', name: 'Do you do a credit check?', acceptedAnswer: { '@type': 'Answer', text: 'No. Using our tool does not affect your credit score in any way. We ask you to estimate your credit range so we can rank options that are actually available to you.' } },
    { '@type': 'Question', name: 'How fast will I see options?', acceptedAnswer: { '@type': 'Answer', text: 'Options appear on screen immediately after you finish the 8 questions — roughly 90 seconds. Your full personalized action plan is emailed within 30 seconds of submission.' } },
    { '@type': 'Question', name: 'Are you a lender?', acceptedAnswer: { '@type': 'Answer', text: 'No. EmergencyFundGuides is not a lender. We are a guidance service that helps you understand every option available to you, including non-loan paths like assistance programs and creditor negotiation.' } },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger -- structured data is static & trusted
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebApp) }}
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
        />
        <link rel="canonical" href={absoluteUrl('/')} />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
