import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="container-x py-24 sm:py-32">
      <h1 className="display text-[clamp(3rem,12vw,12rem)]">404</h1>
      <p className="mt-6 max-w-md text-xl">This page does not exist or has moved.</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/" variant="dark">Back to home</ButtonLink>
        <ButtonLink href="/work" variant="outline">See our work</ButtonLink>
      </div>
    </section>
  );
}
