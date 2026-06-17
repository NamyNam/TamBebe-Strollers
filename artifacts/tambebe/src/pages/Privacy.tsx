import { Link } from "wouter";

export default function Privacy() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f8f9fc" }}>
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-12">
        <div className="mb-8">
          <Link href="/" className="text-sm font-semibold text-[#65a6db] hover:underline">← Ana Sayfa</Link>
        </div>

        <div className="bg-white rounded-3xl border border-border p-8 md:p-12 space-y-8">
          <div>
            <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: "#65a6db" }}>Hukuki Bilgi</p>
            <h1 className="text-3xl font-black mb-1">Gizlilik Politikası</h1>
            <p className="text-sm text-muted-foreground font-medium">Son güncelleme: Haziran 2025</p>
          </div>

          <Section title="1. Veri Sorumlusu">
            <p>
              6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında veri sorumlusu TamBebe'dir.
              Bu politika, sitemizi ziyaret eden veya hizmetlerimizi kullanan kişilerin kişisel verilerinin
              nasıl toplandığını, kullanıldığını ve korunduğunu açıklamaktadır.
            </p>
          </Section>

          <Section title="2. Toplanan Kişisel Veriler">
            <p>Aşağıdaki kişisel veriler toplanabilmektedir:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Ad, soyad</li>
              <li>E-posta adresi</li>
              <li>Telefon numarası</li>
              <li>Adres bilgileri (il, ilçe, açık adres)</li>
              <li>Satışa sunulan ürüne ilişkin bilgiler ve fotoğraflar</li>
            </ul>
          </Section>

          <Section title="3. Verilerin Toplanma Yöntemi">
            <p>
              Kişisel verileriniz; sitemizde yer alan "Arabanı Sat" formu aracılığıyla, iletişim formları üzerinden
              veya doğrudan bizimle iletişime geçmeniz suretiyle elektronik ortamda toplanmaktadır.
            </p>
          </Section>

          <Section title="4. Verilerin Kullanım Amaçları">
            <p>Toplanan kişisel veriler yalnızca aşağıdaki amaçlarla kullanılmaktadır:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Satış taleplerinizin değerlendirilmesi ve sizinle iletişime geçilmesi</li>
              <li>Satın alma süreçlerinin yürütülmesi</li>
              <li>Müşteri hizmetleri taleplerinin karşılanması</li>
              <li>Yasal yükümlülüklerin yerine getirilmesi</li>
            </ul>
          </Section>

          <Section title="5. Verilerin Saklanma Süresi">
            <p>
              Kişisel verileriniz, ilgili yasal düzenlemeler çerçevesinde ve işleme amacının gerektirdiği süre boyunca
              saklanmaktadır. Sürenin dolması veya işleme amacının ortadan kalkması halinde veriler silinir,
              yok edilir veya anonim hale getirilir.
            </p>
          </Section>

          <Section title="6. Verilerin Üçüncü Taraflarla Paylaşımı">
            <p>
              Kişisel verileriniz, açık rızanız olmaksızın üçüncü taraflarla paylaşılmaz. Aşağıdaki zorunlu
              durumlarda paylaşım yapılabilir:
            </p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Yasal yükümlülüklerin yerine getirilmesi amacıyla yetkili kamu kurumları</li>
              <li>Hizmetin ifası için zorunlu teknik altyapı sağlayıcıları (veri işleyen sıfatıyla)</li>
            </ul>
          </Section>

          <Section title="7. Çerezler (Cookies)">
            <p>
              Sitemiz, temel işlevselliği sağlamak amacıyla teknik çerezler kullanabilir. Oturum çerezleri
              tarayıcınızı kapattığınızda otomatik olarak silinir. Pazarlama veya takip amaçlı çerez kullanılmamaktadır.
            </p>
          </Section>

          <Section title="8. KVKK Kapsamındaki Haklarınız">
            <p>KVKK'nın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
              <li>İşlenmişse buna ilişkin bilgi talep etme</li>
              <li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme</li>
              <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme</li>
              <li>Eksik veya yanlış işlenmiş olması hâlinde düzeltilmesini isteme</li>
              <li>Silinmesini veya yok edilmesini isteme</li>
              <li>İşlemeye itiraz etme</li>
            </ul>
          </Section>

          <Section title="9. İletişim">
            <p>
              Gizlilik politikamız veya KVKK kapsamındaki haklarınız hakkında sorularınız için{" "}
              <Link href="/contact" className="text-[#65a6db] hover:underline font-semibold">Bize Ulaşın</Link>{" "}
              sayfamızı ziyaret edebilirsiniz.
            </p>
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-black">{title}</h2>
      <div className="text-sm leading-relaxed text-muted-foreground font-medium space-y-2">{children}</div>
    </div>
  );
}
