import { asset } from "@/lib/assets";
import type { CtaBandContent, GalleryItem, SectionIntro } from "@/types/content";

export const GALLERY_INTRO: SectionIntro = {
  eyebrow: "Service Gallery · Bangalore, Karnataka & Pan-India",
  title: "Services designed around how you travel.",
  lead: "Explore how Annapoorneshwari Tours & Travellers supports airport transfers, structured daily employee and campus commutes, outstation tours, and recurring client duty contracts.",
};

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "airport-transfers",
    number: "01",
    eyebrow: "Airport Pickup & Drop",
    title: "Flights change. Your transfer stays sorted.",
    description:
      "Reliable pickups and drops for Kempegowda International Airport, with clear coordination on flight timings, terminal details, and luggage so the first and last mile of your trip stays calm.",
    highlights: ["Flight-aware scheduling", "Early morning & late night", "Luggage-friendly vehicles"],
    image: {
      src: asset("assets/images/service-airport-transfer.svg"),
      width: 1600,
      height: 1000,
      alt: "Airport transfer vehicle waiting near the terminal in Bangalore",
    },
    whatsappTopic: "airport pickup and drop",
    ctaLabel: "Enquire on WhatsApp",
  },
  {
    id: "employee-transport",
    number: "02",
    eyebrow: "Employee Transportation",
    title: "Daily commutes your team can rely on.",
    description:
      "Structured employee pickups and drops with planned routes, shift coverage, and monthly billing. A dependable commute helps your team start and end the workday without uncertainty.",
    highlights: ["Route & shift planning", "Monthly billing", "Single point of contact"],
    image: {
      src: asset("assets/images/service-employee-transport.svg"),
      width: 1600,
      height: 1000,
      alt: "Employee transportation vehicle on a city route in Bangalore",
    },
    whatsappTopic: "employee transportation",
    ctaLabel: "Enquire on WhatsApp",
  },
  {
    id: "school-college-commutes",
    number: "03",
    eyebrow: "School & College Commutes",
    title: "Scheduled campus travel, without the scramble.",
    description:
      "Fixed routes and timings for school and college pick & drop, planned around campus hours and student counts. Predictable daily transport gives parents and administrators one less thing to track.",
    highlights: ["Fixed schedules", "Campus routes", "Coordinated pickups"],
    image: {
      src: asset("assets/images/service-campus-commute.svg"),
      width: 1600,
      height: 1000,
      alt: "School and college commute vehicle waiting outside a campus",
    },
    whatsappTopic: "school or college transportation",
    ctaLabel: "Enquire on WhatsApp",
  },
  {
    id: "karnataka-pan-india-tours",
    number: "04",
    eyebrow: "Karnataka & Pan-India Tours",
    title: "Trips built around your itinerary, not ours.",
    description:
      "Custom tourist travel for families, groups, temple visits, and heritage routes across Karnataka and beyond. Share the places you want to see and the pace you prefer, and we will plan the vehicle and route around it.",
    highlights: ["Custom itineraries", "Temple & heritage routes", "Multi-day travel"],
    image: {
      src: asset("assets/images/service-tourist-travel.svg"),
      width: 1600,
      height: 1000,
      alt: "Tourist vehicle on a scenic route in Karnataka",
    },
    whatsappTopic: "Karnataka and Pan-India tourist travel",
    ctaLabel: "Enquire on WhatsApp",
  },
  {
    id: "monthly-contracts",
    number: "05",
    eyebrow: "Monthly Vehicle Contracts",
    title: "A dedicated vehicle, on your schedule.",
    description:
      "Weekly and monthly vehicle arrangements for companies, institutions, and frequent travellers. Choose a duration that fits your operations and keep one team accountable for the vehicle and the schedule.",
    highlights: ["Dedicated vehicle", "Flexible duration", "Recurring trips"],
    image: {
      src: asset("assets/images/service-monthly-contract.svg"),
      width: 1600,
      height: 1000,
      alt: "Vehicle available on a monthly contract with Annapoorneshwari Tours & Travellers",
    },
    whatsappTopic: "a weekly or monthly vehicle contract",
    ctaLabel: "Enquire on WhatsApp",
  },
];

export const GALLERY_CLOSING: CtaBandContent = {
  eyebrow: "Direct Enquiry",
  title: "Need a custom route or monthly arrangement?",
  lead: "Share your pickup locations, dates, and passenger count directly with our Bangalore team on WhatsApp.",
};
