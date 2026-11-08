import type { Metadata } from "next";
import Image from "next/image";
import { Approach } from "@/components/home/Approach";
import { ContactCta } from "@/components/home/ContactCta";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Branding & Brand Identity",
  description:
    "VIRTUAL FIRA creates distinctive brand identities: logo design, typography and colour systems, and consistent visual applications.",
  alternates: { canonical: "/branding" },
};

const swatches = [
  { name: "Ink", hex: "#0B2A2D", cls: "bg-ink text-paper" },
  { name: "Slate", hex: "#3C4F51", cls: "bg-slate-logo text-paper" },
  { name: "Paper", hex: "#F3F0E9", cls: "bg-paper-dark text-ink" },
  { name: "Signal", hex: "#FF6A35", cls: "bg-fira text-ink" },
];

const applications = [
  "Stationery and business cards",
  "Social media profiles and templates",
  "Signage and environmental graphics",
  "Packaging and labels",
  "Presentations and documents",
  "Website and digital interfaces",
];

export default function BrandingPage() {
  return (
    <>
      <section className="pb-16 pt-12 sm:pt-20">
        <div className="container-x">
          <h1 className="display text-[clamp(2.8rem,10vw,10rem)]">
            Brands people <span className="sm:ml-[8vw]">remember.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink/80">
            Distinctive brand identities that create a consistent and memorable presence, from the first logo sketch to
            every place the brand appears.
          </p>
          <div className="mt-8"><ButtonLink href="/contact?service=Branding" variant="primary">Discuss your brand</ButtonLink></div>
        </div>
      </section>

      <section aria-labelledby="identity" className="border-t border-ink py-20">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <h2 id="identity" className="display text-[clamp(2rem,4.6vw,4.4rem)] lg:col-span-5">Brand identity</h2>
          <div className="space-y-5 text-lg leading-relaxed text-ink/80 lg:col-span-6 lg:col-start-7">
            <p>
              An identity is more than a logo. It is the set of decisions (name, mark, colour, type, tone) that make a
              business recognisable at a glance and trustworthy over time.
            </p>
            <p>
              We define those decisions together with you, then document them so they hold up across a website, a
              storefront, a social feed and a printed brochure.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="logo" className="bg-paper-dark py-20">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <h2 id="logo" className="display text-[clamp(2rem,4.6vw,4.4rem)]">Logo design</h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/80">
              A mark that works at favicon size and on a signboard. We explore concepts, refine one direction and
              deliver the logo in the formats you actually need.
            </p>
            <p className="mt-4 text-sm text-mute">Shown: the VIRTUAL FIRA logo.</p>
          </div>
          <div className="flex items-center justify-center bg-paper p-10 lg:col-span-7">
            <Image src="/logo/virtual-fira-logo.png" alt="VIRTUAL FIRA logo" width={1136} height={414} sizes="(min-width: 1024px) 50vw, 90vw" className="h-auto w-full max-w-xl" />
          </div>
        </div>
      </section>

      <section aria-labelledby="type-color" className="py-20">
        <div className="container-x">
          <h2 id="type-color" className="display text-[clamp(2rem,4.6vw,4.4rem)]">Typography &amp; colour systems</h2>
          <p className="mt-6 max-w-xl text-lg text-ink/80">
            Our own identity, as a worked example of a system: a small palette and two clearly different typefaces.
          </p>
          <div className="mt-12 grid gap-8 lg:grid-cols-12">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:col-span-7">
              {swatches.map((s) => (
                <div key={s.name} className={`flex aspect-[3/4] flex-col justify-end p-4 ${s.cls}`}>
                  <span className="font-display text-xl font-bold">{s.name}</span>
                  <span className="text-sm opacity-80">{s.hex}</span>
                </div>
              ))}
            </div>
            <div className="space-y-6 border border-ink p-6 lg:col-span-5">
              <div>
                <p className="text-sm text-mute">Display: Space Grotesk</p>
                <p className="font-display text-6xl font-bold leading-none tracking-tighter">Aa Bold</p>
              </div>
              <div>
                <p className="text-sm text-mute">Body: Inter</p>
                <p className="text-lg">The quick brown fox jumps over the lazy dog.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="applications" className="bg-ink py-20 text-paper">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <h2 id="applications" className="display text-[clamp(2rem,4.6vw,4.4rem)] lg:col-span-5">Visual identity applications</h2>
          <ul className="lg:col-span-6 lg:col-start-7">
            {applications.map((a) => (
              <li key={a} className="border-t border-paper/25 py-4 font-display text-2xl font-semibold tracking-tight last:border-b">{a}</li>
            ))}
          </ul>
        </div>
      </section>

      <Approach tone="paper" title="How a brand takes shape." />
      <ContactCta context="branding" title="Ready to shape your brand?" text="Tell us about your business and we'll start with the idea." />
    </>
  );
}
