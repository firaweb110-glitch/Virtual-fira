"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, TriangleAlert } from "lucide-react";
import { contactSchema, serviceOptions, type ContactValues } from "@/lib/validation";
import { cn } from "@/lib/utils";

type Status = { kind: "idle" } | { kind: "success" } | { kind: "error"; message: string };

const field =
  "mt-2 block w-full border border-ink/40 bg-paper px-4 py-3 text-base text-ink placeholder:text-mute focus:border-ink";

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="font-display text-sm font-semibold">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm font-medium text-[#B3261E]">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm({ defaultService }: { defaultService?: string }) {
  const startedAt = useRef(Date.now());
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const initial = serviceOptions.find((s) => s === defaultService);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { service: initial },
  });

  const [honeypot, setHoneypot] = useState("");

  async function onSubmit(values: ContactValues) {
    setStatus({ kind: "idle" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: honeypot, startedAt: startedAt.current }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setStatus({ kind: "error", message: data.error ?? "Something went wrong. Please try again." });
        return;
      }
      setStatus({ kind: "success" });
      reset();
      startedAt.current = Date.now();
    } catch {
      setStatus({ kind: "error", message: "Network error. Check your connection and try again." });
    }
  }

  if (status.kind === "success") {
    return (
      <div role="status" className="border border-ink bg-paper-dark p-8">
        <CheckCircle2 aria-hidden className="h-8 w-8" />
        <h2 className="mt-4 font-display text-3xl font-bold tracking-tighter">Inquiry sent.</h2>
        <p className="mt-3 max-w-md">Thanks. We have your details and will reply to the email address you provided.</p>
        <button type="button" onClick={() => setStatus({ kind: "idle" })} className="mt-6 font-medium underline underline-offset-4 hover:text-fira">
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-6" aria-describedby={status.kind === "error" ? "form-error" : undefined}>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="fullName" label="Full name" error={errors.fullName?.message}>
          <input id="fullName" autoComplete="name" aria-invalid={!!errors.fullName} aria-describedby={errors.fullName ? "fullName-error" : undefined} className={field} {...register("fullName")} />
        </Field>
        <Field id="businessName" label="Business name" error={errors.businessName?.message}>
          <input id="businessName" autoComplete="organization" aria-invalid={!!errors.businessName} aria-describedby={errors.businessName ? "businessName-error" : undefined} className={field} {...register("businessName")} />
        </Field>
        <Field id="email" label="Email address" error={errors.email?.message}>
          <input id="email" type="email" autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} className={field} {...register("email")} />
        </Field>
        <Field id="phone" label="WhatsApp / phone number" error={errors.phone?.message}>
          <input id="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+91 …" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-error" : undefined} className={field} {...register("phone")} />
        </Field>
      </div>

      <Field id="service" label="Service interested in" error={errors.service?.message}>
        <select id="service" aria-invalid={!!errors.service} aria-describedby={errors.service ? "service-error" : undefined} className={field} defaultValue={initial ?? ""} {...register("service")}>
          <option value="" disabled>Choose a service</option>
          {serviceOptions.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </Field>

      <Field id="details" label="Project details" error={errors.details?.message}>
        <textarea id="details" rows={6} aria-invalid={!!errors.details} aria-describedby={errors.details ? "details-error" : undefined} className={cn(field, "resize-y")} {...register("details")} />
      </Field>

      {/* Honeypot: hidden from people and assistive tech, bots tend to fill it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
      </div>

      {status.kind === "error" && (
        <div id="form-error" role="alert" className="flex gap-3 border border-[#B3261E] bg-[#B3261E]/5 p-4 text-[#7A1914]">
          <TriangleAlert aria-hidden className="mt-0.5 h-5 w-5 shrink-0" />
          <p>{status.message}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex min-h-14 items-center justify-center gap-2 bg-ink px-8 font-display text-base font-semibold text-paper transition-colors hover:bg-fira hover:text-ink disabled:cursor-not-allowed disabled:opacity-60 sm:w-fit"
      >
        {isSubmitting && <Loader2 aria-hidden className="h-4 w-4 animate-spin motion-reduce:animate-none" />}
        {isSubmitting ? "Sending…" : "Send inquiry"}
      </button>
    </form>
  );
}
