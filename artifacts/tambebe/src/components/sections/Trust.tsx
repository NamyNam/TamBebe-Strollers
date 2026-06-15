import { Shield, Award, Clock, Truck } from "lucide-react";

const stats = [
  { icon: Shield,  value: "24-Point",   label: "Safety inspection on every stroller" },
  { icon: Award,   value: "99.9%",      label: "Bacteria eliminated at 160 °C" },
  { icon: Clock,   value: "6 Months",   label: "Mechanical warranty included" },
  { icon: Truck,   value: "2–4 Days",   label: "Delivered fully assembled" },
];

export function Trust() {
  return (
    <section className="border-b border-gray-200 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-gray-200">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex items-center gap-3 px-6 py-6 md:py-7">
              <Icon className="w-5 h-5 text-gray-400 shrink-0" />
              <div>
                <p className="text-base font-black text-gray-900 leading-none mb-0.5">{value}</p>
                <p className="text-xs text-gray-500 font-medium leading-snug">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
