import { useState, useEffect, useMemo } from "react";
import { useParams, useSearch, useLocation, Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, ShieldCheck, CheckCircle2, Package, ChevronRight,
  ShoppingCart, Check, AlertTriangle, Info,
} from "lucide-react";
import {
  getProductBySlug, getUniqueColors, getVariantsForColor, conditionMeta,
} from "@/data/products";
import type { ProductVariant, ConditionGrade } from "@/data/products";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/Navbar";
import { useCart } from "@/contexts/CartContext";

const stockLabel = (stock: number) => {
  if (stock === 0) return { text: "Out of Stock", color: "#ef4444", bg: "#fef2f2" };
  if (stock === 1) return { text: "Last one!", color: "#d97706", bg: "#fffbeb" };
  return { text: `${stock} in stock`, color: "#059669", bg: "#ecfdf5" };
};

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const search = useSearch();
  const [, navigate] = useLocation();
  const { addItem, isInCart } = useCart();

  const product = getProductBySlug(slug);
  const params = new URLSearchParams(search);
  const requestedVariantId = params.get("v");

  function initFromVariantId(variantId: string | null) {
    if (!product) return { color: "", variantId: "" };
    const v = product.variants.find((v) => v.id === variantId) ?? product.variants[0];
    return { color: v.color, variantId: v.id };
  }

  const init = useMemo(() => initFromVariantId(requestedVariantId), []);
  const [selectedColor, setSelectedColor] = useState(init.color);
  const [selectedVariantId, setSelectedVariantId] = useState(init.variantId);

  useEffect(() => {
    if (!product) return;
    const { color, variantId } = initFromVariantId(requestedVariantId);
    setSelectedColor(color);
    setSelectedVariantId(variantId);
  }, [requestedVariantId]);

  const uniqueColors = useMemo(() => product ? getUniqueColors(product) : [], [product]);
  const conditionsForColor = useMemo(
    () => product ? getVariantsForColor(product, selectedColor) : [],
    [product, selectedColor]
  );
  const selectedVariant: ProductVariant | undefined = useMemo(
    () => product?.variants.find((v) => v.id === selectedVariantId),
    [product, selectedVariantId]
  );

  function pickColor(color: string, colorHex: string) {
    if (!product) return;
    const options = getVariantsForColor(product, color);
    const firstInStock = options.find((v) => v.stock > 0) ?? options[0];
    setSelectedColor(color);
    setSelectedVariantId(firstInStock.id);
    navigate(`/strollers/${slug}?v=${firstInStock.id}`, { replace: true });
  }

  function pickCondition(v: ProductVariant) {
    setSelectedVariantId(v.id);
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
  const inCart = isInCart(selectedVariant.id);

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
          <Link href="/shop" className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors mb-8" data-testid="link-back">
            <ArrowLeft className="w-4 h-4" />
            Back to all strollers
          </Link>

          <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
            {/* Image panel */}
            <motion.div
              key={selectedVariant.id + "-img"}
              initial={{ opacity: 0.7, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <div className="sticky top-24 rounded-3xl bg-gray-50 border-2 border-border overflow-hidden aspect-square flex items-center justify-center p-10">
                <div className="absolute top-5 left-5 flex flex-col gap-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-black rounded-full px-3 py-1 text-white" style={{ backgroundColor: "#65a6db" }}>
                    <ShieldCheck className="w-3.5 h-3.5" /> Certified
                  </span>
                  <span className="inline-flex items-center text-xs font-black rounded-full px-3 py-1" style={{ backgroundColor: cm.bg, color: cm.color }}>
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
                  data-testid="img-product"
                />
              </div>
            </motion.div>

            {/* Details panel */}
            <div className="flex flex-col">
              <div className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: "#65a6db" }}>{product.brand}</div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2 text-foreground">{product.model}</h1>
              <p className="text-muted-foreground font-medium text-sm mb-5 leading-relaxed">{product.description}</p>

              <AnimatePresence mode="wait">
                <motion.div key={selectedVariant.id + "-price"} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
                  <div className="flex items-baseline gap-4 mb-2">
                    <span className="text-4xl font-black" style={{ color: outOfStock ? "#9ca3af" : "#f6ab78" }} data-testid="text-price">
                      {selectedVariant.price}
                    </span>
                    <span className="text-base text-muted-foreground line-through font-semibold">Retail {product.retailPrice}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-6">
                    <span className="inline-flex items-center gap-1.5 text-xs font-black px-2.5 py-1 rounded-full" style={{ backgroundColor: sl.bg, color: sl.color }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: sl.color }} />
                      {sl.text}
                    </span>
                    <span className="text-xs font-semibold text-muted-foreground">{selectedVariant.year}</span>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* ── Color selector ── */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Color</h3>
                  <AnimatePresence mode="wait">
                    <motion.span key={selectedColor} initial={{ opacity: 0, x: 6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="text-sm font-black text-foreground">
                      {selectedColor.split(" (")[0]}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <div className="flex flex-wrap gap-3">
                  {uniqueColors.map(({ color, colorHex }) => {
                    const isSelected = color === selectedColor;
                    const hasStock = product.variants.filter((v) => v.color === color).some((v) => v.stock > 0);
                    return (
                      <button
                        key={color}
                        onClick={() => pickColor(color, colorHex)}
                        title={color}
                        className={`relative flex flex-col items-center gap-1.5 transition-all ${isSelected ? "scale-110" : "opacity-60 hover:opacity-90"}`}
                        data-testid={`swatch-color-${color}`}
                      >
                        <span
                          className="w-9 h-9 rounded-full border-2 transition-all"
                          style={{
                            backgroundColor: colorHex,
                            borderColor: isSelected ? "#252d3a" : "transparent",
                            outline: isSelected ? `3px solid ${colorHex}` : "none",
                            outlineOffset: "2px",
                            opacity: hasStock ? 1 : 0.45,
                          }}
                        />
                        {!hasStock && (
                          <span className="absolute inset-0 flex items-center justify-center">
                            <span className="block w-6 h-0.5 rotate-45 rounded bg-white/60" />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ── Condition selector ── */}
              <div className="mb-6">
                <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-3">Condition</h3>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedColor + "-conditions"}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col gap-2"
                  >
                    {conditionsForColor.map((v) => {
                      const meta = conditionMeta[v.condition];
                      const isSelected = v.id === selectedVariantId;
                      const oos = v.stock === 0;
                      const sl2 = stockLabel(v.stock);
                      return (
                        <button
                          key={v.id}
                          onClick={() => !oos && pickCondition(v)}
                          disabled={oos}
                          className={`flex items-center justify-between rounded-2xl px-4 py-3 border-2 text-left transition-all ${
                            isSelected
                              ? "border-foreground shadow-sm"
                              : oos
                              ? "border-border opacity-50 cursor-not-allowed"
                              : "border-border hover:border-muted-foreground"
                          }`}
                          style={isSelected ? { backgroundColor: meta.bg, borderColor: meta.color } : {}}
                          data-testid={`condition-${v.id}`}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className="w-3 h-3 rounded-full shrink-0 border-2 border-white shadow"
                              style={{ backgroundColor: meta.color }}
                            />
                            <div>
                              <div className="text-sm font-black text-foreground flex items-center gap-2">
                                {v.condition}
                                {isSelected && <Check className="w-3.5 h-3.5" style={{ color: meta.color }} />}
                              </div>
                              <div className="text-xs text-muted-foreground font-medium">{meta.description}</div>
                            </div>
                          </div>
                          <div className="text-right shrink-0 ml-3">
                            <div className="font-black text-base" style={{ color: oos ? "#9ca3af" : "#f6ab78" }}>{v.price}</div>
                            <div className="text-xs font-bold" style={{ color: sl2.color }}>
                              {oos ? "Out of stock" : sl2.text}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* ── Condition explanation ── */}
              <AnimatePresence mode="wait">
                <motion.div key={selectedVariant.id + "-info"} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
                  className="rounded-xl p-4 mb-6 border-l-4 text-sm flex items-start gap-2"
                  style={{ borderColor: cm.color, backgroundColor: cm.bg }}
                >
                  <Info className="w-4 h-4 mt-0.5 shrink-0" style={{ color: cm.color }} />
                  <div>
                    <span className="font-black" style={{ color: cm.color }}>{selectedVariant.condition}</span>
                    <span className="text-muted-foreground font-medium"> · {selectedVariant.year} · {selectedVariant.color}</span>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* ── CTAs ── */}
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                {outOfStock ? (
                  <button disabled className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-full font-black text-base bg-gray-100 text-gray-400 cursor-not-allowed" data-testid="button-out-of-stock">
                    <AlertTriangle className="w-5 h-5" />
                    Out of Stock
                  </button>
                ) : inCart ? (
                  <button disabled className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-full font-black text-base" style={{ backgroundColor: "#ecfdf5", color: "#059669" }} data-testid="button-in-cart">
                    <Check className="w-5 h-5" />
                    Added to Cart
                  </button>
                ) : (
                  <button onClick={() => addItem(product, selectedVariant)}
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-full font-black text-base transition-all hover:opacity-90 active:scale-95"
                    style={{ backgroundColor: "#f6ab78", color: "#252d3a" }}
                    data-testid="button-add-to-cart"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                )}
                <a href="mailto:hello@tambebe.com"
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-full font-black text-base border-2 transition-all hover:bg-muted"
                  style={{ borderColor: "#65a6db", color: "#65a6db" }}
                  data-testid="button-inquire"
                >
                  Ask a Question
                </a>
              </div>

              {/* ── Specs grid ── */}
              <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
                {([["Weight", product.weight], ["Fold", product.foldType], ["Seat positions", product.seatPositions], ["Max child weight", product.maxChildWeight]] as [string, string][]).map(([label, value]) => (
                  <div key={label} className="rounded-xl bg-white border-2 border-border p-4">
                    <div className="text-xs text-muted-foreground mb-1 font-black uppercase tracking-wide">{label}</div>
                    <div className="font-black text-foreground text-sm">{value}</div>
                  </div>
                ))}
              </div>

              {/* ── Checklist ── */}
              <div className="space-y-5">
                <div className="bg-white rounded-2xl border-2 p-5" style={{ borderColor: "#65a6db40" }}>
                  <h3 className="flex items-center gap-2 font-black text-foreground mb-4 text-sm">
                    <ShieldCheck className="w-5 h-5" style={{ color: "#65a6db" }} />
                    Renewal checklist
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
                      <span key={h} className="text-xs font-black rounded-full px-3 py-1.5"
                        style={i % 2 === 0 ? { backgroundColor: "#65a6db15", color: "#3d7fb5" } : { backgroundColor: "#f6ab7820", color: "#b8712a" }}>
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
