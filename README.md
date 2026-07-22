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
