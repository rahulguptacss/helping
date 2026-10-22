'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { BreadcrumbData } from '@/components/types';

interface BreadcrumbProps {
  data: BreadcrumbData;
}

export default function Breadcrumb({ data }: BreadcrumbProps) {
  const { title, path, image, bottom_shape: bottomShape } = data;

  // Parse path string (e.g. "Home / About Us" or "Home / Our Causes") into breadcrumb links
  const parts = path.split('/').map((s) => s.trim()).filter(Boolean);

  return (
    <section className="relative w-full overflow-hidden bg-[#111827] h-[280px] sm:h-[340px] md:h-[400px] lg:h-[430px] flex items-center justify-center select-none">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover object-center scale-105"
        />
        {/* Dark Vignette Overlay for Crisp Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/75" />
      </div>

      {/* Centered Content: Title & Breadcrumbs */}
      <div className="relative z-10 mx-auto max-w-[1200px] px-4 text-center pt-8 sm:pt-10">
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-[36px] xs:text-[42px] sm:text-[50px] md:text-[58px] font-bold text-white tracking-tight"
        >
          {title}
        </motion.h1>

        {/* Breadcrumb Links */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-2 flex items-center justify-center gap-2 text-[13px] sm:text-[14.5px] font-medium text-white/80"
        >
          {parts.map((part, idx) => {
            const isLast = idx === parts.length - 1;
            const isHome = part.toLowerCase() === 'home';
            const href = isHome ? '/' : undefined;

            return (
              <span key={idx} className="inline-flex items-center gap-2">
                {idx > 0 && <span className="text-white/50">/</span>}
                {href && !isLast ? (
                  <Link href={href} className="hover:text-white transition-colors">
                    {part}
                  </Link>
                ) : (
                  <span className={isLast ? 'text-white' : 'hover:text-white transition-colors'}>
                    {part}
                  </span>
                )}
              </span>
            );
          })}
        </motion.div>
      </div>

      {/* Torn Paper Jagged Edge at the Bottom (Matching Screenshot) */}
      <div className="absolute -bottom-[1px] left-0 right-0 z-20 w-full overflow-hidden leading-none pointer-events-none">
        <img
          src={bottomShape}
          alt=""
          aria-hidden="true"
          className="w-full h-8 sm:h-12 md:h-16 lg:h-20 object-fill object-bottom select-none"
        />
      </div>
    </section>
  );
}
