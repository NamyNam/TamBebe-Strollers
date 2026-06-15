import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is it safe to buy a second-hand stroller?",
    answer: "Absolutely. We remove the uncertainty by putting every stroller through a 24-point mechanical inspection. We check frame integrity, wheel bearings, suspension, and braking systems. Any worn parts are replaced with authentic brand parts.",
  },
  {
    question: "How do you clean the strollers?",
    answer: "Our cleaning process is intensive. We fully dismantle the fabrics and treat them with baby-safe, hypoallergenic detergents. Then we use 160°C steam extraction which sanitizes deep into the foam, killing 99.9% of bacteria and removing any stains or odors.",
  },
  {
    question: "What brands do you carry?",
    answer: "We specialize in premium travel systems built to last multiple lifetimes. Our inventory primarily consists of Bugaboo, UPPAbaby, Nuna, Cybex, and Babyzen.",
  },
  {
    question: "What if something breaks?",
    answer: "Every TamBebe certified stroller comes with a 6-month mechanical warranty. If a folding mechanism, brake, or wheel bearing fails under normal use, we will repair it or replace the part free of charge.",
  },
  {
    question: "Can I sell my old stroller to you?",
    answer: "Yes! If you have a premium brand stroller in good structural condition, we will buy it from you. We handle the pickup, cleaning, and resale.",
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
            FAQ
          </div>
          <h2 className="text-3xl md:text-4xl font-black mb-3 text-foreground">Common Questions</h2>
          <p className="text-base text-muted-foreground font-medium">
            Everything parents ask before buying their first TamBebe stroller.
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
