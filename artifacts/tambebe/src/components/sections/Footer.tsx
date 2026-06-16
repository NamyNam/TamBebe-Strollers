import { Link } from "wouter";
import { Instagram, Facebook, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-border pt-12 pb-8">
      <div className="container mx-auto px-4 md:px-6">

        {/* Main grid — brand takes half, right two cols split the rest */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">

          {/* Brand — 2 cols wide */}
          <div className="md:col-span-2">
            <Link href="/" className="text-xl font-black tracking-tight inline-block mb-3">
              Tam<span style={{ color: "#f6ab78" }}>Bebe</span>.
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Profesyonelce yenilenmiş, buharla temizlenmiş ve mekanik olarak test edilmiş premium ikinci el bebek arabaları.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a href="#" aria-label="Instagram"
                className="w-9 h-9 rounded-full flex items-center justify-center border border-border hover:border-[#f6ab78] hover:text-[#f6ab78] transition-colors text-muted-foreground">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Facebook"
                className="w-9 h-9 rounded-full flex items-center justify-center border border-border hover:border-[#65a6db] hover:text-[#65a6db] transition-colors text-muted-foreground">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="mailto:info@tambebe.com" aria-label="E-posta"
                className="w-9 h-9 rounded-full flex items-center justify-center border border-border hover:border-[#f6ab78] hover:text-[#f6ab78] transition-colors text-muted-foreground">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Destek */}
          <div>
            <h4 className="text-sm font-black mb-4 text-foreground">Destek</h4>
            <a href="mailto:info@tambebe.com"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Bize Ulaşın
            </a>
          </div>

          {/* Sözleşmeler */}
          <div>
            <h4 className="text-sm font-black mb-4 text-foreground">Sözleşmeler</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Gizlilik Politikası</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Kullanım Şartları</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Çerez Politikası</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-border flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} TamBebe. Tüm hakları saklıdır.
          </p>
          <p className="text-xs text-muted-foreground hidden md:block">
            Yenilenmiş. Güvenli. Uygun fiyatlı.
          </p>
        </div>
      </div>
    </footer>
  );
}
