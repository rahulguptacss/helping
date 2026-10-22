'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import type { HeroSectionData } from '@/components/types';

interface HeroProps {
  data: HeroSectionData;
}

export default function Hero({ data }: HeroProps) {
  return (
    <section className="relative w-full overflow-hidden bg-[#017949] pt-[60px] sm:pt-[72px] md:pt-[80px]">
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px] sm:min-h-[600px] lg:min-h-[680px]">
          
          {/* Left Column: Deep Green Background, Subtle Hands Watermark, Headline & Button */}
          <div className="relative flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-14 md:px-14 lg:col-span-7 lg:py-16 xl:px-20 z-10 overflow-hidden">
            
            {/* Subtle Holding Hands Watermark Texture (Matching Screenshot) */}
            {data.bg_watermark && (
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <img
                  src={data.bg_watermark}
                  alt=""
                  aria-hidden="true"
                  className="h-full w-full object-cover object-center opacity-65 scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#017949]/50 via-[#017949]/30 to-[#017949]/60" />
              </div>
            )}

            {/* Content Container */}
            <div className="relative z-10 max-w-[580px]">
              {/* Main Headline (Matching Screenshot: Condensed, Bold, Title Case) */}
              <motion.h1
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="font-condensed text-[44px] xs:text-[52px] sm:text-[66px] md:text-[76px] lg:text-[82px] xl:text-[92px] font-extrabold tracking-tight leading-[0.96] text-white"
              >
                <span className="block">{data.title_line1}</span>
                <span className="block">{data.title_line2}</span>
                <span className="block">{data.title_line3}</span>
              </motion.h1>

              {/* CTA Button: White Clean Rectangle with Green Heart (Matching Screenshot) */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="mt-7 sm:mt-9 lg:mt-10"
              >
                <Link
                  href={data.button.href}
                  className="group inline-flex items-center gap-2.5 rounded-[3px] bg-white px-6 py-2.5 sm:px-7 sm:py-3 text-[14px] sm:text-[15px] font-extrabold text-[#006837] shadow-md transition-all duration-300 hover:bg-white/95 hover:shadow-lg hover:scale-[1.02] active:scale-95"
                >
                  <Heart className="h-4 w-4 sm:h-4.5 sm:w-4.5 fill-[#006837] text-[#006837] transition-transform duration-300 group-hover:scale-115" />
                  <span>{data.button.text}</span>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Hero Photo of Smiling Children (/hero/hero.webp) */}
          <div className="relative w-full aspect-[4/5] sm:aspect-[4/5] lg:aspect-auto lg:h-full lg:col-span-5 overflow-hidden flex items-center justify-center bg-[#017949]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.65, ease: 'easeOut' }}
              className="h-full w-full"
            >
              <img
                src={data.image}
                alt={data.image_alt}
                className="h-full w-full object-cover object-center"
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
