import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  const isHome = location === "/";
  const { totalItems, openCart } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
        <Link href="/" className="text-xl font-black text-gray-900 tracking-tight">
          Tam<span style={{ color: "#f6ab78" }}>Bebe</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/shop" className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors">
            Inventory
          </Link>
          <Link href="/process" className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors">
            Our Process
          </Link>
          {isHome ? (
            <a href="#faq" className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors">FAQ</a>
          ) : (
            <Link href="/#faq" className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors">FAQ</Link>
          )}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={openCart}
            className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Open cart"
            data-testid="button-open-cart"
          >
            <ShoppingCart className="w-5 h-5 text-gray-700" />
            {totalItems > 0 && (
              <span
                className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 rounded-full text-white text-[10px] font-black flex items-center justify-center"
                style={{ backgroundColor: "#f6ab78", width: "18px", height: "18px" }}
                data-testid="cart-badge"
              >
                {totalItems}
              </span>
            )}
          </button>
          <Link
            href="/shop"
            className="px-4 py-2 rounded-lg text-sm font-bold text-white bg-gray-900 hover:bg-gray-800 transition-colors"
            data-testid="nav-shop"
          >
            Shop Now
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button onClick={openCart} className="relative p-2 rounded-lg hover:bg-gray-100" aria-label="Open cart">
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-white text-[9px] font-black flex items-center justify-center" style={{ backgroundColor: "#f6ab78" }}>
                {totalItems}
              </span>
            )}
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100" onClick={() => setOpen(!open)} data-testid="button-mobile-menu" aria-label="Toggle menu">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 pb-4 pt-2 flex flex-col gap-0.5">
          <Link href="/shop" onClick={() => setOpen(false)} className="px-3 py-2.5 text-sm font-semibold rounded-lg hover:bg-gray-50 text-gray-700">Inventory</Link>
          <Link href="/process" onClick={() => setOpen(false)} className="px-3 py-2.5 text-sm font-semibold rounded-lg hover:bg-gray-50 text-gray-700">Our Process</Link>
          <a href={isHome ? "#faq" : "/#faq"} onClick={() => setOpen(false)} className="px-3 py-2.5 text-sm font-semibold rounded-lg hover:bg-gray-50 text-gray-700">FAQ</a>
          <Link href="/shop" onClick={() => setOpen(false)} className="mt-2 px-4 py-2.5 rounded-lg text-sm font-bold text-white bg-gray-900 text-center">
            Shop Now
          </Link>
        </div>
      )}
    </header>
  );
}
