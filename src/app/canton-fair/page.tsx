import type { Metadata } from "next";
import Link from "next/link";
import {
  Check,
  Plane,
  Hotel,
  FileText,
  BadgeCheck,
  ArrowRight,
  Calendar,
  ChevronDown,
  ShieldCheck,
  ClipboardList,
  Globe,
  Package,
} from "lucide-react";
import { CTABanner } from "@/components/CTABanner";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getWhatsAppUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Canton Fair Travel & Visa Assistance | China Import & Export Fair",
  description:
    "Complete Canton Fair travel packages — Official Invitation Letters, Chinese Business M-Visa, flights to Guangzhou, and hotel bookings near Pazhou Complex. Autumn sessions covered.",
};

const phases = [
  {
    phase: "Phase 1",
    autumn: "Oct 15 – 19",
    categories:
      "Electronics, Home Appliances, Machinery, Hardware & Tools, EVs & Vehicles, Energy",
  },
  {
    phase: "Phase 2",
    autumn: "Oct 23 – 27",
    categories:
      "Furniture, Home Décor, Ceramics, Kitchenware, Building Materials, Gifts & Crafts",
  },
  {
    phase: "Phase 3",
    autumn: "Oct 31 – Nov 4",
    categories:
      "Apparel & Fashion, Textiles, Shoes, Office Supplies, Medical Devices, Food & Beverages, Bags",
  },
];

const packages = [
  {
    icon: FileText,
    title: "Official Invitation Letter",
    desc: "We obtain your buyer invitation letter from the BEST registration system on your behalf — the essential first step for your M-Visa.",
  },
  {
    icon: ShieldCheck,
    title: "Business (M) Visa Filing",
    desc: "Complete document review, file preparation, and embassy submission support so your visa is approved on time.",
  },
  {
    icon: Plane,
    title: "Flight Booking to Guangzhou",
    desc: "Competitive roundtrip tickets from Dhaka (DAC) to Guangzhou Baiyun (CAN) — economy, business class, and group fares available.",
  },
  {
    icon: Hotel,
    title: "Hotel Near Pazhou Complex",
    desc: "Curated hotel options within the Pazhou Exhibition Zone or on shuttle routes — we book and issue your voucher instantly.",
  },
  {
    icon: BadgeCheck,
    title: "Buyer Badge Guidance",
    desc: "Step-by-step assistance for Canton Fair pre-registration and your buyer badge, so you're cleared to enter on Day 1.",
  },
  {
    icon: Package,
    title: "Full-Package Bundle",
    desc: "Combine invitation, visa, flights, and hotel into one seamless bundle — single point of contact, one clear price.",
  },
];

const docGroups = [
  {
    title: "Personal & Travel Documents",
    color: "from-teal/10 to-teal/5 border-teal/20",
    accent: "text-teal",
    checkColor: "text-teal",
    items: [
      "Original Passport — min. 6 months validity with 2+ blank pages",
      "2 Photocopies of Passport Bio-Data Page",
      "2 Recent Photos — 33mm × 48mm, white background",
    ],
  },
  {
    title: "Business Proofs",
    color: "from-gold/10 to-gold/5 border-gold/20",
    accent: "text-[#b38e1e]",
    checkColor: "text-[#b38e1e]",
    items: [
      "Updated Trade License / Company Registration (attested)",
      "Official Company Cover Letter on Letterhead — stating name, designation, visit purpose & dates",
      "Business Visiting Card",
    ],
  },
  {
    title: "Financial Documents",
    color: "from-blue-500/10 to-blue-500/5 border-blue-500/20",
    accent: "text-blue-600",
    checkColor: "text-blue-600",
    items: [
      "6-Month Bank Statement (company or personal)",
      "Bank Solvency Certificate",
    ],
  },
  {
    title: "Handled by Our Agency",
    color: "from-emerald-500/10 to-emerald-500/5 border-emerald-500/20",
    accent: "text-emerald-600",
    checkColor: "text-emerald-600",
    items: [
      "Official Canton Fair E-Invitation Letter (BEST System)",
      "Confirmed Guangzhou Hotel Booking Voucher",
      "Confirmed Roundtrip Air Ticket Itinerary",
      "Canton Fair Pre-Registration & Buyer Badge Guidance",
    ],
  },
];

const steps = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Submit Documents & Pick a Package",
    desc: "Share your travel dates, preferred phase (1, 2, or 3), and your business documents with our team via WhatsApp or our inquiry form.",
  },
  {
    number: "02",
    icon: FileText,
    title: "Invitation & Visa Application",
    desc: "We obtain your Official Canton Fair Invitation Letter from the BEST system and submit your Chinese Business (M) Visa application to the embassy.",
  },
  {
    number: "03",
    icon: Plane,
    title: "Flight & Hotel Booking",
    desc: "We issue your roundtrip tickets to Guangzhou (CAN) and book your hotel near Pazhou Exhibition Complex or on a shuttle route.",
  },
  {
    number: "04",
    icon: Globe,
    title: "Fly & Trade",
    desc: "Receive your visa, travel itinerary, and Buyer Badge pre-registration confirmation — ready to explore China's largest trade fair!",
  },
];

const faqs = [
  {
    q: "How long does the Chinese Business (M) Visa take to process?",
    a: "Standard processing is typically 4–7 working days after your application is submitted to the Chinese Embassy in Dhaka. We recommend applying at least 3–4 weeks before your travel date. Urgent processing may be available at additional cost.",
  },
  {
    q: "Do I need an invitation letter to attend the Canton Fair?",
    a: "Yes. An official buyer invitation letter from the Canton Fair BEST system is mandatory for your Business (M) Visa application. Our agency handles the registration and letter procurement for you.",
  },
  {
    q: "Can I attend more than one phase of the same session?",
    a: "Yes, you can attend multiple phases in the same session. Your visa validity will be arranged to cover all selected phases. We'll book your hotel and return flight after your last phase ends.",
  },
  {
    q: "What is the difference between Spring and Autumn sessions?",
    a: "Both sessions have the same 3-phase structure with the same sourcing categories. Currently, we are preparing for the upcoming Autumn session (October–November).",
  },
];

export default function CantonFairPage() {
  const whatsappUrl = getWhatsAppUrl(
    "Assalamu alaikum. I would like help with Canton Fair travel & visa assistance.",
  );

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-hero-atmosphere py-20 text-white sm:py-28">
        <div
          className="pointer-events-none absolute inset-0 bg-section-pattern-dark opacity-50"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-teal/10 blur-[100px]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-40 bottom-0 h-[400px] w-[400px] rounded-full bg-gold/10 blur-[100px]"
          aria-hidden
        />

        <div className="relative container-fluid">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-teal/80">
            China Import &amp; Export Fair · Guangzhou
          </p>
          <h1 className="mt-4 max-w-4xl font-display text-6xl leading-tight text-balance">
            Canton Fair Travel &amp;{" "}
            <span className="text-gold">Visa Assistance</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            Your complete solution for Canton Fair — Official Invitation Letters, Chinese
            Business M-Visa, flights to Guangzhou &amp; hotels near Pazhou Complex.
            Autumn sessions. All handled end-to-end.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/contact?service=Canton%20Fair"
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-gradient-to-b from-gold to-[#b38e1e] text-navy-deep font-semibold shadow-[0_0_20px_rgba(201,162,39,0.3)] hover:shadow-[0_0_30px_rgba(201,162,39,0.5)] hover:-translate-y-0.5 border border-gold/50 transition-all duration-300 px-7",
              )}
            >
              Start My Canton Fair Journey
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "border-white/40 bg-white/5 text-white backdrop-blur-md hover:bg-white/15 hover:border-white/60 hover:-translate-y-0.5 transition-all duration-300 px-7",
              )}
            >
              WhatsApp Us
            </a>
          </div>

          <div className="mt-14 flex flex-wrap gap-x-8 gap-y-3">
            {[
              "Official Invitation Letters",
              "Embassy-Ready Visa Files",
              "Guangzhou Hotel Packages",
              "Autumn Sessions",
            ].map((badge) => (
              <div
                key={badge}
                className="flex items-center gap-2 text-sm text-white/60"
              >
                <Check className="size-4 text-teal" />
                {badge}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SCHEDULE TABLE ── */}
      <section className="relative border-y border-border py-16 sm:py-20">
        <div
          className="pointer-events-none absolute inset-0 bg-section-atmosphere"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-section-pattern"
          aria-hidden
        />
        <div className="relative container-fluid">
          <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-teal/10 bg-teal/5 px-4 py-2">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-teal" />
            </span>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-teal">
              Fair Schedule
            </span>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-display text-5xl font-medium tracking-tight text-navy">
                Official Fair Timings
              </h2>
              <p className="mt-4 text-base text-muted-foreground">
                The Canton Fair runs twice yearly across 3 sourcing phases. Select the
                phase matching your product category.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 text-sm">
              <span className="inline-flex items-center gap-2 rounded-full bg-gold/10 px-4 py-1.5 font-medium text-[#b38e1e]">
                <Calendar className="size-3.5" /> Autumn: Oct – Nov
              </span>
            </div>
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-border shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-sm">
                <thead>
                  <tr className="border-b border-border bg-navy text-white">
                    <th className="px-5 py-4 text-left font-semibold tracking-wide">
                      Phase
                    </th>
                    <th className="px-5 py-4 text-left font-semibold tracking-wide">
                      <span className="flex items-center gap-2">
                        <Calendar className="size-3.5 text-gold" /> Autumn Dates
                      </span>
                    </th>
                    <th className="px-5 py-4 text-left font-semibold tracking-wide">
                      Core Sourcing Categories
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {phases.map((row, i) => (
                    <tr
                      key={row.phase}
                      className={cn(
                        "border-b border-border transition-colors hover:bg-teal/5",
                        i % 2 === 0 ? "bg-card" : "bg-section/50",
                      )}
                    >
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center rounded-full bg-navy/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-navy">
                          {row.phase}
                        </span>
                      </td>
                      <td className="px-5 py-4 font-medium text-[#b38e1e]">
                        {row.autumn}
                      </td>
                      <td className="px-5 py-4 text-muted-foreground">
                        {row.categories}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            * Dates are based on official Canton Fair schedules and subject to minor
            adjustments. Contact us to confirm current session dates.
          </p>
        </div>
      </section>

      {/* ── SERVICE PACKAGES ── */}
      <section className="relative py-16 sm:py-20">
        <div className="container-fluid">
          <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-teal/10 bg-teal/5 px-4 py-2">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-teal" />
            </span>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-teal">
              What We Handle
            </span>
          </div>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="font-display text-5xl font-medium tracking-tight text-navy">
                Our Canton Fair Services
              </h2>
              <div className="mt-4 flex items-center gap-4">
                <div className="h-px w-12 bg-teal/30" />
                <p className="text-lg text-muted-foreground">
                  From invitation letter to landing in Guangzhou — we manage every step.
                </p>
              </div>
            </div>
            <Link
              href="/contact?service=Canton%20Fair"
              className={cn(
                buttonVariants({ size: "lg" }),
                "shrink-0 bg-gradient-to-r from-teal to-[#0f3d3d] text-white border-teal/50 shadow-lg shadow-teal/20 hover:shadow-xl hover:shadow-teal/30 hover:-translate-y-0.5 hover:border-teal/80 transition-all duration-300",
              )}
            >
              Get a Custom Quote <ArrowRight className="ml-2 size-4" />
            </Link>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {packages.map((pkg) => {
              const Icon = pkg.icon;
              return (
                <div
                  key={pkg.title}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal/30 hover:shadow-[0_20px_40px_-10px_rgba(20,82,82,0.15)]"
                >
                  <div className="absolute -right-10 -top-10 size-40 rounded-full bg-teal/5 blur-3xl transition-transform duration-500 group-hover:scale-150 group-hover:bg-teal/10" />
                  <div className="relative mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal to-navy text-white shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <Icon className="size-5" strokeWidth={1.5} />
                  </div>
                  <h3 className="relative font-display text-xl font-medium text-navy transition-colors duration-300 group-hover:text-teal">
                    {pkg.title}
                  </h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">
                    {pkg.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── DOCUMENT CHECKLIST ── */}
      <section className="relative border-y border-border py-16 sm:py-20">
        <div
          className="pointer-events-none absolute inset-0 bg-section-atmosphere"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-section-pattern"
          aria-hidden
        />
        <div className="relative container-fluid">
          <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-teal/10 bg-teal/5 px-4 py-2">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-teal" />
            </span>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-teal">
              Visa Requirements
            </span>
          </div>
          <h2 className="font-display text-5xl font-medium tracking-tight text-navy">
            Document Checklist
          </h2>
          <div className="mt-4 flex items-center gap-4">
            <div className="h-px w-12 bg-teal/30" />
            <p className="text-lg text-muted-foreground">
              Chinese Business (M) Visa — complete list for Bangladeshi applicants.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {docGroups.map((group) => (
              <div
                key={group.title}
                className={cn(
                  "rounded-2xl border bg-gradient-to-br p-6",
                  group.color,
                )}
              >
                <h3
                  className={cn(
                    "mb-4 font-display text-lg font-semibold",
                    group.accent,
                  )}
                >
                  {group.title}
                </h3>
                <ul className="space-y-3">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-navy/80">
                      <Check
                        className={cn("mt-0.5 size-4 shrink-0", group.checkColor)}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800">
            <strong>Note:</strong> Document requirements may vary by individual profile.
            Our team reviews every application and advises on any additional supporting
            documents before submission.
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="relative py-16 sm:py-20">
        <div className="container-fluid">
          <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-teal/10 bg-teal/5 px-4 py-2">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-teal" />
            </span>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-teal">
              Process
            </span>
          </div>
          <h2 className="font-display text-5xl font-medium tracking-tight text-navy">
            How It Works
          </h2>
          <div className="mt-4 flex items-center gap-4">
            <div className="h-px w-12 bg-teal/30" />
            <p className="text-lg text-muted-foreground">
              From booking with us to landing in Guangzhou — 4 simple steps.
            </p>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="relative">
                  {i < steps.length - 1 && (
                    <div className="absolute left-[calc(50%+32px)] top-8 hidden h-px w-[calc(100%-32px)] border-t-2 border-dashed border-teal/20 lg:block" />
                  )}
                  <div className="flex flex-col items-start gap-4">
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-teal to-navy text-white shadow-[0_8px_20px_-4px_rgba(20,82,82,0.35)]">
                      <Icon className="size-7" strokeWidth={1.5} />
                      <span className="absolute -right-2 -top-2 flex size-6 items-center justify-center rounded-full bg-gold text-xs font-bold text-navy">
                        {i + 1}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal/70">
                        {step.number}
                      </p>
                      <h3 className="mt-1 font-display text-xl font-medium text-navy">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="relative border-y border-border py-16 sm:py-20">
        <div
          className="pointer-events-none absolute inset-0 bg-section-atmosphere"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-section-pattern"
          aria-hidden
        />
        <div className="relative container-fluid">
          <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
            <div>
              <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-teal/10 bg-teal/5 px-4 py-2">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-teal" />
                </span>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-teal">
                  FAQ
                </span>
              </div>
              <h2 className="font-display text-5xl font-medium tracking-tight text-navy">
                Common Questions
              </h2>
              <p className="mt-4 text-base text-muted-foreground">
                Everything you need to know before booking your Canton Fair trip with us.
              </p>
              <Link
                href="/contact?service=Canton%20Fair"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "mt-8 bg-gradient-to-b from-gold to-[#b38e1e] text-navy-deep font-semibold shadow-[0_0_20px_rgba(201,162,39,0.3)] hover:shadow-[0_0_30px_rgba(201,162,39,0.5)] hover:-translate-y-0.5 border border-gold/50 transition-all duration-300",
                )}
              >
                Ask a Question
              </Link>
            </div>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <details
                  key={faq.q}
                  className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                    <h3 className="font-medium text-navy">{faq.q}</h3>
                    <ChevronDown className="size-5 shrink-0 text-teal transition-transform duration-300 group-open:rotate-180" />
                  </summary>
                  <p className="mt-4 border-t border-border pt-4 text-sm leading-relaxed text-muted-foreground">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <CTABanner
        title="Ready to attend the Canton Fair?"
        description="Let us handle the invitation letter, visa, flights, and hotel — so you can focus entirely on sourcing and business deals."
        primaryLabel="Start My Application"
        primaryHref="/contact?service=Canton%20Fair"
        secondaryLabel="Chat on WhatsApp"
        secondaryHref={whatsappUrl}
        showAddress
      />
    </>
  );
}
