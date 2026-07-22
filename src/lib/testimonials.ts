export type Testimonial = {
  id: string;
  name: string;
  service: string;
  quote: string;
  rating: number;
  location: string;
  /** Full image URL from Cloudinary dashboard (or Sanity later) */
  photoUrl?: string;
};

/** Placeholder testimonials — replace with real client photos/names before launch. */
export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Farhana Akter",
    service: "Student Visa — UK",
    quote:
      "They explained every document clearly and kept us updated on WhatsApp. My daughter’s UK student file felt organized from day one.",
    rating: 5,
    location: "Dhaka",
  },
  {
    id: "2",
    name: "Md. Rafiqul Islam",
    service: "Umrah Package",
    quote:
      "Our family Umrah trip was handled professionally — visa, tickets, and hotel coordination in one place. Very trustworthy team.",
    rating: 5,
    location: "Chattogram",
  },
  {
    id: "3",
    name: "Sajid Hasan",
    service: "Tourist Visa — Malaysia",
    quote:
      "Transparent fees and a simple checklist. Malaysia tourist visa process was smoother than I expected.",
    rating: 5,
    location: "Sylhet",
  },
  {
    id: "4",
    name: "Nusrat Jahan",
    service: "Air Ticket",
    quote:
      "Got a good fare for a last-minute flight and clear info on change rules. Responsive on WhatsApp even in the evening.",
    rating: 4,
    location: "Dhaka",
  },
];
