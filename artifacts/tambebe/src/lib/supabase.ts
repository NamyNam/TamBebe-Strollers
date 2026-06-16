const SB_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SB_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

function headers(extra?: Record<string, string>) {
  return {
    apikey: SB_KEY,
    Authorization: `Bearer ${SB_KEY}`,
    "Content-Type": "application/json",
    ...extra,
  };
}

export async function sbGet<T>(table: string, query = ""): Promise<T[]> {
  const res = await fetch(`${SB_URL}/rest/v1/${table}${query}`, {
    headers: headers(),
  });
  if (!res.ok) throw new Error(`[supabase] GET ${table}: ${await res.text()}`);
  return res.json() as Promise<T[]>;
}

export async function sbUpsert<T extends object>(table: string, data: T): Promise<void> {
  const res = await fetch(`${SB_URL}/rest/v1/${table}`, {
    method: "POST",
    headers: headers({ Prefer: "resolution=merge-duplicates,return=minimal" }),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`[supabase] UPSERT ${table}: ${await res.text()}`);
}

export async function sbPatch(table: string, query: string, data: object): Promise<void> {
  const res = await fetch(`${SB_URL}/rest/v1/${table}${query}`, {
    method: "PATCH",
    headers: headers({ Prefer: "return=minimal" }),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`[supabase] PATCH ${table}: ${await res.text()}`);
}

export async function sbDelete(table: string, query: string): Promise<void> {
  const res = await fetch(`${SB_URL}/rest/v1/${table}${query}`, {
    method: "DELETE",
    headers: headers(),
  });
  if (!res.ok) throw new Error(`[supabase] DELETE ${table}: ${await res.text()}`);
}
