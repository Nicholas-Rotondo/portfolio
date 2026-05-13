import type { Metadata } from 'next';
import Image from 'next/image';

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

        excerpt: 'A story of a blacksmith striking the elements of life.',
        gradient: 'gradient-1',
        pdf: '/stories/at-the-foot-of-a-mountain.pdf',
    },
    {
        id: 'the-man-who-swam-to-the-moon',
        title: 'The Man Who Swam to the Moon',
        genre: 'Fantasy',
        date: 'Mar 2025',

        excerpt: 'A journey that where the moon stirs the waves of the heart',
        gradient: 'gradient-2',
        pdf: '/stories/the-man-who-swam-to-the-moon.pdf',
    },
    {
        id: 'a-tale-of-two-stones',
        title: 'A Tale of Two Stones',
        genre: 'Fantasy',
        date: 'Mar 2025',
        // TODO: excerpt needs to be updated
        excerpt: 'A tale of a young man travelling with the wind',
        gradient: 'gradient-3',
        pdf: '/stories/a-tale-of-two-stones.pdf',
    },
];

export default function StoriesPage() {
    return (
        <div className="container">
            <div className="section-header">
                <h2>Short Stories</h2>
                <p>Three short stories compiled in <em>A Palette of Life</em>.</p>
            </div>

            <div className="book-feature">
                <Image
                    src="/palette-of-life-cover.png"
                    alt="A Palette of Life — book cover"
                    width={440}
                    height={660}
                    className="book-feature-cover"
                    priority
                />
                <div className="book-feature-content">
                    <h3>A Palette of Life</h3>
                    <p>
                        A compilation of three short fantasy stories exploring craft, longing,
                        and the quiet weight of small moments. Each story is available to read
                        as a PDF below.
                    </p>
                </div>
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
                            <a
                                href={story.pdf}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="read-more"
                            >
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
