import { Wifi, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    Product: ['Paket Internet', 'Business Solution', 'Enterprise', 'Add-on Services'],
    Company: ['Tentang Kami', 'Karir', 'Press', 'Blog'],
    Support: ['Help Center', 'Status', 'Contact Us', 'Coverage Map'],
    Legal: ['Privacy Policy', 'Terms of Service', 'SLA', 'Net Neutrality'],
  }

  return (
    <footer className="glass border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Wifi className="text-cyan-400" size={32} />
              <span className="font-display text-2xl font-bold text-white">
                UN<span className="text-cyan-400">NET</span>
              </span>
            </div>
            <p className="text-gray-400 mb-6 max-w-sm">
              Penyedia layanan internet fiber optik terbaik di Indonesia dengan koneksi cepat dan harga terjangkau.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="p-2 rounded-lg glass glass-hover text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Produk</h4>
            <ul className="space-y-3 text-gray-400">
              {footerLinks.Product.map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-cyan-400 transition-colors duration-300">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Perusahaan</h4>
            <ul className="space-y-3 text-gray-400">
              {footerLinks.Company.map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-cyan-400 transition-colors duration-300">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Kontak</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-cyan-400" />
                <span>Jawa Timur, Indonesia</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-cyan-400" />
                <a href="https://wa.me/6285233053443" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
                  0852-3305-3443
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-cyan-400" />
                <span>info@unnet.id</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <h4 className="font-semibold mb-4">Area Layanan</h4>
              <p className="text-gray-400 text-sm">
                Melayani wilayah Jawa Timur dan sekitarnya dengan teknisi yang cepat tanggap dan profesional.
                Instalasi cepat dengan layanan terbaik.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Keunggulan Kami</h4>
              <div className="flex flex-wrap gap-2">
                {['Teknisi Cepat', 'Harga Terjangkau', 'Stabil 24/7', 'Dukungan Responsif'].map((feature) => (
                  <span key={feature} className="px-3 py-1 rounded-lg glass text-xs">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} UNNET. Hak cipta dilindungi.
            </p>
            <p className="text-gray-400 text-sm">
              Dibuat dengan ❤️ menggunakan React, Rust & Three.js
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
