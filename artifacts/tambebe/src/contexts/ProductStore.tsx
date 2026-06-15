import { createContext, useContext, useState, useCallback, useEffect, ReactNode, useMemo } from "react";
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

export function resolveImage(key: ImageKey): string {
  return IMAGE_OPTIONS.find((o) => o.key === key)?.src ?? stroller1;
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
  imageKey: ImageKey;
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
  imageKey: ImageKey;
  variants: ExtraVariant[];
}

interface StoreData {
  variantOverrides: Record<string, VariantOverride>;
  extraVariants: ExtraVariant[];
  extraProducts: ExtraProduct[];
}

const STORAGE_KEY = "tambebe_admin_store";

function loadStore(): StoreData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { variantOverrides: {}, extraVariants: [], extraProducts: [] };
}

function saveStore(data: StoreData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function mergeProducts(storeData: StoreData): Product[] {
  const base: Product[] = staticProducts.map((p) => ({
    ...p,
    variants: p.variants.map((v) => {
      const override = storeData.variantOverrides[v.id];
      if (!override) return v;
      return { ...v, ...override };
    }),
  }));

  for (const ev of storeData.extraVariants) {
    const product = base.find((p) => p.slug === ev.productSlug);
    if (!product) continue;
    const pv: ProductVariant = {
      id: ev.id,
      color: ev.color,
      colorHex: ev.colorHex,
      condition: ev.condition,
      year: ev.year,
      price: ev.price,
      priceNum: ev.priceNum,
      stock: ev.stock,
      image: resolveImage(ev.imageKey),
    };
    product.variants = [...product.variants, pv];
  }

  const extraProds: Product[] = storeData.extraProducts.map((ep, i) => ({
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
    variants: ep.variants.map((ev) => ({
      id: ev.id,
      color: ev.color,
      colorHex: ev.colorHex,
      condition: ev.condition,
      year: ev.year,
      price: ev.price,
      priceNum: ev.priceNum,
      stock: ev.stock,
      image: resolveImage(ev.imageKey),
    })),
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
  addExtraProduct: (product: ExtraProduct) => void;
  deleteExtraProduct: (slug: string) => void;
  resetAll: () => void;
}

const ProductStoreContext = createContext<ProductStoreValue | null>(null);

export function ProductStoreProvider({ children }: { children: ReactNode }) {
  const [storeData, setStoreData] = useState<StoreData>(loadStore);

  const products = useMemo(() => mergeProducts(storeData), [storeData]);

  const persist = useCallback((data: StoreData) => {
    saveStore(data);
    setStoreData(data);
  }, []);

  const getProductBySlug = useCallback(
    (slug: string) => products.find((p) => p.slug === slug),
    [products]
  );

  const getAllVariants = useCallback(
    (): FlatVariant[] => products.flatMap((p) => p.variants.map((v) => ({ ...v, product: p }))),
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
      const next: StoreData = { ...prev, extraVariants: [...prev.extraVariants, variant] };
      saveStore(next);
      return next;
    });
  }, []);

  const deleteExtraVariant = useCallback((variantId: string) => {
    setStoreData((prev) => {
      const next: StoreData = {
        ...prev,
        extraVariants: prev.extraVariants.filter((v) => v.id !== variantId),
      };
      saveStore(next);
      return next;
    });
  }, []);

  const addExtraProduct = useCallback((product: ExtraProduct) => {
    setStoreData((prev) => {
      const next: StoreData = { ...prev, extraProducts: [...prev.extraProducts, product] };
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
    const empty: StoreData = { variantOverrides: {}, extraVariants: [], extraProducts: [] };
    persist(empty);
  }, [persist]);

  return (
    <ProductStoreContext.Provider value={{
      products, getProductBySlug, getAllVariants, storeData,
      updateVariant, addExtraVariant, deleteExtraVariant,
      addExtraProduct, deleteExtraProduct, resetAll,
    }}>
      {children}
    </ProductStoreContext.Provider>
  );
}

export function useProductStore() {
  const ctx = useContext(ProductStoreContext);
  if (!ctx) throw new Error("useProductStore must be used inside ProductStoreProvider");
  return ctx;
}
