import { BadgeCheck, MapPin, Shield, type LucideIcon } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type TrustItem = {
  icon: LucideIcon;
  label: string;
  value: string;
};

const defaultItems: TrustItem[] = [
  { icon: BadgeCheck, label: "ATAB member", value: siteConfig.trust.atab },
  { icon: Shield, label: "Trade license", value: siteConfig.trust.tradeLicense },
  { icon: MapPin, label: "Office", value: siteConfig.address.lines[0] },
];

type TrustStampProps = {
  items?: TrustItem[];
  className?: string;
};

export function TrustStamp({ items = defaultItems, className }: TrustStampProps) {
  return (
    <div className={cn("grid gap-4 sm:grid-cols-3", className)}>
      {items.map((item) => (
        <div
          key={item.label}
          className="flex items-start gap-3 rounded-xl border border-border/80 bg-card/80 px-4 py-4 backdrop-blur-sm"
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

/** @deprecated Use TrustStamp */
export const TrustStrip = TrustStamp;
