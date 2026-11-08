import { process } from "@/data/services";

export function Approach({ tone = "ink", title = "From vision to digital reality." }: { tone?: "ink" | "paper"; title?: string }) {
  const dark = tone === "ink";
  return (
    <section aria-labelledby="approach-title" className={dark ? "bg-ink py-20 text-paper sm:py-28" : "py-20 sm:py-28"}>
      <div className="container-x">
        <h2 id="approach-title" className="display max-w-4xl text-[clamp(2.2rem,6vw,5.6rem)]">{title}</h2>
        <ol className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-0">
          <span aria-hidden className={`absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px md:left-0 md:top-[7px] md:h-px md:w-full ${dark ? "bg-paper/30" : "bg-ink/30"}`} />
          {process.map((step, i) => (
            <li key={step.title} className="relative pl-10 md:pl-0 md:pr-8">
              <span aria-hidden className="absolute left-0 top-1.5 h-4 w-4 bg-fira md:top-0" />
              <div className={i % 2 ? "md:mt-16" : "md:mt-10"}>
                <span className={`font-display text-sm font-semibold ${dark ? "text-paper/60" : "text-mute"}`}>{step.number}</span>
                <h3 className="font-display text-4xl font-bold tracking-tighter sm:text-5xl">{step.title}</h3>
                <p className={`mt-3 max-w-[16rem] ${dark ? "text-paper/75" : "text-ink/75"}`}>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
