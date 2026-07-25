export type Country = {
  slug: string;
  name: string;
  flag: string;
  region: string;
  visaTypes: string[];
  summary: string;
  documentsRequired: string[];
  fee: string;
  processingTime: string;
  notes: string;
};

/** Active country list — update as destinations expand. */
export const countries: Country[] = [
  {
    slug: "china",
    name: "China",
    flag: "🇨🇳",
    region: "East Asia",
    visaTypes: ["Tourist", "Business", "Student"],
    summary:
      "China tourist, business, and student visa support for Bangladeshi applicants — including Canton Fair travel.",
    documentsRequired: [
      "Passport with 6 months+ validity",
      "Picture with white background",
      "Old visas (entry–exit seal)",
      "Solvency certificate with 3 lac+ balance",
      "Trade license / NOC, TIN certificate",
      "Confirmed air ticket",
      "Personal information form",
      "Welcome Singapore card & Malaysia e-visa copy",
    ],
    fee: "Confirmed per visa type on inquiry",
    processingTime: "Quick delivery in 2–3 weeks",
    notes:
      "Checklist above is for typical China visa filing from Bangladesh. We reconfirm the latest requirements before submission.",
  },
  {
    slug: "india",
    name: "India",
    flag: "🇮🇳",
    region: "South Asia",
    visaTypes: ["Tourist", "Medical", "Business"],
    summary:
      "India tourist, medical, and business visa guidance for travelers from Bangladesh.",
    documentsRequired: [
      "Valid passport",
      "Passport photos",
      "Travel itinerary / hospital letter (medical)",
      "Bank statements",
      "NID copy",
    ],
    fee: "Affordable entry — ask for today’s rate",
    processingTime: "Often 3–10 working days",
    notes:
      "Medical travelers should share hospital appointment letters early for smoother filing.",
  },
  {
    slug: "thailand",
    name: "Thailand",
    flag: "🇹🇭",
    region: "Southeast Asia",
    visaTypes: ["Tourist", "Business", "Medical"],
    summary:
      "Thailand tourist, business, and medical travel documentation support for BD nationals.",
    documentsRequired: [
      "Passport",
      "Photo (35mm × 45mm, matte paper) — 2 copies",
      "Bank statement (last 6 months) & bank solvency",
      "Job holder: NOC, salary certificate, pay slip, employee ID, visiting card",
      "Businessman: updated trade license, company letter pad, visiting card",
      "Student: NOC from institute, student ID, sponsor letter, sponsor’s passport/NID copy, sponsor’s bank statement (last 6 months) & bank solvency",
    ],
    fee: "Embassy + service fee — confirmed on inquiry",
    processingTime: "Typically 3–10 working days",
    notes:
      "Submit documents matching your status (job holder, businessman, or student). We confirm the full checklist before filing.",
  },
  {
    slug: "malaysia",
    name: "Malaysia",
    flag: "🇲🇾",
    region: "Southeast Asia",
    visaTypes: ["Student", "Tourist", "Business", "Medical"],
    summary:
      "Popular destination for BD travelers — student, tourist, business, and medical visa support.",
    documentsRequired: [
      "Passport",
      "Photo (35mm × 45mm, matte paper) — 2 copies",
      "Bank statement (last 6 months) & bank solvency",
      "Job holder: NOC, salary certificate, pay slip, employee ID, visiting card",
      "Businessman: updated trade license, company letter pad, visiting card",
      "Student: NOC from institute, student ID, sponsor letter, sponsor’s passport/NID copy, sponsor’s bank statement (last 6 months) & bank solvency",
    ],
    fee: "Affordable entry point — ask for today’s rate",
    processingTime: "Often 3–10 working days",
    notes:
      "Submit documents matching your status (job holder, businessman, or student). We confirm the full checklist before filing.",
  },
  {
    slug: "singapore",
    name: "Singapore",
    flag: "🇸🇬",
    region: "Southeast Asia",
    visaTypes: ["Tourist", "Business", "Medical"],
    summary:
      "Singapore visit and medical visa file preparation with attention to invitation and itinerary details.",
    documentsRequired: [
      "Passport",
      "Photo (35mm × 45mm, matte paper) — 2 copies",
      "Bank statement (last 6 months) & bank solvency",
      "Job holder: NOC, salary certificate, pay slip, employee ID, visiting card",
      "Businessman: updated trade license, company letter pad, visiting card",
      "Student: NOC from institute, student ID, sponsor letter, sponsor’s passport/NID copy, sponsor’s bank statement (last 6 months) & bank solvency",
    ],
    fee: "Confirmed per application type",
    processingTime: "Often 5–15 working days",
    notes:
      "Submit documents matching your status (job holder, businessman, or student). We confirm the full checklist before filing.",
  },
  {
    slug: "africa",
    name: "Africa",
    flag: "🌍",
    region: "Africa",
    visaTypes: ["Tourist", "Business"],
    summary:
      "Visa guidance for African destinations that accept Bangladeshi applicants — tourism and business travel.",
    documentsRequired: [
      "Valid passport (6+ months)",
      "Passport photos",
      "Invitation / hotel booking",
      "Bank statements",
      "Travel itinerary",
    ],
    fee: "Varies by country — quote on inquiry",
    processingTime: "Typically 7–21 working days (country dependent)",
    notes:
      "Requirements differ by African country. Tell us your destination and we confirm the exact checklist.",
  },
  {
    slug: "saudi-arabia",
    name: "Saudi Arabia",
    flag: "🇸🇦",
    region: "Middle East",
    visaTypes: ["Umrah", "Tourist", "Business"],
    summary:
      "Umrah and visit visas for Saudi Arabia with document guidance tailored for Bangladeshi applicants.",
    documentsRequired: [
      "Valid passport (6+ months)",
      "Passport photos",
      "NID copy",
      "Vaccination records as required",
      "Confirmed package / hotel details (Umrah)",
    ],
    fee: "Package-dependent — ask for current quote",
    processingTime: "Typically 5–15 working days (season dependent)",
    notes:
      "Requirements and fees can change by season and visa category. We confirm the latest checklist before filing.",
  },
  {
    slug: "egypt",
    name: "Egypt",
    flag: "🇪🇬",
    region: "Middle East / North Africa",
    visaTypes: ["Tourist", "Business"],
    summary:
      "Egypt tourist and business visa support for travelers from Bangladesh.",
    documentsRequired: [
      "Valid passport",
      "Passport photos",
      "Hotel booking / invitation",
      "Bank statements",
      "Flight plan",
    ],
    fee: "Confirmed on inquiry",
    processingTime: "Often 5–15 working days",
    notes:
      "Tourism and business categories have different supporting documents — we confirm before submission.",
  },
  {
    slug: "hong-kong",
    name: "Hong Kong",
    flag: "🇭🇰",
    region: "East Asia",
    visaTypes: ["Tourist", "Business"],
    summary:
      "Hong Kong visit and business visa documentation support for BD applicants.",
    documentsRequired: [
      "Valid passport",
      "Passport photos",
      "Travel itinerary",
      "Bank statements",
      "Invitation letter (business)",
    ],
    fee: "Confirmed per application type",
    processingTime: "Typically 5–15 working days",
    notes:
      "A clear itinerary and financial proof help reduce delays.",
  },
  {
    slug: "turkey",
    name: "Turkey",
    flag: "🇹🇷",
    region: "Europe / Middle East",
    visaTypes: ["Tourist", "Business", "Student"],
    summary:
      "Turkey tourist, business, and student visa guidance for Bangladeshi travelers.",
    documentsRequired: [
      "Valid passport",
      "Passport photos",
      "Hotel / invitation details",
      "Bank statements",
      "Employment or academic documents",
    ],
    fee: "Embassy + service fee — shared on inquiry",
    processingTime: "Often 10–30 working days",
    notes:
      "Processing times vary by season and category. We prepare a complete file to avoid avoidable delays.",
  },
  {
    slug: "indonesia",
    name: "Indonesia",
    flag: "🇮🇩",
    region: "Southeast Asia",
    visaTypes: ["Tourist", "Business"],
    summary:
      "Indonesia tourist and business visa support for travelers from Bangladesh.",
    documentsRequired: [
      "Valid passport",
      "Passport photos",
      "Hotel booking",
      "Bank statements",
      "Return flight plan",
    ],
    fee: "Ask for today’s rate",
    processingTime: "Typically 3–10 working days",
    notes:
      "Exact entry type depends on your travel plan — we confirm the right category before filing.",
  },
  {
    slug: "philippines",
    name: "Philippines",
    flag: "🇵🇭",
    region: "Southeast Asia",
    visaTypes: ["Tourist", "Business"],
    summary:
      "Philippines tourist and business visa documentation help for BD nationals.",
    documentsRequired: [
      "Valid passport",
      "Application form & photos",
      "Bank statements",
      "Hotel / invitation",
      "Flight reservation",
    ],
    fee: "Confirmed on inquiry",
    processingTime: "Often 5–15 working days",
    notes:
      "Incomplete hotel or flight plans are a common delay — we help tighten your file.",
  },
  {
    slug: "south-korea",
    name: "South Korea",
    flag: "🇰🇷",
    region: "East Asia",
    visaTypes: ["Tourist", "Business", "Student"],
    summary:
      "South Korea tourist, business, and student visa support with clear document checklists.",
    documentsRequired: [
      "Valid passport",
      "Passport photos",
      "Bank statements",
      "Itinerary / invitation / offer letter",
      "Employment or academic proof",
    ],
    fee: "Embassy fee + service charge — confirmed on inquiry",
    processingTime: "Often 2–6 weeks",
    notes:
      "Strong financial and purpose documents improve application quality. We review before submission.",
  },
  {
    slug: "japan",
    name: "Japan",
    flag: "🇯🇵",
    region: "East Asia",
    visaTypes: ["Tourist", "Business", "Student"],
    summary:
      "Japan tourist, business, and student visa file preparation for Bangladeshi applicants.",
    documentsRequired: [
      "Valid passport",
      "Passport photos",
      "Detailed itinerary",
      "Bank statements",
      "Invitation / guarantee documents as required",
    ],
    fee: "Confirmed per visa category",
    processingTime: "Typically 1–4 weeks",
    notes:
      "Japan files need careful itinerary and financial consistency. We help organize the checklist.",
  },
  {
    slug: "america",
    name: "America (USA)",
    flag: "🇺🇸",
    region: "North America",
    visaTypes: ["Tourist", "Business", "Student"],
    summary:
      "USA B1/B2, business, and student visa documentation support for applicants from Bangladesh.",
    documentsRequired: [
      "Valid passport",
      "DS-160 confirmation & appointment guidance",
      "Bank / financial documents",
      "Employment or admission proof",
      "Travel purpose letter",
    ],
    fee: "Embassy fee + service charge — shared on inquiry",
    processingTime: "Appointment-dependent — often several weeks to months",
    notes:
      "USA decisions are interview-based. Strong, consistent documentation and purpose statements are critical.",
  },
];

export function getCountryBySlug(slug: string): Country | undefined {
  return countries.find((c) => c.slug === slug);
}

export function getCountriesBySlugs(slugs: string[]): Country[] {
  return slugs
    .map((slug) => getCountryBySlug(slug))
    .filter((c): c is Country => Boolean(c));
}
