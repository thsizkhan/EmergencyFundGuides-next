'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { HamburgerIcon } from './icons';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!menuOpen) return;
      const menu = document.getElementById('mobileMenu');
      const h = document.getElementById('hamburger');
      const target = e.target as Node;
      if (menu && h && !menu.contains(target) && !h.contains(target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [menuOpen]);

  // Smooth-scroll for in-page anchors (preserves original behaviour)
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      const y = (el as HTMLElement).getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
      <nav className="nav" aria-label="Primary">
        <Link href="/" className="brand" aria-label="EmergencyFundGuides home">
          <span className="brand-mark" aria-hidden="true">e</span>
          <span className="brand-name">EmergencyFund<span className="amp">·</span>Guides</span>
        </Link>
        <ul className="nav-links" role="list">
          <li><Link href="/#how-it-works">How it works</Link></li>
          <li><Link href="/#resources">Guides</Link></li>
          <li><Link href="/#calculator">Get help</Link></li>
          <li><Link href="/#calculator" className="nav-cta">Start free analysis</Link></li>
        </ul>
        <button
          className="hamburger"
          id="hamburger"
          aria-label="Menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <HamburgerIcon stroke="currentColor" />
        </button>
      </nav>
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`} id="mobileMenu">
        <Link href="/#how-it-works" onClick={closeMenu}>How it works</Link>
        <Link href="/#resources" onClick={closeMenu}>Guides</Link>
        <Link href="/#calculator" onClick={closeMenu}>Get help</Link>
        <Link href="/#calculator" onClick={closeMenu}>Start free analysis →</Link>
      </div>
    </header>
  );
}
