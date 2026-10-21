'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin } from 'lucide-react';
import type { FooterData } from '@/components/types';

interface FooterProps {
  data: FooterData;
}

export default function Footer({ data }: FooterProps) {
  return (
    <footer id="contact" className="relative w-full bg-[#faf9f5] pt-8 sm:pt-10 lg:pt-12 pb-0">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
        
        {/* 1. Centered Brand Logo (Matching Screenshot) */}
        <div className="flex flex-col items-center justify-center text-center">
          <Link href="/" className="inline-flex items-center hover:opacity-90 transition-opacity">
            <Image
              src={data.logo || '/logo/logo.webp'}
              alt={data.logo_text || 'Helping Hands'}
              width={340}
              height={140}
              priority
              className="h-20 sm:h-22 md:h-14 lg:h-16 w-auto object-contain"
            />
          </Link>

          {/* 2. Navigation Links: 2 Columns on Mobile (< md), 1 Wrap Row on Desktop (md+) */}
          {/* Mobile View (< md): Exact 2 columns matching screenshot */}
          <nav className="mt-6 sm:mt-7 grid grid-flow-col grid-rows-4 gap-x-12 sm:gap-x-16 gap-y-3.5 text-center w-fit mx-auto md:hidden">
            {data.nav_links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[15px] sm:text-[15.5px] font-semibold text-[#1a2e22] hover:text-[#005a30] transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop View (md+): Untouched original 1-row wrap layout */}
          <nav className="mt-5 sm:mt-6 hidden md:flex md:flex-wrap md:items-center md:justify-center md:gap-x-10 md:gap-y-2.5">
            {data.nav_links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[14px] sm:text-[15px] font-semibold text-[#1a2e22] hover:text-[#005a30] transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* 3. "Contact Info" Section with Flanking Horizontal Lines */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mt-7 sm:mt-8">
            <span className="w-12 sm:w-16 h-[1.5px] bg-[#1a5d3a]" />
            <h3 className="font-serif text-[18px] sm:text-[20px] font-bold text-[#113824]">
              {data.contact_heading || 'Contact Info'}
            </h3>
            <span className="w-12 sm:w-16 h-[1.5px] bg-[#1a5d3a]" />
          </div>

          {/* Contact Items: Mobile (left-aligned block centered horizontally) | Desktop (horizontal row with dividers) */}
          <div className="w-fit mx-auto flex flex-col items-start gap-4 mt-5 sm:mt-6 md:w-auto md:mx-0 md:flex-row md:items-center md:justify-center md:gap-8 lg:gap-12 md:mt-5">
            {/* Email */}
            <a
              href={`mailto:${data.contact_info.email}`}
              className="flex items-center gap-3.5 group"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#005a30] text-white shadow-sm transition-transform duration-200 group-hover:scale-105">
                <Mail className="h-4 w-4" />
              </span>
              <span className="text-[14px] sm:text-[14.5px] font-normal text-[#1a2e22] group-hover:text-[#005a30] transition-colors">
                {data.contact_info.email}
              </span>
            </a>

            {/* Vertical Divider 1 (Desktop Only) */}
            <span className="hidden md:block h-8 w-[1px] bg-[#cbdad0]" aria-hidden="true" />

            {/* Phone */}
            <a
              href={`tel:${data.contact_info.phone}`}
              className="flex items-center gap-3.5 group"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#005a30] text-white shadow-sm transition-transform duration-200 group-hover:scale-105">
                <Phone className="h-4 w-4" />
              </span>
              <span className="text-[14px] sm:text-[14.5px] font-normal text-[#1a2e22] group-hover:text-[#005a30] transition-colors">
                {data.contact_info.phone}
              </span>
            </a>

            {/* Vertical Divider 2 (Desktop Only) */}
            <span className="hidden md:block h-8 w-[1px] bg-[#cbdad0]" aria-hidden="true" />

            {/* Address */}
            <div className="flex items-center gap-3.5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#005a30] text-white shadow-sm">
                <MapPin className="h-4 w-4" />
              </span>
              <div className="text-[13.5px] sm:text-[14px] font-normal text-[#1a2e22] text-left leading-tight">
                <span className="block">{data.contact_info.address_line1 || '123 Education Lane,'}</span>
                <span className="block">{data.contact_info.address_line2 || data.contact_info.address || 'New York, NY 10001'}</span>
              </div>
            </div>
          </div>

          {/* 4. "Follow Us" Section with Flanking Horizontal Lines */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mt-7 sm:mt-8">
            <span className="w-12 sm:w-16 h-[1.5px] bg-[#1a5d3a]" />
            <h3 className="font-serif text-[18px] sm:text-[20px] font-bold text-[#113824]">
              {data.social_heading || 'Follow Us'}
            </h3>
            <span className="w-12 sm:w-16 h-[1.5px] bg-[#1a5d3a]" />
          </div>

          {/* Outlined Social Media Icons (Matching Screenshot) */}
          <div className="mt-4 sm:mt-5 md:mt-4 flex items-center justify-center gap-3.5 sm:gap-4">
            {data.socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#005a30] bg-transparent text-[#005a30] transition-all duration-300 hover:bg-[#005a30] hover:text-white hover:scale-108 shadow-sm"
              >
                {social.icon === 'facebook' && (
                  <span className="font-bold text-[16px] leading-none">f</span>
                )}
                {social.icon === 'instagram' && (
                  <svg className="w-4 h-4 fill-none stroke-current stroke-[1.8]" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2.5" />
                  </svg>
                )}
                {social.icon === 'youtube' && (
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.376.55 9.376.55s7.505 0 9.377-.55a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                )}
                {social.icon === 'linkedin' && (
                  <span className="font-bold text-[14px] leading-none">in</span>
                )}
              </a>
            ))}
          </div>

        </div>

      </div>

      {/* 5. Bottom Copyright Bar: Dark Green (Matching Screenshot) */}
      <div className="mt-7 sm:mt-8 w-full bg-[#00572e] py-3.5 text-center">
        <div className="mx-auto max-w-[1360px] px-4 text-[13px] sm:text-[13.5px] font-normal text-white/95">
          {data.copyright || 'Copyright © 2026. All rights reserved. Powered by Lestow'}
        </div>
      </div>
    </footer>
  );
}
