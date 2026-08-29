import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, ShieldCheck, Upload, X, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Reveal, SectionLabel } from "./Reveal";
import { applySchema, submitApplication, type ApplyInput } from "@/lib/apply.functions";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const LOOK_FOR = [
  "Age 18+",
  "Willingness to learn",
  "Consistency and dedication",
  "Professional attitude",
  "Active social media presence (preferred)",
];

const inputCls =
  "w-full rounded-xl bg-black border border-white/20 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-[var(--pink)] focus:ring-2 focus:ring-[var(--pink)]/30";

export function ApplicationForm() {
  const submit = useServerFn(submitApplication);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [photos, setPhotos] = useState<File[]>([]);
  const [photoError, setPhotoError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ApplyInput>({
    resolver: zodResolver(applySchema),
    defaultValues: { experience: "none" } as Partial<ApplyInput>,
  });

  const onPhotos = (files: FileList | null) => {
    setPhotoError(null);
    if (!files) return;
    const arr = Array.from(files);
    if (arr.length + photos.length > 5) {
      setPhotoError("Up to 5 photos max.");
      return;
    }
    for (const f of arr) {
      if (f.size > 5 * 1024 * 1024) {
        setPhotoError(`${f.name} exceeds 5MB.`);
        return;
      }
    }
    setPhotos((p) => [...p, ...arr]);
  };

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve((reader.result as string).split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const onSubmit = async (data: ApplyInput) => {
    setSubmitError(null);
    try {
      const photoPayload = await Promise.all(
        photos.map(async (f) => ({
          name: f.name,
          type: f.type,
          base64: await toBase64(f),
        }))
      );
      await submit({ data: { ...data, photos: photoPayload } });
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "Lead");
      }
      setSubmitted(true);
    } catch (e) {
      console.error(e);
      setSubmitError("Something went wrong. Please try again or email us at info@creatorsclb.com");
    }
  };

  return (
    <section id="apply" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start gap-6 max-w-3xl">
          <Reveal><SectionLabel>Apply</SectionLabel></Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-[-0.03em] leading-[1]">
              Ready to <span className="text-gradient-pink">Get Started?</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-white/60 text-lg max-w-xl">
              Fill out the application below. Our team personally reviews every submission.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold mb-5">What We Look For</h3>
                <ul className="space-y-3">
                  {LOOK_FOR.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-white/80">
                      <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[var(--pink)]/15">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[var(--pink)]" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 flex gap-4">
                <ShieldCheck className="h-6 w-6 shrink-0 text-[var(--pink)]" />
                <div>
                  <div className="font-semibold">Your Privacy Matters</div>
                  <p className="text-sm text-white/55 mt-1 leading-relaxed">
                    All information is kept strictly confidential.<br />256-bit SSL encrypted.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-[var(--pink)]/40 bg-[var(--pink)]/5 p-10 text-center"
              >
                <div className="mx-auto h-14 w-14 rounded-full bg-[var(--pink)] flex items-center justify-center glow-pink">
                  <CheckCircle2 className="h-7 w-7 text-white" />
                </div>
                <h3 className="mt-6 text-3xl font-extrabold tracking-tight">Application received</h3>
                <p className="mt-3 text-white/60 max-w-md mx-auto">
                  Thanks for applying. Our team will personally review your submission and be in touch within 48 hours.
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8 grid gap-5"
                noValidate
              >
                <Field label="Full Name" error={errors.fullName?.message}>
                  <input {...register("fullName")} className={inputCls} placeholder="Jane Doe" />
                </Field>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Email" error={errors.email?.message}>
                    <input type="email" {...register("email")} className={inputCls} placeholder="you@email.com" />
                  </Field>
                  <Field label="Phone Number" error={errors.phone?.message}>
                    <input type="tel" {...register("phone")} className={inputCls} placeholder="+1 555 555 5555" />
                  </Field>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Age" error={errors.age?.message}>
                    <select {...register("age", { valueAsNumber: true })} className={inputCls}>
                      {Array.from({ length: 43 }, (_, i) => 18 + i).map((n) => (
                        <option key={n} value={n} className="bg-black">{n}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Location" error={errors.location?.message}>
                    <input {...register("location")} className={inputCls} placeholder="City, Country" />
                  </Field>
                </div>
                <Field label="Instagram Handle" error={errors.instagram?.message}>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 text-sm">@</span>
                    <input {...register("instagram")} className={cn(inputCls, "pl-8")} placeholder="yourhandle" />
                  </div>
                </Field>
                <Field label="Experience" error={errors.experience?.message}>
                  <select {...register("experience")} className={inputCls}>
                    <option value="none" className="bg-black">No experience — completely new</option>
                    <option value="some" className="bg-black">Some experience (hobby / part-time)</option>
                    <option value="experienced" className="bg-black">Experienced (1+ years)</option>
                    <option value="professional" className="bg-black">Professional (full-time creator)</option>
                  </select>
                </Field>
                <Field label="Why do you want to become a model?" error={errors.reason?.message}>
                  <textarea
                    {...register("reason")}
                    rows={4}
                    className={cn(inputCls, "resize-none")}
                    placeholder="Tell us a bit about yourself and your goals…"
                  />
                </Field>

                <Field label="Photos (optional, up to 5)" error={photoError ?? undefined}>
                  <label className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-white/20 bg-black px-4 py-8 cursor-pointer hover:border-[var(--pink)]/60 transition">
                    <Upload className="h-5 w-5 text-white/50" />
                    <span className="text-sm text-white/60">Drag & drop or click to upload</span>
                    <span className="text-xs text-white/40">JPG, PNG, WEBP, HEIC · max 5MB each</span>
                    <input
                      type="file"
                      multiple
                      accept="image/jpeg,image/png,image/webp,image/heic"
                      className="hidden"
                      onChange={(e) => onPhotos(e.target.files)}
                    />
                  </label>
                  {photos.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {photos.map((p, i) => (
                        <div key={i} className="relative h-16 w-16 rounded-lg overflow-hidden border border-white/10">
                          <img src={URL.createObjectURL(p)} alt={p.name} className="h-full w-full object-cover" />
                          <button
                            type="button"
                            onClick={() => setPhotos((arr) => arr.filter((_, j) => j !== i))}
                            className="absolute top-0.5 right-0.5 h-5 w-5 rounded-full bg-black/70 flex items-center justify-center"
                            aria-label="Remove"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </Field>

                {submitError && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400"
                  >
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                    {submitError}
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--pink)] px-7 py-4 text-sm font-semibold text-white transition-transform duration-200 hover:scale-[1.02] hover:glow-pink disabled:opacity-60 disabled:hover:scale-100"
                >
                  {isSubmitting ? "Submitting…" : "Submit Application"}
                </button>
                <p className="text-xs text-white/40 text-center">
                  By submitting, you agree to our Terms of Service and Privacy Policy. You must be 18+ to apply.
                </p>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-white/60 mb-2">
        {label}
      </label>
      {children}
      {error && <div className="mt-1.5 text-xs text-[var(--pink)]">{error}</div>}
    </div>
  );
}
