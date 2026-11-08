import type { Tour, TourProvider } from "../types";

const raw: { url: string; provider: TourProvider }[] = [
  { url: "https://tour.panoee.net/6ad752d02ae6ddc50a7756b1/img_20261020_124615_00_066", provider: "Panoee" },
  { url: "https://tours.clearpano.com/FcYEIlYF", provider: "ClearPano" },
  { url: "https://kuula.co/share/collection/7H6Rz?logo=1&info=1&fs=1&vr=0&sd=1&thumbs=1", provider: "Kuula" },
  { url: "https://tours.clearpano.com/jumovQor", provider: "ClearPano" },
  { url: "https://tours.clearpano.com/mX2u406D", provider: "ClearPano" },
  { url: "https://tours.clearpano.com/IoJQbtj4", provider: "ClearPano" },
  { url: "https://tours.clearpano.com/pEIMIIqx", provider: "ClearPano" },
  { url: "https://tours.clearpano.com/YS-3nqh4", provider: "ClearPano" },
];

/**
 * The 8 virtual tours. Neutral labels are used until each tour's venue/type
 * has been verified - set `venue` on an entry to show it everywhere.
 */
export const tours: Tour[] = raw.map((t, i) => {
  const number = String(i + 1).padStart(2, "0");
  return { slug: `tour-${number}`, number, title: `360° Tour ${number}`, ...t };
});

export const getTour = (slug: string) => tours.find((t) => t.slug === slug);

export function adjacentTours(slug: string) {
  const i = tours.findIndex((t) => t.slug === slug);
  return { prev: tours[(i - 1 + tours.length) % tours.length], next: tours[(i + 1) % tours.length] };
}
