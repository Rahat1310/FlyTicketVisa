# PROJECT.md — [Agency Name] Website

> Reference doc for AI coding assistants (Cursor / Antigravity). Read this before generating code for any phase. Keep this file updated as decisions change.

## 1. Business Context
- **What it is**: A visa processing & air ticket agency based in Bangladesh.
- **Who it serves**: Tourists, students, business travelers, Umrah pilgrims, medical travelers — Bangladeshi nationals applying for visas to countries that accept BD applicants.
- **Primary goal of the site**: Build trust, generate qualified inquiries (leads), and let staff self-manage visa/country content without a developer.
- **Not an e-commerce site**: no cart/checkout. Core conversion action = inquiry form submission / WhatsApp contact.

## 2. Services (Launch Scope)
1. Umrah Package
2. Student Visa
3. Tourist Visa
4. Business Visa
5. Medical Visa
6. Air Ticket

Each service needs its own landing page (see Section 5).

## 3. Priority Countries (build these first, template-driven)
- **Umrah** → Saudi Arabia
- **Student Visa** → UK, Australia, Canada, Malaysia
- **Tourist / Business** → UAE, Malaysia, Thailand, Singapore, Schengen (group), UK

More countries added post-launch using the same country-page template.

## 4. Tech Stack (Decided)
| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js (App Router, TypeScript) | Deployed on Vercel |
| Styling | Tailwind CSS + shadcn/ui | Modern, clean, fast to build |
| CMS | Sanity.io (free tier) | **Not a database** — a content editor for staff. Stores services/countries/testimonials/blog content, queried via API/GROQ. No SQL, no migrations. |
| Database | Neon Postgres (or Vercel Postgres, which runs on Neon) | App data: leads, admin accounts, upload references. Chosen over Supabase — Neon auto-resumes on idle (~1s), Supabase free tier pauses after 7 days of inactivity requiring manual resume. Safer for not losing leads. |
| ORM | Prisma | Type-safe queries/migrations against Neon. Schema lives in `/prisma/schema.prisma`. |
| File Storage | Vercel Blob | Passport/document uploads from clients |
| Images (CDN) | Cloudinary | Upload in Cloudinary dashboard; paste full image URLs into Sanity or static data — no env vars needed |
| Auth (staff/admin only) | Clerk | Free tier is plenty for a handful of staff accounts |
| Email | Resend | Lead notification emails, transactional |
| Chat | WhatsApp click-to-chat link | Default expected contact method in Bangladesh |
| i18n | next-intl | English + Bengali toggle |
| Analytics | Vercel Analytics + Google Analytics 4 + Search Console | SEO is a major lead source ("UK student visa from Bangladesh" type queries) |
| Domain | Namecheap → DNS pointed at Vercel | |

**Important deployment note:** Vercel's free Hobby plan is technically restricted to non-commercial use per their ToS. This is a business site. Decide knowingly: either budget for Vercel Pro ($20/mo) once live, or accept the free-tier risk short term. Revisit before scaling traffic.

## 5. Site Structure / Sitemap
```
/                          → Home (hero, services grid, trust badges, testimonials)
/services/umrah-package
/services/student-visa
/services/tourist-visa
/services/business-visa
/services/medical-visa
/services/air-ticket
/countries/[slug]          → Template: docs required, fee, processing time, CTA
/about                     → License/ATAB info, team, story
/testimonials
/contact                   → Inquiry form + WhatsApp + phone + map
/admin                     → Staff-only (Clerk-gated): view leads, manage uploads
/blog/[slug]               → Post-launch, SEO content
```

## 6. Trust Elements (must appear across the site)
- ATAB membership number, trade license number, IATA number (if applicable)
- Real client testimonials with names/photos
- Clear refund/cancellation policy
- Physical office address + embedded map
- WhatsApp + phone visible on every page (not just Contact)
- Per-country transparency: documents, fees, processing time clearly listed

## 7. Data Model

**Sanity (content, editable by staff, no code):**
- `service` — title, slug, description, icon, requirements, CTA
- `country` — name, slug, flag, visaType(s), documentsRequired[], fee, processingTime, notes
- `testimonial` — name, photo, quote, service, rating
- `blogPost` — title, slug, body, coverImage, publishedAt

**Prisma / Neon Postgres (app data, code-managed):**
- `Lead` — name, contact, service, country, message, createdAt, status
- `AdminUser` — linked to Clerk account, role
- `Upload` — leadId, fileUrl (Vercel Blob), documentType, uploadedAt

## 8. Coding Conventions
- TypeScript strict mode
- Components in `/components`, one per file, PascalCase
- Server components by default; `"use client"` only when needed (forms, interactivity)
- Env vars: `DATABASE_URL` (Neon, used by Prisma), `SANITY_PROJECT_ID`, `SANITY_DATASET`, `RESEND_API_KEY`, `CLERK_SECRET_KEY`, `BLOB_READ_WRITE_TOKEN`
- Prisma: schema at `/prisma/schema.prisma`, run `npx prisma migrate dev` for local migrations
- Mobile-first Tailwind; test at 375px width minimum

## 9. Build Order (see full roadmap — build one phase at a time, review before moving on)
1. Scaffold + infra accounts
2. IA + wireframes
3. Core pages (static content first)
4. Sanity CMS wiring
5. Lead system + admin dashboard
6. Trust/i18n/SEO polish
7. QA + launch
8. Post-launch content expansion

## 10. Open Decisions / TBD
- Final agency name, logo, brand colors
- Payment collection (if any) — none at launch
- Full country list beyond priority set
