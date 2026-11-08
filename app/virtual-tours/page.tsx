import type { Metadata } from "next";
import { Panorama } from "@/components/ui/Panorama";
import { TourCard } from "@/components/virtual-tours/TourCard";
import { TourEmbed } from "@/components/virtual-tours/TourEmbed";
import { ContactCta } from "@/components/home/ContactCta";
import { tours } from "@/data/tours";

export const metadata: Metadata = {
  title: "360° Virtual Tours",
  description: `Explore ${tours.length} interactive 360° virtual tours by VIRTUAL FIRA. Look around, move through spaces and go full screen.`,
  alternates: { canonical: "/virtual-tours" },
};

const layout = [
  { span: "lg:col-span-7", aspect: "aspect-[16/9]", offset: "" },
  { span: "lg:col-span-5", aspect: "aspect-[4/5]", offset: "lg:mt-20" },
  { span: "lg:col-span-4", aspect: "aspect-square", offset: "" },
  { span: "lg:col-span-8", aspect: "aspect-[21/10]", offset: "lg:mt-12" },
  { span: "lg:col-span-6", aspect: "aspect-[4/3]", offset: "" },
  { span: "lg:col-span-6", aspect: "aspect-[4/3]", offset: "lg:mt-16" },
  { span: "lg:col-span-5", aspect: "aspect-[16/10]", offset: "" },
];

export default function VirtualToursPage() {
  const [lead, ...rest] = tours;
  return (
    <div className="bg-ink text-paper">
      <section className="relative overflow-hidden pb-16 pt-12 sm:pt-20">
        <Panorama seed={4} animated className="absolute inset-x-0 top-0 h-64 opacity-25" />
        <div className="container-x relative">
          <h1 className="display text-[clamp(2.8rem,10vw,10rem)]">
            Virtual <span className="text-fira">tours</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/80">
            {tours.length} interactive 360° experiences. Load one here, open it in its own tab, or visit its page.
          </p>
        </div>
      </section>

      <section aria-label="Featured tour" className="pb-20">
        <div className="container-x">
          <TourEmbed
            url={lead.url}
            title={`${lead.title} - interactive 360° tour`}
            poster={<Panorama seed={2} className="absolute inset-0 h-full w-full" />}
          />
          <div className="mt-4 flex items-baseline justify-between gap-4">
            <h2 className="font-display text-3xl font-bold tracking-tighter">{lead.title}</h2>
            <span className="text-paper/60">{lead.provider}</span>
          </div>
        </div>
      </section>

      <section aria-label="More virtual tours" className="pb-24">
        <div className="container-x grid gap-x-8 gap-y-14 lg:grid-cols-12 lg:items-start">
          {rest.map((t, i) => (
            <TourCard
              key={t.slug}
              tour={t}
              index={i + 1}
              aspect={layout[i % layout.length].aspect}
              sizes="(min-width: 1024px) 55vw, 100vw"
              className={`${layout[i % layout.length].span} ${layout[i % layout.length].offset}`}
            />
          ))}
        </div>
      </section>
      <ContactCta context="tour" title="Want your space explorable online?" text="Tell us about the space and we'll plan the tour." />
    </div>
  );
}
