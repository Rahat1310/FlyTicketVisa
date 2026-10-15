# FlyTicket Visa

Visa processing & air ticket agency website (Bangladesh). See **PROJECT.md** for stack, sitemap, and build phases.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## What’s built (Phase 1 + core static pages)

- Next.js App Router + TypeScript + Tailwind + shadcn/ui
- Home, all 6 service pages, country template (9 priority countries)
- About / trust, testimonials, contact inquiry form
- Sticky WhatsApp + phone in header/footer
- Placeholder brand name, licenses, phone — edit `src/lib/site.ts`

## Next phases (from PROJECT.md)

1. Sanity CMS wiring  
2. Neon + Prisma leads + Clerk admin  
3. i18n (EN/BN), SEO, QA, launch  

Copy `.env.example` → `.env.local` when you create infra accounts.

### Images

Upload to [Cloudinary](https://cloudinary.com) (or Sanity media), copy the **full image URL**, and set `photoUrl` on testimonials in `src/lib/testimonials.ts` (or in Sanity when CMS is wired). No Cloudinary env vars required.

### Shared-link previews

Public pages include Open Graph and Twitter card metadata with a title, description, canonical URL, and a 1200 x 630 JPEG of the homepage image. Edit `socialImage` in `src/lib/site.ts` to change the preview image and `src/lib/metadata.ts` to adjust shared metadata defaults.

Set `NEXT_PUBLIC_SITE_URL` to the live HTTPS domain in your hosting environment before building and deploying. Share the deployed URL to test in WhatsApp or Messenger; localhost is not publicly accessible. For Facebook/Messenger, use the [Sharing Debugger](https://developers.facebook.com/tools/debug/) to inspect the deployed page and request a fresh scrape after changing the preview.
