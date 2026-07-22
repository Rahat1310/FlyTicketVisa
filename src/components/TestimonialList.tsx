import { Star, User } from "lucide-react";
import { SiteImage } from "@/components/SiteImage";
import { testimonials, type Testimonial } from "@/lib/testimonials";

function Rating({ value }: { value: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`size-3.5 ${i < value ? "fill-gold text-gold" : "text-border"}`}
        />
      ))}
    </div>
  );
}

function TestimonialAvatar({ item }: { item: Testimonial }) {
  if (item.photoUrl) {
    return (
      <SiteImage
        src={item.photoUrl}
        alt={item.name}
        width={48}
        height={48}
        className="size-12 shrink-0 rounded-full"
        sizes="48px"
      />
    );
  }

  return (
    <div
      className="flex size-12 shrink-0 items-center justify-center rounded-full bg-mist text-muted-foreground"
      aria-hidden
    >
      <User className="size-5" strokeWidth={1.5} />
    </div>
  );
}

export function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <figure className="flex h-full gap-4 rounded-xl border border-border bg-card p-5 sm:p-6">
      <TestimonialAvatar item={item} />
      <div className="min-w-0 flex-1">
        <Rating value={item.rating} />
        <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-navy/85">
          “{item.quote}”
        </blockquote>
        <figcaption className="mt-4">
          <p className="text-sm font-medium text-navy">{item.name}</p>
          <p className="text-xs text-muted-foreground">
            {item.service} · {item.location}
          </p>
        </figcaption>
      </div>
    </figure>
  );
}

export function TestimonialList({ limit }: { limit?: number }) {
  const list = limit ? testimonials.slice(0, limit) : testimonials;
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {list.map((item) => (
        <TestimonialCard key={item.id} item={item} />
      ))}
    </div>
  );
}
