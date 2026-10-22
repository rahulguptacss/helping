'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { GallerySectionData, GalleryItem } from '@/components/types';
import FilterDropdown from '@/components/ui/FilterDropdown';

interface GalleryProps {
  data: GallerySectionData;
}

export default function Gallery({ data }: GalleryProps) {
  // Category filters from data.json; the first entry acts as "show all"
  const categories = data.categories;
  const allCategory = categories[0];
  const [activeCategory, setActiveCategory] = useState<string>(allCategory);
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [hasLoadedExtra, setHasLoadedExtra] = useState<boolean>(false);

  const rawItems = data.items;

  // Filter items based on activeCategory
  const filteredItems = useMemo(() => {
    if (activeCategory === allCategory) return rawItems;
    return rawItems.filter((item) => {
      if (item.category?.toLowerCase() === activeCategory.toLowerCase()) return true;
      if (item.categories?.some((c) => c.toLowerCase() === activeCategory.toLowerCase())) return true;
      return false;
    });
  }, [activeCategory, allCategory, rawItems]);

  // Handle Load More click
  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setIsLoadingMore(false);
      setHasLoadedExtra(true);
    }, 600);
  };

  // Lightbox navigation
  const currentIndex = selectedImage ? filteredItems.findIndex((it) => it.id === selectedImage.id) : -1;
  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex > 0) {
      setSelectedImage(filteredItems[currentIndex - 1]);
    } else {
      setSelectedImage(filteredItems[filteredItems.length - 1]);
    }
  };
  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex < filteredItems.length - 1) {
      setSelectedImage(filteredItems[currentIndex + 1]);
    } else {
      setSelectedImage(filteredItems[0]);
    }
  };

  return (
    <section id="gallery" className="relative w-full overflow-hidden bg-[#f7f3ec] pt-7 sm:pt-9 lg:pt-11 pb-12 sm:pb-16 lg:pb-20">
      <div className="mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================
            Section Header: Eyebrow, Title & Subtitle with Motion
            ======================================================== */}
        <div className="flex flex-col items-center text-center">
          {/* Eyebrow: — OUR GALLERY — */}
          <div className="flex items-center justify-center gap-2.5 sm:gap-3">
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="w-8 sm:w-12 h-[1.5px] bg-[#1a5d3a] origin-right"
            />
            <motion.span
              initial={{ opacity: 0, y: -6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
              className="text-[11px] sm:text-[12.5px] font-bold tracking-[0.16em] uppercase text-[#1a5d3a]"
            >
              {data.eyebrow}
            </motion.span>
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="w-8 sm:w-12 h-[1.5px] bg-[#1a5d3a] origin-left"
            />
          </div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="mt-2 sm:mt-2.5 font-serif text-[28px] xs:text-[32px] sm:text-[38px] md:text-[44px] font-bold text-[#113824] tracking-tight leading-tight"
          >
            {data.title}
          </motion.h2>

          {/* Subtitle / Description */}
          {data.description && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mt-2 sm:mt-2.5 max-w-[620px] text-[13px] xs:text-[13.5px] sm:text-[14px] leading-relaxed text-[#4b5563]"
            >
              {data.description}
            </motion.p>
          )}

          {/* ========================================================
              Filter: Dropdown on mobile, Pills on md+
              ======================================================== */}
          <FilterDropdown
            className="mt-5 sm:mt-6 md:hidden"
            options={categories}
            value={activeCategory}
            onChange={setActiveCategory}
            label={data.filter_label}
          />
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-5 sm:mt-6 md:mt-7 hidden md:flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 max-w-full"
          >
            {categories.map((cat) => {
              const isActive = activeCategory.toLowerCase() === cat.toLowerCase();
              return (
                <motion.button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.18 }}
                  className={`px-3.5 sm:px-4.5 py-1.5 sm:py-1.5 text-[11.5px] sm:text-[13px] rounded-full transition-all duration-200 select-none ${
                    isActive
                      ? 'bg-[#113824] text-white font-semibold shadow-sm border border-[#113824]'
                      : 'bg-transparent text-[#113824] border border-[#113824]/35 hover:border-[#113824] hover:bg-[#113824]/5 font-medium'
                  }`}
                >
                  {cat}
                </motion.button>
              );
            })}
          </motion.div>
        </div>

        {/* ========================================================
            Gallery Grid: 4-Column Masonry with Perfectly Level Bottom Row
            ======================================================== */}
        <div className="mt-6 sm:mt-8 md:mt-9">
          {activeCategory === allCategory ? (
            /* Screenshot-Accurate 4-Column Masonry Layout: Bottom row perfectly aligned */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5 md:gap-4 items-start w-full">
              {[1, 2, 3, 4].map((colNum) => {
                const colItems = rawItems.filter((it) => it.column === colNum);
                return (
                  <div key={colNum} className="gallery-col-desktop flex flex-col gap-3 sm:gap-3.5 md:gap-4 w-full">
                    {colItems.map((item, idx) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 24, scale: 0.97 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ duration: 0.5, delay: (colNum * 0.08) + (idx * 0.06), ease: [0.22, 1, 0.36, 1] }}
                        whileHover={{ y: -4, transition: { duration: 0.25 } }}
                        onClick={() => setSelectedImage(item)}
                        style={{
                          '--card-flex': item.flex,
                          '--card-aspect': item.aspect,
                        } as React.CSSProperties}
                        className="gallery-card-flex group relative cursor-pointer overflow-hidden rounded-[14px] sm:rounded-[18px] bg-[#e6dfd5] shadow-[0_3px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_10px_26px_rgba(0,0,0,0.12)] transition-shadow duration-300 min-h-0 w-full"
                      >
                        <motion.img
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.45, ease: 'easeOut' }}
                          src={item.image}
                          alt={item.alt ?? item.title}
                          className="w-full h-full object-cover block select-none"
                          loading="lazy"
                        />
                        {/* Hover Overlay with Lens Icon */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                          <span className="text-[10.5px] font-semibold text-emerald-300 uppercase tracking-wider">
                            {item.category}
                          </span>
                          <h4 className="text-[13px] font-medium text-white line-clamp-1 leading-snug">
                            {item.title}
                          </h4>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                );
              })}
            </div>
          ) : (
            /* Filtered Category Grid */
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-3.5 md:gap-4"
            >
              <AnimatePresence>
                {filteredItems.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: idx * 0.04 }}
                    whileHover={{ y: -4, transition: { duration: 0.25 } }}
                    onClick={() => setSelectedImage(item)}
                    style={{ aspectRatio: item.aspect }}
                    className="group relative cursor-pointer overflow-hidden rounded-[14px] sm:rounded-[18px] bg-[#e6dfd5] shadow-[0_3px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_10px_26px_rgba(0,0,0,0.12)] transition-shadow duration-300 w-full"
                  >
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.45, ease: 'easeOut' }}
                      src={item.image}
                      alt={item.alt ?? item.title}
                      className="w-full h-full object-cover block select-none"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                      <span className="text-[10.5px] font-semibold text-emerald-300 uppercase tracking-wider">
                        {item.category}
                      </span>
                      <h4 className="text-[13px] font-medium text-white line-clamp-1 leading-snug">
                        {item.title}
                      </h4>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>

        {/* ========================================================
            Load More Button: Pill button with rotation sync icon
            ======================================================== */}
        <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-14 flex justify-center relative z-20">
          <motion.button
            onClick={handleLoadMore}
            disabled={isLoadingMore}
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="group flex items-center gap-2 px-6 sm:px-7 py-2.5 sm:py-2.5 rounded-full bg-[#113824] hover:bg-[#0d2e1d] text-white text-[12.5px] sm:text-[13.5px] font-medium shadow-[0_4px_14px_rgba(17,56,36,0.2)] transition-all duration-200"
          >
            <span>{hasLoadedExtra ? data.load_more_button.loaded_text : data.load_more_button.text}</span>
            <svg
              className={`w-3.5 h-3.5 stroke-current stroke-[2] fill-none transition-transform duration-500 ${
                isLoadingMore ? 'animate-spin' : 'group-hover:rotate-180'
              }`}
              viewBox="0 0 24 24"
            >
              <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.button>
        </div>

      </div>

      {/* ========================================================
          Interactive Lightbox Modal Preview
          ======================================================== */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 sm:p-6"
          >
            {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-[800px] w-full max-h-[90vh] flex flex-col bg-[#1a2e22] rounded-[20px] overflow-hidden border border-white/10 shadow-2xl"
            >
              {/* Top Bar with Title and Close Button */}
              <div className="flex items-center justify-between px-4 sm:px-5 py-3 bg-[#11241a] border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
                    {selectedImage.category}
                  </span>
                  <span className="text-[13px] sm:text-[14px] text-white/90 font-medium truncate">
                    {selectedImage.title}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="p-1 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label={data.lightbox_labels.close}
                >
                  <svg className="w-5 h-5 stroke-current stroke-[2] fill-none" viewBox="0 0 24 24">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Main Image */}
              <div className="relative flex items-center justify-center p-2 sm:p-4 bg-black/30 overflow-hidden flex-1">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="max-h-[70vh] w-auto max-w-full rounded-[10px] object-contain select-none"
                />

                {/* Prev Navigation Button */}
                <button
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white/80 hover:text-white hover:bg-black/80 transition-colors"
                  aria-label={data.lightbox_labels.previous}
                >
                  <svg className="w-5 h-5 stroke-current stroke-[2.5] fill-none" viewBox="0 0 24 24">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>

                {/* Next Navigation Button */}
                <button
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white/80 hover:text-white hover:bg-black/80 transition-colors"
                  aria-label={data.lightbox_labels.next}
                >
                  <svg className="w-5 h-5 stroke-current stroke-[2.5] fill-none" viewBox="0 0 24 24">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
