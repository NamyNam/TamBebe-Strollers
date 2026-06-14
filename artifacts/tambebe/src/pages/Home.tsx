import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Trust } from "@/components/sections/Trust";
import { ProductGrid } from "@/components/sections/ProductGrid";
import { FAQ } from "@/components/sections/FAQ";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <header className="absolute top-0 left-0 right-0 z-50 py-6 border-b border-white/10">
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <div className="text-2xl font-serif font-bold text-foreground">
            TamBebe.
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#process" className="text-sm font-medium hover:text-primary transition-colors">The Process</a>
            <a href="#shop" className="text-sm font-medium hover:text-primary transition-colors">Shop</a>
            <a href="#faq" className="text-sm font-medium hover:text-primary transition-colors">FAQ</a>
            <a href="#sell" className="text-sm font-medium hover:text-primary transition-colors">Sell</a>
          </nav>
          <button className="md:hidden flex flex-col gap-1.5 p-2">
            <span className="w-6 h-0.5 bg-foreground block"></span>
            <span className="w-6 h-0.5 bg-foreground block"></span>
            <span className="w-6 h-0.5 bg-foreground block"></span>
          </button>
        </div>
      </header>

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