import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import stroller1 from "@/assets/images/stroller-1.png";
import stroller2 from "@/assets/images/stroller-2.png";
import stroller3 from "@/assets/images/stroller-3.png";

const products = [
  {
    id: 1,
    brand: "Bugaboo",
    model: "Fox 3",
    price: "€450",
    retailPrice: "€1,200",
    condition: "Like New",
    image: stroller1,
  },
  {
    id: 2,
    brand: "UPPAbaby",
    model: "Vista V2",
    price: "€480",
    retailPrice: "€1,100",
    condition: "Excellent",
    image: stroller2,
  },
  {
    id: 3,
    brand: "Nuna",
    model: "Mixx Next",
    price: "€380",
    retailPrice: "€850",
    condition: "Very Good",
    image: stroller3,
  }
];

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
          <a href="#" className="text-primary font-medium hover:underline inline-flex items-center gap-1">
            View all inventory
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
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
              className="group rounded-2xl bg-card border border-card-border overflow-hidden flex flex-col cursor-pointer transition-all hover:shadow-md"
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
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="text-sm text-muted-foreground font-medium mb-1">{product.brand}</div>
                <h3 className="text-xl font-semibold mb-4">{product.model}</h3>
                <div className="mt-auto flex items-center justify-between">
                  <div>
                    <div className="text-xl font-bold">{product.price}</div>
                    <div className="text-xs text-muted-foreground line-through">Retail {product.retailPrice}</div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-primary/5 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}