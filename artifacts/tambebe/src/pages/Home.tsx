import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Trust } from "@/components/sections/Trust";
import { ProductGrid } from "@/components/sections/ProductGrid";
import { FAQ } from "@/components/sections/FAQ";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Trust />
        <HowItWorks />
        <div id="shop"><ProductGrid /></div>
        <div id="faq"><FAQ /></div>
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}
