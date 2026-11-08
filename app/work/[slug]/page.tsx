import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ProjectPreview } from "@/components/portfolio/ProjectPreview";
import { ButtonLink } from "@/components/ui/Button";
import { ContactCta } from "@/components/home/ContactCta";
import { adjacentProjects, getProject, projects, projectSummary } from "@/data/projects";
import { domainOf } from "@/lib/utils";

type Params = { slug: string };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: `${p.title} - Website Project`,
    description: `${p.title}: a live website project by VIRTUAL FIRA. View the project and visit ${domainOf(p.url)}.`,
    alternates: { canonical: `/work/${p.slug}` },
  };
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const index = projects.indexOf(project);
  const { prev, next } = adjacentProjects(slug);

  return (
    <>
      <article>
        <div className="container-x pt-10 sm:pt-14">
          <Link href="/work" className="inline-flex items-center gap-2 text-sm font-medium underline-offset-4 hover:underline">
            <ArrowLeft aria-hidden className="h-4 w-4" /> All website work
          </Link>
          <h1 className="display mt-6 text-[clamp(2.6rem,9vw,9rem)]">{project.title}</h1>
        </div>

        <div className="container-x mt-10">
          <div className="relative aspect-[16/10] w-full sm:aspect-[16/9]">
            <ProjectPreview project={project} index={index} sizes="100vw" priority />
          </div>
        </div>

        <div className="container-x mt-12 grid gap-10 pb-24 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="max-w-xl text-xl leading-relaxed">{projectSummary(project)}</p>
            <div className="mt-8">
              <ButtonLink href={project.url} external variant="primary">Visit Live Website</ButtonLink>
            </div>
          </div>
          <dl className="grid gap-5 self-start border-t border-ink pt-5 sm:grid-cols-2 lg:col-span-4 lg:col-start-9 lg:grid-cols-1">
            <div>
              <dt className="text-sm text-mute">Project</dt>
              <dd className="font-display text-lg font-semibold">{project.title}</dd>
            </div>
            <div>
              <dt className="text-sm text-mute">Category</dt>
              <dd className="font-display text-lg font-semibold">{project.category ?? "Website project"}</dd>
            </div>
            <div>
              <dt className="text-sm text-mute">Live domain</dt>
              <dd className="font-display text-lg font-semibold break-all">{domainOf(project.url)}</dd>
            </div>
            <div>
              <dt className="text-sm text-mute">Service</dt>
              <dd className="font-display text-lg font-semibold">Website design &amp; development</dd>
            </div>
          </dl>
        </div>

        <nav aria-label="More projects" className="border-y border-ink">
          <div className="container-x grid sm:grid-cols-2">
            <Link href={`/work/${prev.slug}`} className="group flex items-center gap-4 py-8 hover:text-fira sm:border-r sm:border-ink">
              <ArrowLeft aria-hidden className="h-6 w-6 transition-transform group-hover:-translate-x-1" />
              <span><span className="block text-sm text-mute">Previous</span><span className="font-display text-2xl font-bold tracking-tighter">{prev.title}</span></span>
            </Link>
            <Link href={`/work/${next.slug}`} className="group flex items-center justify-end gap-4 border-t border-ink py-8 text-right hover:text-fira sm:border-t-0 sm:pl-8">
              <span><span className="block text-sm text-mute">Next</span><span className="font-display text-2xl font-bold tracking-tighter">{next.title}</span></span>
              <ArrowRight aria-hidden className="h-6 w-6 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </nav>
      </article>
      <ContactCta context="website" />
    </>
  );
}
