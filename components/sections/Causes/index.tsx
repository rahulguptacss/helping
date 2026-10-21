'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { CausesSectionData, CauseItem } from '@/components/types';

interface CausesProps {
  data: CausesSectionData;
  isPage?: boolean;
}

// Reusable Cause Card (Matching Homepage & Screenshot)
function CauseCard({ item, showButton = true }: { item: CauseItem; showButton?: boolean }) {
  return (
    <div className="group flex flex-row items-stretch gap-3.5 sm:gap-4.5 lg:gap-5">
      {/* Square Rounded Image Thumbnail - Height matches the button */}
      <div className="relative w-[120px] xs:w-[130px] sm:w-[145px] lg:w-[155px] shrink-0 self-stretch min-h-[155px] sm:min-h-[170px] overflow-hidden rounded-[16px] sm:rounded-[20px] bg-[#e8e4db] shadow-xs">
        <img
          src={item.image}
          alt={item.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>

      {/* Content Details */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          {/* Top Green Accent Line */}
          <div className="h-[2px] w-full bg-[#1b5e39] mb-1.5" />

          {/* Title: Serif Font in Forest Green */}
          <h3 className="font-serif text-[21px] sm:text-[23px] lg:text-[25px] font-normal tracking-tight text-[#113824] leading-tight">
            {item.title}
          </h3>

          {/* Tagline / Subtitle */}
          {item.tagline && (
            <p className="mt-0.5 text-[12.5px] sm:text-[13px] font-normal text-[#55635b]">
              {item.tagline}
            </p>
          )}

          {/* Description */}
          <p className="mt-1.5 text-[12px] sm:text-[12.5px] leading-[1.5] text-[#55635b]">
            {item.description}
          </p>
        </div>

        {/* Read More Button (Screenshot Match) */}
        {showButton && (
          <div className="mt-2.5 sm:mt-3">
            <Link
              href={item.href || '/contact'}
              className="group/btn inline-flex items-center gap-1.5 rounded-[7px] bg-[#0a4d2e] hover:bg-[#073b22] text-white px-4 py-1.5 sm:px-4.5 sm:py-2 text-[12.5px] sm:text-[13px] font-medium shadow-xs transition-all duration-200"
            >
              <span>Read More</span>
              <ArrowRight className="w-3.5 h-3.5 ml-0.5 stroke-[2] transition-transform duration-200 group-hover/btn:translate-x-0.5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Causes({ data, isPage = false }: CausesProps) {
  // Category state for Causes Page
  const categories = data?.categories || [
    'All Causes',
    'Education',
    'Advocacy',
    'Environment',
    'Action',
    'Food & Nutrition',
    'Women Empowerment',
  ];
  const [activeCategory, setActiveCategory] = useState('All Causes');

  // Filter items for Causes Page
  const allItems = data?.items || [];
  const filteredItems =
    activeCategory === 'All Causes'
      ? allItems
      : allItems.filter(
          (item) => item.category?.toLowerCase() === activeCategory.toLowerCase()
        );

  // =========================================================================
  // CAUSES PAGE VIEW (Full design matching user's screenshot)
  // =========================================================================
  if (isPage) {
    const heading = data?.page_heading || {
      eyebrow: data?.eyebrow || 'OUR CAUSES',
      title_prefix: 'Support Our ',
      title_highlight: 'Causes',
      description:
        'Your support helps us bring positive change to the lives of underprivileged communities and create a brighter, healthier and stronger tomorrow.',
    };

    return (
      <section id="causes-page" className="relative w-full overflow-hidden bg-[#faf8f4] pt-4 sm:pt-6 md:pt-8 pb-8 sm:pb-10 md:pb-12">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
          
          {/* ========================================================
              1. Centered Heading Section (Exact Screenshot Match)
              ======================================================== */}
          <div className="flex flex-col items-center text-center">
            {/* Eyebrow: — OUR CAUSES — with green lines */}
            <div className="flex items-center justify-center gap-2.5 sm:gap-3">
              <span className="w-8 sm:w-11 h-[1.5px] bg-[#1a5d3a]" />
              <span className="text-[11px] sm:text-[12px] font-bold tracking-[0.18em] uppercase text-[#1a5d3a]">
                {heading.eyebrow || 'OUR CAUSES'}
              </span>
              <span className="w-8 sm:w-11 h-[1.5px] bg-[#1a5d3a]" />
            </div>

            {/* Title: Support Our Causes */}
            <h2 className="mt-1.5 font-serif text-[28px] sm:text-[34px] md:text-[40px] font-bold text-[#113824] tracking-tight leading-tight">
              <span>{heading.title_prefix || 'Support Our '}</span>
              <span className="text-[#2a8342]">{heading.title_highlight || 'Causes'}</span>
            </h2>

            {/* Subtitle / Description */}
            <p className="mt-1.5 text-[12.5px] sm:text-[13.5px] leading-relaxed text-[#55635b] max-w-[620px] mx-auto">
              {heading.description}
            </p>
          </div>

          {/* ========================================================
              2. Category Filter Pills
              ======================================================== */}
          <div className="mt-4 sm:mt-5 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 sm:px-4.5 py-1.5 sm:py-2 rounded-full text-[12px] sm:text-[12.5px] font-medium transition-all duration-200 cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#1a5d3a] text-white shadow-sm'
                    : 'bg-white border border-[#d8e2d9] text-[#4b5563] hover:border-[#1a5d3a] hover:text-[#1a5d3a]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* ========================================================
              3. 2-Column Causes Grid (Homepage Card with Read More Button)
              ======================================================== */}
          <div className="mt-5 sm:mt-6 md:mt-7 grid grid-cols-1 md:grid-cols-2 gap-x-6 lg:gap-x-10 xl:gap-x-14 gap-y-5 sm:gap-y-7 items-start">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                >
                  <CauseCard item={item} showButton={true} />
                </motion.div>
              ))}
            </AnimatePresence>
            {filteredItems.length === 0 && (
              <div className="col-span-full py-12 text-center text-[#55635b]">
                <p className="text-[14px]">No causes found in this category.</p>
              </div>
            )}
          </div>

        </div>
      </section>
    );
  }

  // =========================================================================
  // HOMEPAGE VIEW (Original Asymmetric 3-Column Layout with Read More Buttons)
  // =========================================================================
  return (
    <section id="causes" className="relative w-full overflow-hidden bg-[#fbfaf6] pt-8 sm:pt-10 lg:pt-14 pb-4 sm:pb-6 lg:pb-8">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-8 lg:px-12">
        
        {/* 3-Column Asymmetric Grid Layout (Matching Screenshot) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-y-7 sm:gap-y-8 lg:gap-y-9 gap-x-6 xl:gap-x-10 items-start">
          
          {/* Row 1, Column 1: Header Block */}
          <div className="col-span-1 md:col-span-2 lg:col-span-4 flex flex-col justify-start">
            {/* Eyebrow: OUR CAUSES + Horizontal Green Line */}
            <div className="flex items-center gap-3">
              <span className="text-[12.5px] sm:text-[13px] font-bold tracking-[0.14em] uppercase text-[#1a5d3a]">
                {data.eyebrow || 'OUR CAUSES'}
              </span>
              <span className="w-8 sm:w-10 h-[2px] bg-[#1a5d3a]" />
            </div>

            {/* Serif Title: Our Causes */}
            <h2 className="mt-3 sm:mt-4 text-[42px] sm:text-[50px] lg:text-[56px] xl:text-[62px] font-serif font-normal tracking-tight text-[#113824] leading-[1.05]">
              {data.title || 'Our Causes'}
            </h2>

            {/* Button: View All Causes → */}
            <div className="mt-6 sm:mt-8">
              <Link
                href={data.button?.href || '/causes'}
                className="group inline-flex items-center gap-2.5 rounded-full bg-[#0a4d2e] px-6 py-2.5 sm:px-7 sm:py-3 text-[13.5px] sm:text-[14px] font-medium text-white shadow-sm transition-all duration-300 hover:bg-[#073b22] hover:shadow-md hover:scale-[1.02] active:scale-98"
              >
                <span>{data.button?.text || 'View All Causes'}</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Row 1, Column 2: Cause 1 - Education */}
          {data.items[0] && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="col-span-1 lg:col-span-4"
            >
              <CauseCard item={data.items[0]} showButton={true} />
            </motion.div>
          )}

          {/* Row 1, Column 3: Cause 2 - Advocacy */}
          {data.items[1] && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="col-span-1 lg:col-span-4"
            >
              <CauseCard item={data.items[1]} showButton={true} />
            </motion.div>
          )}

          {/* Row 2, Column 1: Blank Spacer on Desktop (under header) */}
          <div className="hidden lg:block lg:col-span-4" aria-hidden="true" />

          {/* Row 2, Column 2: Cause 3 - Environment */}
          {data.items[2] && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="col-span-1 lg:col-span-4"
            >
              <CauseCard item={data.items[2]} showButton={true} />
            </motion.div>
          )}

          {/* Row 2, Column 3: Cause 4 - Action */}
          {data.items[3] && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="col-span-1 lg:col-span-4"
            >
              <CauseCard item={data.items[3]} showButton={true} />
            </motion.div>
          )}

        </div>

      </div>
    </section>
  );
}
