import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function StarField({ count = 4000, performanceMode = 'high' }) {
  const pointsRef = useRef();

  const actualCount = performanceMode === 'low' ? 1500 : count;

  const [positions, colors, sizes] = useMemo(() => {
    const pos = new Float32Array(actualCount * 3);
    const col = new Float32Array(actualCount * 3);
    const siz = new Float32Array(actualCount);

    const palette = [
      new THREE.Color('#ffffff'), // Pure white
      new THREE.Color('#b0d9ff'), // Pale blue
      new THREE.Color('#ffdca8'), // Pale golden
      new THREE.Color('#94a3b8'), // Subtle silver
      new THREE.Color('#d8b4fe')  // Faint violet
    ];

    for (let i = 0; i < actualCount; i++) {
      // Uniform spherical shell distribution
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 450 + Math.random() * 450; // Radius between 450 and 900

      const sinPhi = Math.sin(phi);
      pos[i * 3] = r * sinPhi * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.cos(phi);
      pos[i * 3 + 2] = r * sinPhi * Math.sin(theta);

      const color = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;

      siz[i] = Math.random() * 2.2 + 0.6;
    }

    return [pos, col, siz];
  }, [actualCount]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      // Extremely slow cosmic drift
      pointsRef.current.rotation.y += delta * 0.0006;
    }
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={colors.length / 3}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={1.6}
          vertexColors
          transparent
          opacity={0.88}
          sizeAttenuation={false}
        />
      </points>

      {/* Subtle Cosmic Nebula Clusters */}
      <mesh position={[200, 100, -500]}>
        <sphereGeometry args={[180, 16, 16]} />
        <meshBasicMaterial
          color="#3b0764"
          transparent
          opacity={0.07}
          side={THREE.BackSide}
        />
      </mesh>
      <mesh position={[-350, -80, 400]}>
        <sphereGeometry args={[220, 16, 16]} />
        <meshBasicMaterial
          color="#082f49"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

