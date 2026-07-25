"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { siteConfig, getWhatsAppUrl } from "@/lib/site";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const visaServices = [
  { href: "/services/tourist-visa", label: "Tourist Visa" },
  { href: "/services/business-visa", label: "Business Visa" },
  { href: "/services/medical-visa", label: "Medical Visa" },
  { href: "/services/student-visa", label: "Student Visa" },
] as const;

const navLinks = [
  { href: "/services/umrah-package", label: "Umrah & Hajj" },
  { href: "/canton-fair", label: "Canton Fair" },
  { href: "/services/air-ticket", label: "Air Ticket" },
  { href: "/countries", label: "Countries" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [visaOpen, setVisaOpen] = useState(false);

  function closeMobile() {
    setOpen(false);
    setVisaOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy-deep/90 text-white backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 sm:px-6 xl:px-8">
        <Link href="/" className="font-display text-xl tracking-tight sm:text-2xl">
          {siteConfig.name}
        </Link>

        <nav className="hidden items-center gap-5 text-sm text-white/80 lg:flex lg:gap-7">
          {/* Visa service dropdown */}
          <div className="group relative">
            <button
              type="button"
              className="inline-flex items-center gap-1 transition-colors hover:text-white"
              aria-haspopup="menu"
            >
              Visa service
              <ChevronDown className="size-3.5 transition-transform group-hover:rotate-180" />
            </button>
            <div className="invisible absolute left-0 top-full z-50 pt-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <ul className="min-w-[200px] rounded-xl border border-white/10 bg-navy-deep/95 py-2 shadow-xl backdrop-blur-md">
                {visaServices.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block px-4 py-2.5 text-sm text-white/80 transition-colors hover:bg-white/5 hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {navLinks.map((link) => {
            const isHot = link.href === "/canton-fair";
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-colors hover:text-white",
                  isHot &&
                    "animate-nav-trending rounded-full bg-gold/20 px-2.5 py-1 font-semibold text-gold ring-1 ring-gold/40 hover:bg-gold/30 hover:text-gold",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={siteConfig.phoneHref}
            className="inline-flex items-center gap-1.5 text-sm text-white/80 transition-colors hover:text-white"
          >
            <Phone className="size-3.5" />
            {siteConfig.phone}
          </a>
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ size: "sm" }),
              "bg-gold text-navy-deep hover:bg-gold/90",
            )}
          >
            WhatsApp
          </a>
        </div>

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-md text-white md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <div
        className={cn(
          "border-t border-white/10 bg-navy-deep md:hidden",
          open ? "block" : "hidden",
        )}
      >
        <nav className="mx-auto flex max-w-[1400px] flex-col gap-1 px-4 py-4 sm:px-6">
          <button
            type="button"
            className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-sm text-white/85 hover:bg-white/5"
            onClick={() => setVisaOpen((v) => !v)}
            aria-expanded={visaOpen}
          >
            Visa service
            <ChevronDown
              className={cn("size-4 transition-transform", visaOpen && "rotate-180")}
            />
          </button>
          {visaOpen ? (
            <div className="mb-1 ml-2 space-y-0.5 border-l border-white/10 pl-3">
              {visaServices.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-md px-3 py-2 text-sm text-white/70 hover:bg-white/5 hover:text-white"
                  onClick={closeMobile}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          ) : null}

          {navLinks.map((link) => {
            const isHot = link.href === "/canton-fair";
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-md px-3 py-2.5 text-sm hover:bg-white/5",
                  isHot
                    ? "animate-nav-trending font-semibold text-gold"
                    : "text-white/85",
                )}
                onClick={closeMobile}
              >
                {link.label}
              </Link>
            );
          })}

          <a
            href={siteConfig.phoneHref}
            className="rounded-md px-3 py-2.5 text-sm text-white/85 hover:bg-white/5"
          >
            Call {siteConfig.phone}
          </a>
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants(),
              "mt-2 bg-gold text-navy-deep hover:bg-gold/90",
            )}
          >
            Chat on WhatsApp
          </a>
        </nav>
      </div>
    </header>
  );
}
