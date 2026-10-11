// Placeholder details: replace with the real school's information.
export const site = {
  name: "Oxford International High School",
  shortName: "Oxford",
  descriptor: "International High School",
  tagline: "Excellence in education",
  description:
    "Oxford International High School teaches children from Nursery to Grade 10, where well-sized classes, generous teachers and unhurried days help every child grow into a thoughtful, capable young person.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  founded: 2012,
  phone: "+91 99000 98883",
  phone2: "+91 99646 86967",
  address: {
    street: "Cubbonpet",
    locality: "Bengaluru",
    region: "Karnataka",
    postalCode: "",
    country: "India",
  },
  hours: "Monday to Friday, 8:00 am to 4:00 pm. Saturday, 8:00 am to 11:00 am.",
  // Placeholder: set NEXT_PUBLIC_ENQUIRY_FORM_URL to the school's Google Form link.
  enquiryFormUrl:
    process.env.NEXT_PUBLIC_ENQUIRY_FORM_URL ?? "https://docs.google.com/forms/",
  social: [
    { label: "Facebook", href: "https://www.facebook.com/oxfordinternationalschoolblr/" },
  ],
} as const;

// One label for the one intent: join the school.
export const cta = { label: "Admission enquiry", href: "/admissions/enquiry" } as const;

export const mapsUrl = "https://maps.app.goo.gl/DcqzAVpQUascLetX9";

export type NavLink = { label: string; href: string };
export type NavItem = NavLink & { children?: NavLink[] };

// The full menu (drawer). Every parent is a real page, never a dead menu.
export const nav: NavItem[] = [
  {
    label: "About",
    href: "/about",
    children: [
      { label: "History", href: "/about/history" },
      { label: "Vision and mission", href: "/about/vision-mission" },
      { label: "Principal’s message", href: "/about/principals-message" },
      { label: "Leadership", href: "/about/leadership" },
    ],
  },
  {
    label: "Academics",
    href: "/academics",
    children: [
      { label: "Curriculum", href: "/academics/curriculum" },
      { label: "Teaching methodology", href: "/academics/teaching-methodology" },
      { label: "Early years", href: "/academics/early-years" },
      { label: "Primary", href: "/academics/primary" },
      { label: "Middle school", href: "/academics/middle-school" },
      { label: "Secondary", href: "/academics/secondary" },
    ],
  },
  {
    label: "Admissions",
    href: "/admissions",
    children: [
      { label: "Eligibility", href: "/admissions/eligibility" },
      { label: "Documents", href: "/admissions/requirements" },
      { label: "FAQs", href: "/admissions/faqs" },
      { label: "Admission enquiry", href: "/admissions/enquiry" },
    ],
  },
  {
    label: "Activities",
    href: "/activities",
    children: [
      { label: "Sports", href: "/activities/sports" },
      { label: "Clubs", href: "/activities/clubs" },
      { label: "Arts and culture", href: "/activities/arts-culture" },
      { label: "Celebrations", href: "/activities/celebrations" },
      { label: "Trips", href: "/activities/trips" },
      { label: "Community service", href: "/activities/community-service" },
      { label: "Achievements", href: "/activities/achievements" },
    ],
  },
  { label: "Gallery", href: "/gallery" },
  {
    label: "News & events",
    href: "/news",
    children: [
      { label: "News", href: "/news" },
      { label: "Events", href: "/events" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

// The header shows five plain links; everything else (including Gallery and Contact) lives in the menu drawer.
export const headerLinks: NavLink[] = nav.filter((i) =>
  ["/about", "/academics", "/admissions", "/activities", "/news"].includes(i.href),
);

export const footerColumns: { heading: string; links: NavLink[] }[] = [
  {
    heading: "Quick links",
    links: [
      { label: "About us", href: "/about" },
      { label: "Academics", href: "/academics" },
      { label: "Admissions", href: "/admissions" },
      { label: "Activities", href: "/activities" },
      { label: "Gallery", href: "/gallery" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "News", href: "/news" },
      { label: "Events", href: "/events" },
      { label: "Admission FAQs", href: "/admissions/faqs" },
      { label: "Documents to bring", href: "/admissions/requirements" },
      { label: "Contact us", href: "/contact" },
    ],
  },
];

export const legalLinks: NavLink[] = [
  { label: "Privacy policy", href: "/privacy-policy" },
  { label: "Terms of use", href: "/terms-of-use" },
  { label: "Accessibility", href: "/accessibility" },
];
