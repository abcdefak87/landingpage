import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Check, Wifi } from 'lucide-react'

const plans = [
  {
    name: 'Starter',
    price: 'Rp 150rb',
    period: '/bulan',
    speed: '30 Mbps',
    features: ['Unlimited Kuota', 'Fixed IP', 'Support 24/7', 'Free Router WiFi'],
    popular: false,
  },
  {
    name: 'Standard',
    price: 'Rp 250rb',
    period: '/bulan',
    speed: '100 Mbps',
    features: ['Unlimited Kuota', 'Fixed IP', 'Priority Support', 'Free Router WiFi', 'Static IP'],
    popular: true,
  },
  {
    name: 'Premium',
    price: 'Rp 450rb',
    period: '/bulan',
    speed: '300 Mbps',
    features: ['Unlimited Kuota', 'Dedicated IP', 'VIP Support', 'Free Router WiFi', 'Free Installation'],
    popular: false,
  },
  {
    name: 'Business',
    price: 'Rp 850rb',
    period: '/bulan',
    speed: '1 Gbps',
    features: ['Unlimited Kuota', 'Dedicated Line', '24/7 On-site Support', 'Enterprise Router', 'SLA 99.99%'],
    popular: false,
  },
]

export default function Plans() {
  return (
    <section id="plans" className="scroll-section px-6 md:px-12 lg:px-20 py-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Paket <span className="text-gradient bg-gradient-to-r from-cyan-400 to-blue-500">Internet</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto px-4">
            Pilih paket yang sesuai dengan kebutuhan Anda. Semua paket sudah termasuk unlimited quota.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mx-auto mt-8" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-2xl p-5 md:p-6 glass transition-all duration-300 ${
                plan.popular ? 'border-2 border-cyan-500 shadow-lg shadow-cyan-500/20' : 'hover:border-cyan-500/50'
              }`}
            >
              {plan.popular && (
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-xs md:text-sm font-semibold whitespace-nowrap"
                >
                  Paling Populer
                </motion.div>
              )}

              <div className="text-center mb-4 md:mb-6">
                <h3 className="text-lg md:text-xl font-semibold mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-3xl md:text-4xl font-bold text-gradient bg-gradient-to-r from-cyan-400 to-blue-500">
                    {plan.price}
                  </span>
                  <span className="text-sm md:text-base text-gray-400">{plan.period}</span>
                </div>
                <div className="flex items-center justify-center gap-2 mt-3 md:mt-4 text-cyan-400">
                  <Wifi size={18} className="md:w-5 md:h-5" />
                  <span className="text-base md:text-lg font-semibold">{plan.speed}</span>
                </div>
              </div>

              <ul className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-xs md:text-sm">
                    <Check size={14} className="text-green-400 flex-shrink-0 md:w-4 md:h-4" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full rounded-xl text-sm md:text-base ${
                  plan.popular
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700'
                    : ''
                }`}
                variant={plan.popular ? 'default' : 'outline'}
                onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Pilih Paket
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
