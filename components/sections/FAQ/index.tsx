'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { FaqSectionData } from '@/components/types';

interface FAQProps {
  data: FaqSectionData;
}

export default function FAQ({ data }: FAQProps) {
  // First FAQ item from data.json is open by default
  const [openId, setOpenId] = useState<string | null>(data.items[0]?.id ?? null);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const items = data.items;

  return (
    <section id="faqs" className="relative w-full overflow-hidden bg-[#faf8f4] py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
        
        {/* Main 2-Column Grid (Left: Info & Illustration, Right: Accordion Items) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-start">
          
          {/* ========================================================
              Left Column: Eyebrow, Heading, Description & Illustration Image
              ======================================================== */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            <div>
              {/* Eyebrow: FAQ'S SECTION — */}
              <div className="flex items-center gap-2">
                <span className="text-[11.5px] sm:text-[12.5px] font-bold tracking-[0.16em] uppercase text-[#1a5d3a]">
                  {data.eyebrow}
                </span>
              </div>

              {/* Main Heading: Frequently Asked Questions */}
              <h2 className="mt-2 font-serif text-[30px] xs:text-[34px] sm:text-[40px] md:text-[44px] font-bold text-[#113824] tracking-tight leading-[1.16]">
                <span>{data.title_prefix}</span>
                <span className="text-[#2a8342]">{data.title_highlight}</span>
              </h2>

              {/* Subtitle Description */}
              {data.description && (
                <p className="mt-3 sm:mt-4 text-[13px] sm:text-[14px] leading-relaxed text-[#55635b] max-w-[440px]">
                  {data.description}
                </p>
              )}
            </div>

            {/* Illustration Image: /img/faq.webp */}
            <div className="mt-6 sm:mt-8 md:mt-10 relative flex justify-center lg:justify-start">
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="relative max-w-[380px] sm:max-w-[420px] w-full"
              >
                <img
                  src={data.image}
                  alt={data.image_alt}
                  className="w-full h-auto object-contain select-none drop-shadow-sm hover:scale-[1.02] transition-transform duration-500 ease-out"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* ========================================================
              Right Column: FAQ Accordion List (Exact Screenshot Match)
              ======================================================== */}
          <div className="lg:col-span-7 flex flex-col space-y-3 sm:space-y-3.5">
            {items.map((item, idx) => {
              const isOpen = openId === item.id;

              return (
                <motion.div
                  key={item.id || idx}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className={`overflow-hidden rounded-[14px] sm:rounded-[16px] border transition-all duration-300 ${
                    isOpen
                      ? 'bg-[#edf5ee] border-[#cce3cf] shadow-[0_4px_16px_rgba(26,93,58,0.06)]'
                      : 'bg-[#f8faf8] border-[#e2ede4] hover:border-[#c8decb] hover:bg-[#f1f7f2] shadow-[0_1px_4px_rgba(0,0,0,0.02)]'
                  }`}
                >
                  {/* Clickable Header Button */}
                  <button
                    type="button"
                    onClick={() => toggleItem(item.id)}
                    className="w-full flex items-center justify-between text-left px-4 py-3.5 sm:px-5 sm:py-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a5d3a]/40"
                    aria-expanded={isOpen}
                  >
                    {/* Left: Number (e.g. 01) */}
                    <span className="font-sans font-bold text-[14px] sm:text-[15.5px] text-[#2a8342] w-7 sm:w-8 shrink-0 select-none">
                      {item.number}
                    </span>

                    {/* Middle: Question Text */}
                    <span className="font-sans font-bold text-[14px] sm:text-[15.5px] text-[#113824] leading-snug flex-1 pr-3">
                      {item.question}
                    </span>

                    {/* Right: Expand/Collapse Icon */}
                    <div
                      className={`w-6.5 h-6.5 sm:w-7 sm:h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${
                        isOpen
                          ? 'bg-[#1a5d3a] text-white shadow-sm'
                          : 'border border-[#113824]/40 text-[#113824] hover:border-[#1a5d3a] hover:text-[#1a5d3a]'
                      }`}
                    >
                      {isOpen ? (
                        // Minus icon when expanded
                        <svg className="w-3.5 h-3.5 stroke-current stroke-[2.5]" viewBox="0 0 24 24" fill="none">
                          <line x1="5" y1="12" x2="19" y2="12" strokeLinecap="round" />
                        </svg>
                      ) : (
                        // Plus icon when collapsed
                        <svg className="w-3.5 h-3.5 stroke-current stroke-[2.2]" viewBox="0 0 24 24" fill="none">
                          <line x1="12" y1="5" x2="12" y2="19" strokeLinecap="round" />
                          <line x1="5" y1="12" x2="19" y2="12" strokeLinecap="round" />
                        </svg>
                      )}
                    </div>
                  </button>

                  {/* Expandable Answer Content */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.28, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden"
                      >
                        <div className="pl-11 sm:pl-13 pr-4 sm:pr-6 pb-4 pt-0.5 text-[12.5px] sm:text-[13px] leading-relaxed text-[#55635b]">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
