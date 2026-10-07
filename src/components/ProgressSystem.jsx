import React from 'react';
import { X, Award, CheckCircle2, Lock, Sparkles, Trophy, Rocket, Compass, Star } from 'lucide-react';
import { PLANETS_DATA } from '../data/planets';

export default function ProgressSystem({
  exploredPlanets = [],
  unlockedBadges = [],
  onSelectPlanet,
  onClose
}) {
  const celestialBodies = PLANETS_DATA.filter(p => p.id !== 'sun');
  const totalBodies = celestialBodies.length;
  const exploredCount = celestialBodies.filter(b => exploredPlanets.includes(b.id)).length;

  // Compute missions completed
  const missions = [
    { id: 'm1', title: 'Cosmic First Step', desc: 'Visit any terrestrial planet (Mercury, Venus, Earth, Mars)', completed: ['mercury', 'venus', 'earth', 'mars'].some(id => exploredPlanets.includes(id)) },
    { id: 'm2', title: 'The Red Horizon', desc: 'Explore the surface of Mars', completed: exploredPlanets.includes('mars') },
    { id: 'm3', title: 'Gas Giant Pioneer', desc: 'Inspect Jupiter or Saturn', completed: exploredPlanets.includes('jupiter') || exploredPlanets.includes('saturn') },
    { id: 'm4', title: 'Deep Space Frontier', desc: 'Reach Uranus, Neptune, or Pluto', completed: ['uranus', 'neptune', 'pluto'].some(id => exploredPlanets.includes(id)) },
    { id: 'm5', title: 'Solar System Master', desc: 'Explore all celestial bodies', completed: exploredCount >= totalBodies }
  ];

  const missionsCompleted = missions.filter(m => m.completed).length;

  // Explorer Level based on exploration + missions
  const explorerLevel = Math.max(1, Math.floor((exploredCount * 1.5 + missionsCompleted * 2) / 3) + 1);

  const getRankTitle = (lvl) => {
    if (lvl <= 1) return 'Stargazing Cadet';
    if (lvl <= 2) return 'Astronaut Apprentice';
    if (lvl <= 3) return 'Orbital Navigator';
    if (lvl <= 4) return 'Cosmic Pioneer';
    return 'Master Space Explorer';
  };

  const allBadges = [
    { id: 'first_launch', title: '🚀 First Launch', desc: 'Launched the COSMO Explorer' },
    { id: 'earth_explorer', title: '🌍 Earth Explorer', desc: 'Investigated Earth & Moon' },
    { id: 'mars_explorer', title: '🔴 Mars Explorer', desc: 'Explored the Red Planet' },
    { id: 'ring_master', title: '🪐 Ring Master', desc: 'Explored Saturn rings' },
    { id: 'deep_space', title: '🌌 Deep Space Explorer', desc: 'Explored Kuiper Belt & Pluto' },
    { id: 'eclipse_expert', title: '🌑 Eclipse Expert', desc: 'Simulated Solar/Lunar Eclipse' },
    { id: 'gravity_pioneer', title: '⚖️ Gravity Pioneer', desc: 'Simulated gravity & jumps' },
    { id: 'cosmic_scholar', title: '🧠 Cosmic Scholar', desc: 'Scored high on Space Quiz' },
    { id: 'master_explorer', title: '🏆 Master Explorer', desc: 'Explored all 10 worlds' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in pointer-events-auto">
      <div className="w-full max-w-2xl glass-panel-glow rounded-3xl overflow-hidden shadow-2xl border border-sky-400/30 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-slate-900/90 to-amber-950/90 border-b border-amber-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-600 flex items-center justify-center shadow-lg shadow-amber-500/30">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-wide text-white font-orbitron">
                🏆 SPACE EXPLORER PROGRESS
              </h2>
              <div className="flex items-center gap-2 text-xs text-amber-300">
                <span>Rank: <b className="text-white">{getRankTitle(explorerLevel)}</b></span>
                <span>•</span>
                <span>Level <b className="text-white font-mono">{explorerLevel}</b></span>
              </div>
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
        <div className="p-6 overflow-y-auto space-y-6 text-xs">
          {/* Level & Stats Overview */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 text-center">
              <div className="text-slate-400 text-[10px] uppercase font-bold">Planets Explored</div>
              <div className="text-2xl font-black text-sky-400 font-orbitron mt-1">
                {exploredCount} / {totalBodies}
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 text-center">
              <div className="text-slate-400 text-[10px] uppercase font-bold">Missions Done</div>
              <div className="text-2xl font-black text-amber-400 font-orbitron mt-1">
                {missionsCompleted} / {missions.length}
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 text-center">
              <div className="text-slate-400 text-[10px] uppercase font-bold">Badges Earned</div>
              <div className="text-2xl font-black text-emerald-400 font-orbitron mt-1">
                {unlockedBadges.length} / {allBadges.length}
              </div>
            </div>
          </div>

          {/* Planets Explored Checklist */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-slate-300 font-bold uppercase text-[11px] tracking-wider">
              <span>Planetary Exploration Checklist</span>
              <span className="text-sky-400 font-mono">{Math.round((exploredCount / totalBodies) * 100)}% Complete</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {celestialBodies.map((b) => {
                const isVisited = exploredPlanets.includes(b.id);
                return (
                  <button
                    key={b.id}
                    onClick={() => {
                      if (onSelectPlanet) {
                        onSelectPlanet(b);
                        onClose();
                      }
                    }}
                    className={`p-2.5 rounded-xl border text-center flex flex-col items-center gap-1.5 transition-all ${
                      isVisited
                        ? 'bg-sky-500/15 border-sky-400/60 text-white shadow-md'
                        : 'bg-slate-950/40 border-slate-800/80 text-slate-500 hover:border-slate-700'
                    }`}
                  >
                    <div className="relative">
                      <span
                        className="w-4 h-4 rounded-full inline-block"
                        style={{ backgroundColor: b.color }}
                      />
                      {isVisited ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 absolute -bottom-1 -right-2 bg-slate-900 rounded-full" />
                      ) : (
                        <Lock className="w-3 h-3 text-slate-600 absolute -bottom-1 -right-2" />
                      )}
                    </div>
                    <span className="font-bold text-[11px] truncate w-full">{b.name}</span>
                    <span className="text-[9px] font-mono">
                      {isVisited ? 'EXPLORED' : 'LOCKED'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Missions List */}
          <div className="space-y-2.5">
            <div className="text-slate-300 font-bold uppercase text-[11px] tracking-wider">
              Active Scientific Missions
            </div>
            <div className="space-y-2">
              {missions.map((m) => (
                <div
                  key={m.id}
                  className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                    m.completed
                      ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200'
                      : 'bg-slate-900/50 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {m.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-600 shrink-0" />
                    )}
                    <div>
                      <div className={`font-bold text-xs ${m.completed ? 'text-white' : 'text-slate-300'}`}>
                        {m.title}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{m.desc}</div>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    m.completed ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-500'
                  }`}>
                    {m.completed ? '+100 XP' : 'Incomplete'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Badges Earned */}
          <div className="space-y-2.5">
            <div className="text-slate-300 font-bold uppercase text-[11px] tracking-wider">
              Achievement Badges
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {allBadges.map((badge) => {
                const unlocked = unlockedBadges.includes(badge.id);
                return (
                  <div
                    key={badge.id}
                    className={`p-3 rounded-xl border flex items-center gap-2.5 ${
                      unlocked
                        ? 'bg-amber-500/10 border-amber-400/40 text-amber-200 shadow-sm'
                        : 'bg-slate-950/40 border-slate-900 text-slate-600'
                    }`}
                  >
                    <div className="text-base">{badge.title.split(' ')[0]}</div>
                    <div className="truncate">
                      <div className="font-bold text-[11px] truncate">{badge.title.substring(2)}</div>
                      <div className="text-[9px] text-slate-400 truncate">{badge.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

