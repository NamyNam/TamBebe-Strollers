import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "İkinci el bebek arabası almak güvenli midir?",
    answer: "Kesinlikle. Her arabayı 24 noktalı mekanik denetimden geçirerek belirsizliği ortadan kaldırıyoruz. Çerçeve bütünlüğü, tekerlek rulmanları, süspansiyon ve fren sistemlerini kontrol ediyoruz. Aşınan parçalar orijinal marka parçalarıyla değiştirilir.",
  },
  {
    question: "Bebek arabalarını nasıl temizliyorsunuz?",
    answer: "Temizleme sürecimiz son derece kapsamlıdır. Kumaşları tamamen sökerek bebek dostu, hipoalerjenik deterjanlarla işleme tabi tutuyoruz. Ardından 160°C buhar ekstraksiyonu uyguluyoruz; bu yöntem köpüğün derinliklerine kadar ulaşarak bakterilerin %99,9'unu öldürür ve leke veya kokuları giderir.",
  },
  {
    question: "Hangi markaları satıyorsunuz?",
    answer: "Birden fazla kullanım ömrüne dayanacak şekilde üretilmiş premium seyahat sistemlerinde uzmanlaşıyoruz. Envanterimiz ağırlıklı olarak Bugaboo, UPPAbaby, Nuna, Cybex ve Babyzen markalarından oluşmaktadır.",
  },
  {
    question: "Bir şey bozulursa ne olur?",
    answer: "Her TamBebe sertifikalı bebek arabası 6 aylık mekanik garanti kapsamındadır. Normal kullanımda katlama mekanizması, fren veya tekerlek rulmanı arızalanırsa ücretsiz onarım veya parça değişimi yapıyoruz.",
  },
  {
    question: "Eski arabamı size satabilir miyim?",
    answer: "Evet! İyi yapısal durumda premium markalı bir arabanız varsa onu sizden satın alıyoruz. Teslim almayı, temizlemeyi ve yeniden satışı biz üstleniyoruz.",
  },
];

export function FAQ() {
  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: "#f8f9fc" }}>
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <div className="text-center mb-12">
          <div
            className="inline-block text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full mb-4"
            style={{ backgroundColor: "#65a6db1a", color: "#65a6db" }}
          >
            S.S.S.
          </div>
          <h2 className="text-3xl md:text-4xl font-black mb-3 text-foreground">Sık Sorulan Sorular</h2>
          <p className="text-base text-muted-foreground font-medium">
            Ebeveynlerin ilk TamBebe arabasını almadan önce sorduğu her şey.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Accordion type="single" collapsible className="w-full space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white border border-border rounded-2xl px-6 data-[state=open]:border-[#65a6db] transition-colors"
              >
                <AccordionTrigger className="text-left text-base font-black py-5 hover:no-underline hover:text-foreground">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5 font-medium">
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
