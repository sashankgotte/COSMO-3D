import React, { useState, useEffect, useRef } from 'react';
import { X, Sun, Globe, Moon, Play, Pause, RotateCcw, AlertCircle, Info, Sparkles } from 'lucide-react';

export default function EclipseSimulator({ onClose, onUnlockAchievement }) {
  const [moonAngleDeg, setMoonAngleDeg] = useState(0); // 0 = between Sun & Earth (Solar), 180 = opposite (Lunar)
  const [isPlaying, setIsPlaying] = useState(false);
  const canvasRef = useRef(null);

  // Detect Eclipse Types
  const isSolarEclipse = Math.abs(moonAngleDeg % 360) <= 9 || Math.abs((moonAngleDeg % 360) - 360) <= 9;
  const isLunarEclipse = Math.abs((moonAngleDeg % 360) - 180) <= 9;

  // Trigger achievement if user found either eclipse
  useEffect(() => {
    if ((isSolarEclipse || isLunarEclipse) && onUnlockAchievement) {
      onUnlockAchievement('eclipse_expert');
    }
  }, [isSolarEclipse, isLunarEclipse, onUnlockAchievement]);

  // Orbit loop when playing
  useEffect(() => {
    let animId;
    if (isPlaying) {
      const update = () => {
        setMoonAngleDeg((prev) => (prev + 0.6) % 360);
        animId = requestAnimationFrame(update);
      };
      animId = requestAnimationFrame(update);
    }
    return () => cancelAnimationFrame(animId);
  }, [isPlaying]);

  // Draw 2D ray-tracing alignment simulator on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const sunX = 70;
    const sunY = h / 2;
    const sunR = 34;

    const earthX = w - 140;
    const earthY = h / 2;
    const earthR = 24;

    const moonOrbitR = 75;
    const rad = (moonAngleDeg * Math.PI) / 180;
    // Angle 0 puts Moon between Earth and Sun
    const moonX = earthX - Math.cos(rad) * moonOrbitR;
    const moonY = earthY - Math.sin(rad) * moonOrbitR;
    const moonR = 10;

    // 1. Draw Moon Orbit Path
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.arc(earthX, earthY, moonOrbitR, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // 2. Draw Sun Rays
    ctx.fillStyle = 'rgba(255, 200, 50, 0.08)';
    ctx.beginPath();
    ctx.moveTo(sunX, sunY - sunR);
    ctx.lineTo(w, 0);
    ctx.lineTo(w, h);
    ctx.lineTo(sunX, sunY + sunR);
    ctx.closePath();
    ctx.fill();

    // 3. Shadow Cones
    if (isSolarEclipse) {
      // Moon casts umbra shadow onto Earth
      const shadowGrad = ctx.createLinearGradient(moonX, moonY, earthX, earthY);
      shadowGrad.addColorStop(0, 'rgba(0, 0, 0, 0.85)');
      shadowGrad.addColorStop(1, 'rgba(0, 0, 0, 0.95)');
      ctx.fillStyle = shadowGrad;
      ctx.beginPath();
      ctx.moveTo(moonX, moonY - moonR);
      ctx.lineTo(earthX, earthY - 6);
      ctx.lineTo(earthX, earthY + 6);
      ctx.lineTo(moonX, moonY + moonR);
      ctx.closePath();
      ctx.fill();
    } else if (isLunarEclipse) {
      // Earth casts umbra shadow onto Moon
      const shadowGrad = ctx.createLinearGradient(earthX, earthY, moonX, moonY);
      shadowGrad.addColorStop(0, 'rgba(180, 20, 20, 0.6)');
      shadowGrad.addColorStop(1, 'rgba(120, 10, 10, 0.85)');
      ctx.fillStyle = shadowGrad;
      ctx.beginPath();
      ctx.moveTo(earthX, earthY - earthR);
      ctx.lineTo(moonX, moonY - moonR - 2);
      ctx.lineTo(moonX, moonY + moonR + 2);
      ctx.lineTo(earthX, earthY + earthR);
      ctx.closePath();
      ctx.fill();
    }

    // 4. Draw Sun
    const sunGrad = ctx.createRadialGradient(sunX, sunY, 5, sunX, sunY, sunR * 1.5);
    sunGrad.addColorStop(0, '#ffffff');
    sunGrad.addColorStop(0.3, '#ffaa00');
    sunGrad.addColorStop(0.8, '#ff5500');
    sunGrad.addColorStop(1, 'rgba(255, 60, 0, 0)');
    ctx.fillStyle = sunGrad;
    ctx.beginPath();
    ctx.arc(sunX, sunY, sunR * 1.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffb300';
    ctx.beginPath();
    ctx.arc(sunX, sunY, sunR, 0, Math.PI * 2);
    ctx.fill();

    // 5. Draw Earth
    // Earth day/night shading
    ctx.fillStyle = '#1e40af'; // Ocean
    ctx.beginPath();
    ctx.arc(earthX, earthY, earthR, 0, Math.PI * 2);
    ctx.fill();

    // Earth green continents
    ctx.fillStyle = '#16a34a';
    ctx.beginPath();
    ctx.arc(earthX - 4, earthY - 4, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(earthX + 2, earthY + 6, 7, 0, Math.PI * 2);
    ctx.fill();

    // Earth night side shadow (away from Sun)
    ctx.fillStyle = 'rgba(2, 6, 23, 0.65)';
    ctx.beginPath();
    ctx.arc(earthX, earthY, earthR, -Math.PI / 2, Math.PI / 2, false);
    ctx.fill();

    // 6. Draw Moon
    ctx.fillStyle = isLunarEclipse ? '#b91c1c' : '#94a3b8'; // Red if Blood Moon Lunar Eclipse!
    ctx.beginPath();
    ctx.arc(moonX, moonY, moonR, 0, Math.PI * 2);
    ctx.fill();

    // Moon shadow facing away from Sun
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.beginPath();
    ctx.arc(moonX, moonY, moonR, -Math.PI / 2, Math.PI / 2, false);
    ctx.fill();

    // Labels on canvas
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 11px Orbitron';
    ctx.fillText('SUN', sunX - 12, sunY + sunR + 18);
    ctx.fillText('EARTH', earthX - 20, earthY + earthR + 18);
    ctx.fillText('MOON', moonX - 16, moonY - moonR - 8);
  }, [moonAngleDeg, isSolarEclipse, isLunarEclipse]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in pointer-events-auto">
      <div className="w-full max-w-2xl glass-panel-glow rounded-3xl overflow-hidden shadow-2xl border border-sky-400/30 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-slate-900/90 to-sky-950/90 border-b border-sky-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-600 flex items-center justify-center shadow-lg shadow-amber-500/30">
              <Moon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-wide text-white font-orbitron">
                🌑 ECLIPSE SIMULATOR
              </h2>
              <p className="text-xs text-sky-300">
                Move the Moon to align Solar and Lunar Eclipses
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
        <div className="p-6 overflow-y-auto space-y-5 text-xs">
          {/* Active Eclipse Banner Indicator */}
          {isSolarEclipse ? (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-orange-500/30 to-amber-500/20 border-2 border-amber-400 text-amber-200 flex items-center gap-3 animate-pulse shadow-lg shadow-amber-500/20">
              <Sun className="w-7 h-7 text-amber-400 shrink-0" />
              <div>
                <h3 className="text-base font-black font-orbitron text-white">
                  SOLAR ECLIPSE OCCURRING!
                </h3>
                <p className="text-xs text-amber-200 mt-0.5">
                  The Moon has aligned directly between the Sun and Earth. Its shadow (umbra) falls onto Earth, blocking the Sun and revealing the Solar Corona!
                </p>
              </div>
            </div>
          ) : isLunarEclipse ? (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-900/40 via-red-600/30 to-rose-900/40 border-2 border-red-500 text-rose-200 flex items-center gap-3 animate-pulse shadow-lg shadow-red-500/20">
              <Moon className="w-7 h-7 text-red-400 shrink-0" />
              <div>
                <h3 className="text-base font-black font-orbitron text-white">
                  LUNAR ECLIPSE OCCURRING (BLOOD MOON)!
                </h3>
                <p className="text-xs text-rose-200 mt-0.5">
                  Earth is positioned directly between the Sun and Moon. Earth's atmosphere filters blue light, casting a deep reddish shadow across the Moon!
                </p>
              </div>
            </div>
          ) : (
            <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 text-slate-400 flex items-center gap-2">
              <Info className="w-4 h-4 text-sky-400 shrink-0" />
              <span>
                Move the Moon slider below to align an eclipse, or click the Quick Preset buttons!
              </span>
            </div>
          )}

          {/* Interactive Ray Tracing Canvas */}
          <div className="p-3 rounded-2xl bg-slate-950/90 border border-slate-800 flex justify-center">
            <canvas
              ref={canvasRef}
              width={560}
              height={220}
              className="w-full h-[220px] rounded-xl bg-slate-950"
            />
          </div>

          {/* Moon Angle Orbit Slider */}
          <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800/80 space-y-2">
            <div className="flex items-center justify-between text-slate-300 font-bold uppercase text-[11px]">
              <span>Moon Orbital Angle</span>
              <span className="font-mono text-sky-400 text-sm">
                {Math.round(moonAngleDeg)}°
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="360"
              value={moonAngleDeg}
              onChange={(e) => {
                setMoonAngleDeg(Number(e.target.value));
                setIsPlaying(false);
              }}
              className="w-full"
            />
          </div>

          {/* Controls & Quick Presets */}
          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex-1 min-w-[120px] py-2.5 px-4 rounded-xl glass-btn font-bold flex items-center justify-center gap-2 text-white"
            >
              {isPlaying ? <Pause className="w-4 h-4 text-amber-400" /> : <Play className="w-4 h-4 text-emerald-400" />}
              {isPlaying ? 'Pause Orbit' : 'Auto Orbit Moon'}
            </button>

            <button
              onClick={() => {
                setMoonAngleDeg(0);
                setIsPlaying(false);
              }}
              className="py-2.5 px-4 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400 text-amber-300 font-bold flex items-center gap-2 transition-all shadow-md"
            >
              <Sun className="w-4 h-4" /> Align Solar Eclipse (0°)
            </button>

            <button
              onClick={() => {
                setMoonAngleDeg(180);
                setIsPlaying(false);
              }}
              className="py-2.5 px-4 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-400 text-rose-300 font-bold flex items-center gap-2 transition-all shadow-md"
            >
              <Moon className="w-4 h-4" /> Align Lunar Eclipse (180°)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

