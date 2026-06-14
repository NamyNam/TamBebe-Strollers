import stroller1 from "@/assets/images/stroller-1.png";
import stroller2 from "@/assets/images/stroller-2.png";
import stroller3 from "@/assets/images/stroller-3.png";

export type ConditionGrade = "Unopened" | "Open Box" | "Barely Used" | "Gently Used";

export interface ProductVariant {
  id: string;
  color: string;
  colorHex: string;
  condition: ConditionGrade;
  year: string;
  price: string;
  priceNum: number;
  stock: number;
  image: string;
}

export interface Product {
  id: number;
  slug: string;
  brand: string;
  model: string;
  retailPrice: string;
  description: string;
  variants: ProductVariant[];
  weight: string;
  foldType: string;
  seatPositions: string;
  maxChildWeight: string;
  renewalChecks: string[];
  included: string[];
  highlights: string[];
}

export const products: Product[] = [
  {
    id: 1,
    slug: "bugaboo-fox-3",
    brand: "Bugaboo",
    model: "Fox 3",
    retailPrice: "€1,200",
    description:
      "The Bugaboo Fox 3 is one of the world's most trusted all-terrain travel systems. Exceptional suspension, one-hand fold, and fully reversible seat make it the gold standard for newborns through toddlers.",
    weight: "10.5 kg",
    foldType: "One-hand compact fold",
    seatPositions: "Forward & parent-facing, full recline",
    maxChildWeight: "22 kg",
    variants: [
      { id: "bugaboo-fox-3-midnight-black-unopened",   color: "Midnight Black / Aluminum", colorHex: "#1c1c1e", condition: "Unopened",    year: "2023", price: "€560", priceNum: 560, stock: 1, image: stroller1 },
      { id: "bugaboo-fox-3-midnight-black-barely",     color: "Midnight Black / Aluminum", colorHex: "#1c1c1e", condition: "Barely Used", year: "2022", price: "€450", priceNum: 450, stock: 1, image: stroller1 },
      { id: "bugaboo-fox-3-midnight-black-gently",     color: "Midnight Black / Aluminum", colorHex: "#1c1c1e", condition: "Gently Used", year: "2021", price: "€380", priceNum: 380, stock: 0, image: stroller1 },
      { id: "bugaboo-fox-3-forest-green-open-box",     color: "Forest Green / Aluminum",   colorHex: "#2d5a3d", condition: "Open Box",    year: "2022", price: "€410", priceNum: 410, stock: 1, image: stroller1 },
      { id: "bugaboo-fox-3-forest-green-gently",       color: "Forest Green / Aluminum",   colorHex: "#2d5a3d", condition: "Gently Used", year: "2021", price: "€360", priceNum: 360, stock: 1, image: stroller1 },
      { id: "bugaboo-fox-3-sand-beige-barely",         color: "Sand Beige / Aluminum",     colorHex: "#c4a882", condition: "Barely Used", year: "2022", price: "€440", priceNum: 440, stock: 0, image: stroller1 },
      { id: "bugaboo-fox-3-sand-beige-open-box",       color: "Sand Beige / Aluminum",     colorHex: "#c4a882", condition: "Open Box",    year: "2022", price: "€400", priceNum: 400, stock: 1, image: stroller1 },
    ],
    renewalChecks: [
      "Full steam-clean of all fabric components",
      "Chassis alignment and rigidity check",
      "Wheel bearing inspection and rotation test",
      "Brake system test (lock, partial, release)",
      "Harness strap tension and buckle safety check",
      "Recline mechanism and seat latch verification",
      "Handle height adjustment test",
      "All-terrain wheel function confirmed",
    ],
    included: ["Main seat unit", "Carrycot (bassinet)", "Aluminum chassis", "Sun canopy", "Rain cover", "Original manual"],
    highlights: ["All-terrain performance", "Full-recline carrycot included", "Lightweight aluminum frame", "One-handed fold"],
  },
  {
    id: 2,
    slug: "uppababy-vista-v2",
    brand: "UPPAbaby",
    model: "Vista V2",
    retailPrice: "€1,100",
    description:
      "The UPPAbaby Vista V2 is a family favorite — built to grow with your child and expandable for twins or siblings. Self-standing fold, industry-leading canopy, and near-universal car seat compatibility.",
    weight: "11.4 kg",
    foldType: "Self-standing fold with seat attached",
    seatPositions: "Forward & parent-facing, multiple recline",
    maxChildWeight: "22.7 kg",
    variants: [
      { id: "uppababy-vista-v2-greyson-barely",   color: "Greyson (Charcoal Melange)", colorHex: "#6b6b6b", condition: "Barely Used", year: "2022", price: "€520", priceNum: 520, stock: 1, image: stroller2 },
      { id: "uppababy-vista-v2-greyson-gently",   color: "Greyson (Charcoal Melange)", colorHex: "#6b6b6b", condition: "Gently Used", year: "2021", price: "€480", priceNum: 480, stock: 1, image: stroller2 },
      { id: "uppababy-vista-v2-bryce-open-box",   color: "Bryce (Blue Melange)",       colorHex: "#4a7ab5", condition: "Open Box",    year: "2022", price: "€490", priceNum: 490, stock: 1, image: stroller2 },
      { id: "uppababy-vista-v2-bryce-barely",     color: "Bryce (Blue Melange)",       colorHex: "#4a7ab5", condition: "Barely Used", year: "2021", price: "€510", priceNum: 510, stock: 0, image: stroller2 },
      { id: "uppababy-vista-v2-jake-unopened",    color: "Jake (Black)",               colorHex: "#2a2a2a", condition: "Unopened",    year: "2023", price: "€590", priceNum: 590, stock: 1, image: stroller2 },
      { id: "uppababy-vista-v2-jake-open-box",    color: "Jake (Black)",               colorHex: "#2a2a2a", condition: "Open Box",    year: "2022", price: "€500", priceNum: 500, stock: 1, image: stroller2 },
    ],
    renewalChecks: [
      "Full steam-clean and fabric sanitization",
      "Self-standing fold mechanism lubrication and test",
      "Front and rear wheel inspection",
      "Brake engagement and spring tension check",
      "5-point harness buckle test (each slot)",
      "Canopy extension and UPF rating verification",
      "Carrycot attachment system test",
      "Toddler seat install/release cycle (10x)",
    ],
    included: ["Toddler seat", "MESA infant car seat adapter (compatible)", "Rumble seat adapter ready", "Full aluminum chassis", "Bug shield", "Rain shield"],
    highlights: ["Expandable for 2 children", "Self-standing fold", "Compatible with most infant car seats", "Industry-leading canopy coverage"],
  },
  {
    id: 3,
    slug: "nuna-mixx-next",
    brand: "Nuna",
    model: "Mixx Next",
    retailPrice: "€850",
    description:
      "The Nuna Mixx Next is a thoughtfully engineered urban stroller — lighter and more nimble than most travel systems without sacrificing any safety credentials. Magnetic peek-a-boo window, full recline, and one-hand fold.",
    weight: "9.5 kg",
    foldType: "One-hand compact fold with seat attached",
    seatPositions: "Forward & parent-facing, full recline",
    maxChildWeight: "22 kg",
    variants: [
      { id: "nuna-mixx-next-hazelwood-barely",  color: "Hazelwood (Warm Beige)", colorHex: "#c4956a", condition: "Barely Used", year: "2022", price: "€400", priceNum: 400, stock: 1, image: stroller3 },
      { id: "nuna-mixx-next-hazelwood-gently",  color: "Hazelwood (Warm Beige)", colorHex: "#c4956a", condition: "Gently Used", year: "2021", price: "€370", priceNum: 370, stock: 1, image: stroller3 },
      { id: "nuna-mixx-next-riveted-open-box",  color: "Riveted (Charcoal)",     colorHex: "#4b5563", condition: "Open Box",    year: "2022", price: "€350", priceNum: 350, stock: 1, image: stroller3 },
      { id: "nuna-mixx-next-riveted-barely",    color: "Riveted (Charcoal)",     colorHex: "#4b5563", condition: "Barely Used", year: "2022", price: "€390", priceNum: 390, stock: 0, image: stroller3 },
      { id: "nuna-mixx-next-snow-unopened",     color: "Snow (Cream White)",     colorHex: "#f0ece4", condition: "Unopened",    year: "2023", price: "€490", priceNum: 490, stock: 1, image: stroller3 },
      { id: "nuna-mixx-next-snow-open-box",     color: "Snow (Cream White)",     colorHex: "#f0ece4", condition: "Open Box",    year: "2022", price: "€440", priceNum: 440, stock: 0, image: stroller3 },
    ],
    renewalChecks: [
      "Steam-clean of seat pad, canopy, and carrycot",
      "Chassis scuff noted and documented (cosmetic only)",
      "Wheel lock, pivot, and rotation test",
      "Rear brake system test",
      "Harness buckle function and strap integrity check",
      "Seat recline and upright latch test",
      "Parent-facing mode attachment cycle",
      "Canopy zip and magnetic peek-a-boo window test",
    ],
    included: ["Seat unit", "Carrycot", "Aluminum chassis", "Extendable canopy", "Rain cover", "Magnetic peek-a-boo window"],
    highlights: ["Lightweight urban design", "Magnetic peek-a-boo window", "Car seat compatible", "Compact city fold"],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getVariantById(product: Product, variantId: string): ProductVariant {
  return product.variants.find((v) => v.id === variantId) ?? product.variants[0];
}

export function getUniqueColors(product: Product): { color: string; colorHex: string }[] {
  const seen = new Set<string>();
  return product.variants.reduce<{ color: string; colorHex: string }[]>((acc, v) => {
    if (!seen.has(v.color)) {
      seen.add(v.color);
      acc.push({ color: v.color, colorHex: v.colorHex });
    }
    return acc;
  }, []);
}

export function getVariantsForColor(product: Product, color: string): ProductVariant[] {
  return product.variants.filter((v) => v.color === color);
}

export type FlatVariant = ProductVariant & { product: Product };

export function getAllVariants(): FlatVariant[] {
  return products.flatMap((p) => p.variants.map((v) => ({ ...v, product: p })));
}

export const conditionMeta: Record<ConditionGrade, { label: string; color: string; bg: string; description: string }> = {
  Unopened:      { label: "Unopened",    color: "#2563a8", bg: "#eff6ff",  description: "Box sealed. Never assembled or used." },
  "Open Box":    { label: "Open Box",    color: "#7c3aed", bg: "#f5f3ff",  description: "Box opened, assembled briefly for inspection only." },
  "Barely Used": { label: "Barely Used", color: "#0d7f5a", bg: "#ecfdf5",  description: "Used a handful of times. Like new in every practical sense." },
  "Gently Used": { label: "Gently Used", color: "#b45309", bg: "#fffbeb",  description: "Normal use with minor cosmetic signs. Fully certified." },
};
