'use client';

import { useEffect, useState } from 'react';

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}

const GITHUB_USERNAME = 'Nicholas-Rotondo';

const languageColors: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Go: '#00ADD8',
  Rust: '#dea584',
  Ruby: '#701516',
  Swift: '#F05138',
};

export default function CodingPage() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRepos() {
      try {
        const res = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=12`
        );
        if (!res.ok) throw new Error('Failed to fetch repos');
        const data = await res.json();
        setRepos(data);
      } catch (err) {
        setError('Could not load repositories');
      } finally {
        setLoading(false);
      }
    }
    fetchRepos();
  }, []);

  return (
    <div className="container">
      <div className="section-header">
        <h2>Projects</h2>
        <p>My open source work and coding projects on GitHub</p>
      </div>

      {loading && <p className="loading-text">Loading repositories...</p>}
      {error && <p className="error-text">{error}</p>}

      <div className="repos-grid">
        {repos.map((repo) => (
          <a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="repo-card"
          >
            <div className="repo-header">
              <svg
                className="repo-icon"
                viewBox="0 0 16 16"
                fill="currentColor"
                width="16"
                height="16"
              >
                <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z" />
              </svg>
              <span className="repo-name">{repo.name}</span>
            </div>
            <p className="repo-description">
              {repo.description || 'No description'}
            </p>
            <div className="repo-meta">
              {repo.language && (
                <span className="repo-language">
                  <span
                    className="language-dot"
                    style={{
                      background: languageColors[repo.language] || '#888',
                    }}
                  />
                  {repo.language}
                </span>
              )}
              {repo.stargazers_count > 0 && (
                <span className="repo-stat">
                  <svg viewBox="0 0 16 16" fill="currentColor" width="14" height="14">
                    <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" />
                  </svg>
                  {repo.stargazers_count}
                </span>
              )}
              {repo.forks_count > 0 && (
                <span className="repo-stat">
                  <svg viewBox="0 0 16 16" fill="currentColor" width="14" height="14">
                    <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z" />
                  </svg>
                  {repo.forks_count}
                </span>
              )}
            </div>
          </a>
        ))}
      </div>

      <div className="github-link-container">
        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary"
        >
          View all on GitHub
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
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>
      </div>
    </div>
  );
}
