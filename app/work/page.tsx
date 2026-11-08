import type { Metadata } from "next";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { ContactCta } from "@/components/home/ContactCta";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Website Work",
  description: `Explore ${projects.length} live websites designed and developed by VIRTUAL FIRA. Every project opens on its original domain.`,
  alternates: { canonical: "/work" },
};

/** 13 entries, packed into a 12-column grid with deliberately uneven rows. */
const layout = [
  { span: "lg:col-span-7", aspect: "aspect-[16/10]", offset: "" },
  { span: "lg:col-span-5", aspect: "aspect-[4/5]", offset: "lg:mt-24" },
  { span: "lg:col-span-5", aspect: "aspect-[4/5]", offset: "" },
  { span: "lg:col-span-7", aspect: "aspect-[16/10]", offset: "lg:mt-20" },
  { span: "lg:col-span-12", aspect: "aspect-[21/9]", offset: "" },
  { span: "lg:col-span-4", aspect: "aspect-square", offset: "" },
  { span: "lg:col-span-8", aspect: "aspect-[16/10]", offset: "lg:mt-16" },
  { span: "lg:col-span-6", aspect: "aspect-[4/3]", offset: "" },
  { span: "lg:col-span-6", aspect: "aspect-[4/3]", offset: "lg:mt-20" },
  { span: "lg:col-span-7", aspect: "aspect-[16/10]", offset: "" },
  { span: "lg:col-span-5", aspect: "aspect-[4/5]", offset: "lg:mt-24" },
  { span: "lg:col-span-5", aspect: "aspect-square", offset: "" },
  { span: "lg:col-span-7", aspect: "aspect-[16/10]", offset: "lg:mt-16" },
];

export default function WorkPage() {
  return (
    <>
      <section className="pb-8 pt-12 sm:pt-20">
        <div className="container-x">
          <h1 className="display text-[clamp(2.8rem,10vw,10rem)]">Website work</h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/80">
            {projects.length} live websites. Open any project for details, or visit the original site in a new tab.
          </p>
        </div>
      </section>
      <section aria-label="Website projects" className="pb-24 pt-12">
        <div className="container-x grid gap-x-8 gap-y-14 lg:grid-cols-12 lg:items-start">
          {projects.map((p, i) => (
            <ProjectCard
              key={p.slug}
              project={p}
              index={i}
              aspect={layout[i % layout.length].aspect}
              sizes="(min-width: 1024px) 55vw, 100vw"
              priority={i < 2}
              className={`${layout[i % layout.length].span} ${layout[i % layout.length].offset}`}
            />
          ))}
        </div>
      </section>
      <ContactCta context="website" />
    </>
  );
}
