import { asset } from "@/lib/assets";
import type { FaqHelpContent, FaqItem, HeroContent, SectionIntro } from "@/types/content";

export const HOME_HERO: HeroContent = {
  eyebrow: "Bangalore · Airport, Employee & Pan-India Travel",
  title: "Every journey, thoughtfully planned.",
  copy: "Based in Bangalore, Annapoorneshwari Tours & Travellers provides airport pick & drop, corporate employee and school/college commutes, tourist travel, and weekly or monthly vehicle contracts across Karnataka and Pan-India.",
  image: {
    src: asset("assets/images/hero-banner.svg"),
    width: 1920,
    height: 850,
    alt: "Annapoorneshwari Tours & Travellers fleet and travel services across Bangalore, Karnataka, and Pan-India",
  },
};

export const FAQ_SECTION: SectionIntro = {
  eyebrow: "Frequently Asked Questions",
  title: "Clear answers before you message us",
  lead: "How enquiries, custom travel plans, and direct WhatsApp conversations work with our team.",
};

export const FAQ_HELP: FaqHelpContent = {
  title: "Still have a question?",
  copy: "Message our Bangalore team on WhatsApp and we will help you plan the trip.",
  ctaLabel: "Ask on WhatsApp",
};

export const FAQS: FaqItem[] = [
  {
    id: "book-airport-transfer",
    question: "How do I book an airport pickup or drop?",
    answer:
      "Message us on WhatsApp with your flight number, travel date, pickup or drop location, and passenger count. Our Bangalore team confirms availability and shares the vehicle details before your trip.",
  },
  {
    id: "service-area",
    question: "Which areas do you cover?",
    answer:
      "We are based in Bangalore and serve airport transfers and local commutes across the city. We also arrange tourist and outstation travel across Karnataka and Pan-India, subject to route and vehicle availability.",
  },
  {
    id: "employee-transport",
    question: "Do you handle daily employee transportation?",
    answer:
      "Yes. We plan fixed routes and shift timings for corporate teams, with monthly billing and a single point of contact. Share your pickup points, shift windows, and headcount so we can propose a route plan.",
  },
  {
    id: "school-college",
    question: "Can you manage school or college commutes?",
    answer:
      "We support scheduled school and college pick & drop with fixed routes and timings. Tell us the campus location, student count, and preferred schedule, and we will suggest a suitable vehicle arrangement.",
  },
  {
    id: "outstation-tours",
    question: "Can I book a vehicle for outstation or temple tours?",
    answer:
      "Yes. Share your destinations, travel dates, and number of passengers. We plan custom itineraries for Karnataka and Pan-India trips, including temple, heritage, and family travel.",
  },
  {
    id: "quote",
    question: "How do I get a quote or monthly contract?",
    answer:
      "Send your route, duration, vehicle preference, and passenger count on WhatsApp. For weekly or monthly contracts, include the number of trips per day so we can prepare an accurate plan and quote.",
  },
];
