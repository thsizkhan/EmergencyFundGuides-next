import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { articles } from '@/data/articles';
import { absoluteUrl, siteConfig } from '@/lib/site';
import { ArrowRight } from '@/components/icons';

export const metadata: Metadata = {
  title: 'Emergency money guides — every option, plain English',
  description:
    'Free guides for the most common financial emergencies. Car repairs, medical bills, behind on rent, utility shutoffs — what to do, in order.',
  alternates: { canonical: '/resources' },
  openGraph: {
    title: 'Emergency money guides — every option, plain English',
    description: 'Free guides for the most common financial emergencies in the United States.',
    url: absoluteUrl('/resources'),
    siteName: siteConfig.name,
    type: 'website',
  },
};

export default function ResourcesIndex() {
  return (
    <main className="resources-index">
      <section className="page-hero">
        <div className="wrap">
          <span className="eyebrow eyebrow-dot">Free guides</span>
          <h1>Emergency money guides.<br /><em>Every option,</em> plain English.</h1>
          <p>Practical playbooks for the most common financial emergencies. No fluff — what to do, in what order.</p>
        </div>
      </section>

      <section className="articles">
        <div className="wrap">
          <div className="articles-grid">
            {articles.map((a) => (
              <Link key={a.slug} href={`/resources/${a.slug}`} className="article" aria-label={a.title}>
                <div className="article-visual">
                  {a.cardBg}
                  {a.cardArt}
                </div>
                <div className="article-body">
                  <span className="article-cat">{a.category}</span>
                  <h3 className="article-title">{a.title}</h3>
                  <p className="article-excerpt">{a.excerpt}</p>
                  <div className="article-foot">
                    <span>{a.readTime}</span>
                    <span className="article-arrow" aria-hidden="true"><ArrowRight /></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
