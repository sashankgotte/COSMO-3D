import React from 'react';
import { X, Compass, Globe, Thermometer, Clock, Weight, Moon, Wind, Volume2, Sparkles, Eye } from 'lucide-react';

export default function PlanetInfo({
  planet,
  onClose,
  onExploreSurface,
  isSurfaceMode = false,
  onTriggerVoice
}) {
  if (!planet) return null;

  return (
    <div className="fixed top-20 right-4 sm:right-6 bottom-6 w-[340px] sm:w-[380px] max-w-[calc(100vw-32px)] z-30 flex flex-col glass-panel-glow rounded-3xl overflow-hidden shadow-2xl border border-sky-400/30 animate-fade-in pointer-events-auto">
      {/* Header with Planet Color Glow Banner */}
      <div
        className="p-5 relative border-b border-white/10 flex items-start justify-between"
        style={{
          background: `linear-gradient(135deg, ${planet.color}25 0%, rgba(15,23,42,0.85) 100%)`
        }}
      >
        <div>
          <div className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full shadow-md"
              style={{ backgroundColor: planet.color }}
            />
            <span className="text-[11px] font-bold uppercase tracking-wider text-sky-400">
              {planet.type}
            </span>
          </div>
          <h2 className="text-2xl font-black tracking-wide text-white font-orbitron mt-1">
            {planet.name}
          </h2>
          <p className="text-xs text-slate-300 italic">{planet.subtitle}</p>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-full bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 transition-all"
          title="Back to Solar System"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
        {/* Action Button: Explore Surface */}
        <div className="flex gap-2">
          <button
            onClick={onExploreSurface}
            className={`flex-1 py-2.5 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${
              isSurfaceMode
                ? 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-emerald-500/30'
                : 'bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-sky-500/30'
            }`}
          >
            <Eye className="w-4 h-4" />
            {isSurfaceMode ? 'Exit Surface View' : 'Explore Surface'}
          </button>

          <button
            onClick={() => onTriggerVoice && onTriggerVoice(planet)}
            className="p-2.5 rounded-xl glass-btn text-sky-300 hover:text-white"
            title="Narrate Planet Info"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>

        {/* Surface Features Highlights when in Surface Mode */}
        {isSurfaceMode && planet.surfaceDetails && (
          <div className="p-3.5 rounded-2xl bg-sky-950/40 border border-sky-400/30 space-y-2">
            <div className="flex items-center gap-1.5 text-sky-300 font-bold uppercase text-[10px] tracking-wider">
              <Compass className="w-3.5 h-3.5" /> Surface Geology & Features
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              {planet.surfaceDetails.description}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {planet.surfaceDetails.features.map((feat, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-sky-500/20 text-sky-200 border border-sky-500/30 text-[10px]"
                >
                  {feat}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Scientific Metrics Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <div className="flex items-center gap-1.5 text-slate-400 text-[10px] uppercase font-semibold">
              <Compass className="w-3 h-3 text-sky-400" /> Distance from Sun
            </div>
            <div className="text-slate-100 font-bold mt-1 text-[11px]">
              {planet.distanceFromSun}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <div className="flex items-center gap-1.5 text-slate-400 text-[10px] uppercase font-semibold">
              <Globe className="w-3 h-3 text-emerald-400" /> Diameter
            </div>
            <div className="text-slate-100 font-bold mt-1 text-[11px]">
              {planet.diameter}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <div className="flex items-center gap-1.5 text-slate-400 text-[10px] uppercase font-semibold">
              <Clock className="w-3 h-3 text-amber-400" /> Day Length
            </div>
            <div className="text-slate-100 font-bold mt-1 text-[11px]">
              {planet.dayLength}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <div className="flex items-center gap-1.5 text-slate-400 text-[10px] uppercase font-semibold">
              <Clock className="w-3 h-3 text-indigo-400" /> Year Length
            </div>
            <div className="text-slate-100 font-bold mt-1 text-[11px]">
              {planet.yearLength}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <div className="flex items-center gap-1.5 text-slate-400 text-[10px] uppercase font-semibold">
              <Weight className="w-3 h-3 text-rose-400" /> Gravity
            </div>
            <div className="text-slate-100 font-bold mt-1 text-[11px]">
              {planet.gravityText || `${planet.gravity} m/s²`}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <div className="flex items-center gap-1.5 text-slate-400 text-[10px] uppercase font-semibold">
              <Thermometer className="w-3 h-3 text-orange-400" /> Temperature
            </div>
            <div className="text-slate-100 font-bold mt-1 text-[11px]">
              {planet.temperature}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <div className="flex items-center gap-1.5 text-slate-400 text-[10px] uppercase font-semibold">
              <Moon className="w-3 h-3 text-slate-300" /> Known Moons
            </div>
            <div className="text-slate-100 font-bold mt-1 text-[11px]">
              {planet.moonsCount} Moons
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <div className="flex items-center gap-1.5 text-slate-400 text-[10px] uppercase font-semibold">
              <Wind className="w-3 h-3 text-cyan-400" /> Atmosphere
            </div>
            <div className="text-slate-100 font-bold mt-1 text-[11px] truncate" title={planet.atmosphere}>
              {planet.atmosphere.split(',')[0]}
            </div>
          </div>
        </div>

        {/* Atmosphere Detailed Overview */}
        <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/60">
          <div className="text-slate-400 text-[10px] uppercase font-semibold mb-1">
            Atmospheric Composition
          </div>
          <p className="text-slate-300 text-[11px] leading-relaxed">
            {planet.atmosphere}
          </p>
        </div>

        {/* Interesting Facts */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center gap-1.5 text-amber-400 font-bold text-[11px] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Interesting Cosmic Facts
          </div>
          <div className="space-y-2">
            {planet.facts.map((fact, index) => (
              <div
                key={index}
                className="p-2.5 rounded-xl bg-slate-900/50 border border-slate-800/60 text-slate-300 text-[11px] flex gap-2 items-start"
              >
                <span className="text-sky-400 font-bold">•</span>
                <span className="leading-relaxed">{fact}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

