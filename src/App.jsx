import React, { useState, useEffect, useCallback } from 'react';
import SolarSystem from './components/SolarSystem';
import Navbar from './components/Navbar';
import PlanetInfo from './components/PlanetInfo';
import CosmoAI from './components/CosmoAI';
import GravitySimulator from './components/GravitySimulator';
import EclipseSimulator from './components/EclipseSimulator';
import ScienceLab from './components/ScienceLab';
import SpaceQuiz from './components/SpaceQuiz';
import ProgressSystem from './components/ProgressSystem';
import SpaceJourney from './components/SpaceJourney';
import RingExplorer from './components/RingExplorer';
import TelescopeMode from './components/TelescopeMode';
import MobileARModal from './components/MobileARModal';
import LoadingScreen from './components/LoadingScreen';
import { PLANETS_DATA, PLANETS_BY_ID } from './data/planets';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Scene & Navigation State
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [viewMode, setViewMode] = useState('solarSystem');
  // 'solarSystem' | 'planetFocus' | 'surface' | 'telescope' | 'ringExplorer' | 'kuiperBelt' | 'cinematicTour'

  // Modals
  const [activeModal, setActiveModal] = useState(null);
  // null | 'gravity' | 'eclipse' | 'scienceLab' | 'quiz' | 'progress' | 'ar'

  // Simulation Controls (Science Lab)
  const [isPaused, setIsPaused] = useState(false);
  const [orbitSpeedMultiplier, setOrbitSpeedMultiplier] = useState(1);
  const [rotationSpeedMultiplier, setRotationSpeedMultiplier] = useState(1);
  const [visualScaleMultiplier, setVisualScaleMultiplier] = useState(1);
  const [lightIntensity, setLightIntensity] = useState(1);
  const [showOrbits, setShowOrbits] = useState(true);
  const [performanceMode, setPerformanceMode] = useState('high');

  // Space Journey Tour State
  const [journeyTime, setJourneyTime] = useState(0);
  const [isJourneyPlaying, setIsJourneyPlaying] = useState(false);

  // Audio / Cosmo AI Voice
  const [isMuted, setIsMuted] = useState(false);

  // Student Progress & Achievements (LocalStorage)
  const [exploredPlanets, setExploredPlanets] = useState(() => {
    try {
      const saved = localStorage.getItem('cosmo_explored');
      return saved ? JSON.parse(saved) : ['earth'];
    } catch {
      return ['earth'];
    }
  });

  const [unlockedBadges, setUnlockedBadges] = useState(() => {
    try {
      const saved = localStorage.getItem('cosmo_badges');
      return saved ? JSON.parse(saved) : ['first_launch'];
    } catch {
      return ['first_launch'];
    }
  });

  const [toastMessage, setToastMessage] = useState(null);

  // Save progress changes
  useEffect(() => {
    try {
      localStorage.setItem('cosmo_explored', JSON.stringify(exploredPlanets));
      localStorage.setItem('cosmo_badges', JSON.stringify(unlockedBadges));
    } catch (e) {
      console.warn("LocalStorage save error:", e);
    }
  }, [exploredPlanets, unlockedBadges]);

  // Toast auto-dismiss
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Unlock achievement helper
  const unlockAchievement = useCallback((badgeId, title = "New Badge") => {
    setUnlockedBadges((prev) => {
      if (!prev.includes(badgeId)) {
        setToastMessage(`🏆 Achievement Unlocked: ${title}!`);
        return [...prev, badgeId];
      }
      return prev;
    });
  }, []);

  // Handle planet selection (Fly to Planet)
  const handleSelectPlanet = useCallback((planet) => {
    if (!planet) return;
    setSelectedPlanet(planet);
    setViewMode('planetFocus');
    setActiveModal(null);

    // Record explored planet
    setExploredPlanets((prev) => {
      if (!prev.includes(planet.id)) {
        const next = [...prev, planet.id];
        // Check if all major celestial bodies visited
        if (next.length >= 10) {
          unlockAchievement('master_explorer', 'Master Space Explorer');
        }
        return next;
      }
      return prev;
    });

    // Check specific badges
    if (planet.id === 'earth' || planet.id === 'moon') {
      unlockAchievement('earth_explorer', 'Earth Explorer');
    } else if (planet.id === 'mars') {
      unlockAchievement('mars_explorer', 'Mars Explorer');
    } else if (planet.id === 'saturn') {
      unlockAchievement('ring_master', 'Ring Master');
    } else if (planet.id === 'pluto' || planet.id === 'neptune') {
      unlockAchievement('deep_space', 'Deep Space Explorer');
    }
  }, [unlockAchievement]);

  // Handle Surface Explore mode toggle
  const handleExploreSurface = useCallback(() => {
    if (viewMode === 'surface') {
      setViewMode('planetFocus');
    } else {
      setViewMode('surface');
    }
  }, [viewMode]);

  // Reset Camera to Solar System Overview
  const handleResetCamera = useCallback(() => {
    setSelectedPlanet(null);
    setViewMode('solarSystem');
  }, []);

  // Reset Simulation in Science Lab
  const handleResetSimulation = useCallback(() => {
    setOrbitSpeedMultiplier(1);
    setRotationSpeedMultiplier(1);
    setVisualScaleMultiplier(1);
    setLightIntensity(1);
    setShowOrbits(true);
    setPerformanceMode('high');
    setIsPaused(false);
    setToastMessage("🔄 Simulation reset to default astrophysical parameters.");
  }, []);

  // Switch View Modes
  const handleSwitchViewMode = useCallback((mode) => {
    setViewMode(mode);
    if (mode === 'cinematicTour') {
      setJourneyTime(0);
      setIsJourneyPlaying(true);
      setSelectedPlanet(null);
    } else if (mode === 'ringExplorer') {
      const saturn = PLANETS_BY_ID['saturn'];
      setSelectedPlanet(saturn);
      unlockAchievement('ring_master', 'Ring Master');
    } else if (mode === 'kuiperBelt') {
      setSelectedPlanet(null);
      unlockAchievement('deep_space', 'Deep Space Explorer');
    } else if (mode === 'solarSystem') {
      setSelectedPlanet(null);
    }
  }, [unlockAchievement]);

  return (
    <div className="w-full h-full relative overflow-hidden bg-[#030712]">
      {/* 1. Loading Screen */}
      {isLoading && (
        <LoadingScreen onLoaded={() => setIsLoading(false)} />
      )}

      {/* 2. Main 3D Solar System WebGL Canvas */}
      <SolarSystem
        selectedPlanet={selectedPlanet}
        onSelectPlanet={handleSelectPlanet}
        viewMode={viewMode}
        journeyTime={journeyTime}
        orbitSpeedMultiplier={orbitSpeedMultiplier}
        rotationSpeedMultiplier={rotationSpeedMultiplier}
        visualScaleMultiplier={visualScaleMultiplier}
        showOrbits={showOrbits}
        isPaused={isPaused}
        performanceMode={performanceMode}
        lightIntensity={lightIntensity}
        onResetComplete={() => {}}
      />

      {/* 3. Futuristic Navbar & Orbit Controls */}
      <Navbar
        isPaused={isPaused}
        setIsPaused={setIsPaused}
        orbitSpeedMultiplier={orbitSpeedMultiplier}
        setOrbitSpeedMultiplier={setOrbitSpeedMultiplier}
        onResetCamera={handleResetCamera}
        onSelectPlanet={handleSelectPlanet}
        selectedPlanet={selectedPlanet}
        onOpenModal={(modal) => setActiveModal(modal)}
        onSwitchViewMode={handleSwitchViewMode}
        viewMode={viewMode}
      />

      {/* 4. Planet Information Sidebar / Detail Card */}
      {selectedPlanet && viewMode !== 'cinematicTour' && viewMode !== 'telescope' && (
        <PlanetInfo
          planet={selectedPlanet}
          onClose={handleResetCamera}
          onExploreSurface={handleExploreSurface}
          isSurfaceMode={viewMode === 'surface'}
          onTriggerVoice={(p) => {
            if ('speechSynthesis' in window && !isMuted) {
              const u = new SpeechSynthesisUtterance(p.audioNarration || p.facts[0]);
              window.speechSynthesis.cancel();
              window.speechSynthesis.speak(u);
            }
          }}
        />
      )}

      {/* 5. Dedicated Saturn Ring Explorer HUD */}
      {viewMode === 'ringExplorer' && (
        <RingExplorer onClose={handleResetCamera} />
      )}

      {/* 6. Telescope Mode HUD */}
      {viewMode === 'telescope' && (
        <TelescopeMode onClose={handleResetCamera} />
      )}

      {/* 7. 60-Second Space Journey Cinematic Tour Overlay */}
      {viewMode === 'cinematicTour' && (
        <SpaceJourney
          journeyTime={journeyTime}
          setJourneyTime={setJourneyTime}
          isPlaying={isJourneyPlaying}
          setIsPlaying={setIsJourneyPlaying}
          onClose={handleResetCamera}
        />
      )}

      {/* 8. Floating Cosmo AI Teacher Avatar & Q&A Assistant */}
      <CosmoAI
        currentContext={viewMode}
        activePlanet={selectedPlanet}
        isMuted={isMuted}
        onToggleMute={() => setIsMuted(!isMuted)}
      />

      {/* 9. Interactive Modals */}
      {activeModal === 'gravity' && (
        <GravitySimulator
          onClose={() => setActiveModal(null)}
          onUnlockAchievement={unlockAchievement}
        />
      )}

      {activeModal === 'eclipse' && (
        <EclipseSimulator
          onClose={() => setActiveModal(null)}
          onUnlockAchievement={unlockAchievement}
        />
      )}

      {activeModal === 'scienceLab' && (
        <ScienceLab
          orbitSpeed={orbitSpeedMultiplier}
          setOrbitSpeed={setOrbitSpeedMultiplier}
          rotationSpeed={rotationSpeedMultiplier}
          setRotationSpeed={setRotationSpeedMultiplier}
          visualScale={visualScaleMultiplier}
          setVisualScale={setVisualScaleMultiplier}
          lightIntensity={lightIntensity}
          setLightIntensity={setLightIntensity}
          showOrbits={showOrbits}
          setShowOrbits={setShowOrbits}
          performanceMode={performanceMode}
          setPerformanceMode={setPerformanceMode}
          onResetSimulation={handleResetSimulation}
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === 'quiz' && (
        <SpaceQuiz
          onClose={() => setActiveModal(null)}
          onUnlockAchievement={unlockAchievement}
        />
      )}

      {activeModal === 'progress' && (
        <ProgressSystem
          exploredPlanets={exploredPlanets}
          unlockedBadges={unlockedBadges}
          onSelectPlanet={handleSelectPlanet}
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === 'ar' && (
        <MobileARModal onClose={() => setActiveModal(null)} />
      )}

      {/* 10. Toast Achievement Notification */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl glass-panel-glow border border-amber-400 text-amber-200 font-bold text-xs shadow-2xl animate-bounce flex items-center gap-2">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
