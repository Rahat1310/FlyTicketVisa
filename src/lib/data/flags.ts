/** ISO 3166-1 alpha-2 codes for flagcdn.com */
export const countryFlagIso: Record<string, string> = {
  "saudi-arabia": "sa",
  uk: "gb",
  australia: "au",
  canada: "ca",
  malaysia: "my",
  uae: "ae",
  thailand: "th",
  singapore: "sg",
  schengen: "eu",
};

export function getCountryFlagUrl(slug: string): string {
  const iso = countryFlagIso[slug] ?? "bd";
  return `https://flagcdn.com/w80/${iso}.png`;
}
