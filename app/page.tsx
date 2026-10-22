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

const pageData = pages.home;

export const metadata: Metadata = {
  title: pageData.metadata.title,
  description: pageData.metadata.description,
};

export default function HomePage() {
  // Keyed by the `component` name used in data.json -> pages.home.components
  const sectionMap: Record<string, React.ReactNode> = {
    Hero: <Hero data={sections.hero} />,
    About: <About data={sections.about} />,
    Causes: <Causes data={sections.causes} />,
    Stats: <Stats data={sections.stats} />,
    Testimonials: <Testimonials data={sections.testimonials} />,
  };

  return (
    <main className="flex min-h-screen flex-col bg-white">
      {/* 1. Header (Sticky/Fixed on scroll) */}
      <Header data={common.Header} />

      {/* 2. Dynamic Sections called from data.json */}
      {pageData.components.map((block: PageComponent) => (
        <React.Fragment key={block.key}>{sectionMap[block.component] ?? null}</React.Fragment>
      ))}

      {/* 3. Footer */}
      <Footer data={common.Footer} />

      {/* Back to Top */}
      <BackToTop data={common.BackToTop} />
    </main>
  );
}
