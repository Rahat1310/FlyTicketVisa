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

/** Priority countries for launch — more added post-launch via the same template. */
export const countries: Country[] = [
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
    slug: "uk",
    name: "United Kingdom",
    flag: "🇬🇧",
    region: "Europe",
    visaTypes: ["Student", "Tourist", "Business"],
    summary:
      "UK student, visitor, and business visa support with careful financial and supporting document review.",
    documentsRequired: [
      "Valid passport",
      "CAS / offer letter (student) or invitation (visit/business)",
      "Bank statements meeting UKVI expectations",
      "Academic / employment documents",
      "Travel history & cover letter",
    ],
    fee: "Embassy fee + service charge — confirmed on inquiry",
    processingTime: "Usually 3–8 weeks (priority options vary)",
    notes:
      "UK applications are decision-based. Strong, consistent documentation is critical for approval chances.",
  },
  {
    slug: "australia",
    name: "Australia",
    flag: "🇦🇺",
    region: "Oceania",
    visaTypes: ["Student", "Tourist"],
    summary:
      "Australia student and visitor visa guidance for Bangladeshi applicants, including GTE/statement support pointers.",
    documentsRequired: [
      "Valid passport",
      "COE / offer letter (student)",
      "Financial capacity evidence",
      "English proficiency results",
      "Health & character documents as required",
    ],
    fee: "Confirmed per visa subclass on inquiry",
    processingTime: "Varies by subclass — often several weeks",
    notes:
      "Processing times fluctuate. We prepare a complete file to reduce avoidable delays.",
  },
  {
    slug: "canada",
    name: "Canada",
    flag: "🇨🇦",
    region: "North America",
    visaTypes: ["Student", "Tourist"],
    summary:
      "Canada study and visit visa documentation support with checklist clarity for BD applicants.",
    documentsRequired: [
      "Valid passport",
      "Letter of acceptance (student)",
      "Proof of funds",
      "Study plan / purpose of travel letter",
      "Biometrics appointment support guidance",
    ],
    fee: "IRCC fee + service charge — shared on inquiry",
    processingTime: "Often 4–12+ weeks depending on stream",
    notes:
      "Canada files benefit from clear purpose statements and consistent financial proof.",
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
      "Valid passport",
      "Passport photos",
      "Bank statements",
      "Hotel / flight plan or invitation",
      "Offer letter (student) or hospital letter (medical)",
    ],
    fee: "Affordable entry point — ask for today's rate",
    processingTime: "Often 3–10 working days",
    notes:
      "Malaysia is one of the most requested destinations from Bangladesh for study and tourism.",
  },
  {
    slug: "uae",
    name: "United Arab Emirates",
    flag: "🇦🇪",
    region: "Middle East",
    visaTypes: ["Tourist", "Business"],
    summary:
      "UAE tourist and business visit visas with fast turnaround options when documents are ready.",
    documentsRequired: [
      "Valid passport",
      "Passport photo",
      "Travel dates",
      "Sponsor / hotel details if required",
      "Employment or trade documents (business)",
    ],
    fee: "Varies by duration — quote on inquiry",
    processingTime: "Often 2–7 working days",
    notes:
      "Exact requirements depend on visa duration and entry type. We verify before submission.",
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
      "Valid passport",
      "Application form & photos",
      "Bank statements",
      "Hotel booking / invitation",
      "Flight reservation plan",
    ],
    fee: "Embassy + service fee — confirmed on inquiry",
    processingTime: "Typically 3–10 working days",
    notes:
      "Medical travelers should share hospital appointment letters early for smoother filing.",
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
      "Valid passport",
      "Cover letter & itinerary",
      "Bank statements",
      "Invitation / hotel confirmation",
      "Employment proof",
    ],
    fee: "Confirmed per application type",
    processingTime: "Often 5–15 working days",
    notes:
      "Incomplete itineraries are a common delay — we help tighten your supporting file.",
  },
  {
    slug: "schengen",
    name: "Schengen (Europe)",
    flag: "🇪🇺",
    region: "Europe",
    visaTypes: ["Tourist", "Business"],
    summary:
      "Schengen short-stay visa guidance for tourism and business across participating European countries.",
    documentsRequired: [
      "Valid passport with Schengen blank pages",
      "Travel insurance",
      "Flight & hotel reservations / invitation",
      "Bank statements & employment proof",
      "Cover letter with day-by-day plan",
    ],
    fee: "Schengen visa fee + service charge",
    processingTime: "Typically 15–30+ calendar days",
    notes:
      "Apply via the country of main destination. We help you choose the correct consulate path.",
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
