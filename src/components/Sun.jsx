import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { getSunTexture } from '../utils/textureGenerator';

export default function Sun({ planet, onSelect, isSelected, performanceMode }) {
  const sunRef = useRef();
  const coronaRef = useRef();
  const outerGlowRef = useRef();

  const texture = useMemo(() => getSunTexture(), []);

  useFrame((state, delta) => {
    if (sunRef.current) {
      sunRef.current.rotation.y += delta * 0.08;
    }
    if (coronaRef.current) {
      coronaRef.current.rotation.z -= delta * 0.04;
      // Subtle corona pulsation
      const s = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.03;
      coronaRef.current.scale.set(s, s, s);
    }
    if (outerGlowRef.current) {
      outerGlowRef.current.rotation.z += delta * 0.02;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Dynamic Solar Point Lights */}
      <pointLight
        color="#fff4cc"
        intensity={performanceMode === 'low' ? 3.5 : 5.5}
        distance={600}
        decay={1.2}
      />
      <pointLight
        color="#ffaa44"
        intensity={2.5}
        distance={250}
        decay={1.5}
      />

      {/* Main Blazing Sun Sphere */}
      <mesh
        ref={sunRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(planet);
        }}
        cursor="pointer"
      >
        <sphereGeometry args={[planet.radius, 64, 64]} />
        <meshBasicMaterial
          map={texture}
          toneMapped={false}
        />
      </mesh>

      {/* Inner Coronal Glow Flare (Additive sprite/billboard) */}
      <mesh ref={coronaRef} scale={1.28}>
        <sphereGeometry args={[planet.radius, 32, 32]} />
        <meshBasicMaterial
          color="#ffaa22"
          transparent
          opacity={0.35}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Outer Atmospheric Coronal Halo */}
      <mesh ref={outerGlowRef} scale={1.55}>
        <sphereGeometry args={[planet.radius, 32, 32]} />
        <meshBasicMaterial
          color="#ff5500"
          transparent
          opacity={0.18}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Floating 3D Label */}
      <Html
        position={[0, planet.radius + 3.2, 0]}
        center
        distanceFactor={60}
        style={{ pointerEvents: 'none' }}
      >
        <div className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider backdrop-blur-md transition-all duration-300 ${
          isSelected
            ? 'bg-amber-500/80 text-white shadow-lg shadow-amber-500/50 border border-amber-300 scale-110'
            : 'bg-black/50 text-amber-300 border border-amber-500/30'
        }`}>
          ☀️ SUN
        </div>
      </Html>
    </group>
  );
}

