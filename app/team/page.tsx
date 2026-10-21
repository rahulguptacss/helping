import React from 'react';
import type { Metadata } from 'next';
import Header from '../../components/sections/Header';
import Footer from '../../components/sections/Footer';
import Breadcrumb from '../../components/sections/Breadcrumb';
import Team from '../../components/sections/Team';
import BackToTop from '../../components/ui/BackToTop';
import { common, pages, sections, type PageComponent } from '@/components/types';

export const metadata: Metadata = {
  title: pages.team?.metadata?.title || 'Our Teams | Helping Hands',
  description:
    pages.team?.metadata?.description ||
    'Meet our dedicated team of passionate individuals working together to create a healthier, safer and brighter future for communities.',
};

export default function TeamPage() {
  const teamPageData = pages.team;

  const sectionMap: Record<string, React.ReactNode> = {
    Breadcrumb: <Breadcrumb data={teamPageData?.breadcrumb || sections.breadcrumb} />,
    BreadcrumbSection: <Breadcrumb data={teamPageData?.breadcrumb || sections.breadcrumb} />,
    Team: sections.team ? <Team data={sections.team} /> : null,
    TeamSection: sections.team ? <Team data={sections.team} /> : null,
  };

  const components: PageComponent[] = teamPageData?.components || [
    { key: 'BreadcrumbSection', component: 'Breadcrumb' },
    { key: 'TeamSection', component: 'Team' },
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
