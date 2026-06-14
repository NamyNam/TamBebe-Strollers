import { motion } from "framer-motion";
import { Shield, Award, Clock } from "lucide-react";

export function Trust() {
  return (
    <section className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-primary-foreground/20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center pt-8 md:pt-0"
          >
            <Shield className="w-12 h-12 mb-4 text-primary-foreground/80" />
            <h3 className="text-xl font-medium mb-2">Safety First</h3>
            <p className="text-primary-foreground/80 text-sm">Every joint, brake, and harness is rigorously tested against safety standards.</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center pt-8 md:pt-0"
          >
            <Award className="w-12 h-12 mb-4 text-primary-foreground/80" />
            <h3 className="text-xl font-medium mb-2">Hospital-Grade Clean</h3>
            <p className="text-primary-foreground/80 text-sm">160°C steam extraction eliminates 99.9% of bacteria, allergens, and odors.</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center pt-8 md:pt-0"
          >
            <Clock className="w-12 h-12 mb-4 text-primary-foreground/80" />
            <h3 className="text-xl font-medium mb-2">6-Month Warranty</h3>
            <p className="text-primary-foreground/80 text-sm">We stand behind our mechanical inspections with a comprehensive guarantee.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}