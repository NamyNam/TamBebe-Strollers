import { motion } from "framer-motion";
import { Bell, ArrowRight } from "lucide-react";
import { brand, fonts } from "@/lib/brand";
import { TicketNotch } from "@/components/TicketNotch";

export function ContactCTA() {
  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: brand.navy }}>
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="max-w-2xl mx-auto"
          style={{ border: "1px solid #33465F" }}
        >
          <div className="px-8 md:px-12 pt-10 pb-8 text-center">
            <div
              className="inline-flex items-center gap-2 mb-6"
              style={{ color: "#8FA0BA", fontFamily: fonts.mono, fontSize: "11px", letterSpacing: "0.1em" }}
            >
              <Bell className="w-3.5 h-3.5" />
              BEKLEME LİSTESİ FİŞİ
            </div>
            <h2
              style={{ fontFamily: fonts.display, color: "#fff", fontWeight: 600 }}
              className="text-3xl md:text-4xl mb-4 leading-tight"
            >
              Belirli bir model mi arıyorsunuz?
            </h2>
            <p style={{ fontFamily: fonts.body, color: "#B7C3D6" }} className="text-base mb-8 max-w-md mx-auto leading-relaxed">
              Envanterimiz her hafta değişiyor. İhtiyacınızı bize bildirin; sertifikasyon
              tamamlanır tamamlanmaz — yayına girmeden önce — sizi haberdar edelim.
            </p>
          </div>

          <div className="px-8">
            <TicketNotch bg={brand.navy} lineColor="#33465F" />
          </div>

          <div className="px-8 md:px-12 pt-8 pb-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#"
              className="inline-flex items-center gap-2 px-7 py-3.5"
              style={{ backgroundColor: brand.stamp, color: "#fff", fontFamily: fonts.body, fontWeight: 700, fontSize: "14.5px" }}
              data-testid="button-get-notified"
            >
              Beni Haberdar Et
              <Bell className="w-4 h-4" />
            </a>
            <a
              href="#shop"
              className="inline-flex items-center gap-2 px-7 py-3.5 border"
              style={{ borderColor: "#4C5F79", color: "#fff", fontFamily: fonts.body, fontWeight: 700, fontSize: "14.5px" }}
              data-testid="button-browse-all"
            >
              Tüm Arabalara Göz At
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
