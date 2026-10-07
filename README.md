# 🌌 COSMO — 3D SOLAR SYSTEM EXPLORER
> **EXPLORE • DISCOVER • UNDERSTAND**

A premium, highly interactive 3D educational web application built with **React**, **Three.js**, **React Three Fiber**, and **Tailwind CSS**. Experience our Solar System through real-time 3D planetary physics, cinematic fly-through animations, procedural surface textures, dynamic Earth day/night cycles, AI voice tutoring, interactive gravity and eclipse simulations, and a randomized space quiz!

---

## 🚀 Quick Start Guide

### 1. Installation
Clone or navigate to the project directory:
```bash
cd "c:\Users\sasha\Desktop\COSMO 3D"
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open your browser to: **`http://localhost:5173/`**

### 3. Build for Production
```bash
npm run build
npm run preview
```

---

## ✨ Features Breakdown

### 🪐 1. 3D Solar System Hero Scene
- **The Sun**: Blazing central star with procedural plasma granulation, corona flare billboards, and dynamic point illumination.
- **All Major Planets & Moons**: Mercury, Venus, Earth (with orbiting Moon), Mars, Jupiter, Saturn (with rings), Uranus, Neptune, and Pluto.
- **Real Planetary Motion**: Planets rotate on their axes with accurate axial tilts and orbit the Sun at relative educational speeds.
- **Asteroid Belt**: 1,200 instanced asteroids orbiting between Mars and Jupiter.
- **Kuiper Belt**: 1,500 icy crystalline bodies beyond Neptune.
- **Starfield & Nebulae**: 4,500 twinkling stars and cosmic dust clouds.
- **Interactive Orbit Control**: Play/Pause toggle and speed multipliers (**0.5x, 1x, 2x, 5x, 10x**).

### 🚀 2. Cinematic "Fly to Planet" Camera Transitions
- Click any planet in 3D or select from the **🚀 FLY TO PLANET** menu.
- Smooth camera flight zooms across space, decelerates gracefully near the celestial body, and orbits around it.
- **Reset Camera**: Instantly return to the system overview at any time.

### 🔍 3. Planet Detail & Surface Exploration
- **Stats Card**: Scientific metrics including Distance from Sun, Diameter, Day/Year Length, Gravity, Temperature, Moons, and Atmosphere.
- **"Explore Surface" Mode**: Zoom into ultra-close 3D view to examine surface geology.
- **Earth Day/Night Terminator**: Custom GLSL shader with daytime oceans/continents, rotating cloud layer, and glowing nighttime city lights on the dark hemisphere.
- **Mars**: Red iron oxide crust, Valles Marineris canyon, and Olympus Mons volcano.
- **Moon**: Realistic gray cratered regolith and dark basaltic maria plains.
- **Jupiter**: Alternating atmospheric bands and the 350-year Great Red Spot storm.
- **Saturn**: High-resolution double-sided translucent rings with Cassini Division.
- **Pluto**: Heart-shaped nitrogen ice plain (*Tombaugh Regio*).

### 🤖 4. COSMO AI — AI Voice Teacher & Assistant
- Floating futuristic AI assistant avatar.
- **Speech Synthesis**: Speaks educational briefings and planet facts out loud via Web Speech API (`🎙 Speak` / `🔇 Stop` / Mute toggle).
- **Interactive Q&A Engine**: Ask COSMO questions on planets, gravity, eclipses, black holes, and space missions with instant answers.

### 🎬 5. 60-Second Guided Space Journey (Tour)
- Built-in cinematic tour across all 7 planetary phases with interactive timeline scrubber and synchronized educational subtitles:
  - `0–10s`: The Sun & Planetary Genesis
  - `10–20s`: Mercury, Venus, Earth & Moon
  - `20–30s`: Mars & Asteroid Belt
  - `30–40s`: Jupiter & Saturn's Rings
  - `40–50s`: Ice Giants Uranus & Neptune
  - `50–57s`: Deep into the Kuiper Belt
  - `57–60s`: Arrival at Pluto

### ⚖️ 6. Gravity & Jump Simulator
- Input student weight on Earth (e.g. 60 kg) to calculate equivalent weights across worlds:
  - **Moon**: ~9.9 kg (1/6th gravity)
  - **Mars**: ~22.7 kg
  - **Jupiter**: ~151.6 kg
- **Animated Astronaut Jump Canvas**: Simulates projectile jump physics (\(y = v_0 t - \frac{1}{2} g t^2\)) demonstrating leap heights from 0.19 m (Jupiter) to 3.0 m (Moon) and 7.9 m (Pluto)!

### 🌑 7. Eclipse Simulator
- Interactive 2D/3D ray-tracing simulation of Sun-Earth-Moon orbital alignment.
- Move the Moon slider (0° to 360°) to align:
  - **Solar Eclipse** (Moon blocks Sun, casting umbra shadow on Earth).
  - **Lunar Eclipse** (Earth blocks sunlight, turning Moon blood red).
- Quick preset buttons for instant educational demonstration.

### 🔬 8. Science Lab Sandbox
- Customize simulation physics in real-time:
  - Orbital revolution speed (0.1x to 10x)
  - Planet axial rotation speed (0.2x to 5x)
  - Planet visual size scaling (0.5x to 2.5x)
  - Sunlight & ambient illumination intensity
  - Orbit path lines toggle
  - Graphics Performance Mode (High / Medium / Low)
  - **RESET SIMULATION** default restoration button.

### 🔭 9. Telescope Mode & Saturn Ring Explorer
- **🔭 Telescope Mode**: High-vantage overhead perspective with optical reticle crosshair HUD.
- **🪐 Ring Explorer**: Dedicated Saturn ring flyby mode with composition breakdown (*99% water ice, rock, dust*).

### 🧠 10. Space Quiz & Progress System
- **Space Quiz**: 25-question astronomy question bank, 10 randomized per game, multiple choice, points, streak multipliers, explanations, and confetti rewards.
- **Space Explorer Progress**: Checklist of visited worlds saved in `localStorage`, explorer XP rank levels, and 9 unlockable achievement badges.
- **📱 Mobile AR**: Futuristic preview card for upcoming WebXR camera projection.

---

## 🛠️ Project Structure
```
c:\Users\sasha\Desktop\COSMO 3D\
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── data/
    │   ├── planets.js           # Full astrophysical data for all 10 celestial bodies
    │   └── quizQuestions.js     # 25-question educational quiz bank
    ├── utils/
    │   └── textureGenerator.js  # Procedural high-res canvas textures (Sun, Earth, Mars, etc.)
    └── components/
        ├── SolarSystem.jsx      # Main 3D Canvas scene
        ├── Sun.jsx              # Central blazing Sun & point lighting
        ├── Planet.jsx           # Orbiting planets, day/night shader, axial tilt, clouds
        ├── Moon.jsx             # Earth-orbiting Moon
        ├── SaturnRings.jsx      # Translucent rings with radial UV mapping
        ├── AsteroidBelt.jsx     # 1,200 instanced rocky asteroids
        ├── KuiperBelt.jsx       # 1,500 instanced icy debris beyond Neptune
        ├── StarField.jsx        # 4,500 twinkling stars & distant nebulae
        ├── CameraController.jsx # Cinematic lerp travel, surface view, & tour controller
        ├── Navbar.jsx           # Futuristic navigation & orbit controls
        ├── PlanetInfo.jsx       # Glassmorphism detail card & statistics
        ├── CosmoAI.jsx          # AI Voice teacher with Web Speech & Q&A chatbot
        ├── GravitySimulator.jsx # Weight calculator & animated jump physics
        ├── EclipseSimulator.jsx # Sun-Earth-Moon alignment simulator
        ├── ScienceLab.jsx       # Physical & visual parameter sandbox
        ├── SpaceQuiz.jsx        # Interactive quiz with feedback & confetti
        ├── ProgressSystem.jsx   # Explorer progress, missions, & badges
        ├── SpaceJourney.jsx     # 60-second guided cinematic flight tour
        ├── RingExplorer.jsx     # Saturn ring analysis HUD
        ├── TelescopeMode.jsx    # Optical observatory crosshair HUD
        ├── MobileARModal.jsx    # WebXR Mobile AR preview card
        └── LoadingScreen.jsx    # Animated cosmic loading screen
```

---

## 📜 Technology Stack
- **React 18**
- **Vite 5**
- **Three.js**
- **@react-three/fiber**
- **@react-three/drei**
- **Tailwind CSS**
- **Lucide React**
- **Canvas-Confetti**
- **Web Speech Synthesis API**
