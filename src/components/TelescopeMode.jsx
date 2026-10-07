import React from 'react';
import { X, Eye, ZoomIn, Compass, Target, Crosshair } from 'lucide-react';

export default function TelescopeMode({ onClose }) {
  return (
    <div className="fixed inset-0 z-30 pointer-events-none flex flex-col justify-between">
      {/* Reticle Overlay Graphic */}
      <div className="absolute inset-0 telescope-overlay flex items-center justify-center pointer-events-none">
        {/* Circular Crosshair HUD */}
        <div className="w-[420px] h-[420px] sm:w-[600px] sm:h-[600px] rounded-full border border-sky-400/20 relative flex items-center justify-center animate-pulse-glow">
          {/* Inner ring */}
          <div className="w-[240px] h-[240px] sm:w-[360px] sm:h-[360px] rounded-full border border-sky-400/30" />
          {/* Crosshairs */}
          <div className="absolute top-0 bottom-0 w-[1px] bg-sky-400/20" />
          <div className="absolute left-0 right-0 h-[1px] bg-sky-400/20" />
          {/* Degree ticks */}
          <div className="absolute top-2 text-[9px] font-mono text-sky-400/60">0° N</div>
          <div className="absolute bottom-2 text-[9px] font-mono text-sky-400/60">180° S</div>
          <div className="absolute left-2 text-[9px] font-mono text-sky-400/60">270° W</div>
          <div className="absolute right-2 text-[9px] font-mono text-sky-400/60">90° E</div>
        </div>
      </div>

      {/* Top HUD Status */}
      <div className="p-6 pointer-events-auto flex items-center justify-between">
        <div className="p-3.5 rounded-2xl glass-panel-glow border border-sky-400/40 flex items-center gap-3">
          <Target className="w-5 h-5 text-sky-400 animate-spin" style={{ animationDuration: '20s' }} />
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-sky-400 font-orbitron">
              OPTICAL OBSERVATORY ARRAY
            </div>
            <div className="text-sm font-black text-white font-orbitron">
              🔭 HIGH-VANTAGE TELESCOPE MODE
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-3 rounded-2xl glass-btn text-slate-300 hover:text-white border-sky-400/40 flex items-center gap-2 font-bold text-xs"
        >
          <X className="w-4 h-4" /> Exit Telescope
        </button>
      </div>

      {/* Bottom Info Banner */}
      <div className="p-6 pointer-events-auto flex justify-center">
        <div className="px-6 py-3 rounded-2xl glass-panel border border-sky-400/30 text-xs text-slate-200 flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-sky-400 font-bold">
            <ZoomIn className="w-4 h-4" /> Mouse Wheel / Pinch: Zoom
          </span>
          <span className="text-slate-500">•</span>
          <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
            <Compass className="w-4 h-4" /> Drag: Pan Celestial Field
          </span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-300">
            Compare planetary distances and orbital resonance in real-time
          </span>
        </div>
      </div>
    </div>
  );
}

