import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '../../../components/sections/Header';
import Footer from '../../../components/sections/Footer';
import Breadcrumb from '../../../components/sections/Breadcrumb';
import CauseDetails from '../../../components/sections/CauseDetails';
import BackToTop from '../../../components/ui/BackToTop';
import {
  applyTitleTemplate,
  common,
  getAllCauseSlugs,
  getCauseBySlug,
  pages,
  type BreadcrumbData,
  type PageComponent,
} from '@/components/types';

const pageData = pages.causes_details;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllCauseSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cause = getCauseBySlug(slug);
  if (!cause) {
    return {
      title: pageData.metadata.title,
      description: pageData.metadata.description,
    };
  }
  return {
    title: applyTitleTemplate(pageData.metadata.title_template, cause.title),
    description: cause.description,
  };
}

export default async function CauseSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const cause = getCauseBySlug(slug);

  // Unknown slug -> real 404 (previously silently showed the first cause)
  if (!cause) {
    notFound();
  }

  // Base banner (image, shape, prefix) from data.json; title is the cause badge
  const breadcrumbData: BreadcrumbData = {
    ...pageData.breadcrumb,
    title: cause.badge,
    path: pageData.breadcrumb.path_prefix
      ? `${pageData.breadcrumb.path_prefix} / ${cause.badge}`
      : pageData.breadcrumb.path,
  };

  // Keyed by the `component` name used in data.json -> pages.causes_details.components
  const sectionMap: Record<string, React.ReactNode> = {
    Breadcrumb: <Breadcrumb data={breadcrumbData} />,
    CauseDetails: <CauseDetails data={cause} />,
  };

  return (
    <main className="flex min-h-screen flex-col bg-white">
      {/* 1. Header Navigation */}
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
