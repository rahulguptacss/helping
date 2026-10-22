import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '../../../components/sections/Header';
import Footer from '../../../components/sections/Footer';
import Breadcrumb from '../../../components/sections/Breadcrumb';
import BlogDetail from '../../../components/sections/BlogDetail';
import BackToTop from '../../../components/ui/BackToTop';
import {
  applyTitleTemplate,
  common,
  getAllBlogSlugs,
  getBlogBySlug,
  pages,
  sections,
  type PageComponent,
} from '@/components/types';

const pageData = pages.blog_detail;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);
  if (!blog) {
    return {
      title: pageData.metadata.title,
      description: pageData.metadata.description,
    };
  }
  return {
    title: applyTitleTemplate(pageData.metadata.title_template, blog.title),
    description: blog.lead || blog.paragraphs[0] || pageData.metadata.description,
  };
}

export default async function BlogSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  // Unknown slug -> real 404 (previously silently showed the first blog)
  if (!blog) {
    notFound();
  }

  // Keyed by the `component` name used in data.json -> pages.blog_detail.components
  const sectionMap: Record<string, React.ReactNode> = {
    Breadcrumb: <Breadcrumb data={pageData.breadcrumb} />,
    BlogDetail: (
      <BlogDetail
        data={blog}
        labels={sections.blogs.detail}
        recentPostsHeading={sections.blogs.recent_posts_heading}
        recentPosts={sections.blogs.recent_posts}
      />
    ),
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
