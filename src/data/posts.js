export const posts = [
  {
    slug: 'data-pipeline',
    date: '2026-08-09',
    dateLabel: 'August 9, 2026',
    title: 'One take in a kitchen, four ways of seeing it',
    excerpt:
      "I strapped a camera to my head, diced vegetables for twenty minutes, and ran the tape through our pipeline. Here's what actually comes out the other end.",
    readingTime: '6 min read',
  },
];

export function getPost(slug) {
  return posts.find((post) => post.slug === slug);
}
