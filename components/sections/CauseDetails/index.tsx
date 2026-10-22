'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { CauseDetailsSectionData } from '@/components/types';

interface CauseDetailsProps {
  data?: CauseDetailsSectionData;
}

export default function CauseDetails({ data }: CauseDetailsProps) {
  if (!data) return null;

  // Solid green silhouette icons matching the user's screenshot
  const renderImpactIcon = (iconName: string) => {
    const key = iconName.toLowerCase().trim();
    if (key.includes('grad') || key.includes('cap') || key.includes('edu')) {
      // 1. Graduation Cap (Solid filled)
      return (
        <svg className="w-8 h-8 sm:w-9 sm:h-9 mx-auto text-[#1b5e39]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
        </svg>
      );
    }
    if (key.includes('user') || key.includes('school') || key.includes('partner') || key.includes('group')) {
      // 2. Schools / Users (3 people silhouettes solid filled)
      return (
        <svg className="w-8 h-8 sm:w-9 sm:h-9 mx-auto text-[#1b5e39]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
        </svg>
      );
    }
    if (key.includes('book') || key.includes('material') || key.includes('learn')) {
      // 3. Open Book (Solid filled)
      return (
        <svg className="w-8 h-8 sm:w-9 sm:h-9 mx-auto text-[#1b5e39]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm-1 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z" />
        </svg>
      );
    }
    // 4. Heart (Solid filled)
    return (
      <svg className="w-8 h-8 sm:w-9 sm:h-9 mx-auto text-[#1b5e39]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    );
  };

  return (
    <div className="w-full overflow-hidden bg-white">
      {/* ========================================================
          1. Cause Overview (Hero Intro - White Background)
          ======================================================== */}
      <section className="relative w-full bg-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
            
            {/* Left Content Details */}
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 flex flex-col justify-center"
            >
              {/* Category Badge */}
              {data.badge && (
                <div className="mb-3">
                  <span className="inline-block rounded-full bg-[#eef6f0] border border-[#d6e7dc] text-[#1a5d3a] px-3.5 py-1 text-[11.5px] sm:text-[12px] font-semibold tracking-wide">
                    {data.badge}
                  </span>
                </div>
              )}

              {/* Title */}
              <h1 className="font-serif text-[32px] sm:text-[40px] lg:text-[48px] font-bold text-[#113824] leading-[1.12] tracking-tight">
                {data.title}
              </h1>

              {/* Description */}
              <p className="mt-4 sm:mt-5 text-[14px] sm:text-[15px] leading-relaxed text-[#55635b] max-w-[520px]">
                {data.description}
              </p>
            </motion.div>

            {/* Right Large Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6"
            >
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-[22px] sm:rounded-[28px] overflow-hidden bg-[#e8e4db] shadow-[0_8px_30px_rgba(0,0,0,0.06)] group">
                <img
                  src={data.image}
                  alt={data.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-104"
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ========================================================
          2. About This Cause (Pale Mint/Sage Background)
          ======================================================== */}
      {data.about && (
        <section className="relative w-full bg-[#edf5ef] py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
              
              {/* Left Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="lg:col-span-6 order-2 lg:order-1"
              >
                <div className="relative w-full aspect-[4/3] rounded-[20px] sm:rounded-[24px] overflow-hidden bg-[#e8e4db] shadow-[0_8px_30px_rgba(0,0,0,0.05)] group">
                  <img
                    src={data.about.image}
                    alt={data.about.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-104"
                  />
                </div>
              </motion.div>

              {/* Right Content */}
              <motion.div
                initial={{ opacity: 0, x: 25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="lg:col-span-6 order-1 lg:order-2 flex flex-col justify-center"
              >
                {/* Eyebrow */}
                <div className="flex items-center gap-2.5 mb-2 sm:mb-2.5">
                  <span className="w-8 sm:w-10 h-[1.5px] bg-[#1a5d3a]" />
                  <span className="text-[12px] sm:text-[12.5px] font-semibold text-[#1a5d3a]">
                    {data.about.eyebrow}
                  </span>
                </div>

                {/* Title */}
                <h2 className="font-serif text-[28px] sm:text-[34px] lg:text-[40px] font-bold text-[#113824] leading-[1.18] tracking-tight">
                  {data.about.title}
                </h2>

                {/* Paragraph */}
                <p className="mt-3.5 sm:mt-4 text-[13.5px] sm:text-[14.5px] leading-relaxed text-[#55635b]">
                  {data.about.description}
                </p>
              </motion.div>

            </div>
          </div>
        </section>
      )}

      {/* ========================================================
          3. Our Impact So Far + 4. Our Approach (White Background)
          Exact match to user's screenshots with compact spacing
          ======================================================== */}
      <section className="relative w-full bg-white pt-8 sm:pt-10 lg:pt-12 pb-12 sm:pb-16 lg:pb-20">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
          
          {/* --- 3. Our Impact Header & Cards --- */}
          {data.impact && (
            <div>
              {/* Centered Heading */}
              <div className="text-center">
                {/* Eyebrow: — Our Impact So Far — (Title Case, exact match) */}
                <div className="flex items-center justify-center gap-2.5 sm:gap-3 mb-1.5">
                  <span className="w-7 sm:w-9 h-[1.5px] bg-[#1a5d3a]" />
                  <span className="text-[12px] sm:text-[13px] font-semibold text-[#1a5d3a]">
                    {data.impact.eyebrow}
                  </span>
                  <span className="w-7 sm:w-9 h-[1.5px] bg-[#1a5d3a]" />
                </div>

                {/* Title: Changing Lives Through Education */}
                <h2 className="font-serif text-[28px] sm:text-[36px] lg:text-[40px] font-bold text-[#113824] tracking-tight leading-tight">
                  {data.impact.title}
                </h2>

                {/* Subtitle */}
                {data.impact.subtitle && (
                  <p className="mt-1.5 text-[13px] sm:text-[14px] text-[#55635b] text-center max-w-[560px] mx-auto leading-relaxed">
                    {data.impact.subtitle}
                  </p>
                )}
              </div>

              {/* 4 Stat Cards: Pale mint/sage background with solid green icons */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-5 lg:gap-5 mt-6 sm:mt-7 md:mt-8">
                {data.impact.items.map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: idx * 0.07 }}
                    className="rounded-[18px] sm:rounded-[20px] bg-[#eff6ef] p-4.5 sm:p-5 lg:py-6 text-center transition-all duration-300 hover:shadow-[0_8px_24px_rgba(17,56,36,0.06)]"
                  >
                    <div className="flex items-center justify-center min-h-[36px]">
                      {renderImpactIcon(stat.icon)}
                    </div>
                    <h3 className="font-serif text-[26px] sm:text-[30px] lg:text-[34px] font-bold text-[#113824] mt-2.5 leading-none tracking-tight">
                      {stat.value}
                    </h3>
                    <p className="mt-1.5 text-[12px] sm:text-[13px] font-medium text-[#55635b] leading-snug">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* --- 4. Our Approach (Stepper on Left with Continuous Connecting Line, Photo on Right) --- */}
          {data.approach && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center mt-7 sm:mt-9 lg:mt-10">
              
              {/* Left Column: Eyebrow + Title + Stepper Timeline */}
              <motion.div
                initial={{ opacity: 0, x: -25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="lg:col-span-6 flex flex-col justify-center"
              >
                {/* Eyebrow: — How We Make a Difference — */}
                <div className="flex items-center gap-2.5 mb-1.5">
                  <span className="w-8 sm:w-10 h-[1.5px] bg-[#1a5d3a]" />
                  <span className="text-[12px] sm:text-[13px] font-semibold text-[#1a5d3a]">
                    {data.approach.eyebrow}
                  </span>
                  <span className="w-8 sm:w-10 h-[1.5px] bg-[#1a5d3a]" />
                </div>

                {/* Title: Our Approach */}
                <h2 className="font-serif text-[30px] sm:text-[36px] lg:text-[42px] font-bold text-[#113824] leading-tight tracking-tight mt-1 mb-5 sm:mb-6">
                  {data.approach.title}
                </h2>

                {/* Connected Stepper Timeline */}
                <div className="relative flex flex-col">
                  {data.approach.steps.map((step, idx) => {
                    const isLast = idx === data.approach.steps.length - 1;
                    return (
                      <div
                        key={step.number || idx}
                        className="relative flex items-start gap-4 sm:gap-5 pb-7 sm:pb-8 last:pb-0"
                      >
                        {/* Continuous Vertical Connecting Line (runs from center of this circle down to next circle) */}
                        {!isLast && (
                          <div
                            className="absolute left-[21px] sm:left-[23px] top-[24px] bottom-0 w-[2px] bg-[#b8d8c2]"
                            aria-hidden="true"
                          />
                        )}

                        {/* Number Circle Badge (Z-10 so it cleanly overlays the line) */}
                        <div className="relative z-10 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#0d4a27] text-white font-bold flex items-center justify-center shrink-0 text-[14px] sm:text-[15px] select-none shadow-xs">
                          {step.number}
                        </div>

                        {/* Step Content */}
                        <div className="flex-1 min-w-0 pt-1 sm:pt-1.5">
                          <h4 className="font-serif text-[18px] sm:text-[20px] font-bold text-[#113824] leading-snug">
                            {step.title}
                          </h4>
                          <p className="text-[13px] sm:text-[13.5px] leading-relaxed text-[#55635b] mt-0.5 sm:mt-1">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Right Column: Girl Image (Matching screenshot photo with rounded corners) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="lg:col-span-6"
              >
                <div className="relative w-full aspect-[4/3] sm:aspect-[16/13] lg:aspect-[4/3.5] rounded-[24px] sm:rounded-[28px] overflow-hidden bg-[#e8e4db] shadow-[0_6px_24px_rgba(0,0,0,0.06)] group">
                  <img
                    src={data.approach.image}
                    alt={data.approach.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                  />
                </div>
              </motion.div>

            </div>
          )}

        </div>
      </section>
    </div>
  );
}
