export type NavItem = { label: string; href: string };

export type Project = {
  slug: string;
  title: string;
  url: string;
  /** Only set when the business category has been verified. */
  category?: string;
  /** Short, verified description. A neutral sentence is generated when omitted. */
  summary?: string;
};

export type TourProvider = "Panoee" | "ClearPano" | "Kuula";

export type Tour = {
  slug: string;
  number: string;
  title: string;
  url: string;
  provider: TourProvider;
  /** Only set when the venue / type of the tour has been verified. */
  venue?: string;
};

export type Service = {
  id: "web" | "tours" | "branding";
  number: string;
  title: string;
  description: string;
  href: string;
  cta: string;
};

export type ContactService =
  | "Website Design & Development"
  | "360° Virtual Tour"
  | "Branding"
  | "Multiple Services"
  | "Other";
