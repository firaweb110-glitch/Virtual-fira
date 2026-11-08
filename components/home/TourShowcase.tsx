import Link from "next/link";
import { Panorama } from "@/components/ui/Panorama";
import { ButtonLink } from "@/components/ui/Button";
import { TourEmbed } from "@/components/virtual-tours/TourEmbed";
import { tours } from "@/data/tours";

export function TourShowcase() {
  const [lead, ...rest] = tours;
  const strip = rest.slice(0, 3);
  return (
    <section aria-labelledby="tour-title" className="relative overflow-hidden bg-ink py-20 text-paper sm:py-28">
      <Panorama seed={7} animated className="absolute inset-x-0 top-0 h-48 opacity-25" />
      <div className="container-x relative">
        <h2 id="tour-title" className="display max-w-4xl text-[clamp(2.4rem,7vw,6.8rem)]">
          Step inside. <span className="text-fira">Explore</span> beyond.
        </h2>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/80">
          Drag, look around and move through real 360° tours. Load one below, or open any tour in its own tab.
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <TourEmbed
              url={lead.url}
              title={`${lead.title} - interactive 360° tour`}
              poster={<Panorama seed={2} className="absolute inset-0 h-full w-full" />}
            />
          </div>
          <div className="flex flex-col justify-between lg:col-span-4">
            <div>
              <h3 className="font-display text-3xl font-bold tracking-tighter">{lead.title}</h3>
              <p className="mt-1 text-paper/60">Hosted on {lead.provider}</p>
              <p className="mt-5 text-paper/80">
                Full-screen, touch and mouse navigation. Use the controls inside the tour to move between spaces.
              </p>
            </div>
            <ButtonLink href={`/virtual-tours/${lead.slug}`} variant="paper" className="mt-8 self-start">
              Explore Virtual Tour
            </ButtonLink>
          </div>
        </div>

        <ul className="mt-16 grid gap-6 sm:grid-cols-3">
          {strip.map((t, i) => (
            <li key={t.slug}>
              <Link href={`/virtual-tours/${t.slug}`} className="group block" aria-label={`${t.title} - open tour page`}>
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Panorama seed={i + 10} tone={i % 2 ? "paper" : "ink"} className="absolute inset-0 h-full w-full border border-paper/20 transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute left-3 top-3 bg-paper px-2.5 py-0.5 font-display text-sm font-semibold text-ink">360°</span>
                </div>
                <p className="mt-3 font-display text-lg font-semibold">{t.title}</p>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12">
          <ButtonLink href="/virtual-tours" variant="primary">See all {tours.length} virtual tours</ButtonLink>
        </div>
      </div>
    </section>
  );
}
