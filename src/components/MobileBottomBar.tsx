"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, Globe, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

export function MobileBottomBar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/services", label: "Services", icon: LayoutGrid },
    { href: "/countries", label: "Countries", icon: Globe },
    { href: "/contact", label: "Contact", icon: Phone },
  ];

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-around border-t border-border bg-card pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_16px_rgba(0,0,0,0.05)] lg:hidden">
      {navItems.map((item) => {
        const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/");
        const Icon = item.icon;
        
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-1 flex-col items-center gap-1 py-3 text-[10px] font-medium transition-colors",
              isActive ? "text-navy" : "text-muted-foreground hover:text-navy"
            )}
          >
            <Icon className={cn("size-5", isActive && "text-gold fill-gold/10")} />
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
