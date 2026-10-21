import React from 'react';
import type { Metadata } from 'next';
import Header from '../../components/sections/Header';
import Footer from '../../components/sections/Footer';
import Breadcrumb from '../../components/sections/Breadcrumb';
import FAQ from '../../components/sections/FAQ';
import BackToTop from '../../components/ui/BackToTop';
import { common, pages, sections, type PageComponent } from '@/components/types';

export const metadata: Metadata = {
  title: pages.faq?.metadata?.title || 'FAQs | Helping Hands - Frequently Asked Questions',
  description:
    pages.faq?.metadata?.description ||
    'Find answers to the most common questions about our work, donations, volunteering opportunities, and how you can make a difference with Helping Hands.',
};

export default function FAQPage() {
  const faqPageData = pages.faq;

  const sectionMap: Record<string, React.ReactNode> = {
    Breadcrumb: <Breadcrumb data={faqPageData?.breadcrumb || sections.breadcrumb} />,
    BreadcrumbSection: <Breadcrumb data={faqPageData?.breadcrumb || sections.breadcrumb} />,
    FAQ: sections.faq ? <FAQ data={sections.faq} /> : null,
    Faq: sections.faq ? <FAQ data={sections.faq} /> : null,
    FaqSection: sections.faq ? <FAQ data={sections.faq} /> : null,
  };

  const components: PageComponent[] = faqPageData?.components || [
    { key: 'BreadcrumbSection', component: 'Breadcrumb' },
    { key: 'FaqSection', component: 'FAQ' },
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
