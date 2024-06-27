export type SectionNames = "hero" | "about" | "gallery" | "contacts";

export interface SectionRefs {
  hero_ref: React.RefObject<HTMLDivElement>;
  about_ref: React.RefObject<HTMLDivElement>;
  gallery_ref: React.RefObject<HTMLDivElement>;
  contacts_ref: React.RefObject<HTMLDivElement>;
}

export interface SectionHeights {
  hero: number;
  about: number;
  gallery: number;
  contacts: number;
}
