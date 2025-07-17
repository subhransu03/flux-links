import type { Category, Shortcut } from './types';

export const DEFAULT_CATEGORIES: Category[] = [
  { id: '1', name: 'Productivity' },
  { id: '2', name: 'Social' },
  { id: '3', name: 'Development' },
  { id: '4', name: 'News' },
];

export const DEFAULT_SHORTCUTS: Shortcut[] = [
  { id: '1', name: 'GitHub', url: 'https://github.com', categoryId: '3' },
  { id: '2', name: 'Twitter (X)', url: 'https://x.com', categoryId: '2' },
  { id: '3', name: 'Vercel', url: 'https://vercel.com', categoryId: '3' },
  { id: '4', name: 'Figma', url: 'https://figma.com', categoryId: '1' },
  { id: '5', name: 'Reddit', url: 'https://reddit.com', categoryId: '2' },
  { id: '6', name: 'Hacker News', url: 'https://news.ycombinator.com', categoryId: '4' },
  { id: '7', name: 'Linear', url: 'https://linear.app', categoryId: '1' },
  { id: '8', name: 'Stack Overflow', url: 'https://stackoverflow.com', categoryId: '3' },
];
