'use client';

import { motion } from 'framer-motion';
import type { TeamSectionData } from '@/components/types';

interface TeamProps {
  data: TeamSectionData;
}

export default function Team({ data }: TeamProps) {
  const members = data.members;

  return (
    <section id="team" className="relative w-full overflow-hidden bg-[#f7f3ec] pt-6 sm:pt-8 lg:pt-10 pb-10 sm:pb-14 lg:pb-16">
      <div className="mx-auto max-w-[1040px] px-4 sm:px-6 lg:px-8">

        {/* ========================================================
            Section Header: Tightened Spacing
            ======================================================== */}
        <div className="flex flex-col items-center text-center">
          {/* Eyebrow: — OUR TEAM — */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center gap-2.5 sm:gap-3"
          >
            <span className="w-8 sm:w-12 h-[1.5px] bg-[#1a5d3a]" />
            <span className="text-[11.5px] sm:text-[12.5px] font-bold tracking-[0.16em] uppercase text-[#1a5d3a]">
              {data.eyebrow}
            </span>
            <span className="w-8 sm:w-12 h-[1.5px] bg-[#1a5d3a]" />
          </motion.div>

          {/* Heading: Meet Our Dedicated Team (Reduced top/bottom spacing) */}
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-1.5 sm:mt-2 font-serif text-[30px] xs:text-[34px] sm:text-[40px] md:text-[44px] font-bold text-[#113824] tracking-tight leading-tight"
          >
            {data.title}
          </motion.h2>

          {/* Subtitle / Description (Reduced margin-top) */}
          {data.description && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mt-2 sm:mt-2.5 max-w-[620px] text-[13px] xs:text-[13.5px] sm:text-[14px] leading-relaxed text-[#4b5563]"
            >
              {data.description}
            </motion.p>
          )}
        </div>

        {/* ========================================================
            Team Grid: Reduced Spacing from Subtitle & Reduced Card Gap
            ======================================================== */}
        <div className="mt-5 sm:mt-7 md:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-4.5 lg:gap-5">
          {members.map((member, idx) => (
            <motion.div
              key={member.id || idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="group relative flex flex-col rounded-[22px] sm:rounded-[26px] overflow-hidden bg-[#fcfbf7] border border-[#e8e2d8] shadow-[0_3px_18px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_28px_rgba(0,0,0,0.07)] transition-all duration-300"
            >
              {/* Photo: Edge-to-edge at top with no padding, naturally clipped by card radius */}
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#e4ded5]">
                <motion.img
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  src={member.image}
                  alt={member.name}
                  className="h-full w-full object-cover object-center"
                />
              </div>

              {/* Bottom Info Bar: Left Name/Role, Right Outlined Social Circles */}
              <div className="flex items-center justify-between px-3.5 sm:px-4 py-3 sm:py-3.5 bg-[#fcfbf7]">
                {/* Left: Name (Serif, Forest Green) & Role (Slate Gray) */}
                <div className="flex flex-col min-w-0 pr-2">
                  <h3 className="font-serif font-bold text-[17.5px] sm:text-[19px] text-[#0d442d] leading-tight tracking-tight truncate">
                    {member.name}
                  </h3>
                  <p className="mt-0.5 text-[12px] sm:text-[13px] text-[#55635b] font-normal truncate">
                    {member.role}
                  </p>
                </div>

                {/* Right: Social Circles from data.json (member.socials) */}
                <div className="flex items-center gap-1.5 shrink-0">
                  {member.socials.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} ${social.name}`}
                      className="flex h-7.5 w-7.5 sm:h-8 sm:w-8 items-center justify-center rounded-full border-[1.5px] border-[#0d442d] text-[#0d442d] hover:bg-[#0d442d] hover:text-white transition-all duration-200"
                    >
                      {social.icon === 'linkedin' && (
                        <span className="font-bold text-[11px] sm:text-[12px] leading-none">in</span>
                      )}
                      {social.icon === 'instagram' && (
                        <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-[1.8]" viewBox="0 0 24 24">
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2.5" />
                        </svg>
                      )}
                      {social.icon === 'facebook' && (
                        <span className="font-bold text-[12px] sm:text-[13px] leading-none">f</span>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
