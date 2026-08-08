export const posts = [
  {
    slug: 'data-pipeline',
    date: '2026-08-09',
    dateLabel: 'August 9, 2026',
    title: 'Inside the Sinew Pipeline: From Raw Capture to Training-Ready Trajectories',
    excerpt:
      'A walkthrough of what comes out the other end of a capture session: metric camera pose, 3D hand keypoints, dense depth, and retargeted gripper actions, all frame-synchronized from a single take.',
    readingTime: '6 min read',
  },
];

export function getPost(slug) {
  return posts.find((post) => post.slug === slug);
}
