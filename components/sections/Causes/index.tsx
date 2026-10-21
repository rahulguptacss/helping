'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import type { CausesSectionData, CauseItem } from '../../types';

interface CausesProps {
  data: CausesSectionData;
}

function CauseCard({ item }: { item: CauseItem }) {
  return (
    <div className="group flex flex-row items-start gap-4 sm:gap-5">
      {/* Square Rounded Image Thumbnail (Matching Screenshot) */}
      <div className="relative h-[110px] w-[110px] sm:h-[120px] sm:w-[120px] xl:h-[130px] xl:w-[130px] shrink-0 overflow-hidden rounded-[14px] bg-[#e8e4db] shadow-sm">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>

      {/* Content Details */}
      <div className="flex-1 min-w-0 flex flex-col justify-start">
        {/* Top Green Accent Line (Matching Screenshot) */}
        <div className="h-[2px] w-full bg-[#1b5e39] mb-2 sm:mb-2.5" />

        {/* Title: Serif Font in Forest Green */}
        <h3 className="font-serif text-[21px] sm:text-[23px] lg:text-[25px] font-normal tracking-tight text-[#113824] leading-snug">
          {item.title}
        </h3>

        {/* Tagline / Subtitle */}
        {item.tagline && (
          <p className="mt-0.5 text-[13px] sm:text-[13.5px] font-normal text-[#55635b]">
            {item.tagline}
          </p>
        )}

        {/* Description: Light Muted Gray */}
        <p className="mt-2 text-[12px] sm:text-[12.5px] lg:text-[13px] leading-[1.55] text-[#6b7280]">
          {item.description}
        </p>
      </div>
    </div>
  );
}

export default function Causes({ data }: CausesProps) {
  return (
    <section id="causes" className="relative w-full overflow-hidden bg-[#fbfaf6] pt-12 sm:pt-16 lg:pt-20 pb-4 sm:pb-6 lg:pb-8">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-8 lg:px-12">
        
        {/* 3-Column Asymmetric Grid Layout (Matching Screenshot) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-y-12 sm:gap-y-14 lg:gap-y-16 gap-x-8 xl:gap-x-12 items-start">
          
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
                href={data.button?.href || '#causes'}
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
              <CauseCard item={data.items[0]} />
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
              <CauseCard item={data.items[1]} />
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
              <CauseCard item={data.items[2]} />
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
              <CauseCard item={data.items[3]} />
            </motion.div>
          )}

        </div>

      </div>
    </section>
  );
}
