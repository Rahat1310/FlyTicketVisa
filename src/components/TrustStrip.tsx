import { BadgeCheck, MapPin, Shield } from "lucide-react";
import { siteConfig } from "@/lib/site";

export function TrustStrip() {
  const items = [
    {
      icon: BadgeCheck,
      label: "ATAB member",
      value: siteConfig.trust.atab,
    },
    {
      icon: Shield,
      label: "Trade license",
      value: siteConfig.trust.tradeLicense,
    },
    {
      icon: MapPin,
      label: "Dhaka office",
      value: siteConfig.address.lines[1],
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.label}
          className="flex items-start gap-3 rounded-xl border border-border/80 bg-white/70 px-4 py-4 backdrop-blur-sm"
        >
          <item.icon className="mt-0.5 size-5 shrink-0 text-teal" strokeWidth={1.5} />
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {item.label}
            </p>
            <p className="mt-1 text-sm font-medium text-navy">{item.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
