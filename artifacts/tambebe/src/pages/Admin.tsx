import { useState, useMemo, useCallback, useRef } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck, LogOut, RotateCcw, Plus, Pencil, Trash2, Check, X,
  ChevronDown, ChevronRight, Package, BarChart3, AlertTriangle,
  Eye, EyeOff, ImagePlus, CheckCircle2,
} from "lucide-react";
import {
  useProductStore, IMAGE_OPTIONS, resolveImage,
  type ExtraVariant, type ExtraProduct, type ImageKey,
} from "@/contexts/ProductStore";
import { conditionMeta, CONDITION_ORDER } from "@/data/products";
import type { Product, ProductVariant, ConditionGrade } from "@/data/products";

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "tambebe2024";
const SESSION_KEY = "tambebe_admin_auth";

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
function genId(prefix = "v") {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ── Image Picker ────────────────────────────────────────────────────────────
function ImagePicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const dataUrl = await fileToBase64(file);
      onChange(dataUrl);
    } finally {
      setUploading(false);
    }
  }

  const isCustom = value.startsWith("data:") || value.startsWith("http");
  const previewSrc = value ? resolveImage(value) : null;

  return (
    <div className="space-y-2">
      {/* Preset options */}
      <div className="flex gap-2">
        {IMAGE_OPTIONS.map((opt) => {
          const active = value === opt.key;
          return (
            <button key={opt.key} type="button" onClick={() => onChange(opt.key)}
              className={`flex-1 rounded-xl border-2 overflow-hidden transition-all ${active ? "border-[#65a6db] shadow-sm" : "border-border hover:border-gray-300"}`}>
              <img src={opt.src} alt={opt.label} className="w-full h-16 object-contain p-1.5 bg-gray-50" />
            </button>
          );
        })}
        {/* Upload button */}
        <button type="button" onClick={() => inputRef.current?.click()}
          className={`flex-1 rounded-xl border-2 overflow-hidden transition-all flex flex-col items-center justify-center gap-1 py-2 ${isCustom ? "border-[#f6ab78] shadow-sm bg-orange-50" : "border-dashed border-gray-300 hover:border-[#f6ab78] hover:bg-orange-50"}`}>
          {isCustom && previewSrc ? (
            <img src={previewSrc} alt="Yüklenen" className="w-full h-16 object-contain p-1.5" />
          ) : (
            <>
              <ImagePlus className="w-5 h-5 text-muted-foreground" />
              <span className="text-[10px] font-black text-muted-foreground">Yükle</span>
            </>
          )}
        </button>
      </div>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      {uploading && <p className="text-xs text-[#65a6db] font-semibold">Görsel yükleniyor…</p>}
      {isCustom && (
        <p className="text-xs text-green-600 font-semibold flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3" /> Kendi görseliniz kullanılıyor
          <button type="button" onClick={() => onChange("stroller-1")} className="ml-1 underline text-muted-foreground">Kaldır</button>
        </p>
      )}
    </div>
  );
}

// ── Password Gate ───────────────────────────────────────────────────────────
function PasswordGate({ onAuth }: { onAuth: () => void }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, "1");
      onAuth();
    } else {
      setError(true);
      setPw("");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#f8f9fc" }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm mx-4">
        <div className="bg-white rounded-3xl shadow-xl border border-border p-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl font-black">Tam<span style={{ color: "#f6ab78" }}>Bebe</span>.</span>
            <span className="text-xs font-black uppercase tracking-widest px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: "#65a6db" }}>Admin</span>
          </div>
          <p className="text-sm text-muted-foreground font-medium mb-6">Devam etmek için şifreyi girin.</p>
          <form onSubmit={submit} className="space-y-4">
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                value={pw}
                onChange={(e) => { setPw(e.target.value); setError(false); }}
                placeholder="Şifre"
                autoFocus
                autoComplete="current-password"
                className={`w-full px-4 py-3 rounded-xl border-2 text-sm font-semibold outline-none transition-colors pr-11 ${error ? "border-red-400 bg-red-50" : "border-border focus:border-[#65a6db]"}`}
              />
              <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground p-1">
                {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {error && <p className="text-xs text-red-500 font-semibold -mt-2">Yanlış şifre.</p>}
            <button type="submit" className="w-full py-3 rounded-xl font-black text-sm text-white" style={{ backgroundColor: "#65a6db" }}>
              Giriş Yap
            </button>
          </form>
          <p className="text-[11px] text-muted-foreground mt-4 text-center leading-relaxed">
            Şifreyi değiştirmek için <code className="bg-muted px-1 rounded">VITE_ADMIN_PASSWORD</code> ortam değişkenini ayarlayın.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

// ── Add Variant Modal ───────────────────────────────────────────────────────
interface VariantFormProps {
  productSlug: string;
  productBrand: string;
  productModel: string;
  onSave: (v: ExtraVariant) => void;
  onClose: () => void;
}

function VariantModal({ productSlug, productBrand, productModel, onSave, onClose }: VariantFormProps) {
  const [color, setColor] = useState("");
  const [colorHex, setColorHex] = useState("#888888");
  const [condition, setCondition] = useState<ConditionGrade>("Unopened");
  const [year, setYear] = useState(String(new Date().getFullYear()));
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState(1);
  const [image, setImage] = useState<string>("stroller-1");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  function validate() {
    const e: Record<string, string> = {};
    if (!color.trim()) e.color = "Renk adı zorunludur.";
    if (!price.trim()) e.price = "Fiyat zorunludur.";
    else if (isNaN(parseFloat(price.replace(/[^0-9.]/g, "")))) e.price = "Geçerli bir fiyat girin.";
    return e;
  }

  function save(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    if (saving) return;
    setSaving(true);
    const priceNum = parseFloat(price.replace(/[^0-9.]/g, ""));
    onSave({
      id: genId(slugify(`${productSlug}-${color}-${condition}`)),
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

  return (
    <ModalBackdrop onClose={onClose}>
      <h2 className="text-lg font-black mb-0.5">{productBrand} {productModel}</h2>
      <p className="text-xs text-muted-foreground font-medium mb-5">Yeni varyant ekle</p>
      <form onSubmit={save} className="space-y-3.5" noValidate>
        <div>
          <label className="field-label">Renk Adı *</label>
          <input className={`field ${errors.color ? "border-red-400" : ""}`} value={color} onChange={e => { setColor(e.target.value); setErrors(p => ({ ...p, color: "" })); }} placeholder="ör. Gece Siyahı / Alüminyum" />
          {errors.color && <p className="text-xs text-red-500 font-semibold mt-1">{errors.color}</p>}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="field-label">Renk Kodu</label>
            <div className="flex items-center gap-2">
              <input type="color" value={colorHex} onChange={e => setColorHex(e.target.value)} className="w-10 h-10 rounded-lg border border-border cursor-pointer shrink-0" />
              <input className="field" value={colorHex} onChange={e => setColorHex(e.target.value)} placeholder="#888888" />
            </div>
          </div>
          <div>
            <label className="field-label">Yıl</label>
            <input className="field" value={year} onChange={e => setYear(e.target.value)} placeholder="2024" />
          </div>
          <div>
            <label className="field-label">Durum</label>
            <select className="field" value={condition} onChange={e => setCondition(e.target.value as ConditionGrade)}>
              {CONDITION_ORDER.map(c => <option key={c} value={c}>{conditionMeta[c].label}</option>)}
            </select>
          </div>
          <div>
            <label className="field-label">Stok</label>
            <input type="number" min={0} className="field" value={stock} onChange={e => setStock(Math.max(0, Number(e.target.value)))} />
          </div>
          <div className="col-span-2">
            <label className="field-label">Fiyat (€) *</label>
            <input className={`field ${errors.price ? "border-red-400" : ""}`} value={price} onChange={e => { setPrice(e.target.value); setErrors(p => ({ ...p, price: "" })); }} placeholder="450" />
            {errors.price && <p className="text-xs text-red-500 font-semibold mt-1">{errors.price}</p>}
          </div>
        </div>
        <div>
          <label className="field-label">Görsel</label>
          <ImagePicker value={image} onChange={setImage} />
        </div>
        <div className="flex gap-2 pt-1">
          <button type="submit" disabled={saving}
            className="flex-1 py-2.5 rounded-xl font-black text-sm text-white transition-opacity hover:opacity-90 disabled:opacity-60"
            style={{ backgroundColor: "#65a6db" }}>
            {saving ? "Kaydediliyor…" : "Kaydet"}
          </button>
          <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-xl font-black text-sm border-2 border-border hover:bg-muted transition-colors">
            İptal
          </button>
        </div>
      </form>
    </ModalBackdrop>
  );
}

// ── Add Product Modal ───────────────────────────────────────────────────────
function AddProductModal({ onSave, onClose, existingSlugs }: {
  onSave: (p: ExtraProduct) => void;
  onClose: () => void;
  existingSlugs: Set<string>;
}) {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [retailPrice, setRetailPrice] = useState("");
  const [description, setDescription] = useState("");
  const [weight, setWeight] = useState("");
  const [foldType, setFoldType] = useState("");
  const [seatPositions, setSeatPositions] = useState("");
  const [maxChildWeight, setMaxChildWeight] = useState("");
  const [image, setImage] = useState<string>("stroller-1");
  const [color, setColor] = useState("");
  const [colorHex, setColorHex] = useState("#888888");
  const [condition, setCondition] = useState<ConditionGrade>("Unopened");
  const [year, setYear] = useState(String(new Date().getFullYear()));
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  function validate() {
    const e: Record<string, string> = {};
    if (!brand.trim()) e.brand = "Marka zorunludur.";
    if (!model.trim()) e.model = "Model zorunludur.";
    if (!retailPrice.trim()) e.retailPrice = "Perakende fiyatı zorunludur.";
    if (!color.trim()) e.color = "En az bir renk varyantı gereklidir.";
    if (!price.trim()) e.price = "Fiyat zorunludur.";
    else if (isNaN(parseFloat(price.replace(/[^0-9.]/g, "")))) e.price = "Geçerli bir fiyat girin.";
    const slug = slugify(`${brand}-${model}`);
    if (existingSlugs.has(slug)) e.model = "Bu marka/model kombinasyonu zaten mevcut.";
    return e;
  }

  function save(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    if (saving) return;
    setSaving(true);
    const slug = slugify(`${brand.trim()}-${model.trim()}`);
    const priceNum = parseFloat(price.replace(/[^0-9.]/g, ""));
    const variant: ExtraVariant = {
      id: genId(slugify(`${slug}-${color}-${condition}`)),
      productSlug: slug,
      color: color.trim(), colorHex, condition,
      year: year.trim() || String(new Date().getFullYear()),
      price: `€${priceNum}`, priceNum, stock, image,
    };
    onSave({
      slug, brand: brand.trim(), model: model.trim(),
      retailPrice: retailPrice.trim().startsWith("€") ? retailPrice.trim() : `€${retailPrice.trim()}`,
      description: description.trim(), weight: weight.trim(),
      foldType: foldType.trim(), seatPositions: seatPositions.trim(),
      maxChildWeight: maxChildWeight.trim(),
      renewalChecks: [], included: [], highlights: [],
      image, variants: [variant],
    });
  }

  const f = (key: string) => (errors[key] ? " border-red-400" : "");
  const err = (key: string) => errors[key] ? <p className="text-xs text-red-500 font-semibold mt-1">{errors[key]}</p> : null;

  return (
    <ModalBackdrop onClose={onClose}>
      <h2 className="text-lg font-black mb-0.5">Yeni Ürün Ekle</h2>
      <p className="text-xs text-muted-foreground font-medium mb-4">Ürün bilgileri ve ilk varyant</p>
      <form onSubmit={save} className="space-y-3 max-h-[72vh] overflow-y-auto pr-1" noValidate>
        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground pt-0.5">Ürün Bilgileri</p>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="field-label">Marka *</label>
            <input className={`field${f("brand")}`} value={brand} onChange={e => { setBrand(e.target.value); setErrors(p => ({ ...p, brand: "" })); }} placeholder="Bugaboo" />
            {err("brand")}
          </div>
          <div>
            <label className="field-label">Model *</label>
            <input className={`field${f("model")}`} value={model} onChange={e => { setModel(e.target.value); setErrors(p => ({ ...p, model: "" })); }} placeholder="Fox 5" />
            {err("model")}
          </div>
          <div>
            <label className="field-label">Perakende Fiyatı *</label>
            <input className={`field${f("retailPrice")}`} value={retailPrice} onChange={e => { setRetailPrice(e.target.value); setErrors(p => ({ ...p, retailPrice: "" })); }} placeholder="€1.200" />
            {err("retailPrice")}
          </div>
          <div>
            <label className="field-label">Ağırlık</label>
            <input className="field" value={weight} onChange={e => setWeight(e.target.value)} placeholder="10 kg" />
          </div>
          <div className="col-span-2">
            <label className="field-label">Açıklama</label>
            <textarea className="field resize-none" rows={2} value={description} onChange={e => setDescription(e.target.value)} placeholder="Kısa ürün açıklaması…" />
          </div>
          <div>
            <label className="field-label">Katlama Tipi</label>
            <input className="field" value={foldType} onChange={e => setFoldType(e.target.value)} placeholder="Tek elle kompakt" />
          </div>
          <div>
            <label className="field-label">Koltuk Pozisyonları</label>
            <input className="field" value={seatPositions} onChange={e => setSeatPositions(e.target.value)} placeholder="İleri & ebeveyne dönük" />
          </div>
          <div>
            <label className="field-label">Maks. Çocuk Ağırlığı</label>
            <input className="field" value={maxChildWeight} onChange={e => setMaxChildWeight(e.target.value)} placeholder="22 kg" />
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
            <input className={`field${f("color")}`} value={color} onChange={e => { setColor(e.target.value); setErrors(p => ({ ...p, color: "" })); }} placeholder="ör. Gece Siyahı / Alüminyum" />
            {err("color")}
          </div>
          <div>
            <label className="field-label">Renk Kodu</label>
            <div className="flex items-center gap-2">
              <input type="color" value={colorHex} onChange={e => setColorHex(e.target.value)} className="w-10 h-10 rounded-lg border border-border cursor-pointer shrink-0" />
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
            <input className={`field${f("price")}`} value={price} onChange={e => { setPrice(e.target.value); setErrors(p => ({ ...p, price: "" })); }} placeholder="450" />
            {err("price")}
          </div>
          <div>
            <label className="field-label">Stok</label>
            <input type="number" min={0} className="field" value={stock} onChange={e => setStock(Math.max(0, Number(e.target.value)))} />
          </div>
        </div>

        <div className="flex gap-2 pt-2 sticky bottom-0 bg-white pb-1">
          <button type="submit" disabled={saving}
            className="flex-1 py-2.5 rounded-xl font-black text-sm text-white transition-opacity hover:opacity-90 disabled:opacity-60"
            style={{ backgroundColor: "#65a6db" }}>
            {saving ? "Kaydediliyor…" : "Ürünü Ekle"}
          </button>
          <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-xl font-black text-sm border-2 border-border hover:bg-muted transition-colors">
            İptal
          </button>
        </div>
      </form>
    </ModalBackdrop>
  );
}

// ── Modal Backdrop ──────────────────────────────────────────────────────────
function ModalBackdrop({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-6 relative max-h-[90vh] flex flex-col">
        <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-muted z-10">
          <X className="w-4 h-4" />
        </button>
        {children}
      </motion.div>
    </div>
  );
}

// ── Variant Row ─────────────────────────────────────────────────────────────
interface VariantRowProps {
  variant: ProductVariant;
  isExtra: boolean;
  onUpdateStock: (stock: number) => void;
  onUpdatePrice: (price: string, priceNum: number) => void;
  onDelete?: () => void;
}

function VariantRow({ variant, isExtra, onUpdateStock, onUpdatePrice, onDelete }: VariantRowProps) {
  const [editing, setEditing] = useState(false);
  const [stockVal, setStockVal] = useState(String(variant.stock));
  const [priceVal, setPriceVal] = useState(String(variant.priceNum));
  const cm = conditionMeta[variant.condition];

  function save() {
    const newStock = Math.max(0, parseInt(stockVal) || 0);
    const newPriceNum = parseFloat(priceVal) || variant.priceNum;
    onUpdateStock(newStock);
    onUpdatePrice(`€${newPriceNum}`, newPriceNum);
    setEditing(false);
  }

  function cancel() {
    setStockVal(String(variant.stock));
    setPriceVal(String(variant.priceNum));
    setEditing(false);
  }

  return (
    <tr className="border-t border-border hover:bg-gray-50/50 transition-colors">
      <td className="px-3 py-2.5">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2 py-0.5 rounded-full"
          style={{ backgroundColor: cm.bg, color: cm.color }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cm.color }} />
          {cm.label}
        </span>
      </td>
      <td className="px-3 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 rounded-full border border-white shadow-sm shrink-0" style={{ backgroundColor: variant.colorHex }} />
          <span className="text-xs font-medium text-foreground truncate max-w-[110px]">{variant.color}</span>
        </div>
      </td>
      <td className="px-3 py-2.5 text-xs text-muted-foreground font-medium">{variant.year}</td>
      <td className="px-3 py-2.5">
        {editing ? (
          <input type="number" min={0} value={stockVal} onChange={e => setStockVal(e.target.value)}
            className="w-16 text-xs font-bold border-2 border-[#65a6db] rounded-lg px-2 py-1 outline-none" autoFocus />
        ) : (
          <span className={`text-xs font-black px-2 py-0.5 rounded-full ${variant.stock === 0 ? "bg-red-100 text-red-600" : variant.stock === 1 ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}>
            {variant.stock === 0 ? "Yok" : `${variant.stock} adet`}
          </span>
        )}
      </td>
      <td className="px-3 py-2.5">
        {editing ? (
          <div className="flex items-center gap-1">
            <span className="text-xs font-bold text-muted-foreground">€</span>
            <input type="number" min={0} value={priceVal} onChange={e => setPriceVal(e.target.value)}
              className="w-20 text-xs font-bold border-2 border-[#f6ab78] rounded-lg px-2 py-1 outline-none" />
          </div>
        ) : (
          <span className="text-sm font-black" style={{ color: "#f6ab78" }}>{variant.price}</span>
        )}
      </td>
      <td className="px-3 py-2.5">
        <div className="flex items-center gap-1">
          {editing ? (
            <>
              <button onClick={save} className="p-1.5 rounded-lg bg-green-100 text-green-600 hover:bg-green-200 transition-colors" title="Kaydet"><Check className="w-3.5 h-3.5" /></button>
              <button onClick={cancel} className="p-1.5 rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors" title="İptal"><X className="w-3.5 h-3.5" /></button>
            </>
          ) : (
            <>
              <button onClick={() => setEditing(true)} className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground" title="Düzenle"><Pencil className="w-3.5 h-3.5" /></button>
              {isExtra && onDelete && (
                <button onClick={onDelete} className="p-1.5 rounded-lg hover:bg-red-100 text-muted-foreground hover:text-red-500 transition-colors" title="Sil"><Trash2 className="w-3.5 h-3.5" /></button>
              )}
            </>
          )}
        </div>
      </td>
    </tr>
  );
}

// ── Product Card ────────────────────────────────────────────────────────────
function ProductCard({ product, isExtra, onAddVariant, onDeleteProduct }: {
  product: Product; isExtra: boolean; onAddVariant: () => void; onDeleteProduct?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const { updateVariant, deleteExtraVariant, storeData } = useProductStore();
  const inStock = product.variants.filter(v => v.stock > 0).length;
  const extraVariantIds = useMemo(() => new Set(storeData.extraVariants.map(ev => ev.id)), [storeData]);
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
            {isExtra && <span className="text-[10px] font-black uppercase px-1.5 py-0.5 rounded-full bg-orange-100 text-orange-600">Özel</span>}
          </div>
          <p className="font-black text-foreground truncate">{product.model}</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-black text-foreground">{product.variants.length} varyant</p>
            <p className={`text-xs font-bold ${inStock === 0 ? "text-red-500" : "text-green-600"}`}>{inStock} stokta</p>
          </div>
          {isExtra && onDeleteProduct && (
            <button onClick={e => { e.stopPropagation(); if (confirm("Bu ürünü silmek istediğinizden emin misiniz?")) onDeleteProduct(); }}
              className="p-1.5 rounded-lg hover:bg-red-100 text-muted-foreground hover:text-red-500 transition-colors">
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
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
            <div className="border-t border-border">
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[480px]">
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
                        onUpdateStock={(stock) => updateVariant(variant.id, { stock })}
                        onUpdatePrice={(price, priceNum) => updateVariant(variant.id, { price, priceNum })}
                        onDelete={() => deleteExtraVariant(variant.id)}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-3 border-t border-border">
                <button onClick={onAddVariant}
                  className="inline-flex items-center gap-1.5 text-xs font-black px-3 py-2 rounded-xl transition-colors"
                  style={{ backgroundColor: "#65a6db12", color: "#3d7fb5" }}>
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

// ── Success Toast ───────────────────────────────────────────────────────────
function Toast({ message, onDone }: { message: string; onDone: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      onAnimationComplete={() => setTimeout(onDone, 2000)}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-2.5 bg-gray-900 text-white text-sm font-semibold px-5 py-3 rounded-full shadow-xl"
    >
      <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
      {message}
    </motion.div>
  );
}

// ── Main Admin Page ─────────────────────────────────────────────────────────
export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(SESSION_KEY) === "1");
  const [addVariantFor, setAddVariantFor] = useState<{ slug: string; brand: string; model: string } | null>(null);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const { products, storeData, updateVariant, addExtraVariant, addExtraProduct, deleteExtraProduct, resetAll } = useProductStore();

  const extraProductSlugs = useMemo(() => new Set(storeData.extraProducts.map(p => p.slug)), [storeData]);
  const allSlugs = useMemo(() => new Set(products.map(p => p.slug)), [products]);

  const stats = useMemo(() => {
    const allVariants = products.flatMap(p => p.variants);
    const inStock = allVariants.filter(v => v.stock > 0);
    const overrideCount = Object.keys(storeData.variantOverrides).length + storeData.extraVariants.length + storeData.extraProducts.length;
    return { total: allVariants.length, inStock: inStock.length, overrideCount };
  }, [products, storeData]);

  function logout() {
    sessionStorage.removeItem(SESSION_KEY);
    setAuthed(false);
  }

  if (!authed) return <PasswordGate onAuth={() => setAuthed(true)} />;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f8f9fc" }}>
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-border shadow-sm">
        <div className="max-w-5xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Link href="/" className="text-lg font-black">Tam<span style={{ color: "#f6ab78" }}>Bebe</span>.</Link>
            <span className="text-xs font-black uppercase tracking-widest px-2.5 py-1 rounded-full text-white" style={{ backgroundColor: "#65a6db" }}>Admin Paneli</span>
          </div>
          <div className="flex items-center gap-1">
            <Link href="/" className="text-xs font-bold text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-lg hover:bg-muted transition-colors">
              Siteyi Gör
            </Link>
            <button onClick={logout} className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-lg hover:bg-muted transition-colors">
              <LogOut className="w-3.5 h-3.5" /> Çıkış
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 md:px-6 py-8 space-y-6">
        {/* Stats */}
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
                <p className="text-xl font-black text-foreground leading-tight">{value}</p>
                <p className="text-xs font-semibold text-muted-foreground">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Stok uyarısı */}
        {products.flatMap(p => p.variants).filter(v => v.stock === 0).length > 0 && (
          <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3">
            <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
            <p className="text-sm font-semibold text-amber-700">
              {products.flatMap(p => p.variants).filter(v => v.stock === 0).length} varyant stokta yok.
            </p>
          </div>
        )}

        {/* Ürünler listesi */}
        <div>
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <h2 className="text-xl font-black text-foreground">Ürünler & Stok</h2>
            <div className="flex gap-2">
              {stats.overrideCount > 0 && (
                <button onClick={() => setConfirmReset(true)}
                  className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl border-2 border-red-200 text-red-500 hover:bg-red-50 transition-colors">
                  <RotateCcw className="w-3.5 h-3.5" /> Sıfırla
                </button>
              )}
              <button onClick={() => setShowAddProduct(true)}
                className="flex items-center gap-1.5 text-xs font-black px-4 py-2 rounded-xl text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#f6ab78" }}>
                <Plus className="w-3.5 h-3.5" /> Yeni Ürün
              </button>
            </div>
          </div>

          <p className="text-xs text-muted-foreground font-medium mb-3">
            Varyantları görmek için ürüne tıklayın. Düzenlemek için <Pencil className="w-3 h-3 inline" /> simgesini kullanın.
          </p>

          <div className="space-y-3">
            {products.map(product => (
              <ProductCard
                key={product.slug}
                product={product}
                isExtra={extraProductSlugs.has(product.slug)}
                onAddVariant={() => setAddVariantFor({ slug: product.slug, brand: product.brand, model: product.model })}
                onDeleteProduct={() => deleteExtraProduct(product.slug)}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Varyant modal */}
      <AnimatePresence>
        {addVariantFor && (
          <VariantModal
            productSlug={addVariantFor.slug}
            productBrand={addVariantFor.brand}
            productModel={addVariantFor.model}
            onSave={(v) => {
              addExtraVariant(v);
              setAddVariantFor(null);
              setToast(`"${v.color}" varyantı eklendi.`);
            }}
            onClose={() => setAddVariantFor(null)}
          />
        )}
      </AnimatePresence>

      {/* Ürün modal */}
      <AnimatePresence>
        {showAddProduct && (
          <AddProductModal
            existingSlugs={allSlugs}
            onSave={(p) => {
              addExtraProduct(p);
              setShowAddProduct(false);
              setToast(`"${p.brand} ${p.model}" ürünü eklendi.`);
            }}
            onClose={() => setShowAddProduct(false)}
          />
        )}
      </AnimatePresence>

      {/* Sıfırlama onayı */}
      <AnimatePresence>
        {confirmReset && (
          <ModalBackdrop onClose={() => setConfirmReset(false)}>
            <div className="text-center py-2">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "#fef2f2" }}>
                <RotateCcw className="w-7 h-7 text-red-500" />
              </div>
              <h3 className="text-lg font-black mb-2">Tüm değişiklikler sıfırlansın mı?</h3>
              <p className="text-sm text-muted-foreground font-medium mb-6">
                Stok düzenlemeleri, eklenen varyantlar ve ürünler silinecek. Bu işlem geri alınamaz.
              </p>
              <div className="flex gap-3">
                <button onClick={() => { resetAll(); setConfirmReset(false); setToast("Tüm değişiklikler sıfırlandı."); }}
                  className="flex-1 py-2.5 rounded-xl font-black text-sm text-white bg-red-500 hover:bg-red-600 transition-colors">
                  Sıfırla
                </button>
                <button onClick={() => setConfirmReset(false)} className="flex-1 py-2.5 rounded-xl font-black text-sm border-2 border-border">İptal</button>
              </div>
            </div>
          </ModalBackdrop>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast && <Toast message={toast} onDone={() => setToast(null)} />}
      </AnimatePresence>
    </div>
  );
}
