import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { conditionMeta } from "@/data/products";
import type { Product } from "@/data/products";
import { useProductStore } from "@/contexts/ProductStore";
import { brand, fonts } from "@/lib/brand";

function getBestVariant(product: Product) {
  const inStock = product.variants.filter((v) => v.stock > 0);
  const pool = inStock.length > 0 ? inStock : product.variants;
  return pool.sort((a, b) => a.priceNum - b.priceNum)[0];
}

export function ProductGrid() {
  const { products } = useProductStore();
  const featured = products.slice(0, 3);

  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: brand.paper }}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div
              style={{ fontFamily: fonts.mono, color: brand.stamp, fontSize: "12px", letterSpacing: "0.12em", fontWeight: 700 }}
              className="mb-4"
            >
              ENVANTER &middot; STOKTA MEVCUT
            </div>
            <h2 style={{ fontFamily: fonts.display, color: brand.ink, fontWeight: 600 }} className="text-3xl md:text-[2.6rem] mb-3">
              Sertifikalı ve kullanıma hazır
            </h2>
            <p style={{ fontFamily: fonts.body, color: brand.inkMuted }} className="text-base max-w-xl">
              Her bebek arabası 24 noktalı güvenlik denetimimizden geçer. Premium markalar, çok daha uygun fiyata.
            </p>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 shrink-0"
            style={{ color: brand.navy, fontFamily: fonts.body, fontWeight: 700, fontSize: "14px" }}
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
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
              >
                <Link
                  href={`/strollers/${product.slug}?v=${variant.id}`}
                  className="group flex flex-col cursor-pointer bg-white transition-shadow hover:shadow-xl block"
                  style={{ border: `1px solid ${brand.paperLine}` }}
                  data-testid={`card-product-${product.slug}`}
                >
                  <div className="relative aspect-[4/3] flex items-center justify-center overflow-hidden p-6" style={{ backgroundColor: "#FBF8F0" }}>
                    <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
                      <span
                        className="inline-flex items-center gap-1 px-2 py-1"
                        style={{ backgroundColor: brand.navy, color: "white", fontFamily: fonts.mono, fontSize: "10px", fontWeight: 700, letterSpacing: "0.04em" }}
                      >
                        <ShieldCheck className="w-3 h-3" /> ONAYLI
                      </span>
                      <span
                        className="inline-flex items-center gap-1.5 px-2 py-1"
                        style={{ backgroundColor: cm.bg, color: cm.color, fontFamily: fonts.mono, fontSize: "10px", fontWeight: 700 }}
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

                  {/* perforated tear line between photo and tag info, like an inventory tag */}
                  <div className="relative h-px" style={{ backgroundColor: brand.paperLine }}>
                    <div className="absolute -left-1 -top-1.5 w-3 h-3 rounded-full" style={{ backgroundColor: brand.paper }} />
                    <div className="absolute -right-1 -top-1.5 w-3 h-3 rounded-full" style={{ backgroundColor: brand.paper }} />
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <div style={{ fontFamily: fonts.mono, color: brand.inkMuted, fontSize: "10.5px", letterSpacing: "0.08em" }} className="mb-1">
                      {product.brand.toUpperCase()}
                    </div>
                    <h3 style={{ fontFamily: fonts.display, color: brand.ink, fontWeight: 600 }} className="text-xl mb-3">
                      {product.model}
                    </h3>
                    <div className="mt-auto flex items-center justify-between">
                      <div>
                        <div
                          style={{ fontFamily: fonts.display, fontWeight: 700, color: oos ? "#9ca3af" : brand.stamp }}
                          className="text-2xl"
                          data-testid={`text-price-${product.slug}`}
                        >
                          {variant.price}
                        </div>
                        <div style={{ fontFamily: fonts.body, color: brand.inkMuted, fontSize: "12px" }} className="line-through">
                          Perakende {product.retailPrice}
                        </div>
                      </div>
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200"
                        style={{ border: `1.5px solid ${brand.navy}`, color: brand.navy }}
                      >
                        <ArrowRight className="w-4 h-4" />
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
            className="inline-flex items-center gap-2 px-8 py-3.5"
            style={{ backgroundColor: brand.navy, color: "white", fontFamily: fonts.body, fontWeight: 700, fontSize: "14px" }}
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
