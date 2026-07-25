"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { FadeIn } from "@/components/Animations";
import { ServiceCard } from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/services";
import { cn } from "@/lib/utils";

/** Canton Fair first so Facebook traffic sees it immediately in the grid */
const orderedServices = [...services].sort((a, b) => {
  if (a.slug === "canton-fair") return -1;
  if (b.slug === "canton-fair") return 1;
  return 0;
});

export function ServiceGrid() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 lg:gap-8">
        {orderedServices.map((service, i) => {
          let visibilityClass = "";
          if (!isExpanded) {
            if (i >= 6) {
              visibilityClass = "hidden";
            } else if (i >= 4) {
              visibilityClass = "hidden lg:block";
            }
          }

          return (
            <div key={service.slug} className={cn("h-full", visibilityClass)}>
              <FadeIn delay={i * 0.15} className="h-full">
                <ServiceCard service={service} index={i} />
              </FadeIn>
            </div>
          );
        })}
      </div>

      {orderedServices.length > 4 && (
        <div
          className={cn(
            "mt-10 flex justify-center",
            orderedServices.length <= 6 && !isExpanded && "lg:hidden",
          )}
        >
          <Button
            variant="outline"
            size="lg"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full sm:w-auto min-w-[200px] text-navy-deep border-border/80 bg-white"
          >
            {isExpanded ? (
              <>
                Show less <ChevronUp className="ml-2 size-4" />
              </>
            ) : (
              <>
                See more <ChevronDown className="ml-2 size-4" />
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
