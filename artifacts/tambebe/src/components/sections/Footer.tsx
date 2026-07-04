import { Link } from "wouter";
import { Instagram, Facebook, Mail, Scissors } from "lucide-react";
import { brand, fonts } from "@/lib/brand";

export function Footer() {
  return (
    <footer style={{ backgroundColor: brand.paper }}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center gap-3 py-3" style={{ color: brand.inkMuted }}>
          <Scissors className="w-3.5 h-3.5 shrink-0" />
          <div className="flex-1 border-t" style={{ borderStyle: "dashed", borderColor: brand.paperLine }} />
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 pt-8 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-3" style={{ fontFamily: fonts.display, fontWeight: 700, color: brand.ink }}>
              <span className="text-xl">
                Tam<span style={{ color: brand.stamp }}>Bebe</span>.
              </span>
            </Link>
            <p style={{ fontFamily: fonts.body, color: brand.inkMuted, fontSize: "14px" }} className="leading-relaxed max-w-sm">
              Profesyonelce yenilenmiş, buharla temizlenmiş ve mekanik olarak test edilmiş premium ikinci el bebek arabaları.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full flex items-center justify-center border transition-colors"
                style={{ borderColor: brand.paperLine, color: brand.inkMuted }}
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full flex items-center justify-center border transition-colors"
                style={{ borderColor: brand.paperLine, color: brand.inkMuted }}
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="mailto:info@tambebe.com"
                aria-label="E-posta"
                className="w-9 h-9 rounded-full flex items-center justify-center border transition-colors"
                style={{ borderColor: brand.paperLine, color: brand.inkMuted }}
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 style={{ fontFamily: fonts.mono, fontSize: "11px", letterSpacing: "0.08em", color: brand.ink }} className="mb-4 font-bold">
              DESTEK
            </h4>
            <a href="mailto:info@tambebe.com" style={{ fontFamily: fonts.body, color: brand.inkMuted, fontSize: "14px" }} className="hover:opacity-70 transition-opacity">
              Bize Ulaşın
            </a>
          </div>

          <div>
            <h4 style={{ fontFamily: fonts.mono, fontSize: "11px", letterSpacing: "0.08em", color: brand.ink }} className="mb-4 font-bold">
              SÖZLEŞMELER
            </h4>
            <ul className="space-y-2.5" style={{ fontFamily: fonts.body, color: brand.inkMuted, fontSize: "14px" }}>
              <li><Link href="/privacy" className="hover:opacity-70 transition-opacity">Gizlilik Politikası</Link></li>
              <li><Link href="/terms" className="hover:opacity-70 transition-opacity">Kullanım Şartları</Link></li>
              <li><Link href="/cookies" className="hover:opacity-70 transition-opacity">Çerez Politikası</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex items-center justify-between" style={{ borderTop: `1px solid ${brand.paperLine}` }}>
          <p style={{ fontFamily: fonts.mono, color: brand.inkMuted, fontSize: "11px" }}>
            &copy; {new Date().getFullYear()} TAMBEBE — TÜM HAKLARI SAKLIDIR
          </p>
          <p style={{ fontFamily: fonts.mono, color: brand.inkMuted, fontSize: "11px" }} className="hidden md:block">
            YENİLENMİŞ &middot; GÜVENLİ &middot; UYGUN FİYATLI
          </p>
        </div>
      </div>
    </footer>
  );
}
