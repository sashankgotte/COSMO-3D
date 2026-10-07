import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function AsteroidBelt({
  count = 1000,
  innerRadius = 67,
  outerRadius = 76,
  isPaused = false,
  orbitSpeedMultiplier = 1
}) {
  const meshRef = useRef();

  // Generate instanced matrices and colors once
  const { geometry, material, dummy } = useMemo(() => {
    // Low poly irregular asteroid geometry
    const geom = new THREE.DodecahedronGeometry(0.35, 1);
    const mat = new THREE.MeshStandardMaterial({
      color: '#8c827a',
      roughness: 0.95,
      metalness: 0.1,
    });
    const d = new THREE.Object3D();
    return { geometry: geom, material: mat, dummy: d };
  }, []);

  // Precompute asteroid orbits
  const asteroids = useMemo(() => {
    const list = [];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = innerRadius + Math.random() * (outerRadius - innerRadius);
      const y = (Math.random() - 0.5) * 4.5;
      const scale = Math.random() * 0.8 + 0.4;
      const rotSpeed = (Math.random() - 0.5) * 0.02;
      list.push({ angle, r, y, scale, rotSpeed });
    }
    return list;
  }, [count, innerRadius, outerRadius]);

  // Initialize instances
  useMemo(() => {
    if (!meshRef.current) return;
    asteroids.forEach((ast, i) => {
      dummy.position.set(
        Math.cos(ast.angle) * ast.r,
        ast.y,
        Math.sin(ast.angle) * ast.r
      );
      dummy.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      dummy.scale.set(ast.scale, ast.scale, ast.scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [asteroids, dummy]);

  useFrame((state, delta) => {
    if (!isPaused && meshRef.current) {
      meshRef.current.rotation.y += delta * 0.04 * orbitSpeedMultiplier;
    }
  });

  return (
    <instancedMesh
      ref={(inst) => {
        meshRef.current = inst;
        if (inst) {
          asteroids.forEach((ast, i) => {
            dummy.position.set(
              Math.cos(ast.angle) * ast.r,
              ast.y,
              Math.sin(ast.angle) * ast.r
            );
            dummy.rotation.set(
              Math.random() * Math.PI,
              Math.random() * Math.PI,
              Math.random() * Math.PI
            );
            dummy.scale.set(ast.scale, ast.scale, ast.scale);
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

