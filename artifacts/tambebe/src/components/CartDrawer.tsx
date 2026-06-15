import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Trash2, ArrowRight, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import { useCart } from "@/contexts/CartContext";
import { conditionMeta } from "@/data/products";
import type { ConditionGrade } from "@/data/products";

export function CartDrawer() {
  const { isOpen, closeCart, items, removeItem, clearCart, totalPrice, totalItems } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={closeCart}
          />
          <motion.aside
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 35 }}
            className="fixed top-0 right-0 z-50 h-full w-full max-w-md bg-white shadow-2xl flex flex-col"
            data-testid="cart-drawer"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5" style={{ color: "#65a6db" }} />
                <h2 className="font-black text-lg text-foreground">
                  Sepetiniz
                  {totalItems > 0 && (
                    <span
                      className="ml-2 text-sm font-black rounded-full px-2 py-0.5"
                      style={{ backgroundColor: "#65a6db", color: "white" }}
                    >
                      {totalItems}
                    </span>
                  )}
                </h2>
              </div>
              <button
                onClick={closeCart}
                className="p-2 rounded-xl hover:bg-muted transition-colors"
                data-testid="button-close-cart"
                aria-label="Sepeti kapat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-16">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#65a6db10" }}
                  >
                    <ShoppingBag className="w-8 h-8" style={{ color: "#65a6db" }} />
                  </div>
                  <div>
                    <p className="font-black text-foreground text-base mb-1">Sepetiniz boş</p>
                    <p className="text-sm text-muted-foreground font-medium">Sevdiğiniz sertifikalı bir bebek arabası bulun.</p>
                  </div>
                  <button
                    onClick={closeCart}
                    className="mt-2 px-6 py-2.5 rounded-full text-sm font-black text-white"
                    style={{ backgroundColor: "#65a6db" }}
                    data-testid="button-continue-shopping"
                  >
                    Arabalara Göz At
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => {
                    const cm = conditionMeta[item.condition as ConditionGrade];
                    return (
                      <motion.div
                        key={item.variantId}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 40 }}
                        className="flex gap-4 bg-white border-2 border-border rounded-2xl p-4"
                        data-testid={`cart-item-${item.variantId}`}
                      >
                        <div className="w-20 h-20 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 overflow-hidden">
                          <img
                            src={item.image}
                            alt={`${item.brand} ${item.model}`}
                            className="w-full h-full object-contain p-1"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-black uppercase tracking-wider text-muted-foreground mb-0.5">
                            {item.brand}
                          </div>
                          <div className="font-black text-foreground text-sm mb-1 truncate">
                            {item.model}
                          </div>
                          <div className="text-xs text-muted-foreground font-semibold mb-1 truncate">
                            {item.color} · {item.year}
                          </div>
                          <span
                            className="inline-block text-xs font-black px-2 py-0.5 rounded-full mb-2"
                            style={{ backgroundColor: cm?.bg, color: cm?.color }}
                          >
                            {item.condition}
                          </span>
                          <div className="font-black" style={{ color: "#f6ab78" }}>
                            {item.price}
                          </div>
                        </div>
                        <button
                          onClick={() => removeItem(item.variantId)}
                          className="p-2 rounded-xl hover:bg-red-50 text-muted-foreground hover:text-red-500 transition-colors self-start shrink-0"
                          data-testid={`button-remove-${item.variantId}`}
                          aria-label="Ürünü kaldır"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-border px-6 py-5 space-y-4">
                <div
                  className="flex items-center gap-2 text-xs font-semibold px-3 py-2.5 rounded-xl"
                  style={{ backgroundColor: "#65a6db0d" }}
                >
                  <ShieldCheck className="w-4 h-4 shrink-0" style={{ color: "#65a6db" }} />
                  <span className="text-muted-foreground">
                    Tüm ürünler 6 aylık mekanik garantiyle TamBebe sertifikalıdır.
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-semibold text-muted-foreground text-sm">Ara Toplam</span>
                  <span className="text-2xl font-black text-foreground">€{totalPrice.toLocaleString()}</span>
                </div>
                <p className="text-xs text-muted-foreground font-medium -mt-2">
                  Kargo ve teslimat detayları ödeme sırasında onaylanacaktır.
                </p>

                <button
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full font-black text-base transition-all hover:opacity-90"
                  style={{ backgroundColor: "#f6ab78", color: "#252d3a" }}
                  data-testid="button-checkout"
                  onClick={() => alert("Ödeme yakında! Siparişinizi tamamlamak için sizi arayacağız.")}
                >
                  Ödemeye Geç
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={clearCart}
                  className="w-full text-center text-xs font-bold text-muted-foreground hover:text-foreground transition-colors py-1"
                  data-testid="button-clear-cart"
                >
                  Sepeti temizle
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
