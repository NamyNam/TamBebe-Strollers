import { motion } from "framer-motion";
import { brand, fonts } from "@/lib/brand";

const entries = [
  { code: "MD-01", value: "24 Nokta", sub: "her arabada kapsamlı denetim" },
  { code: "MD-02", value: "%99,9", sub: "160°C buharla bakteri arındırma" },
  { code: "MD-03", value: "6 Ay", sub: "mekanik parçalarda garanti" },
  { code: "MD-04", value: "2–4 Gün", sub: "kapınıza tam monte teslim" },
];

export function Trust() {
  return (
    <section style={{ backgroundColor: brand.navy }} className="py-3">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {entries.map((entry, i) => (
            <motion.div
              key={entry.code}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="flex items-center gap-3 py-5 px-4 md:px-6"
              style={{
                borderLeft: i % 2 === 1 || i > 0 ? `1px solid ${brand.navyLight}` : "none",
              }}
            >
              <span
                style={{
                  fontFamily: fonts.mono,
                  fontSize: "10px",
                  color: "#8FA0BA",
                  letterSpacing: "0.06em",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                }}
                className="hidden md:inline shrink-0"
              >
                {entry.code}
              </span>
              <div>
                <div
                  style={{ fontFamily: fonts.display, color: "#fff", fontWeight: 700 }}
                  className="text-xl md:text-2xl leading-tight"
                >
                  {entry.value}
                </div>
                <div
                  style={{ fontFamily: fonts.body, color: "#B7C3D6", fontSize: "12px" }}
                  className="leading-snug mt-0.5"
                >
                  {entry.sub}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
