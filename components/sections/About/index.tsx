'use client';

import { motion } from 'framer-motion';
import { Megaphone, Send } from 'lucide-react';
import type { AboutSectionData } from '@/components/types';

interface AboutProps {
  data: AboutSectionData;
}

export default function About({ data }: AboutProps) {
  return (
    <section id="about" className="relative w-full overflow-hidden bg-[#f8f5f0] py-8 sm:py-10 lg:py-12">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 items-start gap-10 sm:gap-14 lg:gap-16 xl:gap-20">
          
          {/* Left Column: Children Photo (Desktop Left, Mobile Below Content) */}
          <motion.div
            initial={{ opacity: 0, x: -40, scale: 0.97 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 lg:order-1 lg:col-span-6 flex justify-center lg:justify-start"
          >
            <div className="relative w-full max-w-[500px] lg:max-w-none aspect-[1044/1506] overflow-hidden rounded-none group">
              <motion.img
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                src={data.image || '/img/about.webp'}
                alt={data.image_alt || 'Children smiling together'}
                className="h-full w-full object-cover object-center rounded-none"
              />
            </div>
          </motion.div>

          {/* Right Column: Eyebrow, Giant Condensed Headline, Floating Get Involved Badge (Desktop Right, Mobile Above Image) */}
          <div className="order-1 lg:order-2 lg:col-span-6 flex flex-col justify-start pt-2 lg:pt-[145px] xl:pt-[170px]">
            
            {/* Eyebrow: Blue Megaphone Circle + ABOUT US (Matching Screenshot) */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 self-start"
            >
              <span className="flex h-5 w-5 sm:h-5.5 sm:w-5.5 items-center justify-center rounded-full bg-[#3b82f6] text-white shadow-sm">
                <Megaphone className="h-3 w-3 -rotate-12 fill-white" />
              </span>
              <span className="text-[12px] sm:text-[13px] font-extrabold uppercase tracking-wider text-[#374151]">
                {data.badge || 'ABOUT US'}
              </span>
            </motion.div>

            {/* Headline Block with Floating Badge (Matching Screenshot) */}
            <div className="relative mt-5 sm:mt-6">
              
              {/* Floating Get Involved Avatar Badge (Matching Screenshot) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.75, y: 15 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.65, delay: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
                className="absolute -top-3 sm:-top-5 right-0 sm:right-2 md:right-4 lg:right-4 xl:right-8 z-20"
              >
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center cursor-pointer select-none"
                >
                  {/* Circular Avatar of Volunteers */}
                  <div className="relative z-10 h-13 w-13 sm:h-15 sm:w-15 md:h-16 md:w-16 rounded-full border-[3px] border-white shadow-lg overflow-hidden shrink-0 bg-[#e2e8f0]">
                    <img
                      src={data.join_badge.avatars || '/about/get-involved-avatar.webp'}
                      alt="Volunteers"
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  {/* Attached Get Involved Pill angled slightly */}
                  <div className="relative -ml-3.5 pl-5 pr-3.5 py-1.5 rounded-full bg-[#e8edf3] border border-white/90 shadow-md flex items-center gap-1.5 -rotate-3 hover:rotate-0 transition-transform">
                    <span className="text-[12px] sm:text-[13px] font-bold text-[#1e293b] whitespace-nowrap">
                      {data.join_badge.text || 'Get Involved'}
                    </span>
                    <Send className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#0284c7] -rotate-45 fill-[#0284c7]" />
                  </div>
                </motion.div>
              </motion.div>

              {/* Staggered Giant Condensed Headline (Matching Screenshot) */}
              <h2 className="font-condensed text-[34px] xs:text-[40px] sm:text-[50px] md:text-[58px] lg:text-[56px] xl:text-[68px] font-bold tracking-[-0.01em] leading-[0.95] text-[#141414]">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className="block whitespace-nowrap"
                >
                  {data.title_line1 || 'A MOVEMENT'}
                </motion.span>
                
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.55, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="block whitespace-nowrap"
                >
                  {data.title_line2 || 'LED BY VALUES,'}
                </motion.span>

                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.55, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  className="block whitespace-nowrap"
                >
                  {data.title_line3 || 'POWERED BY'}
                </motion.span>

                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.55, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
                  className="block whitespace-nowrap"
                >
                  {data.title_line4 || 'PEOPLE'}
                </motion.span>
              </h2>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
