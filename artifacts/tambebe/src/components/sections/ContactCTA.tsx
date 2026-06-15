import { motion } from "framer-motion";
import { Bell, ArrowRight } from "lucide-react";

export function ContactCTA() {
  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: "#65a6db" }}>
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 text-white text-xs font-black uppercase tracking-widest mb-6">
            <Bell className="w-3.5 h-3.5" />
            Don't Miss Out
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-5 leading-tight">
            Looking for a specific model?
          </h2>
          <p className="text-white/85 text-base md:text-lg font-semibold mb-10 max-w-xl mx-auto leading-relaxed">
            Our inventory changes weekly. Tell us what you need and we'll notify you the moment it passes our certification — before it goes live.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-black text-base transition-all hover:scale-105"
              style={{ backgroundColor: "#f6ab78", color: "#252d3a" }}
              data-testid="button-get-notified"
            >
              Get Notified
              <Bell className="w-4 h-4" />
            </a>
            <a
              href="#shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-black text-base border-2 border-white/60 text-white transition-all hover:bg-white/10"
              data-testid="button-browse-all"
            >
              Browse All Strollers
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
