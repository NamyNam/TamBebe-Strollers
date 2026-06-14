import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, ShieldCheck, CheckCircle2, Package, ChevronRight } from "lucide-react";
import { getProductBySlug } from "@/data/products";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/Navbar";

const conditionStyle: Record<string, { bg: string; color: string }> = {
  "Like New":  { bg: "#65a6db20", color: "#3d7fb5" },
  "Excellent": { bg: "#f6ab7820", color: "#b8712a" },
  "Very Good": { bg: "#f6ab7820", color: "#b8712a" },
};

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-background">
        <p className="text-xl font-black text-foreground">Stroller not found.</p>
        <Link href="/shop" className="px-6 py-2.5 rounded-full text-sm font-black text-white" style={{ backgroundColor: "#65a6db" }}>
          Back to shop
        </Link>
      </div>
    );
  }

  const cs = conditionStyle[product.condition];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <div className="py-4" style={{ backgroundColor: "#65a6db10", borderBottom: "1px solid #65a6db20" }}>
        <div className="container mx-auto px-4 md:px-6 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-foreground transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-foreground font-bold">{product.brand} {product.model}</span>
        </div>
      </div>

      <main className="flex-1">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors mb-8"
            data-testid="link-back"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all strollers
          </Link>

          <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="sticky top-24 rounded-3xl bg-gray-50 border-2 border-border overflow-hidden aspect-square flex items-center justify-center p-10">
                <div className="absolute top-5 left-5 flex flex-col gap-2">
                  <span
                    className="inline-flex items-center gap-1.5 text-xs font-black rounded-full px-3 py-1 text-white"
                    style={{ backgroundColor: "#65a6db" }}
                  >
                    <ShieldCheck className="w-3.5 h-3.5" /> Certified
                  </span>
                  <span
                    className="inline-flex items-center text-xs font-black rounded-full px-3 py-1"
                    style={{ backgroundColor: cs.bg, color: cs.color }}
                  >
                    {product.condition}
                  </span>
                </div>
                <img
                  src={product.image}
                  alt={`${product.brand} ${product.model}`}
                  className="w-full h-full object-contain"
                  data-testid={`img-product-${product.slug}`}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col"
            >
              <div className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: "#65a6db" }}>
                {product.brand}
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2 text-foreground">
                {product.model}
              </h1>
              <div className="text-muted-foreground text-sm font-semibold mb-5">{product.year} · {product.color}</div>

              <div className="flex items-baseline gap-4 mb-6">
                <span
                  className="text-4xl font-black"
                  style={{ color: "#f6ab78" }}
                  data-testid="text-price"
                >
                  {product.price}
                </span>
                <span className="text-base text-muted-foreground line-through font-semibold">Retail {product.retailPrice}</span>
                <span
                  className="text-xs font-black px-3 py-1 rounded-full"
                  style={{ backgroundColor: "#65a6db20", color: "#3d7fb5" }}
                >
                  Certified Renewed
                </span>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-7 text-sm font-medium">
                {product.description}
              </p>

              <div className="grid grid-cols-2 gap-3 mb-7 text-sm">
                {[
                  ["Weight", product.weight],
                  ["Fold", product.foldType],
                  ["Seat positions", product.seatPositions],
                  ["Max child weight", product.maxChildWeight],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-xl bg-white border-2 border-border p-4">
                    <div className="text-xs text-muted-foreground mb-1 font-black uppercase tracking-wide">{label}</div>
                    <div className="font-black text-foreground text-sm">{value}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <a
                  href="#"
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-full font-black text-base transition-all hover:opacity-90"
                  style={{ backgroundColor: "#f6ab78", color: "#252d3a" }}
                  data-testid="button-inquire"
                >
                  Inquire about this stroller
                </a>
                <a
                  href="#"
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-full font-black text-base border-2 transition-all hover:bg-muted"
                  style={{ borderColor: "#65a6db", color: "#65a6db" }}
                  data-testid="button-reserve"
                >
                  Reserve for 48h
                </a>
              </div>

              <div className="space-y-5">
                <div className="bg-white rounded-2xl border-2 p-5" style={{ borderColor: "#65a6db40" }}>
                  <h3 className="flex items-center gap-2 font-black text-foreground mb-4 text-sm">
                    <ShieldCheck className="w-5 h-5" style={{ color: "#65a6db" }} />
                    Our 24-point renewal checklist
                  </h3>
                  <ul className="space-y-2">
                    {product.renewalChecks.map((check) => (
                      <li key={check} className="flex items-start gap-2.5 text-sm text-muted-foreground font-medium">
                        <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "#65a6db" }} />
                        {check}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-2xl border-2 p-5" style={{ borderColor: "#f6ab7840" }}>
                  <h3 className="flex items-center gap-2 font-black text-foreground mb-4 text-sm">
                    <Package className="w-5 h-5" style={{ color: "#f6ab78" }} />
                    What's included
                  </h3>
                  <ul className="space-y-2">
                    {product.included.map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-sm text-muted-foreground font-medium">
                        <ChevronRight className="w-4 h-4 shrink-0" style={{ color: "#f6ab78" }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-black text-foreground mb-3 text-sm">Highlights</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.highlights.map((h, i) => (
                      <span
                        key={h}
                        className="text-xs font-black rounded-full px-3 py-1.5"
                        style={
                          i % 2 === 0
                            ? { backgroundColor: "#65a6db15", color: "#3d7fb5" }
                            : { backgroundColor: "#f6ab7820", color: "#b8712a" }
                        }
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
