import { useState, useEffect } from "react";
import { useParams, useSearch, useLocation, Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, ShieldCheck, CheckCircle2, Package, ChevronRight,
  ShoppingCart, Check, AlertTriangle, Info,
} from "lucide-react";
import { getProductBySlug, conditionMeta } from "@/data/products";
import type { ProductVariant, ConditionGrade } from "@/data/products";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/Navbar";
import { useCart } from "@/contexts/CartContext";

const stockLabel = (stock: number) => {
  if (stock === 0) return { text: "Out of Stock", color: "#ef4444", bg: "#fef2f2" };
  if (stock === 1) return { text: "1 left in stock", color: "#d97706", bg: "#fffbeb" };
  return { text: `${stock} in stock`, color: "#059669", bg: "#ecfdf5" };
};

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const search = useSearch();
  const [, navigate] = useLocation();

  const product = getProductBySlug(slug);

  const params = new URLSearchParams(search);
  const requestedVariantId = params.get("v");

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(() => {
    if (product) {
      return product.variants.find((v) => v.id === requestedVariantId) ?? product.variants[0];
    }
    return null as unknown as ProductVariant;
  });

  const { addItem, isInCart } = useCart();
  const inCart = selectedVariant ? isInCart(selectedVariant.id) : false;

  useEffect(() => {
    if (!product) return;
    const v = product.variants.find((v) => v.id === requestedVariantId) ?? product.variants[0];
    setSelectedVariant(v);
  }, [requestedVariantId, product]);

  function selectVariant(v: ProductVariant) {
    setSelectedVariant(v);
    navigate(`/strollers/${slug}?v=${v.id}`, { replace: true });
  }

  if (!product || !selectedVariant) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-background">
        <p className="text-xl font-black text-foreground">Stroller not found.</p>
        <Link href="/shop" className="px-6 py-2.5 rounded-full text-sm font-black text-white" style={{ backgroundColor: "#65a6db" }}>
          Back to shop
        </Link>
      </div>
    );
  }

  const cm = conditionMeta[selectedVariant.condition as ConditionGrade];
  const sl = stockLabel(selectedVariant.stock);
  const outOfStock = selectedVariant.stock === 0;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <div className="py-3.5 border-b border-border" style={{ backgroundColor: "#65a6db08" }}>
        <div className="container mx-auto px-4 md:px-6 flex items-center gap-2 text-sm font-semibold text-muted-foreground flex-wrap">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-foreground transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-foreground font-bold">{product.brand} {product.model}</span>
        </div>
      </div>

      <main className="flex-1">
        <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors mb-8"
            data-testid="link-back"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all strollers
          </Link>

          <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
            <motion.div
              key={selectedVariant.id}
              initial={{ opacity: 0.6, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <div className="sticky top-24 rounded-3xl bg-gray-50 border-2 border-border overflow-hidden aspect-square flex items-center justify-center p-10">
                <div className="absolute top-5 left-5 flex flex-col gap-2">
                  <span
                    className="inline-flex items-center gap-1.5 text-xs font-black rounded-full px-3 py-1 text-white"
                    style={{ backgroundColor: "#65a6db" }}
                  >
                    <ShieldCheck className="w-3.5 h-3.5" /> Certified
                  </span>
                  <span
                    className="inline-flex items-center text-xs font-black rounded-full px-3 py-1"
                    style={{ backgroundColor: cm.bg, color: cm.color }}
                  >
                    {selectedVariant.condition}
                  </span>
                  {outOfStock && (
                    <span className="inline-flex items-center text-xs font-black rounded-full px-3 py-1 bg-red-100 text-red-600">
                      Out of Stock
                    </span>
                  )}
                </div>
                <img
                  src={selectedVariant.image}
                  alt={`${product.brand} ${product.model} – ${selectedVariant.color}`}
                  className={`w-full h-full object-contain transition-all duration-300 ${outOfStock ? "opacity-50 grayscale" : ""}`}
                  data-testid={`img-product-${product.slug}`}
                />
              </div>
            </motion.div>

            <div className="flex flex-col">
              <div className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: "#65a6db" }}>
                {product.brand}
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2 text-foreground">
                {product.model}
              </h1>
              <p className="text-muted-foreground font-medium text-sm mb-5 leading-relaxed">
                {product.description}
              </p>

              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedVariant.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-baseline gap-4 mb-2">
                    <span
                      className="text-4xl font-black"
                      style={{ color: outOfStock ? "#9ca3af" : "#f6ab78" }}
                      data-testid="text-price"
                    >
                      {selectedVariant.price}
                    </span>
                    <span className="text-base text-muted-foreground line-through font-semibold">
                      Retail {product.retailPrice}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-6">
                    <span
                      className="inline-flex items-center gap-1.5 text-xs font-black px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: sl.bg, color: sl.color }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: sl.color }} />
                      {sl.text}
                    </span>
                    <span
                      className="text-xs font-black px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: cm.bg, color: cm.color }}
                    >
                      {selectedVariant.condition}
                    </span>
                    <span className="text-xs font-semibold text-muted-foreground">
                      {selectedVariant.year}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="mb-6">
                <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-3">
                  Color / Version
                </h3>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map((v) => {
                    const isSelected = v.id === selectedVariant.id;
                    const oos = v.stock === 0;
                    return (
                      <button
                        key={v.id}
                        onClick={() => selectVariant(v)}
                        title={`${v.color} – ${v.condition} (${v.price})${oos ? " – Out of stock" : ""}`}
                        className={`relative flex flex-col items-center gap-1.5 transition-all ${isSelected ? "scale-105" : "opacity-75 hover:opacity-100"}`}
                        data-testid={`swatch-${v.id}`}
                      >
                        <span
                          className={`w-9 h-9 rounded-full border-4 transition-all ${isSelected ? "border-foreground shadow-md" : "border-transparent hover:border-muted-foreground/40"}`}
                          style={{
                            backgroundColor: v.colorHex,
                            boxShadow: isSelected ? `0 0 0 2px white, 0 0 0 4px ${v.colorHex}` : undefined,
                          }}
                        >
                          {oos && (
                            <span className="absolute inset-0 flex items-center justify-center">
                              <span
                                className="block w-6 h-0.5 rotate-45 rounded"
                                style={{ backgroundColor: "rgba(255,255,255,0.7)" }}
                              />
                            </span>
                          )}
                        </span>
                        <span className="text-[10px] font-bold text-center max-w-14 leading-tight text-muted-foreground">
                          {v.color.split(" (")[0].split(" / ")[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedVariant.id + "-detail"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="mt-3 flex items-start gap-2 text-sm"
                  >
                    <div
                      className="w-4 h-4 rounded-full shrink-0 mt-0.5 border border-white shadow"
                      style={{ backgroundColor: selectedVariant.colorHex }}
                    />
                    <div>
                      <span className="font-black text-foreground">{selectedVariant.color}</span>
                      <span className="text-muted-foreground font-medium"> · {selectedVariant.year}</span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div
                className="rounded-xl p-4 mb-6 border-l-4 text-sm"
                style={{ borderColor: cm.color, backgroundColor: cm.bg }}
              >
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 mt-0.5 shrink-0" style={{ color: cm.color }} />
                  <div>
                    <span className="font-black" style={{ color: cm.color }}>
                      {selectedVariant.condition}
                    </span>
                    <span className="text-muted-foreground font-medium"> — {cm.description}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                {outOfStock ? (
                  <button
                    disabled
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-full font-black text-base bg-gray-100 text-gray-400 cursor-not-allowed"
                    data-testid="button-out-of-stock"
                  >
                    <AlertTriangle className="w-5 h-5" />
                    Out of Stock
                  </button>
                ) : inCart ? (
                  <button
                    disabled
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-full font-black text-base"
                    style={{ backgroundColor: "#ecfdf5", color: "#059669" }}
                    data-testid="button-in-cart"
                  >
                    <Check className="w-5 h-5" />
                    Added to Cart
                  </button>
                ) : (
                  <button
                    onClick={() => addItem(product, selectedVariant)}
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-full font-black text-base transition-all hover:opacity-90 active:scale-95"
                    style={{ backgroundColor: "#f6ab78", color: "#252d3a" }}
                    data-testid="button-add-to-cart"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                )}
                <a
                  href="mailto:hello@tambebe.com"
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-full font-black text-base border-2 transition-all hover:bg-muted"
                  style={{ borderColor: "#65a6db", color: "#65a6db" }}
                  data-testid="button-inquire"
                >
                  Ask a Question
                </a>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
                {[
                  ["Weight", product.weight],
                  ["Fold", product.foldType],
                  ["Seat positions", product.seatPositions],
                  ["Max child weight", product.maxChildWeight],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-xl bg-white border-2 border-border p-4">
                    <div className="text-xs text-muted-foreground mb-1 font-black uppercase tracking-wide">{label}</div>
                    <div className="font-black text-foreground text-sm">{value}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-5">
                <div className="bg-white rounded-2xl border-2 p-5" style={{ borderColor: "#65a6db40" }}>
                  <h3 className="flex items-center gap-2 font-black text-foreground mb-4 text-sm">
                    <ShieldCheck className="w-5 h-5" style={{ color: "#65a6db" }} />
                    Our renewal checklist
                  </h3>
                  <ul className="space-y-2">
                    {product.renewalChecks.map((check) => (
                      <li key={check} className="flex items-start gap-2.5 text-sm text-muted-foreground font-medium">
                        <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "#65a6db" }} />
                        {check}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-2xl border-2 p-5" style={{ borderColor: "#f6ab7840" }}>
                  <h3 className="flex items-center gap-2 font-black text-foreground mb-4 text-sm">
                    <Package className="w-5 h-5" style={{ color: "#f6ab78" }} />
                    What's included
                  </h3>
                  <ul className="space-y-2">
                    {product.included.map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-sm text-muted-foreground font-medium">
                        <ChevronRight className="w-4 h-4 shrink-0" style={{ color: "#f6ab78" }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-black text-foreground mb-3 text-sm">Highlights</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.highlights.map((h, i) => (
                      <span
                        key={h}
                        className="text-xs font-black rounded-full px-3 py-1.5"
                        style={
                          i % 2 === 0
                            ? { backgroundColor: "#65a6db15", color: "#3d7fb5" }
                            : { backgroundColor: "#f6ab7820", color: "#b8712a" }
                        }
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
