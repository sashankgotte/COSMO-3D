import React, { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

export default function CameraController({
  selectedPlanet,
  planetTargetPos,
  viewMode = 'solarSystem', // 'solarSystem' | 'planetFocus' | 'surface' | 'telescope' | 'ringExplorer' | 'kuiperBelt' | 'cinematicTour'
  journeyTime = 0, // 0 to 60 for cinematic tour
  onResetComplete
}) {
  const { camera } = useThree();
  const controlsRef = useRef();

  // Desired camera position and target vectors
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const targetCamPos = useRef(new THREE.Vector3(0, 110, 240));
  const isTransitioning = useRef(true);

  // Set initial camera view
  useEffect(() => {
    camera.position.set(0, 110, 240);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  // Handle mode changes
  useEffect(() => {
    isTransitioning.current = true;

    if (viewMode === 'solarSystem') {
      targetLookAt.current.set(0, 0, 0);
      targetCamPos.current.set(0, 110, 240);
    } else if (viewMode === 'telescope') {
      targetLookAt.current.set(0, 0, 0);
      targetCamPos.current.set(0, 360, 140);
    } else if (viewMode === 'kuiperBelt') {
      targetLookAt.current.set(0, 0, 210);
      targetCamPos.current.set(0, 45, 270);
    } else if (viewMode === 'ringExplorer') {
      // Focus on Saturn's rings at an inclined plane
      if (planetTargetPos) {
        targetLookAt.current.copy(planetTargetPos);
        targetCamPos.current.set(
          planetTargetPos.x + 16,
          planetTargetPos.y + 4.5,
          planetTargetPos.z + 18
        );
      }
    }
  }, [viewMode, planetTargetPos]);

  // Frame animation loop
  useFrame((state, delta) => {
    if (!controlsRef.current) return;

    // 1. Cinematic Tour Mode (60s timeline)
    if (viewMode === 'cinematicTour') {
      const t = journeyTime; // 0 to 60
      if (t < 10) {
        // Sun overview
        targetLookAt.current.set(0, 0, 0);
        targetCamPos.current.set(
          Math.sin(t * 0.2) * 50,
          25 + t * 1.5,
          60 + t * 4
        );
      } else if (t < 20) {
        // Mercury -> Venus -> Earth flyby
        const progress = (t - 10) / 10;
        targetLookAt.current.set(progress * 44, 0, 0);
        targetCamPos.current.set(
          progress * 44 + 10,
          8,
          progress * 20 + 15
        );
      } else if (t < 30) {
        // Mars & Asteroid Belt
        const progress = (t - 20) / 10;
        targetLookAt.current.set(58 + progress * 15, 0, 0);
        targetCamPos.current.set(
          58 + progress * 15 + 8,
          6,
          16
        );
      } else if (t < 40) {
        // Jupiter & Saturn
        const progress = (t - 30) / 10;
        targetLookAt.current.set(84 + progress * 30, 0, 0);
        targetCamPos.current.set(
          84 + progress * 30 + 18,
          10 + progress * 5,
          28
        );
      } else if (t < 50) {
        // Uranus & Neptune
        const progress = (t - 40) / 10;
        targetLookAt.current.set(145 + progress * 30, 0, 0);
        targetCamPos.current.set(
          145 + progress * 30 + 14,
          12,
          22
        );
      } else if (t < 57) {
        // Deep into Kuiper Belt
        const progress = (t - 50) / 7;
        targetLookAt.current.set(190 + progress * 20, 0, 0);
        targetCamPos.current.set(
          190 + progress * 20 + 20,
          20,
          35
        );
      } else {
        // Arrive at Pluto
        targetLookAt.current.set(205, 0, 0);
        targetCamPos.current.set(205 + 5, 2, 7);
      }

      camera.position.lerp(targetCamPos.current, delta * 3.0);
      controlsRef.current.target.lerp(targetLookAt.current, delta * 3.0);
      controlsRef.current.update();
      return;
    }

    // 2. Planet Focus or Surface Close-up mode
    if ((viewMode === 'planetFocus' || viewMode === 'surface') && selectedPlanet && planetTargetPos) {
      targetLookAt.current.copy(planetTargetPos);

      const r = selectedPlanet.radius || 3.0;
      let dist = r * 3.8;
      let heightOffset = r * 1.2;

      if (viewMode === 'surface') {
        dist = r * 1.6; // Intimate close-up surface view
        heightOffset = r * 0.4;
      } else if (selectedPlanet.hasRings) {
        dist = r * 4.6; // Extra breathing room for Saturn rings
        heightOffset = r * 2.2;
      }

      // Dynamic orbital camera angle around the planet
      const desiredPos = new THREE.Vector3(
        planetTargetPos.x + dist * 0.75,
        planetTargetPos.y + heightOffset,
        planetTargetPos.z + dist * 0.75
      );

      targetCamPos.current.copy(desiredPos);

      // Smooth cinematic interpolation
      camera.position.lerp(targetCamPos.current, delta * 2.8);
      controlsRef.current.target.lerp(targetLookAt.current, delta * 2.8);
      controlsRef.current.update();
      return;
    }

    // 3. Smooth transition for Overview / Telescope / Kuiper modes
    if (isTransitioning.current) {
      camera.position.lerp(targetCamPos.current, delta * 2.5);
      controlsRef.current.target.lerp(targetLookAt.current, delta * 2.5);

      if (
        camera.position.distanceTo(targetCamPos.current) < 0.5 &&
        controlsRef.current.target.distanceTo(targetLookAt.current) < 0.5
      ) {
        isTransitioning.current = false;
        if (onResetComplete) onResetComplete();
      }
    }

    controlsRef.current.update();
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.06}
      minDistance={2.5}
      maxDistance={650}
      rotateSpeed={0.7}
      zoomSpeed={0.9}
      maxPolarAngle={Math.PI / 2 + 0.15} // Prevent going below galactic plane
    />
  );
}

