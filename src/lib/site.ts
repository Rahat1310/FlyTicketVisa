/** Placeholder brand until final agency name/logo are confirmed (see PROJECT.md §10). */
export const siteConfig = {
  name: "Fly & Visa point",
  tagline: "Visa processing & air tickets from Bangladesh",
  description:
    "Trusted visa and air ticket support for tourists, students, business travelers, Umrah pilgrims, and medical travelers across Bangladesh.",
  phone: "+880 1XXX-XXXXXX",
  phoneHref: "tel:+8801XXXXXXXXX",
  whatsapp: "+8801XXXXXXXXX",
  whatsappMessage:
    "Assalamu alaikum. I would like help with a visa / air ticket inquiry.",
  email: "support@flyvisapoints.com",
  address: {
    lines: [
      "Monichottor, Shaheb Bazar",
      "Rajshahi, Bangladesh",
    ],
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14545.9734139265!2d88.58309485!3d24.3644023!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fbef5db1db82e7%3A0xc354b4f0b2f5b614!2sSaheb%20Bazar%2C%20Rajshahi!5e0!3m2!1sen!2sbd!4v1700000000000",
  },
  trust: {
    atab: "ATAB-XXXXXX",
    tradeLicense: "TL-XXXXXX",
    iata: "IATA-XXXXXX (if applicable)",
  },
  hours: "Sat–Thu · 10:00 AM – 7:00 PM",
  /** Full Cloudinary URL used as the home hero background */
  heroImageUrl:
    "https://res.cloudinary.com/blvrawlp/image/upload/v1784738490/hero_visa_pmfnzz.png",
} as const;

export function getWhatsAppUrl(customMessage?: string) {
  const text = encodeURIComponent(
    customMessage ?? siteConfig.whatsappMessage,
  );
  const number = siteConfig.whatsapp.replace(/\D/g, "");
  return `https://wa.me/${number}?text=${text}`;
}
