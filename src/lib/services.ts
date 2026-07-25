export type ServiceSlug =
  | "umrah-package"
  | "student-visa"
  | "tourist-visa"
  | "business-visa"
  | "medical-visa"
  | "canton-fair"
  | "air-ticket";

export type Service = {
  slug: ServiceSlug;
  title: string;
  shortTitle: string;
  summary: string;
  description: string;
  highlights: string[];
  requirements: string[];
  relatedCountries: string[];
  cta: string;
};

export const services: Service[] = [
  {
    slug: "umrah-package",
    title: "Umrah Package",
    shortTitle: "Umrah",
    summary: "Guided Umrah packages with visa, flights, and hotel coordination for Saudi Arabia.",
    description:
      "Plan your Umrah journey with clear documentation support, flight booking, and hotel arrangements. We help Bangladeshi pilgrims prepare paperwork correctly and travel with confidence.",
    highlights: [
      "Saudi Umrah visa guidance",
      "Flight & hotel coordination",
      "Document checklist & review",
      "Family and group packages",
    ],
    requirements: [
      "Valid passport (minimum 6 months validity)",
      "Recent passport-size photographs",
      "NID / birth certificate copy",
      "Vaccination certificate (as required)",
      "Confirmed travel dates preference",
    ],
    relatedCountries: ["saudi-arabia"],
    cta: "Ask about Umrah packages",
  },
  {
    slug: "student-visa",
    title: "Student Visa",
    shortTitle: "Student",
    summary:
      "End-to-end student visa support for Malaysia, China, Japan, South Korea, Turkey, America, and more.",
    description:
      "From university shortlisting guidance to document preparation and embassy filing support, we help students and parents navigate the student visa process with transparent timelines and clear requirements.",
    highlights: [
      "Asia & USA study destinations",
      "SOP & document checklist support",
      "Financial document guidance",
      "Application tracking updates",
    ],
    requirements: [
      "Valid passport",
      "Offer / admission letter",
      "Academic transcripts & certificates",
      "Bank statements / financial proof",
      "English / language test results if required",
    ],
    relatedCountries: ["malaysia", "china", "japan", "south-korea", "turkey", "america"],
    cta: "Start a student visa inquiry",
  },
  {
    slug: "tourist-visa",
    title: "Tourist Visa",
    shortTitle: "Tourist",
    summary:
      "Holiday and visit visas for Thailand, Malaysia, Singapore, India, Turkey, Japan, and more.",
    description:
      "Whether you are planning a short holiday or visiting family abroad, we prepare your tourist visa file with the documents embassies expect — so you avoid common rejection mistakes.",
    highlights: [
      "Popular Asia & Middle East destinations",
      "Clear document lists per country",
      "Fee & processing time transparency",
      "WhatsApp updates throughout",
    ],
    requirements: [
      "Valid passport with blank pages",
      "Travel itinerary / hotel booking plan",
      "Bank statements",
      "Employment or business proof",
      "Passport photos as per embassy rules",
    ],
    relatedCountries: [
      "thailand",
      "malaysia",
      "singapore",
      "india",
      "indonesia",
      "philippines",
      "hong-kong",
      "turkey",
      "egypt",
      "japan",
      "south-korea",
      "china",
      "america",
      "africa",
    ],
    cta: "Plan your tourist visa",
  },
  {
    slug: "business-visa",
    title: "Business Visa",
    shortTitle: "Business",
    summary: "Invitation-letter based business travel visas with professional document review.",
    description:
      "For meetings, trade fairs, and company visits, we help assemble invitation letters, company papers, and supporting documents so your business travel plans stay on schedule.",
    highlights: [
      "Invitation letter coordination",
      "Company document checklist",
      "Multi-country business routes",
      "Fast follow-up on queries",
    ],
    requirements: [
      "Valid passport",
      "Invitation / appointment letter",
      "Trade license / company documents",
      "Cover letter explaining visit purpose",
      "Bank & tax documents as needed",
    ],
    relatedCountries: [
      "china",
      "malaysia",
      "singapore",
      "thailand",
      "hong-kong",
      "turkey",
      "japan",
      "south-korea",
      "america",
      "indonesia",
      "india",
    ],
    cta: "Request business visa help",
  },
  {
    slug: "medical-visa",
    title: "Medical Visa",
    shortTitle: "Medical",
    summary: "Medical treatment travel support with hospital appointment and document assistance.",
    description:
      "When treatment abroad is needed, timing matters. We help patients and attendants prepare medical visa documents, appointment letters, and travel arrangements with care and clarity.",
    highlights: [
      "Hospital appointment letter support",
      "Patient + attendant documentation",
      "Urgent case prioritization guidance",
      "Flight coordination available",
    ],
    requirements: [
      "Valid passport",
      "Medical reports / referral",
      "Hospital appointment / invitation letter",
      "Attendant details (if traveling with patient)",
      "Financial proof for treatment & stay",
    ],
    relatedCountries: ["india", "thailand", "singapore", "malaysia"],
    cta: "Get medical visa guidance",
  },
  {
    slug: "air-ticket",
    title: "Air Ticket",
    shortTitle: "Air Ticket",
    summary: "Competitive air ticket booking for one-way, return, and multi-city itineraries.",
    description:
      "Need flights for Umrah, study, tourism, or emergency travel? We search routes and fare options, then confirm tickets that fit your dates and budget — with clear change/cancellation notes.",
    highlights: [
      "Domestic & international routes",
      "Group & family booking help",
      "Fare comparison guidance",
      "Change & refund policy explained",
    ],
    requirements: [
      "Passenger full name (as in passport)",
      "Passport / NID details",
      "Preferred travel dates",
      "Destination & cabin preference",
      "Contact number for ticket delivery",
    ],
    relatedCountries: [],
    cta: "Get a ticket quote",
  },
  {
    slug: "canton-fair",
    title: "Canton Fair",
    shortTitle: "Canton Fair",
    summary: "Specialized visa and travel support for attending the China Canton Fair.",
    description:
      "Maximize your business opportunities at the Canton Fair. We handle your Chinese business visa, flight bookings, and hotel arrangements so you can focus on sourcing and networking.",
    highlights: [
      "Chinese business visa assistance",
      "Canton Fair invitation letter support",
      "Flight and hotel packages",
      "Guangzhou travel guidance",
    ],
    requirements: [
      "Valid passport (minimum 6 months validity)",
      "Recent passport-size photographs",
      "Company trade license & documents",
      "Bank statements",
      "Canton Fair buyer badge or invitation",
    ],
    relatedCountries: ["china"],
    cta: "Plan your Canton Fair trip",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
