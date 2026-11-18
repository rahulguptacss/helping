'use client';

import { motion } from 'framer-motion';
import { Heart, Send } from 'lucide-react';
import type { AboutSectionData } from '@/components/types';

const ease = [0.22, 1, 0.36, 1] as const;

export default function About({ data }: { data: AboutSectionData }) {
  const lines = [data.title_line1, data.title_line2, data.title_line3, data.title_line4];

  return (
    <section id="about" className="relative overflow-hidden bg-[#fbfaf6] py-16 sm:py-20">
      <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <motion.figure
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease }}
          className="relative"
        >
          <div className="absolute -left-4 -top-4 h-24 w-24 rounded-full bg-[#017949]/15" aria-hidden />
          <img src={data.image} alt={data.image_alt} className="relative aspect-[4/5] w-full rounded-[2rem] object-cover shadow-[0_24px_50px_-28px_rgba(1,121,73,0.55)]" />
          {data.join_badge.href ? (
            <motion.a
              href={data.join_badge.href}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-5 right-4 flex items-center rounded-full bg-white py-1.5 pl-1.5 pr-4 shadow-lg"
            >
              <img src={data.join_badge.avatars} alt={data.join_badge.avatars_alt} className="h-11 w-11 rounded-full object-cover" />
              <span className="ml-2 text-sm font-bold text-[#143028]">{data.join_badge.text}</span>
              <Send className="ml-1.5 h-3.5 w-3.5 -rotate-45 text-[#017949]" />
            </motion.a>
          ) : null}
        </motion.figure>

        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease }}
            className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.16em] text-[#017949]"
          >
            <Heart className="h-4 w-4 fill-[#017949]" />
            {data.badge}
          </motion.p>
          <h2 className="font-condensed mt-4 text-[clamp(2.6rem,6vw,4.6rem)] font-bold leading-[0.92] tracking-tight text-[#141414]">
            {lines.map((line, index) => (
              <motion.span
                key={line}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.08 * index, ease }}
                className="block"
              >
                {line}
              </motion.span>
            ))}
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.3, ease }}
            className="mt-5 max-w-xl text-base leading-relaxed text-[#3d4f45] sm:text-lg"
          >
            {data.description}
          </motion.p>
          {data.key_features?.length ? (
            <ul className="mt-8 grid gap-3 sm:grid-cols-3">
              {data.key_features.map((item, index) => (
                <motion.li
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.12 * index, ease }}
                  className="rounded-2xl bg-white p-4 ring-1 ring-[#017949]/10"
                >
                  <p className="text-sm font-extrabold text-[#017949]">{item.title}</p>
                  <p className="mt-1 text-sm leading-snug text-[#3d4f45]">{item.description}</p>
                </motion.li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
}
