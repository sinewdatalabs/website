import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// A parallel-jaw gripper assembled from primitive geometry: wrist mount,
// rotating joint, palm plate, three jointed fingers with fingertip sensor
// pads. Self-authored (no external asset), built with the open-source
// three.js renderer, orbit-draggable, and idles through a slow open/close
// grasp cycle.
export default function GripperViewer() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(3.4, 2.1, 4.4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0.6, 0);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = !reduceMotion;
    controls.autoRotateSpeed = 0.6;
    controls.minPolarAngle = Math.PI * 0.22;
    controls.maxPolarAngle = Math.PI * 0.68;

    scene.add(new THREE.AmbientLight(0xffffff, 0.55));
    const key = new THREE.DirectionalLight(0xfff8ee, 1.6);
    key.position.set(4, 6, 5);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xaeb4c0, 0.9);
    rim.position.set(-5, 2, -4);
    scene.add(rim);
    const fill = new THREE.PointLight(0xffffff, 0.35);
    fill.position.set(-2, -1, 3);
    scene.add(fill);

    const bodyMat = new THREE.MeshStandardMaterial({ color: 0xd9d9d4, roughness: 0.42, metalness: 0.55 });
    const jointMat = new THREE.MeshStandardMaterial({ color: 0x8f8f89, roughness: 0.35, metalness: 0.7 });
    const padMat = new THREE.MeshStandardMaterial({
      color: 0xfafaf8,
      roughness: 0.25,
      metalness: 0.1,
      emissive: 0x2a2a26,
      emissiveIntensity: 0.4,
    });

    const rig = new THREE.Group();
    scene.add(rig);

    // Forearm / mount, sitting below everything else.
    const forearm = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.5, 1.3, 24), bodyMat);
    forearm.position.y = -1.35;
    rig.add(forearm);
    for (let i = 0; i < 3; i += 1) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.44, 0.015, 8, 32), jointMat);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = -1.0 - i * 0.35;
      rig.add(ring);
    }

    // Wrist joint.
    const wrist = new THREE.Mesh(new THREE.SphereGeometry(0.46, 28, 20), jointMat);
    wrist.position.y = -0.55;
    rig.add(wrist);
    const wristRing = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.03, 10, 40), bodyMat);
    wristRing.rotation.x = Math.PI / 2.3;
    wristRing.position.y = -0.55;
    rig.add(wristRing);

    // Palm.
    const palm = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.5, 0.55, 8), bodyMat);
    palm.position.y = 0.1;
    rig.add(palm);
    [0, 1, 2, 3, 4, 5, 6, 7].forEach((i) => {
      const angle = (i / 8) * Math.PI * 2;
      const rivet = new THREE.Mesh(new THREE.SphereGeometry(0.035, 8, 8), jointMat);
      rivet.position.set(Math.cos(angle) * 0.56, 0.12, Math.sin(angle) * 0.56);
      rig.add(rivet);
    });

    // Three fingers, each two segments + a joint sphere + a sensor pad tip.
    const fingers = [];
    const fingerAngles = [-0.62, 0, 0.62];
    fingerAngles.forEach((baseAngle) => {
      const root = new THREE.Group();
      root.position.set(Math.sin(baseAngle) * 0.42, 0.42, Math.cos(baseAngle) * 0.42);
      root.rotation.y = baseAngle;
      rig.add(root);

      const prox = new THREE.Mesh(new THREE.CapsuleGeometry(0.09, 0.55, 6, 12), bodyMat);
      prox.position.y = 0.32;
      root.add(prox);

      const knuckle = new THREE.Group();
      knuckle.position.y = 0.6;
      root.add(knuckle);
      const joint = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 12), jointMat);
      knuckle.add(joint);

      const dist = new THREE.Mesh(new THREE.CapsuleGeometry(0.075, 0.42, 6, 12), bodyMat);
      dist.position.y = 0.24;
      knuckle.add(dist);

      const pad = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.045, 0.1), padMat);
      pad.position.y = 0.47;
      knuckle.add(pad);

      fingers.push({ root, knuckle, baseAngle });
    });

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const w = Math.max(rect.width, 1);
      const h = Math.max(rect.height, 1);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    resize();

    let rafId;
    const clock = new THREE.Clock();
    const render = () => {
      const t = clock.getElapsedTime();
      if (!reduceMotion) {
        const grasp = (Math.sin(t * 0.7) + 1) / 2; // 0 = open, 1 = closed
        fingers.forEach((f) => {
          const spread = f.baseAngle * (1 - grasp * 0.35);
          f.root.rotation.y = spread;
          f.knuckle.rotation.x = -grasp * 0.9;
        });
        rig.rotation.y += 0.0015;
      }
      controls.update();
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(render);
    };
    render();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      controls.dispose();
      renderer.dispose();
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
          else obj.material.dispose();
        }
      });
      if (renderer.domElement.parentNode === container) container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <Box
      ref={containerRef}
      sx={{
        width: '100%',
        height: '100%',
        minHeight: { xs: 280, md: '100%' },
        cursor: 'grab',
        '&:active': { cursor: 'grabbing' },
        '& canvas': { display: 'block', width: '100% !important', height: '100% !important' },
      }}
    />
  );
}
