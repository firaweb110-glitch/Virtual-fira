"use client";

import { useEffect, useRef, useState } from "react";
import { ExternalLink, Loader2, Maximize2, Play } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  url: string;
  title: string;
  /** Start loading immediately (detail page). Otherwise wait for a click. */
  autoLoad?: boolean;
  className?: string;
  /** Rendered behind the Load button (decorative preview). */
  poster?: React.ReactNode;
};

type State = "idle" | "loading" | "loaded";

/**
 * Lazy 360° embed. The iframe is only created after the visitor asks for it
 * (or on the detail page). Because providers can block framing and browsers
 * do not expose that, an external-launch link is always available.
 */
export function TourEmbed({ url, title, autoLoad = false, className, poster }: Props) {
  const [state, setState] = useState<State>(autoLoad ? "loading" : "idle");
  const [slow, setSlow] = useState(false);
  const [canFullscreen, setCanFullscreen] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => setCanFullscreen(typeof document !== "undefined" && document.fullscreenEnabled), []);

  useEffect(() => {
    if (state !== "loading") return;
    const t = setTimeout(() => setSlow(true), 10000);
    return () => clearTimeout(t);
  }, [state]);

  const goFullscreen = () => box.current?.requestFullscreen?.().catch(() => undefined);

  return (
    <div className={className}>
      <div ref={box} className="relative aspect-[4/3] w-full overflow-hidden bg-ink-deep sm:aspect-video">
        {state === "idle" && (
          <div className="absolute inset-0">
            {poster}
            <div className="absolute inset-0 flex items-center justify-center bg-ink/40">
              <button
                type="button"
                onClick={() => setState("loading")}
                className="group inline-flex min-h-14 items-center gap-3 bg-fira px-7 font-display text-base font-semibold text-ink transition-colors hover:bg-paper"
              >
                <Play aria-hidden className="h-5 w-5 fill-current" />
                Explore 360° Tour
              </button>
            </div>
          </div>
        )}

        {state !== "idle" && (
          <iframe
            src={url}
            title={title}
            loading="lazy"
            allow="fullscreen; accelerometer; gyroscope; xr-spatial-tracking; autoplay"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            onLoad={() => setState("loaded")}
            className={cn("absolute inset-0 h-full w-full border-0 transition-opacity duration-500", state === "loaded" ? "opacity-100" : "opacity-0")}
          />
        )}

        {state === "loading" && (
          <div role="status" className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-paper">
            <Loader2 aria-hidden className="h-8 w-8 animate-spin motion-reduce:animate-none" />
            <p className="font-display text-sm">Loading tour…</p>
            {slow && (
              <p className="max-w-xs px-4 text-center text-sm text-paper/75">
                Taking a while? Some providers block embedding. Use “Open in new tab” below.
              </p>
            )}
          </div>
        )}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-medium underline underline-offset-4 hover:text-fira"
        >
          <ExternalLink aria-hidden className="h-4 w-4" />
          Open in new tab
          <span className="sr-only"> (external tour)</span>
        </a>
        {canFullscreen && state !== "idle" && (
          <button type="button" onClick={goFullscreen} className="inline-flex items-center gap-1.5 font-medium underline underline-offset-4 hover:text-fira">
            <Maximize2 aria-hidden className="h-4 w-4" />
            Fullscreen
          </button>
        )}
      </div>
    </div>
  );
}
