import { useState, useEffect } from 'react';
import { API_URL } from '@/config';

interface Settings {
    site_title: string;
    whatsapp_number: string;
    address: string;
    map_embed_url: string;
    map_direct_url: string;
    email: string;
    work_hours: string;
    tagline: string;
}

export function useSettings() {
    const [settings, setSettings] = useState<Settings>({
        site_title: 'UNNET',
        whatsapp_number: '6285233053443',
        address: 'Jawa Timur & Sekitarnya',
        map_embed_url: '',
        map_direct_url: '',
        email: 'info@unnet.id',
        work_hours: 'Senin - Sabtu: 08:00 - 20:00',
        tagline: 'Teknisi Cepat Tanggap'
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_URL}/settings`)
            .then(res => res.json())
            .then(data => {
                const newSettings: any = {};
                data.forEach((s: any) => newSettings[s.key] = s.value);
                setSettings(prev => ({ ...prev, ...newSettings }));
            })
            .catch(err => console.error("Failed to fetch settings", err))
            .finally(() => setLoading(false));
    }, []);

    return { settings, loading };
}
