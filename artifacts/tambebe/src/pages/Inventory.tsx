import { useState, useMemo } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ShieldCheck, SlidersHorizontal, X, ChevronDown, Search } from "lucide-react";
import { conditionMeta } from "@/data/products";
import type { ConditionGrade } from "@/data/products";
import { useProductStore } from "@/contexts/ProductStore";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/Navbar";

type SortOption = "price-asc" | "price-desc" | "newest";

const ALL_CONDITIONS: ("Tümü" | ConditionGrade)[] = ["Tümü", "Unopened", "Open Box", "Barely Used", "Gently Used"];

const conditionTR: Record<string, string> = {
  "Tümü": "Tümü",
  "Unopened": "Açılmamış",
  "Open Box": "Açık Kutu",
  "Barely Used": "Neredeyse Hiç Kullanılmamış",
  "Gently Used": "Az Kullanılmış",
};

const sortLabels: Record<SortOption, string> = {
  "price-asc": "Fiyat: Düşükten Yükseğe",
  "price-desc": "Fiyat: Yüksekten Düşüğe",
  "newest": "En Yeni",
};

export default function Inventory() {
  const { products, getAllVariants } = useProductStore();

  const ALL_BRANDS = useMemo(
    () => ["Tümü", ...Array.from(new Set(products.map((p) => p.brand)))],
    [products]
  );

  const [brand, setBrand] = useState("Tümü");
  const [condition, setCondition] = useState<"Tümü" | ConditionGrade>("Tümü");
  const [sort, setSort] = useState<SortOption>("newest");
  const [sortOpen, setSortOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(true);
  const [search, setSearch] = useState("");

  const allVariants = useMemo(() => getAllVariants(), [getAllVariants]);

  // Step 1: filter variants by active filters
  const filteredVariants = useMemo(() => {
    let list = [...allVariants];
    if (brand !== "Tümü") list = list.filter((v) => v.product.brand === brand);
    if (condition !== "Tümü") list = list.filter((v) => v.condition === condition);
    if (inStockOnly) list = list.filter((v) => v.stock > 0);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((v) =>
        v.product.brand.toLowerCase().includes(q) ||
        v.product.model.toLowerCase().includes(q) ||
        v.color.toLowerCase().includes(q)
      );
    }
    return list;
  }, [allVariants, brand, condition, inStockOnly, search]);

  // Step 2: group by product slug → one entry per model
  type ProductGroup = {
    slug: string;
    product: (typeof allVariants)[0]["product"];
    variants: typeof allVariants;
    rep: (typeof allVariants)[0];       // representative variant for the card image
    minPrice: number;
    minPriceStr: string;
    inStockCount: number;
    colorHexes: string[];
  };

  const filteredProducts = useMemo((): ProductGroup[] => {
    const map = new Map<string, ProductGroup>();
    for (const v of filteredVariants) {
      const slug = v.product.slug;
      if (!map.has(slug)) {
        map.set(slug, {
          slug,
          product: v.product,
          variants: [],
          rep: v,
          minPrice: v.priceNum,
          minPriceStr: v.price,
          inStockCount: 0,
          colorHexes: [],
        });
      }
      const g = map.get(slug)!;
      g.variants.push(v);
      if (v.stock > 0) {
        g.inStockCount++;
        // prefer in-stock variant as representative
        if (g.rep.stock === 0) g.rep = v;
      }
      if (v.priceNum < g.minPrice) {
        g.minPrice = v.priceNum;
        g.minPriceStr = v.price;
      }
      if (!g.colorHexes.includes(v.colorHex)) g.colorHexes.push(v.colorHex);
    }

    const groups = Array.from(map.values());
    if (sort === "price-asc") groups.sort((a, b) => a.minPrice - b.minPrice);
    if (sort === "price-desc") groups.sort((a, b) => b.minPrice - a.minPrice);
    if (sort === "newest") groups.sort((a, b) =>
      Math.max(...b.variants.map(v => parseInt(v.year))) -
      Math.max(...a.variants.map(v => parseInt(v.year)))
    );
    return groups;
  }, [filteredVariants, sort]);

  const activeFilters =
    (brand !== "Tümü" ? 1 : 0) +
    (condition !== "Tümü" ? 1 : 0) +
    (inStockOnly ? 1 : 0) +
    (search.trim() ? 1 : 0);

  function clearAll() {
    setBrand("Tümü");
    setCondition("Tümü");
    setSort("newest");
    setInStockOnly(true);
    setSearch("");
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <div className="py-10 md:py-14" style={{ backgroundColor: "#65a6db" }}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center gap-2 text-white/70 text-sm font-semibold mb-3">
            <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
            <span>/</span>
            <span className="text-white">Tüm Arabalara Göz At</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2">Tüm Sertifikalı Bebek Arabaları</h1>
          <p className="text-white/80 font-semibold text-base max-w-xl">
            Her ilan buharla temizlenmiş, mekanik olarak test edilmiş ve sertifikalandırılmıştır.
          </p>
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 md:px-6 py-10">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-60 shrink-0">
            <div className="md:sticky md:top-24">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-black text-foreground text-base">Filtreler</h2>
                {activeFilters > 0 && (
                  <button onClick={clearAll} className="text-xs font-bold flex items-center gap-1" style={{ color: "#65a6db" }}>
                    <X className="w-3 h-3" /> Tümünü temizle
                  </button>
                )}
              </div>

              <div className="hidden md:block space-y-6">
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-3">Marka</h3>
                  <div className="flex flex-col gap-1.5">
                    {ALL_BRANDS.map((b) => (
                      <button key={b} onClick={() => setBrand(b)}
                        className={`text-left text-sm font-bold px-3 py-2 rounded-xl transition-all ${brand === b ? "text-white" : "text-foreground hover:bg-muted"}`}
                        style={brand === b ? { backgroundColor: "#65a6db" } : {}}>
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-3">Durum</h3>
                  <div className="flex flex-col gap-1.5">
                    {ALL_CONDITIONS.map((c) => {
                      const meta = c !== "Tümü" ? conditionMeta[c] : null;
                      const isActive = condition === c;
                      return (
                        <button key={c} onClick={() => setCondition(c)}
                          className="text-left text-sm font-bold px-3 py-2 rounded-xl transition-all flex items-center gap-2"
                          style={isActive && meta ? { backgroundColor: meta.color, color: "white" }
                            : isActive ? { backgroundColor: "#65a6db", color: "white" } : {}}>
                          {meta && <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: isActive ? "white" : meta.color }} />}
                          {conditionTR[c]}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-3">Stok Durumu</h3>
                  <label className="flex items-center gap-3 cursor-pointer px-3 py-2 rounded-xl hover:bg-muted transition-colors">
                    <div className={`w-10 h-6 rounded-full transition-all relative ${inStockOnly ? "bg-green-500" : "bg-gray-200"}`}
                      onClick={() => setInStockOnly(!inStockOnly)}>
                      <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${inStockOnly ? "left-5" : "left-1"}`} />
                    </div>
                    <span className="text-sm font-bold text-foreground">Yalnızca stokta olanlar</span>
                  </label>
                </div>

                <div className="border-t border-border pt-5">
                  <div className="flex items-center gap-2 text-xs font-black px-3 py-2 rounded-xl" style={{ backgroundColor: "#65a6db10", color: "#3d7fb5" }}>
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    Tüm ürünler TamBebe sertifikalı
                  </div>
                </div>
              </div>

              {/* Mobile filters */}
              <div className="md:hidden">
                <button onClick={() => setFiltersOpen(!filtersOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 font-bold text-sm"
                  style={{ borderColor: "#65a6db", color: "#65a6db" }}>
                  <span className="flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4" />
                    Filtreler {activeFilters > 0 && `(${activeFilters})`}
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${filtersOpen ? "rotate-180" : ""}`} />
                </button>
                {filtersOpen && (
                  <div className="mt-3 p-4 border border-border rounded-2xl bg-white space-y-5">
                    <div>
                      <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-2">Marka</h3>
                      <div className="flex flex-wrap gap-2">
                        {ALL_BRANDS.map((b) => (
                          <button key={b} onClick={() => setBrand(b)} className="text-xs font-black px-3 py-1.5 rounded-full transition-all"
                            style={brand === b ? { backgroundColor: "#65a6db", color: "white" } : { backgroundColor: "#f3f4f6" }}>
                            {b}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-2">Durum</h3>
                      <div className="flex flex-wrap gap-2">
                        {ALL_CONDITIONS.map((c) => (
                          <button key={c} onClick={() => setCondition(c)} className="text-xs font-black px-3 py-1.5 rounded-full transition-all"
                            style={condition === c ? { backgroundColor: "#f6ab78", color: "#252d3a" } : { backgroundColor: "#f3f4f6" }}>
                            {conditionTR[c]}
                          </button>
                        ))}
                      </div>
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={inStockOnly} onChange={e => setInStockOnly(e.target.checked)} className="rounded" />
                      <span className="text-sm font-bold">Yalnızca stokta olanlar</span>
                    </label>
                  </div>
                )}
              </div>
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between mb-6 gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type="text" value={search} placeholder="Marka, model veya renk ara..."
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border-2 border-border text-sm font-semibold bg-white focus:outline-none focus:border-[#65a6db] transition-colors"
                  onChange={e => setSearch(e.target.value)} />
              </div>
              <div className="relative">
                <button onClick={() => setSortOpen(!sortOpen)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-border text-sm font-bold hover:border-foreground transition-colors">
                  {sortLabels[sort]}
                  <ChevronDown className={`w-4 h-4 transition-transform ${sortOpen ? "rotate-180" : ""}`} />
                </button>
                {sortOpen && (
                  <div className="absolute right-0 top-full mt-1.5 bg-white border border-border rounded-2xl shadow-lg overflow-hidden z-20 min-w-52">
                    {(Object.keys(sortLabels) as SortOption[]).map((key) => (
                      <button key={key} onClick={() => { setSort(key); setSortOpen(false); }}
                        className={`w-full text-left px-4 py-3 text-sm font-bold hover:bg-muted transition-colors ${sort === key ? "text-white" : "text-foreground"}`}
                        style={sort === key ? { backgroundColor: "#65a6db" } : {}}>
                        {sortLabels[key]}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {activeFilters > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {brand !== "Tümü" && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-black px-3 py-1.5 rounded-full" style={{ backgroundColor: "#65a6db20", color: "#3d7fb5" }}>
                    Marka: {brand}<button onClick={() => setBrand("Tümü")}><X className="w-3 h-3 ml-1" /></button>
                  </span>
                )}
                {condition !== "Tümü" && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-black px-3 py-1.5 rounded-full" style={{ backgroundColor: "#f6ab7820", color: "#b8712a" }}>
                    Durum: {conditionTR[condition]}<button onClick={() => setCondition("Tümü")}><X className="w-3 h-3 ml-1" /></button>
                  </span>
                )}
                {inStockOnly && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-black px-3 py-1.5 rounded-full bg-green-100 text-green-700">
                    Yalnızca stokta<button onClick={() => setInStockOnly(false)}><X className="w-3 h-3 ml-1" /></button>
                  </span>
                )}
                {search.trim() && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-black px-3 py-1.5 rounded-full bg-gray-100 text-gray-700">
                    Arama: {search}<button onClick={() => setSearch("")}><X className="w-3 h-3 ml-1" /></button>
                  </span>
                )}
              </div>
            )}

            <AnimatePresence mode="popLayout">
              {filteredProducts.length === 0 ? (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-24 text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: "#65a6db15" }}>
                    <ShieldCheck className="w-8 h-8" style={{ color: "#65a6db" }} />
                  </div>
                  <h3 className="text-xl font-black text-foreground mb-2">Eşleşen ilan yok</h3>
                  <p className="text-muted-foreground font-medium text-sm mb-6 max-w-xs">
                    Filtrelerinizi ayarlamayı deneyin — her hafta yeni sertifikalı stok geliyor.
                  </p>
                  <button onClick={clearAll} className="px-6 py-2.5 rounded-full text-sm font-black text-white" style={{ backgroundColor: "#65a6db" }}>
                    Filtreleri temizle
                  </button>
                </motion.div>
              ) : (
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filteredProducts.map((g, index) => {
                    const hasStock = g.inStockCount > 0;
                    const totalVariants = g.variants.length;
                    return (
                      <motion.div key={g.slug} layout
                        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3, delay: index * 0.04 }}>
                        <Link href={`/strollers/${g.slug}`}
                          className={`group block rounded-2xl bg-white border-2 overflow-hidden flex flex-col cursor-pointer transition-all hover:shadow-lg ${!hasStock ? "border-gray-200 opacity-70" : "border-border hover:border-transparent"}`}>
                          <div className="relative bg-gray-50 aspect-[4/3] flex items-center justify-center overflow-hidden p-6">
                            <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
                              <span className="inline-flex items-center gap-1 text-xs font-black px-2.5 py-1 rounded-full text-white" style={{ backgroundColor: "#65a6db" }}>
                                <ShieldCheck className="w-3 h-3" /> Sertifikalı
                              </span>
                              {!hasStock && (
                                <span className="inline-flex items-center text-xs font-bold px-2.5 py-1 rounded-full bg-red-100 text-red-600">Stokta Yok</span>
                              )}
                            </div>
                            {/* Color swatches top-right */}
                            {g.colorHexes.length > 0 && (
                              <div className="absolute top-3 right-3 z-10 flex flex-col gap-1">
                                {g.colorHexes.slice(0, 4).map((hex) => (
                                  <span key={hex} className="w-4 h-4 rounded-full border-2 border-white shadow block" style={{ backgroundColor: hex }} />
                                ))}
                                {g.colorHexes.length > 4 && (
                                  <span className="text-[9px] font-black text-muted-foreground text-right">+{g.colorHexes.length - 4}</span>
                                )}
                              </div>
                            )}
                            <img src={g.rep.image} alt={`${g.product.brand} ${g.product.model}`}
                              className={`w-full h-full object-contain transition-all duration-500 group-hover:scale-105 ${!hasStock ? "grayscale opacity-60" : ""}`} />
                          </div>
                          <div className="p-4 flex flex-col flex-1">
                            <div className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-0.5">{g.product.brand}</div>
                            <h3 className="text-base font-black mb-1 text-foreground">{g.product.model}</h3>
                            <div className="text-xs text-muted-foreground font-semibold mb-3">
                              {totalVariants > 1 ? `${hasStock ? g.inStockCount : totalVariants} varyant mevcut` : "1 ilan"}
                            </div>
                            <div className="mt-auto flex items-center justify-between">
                              <div>
                                <div className="text-[11px] font-semibold text-muted-foreground -mb-0.5">'den başlayan</div>
                                <div className="text-xl font-black" style={{ color: !hasStock ? "#9ca3af" : "#f6ab78" }}>{g.minPriceStr}</div>
                                <div className="text-xs text-muted-foreground line-through font-semibold">Perakende {g.product.retailPrice}</div>
                              </div>
                              {hasStock && (
                                <div className="w-9 h-9 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform" style={{ backgroundColor: "#65a6db15", color: "#65a6db" }}>
                                  <ArrowRight className="w-4 h-4" />
                                </div>
                              )}
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </AnimatePresence>

            {filteredProducts.length > 0 && (
              <div className="mt-12 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ backgroundColor: "#65a6db15" }}>
                <div>
                  <p className="font-black text-foreground text-base">Aradığınızı bulamadınız mı?</p>
                  <p className="text-sm text-muted-foreground font-medium">Her hafta yeni stok gelir. İlk siz haberdar olun.</p>
                </div>
                <a href="#" className="shrink-0 px-6 py-3 rounded-full font-black text-sm transition-opacity hover:opacity-90" style={{ backgroundColor: "#f6ab78", color: "#252d3a" }}>
                  Beni Haberdar Et
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
