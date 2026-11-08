# VIRTUAL FIRA

Next.js 15 (App Router) · TypeScript · Tailwind CSS 3 · Framer Motion · React Hook Form + Zod · Lucide.

## Run it

```bash
npm install
cp .env.example .env.local     # then fill in what you have
npm run dev                    # http://localhost:3000
```

Before shipping, run all of these:

```bash
npm run typecheck && npm run lint && npm run build
npm run check:links            # tests all 13 websites + 8 tours, flags tours that block iframe embedding
```

## Real screenshots (important)

Project cards show a branded preview until real screenshots exist. Capture them from the live sites:

```bash
npx playwright install chromium
npm run screenshots                  # 13 websites -> public/projects/<slug>.jpg
npm run screenshots -- --tours       # optional: tours -> public/tours/<slug>.jpg
```

Any file at `public/projects/<slug>.(jpg|webp|png)` or `public/tours/<slug>.(...)` is used automatically.
You can also drop in your own images with the same names.

## Configuration

| Variable | Needed for |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | canonical URLs, sitemap, Open Graph (set to the live domain) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | floating WhatsApp button + WhatsApp CTAs (digits only, e.g. `919876543210`). Hidden when empty |
| `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_CONTACT_PHONE` | shown in footer / contact page when set |
| `NEXT_PUBLIC_INSTAGRAM_URL`, `..._LINKEDIN_URL`, `..._FACEBOOK_URL`, `..._YOUTUBE_URL` | social links, rendered only when set |
| `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | contact form email delivery via Resend. Without them the form returns an honest "not connected" error |

All settings are centralised in `lib/site.ts`.

## Editing content

- Websites: `data/projects.ts` (add `category` / `summary` once verified)
- Tours: `data/tours.ts` (add `venue` once verified)
- Services, industries, process: `data/services.ts`
- Navigation: `data/navigation.ts`

## Spam protection

Honeypot field, minimum-fill-time check and a per-IP rate limit (in-memory). On multi-instance/serverless hosting,
add a shared store or Cloudflare Turnstile for stronger protection.

## Logo files

`public/logo/virtual-fira-logo-original.png` is your untouched upload. `virtual-fira-logo.png` is the same artwork with
transparent padding trimmed. `virtual-fira-logo-reversed.png` is a one-colour paper version for the dark footer.
