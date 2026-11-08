import Link from "next/link";
import { ProjectPreview } from "./ProjectPreview";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { TextLink } from "@/components/ui/Button";
import { projectSummary } from "@/data/projects";
import { domainOf, cn } from "@/lib/utils";
import type { Project } from "@/types";

type Props = {
  project: Project;
  index: number;
  /** Tailwind aspect-ratio class for the media area, e.g. aspect-[16/10]. */
  aspect: string;
  sizes: string;
  priority?: boolean;
  /** Home page opens the original website directly in a new tab. */
  primary?: "detail" | "external";
  className?: string;
};

export function ProjectCard({ project, index, aspect, sizes, priority, primary = "detail", className }: Props) {
  const detailHref = `/work/${project.slug}`;
  const media = (
    <ImageReveal>
      <div className={cn("relative w-full", aspect)}>
        <ProjectPreview project={project} index={index} sizes={sizes} priority={priority} />
      </div>
    </ImageReveal>
  );

  return (
    <article className={cn("group/card", className)}>
      {primary === "external" ? (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} - open live website in a new tab`}
          className="block"
        >
          {media}
        </a>
      ) : (
        <Link href={detailHref} aria-label={`${project.title} - view project details`} className="block">
          {media}
        </Link>
      )}
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="font-display text-2xl font-bold tracking-tighter sm:text-3xl">{project.title}</h3>
        <span className="shrink-0 text-sm text-mute">{project.category ?? "Website project"}</span>
      </div>
      <p className="mt-2 max-w-md text-[15px] leading-relaxed text-ink/75">{projectSummary(project)}</p>
      <p className="mt-1 text-sm text-mute">{domainOf(project.url)}</p>
      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
        {primary === "external" ? (
          <TextLink href={project.url} external>View Project</TextLink>
        ) : (
          <>
            <TextLink href={detailHref}>Project details</TextLink>
            <TextLink href={project.url} external>Visit Live Website</TextLink>
          </>
        )}
      </div>
    </article>
  );
}
