import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Trash2, Plus, Save, Moon, Sun, Settings, Package, MapPin, FileText, LogOut, RefreshCw, CheckCircle, Lock, AlertTriangle, Clock, XCircle } from 'lucide-react';
import { useTheme } from '@/lib/ThemeContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

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
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem('admin_authenticated') === 'true';
    });
    const [loading, setLoading] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [savingKey, setSavingKey] = useState<string | null>(null);
    const [loginAttempts, setLoginAttempts] = useState(() => {
        return parseInt(localStorage.getItem('login_attempts') || '0');
    });
    const [lockUntil, setLockUntil] = useState<number | null>(() => {
        const locked = localStorage.getItem('lock_until');
        return locked ? parseInt(locked) : null;
    });
    const [remainingTime, setRemainingTime] = useState(0);
    const [shakeError, setShakeError] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showLoginSuccess, setShowLoginSuccess] = useState(false);

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

    useEffect(() => {
        // Check if account is locked
        if (lockUntil) {
            const now = Date.now();
            if (now < lockUntil) {
                const interval = setInterval(() => {
                    const remaining = Math.ceil((lockUntil - Date.now()) / 1000);
                    if (remaining <= 0) {
                        setLockUntil(null);
                        setLoginAttempts(0);
                        localStorage.removeItem('lock_until');
                        localStorage.removeItem('login_attempts');
                        clearInterval(interval);
                    } else {
                        setRemainingTime(remaining);
                    }
                }, 1000);
                return () => clearInterval(interval);
            } else {
                // Lock expired
                setLockUntil(null);
                setLoginAttempts(0);
                localStorage.removeItem('lock_until');
                localStorage.removeItem('login_attempts');
            }
        }
    }, [lockUntil]);

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
        
        // Check if locked
        if (lockUntil && Date.now() < lockUntil) {
            const minutes = Math.ceil((lockUntil - Date.now()) / 60000);
            setShakeError(true);
            setTimeout(() => setShakeError(false), 500);
            setErrorMessage(`Akun terkunci. Coba lagi dalam ${minutes} menit.`);
            setShowErrorModal(true);
            return;
        }

        if (password === 'admin123') {
            setShowLoginSuccess(true);
            setTimeout(() => {
                setIsAuthenticated(true);
                localStorage.setItem('admin_authenticated', 'true');
                // Reset attempts on successful login
                setLoginAttempts(0);
                localStorage.removeItem('login_attempts');
                localStorage.removeItem('lock_until');
                setShowLoginSuccess(false);
            }, 1500);
        } else {
            setShakeError(true);
            setTimeout(() => setShakeError(false), 500);
            
            const newAttempts = loginAttempts + 1;
            setLoginAttempts(newAttempts);
            localStorage.setItem('login_attempts', newAttempts.toString());

            if (newAttempts >= 3) {
                // Lock for 5 minutes
                const lockTime = Date.now() + (5 * 60 * 1000);
                setLockUntil(lockTime);
                localStorage.setItem('lock_until', lockTime.toString());
                setErrorMessage('Terlalu banyak percobaan gagal! Akun terkunci selama 5 menit.');
            } else {
                setErrorMessage(`Password salah! Sisa percobaan: ${3 - newAttempts}`);
            }
            setShowErrorModal(true);
        }
    };

    const handleUpdateSetting = async (key: string, value: string) => {
        setSavingKey(key);
        try {
            await fetch(`${API_URL}/settings`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ key, value }),
            });
            setSettings(prev => ({ ...prev, [key]: value }));
            setSuccessMessage("Pengaturan berhasil disimpan!");
            setShowSuccessModal(true);
            setTimeout(() => setShowSuccessModal(false), 2000);
        } catch (error) {
            console.error(error);
            alert("Gagal menyimpan setting.");
        } finally {
            setSavingKey(null);
        }
    };

    const handleAddPackage = async () => {
        setSavingKey('add_package');
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
            setSuccessMessage("Paket berhasil ditambahkan!");
            setShowSuccessModal(true);
            setTimeout(() => setShowSuccessModal(false), 2000);
        } catch (error) {
            console.error(error);
            alert("Gagal menambah paket.");
        } finally {
            setSavingKey(null);
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
        const isLocked = !!(lockUntil && Date.now() < lockUntil);
        const minutes = isLocked ? Math.floor(remainingTime / 60) : 0;
        const seconds = isLocked ? remainingTime % 60 : 0;

        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <form 
                    onSubmit={handleLogin} 
                    className={`bg-card p-8 rounded-xl max-w-sm w-full mx-4 border shadow-xl transition-all ${shakeError ? 'animate-shake' : ''}`}
                >
                    <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
                    
                    {isLocked && (
                        <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                            <div className="flex items-center gap-2 justify-center mb-2">
                                <Lock className="w-5 h-5 text-red-500" />
                                <p className="text-red-500 text-sm font-semibold">
                                    Akun Terkunci
                                </p>
                            </div>
                            <div className="flex items-center gap-2 justify-center">
                                <Clock className="w-4 h-4 text-red-400" />
                                <p className="text-red-400 text-xs">
                                    Coba lagi dalam {minutes}:{seconds.toString().padStart(2, '0')}
                                </p>
                            </div>
                        </div>
                    )}

                    {!isLocked && loginAttempts > 0 && (
                        <div className="mb-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                            <div className="flex items-center gap-2 justify-center">
                                <AlertTriangle className="w-4 h-4 text-yellow-500" />
                                <p className="text-yellow-500 text-xs">
                                    Sisa percobaan: {3 - loginAttempts}
                                </p>
                            </div>
                        </div>
                    )}

                    <div className="mb-4">
                        <input
                            type="password"
                            placeholder="Masukkan password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLocked}
                            className="w-full px-4 py-3 rounded-lg bg-background border focus:outline-none focus:border-cyan-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                    </div>
                    <Button 
                        type="submit" 
                        disabled={isLocked}
                        className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLocked ? (
                            <>
                                <Lock className="w-4 h-4 mr-2" />
                                Terkunci
                            </>
                        ) : (
                            'Login'
                        )}
                    </Button>
                </form>

                {/* Error Modal */}
                <Dialog open={showErrorModal} onOpenChange={setShowErrorModal}>
                    <DialogContent>
                        <DialogHeader>
                            <div className="flex items-center justify-center mb-4">
                                <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center animate-scale-in">
                                    <XCircle className="w-8 h-8 text-red-500 animate-check" />
                                </div>
                            </div>
                            <DialogTitle className="text-center text-red-500">Login Gagal</DialogTitle>
                            <DialogDescription className="text-center">
                                {errorMessage}
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>

                {/* Success Modal */}
                <Dialog open={showLoginSuccess} onOpenChange={setShowLoginSuccess}>
                    <DialogContent>
                        <DialogHeader>
                            <div className="flex items-center justify-center mb-4">
                                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center animate-scale-in">
                                    <CheckCircle className="w-8 h-8 text-green-500 animate-check" />
                                </div>
                            </div>
                            <DialogTitle className="text-center text-green-500">Login Berhasil!</DialogTitle>
                            <DialogDescription className="text-center">
                                Selamat datang di Admin Dashboard
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
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
                        <Button variant="destructive" onClick={() => {
                            setIsAuthenticated(false);
                            localStorage.removeItem('admin_authenticated');
                        }} className="gap-2">
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
                                        <Button size="icon" variant="ghost" onClick={() => handleUpdateSetting('site_title', settings['site_title'])} disabled={savingKey === 'site_title'}>
                                            {savingKey === 'site_title' ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
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
                                        <Button size="icon" variant="ghost" onClick={() => handleUpdateSetting('whatsapp_number', settings['whatsapp_number'])} disabled={savingKey === 'whatsapp_number'}>
                                            {savingKey === 'whatsapp_number' ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
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
                                        <Button size="icon" variant="ghost" onClick={() => handleUpdateSetting('email', settings['email'])} disabled={savingKey === 'email'}>
                                            {savingKey === 'email' ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
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
                                        <Button size="icon" variant="ghost" onClick={() => handleUpdateSetting('tagline', settings['tagline'])} disabled={savingKey === 'tagline'}>
                                            {savingKey === 'tagline' ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
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
                                        <Button size="icon" variant="ghost" onClick={() => handleUpdateSetting('work_hours', settings['work_hours'])} disabled={savingKey === 'work_hours'}>
                                            {savingKey === 'work_hours' ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
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
                                        <Button size="icon" variant="ghost" onClick={() => handleUpdateSetting('address', settings['address'])} disabled={savingKey === 'address'}>
                                            {savingKey === 'address' ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
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
                                            disabled={savingKey === 'map_embed_url' || savingKey === 'map_direct_url'}
                                        >
                                            {(savingKey === 'map_embed_url' || savingKey === 'map_direct_url') ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
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
                                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white" onClick={handleAddPackage} disabled={savingKey === 'add_package'}>
                                    {savingKey === 'add_package' ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
                                    {savingKey === 'add_package' ? 'Menambahkan...' : 'Tambah'}
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

            {/* Success Modal */}
            <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
                <DialogContent>
                    <DialogHeader>
                        <div className="flex items-center justify-center mb-4">
                            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center animate-scale-in">
                                <CheckCircle className="w-8 h-8 text-green-500 animate-check" />
                            </div>
                        </div>
                        <DialogTitle className="text-center">Berhasil!</DialogTitle>
                        <DialogDescription className="text-center">
                            {successMessage}
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}
