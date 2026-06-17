import { Link } from "wouter";

export default function Terms() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f8f9fc" }}>
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-12">
        <div className="mb-8">
          <Link href="/" className="text-sm font-semibold text-[#65a6db] hover:underline">← Ana Sayfa</Link>
        </div>

        <div className="bg-white rounded-3xl border border-border p-8 md:p-12 space-y-8">
          <div>
            <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: "#65a6db" }}>Hukuki Bilgi</p>
            <h1 className="text-3xl font-black mb-1">Kullanım Şartları</h1>
            <p className="text-sm text-muted-foreground font-medium">Son güncelleme: Haziran 2025</p>
          </div>

          <Section title="1. Genel Bilgiler">
            <p>
              Bu web sitesi, TamBebe tarafından işletilmektedir. Sitemizi kullanarak aşağıdaki koşulları kabul etmiş sayılırsınız.
              Bu şartları kabul etmiyorsanız lütfen sitemizi kullanmayınız.
            </p>
          </Section>

          <Section title="2. Hizmetin Kapsamı">
            <p>
              TamBebe, profesyonel olarak yenilenmiş, buharla temizlenmiş ve mekanik kontrolü yapılmış ikinci el bebek arabalarının
              satışını gerçekleştirmektedir. Sitede yer alan ürünler stok durumuna göre değişkenlik gösterebilir.
            </p>
          </Section>

          <Section title="3. Ürün Bilgileri">
            <p>
              Sitemizde yer alan ürün açıklamaları, fiyatlar ve görseller bilgi amaçlıdır. TamBebe, ürün bilgilerinde herhangi bir
              hata veya eksiklik durumunda bildirim yapmaksızın güncelleme yapma hakkını saklı tutar. Ürün görselleri temsili
              nitelikte olup gerçek ürünle küçük farklılıklar içerebilir.
            </p>
          </Section>

          <Section title="4. Satın Alma ve Ödeme">
            <p>
              Sipariş verme süreci, ödeme yöntemleri ve teslimat koşulları hakkında detaylı bilgi almak için lütfen bizimle
              iletişime geçin. Tüm fiyatlara KDV dahildir.
            </p>
          </Section>

          <Section title="5. İade ve Değişim">
            <p>
              Yasal cayma hakkı kapsamında, ürünü teslim aldığınız tarihten itibaren 14 gün içinde iade edebilirsiniz.
              İade edilecek ürünün kullanılmamış, orijinal ambalajında ve tüm aksesuarlarıyla birlikte gönderilmesi gerekmektedir.
              Detaylı bilgi için bizimle iletişime geçin.
            </p>
          </Section>

          <Section title="6. Sorumluluk Sınırlaması">
            <p>
              TamBebe, sitenin kesintisiz veya hatasız çalışacağını garanti etmez. Teknik aksaklıklar, veri kayıpları veya
              üçüncü taraf hizmetlerden kaynaklanan sorunlar nedeniyle oluşabilecek zararlardan sorumlu tutulamaz.
            </p>
          </Section>

          <Section title="7. Fikri Mülkiyet">
            <p>
              Sitede yer alan tüm içerik (metinler, görseller, logolar, tasarım unsurları) TamBebe'ye aittir ve telif hukuku
              kapsamında koruma altındadır. İzinsiz kopyalanamaz, çoğaltılamaz veya dağıtılamaz.
            </p>
          </Section>

          <Section title="8. Değişiklikler">
            <p>
              TamBebe, bu kullanım şartlarını dilediği zaman değiştirme hakkını saklı tutar. Güncel şartlar her zaman bu
              sayfada yayımlanır. Siteyi kullanmaya devam etmeniz, değişiklikleri kabul ettiğiniz anlamına gelir.
            </p>
          </Section>

          <Section title="9. İletişim">
            <p>
              Kullanım şartları hakkında sorularınız için{" "}
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
