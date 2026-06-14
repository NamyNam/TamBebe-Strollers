import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function ContactCTA() {
  return (
    <section className="py-24 bg-primary/10">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-5xl font-semibold mb-6">Looking for a specific model?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Our inventory changes weekly. Let us know what you're looking for and we'll notify you as soon as it passes our certification.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="rounded-full px-8 h-14 w-full sm:w-auto" data-testid="button-get-notified">
              Get Notified
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 h-14 bg-background w-full sm:w-auto" data-testid="button-browse-all">
              Browse All Strollers
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}