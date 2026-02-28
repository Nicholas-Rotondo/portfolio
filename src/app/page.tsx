import Link from 'next/link';

export default function Home() {
  return (
    <div className="container">
      <div className="home-content">
        <div className="avatar">👋</div>
        <div className="hero-text">
          <h1>
            Developer by day,
            <br />
            <span>storyteller by night</span>
          </h1>
          <p>
            I build things with code and craft narratives with words. Welcome to
            my little corner of the internet.
          </p>
          <div className="hero-buttons">
            <Link href="/coding" className="btn btn-primary">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
              </svg>
              View Projects
            </Link>
            <Link href="/stories" className="btn btn-secondary">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
              </svg>
              Read Stories
            </Link>
          </div>
        </div>
        <div className="home-cards">
          <div className="home-card">
            <div className="home-card-icon">💻</div>
            <h4>Developer</h4>
            <p>Building projects on GitHub</p>
          </div>
          <div className="home-card">
            <div className="home-card-icon">✍️</div>
            <h4>Writer</h4>
            <p>Short fiction & creative works</p>
          </div>
          <div className="home-card">
            <div className="home-card-icon">🚀</div>
            <h4>Builder</h4>
            <p>Always creating something new</p>
          </div>
        </div>
      </div>
    </div>
  );
}
