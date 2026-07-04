import { motion } from "framer-motion";
import { Bath, Wrench, ClipboardCheck, Truck, Check } from "lucide-react";
import { brand, fonts } from "@/lib/brand";

const steps = [
  {
    icon: Bath,
    num: "01",
    title: "Derin Buhar Temizliği",
    description:
      "Tüm kumaşlar sökülür, bebek dostu organik deterjanlarla işlenir ve 160°C'de yüksek basınçlı buharla temizlenir — bakterilerin %99,9'u yok edilir.",
  },
  {
    icon: Wrench,
    num: "02",
    title: "Mekanik İnceleme",
    description:
      "Teknisyenlerimiz tekerlekleri, frenleri, katlama mekanizmasını ve süspansiyonu test eder. Aşınan parçalar orijinal marka parçalarıyla değiştirilir.",
  },
  {
    icon: ClipboardCheck,
    num: "03",
    title: "TamBebe Sertifikasyonu",
    description:
      "Bir bebek arabası mükemmel hissettirip hareket ettiğinde, ancak o zaman 'Tam' sertifikamızı ve ayrıntılı durum raporunu alır.",
  },
  {
    icon: Truck,
    num: "04",
    title: "Bebeğinize Hazır",
    description:
      "6 aylık mekanik garantiyle, kapınıza tam monte olarak teslim edilir. Hiçbir sürpriz olmaz — asla.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 md:py-28 bg-white" id="process">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <div className="mb-14">
          <div
            style={{ fontFamily: fonts.mono, color: brand.stamp, fontSize: "12px", letterSpacing: "0.12em", fontWeight: 700 }}
            className="mb-4"
          >
            MUAYENE FİŞİ &middot; SÜRECİMİZ
          </div>
          <h2
            style={{ fontFamily: fonts.display, color: brand.ink, fontWeight: 600 }}
            className="text-3xl md:text-[2.6rem] leading-tight mb-4"
          >
            TamBebe Standardı
          </h2>
          <p style={{ fontFamily: fonts.body, color: brand.inkMuted }} className="text-base leading-relaxed max-w-lg">
            Biz sadece bebek arabalarını yıkamıyoruz, onları yeniliyoruz. Her araba bu dört
            imzalı adımdan geçmeden raflarımıza çıkmaz.
          </p>
        </div>

        <div style={{ borderTop: `1px solid ${brand.paperLine}` }}>
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="flex gap-5 md:gap-8 py-7"
                style={{ borderBottom: `1px solid ${brand.paperLine}` }}
              >
                <div className="flex flex-col items-center shrink-0 pt-0.5">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center"
                    style={{ border: `2px solid ${brand.pine}`, color: brand.pine }}
                  >
                    <Check className="w-4 h-4" strokeWidth={3} />
                  </div>
                  <span
                    style={{ fontFamily: fonts.mono, color: brand.inkMuted, fontSize: "10px" }}
                    className="mt-2"
                  >
                    {step.num}/04
                  </span>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <Icon className="w-4 h-4 shrink-0" style={{ color: brand.stamp }} />
                    <h3 style={{ fontFamily: fonts.display, color: brand.ink, fontWeight: 600 }} className="text-lg md:text-xl">
                      {step.title}
                    </h3>
                  </div>
                  <p style={{ fontFamily: fonts.body, color: brand.inkMuted, fontSize: "14.5px" }} className="leading-relaxed max-w-xl">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
