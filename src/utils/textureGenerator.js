import * as THREE from 'three';

// Cache generated textures to prevent re-rendering canvases
const textureCache = new Map();

/**
 * Helper to create an offscreen canvas
 */
function createCanvas(width = 1024, height = 512) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  return { canvas, ctx, width, height };
}

/**
 * Simple pseudo-noise function for procedural texturing
 */
function pseudoNoise(x, y, seed = 0) {
  const n = Math.sin(x * 12.9898 + y * 78.233 + seed) * 43758.5453;
  return n - Math.floor(n);
}

/**
 * 1. SUN TEXTURE: Fiery plasma, granulation, sunspots, and coronal turbulence
 */
export function getSunTexture() {
  if (textureCache.has('sun')) return textureCache.get('sun');

  const { canvas, ctx, width, height } = createCanvas(1024, 512);

  // Radial / vertical base gradient of blazing plasma
  const baseGrad = ctx.createLinearGradient(0, 0, 0, height);
  baseGrad.addColorStop(0, '#ff4500');
  baseGrad.addColorStop(0.3, '#ff8c00');
  baseGrad.addColorStop(0.5, '#ffa500');
  baseGrad.addColorStop(0.7, '#ff8c00');
  baseGrad.addColorStop(1, '#ff3300');
  ctx.fillStyle = baseGrad;
  ctx.fillRect(0, 0, width, height);

  // Plasma granulation cells
  const imgData = ctx.getImageData(0, 0, width, height);
  const data = imgData.data;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const nx = x / 30;
      const ny = y / 30;
      const noise =
        Math.sin(nx * 2.0) * 0.25 +
        Math.cos(ny * 2.5) * 0.25 +
        Math.sin((nx + ny) * 3.5) * 0.2 +
        (pseudoNoise(x, y, 42) - 0.5) * 0.3;

      const factor = 1.0 + noise * 0.45;
      data[idx] = Math.min(255, data[idx] * factor + 40); // Red
      data[idx + 1] = Math.min(255, data[idx + 1] * factor + 20); // Green
      data[idx + 2] = Math.min(255, data[idx + 2] * (factor * 0.5)); // Blue
    }
  }
  ctx.putImageData(imgData, 0, 0);

  // Add solar spots (dark magnetic storm regions)
  const sunspots = [
    { x: 300, y: 220, r: 18 },
    { x: 335, y: 230, r: 10 },
    { x: 700, y: 280, r: 22 },
    { x: 740, y: 260, r: 12 },
    { x: 520, y: 190, r: 14 }
  ];

  sunspots.forEach((spot) => {
    // Penumbra (lighter outer ring)
    const penumbra = ctx.createRadialGradient(spot.x, spot.y, 0, spot.x, spot.y, spot.r * 1.8);
    penumbra.addColorStop(0, 'rgba(60, 10, 0, 0.9)');
    penumbra.addColorStop(0.6, 'rgba(180, 50, 0, 0.6)');
    penumbra.addColorStop(1, 'rgba(255, 140, 0, 0)');
    ctx.fillStyle = penumbra;
    ctx.beginPath();
    ctx.arc(spot.x, spot.y, spot.r * 1.8, 0, Math.PI * 2);
    ctx.fill();

    // Umbra (dark core)
    ctx.fillStyle = '#220500';
    ctx.beginPath();
    ctx.arc(spot.x, spot.y, spot.r * 0.6, 0, Math.PI * 2);
    ctx.fill();
  });

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set('sun', texture);
  return texture;
}

/**
 * 2. MERCURY TEXTURE: Heavily cratered gray-brown terrain with impact ray systems
 */
export function getMercuryTexture() {
  if (textureCache.has('mercury')) return textureCache.get('mercury');

  const { canvas, ctx, width, height } = createCanvas(1024, 512);

  ctx.fillStyle = '#6e6963';
  ctx.fillRect(0, 0, width, height);

  // Noise variations for rocky crust
  for (let i = 0; i < 400; i++) {
    const rx = Math.random() * width;
    const ry = Math.random() * height;
    const r = Math.random() * 40 + 5;
    const shade = Math.floor(Math.random() * 50 + 80);
    ctx.fillStyle = `rgba(${shade}, ${shade - 5}, ${shade - 10}, 0.15)`;
    ctx.beginPath();
    ctx.arc(rx, ry, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Realistic impact craters with shadows and central peaks
  for (let c = 0; c < 120; c++) {
    const cx = Math.random() * width;
    const cy = Math.random() * height;
    const cr = Math.random() * 20 + 4;

    // Rim highlight
    ctx.strokeStyle = 'rgba(210, 205, 195, 0.7)';
    ctx.lineWidth = Math.max(1, cr * 0.18);
    ctx.beginPath();
    ctx.arc(cx - 1, cy - 1, cr, 0, Math.PI * 2);
    ctx.stroke();

    // Inner shadow
    ctx.fillStyle = 'rgba(40, 36, 34, 0.75)';
    ctx.beginPath();
    ctx.arc(cx, cy, cr * 0.85, 0, Math.PI * 2);
    ctx.fill();

    // Central peak on larger craters
    if (cr > 12) {
      ctx.fillStyle = 'rgba(190, 185, 175, 0.8)';
      ctx.beginPath();
      ctx.arc(cx + 0.5, cy + 0.5, cr * 0.15, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Major Basin (Caloris Basin)
  const caloris = ctx.createRadialGradient(400, 260, 10, 400, 260, 90);
  caloris.addColorStop(0, '#423d38');
  caloris.addColorStop(0.7, '#59534c');
  caloris.addColorStop(1, 'rgba(110, 105, 99, 0)');
  ctx.fillStyle = caloris;
  ctx.beginPath();
  ctx.arc(400, 260, 90, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set('mercury', texture);
  return texture;
}

/**
 * 3. VENUS TEXTURE: Opaque yellowish sulfuric acid swirling cloud deck
 */
export function getVenusTexture() {
  if (textureCache.has('venus')) return textureCache.get('venus');

  const { canvas, ctx, width, height } = createCanvas(1024, 512);

  // Gradient of golden sulfuric clouds
  const grad = ctx.createLinearGradient(0, 0, 0, height);
  grad.addColorStop(0, '#c79c5e');
  grad.addColorStop(0.2, '#dfb97a');
  grad.addColorStop(0.4, '#edd59b');
  grad.addColorStop(0.6, '#dfba7c');
  grad.addColorStop(0.8, '#c99e5f');
  grad.addColorStop(1, '#b8894d');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Swirling chevron-shaped atmospheric cloud bands
  ctx.fillStyle = 'rgba(255, 235, 180, 0.18)';
  for (let i = 0; i < 40; i++) {
    const y = (i / 40) * height;
    ctx.beginPath();
    ctx.moveTo(0, y);
    for (let x = 0; x <= width; x += 30) {
      const dy = Math.sin(x * 0.015 + i * 0.4) * 18 + Math.cos(x * 0.03) * 8;
      ctx.lineTo(x, y + dy);
    }
    ctx.lineTo(width, y + 25);
    ctx.lineTo(0, y + 25);
    ctx.closePath();
    ctx.fill();
  }

  // Subtle darker sulfuric streaks
  ctx.fillStyle = 'rgba(140, 95, 45, 0.12)';
  for (let s = 0; s < 25; s++) {
    const sy = Math.random() * height;
    ctx.beginPath();
    ctx.ellipse(Math.random() * width, sy, Math.random() * 180 + 60, Math.random() * 15 + 4, 0.1, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set('venus', texture);
  return texture;
}

/**
 * 4. EARTH DAY TEXTURE: Rich blue oceans, green/brown continents, polar ice caps
 */
export function getEarthDayTexture() {
  if (textureCache.has('earthDay')) return textureCache.get('earthDay');

  const { canvas, ctx, width, height } = createCanvas(1024, 512);

  // Vibrant Ocean base
  const oceanGrad = ctx.createLinearGradient(0, 0, 0, height);
  oceanGrad.addColorStop(0, '#0f274a');
  oceanGrad.addColorStop(0.5, '#12487e');
  oceanGrad.addColorStop(1, '#0f274a');
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, width, height);

  // Shallow coastal waters / continental shelves (cyan-blue tint)
  ctx.fillStyle = 'rgba(34, 130, 180, 0.35)';

  // Helper to draw realistic landmass contours
  function drawContinent(points, fillColor) {
    ctx.fillStyle = fillColor;
    ctx.beginPath();
    points.forEach(([x, y], idx) => {
      const px = (x / 100) * width;
      const py = (y / 100) * height;
      if (idx === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.closePath();
    ctx.fill();
  }

  // Land color palette
  const greenLand = '#2e6b36';
  const desertLand = '#c2a15c';
  const forestLand = '#1e5229';

  // 1. North America
  drawContinent([
    [15, 18], [28, 16], [32, 28], [26, 38], [22, 45], [18, 48],
    [15, 36], [10, 28], [12, 20]
  ], greenLand);
  // North America Midwest / Desert
  drawContinent([
    [18, 30], [24, 28], [25, 38], [19, 40]
  ], desertLand);

  // 2. South America
  drawContinent([
    [24, 48], [34, 54], [32, 70], [28, 85], [24, 75], [22, 58]
  ], forestLand);
  // Amazon rainforest & Andes spine
  drawContinent([
    [23, 52], [26, 76], [24, 82], [22, 60]
  ], '#7a6a4f');

  // 3. Eurasia (Europe + Asia)
  drawContinent([
    [45, 18], [55, 15], [78, 14], [90, 22], [88, 42], [75, 48],
    [65, 42], [58, 38], [48, 35], [44, 28]
  ], greenLand);
  // Gobi / Central Asian Deserts & Tibetan Plateau
  drawContinent([
    [62, 30], [78, 28], [75, 40], [60, 38]
  ], desertLand);

  // 4. Africa
  drawContinent([
    [46, 36], [58, 34], [62, 44], [56, 72], [48, 68], [42, 50]
  ], forestLand);
  // Sahara Desert
  drawContinent([
    [44, 37], [59, 36], [60, 48], [43, 46]
  ], desertLand);

  // 5. Australia
  drawContinent([
    [78, 62], [88, 60], [89, 75], [80, 78], [76, 70]
  ], desertLand);
  drawContinent([
    [85, 62], [88, 68], [86, 76], [82, 72]
  ], greenLand);

  // 6. Antarctica (South Pole) & Greenland/Arctic (North Pole)
  ctx.fillStyle = '#f0f6ff';
  // Antarctica
  ctx.beginPath();
  ctx.ellipse(width / 2, height * 0.96, width * 0.45, height * 0.1, 0, 0, Math.PI * 2);
  ctx.fill();
  // Greenland
  ctx.beginPath();
  ctx.ellipse(width * 0.35, height * 0.12, width * 0.06, height * 0.08, 0.3, 0, Math.PI * 2);
  ctx.fill();
  // Arctic Ice Cap
  ctx.beginPath();
  ctx.ellipse(width / 2, height * 0.03, width * 0.4, height * 0.06, 0, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set('earthDay', texture);
  return texture;
}

/**
 * 5. EARTH CLOUDS TEXTURE: Swirling transparent white storm & weather patterns
 */
export function getEarthCloudsTexture() {
  if (textureCache.has('earthClouds')) return textureCache.get('earthClouds');

  const { canvas, ctx, width, height } = createCanvas(1024, 512);
  ctx.clearRect(0, 0, width, height);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';

  // Swirling weather bands and cyclone spirals
  for (let b = 0; b < 20; b++) {
    const y = (b / 20) * height;
    ctx.beginPath();
    ctx.moveTo(0, y);
    for (let x = 0; x <= width; x += 25) {
      const dy = Math.sin(x * 0.02 + b * 1.2) * 22 + Math.cos(x * 0.04) * 12;
      ctx.lineTo(x, y + dy);
    }
    ctx.lineTo(width, y + 20);
    ctx.lineTo(0, y + 20);
    ctx.closePath();
    ctx.fill();
  }

  // Cyclones / Hurricanes
  const storms = [
    { x: 280, y: 180, r: 45 },
    { x: 750, y: 190, r: 55 },
    { x: 820, y: 340, r: 40 },
    { x: 180, y: 320, r: 35 }
  ];

  storms.forEach((st) => {
    const swirl = ctx.createRadialGradient(st.x, st.y, 5, st.x, st.y, st.r);
    swirl.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
    swirl.addColorStop(0.5, 'rgba(255, 255, 255, 0.5)');
    swirl.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = swirl;
    ctx.beginPath();
    ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
    ctx.fill();
  });

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set('earthClouds', texture);
  return texture;
}

/**
 * 6. EARTH NIGHT LIGHTS TEXTURE: Deep dark oceans + glowing amber city clusters
 */
export function getEarthNightTexture() {
  if (textureCache.has('earthNight')) return textureCache.get('earthNight');

  const { canvas, ctx, width, height } = createCanvas(1024, 512);

  // Pitch black deep space night background
  ctx.fillStyle = '#020308';
  ctx.fillRect(0, 0, width, height);

  // Helper to place clusters of glowing urban city lights
  function addCityCluster(cxPct, cyPct, radius, count = 25, intensity = 1.0) {
    const cx = (cxPct / 100) * width;
    const cy = (cyPct / 100) * height;

    // Metropolitan glow halo
    const halo = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 1.4);
    halo.addColorStop(0, `rgba(255, 210, 110, ${0.45 * intensity})`);
    halo.addColorStop(0.5, `rgba(255, 170, 60, ${0.18 * intensity})`);
    halo.addColorStop(1, 'rgba(255, 150, 40, 0)');
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 1.4, 0, Math.PI * 2);
    ctx.fill();

    // Dense points of golden city lights
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.pow(Math.random(), 1.5) * radius;
      const px = cx + Math.cos(angle) * dist;
      const py = cy + Math.sin(angle) * dist;

      ctx.fillStyle = `rgba(255, ${Math.floor(220 + Math.random() * 35)}, ${Math.floor(130 + Math.random() * 60)}, ${0.75 * intensity})`;
      ctx.fillRect(px, py, 1.5, 1.5);
    }
  }

  // Major global metropolitan lighting clusters
  // North America: East Coast, Midwest, West Coast
  addCityCluster(28, 30, 32, 70, 1.0); // US East Coast (NYC, Boston, DC)
  addCityCluster(22, 32, 25, 45, 0.9); // US Midwest (Chicago, Detroit)
  addCityCluster(16, 32, 22, 40, 0.9); // US West Coast (LA, SF, Seattle)
  addCityCluster(20, 42, 18, 25, 0.8); // Mexico City

  // Europe: Densely illuminated hub
  addCityCluster(49, 26, 30, 85, 1.0); // London, Paris, Benelux, Germany
  addCityCluster(52, 32, 24, 50, 0.95); // Italy, Spain, Mediterranean

  // Asia: East Asia, India, Japan
  addCityCluster(88, 31, 26, 65, 1.0); // Tokyo & Japan
  addCityCluster(80, 35, 34, 90, 1.0); // Coastal China (Shanghai, HK, Beijing)
  addCityCluster(70, 42, 32, 80, 0.95); // India (Delhi, Mumbai, Bengaluru)
  addCityCluster(78, 50, 20, 35, 0.85); // Southeast Asia (Bangkok, Singapore)

  // South America & Africa & Australia
  addCityCluster(31, 72, 22, 35, 0.85); // São Paulo, Rio de Janeiro, Buenos Aires
  addCityCluster(56, 35, 18, 25, 0.8); // Nile Delta & Cairo
  addCityCluster(54, 75, 16, 20, 0.75); // South Africa (Johannesburg, Cape Town)
  addCityCluster(87, 72, 18, 25, 0.8); // Sydney, Melbourne

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set('earthNight', texture);
  return texture;
}

/**
 * 7. MOON TEXTURE: High contrast cratered lunar terrain with basaltic maria
 */
export function getMoonTexture() {
  if (textureCache.has('moon')) return textureCache.get('moon');

  const { canvas, ctx, width, height } = createCanvas(1024, 512);

  // Pale lunar highlands gray base
  ctx.fillStyle = '#8f949c';
  ctx.fillRect(0, 0, width, height);

  // Dark Basaltic Maria (Ancient Lava Plains)
  const maria = [
    { x: 380, y: 180, rx: 70, ry: 50 }, // Mare Tranquillitatis
    { x: 290, y: 160, rx: 85, ry: 65 }, // Mare Imbrium
    { x: 420, y: 260, rx: 60, ry: 45 }, // Mare Fecunditatis
    { x: 220, y: 220, rx: 75, ry: 60 }, // Oceanus Procellarum
    { x: 350, y: 280, rx: 55, ry: 40 }  // Mare Nubium
  ];

  maria.forEach((m) => {
    const mareGrad = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, m.rx);
    mareGrad.addColorStop(0, '#4b4f57');
    mareGrad.addColorStop(0.7, '#5d626c');
    mareGrad.addColorStop(1, 'rgba(143, 148, 156, 0)');
    ctx.fillStyle = mareGrad;
    ctx.beginPath();
    ctx.ellipse(m.x, m.y, m.rx, m.ry, 0, 0, Math.PI * 2);
    ctx.fill();
  });

  // Hundreds of impact craters
  for (let c = 0; c < 150; c++) {
    const cx = Math.random() * width;
    const cy = Math.random() * height;
    const cr = Math.random() * 16 + 3;

    // Rim highlight
    ctx.strokeStyle = 'rgba(235, 238, 245, 0.85)';
    ctx.lineWidth = Math.max(1, cr * 0.2);
    ctx.beginPath();
    ctx.arc(cx - 0.8, cy - 0.8, cr, 0, Math.PI * 2);
    ctx.stroke();

    // Inner shadow floor
    ctx.fillStyle = 'rgba(45, 48, 54, 0.8)';
    ctx.beginPath();
    ctx.arc(cx, cy, cr * 0.85, 0, Math.PI * 2);
    ctx.fill();
  }

  // Tycho Crater with prominent ray system
  const tychoX = 350;
  const tychoY = 380;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.lineWidth = 1.2;
  for (let r = 0; r < 14; r++) {
    const angle = (r / 14) * Math.PI * 2 + 0.1;
    const len = Math.random() * 120 + 80;
    ctx.beginPath();
    ctx.moveTo(tychoX, tychoY);
    ctx.lineTo(tychoX + Math.cos(angle) * len, tychoY + Math.sin(angle) * len);
    ctx.stroke();
  }
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(tychoX, tychoY, 5, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set('moon', texture);
  return texture;
}

/**
 * 8. MARS TEXTURE: Rusty iron oxide terrain, Valles Marineris canyon, Olympus Mons
 */
export function getMarsTexture() {
  if (textureCache.has('mars')) return textureCache.get('mars');

  const { canvas, ctx, width, height } = createCanvas(1024, 512);

  // Red desert base gradient
  const grad = ctx.createLinearGradient(0, 0, 0, height);
  grad.addColorStop(0, '#9e3810');
  grad.addColorStop(0.5, '#c94d18');
  grad.addColorStop(1, '#8e300d');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Dark volcanic basalt regions (Syrtis Major, Sinus Sabaeus)
  const darkRegions = [
    { x: 320, y: 250, rx: 90, ry: 60 },
    { x: 680, y: 270, rx: 110, ry: 70 },
    { x: 500, y: 310, rx: 75, ry: 45 }
  ];

  darkRegions.forEach((dr) => {
    const darkGrad = ctx.createRadialGradient(dr.x, dr.y, 10, dr.x, dr.y, dr.rx);
    darkGrad.addColorStop(0, '#541c09');
    darkGrad.addColorStop(0.7, '#73260c');
    darkGrad.addColorStop(1, 'rgba(201, 77, 24, 0)');
    ctx.fillStyle = darkGrad;
    ctx.beginPath();
    ctx.ellipse(dr.x, dr.y, dr.rx, dr.ry, 0.2, 0, Math.PI * 2);
    ctx.fill();
  });

  // Valles Marineris (Colossal canyon system stretching across the equator)
  ctx.strokeStyle = '#380f05';
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(380, 240);
  ctx.bezierCurveTo(460, 255, 540, 235, 620, 260);
  ctx.stroke();

  // Olympus Mons (Giant shield volcano caldera)
  const olympus = ctx.createRadialGradient(250, 190, 0, 250, 190, 28);
  olympus.addColorStop(0, '#d96c34');
  olympus.addColorStop(0.5, '#ba4818');
  olympus.addColorStop(0.9, '#5e1e07');
  olympus.addColorStop(1, 'rgba(160, 55, 15, 0)');
  ctx.fillStyle = olympus;
  ctx.beginPath();
  ctx.arc(250, 190, 28, 0, Math.PI * 2);
  ctx.fill();
  // Caldera peak
  ctx.fillStyle = '#2d0a03';
  ctx.beginPath();
  ctx.arc(250, 190, 5, 0, Math.PI * 2);
  ctx.fill();

  // White polar ice caps (North & South)
  ctx.fillStyle = '#f5f7fa';
  // North pole
  ctx.beginPath();
  ctx.ellipse(width / 2, 10, width * 0.18, 20, 0, 0, Math.PI * 2);
  ctx.fill();
  // South pole
  ctx.beginPath();
  ctx.ellipse(width / 2, height - 10, width * 0.14, 18, 0, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set('mars', texture);
  return texture;
}

/**
 * 9. JUPITER TEXTURE: Alternating cloud belts and the swirling Great Red Spot
 */
export function getJupiterTexture() {
  if (textureCache.has('jupiter')) return textureCache.get('jupiter');

  const { canvas, ctx, width, height } = createCanvas(1024, 512);

  // Atmospheric cloud belts palette
  const bandColors = [
    '#9b6845', '#cfab84', '#a8714b', '#e0c8a8',
    '#8d5433', '#d6b896', '#7a4224', '#ebd2b8',
    '#9b6845', '#c89e77', '#8a5232', '#dcc1a2'
  ];

  const bandH = height / bandColors.length;

  bandColors.forEach((color, idx) => {
    const y = idx * bandH;
    ctx.fillStyle = color;
    ctx.fillRect(0, y, width, bandH);

    // Turbulent wavy borders between bands
    ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.beginPath();
    ctx.moveTo(0, y);
    for (let x = 0; x <= width; x += 20) {
      const dy = Math.sin(x * 0.03 + idx) * 7 + Math.cos(x * 0.06) * 4;
      ctx.lineTo(x, y + dy);
    }
    ctx.lineTo(width, y + bandH * 0.5);
    ctx.lineTo(0, y + bandH * 0.5);
    ctx.closePath();
    ctx.fill();
  });

  // The Great Red Spot (Colossal anticyclonic storm)
  const grsX = 620;
  const grsY = 320;
  const grsRx = 55;
  const grsRy = 32;

  const grsGrad = ctx.createRadialGradient(grsX, grsY, 5, grsX, grsY, grsRx);
  grsGrad.addColorStop(0, '#bd3217'); // Intense brick red core
  grsGrad.addColorStop(0.5, '#d45633');
  grsGrad.addColorStop(0.85, '#e07a53');
  grsGrad.addColorStop(1, 'rgba(200, 120, 80, 0)');
  ctx.fillStyle = grsGrad;
  ctx.beginPath();
  ctx.ellipse(grsX, grsY, grsRx, grsRy, -0.08, 0, Math.PI * 2);
  ctx.fill();

  // Swirl ring inside GRS
  ctx.strokeStyle = 'rgba(255, 230, 200, 0.4)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.ellipse(grsX, grsY, grsRx * 0.65, grsRy * 0.65, -0.08, 0, Math.PI * 2);
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set('jupiter', texture);
  return texture;
}

/**
 * 10. SATURN TEXTURE: Elegant golden-buff atmospheric ammonia bands
 */
export function getSaturnTexture() {
  if (textureCache.has('saturn')) return textureCache.get('saturn');

  const { canvas, ctx, width, height } = createCanvas(1024, 512);

  const saturnBands = [
    '#d6b885', '#e2cb9f', '#caa470', '#eddab4',
    '#d4b27d', '#e9d5ab', '#caa06a', '#eddcb8',
    '#d9bc89', '#ebd8b2', '#cba572', '#ecd9b5'
  ];

  const bh = height / saturnBands.length;
  saturnBands.forEach((col, i) => {
    ctx.fillStyle = col;
    ctx.fillRect(0, i * bh, width, bh + 1);
  });

  // Soft atmospheric haze
  const haze = ctx.createLinearGradient(0, 0, 0, height);
  haze.addColorStop(0, 'rgba(180, 140, 90, 0.3)');
  haze.addColorStop(0.5, 'rgba(255, 245, 220, 0.15)');
  haze.addColorStop(1, 'rgba(180, 140, 90, 0.3)');
  ctx.fillStyle = haze;
  ctx.fillRect(0, 0, width, height);

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set('saturn', texture);
  return texture;
}

/**
 * 11. SATURN RINGS TEXTURE: High-res radial band pattern with Cassini Division
 */
export function getSaturnRingsTexture() {
  if (textureCache.has('saturnRings')) return textureCache.get('saturnRings');

  // Ring texture mapped across radial coordinates (width = radial distance from inner to outer)
  const { canvas, ctx, width, height } = createCanvas(1024, 64);

  const grad = ctx.createLinearGradient(0, 0, width, 0);
  grad.addColorStop(0.0, 'rgba(180, 150, 100, 0.0)');  // Transparent inner edge
  grad.addColorStop(0.08, 'rgba(190, 160, 110, 0.4)'); // C Ring (crepe ring)
  grad.addColorStop(0.25, 'rgba(215, 185, 135, 0.9)'); // B Ring (brightest and densest)
  grad.addColorStop(0.55, 'rgba(230, 200, 150, 0.95)');
  grad.addColorStop(0.58, 'rgba(30, 25, 20, 0.05)');   // Cassini Division (dark gap)
  grad.addColorStop(0.64, 'rgba(20, 15, 10, 0.0)');
  grad.addColorStop(0.66, 'rgba(205, 175, 125, 0.85)'); // A Ring
  grad.addColorStop(0.92, 'rgba(190, 160, 115, 0.7)');
  grad.addColorStop(0.94, 'rgba(10, 10, 10, 0.0)');    // Encke gap
  grad.addColorStop(0.97, 'rgba(180, 150, 110, 0.4)');
  grad.addColorStop(1.0, 'rgba(180, 150, 110, 0.0)');  // Outer fade

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Add micro-ring striations
  for (let r = 0; r < 200; r++) {
    const x = Math.random() * width;
    ctx.fillStyle = `rgba(255, 240, 210, ${Math.random() * 0.25})`;
    ctx.fillRect(x, 0, 1.5, height);
  }

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set('saturnRings', texture);
  return texture;
}

/**
 * 12. URANUS TEXTURE: Cyan-aquamarine methane atmosphere with soft bands
 */
export function getUranusTexture() {
  if (textureCache.has('uranus')) return textureCache.get('uranus');

  const { canvas, ctx, width, height } = createCanvas(1024, 512);

  const grad = ctx.createLinearGradient(0, 0, 0, height);
  grad.addColorStop(0, '#5bcbc5');
  grad.addColorStop(0.3, '#7de0db');
  grad.addColorStop(0.5, '#6ad5cf');
  grad.addColorStop(0.7, '#7ce0db');
  grad.addColorStop(1, '#53c0ba');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Delicate horizontal methane clouds
  ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
  for (let i = 0; i < 20; i++) {
    const y = Math.random() * height;
    ctx.fillRect(0, y, width, Math.random() * 15 + 4);
  }

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set('uranus', texture);
  return texture;
}

/**
 * 13. NEPTUNE TEXTURE: Deep azure blue, white cirrus storms, and Great Dark Spot
 */
export function getNeptuneTexture() {
  if (textureCache.has('neptune')) return textureCache.get('neptune');

  const { canvas, ctx, width, height } = createCanvas(1024, 512);

  const grad = ctx.createLinearGradient(0, 0, 0, height);
  grad.addColorStop(0, '#1c3fa6');
  grad.addColorStop(0.3, '#2a5cd6');
  grad.addColorStop(0.5, '#224ec4');
  grad.addColorStop(0.7, '#2b5dd9');
  grad.addColorStop(1, '#193899');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Great Dark Spot (Massive storm in southern hemisphere)
  const gds = ctx.createRadialGradient(420, 290, 5, 420, 290, 45);
  gds.addColorStop(0, '#0a1d5c');
  gds.addColorStop(0.7, '#132e82');
  gds.addColorStop(1, 'rgba(34, 78, 196, 0)');
  ctx.fillStyle = gds;
  ctx.beginPath();
  ctx.ellipse(420, 290, 45, 26, 0.1, 0, Math.PI * 2);
  ctx.fill();

  // "Scooter" and bright white methane cirrus cloud streaks
  ctx.fillStyle = 'rgba(240, 248, 255, 0.75)';
  const cirrus = [
    { x: 380, y: 260, w: 90, h: 6 },
    { x: 440, y: 320, w: 70, h: 5 },
    { x: 620, y: 220, w: 120, h: 7 },
    { x: 710, y: 360, w: 85, h: 5 }
  ];

  cirrus.forEach((c) => {
    ctx.beginPath();
    ctx.ellipse(c.x, c.y, c.w * 0.5, c.h, -0.05, 0, Math.PI * 2);
    ctx.fill();
  });

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set('neptune', texture);
  return texture;
}

/**
 * 14. PLUTO TEXTURE: Mottled tan/brown terrain with Tombaugh Regio ("The Heart")
 */
export function getPlutoTexture() {
  if (textureCache.has('pluto')) return textureCache.get('pluto');

  const { canvas, ctx, width, height } = createCanvas(1024, 512);

  // Mottled brownish-tan crust base
  ctx.fillStyle = '#bfa588';
  ctx.fillRect(0, 0, width, height);

  // Dark equatorial tholin belts (Cthulhu Macula)
  const tholin = ctx.createRadialGradient(280, 290, 20, 280, 290, 160);
  tholin.addColorStop(0, '#593922');
  tholin.addColorStop(0.6, '#7d5233');
  tholin.addColorStop(1, 'rgba(191, 165, 136, 0)');
  ctx.fillStyle = tholin;
  ctx.beginPath();
  ctx.ellipse(280, 290, 160, 65, 0, 0, Math.PI * 2);
  ctx.fill();

  // Tombaugh Regio ("The Heart" - bright nitrogen ice plain)
  const heartX = 640;
  const heartY = 240;
  const heartGrad = ctx.createRadialGradient(heartX, heartY, 10, heartX, heartY, 95);
  heartGrad.addColorStop(0, '#fbf8f2');
  heartGrad.addColorStop(0.7, '#eddcc7');
  heartGrad.addColorStop(1, 'rgba(191, 165, 136, 0)');
  ctx.fillStyle = heartGrad;

  // Draw heart-shaped lobe (Sputnik Planitia western lobe & eastern lobe)
  ctx.beginPath();
  // Left lobe
  ctx.ellipse(heartX - 35, heartY, 50, 65, -0.2, 0, Math.PI * 2);
  ctx.fill();
  // Right lobe
  ctx.beginPath();
  ctx.ellipse(heartX + 35, heartY + 10, 42, 55, 0.2, 0, Math.PI * 2);
  ctx.fill();

  // Rugged icy cratering
  for (let c = 0; c < 50; c++) {
    const cx = Math.random() * width;
    const cy = Math.random() * height;
    ctx.fillStyle = 'rgba(80, 55, 35, 0.4)';
    ctx.beginPath();
    ctx.arc(cx, cy, Math.random() * 8 + 3, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set('pluto', texture);
  return texture;
}

