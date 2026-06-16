import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from "react";
import { sbGet, sbUpsert, sbPatch, sbDelete } from "@/lib/supabase";

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
  district: string;
  address: string;
  notes: string;
  status: "new" | "contacted" | "rejected" | "purchased";
}

export const STATUS_META: Record<SellRequest["status"], { label: string; color: string; bg: string }> = {
  new:       { label: "Yeni",         color: "#2563a8", bg: "#eff6ff" },
  contacted: { label: "Görüşüldü",    color: "#7c3aed", bg: "#f5f3ff" },
  purchased: { label: "Satın Alındı", color: "#0d7f5a", bg: "#ecfdf5" },
  rejected:  { label: "Reddedildi",   color: "#b45309", bg: "#fffbeb" },
};

const STORAGE_KEY = "tambebe_sell_requests";

// ── Supabase row shape ───────────────────────────────────────────────────────
interface SbRow {
  id: string;
  submitted_at: string;
  status: string;
  data: Omit<SellRequest, "id" | "submittedAt" | "status">;
}

function rowToRequest(row: SbRow): SellRequest {
  return { ...row.data, id: row.id, submittedAt: row.submitted_at, status: row.status as SellRequest["status"] };
}

function requestToRow(r: SellRequest): SbRow {
  const { id, submittedAt, status, ...rest } = r;
  return { id, submitted_at: submittedAt, status, data: rest };
}

// ── localStorage helpers ─────────────────────────────────────────────────────
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
  } catch {}
}

// ── Context ──────────────────────────────────────────────────────────────────
interface SellStoreValue {
  requests: SellRequest[];
  addRequest: (r: Omit<SellRequest, "id" | "submittedAt" | "status">) => string;
  updateStatus: (id: string, status: SellRequest["status"]) => void;
  deleteRequest: (id: string) => void;
}

const SellStoreContext = createContext<SellStoreValue | null>(null);

export function SellStoreProvider({ children }: { children: ReactNode }) {
  const [requests, setRequests] = useState<SellRequest[]>(load);

  // Supabase'den yükle (sayfa açılışında)
  useEffect(() => {
    sbGet<SbRow>("sell_requests", "?select=*&order=submitted_at.desc")
      .then((rows) => {
        if (rows.length > 0) {
          const remote = rows.map(rowToRequest);
          setRequests(remote);
          persist(remote);
        }
      })
      .catch((e) => console.warn("[supabase] sell_requests load failed:", e));
  }, []);

  const addRequest = useCallback((r: Omit<SellRequest, "id" | "submittedAt" | "status">): string => {
    const id = `sr-${Date.now()}`;
    const newReq: SellRequest = { ...r, id, submittedAt: new Date().toISOString(), status: "new" };

    setRequests((prev) => {
      const next = [newReq, ...prev];
      persist(next);
      return next;
    });

    // Supabase'e kaydet
    sbUpsert("sell_requests", requestToRow(newReq)).catch(
      (e) => console.warn("[supabase] sell_requests insert failed:", e)
    );

    return id;
  }, []);

  const updateStatus = useCallback((id: string, status: SellRequest["status"]) => {
    setRequests((prev) => {
      const next = prev.map((r) => (r.id === id ? { ...r, status } : r));
      persist(next);
      return next;
    });

    sbPatch("sell_requests", `?id=eq.${id}`, { status }).catch(
      (e) => console.warn("[supabase] sell_requests patch failed:", e)
    );
  }, []);

  const deleteRequest = useCallback((id: string) => {
    setRequests((prev) => {
      const next = prev.filter((r) => r.id !== id);
      persist(next);
      return next;
    });

    sbDelete("sell_requests", `?id=eq.${id}`).catch(
      (e) => console.warn("[supabase] sell_requests delete failed:", e)
    );
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
