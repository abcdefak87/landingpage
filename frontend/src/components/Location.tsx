import { motion } from 'framer-motion'
import { MapPin, Phone, Clock, Navigation } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Location() {
  const openGoogleMaps = () => {
    window.open('https://www.google.com/maps/place/UNNET+WIFI+cepat+tanggap+teknisinya/@-7.2648314,111.7600417,1078m/data=!3m1!1e3!4m8!3m7!1s0x2e79d5e75d766211:0x2c8b3ef233d2ef5a!8m2!3d-7.2648367!4d111.7626166!9m1!1b1!16s%2Fg%2F11smmhxn1f', '_blank')
  }

  return (
    <section id="location" className="scroll-section px-6 md:px-12 lg:px-20 py-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Lokasi <span className="text-gradient bg-gradient-to-r from-cyan-400 to-blue-500">Kantor</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto px-4">
            Kunjungi kantor kami atau hubungi tim support untuk informasi lebih lanjut.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mx-auto mt-8" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="metric-card">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-cyan-500/20">
                  <MapPin className="text-cyan-400" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Alamat Kantor</h3>
                  <p className="text-gray-400 leading-relaxed">
                    UNNET WIFI<br />
                    Jawa Timur, Indonesia<br />
                    <span className="text-xs text-gray-500">Koordinat: -7.2648367, 111.7626166</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="metric-card">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-blue-500/20">
                  <Phone className="text-blue-400" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Hubungi Kami</h3>
                  <p className="text-gray-400">
                    WhatsApp: <a href="https://wa.me/6285233053443" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">0852-3305-3443</a><br />
                  Email: <span className="text-cyan-400">info@unnet.id</span><br />
                  <span className="text-sm">Teknisi Cepat Tanggap</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="metric-card">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-purple-500/20">
                  <Clock className="text-purple-400" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Jam Operasional</h3>
                  <p className="text-gray-400">
                    Senin - Sabtu: 08:00 - 20:00<br />
                    Minggu: 09:00 - 17:00<br />
                    <span className="text-cyan-400">Teknisi Siap Sedia</span><br />
                    <span className="text-sm">Layanan Cepat & Responsif</span>
                  </p>
                </div>
              </div>
            </div>

            <Button
              size="lg"
              className="w-full text-base px-6 py-6 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
              onClick={openGoogleMaps}
            >
              <Navigation className="mr-2" size={20} />
              Buka di Google Maps
            </Button>

            <a
              href="https://wa.me/6285233053443?text=Halo%20UNNET,%20saya%20ingin%20tanya%20tentang%20paket%20internet"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button
                size="lg"
                variant="outline"
                className="w-full text-base px-6 py-6 rounded-xl glass glass-hover border-green-500/30"
              >
                <Phone className="mr-2" size={20} />
                Chat WhatsApp
              </Button>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="metric-card overflow-hidden h-full min-h-[400px] md:min-h-[500px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.8!2d111.7626166!3d-7.2648367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e79d5e75d766211%3A0x2c8b3ef233d2ef5a!2sUNNET%20WIFI%20cepat%20tanggap%20teknisinya!5e0!3m2!1sen!2sid!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: '1rem' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="UNNET Location"
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-4 px-6 py-4 rounded-2xl glass">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm">Teknisi Cepat Tanggap</span>
            </div>
            <div className="hidden md:block w-px h-6 bg-white/20"></div>
            <div className="flex items-center gap-2">
              <MapPin className="text-cyan-400" size={16} />
              <span className="text-sm">Melayani Seluruh Jawa Timur</span>
            </div>
            <div className="hidden md:block w-px h-6 bg-white/20"></div>
            <div className="flex items-center gap-2">
              <Phone className="text-cyan-400" size={16} />
              <span className="text-sm">Support 24/7</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
