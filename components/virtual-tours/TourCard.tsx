import Link from "next/link";
import Image from "next/image";
import { Panorama } from "@/components/ui/Panorama";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { localImage } from "@/lib/media";
import { cn } from "@/lib/utils";
import type { Tour } from "@/types";

type Props = { tour: Tour; index: number; aspect?: string; sizes: string; className?: string };

/** Card used on the tours index. Uses a real captured preview if one exists, otherwise a graphic panorama strip. */
export function TourCard({ tour, index, aspect = "aspect-[16/9]", sizes, className }: Props) {
  const shot = localImage("tours", tour.slug);
  return (
    <article className={cn("group/card", className)}>
      <Link href={`/virtual-tours/${tour.slug}`} aria-label={`${tour.title} - open tour page`} className="block">
        <ImageReveal>
          <div className={cn("relative w-full overflow-hidden", aspect)}>
            {shot ? (
              <Image src={shot} alt={`Preview of ${tour.title}`} fill sizes={sizes} className="object-cover transition-transform duration-700 group-hover/card:scale-[1.04]" />
            ) : (
              <Panorama seed={index + 2} tone={index % 2 ? "paper" : "ink"} className="absolute inset-0 h-full w-full transition-transform duration-700 group-hover/card:scale-[1.04]" />
            )}
            <span className="absolute left-4 top-4 bg-paper px-3 py-1 font-display text-sm font-semibold text-ink">360°</span>
          </div>
        </ImageReveal>
      </Link>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="font-display text-2xl font-bold tracking-tighter">{tour.title}</h3>
        <span className="text-sm opacity-60">{tour.provider}</span>
      </div>
      {tour.venue && <p className="mt-1 text-sm opacity-75">{tour.venue}</p>}
      <Link href={`/virtual-tours/${tour.slug}`} className="mt-3 inline-block font-medium underline underline-offset-[6px] hover:decoration-fira">
        Explore 360° Tour
      </Link>
    </article>
  );
}
