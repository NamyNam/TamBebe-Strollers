import { motion } from "framer-motion";
import { Shield, Award, Clock, Truck } from "lucide-react";

const stats = [
  { icon: Shield, label: "Safety First", value: "24-Point", sub: "inspection on every stroller" },
  { icon: Award, label: "Hospital-Grade Clean", value: "99.9%", sub: "bacteria eliminated at 160°C" },
  { icon: Clock, label: "Warranty Included", value: "6 Months", sub: "mechanical guarantee" },
  { icon: Truck, label: "Fast Delivery", value: "2–4 Days", sub: "fully assembled to your door" },
];

export function Trust() {
  return (
    <section className="py-10 md:py-14" style={{ backgroundColor: "#65a6db" }}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x divide-white/25">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex flex-col items-center text-center px-4"
              >
                <Icon className="w-7 h-7 text-white/80 mb-2" />
                <div className="text-2xl md:text-3xl font-black text-white leading-tight">{stat.value}</div>
                <div className="text-white/80 text-xs font-semibold mt-1 leading-snug">{stat.sub}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
