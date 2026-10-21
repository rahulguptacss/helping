import React from 'react';
import type { Metadata } from 'next';
import Header from '../../components/sections/Header';
import Footer from '../../components/sections/Footer';
import Breadcrumb from '../../components/sections/Breadcrumb';
import Blogs from '../../components/sections/Blogs';
import BackToTop from '../../components/ui/BackToTop';
import { common, pages, sections } from '@/components/types';

export const metadata: Metadata = {
  title: pages.blog?.metadata?.title || 'Our Blog | Helping Hands - Stories of Hope and Impact',
  description:
    pages.blog?.metadata?.description ||
    'Read the latest news, updates, community events, and inspirational stories from Helping Hands NGO.',
};

export default function BlogListingPage() {
  const blogPageData = pages.blog;
  const breadcrumbData = blogPageData?.breadcrumb || {
    title: 'Our Blog',
    path: 'Home / Our Blog',
    image: '/img/banner.webp',
    bottom_shape: '/img/banner-bottom.webp',
  };

  return (
    <main className="flex min-h-screen flex-col bg-white">
      {/* 1. Header Navigation */}
      <Header data={common.Header} />

      {/* 2. Breadcrumb Banner */}
      <Breadcrumb data={breadcrumbData} />

      {/* 3. Blogs Listing Section */}
      <Blogs data={sections.blogs} />

      {/* 4. Footer */}
      <Footer data={common.Footer} />

      {/* 5. Back to Top Button */}
      <BackToTop />
    </main>
  );
}
