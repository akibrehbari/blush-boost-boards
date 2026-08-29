import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Reveal, SectionLabel } from "./Reveal";

const FAQS = [
  { q: "Do I need previous modeling experience?", a: "No. Most of our models start with zero professional experience. We provide complete onboarding, training, and brand guidance so you can grow into the work at your own pace." },
  { q: "How much can I realistically earn?", a: "Earnings vary by effort, niche, and audience. Our average active model earns between $3,000–$15,000 per month after the first 90 days. Top performers exceed $25,000." },
  { q: "Is my identity and information kept private?", a: "Absolutely. All personal data is encrypted, never shared, and you control exactly what is published. We never disclose your real identity without explicit, written consent." },
  { q: "What does the application process look like?", a: "Submit the form on this page, our team reviews within 48 hours, and you receive personal feedback. Approved applicants go through a 1:1 onboarding call." },
  { q: "What kind of support do you provide?", a: "Dedicated manager, content strategy, brand-deal sourcing, legal review, payments, and 24/7 chat support. We handle the business so you can focus on creating." },
  { q: "How long does it take to start earning?", a: "Most models publish their first paid content within the first 2 weeks. Meaningful monthly income typically begins between weeks 3 and 6." },
  { q: "Can I do this part-time?", a: "Yes. Many of our top earners started part-time around school or another job. As few as 6–10 focused hours per week is enough to begin." },
  { q: "What are the age requirements?", a: "You must be 18 years or older to apply. We verify age and identity during onboarding — no exceptions." },
];

export function FAQ() {
  return (
    <section id="faq" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <div className="flex flex-col items-start gap-6">
          <Reveal><SectionLabel>FAQ</SectionLabel></Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-[-0.03em] leading-[1]">
              Questions, <span className="text-white/40">answered.</span>
            </h2>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <Accordion type="single" collapsible className="mt-12 w-full">
            {FAQS.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-white/10">
                <AccordionTrigger className="text-left text-base md:text-lg font-semibold py-6 hover:no-underline [&[data-state=open]>svg]:text-[var(--pink)] [&>svg]:transition-colors">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-white/60 text-base leading-relaxed pb-6">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
