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

const stages = [
  { label: 'Camera pose', detail: '6-DoF trajectory, metric, world frame' },
  { label: 'Hand tracking', detail: '21 keypoints per hand, depth-backed' },
  { label: 'Depth', detail: 'Confidence-masked metric depth' },
  { label: 'Retargeting', detail: 'Parallel-jaw gripper poses' },
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
              Everything below comes from a single capture: one person dicing vegetables at a kitchen counter,
              recorded from a head-mounted camera. No staging, no mocap suit, no instrumented cell. That is the
              point, the pipeline has to work on the messy takes, because those are the ones that scale.
            </Typography>
            <Typography sx={bodyText}>
              A raw session is just RGB frames and IMU. What a policy needs is something else entirely: where the
              observer was, where the hands were, how far away the scene was, and what an actual robot would have
              had to do. Those four products are what the pipeline emits, and they are all derived from the same
              frame index, so any two of them can be read together at any timestamp.
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
            <SectionHeading index="01 / Camera pose">Where the observer was, in metres.</SectionHeading>
            <Typography sx={bodyText}>
              The first thing we solve for is the camera itself. Visual-inertial odometry gives us a 6-DoF pose per
              frame in a gravity-aligned world frame, and because the solution is inertially scaled, the translation
              is in real metres rather than an arbitrary unit. That distinction matters more than it sounds: without
              metric scale, none of the downstream products can be compared against a robot's actual reach.
            </Typography>
            <Typography sx={bodyText}>
              The overlay shows the full path in grey, the path travelled so far in green, and the camera frustum in
              yellow, with position and Euler angles printed per frame. On this take the wearer covers about a metre
              and a half of counter while the head pitches down toward the board, exactly the kind of motion that
              breaks naive frame-to-frame tracking.
            </Typography>
            <VideoFigure
              src={asset('camera_pose_motion.mp4')}
              poster={asset('camera_pose_motion.jpg')}
              label="Fig. 01"
              caption="Reconstructed camera trajectory in the world frame, with the source RGB inset. Axes show the camera's local frame; the yellow frustum is the current view direction."
            />

            {/* 02 */}
            <SectionHeading index="02 / Hand tracking">Twenty-one keypoints, and an honest confidence signal.</SectionHeading>
            <Typography sx={bodyText}>
              Both hands are tracked at 21 keypoints each, per frame, with a handedness label and a detection
              confidence. On its own that is 2D. What makes it usable for manipulation is fusing each keypoint
              against the depth stream so the skeleton lands at a real distance from the camera, here roughly
              0.66 to 0.67 m for both wrists.
            </Typography>
            <Typography sx={bodyText}>
              We render the fusion state directly rather than hiding it. A filled keypoint means depth came back for
              that pixel; a hollow one means it did not, usually a thin finger edge or a specular patch on the blade.
              Downstream consumers get that flag too, so a training run can weight or drop uncertain joints instead
              of silently learning from an interpolated guess.
            </Typography>
            <VideoFigure
              src={asset('hand_tracking_motion.mp4')}
              poster={asset('hand_tracking_motion.jpg')}
              label="Fig. 02"
              caption="Per-frame hand keypoints with handedness, confidence, and fused metric depth per wrist. Filled dots have a real depth return; hollow dots do not."
            />

            {/* 03 */}
            <SectionHeading index="03 / Depth">Dense depth, masked by confidence.</SectionHeading>
            <Typography sx={bodyText}>
              The depth stream is metric and per-pixel, and we mask it by the sensor's own confidence channel before
              anything else consumes it. The colourbar is absolute, not normalised per frame, so the same colour
              means the same distance across the whole sequence, and the counter surface stays a flat plane in the
              visualisation instead of pulsing as the head moves.
            </Typography>
            <Typography sx={bodyText}>
              We log coverage per frame, on this clip about 97.7% of pixels survive the confidence mask at a median
              scene distance of 1.55 m. Coverage is one of the quality gates a session has to clear before it goes
              into a delivered dataset; takes that drop below threshold get flagged rather than shipped.
            </Typography>
            <VideoFigure
              src={asset('depth_map.mp4')}
              poster={asset('depth_map.jpg')}
              label="Fig. 03"
              caption="Source RGB alongside confidence-masked metric depth. Black regions are pixels rejected by the confidence mask; the colourbar is fixed across the sequence."
            />

            {/* 04 */}
            <SectionHeading index="04 / Retargeting">From a human hand to something a robot can execute.</SectionHeading>
            <Typography sx={bodyText}>
              A hand skeleton is not an action label. The last stage converts tracked hands into end-effector poses
              for a parallel-jaw gripper: a position, an orientation, and an opening width per frame, plus the
              manipulated object's pose so the grasp is expressed relative to the thing being grasped rather than to
              the room.
            </Typography>
            <Typography sx={bodyText}>
              The render also inpaints the human arms out of the frame. That leaves an observation which shows the
              scene and the gripper but not the demonstrator, which is much closer to what a robot will actually see
              at execution time, and it stops a policy from anchoring on human skin as a visual cue. This is the step
              that makes a capture embodiment-agnostic: the same take can be retargeted again for a different
              manipulator without recollecting anything.
            </Typography>
            <VideoFigure
              src={asset('gripper_render.mp4')}
              poster={asset('gripper_render.jpg')}
              label="Fig. 04"
              caption="Retargeted parallel-jaw gripper poses with the demonstrator's arms inpainted out, alongside the tracked object. Axis triads mark each gripper frame."
            />

            {/* Close */}
            <SectionHeading index="05 / What ships">One take, four aligned products.</SectionHeading>
            <Typography sx={bodyText}>
              All four clips above are the same 1,933 frames of the same take, which is the property that makes the
              data worth anything. Because pose, hands, depth, and gripper actions share a frame index, a consumer
              can ask what the gripper was doing at the moment the left hand was 0.67 m from the camera and get a
              consistent answer, rather than stitching together four recordings that drifted apart.
            </Typography>
            <Typography sx={bodyText}>
              Sessions ship as frame-synchronized bundles with the per-frame quality flags intact, depth coverage,
              tracking confidence, and pose continuity, so you can filter on quality before training rather than
              discovering the bad segments afterwards.
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
                Want a sample bundle?
              </Typography>
              <Typography sx={{ color: '#9c9c96', fontFamily: bodyFont, fontSize: '0.98rem', lineHeight: 1.7, mb: 3 }}>
                We are onboarding a small number of design partners for the first healthcare and elder care dataset.
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
