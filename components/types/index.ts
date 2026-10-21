import data from '../data/data.json';

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
  category?: string;
  href?: string;
}

export interface CausesFeatureItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface CausesSectionData {
  eyebrow: string;
  title: string;
  description?: string;
  button?: {
    text: string;
    href: string;
  };
  page_heading?: {
    eyebrow?: string;
    title_prefix?: string;
    title_highlight?: string;
    description?: string;
  };
  categories?: string[];
  items: CauseItem[];
  why_support?: {
    eyebrow?: string;
    title_prefix?: string;
    title_highlight?: string;
    features: CausesFeatureItem[];
  };
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

export interface PageComponentItem {
  key: string;
  component: string;
}

export type PageComponent = PageComponentItem;

export interface PageMeta {
  title: string;
  pageName: string;
  metadata: {
    title: string;
    description: string;
  };
  components?: PageComponentItem[];
  [key: string]: any;
}

export interface BreadcrumbLink {
  name: string;
  href?: string;
}

export interface BreadcrumbData {
  title: string;
  breadcrumb?: string;
  path?: string;
  links?: BreadcrumbLink[];
  image?: string;
  bottom_shape?: string;
}

export interface AboutStoryData {
  title: string;
  paragraphs: string[];
  image: string;
  image_alt?: string;
  gallery?: AboutGalleryItem[];
  items?: AboutGalleryItem[];
}

export interface AboutGalleryItem {
  id: string;
  image: string;
  alt: string;
}

export interface AboutPageData extends PageMeta {
  breadcrumb?: BreadcrumbData;
  story?: AboutStoryData;
  gallery?: AboutGalleryItem[];
  components?: PageComponentItem[];
}

export interface TeamMemberSocial {
  name: string;
  href: string;
  icon: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  socials?: TeamMemberSocial[];
}

export interface TeamSectionData {
  eyebrow?: string;
  title: string;
  description?: string;
  members: TeamMember[];
}

export interface TeamPageData extends PageMeta {
  breadcrumb?: BreadcrumbData;
  team?: TeamSectionData;
  components?: PageComponentItem[];
}

export interface GalleryItem {
  id: string | number;
  title: string;
  image: string;
  category: string;
  categories?: string[];
  aspect?: string;
  flex?: number;
  column?: number;
  alt?: string;
}

export interface GallerySectionData {
  eyebrow?: string;
  title: string;
  description?: string;
  categories: string[];
  load_more_button?: {
    text: string;
    icon?: string;
  };
  items: GalleryItem[];
}

export interface GalleryPageData extends PageMeta {
  breadcrumb?: BreadcrumbData;
  gallery?: GallerySectionData;
  components?: PageComponentItem[];
}

export interface ContactCardItem {
  id: string;
  title: string;
  icon: string;
  details: string[];
}

export interface ContactFormData {
  eyebrow?: string;
  title_prefix?: string;
  title_highlight?: string;
  description?: string;
  inputs?: {
    name?: { label?: string; placeholder?: string };
    email?: { label?: string; placeholder?: string };
    phone?: { label?: string; placeholder?: string };
    subject?: { label?: string; placeholder?: string; options?: string[] };
    message?: { label?: string; placeholder?: string };
  };
  submit_button?: { text: string; icon?: string };
}

export interface ContactBannerData {
  image: string;
  quote?: string;
}

export interface ContactMapData {
  image?: string;
  embed_url?: string;
  location_name?: string;
  address?: string;
  directions_url?: string;
}

export interface ContactSectionData {
  eyebrow?: string;
  title_prefix?: string;
  title_highlight?: string;
  description?: string;
  cards: ContactCardItem[];
  form: ContactFormData;
  banner: ContactBannerData;
  map?: ContactMapData;
}

export interface ContactPageData extends PageMeta {
  breadcrumb?: BreadcrumbData;
  contact?: ContactSectionData;
  components?: PageComponentItem[];
}

export interface FaqItem {
  id: string;
  number: string;
  question: string;
  answer: string;
}

export interface FaqSectionData {
  eyebrow?: string;
  title_prefix?: string;
  title_highlight?: string;
  description?: string;
  image?: string;
  image_alt?: string;
  items: FaqItem[];
}

export interface FaqPageData extends PageMeta {
  breadcrumb?: BreadcrumbData;
  faq?: FaqSectionData;
  components?: PageComponentItem[];
}

export interface CausesPageData extends PageMeta {
  breadcrumb?: BreadcrumbData;
  causes?: CausesSectionData;
  components?: PageComponentItem[];
}

export interface CauseDetailsImpactItem {
  value: string;
  label: string;
  icon: string;
}

export interface CauseDetailsStepItem {
  number: string;
  title: string;
  description: string;
}

export interface CauseDetailsSectionData {
  slug?: string;
  badge: string;
  title: string;
  description: string;
  image: string;
  about: {
    eyebrow: string;
    title: string;
    description: string;
    image: string;
  };
  impact: {
    eyebrow: string;
    title: string;
    subtitle?: string;
    items: CauseDetailsImpactItem[];
  };
  approach: {
    eyebrow: string;
    title: string;
    image: string;
    steps: CauseDetailsStepItem[];
  };
}

export interface BlogItem {
  id: string;
  slug: string;
  title: string;
  category?: string;
  date: string;
  comments_count?: string;
  author?: string;
  image: string;
  excerpt: string;
  href: string;
}

export interface RecentPostItem {
  slug: string;
  title: string;
  date: string;
  image: string;
  href: string;
}

export interface BlogsSectionData {
  eyebrow?: string;
  title?: string;
  recent_posts_heading?: string;
  items: BlogItem[];
  recent_posts?: RecentPostItem[];
}

export interface BlogQuoteData {
  text: string;
  author: string;
}

export interface BlogDetailData {
  slug: string;
  category?: string;
  badge?: string;
  title: string;
  author: string;
  date: string;
  comments_count?: string;
  hero_image: string;
  lead?: string;
  paragraphs: string[];
  impact_heading?: string;
  impact_text?: string;
  quote?: BlogQuoteData;
  inset_images?: string[];
  closing_text?: string;
}

export interface BlogPageData extends PageMeta {
  breadcrumb?: BreadcrumbData;
  blogs?: BlogsSectionData;
  components?: PageComponentItem[];
}

export interface BlogDetailsPageData extends PageMeta {
  breadcrumb?: BreadcrumbData;
  blog_detail?: BlogDetailData;
  components?: PageComponentItem[];
}

export interface CausesDetailsPageData extends PageMeta {
  breadcrumb?: BreadcrumbData;
  cause_details?: CauseDetailsSectionData;
  components?: PageComponentItem[];
}

export interface SectionsData {
  hero: HeroSectionData;
  about: AboutSectionData;
  causes: CausesSectionData;
  stats: StatsSectionData;
  testimonials: TestimonialsSectionData;
  breadcrumb?: BreadcrumbData;
  our_story?: AboutStoryData;
  story?: AboutStoryData;
  about_gallery?: { items: AboutGalleryItem[] } | AboutGalleryItem[];
  gallery?: GallerySectionData | AboutGalleryItem[] | any;
  gallery_section?: GallerySectionData;
  team?: TeamSectionData;
  contact?: ContactSectionData;
  faq?: FaqSectionData;
  cause_details?: CauseDetailsSectionData;
  causes_details?: CauseDetailsSectionData[];
  blogs?: BlogsSectionData;
  blog_details?: BlogDetailData[];
  [key: string]: any;
}

export interface SiteCommonData {
  Header: HeaderData;
  Footer: FooterData;
}

export interface SiteTemplateData {
  pages: {
    home: PageMeta;
    about?: AboutPageData;
    team?: TeamPageData;
    gallery?: GalleryPageData;
    contact?: ContactPageData;
    faq?: FaqPageData;
    faqs?: FaqPageData;
    causes?: CausesPageData;
    our_causes?: CausesPageData;
    causes_details?: CausesDetailsPageData;
    blog?: BlogPageData;
    blog_detail?: BlogDetailsPageData;
    [key: string]: any;
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

export function toSlug(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export function getCauseBySlug(slug: string): CauseDetailsSectionData | undefined {
  const normalized = toSlug(slug);
  const list: CauseDetailsSectionData[] =
    (sections as unknown as { causes_details?: CauseDetailsSectionData[] }).causes_details || [];
  return (
    list.find(
      (c) =>
        c.slug === slug ||
        toSlug(c.slug || '') === normalized ||
        toSlug(c.badge || '') === normalized ||
        toSlug(c.title || '') === normalized
    ) ||
    (sections as unknown as { cause_details?: CauseDetailsSectionData }).cause_details ||
    list[0]
  );
}

export function getAllCauseSlugs(): string[] {
  const list: CauseDetailsSectionData[] =
    (sections as unknown as { causes_details?: CauseDetailsSectionData[] }).causes_details || [];
  const slugs = list.map((c) => c.slug || toSlug(c.badge)).filter(Boolean);
  if (slugs.length === 0) {
    slugs.push('education');
  }
  return slugs;
}

export function getBlogBySlug(slug: string): BlogDetailData | undefined {
  const normalized = toSlug(slug);
  const list: BlogDetailData[] =
    (sections as unknown as { blog_details?: BlogDetailData[] }).blog_details || [];
  return (
    list.find(
      (b) =>
        b.slug === slug ||
        toSlug(b.slug || '') === normalized ||
        toSlug(b.title || '') === normalized
    ) || list[0]
  );
}

export function getAllBlogSlugs(): string[] {
  const list: BlogDetailData[] =
    (sections as unknown as { blog_details?: BlogDetailData[] }).blog_details || [];
  const slugs = list.map((b) => b.slug || toSlug(b.title)).filter(Boolean);
  if (slugs.length === 0) {
    slugs.push('learn-exactly-how-we-made-event');
  }
  return slugs;
}
