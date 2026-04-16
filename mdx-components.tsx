import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        h1: ({ children }) => <h1 className="story-title-full">{children}</h1>,
        p: ({ children }) => <p className="story-paragraph">{children}</p>,
        ...components,
    };
}
