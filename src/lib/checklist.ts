import { countries } from "@/lib/data/countries";
import { DOCUMENT_TYPES, type DocumentType } from "@/lib/uploads";

export type ChecklistSlot = {
  id: string;
  label: string;
  suggestedType: DocumentType;
};

function inferDocumentType(label: string): DocumentType {
  const l = label.toLowerCase();
  if (l.includes("passport") && (l.includes("photo") || l.includes("picture"))) {
    return "photo";
  }
  if (l.includes("photo") || l.includes("picture")) return "photo";
  if (l.includes("passport")) return "passport";
  if (l.includes("solvency")) return "solvency";
  if (l.includes("bank")) return "bank_statement";
  if (l.includes("trade") || l.includes("noc")) return "trade_license";
  if (l.includes("tin")) return "tin";
  if (l.includes("ticket") || l.includes("flight")) return "air_ticket";
  if (l.includes("invitation")) return "invitation";
  return "other";
}

const FALLBACK_CHECKLIST = [
  "Passport (bio page)",
  "Passport photo",
  "Bank statement",
  "Other supporting document",
];

/** Build upload slots from a country checklist (or a sensible default). */
export function getChecklistSlots(countryName?: string | null): ChecklistSlot[] {
  const country = countryName
    ? countries.find(
        (c) =>
          c.name.toLowerCase() === countryName.toLowerCase() ||
          c.slug === countryName.toLowerCase(),
      )
    : undefined;

  const labels = country?.documentsRequired?.length
    ? country.documentsRequired
    : FALLBACK_CHECKLIST;

  return labels.map((label, index) => ({
    id: `slot-${index}`,
    label,
    suggestedType: inferDocumentType(label),
  }));
}

export { DOCUMENT_TYPES };
