import React, { useState, useRef, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import Sun from './Sun';
import Planet from './Planet';
import AsteroidBelt from './AsteroidBelt';
import KuiperBelt from './KuiperBelt';
import StarField from './StarField';
import CameraController from './CameraController';
import { PLANETS_DATA } from '../data/planets';

export default function SolarSystem({
  selectedPlanet,
  onSelectPlanet,
  viewMode = 'solarSystem',
  journeyTime = 0,
  orbitSpeedMultiplier = 1,
  rotationSpeedMultiplier = 1,
  visualScaleMultiplier = 1,
  showOrbits = true,
  isPaused = false,
  performanceMode = 'high',
  lightIntensity = 1,
  onResetComplete
}) {
  const [currentPlanetWorldPos, setCurrentPlanetWorldPos] = useState(null);

  // Callback to track selected planet's current world position as it orbits
  const handlePlanetPositionUpdate = useCallback((pos) => {
    setCurrentPlanetWorldPos(pos);
  }, []);

  // Sun object from planets data
  const sunData = PLANETS_DATA.find((p) => p.id === 'sun');
  const orbitingPlanets = PLANETS_DATA.filter((p) => p.id !== 'sun' && p.id !== 'moon');

  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 110, 240], fov: 45, near: 0.1, far: 2000 }}
        gl={{
          antialias: performanceMode !== 'low',
          powerPreference: 'high-performance',
          alpha: false
        }}
        dpr={performanceMode === 'low' ? 1 : performanceMode === 'medium' ? 1.5 : [1, 2]}
      >
        {/* Deep Space Background Color */}
        <color attach="background" args={['#030712']} />

        {/* Subtle Ambient Space Illumination so planet dark sides have realistic contrast */}
        <ambientLight color="#1e293b" intensity={0.45 * lightIntensity} />

        {/* Camera Movement Controller */}
        <CameraController
          selectedPlanet={selectedPlanet}
          planetTargetPos={
            selectedPlanet?.id === 'sun'
              ? new THREE.Vector3(0, 0, 0)
              : currentPlanetWorldPos
          }
          viewMode={viewMode}
          journeyTime={journeyTime}
          onResetComplete={onResetComplete}
        />

        {/* 1. Deep Space Starfield & Nebulae */}
        <StarField count={4500} performanceMode={performanceMode} />

        {/* 2. The Blazing Central Sun */}
        {sunData && (
          <Sun
            planet={sunData}
            onSelect={onSelectPlanet}
            isSelected={selectedPlanet?.id === 'sun'}
            performanceMode={performanceMode}
          />
        )}

        {/* 3. Orbiting Planets */}
        {orbitingPlanets.map((planet) => (
          <Planet
            key={planet.id}
            planet={planet}
            onSelect={onSelectPlanet}
            isSelected={selectedPlanet?.id === planet.id}
            orbitSpeedMultiplier={orbitSpeedMultiplier}
            rotationSpeedMultiplier={rotationSpeedMultiplier}
            visualScaleMultiplier={visualScaleMultiplier}
            showOrbits={showOrbits}
            isPaused={isPaused}
            onPlanetPositionUpdate={
              selectedPlanet?.id === planet.id ? handlePlanetPositionUpdate : undefined
            }
          />
        ))}

        {/* 4. Asteroid Belt (Mars - Jupiter) */}
        <AsteroidBelt
          count={performanceMode === 'low' ? 450 : performanceMode === 'medium' ? 850 : 1200}
          isPaused={isPaused}
          orbitSpeedMultiplier={orbitSpeedMultiplier}
        />

        {/* 5. Kuiper Belt (beyond Neptune) */}
        <KuiperBelt
          count={performanceMode === 'low' ? 600 : performanceMode === 'medium' ? 1000 : 1500}
          isPaused={isPaused}
          orbitSpeedMultiplier={orbitSpeedMultiplier}
        />
      </Canvas>
    </div>
  );
}

