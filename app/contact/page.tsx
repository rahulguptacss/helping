import React from 'react';
import type { Metadata } from 'next';
import Header from '../../components/sections/Header';
import Footer from '../../components/sections/Footer';
import Breadcrumb from '../../components/sections/Breadcrumb';
import Contact from '../../components/sections/Contact';
import BackToTop from '../../components/ui/BackToTop';
import { common, pages, sections, type PageComponent } from '@/components/types';

export const metadata: Metadata = {
  title: pages.contact?.metadata?.title || 'Contact Us | Helping Hands',
  description:
    pages.contact?.metadata?.description ||
    'Get in touch with Helping Hands NGO. Whether you have a question, want to support our cause, or are interested in volunteering, our team is here to help.',
};

export default function ContactPage() {
  const contactPageData = pages.contact;

  const sectionMap: Record<string, React.ReactNode> = {
    Breadcrumb: <Breadcrumb data={contactPageData?.breadcrumb || sections.breadcrumb} />,
    BreadcrumbSection: <Breadcrumb data={contactPageData?.breadcrumb || sections.breadcrumb} />,
    Contact: sections.contact ? <Contact data={sections.contact} /> : null,
    ContactSection: sections.contact ? <Contact data={sections.contact} /> : null,
  };

  const components: PageComponent[] = contactPageData?.components || [
    { key: 'BreadcrumbSection', component: 'Breadcrumb' },
    { key: 'ContactSection', component: 'Contact' },
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
