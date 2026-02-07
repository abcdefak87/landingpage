import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

export default function Testimonials({ settings }: { settings: any }) {
  const testimonials = [
    {
      name: 'Pak Budi',
      role: 'Pemilik Warnet',
      rating: 5,
      text: `Teknisi ${settings?.site_title || 'UNNET'} sangat cepat tanggap! Pas ada masalah langsung datang. Internet stabil untuk warnet, pelanggan puas.`,
      avatar: '👨‍💼',
    },
    {
      name: 'Bu Siti',
      role: 'Ibu Rumah Tangga',
      rating: 5,
      text: 'Harga terjangkau, internet cepat. Anak-anak bisa sekolah online lancar. Teknisinya ramah dan profesional.',
      avatar: '👩',
    },
    {
      name: 'Mas Ahmad',
      role: 'Freelancer',
      rating: 5,
      text: 'Paling cocok buat kerja dari rumah. Koneksi stabil, jarang putus. Teknisi cepat datang kalau ada kendala.',
      avatar: '👨‍💻',
    },
    {
      name: 'Mbak Dewi',
      role: 'Pemilik Cafe',
      rating: 5,
      text: `WiFi untuk cafe lancar jaya. Pelanggan senang, bisnis makin ramai. Pelayanan ${settings?.site_title || 'UNNET'} top!`,
      avatar: '👩‍🍳',
    },
    {
      name: 'Mas Rudi',
      role: 'Gamer',
      rating: 5,
      text: 'Ping rendah, cocok banget buat main game online. Teknisi juga ngerti kebutuhan gamer. Mantap!',
      avatar: '🎮',
    },
    {
      name: 'Kak Linda',
      role: 'Content Creator',
      rating: 5,
      text: 'Upload video cepat, streaming lancar tanpa buffering. Teknisi responsif, masalah cepat selesai.',
      avatar: '📹',
    },
  ]

  return (
    <section className="scroll-section px-6 md:px-12 lg:px-20 py-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Apa Kata <span className="text-gradient bg-gradient-to-r from-cyan-400 to-blue-500">Pelanggan</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto px-4">
            Pelanggan di Jawa Timur puas dengan layanan {settings?.site_title || 'UNNET'}. Teknisi cepat tanggap dan profesional.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mx-auto mt-8" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="metric-card group relative"
            >
              <Quote className="absolute top-3 right-3 md:top-4 md:right-4 text-cyan-500/20 group-hover:text-cyan-500/40 transition-colors" size={32} />

              <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                <div className="text-3xl md:text-4xl">{testimonial.avatar}</div>
                <div>
                  <h4 className="font-semibold text-sm md:text-base">{testimonial.name}</h4>
                  <p className="text-xs md:text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-3 md:mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={14} className="fill-yellow-400 text-yellow-400 md:w-4 md:h-4" />
                ))}
              </div>

              <p className="text-gray-300 text-xs md:text-sm leading-relaxed">"{testimonial.text}"</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass">
            <Star className="fill-yellow-400 text-yellow-400" size={20} />
            <span className="font-semibold">Rating Tinggi</span>
            <span className="text-gray-400">dari pelanggan di Google Maps</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
