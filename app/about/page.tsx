import type { Metadata } from "next";
import { Approach } from "@/components/home/Approach";
import { ContactCta } from "@/components/home/ContactCta";
import { Panorama } from "@/components/ui/Panorama";

export const metadata: Metadata = {
  title: "About",
  description:
    "VIRTUAL FIRA is a digital creative studio combining creative design and digital technology to build stronger digital presences for businesses.",
  alternates: { canonical: "/about" },
};

const capabilities = [
  "Website design and development",
  "360° virtual tours",
  "Logo and brand identity design",
  "Responsive, accessible interfaces",
  "SEO-ready site structure",
  "Launch support",
];

export default function AboutPage() {
  return (
    <>
      <section className="pb-16 pt-12 sm:pt-20">
        <div className="container-x">
          <h1 className="display text-[clamp(2.8rem,10vw,10rem)]">About<br />Virtual Fira</h1>
          <p className="mt-8 max-w-xl text-xl leading-relaxed">
            VIRTUAL FIRA is a digital creative studio. We combine creative design and digital technology to help
            businesses build a stronger digital presence.
          </p>
        </div>
      </section>

      <Panorama seed={9} animated className="h-40 w-full sm:h-56" />

      <section aria-labelledby="philosophy" className="py-20">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <h2 id="philosophy" className="display text-[clamp(2rem,4.6vw,4.4rem)] lg:col-span-5">Creative philosophy</h2>
          <div className="space-y-5 text-lg leading-relaxed text-ink/80 lg:col-span-6 lg:col-start-7">
            <p>Good design is a business tool. It should make a company easier to find, easier to trust and easier to remember.</p>
            <p>We start from what the business needs, then choose the boldest idea that still serves the visitor.</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="digital" className="bg-paper-dark py-20">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <h2 id="digital" className="display text-[clamp(2rem,4.6vw,4.4rem)] lg:col-span-5">Our approach to digital experiences</h2>
          <div className="space-y-5 text-lg leading-relaxed text-ink/80 lg:col-span-6 lg:col-start-7">
            <p>Websites, virtual tours and brand identity work best together. Each one reinforces the others.</p>
            <p>We build for real devices and real people: fast pages, clear navigation, and experiences that work on a phone first.</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="capabilities" className="py-20">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <h2 id="capabilities" className="display text-[clamp(2rem,4.6vw,4.4rem)] lg:col-span-5">Core capabilities</h2>
          <ul className="lg:col-span-6 lg:col-start-7">
            {capabilities.map((c) => (
              <li key={c} className="border-t border-ink/25 py-4 font-display text-2xl font-semibold tracking-tight last:border-b">{c}</li>
            ))}
          </ul>
        </div>
      </section>

      <Approach title="How a project runs." />
      <ContactCta />
    </>
  );
}
