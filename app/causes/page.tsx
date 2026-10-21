import React from 'react';
import type { Metadata } from 'next';
import Header from '../../components/sections/Header';
import Footer from '../../components/sections/Footer';
import Breadcrumb from '../../components/sections/Breadcrumb';
import Causes from '../../components/sections/Causes';
import BackToTop from '../../components/ui/BackToTop';
import { common, pages, sections, type PageComponent } from '@/components/types';

export const metadata: Metadata = {
  title: pages.causes?.metadata?.title || 'Our Causes | Helping Hands - Empowering Communities',
  description:
    pages.causes?.metadata?.description ||
    'Discover our core causes — Education, Advocacy, Environment, and Action. Join Helping Hands in making a lasting impact.',
};

export default function CausesPage() {
  const causesPageData = pages.causes;

  const sectionMap: Record<string, React.ReactNode> = {
    Breadcrumb: <Breadcrumb data={causesPageData?.breadcrumb || sections.breadcrumb} />,
    BreadcrumbSection: <Breadcrumb data={causesPageData?.breadcrumb || sections.breadcrumb} />,
    Causes: sections.causes ? <Causes data={sections.causes} isPage={true} /> : null,
    CausesSection: sections.causes ? <Causes data={sections.causes} isPage={true} /> : null,
  };

  const components: PageComponent[] = causesPageData?.components || [
    { key: 'BreadcrumbSection', component: 'Breadcrumb' },
    { key: 'CausesSection', component: 'Causes' },
  ];

  return (
    <main className="flex min-h-screen flex-col bg-white">
      {/* 1. Header (Sticky navigation overlay) */}
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

      {/* 4. Back to Top Button */}
      <BackToTop />
    </main>
  );
}
