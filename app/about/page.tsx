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

export const metadata: Metadata = {
  title: pages.about?.metadata?.title || 'About Us | Helping Hands',
  description: pages.about?.metadata?.description || 'Driven to connect to, integrate and transform communities. Learn more about our story, mission, and movement.',
};

export default function AboutPage() {
  const aboutPageData = pages.about;

  const storyData = aboutPageData?.story || sections.our_story;
  const galleryData =
    storyData?.gallery ||
    aboutPageData?.gallery ||
    (Array.isArray(sections.about_gallery) ? sections.about_gallery : sections.about_gallery?.items);

  const sectionMap: Record<string, React.ReactNode> = {
    Breadcrumb: <Breadcrumb data={aboutPageData?.breadcrumb || sections.breadcrumb} />,
    BreadcrumbSection: <Breadcrumb data={aboutPageData?.breadcrumb || sections.breadcrumb} />,
    About: <About data={sections.about} />,
    AboutSection: <About data={sections.about} />,
    Stats: <Stats data={sections.stats} />,
    StatsSection: <Stats data={sections.stats} />,
    OurStory: storyData ? <OurStory data={storyData} gallery={galleryData} /> : null,
    OurStorySection: storyData ? <OurStory data={storyData} gallery={galleryData} /> : null,
    // AboutGallery is now integrated into OurStory; mapped to null to prevent accidental duplication
    AboutGallery: null,
    AboutGallerySection: null,
    Testimonials: <Testimonials data={sections.testimonials} />,
    TestimonialsSection: <Testimonials data={sections.testimonials} />,
  };

  const components: PageComponent[] = aboutPageData?.components || [
    { key: 'BreadcrumbSection', component: 'Breadcrumb' },
    { key: 'AboutSection', component: 'About' },
    { key: 'StatsSection', component: 'Stats' },
    { key: 'OurStorySection', component: 'OurStory' },
    { key: 'TestimonialsSection', component: 'Testimonials' },
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
