import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { mainNav } from "@/data/navigation";
import { hasWhatsApp, siteConfig, socialLinks, whatsappLink } from "@/lib/site";

const col = "font-display text-sm font-semibold text-paper/55";
const link = "inline-block py-1 text-paper/90 underline-offset-4 hover:text-fira hover:underline";

export function Footer() {
  const wa = whatsappLink("general");
  return (
    <footer className="bg-ink text-paper">
      <div className="container-x py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo variant="reversed" height={64} />
            <p className="mt-8 max-w-md text-lg leading-relaxed text-paper/80">
              VIRTUAL FIRA combines creative design and digital technology to help businesses create a stronger
              digital presence.
            </p>
            <p className="mt-6 font-display text-2xl font-bold tracking-tight">{siteConfig.tagline}</p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7 lg:pl-12">
            <div>
              <h2 className={col}>Navigate</h2>
              <ul className="mt-4">
                {mainNav.map((n) => (
                  <li key={n.href}>
                    <Link href={n.href} className={link}>
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className={col}>Services</h2>
              <ul className="mt-4">
                <li><Link href="/work" className={link}>Website Work</Link></li>
                <li><Link href="/virtual-tours" className={link}>Virtual Tours</Link></li>
                <li><Link href="/branding" className={link}>Branding</Link></li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h2 className={col}>Contact</h2>
              <ul className="mt-4">
                <li><Link href="/contact" className={link}>Send an inquiry</Link></li>
                {siteConfig.email && (
                  <li><a href={`mailto:${siteConfig.email}`} className={link}>{siteConfig.email}</a></li>
                )}
                {siteConfig.phone && (
                  <li><a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className={link}>{siteConfig.phone}</a></li>
                )}
                {hasWhatsApp && wa && (
                  <li><a href={wa} target="_blank" rel="noopener noreferrer" className={link}>Chat on WhatsApp</a></li>
                )}
                {socialLinks.map(([name, url]) => (
                  <li key={name}><a href={url} target="_blank" rel="noopener noreferrer" className={link}>{name}</a></li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-paper/15 pt-6 text-sm text-paper/60 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} VIRTUAL FIRA. All rights reserved.</p>
          <p>Website design. Immersive virtual tours. Brand identity.</p>
        </div>
      </div>
    </footer>
  );
}
