'use client';

import { motion } from 'framer-motion';
import type { AboutStoryData, AboutGalleryItem } from '@/components/types';

interface OurStoryProps {
  data: AboutStoryData;
  gallery?: AboutGalleryItem[];
}

const DEFAULT_GALLERY: AboutGalleryItem[] = [
  {
    id: '01',
    image: '/about/gallery-1.webp',
    alt: 'Three cheerful boys smiling together',
  },
  {
    id: '02',
    image: '/about/gallery-2.webp',
    alt: 'Two young girls hugging happily',
  },
  {
    id: '03',
    image: '/about/gallery-3.webp',
    alt: 'Volunteers distributing meals and support',
  },
];

export default function OurStory({ data, gallery }: OurStoryProps) {
  const galleryItems =
    (data.gallery && data.gallery.length > 0 ? data.gallery : null) ||
    (data.items && data.items.length > 0 ? data.items : null) ||
    (gallery && gallery.length > 0 ? gallery : null) ||
    DEFAULT_GALLERY;

  return (
    <section className="relative w-full overflow-hidden bg-[#f8f3ed] pt-14 sm:pt-20 lg:pt-24 pb-20 sm:pb-28 md:pb-36 lg:pb-44">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-8 lg:px-12">
        
        {/* ========================================================
            UPPER PART: Heading & Narrative Story + Classroom Image
            ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-start gap-10 sm:gap-12 lg:gap-14 xl:gap-16">
          
          {/* Left Column: Heading & Narrative Story Paragraphs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 xl:col-span-5 flex flex-col justify-start pt-3 sm:pt-6 md:pt-10 lg:pt-14 xl:pt-16"
          >
            {/* Giant Condensed Heading: reduced font-weight (font-bold instead of font-black) and increased font-size */}
            <h2 className="font-condensed font-bold text-[44px] xs:text-[50px] sm:text-[58px] md:text-[64px] lg:text-[70px] xl:text-[74px] leading-[0.9] tracking-tight text-[#141414] uppercase">
              {data.title || 'OUR STORY'}
            </h2>

            {/* Paragraphs with Exact Screenshot Copy */}
            <div className="mt-5 sm:mt-7 space-y-4 sm:space-y-5 text-[14px] xs:text-[14.5px] sm:text-[15px] md:text-[15.5px] leading-[1.68] text-[#2c2c2c] max-w-[500px]">
              {(data.paragraphs && data.paragraphs.length > 0 ? data.paragraphs : [
                "Demonstrated by living our core values: compassion, growth, courage to act, responsibility, belonging, curiosity. You can see them cultivated in every experience for students, families and staff.",
                "Community is everything. It's who we are and how things get done. Everyone here is motivated by a deep commitment to making sure each child and family feels welcome and included. When everyone feels like they belong, we are stronger and smarter together. We're a community driven to make the world a better place—starting in our own backyard."
              ]).map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Classroom Writing Photo with Slightly Reduced Height (Aspect Ratio ~16/11) and Rounded Corners */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.98 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 xl:col-span-7 flex justify-end"
          >
            <div className="relative w-full max-w-[620px] lg:max-w-none aspect-[16/11] max-h-[490px] rounded-[24px] sm:rounded-[32px] md:rounded-[36px] overflow-hidden group">
              <motion.img
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                src={data.image || '/about/story.webp'}
                alt={data.image_alt || 'Girls writing in school classroom'}
                className="h-full w-full object-cover object-center rounded-[24px] sm:rounded-[32px] md:rounded-[36px]"
              />
            </div>
          </motion.div>

        </div>

        {/* ========================================================
            LOWER PART (Gallery Part of Our Story): 3 Staggered Images
            ======================================================== */}
        <div className="mt-12 sm:mt-16 md:mt-20 lg:mt-24">
          <div className="grid grid-cols-3 gap-3 sm:gap-6 md:gap-8 lg:gap-10 items-start">
            {galleryItems.map((item, idx) => {
              // The middle image (index 1) is shifted down for the asymmetric offset layout shown in the screenshot
              const isMiddle = idx === 1;

              return (
                <motion.div
                  key={item.id || idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative overflow-hidden rounded-[18px] sm:rounded-[28px] md:rounded-[32px] group ${
                    isMiddle ? 'translate-y-6 sm:translate-y-10 md:translate-y-14 lg:translate-y-16' : ''
                  }`}
                >
                  <div className="relative w-full aspect-[4/5] overflow-hidden rounded-[18px] sm:rounded-[28px] md:rounded-[32px] bg-[#e5e0d8]">
                    <motion.img
                      whileHover={{ scale: 1.04 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      src={item.image}
                      alt={item.alt || 'Helping Hands community'}
                      className="h-full w-full object-cover object-center rounded-[18px] sm:rounded-[28px] md:rounded-[32px]"
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
