import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Panorama } from "@/components/ui/Panorama";
import { TourEmbed } from "@/components/virtual-tours/TourEmbed";
import { ContactCta } from "@/components/home/ContactCta";
import { adjacentTours, getTour, tours } from "@/data/tours";

type Params = { slug: string };

export function generateStaticParams() {
  return tours.map((t) => ({ slug: t.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const t = getTour(slug);
  if (!t) return {};
  return {
    title: `${t.title} - 360° Virtual Tour`,
    description: `Explore ${t.title}, an interactive 360° virtual tour hosted on ${t.provider} and presented by VIRTUAL FIRA.`,
    alternates: { canonical: `/virtual-tours/${t.slug}` },
  };
}

export default async function TourPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const tour = getTour(slug);
  if (!tour) notFound();
  const { prev, next } = adjacentTours(slug);
  return (
    <div className="bg-ink text-paper">
      <article>
        <div className="container-x pt-10 sm:pt-14">
          <Link href="/virtual-tours" className="inline-flex items-center gap-2 text-sm font-medium underline-offset-4 hover:underline">
            <ArrowLeft aria-hidden className="h-4 w-4" /> All virtual tours
          </Link>
          <h1 className="display mt-6 text-[clamp(2.6rem,9vw,9rem)]">{tour.title}</h1>
          {tour.venue && <p className="mt-4 text-xl text-paper/80">{tour.venue}</p>}
        </div>
        <div className="container-x mt-10">
          <TourEmbed
            autoLoad
            url={tour.url}
            title={`${tour.title} - interactive 360° tour`}
            poster={<Panorama seed={Number(tour.number)} className="absolute inset-0 h-full w-full" />}
          />
        </div>
        <div className="container-x mt-12 grid gap-8 pb-20 lg:grid-cols-12">
          <p className="max-w-xl text-lg leading-relaxed text-paper/85 lg:col-span-7">
            Drag to look around and use the on-screen controls to move through the space. If the tour does not appear
            above, open it in a new tab.
          </p>
          <dl className="border-t border-paper/30 pt-5 lg:col-span-4 lg:col-start-9">
            <dt className="text-sm text-paper/60">Hosted on</dt>
            <dd className="font-display text-lg font-semibold">{tour.provider}</dd>
          </dl>
        </div>
        <nav aria-label="More tours" className="border-y border-paper/30">
          <div className="container-x grid sm:grid-cols-2">
            <Link href={`/virtual-tours/${prev.slug}`} className="group flex items-center gap-4 py-8 hover:text-fira sm:border-r sm:border-paper/30">
              <ArrowLeft aria-hidden className="h-6 w-6 transition-transform group-hover:-translate-x-1" />
              <span><span className="block text-sm text-paper/60">Previous</span><span className="font-display text-2xl font-bold tracking-tighter">{prev.title}</span></span>
            </Link>
            <Link href={`/virtual-tours/${next.slug}`} className="group flex items-center justify-end gap-4 border-t border-paper/30 py-8 text-right hover:text-fira sm:border-t-0 sm:pl-8">
              <span><span className="block text-sm text-paper/60">Next</span><span className="font-display text-2xl font-bold tracking-tighter">{next.title}</span></span>
              <ArrowRight aria-hidden className="h-6 w-6 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </nav>
      </article>
      <ContactCta context="tour" title="Want your space explorable online?" text="Tell us about the space and we'll plan the tour." />
    </div>
  );
}
