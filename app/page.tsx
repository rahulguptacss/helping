import React from 'react';
import type { Metadata } from 'next';
import Header from '../components/sections/Header';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Causes from '../components/sections/Causes';
import Stats from '../components/sections/Stats';
import Testimonials from '../components/sections/Testimonials';
import Footer from '../components/sections/Footer';
import BackToTop from '../components/ui/BackToTop';
import { common, pages, sections, type PageComponent } from '@/components/types';

export const metadata: Metadata = {
  title: pages.home?.metadata?.title || 'Helping Hands | NGO for a Better Tomorrow',
  description: pages.home?.metadata?.description || 'Small Help, Big Smiles, Brighter Futures. Join our movement led by values, powered by people.',
};

export default function HomePage() {
  const sectionMap: Record<string, React.ReactNode> = {
    Hero: <Hero data={sections.hero} />,
    HeroSection: <Hero data={sections.hero} />,
    About: <About data={sections.about} />,
    AboutSection: <About data={sections.about} />,
    Causes: <Causes data={sections.causes} />,
    CausesSection: <Causes data={sections.causes} />,
    Stats: <Stats data={sections.stats} />,
    StatsSection: <Stats data={sections.stats} />,
    Testimonials: <Testimonials data={sections.testimonials} />,
    TestimonialsSection: <Testimonials data={sections.testimonials} />,
  };

  const components: PageComponent[] = pages.home?.components || [
    { key: 'HeroSection', component: 'Hero' },
    { key: 'AboutSection', component: 'About' },
    { key: 'CausesSection', component: 'Causes' },
    { key: 'StatsSection', component: 'Stats' },
    { key: 'TestimonialsSection', component: 'Testimonials' },
  ];

  return (
    <main className="flex min-h-screen flex-col bg-white">
      {/* 1. Header (Sticky/Fixed on scroll) */}
      <Header data={common.Header} />

      {/* 2. Dynamic Sections called from data.json */}
      {components.map((block: PageComponent) => {
        const componentElement = sectionMap[block.component] || sectionMap[block.key];
        if (!componentElement) return null;
        return (
          <React.Fragment key={block.key}>
            {componentElement}
          </React.Fragment>
        );
      })}

      {/* 3. Footer */}
      <Footer data={common.Footer} />

      {/* Back to Top */}
      <BackToTop />
    </main>
  );
}
