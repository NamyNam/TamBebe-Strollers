import { motion } from "framer-motion";
import { ShieldCheck, Star, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import heroImg from "@/assets/images/hero.png";
import { brand, fonts } from "@/lib/brand";
import { StampBadge } from "@/components/StampBadge";

export function Hero() {
  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: brand.paper }}>
      {/* faint ledger rule lines, workshop-paper texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage: `repeating-linear-gradient(to bottom, transparent 0 38px, ${brand.paperLine} 38px 39px)`,
        }}
      />
      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="grid md:grid-cols-2 gap-10 items-center py-14 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <div
              className="inline-flex items-center gap-2 pl-3 pr-4 py-1.5 mb-7"
              style={{
                color: brand.stamp,
                border: `1.5px solid ${brand.stamp}`,
                fontFamily: fonts.mono,
                fontSize: "11.5px",
                letterSpacing: "0.12em",
                fontWeight: 700,
              }}
            >
              MUAYENE NO. 0148 &middot; ONAYLI PARTİ
            </div>

            <h1
              className="leading-[1.04] mb-5"
              style={{
                fontFamily: fonts.display,
                fontWeight: 600,
                color: brand.ink,
                fontSize: "clamp(2.5rem, 5vw, 3.75rem)",
                letterSpacing: "-0.01em",
              }}
            >
              Her bebek arabası,{" "}
              <span style={{ fontStyle: "italic", color: brand.stamp }}>bir kez daha</span>{" "}
              teftiş edilir.
            </h1>

            <p
              className="mb-8 max-w-md leading-relaxed"
              style={{ fontFamily: fonts.body, color: brand.inkMuted, fontSize: "17px" }}
            >
              Ailelerden aldığımız her bebek arabası atölyemizden 24 maddelik bir muayeneden
              geçer, buharla temizlenir ve elle onarılır — ancak öyle bir sertifika ve garanti
              kazanır.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-9">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 px-7 transition-transform hover:-translate-y-0.5"
                style={{
                  backgroundColor: brand.stamp,
                  color: brand.paper,
                  fontFamily: fonts.body,
                  fontWeight: 700,
                  fontSize: "15px",
                  height: "50px",
                }}
                data-testid="button-shop-strollers"
              >
                Arabalara Göz At
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/process"
                className="inline-flex items-center justify-center gap-2 px-7 border-2 transition-colors hover:bg-black/[0.03]"
                style={{
                  borderColor: brand.navy,
                  color: brand.navy,
                  fontFamily: fonts.body,
                  fontWeight: 700,
                  fontSize: "15px",
                  height: "50px",
                }}
                data-testid="button-learn-more"
              >
                Muayene Sürecini Gör
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" style={{ color: brand.stamp }} />
                  ))}
                </div>
                <span
                  style={{ fontFamily: fonts.mono, fontSize: "12px", color: brand.ink, letterSpacing: "0.02em" }}
                >
                  500+ MUTLU AİLE
                </span>
              </div>
              <div className="w-px h-4" style={{ backgroundColor: brand.paperLine }} />
              <div className="flex items-center gap-1.5" style={{ color: brand.pine }}>
                <ShieldCheck className="w-4 h-4" />
                <span style={{ fontFamily: fonts.mono, fontSize: "12px", fontWeight: 700, letterSpacing: "0.02em" }}>
                  6 AYLIK GARANTİ
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="relative"
          >
            <div
              className="relative p-3 md:p-4"
              style={{ backgroundColor: "#fff", border: `1px solid ${brand.paperLine}`, boxShadow: "0 24px 48px -24px rgba(22,35,58,0.28)" }}
            >
              <img
                src={heroImg}
                alt="Sertifikalı yenilenmiş bebek arabası"
                className="w-full object-cover"
                style={{ aspectRatio: "4/5", filter: "saturate(0.96)" }}
                data-testid="img-hero"
              />
              {/* corner tag, like a stapled inventory ticket */}
              <div
                className="absolute -bottom-5 -left-5 bg-white px-4 py-3 flex items-center gap-3"
                style={{ border: `1px solid ${brand.paperLine}`, boxShadow: "0 8px 20px -8px rgba(22,35,58,0.25)" }}
              >
                <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: brand.pine }} />
                <div>
                  <div style={{ fontFamily: fonts.mono, fontSize: "10px", color: brand.inkMuted, letterSpacing: "0.05em" }}>
                    DURUM
                  </div>
                  <div style={{ fontFamily: fonts.body, fontWeight: 700, fontSize: "13px", color: brand.ink }}>
                    Sertifikalı &amp; Hazır
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -top-8 -right-6 md:-right-10 hidden sm:block">
              <StampBadge size={148} rotate={-11} tone="stamp" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
