"use client";

import Link from "next/link";
import { type FormEvent, useState, useTransition } from "react";
import { CheckCircle2, MessageCircle, Upload } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitInquiry } from "@/lib/actions/inquiry";
import { countries } from "@/lib/data/countries";
import { services } from "@/lib/services";
import { getWhatsAppUrl, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type InquiryFormProps = {
  defaultService?: string;
  defaultCountry?: string;
};

export function InquiryForm({ defaultService = "", defaultCountry = "" }: InquiryFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submittedService, setSubmittedService] = useState("");
  const [uploadToken, setUploadToken] = useState<string | undefined>();
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState(defaultService);
  const [country, setCountry] = useState(defaultCountry);
  const [message, setMessage] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    startTransition(async () => {
      const result = await submitInquiry({
        name,
        phone,
        email: email || undefined,
        service,
        country: country || undefined,
        message: message || undefined,
      });

      if (!result.ok) {
        setError(result.error);
        return;
      }

      setSubmittedService(result.service);
      setUploadToken(result.uploadToken);
      setSubmitted(true);
    });
  }

  if (submitted) {
    const waMessage = `Hi, I just submitted an inquiry about ${submittedService}`;
    return (
      <div className="rounded-2xl border border-teal/25 bg-card p-8 text-center shadow-[0_20px_60px_-20px_rgba(20,82,82,0.15)]">
        <CheckCircle2 className="mx-auto size-12 text-teal" />
        <h3 className="mt-4 font-display text-2xl text-navy">Inquiry received</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Thank you, {name}. We&apos;ve saved your details and sent a notification to our team. For
          a faster reply, message us on WhatsApp.
        </p>
        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          {uploadToken ? (
            <Link
              href={`/upload/${uploadToken}`}
              className={cn(
                buttonVariants({ size: "lg" }),
                "inline-flex gap-2 bg-gold text-navy-deep hover:bg-gold/90",
              )}
            >
              <Upload className="size-5" />
              Upload your documents
            </Link>
          ) : null}
          <a
            href={getWhatsAppUrl(waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ size: "lg", variant: uploadToken ? "outline" : "default" }),
              !uploadToken && "bg-[#25D366] text-white hover:bg-[#20bd5a]",
              uploadToken && "border-[#25D366]/text-[#128C7E] hover:bg-[#25D366]/10",
              "inline-flex gap-2",
            )}
          >
            <MessageCircle className="size-5" />
            Continue on WhatsApp
          </a>
        </div>
        {uploadToken ? (
          <p className="mt-3 text-xs text-muted-foreground">
            Optional — upload after we chat, or now if you already have your papers ready. This
            private link expires in 7 days.
          </p>
        ) : null}
        <p className="mt-4 text-xs text-muted-foreground">
          Or call{" "}
          <a href={siteConfig.phoneHref} className="font-medium text-teal">
            {siteConfig.phone}
          </a>
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-6"
          onClick={() => {
            setSubmitted(false);
            setUploadToken(undefined);
            setName("");
            setPhone("");
            setEmail("");
            setService(defaultService);
            setCountry(defaultCountry);
            setMessage("");
          }}
        >
          Send another inquiry
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-[0_20px_60px_-20px_rgba(20,82,82,0.12)] sm:p-8">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Full name</Label>
            <Input
              id="name"
              name="name"
              required
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="min-h-[48px]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              required
              placeholder="+880 1XXX-XXXXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="min-h-[48px]"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="min-h-[48px]"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="service">Service</Label>
            <select
              id="service"
              name="service"
              required
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="border-input bg-background min-h-[48px] w-full rounded-md border px-3 text-base outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] md:text-sm"
            >
              <option value="">Select a service</option>
              {services.map((s) => (
                <option key={s.slug} value={s.title}>
                  {s.title}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="country">Country (optional)</Label>
            <select
              id="country"
              name="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="border-input bg-background min-h-[48px] w-full rounded-md border px-3 text-base outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] md:text-sm"
            >
              <option value="">Select a country</option>
              {countries.map((c) => (
                <option key={c.slug} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Travel dates, destination, or any questions…"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[48px]"
          />
        </div>

        {error ? (
          <p className="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
        ) : null}

        <Button
          type="submit"
          disabled={isPending}
          className="w-full min-h-[52px] bg-gold text-navy-deep hover:bg-gold/90 sm:w-auto"
        >
          {isPending ? "Submitting…" : "Submit inquiry"}
        </Button>
      </form>
    </div>
  );
}
