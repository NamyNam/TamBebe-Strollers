import { useState, useEffect, useMemo } from "react";
import { useParams, useSearch, useLocation, Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, ShieldCheck, CheckCircle2, Package,
  ShoppingCart, Check, AlertTriangle, ChevronDown, ChevronLeft, ChevronRight,
} from "lucide-react";
import { conditionMeta, CONDITION_ORDER } from "@/data/products";
import type { Product, ProductVariant, ConditionGrade } from "@/data/products";
import { useProductStore } from "@/contexts/ProductStore";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/Navbar";
import { useCart } from "@/contexts/CartContext";

const stockLabel = (stock: number) => {
  if (stock === 0) return { text: "Stokta yok", color: "#ef4444" };
  if (stock === 1) return { text: "Son adet!", color: "#d97706" };
  return { text: `${stock} adet stokta`, color: "#059669" };
};

function getConditionSummaries(product: Product) {
  return CONDITION_ORDER.map((condition) => {
    const variants = product.variants.filter((v) => v.condition === condition);
    const inStock = variants.filter((v) => v.stock > 0);
    const lowestPrice = inStock.length
      ? Math.min(...inStock.map((v) => v.priceNum))
      : variants.length ? Math.min(...variants.map((v) => v.priceNum)) : 0;
    return { condition, hasStock: inStock.length > 0, lowestPrice, count: variants.length };
  }).filter(s => s.count > 0);
}

function getColorsForCondition(product: Product, condition: ConditionGrade) {
  const seen = new Set<string>();
  return product.variants
    .filter((v) => v.condition === condition)
    .filter((v) => { if (seen.has(v.color)) return false; seen.add(v.color); return true; })
    .map((v) => ({ color: v.color, colorHex: v.colorHex, stock: v.stock }));
}

function Accordion({ title, icon, count, children }: {
  title: string; icon: React.ReactNode; count?: number; children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-2xl overflow-hidden">
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors">
        <span className="flex items-center gap-2 text-sm font-black text-foreground">
          {icon}
          {title}
          {count !== undefined && <span className="text-xs font-bold text-muted-foreground">({count})</span>}
        </span>
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }} className="overflow-hidden">
            <div className="px-5 pb-4 border-t border-border pt-4">{children}</div>
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
  const { getProductBySlug } = useProductStore();

  const product = getProductBySlug(slug);
  const requestedVariantId = new URLSearchParams(search).get("v");

  function resolveInit(p: Product | undefined, variantId: string | null): { condition: ConditionGrade; color: string } {
    if (!p) return { condition: "Unopened", color: "" };
    const byId = variantId ? p.variants.find((v) => v.id === variantId) : null;
    const v = byId ?? p.variants.find((v) => v.stock > 0) ?? p.variants[0];
    return { condition: v.condition, color: v.color };
  }

  const init = useMemo(() => resolveInit(product, requestedVariantId), []);
  const [selectedCondition, setSelectedCondition] = useState<ConditionGrade>(init.condition);
  const [selectedColor, setSelectedColor] = useState(init.color);

  useEffect(() => {
    if (!product) return;
    const { condition, color } = resolveInit(product, requestedVariantId);
    setSelectedCondition(condition);
    setSelectedColor(color);
  }, [requestedVariantId]);

  const conditionSummaries = useMemo(() => product ? getConditionSummaries(product) : [], [product]);
  const colorsForCondition = useMemo(
    () => product ? getColorsForCondition(product, selectedCondition) : [],
    [product, selectedCondition]
  );
  const selectedVariant: ProductVariant | undefined = useMemo(
    () => product?.variants.find((v) => v.condition === selectedCondition && v.color === selectedColor),
    [product, selectedCondition, selectedColor]
  );

  function pickCondition(condition: ConditionGrade) {
    if (!product) return;
    const colors = getColorsForCondition(product, condition);
    const firstInStock = colors.find((c) => c.stock > 0) ?? colors[0];
    setSelectedCondition(condition);
    setSelectedColor(firstInStock?.color ?? "");
    const v = product.variants.find((v) => v.condition === condition && v.color === firstInStock?.color);
    if (v) navigate(`/strollers/${slug}?v=${v.id}`, { replace: true });
  }

  function pickColor(color: string) {
    if (!product) return;
    setSelectedColor(color);
    const v = product.variants.find((v) => v.condition === selectedCondition && v.color === color);
    if (v) navigate(`/strollers/${slug}?v=${v.id}`, { replace: true });
  }

  if (!product || !selectedVariant) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-xl font-black">Bebek arabası bulunamadı.</p>
        <Link href="/shop" className="px-6 py-2.5 rounded-full text-sm font-black text-white" style={{ backgroundColor: "#65a6db" }}>Mağazaya Dön</Link>
      </div>
    );
  }

  const cm = conditionMeta[selectedVariant.condition];
  const sl = stockLabel(selectedVariant.stock);
  const outOfStock = selectedVariant.stock === 0;
  const inCart = isInCart(selectedVariant.id);

  // Gallery: use variant's images array if available, else single image
  const galleryImages = useMemo(
    () => selectedVariant.images?.length ? selectedVariant.images : [selectedVariant.image],
    [selectedVariant]
  );
  const [activeIdx, setActiveIdx] = useState(0);
  useEffect(() => { setActiveIdx(0); }, [selectedVariant.id]);
  const canPrev = activeIdx > 0;
  const canNext = activeIdx < galleryImages.length - 1;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <nav className="py-3 border-b border-border bg-white">
        <div className="container mx-auto px-4 md:px-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/shop" className="inline-flex items-center gap-1.5 font-semibold hover:text-foreground transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Mağaza
          </Link>
          <span>/</span>
          <span className="font-bold text-foreground">{product.brand} {product.model}</span>
        </div>
      </nav>

      <main className="flex-1">
        <div className="container mx-auto px-4 md:px-6 py-6 md:py-10">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-14">
            {/* Ürün galerisi */}
            <div className="md:sticky md:top-20 space-y-3">
              {/* Ana resim */}
              <div className="rounded-3xl bg-gray-50 border border-border overflow-hidden aspect-square flex items-center justify-center p-8 relative">
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-xs font-black rounded-full px-2.5 py-1 text-white" style={{ backgroundColor: "#65a6db" }}>
                    <ShieldCheck className="w-3 h-3" /> Sertifikalı
                  </span>
                  <span className="text-xs font-black rounded-full px-2.5 py-1" style={{ backgroundColor: cm.bg, color: cm.color }}>
                    {cm.label}
                  </span>
                </div>

                {/* Önceki / sonraki okları — birden fazla resim varsa */}
                {galleryImages.length > 1 && (
                  <>
                    <button onClick={() => setActiveIdx(i => i - 1)} disabled={!canPrev}
                      className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center transition-all hover:shadow-md disabled:opacity-20 disabled:cursor-not-allowed">
                      <ChevronLeft className="w-4 h-4 text-foreground" />
                    </button>
                    <button onClick={() => setActiveIdx(i => i + 1)} disabled={!canNext}
                      className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center transition-all hover:shadow-md disabled:opacity-20 disabled:cursor-not-allowed">
                      <ChevronRight className="w-4 h-4 text-foreground" />
                    </button>
                    <span className="absolute bottom-4 right-4 z-10 text-[10px] font-black px-2 py-0.5 rounded-full bg-black/30 text-white">
                      {activeIdx + 1} / {galleryImages.length}
                    </span>
                  </>
                )}

                <AnimatePresence mode="wait">
                  <motion.img
                    key={`${selectedVariant.id}-${activeIdx}`}
                    src={galleryImages[activeIdx]}
                    alt={`${product.brand} ${product.model} — fotoğraf ${activeIdx + 1}`}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: outOfStock ? 0.4 : 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.2 }}
                    className={`w-full h-full object-contain ${outOfStock ? "grayscale" : ""}`}
                    data-testid="img-product"
                  />
                </AnimatePresence>
              </div>

              {/* Küçük thumbnail şeridi */}
              {galleryImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
                  {galleryImages.map((src, idx) => (
                    <button key={idx} onClick={() => setActiveIdx(idx)}
                      className={`shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${idx === activeIdx ? "border-[#65a6db] ring-2 ring-[#65a6db]/20" : "border-border hover:border-gray-400 opacity-60 hover:opacity-100"}`}>
                      <img src={src} alt="" className="w-full h-full object-contain bg-gray-50 p-1" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Detaylar */}
            <div className="flex flex-col gap-5">
              <div>
                <p className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: "#65a6db" }}>{product.brand}</p>
                <h1 className="text-3xl md:text-4xl font-black tracking-tight text-foreground mb-3">{product.model}</h1>
                <AnimatePresence mode="wait">
                  <motion.div key={selectedVariant.id + "-price"} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
                    className="flex items-baseline gap-3 flex-wrap">
                    <span className="text-3xl font-black" style={{ color: outOfStock ? "#9ca3af" : "#f6ab78" }} data-testid="text-price">
                      {selectedVariant.price}
                    </span>
                    <span className="text-sm text-muted-foreground line-through font-semibold">Perakende {product.retailPrice}</span>
                    <span className="text-xs font-bold" style={{ color: sl.color }}>· {sl.text}</span>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Durum seçici */}
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-muted-foreground block mb-2">Durum</span>
                <div className="flex flex-col gap-1.5">
                  {conditionSummaries.map(({ condition, hasStock, lowestPrice }) => {
                    const meta = conditionMeta[condition];
                    const isSelected = condition === selectedCondition;
                    return (
                      <button key={condition} onClick={() => pickCondition(condition)}
                        className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 border text-left transition-all ${isSelected ? "border-2 shadow-sm" : !hasStock ? "opacity-40 border" : "border hover:border-gray-400"}`}
                        style={{ borderColor: isSelected ? meta.color : undefined, backgroundColor: isSelected ? meta.bg : undefined }}
                        data-testid={`condition-${condition}`}>
                        <div className="flex items-center gap-2.5">
                          <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: meta.color }} />
                          <span className="text-sm font-black text-foreground">{meta.label}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 shrink-0" style={{ color: meta.color }} />}
                        </div>
                        <div className="flex items-center gap-1.5 ml-3 shrink-0">
                          {hasStock && <span className="text-xs text-muted-foreground font-medium">Başlangıç</span>}
                          <span className="text-sm font-black" style={{ color: hasStock ? "#f6ab78" : "#9ca3af" }}>€{lowestPrice}</span>
                          {!hasStock && <span className="text-xs font-semibold text-red-400">Yok</span>}
                        </div>
                      </button>
                    );
                  })}
                </div>
                <AnimatePresence mode="wait">
                  <motion.p key={selectedCondition + "-desc"} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
                    className="mt-2 text-xs text-muted-foreground font-medium pl-1">
                    <span className="font-bold" style={{ color: cm.color }}>{cm.label}:</span> {cm.description}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Renk seçici */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">Renk</span>
                  <AnimatePresence mode="wait">
                    <motion.span key={selectedColor} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-xs font-bold text-foreground">
                      {selectedColor.split(" (")[0].split(" / ")[0]}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <AnimatePresence mode="wait">
                  <motion.div key={selectedCondition + "-colors"} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}
                    className="flex gap-2.5 flex-wrap">
                    {colorsForCondition.map(({ color, colorHex, stock }) => {
                      const isSelected = color === selectedColor;
                      const oos = stock === 0;
                      return (
                        <button key={color} onClick={() => pickColor(color)} title={`${color}${oos ? " – Stokta yok" : ""}`}
                          className={`w-9 h-9 rounded-full border-2 transition-all ${isSelected ? "scale-110" : oos ? "opacity-30 cursor-not-allowed" : "opacity-60 hover:opacity-90"}`}
                          style={{ backgroundColor: colorHex, borderColor: isSelected ? "#252d3a" : "transparent", outline: isSelected ? `2px solid ${colorHex}` : "none", outlineOffset: "2px" }}
                          data-testid={`swatch-color-${color}`} />
                      );
                    })}
                  </motion.div>
                </AnimatePresence>
                {colorsForCondition.length > 0 && (
                  <p className="mt-2 text-xs text-muted-foreground font-medium pl-1">{selectedColor} · {selectedVariant.year}</p>
                )}
              </div>

              {/* Butonlar */}
              <div className="flex gap-3">
                {outOfStock ? (
                  <button disabled className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-full font-black text-sm bg-gray-100 text-gray-400 cursor-not-allowed" data-testid="button-out-of-stock">
                    <AlertTriangle className="w-4 h-4" /> Stokta Yok
                  </button>
                ) : inCart ? (
                  <button disabled className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-full font-black text-sm" style={{ backgroundColor: "#ecfdf5", color: "#059669" }} data-testid="button-in-cart">
                    <Check className="w-4 h-4" /> Sepette
                  </button>
                ) : (
                  <button onClick={() => addItem(product, selectedVariant)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-full font-black text-sm transition-all hover:opacity-90 active:scale-95"
                    style={{ backgroundColor: "#f6ab78", color: "#252d3a" }}
                    data-testid="button-add-to-cart">
                    <ShoppingCart className="w-4 h-4" /> Sepete Ekle
                  </button>
                )}
                <a href="mailto:hello@tambebe.com"
                  className="flex-1 flex items-center justify-center py-3 px-5 rounded-full font-black text-sm border-2 transition-all hover:bg-muted text-center"
                  style={{ borderColor: "#65a6db", color: "#65a6db" }}
                  data-testid="button-inquire">
                  Soru Sor
                </a>
              </div>

              {/* Özellikler */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 py-4 border-t border-b border-border">
                {([
                  ["Yıl", selectedVariant.year],
                  ["Ağırlık", product.weight],
                  ["Katlama", product.foldType],
                  ["Oturma pozisyonları", product.seatPositions],
                  ["Maks. çocuk ağırlığı", product.maxChildWeight],
                  ["Renk", selectedVariant.color.split(" (")[0]],
                ] as [string, string][]).map(([label, value]) => (
                  <div key={label}>
                    <p className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-0.5">{label}</p>
                    <p className="text-xs font-bold text-foreground leading-snug">{value}</p>
                  </div>
                ))}
              </div>

              {/* Akordeonlar */}
              <div className="space-y-2">
                {product.renewalChecks.length > 0 && (
                  <Accordion title="Yenileme kontrol listesi" icon={<ShieldCheck className="w-4 h-4" style={{ color: "#65a6db" }} />} count={product.renewalChecks.length}>
                    <ul className="space-y-2">
                      {product.renewalChecks.map((check) => (
                        <li key={check} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: "#65a6db" }} />
                          {check}
                        </li>
                      ))}
                    </ul>
                  </Accordion>
                )}
                {product.included.length > 0 && (
                  <Accordion title="Neler dahil" icon={<Package className="w-4 h-4" style={{ color: "#f6ab78" }} />} count={product.included.length}>
                    <ul className="space-y-1.5">
                      {product.included.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: "#f6ab78" }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Accordion>
                )}
              </div>

              {/* Öne çıkan özellikler */}
              {product.highlights.length > 0 && (
                <div className="flex flex-wrap gap-2 pb-2">
                  {product.highlights.map((h, i) => (
                    <span key={h} className="text-xs font-bold rounded-full px-3 py-1"
                      style={i % 2 === 0 ? { backgroundColor: "#65a6db12", color: "#3d7fb5" } : { backgroundColor: "#f6ab7818", color: "#b8712a" }}>
                      {h}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
