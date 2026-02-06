import { motion } from 'framer-motion'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Send, CheckCircle, Loader2, MapPin, Phone, Mail } from 'lucide-react'

export default function CTA() {
  const [formData, setFormData] = useState({ name: '', phone: '', address: '', package: 'starter' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      setIsSubmitted(true)
      setFormData({ name: '', phone: '', address: '', package: 'starter' })
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="cta" className="scroll-section px-6 md:px-12 lg:px-20 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Siap <span className="text-gradient bg-gradient-to-r from-cyan-400 to-blue-500">Berinternet</span> Lebih Cepat?
            </h2>
            <p className="text-gray-400 text-base md:text-lg mb-6 md:mb-8">
              Isi formulir di samping dan tim kami akan menghubungi Anda dalam 24 jam untuk proses instalasi.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-cyan-500/20">
                  <MapPin className="text-cyan-400" size={24} />
                </div>
                <div>
                  <div className="font-semibold">Area Layanan</div>
                  <div className="text-gray-400 text-sm">Jawa Timur & Sekitarnya - Teknisi Cepat Tanggap</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-blue-500/20">
                  <Phone className="text-blue-400" size={24} />
                </div>
                <div>
                  <div className="font-semibold">WhatsApp</div>
                  <a href="https://wa.me/6285233053443" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 text-sm">
                    0852-3305-3443
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-purple-500/20">
                  <Mail className="text-purple-400" size={24} />
                </div>
                <div>
                  <div className="font-semibold">Email</div>
                  <div className="text-gray-400 text-sm">info@unnet.id</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="glass rounded-2xl md:rounded-3xl p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Formulir Pendaftaran</h3>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 text-green-500 mb-6"
                  >
                    <CheckCircle size={40} />
                  </motion.div>
                  <h4 className="text-xl font-semibold mb-2">Pendaftaran Berhasil!</h4>
                  <p className="text-gray-400">Tim kami akan menghubungi Anda segera.</p>
                  <Button
                    variant="outline"
                    className="mt-6"
                    onClick={() => setIsSubmitted(false)}
                  >
                    Daftar Lagi
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Nama Lengkap</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 md:px-4 py-2 md:py-3 rounded-xl glass focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300 text-sm md:text-base"
                      placeholder="Nama Anda"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Nomor Telepon</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 md:px-4 py-2 md:py-3 rounded-xl glass focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300 text-sm md:text-base"
                      placeholder="0812xxxxxx"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Alamat Instalasi</label>
                    <textarea
                      required
                      rows={3}
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-3 md:px-4 py-2 md:py-3 rounded-xl glass focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300 resize-none text-sm md:text-base"
                      placeholder="Jl. ... Rt/Rw ..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Paket Pilihan</label>
                    <select
                      value={formData.package}
                      onChange={(e) => setFormData({ ...formData, package: e.target.value })}
                      className="w-full px-3 md:px-4 py-2 md:py-3 rounded-xl glass focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300 text-sm md:text-base"
                    >
                      <option value="starter">Starter - 30 Mbps (Rp 150rb/bulan)</option>
                      <option value="standard">Standard - 100 Mbps (Rp 250rb/bulan)</option>
                      <option value="premium">Premium - 300 Mbps (Rp 450rb/bulan)</option>
                      <option value="business">Business - 1 Gbps (Rp 850rb/bulan)</option>
                    </select>
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full text-base md:text-lg py-5 md:py-6 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 md:h-5 md:w-5 animate-spin" />
                        Mengirim...
                      </>
                    ) : (
                      <>
                        Daftar Sekarang
                        <Send className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
