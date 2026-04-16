export default function Story() {
    return (
        <div className="container">
            <div className="story-header">
                <div className="story-meta">
                    <span className="story-genre">Fantasy</span>
                    <span className="story-date">Mar 2025</span>
                </div>
                <h1 className="story-title-full">At the Foot of a Mountain</h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '480px', marginBottom: '2rem' }}>
                    A story of a blacksmith striking the elements of life.
                </p>

               <a href="/stories/at-the-foot-of-a-mountain.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                </svg>
                Read Story (PDF)
            </a>
        </div>
</div>
);
}
