import { useState, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck, LogOut, RotateCcw, Plus, Pencil, Trash2,
  Check, X, ChevronDown, ChevronRight, Package, AlertTriangle,
  Eye, EyeOff, ImagePlus, CheckCircle2,
} from "lucide-react";
import {
  useProductStore, IMAGE_OPTIONS, resolveImage,
  type ExtraVariant, type ExtraProduct,
} from "@/contexts/ProductStore";
import { conditionMeta, CONDITION_ORDER } from "@/data/products";
import type { Product, ProductVariant, ConditionGrade } from "@/data/products";

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "tambebe2024";
const SESSION_KEY = "tambebe_admin_auth";

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
function genId() {
  return `v${Date.now()}${Math.random().toString(36).slice(2, 7)}`;
}
async function fileToBase64(file: File): Promise<string> {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onloadend = () => res(r.result as string);
    r.onerror = rej;
    r.readAsDataURL(file);
  });
}

// ─── Image Picker ─────────────────────────────────────────────────────────────
function ImagePicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const isCustom = value.startsWith("data:") || value.startsWith("http");

  async function pick(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setBusy(true);
    try { onChange(await fileToBase64(f)); } finally { setBusy(false); e.target.value = ""; }
  }

  return (
    <div className="space-y-1.5">
      <div className="flex gap-1.5">
        {IMAGE_OPTIONS.map(o => (
          <button key={o.key} type="button" onClick={() => onChange(o.key)}
            className={`flex-1 rounded-lg border-2 overflow-hidden transition-all ${value === o.key ? "border-[#65a6db]" : "border-border hover:border-gray-300"}`}>
            <img src={o.src} alt="" className="w-full h-12 object-contain p-1 bg-gray-50" />
          </button>
        ))}
        <button type="button" onClick={() => ref.current?.click()}
          className={`flex-1 rounded-lg border-2 flex flex-col items-center justify-center gap-0.5 transition-all ${isCustom ? "border-[#f6ab78]" : "border-dashed border-gray-300 hover:border-[#f6ab78]"}`}>
          {isCustom
            ? <img src={resolveImage(value)} alt="" className="w-full h-12 object-contain p-1" />
            : <><ImagePlus className="w-4 h-4 text-muted-foreground" /><span className="text-[9px] font-bold text-muted-foreground">Yükle</span></>}
        </button>
      </div>
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={pick} />
      {busy && <p className="text-[10px] text-[#65a6db] font-semibold">Yükleniyor…</p>}
      {isCustom && (
        <p className="text-[10px] text-green-600 font-semibold flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3" /> Kendi görseliniz —{" "}
          <button type="button" onClick={() => onChange("stroller-1")} className="underline text-muted-foreground">Kaldır</button>
        </p>
      )}
    </div>
  );
}

// ─── Password Gate ─────────────────────────────────────────────────────────────
function PasswordGate({ onAuth }: { onAuth: () => void }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(false);
  const [show, setShow] = useState(false);
  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) { sessionStorage.setItem(SESSION_KEY, "1"); onAuth(); }
    else { setErr(true); setPw(""); }
  }
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#f8f9fc" }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm mx-4">
        <div className="bg-white rounded-3xl shadow-xl border border-border p-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl font-black">Tam<span style={{ color: "#f6ab78" }}>Bebe</span>.</span>
            <span className="text-xs font-black px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: "#65a6db" }}>Admin</span>
          </div>
          <p className="text-sm text-muted-foreground font-medium mb-6">Devam etmek için şifreyi girin.</p>
          <form onSubmit={submit} className="space-y-4">
            <div className="relative">
              <input type={show ? "text" : "password"} value={pw}
                onChange={e => { setPw(e.target.value); setErr(false); }}
                placeholder="Şifre" autoFocus autoComplete="current-password"
                className={`w-full px-4 py-3 rounded-xl border-2 text-sm font-semibold outline-none pr-11 ${err ? "border-red-400 bg-red-50" : "border-border focus:border-[#65a6db]"}`} />
              <button type="button" onClick={() => setShow(s => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {err && <p className="text-xs text-red-500 font-semibold">Yanlış şifre.</p>}
            <button type="submit" className="w-full py-3 rounded-xl font-black text-sm text-white" style={{ backgroundColor: "#65a6db" }}>
              Giriş Yap
            </button>
          </form>
          <p className="text-[11px] text-muted-foreground mt-4 text-center">
            Şifreyi değiştirmek için <code className="bg-muted px-1 rounded">VITE_ADMIN_PASSWORD</code> ortam değişkenini ayarlayın.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ msg, onDone }: { msg: string; onDone: () => void }) {
  return createPortal(
    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }}
      onAnimationComplete={() => setTimeout(onDone, 2000)}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-2 bg-gray-900 text-white text-sm font-semibold px-5 py-3 rounded-full shadow-xl whitespace-nowrap">
      <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />{msg}
    </motion.div>,
    document.body
  );
}

// ─── Portal Modal ─────────────────────────────────────────────────────────────
function PortalModal({ title, subtitle, onClose, children }: {
  title: string; subtitle?: string; onClose: () => void; children: React.ReactNode;
}) {
  return createPortal(
    <div
      style={{ position: "fixed", inset: 0, zIndex: 9998, background: "rgba(0,0,0,0.5)", overflowY: "auto", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "2rem 1rem" }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ background: "white", borderRadius: "1.5rem", width: "100%", maxWidth: "520px", position: "relative", boxShadow: "0 20px 60px rgba(0,0,0,0.2)", marginBottom: "2rem" }}>
        <button onClick={onClose} style={{ position: "absolute", top: "1rem", right: "1rem", background: "none", border: "none", cursor: "pointer", padding: "0.375rem", borderRadius: "0.5rem" }}>
          <X className="w-4 h-4" />
        </button>
        <div style={{ padding: "1.5rem" }}>
          <h2 style={{ fontSize: "1.125rem", fontWeight: 900, margin: 0, paddingRight: "2rem" }}>{title}</h2>
          {subtitle && <p style={{ fontSize: "0.75rem", color: "#888", margin: "0.25rem 0 1rem" }}>{subtitle}</p>}
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}

// ─── Inline Add Variant Form ───────────────────────────────────────────────────
function InlineAddVariant({ productSlug, addExtraVariant, onDone }: {
  productSlug: string;
  addExtraVariant: (v: ExtraVariant) => void;
  onDone: (msg: string) => void;
}) {
  const [color, setColor] = useState("");
  const [colorHex, setColorHex] = useState("#888888");
  const [condition, setCondition] = useState<ConditionGrade>("Unopened");
  const [year, setYear] = useState(String(new Date().getFullYear()));
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState(1);
  const [image, setImage] = useState("stroller-1");
  const [colorErr, setColorErr] = useState("");
  const [priceErr, setPriceErr] = useState("");

  function save() {
    let ok = true;
    if (!color.trim()) { setColorErr("Renk adı zorunludur."); ok = false; }
    else setColorErr("");
    const pNum = parseFloat(price.replace(/[^0-9.]/g, ""));
    if (!price.trim()) { setPriceErr("Fiyat zorunludur."); ok = false; }
    else if (isNaN(pNum)) { setPriceErr("Geçerli fiyat girin."); ok = false; }
    else setPriceErr("");
    if (!ok) return;

    const newVariant: ExtraVariant = {
      id: genId(),
      productSlug,
      color: color.trim(),
      colorHex,
      condition,
      year: year || String(new Date().getFullYear()),
      price: `€${pNum}`,
      priceNum: pNum,
      stock,
      image,
    };
    console.log("[TamBebe Admin] Varyant kaydediliyor:", newVariant);
    addExtraVariant(newVariant);
    onDone(`"${color.trim()}" varyantı eklendi ✓`);
  }

  return (
    <div className="p-4 bg-blue-50 border-t-2 border-[#65a6db] space-y-3">
      <p className="text-xs font-black uppercase tracking-widest" style={{ color: "#65a6db" }}>Yeni Varyant</p>
      <div className="grid grid-cols-2 gap-2.5">
        <div className="col-span-2">
          <label className="field-label">Renk Adı *</label>
          <input className={`field ${colorErr ? "border-red-400" : ""}`} value={color} placeholder="ör. Gece Siyahı"
            onChange={e => { setColor(e.target.value); setColorErr(""); }} />
          {colorErr && <p className="text-[11px] text-red-500 font-semibold mt-0.5">{colorErr}</p>}
        </div>
        <div>
          <label className="field-label">Renk Kodu</label>
          <div className="flex gap-1.5 items-center">
            <input type="color" value={colorHex} onChange={e => setColorHex(e.target.value)}
              className="w-9 h-9 rounded-lg border border-border cursor-pointer shrink-0" />
            <input className="field text-xs" value={colorHex} onChange={e => setColorHex(e.target.value)} />
          </div>
        </div>
        <div>
          <label className="field-label">Durum</label>
          <select className="field" value={condition} onChange={e => setCondition(e.target.value as ConditionGrade)}>
            {CONDITION_ORDER.map(c => <option key={c} value={c}>{conditionMeta[c].label}</option>)}
          </select>
        </div>
        <div>
          <label className="field-label">Yıl</label>
          <input className="field" value={year} onChange={e => setYear(e.target.value)} placeholder="2024" />
        </div>
        <div>
          <label className="field-label">Stok</label>
          <input type="number" min={0} className="field" value={stock}
            onChange={e => setStock(Math.max(0, Number(e.target.value)))} />
        </div>
        <div className="col-span-2">
          <label className="field-label">Fiyat (€) *</label>
          <input className={`field ${priceErr ? "border-red-400" : ""}`} value={price} placeholder="450"
            onChange={e => { setPrice(e.target.value); setPriceErr(""); }} />
          {priceErr && <p className="text-[11px] text-red-500 font-semibold mt-0.5">{priceErr}</p>}
        </div>
        <div className="col-span-2">
          <label className="field-label">Görsel</label>
          <ImagePicker value={image} onChange={setImage} />
        </div>
      </div>
      <div className="flex gap-2 pt-1">
        <button type="button" onClick={save}
          className="flex-1 py-2 rounded-xl font-black text-sm text-white"
          style={{ backgroundColor: "#65a6db" }}>
          Kaydet
        </button>
        <button type="button" onClick={() => onDone("")}
          className="flex-1 py-2 rounded-xl font-black text-sm border-2 border-border bg-white hover:bg-muted">
          İptal
        </button>
      </div>
    </div>
  );
}

// ─── Add Product Modal ────────────────────────────────────────────────────────
function AddProductModal({ onSave, onClose, existingSlugs }: {
  onSave: (p: ExtraProduct) => void; onClose: () => void; existingSlugs: Set<string>;
}) {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [retailPrice, setRetailPrice] = useState("");
  const [description, setDescription] = useState("");
  const [weight, setWeight] = useState("");
  const [foldType, setFoldType] = useState("");
  const [seatPositions, setSeatPositions] = useState("");
  const [maxChildWeight, setMaxChildWeight] = useState("");
  const [image, setImage] = useState("stroller-1");
  const [color, setColor] = useState("");
  const [colorHex, setColorHex] = useState("#888888");
  const [condition, setCondition] = useState<ConditionGrade>("Unopened");
  const [year, setYear] = useState(String(new Date().getFullYear()));
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState(1);
  const [err, setErr] = useState<Record<string, string>>({});

  function save() {
    const e: Record<string, string> = {};
    if (!brand.trim()) e.brand = "Marka zorunludur.";
    if (!model.trim()) e.model = "Model zorunludur.";
    if (!retailPrice.trim()) e.retailPrice = "Perakende fiyatı zorunludur.";
    if (!color.trim()) e.color = "Renk adı zorunludur.";
    if (!price.trim()) e.price = "Fiyat zorunludur.";
    else if (isNaN(parseFloat(price.replace(/[^0-9.]/g, "")))) e.price = "Geçerli fiyat girin.";
    const slug = slugify(`${brand.trim()}-${model.trim()}`);
    if (existingSlugs.has(slug)) e.model = "Bu marka/model zaten mevcut.";
    if (Object.keys(e).length) { setErr(e); return; }

    const slug2 = slugify(`${brand.trim()}-${model.trim()}`);
    const pNum = parseFloat(price.replace(/[^0-9.]/g, ""));
    onSave({
      slug: slug2, brand: brand.trim(), model: model.trim(),
      retailPrice: retailPrice.trim().startsWith("€") ? retailPrice.trim() : `€${retailPrice.trim()}`,
      description: description.trim(), weight: weight.trim(),
      foldType: foldType.trim(), seatPositions: seatPositions.trim(), maxChildWeight: maxChildWeight.trim(),
      renewalChecks: [], included: [], highlights: [],
      image,
      variants: [{
        id: genId(), productSlug: slug2,
        color: color.trim(), colorHex, condition,
        year: year || String(new Date().getFullYear()),
        price: `€${pNum}`, priceNum: pNum, stock, image,
      }],
    });
  }

  const fi = (k: string) => err[k] ? " border-red-400" : "";
  const fe = (k: string) => err[k] ? <p className="text-[11px] text-red-500 font-semibold mt-0.5">{err[k]}</p> : null;

  return (
    <PortalModal title="Yeni Ürün Ekle" subtitle="Ürün bilgileri ve ilk varyant" onClose={onClose}>
      <div className="space-y-3">
        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Ürün Bilgileri</p>
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label className="field-label">Marka *</label>
            <input className={`field${fi("brand")}`} value={brand} placeholder="Bugaboo"
              onChange={e => { setBrand(e.target.value); setErr(p => ({ ...p, brand: "" })); }} />
            {fe("brand")}
          </div>
          <div>
            <label className="field-label">Model *</label>
            <input className={`field${fi("model")}`} value={model} placeholder="Fox 5"
              onChange={e => { setModel(e.target.value); setErr(p => ({ ...p, model: "" })); }} />
            {fe("model")}
          </div>
          <div>
            <label className="field-label">Perakende Fiyatı *</label>
            <input className={`field${fi("retailPrice")}`} value={retailPrice} placeholder="€1.200"
              onChange={e => { setRetailPrice(e.target.value); setErr(p => ({ ...p, retailPrice: "" })); }} />
            {fe("retailPrice")}
          </div>
          <div>
            <label className="field-label">Ağırlık</label>
            <input className="field" value={weight} placeholder="10 kg" onChange={e => setWeight(e.target.value)} />
          </div>
          <div className="col-span-2">
            <label className="field-label">Açıklama</label>
            <textarea className="field resize-none" rows={2} value={description} placeholder="Kısa açıklama…"
              onChange={e => setDescription(e.target.value)} />
          </div>
          <div>
            <label className="field-label">Katlama Tipi</label>
            <input className="field" value={foldType} onChange={e => setFoldType(e.target.value)} placeholder="Tek elle" />
          </div>
          <div>
            <label className="field-label">Koltuk Pozisyonu</label>
            <input className="field" value={seatPositions} onChange={e => setSeatPositions(e.target.value)} placeholder="İleri & geri" />
          </div>
          <div>
            <label className="field-label">Maks. Ağırlık</label>
            <input className="field" value={maxChildWeight} onChange={e => setMaxChildWeight(e.target.value)} placeholder="22 kg" />
          </div>
          <div className="col-span-2">
            <label className="field-label">Görsel</label>
            <ImagePicker value={image} onChange={setImage} />
          </div>
        </div>
        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground pt-1">İlk Varyant</p>
        <div className="grid grid-cols-2 gap-2.5">
          <div className="col-span-2">
            <label className="field-label">Renk Adı *</label>
            <input className={`field${fi("color")}`} value={color} placeholder="ör. Gece Siyahı"
              onChange={e => { setColor(e.target.value); setErr(p => ({ ...p, color: "" })); }} />
            {fe("color")}
          </div>
          <div>
            <label className="field-label">Renk Kodu</label>
            <div className="flex gap-1.5 items-center">
              <input type="color" value={colorHex} onChange={e => setColorHex(e.target.value)}
                className="w-9 h-9 rounded-lg border border-border cursor-pointer shrink-0" />
              <input className="field" value={colorHex} onChange={e => setColorHex(e.target.value)} />
            </div>
          </div>
          <div>
            <label className="field-label">Durum</label>
            <select className="field" value={condition} onChange={e => setCondition(e.target.value as ConditionGrade)}>
              {CONDITION_ORDER.map(c => <option key={c} value={c}>{conditionMeta[c].label}</option>)}
            </select>
          </div>
          <div>
            <label className="field-label">Yıl</label>
            <input className="field" value={year} onChange={e => setYear(e.target.value)} placeholder="2024" />
          </div>
          <div>
            <label className="field-label">Fiyat (€) *</label>
            <input className={`field${fi("price")}`} value={price} placeholder="450"
              onChange={e => { setPrice(e.target.value); setErr(p => ({ ...p, price: "" })); }} />
            {fe("price")}
          </div>
          <div>
            <label className="field-label">Stok</label>
            <input type="number" min={0} className="field" value={stock}
              onChange={e => setStock(Math.max(0, Number(e.target.value)))} />
          </div>
        </div>
        <div className="flex gap-2 pt-2">
          <button type="button" onClick={save}
            className="flex-1 py-2.5 rounded-xl font-black text-sm text-white"
            style={{ backgroundColor: "#65a6db" }}>
            Ürünü Ekle
          </button>
          <button type="button" onClick={onClose}
            className="flex-1 py-2.5 rounded-xl font-black text-sm border-2 border-border hover:bg-muted">
            İptal
          </button>
        </div>
      </div>
    </PortalModal>
  );
}

// ─── Variant Row ──────────────────────────────────────────────────────────────
function VariantRow({ variant, isExtra, onUpdateStock, onUpdatePrice, onDelete, onHide, onUnhide }: {
  variant: ProductVariant; isExtra: boolean;
  onUpdateStock: (s: number) => void; onUpdatePrice: (p: string, pn: number) => void;
  onDelete: () => void; onHide: () => void; onUnhide: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [sv, setSv] = useState(String(variant.stock));
  const [pv, setPv] = useState(String(variant.priceNum));
  const cm = conditionMeta[variant.condition];

  function save() {
    onUpdateStock(Math.max(0, parseInt(sv) || 0));
    onUpdatePrice(`€${parseFloat(pv) || variant.priceNum}`, parseFloat(pv) || variant.priceNum);
    setEditing(false);
  }

  return (
    <tr className="border-t border-border hover:bg-gray-50/40">
      <td className="px-3 py-2.5">
        <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full"
          style={{ backgroundColor: cm.bg, color: cm.color }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cm.color }} />
          {cm.label}
        </span>
      </td>
      <td className="px-3 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full border border-white shadow shrink-0" style={{ backgroundColor: variant.colorHex }} />
          <span className="text-xs font-medium truncate max-w-[90px]">{variant.color}</span>
        </div>
      </td>
      <td className="px-3 py-2.5 text-xs text-muted-foreground">{variant.year}</td>
      <td className="px-3 py-2.5">
        {editing
          ? <input type="number" min={0} value={sv} onChange={e => setSv(e.target.value)} autoFocus
              className="w-14 text-xs font-bold border-2 border-[#65a6db] rounded-lg px-2 py-1 outline-none" />
          : <span className={`text-xs font-black px-2 py-0.5 rounded-full ${variant.stock === 0 ? "bg-red-100 text-red-600" : variant.stock === 1 ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}>
              {variant.stock === 0 ? "Yok" : `${variant.stock}`}
            </span>}
      </td>
      <td className="px-3 py-2.5">
        {editing
          ? <div className="flex items-center gap-0.5">
              <span className="text-xs text-muted-foreground">€</span>
              <input type="number" min={0} value={pv} onChange={e => setPv(e.target.value)}
                className="w-16 text-xs font-bold border-2 border-[#f6ab78] rounded-lg px-2 py-1 outline-none" />
            </div>
          : <span className="text-sm font-black" style={{ color: "#f6ab78" }}>{variant.price}</span>}
      </td>
      <td className="px-3 py-2.5">
        <div className="flex items-center gap-0.5">
          {editing ? (
            <>
              <button onClick={save} className="p-1.5 rounded-lg bg-green-100 text-green-600 hover:bg-green-200"><Check className="w-3.5 h-3.5" /></button>
              <button onClick={() => { setSv(String(variant.stock)); setPv(String(variant.priceNum)); setEditing(false); }}
                className="p-1.5 rounded-lg bg-gray-100 text-gray-500"><X className="w-3.5 h-3.5" /></button>
            </>
          ) : (
            <>
              <button onClick={() => setEditing(true)} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground" title="Düzenle">
                <Pencil className="w-3.5 h-3.5" />
              </button>
              {isExtra
                ? <button onClick={onDelete} className="p-1.5 rounded-lg hover:bg-red-100 text-muted-foreground hover:text-red-500" title="Sil">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                : <button onClick={onHide} className="p-1.5 rounded-lg hover:bg-yellow-100 text-muted-foreground hover:text-yellow-600" title="Gizle">
                    <EyeOff className="w-3.5 h-3.5" />
                  </button>}
            </>
          )}
        </div>
      </td>
    </tr>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────
function ProductCard({ product, isExtra, onDelete, onToast }: {
  product: Product; isExtra: boolean; onDelete?: () => void; onToast: (m: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [adding, setAdding] = useState(false);
  const { updateVariant, addExtraVariant, deleteExtraVariant, hideVariant, unhideVariant, storeData } = useProductStore();

  const extraIds = useMemo(() => new Set(storeData.extraVariants.map(ev => ev.id)), [storeData]);
  const inStock = product.variants.filter(v => v.stock > 0).length;
  const best = product.variants[0];

  return (
    <div className={`bg-white rounded-2xl border-2 overflow-hidden transition-colors ${open ? "border-[#65a6db]" : "border-border"}`}>
      {/* Header */}
      <div className="flex items-center gap-4 p-4 cursor-pointer select-none" onClick={() => { setOpen(o => !o); if (open) setAdding(false); }}>
        <div className="w-14 h-14 rounded-xl bg-gray-50 overflow-hidden shrink-0">
          {best && <img src={best.image} alt="" className="w-full h-full object-contain p-1" />}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-black uppercase tracking-widest" style={{ color: "#65a6db" }}>{product.brand}</p>
          <p className="font-black truncate">{product.model}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-black">{product.variants.length} varyant</p>
            <p className={`text-xs font-bold ${inStock === 0 ? "text-red-500" : "text-green-600"}`}>{inStock} stokta</p>
          </div>
          {isExtra && onDelete && (
            <button onClick={e => { e.stopPropagation(); if (confirm("Ürünü sil?")) onDelete(); }}
              className="p-1.5 rounded-lg hover:bg-red-100 text-muted-foreground hover:text-red-500">
              <Trash2 className="w-4 h-4" />
            </button>
          )}
          <div className="text-muted-foreground">
            {open ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </div>
        </div>
      </div>

      {/* Body */}
      {open && (
        <div className="border-t border-border">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[500px]">
              <thead>
                <tr className="bg-gray-50">
                  {["Durum", "Renk", "Yıl", "Stok", "Fiyat", ""].map(h => (
                    <th key={h} className="px-3 py-2 text-left text-[10px] font-black uppercase tracking-widest text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {product.variants.map(v => (
                  <VariantRow key={v.id} variant={v} isExtra={extraIds.has(v.id)}
                    onUpdateStock={s => updateVariant(v.id, { stock: s })}
                    onUpdatePrice={(p, pn) => updateVariant(v.id, { price: p, priceNum: pn })}
                    onDelete={() => { deleteExtraVariant(v.id); onToast("Varyant silindi."); }}
                    onHide={() => { hideVariant(v.id); onToast("Varyant gizlendi."); }}
                    onUnhide={() => unhideVariant(v.id)}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* Hidden variant restore list */}
          {storeData.hiddenVariants
            .filter(hid => {
              const ev = storeData.extraVariants.find(x => x.id === hid);
              return ev ? ev.productSlug === product.slug : true;
            })
            .length > 0 && (
            <div className="px-4 py-2 bg-gray-50 border-t border-border">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Gizli Varyantlar</p>
              <div className="flex flex-wrap gap-1.5">
                {storeData.hiddenVariants
                  .filter(hid => {
                    const ev = storeData.extraVariants.find(x => x.id === hid);
                    return ev ? ev.productSlug === product.slug : true;
                  })
                  .map(hid => (
                    <button key={hid} onClick={() => unhideVariant(hid)}
                      className="text-[11px] font-semibold px-2 py-1 rounded-lg bg-white border border-border hover:border-[#65a6db] flex items-center gap-1">
                      <Eye className="w-3 h-3" /> Geri Al
                    </button>
                  ))}
              </div>
            </div>
          )}

          {/* Add variant toggle */}
          {!adding && (
            <div className="p-3 border-t border-border">
              <button type="button" onClick={() => setAdding(true)}
                className="inline-flex items-center gap-1.5 text-xs font-black px-3 py-2 rounded-xl"
                style={{ backgroundColor: "#65a6db18", color: "#3d7fb5" }}>
                <Plus className="w-3.5 h-3.5" /> Varyant Ekle
              </button>
            </div>
          )}

          {/* Inline add variant form */}
          {adding && (
            <InlineAddVariant
              productSlug={product.slug}
              addExtraVariant={addExtraVariant}
              onDone={msg => { setAdding(false); if (msg) onToast(msg); }}
            />
          )}
        </div>
      )}
    </div>
  );
}

// ─── Admin Page ───────────────────────────────────────────────────────────────
export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(SESSION_KEY) === "1");
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const { products, storeData, addExtraProduct, deleteExtraProduct, resetAll } = useProductStore();

  const extraSlugs = useMemo(() => new Set(storeData.extraProducts.map(p => p.slug)), [storeData]);
  const allSlugs = useMemo(() => new Set(products.map(p => p.slug)), [products]);

  const stats = useMemo(() => {
    const all = products.flatMap(p => p.variants);
    const overrides = Object.keys(storeData.variantOverrides).length + storeData.extraVariants.length + storeData.extraProducts.length + storeData.hiddenVariants.length;
    return { total: all.length, inStock: all.filter(v => v.stock > 0).length, overrides };
  }, [products, storeData]);

  function showToast(msg: string) { setToast(null); setTimeout(() => setToast(msg), 30); }

  if (!authed) return <PasswordGate onAuth={() => setAuthed(true)} />;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f8f9fc" }}>
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-border shadow-sm">
        <div className="max-w-5xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Link href="/" className="text-lg font-black">Tam<span style={{ color: "#f6ab78" }}>Bebe</span>.</Link>
            <span className="text-xs font-black px-2.5 py-1 rounded-full text-white" style={{ backgroundColor: "#65a6db" }}>Admin</span>
          </div>
          <div className="flex items-center gap-1">
            <Link href="/" className="text-xs font-bold text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-lg hover:bg-muted">Siteyi Gör</Link>
            <button onClick={() => { sessionStorage.removeItem(SESSION_KEY); setAuthed(false); }}
              className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground px-3 py-1.5 rounded-lg hover:bg-muted">
              <LogOut className="w-3.5 h-3.5" /> Çıkış
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 md:px-6 py-8 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Toplam Ürün", v: products.length, icon: Package, color: "#65a6db" },
            { label: "Stokta", v: `${stats.inStock}/${stats.total}`, icon: ShieldCheck, color: "#059669" },
            { label: "Değişiklik", v: stats.overrides, icon: Pencil, color: "#f6ab78" },
          ].map(({ label, v, icon: Icon, color }) => (
            <div key={label} className="bg-white rounded-2xl border border-border p-3 md:p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: color + "18" }}>
                <Icon className="w-4 h-4" style={{ color }} />
              </div>
              <div>
                <p className="text-lg font-black leading-tight">{v}</p>
                <p className="text-[11px] font-semibold text-muted-foreground">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Low stock warning */}
        {products.flatMap(p => p.variants).some(v => v.stock === 0) && (
          <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3">
            <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
            <p className="text-sm font-semibold text-amber-700">
              {products.flatMap(p => p.variants).filter(v => v.stock === 0).length} varyant stokta yok.
            </p>
          </div>
        )}

        {/* Product list */}
        <div>
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <h2 className="text-xl font-black">Ürünler & Stok</h2>
            <div className="flex gap-2">
              {stats.overrides > 0 && (
                <button onClick={() => setConfirmReset(true)}
                  className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl border-2 border-red-200 text-red-500 hover:bg-red-50">
                  <RotateCcw className="w-3.5 h-3.5" /> Sıfırla
                </button>
              )}
              <button onClick={() => setShowAddProduct(true)}
                className="flex items-center gap-1.5 text-xs font-black px-4 py-2 rounded-xl text-white"
                style={{ backgroundColor: "#f6ab78" }}>
                <Plus className="w-3.5 h-3.5" /> Yeni Ürün
              </button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground font-medium mb-3">
            Ürüne tıkla → Varyantları gör → Kalem = düzenle · Göz = gizle · Çöp = sil
          </p>
          <div className="space-y-3">
            {products.map(p => (
              <ProductCard key={p.slug} product={p} isExtra={extraSlugs.has(p.slug)}
                onDelete={() => { deleteExtraProduct(p.slug); showToast("Ürün silindi."); }}
                onToast={showToast}
              />
            ))}
          </div>
        </div>
      </main>

      {/* New product modal */}
      {showAddProduct && (
        <AddProductModal
          existingSlugs={allSlugs}
          onSave={p => { addExtraProduct(p); setShowAddProduct(false); showToast(`"${p.brand} ${p.model}" eklendi ✓`); }}
          onClose={() => setShowAddProduct(false)}
        />
      )}

      {/* Reset confirm */}
      {confirmReset && (
        <PortalModal title="Tüm değişiklikler sıfırlansın mı?" onClose={() => setConfirmReset(false)}>
          <p className="text-sm text-muted-foreground font-medium mb-5 mt-2">
            Stok düzenlemeleri, eklenen varyantlar, ürünler ve gizlenenler silinecek. Geri alınamaz.
          </p>
          <div className="flex gap-3">
            <button onClick={() => { resetAll(); setConfirmReset(false); showToast("Tüm değişiklikler sıfırlandı."); }}
              className="flex-1 py-2.5 rounded-xl font-black text-sm text-white bg-red-500 hover:bg-red-600">Sıfırla</button>
            <button onClick={() => setConfirmReset(false)}
              className="flex-1 py-2.5 rounded-xl font-black text-sm border-2 border-border hover:bg-muted">İptal</button>
          </div>
        </PortalModal>
      )}

      {/* Toast */}
      <AnimatePresence>
        {toast && <Toast key={toast} msg={toast} onDone={() => setToast(null)} />}
      </AnimatePresence>
    </div>
  );
}
