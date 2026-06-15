import { useState, useEffect, useMemo } from "react";
import { useParams, useSearch, useLocation, Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, ShieldCheck, CheckCircle2, Package,
  ShoppingCart, Check, AlertTriangle, ChevronDown,
} from "lucide-react";
import {
  getProductBySlug, getUniqueColors, getVariantsForColor, conditionMeta,
} from "@/data/products";
import type { ProductVariant, ConditionGrade } from "@/data/products";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/Navbar";
import { useCart } from "@/contexts/CartContext";

const stockLabel = (stock: number) => {
  if (stock === 0) return { text: "Out of stock", color: "#ef4444" };
  if (stock === 1) return { text: "Last one!", color: "#d97706" };
  return { text: `${stock} in stock`, color: "#059669" };
};

function Accordion({ title, icon, count, children }: { title: string; icon: React.ReactNode; count?: number; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-2 border-border rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="flex items-center gap-2 text-sm font-black text-foreground">
          {icon}
          {title}
          {count !== undefined && <span className="text-xs font-bold text-muted-foreground">({count})</span>}
        </span>
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-4 border-t border-border pt-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

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

  function pickColor(color: string) {
    if (!product) return;
    const options = getVariantsForColor(product, color);
    const firstInStock = options.find((v) => v.stock > 0) ?? options[0];
    setSelectedColor(color);
    setSelectedVariantId(firstInStock.id);
    navigate(`/strollers/${slug}?v=${firstInStock.id}`, { replace: true });
  }

  function pickCondition(v: ProductVariant) {
    if (v.stock === 0) return;
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

      <nav className="py-3 border-b border-border bg-white">
        <div className="container mx-auto px-4 md:px-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/shop" className="inline-flex items-center gap-1.5 font-semibold hover:text-foreground transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Shop
          </Link>
          <span>/</span>
          <span className="font-bold text-foreground">{product.brand} {product.model}</span>
        </div>
      </nav>

      <main className="flex-1">
        <div className="container mx-auto px-4 md:px-6 py-6 md:py-10">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-14">

            {/* ── Image ── */}
            <motion.div
              key={selectedVariant.id + "-img"}
              initial={{ opacity: 0.7 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
            >
              <div className="sticky top-20 rounded-3xl bg-gray-50 border border-border overflow-hidden aspect-square flex items-center justify-center p-8 relative">
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-xs font-black rounded-full px-2.5 py-1 text-white" style={{ backgroundColor: "#65a6db" }}>
                    <ShieldCheck className="w-3 h-3" /> Certified
                  </span>
                  <span className="text-xs font-black rounded-full px-2.5 py-1" style={{ backgroundColor: cm.bg, color: cm.color }}>
                    {selectedVariant.condition}
                  </span>
                </div>
                <img
                  src={selectedVariant.image}
                  alt={`${product.brand} ${product.model}`}
                  className={`w-full h-full object-contain transition-all duration-300 ${outOfStock ? "opacity-40 grayscale" : ""}`}
                  data-testid="img-product"
                />
              </div>
            </motion.div>

            {/* ── Details ── */}
            <div className="flex flex-col gap-5">

              {/* Title + price */}
              <div>
                <p className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: "#65a6db" }}>{product.brand}</p>
                <h1 className="text-3xl md:text-4xl font-black tracking-tight text-foreground mb-3">{product.model}</h1>
                <AnimatePresence mode="wait">
                  <motion.div key={selectedVariant.id + "-price"} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
                    className="flex items-baseline gap-3 flex-wrap">
                    <span className="text-3xl font-black" style={{ color: outOfStock ? "#9ca3af" : "#f6ab78" }} data-testid="text-price">
                      {selectedVariant.price}
                    </span>
                    <span className="text-sm text-muted-foreground line-through font-semibold">Retail {product.retailPrice}</span>
                    <span className="text-xs font-bold" style={{ color: sl.color }}>· {sl.text}</span>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Color */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">Color</span>
                  <AnimatePresence mode="wait">
                    <motion.span key={selectedColor} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="text-xs font-bold text-foreground">
                      {selectedColor.split(" (")[0].split(" / ")[0]}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <div className="flex gap-2.5 flex-wrap">
                  {uniqueColors.map(({ color, colorHex }) => {
                    const isSelected = color === selectedColor;
                    const hasStock = product.variants.filter((v) => v.color === color).some((v) => v.stock > 0);
                    return (
                      <button key={color} onClick={() => pickColor(color)} title={color}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${isSelected ? "scale-110" : "opacity-55 hover:opacity-90"}`}
                        style={{
                          backgroundColor: colorHex,
                          borderColor: isSelected ? "#252d3a" : "transparent",
                          outline: isSelected ? `2px solid ${colorHex}` : "none",
                          outlineOffset: "2px",
                          filter: hasStock ? "none" : "grayscale(60%)",
                        }}
                        data-testid={`swatch-color-${color}`}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Condition */}
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-muted-foreground block mb-2">Condition</span>
                <AnimatePresence mode="wait">
                  <motion.div key={selectedColor + "-conds"} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}
                    className="flex flex-col gap-1.5">
                    {conditionsForColor.map((v) => {
                      const meta = conditionMeta[v.condition];
                      const isSelected = v.id === selectedVariantId;
                      const oos = v.stock === 0;
                      const sl2 = stockLabel(v.stock);
                      return (
                        <button key={v.id} onClick={() => pickCondition(v)} disabled={oos}
                          className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 border text-left transition-all ${
                            isSelected ? "border-2 shadow-sm" : oos ? "opacity-40 cursor-not-allowed border" : "border hover:border-gray-400"
                          }`}
                          style={{
                            borderColor: isSelected ? meta.color : undefined,
                            backgroundColor: isSelected ? meta.bg : undefined,
                          }}
                          data-testid={`condition-${v.id}`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: meta.color }} />
                            <span className="text-sm font-black text-foreground">{v.condition}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 shrink-0" style={{ color: meta.color }} />}
                          </div>
                          <div className="flex items-center gap-2 ml-3 shrink-0">
                            <span className="text-sm font-black" style={{ color: oos ? "#9ca3af" : "#f6ab78" }}>{v.price}</span>
                            <span className="text-xs font-semibold hidden sm:block" style={{ color: sl2.color }}>{oos ? "—" : sl2.text}</span>
                          </div>
                        </button>
                      );
                    })}
                  </motion.div>
                </AnimatePresence>
                {/* Selected condition description — one quiet line */}
                <AnimatePresence mode="wait">
                  <motion.p key={selectedVariantId + "-desc"} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
                    className="mt-2 text-xs text-muted-foreground font-medium pl-1">
                    <span className="font-bold" style={{ color: cm.color }}>{selectedVariant.condition}:</span> {cm.description}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* CTAs */}
              <div className="flex gap-3">
                {outOfStock ? (
                  <button disabled className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-full font-black text-sm bg-gray-100 text-gray-400 cursor-not-allowed" data-testid="button-out-of-stock">
                    <AlertTriangle className="w-4 h-4" /> Out of Stock
                  </button>
                ) : inCart ? (
                  <button disabled className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-full font-black text-sm" style={{ backgroundColor: "#ecfdf5", color: "#059669" }} data-testid="button-in-cart">
                    <Check className="w-4 h-4" /> In Cart
                  </button>
                ) : (
                  <button onClick={() => addItem(product, selectedVariant)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-full font-black text-sm transition-all hover:opacity-90 active:scale-95"
                    style={{ backgroundColor: "#f6ab78", color: "#252d3a" }}
                    data-testid="button-add-to-cart"
                  >
                    <ShoppingCart className="w-4 h-4" /> Add to Cart
                  </button>
                )}
                <a href="mailto:hello@tambebe.com"
                  className="flex-1 flex items-center justify-center py-3 px-5 rounded-full font-black text-sm border-2 transition-all hover:bg-muted text-center"
                  style={{ borderColor: "#65a6db", color: "#65a6db" }}
                  data-testid="button-inquire"
                >
                  Ask a Question
                </a>
              </div>

              {/* Specs — compact list */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 py-4 border-t border-b border-border">
                {([
                  ["Year", selectedVariant.year],
                  ["Weight", product.weight],
                  ["Fold", product.foldType],
                  ["Seat positions", product.seatPositions],
                  ["Max child weight", product.maxChildWeight],
                  ["Color", selectedVariant.color.split(" (")[0]],
                ] as [string, string][]).map(([label, value]) => (
                  <div key={label}>
                    <p className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-0.5">{label}</p>
                    <p className="text-xs font-bold text-foreground leading-snug">{value}</p>
                  </div>
                ))}
              </div>

              {/* Accordions */}
              <div className="space-y-2">
                <Accordion
                  title="Renewal checklist"
                  icon={<ShieldCheck className="w-4 h-4" style={{ color: "#65a6db" }} />}
                  count={product.renewalChecks.length}
                >
                  <ul className="space-y-2">
                    {product.renewalChecks.map((check) => (
                      <li key={check} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: "#65a6db" }} />
                        {check}
                      </li>
                    ))}
                  </ul>
                </Accordion>

                <Accordion
                  title="What's included"
                  icon={<Package className="w-4 h-4" style={{ color: "#f6ab78" }} />}
                  count={product.included.length}
                >
                  <ul className="space-y-1.5">
                    {product.included.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: "#f6ab78" }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Accordion>
              </div>

              {/* Highlights */}
              <div className="flex flex-wrap gap-2 pb-2">
                {product.highlights.map((h, i) => (
                  <span key={h} className="text-xs font-bold rounded-full px-3 py-1"
                    style={i % 2 === 0 ? { backgroundColor: "#65a6db12", color: "#3d7fb5" } : { backgroundColor: "#f6ab7818", color: "#b8712a" }}>
                    {h}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
