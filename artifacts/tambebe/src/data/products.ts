import stroller1 from "@/assets/images/stroller-1.png";
import stroller2 from "@/assets/images/stroller-2.png";
import stroller3 from "@/assets/images/stroller-3.png";

export type ConditionGrade = "Like New" | "Excellent" | "Very Good";

export interface Product {
  id: number;
  slug: string;
  brand: string;
  model: string;
  price: string;
  retailPrice: string;
  condition: ConditionGrade;
  image: string;
  year: string;
  color: string;
  weight: string;
  foldType: string;
  seatPositions: string;
  maxChildWeight: string;
  description: string;
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
    price: "€450",
    retailPrice: "€1,200",
    condition: "Like New",
    image: stroller1,
    year: "2022",
    color: "Midnight Black / Aluminum",
    weight: "10.5 kg",
    foldType: "One-hand compact fold",
    seatPositions: "Forward & parent-facing, full recline",
    maxChildWeight: "22 kg",
    description:
      "The Bugaboo Fox 3 is one of the world's most trusted all-terrain travel systems. This unit was used for less than a year — the fabric shows no signs of wear, the chassis is fully rigid, and all suspension is operating as designed. Steam-cleaned, mechanically tested, and certified by our team.",
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
    included: [
      "Main seat unit",
      "Carrycot (bassinet)",
      "Aluminum chassis",
      "Sun canopy",
      "Rain cover",
      "Original manual",
    ],
    highlights: [
      "All-terrain performance",
      "Full-recline carrycot included",
      "Lightweight aluminum frame",
      "One-handed fold",
    ],
  },
  {
    id: 2,
    slug: "uppababy-vista-v2",
    brand: "UPPAbaby",
    model: "Vista V2",
    price: "€480",
    retailPrice: "€1,100",
    condition: "Excellent",
    image: stroller2,
    year: "2021",
    color: "Greyson (Charcoal Melange / Carbon)",
    weight: "11.4 kg",
    foldType: "Self-standing fold with seat attached",
    seatPositions: "Forward & parent-facing, multiple recline",
    maxChildWeight: "22.7 kg",
    description:
      "The UPPAbaby Vista V2 is a family favorite — built to grow with your child and expandable for twins or siblings. This unit is in excellent condition with minimal use. The self-standing fold still clicks into place crisply. All seating and suspension has been fully verified by our technicians.",
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
    included: [
      "Toddler seat",
      "MESA infant car seat adapter (compatible)",
      "Rumble seat adapter ready",
      "Full aluminum chassis",
      "Bug shield",
      "Rain shield",
    ],
    highlights: [
      "Expandable for 2 children",
      "Self-standing fold",
      "Compatible with most infant car seats",
      "Industry-leading canopy coverage",
    ],
  },
  {
    id: 3,
    slug: "nuna-mixx-next",
    brand: "Nuna",
    model: "Mixx Next",
    price: "€380",
    retailPrice: "€850",
    condition: "Very Good",
    image: stroller3,
    year: "2021",
    color: "Hazelwood (Warm Beige)",
    weight: "9.5 kg",
    foldType: "One-hand compact fold with seat attached",
    seatPositions: "Forward & parent-facing, full recline",
    maxChildWeight: "22 kg",
    description:
      "The Nuna Mixx Next is a thoughtfully engineered urban stroller — lighter and more nimble than most travel systems without sacrificing any safety credentials. This unit has some light scuffing on the chassis (noted in our condition grade) but all mechanical systems are fully operational and the fabric is clean and fresh.",
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
    included: [
      "Seat unit",
      "Carrycot",
      "Aluminum chassis",
      "Extendable canopy",
      "Rain cover",
      "Magnetic peek-a-boo window",
    ],
    highlights: [
      "Lightweight urban design",
      "Magnetic peek-a-boo window",
      "Car seat compatible",
      "Compact city fold",
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
