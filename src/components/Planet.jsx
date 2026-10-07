import React, { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import SaturnRings from './SaturnRings';
import Moon from './Moon';
import {
  getMercuryTexture,
  getVenusTexture,
  getEarthDayTexture,
  getEarthCloudsTexture,
  getEarthNightTexture,
  getMarsTexture,
  getJupiterTexture,
  getSaturnTexture,
  getUranusTexture,
  getNeptuneTexture,
  getPlutoTexture
} from '../utils/textureGenerator';

export default function Planet({
  planet,
  onSelect,
  isSelected,
  orbitSpeedMultiplier = 1,
  rotationSpeedMultiplier = 1,
  visualScaleMultiplier = 1,
  showOrbits = true,
  isPaused = false,
  onPlanetPositionUpdate // reports current world position for camera tracker
}) {
  const orbitGroupRef = useRef();
  const planetMeshRef = useRef();
  const cloudsRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Get matching procedural texture
  const textures = useMemo(() => {
    switch (planet.id) {
      case 'mercury':
        return { main: getMercuryTexture() };
      case 'venus':
        return { main: getVenusTexture() };
      case 'earth':
        return {
          day: getEarthDayTexture(),
          clouds: getEarthCloudsTexture(),
          night: getEarthNightTexture()
        };
      case 'mars':
        return { main: getMarsTexture() };
      case 'jupiter':
        return { main: getJupiterTexture() };
      case 'saturn':
        return { main: getSaturnTexture() };
      case 'uranus':
        return { main: getUranusTexture() };
      case 'neptune':
        return { main: getNeptuneTexture() };
      case 'pluto':
        return { main: getPlutoTexture() };
      default:
        return {};
    }
  }, [planet.id]);

  // Earth Day/Night dynamic shader
  const earthShaderMaterial = useMemo(() => {
    if (planet.id !== 'earth') return null;

    return new THREE.ShaderMaterial({
      uniforms: {
        dayTexture: { value: textures.day },
        nightTexture: { value: textures.night },
        sunPosition: { value: new THREE.Vector3(0, 0, 0) }
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vWorldPosition;

        void main() {
          vUv = uv;
          vNormal = normalize(mat3(modelMatrix) * normal);
          vec4 worldPos = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPos.xyz;
          gl_Position = projectionMatrix * viewMatrix * worldPos;
        }
      `,
      fragmentShader: `
        uniform sampler2D dayTexture;
        uniform sampler2D nightTexture;
        uniform vec3 sunPosition;
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vWorldPosition;

        void main() {
          vec3 sunDir = normalize(sunPosition - vWorldPosition);
          float nDotL = dot(vNormal, sunDir);

          vec4 dayColor = texture2D(dayTexture, vUv);
          vec4 nightColor = texture2D(nightTexture, vUv);

          // Smooth terminator transition
          float dayFactor = smoothstep(-0.12, 0.22, nDotL);

          // Sunlight daylighting
          float lightIntensity = max(0.06, nDotL);
          vec3 dayLit = dayColor.rgb * (0.12 + lightIntensity * 0.95);

          // Night side city lights glow
          float nightFactor = 1.0 - dayFactor;
          vec3 nightLit = nightColor.rgb * nightFactor * 1.7;

          vec3 baseColor = mix(nightLit, dayLit, dayFactor);

          // Atmosphere Rayleigh scattering / Fresnel rim
          vec3 viewDir = normalize(cameraPosition - vWorldPosition);
          float fresnel = pow(1.0 - max(0.0, dot(vNormal, viewDir)), 3.0) * 0.55;
          vec3 atmosphereGlow = vec3(0.25, 0.65, 1.0) * fresnel * max(0.15, nDotL + 0.35);

          gl_FragColor = vec4(baseColor + atmosphereGlow, 1.0);
        }
      `
    });
  }, [planet.id, textures]);

  // Orbital Path Line
  const orbitLineGeometry = useMemo(() => {
    const points = [];
    const segments = 128;
    const r = planet.orbitRadius;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(theta) * r, 0, Math.sin(theta) * r));
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [planet.orbitRadius]);

  // Uranus Faint Rings
  const uranusRingGeom = useMemo(() => {
    if (planet.id !== 'uranus') return null;
    return new THREE.RingGeometry(planet.ringInnerRadius, planet.ringOuterRadius, 64);
  }, [planet]);

  // Frame update for orbital motion & axial spin
  useFrame((state, delta) => {
    // 1. Orbit Sun
    if (!isPaused && orbitGroupRef.current) {
      orbitGroupRef.current.rotation.y += delta * 0.12 * planet.orbitSpeed * orbitSpeedMultiplier;
    }

    // 2. Rotate planet on its axis
    if (planetMeshRef.current) {
      planetMeshRef.current.rotation.y += delta * planet.rotationSpeed * 35 * rotationSpeedMultiplier;
    }

    // 3. Rotate clouds (Earth)
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += delta * 0.04 * rotationSpeedMultiplier;
    }

    // 4. Report position to camera controller if selected
    if (isSelected && planetMeshRef.current && onPlanetPositionUpdate) {
      const worldPos = new THREE.Vector3();
      planetMeshRef.current.getWorldPosition(worldPos);
      onPlanetPositionUpdate(worldPos);
    }
  });

  const scaledRadius = planet.radius * visualScaleMultiplier;

  return (
    <group>
      {/* 1. Luminous Orbital Path */}
      {showOrbits && (
        <line geometry={orbitLineGeometry}>
          <lineBasicMaterial
            color={isSelected ? '#38bdf8' : hovered ? '#93c5fd' : planet.color}
            transparent
            opacity={isSelected ? 0.7 : hovered ? 0.5 : 0.22}
          />
        </line>
      )}

      {/* 2. Orbiting Group (rotates around origin) */}
      <group ref={orbitGroupRef}>
        <group position={[planet.orbitRadius, 0, 0]}>
          {/* Axial Tilt Group */}
          <group rotation={[0, 0, (planet.axialTilt * Math.PI) / 180]}>
            {/* The Planet Sphere */}
            <mesh
              ref={planetMeshRef}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(planet);
              }}
              onPointerOver={(e) => {
                e.stopPropagation();
                setHovered(true);
              }}
              onPointerOut={() => setHovered(false)}
              scale={hovered ? 1.06 : 1.0}
            >
              <sphereGeometry args={[scaledRadius, 48, 48]} />

              {planet.id === 'earth' && earthShaderMaterial ? (
                <primitive object={earthShaderMaterial} attach="material" />
              ) : (
                <meshStandardMaterial
                  map={textures.main}
                  roughness={planet.type.includes('Gas') ? 0.7 : 0.85}
                  metalness={0.08}
                  emissive={hovered || isSelected ? planet.accentColor : '#000000'}
                  emissiveIntensity={hovered || isSelected ? 0.25 : 0}
                />
              )}
            </mesh>

            {/* Earth Cloud Layer */}
            {planet.id === 'earth' && textures.clouds && (
              <mesh ref={cloudsRef} scale={1.018}>
                <sphereGeometry args={[scaledRadius, 48, 48]} />
                <meshStandardMaterial
                  map={textures.clouds}
                  transparent
                  opacity={0.65}
                  blending={THREE.AdditiveBlending}
                  depthWrite={false}
                />
              </mesh>
            )}

            {/* Saturn Rings */}
            {planet.id === 'saturn' && (
              <SaturnRings
                innerRadius={planet.ringInnerRadius * visualScaleMultiplier}
                outerRadius={planet.ringOuterRadius * visualScaleMultiplier}
                ringColor={planet.accentColor}
              />
            )}

            {/* Uranus Subtle Rings */}
            {planet.id === 'uranus' && uranusRingGeom && (
              <mesh geometry={uranusRingGeom} rotation={[-Math.PI / 2, 0, 0]}>
                <meshBasicMaterial
                  color="#a5f3fc"
                  side={THREE.DoubleSide}
                  transparent
                  opacity={0.35}
                />
              </mesh>
            )}

            {/* Earth's Orbiting Moon */}
            {planet.id === 'earth' && (
              <Moon
                onSelect={onSelect}
                isSelected={isSelected}
                orbitSpeedMultiplier={orbitSpeedMultiplier}
                isPaused={isPaused}
              />
            )}
          </group>

          {/* 3. Floating 3D HTML Label & Tooltip */}
          <Html
            position={[0, scaledRadius + (planet.hasRings ? 4.5 : 2.5), 0]}
            center
            distanceFactor={55}
            style={{ pointerEvents: 'none' }}
          >
            <div className="flex flex-col items-center">
              <div
                className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider backdrop-blur-md transition-all duration-300 flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/50 border border-sky-300 scale-110'
                    : hovered
                    ? 'bg-slate-900/90 text-sky-300 border border-sky-400/60 shadow-md shadow-sky-950 scale-105'
                    : 'bg-black/50 text-slate-300 border border-slate-700/50 hover:border-slate-500'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full inline-block"
                  style={{ backgroundColor: planet.color }}
                />
                {planet.name}
              </div>

              {/* Hover Quick Fact Card */}
              {hovered && !isSelected && (
                <div className="mt-1 px-3 py-1.5 rounded-lg bg-slate-950/90 border border-sky-500/40 text-[11px] text-slate-200 max-w-[200px] text-center shadow-xl backdrop-blur-md animate-fade-in pointer-events-none">
                  <div className="text-sky-400 font-semibold">{planet.type}</div>
                  <div className="text-slate-400 text-[10px] mt-0.5 line-clamp-2">
                    {planet.facts[0]}
                  </div>
                </div>
              )}
            </div>
          </Html>
        </group>
      </group>
    </group>
  );
}

