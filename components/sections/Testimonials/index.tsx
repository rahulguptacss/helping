'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { TestimonialsSectionData } from '@/components/types';

interface TestimonialsProps {
  data: TestimonialsSectionData;
}

export default function Testimonials({ data }: TestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const items = data.items;

  // Auto-slide every 5 seconds (pauses on user hover)
  useEffect(() => {
    if (isPaused || items.length <= 1) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused, items.length]);

  const current = items[activeIndex];

  return (
    <section id="testimonials" className="relative w-full overflow-hidden bg-[#fbfaf6] pt-4 sm:pt-6 lg:pt-8 pb-4 sm:pb-6 lg:pb-8">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-8 lg:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10 sm:gap-12 lg:gap-14 xl:gap-20">
          
          {/* Left Column: Photo of Teacher Reading to Children (Matching Screenshot) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 flex justify-center lg:justify-start"
          >
            <div className="relative w-full max-w-[480px] lg:max-w-none aspect-[421/465] overflow-hidden rounded-none shadow-[0_10px_35px_rgba(0,0,0,0.06)] group">
              <motion.img
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                src={data.image}
                alt={data.image_alt}
                className="h-full w-full object-cover object-center rounded-none"
              />
            </div>
          </motion.div>

          {/* Right Column: Large Quote Mark, Heart Sketch, Content & Slider Dots */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            {/* Top Row: Giant Quote Symbol (Left) + Hand-Drawn Heart Outline (Right) */}
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              {/* Giant Sage Green Double Quote Symbol (Matching Screenshot) */}
              <div className="text-[#8ba79b]">
                <svg className="w-12 h-10 fill-current" viewBox="0 0 32 24" fill="none">
                  <path d="M0 13.714C0 6.137 4.571 1.143 12 0l2.286 4C8.571 5.143 6.857 8 6.857 11.429H13.714V24H0V13.714zm18.286 0C18.286 6.137 22.857 1.143 30.286 0l2.286 4c-5.714 1.143-7.429 4-7.429 7.429H32V24H18.286V13.714z" />
                </svg>
              </div>

              {/* Hand-Drawn Heart with Rays (Matching Screenshot) */}
              <div className="text-[#b8cdc0] pr-2 sm:pr-4">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M26 22 C22 14, 12 16, 12 26 C12 37, 25 46, 27 48 C29 46, 42 37, 42 26 C42 16, 32 14, 28 22 Z" />
                  <line x1="44" y1="16" x2="51" y2="14" strokeWidth="2" />
                  <line x1="46" y1="22" x2="53" y2="22" strokeWidth="2" />
                  <line x1="45" y1="28" x2="51" y2="31" strokeWidth="2" />
                </svg>
              </div>
            </div>

            {/* Testimonial Quote & Author Animated Content */}
            <div className="min-h-[190px] sm:min-h-[200px] flex flex-col justify-start">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id || activeIndex}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Quote Text */}
                  <p className="font-sans text-[17px] sm:text-[18.5px] lg:text-[20px] font-normal leading-[1.68] text-[#2b3530] tracking-[-0.01em]">
                    {current.quote}
                  </p>

                  {/* Horizontal Green Accent Line */}
                  <div className="w-14 h-[2px] bg-[#1a5d3a] my-4 sm:my-5" />

                  {/* Author Name: Serif, Dark Green */}
                  <h4 className="font-serif text-[22px] sm:text-[24px] font-bold text-[#113824] tracking-tight">
                    {current.author}
                  </h4>

                  {/* Author Role: Sans-Serif, Muted Gray */}
                  <p className="font-sans text-[13.5px] sm:text-[14.5px] font-normal text-[#55635b] mt-0.5">
                    {current.role}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slider Indicator Dots (Matching Screenshot: Active Dark Green, Inactive Pale Green/Gray) */}
            <div className="flex items-center gap-2.5 mt-6 sm:mt-8">
              {items.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`transition-all duration-300 rounded-full focus:outline-none ${
                    activeIndex === idx
                      ? 'w-3 h-3 bg-[#0a4d2e]'
                      : 'w-2.5 h-2.5 bg-[#cbd5cf] hover:bg-[#9cb4a9]'
                  }`}
                />
              ))}
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
