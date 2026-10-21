import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '../../../components/sections/Header';
import Footer from '../../../components/sections/Footer';
import Breadcrumb from '../../../components/sections/Breadcrumb';
import CauseDetails from '../../../components/sections/CauseDetails';
import BackToTop from '../../../components/ui/BackToTop';
import { common, getCauseBySlug, getAllCauseSlugs } from '@/components/types';

interface PageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

export async function generateStaticParams() {
  const slugs = getAllCauseSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolved = await params;
  const cause = getCauseBySlug(resolved.slug);
  if (!cause) {
    return {
      title: 'Cause Details | Helping Hands',
      description: 'Learn about our causes, mission, and how we empower communities.',
    };
  }
  return {
    title: `${cause.title} | Helping Hands`,
    description: cause.description,
  };
}

export default async function CauseSlugPage({ params }: PageProps) {
  const resolved = await params;
  const cause = getCauseBySlug(resolved.slug);

  if (!cause) {
    notFound();
  }

  const breadcrumbData = {
    title: cause.badge || cause.title || 'Cause Details',
    breadcrumb: `Home / Causes / ${cause.badge || cause.title}`,
    path: `Home / Causes / ${cause.badge || cause.title}`,
  };

  return (
    <main className="flex min-h-screen flex-col bg-white">
      {/* 1. Header Navigation */}
      <Header data={common.Header} />

      {/* 2. Breadcrumb Banner with Jagged Bottom Shape */}
      <Breadcrumb data={breadcrumbData} />

      {/* 3. Dynamic Cause Details Section (Overview, About, Stats, Approach) */}
      <CauseDetails data={cause} />

      {/* 4. Footer */}
      <Footer data={common.Footer} />

      {/* 5. Back to Top Button */}
      <BackToTop />
    </main>
  );
}
