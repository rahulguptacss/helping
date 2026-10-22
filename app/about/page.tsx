import React from 'react';
import type { Metadata } from 'next';
import Header from '../../components/sections/Header';
import Footer from '../../components/sections/Footer';
import Breadcrumb from '../../components/sections/Breadcrumb';
import About from '../../components/sections/About';
import Stats from '../../components/sections/Stats';
import OurStory from '../../components/sections/OurStory';
import Testimonials from '../../components/sections/Testimonials';
import BackToTop from '../../components/ui/BackToTop';
import { common, pages, sections, type PageComponent } from '@/components/types';

const pageData = pages.about;

export const metadata: Metadata = {
  title: pageData.metadata.title,
  description: pageData.metadata.description,
};

export default function AboutPage() {
  // Keyed by the `component` name used in data.json -> pages.about.components
  const sectionMap: Record<string, React.ReactNode> = {
    Breadcrumb: <Breadcrumb data={pageData.breadcrumb} />,
    About: <About data={sections.about} />,
    Stats: <Stats data={sections.stats} />,
    OurStory: <OurStory data={sections.our_story} />,
    Testimonials: <Testimonials data={sections.testimonials} />,
  };

  return (
    <main className="flex min-h-screen flex-col bg-white">
      {/* 1. Header (Sticky navigation overlay) */}
      <Header data={common.Header} />

      {/* 2. Dynamic Sections called from data.json */}
      {pageData.components.map((block: PageComponent) => (
        <React.Fragment key={block.key}>{sectionMap[block.component] ?? null}</React.Fragment>
      ))}

      {/* 3. Footer */}
      <Footer data={common.Footer} />

      {/* 4. Back to Top Button */}
      <BackToTop data={common.BackToTop} />
    </main>
  );
}
