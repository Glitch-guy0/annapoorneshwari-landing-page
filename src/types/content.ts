export type NavItem = {
  label: string;
  to: string;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type GalleryImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type GalleryItem = {
  id: string;
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  highlights: string[];
  image: GalleryImage;
  whatsappTopic: string;
  ctaLabel: string;
};

export type ContactEntry = {
  label: string;
  value: string;
  hrefPrefix?: "tel:" | "mailto:";
};

export type SectionIntro = {
  eyebrow: string;
  title: string;
  lead: string;
};

export type FaqHelpContent = {
  title: string;
  copy: string;
  ctaLabel: string;
};

export type HeroContent = {
  eyebrow: string;
  title: string;
  copy: string;
  image: GalleryImage;
};

export type CtaBandContent = {
  eyebrow: string;
  title: string;
  lead: string;
};
