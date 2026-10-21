'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import type { StatsSectionData, StatItem } from '../../types';

interface StatsProps {
  data: StatsSectionData;
}

function StatCounter({ value }: { value: string }) {
  // Extract numeric target and optional suffix (e.g., "10K" -> 10, "K"; "500+" -> 500, "+")
  const match = value.match(/^(\d+)(.*)$/);
  const targetNumber = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : '';

  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000; // 2 seconds smooth counting
    const startTime = performance.now();

    const frame = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Smooth ease-out cubic easing
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeOut * targetNumber);

      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        setCount(targetNumber);
      }
    };

    requestAnimationFrame(frame);
  }, [isInView, targetNumber]);

  return (
    <span ref={ref} className="inline-block tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export default function Stats({ data }: StatsProps) {
  return (
    <section id="stats" className="relative w-full overflow-hidden bg-[#eff4ec] pt-2 sm:pt-4 lg:pt-6 pb-4 sm:pb-6 lg:pb-8">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-8 lg:px-12">
        
        {/* ========================================================
            DESKTOP VIEW (md: and up) - 100% Untouched Original Layout
            ======================================================== */}
        <div className="hidden md:grid md:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 xl:gap-16">
          {data.items.map((stat, idx) => {
            const line1 = stat.line1 || stat.label.split(' ')[0];
            const line2 = stat.line2 || stat.label.split(' ').slice(1).join(' ');

            return (
              <motion.div
                key={`desktop-${stat.id}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex flex-col justify-between items-start"
              >
                {/* Giant Numerals with Counter Animation (Matching Screenshot) */}
                <div className="font-condensed font-black text-[#005a30] text-[80px] lg:text-[98px] xl:text-[116px] leading-[0.88] tracking-[-0.03em] select-none">
                  <StatCounter value={stat.value} />
                </div>

                {/* Green Accent Line + 2-Line Label (Aligned to Bottom-Right) */}
                <div className="flex flex-col items-start self-end mt-3 sm:mt-4">
                  {/* Horizontal Green Accent Line spanning width of label */}
                  <div className="h-[2px] w-full bg-[#005a30] mb-1.5 sm:mb-2" />

                  {/* 2-Line Condensed Label */}
                  <div className="font-condensed font-bold text-[#005a30] text-[14.5px] sm:text-[16px] lg:text-[18px] leading-[1.15]">
                    <span className="block whitespace-nowrap">{line1}</span>
                    <span className="block whitespace-nowrap">{line2}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ========================================================
            MOBILE VIEW (< md) - Exact 2x2 Grid Matching User Screenshot
            ======================================================== */}
        <div className="grid grid-cols-2 md:hidden gap-0">
          {data.items.map((stat, idx) => {
            const line1 = stat.line1 || stat.label.split(' ')[0];
            const line2 = stat.line2 || stat.label.split(' ').slice(1).join(' ');

            const borderClass =
              idx === 0
                ? 'border-r border-b border-[#d8e2d4]'
                : idx === 1
                ? 'border-b border-[#d8e2d4]'
                : idx === 2
                ? 'border-r border-[#d8e2d4]'
                : '';

            return (
              <motion.div
                key={`mobile-${stat.id}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className={`flex flex-col items-center justify-center py-7 px-3 xs:py-9 xs:px-4 ${borderClass}`}
              >
                <div className="w-fit flex flex-col items-start">
                  {/* Giant Numerals with Counter Animation */}
                  <div className="font-condensed font-black text-[#005a30] text-[64px] xs:text-[72px] sm:text-[80px] leading-[0.88] tracking-[-0.03em] select-none">
                    <StatCounter value={stat.value} />
                  </div>

                  {/* Green Accent Line + 2-Line Label */}
                  <div className="flex flex-col items-center self-end mt-2.5 xs:mt-3 w-full">
                    {/* Horizontal Green Accent Line */}
                    <div className="h-[2px] w-full bg-[#005a30] mb-2" />

                    {/* 2-Line Condensed Label (Centered under right side) */}
                    <div className="font-condensed font-bold text-[#005a30] text-[17px] xs:text-[19px] leading-[1.12] text-center">
                      <span className="block whitespace-nowrap">{line1}</span>
                      <span className="block whitespace-nowrap">{line2}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
