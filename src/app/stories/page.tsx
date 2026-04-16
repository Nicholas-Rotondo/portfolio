import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Stories | Portfolio',
    description: 'A collection of short fiction and creative writing',
};

const stories = [
    {
        id: 'at-the-foot-of-a-mountain',
        title: 'At the Foot of a Mountain',
        genre: 'Fantasy',
        date: 'Mar 2025',
        excerpt:
            "A story of a blacksmith striking the elements of life.",
        gradient: 'gradient-1',
    },
];

export default function StoriesPage() {
    return (
        <div className="container">
            <div className="section-header">
                <h2>Short Stories</h2>
                <p>A collection of fiction exploring ideas, emotions, and possibilities</p>
            </div>

            <div className="stories-grid">
                {stories.map((story) => (
                    <article key={story.id} className="story-card">
                        <div className={`story-image ${story.gradient}`} />
                        <div className="story-content">
                            <div className="story-meta">
                                <span className="story-genre">{story.genre}</span>
                                <span className="story-date">{story.date}</span>
                            </div>
                            <h3 className="story-title">{story.title}</h3>
                            <p className="story-excerpt">{story.excerpt}</p>
                            <a href={`/stories/${story.id}`} className="read-more">
                                Read story
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </a>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}
