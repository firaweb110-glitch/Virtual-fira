"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ButtonLink } from "@/components/ui/Button";
import { Panorama } from "@/components/ui/Panorama";

const ease = [0.22, 1, 0.36, 1] as const;

const lineMotion = (i: number) => ({
  initial: { y: "105%" },
  animate: { y: 0 },
  transition: { duration: 0.9, delay: 0.1 + i * 0.12, ease },
});

function Line({ i, children, className = "" }: { i: number; children: React.ReactNode; className?: string }) {
  return (
    <span className={`block overflow-hidden pb-[0.06em] ${className}`}>
      <motion.span className="block" {...lineMotion(i)}>
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden pb-16 pt-10 sm:pt-14 lg:pb-24">
      <div className="container-x">
        <h1 id="hero-title" className="display text-[clamp(2.7rem,9.4vw,9.5rem)]">
          <Line i={0}>We make your</Line>
          <Line i={1} className="sm:ml-[10vw]">
            <span className="inline-flex items-center gap-[0.18em]">
              brand
              <span aria-hidden className="relative inline-block h-[0.68em] w-[2.3em] overflow-hidden bg-ink">
                <Panorama seed={3} animated className="absolute inset-0 h-full w-full" />
              </span>
            </span>
          </Line>
          <Line i={2}>impossible</Line>
          <Line i={3} className="sm:ml-[16vw]">
            to ignore<span className="text-fira">.</span>
          </Line>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease }}
          className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12"
        >
          <div className="lg:col-span-5 lg:col-start-2">
            <p className="max-w-md text-lg leading-relaxed text-ink/80 sm:text-xl">
              We design powerful websites, immersive virtual tours and distinctive brand identities for ambitious
              businesses.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/work" variant="primary">Explore Our Work</ButtonLink>
              <ButtonLink href="/contact" variant="outline">Start a Project</ButtonLink>
            </div>
          </div>
          <ul className="space-y-0 lg:col-span-4 lg:col-start-9" aria-label="What we do">
            {[
              ["Website Design & Development", "/work"],
              ["360° Virtual Tours", "/virtual-tours"],
              ["Branding & Identity", "/branding"],
            ].map(([label, href]) => (
              <li key={href} className="border-t border-ink/20 last:border-b">
                <Link
                  href={href}
                  className="group flex items-center justify-between py-4 font-display text-xl font-semibold tracking-tight transition-colors hover:text-fira"
                >
                  {label}
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
