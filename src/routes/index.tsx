import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { Preloader } from "@/components/site/Preloader";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { HowItWorks } from "@/components/site/HowItWorks";
import { Models } from "@/components/site/Models";
import { Testimonial } from "@/components/site/Testimonial";
import { ApplicationForm } from "@/components/site/ApplicationForm";
import { FAQ } from "@/components/site/FAQ";
import { FinalCTA } from "@/components/site/FinalCTA";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "clb — Launch Your Modeling Career" },
      { name: "description", content: "Professional guidance, top opportunities, and full support for aspiring models and content creators." },
      { property: "og:title", content: "clb — Launch Your Modeling Career" },
      { property: "og:description", content: "Professional guidance, top opportunities, and full support for aspiring models." },
    ],
  }),
  component: Index,
});

function Index() {
  const [ready, setReady] = useState(false);

  return (
    <>
      <Preloader onDone={() => setReady(true)} />
      {ready && (
        <main className="relative bg-black text-white overflow-x-hidden">
          <SmoothScroll />
          <Navbar />
          <Hero />
          <Marquee />
          <HowItWorks />
          <Models />
          <Testimonial />
          <ApplicationForm />
          <FAQ />
          <FinalCTA />
          <Footer />
        </main>
      )}
    </>
  );
}
