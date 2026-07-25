"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { FadeIn } from "@/components/Animations";
import { CountryCard } from "@/components/CountryCard";
import { Button } from "@/components/ui/button";
import { countries } from "@/lib/data/countries";
import { cn } from "@/lib/utils";

export function CountryGrid({ limit }: { limit?: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const list = limit ? countries.slice(0, limit) : countries;
  return (
    <div className="flex flex-col">
      <div className="grid gap-3 sm:gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 lg:gap-8">
        {list.map((country, i) => {
          let visibilityClass = "";
          if (!isExpanded) {
            if (i >= 6) {
              visibilityClass = "hidden";
            } else if (i >= 4) {
              visibilityClass = "hidden sm:block";
            }
          }

          return (
            <div key={country.slug} className={cn("h-full", visibilityClass)}>
              <FadeIn delay={i * 0.1} className="h-full">
                <CountryCard country={country} />
              </FadeIn>
            </div>
          );
        })}
      </div>

      {list.length > 4 && (
        <div
          className={cn(
            "mt-10 flex flex-col items-center gap-4",
            list.length <= 6 && !isExpanded && "sm:hidden",
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
          <Link href="/countries" className="text-sm font-medium text-teal hover:underline">
            Browse all priority countries
          </Link>
        </div>
      )}
    </div>
  );
}
