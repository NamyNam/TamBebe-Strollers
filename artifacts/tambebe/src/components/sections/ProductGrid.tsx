import { Link } from "wouter";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { products } from "@/data/products";
import { motion } from "framer-motion";

export function ProductGrid() {
  const featured = products.slice(0, 3);

  return (
    <section className="py-16 md:py-20 bg-gray-50 border-b border-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-end justify-between mb-8 gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">In Stock Now</p>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">Certified &amp; Ready</h2>
          </div>
          <Link href="/shop" className="text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-1 shrink-0" data-testid="link-view-all">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {featured.map((product, index) => (
            <motion.div key={product.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.08 }}>
              <Link
                href={`/strollers/${product.slug}`}
                className="group bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col cursor-pointer transition-all hover:shadow-md hover:border-gray-300 block"
                data-testid={`card-product-${product.slug}`}
              >
                <div className="relative bg-gray-50 aspect-[4/3] flex items-center justify-center overflow-hidden p-6 border-b border-gray-100">
                  <span
                    className="absolute top-3 left-3 inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full text-white"
                    style={{ backgroundColor: "#65a6db" }}
                  >
                    <ShieldCheck className="w-3 h-3" /> Certified
                  </span>
                  <img
                    src={product.image}
                    alt={`${product.brand} ${product.model}`}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                    data-testid={`img-product-${product.slug}`}
                  />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">{product.brand}</p>
                  <h3 className="text-lg font-black text-gray-900 mb-4">{product.model}</h3>
                  <div className="mt-auto flex items-center justify-between">
                    <div>
                      <p className="text-xl font-black" style={{ color: "#f6ab78" }} data-testid={`text-price-${product.slug}`}>{product.price}</p>
                      <p className="text-xs text-gray-400 line-through font-medium">Retail {product.retailPrice}</p>
                    </div>
                    <span className="text-xs font-bold text-gray-400 group-hover:text-gray-700 transition-colors flex items-center gap-1">
                      View <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-lg font-bold text-sm text-white bg-gray-900 hover:bg-gray-800 transition-colors"
            data-testid="button-shop-all"
          >
            Browse All Strollers <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
