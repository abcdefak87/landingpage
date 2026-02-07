import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export default function Hero({ settings }: { settings: any }) {
  return (
    <section className="scroll-section px-6 md:px-12 lg:px-20 min-h-screen flex items-center pt-24 md:pt-0">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative z-10"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full glass text-sm"
            >
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-cyan-300">Now Available in Your Area</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              <span className="text-foreground">Internet</span>
              <br />
              <span className="text-gradient bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                Tanpa Batas
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base md:text-lg text-gray-300 mb-8 leading-relaxed"
            >
              Rasakan kecepatan internet super cepat dengan harga terjangkau.
              {settings?.site_title || 'UNNET'} menghadirkan koneksi stabil untuk rumah dan bisnis Anda.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <Button
                size="lg"
                className="text-base px-6 py-5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Pasang Sekarang
                <span className="ml-2 material-icons" style={{ fontSize: '18px' }}>arrow_forward</span>
              </Button>
              <a
                href={`https://wa.me/${settings?.whatsapp_number}?text=Halo%20${settings?.site_title},%20saya%20ingin%20tanya%20tentang%20paket%20internet`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="text-base px-6 py-5 rounded-full glass glass-hover border-green-500/30 hover:border-green-500/50"
                >
                  <span className="mr-2">💬</span>
                  Chat WhatsApp
                </Button>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-3 gap-4 md:gap-6"
            >
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gradient bg-gradient-to-r from-cyan-400 to-blue-500">
                  Jatim
                </div>
                <div className="text-xs md:text-sm text-gray-400 mt-1">Area Layanan</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gradient bg-gradient-to-r from-blue-500 to-purple-500">
                  1000+
                </div>
                <div className="text-xs md:text-sm text-gray-400 mt-1">Pelanggan Puas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gradient bg-gradient-to-r from-purple-500 to-pink-500">
                  Cepat
                </div>
                <div className="text-xs md:text-sm text-gray-400 mt-1">Teknisi Tanggap</div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="hidden lg:flex relative w-full h-[500px] items-center justify-center"
          >
            <div className="relative w-full h-full">
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 rounded-full bg-cyan-500/20 blur-3xl"
              />
              <motion.div
                animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                className="absolute inset-10 rounded-full bg-blue-500/20 blur-3xl"
              />
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="absolute inset-20 rounded-full bg-purple-500/20 blur-3xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
