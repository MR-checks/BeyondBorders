export type RegionId =
  | "marmara"
  | "cappadocia"
  | "aegean"
  | "turquoise"
  | "blacksea"
  | "anatolia";

export type ExperienceId =
  | "balloon"
  | "boat"
  | "ruins"
  | "beach"
  | "hike"
  | "food"
  | "culture"
  | "snow"
  | "thermal"
  | "city";

/** "year-round" runs the whole calendar. "seasonal" has a window worth planning around. */
export type SeasonKind = "year-round" | "seasonal";

export type ImageCredit = {
  author: string;
  license: string;
  source: string;
};

export type PlaceImage = {
  src: string;
  width: number;
  height: number;
  /** Average colour of the photo. Fills the frame while the image decodes. */
  color: string;
  credit?: ImageCredit;
};

export type Place = {
  id: string;
  name: string;
  region: RegionId;
  /** Province or nearest city, shown under the name. */
  area: string;
  teaser: string;
  description: string;
  highlights: string[];
  experiences: ExperienceId[];
  season: SeasonKind;
  /** Plain-language guidance, never a fixed date. */
  window: string;
  /** Caveat worth saying out loud before someone books around it. */
  note?: string;
  image: PlaceImage;
};

export type Region = {
  id: RegionId;
  name: string;
  tagline: string;
  blurb: string;
};

export type Experience = {
  id: ExperienceId;
  label: string;
};

export type TravelStyleId = "group" | "private" | "vip";

export type TravelStyle = {
  id: TravelStyleId;
  name: string;
  /** Button label. Written out rather than derived, so "VIP" keeps its capitals. */
  cta: string;
  bestFor: string;
  description: string;
  includes: string[];
};
