export const FLORAL_STYLES = [
  "roses",
  "olive",
  "eucalyptus",
  "peonies",
  "wildflowers",
  "ivy",
] as const;
export type FloralStyle = (typeof FLORAL_STYLES)[number];

export const FLORAL_STYLE_LABELS: Record<FloralStyle, string> = {
  roses: "Rosas e folhas",
  olive: "Ramos de oliveira",
  eucalyptus: "Eucalipto",
  peonies: "Peônias",
  wildflowers: "Flores silvestres",
  ivy: "Hera e ramagens",
};

export function parseFloralStyle(value: string | null | undefined): FloralStyle {
  if (value && (FLORAL_STYLES as readonly string[]).includes(value)) {
    return value as FloralStyle;
  }
  return "roses";
}
