import { createContext, useContext, useState, useCallback, ReactNode, useMemo } from "react";
import { products as staticProducts } from "@/data/products";
import type { Product, ProductVariant, ConditionGrade, FlatVariant } from "@/data/products";
import stroller1 from "@/assets/images/stroller-1.png";
import stroller2 from "@/assets/images/stroller-2.png";
import stroller3 from "@/assets/images/stroller-3.png";

export const IMAGE_OPTIONS = [
  { key: "stroller-1", src: stroller1, label: "Stroller 1" },
  { key: "stroller-2", src: stroller2, label: "Stroller 2" },
  { key: "stroller-3", src: stroller3, label: "Stroller 3" },
] as const;
export type ImageKey = typeof IMAGE_OPTIONS[number]["key"];

/** Resolves stored image: preset key → asset URL, data URL → pass-through */
export function resolveImage(img: string): string {
  if (!img) return stroller1;
  if (
    img.startsWith("data:") ||
    img.startsWith("blob:") ||
    img.startsWith("/") ||
    img.startsWith("http")
  ) {
    return img;
  }
  return IMAGE_OPTIONS.find((o) => o.key === img)?.src ?? stroller1;
}

interface VariantOverride {
  stock?: number;
  price?: string;
  priceNum?: number;
}

export interface ExtraVariant {
  id: string;
  productSlug: string;
  color: string;
  colorHex: string;
  condition: ConditionGrade;
  year: string;
  price: string;
  priceNum: number;
  stock: number;
  image: string;
}

export interface ExtraProduct {
  slug: string;
  brand: string;
  model: string;
  retailPrice: string;
  description: string;
  weight: string;
  foldType: string;
  seatPositions: string;
  maxChildWeight: string;
  renewalChecks: string[];
  included: string[];
  highlights: string[];
  image: string;
  variants: ExtraVariant[];
}

interface StoreData {
  variantOverrides: Record<string, VariantOverride>;
  extraVariants: ExtraVariant[];
  extraProducts: ExtraProduct[];
  /** IDs of original (static) variants the admin has hidden */
  hiddenVariants: string[];
}

const STORAGE_KEY = "tambebe_admin_store";

function loadStore(): StoreData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        variantOverrides: parsed.variantOverrides ?? {},
        extraVariants: parsed.extraVariants ?? [],
        extraProducts: parsed.extraProducts ?? [],
        hiddenVariants: parsed.hiddenVariants ?? [],
      };
    }
  } catch {}
  return { variantOverrides: {}, extraVariants: [], extraProducts: [], hiddenVariants: [] };
}

function saveStore(data: StoreData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn("localStorage quota exceeded — images may be too large", e);
  }
}

function mergeProducts(storeData: StoreData): Product[] {
  const hidden = new Set(storeData.hiddenVariants);

  // 1. Static products with overrides applied, hidden variants removed
  const base: Product[] = staticProducts.map((p) => ({
    ...p,
    variants: p.variants
      .filter((v) => !hidden.has(v.id))
      .map((v) => {
        const override = storeData.variantOverrides[v.id];
        return override ? { ...v, ...override } : v;
      }),
  }));

  // 2. Append extra variants to existing products (apply overrides too)
  for (const ev of storeData.extraVariants) {
    if (hidden.has(ev.id)) continue;
    const product = base.find((p) => p.slug === ev.productSlug);
    if (!product) continue;
    if (product.variants.find((v) => v.id === ev.id)) continue;
    const override = storeData.variantOverrides[ev.id];
    product.variants = [
      ...product.variants,
      {
        id: ev.id,
        color: ev.color,
        colorHex: ev.colorHex,
        condition: ev.condition,
        year: ev.year,
        price: override?.price ?? ev.price,
        priceNum: override?.priceNum ?? ev.priceNum,
        stock: override?.stock ?? ev.stock,
        image: resolveImage(ev.image),
      },
    ];
  }

  // 3. Extra products (dedup by slug)
  const seenSlugs = new Set(base.map((p) => p.slug));
  const extraProds: Product[] = storeData.extraProducts
    .filter((ep) => !seenSlugs.has(ep.slug))
    .map((ep, i) => ({
      id: 1000 + i,
      slug: ep.slug,
      brand: ep.brand,
      model: ep.model,
      retailPrice: ep.retailPrice,
      description: ep.description,
      weight: ep.weight,
      foldType: ep.foldType,
      seatPositions: ep.seatPositions,
      maxChildWeight: ep.maxChildWeight,
      renewalChecks: ep.renewalChecks,
      included: ep.included,
      highlights: ep.highlights,
      variants: ep.variants
        .filter((ev) => !hidden.has(ev.id))
        .map((ev) => {
          const override = storeData.variantOverrides[ev.id];
          return {
            id: ev.id,
            color: ev.color,
            colorHex: ev.colorHex,
            condition: ev.condition,
            year: ev.year,
            price: override?.price ?? ev.price,
            priceNum: override?.priceNum ?? ev.priceNum,
            stock: override?.stock ?? ev.stock,
            image: resolveImage(ev.image),
          };
        }),
    }));

  return [...base, ...extraProds];
}

interface ProductStoreValue {
  products: Product[];
  getProductBySlug: (slug: string) => Product | undefined;
  getAllVariants: () => FlatVariant[];
  storeData: StoreData;
  updateVariant: (variantId: string, changes: VariantOverride) => void;
  addExtraVariant: (variant: ExtraVariant) => void;
  deleteExtraVariant: (variantId: string) => void;
  hideVariant: (variantId: string) => void;
  unhideVariant: (variantId: string) => void;
  addExtraProduct: (product: ExtraProduct) => void;
  deleteExtraProduct: (slug: string) => void;
  resetAll: () => void;
}

const ProductStoreContext = createContext<ProductStoreValue | null>(null);

export function ProductStoreProvider({ children }: { children: ReactNode }) {
  const [storeData, setStoreData] = useState<StoreData>(loadStore);

  const products = useMemo(() => mergeProducts(storeData), [storeData]);

  const getProductBySlug = useCallback(
    (slug: string) => products.find((p) => p.slug === slug),
    [products]
  );

  const getAllVariants = useCallback(
    (): FlatVariant[] =>
      products.flatMap((p) => p.variants.map((v) => ({ ...v, product: p }))),
    [products]
  );

  const updateVariant = useCallback((variantId: string, changes: VariantOverride) => {
    setStoreData((prev) => {
      const next: StoreData = {
        ...prev,
        variantOverrides: {
          ...prev.variantOverrides,
          [variantId]: { ...prev.variantOverrides[variantId], ...changes },
        },
      };
      saveStore(next);
      return next;
    });
  }, []);

  const addExtraVariant = useCallback((variant: ExtraVariant) => {
    setStoreData((prev) => {
      if (prev.extraVariants.find((v) => v.id === variant.id)) return prev;
      const next: StoreData = {
        ...prev,
        extraVariants: [...prev.extraVariants, variant],
      };
      saveStore(next);
      return next;
    });
  }, []);

  const deleteExtraVariant = useCallback((variantId: string) => {
    setStoreData((prev) => {
      const next: StoreData = {
        ...prev,
        extraVariants: prev.extraVariants.filter((v) => v.id !== variantId),
        variantOverrides: Object.fromEntries(
          Object.entries(prev.variantOverrides).filter(([k]) => k !== variantId)
        ),
      };
      saveStore(next);
      return next;
    });
  }, []);

  const hideVariant = useCallback((variantId: string) => {
    setStoreData((prev) => {
      if (prev.hiddenVariants.includes(variantId)) return prev;
      const next: StoreData = {
        ...prev,
        hiddenVariants: [...prev.hiddenVariants, variantId],
      };
      saveStore(next);
      return next;
    });
  }, []);

  const unhideVariant = useCallback((variantId: string) => {
    setStoreData((prev) => {
      const next: StoreData = {
        ...prev,
        hiddenVariants: prev.hiddenVariants.filter((id) => id !== variantId),
      };
      saveStore(next);
      return next;
    });
  }, []);

  const addExtraProduct = useCallback((product: ExtraProduct) => {
    setStoreData((prev) => {
      const existingSlugs = new Set([
        ...staticProducts.map((p) => p.slug),
        ...prev.extraProducts.map((p) => p.slug),
      ]);
      if (existingSlugs.has(product.slug)) return prev;
      const next: StoreData = {
        ...prev,
        extraProducts: [...prev.extraProducts, product],
      };
      saveStore(next);
      return next;
    });
  }, []);

  const deleteExtraProduct = useCallback((slug: string) => {
    setStoreData((prev) => {
      const next: StoreData = {
        ...prev,
        extraProducts: prev.extraProducts.filter((p) => p.slug !== slug),
      };
      saveStore(next);
      return next;
    });
  }, []);

  const resetAll = useCallback(() => {
    const empty: StoreData = {
      variantOverrides: {},
      extraVariants: [],
      extraProducts: [],
      hiddenVariants: [],
    };
    saveStore(empty);
    setStoreData(empty);
  }, []);

  return (
    <ProductStoreContext.Provider
      value={{
        products,
        getProductBySlug,
        getAllVariants,
        storeData,
        updateVariant,
        addExtraVariant,
        deleteExtraVariant,
        hideVariant,
        unhideVariant,
        addExtraProduct,
        deleteExtraProduct,
        resetAll,
      }}
    >
      {children}
    </ProductStoreContext.Provider>
  );
}

export function useProductStore() {
  const ctx = useContext(ProductStoreContext);
  if (!ctx) throw new Error("useProductStore must be used inside ProductStoreProvider");
  return ctx;
}
