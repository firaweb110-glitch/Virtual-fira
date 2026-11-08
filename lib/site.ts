/**
 * Central site settings. Everything that is "real contact information" lives
 * here and is read from environment variables, so nothing is invented.
 */
const digits = (v?: string) => (v ?? "").replace(/\D/g, "");
const clean = (v?: string) => (v && v.trim() ? v.trim() : undefined);

export const siteConfig = {
  name: "VIRTUAL FIRA",
  tagline: "Beyond Digital. Beyond Ordinary.",
  description:
    "VIRTUAL FIRA is a digital creative studio for website design and development, immersive 360° virtual tours and distinctive brand identities.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, ""),
  whatsappNumber: digits(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER),
  email: clean(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
  phone: clean(process.env.NEXT_PUBLIC_CONTACT_PHONE),
  social: {
    Instagram: clean(process.env.NEXT_PUBLIC_INSTAGRAM_URL),
    LinkedIn: clean(process.env.NEXT_PUBLIC_LINKEDIN_URL),
    Facebook: clean(process.env.NEXT_PUBLIC_FACEBOOK_URL),
    YouTube: clean(process.env.NEXT_PUBLIC_YOUTUBE_URL),
  } as Record<string, string | undefined>,
};

export const hasWhatsApp = siteConfig.whatsappNumber.length >= 8;

export type WhatsAppContext = "website" | "tour" | "branding" | "general";

const messages: Record<WhatsAppContext, string> = {
  website: "Hello VIRTUAL FIRA, I'd like to discuss a website project.",
  tour: "Hello VIRTUAL FIRA, I'm interested in a 360° virtual tour.",
  branding: "Hello VIRTUAL FIRA, I'd like to talk about branding and brand identity.",
  general: "Hello VIRTUAL FIRA, I'd like to start a project.",
};

/** Returns a wa.me link, or undefined when no number is configured. */
export function whatsappLink(context: WhatsAppContext = "general"): string | undefined {
  if (!hasWhatsApp) return undefined;
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(messages[context])}`;
}

export const socialLinks = Object.entries(siteConfig.social).filter(
  (e): e is [string, string] => Boolean(e[1]),
);
