import { useState } from "react";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Trust } from "@/components/sections/Trust";
import { ProductGrid } from "@/components/sections/ProductGrid";
import { FAQ } from "@/components/sections/FAQ";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
        <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <a href="/" className="text-2xl font-black text-foreground tracking-tight">
            Tam<span style={{ color: "#f6ab78" }}>Bebe</span><span className="text-foreground">.</span>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            <a href="#process" className="px-4 py-2 text-sm font-semibold text-foreground hover:text-foreground/70 transition-colors rounded-lg">The Process</a>
            <a href="#faq" className="px-4 py-2 text-sm font-semibold text-foreground hover:text-foreground/70 transition-colors rounded-lg">FAQ</a>
            <a href="#sell" className="px-4 py-2 text-sm font-semibold text-foreground hover:text-foreground/70 transition-colors rounded-lg">Sell Your Stroller</a>
            <a
              href="#shop"
              className="ml-2 px-5 py-2 rounded-full text-sm font-bold text-white transition-colors"
              style={{ backgroundColor: "#65a6db" }}
              data-testid="nav-shop"
            >
              Shop Strollers
            </a>
          </nav>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            data-testid="button-mobile-menu"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-white px-4 pb-4 pt-2 flex flex-col gap-1">
            <a href="#process" onClick={() => setMobileOpen(false)} className="px-3 py-2.5 text-sm font-semibold rounded-lg hover:bg-muted transition-colors">The Process</a>
            <a href="#faq" onClick={() => setMobileOpen(false)} className="px-3 py-2.5 text-sm font-semibold rounded-lg hover:bg-muted transition-colors">FAQ</a>
            <a href="#sell" onClick={() => setMobileOpen(false)} className="px-3 py-2.5 text-sm font-semibold rounded-lg hover:bg-muted transition-colors">Sell Your Stroller</a>
            <a
              href="#shop"
              onClick={() => setMobileOpen(false)}
              className="mt-1 px-4 py-2.5 rounded-full text-sm font-bold text-white text-center transition-colors"
              style={{ backgroundColor: "#65a6db" }}
            >
              Shop Strollers
            </a>
          </div>
        )}
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
