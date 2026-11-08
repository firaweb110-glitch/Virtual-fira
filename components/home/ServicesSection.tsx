import { services } from "@/data/services";
import { TextLink } from "@/components/ui/Button";
import { ServiceVisual } from "./ServiceVisual";

export function ServicesSection() {
  return (
    <section aria-labelledby="services-title" className="bg-paper-dark py-20 sm:py-28">
      <div className="container-x">
        <h2 id="services-title" className="display max-w-5xl text-[clamp(2.2rem,6.4vw,6rem)]">
          Creative thinking. Digital execution.
        </h2>
        <ol className="mt-14 border-t border-ink">
          {services.map((s) => (
            <li key={s.id} className="grid gap-6 border-b border-ink py-10 lg:grid-cols-12 lg:items-center lg:py-14">
              <span className="font-display text-xl font-semibold text-fira lg:col-span-1">{s.number}</span>
              <h3 className="font-display text-3xl font-bold uppercase leading-[0.95] tracking-tighter sm:text-4xl lg:col-span-5 lg:text-5xl">
                {s.title}
              </h3>
              <div className="lg:col-span-3">
                <p className="max-w-sm text-lg leading-relaxed text-ink/80">{s.description}</p>
                <div className="mt-5"><TextLink href={s.href}>{s.cta}</TextLink></div>
              </div>
              <div className="lg:col-span-3 lg:justify-self-end"><ServiceVisual id={s.id} /></div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
