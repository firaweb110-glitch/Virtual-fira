import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { ButtonLink } from "@/components/ui/Button";
import { projects } from "@/data/projects";

/** Editorial asymmetric grid with differing image proportions. */
const layout = [
  { span: "lg:col-span-7", aspect: "aspect-[16/10]", offset: "" },
  { span: "lg:col-span-5", aspect: "aspect-[4/5]", offset: "lg:mt-28" },
  { span: "lg:col-span-4", aspect: "aspect-square", offset: "" },
  { span: "lg:col-span-8", aspect: "aspect-[16/9]", offset: "lg:mt-16" },
  { span: "lg:col-span-6 lg:col-start-4", aspect: "aspect-[21/10]", offset: "" },
];

export function SelectedWork() {
  const featured = projects.slice(0, layout.length);
  return (
    <section aria-labelledby="work-title" className="py-20 sm:py-28">
      <div className="container-x">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="work-title" className="display text-[clamp(2.2rem,6.4vw,6rem)] lg:col-span-8">
            Digital work. Real experiences.
          </h2>
          <p className="max-w-sm text-lg text-ink/75 lg:col-span-4 lg:justify-self-end">
            Selected live websites. Each one opens on its original domain.
          </p>
        </div>

        <div className="mt-14 grid gap-x-8 gap-y-14 lg:grid-cols-12 lg:items-start">
          {featured.map((p, i) => (
            <ProjectCard
              key={p.slug}
              project={p}
              index={i}
              aspect={layout[i].aspect}
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority={i === 0}
              primary="external"
              className={`${layout[i].span} ${layout[i].offset}`}
            />
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <ButtonLink href="/work" variant="dark">See all {projects.length} websites</ButtonLink>
        </div>
      </div>
    </section>
  );
}
