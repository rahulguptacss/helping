import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '../../../components/sections/Header';
import Footer from '../../../components/sections/Footer';
import Breadcrumb from '../../../components/sections/Breadcrumb';
import BlogDetail from '../../../components/sections/BlogDetail';
import BackToTop from '../../../components/ui/BackToTop';
import { common, getBlogBySlug, getAllBlogSlugs, sections } from '@/components/types';

interface PageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolved = await params;
  const blog = getBlogBySlug(resolved.slug);
  if (!blog) {
    return {
      title: 'Blog Details | Helping Hands',
      description: 'Stories of impact and community support by Helping Hands NGO.',
    };
  }
  return {
    title: `${blog.title} | Helping Hands`,
    description: blog.lead || blog.paragraphs?.[0] || 'Helping Hands blog article.',
  };
}

export default async function BlogSlugPage({ params }: PageProps) {
  const resolved = await params;
  const blog = getBlogBySlug(resolved.slug);

  if (!blog) {
    notFound();
  }

  // Breadcrumb matching Screenshot 2: "Blog Details", "Home / Blog Details"
  const breadcrumbData = {
    title: 'Blog Details',
    breadcrumb: 'Home / Blog Details',
    path: 'Home / Blog Details',
    image: '/img/banner.webp',
    bottom_shape: '/img/banner-bottom.webp',
  };

  return (
    <main className="flex min-h-screen flex-col bg-white">
      {/* 1. Header Navigation */}
      <Header data={common.Header} />

      {/* 2. Breadcrumb Banner */}
      <Breadcrumb data={breadcrumbData} />

      {/* 3. Dynamic Blog Detail Section */}
      <BlogDetail data={blog} recentPosts={sections.blogs?.recent_posts} />

      {/* 4. Footer */}
      <Footer data={common.Footer} />

      {/* 5. Back to Top Button */}
      <BackToTop />
    </main>
  );
}
