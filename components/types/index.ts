import data from '../data/data.json';

/* =========================================================================
   Common (Header / Footer / BackToTop)
   ========================================================================= */

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
  logo_link: string;
  logo_text: string;
  logo_subtext: string;
  links: NavLinkItem[];
  menu_button_text: string;
  close_button_text: string;
  menu_aria_labels: {
    open: string;
    close: string;
  };
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
  logo_link: string;
  logo_text: string;
  logo_subtext: string;
  description?: string;
  contact_heading: string;
  nav_links: NavLinkItem[];
  contact_info: ContactInfo;
  social_heading: string;
  socials: SocialItem[];
  copyright: string;
}

export interface BackToTopData {
  aria_label: string;
}

/* =========================================================================
   Home Sections
   ========================================================================= */

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
    avatars_alt: string;
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
  category: string;
  href: string;
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
  button: {
    text: string;
    href: string;
  };
  read_more_text: string;
  empty_text: string;
  page_heading: {
    eyebrow: string;
    title_prefix: string;
    title_highlight: string;
    description?: string;
  };
  /** First entry is treated as the "show all" filter */
  categories: string[];
  /** Accessible label for the mobile filter dropdown */
  filter_label: string;
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
  image: string;
  image_alt: string;
  items: TestimonialItem[];
}

/* =========================================================================
   Pages
   ========================================================================= */

export interface PageComponentItem {
  key: string;
  component: string;
}

export type PageComponent = PageComponentItem;

export interface PageMetadata {
  title: string;
  description: string;
  /** e.g. "%s | Helping Hands" — `%s` is replaced with the dynamic title */
  title_template?: string;
}

export interface BreadcrumbData {
  title: string;
  /** Slash separated trail, e.g. "Home / About Us" */
  path: string;
  /** Used on dynamic pages: final trail = `${path_prefix} / ${dynamic title}` */
  path_prefix?: string;
  image: string;
  bottom_shape: string;
}

export interface PageMeta {
  title: string;
  pageName: string;
  metadata: PageMetadata;
  breadcrumb?: BreadcrumbData;
  components: PageComponentItem[];
}

/** Pages that render a breadcrumb banner always define one in data.json */
export interface PageWithBreadcrumb extends PageMeta {
  breadcrumb: BreadcrumbData;
}

export type AboutPageData = PageWithBreadcrumb;
export type TeamPageData = PageWithBreadcrumb;
export type GalleryPageData = PageWithBreadcrumb;
export type ContactPageData = PageWithBreadcrumb;
export type FaqPageData = PageWithBreadcrumb;
export type CausesPageData = PageWithBreadcrumb;
export type CausesDetailsPageData = PageWithBreadcrumb;
export type BlogPageData = PageWithBreadcrumb;
export type BlogDetailsPageData = PageWithBreadcrumb;

export interface ButtonLink {
  text: string;
  href: string;
}

export interface NotFoundPageData {
  title: string;
  pageName: string;
  metadata: PageMetadata;
  code: string;
  eyebrow: string;
  heading: string;
  description: string;
  background_image: string;
  primary_button: ButtonLink;
  secondary_button: ButtonLink;
}

/* =========================================================================
   About / Team / Gallery
   ========================================================================= */

export interface AboutGalleryItem {
  id: string;
  image: string;
  alt: string;
}

export interface AboutStoryData {
  title: string;
  paragraphs: string[];
  image: string;
  image_alt: string;
  gallery: AboutGalleryItem[];
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
  socials: TeamMemberSocial[];
}

export interface TeamSectionData {
  eyebrow: string;
  title: string;
  description?: string;
  members: TeamMember[];
}

export interface GalleryItem {
  id: string | number;
  title: string;
  image: string;
  category: string;
  categories?: string[];
  aspect: string;
  flex: number;
  column: number;
  alt?: string;
}

export interface GallerySectionData {
  eyebrow: string;
  title: string;
  description?: string;
  /** First entry is treated as the "show all" filter */
  categories: string[];
  /** Accessible label for the mobile filter dropdown */
  filter_label: string;
  load_more_button: {
    text: string;
    loaded_text: string;
    icon?: string;
  };
  lightbox_labels: {
    close: string;
    previous: string;
    next: string;
  };
  items: GalleryItem[];
}

/* =========================================================================
   Contact / FAQ
   ========================================================================= */

export interface ContactCardItem {
  id: string;
  title: string;
  icon: string;
  details: string[];
}

export interface ContactInputField {
  label: string;
  placeholder: string;
}

export interface ContactFormData {
  eyebrow: string;
  title_prefix: string;
  title_highlight: string;
  description: string;
  inputs: {
    name: ContactInputField;
    email: ContactInputField;
    phone: ContactInputField;
    subject: ContactInputField & { options: string[] };
    message: ContactInputField;
  };
  submit_button: { text: string; icon?: string };
  submitting_text: string;
  success_message: string;
}

export interface ContactBannerData {
  image: string;
  image_alt: string;
  quote: string;
}

export interface ContactMapData {
  embed_url: string;
  iframe_title: string;
  location_name: string;
  address: string;
  directions_url: string;
  directions_text: string;
  view_larger_text: string;
}

export interface ContactSectionData {
  eyebrow: string;
  title_prefix: string;
  title_highlight: string;
  description?: string;
  cards: ContactCardItem[];
  form: ContactFormData;
  banner: ContactBannerData;
  map: ContactMapData;
}

export interface FaqItem {
  id: string;
  number: string;
  question: string;
  answer: string;
}

export interface FaqSectionData {
  eyebrow: string;
  title_prefix: string;
  title_highlight: string;
  description?: string;
  image: string;
  image_alt: string;
  items: FaqItem[];
}

/* =========================================================================
   Cause Details
   ========================================================================= */

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
  slug: string;
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

/* =========================================================================
   Blog
   ========================================================================= */

export interface BlogItem {
  id: string;
  slug: string;
  title: string;
  category?: string;
  date: string;
  comments_count: string;
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

export interface BlogDetailLabels {
  author_prefix: string;
  inset_image_alt: string;
  back_link: {
    text: string;
    href: string;
  };
}

export interface BlogsSectionData {
  eyebrow?: string;
  title?: string;
  recent_posts_heading: string;
  read_more_text: string;
  pagination_labels: {
    previous: string;
    next: string;
  };
  detail: BlogDetailLabels;
  items: BlogItem[];
  recent_posts: RecentPostItem[];
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

/* =========================================================================
   Root Data Shape
   ========================================================================= */

export interface SectionsData {
  hero: HeroSectionData;
  about: AboutSectionData;
  causes: CausesSectionData;
  causes_details: CauseDetailsSectionData[];
  stats: StatsSectionData;
  testimonials: TestimonialsSectionData;
  our_story: AboutStoryData;
  team: TeamSectionData;
  gallery: GallerySectionData;
  contact: ContactSectionData;
  faq: FaqSectionData;
  blogs: BlogsSectionData;
  blog_details: BlogDetailData[];
}

export interface SiteCommonData {
  Header: HeaderData;
  Footer: FooterData;
  BackToTop: BackToTopData;
}

export interface SiteTemplateData {
  pages: {
    home: PageMeta;
    about: AboutPageData;
    team: TeamPageData;
    gallery: GalleryPageData;
    contact: ContactPageData;
    faq: FaqPageData;
    causes: CausesPageData;
    causes_details: CausesDetailsPageData;
    blog: BlogPageData;
    blog_detail: BlogDetailsPageData;
    not_found: NotFoundPageData;
  };
  sections: SectionsData;
}

export interface SiteCategoriesData {
  NGO: {
    templateComponents: {
      'template-1': SiteTemplateData;
    };
  };
}

export interface SiteData {
  common: SiteCommonData;
  categories: SiteCategoriesData;
}

/**
 * No `as unknown` cast: TypeScript validates data.json against `SiteData`
 * at compile time, so a missing/renamed field in the JSON is a build error.
 */
export const siteJson: SiteData = data;
export const common = siteJson.common;
export const template = siteJson.categories.NGO.templateComponents['template-1'];
export const pages = template.pages;
export const sections = template.sections;

/* =========================================================================
   Helpers
   ========================================================================= */

export function toSlug(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

/** Replaces `%s` in a JSON title template, e.g. "%s | Helping Hands" */
export function applyTitleTemplate(template: string | undefined, value: string): string {
  return template ? template.replace('%s', value) : value;
}

/** Returns `undefined` for unknown slugs so the page can render a real 404 */
export function getCauseBySlug(slug: string): CauseDetailsSectionData | undefined {
  const normalized = toSlug(slug);
  return sections.causes_details.find(
    (c) =>
      c.slug === slug ||
      toSlug(c.slug) === normalized ||
      toSlug(c.badge) === normalized ||
      toSlug(c.title) === normalized
  );
}

export function getAllCauseSlugs(): string[] {
  return sections.causes_details.map((c) => c.slug || toSlug(c.badge)).filter(Boolean);
}

/** Returns `undefined` for unknown slugs so the page can render a real 404 */
export function getBlogBySlug(slug: string): BlogDetailData | undefined {
  const normalized = toSlug(slug);
  return sections.blog_details.find(
    (b) => b.slug === slug || toSlug(b.slug) === normalized || toSlug(b.title) === normalized
  );
}

export function getAllBlogSlugs(): string[] {
  return sections.blog_details.map((b) => b.slug || toSlug(b.title)).filter(Boolean);
}
