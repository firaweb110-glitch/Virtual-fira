import Image from "next/image";
import { localImage } from "@/lib/media";
import { domainOf, cn } from "@/lib/utils";
import type { Project } from "@/types";

const palettes = [
  { bg: "bg-ink", fg: "text-paper", bar: "bg-paper/10", block: "bg-fira", sub: "bg-paper/15" },
  { bg: "bg-paper-dark", fg: "text-ink", bar: "bg-ink/10", block: "bg-ink", sub: "bg-ink/15" },
  { bg: "bg-fira", fg: "text-ink", bar: "bg-ink/10", block: "bg-ink", sub: "bg-ink/20" },
  { bg: "bg-slate-logo", fg: "text-paper", bar: "bg-paper/10", block: "bg-fira", sub: "bg-paper/20" },
  { bg: "bg-paper", fg: "text-ink", bar: "bg-ink/10", block: "bg-slate-logo", sub: "bg-ink/10" },
];

type Props = { project: Project; index: number; sizes: string; priority?: boolean; className?: string };

/**
 * Shows the real captured screenshot when public/projects/<slug>.jpg exists
 * (run `npm run screenshots`). Otherwise renders a clearly branded preview
 * area - never an invented screenshot.
 */
export function ProjectPreview({ project, index, sizes, priority, className }: Props) {
  const shot = localImage("projects", project.slug);
  const frame = cn("relative h-full w-full overflow-hidden", className);

  if (shot) {
    return (
      <div className={frame}>
        <Image
          src={shot}
          alt={`Screenshot of the ${project.title} website homepage`}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover object-top transition-transform duration-700 ease-out group-hover/card:scale-[1.03]"
        />
      </div>
    );
  }

  const p = palettes[index % palettes.length];
  const variant = index % 3;
  return (
    <div className={cn(frame, p.bg, p.fg)} role="img" aria-label={`Branded preview placeholder for ${project.title}. Open the live website to see the real site.`}>
      <div className={cn("flex items-center gap-2 px-4 py-3", p.bar)}>
        <span className="flex gap-1.5" aria-hidden>
          <i className="h-2.5 w-2.5 rounded-full bg-current opacity-40" />
          <i className="h-2.5 w-2.5 rounded-full bg-current opacity-40" />
          <i className="h-2.5 w-2.5 rounded-full bg-current opacity-40" />
        </span>
        <span className="ml-2 truncate bg-black/10 px-3 py-1 text-xs font-medium opacity-80">{domainOf(project.url)}</span>
      </div>
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 top-11 flex p-5 sm:p-7",
          variant === 0 && "flex-col justify-end",
          variant === 1 && "flex-col items-center justify-center text-center",
          variant === 2 && "flex-row items-end justify-between gap-4",
        )}
      >
        {variant === 2 && <span aria-hidden className={cn("mb-1 h-2/5 w-1/4 transition-all duration-500 group-hover/card:h-3/5", p.block)} />}
        {variant !== 2 && <span aria-hidden className={cn("mb-4 h-2 w-16 transition-all duration-500 group-hover/card:w-28", p.block)} />}
        <span className="font-display text-[clamp(1.6rem,4.2vw,3.4rem)] font-bold leading-[0.95] tracking-tighter">
          {project.title}
        </span>
        {variant === 0 && (
          <span aria-hidden className="mt-5 flex gap-2">
            <i className={cn("h-1.5 w-1/3", p.sub)} />
            <i className={cn("h-1.5 w-1/5", p.sub)} />
          </span>
        )}
      </div>
    </div>
  );
}
