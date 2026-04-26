'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

type SensorData = {
    percent: number;
    status: 'Wet' | 'OK' | 'Dry';
    raw: number;
};

const STATUS_COLORS: Record<string, string> = {
    Wet: '#1565c0',
    OK: '#2e7d32',
    Dry: '#b71c1c',
};

export default function RotondoFarms() {
    const [data, setData] = useState<SensorData | null>(null);
    const [lastUpdated, setLastUpdated] = useState<string>('');
    const [error, setError] = useState(false);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const res = await fetch('YOUR_TUNNEL_URL/data');
    //             const json = await res.json();
    //             setData(json);
    //             setLastUpdated(new Date().toLocaleTimeString());
    //             setError(false);
    //         } catch {
    //             setError(true);
    //         }
    //     };
    //     fetchData();
    //     const interval = setInterval(fetchData, 5000);
    //     return () => clearInterval(interval);
    // }, []);

    return (
        <div className="container">

            {/* Logo Header */}
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <img
                    src="/rotondofarms.png"
                    alt="Rotondo Farms"
                    style={{ width: '220px', marginBottom: '0.5rem' }}
                />
                <p style={{ color: 'var(--text-secondary)' }}>Live sensor readings from the indoor grow system</p>
            </div>

            {/* Nav Cards */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                gap: '1rem',
                marginBottom: '3rem'
            }}>
                <Link href="/rotondo-farms/power-flow" style={{ textDecoration: 'none' }}>
                    <div className="home-card" style={{ cursor: 'pointer', padding: '1.5rem' }}>
                        <div className="home-card-icon" style={{ background: '#fff3e0', fontSize: '1.1rem', marginBottom: '0.75rem' }}>⚡</div>
                        <h4 style={{ marginBottom: '0.25rem' }}>Power Flow</h4>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Circuit diagram &amp; live power budget</p>
                    </div>
                </Link>
            </div>

            {/* Sensor Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                gap: '1rem'
            }}>
                <div className="home-card" style={{ padding: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <div className="home-card-icon" style={{ background: '#e8f5e9', fontSize: '1.25rem' }}>💧</div>
                        {data && (
                            <span style={{
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                padding: '0.25rem 0.75rem',
                                borderRadius: '100px',
                                background: STATUS_COLORS[data.status],
                                color: 'white'
                            }}>
                                {data.status}
                            </span>
                        )}
                    </div>
                    <h4 style={{ marginBottom: '0.5rem' }}>Soil Moisture</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '1.25rem' }}>
                        Sensor A0 — Plant 1
                    </p>
                    <div style={{ background: 'var(--accent-light)', borderRadius: '999px', height: '10px', marginBottom: '0.75rem', overflow: 'hidden' }}>
                        <div style={{
                            height: '100%',
                            borderRadius: '999px',
                            width: data ? `${data.percent}%` : '0%',
                            background: data ? STATUS_COLORS[data.status] : '#ccc',
                            transition: 'width 0.8s ease, background 0.8s ease'
                        }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        <span style={{ fontFamily: 'DM Serif Display, serif', fontSize: '2.5rem', fontWeight: 400 }}>
                            {data ? `${data.percent}%` : '--'}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                            {data ? `Raw: ${data.raw}` : ''}
                        </span>
                    </div>
                    <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '1rem' }}>
                        {error ? '⚠️ Could not reach sensor' : lastUpdated ? `Updated ${lastUpdated}` : 'Disabled for now'}
                    </p>
                </div>
            </div>

        </div>
    );
}
