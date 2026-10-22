'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { Calendar, MessageSquare, ArrowRight, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { BlogsSectionData, BlogItem, RecentPostItem } from '@/components/types';

interface BlogsProps {
  data: BlogsSectionData;
}

export default function Blogs({ data }: BlogsProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const sectionRef = useRef<HTMLElement>(null);

  const items: BlogItem[] = data.items;
  const itemsPerPage = 3;
  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));

  // Recent posts sidebar list from data.json (max 5)
  const recentPosts: RecentPostItem[] = data.recent_posts.slice(0, 5);

  // Pagination calculation
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBlogs = items.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    setCurrentPage(page);
    // Smooth scroll to top of section
    if (sectionRef.current) {
      const topOffset = sectionRef.current.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="blog-section"
      className="relative w-full bg-[#f3f7f4] border-b border-[#e1e9e3] py-10 sm:py-14 lg:py-18"
    >
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* ========================================================
              1. Main Blog Cards Column (Left - 8 cols)
              ======================================================== */}
          <div className="lg:col-span-8 flex flex-col gap-6 sm:gap-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="flex flex-col gap-6 sm:gap-7"
              >
                {currentBlogs.map((blog, idx) => (
                  <motion.article
                    key={blog.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    className="group rounded-[22px] sm:rounded-[24px] bg-[#fffdfa] border border-[#e5ebe6] p-3 sm:p-4 lg:p-4.5 flex flex-col sm:flex-row gap-4 sm:gap-5 lg:gap-6 items-stretch shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_26px_rgba(17,56,36,0.07)] transition-all duration-300"
                  >
                    {/* Blog Image: Responsive width and aspect ratio */}
                    <div className="relative w-full sm:w-[280px] md:w-[320px] lg:w-[340px] shrink-0 aspect-[16/10] sm:aspect-auto sm:min-h-[220px] rounded-[18px] sm:rounded-[20px] overflow-hidden bg-[#e8e4db]">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-104"
                      />
                    </div>

                    {/* Content Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between py-2 sm:py-2.5 px-1 sm:px-0 pr-1 sm:pr-3">
                      <div>
                        {/* Meta: Calendar Date | Comment Bubble */}
                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[12px] sm:text-[12.5px] text-[#113824] font-medium">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-[#0d4a27] stroke-[2]" />
                            <span>{blog.date}</span>
                          </span>
                          <span className="text-[#9ca3af] mx-1">|</span>
                          <span className="flex items-center gap-1.5">
                            <MessageSquare className="w-3.5 h-3.5 text-[#0d4a27] stroke-[2]" />
                            <span>{blog.comments_count}</span>
                          </span>
                        </div>

                        {/* Blog Title: Large Serif Heading */}
                        <Link href={blog.href}>
                          <h2 className="font-serif text-[21px] sm:text-[24px] lg:text-[27px] font-bold text-[#113824] leading-[1.22] tracking-tight mt-2.5 sm:mt-3 group-hover:text-[#1a5d3a] transition-colors">
                            {blog.title}
                          </h2>
                        </Link>

                        {/* Excerpt Paragraph */}
                        <p className="mt-2 text-[12.5px] sm:text-[13px] leading-[1.6] text-[#55635b] line-clamp-3 sm:line-clamp-4">
                          {blog.excerpt}
                        </p>
                      </div>

                      {/* Read More Pill Button */}
                      <div className="mt-4 sm:mt-5 pt-1">
                        <Link
                          href={blog.href}
                          className="group/btn inline-flex items-center gap-2 rounded-full bg-[#0a4d2e] hover:bg-[#073921] active:scale-95 text-white px-5 sm:px-6 py-2.5 text-[12.5px] sm:text-[13px] font-medium shadow-xs transition-all self-start"
                        >
                          <span>{data.read_more_text}</span>
                          <ArrowRight className="w-4 h-4 stroke-[2.2] transition-transform duration-200 group-hover/btn:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* ========================================================
                Interactive Working Pagination Controls (Req #1)
                ======================================================== */}
            {totalPages > 1 && (
              <div className="mt-8 sm:mt-10 flex items-center justify-center gap-2.5">
                {/* Previous Button (if on page > 1) */}
                {currentPage > 1 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => handlePageChange(currentPage - 1)}
                    aria-label={data.pagination_labels.previous}
                    className="w-10 h-10 rounded-full border border-[#d6e2d9] bg-white text-[#4b5563] hover:border-[#0d4a27] hover:text-[#0d4a27] flex items-center justify-center text-[13.5px] transition-colors shadow-2xs"
                  >
                    <ChevronLeft className="w-4 h-4 stroke-[2.2]" />
                  </motion.button>
                )}

                {/* Numbered Page Buttons */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <motion.button
                    key={pageNum}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-10 h-10 rounded-full font-bold flex items-center justify-center text-[13.5px] transition-all ${
                      currentPage === pageNum
                        ? 'bg-[#0d4a27] text-white shadow-xs'
                        : 'border border-[#d6e2d9] bg-white text-[#4b5563] hover:border-[#0d4a27] hover:text-[#0d4a27] shadow-2xs'
                    }`}
                  >
                    {pageNum}
                  </motion.button>
                ))}

                {/* Next Button */}
                {currentPage < totalPages && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => handlePageChange(currentPage + 1)}
                    aria-label={data.pagination_labels.next}
                    className="w-10 h-10 rounded-full border border-[#d6e2d9] bg-white text-[#4b5563] hover:border-[#0d4a27] hover:text-[#0d4a27] flex items-center justify-center text-[13.5px] transition-colors shadow-2xs"
                  >
                    <ChevronRight className="w-4 h-4 stroke-[2.2]" />
                  </motion.button>
                )}
              </div>
            )}
          </div>

          {/* ========================================================
              2. Sidebar: Recent Posts Widget (Right - 4 cols, Sticky)
              ======================================================== */}
          <aside className="lg:col-span-4 w-full lg:sticky lg:top-28 self-start">
            <div className="rounded-[24px] bg-[#fffdfa] border border-[#e5ebe6] p-5 sm:p-6 lg:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
              
              {/* Widget Header with Left Green Accent Bar */}
              <div className="flex items-center gap-3 mb-2">
                <span className="w-[4.5px] h-[19px] bg-[#0d4a27] rounded-full shrink-0" />
                <h3 className="font-serif text-[20px] sm:text-[22px] font-bold text-[#113824] leading-none">
                  {data.recent_posts_heading}
                </h3>
              </div>

              {/* Recent Posts List with Horizontal Dividers */}
              <div className="flex flex-col divide-y divide-[#ece8df]">
                {recentPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={post.href}
                    className="flex items-center gap-3.5 sm:gap-4 py-4 sm:py-4.5 first:pt-3.5 last:pb-1 group/item"
                  >
                    {/* Thumbnail directly using blog image (Req #7) */}
                    <div className="relative w-[84px] h-[72px] sm:w-[90px] sm:h-[76px] rounded-[14px] overflow-hidden bg-[#e8e4db] shrink-0 shadow-xs">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover/item:scale-105"
                      />
                    </div>

                    {/* Post Title & Date */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-[14.5px] sm:text-[15.5px] font-bold text-[#113824] leading-[1.25] group-hover/item:text-[#1a5d3a] transition-colors line-clamp-3">
                        {post.title}
                      </h4>
                      <div className="flex items-center gap-1.5 text-[11.5px] sm:text-[12px] text-[#6b7280] font-medium mt-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#55635b] stroke-[2]" />
                        <span>{post.date}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

            </div>
          </aside>

        </div>
      </div>
    </section>
  );
}
