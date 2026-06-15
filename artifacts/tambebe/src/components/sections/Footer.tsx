import { Link } from "wouter";
import { Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card pt-16 pb-8 border-t border-card-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <Link href="/" className="text-2xl font-serif font-bold text-primary tracking-tight mb-4 inline-block">
              TamBebe.
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Profesyonelce yenilenmiş, buharla temizlenmiş ve mekanik olarak test edilmiş premium ikinci el bebek arabaları.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Mağaza</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Tüm Arabalar</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Yeni Gelenler</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Bugaboo</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">UPPAbaby</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Aksesuarlar</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Hakkımızda</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Sürecimiz</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Güvenlik Standartları</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Arabanı Sat</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Yorumlar</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Destek</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">S.S.S.</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Kargo ve İadeler</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Garanti</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Bize Ulaşın</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-card-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} TamBebe. Tüm hakları saklıdır.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Gizlilik Politikası</a>
            <a href="#" className="hover:text-foreground transition-colors">Kullanım Şartları</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
