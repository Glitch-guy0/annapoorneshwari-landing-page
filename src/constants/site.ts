import { asset } from "@/lib/assets";
import type { ContactEntry, NavItem } from "@/types/content";

/**
 * Single source of truth for brand, navigation, contact and WhatsApp details.
 * Update copy here; no component needs to change.
 */
export const BRAND = {
  name: "Annapoorneshwari Tours & Travellers",
  shortName: "Annapoorneshwari",
  tagline: "Every journey, thoughtfully planned.",
  description:
    "Bangalore-based airport transfers, employee and school/college pick & drop, and tourist transportation across Karnataka and Pan-India.",
  logo: {
    src: asset("assets/images/logo.png"),
    width: 300,
    height: 87,
    alt: "Annapoorneshwari Tours & Travellers",
  },
  copyrightYear: 2026,
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "Gallery", to: "/gallery" },
];

/**
 * WhatsApp is the only conversion channel on the site.
 *
 * `phoneNumber` must be digits only, including the country code
 * (for example "919876543210"). While it is empty, every CTA opens the
 * guided fallback dialog instead of redirecting to WhatsApp.
 */
export const WHATSAPP = {
  phoneNumber: "919900055563",
  prefilledMessage:
    "Hello Annapoorneshwari Tours & Travellers, I would like to enquire about your travel services.",
  headerCtaLabel: "Chat on WhatsApp",
  shortCtaLabel: "WhatsApp",
  primaryCtaLabel: "Chat with us on WhatsApp",
  callCtaLabel: "Call now",
  contextMessages: {
    homeHero:
      "Hello Annapoorneshwari Tours & Travellers, I would like help planning travel from Bangalore.",
    galleryClosing:
      "Hello Annapoorneshwari Tours & Travellers, I'd like help with a custom route or a monthly vehicle arrangement.",
    faq: "Hello Annapoorneshwari Tours & Travellers, I have a question about your travel services.",
    notFound:
      "Hello Annapoorneshwari Tours & Travellers, I was looking for a page on your website and would like some help.",
    footer:
      "Hello Annapoorneshwari Tours & Travellers, I would like to enquire about your travel services.",
  } as Record<string, string>,
};

/** Fill only verified details. Empty values are hidden in the footer. */
export const CONTACT = {
  phoneDisplay: "+91 99000 55563",
  email: "",
  address: "",
  hours: "",
};

export const CONTACT_ENTRIES: ContactEntry[] = (
  [
    { label: "Phone", value: CONTACT.phoneDisplay, hrefPrefix: "tel:" },
    { label: "Email", value: CONTACT.email, hrefPrefix: "mailto:" },
    { label: "Address", value: CONTACT.address },
    { label: "Hours", value: CONTACT.hours },
  ] satisfies ContactEntry[]
).filter((entry) => entry.value.trim().length > 0);

export const FOOTER_COPY = {
  description: BRAND.description,
  copyright: `© ${BRAND.copyrightYear} ${BRAND.name}. All rights reserved.`,
};

export const PAGE_META = {
  home: {
    title: "Annapoorneshwari Tours & Travellers — Thoughtfully Planned Travel",
    description:
      "Bangalore-based airport pickup & drop, employee and school/college transportation, monthly contracts, and tourist travel across Karnataka and Pan-India.",
  },
  gallery: {
    title: "Service Gallery — Annapoorneshwari Tours & Travellers",
    description:
      "Explore Bangalore-based airport pick & drop, employee and school/college commutes, Karnataka and Pan-India tourist travel, and monthly contract transport services.",
  },
  license: {
    title: "Terms & License — Annapoorneshwari Tours & Travellers",
    description:
      "Proprietary notice, strict copyright terms, and restricted license information for Annapoorneshwari Tours & Travellers.",
  },
};
