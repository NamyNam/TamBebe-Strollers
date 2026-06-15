import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { conditionMeta } from "@/data/products";
import type { Product } from "@/data/products";
import { useProductStore } from "@/contexts/ProductStore";

function getBestVariant(product: Product) {
  const inStock = product.variants.filter((v) => v.stock > 0);
  const pool = inStock.length > 0 ? inStock : product.variants;
  return pool.sort((a, b) => a.priceNum - b.priceNum)[0];
}

export function ProductGrid() {
  const { products } = useProductStore();
  const featured = products.slice(0, 3);

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div
              className="inline-block text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full mb-4"
              style={{ backgroundColor: "#f6ab7820", color: "#c47a3a" }}
            >
              Stokta Mevcut
            </div>
            <h2 className="text-3xl md:text-4xl font-black mb-3 text-foreground">Sertifikalı ve Kullanıma Hazır</h2>
            <p className="text-base text-muted-foreground font-medium max-w-xl">
              Her bebek arabası 24 noktalı güvenlik denetimimizden geçer. Premium markalar, çok daha uygun fiyata.
            </p>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-sm font-black transition-colors shrink-0"
            style={{ color: "#65a6db" }}
            data-testid="link-view-all"
          >
            Tüm stoğu gör
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {featured.map((product, index) => {
            const variant = getBestVariant(product);
            if (!variant) return null;
            const cm = conditionMeta[variant.condition];
            const oos = variant.stock === 0;

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={`/strollers/${product.slug}?v=${variant.id}`}
                  className="group rounded-2xl bg-white border-2 border-border overflow-hidden flex flex-col cursor-pointer transition-all hover:shadow-lg hover:border-transparent block"
                  data-testid={`card-product-${product.slug}`}
                >
                  <div className="relative bg-gray-50 aspect-[4/3] flex items-center justify-center overflow-hidden p-6">
                    <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                      <span
                        className="inline-flex items-center gap-1 text-xs font-black px-2.5 py-1 rounded-full"
                        style={{ backgroundColor: "#65a6db", color: "white" }}
                      >
                        <ShieldCheck className="w-3 h-3" /> Sertifikalı
                      </span>
                      <span
                        className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full"
                        style={{ backgroundColor: cm.bg, color: cm.color }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: cm.color }} />
                        {cm.label}
                      </span>
                    </div>
                    <img
                      src={variant.image}
                      alt={`${product.brand} ${product.model}`}
                      className={`w-full h-full object-contain transition-transform duration-500 group-hover:scale-105 ${oos ? "opacity-50 grayscale" : ""}`}
                      data-testid={`img-product-${product.slug}`}
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-1">{product.brand}</div>
                    <h3 className="text-xl font-black mb-3 text-foreground">{product.model}</h3>
                    <div className="mt-auto flex items-center justify-between">
                      <div>
                        <div
                          className="text-2xl font-black"
                          style={{ color: oos ? "#9ca3af" : "#f6ab78" }}
                          data-testid={`text-price-${product.slug}`}
                        >
                          {variant.price}
                        </div>
                        <div className="text-xs text-muted-foreground line-through font-semibold">Perakende {product.retailPrice}</div>
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
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-black text-sm text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#65a6db" }}
            data-testid="button-shop-all"
          >
            Tüm Arabalara Göz At
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
