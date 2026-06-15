import { motion } from "framer-motion";
import { ShieldCheck, Truck, Star } from "lucide-react";
import { Link } from "wouter";
import heroImg from "@/assets/images/hero.png";

export function Hero() {
  return (
    <section className="bg-white border-b border-gray-100 overflow-hidden" style={{ height: "calc(100vh - 56px)", maxHeight: "760px", minHeight: "520px" }}>
      <div className="container mx-auto px-4 md:px-6 h-full">
        <div className="grid md:grid-cols-2 gap-0 h-full items-stretch">

          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col justify-center py-16 md:py-20 md:pr-12"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-5">
              Certified Renewed Strollers · Belgium
            </p>

            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-black tracking-tight text-gray-900 leading-[1.08] mb-5">
              Premium strollers.<br />
              <span style={{ color: "#f6ab78" }}>Half the price.</span>
            </h1>

            <p className="text-base text-gray-500 font-medium leading-relaxed mb-8 max-w-sm">
              Every stroller is steam-cleaned at 160 °C, mechanically inspected, and certified before it reaches your door.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center h-11 px-7 rounded-lg font-bold text-sm text-white bg-gray-900 hover:bg-gray-800 transition-colors"
                data-testid="button-shop-strollers"
              >
                Browse Inventory
              </Link>
              <Link
                href="/process"
                className="inline-flex items-center justify-center h-11 px-7 rounded-lg font-bold text-sm border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
                data-testid="button-learn-more"
              >
                How It Works
              </Link>
            </div>

            {/* Inline trust signals */}
            <div className="flex flex-wrap items-center gap-5 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <span className="flex">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-current" style={{ color: "#f6ab78" }} />)}
                </span>
                <span className="font-semibold text-gray-700">500+ sold</span>
              </span>
              <span className="text-gray-300">|</span>
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-gray-400" />
                6-month warranty
              </span>
              <span className="text-gray-300">|</span>
              <span className="flex items-center gap-1.5 font-medium">
                <Truck className="w-4 h-4 text-gray-400" />
                2–4 day delivery
              </span>
            </div>
          </motion.div>

          {/* Right: image */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="hidden md:block relative bg-gray-50 border-l border-gray-100"
          >
            <img
              src={heroImg}
              alt="Certified renewed baby stroller"
              className="absolute inset-0 w-full h-full object-cover object-center"
              data-testid="img-hero"
            />
            {/* Subtle overlay badge */}
            <div className="absolute bottom-8 left-8 bg-white border border-gray-200 shadow-md rounded-xl px-4 py-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: "#65a6db" }}>
                <ShieldCheck className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-wide">TamBebe Certified</p>
                <p className="text-sm font-black text-gray-900">24-Point Inspection</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
