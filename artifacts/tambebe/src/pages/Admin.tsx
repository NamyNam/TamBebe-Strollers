import { useState, useMemo, useRef } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck, LogOut, RotateCcw, Plus, Pencil, Trash2, Check, X,
  ChevronDown, ChevronRight, Package, AlertTriangle,
  Eye, EyeOff, ImagePlus, CheckCircle2, EyeOff as HideIcon,
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
  return `v-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ── Image Picker ─────────────────────────────────────────────────────────────
function ImagePicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const isCustom = value.startsWith("data:") || value.startsWith("http");

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try { onChange(await fileToBase64(file)); } finally { setUploading(false); }
    e.target.value = "";
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        {IMAGE_OPTIONS.map((opt) => (
          <button key={opt.key} type="button" onClick={() => onChange(opt.key)}
            className={`flex-1 rounded-xl border-2 overflow-hidden transition-all ${value === opt.key ? "border-[#65a6db] shadow-sm" : "border-border hover:border-gray-300"}`}>
            <img src={opt.src} alt={opt.label} className="w-full h-14 object-contain p-1 bg-gray-50" />
          </button>
        ))}
        <button type="button" onClick={() => inputRef.current?.click()}
          className={`flex-1 rounded-xl border-2 overflow-hidden flex flex-col items-center justify-center gap-1 py-2 transition-all ${isCustom ? "border-[#f6ab78]" : "border-dashed border-gray-300 hover:border-[#f6ab78] hover:bg-orange-50"}`}>
          {isCustom
            ? <img src={resolveImage(value)} alt="Custom" className="w-full h-14 object-contain p-1" />
            : <><ImagePlus className="w-4 h-4 text-muted-foreground" /><span className="text-[9px] font-black text-muted-foreground">Yükle</span></>}
        </button>
      </div>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      {uploading && <p className="text-xs text-[#65a6db] font-semibold">Yükleniyor…</p>}
      {isCustom && (
        <p className="text-xs text-green-600 font-semibold flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3" /> Kendi görseliniz seçili —{" "}
          <button type="button" onClick={() => onChange("stroller-1")} className="underline text-muted-foreground">Kaldır</button>
        </p>
      )}
    </div>
  );
}

// ── Modal wrapper ─────────────────────────────────────────────────────────────
function Modal({ title, subtitle, onClose, children }: {
  title: string; subtitle?: string; onClose: () => void; children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center p-4 pt-8 overflow-y-auto"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg relative mb-8">
        <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-muted z-10">
          <X className="w-4 h-4" />
        </button>
        <div className="p-6">
          <h2 className="text-lg font-black pr-8">{title}</h2>
          {subtitle && <p className="text-xs text-muted-foreground font-medium mt-0.5 mb-4">{subtitle}</p>}
          {children}
        </div>
      </div>
    </div>
  );
}

// ── Toast ─────────────────────────────────────────────────────────────────────
function Toast({ message, onDone }: { message: string; onDone: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }}
      onAnimationComplete={() => setTimeout(onDone, 2200)}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-2.5 bg-gray-900 text-white text-sm font-semibold px-5 py-3 rounded-full shadow-xl whitespace-nowrap">
      <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />{message}
    </motion.div>
  );
}

// ── Password Gate ─────────────────────────────────────────────────────────────
function PasswordGate({ onAuth }: { onAuth: () => void }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) { sessionStorage.setItem(SESSION_KEY, "1"); onAuth(); }
    else { setError(true); setPw(""); }
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
              <input type={show ? "text" : "password"} value={pw} onChange={e => { setPw(e.target.value); setError(false); }}
                placeholder="Şifre" autoFocus autoComplete="current-password"
                className={`w-full px-4 py-3 rounded-xl border-2 text-sm font-semibold outline-none transition-colors pr-11 ${error ? "border-red-400 bg-red-50" : "border-border focus:border-[#65a6db]"}`} />
              <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground p-1">
                {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {error && <p className="text-xs text-red-500 font-semibold">Yanlış şifre.</p>}
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

// ── Add Variant Modal ─────────────────────────────────────────────────────────
function AddVariantModal({ productSlug, productBrand, productModel, onSave, onClose }: {
  productSlug: string; productBrand: string; productModel: string;
  onSave: (v: ExtraVariant) => void; onClose: () => void;
}) {
  const [color, setColor] = useState("");
  const [colorHex, setColorHex] = useState("#888888");
  const [condition, setCondition] = useState<ConditionGrade>("Unopened");
  const [year, setYear] = useState(String(new Date().getFullYear()));
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState(1);
  const [image, setImage] = useState("stroller-1");
  const [err, setErr] = useState<Record<string, string>>({});

  function doSave() {
    const e: Record<string, string> = {};
    if (!color.trim()) e.color = "Renk adı zorunludur.";
    if (!price.trim()) e.price = "Fiyat zorunludur.";
    else if (isNaN(parseFloat(price.replace(/[^0-9.]/g, "")))) e.price = "Geçerli fiyat girin.";
    if (Object.keys(e).length) { setErr(e); return; }

    const priceNum = parseFloat(price.replace(/[^0-9.]/g, ""));
    onSave({
      id: genId(),
      productSlug,
      color: color.trim(),
      colorHex,
      condition,
      year: year.trim() || String(new Date().getFullYear()),
      price: `€${priceNum}`,
      priceNum,
      stock,
      image,
    });
  }

  const fi = (k: string) => err[k] ? " border-red-400" : "";

  return (
    <Modal title={`${productBrand} ${productModel}`} subtitle="Yeni varyant ekle" onClose={onClose}>
      <div className="space-y-3 mt-2">
        <div>
          <label className="field-label">Renk Adı *</label>
          <input className={`field${fi("color")}`} value={color} placeholder="ör. Gece Siyahı / Alüminyum"
            onChange={e => { setColor(e.target.value); setErr(p => ({ ...p, color: "" })); }} />
          {err.color && <p className="text-xs text-red-500 font-semibold mt-1">{err.color}</p>}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="field-label">Renk Kodu</label>
            <div className="flex gap-2 items-center">
              <input type="color" value={colorHex} onChange={e => setColorHex(e.target.value)}
                className="w-9 h-9 rounded-lg border border-border cursor-pointer shrink-0" />
              <input className="field" value={colorHex} onChange={e => setColorHex(e.target.value)} />
            </div>
          </div>
          <div>
            <label className="field-label">Yıl</label>
            <input className="field" value={year} placeholder="2024" onChange={e => setYear(e.target.value)} />
          </div>
          <div>
            <label className="field-label">Durum</label>
            <select className="field" value={condition} onChange={e => setCondition(e.target.value as ConditionGrade)}>
              {CONDITION_ORDER.map(c => <option key={c} value={c}>{conditionMeta[c].label}</option>)}
            </select>
          </div>
          <div>
            <label className="field-label">Stok</label>
            <input type="number" min={0} className="field" value={stock}
              onChange={e => setStock(Math.max(0, Number(e.target.value)))} />
          </div>
          <div className="col-span-2">
            <label className="field-label">Fiyat (€) *</label>
            <input className={`field${fi("price")}`} value={price} placeholder="450"
              onChange={e => { setPrice(e.target.value); setErr(p => ({ ...p, price: "" })); }} />
            {err.price && <p className="text-xs text-red-500 font-semibold mt-1">{err.price}</p>}
          </div>
        </div>
        <div>
          <label className="field-label">Görsel</label>
          <ImagePicker value={image} onChange={setImage} />
        </div>
        <div className="flex gap-2 pt-2">
          <button type="button" onClick={doSave}
            className="flex-1 py-2.5 rounded-xl font-black text-sm text-white"
            style={{ backgroundColor: "#65a6db" }}>
            Kaydet
          </button>
          <button type="button" onClick={onClose}
            className="flex-1 py-2.5 rounded-xl font-black text-sm border-2 border-border hover:bg-muted">
            İptal
          </button>
        </div>
      </div>
    </Modal>
  );
}

// ── Add Product Modal ─────────────────────────────────────────────────────────
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

  function doSave() {
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
    const priceNum = parseFloat(price.replace(/[^0-9.]/g, ""));
    onSave({
      slug: slug2,
      brand: brand.trim(), model: model.trim(),
      retailPrice: retailPrice.trim().startsWith("€") ? retailPrice.trim() : `€${retailPrice.trim()}`,
      description: description.trim(), weight: weight.trim(),
      foldType: foldType.trim(), seatPositions: seatPositions.trim(),
      maxChildWeight: maxChildWeight.trim(),
      renewalChecks: [], included: [], highlights: [],
      image,
      variants: [{
        id: genId(), productSlug: slug2,
        color: color.trim(), colorHex, condition,
        year: year.trim() || String(new Date().getFullYear()),
        price: `€${priceNum}`, priceNum, stock, image,
      }],
    });
  }

  const fi = (k: string) => err[k] ? " border-red-400" : "";

  return (
    <Modal title="Yeni Ürün Ekle" subtitle="Ürün bilgileri ve ilk varyant" onClose={onClose}>
      <div className="space-y-3 mt-2">
        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Ürün Bilgileri</p>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="field-label">Marka *</label>
            <input className={`field${fi("brand")}`} value={brand} placeholder="Bugaboo"
              onChange={e => { setBrand(e.target.value); setErr(p => ({ ...p, brand: "" })); }} />
            {err.brand && <p className="text-xs text-red-500 font-semibold mt-1">{err.brand}</p>}
          </div>
          <div>
            <label className="field-label">Model *</label>
            <input className={`field${fi("model")}`} value={model} placeholder="Fox 5"
              onChange={e => { setModel(e.target.value); setErr(p => ({ ...p, model: "" })); }} />
            {err.model && <p className="text-xs text-red-500 font-semibold mt-1">{err.model}</p>}
          </div>
          <div>
            <label className="field-label">Perakende Fiyatı *</label>
            <input className={`field${fi("retailPrice")}`} value={retailPrice} placeholder="€1.200"
              onChange={e => { setRetailPrice(e.target.value); setErr(p => ({ ...p, retailPrice: "" })); }} />
            {err.retailPrice && <p className="text-xs text-red-500 font-semibold mt-1">{err.retailPrice}</p>}
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
            <input className="field" value={foldType} placeholder="Tek elle kompakt" onChange={e => setFoldType(e.target.value)} />
          </div>
          <div>
            <label className="field-label">Koltuk Pozisyonu</label>
            <input className="field" value={seatPositions} placeholder="İleri & ebeveyne dönük" onChange={e => setSeatPositions(e.target.value)} />
          </div>
          <div>
            <label className="field-label">Maks. Çocuk Ağırlığı</label>
            <input className="field" value={maxChildWeight} placeholder="22 kg" onChange={e => setMaxChildWeight(e.target.value)} />
          </div>
          <div className="col-span-2">
            <label className="field-label">Görsel</label>
            <ImagePicker value={image} onChange={setImage} />
          </div>
        </div>

        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground pt-1">İlk Varyant</p>
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2">
            <label className="field-label">Renk Adı *</label>
            <input className={`field${fi("color")}`} value={color} placeholder="ör. Gece Siyahı"
              onChange={e => { setColor(e.target.value); setErr(p => ({ ...p, color: "" })); }} />
            {err.color && <p className="text-xs text-red-500 font-semibold mt-1">{err.color}</p>}
          </div>
          <div>
            <label className="field-label">Renk Kodu</label>
            <div className="flex gap-2 items-center">
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
            <input className="field" value={year} placeholder="2024" onChange={e => setYear(e.target.value)} />
          </div>
          <div>
            <label className="field-label">Fiyat (€) *</label>
            <input className={`field${fi("price")}`} value={price} placeholder="450"
              onChange={e => { setPrice(e.target.value); setErr(p => ({ ...p, price: "" })); }} />
            {err.price && <p className="text-xs text-red-500 font-semibold mt-1">{err.price}</p>}
          </div>
          <div>
            <label className="field-label">Stok</label>
            <input type="number" min={0} className="field" value={stock}
              onChange={e => setStock(Math.max(0, Number(e.target.value)))} />
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <button type="button" onClick={doSave}
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
    </Modal>
  );
}

// ── Variant Row ───────────────────────────────────────────────────────────────
function VariantRow({ variant, isExtra, isHidden, onUpdateStock, onUpdatePrice, onDelete, onHide, onUnhide }: {
  variant: ProductVariant;
  isExtra: boolean;
  isHidden: boolean;
  onUpdateStock: (s: number) => void;
  onUpdatePrice: (p: string, pn: number) => void;
  onDelete: () => void;
  onHide: () => void;
  onUnhide: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [stockVal, setStockVal] = useState(String(variant.stock));
  const [priceVal, setPriceVal] = useState(String(variant.priceNum));
  const cm = conditionMeta[variant.condition];

  function save() {
    onUpdateStock(Math.max(0, parseInt(stockVal) || 0));
    onUpdatePrice(`€${parseFloat(priceVal) || variant.priceNum}`, parseFloat(priceVal) || variant.priceNum);
    setEditing(false);
  }

  if (isHidden) {
    return (
      <tr className="border-t border-border bg-gray-50 opacity-50">
        <td colSpan={5} className="px-3 py-2 text-xs text-muted-foreground font-medium italic">
          {variant.color} — {cm.label} — gizli
        </td>
        <td className="px-3 py-2">
          <button onClick={onUnhide} className="text-xs font-bold text-[#65a6db] hover:underline">Geri Al</button>
        </td>
      </tr>
    );
  }

  return (
    <tr className="border-t border-border hover:bg-gray-50/50 transition-colors">
      <td className="px-3 py-2.5">
        <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full"
          style={{ backgroundColor: cm.bg, color: cm.color }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cm.color }} />
          {cm.label}
        </span>
      </td>
      <td className="px-3 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 rounded-full border border-white shadow-sm shrink-0" style={{ backgroundColor: variant.colorHex }} />
          <span className="text-xs font-medium truncate max-w-[100px]">{variant.color}</span>
        </div>
      </td>
      <td className="px-3 py-2.5 text-xs text-muted-foreground font-medium">{variant.year}</td>
      <td className="px-3 py-2.5">
        {editing
          ? <input type="number" min={0} value={stockVal} onChange={e => setStockVal(e.target.value)}
              className="w-16 text-xs font-bold border-2 border-[#65a6db] rounded-lg px-2 py-1 outline-none" autoFocus />
          : <span className={`text-xs font-black px-2 py-0.5 rounded-full ${variant.stock === 0 ? "bg-red-100 text-red-600" : variant.stock === 1 ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}>
              {variant.stock === 0 ? "Yok" : `${variant.stock} adet`}
            </span>}
      </td>
      <td className="px-3 py-2.5">
        {editing
          ? <div className="flex items-center gap-1">
              <span className="text-xs font-bold text-muted-foreground">€</span>
              <input type="number" min={0} value={priceVal} onChange={e => setPriceVal(e.target.value)}
                className="w-20 text-xs font-bold border-2 border-[#f6ab78] rounded-lg px-2 py-1 outline-none" />
            </div>
          : <span className="text-sm font-black" style={{ color: "#f6ab78" }}>{variant.price}</span>}
      </td>
      <td className="px-3 py-2.5">
        <div className="flex items-center gap-1">
          {editing ? (
            <>
              <button onClick={save} className="p-1.5 rounded-lg bg-green-100 text-green-600 hover:bg-green-200" title="Kaydet"><Check className="w-3.5 h-3.5" /></button>
              <button onClick={() => { setStockVal(String(variant.stock)); setPriceVal(String(variant.priceNum)); setEditing(false); }}
                className="p-1.5 rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200" title="İptal"><X className="w-3.5 h-3.5" /></button>
            </>
          ) : (
            <>
              <button onClick={() => setEditing(true)} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground" title="Düzenle"><Pencil className="w-3.5 h-3.5" /></button>
              {isExtra
                ? <button onClick={onDelete} className="p-1.5 rounded-lg hover:bg-red-100 text-muted-foreground hover:text-red-500" title="Sil"><Trash2 className="w-3.5 h-3.5" /></button>
                : <button onClick={onHide} className="p-1.5 rounded-lg hover:bg-yellow-100 text-muted-foreground hover:text-yellow-600" title="Gizle"><HideIcon className="w-3.5 h-3.5" /></button>}
            </>
          )}
        </div>
      </td>
    </tr>
  );
}

// ── Product Card ──────────────────────────────────────────────────────────────
function ProductCard({ product, isExtra, onAddVariant, onDeleteProduct }: {
  product: Product; isExtra: boolean; onAddVariant: () => void; onDeleteProduct?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const { updateVariant, deleteExtraVariant, hideVariant, unhideVariant, storeData } = useProductStore();

  const extraVariantIds = useMemo(() => new Set(storeData.extraVariants.map(ev => ev.id)), [storeData]);
  const hiddenSet = useMemo(() => new Set(storeData.hiddenVariants), [storeData]);

  const allVariantIds = useMemo(() => {
    const staticProd = storeData.extraProducts.find(ep => ep.slug === product.slug);
    if (staticProd) return staticProd.variants.map(v => v.id);
    const base = (product as any)._staticVariants as string[] | undefined;
    return [];
  }, [product, storeData]);

  const hiddenVariantsForProduct = useMemo(() => {
    return storeData.hiddenVariants.filter(hid => {
      const inExtra = storeData.extraVariants.find(ev => ev.id === hid && ev.productSlug === product.slug);
      if (inExtra) return true;
      return product.variants.length === 0;
    });
  }, [storeData, product]);

  const inStock = product.variants.filter(v => v.stock > 0).length;
  const bestVariant = product.variants.find(v => v.stock > 0) ?? product.variants[0];

  return (
    <div className={`bg-white rounded-2xl border-2 overflow-hidden transition-all ${open ? "border-[#65a6db]" : "border-border"}`}>
      <div className="flex items-center gap-4 p-4 cursor-pointer select-none" onClick={() => setOpen(!open)}>
        <div className="w-14 h-14 rounded-xl bg-gray-50 overflow-hidden shrink-0 flex items-center justify-center">
          {bestVariant && <img src={bestVariant.image} alt="" className="w-full h-full object-contain p-1" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-xs font-black uppercase tracking-widest" style={{ color: "#65a6db" }}>{product.brand}</p>
            {isExtra && <span className="text-[10px] font-black px-1.5 py-0.5 rounded-full bg-orange-100 text-orange-600">Özel</span>}
          </div>
          <p className="font-black text-foreground truncate">{product.model}</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-black">{product.variants.length} varyant</p>
            <p className={`text-xs font-bold ${inStock === 0 ? "text-red-500" : "text-green-600"}`}>{inStock} stokta</p>
          </div>
          {isExtra && onDeleteProduct && (
            <button onClick={e => { e.stopPropagation(); if (confirm("Bu ürünü silmek istediğinizden emin misiniz?")) onDeleteProduct(); }}
              className="p-1.5 rounded-lg hover:bg-red-100 text-muted-foreground hover:text-red-500">
              <Trash2 className="w-4 h-4" />
            </button>
          )}
          <div className="p-1.5 text-muted-foreground">
            {open ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </div>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
            <div className="border-t border-border">
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[520px]">
                  <thead>
                    <tr className="bg-gray-50">
                      {["Durum", "Renk", "Yıl", "Stok", "Fiyat", ""].map(h => (
                        <th key={h} className="px-3 py-2 text-left text-[10px] font-black uppercase tracking-widest text-muted-foreground">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {product.variants.map(variant => (
                      <VariantRow
                        key={variant.id}
                        variant={variant}
                        isExtra={extraVariantIds.has(variant.id)}
                        isHidden={false}
                        onUpdateStock={s => updateVariant(variant.id, { stock: s })}
                        onUpdatePrice={(p, pn) => updateVariant(variant.id, { price: p, priceNum: pn })}
                        onDelete={() => deleteExtraVariant(variant.id)}
                        onHide={() => hideVariant(variant.id)}
                        onUnhide={() => unhideVariant(variant.id)}
                      />
                    ))}
                    {storeData.hiddenVariants
                      .filter(hid => storeData.extraVariants.find(ev => ev.id === hid && ev.productSlug === product.slug))
                      .map(hid => {
                        const ev = storeData.extraVariants.find(v => v.id === hid)!;
                        const fakeVariant: ProductVariant = {
                          id: ev.id, color: ev.color, colorHex: ev.colorHex,
                          condition: ev.condition, year: ev.year,
                          price: ev.price, priceNum: ev.priceNum, stock: ev.stock,
                          image: resolveImage(ev.image),
                        };
                        return (
                          <VariantRow key={hid} variant={fakeVariant} isExtra isHidden
                            onUpdateStock={s => updateVariant(hid, { stock: s })}
                            onUpdatePrice={(p, pn) => updateVariant(hid, { price: p, priceNum: pn })}
                            onDelete={() => deleteExtraVariant(hid)}
                            onHide={() => hideVariant(hid)}
                            onUnhide={() => unhideVariant(hid)}
                          />
                        );
                      })}
                  </tbody>
                </table>
              </div>
              <div className="p-3 border-t border-border">
                <button type="button" onClick={onAddVariant}
                  className="inline-flex items-center gap-1.5 text-xs font-black px-3 py-2 rounded-xl"
                  style={{ backgroundColor: "#65a6db18", color: "#3d7fb5" }}>
                  <Plus className="w-3.5 h-3.5" /> Varyant Ekle
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Admin Main ────────────────────────────────────────────────────────────────
export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(SESSION_KEY) === "1");
  const [addVariantFor, setAddVariantFor] = useState<{ slug: string; brand: string; model: string } | null>(null);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const { products, storeData, addExtraVariant, addExtraProduct, deleteExtraProduct, resetAll } = useProductStore();

  const extraProductSlugs = useMemo(() => new Set(storeData.extraProducts.map(p => p.slug)), [storeData]);
  const allSlugs = useMemo(() => new Set(products.map(p => p.slug)), [products]);

  const stats = useMemo(() => {
    const all = products.flatMap(p => p.variants);
    const overrideCount = Object.keys(storeData.variantOverrides).length + storeData.extraVariants.length + storeData.extraProducts.length + storeData.hiddenVariants.length;
    return { total: all.length, inStock: all.filter(v => v.stock > 0).length, overrideCount };
  }, [products, storeData]);

  function showToast(msg: string) { setToast(null); setTimeout(() => setToast(msg), 50); }

  if (!authed) return <PasswordGate onAuth={() => setAuthed(true)} />;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f8f9fc" }}>
      <header className="sticky top-0 z-40 bg-white border-b border-border shadow-sm">
        <div className="max-w-5xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Link href="/" className="text-lg font-black">Tam<span style={{ color: "#f6ab78" }}>Bebe</span>.</Link>
            <span className="text-xs font-black px-2.5 py-1 rounded-full text-white" style={{ backgroundColor: "#65a6db" }}>Admin Paneli</span>
          </div>
          <div className="flex items-center gap-1">
            <Link href="/" className="text-xs font-bold text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-lg hover:bg-muted">Siteyi Gör</Link>
            <button onClick={() => { sessionStorage.removeItem(SESSION_KEY); setAuthed(false); }}
              className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-lg hover:bg-muted">
              <LogOut className="w-3.5 h-3.5" /> Çıkış
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 md:px-6 py-8 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { label: "Toplam Ürün", value: products.length, icon: Package, color: "#65a6db" },
            { label: "Stokta Varyant", value: `${stats.inStock}/${stats.total}`, icon: ShieldCheck, color: "#059669" },
            { label: "Özel Değişiklik", value: stats.overrideCount, icon: Pencil, color: "#f6ab78" },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-white rounded-2xl border border-border p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: color + "18" }}>
                <Icon className="w-5 h-5" style={{ color }} />
              </div>
              <div>
                <p className="text-xl font-black leading-tight">{value}</p>
                <p className="text-xs font-semibold text-muted-foreground">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {products.flatMap(p => p.variants).filter(v => v.stock === 0).length > 0 && (
          <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3">
            <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
            <p className="text-sm font-semibold text-amber-700">
              {products.flatMap(p => p.variants).filter(v => v.stock === 0).length} varyant stokta yok.
            </p>
          </div>
        )}

        <div>
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <h2 className="text-xl font-black">Ürünler & Stok</h2>
            <div className="flex gap-2">
              {stats.overrideCount > 0 && (
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
            Ürüne tıklayarak varyantları görün. Kalem = stok/fiyat düzenle · Göz = gizle · Çöp = sil (özel varyantlar).
          </p>
          <div className="space-y-3">
            {products.map(product => (
              <ProductCard
                key={product.slug}
                product={product}
                isExtra={extraProductSlugs.has(product.slug)}
                onAddVariant={() => setAddVariantFor({ slug: product.slug, brand: product.brand, model: product.model })}
                onDeleteProduct={() => { deleteExtraProduct(product.slug); showToast("Ürün silindi."); }}
              />
            ))}
          </div>
        </div>
      </main>

      <AnimatePresence>
        {addVariantFor && (
          <AddVariantModal
            key="add-variant"
            productSlug={addVariantFor.slug}
            productBrand={addVariantFor.brand}
            productModel={addVariantFor.model}
            onSave={v => { addExtraVariant(v); setAddVariantFor(null); showToast(`"${v.color}" varyantı eklendi ✓`); }}
            onClose={() => setAddVariantFor(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAddProduct && (
          <AddProductModal
            key="add-product"
            existingSlugs={allSlugs}
            onSave={p => { addExtraProduct(p); setShowAddProduct(false); showToast(`"${p.brand} ${p.model}" eklendi ✓`); }}
            onClose={() => setShowAddProduct(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {confirmReset && (
          <Modal key="confirm-reset" title="Tüm değişiklikler sıfırlansın mı?" onClose={() => setConfirmReset(false)}>
            <p className="text-sm text-muted-foreground font-medium mb-5 mt-2">
              Stok düzenlemeleri, eklenen varyantlar, ürünler ve gizlenenler silinecek. Geri alınamaz.
            </p>
            <div className="flex gap-3">
              <button type="button" onClick={() => { resetAll(); setConfirmReset(false); showToast("Tüm değişiklikler sıfırlandı."); }}
                className="flex-1 py-2.5 rounded-xl font-black text-sm text-white bg-red-500 hover:bg-red-600">Sıfırla</button>
              <button type="button" onClick={() => setConfirmReset(false)}
                className="flex-1 py-2.5 rounded-xl font-black text-sm border-2 border-border">İptal</button>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && <Toast key="toast" message={toast} onDone={() => setToast(null)} />}
      </AnimatePresence>
    </div>
  );
}
