import { motion } from "framer-motion";
import { Bath, Wrench, CheckCircle2, Heart } from "lucide-react";

const steps = [
  {
    icon: Bath,
    num: "01",
    title: "Deep Steam Clean",
    description: "Every fabric is detached, treated with baby-safe organic detergents, and high-pressure steam cleaned at 160°C — eliminating 99.9% of bacteria.",
    accent: "#f6ab78",
  },
  {
    icon: Wrench,
    num: "02",
    title: "Mechanical Inspection",
    description: "Our technicians test wheels, brakes, folding mechanisms, and suspension. Worn bearings or faulty parts are replaced with original brand parts.",
    accent: "#65a6db",
  },
  {
    icon: CheckCircle2,
    num: "03",
    title: "TamBebe Certification",
    description: "Only when a stroller feels, moves, and smells perfect does it receive our 'Tam' certification and a detailed condition report.",
    accent: "#f6ab78",
  },
  {
    icon: Heart,
    num: "04",
    title: "Ready For Your Baby",
    description: "Delivered fully assembled to your door with a 6-month warranty on all mechanical parts. No surprises — ever.",
    accent: "#65a6db",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: "#f8f9fc" }} id="process">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div
            className="inline-block text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full mb-4"
            style={{ backgroundColor: "#65a6db1a", color: "#65a6db" }}
          >
            Our Process
          </div>
          <h2 className="text-3xl md:text-4xl font-black mb-4 text-foreground">The TamBebe Standard</h2>
          <p className="text-base text-muted-foreground font-medium leading-relaxed">
            We don't just wash strollers. We renew them. Our 4-step process ensures every stroller is as safe and clean as the day it left the factory.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative bg-white rounded-2xl p-6 border border-border shadow-sm"
              >
                <div
                  className="w-13 h-13 rounded-2xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: step.accent + "20", width: "52px", height: "52px" }}
                >
                  <Icon className="w-6 h-6" style={{ color: step.accent }} />
                </div>
                <div
                  className="absolute top-5 right-5 text-4xl font-black leading-none"
                  style={{ color: step.accent + "25" }}
                >
                  {step.num}
                </div>
                <h3 className="text-lg font-black mb-2 text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
