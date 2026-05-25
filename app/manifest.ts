import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BeyondBorders",
    short_name: "BeyondBorders",
    description: "Your trusted partner for international education and travel.",
    start_url: "/",
    display: "standalone",
    background_color: "#F5EDDA",
    theme_color: "#2C1506",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
