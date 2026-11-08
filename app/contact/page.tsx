import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { ButtonLink } from "@/components/ui/Button";
import { hasWhatsApp, siteConfig, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a project with VIRTUAL FIRA. Tell us about your website, virtual tour or branding needs.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ service?: string }> }) {
  const { service } = await searchParams;
  return (
    <section className="py-12 sm:py-20">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h1 className="display text-[clamp(2.8rem,8vw,7.5rem)]">Start a project</h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/80">
            Tell us what you have in mind: a website, a 360° virtual tour, a brand identity, or a mix. We reply to every
            inquiry.
          </p>

          <div className="mt-10 border-t border-ink pt-6">
            <h2 className="font-display text-xl font-semibold">Prefer to talk directly?</h2>
            <ul className="mt-4 space-y-3">
              {hasWhatsApp && (
                <>
                  <li><ButtonLink href={whatsappLink("website")!} external variant="dark">WhatsApp about a website</ButtonLink></li>
                  <li><ButtonLink href={whatsappLink("tour")!} external variant="outline">WhatsApp about a virtual tour</ButtonLink></li>
                  <li><ButtonLink href={whatsappLink("branding")!} external variant="outline">WhatsApp about branding</ButtonLink></li>
                </>
              )}
              {siteConfig.email && (
                <li><a className="font-medium underline underline-offset-4 hover:text-fira" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></li>
              )}
              {siteConfig.phone && (
                <li><a className="font-medium underline underline-offset-4 hover:text-fira" href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>{siteConfig.phone}</a></li>
              )}
              {!hasWhatsApp && !siteConfig.email && !siteConfig.phone && (
                <li className="text-ink/75">Use the form and we will reply by email or phone.</li>
              )}
            </ul>
          </div>
        </div>
        <div className="lg:col-span-7">
          <ContactForm defaultService={service} />
        </div>
      </div>
    </section>
  );
}
