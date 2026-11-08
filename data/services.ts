import type { Service } from "../types";

export const services: Service[] = [
  {
    id: "web",
    number: "01",
    title: "Website Design & Development",
    description: "Beautiful, functional and responsive websites designed around business goals.",
    href: "/work",
    cta: "See website work",
  },
  {
    id: "tours",
    number: "02",
    title: "360° Virtual Tours",
    description: "Immersive virtual experiences that allow customers to explore spaces remotely.",
    href: "/virtual-tours",
    cta: "Explore virtual tours",
  },
  {
    id: "branding",
    number: "03",
    title: "Branding & Identity",
    description: "Distinctive brand identities that create a consistent and memorable presence.",
    href: "/branding",
    cta: "Discover branding",
  },
];

export const industries = [
  { name: "Real Estate", note: "Sites and walkthroughs that let buyers explore before they visit." },
  { name: "Hospitality", note: "Hotels and resorts shown as places people can step into." },
  { name: "Healthcare", note: "Clear, trustworthy websites for clinics and care providers." },
  { name: "Restaurants", note: "Menus, ambience and bookings in one confident presence." },
  { name: "Retail", note: "Brand and web presence that make a store easy to find and remember." },
  { name: "Corporate Businesses", note: "Professional identities and sites for established teams." },
];

export const process = [
  { number: "01", title: "Discover", text: "Understand the business, goals and audience." },
  { number: "02", title: "Design", text: "Create the visual direction and user experience." },
  { number: "03", title: "Build", text: "Develop, test and refine the digital solution." },
  { number: "04", title: "Launch", text: "Deliver the finished digital experience." },
];
