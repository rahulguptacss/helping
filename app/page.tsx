import Header from '../components/sections/Header';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Causes from '../components/sections/Causes';
import Stats from '../components/sections/Stats';
import Testimonials from '../components/sections/Testimonials';
import Footer from '../components/sections/Footer';
import BackToTop from '../components/ui/BackToTop';
import { common, sections } from '@/types';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      {/* 1. Header (Sticky/Fixed on scroll) */}
      <Header data={common.Header} />

      {/* 2. Hero Section */}
      <Hero data={sections.hero} />

      {/* 3. About / Movement Section (Hugging Children + Values Headline) */}
      <About data={sections.about} />

      {/* 4. Our Causes Section (Our Causes Headline + 2x2 Causes Grid) */}
      <Causes data={sections.causes} />

      {/* 5. Impact Stats (10K+ Lives, 500+ Children, 50+ Programs, 15+ Years) */}
      <Stats data={sections.stats} />

      {/* 6. Testimonials Section (Teacher Reading Photo + Quote & Author) */}
      <Testimonials data={sections.testimonials} />

      {/* 7. Footer (Centered Logo + Nav Links + Contact Pills + Follow Us + Copyright) */}
      <Footer data={common.Footer} />

      {/* Back to Top */}
      <BackToTop />
    </main>
  );
}
