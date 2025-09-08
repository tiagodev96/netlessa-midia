import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import Benefits from "../components/Benefits"
import Environments from "../components/Environments"
import HowItWorks from "../components/HowItWorks"
import Proofs from "../components/Proofs"
import MediaKit from "../components/MediaKit"
import Locations from "../components/Locations"
import Faq from "../components/Faq"
import FinalCta from "../components/FinalCta"
import Footer from "../components/Footer"

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Benefits />
      <Environments />
      <HowItWorks />
      <Proofs />
      <MediaKit />
      <Locations />
      <Faq />
      <FinalCta />
      <Footer />
    </main>
  )
}
