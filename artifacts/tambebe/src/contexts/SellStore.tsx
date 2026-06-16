import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export interface SellRequest {
  id: string;
  submittedAt: string;
  photos: string[];
  hasInvoice: boolean;
  brand: string;
  model: string;
  hasProblems: boolean;
  problemDetails: string;
  hasPhysicalDamage: boolean;
  damageDetails: string;
  usageYears: string;
  usageMonths: string;
  allFunctionsWorking: boolean;
  email: string;
  phone: string;
  city: string;
  address: string;
  notes: string;
  status: "new" | "contacted" | "rejected" | "purchased";
}

export const STATUS_META: Record<SellRequest["status"], { label: string; color: string; bg: string }> = {
  new:       { label: "Yeni",        color: "#2563a8", bg: "#eff6ff" },
  contacted: { label: "Görüşüldü",   color: "#7c3aed", bg: "#f5f3ff" },
  purchased: { label: "Satın Alındı",color: "#0d7f5a", bg: "#ecfdf5" },
  rejected:  { label: "Reddedildi",  color: "#b45309", bg: "#fffbeb" },
};

const STORAGE_KEY = "tambebe_sell_requests";

function load(): SellRequest[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

function persist(requests: SellRequest[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
  } catch (e) {
    console.warn("localStorage quota exceeded — photos may be too large", e);
  }
}

interface SellStoreValue {
  requests: SellRequest[];
  addRequest: (r: Omit<SellRequest, "id" | "submittedAt" | "status">) => string;
  updateStatus: (id: string, status: SellRequest["status"]) => void;
  deleteRequest: (id: string) => void;
}

const SellStoreContext = createContext<SellStoreValue | null>(null);

export function SellStoreProvider({ children }: { children: ReactNode }) {
  const [requests, setRequests] = useState<SellRequest[]>(load);

  const addRequest = useCallback((r: Omit<SellRequest, "id" | "submittedAt" | "status">): string => {
    const id = `sr-${Date.now()}`;
    const newReq: SellRequest = { ...r, id, submittedAt: new Date().toISOString(), status: "new" };
    setRequests(prev => {
      const next = [...prev, newReq];
      persist(next);
      return next;
    });
    return id;
  }, []);

  const updateStatus = useCallback((id: string, status: SellRequest["status"]) => {
    setRequests(prev => {
      const next = prev.map(r => r.id === id ? { ...r, status } : r);
      persist(next);
      return next;
    });
  }, []);

  const deleteRequest = useCallback((id: string) => {
    setRequests(prev => {
      const next = prev.filter(r => r.id !== id);
      persist(next);
      return next;
    });
  }, []);

  return (
    <SellStoreContext.Provider value={{ requests, addRequest, updateStatus, deleteRequest }}>
      {children}
    </SellStoreContext.Provider>
  );
}

export function useSellStore() {
  const ctx = useContext(SellStoreContext);
  if (!ctx) throw new Error("useSellStore must be used inside SellStoreProvider");
  return ctx;
}
