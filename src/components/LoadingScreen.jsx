import React, { useState, useEffect } from 'react';
import { Sparkles, Compass } from 'lucide-react';

export default function LoadingScreen({ onLoaded }) {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Generating high-resolution planetary textures...');

  useEffect(() => {
    const steps = [
      { at: 20, text: 'Generating procedural solar corona and flares...' },
      { at: 45, text: 'Mapping Earth continents, cloud layers and city night lights...' },
      { at: 70, text: 'Synthesizing Saturn ring particles and Cassini division...' },
      { at: 90, text: 'Calibrating orbital mechanics and starfield geometry...' },
      { at: 100, text: 'Preparing your journey through the Solar System...' }
    ];

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onLoaded, 400);
          return 100;
        }
        const next = prev + 5;
        const matchingStep = steps.find(s => next >= s.at);
        if (matchingStep) setLoadingText(matchingStep.text);
        return next;
      });
    }, 60);

    return () => clearInterval(timer);
  }, [onLoaded]);

  return (
    <div className="fixed inset-0 z-50 bg-[#030712] flex flex-col items-center justify-center p-6 text-center select-none">
      {/* Ambient background glow */}
      <div className="absolute w-[450px] h-[450px] rounded-full bg-sky-500/10 blur-[120px] pointer-events-none" />

      {/* Main Logo & Branding */}
      <div className="relative z-10 space-y-3 max-w-md w-full">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 via-sky-500 to-indigo-600 flex items-center justify-center mx-auto shadow-2xl shadow-sky-500/30 animate-pulse">
          <Compass className="w-9 h-9 text-white animate-spin" style={{ animationDuration: '10s' }} />
        </div>

        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-widest text-white font-orbitron">
            🌌 COSMO
          </h1>
          <p className="text-xs font-bold tracking-[0.25em] text-sky-400 uppercase mt-1">
            3D SOLAR SYSTEM EXPLORER
          </p>
          <p className="text-[10px] tracking-widest text-slate-400 uppercase mt-0.5">
            EXPLORE • DISCOVER • UNDERSTAND
          </p>
        </div>

        {/* Progress Bar Container */}
        <div className="pt-6 space-y-2">
          <div className="h-2 w-full bg-slate-900 border border-sky-500/20 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-gradient-to-r from-amber-400 via-sky-400 to-indigo-500 rounded-full transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
            <span className="truncate pr-2">{loadingText}</span>
            <span className="text-sky-400 font-bold">{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

