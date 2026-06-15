import { ArrowRight, Mail } from "lucide-react";
import { Link } from "wouter";

export function ContactCTA() {
  return (
    <section className="py-14 md:py-16 bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="text-xl md:text-2xl font-black text-white mb-1">
              Have a stroller to sell?
            </h2>
            <p className="text-gray-400 text-sm font-medium">
              We buy premium strollers in good condition. Get a quote within 24 hours.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <a
              href="mailto:hello@tambebe.com"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold text-sm text-gray-900 bg-white hover:bg-gray-100 transition-colors"
              data-testid="button-sell"
            >
              <Mail className="w-4 h-4" />
              Get a Quote
            </a>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold text-sm text-white border border-gray-700 hover:border-gray-500 transition-colors"
              data-testid="button-browse-all"
            >
              Browse Inventory <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
