import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div role="status" className="flex min-h-[50vh] items-center justify-center">
      <Loader2 aria-hidden className="h-8 w-8 animate-spin motion-reduce:animate-none" />
      <span className="sr-only">Loading</span>
    </div>
  );
}
