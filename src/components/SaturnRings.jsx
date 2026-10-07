import React, { useMemo } from 'react';
import * as THREE from 'three';
import { getSaturnRingsTexture } from '../utils/textureGenerator';

export default function SaturnRings({ innerRadius = 6.2, outerRadius = 12.0, ringColor = '#dfc498' }) {
  const { geometry, texture } = useMemo(() => {
    const geom = new THREE.RingGeometry(innerRadius, outerRadius, 128);
    const pos = geom.attributes.position;
    const uv = geom.attributes.uv;

    // Remap UV coordinates radially so texture maps from inner to outer radius
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const dist = Math.sqrt(x * x + y * y);
      const u = (dist - innerRadius) / (outerRadius - innerRadius);
      uv.setXY(i, u, 0.5);
    }
    uv.needsUpdate = true;

    const tex = getSaturnRingsTexture();
    return { geometry: geom, texture: tex };
  }, [innerRadius, outerRadius]);

  return (
    <mesh geometry={geometry} rotation={[-Math.PI / 2, 0, 0]}>
      <meshStandardMaterial
        map={texture}
        color={ringColor}
        side={THREE.DoubleSide}
        transparent={true}
        opacity={0.92}
        roughness={0.7}
        metalness={0.1}
      />
    </mesh>
  );
}

