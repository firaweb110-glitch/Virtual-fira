import type { Project } from "../types";

/**
 * The 13 website projects, with the exact URLs supplied by VIRTUAL FIRA.
 * `category` and `summary` are intentionally left empty until verified:
 * add them here and every card and detail page updates automatically.
 */
export const projects: Project[] = [
  { slug: "nuview-treatment", title: "NuView Treatment", url: "https://nuviewtreatment.com/" },
  { slug: "miso-robotics", title: "Miso Robotics", url: "https://misorobotics.com/" },
  { slug: "redbud-florals", title: "Redbud Florals", url: "https://www.redbudflorals.com/" },
  { slug: "oakland-fund", title: "Oakland Fund", url: "https://www.oaklandfund.org/" },
  { slug: "spring-hill-medical", title: "Spring Hill Medical", url: "https://springhillmed.com/" },
  { slug: "design-for-recovery", title: "Design for Recovery", url: "https://designforrecovery.com/" },
  { slug: "distributor-daddy", title: "Distributor Daddy", url: "https://distributordaddy.com/" },
  { slug: "city-lights-limousine", title: "City Lights Limousine", url: "https://www.citylightslimousine.com/" },
  { slug: "we-three-foodstuff", title: "We Three Foodstuff", url: "https://wethreefoodstuff.com/" },
  { slug: "misty-rose", title: "Misty Rose", url: "https://mistyrose-chamois-175849.hostingersite.com/" },
  { slug: "iri-landscape", title: "IRI Landscape", url: "https://irilandscape.com/" },
  { slug: "dimgrey-okapi", title: "Dimgrey Okapi", url: "https://dimgrey-okapi-241670.hostingersite.com/" },
  { slug: "lightgray-termite", title: "Lightgray Termite", url: "https://lightgray-termite-172389.hostingersite.com/" },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export function projectSummary(p: Project): string {
  return p.summary ?? `A live website project. Open it to see the full experience on the original domain.`;
}

export function adjacentProjects(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return {
    prev: projects[(i - 1 + projects.length) % projects.length],
    next: projects[(i + 1) % projects.length],
  };
}
