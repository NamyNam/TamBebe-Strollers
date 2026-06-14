import { motion } from "framer-motion";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { products } from "@/data/products";

export function ProductGrid() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">Certified Ready</h2>
            <p className="text-lg text-muted-foreground max-w-xl">
              Each stroller passes our 24-point safety inspection. Choose premium quality without the premium price tag.
            </p>
          </div>
          <a href="#shop" className="text-primary font-medium hover:underline inline-flex items-center gap-1">
            View all inventory
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
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
                className="group rounded-2xl bg-card border border-card-border overflow-hidden flex flex-col cursor-pointer transition-all hover:shadow-md block"
                data-testid={`card-product-${product.slug}`}
              >
                <div className="relative aspect-[4/3] bg-white p-6 flex items-center justify-center overflow-hidden">
                  <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                    <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 border-0">
                      Certified
                    </Badge>
                    <Badge variant="outline" className="bg-white/80 backdrop-blur-sm">
                      {product.condition}
                    </Badge>
                  </div>
                  <img
                    src={product.image}
                    alt={`${product.brand} ${product.model}`}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                    data-testid={`img-product-${product.slug}`}
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="text-sm text-muted-foreground font-medium mb-1">{product.brand}</div>
                  <h3 className="text-xl font-semibold mb-4">{product.model}</h3>
                  <div className="mt-auto flex items-center justify-between">
                    <div>
                      <div className="text-xl font-bold" data-testid={`text-price-${product.slug}`}>{product.price}</div>
                      <div className="text-xs text-muted-foreground line-through">Retail {product.retailPrice}</div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-primary/5 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
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
