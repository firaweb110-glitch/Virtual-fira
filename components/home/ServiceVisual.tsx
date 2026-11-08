import { Panorama } from "@/components/ui/Panorama";
import type { Service } from "@/types";

export function ServiceVisual({ id }: { id: Service["id"] }) {
  if (id === "web") {
    return (
      <div aria-hidden className="w-full max-w-[280px] border border-ink bg-paper">
        <div className="flex gap-1.5 border-b border-ink px-3 py-2">
          <i className="h-2 w-2 rounded-full bg-ink" /><i className="h-2 w-2 rounded-full bg-ink/50" /><i className="h-2 w-2 rounded-full bg-ink/25" />
        </div>
        <div className="space-y-2 p-4">
          <div className="h-5 w-3/4 bg-ink" />
          <div className="h-5 w-1/2 bg-ink" />
          <div className="mt-3 flex gap-2"><div className="h-14 flex-1 bg-fira" /><div className="h-14 w-1/3 bg-ink/15" /></div>
        </div>
      </div>
    );
  }
  if (id === "tours") {
    return (
      <div aria-hidden className="relative h-40 w-full max-w-[280px] overflow-hidden rounded-[999px] border border-ink">
        <Panorama seed={5} animated className="absolute inset-0 h-full w-full" />
        <span className="absolute inset-0 flex items-center justify-center font-display text-3xl font-bold text-paper">360°</span>
      </div>
    );
  }
  return (
    <div aria-hidden className="flex w-full max-w-[280px] items-end gap-3">
      <span className="font-display text-7xl font-bold leading-none tracking-tighter">Aa</span>
      <span className="flex flex-1 gap-1">
        {["bg-ink", "bg-slate-logo", "bg-paper-dark", "bg-fira"].map((c) => (
          <i key={c} className={`h-16 flex-1 border border-ink/20 ${c}`} />
        ))}
      </span>
    </div>
  );
}
