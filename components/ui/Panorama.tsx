import { cn } from "@/lib/utils";

/** Small deterministic PRNG so every seed gives a stable, different skyline. */
function rng(seed: number) {
  let s = seed * 9301 + 49297;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

type Tone = "ink" | "paper";

const tones: Record<Tone, { bg: string; fg: string; mid: string }> = {
  ink: { bg: "#0B2A2D", fg: "#F3F0E9", mid: "#3C4F51" },
  paper: { bg: "#E7E2D6", fg: "#0B2A2D", mid: "#3C4F51" },
};

/**
 * Decorative, abstract equirectangular-style strip. It is purely graphic and
 * never presented as a real tour screenshot.
 */
function PanoSvg({ seed, tone, className }: { seed: number; tone: Tone; className?: string }) {
  const r = rng(seed + 1);
  const c = tones[tone];
  const horizon = 250;
  const blocks: { x: number; w: number; h: number; dark: boolean }[] = [];
  let x = 24;
  while (x < 1150) {
    const w = 40 + Math.floor(r() * 90);
    const h = 30 + Math.floor(r() * 150);
    blocks.push({ x, w, h, dark: r() > 0.5 });
    x += w + Math.floor(r() * 26);
  }
  const sunX = 140 + Math.floor(r() * 920);
  const curves = [0.18, 0.32, 0.46].map((k) => Math.round(k * 400));
  return (
    <svg
      viewBox="0 0 1200 400"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <rect width="1200" height="400" fill={c.bg} />
      {curves.map((y, i) => (
        <path key={i} d={`M0 ${y} Q600 ${y - 46 + i * 12} 1200 ${y}`} stroke={c.fg} strokeOpacity="0.14" fill="none" />
      ))}
      <circle cx={sunX} cy={110 + Math.floor(r() * 40)} r={34 + Math.floor(r() * 18)} fill="#FF6A35" />
      {blocks.map((b, i) => (
        <rect key={i} x={b.x} y={horizon - b.h} width={b.w} height={b.h} fill={b.dark ? c.mid : c.fg} fillOpacity={b.dark ? 0.9 : 0.85} />
      ))}
      <rect y={horizon} width="1200" height="150" fill={c.fg} fillOpacity="0.07" />
      <line x1="0" x2="1200" y1={horizon} y2={horizon} stroke={c.fg} strokeOpacity="0.5" />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <path key={i} d={`M${i * 150} 400 L600 ${horizon}`} stroke={c.fg} strokeOpacity="0.1" fill="none" />
      ))}
    </svg>
  );
}

type Props = { seed?: number; tone?: Tone; animated?: boolean; className?: string };

export function Panorama({ seed = 1, tone = "ink", animated = false, className }: Props) {
  if (!animated) {
    return (
      <div className={cn("overflow-hidden", className)}>
        <PanoSvg seed={seed} tone={tone} className="h-full w-full" />
      </div>
    );
  }
  return (
    <div className={cn("overflow-hidden", className)}>
      <div className="flex h-full w-[200%] animate-pan motion-reduce:animate-none">
        <PanoSvg seed={seed} tone={tone} className="h-full w-1/2 flex-none" />
        <PanoSvg seed={seed} tone={tone} className="h-full w-1/2 flex-none" />
      </div>
    </div>
  );
}
