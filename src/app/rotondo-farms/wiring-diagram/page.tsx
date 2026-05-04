export default function WiringDiagram() {
    return (
        <div className="container" style={{ paddingBottom: '0', maxWidth: '100%', padding: '7rem 1rem 0' }}>
            <a href="/rotondo-farms" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '2rem', textDecoration: 'none' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 12H5M12 5l-7 7 7 7" />
                </svg>
                Rotondo Farms
            </a>
            <div style={{ marginBottom: '1.5rem' }}>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontWeight: 400, fontSize: '2rem', marginBottom: '0.25rem' }}>Wiring Diagram</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Full breadboard and GPIO wiring reference</p>
            </div>
            <div style={{ overflowX: 'auto', width: '100%', display: 'flex', justifyContent: 'center' }}>
                <iframe
                    src="/wiring-diagram.html"
                    style={{ width: '80%', height: '90vh', border: 'none', borderRadius: '12px' }}
                />
            </div>
        </div>
    );
}
