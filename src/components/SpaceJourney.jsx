import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, X, Volume2, Film, Sparkles } from 'lucide-react';

const JOURNEY_MILESTONES = [
  {
    start: 0,
    end: 10,
    phase: "PHASE 1 • THE HEART OF THE SYSTEM",
    title: "The Blazing Sun & Planetary Genesis",
    description: "4.6 billion years ago, our yellow dwarf star ignited, binding eight planets, hundreds of moons, and millions of asteroids with its immense gravitational field."
  },
  {
    start: 10,
    end: 20,
    phase: "PHASE 2 • THE INNER ROCKY REALM",
    title: "Mercury, Venus, and Earth",
    description: "We sweep past cratered Mercury, toxic furnace-hot Venus, and Earth—the blue marble where liquid water, plate tectonics, and life flourish together."
  },
  {
    start: 20,
    end: 30,
    phase: "PHASE 3 • THE RED HORIZON",
    title: "Mars & The Asteroid Belt",
    description: "Venturing toward Mars, home to the colossal Olympus Mons volcano, then crossing through 1,200 rocky asteroids in the main belt between Mars and Jupiter."
  },
  {
    start: 30,
    end: 40,
    phase: "PHASE 4 • THE GAS GIANTS",
    title: "Jupiter & The Majestic Rings of Saturn",
    description: "Behold colossal Jupiter with its centuries-old Great Red Spot storm, and Saturn encircled by breathtaking rings of billions of ice crystals."
  },
  {
    start: 40,
    end: 50,
    phase: "PHASE 5 • THE FRIGID GIANTS",
    title: "Uranus & Neptune",
    description: "Past Uranus rolling on its side at a 98-degree tilt, and deep blue Neptune where methane winds scream at supersonic speeds of 2,100 km/h."
  },
  {
    start: 50,
    end: 57,
    phase: "PHASE 6 • THE FRONTIER",
    title: "Entering The Kuiper Belt",
    description: "Beyond Neptune lies the vast twilight realm of the Kuiper Belt—a disc of icy bodies, ancient comets, and pristine primordial frozen worlds."
  },
  {
    start: 57,
    end: 60,
    phase: "PHASE 7 • DEEP SPACE DESTINATION",
    title: "Pluto — King of the Dwarf Planets",
    description: "Arrival at Pluto! Towering water-ice mountains and the famous heart-shaped nitrogen glacier Tombaugh Regio greet us at the solar frontier."
  }
];

export default function SpaceJourney({
  journeyTime,
  setJourneyTime,
  isPlaying,
  setIsPlaying,
  onClose
}) {
  // Find current active narrative
  const currentMilestone = JOURNEY_MILESTONES.find(
    (m) => journeyTime >= m.start && journeyTime < m.end
  ) || JOURNEY_MILESTONES[JOURNEY_MILESTONES.length - 1];

  // Automatic timeline progression
  useEffect(() => {
    let animId;
    if (isPlaying) {
      const step = () => {
        setJourneyTime((t) => {
          if (t >= 60) {
            setIsPlaying(false);
            return 60;
          }
          return Math.min(60, t + 0.05);
        });
        animId = requestAnimationFrame(step);
      };
      animId = requestAnimationFrame(step);
    }
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, setJourneyTime, setIsPlaying]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed inset-0 z-40 pointer-events-none flex flex-col justify-between">
      {/* Top Cinema Letterbox Bar */}
      <div className="w-full bg-gradient-to-b from-black/95 via-black/80 to-transparent p-6 pointer-events-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-400">
            <Film className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold tracking-wider text-white font-orbitron flex items-center gap-2">
              🎬 60-SECOND CINEMATIC SPACE TOUR
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/30 text-rose-300 border border-rose-500/40">
                LIVE 3D
              </span>
            </h2>
            <p className="text-[11px] text-sky-300 font-medium">
              {currentMilestone.phase}
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 transition-all"
          title="Exit Space Journey"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Middle Subtitle Card (Educational Text Overlay) */}
      <div className="w-full px-6 flex justify-center mb-6">
        <div className="max-w-xl w-full p-5 rounded-2xl glass-panel-glow border border-sky-400/40 shadow-2xl text-center space-y-1.5 animate-fade-in pointer-events-auto">
          <div className="text-[11px] font-bold tracking-widest text-sky-400 uppercase font-orbitron">
            {currentMilestone.title}
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-outfit">
            {currentMilestone.description}
          </p>
        </div>
      </div>

      {/* Bottom Timeline & Media Controls Bar */}
      <div className="w-full bg-gradient-to-t from-black/95 via-black/85 to-transparent p-6 pointer-events-auto flex flex-col items-center gap-3">
        {/* Timeline Scrubber */}
        <div className="w-full max-w-2xl flex items-center gap-3">
          <span className="text-[11px] font-mono text-slate-400 w-10 text-right">
            {formatTime(journeyTime)}
          </span>

          <input
            type="range"
            min="0"
            max="60"
            step="0.1"
            value={journeyTime}
            onChange={(e) => {
              setJourneyTime(Number(e.target.value));
            }}
            className="flex-1 cursor-pointer"
          />

          <span className="text-[11px] font-mono text-slate-400 w-10">
            1:00
          </span>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setJourneyTime(0)}
            className="p-2.5 rounded-full glass-btn text-slate-300 hover:text-white"
            title="Restart Journey"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-4 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-lg shadow-sky-500/30 hover:scale-105 active:scale-95 transition-all"
            title={isPlaying ? "Pause Tour" : "Play Tour"}
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
          </button>

          <button
            onClick={() => setJourneyTime(Math.min(60, journeyTime + 10))}
            className="p-2.5 rounded-full glass-btn text-slate-300 hover:text-white text-xs font-mono font-bold"
            title="Skip 10 seconds"
          >
            +10s
          </button>
        </div>
      </div>
    </div>
  );
}

