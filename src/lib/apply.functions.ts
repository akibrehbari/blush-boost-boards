import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { Resend } from "resend";

export const applySchema = z.object({
  fullName: z.string().trim().min(2, "Required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(5, "Required").max(40),
  age: z.number().int().min(18, "Must be 18+").max(60),
  location: z.string().trim().min(2, "Required").max(120),
  instagram: z.string().trim().min(1, "Required").max(60).regex(/^[A-Za-z0-9._]+$/, "Letters, numbers, _ and . only"),
  experience: z.enum(["none", "some", "experienced", "professional"]),
  reason: z.string().trim().min(30, "Tell us a bit more (30+ chars)").max(1000),
  photos: z.array(z.object({
    name: z.string(),
    type: z.string(),
    base64: z.string(),
  })).max(5).optional(),
});

export type ApplyInput = z.infer<typeof applySchema>;

const experienceLabel: Record<ApplyInput["experience"], string> = {
  none: "No experience — completely new",
  some: "Some experience (hobby / part-time)",
  experienced: "Experienced (1+ years)",
  professional: "Professional (full-time creator)",
};

export const submitApplication = createServerFn({ method: "POST" })
  .validator((d: unknown) => applySchema.parse(d))
  .handler(async ({ data }) => {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const attachments = (data.photos ?? []).map((p) => ({
      filename: p.name,
      content: p.base64,
    }));

    await resend.emails.send({
      from: "clb Applications <noreply@creatorsclb.com>",
      to: ["creativeakib18@gmail.com", "info@creatorsclb.com"],
      subject: `New Application — ${data.fullName}`,
      attachments,
      html: `
        <h2>New Application from ${data.fullName}</h2>
        <table cellpadding="8" style="border-collapse:collapse;width:100%;max-width:600px">
          <tr><td><strong>Name</strong></td><td>${data.fullName}</td></tr>
          <tr><td><strong>Email</strong></td><td>${data.email}</td></tr>
          <tr><td><strong>Phone</strong></td><td>${data.phone}</td></tr>
          <tr><td><strong>Age</strong></td><td>${data.age}</td></tr>
          <tr><td><strong>Location</strong></td><td>${data.location}</td></tr>
          <tr><td><strong>Instagram</strong></td><td>@${data.instagram}</td></tr>
          <tr><td><strong>Experience</strong></td><td>${experienceLabel[data.experience]}</td></tr>
          <tr><td><strong>Why a model?</strong></td><td style="white-space:pre-wrap">${data.reason}</td></tr>
          <tr><td><strong>Photos</strong></td><td>${attachments.length > 0 ? `${attachments.length} attached` : "None"}</td></tr>
        </table>
      `,
    });

    return { ok: true as const };
  });
