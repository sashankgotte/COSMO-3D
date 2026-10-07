import React from 'react';
import { X, Sliders, RotateCcw, Eye, Sun, Zap, Compass, Sparkles } from 'lucide-react';

export default function ScienceLab({
  orbitSpeed,
  setOrbitSpeed,
  rotationSpeed,
  setRotationSpeed,
  visualScale,
  setVisualScale,
  lightIntensity,
  setLightIntensity,
  showOrbits,
  setShowOrbits,
  performanceMode,
  setPerformanceMode,
  onResetSimulation,
  onClose
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in pointer-events-auto">
      <div className="w-full max-w-xl glass-panel-glow rounded-3xl overflow-hidden shadow-2xl border border-sky-400/30 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-slate-900/90 to-sky-950/90 border-b border-sky-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
              <Sliders className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-wide text-white font-orbitron">
                🔬 SCIENCE LAB SANDBOX
              </h2>
              <p className="text-xs text-cyan-300">
                Adjust physics, visual scaling, and lighting parameters
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Sliders */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs">
          {/* Orbit Speed Multiplier */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between font-bold text-slate-300 uppercase tracking-wider text-[11px]">
              <span className="flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-sky-400" />
                Orbital Revolution Speed
              </span>
              <span className="font-mono text-sky-400">{orbitSpeed}×</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="10"
              step="0.1"
              value={orbitSpeed}
              onChange={(e) => setOrbitSpeed(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>0.1× Slow Motion</span>
              <span>1.0× Real-Time Ratio</span>
              <span>10.0× Hyper Speed</span>
            </div>
          </div>

          {/* Planet Axial Rotation Speed */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between font-bold text-slate-300 uppercase tracking-wider text-[11px]">
              <span className="flex items-center gap-1.5">
                <RotateCcw className="w-3.5 h-3.5 text-indigo-400" />
                Planet Axial Rotation Speed
              </span>
              <span className="font-mono text-indigo-400">{rotationSpeed}×</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="5"
              step="0.1"
              value={rotationSpeed}
              onChange={(e) => setRotationSpeed(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Visual Scale Multiplier */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between font-bold text-slate-300 uppercase tracking-wider text-[11px]">
              <span className="flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-emerald-400" />
                Planet Size Visual Scaling
              </span>
              <span className="font-mono text-emerald-400">{visualScale}×</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="2.5"
              step="0.1"
              value={visualScale}
              onChange={(e) => setVisualScale(Number(e.target.value))}
              className="w-full"
            />
            <div className="text-[10px] text-slate-400">
              Scale up planets to view subtle craters, cloud layers, and surface details clearly.
            </div>
          </div>

          {/* Sunlight & Lighting Intensity */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between font-bold text-slate-300 uppercase tracking-wider text-[11px]">
              <span className="flex items-center gap-1.5">
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                Sun Illumination & Ambient Brightness
              </span>
              <span className="font-mono text-amber-400">{lightIntensity}×</span>
            </div>
            <input
              type="range"
              min="0.3"
              max="3"
              step="0.1"
              value={lightIntensity}
              onChange={(e) => setLightIntensity(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Toggle Switches */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Show Orbital Paths */}
            <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-200">Orbital Paths</div>
                <div className="text-[10px] text-slate-400">Show glowing orbit lines</div>
              </div>
              <button
                onClick={() => setShowOrbits(!showOrbits)}
                className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                  showOrbits ? 'bg-sky-500' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    showOrbits ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Performance Mode */}
            <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-200">Graphics Mode</div>
                <div className="text-[10px] text-slate-400">Particle count & shadows</div>
              </div>
              <select
                value={performanceMode}
                onChange={(e) => setPerformanceMode(e.target.value)}
                className="bg-slate-800 text-white border border-slate-600 rounded-lg px-2.5 py-1 text-xs focus:outline-none"
              >
                <option value="high">High (60 FPS)</option>
                <option value="medium">Medium</option>
                <option value="low">Low (Power Saver)</option>
              </select>
            </div>
          </div>

          {/* Reset Button */}
          <div className="pt-2">
            <button
              onClick={onResetSimulation}
              className="w-full py-3 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-600 text-slate-200 font-bold flex items-center justify-center gap-2 transition-all hover:text-white"
            >
              <RotateCcw className="w-4 h-4" /> RESET SIMULATION DEFAULTS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

