import { ButtonLink } from "@/components/ui/Button";
import { whatsappLink, type WhatsAppContext } from "@/lib/site";

export function ContactCta({
  context = "general",
  title = "Have something great in mind?",
  text = "Let's turn your next idea into something extraordinary.",
}: {
  context?: WhatsAppContext;
  title?: string;
  text?: string;
}) {
  const wa = whatsappLink(context);
  return (
    <section aria-labelledby="cta-title" className="bg-fira py-20 text-ink sm:py-28">
      <div className="container-x">
        <h2 id="cta-title" className="display max-w-5xl text-[clamp(2.6rem,8vw,8rem)]">{title}</h2>
        <p className="mt-6 max-w-lg text-xl">{text}</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/contact" variant="dark">Start a Project</ButtonLink>
          {wa && (
            <ButtonLink href={wa} external variant="outline">Chat on WhatsApp</ButtonLink>
          )}
        </div>
      </div>
    </section>
  );
}
