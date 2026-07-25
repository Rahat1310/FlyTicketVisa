"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { getWhatsAppUrl, siteConfig } from "@/lib/site";
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
  const [desktopVisaOpen, setDesktopVisaOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const desktopDropdownRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  // Handle Scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle Desktop Click Outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        desktopDropdownRef.current &&
        !desktopDropdownRef.current.contains(event.target as Node)
      ) {
        setDesktopVisaOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle Mobile Drawer Focus Trapping & Escape
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }

      if (e.key === "Tab") {
        if (!drawerRef.current) return;

        const focusableElements = drawerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden"; // Prevent background scrolling
    const hamburgerEl = hamburgerRef.current;

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      // Return focus
      hamburgerEl?.focus();
    };
  }, [open]);

  function closeMobile() {
    setOpen(false);
    setVisaOpen(false);
  }

  return (
    <>
      <header
        className={cn(
          "fixed w-full top-0 z-40 border-b border-transparent transition-all duration-300",
          isScrolled
            ? "bg-navy-deep/95 backdrop-blur-md border-white/10 shadow-md"
            : "bg-navy-deep/0",
        )}
      >
        <div className="container-fluid flex h-16 items-center justify-between">
          <Link
            href="/"
            className="inline-flex min-h-[44px] min-w-[44px] items-center font-display text-xl tracking-tight text-white sm:text-2xl"
          >
            {siteConfig.name}
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-5 text-sm text-white/80 lg:flex lg:gap-7">
            {/* Visa service dropdown */}
            <div className="relative" ref={desktopDropdownRef}>
              <button
                type="button"
                className={cn(
                  "inline-flex min-h-[44px] min-w-[44px] items-center gap-1 transition-colors hover:text-white",
                  desktopVisaOpen && "text-white",
                )}
                aria-haspopup="menu"
                aria-expanded={desktopVisaOpen}
                onClick={() => setDesktopVisaOpen(!desktopVisaOpen)}
              >
                Visa service
                <ChevronDown
                  className={cn("size-3.5 transition-transform", desktopVisaOpen && "rotate-180")}
                />
              </button>
              <div
                className={cn(
                  "absolute left-0 top-full z-50 pt-2 transition-all",
                  desktopVisaOpen ? "visible opacity-100" : "invisible opacity-0",
                )}
              >
                <ul className="min-w-[200px] rounded-xl border border-white/10 bg-navy-deep/95 py-2 shadow-xl backdrop-blur-md">
                  {visaServices.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="block px-4 py-3 text-sm text-white/80 transition-colors hover:bg-white/5 hover:text-white"
                        onClick={() => setDesktopVisaOpen(false)}
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
                    "inline-flex min-h-[44px] min-w-[44px] items-center transition-colors hover:text-white",
                    isHot &&
                      "animate-nav-trending rounded-full bg-gold/20 px-2.5 py-1 font-semibold text-gold ring-1 ring-gold/40 hover:bg-gold/30 hover:text-gold",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={siteConfig.phoneHref}
              className="inline-flex min-h-[44px] min-w-[44px] items-center gap-1.5 text-sm text-white/80 transition-colors hover:text-white"
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
            ref={hamburgerRef}
            type="button"
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md text-white lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <Menu className="size-5" />
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm transition-opacity lg:hidden"
          onClick={closeMobile}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer Panel */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
        className={cn(
          "fixed inset-y-0 right-0 z-[100] flex w-full max-w-sm flex-col border-l border-white/10 bg-navy-deep text-white shadow-2xl transition-transform duration-300 ease-in-out lg:hidden",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 border-b border-white/10">
          <Link
            href="/"
            className="inline-flex min-h-[44px] items-center font-display text-xl tracking-tight"
            onClick={closeMobile}
          >
            {siteConfig.name}
          </Link>
          <button
            type="button"
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md text-white/80 hover:text-white"
            onClick={closeMobile}
            aria-label="Close menu"
          >
            <X className="size-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-4 sm:px-6">
          <div className="flex flex-col gap-1">
            <button
              type="button"
              className="flex min-h-[44px] w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-sm text-white/85 hover:bg-white/5"
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
                    className="block min-h-[44px] rounded-md px-3 py-3 text-sm text-white/70 hover:bg-white/5 hover:text-white"
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
                    "flex min-h-[44px] items-center rounded-md px-3 py-2.5 text-sm hover:bg-white/5",
                    isHot ? "animate-nav-trending font-semibold text-gold" : "text-white/85",
                  )}
                  onClick={closeMobile}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="border-t border-white/10 p-4 sm:px-6">
          <div className="flex flex-col gap-3">
            <a
              href={siteConfig.phoneHref}
              className="flex w-full min-h-[44px] items-center justify-center rounded-md border border-white/20 bg-transparent px-4 py-2 text-sm text-white hover:bg-white/5 transition-colors"
            >
              <Phone className="mr-2 size-4" />
              Call {siteConfig.phone}
            </a>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ size: "lg" }),
                "w-full bg-gold text-navy-deep hover:bg-gold/90",
              )}
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
