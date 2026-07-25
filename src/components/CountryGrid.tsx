"use client";

import { useState } from "react";
import { countries } from "@/lib/data/countries";
import { CountryCard } from "@/components/CountryCard";
import { FadeIn } from "@/components/Animations";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function CountryGrid({ limit }: { limit?: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const list = limit ? countries.slice(0, limit) : countries;
  
  const mobileLimit = 8;
  const showExpandButton = list.length > mobileLimit;

  return (
    <div className="flex flex-col">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3 lg:grid-cols-3">
        {list.map((country, i) => {
          const isHiddenOnMobile = !isExpanded && i >= mobileLimit;
          return (
            <div key={country.slug} className={cn("h-full", isHiddenOnMobile && "hidden sm:block")}>
              <FadeIn delay={i * 0.1} className="h-full">
                <CountryCard country={country} />
              </FadeIn>
            </div>
          );
        })}
      </div>

      {showExpandButton && (
        <div className="mt-8 flex flex-col items-center gap-4 sm:hidden">
          <Button
            variant="outline"
            size="lg"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full text-navy-deep border-border/80"
          >
            {isExpanded ? (
              <>
                Show less <ChevronUp className="ml-2 size-4" />
              </>
            ) : (
              <>
                Show more countries <ChevronDown className="ml-2 size-4" />
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
