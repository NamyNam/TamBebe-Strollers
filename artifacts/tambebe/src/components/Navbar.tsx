import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  const { totalItems, openCart } = useCart();

  function navLink(href: string, label: string) {
    const active = location === href || (href !== "/" && location.startsWith(href));
    return (
      <Link
        href={href}
        className={`relative px-4 py-2 text-sm font-semibold transition-colors rounded-lg ${
          active ? "text-foreground" : "text-foreground/60 hover:text-foreground"
        }`}
      >
        {label}
        {active && (
          <span
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
            style={{ backgroundColor: "#f6ab78" }}
          />
        )}
      </Link>
    );
  }

  function mobileLink(href: string, label: string) {
    const active = location === href || (href !== "/" && location.startsWith(href));
    return (
      <Link
        href={href}
        onClick={() => setOpen(false)}
        className={`px-3 py-2.5 text-sm font-semibold rounded-xl transition-colors ${
          active
            ? "text-foreground font-black"
            : "text-foreground/70 hover:bg-muted hover:text-foreground"
        }`}
        style={active ? { backgroundColor: "#f6ab7815" } : {}}
      >
        {label}
      </Link>
    );
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="text-2xl font-black text-foreground tracking-tight shrink-0">
          Tam<span style={{ color: "#f6ab78" }}>Bebe</span>.
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-0.5">
          {navLink("/process", "Sürecimiz")}
          {navLink("/sell", "Arabanı Sat")}
        </nav>

        {/* Desktop right actions */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={openCart}
            className="relative p-2.5 rounded-xl hover:bg-muted transition-colors"
            aria-label="Sepeti aç"
            data-testid="button-open-cart"
          >
            <ShoppingCart className="w-5 h-5 text-foreground" />
            {totalItems > 0 && (
              <span
                className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full text-white text-[10px] font-black flex items-center justify-center"
                style={{ backgroundColor: "#f6ab78" }}
                data-testid="cart-badge"
              >
                {totalItems}
              </span>
            )}
          </button>

          <Link
            href="/shop"
            className="px-5 py-2 rounded-full text-sm font-black text-white transition-all hover:opacity-90 hover:shadow-md"
            style={{ backgroundColor: "#65a6db" }}
            data-testid="nav-shop"
          >
            Arabalara Göz At
          </Link>
        </div>

        {/* Mobile right actions */}
        <div className="flex items-center gap-1.5 md:hidden">
          <button
            onClick={openCart}
            className="relative p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Sepeti aç"
          >
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <span
                className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-white text-[9px] font-black flex items-center justify-center"
                style={{ backgroundColor: "#f6ab78" }}
              >
                {totalItems}
              </span>
            )}
          </button>
          <button
            className="p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setOpen(!open)}
            data-testid="button-mobile-menu"
            aria-label="Menüyü aç/kapat"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border/60 bg-white px-4 pb-5 pt-3 flex flex-col gap-1">
          {mobileLink("/process", "Sürecimiz")}
          {mobileLink("/sell", "Arabanı Sat")}
          <Link
            href="/shop"
            onClick={() => setOpen(false)}
            className="mt-2 px-4 py-3 rounded-2xl text-sm font-black text-white text-center transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#65a6db" }}
          >
            Arabalara Göz At
          </Link>
        </div>
      )}
    </header>
  );
}
