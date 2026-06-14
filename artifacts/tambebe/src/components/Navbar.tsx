import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  const isHome = location === "/";

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-black text-foreground tracking-tight">
          Tam<span style={{ color: "#f6ab78" }}>Bebe</span>.
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <Link
            href="/process"
            className="px-4 py-2 text-sm font-semibold text-foreground hover:text-foreground/70 transition-colors rounded-lg"
          >
            The Process
          </Link>
          {isHome ? (
            <a href="#faq" className="px-4 py-2 text-sm font-semibold text-foreground hover:text-foreground/70 transition-colors rounded-lg">
              FAQ
            </a>
          ) : (
            <Link href="/#faq" className="px-4 py-2 text-sm font-semibold text-foreground hover:text-foreground/70 transition-colors rounded-lg">
              FAQ
            </Link>
          )}
          <Link href="/" className="px-4 py-2 text-sm font-semibold text-foreground hover:text-foreground/70 transition-colors rounded-lg">
            Sell Your Stroller
          </Link>
          <Link
            href="/shop"
            className="ml-2 px-5 py-2 rounded-full text-sm font-black text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#65a6db" }}
            data-testid="nav-shop"
          >
            Shop Strollers
          </Link>
        </nav>

        <button
          className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          onClick={() => setOpen(!open)}
          data-testid="button-mobile-menu"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-white px-4 pb-4 pt-2 flex flex-col gap-1">
          <Link href="/process" onClick={() => setOpen(false)} className="px-3 py-2.5 text-sm font-semibold rounded-lg hover:bg-muted">The Process</Link>
          <a href={isHome ? "#faq" : "/#faq"} onClick={() => setOpen(false)} className="px-3 py-2.5 text-sm font-semibold rounded-lg hover:bg-muted">FAQ</a>
          <Link href="/" onClick={() => setOpen(false)} className="px-3 py-2.5 text-sm font-semibold rounded-lg hover:bg-muted">Sell Your Stroller</Link>
          <Link
            href="/shop"
            onClick={() => setOpen(false)}
            className="mt-1 px-4 py-2.5 rounded-full text-sm font-black text-white text-center"
            style={{ backgroundColor: "#65a6db" }}
          >
            Shop Strollers
          </Link>
        </div>
      )}
    </header>
  );
}
