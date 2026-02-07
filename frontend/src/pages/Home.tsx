import { useState } from 'react'
import { motion } from 'framer-motion'
import ThreeBackground from '@/components/ThreeBackground'
import Hero from '@/components/Hero'
import Plans from '@/components/Plans'
import Features from '@/components/Features'
import Testimonials from '@/components/Testimonials'
import Location from '@/components/Location'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/lib/ThemeContext'
import { useSettings } from '@/hooks/useSettings'

function NavBar({ siteTitle }: { siteTitle: string }) {
    const { theme, toggleTheme } = useTheme()

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
            <div className="max-w-6xl mx-auto flex justify-between items-center glass rounded-full px-6 py-3">
                <div className="flex items-center gap-2">
                    <span className="material-icons text-cyan-400">wifi</span>
                    <span className="font-display text-xl font-bold text-white">
                        {siteTitle ? (
                            <>
                                {siteTitle.substring(0, 2)}<span className="text-cyan-400">{siteTitle.substring(2)}</span>
                            </>
                        ) : (
                            <>UN<span className="text-cyan-400">NET</span></>
                        )}
                    </span>
                </div>
                <div className="hidden md:flex gap-6 text-sm">
                    <a href="#features" className="hover:text-cyan-400 transition-colors">Fitur</a>
                    <a href="#plans" className="hover:text-cyan-400 transition-colors">Paket</a>
                    <a href="#location" className="hover:text-cyan-400 transition-colors">Lokasi</a>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full glass glass-hover transition-all duration-300 hover:scale-110"
                        aria-label="Ganti tema"
                    >
                        {theme === 'dark' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400">
                                <circle cx="12" cy="12" r="5" />
                                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500">
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                            </svg>
                        )}
                    </button>
                    <Button
                        size="sm"
                        className="rounded-full bg-cyan-500 hover:bg-cyan-600"
                        onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                        Daftar Sekarang
                    </Button>
                </div>
            </div>
        </nav>
    )
}

export default function Home() {
    const [loading, setLoading] = useState(true)
    const { settings } = useSettings()

    setTimeout(() => setLoading(false), 1500)

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full"
                    />
                    <motion.p
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-white text-lg font-display font-bold"
                    >
                        {settings?.site_title || 'UNNET'}
                    </motion.p>
                </div>
            </div>
        )
    }

    return (
        <div className="relative min-h-screen overflow-x-hidden">
            <ThreeBackground />

            <NavBar siteTitle={settings?.site_title || 'UNNET'} />

            <main>
                <Hero settings={settings} />
                <Features settings={settings} />
                <Plans />
                <Testimonials settings={settings} />
                <Location settings={settings} />
                <CTA settings={settings} />
            </main>

            <Footer settings={settings} />

            {/* Floating WhatsApp Button */}
            <motion.a
                href="https://wa.me/6285233053443?text=Halo%20UNNET,%20saya%20ingin%20tanya%20tentang%20paket%20internet"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 w-12 h-12 md:w-14 md:h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
                style={{ boxShadow: '0 4px 20px rgba(34, 197, 94, 0.4)' }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="white"
                    className="md:w-7 md:h-7"
                >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
            </motion.a>
        </div>
    )
}
