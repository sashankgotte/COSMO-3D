import React, { useState } from 'react';
import {
  Compass, Play, Pause, RotateCcw, Rocket, Eye, Scale,
  Moon, Sliders, Brain, Trophy, Smartphone, Menu, X,
  ChevronDown, Film, Sparkles, Orbit
} from 'lucide-react';
import { PLANETS_DATA } from '../data/planets';

export default function Navbar({
  isPaused,
  setIsPaused,
  orbitSpeedMultiplier,
  setOrbitSpeedMultiplier,
  onResetCamera,
  onSelectPlanet,
  selectedPlanet,
  onOpenModal, // 'gravity' | 'eclipse' | 'scienceLab' | 'quiz' | 'progress' | 'ar'
  onSwitchViewMode, // 'solarSystem' | 'telescope' | 'ringExplorer' | 'kuiperBelt' | 'cinematicTour'
  viewMode
}) {
  const [isFlyMenuOpen, setIsFlyMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const speedOptions = [0.5, 1, 2, 5, 10];

  const handleFlyTo = (planet) => {
    onSelectPlanet(planet);
    setIsFlyMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Main Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-30 px-4 sm:px-6 py-3 flex items-center justify-between pointer-events-none select-none">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3 pointer-events-auto">
          <button
            onClick={() => {
              onResetCamera();
              onSwitchViewMode('solarSystem');
            }}
            className="flex items-center gap-2.5 group text-left"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-sky-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-all">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-base font-black tracking-wider text-white font-orbitron flex items-center gap-1.5">
                COSMO
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30 font-mono">
                  3D
                </span>
              </div>
              <div className="text-[9px] tracking-widest text-slate-400 font-bold uppercase hidden sm:block">
                EXPLORE • DISCOVER • UNDERSTAND
              </div>
            </div>
          </button>
        </div>

        {/* Center Primary Action Bar (Desktop) */}
        <div className="hidden lg:flex items-center gap-2 pointer-events-auto p-1.5 rounded-2xl glass-panel">
          {/* Fly to Planet Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsFlyMenuOpen(!isFlyMenuOpen)}
              className="px-3.5 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-sky-500/20"
            >
              <Rocket className="w-3.5 h-3.5" />
              <span>🚀 FLY TO PLANET</span>
              <ChevronDown className="w-3 h-3 ml-0.5" />
            </button>

            {isFlyMenuOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 rounded-2xl glass-panel-glow border border-sky-400/30 p-2 shadow-2xl animate-fade-in z-50">
                <div className="text-[10px] font-bold text-slate-400 px-2.5 py-1 uppercase tracking-wider">
                  Select Destination
                </div>
                <div className="max-h-64 overflow-y-auto space-y-1">
                  {PLANETS_DATA.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => handleFlyTo(p)}
                      className="w-full px-2.5 py-1.5 rounded-lg text-left text-xs font-semibold text-slate-200 hover:text-white hover:bg-sky-500/20 flex items-center gap-2 transition-all"
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full shadow-sm"
                        style={{ backgroundColor: p.color }}
                      />
                      <span>{p.name}</span>
                      <span className="text-[10px] text-slate-500 ml-auto">{p.type.split(' ')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 60s Space Journey */}
          <button
            onClick={() => onSwitchViewMode('cinematicTour')}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
              viewMode === 'cinematicTour'
                ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30'
                : 'glass-btn hover:text-white text-slate-200'
            }`}
          >
            <Film className="w-3.5 h-3.5 text-rose-400" />
            <span>🎬 SPACE JOURNEY</span>
          </button>

          {/* Telescope Mode */}
          <button
            onClick={() => onSwitchViewMode(viewMode === 'telescope' ? 'solarSystem' : 'telescope')}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
              viewMode === 'telescope'
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/30'
                : 'glass-btn hover:text-white text-slate-200'
            }`}
          >
            <Eye className="w-3.5 h-3.5 text-cyan-400" />
            <span>🔭 TELESCOPE</span>
          </button>

          {/* Saturn Ring Explorer */}
          <button
            onClick={() => {
              const saturn = PLANETS_DATA.find(p => p.id === 'saturn');
              onSelectPlanet(saturn);
              onSwitchViewMode('ringExplorer');
            }}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
              viewMode === 'ringExplorer'
                ? 'bg-amber-500 text-white shadow-md shadow-amber-500/30'
                : 'glass-btn hover:text-white text-slate-200'
            }`}
          >
            <Orbit className="w-3.5 h-3.5 text-amber-400" />
            <span>🪐 RING EXPLORER</span>
          </button>

          {/* Kuiper Belt */}
          <button
            onClick={() => onSwitchViewMode(viewMode === 'kuiperBelt' ? 'solarSystem' : 'kuiperBelt')}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
              viewMode === 'kuiperBelt'
                ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/30'
                : 'glass-btn hover:text-white text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>🌌 KUIPER BELT</span>
          </button>

          {/* Interactive Tools */}
          <div className="h-4 w-[1px] bg-white/20 mx-1" />

          <button
            onClick={() => onOpenModal('gravity')}
            className="px-2.5 py-1.5 rounded-xl glass-btn text-xs font-semibold text-slate-200 hover:text-white"
            title="Gravity Simulator"
          >
            <Scale className="w-3.5 h-3.5 text-sky-400 inline mr-1" /> ⚖️ GRAVITY
          </button>

          <button
            onClick={() => onOpenModal('eclipse')}
            className="px-2.5 py-1.5 rounded-xl glass-btn text-xs font-semibold text-slate-200 hover:text-white"
            title="Eclipse Simulator"
          >
            <Moon className="w-3.5 h-3.5 text-amber-400 inline mr-1" /> 🌑 ECLIPSE
          </button>

          <button
            onClick={() => onOpenModal('scienceLab')}
            className="px-2.5 py-1.5 rounded-xl glass-btn text-xs font-semibold text-slate-200 hover:text-white"
            title="Science Lab Sandbox"
          >
            <Sliders className="w-3.5 h-3.5 text-emerald-400 inline mr-1" /> 🔬 LAB
          </button>

          <button
            onClick={() => onOpenModal('quiz')}
            className="px-2.5 py-1.5 rounded-xl glass-btn text-xs font-semibold text-slate-200 hover:text-white"
            title="Space Quiz"
          >
            <Brain className="w-3.5 h-3.5 text-purple-400 inline mr-1" /> 🧠 QUIZ
          </button>

          <button
            onClick={() => onOpenModal('progress')}
            className="px-2.5 py-1.5 rounded-xl glass-btn text-xs font-semibold text-slate-200 hover:text-white"
            title="Space Explorer Progress"
          >
            <Trophy className="w-3.5 h-3.5 text-yellow-400 inline mr-1" /> 🏆 PROGRESS
          </button>

          <button
            onClick={() => onOpenModal('ar')}
            className="px-2.5 py-1.5 rounded-xl glass-btn text-xs font-semibold text-slate-300 hover:text-white opacity-85"
            title="Mobile AR (Coming Soon)"
          >
            <Smartphone className="w-3.5 h-3.5 text-pink-400 inline mr-1" /> 📱 AR
          </button>
        </div>

        {/* Right Orbit Controls & Reset Camera (Desktop & Mobile) */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Orbit Play / Pause */}
          <div className="hidden sm:flex items-center p-1 rounded-2xl glass-panel gap-1">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className={`p-2 rounded-xl transition-all ${
                isPaused
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40'
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40'
              }`}
              title={isPaused ? "Resume Planetary Orbits" : "Pause Planetary Orbits"}
            >
              {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            </button>

            {/* Orbit Speed Multiplier Selector */}
            <div className="flex items-center gap-0.5 px-1">
              {speedOptions.map((spd) => (
                <button
                  key={spd}
                  onClick={() => setOrbitSpeedMultiplier(spd)}
                  className={`px-1.5 py-1 rounded text-[10px] font-mono font-bold transition-all ${
                    orbitSpeedMultiplier === spd
                      ? 'bg-sky-500 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {spd}x
                </button>
              ))}
            </div>
          </div>

          {/* Reset Camera Button */}
          <button
            onClick={onResetCamera}
            className="px-3 py-2 rounded-xl glass-btn text-slate-200 hover:text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
            title="Reset Camera View to Solar System Overview"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden md:inline">RESET CAMERA</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl glass-btn text-slate-200 hover:text-white"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex flex-col p-6 animate-fade-in lg:hidden">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="text-lg font-black font-orbitron text-white">
              🌌 COSMO EXPLORER
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Speed & Orbit Controls */}
          <div className="py-4 border-b border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-300 uppercase">
              <span>Orbit Simulation</span>
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="px-3 py-1 rounded-lg bg-sky-500 text-white font-mono"
              >
                {isPaused ? '▶ PLAY' : '⏸ PAUSE'}
              </button>
            </div>
            <div className="flex gap-2">
              {speedOptions.map((spd) => (
                <button
                  key={spd}
                  onClick={() => setOrbitSpeedMultiplier(spd)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-bold ${
                    orbitSpeedMultiplier === spd ? 'bg-sky-500 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {spd}x
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Links */}
          <div className="flex-1 overflow-y-auto py-4 space-y-2 text-sm font-semibold">
            <button
              onClick={() => {
                onSwitchViewMode('cinematicTour');
                setIsMobileMenuOpen(false);
              }}
              className="w-full p-3 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-300 text-left flex items-center gap-3"
            >
              <Film className="w-5 h-5" /> 🎬 60-Second Space Journey
            </button>

            <button
              onClick={() => {
                onSwitchViewMode('telescope');
                setIsMobileMenuOpen(false);
              }}
              className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-left flex items-center gap-3"
            >
              <Eye className="w-5 h-5 text-sky-400" /> 🔭 Telescope Mode
            </button>

            <button
              onClick={() => {
                onOpenModal('gravity');
                setIsMobileMenuOpen(false);
              }}
              className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-left flex items-center gap-3"
            >
              <Scale className="w-5 h-5 text-sky-400" /> ⚖️ Gravity Simulator
            </button>

            <button
              onClick={() => {
                onOpenModal('eclipse');
                setIsMobileMenuOpen(false);
              }}
              className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-left flex items-center gap-3"
            >
              <Moon className="w-5 h-5 text-amber-400" /> 🌑 Eclipse Simulator
            </button>

            <button
              onClick={() => {
                onOpenModal('scienceLab');
                setIsMobileMenuOpen(false);
              }}
              className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-left flex items-center gap-3"
            >
              <Sliders className="w-5 h-5 text-emerald-400" /> 🔬 Science Lab
            </button>

            <button
              onClick={() => {
                onOpenModal('quiz');
                setIsMobileMenuOpen(false);
              }}
              className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-left flex items-center gap-3"
            >
              <Brain className="w-5 h-5 text-purple-400" /> 🧠 Space Quiz
            </button>

            <button
              onClick={() => {
                onOpenModal('progress');
                setIsMobileMenuOpen(false);
              }}
              className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-left flex items-center gap-3"
            >
              <Trophy className="w-5 h-5 text-yellow-400" /> 🏆 Space Explorer Progress
            </button>

            <button
              onClick={() => {
                onOpenModal('ar');
                setIsMobileMenuOpen(false);
              }}
              className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-left flex items-center gap-3"
            >
              <Smartphone className="w-5 h-5 text-pink-400" /> 📱 Mobile AR (Coming Soon)
            </button>

            {/* Quick Fly Selector in Drawer */}
            <div className="pt-3">
              <div className="text-xs uppercase text-slate-400 font-bold mb-2">
                Fly Directly to Body:
              </div>
              <div className="grid grid-cols-2 gap-2">
                {PLANETS_DATA.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleFlyTo(p)}
                    className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-left text-xs text-slate-300 flex items-center gap-2"
                  >
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                    <span className="truncate">{p.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

