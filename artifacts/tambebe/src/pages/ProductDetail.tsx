import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, ShieldCheck, CheckCircle2, Package, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getProductBySlug } from "@/data/products";
import { Footer } from "@/components/sections/Footer";

const conditionColor: Record<string, string> = {
  "Like New": "bg-primary/10 text-primary border-primary/20",
  "Excellent": "bg-secondary/10 text-secondary border-secondary/20",
  "Very Good": "bg-primary/10 text-primary border-primary/20",
};

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-background">
        <p className="text-xl font-semibold text-foreground">Stroller not found.</p>
        <Link href="/">
          <Button variant="outline">Back to home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-serif font-bold text-foreground tracking-tight">
            TamBebe.
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <a href="/#process" className="text-sm font-medium hover:text-primary transition-colors">The Process</a>
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">Shop</Link>
            <a href="/#faq" className="text-sm font-medium hover:text-primary transition-colors">FAQ</a>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            data-testid="link-back"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all strollers
          </Link>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="sticky top-28 rounded-3xl bg-white border border-card-border overflow-hidden aspect-square flex items-center justify-center p-10">
                <div className="absolute top-5 left-5 flex flex-col gap-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-primary/10 text-primary border border-primary/20 rounded-full px-3 py-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Certified
                  </span>
                  <span className={`inline-flex items-center text-xs font-semibold border rounded-full px-3 py-1 ${conditionColor[product.condition]}`}>
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
              <div className="text-sm font-semibold text-primary uppercase tracking-widest mb-2">
                {product.brand}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">
                {product.model}
              </h1>
              <div className="text-muted-foreground text-sm mb-6">{product.year} · {product.color}</div>

              <div className="flex items-baseline gap-4 mb-8">
                <span className="text-4xl font-bold text-foreground" data-testid="text-price">{product.price}</span>
                <span className="text-lg text-muted-foreground line-through">Retail {product.retailPrice}</span>
                <Badge className="bg-primary/10 text-primary border-0 text-sm font-semibold">
                  Certified Renewed
                </Badge>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-8 text-base">
                {product.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
                {[
                  ["Weight", product.weight],
                  ["Fold", product.foldType],
                  ["Seat positions", product.seatPositions],
                  ["Max child weight", product.maxChildWeight],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-xl bg-muted/40 border border-border p-4">
                    <div className="text-xs text-muted-foreground mb-1 font-medium uppercase tracking-wide">{label}</div>
                    <div className="font-semibold text-foreground">{value}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <Button
                  size="lg"
                  className="flex-1 rounded-full text-base font-semibold"
                  data-testid="button-inquire"
                >
                  Inquire about this stroller
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="flex-1 rounded-full text-base"
                  data-testid="button-reserve"
                >
                  Reserve for 48h
                </Button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="flex items-center gap-2 font-semibold text-foreground mb-4">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    Our 24-point renewal checklist
                  </h3>
                  <ul className="space-y-2.5">
                    {product.renewalChecks.map((check) => (
                      <li key={check} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        {check}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-border pt-6">
                  <h3 className="flex items-center gap-2 font-semibold text-foreground mb-4">
                    <Package className="w-5 h-5 text-primary" />
                    What's included
                  </h3>
                  <ul className="space-y-2.5">
                    {product.included.map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                        <ChevronRight className="w-4 h-4 text-primary shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-border pt-6">
                  <h3 className="font-semibold text-foreground mb-4">Highlights</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.highlights.map((h) => (
                      <span
                        key={h}
                        className="text-xs font-medium bg-primary/8 text-primary border border-primary/20 rounded-full px-3 py-1.5"
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
