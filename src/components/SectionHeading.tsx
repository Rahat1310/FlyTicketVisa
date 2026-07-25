type SectionHeadingProps = {
  title: string;
  description?: string;
  eyebrow?: string;
};

export function SectionHeading({ title, description, eyebrow }: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      {eyebrow ? (
        <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-teal/10 bg-teal/5 px-4 py-2 backdrop-blur-md">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-75"></span>
            <span className="relative inline-flex size-2 rounded-full bg-teal"></span>
          </span>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-teal">{eyebrow}</span>
        </div>
      ) : null}

      <h2 className="font-display text-4xl font-medium tracking-tight text-navy text-balance sm:text-5xl">
        {title}
      </h2>

      {description ? (
        <div className="mt-6 flex items-center gap-5">
          <div className="h-px w-12 bg-teal/30" />
          <p className="text-lg leading-relaxed text-muted-foreground max-w-xl">{description}</p>
        </div>
      ) : null}
    </div>
  );
}
