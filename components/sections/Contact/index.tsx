'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ContactSectionData } from '@/components/types';

interface ContactProps {
  data: ContactSectionData;
}

export default function Contact({ data }: ContactProps) {
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Custom Dropdown State
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const subjectOptions = data?.form?.inputs?.subject?.options || [
    'General Inquiry',
    'Donation & Sponsorship',
    'Volunteer Opportunities',
    'CSR & Corporate Partnership',
    'Media & Press',
    'Emergency Assistance',
  ];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsDropdownOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Strict Phone Number Input (Only digits, +, space, and dashes allowed)
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // Allow only numbers, plus sign, space, and hyphens
    const cleanVal = val.replace(/[^0-9+\s-]/g, '');
    setFormData((prev) => ({ ...prev, phone: cleanVal }));
  };

  const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allowed control keys: Backspace, Tab, Enter, Escape, Arrow keys, Delete
    const allowedControls = ['Backspace', 'Tab', 'Enter', 'Escape', 'ArrowLeft', 'ArrowRight', 'Delete'];
    if (allowedControls.includes(e.key)) return;
    // Allow Ctrl/Cmd key combos (Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+Z)
    if (e.ctrlKey || e.metaKey) return;
    // Allow numbers (0-9), plus (+), dash (-), space
    if (!/^[0-9+\s-]$/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }, 700);
  };

  return (
    <section id="contact" className="relative w-full overflow-hidden bg-[#f7f3ec] pt-7 sm:pt-9 lg:pt-11 pb-12 sm:pb-16 lg:pb-20">
      <div className="mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================
            1. Section Header: Eyebrow, Heading & Leaf Decorations
            ======================================================== */}
        <div className="relative flex flex-col items-center text-center">
          
          {/* Subtle Decorative Botanical Leaves (Left & Right) */}
          <div className="hidden md:block absolute left-4 lg:left-12 top-2 pointer-events-none opacity-30 select-none">
            <svg width="72" height="72" viewBox="0 0 100 100" fill="none" stroke="#1a5d3a" strokeWidth="2.2" strokeLinecap="round">
              <path d="M50 85 C50 85, 30 65, 30 40 C30 20, 50 15, 50 15 C50 15, 70 20, 70 40 C70 65, 50 85, 50 85 Z" />
              <path d="M50 85 L50 22" />
              <path d="M50 50 Q38 42, 34 35" />
              <path d="M50 62 Q62 54, 66 47" />
              <path d="M50 38 Q60 32, 64 26" />
            </svg>
          </div>
          <div className="hidden md:block absolute right-4 lg:right-12 top-2 pointer-events-none opacity-30 select-none">
            <svg width="72" height="72" viewBox="0 0 100 100" fill="none" stroke="#1a5d3a" strokeWidth="2.2" strokeLinecap="round" className="scale-x-[-1]">
              <path d="M50 85 C50 85, 30 65, 30 40 C30 20, 50 15, 50 15 C50 15, 70 20, 70 40 C70 65, 50 85, 50 85 Z" />
              <path d="M50 85 L50 22" />
              <path d="M50 50 Q38 42, 34 35" />
              <path d="M50 62 Q62 54, 66 47" />
              <path d="M50 38 Q60 32, 64 26" />
            </svg>
          </div>

          {/* Eyebrow: — CONTACT US — */}
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
              {data.eyebrow || 'CONTACT US'}
            </motion.span>
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="w-8 sm:w-12 h-[1.5px] bg-[#1a5d3a] origin-left"
            />
          </div>

          {/* Main Title: Get in Touch with Us */}
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="mt-2 font-serif text-[28px] xs:text-[32px] sm:text-[38px] md:text-[44px] font-bold text-[#113824] tracking-tight leading-tight"
          >
            <span>{data.title_prefix || 'Get in Touch '}</span>
            <span className="text-[#1a5d3a]">{data.title_highlight || 'with Us'}</span>
          </motion.h2>

          {/* Subtitle Description */}
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
        </div>

        {/* ========================================================
            2. Top 3 Contact Cards (Location, Phone, Email) - Responsive & Animated
            ======================================================== */}
        <div className="mt-7 sm:mt-9 grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 lg:gap-4.5 items-stretch">
          {data.cards.map((card, idx) => {
            const isPhone = card.id === 'phone' || card.title.toLowerCase().includes('phone');
            return (
              <motion.div
                key={card.id || idx}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4, scale: 1.012, transition: { duration: 0.22 } }}
                className="group relative overflow-hidden rounded-[18px] sm:rounded-[20px] bg-[#f6f9f6] border border-[#e2ede3] px-4.5 py-4 sm:px-5 sm:py-4.5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgba(17,56,36,0.08)] transition-all duration-300 flex items-center gap-3.5 sm:gap-4 min-h-[105px] sm:min-h-[112px]"
              >
                {/* Botanical Leaf Watermark in Bottom Right Corner */}
                {isPhone ? (
                  <svg
                    className="absolute -bottom-1 -right-1 w-18 h-18 sm:w-20 sm:h-20 text-[#cde3d1] pointer-events-none select-none group-hover:scale-105 transition-transform duration-300"
                    viewBox="0 0 100 100"
                    fill="currentColor"
                  >
                    <path d="M100 100 Q80 70, 70 40 Q85 35, 95 65 Z" opacity="0.65" />
                    <path d="M70 40 L68 95" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.75" />
                  </svg>
                ) : (
                  <svg
                    className="absolute -bottom-1 -right-1 w-20 h-20 sm:w-22 sm:h-22 text-[#cde3d1] pointer-events-none select-none group-hover:scale-105 transition-transform duration-300"
                    viewBox="0 0 100 100"
                    fill="currentColor"
                  >
                    <path d="M100 100 C72 94, 48 80, 42 50 C58 45, 82 60, 96 85 Z" opacity="0.7" />
                    <path d="M100 70 C85 50, 70 30, 52 20 C62 10, 86 24, 98 48 Z" opacity="0.5" />
                  </svg>
                )}

                {/* Circle Icon Badge */}
                <div
                  className={`relative shrink-0 flex h-[46px] w-[46px] sm:h-[50px] sm:w-[50px] items-center justify-center rounded-full text-white shadow-sm transition-all duration-300 group-hover:scale-108 group-hover:rotate-6 ${
                    isPhone ? 'bg-[#2a8342]' : 'bg-[#023c28]'
                  }`}
                >
                  {card.icon === 'map-pin' && (
                    <svg className="w-4.5 h-4.5 sm:w-5 sm:h-5 stroke-current stroke-[2] fill-none" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                      <circle cx="12" cy="9" r="2.5" />
                    </svg>
                  )}
                  {card.icon === 'phone' && (
                    <svg className="w-4.5 h-4.5 sm:w-5 sm:h-5 stroke-current stroke-[2] fill-none" viewBox="0 0 24 24">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  )}
                  {card.icon === 'mail' && (
                    <svg className="w-4.5 h-4.5 sm:w-5 sm:h-5 stroke-current stroke-[2] fill-none" viewBox="0 0 24 24">
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <polyline points="3 7 12 13 21 7" />
                    </svg>
                  )}
                </div>

                {/* Text Info */}
                <div className="relative z-10 flex flex-col min-w-0 pr-1">
                  <h3 className="font-sans font-bold text-[15px] sm:text-[16px] text-[#063824] leading-tight tracking-tight">
                    {card.title}
                  </h3>
                  <div className="mt-1 flex flex-col space-y-0.5 text-[12px] sm:text-[12.5px] leading-[1.38] text-[#4d6055] font-normal">
                    {card.details.map((line, i) => (
                      <span key={i} className="break-words">
                        {line}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ========================================================
            3. Contact Form & Right Quote Banner (Compact Height, Responsive & Animated)
            ======================================================== */}
        <div className="mt-8 sm:mt-10 md:mt-11 grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-6.5 items-stretch">
          
          {/* Left Column: Form Card (Compact Height) */}
          <motion.div
            initial={{ opacity: 0, x: -22 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 flex flex-col justify-between rounded-[20px] sm:rounded-[24px] bg-[#fcfbf7] border border-[#e8e2d8] p-4.5 sm:p-6 md:p-6.5 shadow-[0_4px_18px_rgba(0,0,0,0.03)]"
          >
            <div>
              {/* Form Eyebrow */}
              <span className="text-[10.5px] sm:text-[11.5px] font-bold tracking-[0.16em] uppercase text-[#1a5d3a]">
                {data.form?.eyebrow || 'SEND US A MESSAGE —'}
              </span>

              {/* Form Title */}
              <h3 className="mt-0.5 font-serif text-[24px] sm:text-[28px] md:text-[31px] font-bold text-[#113824] tracking-tight leading-tight">
                <span>{data.form?.title_prefix || 'Contact '}</span>
                <span className="text-[#1a5d3a]">{data.form?.title_highlight || 'Form'}</span>
              </h3>

              {/* Form Description */}
              <p className="mt-1 text-[12px] sm:text-[13px] text-[#55635b] leading-relaxed">
                {data.form?.description || 'Fill out the form below and our team will get back to you as soon as possible.'}
              </p>

              {/* Success Message Banner */}
              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="mt-3 p-3 rounded-[12px] bg-emerald-50 border border-emerald-300 text-emerald-800 text-[12.5px] flex items-center gap-2"
                  >
                    <svg className="w-4.5 h-4.5 text-emerald-600 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Thank you! Your message has been sent successfully. Our team will contact you shortly.</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form Inputs (Compact Spacing) */}
              <form onSubmit={handleSubmit} className="mt-4 sm:mt-5 space-y-3 sm:space-y-3.5">
                
                {/* Row 1: Full Name & Email Address */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                  {/* Full Name */}
                  <div className="relative flex items-center">
                    <div className="absolute left-3.5 text-[#8c9b91] pointer-events-none">
                      <svg className="w-4 h-4 stroke-current stroke-[2] fill-none" viewBox="0 0 24 24">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      required
                      placeholder={data.form?.inputs?.name?.placeholder || 'Full Name *'}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-[11px] bg-[#fbfaf6] border border-[#e4ded5] pl-10 pr-3.5 py-2.2 sm:py-2.5 text-[13px] text-[#113824] placeholder-[#8c9b91] focus:border-[#1a5d3a] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1a5d3a]/30 transition-all duration-200"
                    />
                  </div>

                  {/* Email Address */}
                  <div className="relative flex items-center">
                    <div className="absolute left-3.5 text-[#8c9b91] pointer-events-none">
                      <svg className="w-4 h-4 stroke-current stroke-[2] fill-none" viewBox="0 0 24 24">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </div>
                    <input
                      type="email"
                      required
                      placeholder={data.form?.inputs?.email?.placeholder || 'Email Address *'}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-[11px] bg-[#fbfaf6] border border-[#e4ded5] pl-10 pr-3.5 py-2.2 sm:py-2.5 text-[13px] text-[#113824] placeholder-[#8c9b91] focus:border-[#1a5d3a] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1a5d3a]/30 transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Row 2: Phone Number (Number Only) & Subject (Custom Dropdown) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                  {/* Phone Number: STRICTLY NUMBERS ONLY */}
                  <div className="relative flex items-center">
                    <div className="absolute left-3.5 text-[#8c9b91] pointer-events-none">
                      <svg className="w-4 h-4 stroke-current stroke-[2] fill-none" viewBox="0 0 24 24">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </div>
                    <input
                      type="tel"
                      inputMode="numeric"
                      required
                      placeholder={data.form?.inputs?.phone?.placeholder || 'Phone Number *'}
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      onKeyDown={handlePhoneKeyDown}
                      className="w-full rounded-[11px] bg-[#fbfaf6] border border-[#e4ded5] pl-10 pr-3.5 py-2.2 sm:py-2.5 text-[13px] text-[#113824] placeholder-[#8c9b91] focus:border-[#1a5d3a] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1a5d3a]/30 transition-all duration-200"
                    />
                  </div>

                  {/* Subject: BEAUTIFULLY DESIGNED CUSTOM DROPDOWN */}
                  <div ref={dropdownRef} className="relative">
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen((prev) => !prev)}
                      className={`w-full flex items-center justify-between rounded-[11px] bg-[#fbfaf6] border pl-10 pr-3.5 py-2.2 sm:py-2.5 text-[13px] text-left transition-all duration-200 ${
                        isDropdownOpen
                          ? 'border-[#1a5d3a] bg-white ring-1 ring-[#1a5d3a]/30'
                          : 'border-[#e4ded5] hover:border-[#1a5d3a]/60'
                      }`}
                    >
                      {/* Left Icon */}
                      <span className="absolute left-3.5 text-[#8c9b91] pointer-events-none">
                        <svg className="w-4 h-4 stroke-current stroke-[2] fill-none" viewBox="0 0 24 24">
                          <line x1="8" y1="6" x2="21" y2="6" />
                          <line x1="8" y1="12" x2="21" y2="12" />
                          <line x1="8" y1="18" x2="21" y2="18" />
                          <line x1="3" y1="6" x2="3.01" y2="6" />
                          <line x1="3" y1="12" x2="3.01" y2="12" />
                          <line x1="3" y1="18" x2="3.01" y2="18" />
                        </svg>
                      </span>

                      {/* Selected Value or Placeholder */}
                      <span className={formData.subject ? 'text-[#113824] font-medium truncate' : 'text-[#8c9b91] truncate'}>
                        {formData.subject || (data.form?.inputs?.subject?.placeholder || 'Subject *')}
                      </span>

                      {/* Animated Chevron Down */}
                      <motion.span
                        animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-[#8c9b91] shrink-0 ml-2"
                      >
                        <svg className="w-3.5 h-3.5 stroke-current stroke-[2] fill-none" viewBox="0 0 24 24">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </motion.span>
                    </button>

                    {/* Custom Dropdown Menu with AnimatePresence */}
                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -6, scale: 0.98 }}
                          animate={{ opacity: 1, y: 4, scale: 1 }}
                          exit={{ opacity: 0, y: -6, scale: 0.98 }}
                          transition={{ duration: 0.18, ease: 'easeOut' }}
                          className="absolute left-0 right-0 z-50 overflow-hidden rounded-[13px] bg-white/95 backdrop-blur-md border border-[#1a5d3a]/25 shadow-[0_12px_36px_rgba(17,56,36,0.12)] p-1.5 space-y-0.5"
                        >
                          {subjectOptions.map((opt) => {
                            const isSelected = formData.subject === opt;
                            return (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => {
                                  setFormData((prev) => ({ ...prev, subject: opt }));
                                  setIsDropdownOpen(false);
                                }}
                                className={`w-full flex items-center justify-between px-3 py-1.5 sm:py-2 text-[12.5px] rounded-[8px] transition-colors duration-150 text-left ${
                                  isSelected
                                    ? 'bg-[#1a5d3a] text-white font-medium'
                                    : 'text-[#113824] hover:bg-[#1a5d3a]/8 hover:text-[#1a5d3a]'
                                }`}
                              >
                                <span>{opt}</span>
                                {isSelected && (
                                  <svg className="w-3.5 h-3.5 stroke-current stroke-[2.5] fill-none" viewBox="0 0 24 24">
                                    <polyline points="20 6 9 17 4 12" />
                                  </svg>
                                )}
                              </button>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Row 3: Your Message Textarea (Compact Rows) */}
                <div className="relative">
                  <div className="absolute left-3.5 top-2.5 text-[#8c9b91] pointer-events-none">
                    <svg className="w-4 h-4 stroke-current stroke-[2] fill-none" viewBox="0 0 24 24">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </div>
                  <textarea
                    required
                    rows={3}
                    placeholder={data.form?.inputs?.message?.placeholder || 'Your Message *'}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-[11px] bg-[#fbfaf6] border border-[#e4ded5] pl-10 pr-3.5 py-2.2 sm:py-2.5 text-[13px] text-[#113824] placeholder-[#8c9b91] focus:border-[#1a5d3a] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1a5d3a]/30 transition-all duration-200 resize-none"
                  />
                </div>

                {/* Submit Button: Sleek Pill with Right Arrow */}
                <div className="pt-0.5">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.025 }}
                    whileTap={{ scale: 0.97 }}
                    className="group inline-flex items-center gap-2 px-5.5 sm:px-6.5 py-2.5 rounded-full bg-[#113824] hover:bg-[#0d2e1d] text-white text-[12.5px] sm:text-[13px] font-medium shadow-[0_4px_14px_rgba(17,56,36,0.2)] transition-all duration-200 disabled:opacity-70"
                  >
                    <span>{isSubmitting ? 'Sending...' : (data.form?.submit_button?.text || 'Send Message')}</span>
                    <svg className="w-3.5 h-3.5 stroke-current stroke-[2] fill-none group-hover:translate-x-1 transition-transform duration-200" viewBox="0 0 24 24">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </motion.button>
                </div>

              </form>
            </div>
          </motion.div>

          {/* Right Column: Quote Photo Banner (Reduced Height, 100% Dynamic Quote from data.json & Original Image) */}
          <motion.div
            initial={{ opacity: 0, x: 22 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="group lg:col-span-5 relative overflow-hidden rounded-[20px] sm:rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] bg-[#0d442d] h-[340px] xs:h-[370px] sm:h-[410px] lg:h-full lg:max-h-[460px] flex items-stretch justify-center"
          >
            {/* Background Image: Original Volunteer & Child Photo */}
            <img
              src={data.banner?.image || '/contact/contact-banner.webp'}
              alt="Helping Hands Volunteer with Child"
              className="w-full h-full object-cover object-top block select-none group-hover:scale-103 transition-transform duration-700 ease-out"
            />

            {/* Organic Green Wave Curve Overlay covering the bottom area matching screenshot */}
            <div className="absolute inset-x-0 bottom-0 pointer-events-none select-none overflow-hidden h-[180px] xs:h-[195px] sm:h-[215px]">
              <svg
                viewBox="0 0 500 240"
                preserveAspectRatio="none"
                className="w-full h-full block"
              >
                <defs>
                  <linearGradient id="quoteWaveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0a4630" stopOpacity="0.98" />
                    <stop offset="55%" stopColor="#093f2b" stopOpacity="0.98" />
                    <stop offset="100%" stopColor="#073322" stopOpacity="0.99" />
                  </linearGradient>
                </defs>
                {/* Dark Forest Green Wave that covers the bottom area smoothly */}
                <path
                  d="M0,42 C80,12 170,18 240,65 C315,115 410,135 500,150 L500,240 L0,240 Z"
                  fill="url(#quoteWaveGrad)"
                />
                {/* Emerald Green Accent in Bottom-Right Corner matching Screenshot */}
                <path
                  d="M430,240 L500,175 L500,240 Z"
                  fill="#16a34a"
                  opacity="0.95"
                />
              </svg>
            </div>

            {/* Dynamic Quote Content (Driven 100% from data.json & Animated) */}
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 lg:p-6.5 z-10 flex flex-col justify-end">
              {/* White Double Quotation Mark */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                animate={{ y: [0, -3, 0] }}
                className="text-white drop-shadow-sm flex items-center"
              >
                <svg className="w-7 h-7 sm:w-8 sm:h-8 fill-white" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </motion.div>

              {/* Dynamic Quote Text from data.json */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-1.5 sm:mt-2 text-white font-sans font-bold text-[13.5px] xs:text-[14.5px] sm:text-[16px] leading-[1.35] tracking-tight max-w-[320px] drop-shadow-sm"
              >
                {data.banner?.quote || 'Together we can create brighter futures for stronger communities.'}
              </motion.p>

              {/* Horizontal Underline Bar */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-2 sm:mt-2.5 w-10 sm:w-11 h-[2px] bg-white/80 rounded-full origin-left"
              />
            </div>
          </motion.div>

        </div>

        {/* ========================================================
            4. Map Section (Original Interactive Google Map Embed called from data.json)
            ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 sm:mt-9 md:mt-10 overflow-hidden rounded-[18px] sm:rounded-[22px] border border-[#e8e2d8] shadow-[0_4px_18px_rgba(0,0,0,0.03)] bg-white"
        >
          <div className="relative w-full h-[220px] sm:h-[260px] md:h-[310px] overflow-hidden">
            {/* Interactive Original Google Map iframe called from data.json */}
            <iframe
              title="Helping Hands Location Map"
              src={
                data.map?.embed_url ||
                'https://maps.google.com/maps?q=123+Education+Lane,+New+York,+NY+10001&t=&z=15&ie=UTF8&iwloc=&output=embed'
              }
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full object-cover"
            />

            {/* Top-left Location Floating Badge called dynamically from data.json */}
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
              className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 rounded-[11px] sm:rounded-[12px] bg-white/95 backdrop-blur-md px-3 py-2 sm:px-3.5 sm:py-2.5 shadow-md border border-black/5 max-w-[210px] sm:max-w-[260px]"
            >
              <div className="flex items-start justify-between gap-2.5 sm:gap-3">
                <div>
                  <h4 className="font-bold text-[11.5px] sm:text-[12.5px] text-[#113824] leading-tight">
                    {data.map?.location_name || '123 Education Lane'}
                  </h4>
                  <p className="mt-0.5 text-[10px] sm:text-[11px] text-[#55635b] leading-tight truncate">
                    {data.map?.address || 'New York, NY 10001'}
                  </p>
                </div>
                <a
                  href={data.map?.directions_url || 'https://www.google.com/maps/dir/?api=1&destination=123+Education+Lane,+New+York,+NY+10001'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center shrink-0 text-[#1a5d3a] hover:text-[#0d442d] transition-colors"
                >
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-current stroke-[2.2] fill-none" viewBox="0 0 24 24">
                    <polygon points="3 11 22 2 13 21 11 13 3 11" />
                  </svg>
                  <span className="text-[8.5px] sm:text-[9px] font-semibold uppercase mt-0.5">Directions</span>
                </a>
              </div>
              <a
                href={data.map?.directions_url || 'https://www.google.com/maps/dir/?api=1&destination=123+Education+Lane,+New+York,+NY+10001'}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block text-[9.5px] sm:text-[10px] text-[#1a5d3a] font-medium hover:underline"
              >
                View larger map
              </a>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
