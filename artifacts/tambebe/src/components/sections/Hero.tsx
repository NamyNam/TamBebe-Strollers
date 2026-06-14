import { motion } from "framer-motion";
import { ShieldCheck, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/images/hero.png";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white" style={{ minHeight: "88vh" }}>
      <div className="container mx-auto px-4 md:px-6 h-full">
        <div className="grid md:grid-cols-2 gap-8 items-center" style={{ minHeight: "88vh" }}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="py-12 md:py-20 flex flex-col"
          >
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full font-bold text-xs mb-6 self-start"
              style={{ backgroundColor: "#65a6db1a", color: "#65a6db", border: "1px solid #65a6db40" }}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Certified Renewed Strollers</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-[1.1] mb-4">
              Premium strollers.{" "}
              <span style={{ color: "#f6ab78" }}>Renewed</span>{" "}
              for your baby.
            </h1>

            <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-md leading-relaxed font-medium">
              Every stroller is steam-cleaned at 160°C, mechanically inspected, and certified — so you get a top brand at a fraction of the price.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                className="h-12 px-8 rounded-full font-bold text-base"
                style={{ backgroundColor: "#f6ab78", color: "#252d3a", borderColor: "#f6ab78" }}
                data-testid="button-shop-strollers"
                asChild
              >
                <a href="#shop">Shop Strollers</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-8 rounded-full font-bold text-base border-2"
                style={{ borderColor: "#65a6db", color: "#65a6db" }}
                data-testid="button-learn-more"
                asChild
              >
                <a href="#process">Learn our Process</a>
              </Button>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-10 flex flex-wrap items-center gap-6"
            >
              <div className="flex items-center gap-2.5">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-current" style={{ color: "#f6ab78" }} />
                  ))}
                </div>
                <span className="text-sm font-semibold text-foreground">500+ happy parents</span>
              </div>
              <div
                className="flex items-center gap-2 text-sm font-semibold px-3 py-1.5 rounded-full"
                style={{ backgroundColor: "#65a6db1a", color: "#65a6db" }}
              >
                <ShieldCheck className="w-4 h-4" />
                6-Month Warranty
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="relative hidden md:flex items-center justify-center"
            style={{ minHeight: "88vh" }}
          >
            <div
              className="absolute inset-0 rounded-[3rem]"
              style={{ backgroundColor: "#f6ab7820", margin: "2rem 0 2rem 2rem" }}
            />
            <div
              className="absolute top-8 right-8 w-32 h-32 rounded-full"
              style={{ backgroundColor: "#65a6db15" }}
            />
            <img
              src={heroImg}
              alt="Certified renewed baby stroller"
              className="relative z-10 w-full h-full object-cover object-center rounded-[3rem]"
              style={{ maxHeight: "80vh", margin: "2rem 0 2rem 2rem" }}
              data-testid="img-hero"
            />
            <div
              className="absolute bottom-16 left-4 z-20 bg-white rounded-2xl shadow-lg px-5 py-3 flex items-center gap-3 border border-border"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: "#65a6db" }}
              >
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground font-semibold">TamBebe Certified</div>
                <div className="text-sm font-black text-foreground">24-Point Inspection</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
