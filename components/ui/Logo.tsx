import Image from "next/image";
import Link from "next/link";

type Props = { variant?: "default" | "reversed"; height?: number; priority?: boolean; link?: boolean };

/** Official logo, unmodified apart from removed transparent padding / one-colour reversal for dark grounds. */
export function Logo({ variant = "default", height = 44, priority, link = true }: Props) {
  const src = variant === "reversed" ? "/logo/virtual-fira-logo-reversed.png" : "/logo/virtual-fira-logo.png";
  const width = Math.round((1136 / 414) * height);
  const img = (
    <Image src={src} alt="VIRTUAL FIRA - Beyond Digital" width={width} height={height} priority={priority} style={{ height, width: "auto" }} />
  );
  if (!link) return img;
  return (
    <Link href="/" aria-label="VIRTUAL FIRA home" className="inline-block">
      {img}
    </Link>
  );
}
