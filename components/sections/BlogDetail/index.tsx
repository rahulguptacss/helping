'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import type { BlogDetailData, BlogDetailLabels, RecentPostItem } from '@/components/types';

interface BlogDetailProps {
  data: BlogDetailData;
  labels: BlogDetailLabels;
  recentPostsHeading: string;
  recentPosts: RecentPostItem[];
}

export default function BlogDetail({ data, labels, recentPostsHeading, recentPosts }: BlogDetailProps) {
  // Recent posts sidebar list from data.json (max 5)
  const sidebarPosts = recentPosts.slice(0, 5);

  return (
    <article className="relative w-full bg-[#f3f7f4] border-b border-[#e1e9e3] py-10 sm:py-14 lg:py-18">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* ========================================================
              1. Main Article Column (Left - 8 cols)
              ======================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-8 bg-[#fffdfa] rounded-[22px] sm:rounded-[24px] border border-[#e5ebe6] p-4.5 sm:p-7 md:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)]"
          >
            
            {/* Top Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative w-full aspect-[16/9] sm:aspect-[16/8] rounded-[18px] sm:rounded-[20px] overflow-hidden bg-[#e8e4db] shadow-xs"
            >
              <img
                src={data.hero_image}
                alt={data.title}
                className="h-full w-full object-cover"
              />
            </motion.div>

            {/* Category Pill Badge */}
            {(data.category || data.badge) && (
              <div className="mt-5">
                <span className="inline-block rounded-full bg-[#eef6f0] border border-[#d6e7dc] text-[#1a5d3a] px-3.5 py-0.5 text-[11px] sm:text-[11.5px] font-semibold tracking-wide">
                  {data.category || data.badge}
                </span>
              </div>
            )}

            {/* Author & Date Row */}
            <div className="flex flex-wrap items-center gap-2 text-[12px] sm:text-[12.5px] text-[#6b7280] font-medium mt-2.5">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#1a5d3a] stroke-[2.2]" />
                <span>{labels.author_prefix} {data.author}</span>
              </span>
              <span className="text-[#d1d5db]">|</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#6b7280] stroke-[2]" />
                <span>{data.date}</span>
              </span>
            </div>

            {/* Main Article Title */}
            <h1 className="font-serif text-[24px] sm:text-[32px] lg:text-[38px] font-bold text-[#113824] leading-tight tracking-tight mt-3 mb-4">
              {data.title}
            </h1>

            {/* Lead Introductory Paragraph */}
            {data.lead && (
              <p className="text-[14px] sm:text-[15px] font-medium text-[#2d3a33] leading-relaxed mb-4">
                {data.lead}
              </p>
            )}

            {/* Body Paragraphs */}
            {data.paragraphs && (
              <div className="flex flex-col gap-3.5 text-[13px] sm:text-[13.5px] leading-relaxed text-[#55635b]">
                {data.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            )}

            {/* "The Impact" Subheading & Text */}
            {data.impact_heading && (
              <div className="mt-7 pt-1">
                <h2 className="font-serif text-[21px] sm:text-[25px] font-bold text-[#113824] leading-snug mb-2.5">
                  {data.impact_heading}
                </h2>
                {data.impact_text && (
                  <p className="text-[13px] sm:text-[13.5px] leading-relaxed text-[#55635b]">
                    {data.impact_text}
                  </p>
                )}
              </div>
            )}

            {/* Pull Quote Box (Matching Screenshot) */}
            {data.quote && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="rounded-[16px] bg-[#edf5ef] p-5 sm:p-6 lg:p-7 mt-6 mb-6 flex flex-col gap-3"
              >
                {/* Quote Icon Circle */}
                <div className="w-9 h-9 rounded-full bg-[#113824] text-white flex items-center justify-center font-serif text-[22px] font-bold shrink-0 shadow-xs leading-none">
                  “
                </div>
                {/* Quote Text */}
                <p className="font-serif text-[15px] sm:text-[16.5px] font-bold text-[#113824] leading-snug italic">
                  {data.quote.text}
                </p>
                {/* Author attribution */}
                {data.quote.author && (
                  <p className="text-[11px] sm:text-[11.5px] font-bold tracking-wider uppercase text-[#1a5d3a]">
                    {data.quote.author}
                  </p>
                )}
              </motion.div>
            )}

            {/* Two Inset Images Side-by-Side (Matching Screenshot) */}
            {data.inset_images && data.inset_images.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                {data.inset_images.map((imgSrc, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="aspect-[4/3] rounded-[16px] overflow-hidden bg-[#e8e4db] shadow-xs group"
                  >
                    <img
                      src={imgSrc}
                      alt={labels.inset_image_alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-104"
                    />
                  </motion.div>
                ))}
              </div>
            )}

            {/* Closing Paragraph */}
            {data.closing_text && (
              <p className="text-[13px] sm:text-[13.5px] leading-relaxed text-[#55635b] mt-4">
                {data.closing_text}
              </p>
            )}

            {/* Back to Blog link */}
            <div className="mt-8 pt-5 border-t border-[#eef2ef]">
              <Link
                href={labels.back_link.href}
                className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#1a5d3a] hover:text-[#113824] transition-colors"
              >
                <ArrowLeft className="w-4 h-4 stroke-[2.2]" />
                <span>{labels.back_link.text}</span>
              </Link>
            </div>

          </motion.div>

          {/* ========================================================
              2. Sidebar: Recent Posts Widget (Right - 4 cols, Sticky)
              ======================================================== */}
          <aside className="lg:col-span-4 w-full lg:sticky lg:top-28 self-start">
            <div className="rounded-[24px] bg-[#fffdfa] border border-[#e5ebe6] p-5 sm:p-6 lg:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
              
              {/* Widget Header with Left Green Accent Bar */}
              <div className="flex items-center gap-3 mb-2">
                <span className="w-[4.5px] h-[19px] bg-[#0d4a27] rounded-full shrink-0" />
                <h3 className="font-serif text-[20px] sm:text-[22px] font-bold text-[#113824] leading-none">
                  {recentPostsHeading}
                </h3>
              </div>

              {/* Recent Posts List with Dividers Between Items */}
              <div className="flex flex-col divide-y divide-[#ece8df]">
                {sidebarPosts.map((post) => (
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
    </article>
  );
}
