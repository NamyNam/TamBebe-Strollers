import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  Camera, X, CheckCircle2, AlertTriangle, ChevronRight,
  Mail, Phone, MapPin, FileText, Wrench, Clock, Star,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/sections/Footer";
import { useSellStore } from "@/contexts/SellStore";
import { PROVINCES, getDistricts } from "@/data/turkey";

async function fileToBase64(file: File): Promise<string> {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onloadend = () => res(r.result as string);
    r.onerror = rej;
    r.readAsDataURL(file);
  });
}

function PhotoSlot({ photo, onAdd, onRemove, required }: {
  photo: string | null; onAdd: (b64: string) => void; onRemove: () => void; required?: boolean;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  async function pick(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setBusy(true);
    try { onAdd(await fileToBase64(f)); } finally { setBusy(false); e.target.value = ""; }
  }

  if (photo) {
    return (
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 group">
        <img src={photo} alt="" className="w-full h-full object-cover" />
        <button onClick={onRemove}
          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  return (
    <button type="button" onClick={() => ref.current?.click()}
      className="aspect-square rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-1.5 transition-colors hover:border-[#f6ab78] hover:bg-orange-50"
      style={{ borderColor: "#ddd" }}>
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={pick} />
      {busy
        ? <div className="w-5 h-5 border-2 border-[#f6ab78] border-t-transparent rounded-full animate-spin" />
        : <>
          <Camera className="w-5 h-5 text-muted-foreground" />
          <span className="text-[10px] font-bold text-muted-foreground">
            {required ? "Zorunlu" : "Ekle"}
          </span>
        </>}
    </button>
  );
}

function RadioGroup({ options, value, onChange }: {
  options: { value: string; label: string }[]; value: string; onChange: (v: string) => void;
}) {
  return (
    <div className="flex gap-3 flex-wrap">
      {options.map(o => (
        <button key={o.value} type="button" onClick={() => onChange(o.value)}
          className={`px-4 py-2 rounded-xl border-2 text-sm font-bold transition-all ${value === o.value ? "border-[#65a6db] text-[#3d7fb5]" : "border-border hover:border-gray-300"}`}
          style={value === o.value ? { backgroundColor: "#65a6db18" } : {}}>
          {o.label}
        </button>
      ))}
    </div>
  );
}

function Section({ icon: Icon, title, accent, children }: {
  icon: React.ElementType; title: string; accent: string; children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-3xl border border-border p-6 md:p-8 space-y-5">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: accent + "22" }}>
          <Icon className="w-5 h-5" style={{ color: accent }} />
        </div>
        <h2 className="text-lg font-black">{title}</h2>
      </div>
      {children}
    </div>
  );
}

type FormErrors = Record<string, string>;

export default function SellForm() {
  const { addRequest } = useSellStore();
  const [submitted, setSubmitted] = useState(false);

  const [photos, setPhotos] = useState<(string | null)[]>(Array(8).fill(null));
  const [hasInvoice, setHasInvoice] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [hasProblems, setHasProblems] = useState("");
  const [problemDetails, setProblemDetails] = useState("");
  const [hasPhysicalDamage, setHasPhysicalDamage] = useState("");
  const [damageDetails, setDamageDetails] = useState("");
  const [usageYears, setUsageYears] = useState("");
  const [usageMonths, setUsageMonths] = useState("");
  const [allFunctionsWorking, setAllFunctionsWorking] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const addPhoto = (idx: number, b64: string) => {
    setPhotos(p => { const n = [...p]; n[idx] = b64; return n; });
    setErrors(e => ({ ...e, photos: "" }));
  };
  const removePhoto = (idx: number) => setPhotos(p => { const n = [...p]; n[idx] = null; return n; });
  const filledPhotos = photos.filter(Boolean) as string[];

  function validate(): boolean {
    const e: FormErrors = {};
    if (filledPhotos.length < 2) e.photos = "En az 2 fotoğraf yüklemeniz gerekiyor.";
    if (!hasInvoice) e.hasInvoice = "Lütfen seçin.";
    if (!brand.trim()) e.brand = "Marka zorunludur.";
    if (!model.trim()) e.model = "Model zorunludur.";
    if (!hasProblems) e.hasProblems = "Lütfen seçin.";
    if (!hasPhysicalDamage) e.hasPhysicalDamage = "Lütfen seçin.";
    if (!usageYears && !usageMonths) e.usage = "Kullanım süresini giriniz.";
    if (!allFunctionsWorking) e.allFunctionsWorking = "Lütfen seçin.";
    if (!email.trim() || !email.includes("@")) e.email = "Geçerli e-posta adresi giriniz.";
    if (!phone.trim()) e.phone = "Telefon numarası zorunludur.";
    if (!city.trim()) e.city = "İl seçiniz.";
    if (!district.trim()) e.district = "İlçe seçiniz.";
    if (!address.trim()) e.address = "Adres zorunludur.";
    setErrors(e);
    if (Object.keys(e).length > 0) {
      const firstKey = Object.keys(e)[0];
      const el = document.getElementById(`field-${firstKey}`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    return Object.keys(e).length === 0;
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    addRequest({
      photos: filledPhotos,
      hasInvoice: hasInvoice === "yes",
      brand: brand.trim(),
      model: model.trim(),
      hasProblems: hasProblems === "yes",
      problemDetails: problemDetails.trim(),
      hasPhysicalDamage: hasPhysicalDamage === "yes",
      damageDetails: damageDetails.trim(),
      usageYears: usageYears.trim(),
      usageMonths: usageMonths.trim(),
      allFunctionsWorking: allFunctionsWorking === "yes",
      email: email.trim(),
      phone: phone.trim(),
      city: city.trim(),
      district: district.trim(),
      address: address.trim(),
      notes: notes.trim(),
    });
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function errMsg(k: string) {
    return errors[k] ? (
      <p className="text-xs font-semibold text-red-500 mt-1 flex items-center gap-1">
        <AlertTriangle className="w-3 h-3 shrink-0" />{errors[k]}
      </p>
    ) : null;
  }

  if (submitted) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: "#f8f9fc" }}>
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl border border-border shadow-xl p-10 max-w-md w-full text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: "#f6ab7822" }}>
              <CheckCircle2 className="w-8 h-8" style={{ color: "#f6ab78" }} />
            </div>
            <h1 className="text-2xl font-black mb-3">Talebiniz Alındı!</h1>
            <p className="text-muted-foreground font-medium mb-6 leading-relaxed">
              Arabanızı inceleyip en kısa sürede size dönüş yapacağız. Genellikle 1–2 iş günü içinde iletişime geçiyoruz.
            </p>
            <div className="flex gap-3">
              <Link href="/" className="flex-1 py-3 rounded-xl font-black text-sm border-2 border-border hover:bg-muted text-center">
                Ana Sayfa
              </Link>
              <button onClick={() => setSubmitted(false)}
                className="flex-1 py-3 rounded-xl font-black text-sm text-white"
                style={{ backgroundColor: "#f6ab78" }}>
                Yeni Talep
              </button>
            </div>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f8f9fc" }}>
      <Navbar />

      {/* Hero */}
      <div className="relative overflow-hidden py-16 md:py-20" style={{ background: "linear-gradient(135deg, #fff8f2 0%, #fffbf5 50%, #f0f8ff 100%)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, #f6ab78, transparent)", transform: "translate(30%, -30%)" }} />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, #65a6db, transparent)", transform: "translate(-30%, 30%)" }} />
        </div>
        <div className="relative container mx-auto px-4 md:px-6">
          <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground mb-4">
            <Link href="/" className="hover:text-foreground">Ana Sayfa</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-foreground">Arabanı Sat</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
            Arabanı Sat,<br />
            <span style={{ color: "#f6ab78" }}>Değerine Kavuş.</span>
          </h1>
          <p className="text-lg text-muted-foreground font-medium max-w-xl leading-relaxed">
            Formu doldurun, ekibimiz aracınızı inceleleyip size en iyi teklifi sunsun. Ücretsiz değerlendirme, hızlı ödeme.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            {[
              { icon: Star, text: "Ücretsiz değerlendirme" },
              { icon: Clock, text: "1–2 iş günü" },
              { icon: CheckCircle2, text: "Güvenli ödeme" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-sm font-semibold">
                <Icon className="w-4 h-4" style={{ color: "#f6ab78" }} />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="container mx-auto px-4 md:px-6 py-10 max-w-2xl">
        <form onSubmit={submit} noValidate className="space-y-5">

          {/* Photos */}
          <Section icon={Camera} title="Ürün Fotoğrafları" accent="#f6ab78">
            <p className="text-sm text-muted-foreground font-medium -mt-2">
              En az 2 fotoğraf yükleyin. Her açıdan net görüntü teklifinizi hızlandırır.
            </p>
            <div id="field-photos" className="grid grid-cols-4 gap-3">
              {photos.map((p, i) => (
                <PhotoSlot key={i} photo={p} required={i < 2}
                  onAdd={b64 => addPhoto(i, b64)} onRemove={() => removePhoto(i)} />
              ))}
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
              <span className={`font-black ${filledPhotos.length >= 2 ? "text-green-600" : "text-[#f6ab78]"}`}>
                {filledPhotos.length}/8
              </span>
              fotoğraf yüklendi {filledPhotos.length >= 2 && <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />}
            </div>
            {errMsg("photos")}
          </Section>

          {/* Product Info */}
          <Section icon={FileText} title="Ürün Bilgileri" accent="#65a6db">
            <div id="field-hasInvoice">
              <label className="field-label">Faturası var mı? *</label>
              <RadioGroup value={hasInvoice} onChange={v => { setHasInvoice(v); setErrors(e => ({ ...e, hasInvoice: "" })); }}
                options={[{ value: "yes", label: "Evet, var" }, { value: "no", label: "Hayır, yok" }]} />
              {errMsg("hasInvoice")}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div id="field-brand">
                <label className="field-label">Marka *</label>
                <input className={`field ${errors.brand ? "border-red-400" : ""}`} value={brand} placeholder="Bugaboo, UPPAbaby…"
                  onChange={e => { setBrand(e.target.value); setErrors(p => ({ ...p, brand: "" })); }} />
                {errMsg("brand")}
              </div>
              <div id="field-model">
                <label className="field-label">Model *</label>
                <input className={`field ${errors.model ? "border-red-400" : ""}`} value={model} placeholder="Fox 3, Vista V2…"
                  onChange={e => { setModel(e.target.value); setErrors(p => ({ ...p, model: "" })); }} />
                {errMsg("model")}
              </div>
            </div>
          </Section>

          {/* Condition */}
          <Section icon={Wrench} title="Ürün Durumu" accent="#f6ab78">
            <div id="field-hasProblems">
              <label className="field-label">Üründe herhangi bir problem mevcut mu? *</label>
              <RadioGroup value={hasProblems} onChange={v => { setHasProblems(v); setErrors(e => ({ ...e, hasProblems: "" })); }}
                options={[{ value: "no", label: "Hayır, sorunsuz" }, { value: "yes", label: "Evet, var" }]} />
              {errMsg("hasProblems")}
            </div>
            {hasProblems === "yes" && (
              <div>
                <label className="field-label">Problemi açıklayın</label>
                <textarea className="field resize-none" rows={3} value={problemDetails} placeholder="Problemleri kısaca açıklayın…"
                  onChange={e => setProblemDetails(e.target.value)} />
              </div>
            )}

            <div id="field-hasPhysicalDamage">
              <label className="field-label">Çizik, darbe veya çatlak var mı? *</label>
              <RadioGroup value={hasPhysicalDamage} onChange={v => { setHasPhysicalDamage(v); setErrors(e => ({ ...e, hasPhysicalDamage: "" })); }}
                options={[{ value: "no", label: "Hayır, yok" }, { value: "yes", label: "Evet, var" }]} />
              {errMsg("hasPhysicalDamage")}
            </div>
            {hasPhysicalDamage === "yes" && (
              <div>
                <label className="field-label">Hasarı açıklayın</label>
                <textarea className="field resize-none" rows={2} value={damageDetails} placeholder="Çizik / darbe / çatlak detayları…"
                  onChange={e => setDamageDetails(e.target.value)} />
              </div>
            )}

            <div id="field-usage">
              <label className="field-label">Kaç yıl / ay kullanıldı? *</label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <input className={`field ${errors.usage ? "border-red-400" : ""}`} type="number" min={0} max={20}
                    placeholder="Yıl" value={usageYears}
                    onChange={e => { setUsageYears(e.target.value); setErrors(p => ({ ...p, usage: "" })); }} />
                  <p className="text-[10px] text-muted-foreground font-medium mt-1 ml-1">Yıl</p>
                </div>
                <div className="flex-1">
                  <input className={`field ${errors.usage ? "border-red-400" : ""}`} type="number" min={0} max={11}
                    placeholder="Ay" value={usageMonths}
                    onChange={e => { setUsageMonths(e.target.value); setErrors(p => ({ ...p, usage: "" })); }} />
                  <p className="text-[10px] text-muted-foreground font-medium mt-1 ml-1">Ay</p>
                </div>
              </div>
              {errMsg("usage")}
            </div>

            <div id="field-allFunctionsWorking">
              <label className="field-label">Tüm fonksiyonları sorunsuz çalışıyor mu? *</label>
              <p className="text-xs text-muted-foreground font-medium mb-2">
                Tekerlek, fren, emniyet kemeri, katlama mekanizması, tente vb.
              </p>
              <RadioGroup value={allFunctionsWorking} onChange={v => { setAllFunctionsWorking(v); setErrors(e => ({ ...e, allFunctionsWorking: "" })); }}
                options={[{ value: "yes", label: "Evet, hepsi çalışıyor" }, { value: "no", label: "Bazıları çalışmıyor" }]} />
              {errMsg("allFunctionsWorking")}
            </div>
          </Section>

          {/* Contact */}
          <Section icon={Mail} title="İletişim Bilgileri" accent="#65a6db">
            <div className="grid grid-cols-2 gap-3">
              <div id="field-email" className="col-span-2 sm:col-span-1">
                <label className="field-label">E-posta Adresi *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input className={`field pl-9 ${errors.email ? "border-red-400" : ""}`} type="email" value={email}
                    placeholder="ornek@email.com"
                    onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: "" })); }} />
                </div>
                {errMsg("email")}
              </div>
              <div id="field-phone" className="col-span-2 sm:col-span-1">
                <label className="field-label">Telefon *</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input className={`field pl-9 ${errors.phone ? "border-red-400" : ""}`} type="tel" value={phone}
                    placeholder="0555 123 45 67"
                    onChange={e => { setPhone(e.target.value); setErrors(p => ({ ...p, phone: "" })); }} />
                </div>
                {errMsg("phone")}
              </div>
              <div id="field-city">
                <label className="field-label">İl *</label>
                <select className={`field ${errors.city ? "border-red-400" : ""}`} value={city}
                  onChange={e => {
                    setCity(e.target.value);
                    setDistrict("");
                    setErrors(p => ({ ...p, city: "", district: "" }));
                  }}>
                  <option value="">İl seçin…</option>
                  {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
                {errMsg("city")}
              </div>
              <div id="field-district">
                <label className="field-label">İlçe *</label>
                <select className={`field ${errors.district ? "border-red-400" : ""}`} value={district}
                  disabled={!city}
                  onChange={e => { setDistrict(e.target.value); setErrors(p => ({ ...p, district: "" })); }}>
                  <option value="">{city ? "İlçe seçin…" : "Önce il seçin"}</option>
                  {getDistricts(city).map(d => <option key={d} value={d}>{d}</option>)}
                </select>
                {errMsg("district")}
              </div>
              <div id="field-address" className="col-span-2">
                <label className="field-label">Adres *</label>
                <textarea className={`field resize-none ${errors.address ? "border-red-400" : ""}`} rows={2} value={address}
                  placeholder="Mahalle, sokak, bina no…"
                  onChange={e => { setAddress(e.target.value); setErrors(p => ({ ...p, address: "" })); }} />
                {errMsg("address")}
              </div>
              <div className="col-span-2">
                <label className="field-label">Ek Bilgiler <span className="font-normal text-muted-foreground">(isteğe bağlı)</span></label>
                <textarea className="field resize-none" rows={3} value={notes}
                  placeholder="Eklemek istediğiniz başka bir şey var mı? Orijinal aksesuar, garanti belgesi, v.b."
                  onChange={e => setNotes(e.target.value)} />
              </div>
            </div>
          </Section>

          {/* Submit */}
          <div className="pb-4">
            {Object.keys(errors).length > 0 && (
              <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-2xl px-4 py-3 mb-4">
                <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <p className="text-sm font-semibold text-red-600">
                  Lütfen kırmızı ile işaretli alanları doldurun.
                </p>
              </div>
            )}
            <button type="submit"
              className="w-full py-4 rounded-2xl font-black text-lg text-white transition-opacity hover:opacity-90 shadow-lg"
              style={{ backgroundColor: "#f6ab78" }}>
              Talebi Gönder
            </button>
            <p className="text-center text-xs text-muted-foreground font-medium mt-3">
              Bilgileriniz yalnızca değerlendirme amacıyla kullanılır. Üçüncü taraflarla paylaşılmaz.
            </p>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}
