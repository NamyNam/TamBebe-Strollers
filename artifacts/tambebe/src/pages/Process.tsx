import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  Bath, Wrench, CheckCircle2, Heart, ShieldCheck,
  Thermometer, Droplets, Wind, Microscope,
  Gauge, RotateCcw, Lock, AlertTriangle,
  Star, ArrowRight, ClipboardCheck, PackageCheck,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/sections/Footer";

const steps = [
  {
    num: "01",
    icon: Bath,
    accent: "#f6ab78",
    title: "Deep Steam Clean",
    tagline: "Hospital-grade sanitation. No shortcuts.",
    description:
      "We start by fully dismantling every stroller — fabrics, harnesses, canopy, seat pads, and carrycot are all removed. Each fabric piece is pre-treated with baby-safe, hypoallergenic enzymatic detergents that break down oils, proteins, and allergens before the steam even touches it.",
    details: [
      {
        icon: Thermometer,
        label: "160°C steam extraction",
        text: "High-pressure steam penetrates deep into foam and seams, killing 99.9% of bacteria, mold spores, dust mites, and allergens.",
      },
      {
        icon: Droplets,
        label: "Baby-safe detergents only",
        text: "No bleach, no harsh solvents. Every chemical we use is certified baby-safe and fragrance-free.",
      },
      {
        icon: Wind,
        label: "Controlled drying",
        text: "Fabrics are dried in a clean, temperature-controlled environment — no residual moisture that could breed mold.",
      },
      {
        icon: Microscope,
        label: "Odor elimination",
        text: "We check for and treat any lingering odors after cleaning. If it doesn't smell neutral, it doesn't pass.",
      },
    ],
  },
  {
    num: "02",
    icon: Wrench,
    accent: "#65a6db",
    title: "Mechanical Inspection",
    tagline: "Every joint. Every bearing. Every click.",
    description:
      "Once clean, our trained technicians go through the entire mechanical system. This is the most critical step. A stroller that looks perfect but has a faulty brake or a worn wheel bearing is a safety risk — and we treat it as one.",
    details: [
      {
        icon: Gauge,
        label: "Wheel & bearing test",
        text: "Each wheel is spun, checked for wobble, and tested for smooth rotation. Worn bearings are replaced with original-spec parts.",
      },
      {
        icon: Lock,
        label: "Brake system check",
        text: "We test full-lock, partial-lock, and release across all brake positions. Springs are inspected for tension and fatigue.",
      },
      {
        icon: RotateCcw,
        label: "Fold mechanism",
        text: "The fold-and-unfold cycle is performed 20+ times to confirm the latch is crisp, the auto-lock engages, and no play has developed.",
      },
      {
        icon: AlertTriangle,
        label: "Harness & buckles",
        text: "Every slot of the 5-point harness is tested independently. Buckles must click, hold under load, and release cleanly.",
      },
    ],
  },
  {
    num: "03",
    icon: CheckCircle2,
    accent: "#f6ab78",
    title: "TamBebe Certification",
    tagline: "Only the best get the stamp.",
    description:
      "After cleaning and mechanical inspection, a senior technician performs a final walkthrough. This isn't a checklist formality — it's a judgment call. If anything feels off, the stroller goes back for repair or is rejected entirely. We'd rather lose the margin than pass a stroller we wouldn't put our own child in.",
    details: [
      {
        icon: ClipboardCheck,
        label: "24-point checklist",
        text: "A documented inspection covering every mechanical, cosmetic, and safety element. The report travels with the stroller.",
      },
      {
        icon: ShieldCheck,
        label: "Condition grading",
        text: "We grade honestly: Like New, Excellent, or Very Good. Cosmetic flaws are photographed and disclosed — nothing is hidden.",
      },
      {
        icon: Star,
        label: "Smell & feel test",
        text: "If it doesn't smell completely fresh and feel structurally solid in our hands, it doesn't pass. Full stop.",
      },
      {
        icon: AlertTriangle,
        label: "Rejection threshold",
        text: "Strollers with structural damage, deep frame cracks, or non-sourced replacement parts are rejected and not sold.",
      },
    ],
  },
  {
    num: "04",
    icon: Heart,
    accent: "#65a6db",
    title: "Ready for Your Baby",
    tagline: "Delivered right. Guaranteed.",
    description:
      "Once certified, the stroller is reassembled, photographed in its final condition, and packed carefully for delivery. You receive a copy of the inspection report, the condition grade, and a 6-month mechanical warranty. If something fails under normal use, we fix it — no arguments.",
    details: [
      {
        icon: PackageCheck,
        label: "Fully reassembled",
        text: "Delivered ready to use — seat attached, canopy fitted, and all accessories packed. Not in pieces that you need to figure out.",
      },
      {
        icon: ClipboardCheck,
        label: "Inspection report included",
        text: "You receive the full written 24-point inspection report for your records. Transparency is part of what you're buying.",
      },
      {
        icon: ShieldCheck,
        label: "6-month mechanical warranty",
        text: "Any mechanical failure under normal use within 6 months — we repair or replace the part. No quibbling.",
      },
      {
        icon: Heart,
        label: "Post-sale support",
        text: "Questions after delivery? Our team is reachable and we'll walk you through any setup or adjustment you need.",
      },
    ],
  },
];

const standards = [
  { value: "99.9%", label: "Bacteria eliminated", sub: "by 160°C steam" },
  { value: "24", label: "Point inspection", sub: "on every stroller" },
  { value: "20×", label: "Fold cycles tested", sub: "per stroller" },
  { value: "0", label: "Hidden defects", sub: "everything disclosed" },
];

const acceptReject = [
  { accept: true, text: "Frame is structurally sound with no cracks or bends" },
  { accept: true, text: "All wheels spin freely with no bearing play" },
  { accept: true, text: "Brakes lock and release cleanly" },
  { accept: true, text: "Harness buckles click, hold, and release under test load" },
  { accept: true, text: "Fabric is fully clean, odor-free, and allergen-treated" },
  { accept: false, text: "Any structural frame damage or welding cracks" },
  { accept: false, text: "Non-OEM replacement parts we cannot verify" },
  { accept: false, text: "Brakes that don't hold under pressure" },
  { accept: false, text: "Fabric that cannot be fully cleaned or deodorized" },
  { accept: false, text: "Models older than 7 years (safety standards shift)" },
];

export default function Process() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <div className="py-14 md:py-20" style={{ backgroundColor: "#65a6db" }}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center gap-2 text-white/70 text-sm font-semibold mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Our Process</span>
          </div>
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
              We don't just clean strollers.<br />We renew them.
            </h1>
            <p className="text-white/85 font-semibold text-base md:text-lg leading-relaxed">
              Every TamBebe stroller goes through a 4-step certification process before it reaches your door. Here's exactly what that means — step by step, no vague claims.
            </p>
          </div>
        </div>
      </div>

      <div className="py-10 border-b border-border bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {standards.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-black mb-1" style={{ color: i % 2 === 0 ? "#f6ab78" : "#65a6db" }}>
                  {s.value}
                </div>
                <div className="text-sm font-black text-foreground">{s.label}</div>
                <div className="text-xs text-muted-foreground font-semibold">{s.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <main className="flex-1">
        <div className="container mx-auto px-4 md:px-6 py-16 md:py-24 space-y-24">
          {steps.map((step, idx) => {
            const StepIcon = step.icon;
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5 }}
                className={`grid md:grid-cols-2 gap-10 lg:gap-16 items-start ${!isEven ? "md:[direction:rtl]" : ""}`}
              >
                <div className={!isEven ? "md:[direction:ltr]" : ""}>
                  <div
                    className="rounded-3xl p-8 md:p-10 h-full flex flex-col justify-between min-h-64"
                    style={{ backgroundColor: step.accent + "12" }}
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center"
                        style={{ backgroundColor: step.accent + "25" }}
                      >
                        <StepIcon className="w-8 h-8" style={{ color: step.accent }} />
                      </div>
                      <span
                        className="text-7xl font-black leading-none"
                        style={{ color: step.accent + "30" }}
                      >
                        {step.num}
                      </span>
                    </div>
                    <div>
                      <div
                        className="text-xs font-black uppercase tracking-widest mb-2"
                        style={{ color: step.accent }}
                      >
                        Step {step.num}
                      </div>
                      <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3">{step.title}</h2>
                      <p
                        className="text-sm font-black uppercase tracking-wide mb-4"
                        style={{ color: step.accent }}
                      >
                        {step.tagline}
                      </p>
                      <p className="text-muted-foreground font-medium leading-relaxed text-sm md:text-base">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className={`space-y-4 ${!isEven ? "md:[direction:ltr]" : ""}`}>
                  {step.details.map((d) => {
                    const DIcon = d.icon;
                    return (
                      <div
                        key={d.label}
                        className="flex gap-4 bg-white border-2 border-border rounded-2xl p-5 hover:border-transparent hover:shadow-md transition-all"
                      >
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                          style={{ backgroundColor: step.accent + "15" }}
                        >
                          <DIcon className="w-5 h-5" style={{ color: step.accent }} />
                        </div>
                        <div>
                          <div className="font-black text-foreground text-sm mb-1">{d.label}</div>
                          <div className="text-sm text-muted-foreground font-medium leading-relaxed">{d.text}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>

        <div style={{ backgroundColor: "#f8f9fc" }} className="py-16 md:py-20">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="text-center mb-12">
              <div
                className="inline-block text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full mb-4"
                style={{ backgroundColor: "#65a6db1a", color: "#65a6db" }}
              >
                Our Standards
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3">What passes. What doesn't.</h2>
              <p className="text-muted-foreground font-medium text-base max-w-xl mx-auto">
                We'd rather reject a stroller and lose the sale than pass something that isn't right. Here's our honest threshold.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {acceptReject.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: item.accept ? -16 : 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className="flex items-start gap-3 bg-white rounded-2xl border-2 p-4"
                  style={{ borderColor: item.accept ? "#65a6db30" : "#f6ab7830" }}
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: item.accept ? "#65a6db20" : "#f6ab7820" }}
                  >
                    {item.accept
                      ? <CheckCircle2 className="w-4 h-4" style={{ color: "#65a6db" }} />
                      : <AlertTriangle className="w-4 h-4" style={{ color: "#f6ab78" }} />
                    }
                  </div>
                  <p className="text-sm font-semibold text-foreground leading-snug">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="py-16 md:py-20" style={{ backgroundColor: "#65a6db" }}>
          <div className="container mx-auto px-4 md:px-6 text-center max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <ShieldCheck className="w-14 h-14 text-white/80 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                Ready to find your stroller?
              </h2>
              <p className="text-white/85 font-semibold text-base mb-8 leading-relaxed">
                Every stroller in our shop has been through exactly this process. No exceptions. Browse what's certified and ready today.
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-black text-base transition-all hover:scale-105"
                style={{ backgroundColor: "#f6ab78", color: "#252d3a" }}
                data-testid="button-shop-cta"
              >
                Browse Certified Strollers
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
