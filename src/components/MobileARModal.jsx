import React from 'react';
import { X, Smartphone, Camera, Sparkles, CheckCircle2, Layers } from 'lucide-react';

export default function MobileARModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in pointer-events-auto">
      <div className="w-full max-w-md glass-panel-glow rounded-3xl overflow-hidden shadow-2xl border border-sky-400/30 flex flex-col">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-slate-900/90 to-sky-950/90 border-b border-sky-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/30">
              <Smartphone className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-black tracking-wide text-white font-orbitron">
                  📱 MOBILE AR
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  COMING SOON
                </span>
              </div>
              <p className="text-xs text-sky-300">Augmented Reality WebXR Experience</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-xs">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-sky-950/40 to-slate-900/80 border border-sky-500/30 text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center mx-auto text-sky-400">
              <Camera className="w-6 h-6 animate-pulse" />
            </div>
            <h3 className="text-sm font-bold text-white font-orbitron">
              "Explore planets through your phone camera."
            </h3>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Place the full 3D Solar System directly on your classroom desk, living room floor, or open field using cutting-edge WebXR spatial anchoring.
            </p>
          </div>

          <div className="space-y-2.5">
            <div className="text-slate-300 font-bold uppercase text-[10px] tracking-wider">
              Upcoming AR Capabilities
            </div>
            <div className="space-y-2">
              <div className="p-2.5 rounded-xl bg-slate-900/50 border border-slate-800 flex items-center gap-2.5 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                <span>1:1 True physical scale walking mode around Saturn's rings</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/50 border border-slate-800 flex items-center gap-2.5 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Plane detection for desks, tables, and ground projection</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/50 border border-slate-800 flex items-center gap-2.5 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Interactive touch gestures to spin and peel planetary layers</span>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold transition-all shadow-lg shadow-sky-500/20"
            >
              Continue in 3D WebGL Mode
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

