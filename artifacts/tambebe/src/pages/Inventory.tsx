import { useState, useMemo } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ShieldCheck, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { products } from "@/data/products";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/Navbar";

type SortOption = "price-asc" | "price-desc" | "newest";
type ConditionFilter = "All" | "Like New" | "Excellent" | "Very Good";

const ALL_BRANDS = ["All", ...Array.from(new Set(products.map((p) => p.brand)))];
const CONDITIONS: ConditionFilter[] = ["All", "Like New", "Excellent", "Very Good"];

const conditionDot: Record<string, string> = {
  "Like New": "#65a6db",
  "Excellent": "#f6ab78",
  "Very Good": "#f6ab78",
};

const priceNum = (price: string) => parseInt(price.replace(/[^0-9]/g, ""), 10);

const sortLabels: Record<SortOption, string> = {
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
  "newest": "Newest First",
};

export default function Inventory() {
  const [brand, setBrand] = useState("All");
  const [condition, setCondition] = useState<ConditionFilter>("All");
  const [sort, setSort] = useState<SortOption>("newest");
  const [sortOpen, setSortOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = [...products];
    if (brand !== "All") list = list.filter((p) => p.brand === brand);
    if (condition !== "All") list = list.filter((p) => p.condition === condition);
    if (sort === "price-asc") list.sort((a, b) => priceNum(a.price) - priceNum(b.price));
    if (sort === "price-desc") list.sort((a, b) => priceNum(b.price) - priceNum(a.price));
    if (sort === "newest") list.sort((a, b) => parseInt(b.year) - parseInt(a.year));
    return list;
  }, [brand, condition, sort]);

  const activeFilters = (brand !== "All" ? 1 : 0) + (condition !== "All" ? 1 : 0);

  function clearAll() {
    setBrand("All");
    setCondition("All");
    setSort("newest");
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <div className="py-10 md:py-14" style={{ backgroundColor: "#65a6db" }}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center gap-2 text-white/70 text-sm font-semibold mb-3">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Shop All Strollers</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2">All Certified Strollers</h1>
          <p className="text-white/80 font-semibold text-base max-w-xl">
            Every stroller below has been steam-cleaned, mechanically tested, and certified by our team. What you see is exactly what you get.
          </p>
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 md:px-6 py-10">
        <div className="flex flex-col md:flex-row gap-8">

          <aside className="w-full md:w-60 shrink-0">
            <div className="md:sticky md:top-24">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-black text-foreground text-base">Filters</h2>
                {activeFilters > 0 && (
                  <button
                    onClick={clearAll}
                    className="text-xs font-bold flex items-center gap-1 transition-colors"
                    style={{ color: "#65a6db" }}
                    data-testid="button-clear-filters"
                  >
                    <X className="w-3 h-3" /> Clear all
                  </button>
                )}
              </div>

              <div className="hidden md:block space-y-6">
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-3">Brand</h3>
                  <div className="flex flex-col gap-1.5">
                    {ALL_BRANDS.map((b) => (
                      <button
                        key={b}
                        onClick={() => setBrand(b)}
                        className={`text-left text-sm font-bold px-3 py-2 rounded-xl transition-all ${brand === b ? "text-white" : "text-foreground hover:bg-muted"}`}
                        style={brand === b ? { backgroundColor: "#65a6db" } : {}}
                        data-testid={`filter-brand-${b}`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-3">Condition</h3>
                  <div className="flex flex-col gap-1.5">
                    {CONDITIONS.map((c) => (
                      <button
                        key={c}
                        onClick={() => setCondition(c)}
                        className={`text-left text-sm font-bold px-3 py-2 rounded-xl transition-all flex items-center gap-2 ${condition === c ? "text-white" : "text-foreground hover:bg-muted"}`}
                        style={condition === c ? { backgroundColor: "#f6ab78" } : {}}
                        data-testid={`filter-condition-${c}`}
                      >
                        {c !== "All" && (
                          <span
                            className="w-2 h-2 rounded-full inline-block shrink-0"
                            style={{ backgroundColor: condition === c ? "white" : conditionDot[c] }}
                          />
                        )}
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t border-border pt-5">
                  <div
                    className="flex items-center gap-2 text-xs font-black px-3 py-2 rounded-xl"
                    style={{ backgroundColor: "#65a6db10", color: "#3d7fb5" }}
                  >
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    All items are TamBebe certified
                  </div>
                </div>
              </div>

              <div className="md:hidden">
                <button
                  onClick={() => setFiltersOpen(!filtersOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 font-bold text-sm"
                  style={{ borderColor: "#65a6db", color: "#65a6db" }}
                  data-testid="button-toggle-filters"
                >
                  <span className="flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4" />
                    Filters {activeFilters > 0 && `(${activeFilters})`}
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${filtersOpen ? "rotate-180" : ""}`} />
                </button>

                {filtersOpen && (
                  <div className="mt-3 p-4 border border-border rounded-2xl bg-white space-y-5">
                    <div>
                      <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-2">Brand</h3>
                      <div className="flex flex-wrap gap-2">
                        {ALL_BRANDS.map((b) => (
                          <button
                            key={b}
                            onClick={() => setBrand(b)}
                            className={`text-xs font-black px-3 py-1.5 rounded-full transition-all`}
                            style={brand === b ? { backgroundColor: "#65a6db", color: "white" } : { backgroundColor: "#f3f4f6", color: "#252d3a" }}
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-2">Condition</h3>
                      <div className="flex flex-wrap gap-2">
                        {CONDITIONS.map((c) => (
                          <button
                            key={c}
                            onClick={() => setCondition(c)}
                            className={`text-xs font-black px-3 py-1.5 rounded-full transition-all`}
                            style={condition === c ? { backgroundColor: "#f6ab78", color: "#252d3a" } : { backgroundColor: "#f3f4f6", color: "#252d3a" }}
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <p className="text-sm font-bold text-muted-foreground">
                <span className="font-black text-foreground text-base">{filtered.length}</span>{" "}
                stroller{filtered.length !== 1 ? "s" : ""} available
              </p>

              <div className="relative">
                <button
                  onClick={() => setSortOpen(!sortOpen)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-border text-sm font-bold hover:border-foreground transition-colors"
                  data-testid="button-sort"
                >
                  {sortLabels[sort]}
                  <ChevronDown className={`w-4 h-4 transition-transform ${sortOpen ? "rotate-180" : ""}`} />
                </button>
                {sortOpen && (
                  <div className="absolute right-0 top-full mt-1.5 bg-white border border-border rounded-2xl shadow-lg overflow-hidden z-20 min-w-48">
                    {(Object.keys(sortLabels) as SortOption[]).map((key) => (
                      <button
                        key={key}
                        onClick={() => { setSort(key); setSortOpen(false); }}
                        className={`w-full text-left px-4 py-3 text-sm font-bold hover:bg-muted transition-colors ${sort === key ? "text-white" : "text-foreground"}`}
                        style={sort === key ? { backgroundColor: "#65a6db" } : {}}
                        data-testid={`sort-${key}`}
                      >
                        {sortLabels[key]}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {activeFilters > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {brand !== "All" && (
                  <span
                    className="inline-flex items-center gap-1.5 text-xs font-black px-3 py-1.5 rounded-full"
                    style={{ backgroundColor: "#65a6db20", color: "#3d7fb5" }}
                  >
                    Brand: {brand}
                    <button onClick={() => setBrand("All")} className="hover:opacity-70">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {condition !== "All" && (
                  <span
                    className="inline-flex items-center gap-1.5 text-xs font-black px-3 py-1.5 rounded-full"
                    style={{ backgroundColor: "#f6ab7820", color: "#b8712a" }}
                  >
                    Condition: {condition}
                    <button onClick={() => setCondition("All")} className="hover:opacity-70">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>
            )}

            <AnimatePresence mode="popLayout">
              {filtered.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-24 text-center"
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                    style={{ backgroundColor: "#65a6db15" }}
                  >
                    <ShieldCheck className="w-8 h-8" style={{ color: "#65a6db" }} />
                  </div>
                  <h3 className="text-xl font-black text-foreground mb-2">No strollers match</h3>
                  <p className="text-muted-foreground font-medium text-sm mb-6 max-w-xs">
                    Try removing some filters — our inventory updates weekly with new certified arrivals.
                  </p>
                  <button
                    onClick={clearAll}
                    className="px-6 py-2.5 rounded-full text-sm font-black text-white transition-opacity hover:opacity-90"
                    style={{ backgroundColor: "#65a6db" }}
                  >
                    Clear filters
                  </button>
                </motion.div>
              ) : (
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filtered.map((product, index) => (
                    <motion.div
                      key={product.slug}
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.35, delay: index * 0.05 }}
                    >
                      <Link
                        href={`/strollers/${product.slug}`}
                        className="group block rounded-2xl bg-white border-2 border-border overflow-hidden flex flex-col cursor-pointer transition-all hover:shadow-lg hover:border-transparent"
                        data-testid={`card-product-${product.slug}`}
                      >
                        <div className="relative bg-gray-50 aspect-[4/3] flex items-center justify-center overflow-hidden p-6">
                          <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                            <span
                              className="inline-flex items-center gap-1 text-xs font-black px-2.5 py-1 rounded-full text-white"
                              style={{ backgroundColor: "#65a6db" }}
                            >
                              <ShieldCheck className="w-3 h-3" /> Certified
                            </span>
                            <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full bg-white border border-border">
                              <span
                                className="w-1.5 h-1.5 rounded-full inline-block"
                                style={{ backgroundColor: conditionDot[product.condition] }}
                              />
                              {product.condition}
                            </span>
                          </div>
                          <img
                            src={product.image}
                            alt={`${product.brand} ${product.model}`}
                            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                            data-testid={`img-product-${product.slug}`}
                          />
                        </div>
                        <div className="p-5 flex flex-col flex-1">
                          <div className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-1">{product.brand}</div>
                          <h3 className="text-lg font-black mb-1 text-foreground">{product.model}</h3>
                          <div className="text-xs text-muted-foreground font-semibold mb-3">{product.year} · {product.color}</div>
                          <div className="mt-auto flex items-center justify-between">
                            <div>
                              <div className="text-2xl font-black" style={{ color: "#f6ab78" }} data-testid={`text-price-${product.slug}`}>
                                {product.price}
                              </div>
                              <div className="text-xs text-muted-foreground line-through font-semibold">Retail {product.retailPrice}</div>
                            </div>
                            <div
                              className="w-10 h-10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200"
                              style={{ backgroundColor: "#65a6db15", color: "#65a6db" }}
                            >
                              <ArrowRight className="w-5 h-5" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>

            {filtered.length > 0 && (
              <div
                className="mt-12 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
                style={{ backgroundColor: "#65a6db15" }}
              >
                <div>
                  <p className="font-black text-foreground text-base">Don't see what you need?</p>
                  <p className="text-sm text-muted-foreground font-medium">New strollers are added weekly. Get notified first.</p>
                </div>
                <a
                  href="#"
                  className="shrink-0 px-6 py-3 rounded-full font-black text-sm text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "#f6ab78", color: "#252d3a" }}
                  data-testid="button-notify-me"
                >
                  Notify Me
                </a>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
