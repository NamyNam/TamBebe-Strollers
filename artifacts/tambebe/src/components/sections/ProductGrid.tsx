import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { products } from "@/data/products";

const conditionDot: Record<string, string> = {
  "Like New": "#65a6db",
  "Excellent": "#f6ab78",
  "Very Good": "#f6ab78",
};

export function ProductGrid() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div
              className="inline-block text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full mb-4"
              style={{ backgroundColor: "#f6ab7820", color: "#c47a3a" }}
            >
              In Stock Now
            </div>
            <h2 className="text-3xl md:text-4xl font-black mb-3 text-foreground">Certified & Ready to Go</h2>
            <p className="text-base text-muted-foreground font-medium max-w-xl">
              Each stroller passes our 24-point safety inspection. Premium brands, fraction of the price.
            </p>
          </div>
          <a
            href="#shop"
            className="inline-flex items-center gap-1.5 text-sm font-bold transition-colors"
            style={{ color: "#65a6db" }}
          >
            View all inventory
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={`/strollers/${product.slug}`}
                className="group rounded-2xl bg-white border-2 border-border overflow-hidden flex flex-col cursor-pointer transition-all hover:shadow-lg hover:border-transparent block"
                style={{ "--hover-shadow": "0 8px 30px rgba(101,166,219,0.15)" } as React.CSSProperties}
                data-testid={`card-product-${product.slug}`}
              >
                <div className="relative bg-gray-50 aspect-[4/3] flex items-center justify-center overflow-hidden p-6">
                  <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                    <span
                      className="inline-flex items-center gap-1 text-xs font-black px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: "#65a6db", color: "white" }}
                    >
                      <ShieldCheck className="w-3 h-3" /> Certified
                    </span>
                    <span
                      className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full bg-white border border-border"
                    >
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
                  <h3 className="text-xl font-black mb-3 text-foreground">{product.model}</h3>
                  <div className="mt-auto flex items-center justify-between">
                    <div>
                      <div
                        className="text-2xl font-black"
                        style={{ color: "#f6ab78" }}
                        data-testid={`text-price-${product.slug}`}
                      >
                        {product.price}
                      </div>
                      <div className="text-xs text-muted-foreground line-through font-semibold">Retail {product.retailPrice}</div>
                    </div>
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-colors group-hover:scale-110 duration-200"
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
      </div>
    </section>
  );
}
