import React, { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { getMoonTexture } from '../utils/textureGenerator';
import { PLANETS_BY_ID } from '../data/planets';

export default function Moon({ onSelect, isSelected, orbitSpeedMultiplier = 1, isPaused = false }) {
  const moonOrbitGroupRef = useRef();
  const moonMeshRef = useRef();
  const [hovered, setHovered] = useState(false);

  const moonData = PLANETS_BY_ID['moon'];
  const texture = useMemo(() => getMoonTexture(), []);

  // Subtle lunar orbit line geometry
  const orbitLineGeom = useMemo(() => {
    const points = [];
    const segments = 64;
    const r = moonData.orbitRadius;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(theta) * r, 0, Math.sin(theta) * r));
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [moonData.orbitRadius]);

  useFrame((state, delta) => {
    if (!isPaused && moonOrbitGroupRef.current) {
      moonOrbitGroupRef.current.rotation.y += delta * 0.4 * orbitSpeedMultiplier;
    }
    if (moonMeshRef.current) {
      moonMeshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group>
      {/* Subtle Lunar Orbit Path */}
      <line geometry={orbitLineGeom}>
        <lineBasicMaterial color="#94a3b8" transparent opacity={0.2} />
      </line>

      {/* Rotating Orbit Parent */}
      <group ref={moonOrbitGroupRef}>
        <group position={[moonData.orbitRadius, 0, 0]}>
          <mesh
            ref={moonMeshRef}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(moonData);
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHovered(true);
            }}
            onPointerOut={() => setHovered(false)}
          >
            <sphereGeometry args={[moonData.radius, 32, 32]} />
            <meshStandardMaterial
              map={texture}
              roughness={0.9}
              metalness={0.05}
              emissive={hovered || isSelected ? '#38bdf8' : '#000000'}
              emissiveIntensity={hovered || isSelected ? 0.35 : 0}
            />
          </mesh>

          {/* Floating Label */}
          <Html
            position={[0, moonData.radius + 1.2, 0]}
            center
            distanceFactor={40}
            style={{ pointerEvents: 'none' }}
          >
            <div
              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider backdrop-blur-md transition-all duration-200 ${
                isSelected
                  ? 'bg-sky-500 text-white shadow-md shadow-sky-500/50 scale-110'
                  : hovered
                  ? 'bg-slate-800/90 text-sky-300 border border-sky-400/50 scale-105'
                  : 'bg-black/40 text-slate-300 border border-slate-700/40 opacity-80'
              }`}
            >
              🌙 MOON
            </div>
          </Html>
        </group>
      </group>
    </group>
  );
}

