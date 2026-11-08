import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "dark" | "outline" | "outline-light" | "paper";

const variants: Record<Variant, string> = {
  primary: "bg-fira text-ink hover:bg-ink hover:text-paper",
  dark: "bg-ink text-paper hover:bg-fira hover:text-ink",
  paper: "bg-paper text-ink hover:bg-fira hover:text-ink",
  outline: "border border-ink text-ink hover:bg-ink hover:text-paper",
  "outline-light": "border border-paper/60 text-paper hover:bg-paper hover:text-ink",
};

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  external?: boolean;
  className?: string;
  arrow?: boolean;
};

export function ButtonLink({ href, children, variant = "primary", external, className, arrow = true }: Props) {
  const classes = cn(
    "group inline-flex min-h-12 items-center justify-center gap-2 px-6 py-3 font-display text-base font-semibold tracking-tight transition-colors duration-300",
    variants[variant],
    className,
  );
  const icon = arrow ? (
    <ArrowUpRight
      aria-hidden
      className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
    />
  ) : null;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
        {icon}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
      {icon}
    </Link>
  );
}

/** Understated inline text link with an animated underline. */
export function TextLink({ href, children, external, className }: Omit<Props, "variant" | "arrow">) {
  const classes = cn(
    "group inline-flex items-center gap-1.5 font-medium underline underline-offset-[6px] transition-[text-decoration-color] duration-300 hover:decoration-fira",
    className,
  );
  const icon = (
    <ArrowUpRight
      aria-hidden
      className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
    />
  );
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
      {children}
      {icon}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  ) : (
    <Link href={href} className={classes}>
      {children}
      {icon}
    </Link>
  );
}
