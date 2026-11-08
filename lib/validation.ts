import { z } from "zod";

export const serviceOptions = [
  "Website Design & Development",
  "360° Virtual Tour",
  "Branding",
  "Multiple Services",
  "Other",
] as const;

export const contactSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name.").max(80),
  businessName: z.string().trim().min(2, "Please enter your business name.").max(100),
  email: z.string().trim().email("Please enter a valid email address.").max(120),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s\-()]+$/, "Use digits only, with an optional + and country code.")
    .refine((v) => {
      const n = v.replace(/\D/g, "").length;
      return n >= 7 && n <= 15;
    }, "Enter a phone number with 7 to 15 digits."),
  service: z.enum(serviceOptions, { errorMap: () => ({ message: "Please choose a service." }) }),
  details: z
    .string()
    .trim()
    .min(10, "Tell us a little more (at least 10 characters).")
    .max(3000, "Please keep this under 3000 characters."),
});

export type ContactValues = z.infer<typeof contactSchema>;

/** Server payload = form values + spam-protection fields. */
export const contactPayloadSchema = contactSchema.extend({
  /** Honeypot: real visitors never see or fill this. */
  website: z.string().max(0).optional().default(""),
  /** Epoch ms when the form was rendered; used for a minimum-time check. */
  startedAt: z.number().int().optional(),
});
