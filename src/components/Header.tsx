'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
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
        <a href="/" className="brand" aria-label="EmergencyFundGuides home">
          <span className="brand-mark" aria-hidden="true">e</span>
          <span className="brand-name">EmergencyFund<span className="amp">·</span>Guides</span>
        </a>
        <ul className="nav-links" role="list">
          <li><a href="/#how-it-works">How it works</a></li>
          <li><a href="/#resources">Guides</a></li>
          <li><a href="/#calculator">Get help</a></li>
          <li><a href="/#calculator" className="nav-cta">Start free analysis</a></li>
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
        <a href="/#how-it-works" onClick={closeMenu}>How it works</a>
        <a href="/#resources" onClick={closeMenu}>Guides</a>
        <a href="/#calculator" onClick={closeMenu}>Get help</a>
        <a href="/#calculator" onClick={closeMenu}>Start free analysis →</a>
      </div>
    </header>
  );
}
