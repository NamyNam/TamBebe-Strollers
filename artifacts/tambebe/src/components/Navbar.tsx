import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { LogoSvg } from "@/components/LogoSvg";

const LINKS = [
  { href: "/",        label: "Ana Sayfa" },
  { href: "/process", label: "Sürecimiz" },
  { href: "/sell",    label: "Arabanı Sat" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  const { totalItems, openCart } = useCart();

  function isActive(href: string) {
    return location === href || (href !== "/" && location.startsWith(href));
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border">
      <div className="container mx-auto px-4 md:px-6 h-[72px] flex items-center gap-6">

        {/* Logo */}
        <Link href="/" className="shrink-0 mr-auto md:mr-0">
          <LogoSvg className="h-7 w-auto" />
        </Link>

        {/* Desktop nav — centered */}
        <nav className="hidden md:flex items-center gap-6 mx-auto">
          {LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-semibold transition-colors"
              style={{ color: isActive(href) ? "#f6ab78" : undefined }}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Desktop right: cart + CTA — same pill height */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
          <button
            onClick={openCart}
            className="relative flex items-center gap-1.5 h-9 px-4 rounded-full border border-border text-sm font-semibold hover:bg-muted transition-colors"
            aria-label="Sepeti aç"
            data-testid="button-open-cart"
          >
            <ShoppingCart className="w-4 h-4" />
            {totalItems > 0 ? (
              <span className="text-xs font-black" style={{ color: "#f6ab78" }}>
                {totalItems}
              </span>
            ) : (
              <span className="text-xs text-muted-foreground">Sepet</span>
            )}
          </button>

          <Link
            href="/shop"
            className="flex items-center h-9 px-5 rounded-full text-sm font-black text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#65a6db" }}
            data-testid="nav-shop"
          >
            Arabalara Göz At
          </Link>
        </div>

        {/* Mobile right: cart icon + hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={openCart}
            className="relative p-2 rounded-full hover:bg-muted transition-colors"
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
            className="p-2 rounded-full hover:bg-muted transition-colors"
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
        <div className="md:hidden border-t border-border bg-white px-4 pt-3 pb-4 flex flex-col gap-1">
          {LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="px-3 py-2.5 text-sm font-semibold rounded-xl transition-colors hover:bg-muted"
              style={isActive(href) ? { color: "#f6ab78" } : {}}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/shop"
            onClick={() => setOpen(false)}
            className="mt-2 py-3 rounded-full text-sm font-black text-white text-center"
            style={{ backgroundColor: "#65a6db" }}
          >
            Arabalara Göz At
          </Link>
        </div>
      )}
    </header>
  );
}
