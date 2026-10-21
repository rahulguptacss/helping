import data from '../components/data/data.json';

export interface NavLinkItem {
  name: string;
  href: string;
  number?: string;
}

export type LinkItem = NavLinkItem;

export interface ContactInfo {
  email: string;
  phone: string;
  address?: string;
  address_line1?: string;
  address_line2?: string;
}

export interface HeaderData {
  logo: string;
  logo_text: string;
  logo_subtext: string;
  links: NavLinkItem[];
  menu_button_text: string;
  close_button_text?: string;
  donate_button_text?: string;
  donate_button_link?: string;
  contact_info?: ContactInfo;
}

export interface SocialItem {
  name: string;
  href: string;
  icon: string;
}

export interface FooterData {
  logo: string;
  logo_text: string;
  logo_subtext: string;
  description?: string;
  contact_heading?: string;
  nav_links: NavLinkItem[];
  contact_info: ContactInfo;
  social_heading: string;
  socials: SocialItem[];
  copyright?: string;
}

export interface HeroSectionData {
  title_line1: string;
  title_line2: string;
  title_line3: string;
  button: {
    text: string;
    icon?: string;
    href: string;
  };
  image: string;
  image_alt: string;
  bg_watermark?: string;
}

export interface KeyFeatureItem {
  title: string;
  description: string;
}

export interface AboutSectionData {
  badge: string;
  title_line1: string;
  title_line2: string;
  title_line3: string;
  title_line4: string;
  join_badge: {
    text: string;
    avatars: string;
  };
  description: string;
  image: string;
  image_alt: string;
  key_features?: KeyFeatureItem[];
}

export interface CauseItem {
  id: string;
  title: string;
  tagline?: string;
  description: string;
  image: string;
  href: string;
}

export interface CausesSectionData {
  eyebrow: string;
  title: string;
  description?: string;
  button: {
    text: string;
    href: string;
  };
  items: CauseItem[];
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
  line1?: string;
  line2?: string;
}

export interface StatsSectionData {
  items: StatItem[];
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
}

export interface TestimonialsSectionData {
  quote?: string;
  author?: string;
  role?: string;
  image: string;
  image_alt: string;
  items: TestimonialItem[];
}

export interface PageMeta {
  title: string;
  pageName: string;
  metadata: {
    title: string;
    description: string;
  };
}

export interface SectionsData {
  hero: HeroSectionData;
  about: AboutSectionData;
  causes: CausesSectionData;
  stats: StatsSectionData;
  testimonials: TestimonialsSectionData;
}

export interface SiteCommonData {
  Header: HeaderData;
  Footer: FooterData;
}

export interface SiteTemplateData {
  pages: {
    home: PageMeta;
    [key: string]: PageMeta;
  };
  sections: SectionsData;
}

export interface SiteCategoriesData {
  NGO: {
    templateComponents: {
      'template-1': SiteTemplateData;
      [key: string]: any;
    };
  };
  [key: string]: any;
}

export interface SiteData {
  common: SiteCommonData;
  categories: SiteCategoriesData;
}

export const siteJson = data as unknown as SiteData;
export const common = siteJson.common;
export const template = siteJson.categories.NGO.templateComponents['template-1'];
export const pages = template.pages;
export const sections = template.sections;
