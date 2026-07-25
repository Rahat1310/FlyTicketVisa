/** ISO 3166-1 alpha-2 codes for flagcdn.com */
export const countryFlagIso: Record<string, string> = {
  china: "cn",
  india: "in",
  thailand: "th",
  malaysia: "my",
  singapore: "sg",
  africa: "za", // regional stand-in for Africa group card
  "saudi-arabia": "sa",
  egypt: "eg",
  "hong-kong": "hk",
  turkey: "tr",
  indonesia: "id",
  philippines: "ph",
  "south-korea": "kr",
  japan: "jp",
  america: "us",
};

export function getCountryFlagUrl(slug: string): string {
  const iso = countryFlagIso[slug] ?? "bd";
  return `https://flagcdn.com/w80/${iso}.png`;
}
