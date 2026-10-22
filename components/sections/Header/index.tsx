'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone } from 'lucide-react';
import type { HeaderData } from '@/components/types';

interface HeaderProps {
  data: HeaderData;
}

export default function Header({ data }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Lock body scroll when menu is active (just like nickho-motorsports.nl)
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const [isScrolled, setIsScrolled] = useState(false);

  // Detect scroll to handle transparency over hero and sticky style
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = data.links;

  return (
    <>
      {/* ---------------- Top Fixed Sticky Header Bar (Transparent at top) ---------------- */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          isScrolled ? 'bg-[#017949]/95 backdrop-blur-md shadow-md' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-[60px] sm:h-[72px] md:h-[80px] max-w-[1440px] items-center justify-between px-3 sm:px-6 md:px-8 lg:px-12">
          
          {/* Left: Brand Logo in White Rounded Pill Badge (Mobile Responsive) */}
          <Link
            href={data.logo_link}
            onClick={() => setIsOpen(false)}
            className="group relative z-50 inline-flex items-center rounded-full bg-white px-2.5 py-1 sm:px-4 sm:py-1.5 md:px-5 md:py-2 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95 focus:outline-none"
            aria-label={data.logo_text}
          >
            <Image
              src={data.logo}
              alt={`${data.logo_text} - ${data.logo_subtext}`}
              width={240}
              height={56}
              priority
              className="h-[26px] sm:h-[34px] md:h-[42px] w-auto object-contain"
            />
          </Link>

          {/* Right: Menu Button (Morphing between Menu and Close with animated box) */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="group relative z-50 flex items-center gap-1.5 sm:gap-2.5 md:gap-3 cursor-pointer text-white transition-opacity duration-200 hover:opacity-90 active:scale-95 focus:outline-none select-none"
            aria-label={isOpen ? data.menu_aria_labels.close : data.menu_aria_labels.open}
            aria-expanded={isOpen}
          >
            <span className="inline-block text-right w-[42px] sm:w-[48px] md:w-[54px] text-[13px] sm:text-[15px] md:text-[17px] font-medium tracking-wide text-white select-none">
              {isOpen ? data.close_button_text : data.menu_button_text}
            </span>

            {/* Outlined square box with animated bars that morph into an X */}
            <div
              className={`flex h-[28px] w-[32px] sm:h-[34px] sm:w-[38px] md:h-[38px] md:w-[42px] items-center justify-center rounded-[3px] border-[1.5px] sm:border-2 border-white transition-all duration-500 ease-[cubic-bezier(0.7,0,0.3,1)] ${
                isOpen ? 'rotate-90 bg-white/10' : 'group-hover:scale-105'
              }`}
            >
              <div className="relative flex h-[12px] w-[15px] sm:h-[14px] sm:w-[17px] md:h-[16px] md:w-[20px] flex-col justify-between items-center">
                {/* Bar 1 */}
                <span
                  className={`block h-[1.8px] sm:h-[2px] md:h-[2.5px] w-full bg-white rounded-full transition-transform duration-500 origin-center ${
                    isOpen ? 'translate-y-[5.1px] sm:translate-y-[6px] md:translate-y-[6.75px] rotate-45' : ''
                  }`}
                />
                {/* Bar 2 (fades out when open) */}
                <span
                  className={`block h-[1.8px] sm:h-[2px] md:h-[2.5px] w-full bg-white rounded-full transition-opacity duration-300 ${
                    isOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                {/* Bar 3 */}
                <span
                  className={`block h-[1.8px] sm:h-[2px] md:h-[2.5px] w-full bg-white rounded-full transition-transform duration-500 origin-center ${
                    isOpen ? '-translate-y-[5.1px] sm:-translate-y-[6px] md:-translate-y-[6.75px] -rotate-45' : ''
                  }`}
                />
              </div>
            </div>
          </button>
        </div>
      </header>

      {/* ---------------- Fullscreen Dropdown Tile (Smooth 60/120fps GPU curtain drop) ---------------- */}
      <div
        className={`motorsport-menu-tile fixed inset-0 z-40 bg-[#014d2e] text-white flex flex-col justify-between overflow-hidden h-[100dvh] w-full pt-[64px] sm:pt-[76px] md:pt-[86px] pb-3 sm:pb-5 ${
          isOpen ? 'is-open' : ''
        }`}
        aria-hidden={!isOpen}
      >
        {/* Subtle Architectural Vertical Grid Lines */}
        <div
          className={`pointer-events-none absolute inset-0 grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 h-full w-full transition-opacity duration-700 ${
            isOpen ? 'opacity-100 delay-200' : 'opacity-0 delay-0'
          }`}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="border-r border-white/[0.05] h-full" />
          ))}
        </div>

        {/* Ambient Glow Effects */}
        <div
          className={`pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-[#00ff87]/10 blur-[120px] transition-opacity duration-700 ${
            isOpen ? 'opacity-100 delay-200' : 'opacity-0 delay-0'
          }`}
        />
        <div
          className={`pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-[#00ff87]/10 blur-[120px] transition-opacity duration-700 ${
            isOpen ? 'opacity-100 delay-200' : 'opacity-0 delay-0'
          }`}
        />

        {/* Centered Navigation Links List */}
        <div className="relative z-10 my-auto flex w-full flex-col items-center justify-center px-4 sm:px-8 py-1">
          <ul className="motorsport-nav-ul flex flex-col items-center justify-center space-y-1 sm:space-y-1.5 md:space-y-2">
            {navLinks.map((link, idx) => (
              <li key={link.name} className="motorsport-nav-li flex items-center justify-center">
                <div className="overflow-hidden py-0.5 sm:py-1">
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    style={{
                      transitionDelay: isOpen
                        ? `${0.26 + idx * 0.06}s`
                        : `${(navLinks.length - 1 - idx) * 0.03}s`,
                    }}
                    className="motorsport-nav-link group flex items-center gap-2 sm:gap-3 text-[1.3rem] sm:text-[1.65rem] md:text-[1.95rem] lg:text-[2.25rem] font-bold uppercase tracking-tight leading-snug text-white transition-all duration-300 active:scale-95"
                  >
                    {/* Index Number */}
                    <span className="text-[9px] sm:text-[10px] md:text-[11px] font-semibold font-mono tracking-widest text-[#a3e635] opacity-60 transition-all duration-300 group-hover:opacity-100">
                      {link.number || String(idx + 1).padStart(2, '0')}
                    </span>

                    {/* Link Text */}
                    <span className="relative inline-block transition-transform duration-300 group-hover:translate-x-1.5">
                      {link.name}
                    </span>

                    {/* Arrow Indicator on Hover */}
                    <span className="hidden sm:inline-block text-xs sm:text-sm md:text-base opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#a3e635]">
                      →
                    </span>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom Bar: Centered Contact Info (Email & Phone) */}
        {data.contact_info && (
          <div
            className={`relative z-10 w-full px-4 sm:px-8 lg:px-16 transition-all duration-500 ease-out ${
              isOpen ? 'opacity-100 translate-y-0 delay-500' : 'opacity-0 translate-y-3 delay-0'
            }`}
          >
            <div className="mx-auto flex max-w-[1400px] items-center justify-center pt-2.5 sm:pt-3 border-t border-white/15">
              {/* Centered Contact Pills */}
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[11px] sm:text-xs md:text-sm text-white/85">
                {data.contact_info.email && (
                  <a
                    href={`mailto:${data.contact_info.email}`}
                    className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-white/10 px-3 py-1.5 sm:px-4 sm:py-1.5 hover:bg-white/20 active:bg-white/25 transition-colors border border-white/10"
                  >
                    <Mail className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#a3e635] shrink-0" />
                    <span className="truncate max-w-[190px] sm:max-w-none">{data.contact_info.email}</span>
                  </a>
                )}
                {data.contact_info.phone && (
                  <a
                    href={`tel:${data.contact_info.phone}`}
                    className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-white/10 px-3 py-1.5 sm:px-4 sm:py-1.5 hover:bg-white/20 active:bg-white/25 transition-colors border border-white/10"
                  >
                    <Phone className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#a3e635] shrink-0" />
                    <span>{data.contact_info.phone}</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

