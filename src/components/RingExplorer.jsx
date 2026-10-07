import React from 'react';
import { X, Sparkles, Compass, Info, Eye } from 'lucide-react';

export default function RingExplorer({ onClose }) {
  return (
    <div className="fixed top-20 left-4 sm:left-6 z-30 w-[320px] sm:w-[360px] glass-panel-glow rounded-3xl p-5 shadow-2xl border border-amber-400/30 animate-fade-in pointer-events-auto text-xs space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between border-b border-amber-500/20 pb-3">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
            Celestial Feature Explorer
          </span>
          <h2 className="text-xl font-black font-orbitron text-white mt-0.5">
            🪐 SATURN RING SYSTEM
          </h2>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-full bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Main Quote / Requirement text */}
      <div className="p-3.5 rounded-2xl bg-amber-950/30 border border-amber-400/30 text-amber-200 leading-relaxed font-medium">
        "Saturn's rings are mainly made of ice particles, rocky material and dust."
      </div>

      {/* Ring Divisions Breakdown */}
      <div className="space-y-2">
        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Ring Anatomy & Divisions
        </div>

        <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
          <div className="flex justify-between font-bold text-slate-200">
            <span>A Ring (Outer Main Ring)</span>
            <span className="text-amber-400 font-mono">14,600 km wide</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Contains the Encke gap; bordered by the outer edge of the prominent visible ring system.
          </p>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
          <div className="flex justify-between font-bold text-slate-200">
            <span>Cassini Division (Dark Gap)</span>
            <span className="text-sky-400 font-mono">4,800 km wide</span>
          </div>
          <p className="text-[11px] text-slate-400">
            A conspicuous dark void cleared by the orbital resonance of Saturn's moon Mimas!
          </p>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
          <div className="flex justify-between font-bold text-slate-200">
            <span>B Ring (Brightest & Densest)</span>
            <span className="text-amber-300 font-mono">25,500 km wide</span>
          </div>
          <p className="text-[11px] text-slate-400">
            The thickest ring, composed of billions of water-ice boulders, grains, and frozen spires.
          </p>
        </div>
      </div>

      {/* Exploration Tip */}
      <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800 text-[11px] text-slate-300 flex items-center gap-2">
        <Eye className="w-4 h-4 text-sky-400 shrink-0" />
        <span>Drag your mouse or touch screen to rotate freely around the ring plane!</span>
      </div>
    </div>
  );
}

