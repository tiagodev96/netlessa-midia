"use client";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Benefits from "../components/Benefits";
import Environments from "../components/Environments";
import HowItWorks from "../components/HowItWorks";
import Proofs from "../components/Proofs";
// import MediaKit from "../components/MediaKit";
import Locations from "../components/Locations";
import Faq from "../components/Faq";
import FinalCta from "../components/FinalCta";
import Footer from "../components/Footer";
import { JsonLd } from "../components/JsonLd";
import { landingData } from "../data/landing";
// @ts-ignore
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: landingData.faq.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

export default function HomePage() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);

  return (
    <main>
      <JsonLd data={faqJsonLd} />
      <Navbar />
      <Hero />
      <Benefits />
      <Environments />
      <HowItWorks />
      <Proofs />
      {/* <MediaKit /> */}
      <Locations />
      <Faq />
      <FinalCta />
      <Footer />
    </main>
  );
}
