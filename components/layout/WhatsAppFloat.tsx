"use client";

import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { hasWhatsApp, whatsappLink, type WhatsAppContext } from "@/lib/site";

function contextFor(path: string): WhatsAppContext {
  if (path.startsWith("/virtual-tours")) return "tour";
  if (path.startsWith("/branding")) return "branding";
  if (path.startsWith("/work")) return "website";
  return "general";
}

/** Renders only when NEXT_PUBLIC_WHATSAPP_NUMBER is configured. */
export function WhatsAppFloat() {
  const pathname = usePathname();
  if (!hasWhatsApp) return null;
  const href = whatsappLink(contextFor(pathname));
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with VIRTUAL FIRA on WhatsApp (opens in a new tab)"
      className="fixed bottom-5 right-5 z-40 inline-flex h-14 items-center gap-2 bg-fira px-4 font-display text-sm font-semibold text-ink shadow-lg transition-colors hover:bg-ink hover:text-paper sm:px-5"
    >
      <MessageCircle aria-hidden className="h-5 w-5" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
