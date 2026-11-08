"use client";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="container-x py-24 sm:py-32" role="alert">
      <h1 className="display text-[clamp(2.4rem,8vw,7rem)]">Something went wrong.</h1>
      <p className="mt-6 max-w-md text-xl">The page could not be displayed. Try again, or return to the home page.</p>
      <button type="button" onClick={reset} className="mt-8 min-h-12 bg-ink px-6 font-display font-semibold text-paper hover:bg-fira hover:text-ink">
        Try again
      </button>
    </section>
  );
}
