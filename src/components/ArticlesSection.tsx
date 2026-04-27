import * as React from 'react';
import Link from 'next/link';
import { articles } from '@/data/articles';
import { ArrowRight } from './icons';

export default function ArticlesSection() {
  return (
    <section className="articles" id="resources">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow eyebrow-dot">Free guides</span>
          <h2>Real situations.<br /><em>Real</em> guidance.</h2>
          <p>Plain-English playbooks for the most common financial emergencies. Free. No signup required to read them.</p>
        </div>

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
                  <span className="article-arrow" aria-hidden="true">
                    <ArrowRight />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
