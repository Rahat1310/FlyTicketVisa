"use client";

import { Phone, MessageCircle } from "lucide-react";
import { siteConfig, getWhatsAppUrl } from "@/lib/site";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function MobileBottomBar() {
  const pathname = usePathname();

  // Hide the global sticky action bar on the contact page 
  // so it doesn't compete with the form's own submit action.
  if (pathname === "/contact") {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t border-slate-200 bg-white px-4 py-3 shadow-[0_-8px_16px_rgba(0,0,0,0.05)] lg:hidden">
      <a
        href={siteConfig.phoneHref}
        className={cn(
          buttonVariants({ variant: "outline" }),
          "flex-1 min-h-[52px]",
        )}
      >
        <Phone className="mr-2 size-4" />
        Call
      </a>
      <a
        href={getWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          buttonVariants({ variant: "default" }),
          "flex-1 min-h-[52px] border-none bg-gold text-navy-deep shadow-md hover:bg-gold/90",
        )}
      >
        <MessageCircle className="mr-2 size-4" />
        WhatsApp
      </a>
    </div>
  );
}
