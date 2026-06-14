import { motion } from "framer-motion";
import { Bath, Wrench, CheckCircle2, Heart } from "lucide-react";

const steps = [
  {
    icon: Bath,
    title: "Deep Steam Clean",
    description: "Every fabric is detached, treated with baby-safe organic detergents, and high-pressure steam cleaned at 160°C to eliminate 99.9% of bacteria.",
  },
  {
    icon: Wrench,
    title: "Mechanical Inspection",
    description: "Our technicians test wheels, brakes, folding mechanisms, and suspension. Worn bearings or faulty parts are replaced with original parts.",
  },
  {
    icon: CheckCircle2,
    title: "TamBebe Certification",
    description: "Only when a stroller feels, moves, and smells perfect does it receive our 'Tam' certification and a detailed condition report.",
  },
  {
    icon: Heart,
    title: "Ready For Your Baby",
    description: "Delivered to your door fully assembled or carefully packed, with a 6-month warranty on all mechanical parts.",
  }
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-background" id="process">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">The TamBebe Standard</h2>
          <p className="text-lg text-muted-foreground">
            We don't just wash strollers. We renew them. Our rigorous 4-step process ensures your second-hand stroller is as safe and pristine as a new one.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative p-6 rounded-2xl bg-card border border-card-border shadow-sm"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-medium mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
                
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 right-0 translate-x-1/2 w-8 border-t-2 border-dashed border-muted" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}