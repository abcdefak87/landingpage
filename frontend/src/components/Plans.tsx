import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Check, Wifi } from 'lucide-react'

interface Package {
  id: number;
  name: string;
  speed: string;
  price: string;
  features: string[];
}

interface PlansProps {
  onSelectPackage?: (packageName: string) => void;
}

export default function Plans({ onSelectPackage }: PlansProps) {
  const [plans, setPlans] = useState<Package[]>([])

  useEffect(() => {
    fetch('http://localhost:9000/api/packages')
      .then(res => res.json())
      .then(data => setPlans(data))
      .catch(err => console.error("Failed to fetch packages", err))
  }, [])

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
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-2xl p-5 md:p-6 glass transition-all duration-300 hover:border-cyan-500/50`}
            >
              <div className="text-center mb-4 md:mb-6">
                <h3 className="text-lg md:text-xl font-semibold mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-3xl md:text-4xl font-bold text-gradient bg-gradient-to-r from-cyan-400 to-blue-500">
                    {plan.price}
                  </span>
                </div>
                <div className="flex items-center justify-center gap-2 mt-3 md:mt-4 text-cyan-400">
                  <Wifi size={18} className="md:w-5 md:h-5" />
                  <span className="text-base md:text-lg font-semibold">{plan.speed}</span>
                </div>
              </div>

              <ul className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs md:text-sm">
                    <Check size={14} className="text-green-400 flex-shrink-0 md:w-4 md:h-4" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className="w-full rounded-xl text-sm md:text-base"
                variant="outline"
                onClick={() => onSelectPackage?.(plan.name)}
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
