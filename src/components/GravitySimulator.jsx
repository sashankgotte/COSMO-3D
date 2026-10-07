import React, { useState, useEffect, useRef } from 'react';
import { X, Scale, ArrowUp, Activity, Sparkles, RefreshCw } from 'lucide-react';
import { PLANETS_DATA } from '../data/planets';

export default function GravitySimulator({ onClose, onUnlockAchievement }) {
  const [earthWeight, setEarthWeight] = useState(60);
  const [selectedBodyId, setSelectedBodyId] = useState('moon');
  const [isJumping, setIsJumping] = useState(false);
  const [jumpHeightMeters, setJumpHeightMeters] = useState(0);

  const canvasRef = useRef(null);

  // Available bodies for comparison
  const bodies = PLANETS_DATA.filter(p => p.id !== 'sun');

  const selectedBody = bodies.find(b => b.id === selectedBodyId) || bodies[0];
  const earthGravity = 9.81;
  const currentGravity = selectedBody.gravity || 9.81;

  // Calculate equivalent weight
  const equivalentWeight = ((earthWeight * currentGravity) / earthGravity).toFixed(1);
  const weightRatio = (currentGravity / earthGravity).toFixed(2);

  // Jump height based on physics: h = v^2 / (2g)
  // Assuming 0.5m baseline jump on Earth
  const maxJumpHeight = (0.5 * (earthGravity / currentGravity)).toFixed(2);

  // Trigger achievement if user opened gravity simulator
  useEffect(() => {
    if (onUnlockAchievement) {
      onUnlockAchievement('gravity_pioneer');
    }
  }, [onUnlockAchievement]);

  // Jump animation loop on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    let time = 0;
    const v0 = Math.sqrt(2 * earthGravity * 0.5); // Initial jump velocity for 0.5m jump on Earth (~3.13 m/s)
    const scaleY = 32; // Pixels per meter

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const groundY = canvas.height - 40;

      // Draw planetary surface line
      ctx.strokeStyle = selectedBody.accentColor || '#38bdf8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(20, groundY);
      ctx.lineTo(canvas.width - 20, groundY);
      ctx.stroke();

      // Ground texture stripes
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.fillRect(20, groundY, canvas.width - 40, 30);

      // Physics equation: y = v0*t - 0.5*g*t^2
      let currentH = 0;
      if (isJumping) {
        time += 0.025;
        currentH = v0 * time - 0.5 * currentGravity * time * time;
        if (currentH <= 0) {
          currentH = 0;
          setIsJumping(false);
          time = 0;
        }
      }
      setJumpHeightMeters(Math.max(0, currentH).toFixed(2));

      const astronautY = groundY - currentH * scaleY - 35;
      const astronautX = canvas.width / 2;

      // Draw Astronaut Figure
      // Shadow on ground (shrinks as astronaut jumps higher)
      const shadowW = Math.max(8, 28 - currentH * 6);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.beginPath();
      ctx.ellipse(astronautX, groundY - 2, shadowW, 4, 0, 0, Math.PI * 2);
      ctx.fill();

      // Body (Suit)
      ctx.fillStyle = '#f8fafc';
      ctx.beginPath();
      ctx.roundRect(astronautX - 12, astronautY + 12, 24, 26, 6);
      ctx.fill();

      // Backpack
      ctx.fillStyle = '#64748b';
      ctx.fillRect(astronautX - 16, astronautY + 14, 5, 22);

      // Helmet
      ctx.fillStyle = '#f8fafc';
      ctx.beginPath();
      ctx.arc(astronautX, astronautY + 6, 11, 0, Math.PI * 2);
      ctx.fill();

      // Visor
      ctx.fillStyle = '#0284c7';
      ctx.beginPath();
      ctx.arc(astronautX + 2, astronautY + 6, 6, 0, Math.PI * 2);
      ctx.fill();

      // Limbs
      ctx.strokeStyle = '#f8fafc';
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      // Legs
      ctx.beginPath();
      ctx.moveTo(astronautX - 6, astronautY + 38);
      ctx.lineTo(astronautX - 6, astronautY + (isJumping ? 46 : 49));
      ctx.moveTo(astronautX + 6, astronautY + 38);
      ctx.lineTo(astronautX + 6, astronautY + (isJumping ? 46 : 49));
      ctx.stroke();

      // Jump peak measurement line
      if (isJumping && currentH > 0.1) {
        ctx.strokeStyle = '#38bdf8';
        ctx.setLineDash([3, 3]);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(astronautX + 25, groundY);
        ctx.lineTo(astronautX + 25, astronautY + 20);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = '#38bdf8';
        ctx.font = '10px Orbitron';
        ctx.fillText(`${currentH.toFixed(2)} m`, astronautX + 32, astronautY + 25);
      }

      animationId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationId);
  }, [isJumping, currentGravity, selectedBody]);

  const handleStartJump = () => {
    setIsJumping(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in pointer-events-auto">
      <div className="w-full max-w-2xl glass-panel-glow rounded-3xl overflow-hidden shadow-2xl border border-sky-400/30 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-slate-900/90 to-sky-950/90 border-b border-sky-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/30">
              <Scale className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-wide text-white font-orbitron">
                ⚖️ GRAVITY & JUMP SIMULATOR
              </h2>
              <p className="text-xs text-sky-300">
                Calculate your weight & jumping power across the Solar System
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

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs">
          {/* Earth Weight Input */}
          <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800/80">
            <div className="flex items-center justify-between mb-2">
              <label className="text-slate-300 font-bold uppercase tracking-wider text-[11px] flex items-center gap-2">
                <Activity className="w-4 h-4 text-sky-400" />
                Your Weight on Earth
              </label>
              <div className="text-lg font-black text-sky-400 font-orbitron">
                {earthWeight} kg
                <span className="text-xs text-slate-400 font-normal ml-1">
                  ({(earthWeight * 2.20462).toFixed(1)} lbs)
                </span>
              </div>
            </div>
            <input
              type="range"
              min="20"
              max="150"
              value={earthWeight}
              onChange={(e) => setEarthWeight(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Planet Selector Grid */}
          <div>
            <div className="text-slate-400 font-semibold mb-2 uppercase text-[10px] tracking-wider">
              Select Destination Planet or Moon
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {bodies.map((b) => (
                <button
                  key={b.id}
                  onClick={() => {
                    setSelectedBodyId(b.id);
                    setIsJumping(false);
                  }}
                  className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                    selectedBodyId === b.id
                      ? 'bg-sky-500/20 border-sky-400 text-white shadow-lg shadow-sky-500/20 scale-105'
                      : 'bg-slate-900/50 border-slate-800/80 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full shadow-sm"
                    style={{ backgroundColor: b.color }}
                  />
                  <span className="font-bold text-[11px] truncate w-full">{b.name}</span>
                  <span className="text-[10px] text-slate-400">
                    {(b.gravity / earthGravity).toFixed(2)}g
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Results Comparison Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900/80 to-sky-950/40 border border-sky-500/30">
              <div className="text-slate-400 text-[10px] uppercase font-semibold">
                Weight on {selectedBody.name}
              </div>
              <div className="text-2xl font-black text-white font-orbitron mt-1">
                {equivalentWeight} kg
              </div>
              <div className="text-[11px] text-sky-400 mt-1">
                {weightRatio}× your Earth weight
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900/80 to-indigo-950/40 border border-indigo-500/30">
              <div className="text-slate-400 text-[10px] uppercase font-semibold">
                Surface Gravity (g)
              </div>
              <div className="text-2xl font-black text-white font-orbitron mt-1">
                {currentGravity.toFixed(2)} m/s²
              </div>
              <div className="text-[11px] text-indigo-300 mt-1">
                Earth is 9.81 m/s²
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900/80 to-emerald-950/40 border border-emerald-500/30">
              <div className="text-slate-400 text-[10px] uppercase font-semibold">
                Max Jump Height
              </div>
              <div className="text-2xl font-black text-emerald-400 font-orbitron mt-1">
                {maxJumpHeight} m
              </div>
              <div className="text-[11px] text-emerald-300 mt-1">
                vs 0.50 m on Earth
              </div>
            </div>
          </div>

          {/* Interactive Jump Canvas Simulation */}
          <div className="p-4 rounded-2xl bg-slate-950/90 border border-sky-500/30 flex flex-col items-center">
            <div className="w-full flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Astronaut Jump Physics on {selectedBody.name}
              </span>
              <span className="text-[11px] font-mono text-sky-400">
                Height: {jumpHeightMeters} m
              </span>
            </div>

            <canvas
              ref={canvasRef}
              width={500}
              height={180}
              className="w-full h-[180px] rounded-xl bg-slate-900/50 border border-slate-800"
            />

            <button
              onClick={handleStartJump}
              disabled={isJumping}
              className={`mt-3 px-6 py-2 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg ${
                isJumping
                  ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white shadow-sky-500/30 active:scale-95'
              }`}
            >
              <ArrowUp className="w-4 h-4" />
              {isJumping ? 'Jumping in Microgravity...' : `Jump on ${selectedBody.name}!`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

