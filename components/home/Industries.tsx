import { industries } from "@/data/services";

export function Industries() {
  return (
    <section aria-labelledby="industries-title" className="py-20 sm:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 id="industries-title" className="display text-[clamp(2rem,4.6vw,4.4rem)]">
            Built for businesses that want to be seen.
          </h2>
          <p className="mt-6 max-w-sm text-ink/75">
            The kinds of businesses that benefit most from a sharper website, an explorable space and a consistent
            brand.
          </p>
        </div>
        <ul className="lg:col-span-8">
          {industries.map((ind) => (
            <li key={ind.name} className="group grid gap-2 border-t border-ink/25 py-6 last:border-b sm:grid-cols-[1.1fr_1fr] sm:items-baseline sm:gap-8">
              <span className="font-display text-3xl font-bold tracking-tighter transition-transform duration-300 group-hover:translate-x-2 sm:text-4xl">
                {ind.name}
              </span>
              <span className="text-ink/70">{ind.note}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
