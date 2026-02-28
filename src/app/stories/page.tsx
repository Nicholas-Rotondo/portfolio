import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Stories | Portfolio',
  description: 'A collection of short fiction and creative writing',
};

const stories = [
  {
    id: 'the-last-compiler',
    title: 'The Last Compiler',
    genre: 'Sci-Fi',
    date: 'Dec 2024',
    excerpt:
      "In a world where AI writes all code, one human programmer holds the key to humanity's digital future. But the machines are learning faster than anyone anticipated.",
    gradient: 'gradient-1',
  },
  {
    id: 'echoes-in-the-algorithm',
    title: 'Echoes in the Algorithm',
    genre: 'Literary',
    date: 'Nov 2024',
    excerpt:
      "Maya discovers her late grandmother's voice preserved in an old answering machine. What she hears changes everything she thought she knew about family secrets.",
    gradient: 'gradient-2',
  },
  {
    id: 'weight-of-unwritten-words',
    title: 'The Weight of Unwritten Words',
    genre: 'Magical Realism',
    date: 'Oct 2024',
    excerpt:
      "A bookshop owner finds that unsold books literally weigh more the longer they stay on shelves. Some have become so heavy, they're sinking through the floor.",
    gradient: 'gradient-3',
  },
  {
    id: 'thirty-seven-minutes',
    title: 'Thirty-Seven Minutes',
    genre: 'Thriller',
    date: 'Sep 2024',
    excerpt:
      "A cybersecurity analyst has exactly thirty-seven minutes to prevent a global blackout. The catch? The attack is coming from inside her own mind.",
    gradient: 'gradient-4',
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
