import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle, User, Phone, MapPin, Package as PackageIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface Package {
    id?: number;
    name: string;
    speed: string;
    price: string;
    features: string[];
}

interface RegistrationFormProps {
    packages: Package[];
    selectedPackage?: string;
    whatsappNumber?: string;
    siteName?: string;
}

export default function RegistrationForm({ packages, selectedPackage, whatsappNumber, siteName }: RegistrationFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        package: selectedPackage || '',
        notes: ''
    });
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        if (selectedPackage) {
            setFormData(prev => ({ ...prev, package: selectedPackage }));
        }
    }, [selectedPackage]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Save to database
            await fetch('http://localhost:9000/api/registrations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            // Show success animation
            setShowSuccess(true);

            // Wait for animation then redirect to WhatsApp
            setTimeout(() => {
                const selectedPkg = packages.find(p => p.name === formData.package);
                const message = `Halo ${siteName || 'UNNET'}, saya ingin mendaftar:%0A%0ANama: ${formData.name}%0ANo. HP: ${formData.phone}%0AAlamat: ${formData.address}%0APaket: ${formData.package}${selectedPkg ? ` (${selectedPkg.speed} - ${selectedPkg.price})` : ''}${formData.notes ? `%0ACatatan: ${formData.notes}` : ''}`;
                window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
                
                // Reset form
                setFormData({
                    name: '',
                    phone: '',
                    address: '',
                    package: '',
                    notes: ''
                });
                setShowSuccess(false);
                setLoading(false);
            }, 2500);
        } catch (error) {
            console.error(error);
            alert('Gagal mengirim pendaftaran. Silakan coba lagi.');
            setLoading(false);
        }
    };

    return (
        <>
            <section id="registration" className="py-20 px-4 relative">
                <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4 text-gradient bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                            Formulir Pendaftaran
                        </h2>
                        <p className="text-gray-400">
                            Isi data Anda dan kami akan segera menghubungi Anda
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="glass p-8 rounded-2xl space-y-6">
                        {/* Nama Lengkap */}
                        <div>
                            <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                                <User size={16} className="text-cyan-400" />
                                Nama Lengkap
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 focus:border-cyan-500 transition-all outline-none"
                                placeholder="Masukkan nama lengkap Anda"
                            />
                        </div>

                        {/* No. WhatsApp */}
                        <div>
                            <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                                <Phone size={16} className="text-cyan-400" />
                                No. WhatsApp
                            </label>
                            <input
                                type="tel"
                                required
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 focus:border-cyan-500 transition-all outline-none"
                                placeholder="628xxxxxxxxxx"
                            />
                        </div>

                        {/* Alamat Lengkap */}
                        <div>
                            <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                                <MapPin size={16} className="text-cyan-400" />
                                Alamat Lengkap
                            </label>
                            <textarea
                                required
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 focus:border-cyan-500 transition-all outline-none resize-none h-24"
                                placeholder="Jl. Contoh No. 123, RT/RW, Kelurahan, Kecamatan, Kota"
                            />
                        </div>

                        {/* Pilih Paket */}
                        <div>
                            <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                                <PackageIcon size={16} className="text-cyan-400" />
                                Pilih Paket
                            </label>
                            <select
                                required
                                value={formData.package}
                                onChange={(e) => setFormData({ ...formData, package: e.target.value })}
                                className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 focus:border-cyan-500 transition-all outline-none"
                            >
                                <option value="">-- Pilih Paket --</option>
                                {packages.map((pkg, idx) => (
                                    <option key={idx} value={pkg.name}>
                                        {pkg.name} - {pkg.speed} ({pkg.price})
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Catatan (Optional) */}
                        <div>
                            <label className="block text-sm font-semibold mb-2">
                                Catatan (Opsional)
                            </label>
                            <textarea
                                value={formData.notes}
                                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 focus:border-cyan-500 transition-all outline-none resize-none h-20"
                                placeholder="Tambahkan catatan atau pertanyaan..."
                            />
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin mr-2" size={20} />
                                    Memproses...
                                </>
                            ) : (
                                'Daftar Sekarang'
                            )}
                        </Button>

                        <p className="text-center text-sm text-gray-400 mt-4">
                            Dengan mendaftar, Anda akan dihubungkan ke WhatsApp kami untuk proses selanjutnya
                        </p>
                    </form>
                </div>
            </section>

            {/* Success Modal */}
            <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
                <DialogContent>
                    <DialogHeader>
                        <div className="flex items-center justify-center mb-4">
                            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center animate-scale-in">
                                <CheckCircle className="w-10 h-10 text-green-500 animate-check" />
                            </div>
                        </div>
                        <DialogTitle className="text-center text-2xl">Pendaftaran Berhasil!</DialogTitle>
                        <DialogDescription className="text-center text-base">
                            Anda akan diarahkan ke WhatsApp untuk melanjutkan proses pendaftaran...
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    );
}
