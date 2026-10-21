import React from 'react';
import type { Metadata } from 'next';
import Header from '../../components/sections/Header';
import Footer from '../../components/sections/Footer';
import Breadcrumb from '../../components/sections/Breadcrumb';
import Gallery from '../../components/sections/Gallery';
import BackToTop from '../../components/ui/BackToTop';
import { common, pages, sections, type PageComponent } from '@/components/types';

export const metadata: Metadata = {
  title: pages.gallery?.metadata?.title || 'Our Gallery | Helping Hands',
  description:
    pages.gallery?.metadata?.description ||
    'Explore our journey through images — from community support and volunteer efforts to the lives we have touched.',
};

export default function GalleryPage() {
  const galleryPageData = pages.gallery;

  const sectionMap: Record<string, React.ReactNode> = {
    Breadcrumb: <Breadcrumb data={galleryPageData?.breadcrumb || sections.breadcrumb} />,
    BreadcrumbSection: <Breadcrumb data={galleryPageData?.breadcrumb || sections.breadcrumb} />,
    Gallery: sections.gallery ? <Gallery data={sections.gallery} /> : null,
    GallerySection: sections.gallery ? <Gallery data={sections.gallery} /> : null,
  };

  const components: PageComponent[] = galleryPageData?.components || [
    { key: 'BreadcrumbSection', component: 'Breadcrumb' },
    { key: 'GallerySection', component: 'Gallery' },
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
