import { motion } from 'framer-motion'

const features = [
  {
    icon: 'speed',
    title: 'Kecepatan Tinggi',
    description: 'Internet up to 1 Gbps dengan latensi rendah untuk streaming, gaming, dan video call tanpa gangguan.',
  },
  {
    icon: 'router',
    title: 'Fiber Optic',
    description: 'Jaringan fiber optik terkini yang menjamin koneksi stabil dan cepat 24/7.',
  },
  {
    icon: 'support_agent',
    title: 'Support 24/7',
    description: 'Tim dukungan teknis profesional siap membantu Anda kapan saja tanpa biaya tambahan.',
  },
  {
    icon: 'wifi',
    title: 'Free Router',
    description: 'Router WiFi gratis dengan instalasi profesional untuk cobertura optimal di seluruh rumah.',
  },
  {
    icon: 'security',
    title: 'Keamanan Terjamin',
    description: 'Proteksi dari ancaman cyber dan malware dengan sistem keamanan terintegrasi.',
  },
  {
    icon: 'event_available',
    title: 'Tanpa Kontrak',
    description: 'Fleksibilitas penuh tanpa kontrak jangka panjang. Bebas upgrade/downgrade kapan saja.',
  },
]

export default function Features() {
  return (
    <section id="features" className="scroll-section px-6 md:px-12 lg:px-20 py-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Mengapa <span className="text-gradient bg-gradient-to-r from-cyan-400 to-blue-500">UNNET</span>?
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto px-4">
            Kami memberikan pengalaman internet terbaik dengan teknologi tercanggih dan layanan profesional.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mx-auto mt-8" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="metric-card"
            >
              <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-600/10 inline-block mb-3 md:mb-4">
                <span className="material-icons text-cyan-400 text-2xl md:text-3xl">{feature.icon}</span>
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-xs md:text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
