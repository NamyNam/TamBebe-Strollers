import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is it safe to buy a second-hand stroller?",
    answer: "Absolutely. We remove the uncertainty with a 24-point mechanical inspection covering frame integrity, wheel bearings, suspension, and brakes. Any worn parts are replaced with authentic brand parts before certification.",
  },
  {
    question: "How do you clean the strollers?",
    answer: "Fabrics are fully removed, treated with baby-safe hypoallergenic detergents, and steam-extracted at 160 °C — eliminating 99.9% of bacteria and removing all stains and odors.",
  },
  {
    question: "What brands do you carry?",
    answer: "We stock premium brands built to last: Bugaboo, UPPAbaby, Nuna, Cybex, and Babyzen. All selected for repairability and long-term safety.",
  },
  {
    question: "What if something breaks?",
    answer: "Every TamBebe stroller comes with a 6-month mechanical warranty. If a fold mechanism, brake, or wheel bearing fails under normal use, we repair or replace the part at no cost.",
  },
  {
    question: "Can I sell my stroller to you?",
    answer: "Yes. If you have a premium brand stroller in good structural condition, we'll buy it from you. We handle pickup, cleaning, and resale.",
  },
];

export function FAQ() {
  return (
    <section className="py-16 md:py-20 bg-white border-b border-gray-100" id="faq">
      <div className="container mx-auto px-4 md:px-6 max-w-2xl">
        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">FAQ</p>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900">Common questions</h2>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-b border-gray-100 last:border-0"
            >
              <AccordionTrigger className="text-left text-sm font-bold py-4 hover:no-underline text-gray-900 hover:text-gray-600">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-500 text-sm leading-relaxed pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
