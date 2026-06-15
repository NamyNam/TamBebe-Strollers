const steps = [
  {
    num: "01",
    title: "Deep Steam Clean",
    description: "Fabrics removed, treated with organic detergents, steam-cleaned at 160 °C — 99.9% bacteria eliminated.",
  },
  {
    num: "02",
    title: "Mechanical Inspection",
    description: "Wheels, brakes, fold mechanism, and suspension tested. Worn parts replaced with OEM components.",
  },
  {
    num: "03",
    title: "TamBebe Certification",
    description: "Passes a 24-point checklist before earning our certification and a detailed condition report.",
  },
  {
    num: "04",
    title: "Delivered to You",
    description: "Fully assembled, 6-month warranty on all mechanical parts. Ready for your baby on day one.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-16 md:py-20 bg-white border-b border-gray-100" id="process">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Our Process</p>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900">How every stroller is renewed</h2>
        </div>

        <div className="grid md:grid-cols-4 gap-8 md:gap-6 relative">
          {/* Connector line on desktop */}
          <div className="hidden md:block absolute top-4 left-[12.5%] right-[12.5%] h-px bg-gray-200" />

          {steps.map((step) => (
            <div key={step.num} className="relative">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-white shrink-0 relative z-10"
                  style={{ backgroundColor: "#252d3a" }}
                >
                  {step.num}
                </span>
                <div className="h-px flex-1 bg-gray-200 md:hidden" />
              </div>
              <h3 className="text-sm font-black text-gray-900 mb-1.5">{step.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
