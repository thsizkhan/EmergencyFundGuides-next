import * as React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { articles, getArticleBySlug, getRelatedArticles } from '@/data/articles';
import type { Article, ContentBlock } from '@/data/articles';
import { absoluteUrl, siteConfig } from '@/lib/site';
import { ArrowRight } from '@/components/icons';

// Static params at build time — every article slug becomes its own static page.
export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: 'Article not found' };

  const url = absoluteUrl(`/resources/${article.slug}`);
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/resources/${article.slug}` },
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.description,
      url,
      siteName: siteConfig.name,
      publishedTime: article.published || article.updated,
      modifiedTime: article.updated,
      authors: [article.author],
      section: article.category,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = getRelatedArticles(article.slug, 2);
  const url = absoluteUrl(`/resources/${article.slug}`);

  // Schema.org Article + FAQPage + BreadcrumbList — three JSON-LD blocks
  // give Google the strongest hooks for rich results.
  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.published || article.updated,
    dateModified: article.updated,
    author: { '@type': 'Organization', name: article.author },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.publisher,
      url: siteConfig.url,
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    articleSection: article.category,
  };
  const faqLd = article.faq.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: article.faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  } : null;
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: absoluteUrl('/resources') },
      { '@type': 'ListItem', position: 3, name: article.title, item: url },
    ],
  };

  return (
    <main className="article-page">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      {faqLd && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      )}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <article className="article-full">
        <div className="wrap-narrow">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">›</span>
            <Link href="/resources">Guides</Link>
            <span aria-hidden="true">›</span>
            <span className="cur">{article.category}</span>
          </nav>
          <span className="eyebrow eyebrow-dot">{article.category}</span>
          <h1 className="article-h1">{article.title}</h1>
          <p className="article-lede">{article.excerpt}</p>
          <div className="article-byline">
            <span>{article.author}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={article.updated}>Updated {formatDate(article.updated)}</time>
            <span aria-hidden="true">·</span>
            <span>{article.readTime}</span>
          </div>

          <div className="article-prose">
            {article.content.map((block, i) => renderBlock(block, i))}
          </div>

          {article.faq.length > 0 && (
            <section className="article-faq" aria-labelledby="faq-heading">
              <h2 id="faq-heading">Frequently asked</h2>
              <dl>
                {article.faq.map((f, i) => (
                  <div className="faq-item" key={i}>
                    <dt>{f.q}</dt>
                    <dd>{f.a}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          <ArticleCta article={article} />

          {related.length > 0 && (
            <section className="article-related" aria-labelledby="related-heading">
              <h2 id="related-heading">Keep reading</h2>
              <div className="related-grid">
                {related.map((r) => (
                  <Link key={r.slug} href={`/resources/${r.slug}`} className="related-card">
                    <span className="article-cat">{r.category}</span>
                    <h3>{r.title}</h3>
                    <p>{r.excerpt}</p>
                    <span className="related-arrow"><ArrowRight /></span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <p className="article-disclosure">{article.disclosure}</p>
        </div>
      </article>
    </main>
  );
}

function ArticleCta({ article }: { article: Article }) {
  return (
    <aside className="article-cta">
      <div className="article-cta-inner">
        <h2>{article.cta.heading}</h2>
        <p>{article.cta.body}</p>
        <Link href={article.cta.buttonHref} className="btn btn-primary">
          {article.cta.buttonLabel}
          <ArrowRight />
        </Link>
      </div>
    </aside>
  );
}

function renderBlock(block: ContentBlock, idx: number) {
  switch (block.type) {
    case 'h2':
      return <h2 key={idx} id={block.id}>{block.text}</h2>;
    case 'h3':
      return <h3 key={idx} id={block.id}>{block.text}</h3>;
    case 'p':
      // eslint-disable-next-line react/no-danger -- content is authored, not user input
      return <p key={idx} dangerouslySetInnerHTML={{ __html: block.html }} />;
    case 'ul':
      return (
        <ul key={idx}>
          {block.items.map((it, i) => <li key={i}>{it}</li>)}
        </ul>
      );
    case 'ol':
      return (
        <ol key={idx}>
          {block.items.map((it, i) => <li key={i}>{it}</li>)}
        </ol>
      );
    case 'callout':
      // eslint-disable-next-line react/no-danger
      return <aside key={idx} className="prose-callout" dangerouslySetInnerHTML={{ __html: block.html }} />;
    case 'quote':
      return (
        <blockquote key={idx} className="prose-quote">
          {/* eslint-disable-next-line react/no-danger */}
          <p dangerouslySetInnerHTML={{ __html: block.html }} />
          {block.cite && <cite>— {block.cite}</cite>}
        </blockquote>
      );
    default:
      return null;
  }
}

function formatDate(iso: string): string {
  // Locale-stable formatting so SSR + client output match exactly.
  const d = new Date(iso + 'T00:00:00Z');
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
}
