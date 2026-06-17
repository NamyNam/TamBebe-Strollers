import stroller1 from "@/assets/images/stroller-1.png";
import stroller2 from "@/assets/images/stroller-2.png";
import stroller3 from "@/assets/images/stroller-3.png";

export type ConditionGrade = "Unopened" | "Open Box" | "Barely Used" | "Gently Used";

export const CONDITION_ORDER: ConditionGrade[] = ["Unopened", "Open Box", "Barely Used", "Gently Used"];

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
  images?: string[];
  /** Freetext: scratches, problems, damages for this specific unit */
  conditionNotes?: string;
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
    retailPrice: "€1.200",
    description:
      "Bugaboo Fox 3, dünyanın en güvenilir arazi seyahat sistemlerinden biridir. Üstün süspansiyon, tek elle katlama ve tamamen döndürülebilir koltuk, onu yenidoğanlardan küçük çocuklara kadar altın standart yapar.",
    weight: "10,5 kg",
    foldType: "Tek elle kompakt katlama",
    seatPositions: "İleri ve ebeveyne dönük, tam yatırma",
    maxChildWeight: "22 kg",
    variants: [
      // Midnight Black — tüm 4 durum
      { id: "bugaboo-fox-3-midnight-black-unopened",   color: "Gece Siyahı / Alüminyum", colorHex: "#1c1c1e", condition: "Unopened",    year: "2023", price: "€560", priceNum: 560, stock: 1, image: stroller1 },
      { id: "bugaboo-fox-3-midnight-black-open-box",   color: "Gece Siyahı / Alüminyum", colorHex: "#1c1c1e", condition: "Open Box",    year: "2022", price: "€470", priceNum: 470, stock: 0, image: stroller1 },
      { id: "bugaboo-fox-3-midnight-black-barely",     color: "Gece Siyahı / Alüminyum", colorHex: "#1c1c1e", condition: "Barely Used", year: "2022", price: "€450", priceNum: 450, stock: 1, image: stroller1 },
      { id: "bugaboo-fox-3-midnight-black-gently",     color: "Gece Siyahı / Alüminyum", colorHex: "#1c1c1e", condition: "Gently Used", year: "2021", price: "€380", priceNum: 380, stock: 0, image: stroller1 },
      // Orman Yeşili — tüm 4 durum
      { id: "bugaboo-fox-3-forest-green-unopened",     color: "Orman Yeşili / Alüminyum", colorHex: "#2d5a3d", condition: "Unopened",    year: "2023", price: "€530", priceNum: 530, stock: 0, image: stroller1 },
      { id: "bugaboo-fox-3-forest-green-open-box",     color: "Orman Yeşili / Alüminyum", colorHex: "#2d5a3d", condition: "Open Box",    year: "2022", price: "€410", priceNum: 410, stock: 1, image: stroller1 },
      { id: "bugaboo-fox-3-forest-green-barely",       color: "Orman Yeşili / Alüminyum", colorHex: "#2d5a3d", condition: "Barely Used", year: "2022", price: "€440", priceNum: 440, stock: 0, image: stroller1 },
      { id: "bugaboo-fox-3-forest-green-gently",       color: "Orman Yeşili / Alüminyum", colorHex: "#2d5a3d", condition: "Gently Used", year: "2021", price: "€360", priceNum: 360, stock: 1, image: stroller1 },
      // Kum Bejı — tüm 4 durum
      { id: "bugaboo-fox-3-sand-beige-unopened",       color: "Kum Bejı / Alüminyum",    colorHex: "#c4a882", condition: "Unopened",    year: "2023", price: "€540", priceNum: 540, stock: 0, image: stroller1 },
      { id: "bugaboo-fox-3-sand-beige-open-box",       color: "Kum Bejı / Alüminyum",    colorHex: "#c4a882", condition: "Open Box",    year: "2022", price: "€400", priceNum: 400, stock: 1, image: stroller1 },
      { id: "bugaboo-fox-3-sand-beige-barely",         color: "Kum Bejı / Alüminyum",    colorHex: "#c4a882", condition: "Barely Used", year: "2022", price: "€440", priceNum: 440, stock: 0, image: stroller1 },
      { id: "bugaboo-fox-3-sand-beige-gently",         color: "Kum Bejı / Alüminyum",    colorHex: "#c4a882", condition: "Gently Used", year: "2021", price: "€370", priceNum: 370, stock: 0, image: stroller1 },
    ],
    renewalChecks: [
      "Tüm kumaş bileşenlerinin tam buhar temizliği",
      "Şasi hizalama ve sağlamlık kontrolü",
      "Tekerlek yatağı incelemesi ve dönüş testi",
      "Fren sistemi testi (kilitleme, kısmi, bırakma)",
      "Emniyet kemeri gerginliği ve toka güvenlik kontrolü",
      "Yatırma mekanizması ve koltuk mandalı doğrulaması",
      "Sap yüksekliği ayar testi",
      "Arazi tekerleği işlevi onaylandı",
    ],
    included: ["Ana koltuk ünitesi", "Portbebe (beşik)", "Alüminyum şasi", "Güneş tentesi", "Yağmur örtüsü", "Orijinal kullanım kılavuzu"],
    highlights: ["Arazi performansı", "Tam yatırmalı portbebe dahil", "Hafif alüminyum çerçeve", "Tek elle katlama"],
  },
  {
    id: 2,
    slug: "uppababy-vista-v2",
    brand: "UPPAbaby",
    model: "Vista V2",
    retailPrice: "€1.100",
    description:
      "UPPAbaby Vista V2, ailenin favorisi — çocuğunuzla büyüyen ve ikizler ya da kardeşler için genişletilebilen bir model. Serbest duran katlama, sektör lideri tente ve neredeyse evrensel araba koltuğu uyumluluğu.",
    weight: "11,4 kg",
    foldType: "Koltuk takılıyken serbest duran katlama",
    seatPositions: "İleri ve ebeveyne dönük, çoklu yatırma",
    maxChildWeight: "22,7 kg",
    variants: [
      // Greyson — tüm 4 durum
      { id: "uppababy-vista-v2-greyson-unopened",  color: "Greyson (Antrasit Melanj)", colorHex: "#6b6b6b", condition: "Unopened",    year: "2023", price: "€610", priceNum: 610, stock: 0, image: stroller2 },
      { id: "uppababy-vista-v2-greyson-open-box",  color: "Greyson (Antrasit Melanj)", colorHex: "#6b6b6b", condition: "Open Box",    year: "2022", price: "€500", priceNum: 500, stock: 0, image: stroller2 },
      { id: "uppababy-vista-v2-greyson-barely",    color: "Greyson (Antrasit Melanj)", colorHex: "#6b6b6b", condition: "Barely Used", year: "2022", price: "€520", priceNum: 520, stock: 1, image: stroller2 },
      { id: "uppababy-vista-v2-greyson-gently",    color: "Greyson (Antrasit Melanj)", colorHex: "#6b6b6b", condition: "Gently Used", year: "2021", price: "€480", priceNum: 480, stock: 1, image: stroller2 },
      // Bryce — tüm 4 durum
      { id: "uppababy-vista-v2-bryce-unopened",    color: "Bryce (Mavi Melanj)",       colorHex: "#4a7ab5", condition: "Unopened",    year: "2023", price: "€620", priceNum: 620, stock: 0, image: stroller2 },
      { id: "uppababy-vista-v2-bryce-open-box",    color: "Bryce (Mavi Melanj)",       colorHex: "#4a7ab5", condition: "Open Box",    year: "2022", price: "€490", priceNum: 490, stock: 1, image: stroller2 },
      { id: "uppababy-vista-v2-bryce-barely",      color: "Bryce (Mavi Melanj)",       colorHex: "#4a7ab5", condition: "Barely Used", year: "2021", price: "€510", priceNum: 510, stock: 0, image: stroller2 },
      { id: "uppababy-vista-v2-bryce-gently",      color: "Bryce (Mavi Melanj)",       colorHex: "#4a7ab5", condition: "Gently Used", year: "2021", price: "€450", priceNum: 450, stock: 0, image: stroller2 },
      // Jake — tüm 4 durum
      { id: "uppababy-vista-v2-jake-unopened",     color: "Jake (Siyah)",              colorHex: "#2a2a2a", condition: "Unopened",    year: "2023", price: "€590", priceNum: 590, stock: 1, image: stroller2 },
      { id: "uppababy-vista-v2-jake-open-box",     color: "Jake (Siyah)",              colorHex: "#2a2a2a", condition: "Open Box",    year: "2022", price: "€500", priceNum: 500, stock: 1, image: stroller2 },
      { id: "uppababy-vista-v2-jake-barely",       color: "Jake (Siyah)",              colorHex: "#2a2a2a", condition: "Barely Used", year: "2022", price: "€530", priceNum: 530, stock: 0, image: stroller2 },
      { id: "uppababy-vista-v2-jake-gently",       color: "Jake (Siyah)",              colorHex: "#2a2a2a", condition: "Gently Used", year: "2021", price: "€470", priceNum: 470, stock: 0, image: stroller2 },
    ],
    renewalChecks: [
      "Tam buhar temizliği ve kumaş dezenfeksiyonu",
      "Serbest duran katlama mekanizması yağlama ve testi",
      "Ön ve arka tekerlek incelemesi",
      "Fren devreye girme ve yay gerilim kontrolü",
      "5 noktalı emniyet kemeri toka testi (her yuva)",
      "Tente uzatma ve UPF derecesi doğrulaması",
      "Portbebe bağlantı sistemi testi",
      "Küçük çocuk koltuğu takma/çıkarma döngüsü (10 kez)",
    ],
    included: ["Küçük çocuk koltuğu", "MESA bebek araba koltuğu adaptörü (uyumlu)", "İkinci koltuk adaptörüne hazır", "Tam alüminyum şasi", "Böcek kalkanı", "Yağmur kalkanı"],
    highlights: ["2 çocuk için genişletilebilir", "Serbest duran katlama", "Çoğu bebek araba koltuğuyla uyumlu", "Sektör lideri tente kapsamı"],
  },
  {
    id: 3,
    slug: "nuna-mixx-next",
    brand: "Nuna",
    model: "Mixx Next",
    retailPrice: "€850",
    description:
      "Nuna Mixx Next, özenle tasarlanmış bir şehir arabası — herhangi bir güvenlik özelliğinden ödün vermeden çoğu seyahat sisteminden daha hafif ve çevik. Manyetik bakış penceresi, tam yatırma ve tek elle katlama.",
    weight: "9,5 kg",
    foldType: "Koltuk takılıyken tek elle kompakt katlama",
    seatPositions: "İleri ve ebeveyne dönük, tam yatırma",
    maxChildWeight: "22 kg",
    variants: [
      // Hazelwood — tüm 4 durum
      { id: "nuna-mixx-next-hazelwood-unopened",  color: "Hazelwood (Sıcak Bej)",  colorHex: "#c4956a", condition: "Unopened",    year: "2023", price: "€500", priceNum: 500, stock: 0, image: stroller3 },
      { id: "nuna-mixx-next-hazelwood-open-box",  color: "Hazelwood (Sıcak Bej)",  colorHex: "#c4956a", condition: "Open Box",    year: "2022", price: "€410", priceNum: 410, stock: 0, image: stroller3 },
      { id: "nuna-mixx-next-hazelwood-barely",    color: "Hazelwood (Sıcak Bej)",  colorHex: "#c4956a", condition: "Barely Used", year: "2022", price: "€400", priceNum: 400, stock: 1, image: stroller3 },
      { id: "nuna-mixx-next-hazelwood-gently",    color: "Hazelwood (Sıcak Bej)",  colorHex: "#c4956a", condition: "Gently Used", year: "2021", price: "€370", priceNum: 370, stock: 1, image: stroller3 },
      // Riveted — tüm 4 durum
      { id: "nuna-mixx-next-riveted-unopened",    color: "Riveted (Antrasit)",     colorHex: "#4b5563", condition: "Unopened",    year: "2023", price: "€490", priceNum: 490, stock: 0, image: stroller3 },
      { id: "nuna-mixx-next-riveted-open-box",    color: "Riveted (Antrasit)",     colorHex: "#4b5563", condition: "Open Box",    year: "2022", price: "€350", priceNum: 350, stock: 1, image: stroller3 },
      { id: "nuna-mixx-next-riveted-barely",      color: "Riveted (Antrasit)",     colorHex: "#4b5563", condition: "Barely Used", year: "2022", price: "€390", priceNum: 390, stock: 0, image: stroller3 },
      { id: "nuna-mixx-next-riveted-gently",      color: "Riveted (Antrasit)",     colorHex: "#4b5563", condition: "Gently Used", year: "2021", price: "€330", priceNum: 330, stock: 0, image: stroller3 },
      // Snow — tüm 4 durum
      { id: "nuna-mixx-next-snow-unopened",       color: "Snow (Krem Beyazı)",     colorHex: "#f0ece4", condition: "Unopened",    year: "2023", price: "€490", priceNum: 490, stock: 1, image: stroller3 },
      { id: "nuna-mixx-next-snow-open-box",       color: "Snow (Krem Beyazı)",     colorHex: "#f0ece4", condition: "Open Box",    year: "2022", price: "€440", priceNum: 440, stock: 0, image: stroller3 },
      { id: "nuna-mixx-next-snow-barely",         color: "Snow (Krem Beyazı)",     colorHex: "#f0ece4", condition: "Barely Used", year: "2022", price: "€420", priceNum: 420, stock: 0, image: stroller3 },
      { id: "nuna-mixx-next-snow-gently",         color: "Snow (Krem Beyazı)",     colorHex: "#f0ece4", condition: "Gently Used", year: "2021", price: "€380", priceNum: 380, stock: 0, image: stroller3 },
    ],
    renewalChecks: [
      "Koltuk minderi, tente ve portbebenin buhar temizliği",
      "Şasi çizikleri kaydedildi ve belgelendi (yalnızca kozmetik)",
      "Tekerlek kilidi, döndürme ve dönüş testi",
      "Arka fren sistemi testi",
      "Emniyet kemeri toka işlevi ve kayış bütünlük kontrolü",
      "Koltuk yatırma ve dik kilit testi",
      "Ebeveyne dönük mod bağlantı döngüsü",
      "Tente fermuarı ve manyetik bakış penceresi testi",
    ],
    included: ["Koltuk ünitesi", "Portbebe", "Alüminyum şasi", "Uzatılabilir tente", "Yağmur örtüsü", "Manyetik bakış penceresi"],
    highlights: ["Hafif şehir tasarımı", "Manyetik bakış penceresi", "Araba koltuğuyla uyumlu", "Kompakt şehir katlaması"],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
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
  const byCondition = new Map<ConditionGrade, ProductVariant>();
  product.variants.filter((v) => v.color === color).forEach((v) => byCondition.set(v.condition, v));
  return CONDITION_ORDER.map((c) => byCondition.get(c)).filter(Boolean) as ProductVariant[];
}

export type FlatVariant = ProductVariant & { product: Product };

export function getAllVariants(): FlatVariant[] {
  return products.flatMap((p) => p.variants.map((v) => ({ ...v, product: p })));
}

export const conditionMeta: Record<ConditionGrade, { label: string; color: string; bg: string; description: string }> = {
  Unopened:      { label: "Açılmamış",                    color: "#2563a8", bg: "#eff6ff",  description: "Kutu mühürlü. Hiç monte edilmemiş veya kullanılmamış." },
  "Open Box":    { label: "Açık Kutu",                    color: "#7c3aed", bg: "#f5f3ff",  description: "Kutu açılmış, yalnızca kontrol için kısa süre monte edilmiş." },
  "Barely Used": { label: "Neredeyse Hiç Kullanılmamış",  color: "#0d7f5a", bg: "#ecfdf5",  description: "Birkaç kez kullanılmış. Her pratik açıdan sıfır gibi." },
  "Gently Used": { label: "Az Kullanılmış",               color: "#b45309", bg: "#fffbeb",  description: "Normal kullanım, hafif kozmetik izler. Tamamen sertifikalı." },
};
