export const siteConfig = {
  name: "BeyondBorders",
  description:
    "Visas, university places and trips abroad, handled out of Istanbul since 2019. Around six thousand people through so far, and we have not lost a visa yet.",
  url: "https://divebeyondborders.com",
  contact: {
    email: "divebeyondborders@gmail.com",
    /**
     * E.164 without the plus. Single source of truth: both the plain chat link
     * below and the pre-filled links in lib/whatsapp.ts are built from it.
     */
    whatsappE164: "905362563945",
    whatsappDisplay: "+90 536 256 3945",
    /**
     * Plain "say hello" chat link, no pre-filled text. This replaced the old
     * wa.me/message/ID4JRJV7DFKAM1 short link, which was tied to the previous
     * number's account and would have kept routing to it.
     */
    whatsappLink: "https://wa.me/905362563945",
    instagram: "https://instagram.com/_beyondborders46",
    tiktok: "https://tiktok.com/@dive_beyondborder",
    location: "Istanbul, Türkiye",
    mapsLink: "https://maps.google.com/?q=Istanbul,Turkey",
  },
  stats: {
    applicants: "6,000+",
    successRate: "100%",
    founded: "2019",
    services: "6",
  },
};
