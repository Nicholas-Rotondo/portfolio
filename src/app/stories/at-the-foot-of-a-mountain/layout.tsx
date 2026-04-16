export default function StoryLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="container">
            <article className="story-full">
                {children}
            </article>
        </div>
    );
}
