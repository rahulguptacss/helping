import type { Metadata } from 'next';
import { Nunito, Playfair_Display, Barlow_Condensed } from 'next/font/google';
import './globals.css';
import { common, pages } from '@/components/types';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-sans',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['600', '700', '800', '900'],
  variable: '--font-serif',
  display: 'swap',
});

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['600', '700', '800', '900'],
  variable: '--font-condensed',
  display: 'swap',
});

export const metadata: Metadata = {
  title: pages.home.metadata.title,
  description: pages.home.metadata.description,
  icons: {
    icon: common.Header.logo,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${nunito.variable} ${playfair.variable} ${barlowCondensed.variable} scroll-smooth antialiased`}>
      <body className="min-h-screen bg-white font-sans text-[#1a2e22] selection:bg-[#006837] selection:text-white">
        {children}
      </body>
    </html>
  );
}
