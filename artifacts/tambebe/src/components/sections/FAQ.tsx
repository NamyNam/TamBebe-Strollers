import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { brand, fonts } from "@/lib/brand";

const faqs = [
  {
    question: "İkinci el bebek arabası almak güvenli midir?",
    answer:
      "Kesinlikle. Her arabayı 24 noktalı mekanik denetimden geçirerek belirsizliği ortadan kaldırıyoruz. Çerçeve bütünlüğü, tekerlek rulmanları, süspansiyon ve fren sistemlerini kontrol ediyoruz. Aşınan parçalar orijinal marka parçalarıyla değiştirilir.",
  },
  {
    question: "Bebek arabalarını nasıl temizliyorsunuz?",
    answer:
      "Temizleme sürecimiz son derece kapsamlıdır. Kumaşları tamamen sökerek bebek dostu, hipoalerjenik deterjanlarla işleme tabi tutuyoruz. Ardından 160°C buhar ekstraksiyonu uyguluyoruz; bu yöntem köpüğün derinliklerine kadar ulaşarak bakterilerin %99,9'unu öldürür ve leke veya kokuları giderir.",
  },
  {
    question: "Hangi markaları satıyorsunuz?",
    answer:
      "Birden fazla kullanım ömrüne dayanacak şekilde üretilmiş premium seyahat sistemlerinde uzmanlaşıyoruz. Envanterimiz ağırlıklı olarak Bugaboo, UPPAbaby, Nuna, Cybex ve Babyzen markalarından oluşmaktadır.",
  },
  {
    question: "Bir şey bozulursa ne olur?",
    answer:
      "Her TamBebe sertifikalı bebek arabası 6 aylık mekanik garanti kapsamındadır. Normal kullanımda katlama mekanizması, fren veya tekerlek rulmanı arızalanırsa ücretsiz onarım veya parça değişimi yapıyoruz.",
  },
  {
    question: "Eski arabamı size satabilir miyim?",
    answer:
      "Evet! İyi yapısal durumda premium markalı bir arabanız varsa onu sizden satın alıyoruz. Teslim almayı, temizlemeyi ve yeniden satışı biz üstleniyoruz.",
  },
];

export function FAQ() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <div className="text-center mb-12">
          <div
            style={{ fontFamily: fonts.mono, color: brand.stamp, fontSize: "12px", letterSpacing: "0.12em", fontWeight: 700 }}
            className="mb-4"
          >
            KAYIT DEFTERİ &middot; S.S.S.
          </div>
          <h2 style={{ fontFamily: fonts.display, color: brand.ink, fontWeight: 600 }} className="text-3xl md:text-[2.6rem] mb-3">
            Sık Sorulan Sorular
          </h2>
          <p style={{ fontFamily: fonts.body, color: brand.inkMuted }} className="text-base">
            Ebeveynlerin ilk TamBebe arabasını almadan önce sorduğu her şey.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="px-1 md:px-2"
                style={{
                  borderTop: index === 0 ? `1px solid ${brand.paperLine}` : "none",
                  borderBottom: `1px solid ${brand.paperLine}`,
                }}
              >
                <AccordionTrigger className="text-left py-5 hover:no-underline gap-4" style={{ fontFamily: fonts.body, color: brand.ink, fontWeight: 700, fontSize: "15.5px" }}>
                  <span className="flex items-center gap-3">
                    <span style={{ fontFamily: fonts.mono, color: brand.stamp, fontSize: "12px" }}>{String(index + 1).padStart(2, "0")}</span>
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent style={{ fontFamily: fonts.body, color: brand.inkMuted, fontSize: "14.5px" }} className="leading-relaxed pb-5 pl-8">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
