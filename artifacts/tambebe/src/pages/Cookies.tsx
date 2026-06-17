import { Link } from "wouter";

export default function Cookies() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f8f9fc" }}>
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-12">
        <div className="mb-8">
          <Link href="/" className="text-sm font-semibold text-[#65a6db] hover:underline">← Ana Sayfa</Link>
        </div>

        <div className="bg-white rounded-3xl border border-border p-8 md:p-12 space-y-8">
          <div>
            <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: "#65a6db" }}>Hukuki Bilgi</p>
            <h1 className="text-3xl font-black mb-1">Çerez Politikası</h1>
            <p className="text-sm text-muted-foreground font-medium">Son güncelleme: Haziran 2025</p>
          </div>

          <Section title="1. Çerez Nedir?">
            <p>
              Çerezler (cookies), bir web sitesini ziyaret ettiğinizde tarayıcınız aracılığıyla cihazınıza yerleştirilen
              küçük metin dosyalarıdır. Bu dosyalar, site tercihlerinizi hatırlamak ve ziyaret deneyiminizi iyileştirmek
              amacıyla kullanılır.
            </p>
          </Section>

          <Section title="2. Kullandığımız Çerez Türleri">
            <p>TamBebe web sitesinde yalnızca aşağıdaki çerez türleri kullanılmaktadır:</p>

            <div className="mt-3 space-y-4">
              <CookieType
                name="Zorunlu Çerezler"
                badge="Her Zaman Aktif"
                badgeColor="#059669"
                badgeBg="#ecfdf5"
                description="Sitenin temel işlevlerini yerine getirmesi için gereklidir. Sepet içeriği, oturum bilgileri gibi veriler bu çerezler aracılığıyla tutulur. Bu çerezler devre dışı bırakılamaz."
                examples={["Oturum çerezi (session)", "Sepet içeriği", "Dil tercihi"]}
                duration="Tarayıcı kapatılana kadar (oturum) veya 1 yıl"
              />
              <CookieType
                name="İşlevsellik Çerezleri"
                badge="Opsiyonel"
                badgeColor="#2563a8"
                badgeBg="#eff6ff"
                description="Tercihlerinizi hatırlamak ve deneyiminizi kişiselleştirmek için kullanılır."
                examples={["Tema tercihi", "Son görüntülenen ürünler"]}
                duration="30 gün"
              />
            </div>
          </Section>

          <Section title="3. Kullanmadığımız Çerezler">
            <p>TamBebe aşağıdaki çerez türlerini <strong className="text-foreground">kullanmamaktadır</strong>:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Reklam ve pazarlama çerezleri</li>
              <li>Üçüncü taraf takip çerezleri (Facebook Pixel, Google Analytics vb.)</li>
              <li>Davranışsal hedefleme çerezleri</li>
            </ul>
          </Section>

          <Section title="4. Çerezleri Nasıl Kontrol Edebilirsiniz?">
            <p>
              Tarayıcı ayarlarınızdan çerezleri yönetebilir, engelleyebilir veya silebilirsiniz.
              Zorunlu çerezleri devre dışı bırakmanız durumunda sitenin bazı işlevleri düzgün çalışmayabilir.
            </p>
            <p className="mt-2">Popüler tarayıcılarda çerez ayarları:</p>
            <ul className="list-disc list-inside space-y-1 mt-1">
              <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-[#65a6db] hover:underline">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/tr/kb/cerezler-web-sitelerinin-bilgisayarinizda-depoladigi" target="_blank" rel="noopener noreferrer" className="text-[#65a6db] hover:underline">Mozilla Firefox</a></li>
              <li><a href="https://support.apple.com/tr-tr/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-[#65a6db] hover:underline">Safari</a></li>
              <li><a href="https://support.microsoft.com/tr-tr/microsoft-edge/microsoft-edge-de-cerezleri-silme-63947406" target="_blank" rel="noopener noreferrer" className="text-[#65a6db] hover:underline">Microsoft Edge</a></li>
            </ul>
          </Section>

          <Section title="5. Politika Güncellemeleri">
            <p>
              Bu çerez politikası zaman zaman güncellenebilir. Değişiklikler bu sayfada yayımlanır ve yürürlük tarihi
              güncellenir. Siteyi kullanmaya devam etmeniz güncel politikayı kabul ettiğiniz anlamına gelir.
            </p>
          </Section>

          <Section title="6. İletişim">
            <p>
              Çerez politikamız hakkında sorularınız için{" "}
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

function CookieType({ name, badge, badgeColor, badgeBg, description, examples, duration }: {
  name: string; badge: string; badgeColor: string; badgeBg: string;
  description: string; examples: string[]; duration: string;
}) {
  return (
    <div className="rounded-2xl border border-border p-4 space-y-2">
      <div className="flex items-center gap-2 flex-wrap">
        <p className="font-black text-foreground text-sm">{name}</p>
        <span className="text-[10px] font-black px-2 py-0.5 rounded-full" style={{ color: badgeColor, backgroundColor: badgeBg }}>{badge}</span>
      </div>
      <p className="text-xs leading-relaxed">{description}</p>
      <div className="flex flex-wrap gap-1.5">
        {examples.map(ex => (
          <span key={ex} className="text-[10px] font-semibold px-2 py-0.5 rounded-lg bg-gray-100 text-gray-600">{ex}</span>
        ))}
      </div>
      <p className="text-[11px] text-muted-foreground"><span className="font-black">Saklama Süresi:</span> {duration}</p>
    </div>
  );
}
