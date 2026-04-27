import * as React from 'react';
import Hero from '@/components/Hero';
import Situations from '@/components/Situations';
import Stats from '@/components/Stats';
import HowItWorks from '@/components/HowItWorks';
import Calculator from '@/components/Calculator';
import ArticlesSection from '@/components/ArticlesSection';
import CtaBanner from '@/components/CtaBanner';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Situations />
      <Stats />
      <HowItWorks />
      <Calculator />
      <ArticlesSection />
      <CtaBanner />
    </main>
  );
}
