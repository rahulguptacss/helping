import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Mail } from 'lucide-react';
import Header from '../components/sections/Header';
import { common, pages } from '@/components/types';

const pageData = pages.not_found;

export const metadata: Metadata = {
  title: pageData.metadata.title,
  description: pageData.metadata.description,
};

/**
 * Root 404 page — handles both `notFound()` calls (e.g. unknown blog/cause slug)
 * and any unmatched URL. Fits exactly one screen (100dvh, no scroll).
 */
export default function NotFound() {
  return (
    <main className="relative flex h-[100dvh] w-full flex-col overflow-hidden bg-gradient-to-br from-[#017949] via-[#016a40] to-[#014d2e] text-white">
      {/* Header (fixed, transparent over the green background) */}
      <Header data={common.Header} />

      {/* Background: hands watermark + soft glows */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <img
          src={pageData.background_image}
          alt=""
          className="h-full w-full object-cover object-center opacity-20 mix-blend-luminosity"
        />
        <div className="absolute -top-32 -left-32 h-80 w-80 rounded-full bg-[#a3e635]/15 blur-[110px]" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#00ff87]/10 blur-[120px]" />
      </div>

      {/* Centered content */}
      <section className="relative z-10 mx-auto flex flex-1 w-full max-w-[720px] flex-col items-center justify-center px-5 pt-[60px] sm:pt-[72px] md:pt-[80px] text-center">
        {/* Giant 404 */}
        <p
          className="nf-float font-condensed font-extrabold leading-none tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 text-[120px] sm:text-[180px] md:text-[210px] [@media(max-height:640px)]:text-[96px] [@media(max-height:480px)]:text-[72px] select-none drop-shadow-[0_8px_30px_rgba(0,0,0,0.15)]"
          aria-hidden="true"
        >
          {pageData.code}
        </p>

        {/* Eyebrow pill */}
        <span
          className="nf-fade-up mt-1 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.16em] text-[#d9f99d] backdrop-blur-sm"
          style={{ animationDelay: '0.1s' }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#a3e635]" />
          {pageData.eyebrow}
        </span>

        {/* Heading */}
        <h1
          className="nf-fade-up mt-4 [@media(max-height:480px)]:mt-2 font-serif text-[28px] sm:text-[40px] md:text-[46px] [@media(max-height:480px)]:text-[24px] font-bold leading-tight tracking-tight"
          style={{ animationDelay: '0.2s' }}
        >
          {pageData.heading}
        </h1>

        {/* Description */}
        <p
          className="nf-fade-up mt-3 max-w-[520px] text-[14px] sm:text-[15.5px] leading-relaxed text-white/80"
          style={{ animationDelay: '0.3s' }}
        >
          {pageData.description}
        </p>

        {/* Actions */}
        <div
          className="nf-fade-up mt-7 sm:mt-8 [@media(max-height:480px)]:mt-4 flex w-full max-w-[360px] sm:max-w-none flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3"
          style={{ animationDelay: '0.4s' }}
        >
          <Link
            href={pageData.primary_button.href}
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3 text-[14px] sm:text-[15px] font-extrabold text-[#006837] shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.03] active:scale-95"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            <span>{pageData.primary_button.text}</span>
          </Link>
          <Link
            href={pageData.secondary_button.href}
            className="group inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/70 px-7 py-3 text-[14px] sm:text-[15px] font-bold text-white transition-all duration-300 hover:bg-white/10 hover:border-white active:scale-95"
          >
            <Mail className="h-4 w-4" />
            <span>{pageData.secondary_button.text}</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
