import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { LogoSvg } from "@/components/LogoSvg";
import { brand, fonts } from "@/lib/brand";

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
    <header className="sticky top-0 z-50" style={{ backgroundColor: brand.paper, borderBottom: `1px solid ${brand.paperLine}` }}>
      <div className="container mx-auto px-4 md:px-6 h-[68px] flex items-center gap-6">

        {/* Logo */}
        <Link href="/" className="shrink-0 mr-auto md:mr-0 flex items-center gap-2">
          <LogoSvg className="h-6 w-auto" />
        </Link>

        {/* Desktop nav — centered, ledger-style tabs */}
        <nav className="hidden md:flex items-center gap-7 mx-auto">
          {LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{
                fontFamily: fonts.mono,
                fontSize: "12px",
                letterSpacing: "0.04em",
                color: isActive(href) ? brand.stamp : brand.ink,
                fontWeight: isActive(href) ? 700 : 500,
              }}
              className="transition-colors"
            >
              {label.toUpperCase()}
            </Link>
          ))}
        </nav>

        {/* Desktop right: cart + CTA */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
          <button
            onClick={openCart}
            className="relative flex items-center gap-1.5 h-9 px-3.5 border transition-colors"
            style={{ borderColor: brand.paperLine, color: brand.ink }}
            aria-label="Sepeti aç"
            data-testid="button-open-cart"
          >
            <ShoppingCart className="w-4 h-4" />
            {totalItems > 0 ? (
              <span style={{ fontFamily: fonts.mono, fontSize: "11px", fontWeight: 700, color: brand.stamp }}>
                {totalItems}
              </span>
            ) : (
              <span style={{ fontFamily: fonts.mono, fontSize: "11px", color: brand.inkMuted }}>SEPET</span>
            )}
          </button>

          <Link
            href="/shop"
            className="flex items-center h-9 px-5"
            style={{ backgroundColor: brand.navy, color: "white", fontFamily: fonts.body, fontWeight: 700, fontSize: "13.5px" }}
            data-testid="nav-shop"
          >
            Arabalara Göz At
          </Link>
        </div>

        {/* Mobile right: cart icon + hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={openCart}
            className="relative p-2 transition-colors"
            style={{ color: brand.ink }}
            aria-label="Sepeti aç"
          >
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <span
                className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-white flex items-center justify-center"
                style={{ backgroundColor: brand.stamp, fontFamily: fonts.mono, fontSize: "9px", fontWeight: 700 }}
              >
                {totalItems}
              </span>
            )}
          </button>
          <button
            className="p-2 transition-colors"
            style={{ color: brand.ink }}
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
        <div
          className="md:hidden px-4 pt-3 pb-4 flex flex-col gap-1"
          style={{ backgroundColor: brand.paper, borderTop: `1px solid ${brand.paperLine}` }}
        >
          {LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="px-3 py-2.5 transition-colors"
              style={{
                fontFamily: fonts.mono,
                fontSize: "12px",
                letterSpacing: "0.04em",
                color: isActive(href) ? brand.stamp : brand.ink,
                fontWeight: isActive(href) ? 700 : 500,
              }}
            >
              {label.toUpperCase()}
            </Link>
          ))}
          <Link
            href="/shop"
            onClick={() => setOpen(false)}
            className="mt-2 py-3 text-center"
            style={{ backgroundColor: brand.navy, color: "white", fontFamily: fonts.body, fontWeight: 700, fontSize: "14px" }}
          >
            Arabalara Göz At
          </Link>
        </div>
      )}
    </header>
  );
}
