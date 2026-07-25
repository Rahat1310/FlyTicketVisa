"use client";

import { useState, useTransition } from "react";
import { CheckCircle2, Loader2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { uploadDocument } from "@/lib/actions/upload";
import { DOCUMENT_TYPES, type DocumentType } from "@/lib/uploads";
import { documentTypeLabel } from "@/lib/uploads";
import type { ChecklistSlot } from "@/lib/checklist";
import { cn } from "@/lib/utils";

type ExistingUpload = {
  id: string;
  fileName: string;
  documentType: string;
  uploadedAt: string;
};

type UploadClientProps = {
  token: string;
  slots: ChecklistSlot[];
  initialUploads: ExistingUpload[];
};

export function UploadClient({
  token,
  slots,
  initialUploads,
}: UploadClientProps) {
  const [uploads, setUploads] = useState(initialUploads);
  const [activeSlot, setActiveSlot] = useState(slots[0]?.id ?? "extra");
  const [documentType, setDocumentType] = useState<DocumentType>(
    slots[0]?.suggestedType ?? "passport",
  );
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();

  function selectSlot(slot: ChecklistSlot) {
    setActiveSlot(slot.id);
    setDocumentType(slot.suggestedType);
    setError("");
    setSuccess("");
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.set("documentType", documentType);

    startTransition(async () => {
      const result = await uploadDocument(token, formData);
      if (!result.ok) {
        setError(result.error);
        return;
      }

      setUploads((prev) => [result.upload, ...prev]);
      setSuccess(`${result.upload.fileName} uploaded.`);
      form.reset();
    });
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-xl text-navy">Document checklist</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Tap an item, choose the matching type, then upload a PDF or photo
          (max 8 MB).
        </p>
        <ul className="mt-4 space-y-2">
          {slots.map((slot) => {
            const done = uploads.some(
              (u) => u.documentType === slot.suggestedType,
            );
            return (
              <li key={slot.id}>
                <button
                  type="button"
                  onClick={() => selectSlot(slot)}
                  className={cn(
                    "flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left transition",
                    activeSlot === slot.id
                      ? "border-teal bg-teal/5"
                      : "border-border bg-card hover:border-teal/40",
                  )}
                >
                  <span
                    className={cn(
                      "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border text-[10px]",
                      done
                        ? "border-teal bg-teal text-white"
                        : "border-border text-muted-foreground",
                    )}
                  >
                    {done ? "✓" : ""}
                  </span>
                  <span className="text-sm leading-snug text-navy">
                    {slot.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-6"
      >
        <div className="space-y-2">
          <Label htmlFor="documentType">Document type</Label>
          <select
            id="documentType"
            name="documentType"
            value={documentType}
            onChange={(e) => setDocumentType(e.target.value as DocumentType)}
            className="border-input bg-background h-9 w-full rounded-md border px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
          >
            {DOCUMENT_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="file">File (PDF, JPG, PNG, WebP)</Label>
          <input
            id="file"
            name="file"
            type="file"
            required
            accept=".pdf,.jpg,.jpeg,.png,.webp,application/pdf,image/jpeg,image/png,image/webp"
            className="block w-full text-sm text-muted-foreground file:mr-3 file:rounded-md file:border-0 file:bg-navy file:px-3 file:py-2 file:text-sm file:font-medium file:text-white"
          />
        </div>

        {error ? (
          <p className="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
        ) : null}
        {success ? (
          <p className="rounded-md border border-teal/30 bg-teal/5 px-3 py-2 text-sm text-teal">
            {success}
          </p>
        ) : null}

        <Button
          type="submit"
          disabled={isPending}
          className="w-full gap-2 bg-gold text-navy-deep hover:bg-gold/90 sm:w-auto"
        >
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Upload className="size-4" />
          )}
          {isPending ? "Uploading…" : "Upload document"}
        </Button>
      </form>

      {uploads.length > 0 ? (
        <div>
          <h3 className="font-display text-lg text-navy">Uploaded</h3>
          <ul className="mt-3 space-y-2">
            {uploads.map((u) => (
              <li
                key={u.id}
                className="flex items-start gap-2 rounded-lg border border-border bg-section/60 px-3 py-2 text-sm"
              >
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-teal" />
                <span>
                  <span className="font-medium text-navy">{u.fileName}</span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">
                    {documentTypeLabel(u.documentType)}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <p className="text-xs leading-relaxed text-muted-foreground">
        Privacy: documents are used only for visa / ticket processing with{" "}
        Fly & Visa point. Do not share this upload link publicly.
      </p>
    </div>
  );
}
