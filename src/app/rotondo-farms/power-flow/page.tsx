'use client';
import { useState } from 'react';
import Link from 'next/link';

type Component = {
    label: string;
    sub: string;
    watts: number;
    color: string;
    textColor: string;
};

type Circuit = {
    id: string;
    title: string;
    components: Component[];
    chargerMax: number;
};

const DEFAULT_CIRCUITS: Circuit[] = [
    {
        id: 'pump',
        title: 'PUMP CIRCUIT (5V DC)',
        chargerMax: 10,
        components: [
            { label: 'USB charger', sub: '5V · 1-2A', watts: 10, color: '#1a7a4a', textColor: '#fff' },
            { label: 'Relay (K1)', sub: 'COM → NO switch', watts: 0.36, color: '#b85c00', textColor: '#fff' },
            { label: 'Pump motor', sub: '5V DC', watts: 5, color: '#1a5fa8', textColor: '#fff' },
            { label: 'Water flow', sub: 'drip emitters', watts: 0, color: '#0e7490', textColor: '#fff' },
        ],
    },
    {
        id: 'pi',
        title: 'PI CIRCUIT (5V DC)',
        chargerMax: 10,
        components: [
            { label: 'USB charger', sub: '5V · 2A', watts: 10, color: '#3b3bcc', textColor: '#fff' },
            { label: 'Raspberry Pi Zero 2W', sub: '5V · ~1W idle', watts: 2.5, color: '#5c3bcc', textColor: '#fff' },
            { label: 'Float switch', sub: 'GPIO17 · 3.3V', watts: 0.01, color: '#7c3bcc', textColor: '#fff' },
        ],
    },
    {
        id: 'sensor',
        title: 'SENSOR CIRCUIT (3.3V VIA PI)',
        chargerMax: 0,
        components: [
            { label: 'ADS1115 ADC', sub: '3.3V · I2C · 0x48', watts: 0.001, color: '#374151', textColor: '#fff' },
            { label: 'Moisture sensor', sub: 'A0 · wet ~10900', watts: 0.033, color: '#1a7a4a', textColor: '#fff' },
        ],
    },
    {
        id: 'light',
        title: 'GROW LIGHT CIRCUIT (120V AC)',
        chargerMax: 120,
        components: [
            { label: 'Wall outlet', sub: '120V AC', watts: 120, color: '#374151', textColor: '#fff' },
            { label: 'Mars Hydro TS600', sub: '120V · 100W actual', watts: 100, color: '#7c2d12', textColor: '#fff' },
        ],
    },
];

const BUDGET_ROWS = [
    { label: 'Relay coil', circuit: 'pump', watts: 0.36 },
    { label: 'Pump motor', circuit: 'pump', watts: 5.0 },
    { label: 'Pi Zero 2W', circuit: 'pi', watts: 2.5 },
    { label: 'Float switch', circuit: 'pi', watts: 0.01 },
    { label: 'ADS1115 ADC', circuit: 'pi', watts: 0.001 },
    { label: 'Moisture sensor', circuit: 'pi', watts: 0.033 },
];

export default function PowerFlow() {
    const [circuits, setCircuits] = useState(DEFAULT_CIRCUITS);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editVal, setEditVal] = useState('');

    const pumpDraw = circuits[0].components.slice(1, 3).reduce((s, c) => s + c.watts, 0);
    const piDraw = circuits[1].components.slice(1).reduce((s, c) => s + c.watts, 0)
        + circuits[2].components.reduce((s, c) => s + c.watts, 0);
    const lightDraw = circuits[3].components[1].watts;
    const totalDraw = pumpDraw + piDraw + lightDraw;
    const combinedSupply = 120;
    const allWithinLimits = pumpDraw <= 10 && piDraw <= 10;

    const updateWatts = (circuitId: string, compIdx: number, val: number) => {
        setCircuits(prev => prev.map(c =>
            c.id === circuitId
                ? { ...c, components: c.components.map((comp, i) => i === compIdx ? { ...comp, watts: val } : comp) }
                : c
        ));
    };

    const editKey = (circuitId: string, compIdx: number) => `${circuitId}-${compIdx}`;

    return (
        <div className="container">

            {/* Back link */}
            <Link href="/rotondo-farms" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '2rem', textDecoration: 'none' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 12H5M12 5l-7 7 7 7" />
                </svg>
                Rotondo Farms
            </Link>

            <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontWeight: 400, fontSize: '2rem', marginBottom: '0.25rem' }}>Power Flow</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Click watt values to edit · live budget updates below</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '1.5rem', alignItems: 'start' }}>

                {/* Left: Diagram */}
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '2rem' }}>

                    {/* AC Mains */}
                    <p style={{ fontSize: '0.7rem', letterSpacing: '0.08em', color: 'var(--text-secondary)', marginBottom: '1rem' }}>AC MAINS SUPPLY</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                        <div style={{ background: '#1e1e1e', border: '1px solid #444', borderRadius: '8px', padding: '0.75rem 1rem', minWidth: '120px' }}>
                            <p style={{ fontSize: '0.8rem', fontWeight: 600, color: '#fff', marginBottom: '0.25rem' }}>Wall outlet</p>
                            <p style={{ fontSize: '0.7rem', color: '#aaa', marginBottom: '0.5rem' }}>120V AC</p>
                            <span style={{ background: '#2a2a2a', border: '1px solid #555', borderRadius: '4px', padding: '0.2rem 0.5rem', fontSize: '0.75rem', color: '#fff' }}>15 A · 120V</span>
                        </div>
                        <Arrow />
                        <div style={{ background: '#1e1e1e', border: '1px solid #444', borderRadius: '8px', padding: '0.75rem 1rem', flex: 1 }}>
                            <p style={{ fontSize: '0.8rem', fontWeight: 600, color: '#fff', marginBottom: '0.25rem' }}>6-outlet strip</p>
                            <p style={{ fontSize: '0.7rem', color: '#aaa', marginBottom: '0.5rem' }}>Max: 1,800 W</p>
                            <div style={{ display: 'flex', gap: '4px', marginBottom: '0.5rem' }}>
                                {['#1a7a4a', '#3b3bcc', '#7c2d12', '#444', '#444', '#444'].map((bg, i) => (
                                    <div key={i} style={{ width: '18px', height: '18px', borderRadius: '3px', background: bg }} />
                                ))}
                            </div>
                            <p style={{ fontSize: '0.7rem', color: '#aaa' }}>Strip load: <span style={{ color: '#4ade80', fontWeight: 600 }}>{totalDraw.toFixed(2)} W</span> · {((totalDraw / 1800) * 100).toFixed(0)}%</p>
                        </div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                            <div>↓ USB charger (pump)</div>
                            <div>↓ USB charger (Pi)</div>
                            <div>↓ Mars Hydro TS600</div>
                            <div>↓ other devices</div>
                        </div>
                    </div>

                    {/* Circuits */}
                    {circuits.map((circuit, ci) => (
                        <div key={circuit.id} style={{ marginBottom: '2rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                                {ci > 0 && <div style={{ width: '2px', height: '24px', marginRight: '0.25rem', borderLeft: ci === 2 ? '2px dashed #888' : '2px solid #4ade80' }} />}
                                <p style={{ fontSize: '0.7rem', letterSpacing: '0.08em', color: 'var(--text-secondary)' }}>{circuit.title}</p>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                                {circuit.components.map((comp, compIdx) => {
                                    const key = editKey(circuit.id, compIdx);
                                    const isPassive = comp.watts === 0;
                                    return (
                                        <div key={compIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <div style={{
                                                background: comp.color,
                                                borderRadius: '8px',
                                                padding: '0.75rem 1rem',
                                                minWidth: '110px',
                                                opacity: isPassive ? 0.7 : 1
                                            }}>
                                                <p style={{ fontSize: '0.8rem', fontWeight: 600, color: comp.textColor, marginBottom: '0.2rem' }}>{comp.label}</p>
                                                <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.7)', marginBottom: '0.5rem' }}>{comp.sub}</p>
                                                {['USB charger', 'Raspberry Pi Zero 2W', 'Mars Hydro TS600'].includes(comp.label) && (
                                                    <span style={{
                                                        fontSize: '0.6rem',
                                                        color: 'rgba(255,255,255,0.5)',
                                                        border: '1px solid rgba(255,255,255,0.2)',
                                                        borderRadius: '3px',
                                                        padding: '1px 5px',
                                                        display: 'inline-block',
                                                        marginBottom: '0.4rem',
                                                        letterSpacing: '0.04em'
                                                    }}>
                                                    6-outlet strip
                                                </span>
                                                )}
                                                {isPassive ? (
                                                    <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.6)' }}>— passive —</span>
                                                ) : (
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                        <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.7)' }}>
                                                            {compIdx === 0 ? 'Max:' : 'Draw:'}
                                                        </span>
                                                        {editingId === key ? (
                                                            <input
                                                                autoFocus
                                                                type="number"
                                                                step="0.001"
                                                                value={editVal}
                                                                onChange={e => setEditVal(e.target.value)}
                                                                onBlur={() => {
                                                                    const v = parseFloat(editVal);
                                                                    if (!isNaN(v)) updateWatts(circuit.id, compIdx, v);
                                                                    setEditingId(null);
                                                                }}
                                                                onKeyDown={e => {
                                                                    if (e.key === 'Enter') {
                                                                        const v = parseFloat(editVal);
                                                                        if (!isNaN(v)) updateWatts(circuit.id, compIdx, v);
                                                                        setEditingId(null);
                                                                    }
                                                                }}
                                                                style={{ width: '60px', background: '#1a1a1a', border: '1px solid #666', borderRadius: '3px', color: '#fff', fontSize: '0.75rem', padding: '1px 4px' }}
                                                            />
                                                        ) : (
                                                            <span
                                                                onClick={() => { setEditingId(key); setEditVal(String(comp.watts)); }}
                                                                style={{ background: '#1a1a1a', border: '1px solid #555', borderRadius: '3px', padding: '1px 6px', fontSize: '0.75rem', color: '#fff', cursor: 'pointer', minWidth: '40px', display: 'inline-block', textAlign: 'center' }}
                                                            >
                                                                {comp.watts}
                                                            </span>
                                                        )}
                                                        <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.7)' }}>W</span>
                                                    </div>
                                                )}
                                            </div>
                                            {compIdx < circuit.components.length - 1 && <Arrow />}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}

                    {/* Legend */}
                    {/* Legend */}
                    <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                        <LegendItem color="#4ade80" label="Power flow" />
                        <LegendItem color="#888" dashed label="Control / data signal" />
                        <LegendItem color="#f59e0b" dashed label="GPIO signal" />
                    </div>
                </div>

                {/* Right: Budget */}
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.5rem' }}>
                    <p style={{ fontSize: '0.7rem', letterSpacing: '0.08em', color: 'var(--text-secondary)', marginBottom: '1rem' }}>POWER BUDGET</p>

                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        background: allWithinLimits ? '#0d2e1a' : '#2e0d0d',
                        border: `1px solid ${allWithinLimits ? '#1a7a4a' : '#7a1a1a'}`,
                        borderRadius: '8px',
                        padding: '0.6rem 1rem',
                        marginBottom: '1.5rem',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        color: allWithinLimits ? '#4ade80' : '#f87171'
                    }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: allWithinLimits ? '#4ade80' : '#f87171' }} />
                        {allWithinLimits ? 'All circuits within limits' : 'Circuit over limit'}
                    </div>

                    <BudgetSection title="PUMP CIRCUIT (5V)" rows={[
                        { label: 'Relay coil', watts: circuits[0].components[1].watts },
                        { label: 'Pump motor', watts: circuits[0].components[2].watts },
                    ]} draw={pumpDraw} chargerMax={10} />

                    <BudgetSection title="PI CIRCUIT (5V)" rows={[
                        { label: 'Pi Zero 2W', watts: circuits[1].components[1].watts },
                        { label: 'Float switch', watts: circuits[1].components[2].watts },
                        { label: 'ADS1115 ADC', watts: circuits[2].components[0].watts },
                        { label: 'Moisture sensor', watts: circuits[2].components[1].watts },
                    ]} draw={piDraw} chargerMax={10} />

                    <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                        <p style={{ fontSize: '0.7rem', letterSpacing: '0.08em', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>TOTAL SYSTEM</p>
                        <BudgetRow label="Peak draw" watts={totalDraw} highlight />
                        <BudgetRow label="Combined supply" watts={combinedSupply} />
                    </div>

                    <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                        <p style={{ fontSize: '0.7rem', letterSpacing: '0.08em', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>6-OUTLET STRIP · WALL CIRCUIT</p>
                        <BudgetRow label="Farm system" watts={totalDraw} highlight />
                        <BudgetRow label="Other devices" watts={0} />
                        <div style={{ height: '1px', background: 'var(--border)', margin: '0.5rem 0' }} />
                        <BudgetRow label="Strip total" watts={totalDraw} highlight />
                        <BudgetRow label="Strip rated max" watts={1800} />
                        <BudgetRow label="Wall circuit" watts={1800} suffix="15 A · " />
                        <BudgetRow label="Wall draw" watts={totalDraw} highlight />
                        <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                            &lt;{Math.ceil((totalDraw / 1800) * 100)}% of wall circuit
                        </p>
                    </div>

                    <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border)', fontSize: '0.7rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                        <p>△ Pump inrush may spike 2–3× rated watts at startup.</p>
                        <p>△ Sensor draw routes through Pi's 3.3V regulator, included in Pi total.</p>
                    </div>
                </div>

            </div>
        </div>
    );
}

function Arrow() {
    return (
        <svg width="24" height="16" viewBox="0 0 24 16" fill="none">
            <line x1="0" y1="8" x2="18" y2="8" stroke="#4ade80" strokeWidth="2" />
            <polyline points="14,4 20,8 14,12" stroke="#4ade80" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function LegendItem({ color, dashed, label }: { color: string; dashed?: boolean; label: string }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            <svg width="28" height="4">
                <line x1="0" y1="2" x2="28" y2="2" stroke={color} strokeWidth="2" strokeDasharray={dashed ? '4 3' : 'none'} />
            </svg>
            {label}
        </div>
    );
}

function BudgetSection({ title, rows, draw, chargerMax }: { title: string; rows: { label: string; watts: number }[]; draw: number; chargerMax: number }) {
    const pct = Math.min(100, (draw / chargerMax) * 100);
    return (
        <div style={{ marginBottom: '1.5rem' }}>
            <p style={{ fontSize: '0.7rem', letterSpacing: '0.08em', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>{title}</p>
            {rows.map((r, i) => <BudgetRow key={i} label={r.label} watts={r.watts} />)}
            <div style={{ height: '1px', background: 'var(--border)', margin: '0.5rem 0' }} />
            <BudgetRow label="Draw" watts={draw} highlight />
            <BudgetRow label="Charger max" watts={chargerMax} />
            <div style={{ background: 'var(--accent-light)', borderRadius: '999px', height: '6px', marginTop: '0.5rem', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${pct}%`, background: pct > 80 ? '#ef4444' : '#4ade80', borderRadius: '999px', transition: 'width 0.5s ease' }} />
            </div>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>{pct.toFixed(0)}% utilized</p>
        </div>
    );
}

function BudgetRow({ label, watts, highlight, suffix }: { label: string; watts: number; highlight?: boolean; suffix?: string }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.2rem 0', fontSize: '0.8rem' }}>
            <span style={{ color: 'var(--text-secondary)' }}>{label}</span>
            <span style={{ fontWeight: highlight ? 700 : 400, color: highlight ? '#4ade80' : 'var(--text)' }}>
                {suffix}{watts.toFixed(watts < 1 ? 3 : 2)} W
            </span>
        </div>
    );
}
