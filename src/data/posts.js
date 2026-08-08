export const posts = [
  {
    slug: 'tactile-sensing',
    date: '2026-08-08',
    dateLabel: 'August 8, 2026',
    title: "Cameras can't feel a grip. So we built a glove that can.",
    excerpt:
      "Every vision-only pipeline hits the same wall: it can see a hand close around something, but it has no idea how hard. Here's the rig we use to close that gap, and why doing it at scale is the actual moat.",
    readingTime: '7 min read',
  },
  {
    slug: 'data-pipeline',
    date: '2026-08-05',
    dateLabel: 'August 5, 2026',
    title: 'One take in a kitchen, four ways of seeing it',
    excerpt:
      "I strapped a camera to my head, diced vegetables for twenty minutes, and ran the tape through our pipeline. Here's what actually comes out the other end.",
    readingTime: '6 min read',
  },
];

export function getPost(slug) {
  return posts.find((post) => post.slug === slug);
}
