import { motion } from "framer-motion";
import { ShieldCheck, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/images/hero.png";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-white/70 md:bg-white/30 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10" />
        <img 
          src={heroImg} 
          alt="Modern stroller in a sunlit beautiful clean living room" 
          className="w-full h-full object-cover object-center md:object-right"
        />
      </div>

      <div className="container relative z-20 mx-auto px-4 md:px-6">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6 border border-primary/20">
              <ShieldCheck className="w-4 h-4" />
              <span>Certified Renewed Strollers</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-foreground leading-[1.1] mb-6">
              The safety of new.<br />
              <span className="text-primary italic font-serif">The wisdom of renewed.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed">
              Professionally steam-cleaned, mechanically tested, and certified second-hand premium travel systems. Rest easy, we've checked everything.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-base h-14 px-8 rounded-full shadow-md" data-testid="button-shop-strollers">
                Shop Strollers
              </Button>
              <Button size="lg" variant="outline" className="text-base h-14 px-8 rounded-full bg-white/50 backdrop-blur-sm hover:bg-white" data-testid="button-learn-more">
                Learn our Process
              </Button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-12 flex items-center gap-6"
          >
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-muted border-2 border-background flex items-center justify-center overflow-hidden">
                  <div className="w-full h-full bg-secondary/30" />
                </div>
              ))}
            </div>
            <div className="text-sm font-medium">
              <div className="flex text-primary mb-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-muted-foreground">Trusted by 500+ parents</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}