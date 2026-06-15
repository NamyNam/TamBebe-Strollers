import { motion } from "framer-motion";
import { Shield, Award, Clock, Truck } from "lucide-react";

const stats = [
  { icon: Shield, label: "Önce Güvenlik", value: "24 Nokta", sub: "her arabada kapsamlı denetim" },
  { icon: Award, label: "Hastane Kalitesinde Temizlik", value: "%99,9", sub: "160°C'de bakteri yok edilir" },
  { icon: Clock, label: "Garanti Dahil", value: "6 Ay", sub: "mekanik güvence" },
  { icon: Truck, label: "Hızlı Teslimat", value: "2–4 Gün", sub: "kapınıza tam monte teslim" },
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
