import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function KuiperBelt({
  count = 1400,
  innerRadius = 195,
  outerRadius = 260,
  isPaused = false,
  orbitSpeedMultiplier = 1
}) {
  const meshRef = useRef();

  const { geometry, material, dummy } = useMemo(() => {
    // Icy crystalline geometry
    const geom = new THREE.IcosahedronGeometry(0.5, 0);
    const mat = new THREE.MeshStandardMaterial({
      color: '#cbe7f7',
      roughness: 0.4,
      metalness: 0.6,
      emissive: '#38bdf8',
      emissiveIntensity: 0.15,
    });
    const d = new THREE.Object3D();
    return { geometry: geom, material: mat, dummy: d };
  }, []);

  const icyBodies = useMemo(() => {
    const list = [];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = innerRadius + Math.random() * (outerRadius - innerRadius);
      const y = (Math.random() - 0.5) * 12.0; // Thicker disk
      const scale = Math.random() * 1.2 + 0.3;
      list.push({ angle, r, y, scale });
    }
    return list;
  }, [count, innerRadius, outerRadius]);

  useFrame((state, delta) => {
    if (!isPaused && meshRef.current) {
      meshRef.current.rotation.y += delta * 0.008 * orbitSpeedMultiplier;
    }
  });

  return (
    <instancedMesh
      ref={(inst) => {
        meshRef.current = inst;
        if (inst) {
          icyBodies.forEach((body, i) => {
            dummy.position.set(
              Math.cos(body.angle) * body.r,
              body.y,
              Math.sin(body.angle) * body.r
            );
            dummy.rotation.set(
              Math.random() * Math.PI,
              Math.random() * Math.PI,
              Math.random() * Math.PI
            );
            dummy.scale.set(body.scale, body.scale, body.scale);
            dummy.updateMatrix();
            inst.setMatrixAt(i, dummy.matrix);
          });
          inst.instanceMatrix.needsUpdate = true;
        }
      }}
      args={[geometry, material, count]}
    />
  );
}

