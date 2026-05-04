'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

type Sensor = {
    channel: string;
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
    const [sensors, setSensors] = useState<Sensor[]>([]);
    const [lastUpdated, setLastUpdated] = useState<string>('');
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('https://dashboard.rotondofarms.com/data');
                const json = await res.json();
                setSensors(json.sensors);
                setLastUpdated(new Date().toLocaleTimeString());
                setError(false);
            } catch {
                setError(true);
            }
        };
        fetchData();
        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
    }, []);

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
                <Link href="/rotondo-farms/wiring-diagram" style={{ textDecoration: 'none' }}>
                    <div className="home-card" style={{ cursor: 'pointer', padding: '1.5rem' }}>
                        <div className="home-card-icon" style={{ background: '#e8f5e9', fontSize: '1.1rem', marginBottom: '0.75rem' }}>🔌</div>
                        <h4 style={{ marginBottom: '0.25rem' }}>Wiring Diagram</h4>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Breadboard layout &amp; GPIO connections</p>
                    </div>
                </Link>
            </div>

            {/* Sensor Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                gap: '1rem'
            }}>
                {sensors.length > 0 ? sensors.map((sensor) => (
                    <div key={sensor.channel} className="home-card" style={{ padding: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <div className="home-card-icon" style={{ background: '#e8f5e9', fontSize: '1.25rem' }}>💧</div>
                            <span style={{
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                padding: '0.25rem 0.75rem',
                                borderRadius: '100px',
                                background: STATUS_COLORS[sensor.status],
                                color: 'white'
                            }}>
                    {sensor.status}
                </span>
                        </div>
                        <h4 style={{ marginBottom: '0.5rem' }}>Soil Moisture</h4>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '1.25rem' }}>
                            Sensor {sensor.channel}
                        </p>
                        <div style={{ background: 'var(--accent-light)', borderRadius: '999px', height: '10px', marginBottom: '0.75rem', overflow: 'hidden' }}>
                            <div style={{
                                height: '100%',
                                borderRadius: '999px',
                                width: `${sensor.percent}%`,
                                background: STATUS_COLORS[sensor.status],
                                transition: 'width 0.8s ease, background 0.8s ease'
                            }} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <span style={{ fontFamily: 'DM Serif Display, serif', fontSize: '2.5rem', fontWeight: 400 }}>
                    {sensor.percent}%
                </span>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    Raw: {sensor.raw}
                </span>
                        </div>
                        <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '1rem' }}>
                            {lastUpdated ? `Updated ${lastUpdated}` : 'Connecting...'}
                        </p>
                    </div>
                )) : ['A0', 'A1', 'A2', 'A3'].map((channel) => (
                    <div key={channel} className="home-card" style={{ padding: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <div className="home-card-icon" style={{ background: '#f5f5f5', fontSize: '1.25rem' }}>💧</div>
                            <span style={{
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                padding: '0.25rem 0.75rem',
                                borderRadius: '100px',
                                background: '#9e9e9e',
                                color: 'white'
                            }}>
                    Offline
                </span>
                        </div>
                        <h4 style={{ marginBottom: '0.5rem' }}>Soil Moisture</h4>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '1.25rem' }}>
                            Sensor {channel}
                        </p>
                        <div style={{ background: 'var(--accent-light)', borderRadius: '999px', height: '10px', marginBottom: '0.75rem', overflow: 'hidden' }}>
                            <div style={{ height: '100%', borderRadius: '999px', width: '0%', background: '#9e9e9e' }} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <span style={{ fontFamily: 'DM Serif Display, serif', fontSize: '2.5rem', fontWeight: 400, color: 'var(--text-secondary)' }}>
                    --%
                </span>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    Raw: --
                </span>
                        </div>
                        <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '1rem' }}>
                            ⚠️ System offline
                        </p>
                    </div>
                ))}
            </div>

        </div>
    );
}
