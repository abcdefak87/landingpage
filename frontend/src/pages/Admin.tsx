import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Trash2, Plus, Save, Moon, Sun, Settings, Package, MapPin, FileText, LogOut, RefreshCw } from 'lucide-react';
import { useTheme } from '@/lib/ThemeContext';

interface Setting {
    key: string;
    value: string;
}

interface Package {
    id?: number;
    name: string;
    speed: string;
    price: string;
    features: string[];
}

export default function Admin() {
    const { theme, toggleTheme } = useTheme();
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);

    // Data States
    const [settings, setSettings] = useState<Record<string, string>>({});
    const [packages, setPackages] = useState<Package[]>([]);

    // Form States
    const [newPackage, setNewPackage] = useState<Package>({ name: '', speed: '', price: '', features: [] });
    const [featuresInput, setFeaturesInput] = useState('');

    const API_URL = 'http://localhost:9000/api';

    useEffect(() => {
        if (isAuthenticated) {
            fetchData();
        }
    }, [isAuthenticated]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const settingsRes = await fetch(`${API_URL}/settings`);
            const packagesRes = await fetch(`${API_URL}/packages`);

            const settingsData: Setting[] = await settingsRes.json();
            const packagesData: Package[] = await packagesRes.json();

            const settingsMap: Record<string, string> = {};
            settingsData.forEach(s => settingsMap[s.key] = s.value);

            setSettings(settingsMap);
            setPackages(packagesData);
        } catch (error) {
            console.error("Failed to fetch data", error);
            alert("Gagal mengambil data dari server. Pastikan backend berjalan.");
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'admin123') {
            setIsAuthenticated(true);
        } else {
            alert('Password salah!');
        }
    };

    const handleUpdateSetting = async (key: string, value: string) => {
        try {
            await fetch(`${API_URL}/settings`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ key, value }),
            });
            setSettings(prev => ({ ...prev, [key]: value }));
            alert(`Setting ${key} berhasil disimpan!`);
        } catch (error) {
            console.error(error);
            alert("Gagal menyimpan setting.");
        }
    };

    const handleAddPackage = async () => {
        try {
            const pkg = { ...newPackage, features: featuresInput.split(',').map(s => s.trim()).filter(s => s) };
            await fetch(`${API_URL}/packages`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(pkg),
            });
            setNewPackage({ name: '', speed: '', price: '', features: [] });
            setFeaturesInput('');
            fetchData(); // Refresh list
            alert("Paket berhasil ditambah!");
        } catch (error) {
            console.error(error);
            alert("Gagal menambah paket.");
        }
    };

    const handleDeletePackage = async (id: number) => {
        if (!confirm("Yakin hapus paket ini?")) return;
        try {
            await fetch(`${API_URL}/packages/${id}`, { method: 'DELETE' });
            fetchData();
        } catch (error) {
            console.error(error);
            alert("Gagal menghapus paket.");
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <form onSubmit={handleLogin} className="bg-card p-8 rounded-xl max-w-sm w-full mx-4 border shadow-xl">
                    <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
                    <div className="mb-4">
                        <input
                            type="password"
                            placeholder="Masukkan password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-background border focus:outline-none focus:border-cyan-500 transition-colors"
                        />
                        <p className="text-xs text-muted-foreground mt-2">Default: admin123</p>
                    </div>
                    <Button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 rounded-lg transition-colors">Login</Button>
                </form>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background p-4 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <header className="flex flex-wrap justify-between items-center gap-4 mb-8 bg-card p-4 rounded-xl border backdrop-blur-md sticky top-4 z-50 shadow-lg">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-cyan-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                            <Settings className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                            <p className="text-xs text-muted-foreground font-medium">PENGATURAN & MANAJEMEN KONTEN</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="icon" onClick={toggleTheme} title="Toggle Theme">
                            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                        </Button>
                        <Button variant="outline" onClick={fetchData} disabled={loading} className="gap-2">
                            {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <RefreshCw className="w-4 h-4" />}
                            Refresh
                        </Button>
                        <Button variant="destructive" onClick={() => setIsAuthenticated(false)} className="gap-2">
                            <LogOut className="w-4 h-4" /> Logout
                        </Button>
                    </div>
                </header>

                <div className="space-y-6">
                    {/* Data Umum */}
                    <div className="bg-card p-6 rounded-xl border shadow-lg">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-3 text-cyan-600 dark:text-cyan-400 border-b pb-3">
                            <div className="p-2 bg-cyan-500/10 rounded-lg">
                                <FileText className="w-5 h-5" />
                            </div>
                            <span>Data Umum</span>
                        </h2>
                        <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-muted-foreground uppercase mb-2">
                                        Nama Website / Brand
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            className="flex-1 px-4 py-2.5 rounded-lg bg-background border focus:border-cyan-500 transition-all outline-none"
                                            placeholder="UNNET"
                                            value={settings['site_title'] || ''}
                                            onChange={(e) => setSettings(prev => ({ ...prev, 'site_title': e.target.value }))}
                                        />
                                        <Button size="icon" variant="ghost" onClick={() => handleUpdateSetting('site_title', settings['site_title'])}>
                                            <Save size={16} />
                                        </Button>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-muted-foreground uppercase mb-2">No. WhatsApp</label>
                                    <div className="flex gap-2">
                                        <input
                                            className="flex-1 px-4 py-2.5 rounded-lg bg-background border focus:border-cyan-500 transition-all outline-none"
                                            placeholder="6281234567890"
                                            value={settings['whatsapp_number'] || ''}
                                            onChange={(e) => setSettings(prev => ({ ...prev, 'whatsapp_number': e.target.value }))}
                                        />
                                        <Button size="icon" variant="ghost" onClick={() => handleUpdateSetting('whatsapp_number', settings['whatsapp_number'])}>
                                            <Save size={16} />
                                        </Button>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-muted-foreground uppercase mb-2">Email Kontak</label>
                                    <div className="flex gap-2">
                                        <input
                                            className="flex-1 px-4 py-2.5 rounded-lg bg-background border focus:border-cyan-500 transition-all outline-none"
                                            placeholder="info@unnet.id"
                                            value={settings['email'] || ''}
                                            onChange={(e) => setSettings(prev => ({ ...prev, 'email': e.target.value }))}
                                        />
                                        <Button size="icon" variant="ghost" onClick={() => handleUpdateSetting('email', settings['email'])}>
                                            <Save size={16} />
                                        </Button>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-muted-foreground uppercase mb-2">Tagline / Slogan</label>
                                    <div className="flex gap-2">
                                        <input
                                            className="flex-1 px-4 py-2.5 rounded-lg bg-background border focus:border-cyan-500 transition-all outline-none"
                                            placeholder="Internet Cepat & Stabil"
                                            value={settings['tagline'] || ''}
                                            onChange={(e) => setSettings(prev => ({ ...prev, 'tagline': e.target.value }))}
                                        />
                                        <Button size="icon" variant="ghost" onClick={() => handleUpdateSetting('tagline', settings['tagline'])}>
                                            <Save size={16} />
                                        </Button>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-muted-foreground uppercase mb-2">Jam Operasional</label>
                                    <div className="flex gap-2">
                                        <input
                                            className="flex-1 px-4 py-2.5 rounded-lg bg-background border focus:border-cyan-500 transition-all outline-none"
                                            placeholder="Senin - Sabtu, 08:00 - 20:00"
                                            value={settings['work_hours'] || ''}
                                            onChange={(e) => setSettings(prev => ({ ...prev, 'work_hours': e.target.value }))}
                                        />
                                        <Button size="icon" variant="ghost" onClick={() => handleUpdateSetting('work_hours', settings['work_hours'])}>
                                            <Save size={16} />
                                        </Button>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-muted-foreground uppercase mb-2">Alamat Lengkap</label>
                                    <div className="flex gap-2">
                                        <textarea
                                            className="flex-1 px-4 py-2.5 rounded-lg bg-background border focus:border-cyan-500 transition-all outline-none resize-none h-24"
                                            placeholder="Jl. Contoh No. 123, Kota, Provinsi"
                                            value={settings['address'] || ''}
                                            onChange={(e) => setSettings(prev => ({ ...prev, 'address': e.target.value }))}
                                        />
                                        <Button size="icon" variant="ghost" onClick={() => handleUpdateSetting('address', settings['address'])}>
                                            <Save size={16} />
                                        </Button>
                                    </div>
                                </div>
                        </div>
                    </div>

                    {/* Maps Settings */}
                    <div className="bg-card p-6 rounded-xl border shadow-lg">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-3 text-green-600 dark:text-green-400 border-b pb-3">
                            <div className="p-2 bg-green-500/10 rounded-lg">
                                <MapPin className="w-5 h-5" />
                            </div>
                            <span>Lokasi Peta</span>
                        </h2>
                        <div>
                            <label className="block text-xs font-semibold text-muted-foreground uppercase mb-2">
                                Google Maps Embed Code
                            </label>
                                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 mb-4 text-xs">
                                    <strong>Cara:</strong> Buka Google Maps → Bagikan → Sematkan Peta → Salin HTML
                                </div>
                                <div className="space-y-3">
                                    <div className="flex gap-2">
                                        <textarea
                                            className="flex-1 px-3 py-2 rounded-lg bg-background border h-10 font-mono text-xs focus:border-green-500 transition-all outline-none resize-none"
                                            placeholder='<iframe src="https://www.google.com/maps/embed?pb=..." ...></iframe>'
                                            onChange={(e) => {
                                                const input = e.target.value;
                                                let embedUrl = input;
                                                const srcMatch = input.match(/src="([^"]+)"/);
                                                if (srcMatch && srcMatch[1]) embedUrl = srcMatch[1];

                                                if (embedUrl.includes('google.com/maps/embed')) {
                                                    setSettings(prev => ({ ...prev, 'map_embed_url': embedUrl }));
                                                    const longMatch = embedUrl.match(/!2d([\d\.]+)/);
                                                    const latMatch = embedUrl.match(/!3d([\d\.-]+)/);
                                                    if (latMatch && longMatch) {
                                                        const lat = latMatch[1];
                                                        const long = longMatch[1];
                                                        const directLink = `https://www.google.com/maps/search/?api=1&query=${lat},${long}`;
                                                        setSettings(prev => ({ ...prev, 'map_direct_url': directLink, 'map_embed_url': embedUrl }));
                                                    }
                                                }
                                            }}
                                        />
                                        <Button
                                            size="icon"
                                            className="bg-green-600 hover:bg-green-700 text-white"
                                            onClick={() => {
                                                handleUpdateSetting('map_embed_url', settings['map_embed_url']);
                                                handleUpdateSetting('map_direct_url', settings['map_direct_url']);
                                            }}
                                        >
                                            <Save size={16} />
                                        </Button>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="bg-muted p-3 rounded-lg flex justify-between items-center">
                                            <span className="text-xs font-medium">Embed URL</span>
                                            <span className={`text-xs font-bold px-2 py-1 rounded ${settings['map_embed_url'] ? 'bg-green-500/20 text-green-600 dark:text-green-400' : 'bg-red-500/20 text-red-600 dark:text-red-400'}`}>
                                                {settings['map_embed_url'] ? '✅' : '❌'}
                                            </span>
                                        </div>
                                        <div className="bg-muted p-3 rounded-lg flex justify-between items-center">
                                            <span className="text-xs font-medium">Direct Link</span>
                                            <span className={`text-xs font-bold px-2 py-1 rounded ${settings['map_direct_url'] ? 'bg-green-500/20 text-green-600 dark:text-green-400' : 'bg-red-500/20 text-red-600 dark:text-red-400'}`}>
                                                {settings['map_direct_url'] ? '✅' : '❌'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>

                    {/* Packages */}
                    <div className="bg-card p-6 rounded-xl border shadow-lg">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-3 text-purple-600 dark:text-purple-400 border-b pb-3">
                            <div className="p-2 bg-purple-500/10 rounded-lg">
                                <Package className="w-5 h-5" />
                            </div>
                            <span>Paket Internet</span>
                        </h2>

                        {/* Add Package Form */}
                        <div className="bg-muted/50 p-4 rounded-lg mb-6 border">
                            <h3 className="font-bold mb-4 text-sm flex items-center gap-2">
                                <Plus size={14} /> Tambah Paket Baru
                            </h3>
                            <div className="space-y-3">
                                <input
                                    placeholder="Paket Basic"
                                    className="w-full px-3 py-2 rounded-lg bg-background border text-sm focus:border-purple-500 transition-colors outline-none"
                                    value={newPackage.name}
                                    onChange={e => setNewPackage({ ...newPackage, name: e.target.value })}
                                />
                                <input
                                    placeholder="10 Mbps"
                                    className="w-full px-3 py-2 rounded-lg bg-background border text-sm focus:border-purple-500 transition-colors outline-none"
                                    value={newPackage.speed}
                                    onChange={e => setNewPackage({ ...newPackage, speed: e.target.value })}
                                />
                                <input
                                    placeholder="Rp 200.000/bulan"
                                    className="w-full px-3 py-2 rounded-lg bg-background border text-sm focus:border-purple-500 transition-colors outline-none"
                                    value={newPackage.price}
                                    onChange={e => setNewPackage({ ...newPackage, price: e.target.value })}
                                />
                                <textarea
                                    placeholder="Unlimited Kuota, Free Instalasi, Support 24/7"
                                    className="w-full px-3 py-2 rounded-lg bg-background border text-sm h-20 resize-none focus:border-purple-500 transition-colors outline-none"
                                    value={featuresInput}
                                    onChange={e => setFeaturesInput(e.target.value)}
                                />
                                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white" onClick={handleAddPackage}>
                                    <Plus className="mr-2 h-4 w-4" /> Tambah
                                </Button>
                            </div>
                        </div>

                        {/* Packages List */}
                        <div className="space-y-3">
                            {packages.map(pkg => (
                                <div key={pkg.id} className="group relative bg-muted/30 hover:bg-muted/50 p-4 rounded-lg border transition-all">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="font-bold text-base">{pkg.name}</div>
                                        <div className="text-xs font-bold bg-purple-500/20 text-purple-600 dark:text-purple-400 px-2 py-1 rounded">{pkg.speed}</div>
                                    </div>
                                    <div className="font-medium mb-2 text-sm">{pkg.price}</div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {pkg.features.map((f, i) => (
                                            <span key={i} className="text-xs bg-background px-2 py-0.5 rounded border">{f}</span>
                                        ))}
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-red-500 transition-all w-8 h-8"
                                        onClick={() => pkg.id && handleDeletePackage(pkg.id)}
                                        title="Hapus Paket"
                                    >
                                        <Trash2 size={14} />
                                    </Button>
                                </div>
                            ))}
                            {packages.length === 0 && (
                                <div className="text-center py-12 text-muted-foreground border-2 border-dashed rounded-lg">
                                    <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                    <p className="text-sm">Belum ada paket.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
