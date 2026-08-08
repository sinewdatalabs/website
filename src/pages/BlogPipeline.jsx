import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Container, Divider, Stack, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import VideoFigure from '../components/VideoFigure';
import { getPost } from '../data/posts';

const mono = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: '0.78rem',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: '#8a8a85',
};

const displayFont = "'Pixelify Sans', sans-serif";
const bodyFont = "'Inter', sans-serif";

const base = import.meta.env.BASE_URL;
const asset = (name) => `${base}videos/${name}`;

const bodyText = {
  color: '#54544f',
  fontFamily: bodyFont,
  fontSize: '1.02rem',
  lineHeight: 1.85,
  mb: 2.5,
};

function SectionHeading({ index, children }) {
  return (
    <Box sx={{ mt: { xs: 7, md: 9 }, mb: 3 }}>
      <Typography sx={{ ...mono, mb: 1.5 }}>{index}</Typography>
      <Typography
        variant="h2"
        sx={{
          color: '#171717',
          fontFamily: displayFont,
          fontWeight: 500,
          fontSize: { xs: '1.45rem', md: '1.85rem' },
          lineHeight: 1.35,
        }}
      >
        {children}
      </Typography>
    </Box>
  );
}

// Retargeting output/writeup is pulled from the live post for now. The section
// stays in place below, just gated off, so it's easy to bring back later.
const SHOW_RETARGETING = false;

const stages = [
  { label: 'Camera pose', detail: '6-DoF trajectory, metric, world frame' },
  { label: 'Hand tracking', detail: '21 keypoints per hand, depth-backed' },
  { label: 'Depth', detail: 'Confidence-masked metric depth' },
  ...(SHOW_RETARGETING ? [{ label: 'Retargeting', detail: 'Parallel-jaw gripper poses' }] : []),
];

export default function BlogPipeline() {
  const post = getPost('data-pipeline');

  return (
    <Box sx={{ width: '100%' }}>
      {/* Header */}
      <Box sx={{ py: { xs: 7, md: 10 }, borderBottom: '1px solid #e4e4e1' }}>
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: '780px' }}>
            <Button
              component={RouterLink}
              to="/blog"
              startIcon={<ArrowBack sx={{ fontSize: 15 }} />}
              sx={{ ...mono, color: '#8a8a85', px: 0, mb: 4, '&:hover': { backgroundColor: 'transparent', color: '#171717' } }}
            >
              All posts
            </Button>

            <Stack direction="row" spacing={2} sx={{ mb: 2.5, alignItems: 'baseline', flexWrap: 'wrap' }}>
              <Typography sx={{ ...mono }}>{post.dateLabel}</Typography>
              <Typography sx={{ ...mono, color: '#b4b4b0' }}>{post.readingTime}</Typography>
            </Stack>

            <Typography
              variant="h1"
              sx={{
                color: '#171717',
                fontFamily: displayFont,
                fontWeight: 500,
                fontSize: { xs: '1.9rem', md: '2.7rem' },
                lineHeight: 1.28,
                mb: 3,
              }}
            >
              {post.title}
            </Typography>

            <Typography sx={{ color: '#54544f', fontFamily: bodyFont, fontSize: '1.08rem', lineHeight: 1.8 }}>
              {post.excerpt}
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Body */}
      <Box sx={{ py: { xs: 7, md: 9 } }}>
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: '780px' }}>
            <Typography sx={bodyText}>
              Everything in this post comes from one recording: me, a head-mounted camera, and a cutting board.
              No mocap suit, no rig, no lab, just a normal kitchen counter and about twenty minutes of dicing
              vegetables the way anyone actually would. That's on purpose. If the pipeline only holds up on a
              clean, staged take, it's not much use to us, because messy and ordinary is most of what this data
              actually looks like.
            </Typography>
            <Typography sx={bodyText}>
              A raw session on its own is barely anything, just RGB frames and some inertial data.{' '}
              {SHOW_RETARGETING
                ? "What we actually need is four things: where the camera was, where the hands were, how far away everything is, and what a robot's gripper would have done in the same spot. That's what this pipeline turns one take into, and because all four come from the same frame index, you can line them up and ask what was happening at any single moment."
                : "What we actually need is where the camera was, where the hands were, and how far away everything is. That's what this pipeline turns one take into, and because all three come from the same frame index, you can line them up and ask what was happening at any single moment."}
            </Typography>

            {/* Stage summary */}
            <Box
              sx={{
                my: { xs: 5, md: 6 },
                border: '1px solid #e4e4e1',
                borderRadius: '10px',
                backgroundColor: '#f3f3f0',
                p: { xs: 3, md: 3.5 },
              }}
            >
              <Typography sx={{ ...mono, mb: 2.5 }}>Pipeline outputs</Typography>
              <Stack divider={<Divider sx={{ borderColor: '#e4e4e1' }} />}>
                {stages.map((stage, index) => (
                  <Stack
                    key={stage.label}
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={{ xs: 0.5, sm: 3 }}
                    sx={{ py: 1.5, alignItems: { xs: 'flex-start', sm: 'baseline' } }}
                  >
                    <Typography sx={{ ...mono, color: '#b4b4b0', minWidth: '2.5rem' }}>
                      {String(index + 1).padStart(2, '0')}
                    </Typography>
                    <Typography
                      sx={{ fontFamily: bodyFont, fontWeight: 600, color: '#171717', fontSize: '0.95rem', minWidth: '9rem' }}
                    >
                      {stage.label}
                    </Typography>
                    <Typography sx={{ fontFamily: bodyFont, color: '#6b6b67', fontSize: '0.92rem', lineHeight: 1.6 }}>
                      {stage.detail}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Box>

            {/* 01 */}
            <SectionHeading index="01 / Camera pose">Figuring out where I actually was.</SectionHeading>
            <Typography sx={bodyText}>
              The first problem is boring but non-negotiable: we need to know exactly where the camera was, every
              frame, in real units. Visual-inertial odometry gets us a 6-DoF pose per frame in a gravity-aligned
              frame, and because it's scaled against the inertial data, the numbers come out in actual metres, not
              some unit that only means something relative to itself. That matters more than it sounds like it
              should, because none of what comes later, reach, grip distance, any of it, means anything if it isn't
              in real-world scale.
            </Typography>
            <Typography sx={bodyText}>
              In the clip below, grey is the full path, green is what's been covered so far, and the yellow
              frustum is wherever the camera happened to be pointing. I cover about a metre and a half of counter
              over the take, and watching it back, my head dips toward the board more than I would have guessed,
              which is exactly the kind of motion that trips up simpler frame-to-frame tracking.
            </Typography>
            <VideoFigure
              src={asset('camera_pose_motion.mp4')}
              poster={asset('camera_pose_motion.jpg')}
              label="Fig. 01"
              caption="Reconstructed camera trajectory in the world frame, with the source RGB inset. Axes show the camera's local frame; the yellow frustum is the current view direction."
            />

            {/* 02 */}
            <SectionHeading index="02 / Hand tracking">Two hands, twenty-one points each, no faking it.</SectionHeading>
            <Typography sx={bodyText}>
              Both hands get tracked at 21 keypoints, every frame, tagged with which hand it is and how confident
              the model is. On its own that's just a flat skeleton. What makes it useful is fusing each point
              against the depth stream so it lands somewhere real in space, here both wrists sit around 0.66 to
              0.67 metres from the camera, which checks out for someone standing over a counter.
            </Typography>
            <Typography sx={bodyText}>
              We don't hide the parts where it doesn't work. A solid dot means depth came back clean for that
              point; a hollow one means it didn't, usually a thin finger edge or light bouncing oddly off the
              blade. That flag ships with the data too, so whoever's training on it can down-weight or drop a
              shaky joint instead of quietly trusting an interpolated guess.
            </Typography>
            <VideoFigure
              src={asset('hand_tracking_motion.mp4')}
              poster={asset('hand_tracking_motion.jpg')}
              label="Fig. 02"
              caption="Per-frame hand keypoints with handedness, confidence, and fused metric depth per wrist. Filled dots have a real depth return; hollow dots do not."
            />

            {/* 03 */}
            <SectionHeading index="03 / Depth">Depth you can trust, because we throw out what you can't.</SectionHeading>
            <Typography sx={bodyText}>
              Depth is metric and per-pixel, and before anything touches it, we mask it against the sensor's own
              confidence channel. The colour scale is fixed across the whole clip rather than renormalised frame
              to frame, so the same colour always means the same distance, watch the counter and it stays a flat,
              boring plane instead of shifting colour every time my head moves.
            </Typography>
            <Typography sx={bodyText}>
              We log how much of each frame survives that mask. On this clip it's about 97.7%, at a median scene
              distance of 1.55 m. That coverage number is one of the things we actually gate on before a session
              ships, drop below threshold and the take gets flagged instead of quietly going out the door.
            </Typography>
            <VideoFigure
              src={asset('depth_map.mp4')}
              poster={asset('depth_map.jpg')}
              label="Fig. 03"
              caption="Source RGB alongside confidence-masked metric depth. Black regions are pixels rejected by the confidence mask; the colourbar is fixed across the sequence."
            />

            {/* 04 — retargeting output/writeup, held back from the live post for now */}
            {SHOW_RETARGETING && (
              <>
                <SectionHeading index="04 / Retargeting">Turning a hand into something a robot could use.</SectionHeading>
                <Typography sx={bodyText}>
                  None of the above is an action a robot can act on, a hand skeleton isn't a policy target. The last
                  step converts the tracked hand into a parallel-jaw gripper pose: a position, an orientation, and how
                  open the jaws are, per frame, plus the pose of whatever's being handled, so the grasp is defined
                  relative to the thing being grasped, not to some fixed point in the room.
                </Typography>
                <Typography sx={bodyText}>
                  We also paint my arms out of the render. What's left is a scene with the object and the gripper, but
                  not me, which is a lot closer to what a robot will actually see when it runs the policy, and it
                  keeps the model from latching onto human skin as a shortcut. This is the step that lets one take get
                  reused across different grippers without recapturing anything.
                </Typography>
                <VideoFigure
                  src={asset('gripper_render.mp4')}
                  poster={asset('gripper_render.jpg')}
                  label="Fig. 04"
                  caption="Retargeted parallel-jaw gripper poses with the demonstrator's arms inpainted out, alongside the tracked object. Axis triads mark each gripper frame."
                />
              </>
            )}

            {/* Close */}
            <SectionHeading index={SHOW_RETARGETING ? '05 / What ships' : '04 / What ships'}>
              {SHOW_RETARGETING ? 'One take, four things that actually line up.' : 'One take, three things that actually line up.'}
            </SectionHeading>
            <Typography sx={bodyText}>
              {SHOW_RETARGETING
                ? "Every clip above is the same 1,933 frames of the same twenty minutes. That's really the whole point, because pose, hands, depth, and gripper actions all share a frame index, you can ask what the gripper was doing the exact moment my left hand was 0.67 m from the camera and get one answer, instead of stitching together four recordings that drifted apart from each other somewhere along the way."
                : "Every clip above is the same 1,933 frames of the same twenty minutes. That's really the whole point, because pose, hands, and depth all share a frame index, you can ask where my hands were relative to the camera at any single frame and get one answer, instead of stitching together recordings that drifted apart from each other somewhere along the way."}
            </Typography>
            <Typography sx={bodyText}>
              Sessions ship as bundles like this one, frame-synced, with the quality flags still attached, depth
              coverage, tracking confidence, how stable the pose was, so whoever's using it can filter for quality
              before training instead of finding the bad stretches the hard way, after.
            </Typography>

            <Box
              sx={{
                mt: { xs: 6, md: 8 },
                p: { xs: 3.5, md: 4.5 },
                borderRadius: '10px',
                backgroundColor: '#131211',
              }}
            >
              <Typography
                variant="h3"
                sx={{ color: '#fafaf8', fontFamily: displayFont, fontWeight: 500, fontSize: '1.35rem', mb: 1.5 }}
              >
                Want to see a full bundle?
              </Typography>
              <Typography sx={{ color: '#9c9c96', fontFamily: bodyFont, fontSize: '0.98rem', lineHeight: 1.7, mb: 3 }}>
                We're bringing on a handful of design partners for the first healthcare and elder care dataset.
                If that's useful to you, say hi.
              </Typography>
              <Button
                component="a"
                href="mailto:sinew.datalabs@gmail.com"
                sx={{
                  backgroundColor: '#fafaf8',
                  color: '#131211',
                  borderRadius: '6px',
                  px: 3,
                  py: 1.2,
                  fontWeight: 500,
                  fontSize: '0.92rem',
                  '&:hover': { backgroundColor: '#e4e4e1' },
                }}
              >
                Get in touch
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
