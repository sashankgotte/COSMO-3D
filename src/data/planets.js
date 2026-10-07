// Comprehensive educational data for all celestial bodies in the COSMO 3D Solar System

export const PLANETS_DATA = [
  {
    id: 'sun',
    name: 'Sun',
    subtitle: 'The Heart of the Solar System',
    type: 'Yellow Dwarf Star (G2V)',
    color: '#ffaa00',
    accentColor: '#ffdd44',
    radius: 9.0, // Educational visual scale
    orbitRadius: 0,
    orbitSpeed: 0,
    rotationSpeed: 0.002,
    axialTilt: 7.25,
    distanceFromSun: '0 km (Center)',
    diameter: '1,392,700 km (109 × Earth)',
    dayLength: '27 Earth days (at equator)',
    yearLength: '230 million Earth years (Galactic orbit)',
    gravity: 274.0,
    gravityText: '274.0 m/s² (28 × Earth)',
    temperature: '5,500°C (Surface) / 15M°C (Core)',
    moonsCount: 8, // 8 major planets orbiting
    atmosphere: '73% Hydrogen, 25% Helium, traces of Oxygen & Carbon',
    facts: [
      'The Sun contains 99.86% of all the mass in the entire Solar System.',
      'Light from the Sun takes approximately 8 minutes and 20 seconds to reach Earth.',
      'Nuclear fusion in the Sun converts 600 million tons of hydrogen into helium every second.',
      'About 1.3 million Earths could fit inside the Sun.',
      'The Sun generates solar winds and coronal mass ejections that create auroras across planets.'
    ],
    audioNarration: 'Welcome to the Sun! It is a 4.6 billion-year-old yellow dwarf star powering our entire solar system through thermonuclear fusion.',
    surfaceDetails: {
      type: 'Star Surface (Photosphere)',
      features: ['Solar Granulation', 'Sunspots', 'Solar Flares', 'Prominences & Coronal Loops'],
      description: 'The visible surface is a boiling ocean of plasma where magnetic storms produce giant solar flares.'
    }
  },
  {
    id: 'mercury',
    name: 'Mercury',
    subtitle: 'The Swift Iron Planet',
    type: 'Terrestrial Planet',
    color: '#a89f91',
    accentColor: '#cfc7bd',
    radius: 1.4,
    orbitRadius: 22,
    orbitSpeed: 2.4,
    rotationSpeed: 0.008,
    axialTilt: 0.034,
    distanceFromSun: '57.9 million km (0.39 AU)',
    diameter: '4,879 km (0.38 × Earth)',
    dayLength: '58.6 Earth days',
    yearLength: '88 Earth days',
    gravity: 3.7,
    gravityText: '3.7 m/s² (0.38 × Earth)',
    temperature: '-180°C to 430°C',
    moonsCount: 0,
    atmosphere: 'Extremely tenuous exosphere (Oxygen, Sodium, Hydrogen, Helium)',
    facts: [
      'Mercury is the smallest major planet in the Solar System and closest to the Sun.',
      'Despite being closest to the Sun, Mercury is NOT the hottest planet—Venus is hotter due to runaway greenhouse gases.',
      'Mercury has dramatic temperature swings: blistering 430°C by day and freezing -180°C by night.',
      'Its massive iron core makes up about 85% of the planet\'s total radius.',
      'Mercury has wrinkles called lobate scarps formed as its iron core cooled and contracted.'
    ],
    audioNarration: 'You are now observing Mercury, the smallest and fastest-orbiting planet. It races around the Sun in just 88 days and possesses vast temperature extremes.',
    surfaceDetails: {
      type: 'Cratered Rocky Crust',
      features: ['Caloris Basin', 'Impact Craters', 'Lobate Scarps (wrinkles)', 'Permanently Shadowed Polar Ice'],
      description: 'Mercury is battered by meteorites, resembling Earth\'s Moon with towering crater walls and smooth basalt plains.'
    }
  },
  {
    id: 'venus',
    name: 'Venus',
    subtitle: 'Earth\'s Toxic Twin',
    type: 'Terrestrial Planet',
    color: '#e3bb76',
    accentColor: '#f7d08a',
    radius: 2.2,
    orbitRadius: 32,
    orbitSpeed: 1.6,
    rotationSpeed: -0.004, // Retrograde rotation
    axialTilt: 177.3,
    distanceFromSun: '108.2 million km (0.72 AU)',
    diameter: '12,104 km (0.95 × Earth)',
    dayLength: '243 Earth days (longer than its year!)',
    yearLength: '225 Earth days',
    gravity: 8.87,
    gravityText: '8.87 m/s² (0.91 × Earth)',
    temperature: '465°C (Hottest Planet)',
    moonsCount: 0,
    atmosphere: '96.5% Carbon Dioxide, 3.5% Nitrogen with clouds of Sulfuric Acid',
    facts: [
      'Venus is the hottest planet in the Solar System, hot enough to melt lead!',
      'Venus rotates backwards (retrograde) compared to most other planets, so the Sun rises in the west and sets in the east.',
      'A single day on Venus is longer than its entire year around the Sun.',
      'Surface atmospheric pressure on Venus is 92 times greater than Earth—equivalent to 900 meters underwater.',
      'Venus is shrouded in thick reflective sulfuric acid clouds, making it the second brightest object in the night sky.'
    ],
    audioNarration: 'Behold Venus, Earth\'s toxic sister world. A runaway greenhouse effect traps heat under suffocating carbon dioxide clouds, making it 465 degrees Celsius.',
    surfaceDetails: {
      type: 'Volcanic Plains & Highlands',
      features: ['Maxwell Montes (11km high)', 'Ishtar Terra', 'Sulfuric Acid Cloud Deck', 'Thousands of Volcanoes'],
      description: 'Under its opaque clouds lies a scorching landscape shaped by volcanic eruptions, basaltic plains, and crushing atmospheric pressure.'
    }
  },
  {
    id: 'earth',
    name: 'Earth',
    subtitle: 'The Blue Marble & Oasis of Life',
    type: 'Terrestrial Planet',
    color: '#2b82c9',
    accentColor: '#60a5fa',
    radius: 2.4,
    orbitRadius: 44,
    orbitSpeed: 1.1,
    rotationSpeed: 0.015,
    axialTilt: 23.44,
    distanceFromSun: '149.6 million km (1.00 AU)',
    diameter: '12,742 km',
    dayLength: '24.0 hours',
    yearLength: '365.25 days',
    gravity: 9.81,
    gravityText: '9.81 m/s² (Standard 1G)',
    temperature: '15°C average (-89°C to 57°C)',
    moonsCount: 1, // Moon
    atmosphere: '78% Nitrogen, 21% Oxygen, 0.9% Argon, 0.04% Carbon Dioxide',
    facts: [
      'Earth is the only known celestial body in the universe confirmed to harbor life.',
      'Over 71% of Earth\'s surface is covered by liquid water oceans, giving it its iconic blue marble look.',
      'Earth\'s powerful magnetic field shields life from harmful solar radiation and cosmic rays.',
      'The rotation axis tilt of 23.4 degrees causes our vibrant four seasons.',
      'At night, human civilization illuminates the continents with dazzling clusters of city lights.'
    ],
    audioNarration: 'Welcome to Earth, our home planet and the only known haven for life in the universe. Dynamic oceans, shifting weather systems, and protective magnetosphere make life thrive here.',
    surfaceDetails: {
      type: 'Hydrosphere & Continental Crust',
      features: ['Pacific & Atlantic Oceans', 'Vibrant Continents', 'Dynamic Cloud Layer', 'Nighttime City Lights', 'Polar Ice Caps'],
      description: 'Earth features active plate tectonics, lush continents, flowing oceans, and a protective nitrogen-oxygen atmosphere.'
    }
  },
  {
    id: 'moon',
    name: 'Moon',
    subtitle: 'Earth\'s Natural Satellite',
    type: 'Natural Satellite',
    color: '#b0b5bc',
    accentColor: '#e2e8f0',
    radius: 0.85,
    orbitRadius: 5.0, // Orbits around Earth
    orbitSpeed: 3.5,
    rotationSpeed: 0.012,
    axialTilt: 6.68,
    distanceFromSun: '149.6M km (384,400 km from Earth)',
    diameter: '3,474 km (0.27 × Earth)',
    dayLength: '27.3 Earth days (Tidally locked)',
    yearLength: '27.3 Earth days (Orbital period)',
    gravity: 1.62,
    gravityText: '1.62 m/s² (0.166 × Earth, 1/6th G)',
    temperature: '-130°C to 120°C',
    moonsCount: 0,
    atmosphere: 'Negligible exosphere (Helium, Neon, Hydrogen)',
    facts: [
      'The Moon is tidally locked to Earth, meaning the same face always points toward us.',
      'Gravity on the Moon is only 1/6th of Earth\'s gravity—you could jump six times higher!',
      'Twelve humans have walked on the lunar surface during NASA\'s Apollo missions (1969–1972).',
      'The Moon\'s gravitational pull causes Earth\'s ocean tides.',
      'Ancient volcanic lava flows formed the dark flat plains called lunar maria (seas).'
    ],
    audioNarration: 'You are now examining Earth\'s Moon. Tidally locked to Earth, its low gravity lets you leap six times higher than on our home world.',
    surfaceDetails: {
      type: 'Impact Regolith & Basaltic Maria',
      features: ['Sea of Tranquility', 'Tycho Crater with Ray System', 'Lunar Highlands', 'Copernicus Crater'],
      description: 'The Moon is covered with pulverized rock called regolith, ancient impact craters, and dark basalt plains formed by prehistoric volcanic floods.'
    }
  },
  {
    id: 'mars',
    name: 'Mars',
    subtitle: 'The Red Planet',
    type: 'Terrestrial Planet',
    color: '#c1440e',
    accentColor: '#f97316',
    radius: 1.7,
    orbitRadius: 58,
    orbitSpeed: 0.82,
    rotationSpeed: 0.014,
    axialTilt: 25.19,
    distanceFromSun: '227.9 million km (1.52 AU)',
    diameter: '6,779 km (0.53 × Earth)',
    dayLength: '24.6 hours (1 Sol)',
    yearLength: '687 Earth days',
    gravity: 3.71,
    gravityText: '3.71 m/s² (0.38 × Earth)',
    temperature: '-63°C average (-140°C to 20°C)',
    moonsCount: 2, // Phobos & Deimos
    atmosphere: '95% Carbon Dioxide, 2.6% Nitrogen, 1.9% Argon',
    facts: [
      'Mars appears red because its surface is rich in iron oxide (rust) minerals.',
      'Mars is home to Olympus Mons, the largest volcano in the Solar System—three times taller than Mount Everest!',
      'Valles Marineris is a gigantic canyon system that spans over 4,000 km—ten times longer than Earth\'s Grand Canyon.',
      'A Martian day is called a "Sol" and lasts 24 hours and 37 minutes, very similar to Earth.',
      'Mars has frozen water and carbon dioxide ice caps at both its north and south poles.'
    ],
    audioNarration: 'You are now exploring Mars, the Red Planet! Iron oxide rust on its soil gives it its signature hue. It hosts the tallest volcano and deepest canyon in our solar system.',
    surfaceDetails: {
      type: 'Oxidized Desert Crust',
      features: ['Olympus Mons Volcano', 'Valles Marineris Grand Canyon', 'Polar Ice Caps', 'Ancient Dried Riverbeds'],
      description: 'A rust-colored desert world of giant shield volcanoes, colossal rift valleys, and dust storms that can envelop the entire planet.'
    }
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    subtitle: 'The King of Planets',
    type: 'Gas Giant',
    color: '#c99059',
    accentColor: '#fbbf24',
    radius: 5.6,
    orbitRadius: 84,
    orbitSpeed: 0.45,
    rotationSpeed: 0.035, // Fastest rotation
    axialTilt: 3.13,
    distanceFromSun: '778.5 million km (5.20 AU)',
    diameter: '139,820 km (11 × Earth)',
    dayLength: '9.9 hours (Fastest spinning planet!)',
    yearLength: '11.86 Earth years',
    gravity: 24.79,
    gravityText: '24.79 m/s² (2.53 × Earth)',
    temperature: '-110°C (Cloud tops)',
    moonsCount: 95, // Io, Europa, Ganymede, Callisto, etc.
    atmosphere: '90% Hydrogen, 10% Helium, traces of Methane & Ammonia',
    facts: [
      'Jupiter is the most massive planet in our Solar System—more than twice as massive as all other planets combined!',
      'The Great Red Spot is a monstrous storm that has raged for over 350 years, wider than planet Earth.',
      'Jupiter rotates faster than any other planet, completing a full day in just under 10 hours.',
      'Its moon Ganymede is the largest moon in the Solar System, larger even than the planet Mercury.',
      'Europa, another of Jupiter\'s moons, hides a vast liquid ocean beneath its frozen crust with potential for extraterrestrial life.'
    ],
    audioNarration: 'Approaching Jupiter, the colossal king of planets! More than 1,300 Earths could fit inside this spinning giant of hydrogen and helium clouds.',
    surfaceDetails: {
      type: 'Turbulent Gas Atmosphere',
      features: ['The Great Red Spot (Anticyclone)', 'Alternating Cloud Belts & Zones', 'Jet Streams', 'Auroral Ovals'],
      description: 'Jupiter has no solid surface; instead, violent winds of 600 km/h whip colorful ammonia clouds into dynamic counter-rotating bands.'
    }
  },
  {
    id: 'saturn',
    name: 'Saturn',
    subtitle: 'The Jewel of the Solar System',
    type: 'Gas Giant',
    color: '#e2bf7d',
    accentColor: '#fef08a',
    radius: 4.8,
    orbitRadius: 114,
    orbitSpeed: 0.32,
    rotationSpeed: 0.03,
    axialTilt: 26.73,
    hasRings: true,
    ringInnerRadius: 6.2,
    ringOuterRadius: 12.0,
    distanceFromSun: '1.43 billion km (9.58 AU)',
    diameter: '116,460 km (9.1 × Earth)',
    dayLength: '10.7 hours',
    yearLength: '29.45 Earth years',
    gravity: 10.44,
    gravityText: '10.44 m/s² (1.06 × Earth)',
    temperature: '-140°C (Cloud tops)',
    moonsCount: 146, // Most moons of any planet! (Titan, Enceladus...)
    atmosphere: '96% Hydrogen, 3% Helium, traces of Methane & Ammonia',
    facts: [
      'Saturn has the most spectacular and extensive ring system in the Solar System.',
      'The rings span up to 282,000 km across, yet are remarkably thin—averaging only about 10 to 30 meters thick!',
      'Saturn is the least dense planet in the Solar System; its density is lower than water, meaning it could float in a giant bathtub!',
      'Saturn currently holds the record for the most confirmed moons at 146, including Titan which has a thick atmosphere.',
      'At Saturn\'s north pole lies an enigmatic hexagonal jet stream storm system wider than Earth.'
    ],
    audioNarration: 'Welcome to Saturn, the ringed jewel of our solar system! Its majestic rings are made of billions of shimmering water ice crystals and rocky debris.',
    surfaceDetails: {
      type: 'Ammonia Cloud Bands & Majestic Rings',
      features: ['Spectacular Ring System (A, B, C rings)', 'Cassini Division Gap', 'North Polar Hexagon', 'Golden Cloud Bands'],
      description: 'Saturn\'s upper atmosphere displays subtle golden bands, crowned by a breathtaking ring system made of billions of icy particles.'
    }
  },
  {
    id: 'uranus',
    name: 'Uranus',
    subtitle: 'The Tilted Ice Giant',
    type: 'Ice Giant',
    color: '#70d6d0',
    accentColor: '#2dd4bf',
    radius: 3.4,
    orbitRadius: 145,
    orbitSpeed: 0.22,
    rotationSpeed: -0.02, // Retrograde & tilted on its side!
    axialTilt: 97.77, // Rotates on its side
    hasRings: true,
    ringInnerRadius: 4.2,
    ringOuterRadius: 5.6,
    distanceFromSun: '2.87 billion km (19.2 AU)',
    diameter: '50,724 km (4.0 × Earth)',
    dayLength: '17.2 hours',
    yearLength: '84.0 Earth years',
    gravity: 8.69,
    gravityText: '8.69 m/s² (0.89 × Earth)',
    temperature: '-224°C (Coldest Planetary Atmosphere)',
    moonsCount: 28, // Miranda, Ariel, Umbriel, Titania, Oberon
    atmosphere: '83% Hydrogen, 15% Helium, 2% Methane (gives its cyan-blue color)',
    facts: [
      'Uranus rotates almost completely on its side with an axial tilt of 98 degrees, likely caused by an ancient cosmic collision!',
      'Because it rotates on its side, each pole experiences 42 years of continuous sunlight followed by 42 years of darkness.',
      'Methane in its upper atmosphere absorbs red light and reflects cyan-blue sunlight.',
      'Uranus holds the record for the coldest recorded atmosphere in the Solar System at -224°C.',
      'Uranus has 13 faint concentric rings and 28 moons named after characters from Shakespeare and Alexander Pope.'
    ],
    audioNarration: 'You are now at Uranus, the mysterious ice giant that rolls around the Sun on its side! Its cyan glow is caused by atmospheric methane gas absorbing red light.',
    surfaceDetails: {
      type: 'Methane-Rich Ice Atmosphere',
      features: ['Cyan Methane Cloud Haze', 'Faint Ring System', 'Extreme 98° Axial Tilt', 'Deep Slushy Mantle of Water & Ammonia'],
      description: 'A smooth, aquamarine ice giant encased in frigid methane clouds with supersonic wind currents.'
    }
  },
  {
    id: 'neptune',
    name: 'Neptune',
    subtitle: 'The Windy Deep Blue Giant',
    type: 'Ice Giant',
    color: '#274fd6',
    accentColor: '#3b82f6',
    radius: 3.3,
    orbitRadius: 175,
    orbitSpeed: 0.17,
    rotationSpeed: 0.022,
    axialTilt: 28.32,
    distanceFromSun: '4.50 billion km (30.1 AU)',
    diameter: '49,244 km (3.9 × Earth)',
    dayLength: '16.1 hours',
    yearLength: '164.8 Earth years',
    gravity: 11.15,
    gravityText: '11.15 m/s² (1.14 × Earth)',
    temperature: '-214°C',
    moonsCount: 16, // Triton, Proteus, Nereid...
    atmosphere: '80% Hydrogen, 19% Helium, 1.5% Methane',
    facts: [
      'Neptune is the most distant major planet from the Sun, more than 4.5 billion kilometers away.',
      'Neptune has the most violent winds in the Solar System, reaching blistering speeds of over 2,100 km/h (faster than sound)!',
      'It takes Neptune nearly 165 Earth years to complete just one orbit around the Sun.',
      'Neptune was the first planet predicted using mathematical calculations before being directly observed through a telescope.',
      'Its largest moon Triton orbits backward (retrograde) and shoots nitrogen geysers into space.'
    ],
    audioNarration: 'Welcome to Neptune, the furthest major planet! Here, supersonic storms howl at over 2,100 kilometers per hour through an intense azure blue atmosphere.',
    surfaceDetails: {
      type: 'Deep Azure Ice Atmosphere',
      features: ['Great Dark Spot Storm', 'Scooter White Cirrus Clouds', 'Supersonic Jet Winds', 'Diamond Rain Mantle'],
      description: 'An intensely blue storm-swept world where high-altitude methane ice crystal clouds whip around at supersonic velocities.'
    }
  },
  {
    id: 'pluto',
    name: 'Pluto',
    subtitle: 'Dwarf Planet of the Kuiper Belt',
    type: 'Dwarf Planet (Kuiper Belt Object)',
    color: '#d4b292',
    accentColor: '#e0a96d',
    radius: 1.0,
    orbitRadius: 205,
    orbitSpeed: 0.12,
    rotationSpeed: -0.005, // Retrograde
    axialTilt: 122.53,
    distanceFromSun: '5.91 billion km (39.5 AU)',
    diameter: '2,377 km (0.19 × Earth)',
    dayLength: '153.3 hours (6.4 Earth days)',
    yearLength: '248.0 Earth years',
    gravity: 0.62,
    gravityText: '0.62 m/s² (0.063 × Earth, 1/16th G)',
    temperature: '-230°C',
    moonsCount: 5, // Charon, Styx, Nix, Kerberos, Hydra
    atmosphere: 'Extremely thin, seasonal nitrogen, methane, and carbon monoxide',
    facts: [
      'In 2006, the International Astronomical Union (IAU) reclassified Pluto as a "Dwarf Planet" because it has not cleared its orbital neighborhood.',
      'Pluto has a famous heart-shaped nitrogen glacier plain called Tombaugh Regio, discovered by NASA\'s New Horizons spacecraft.',
      'Pluto is smaller than Earth\'s Moon, and even smaller than the United States is wide!',
      'Pluto and its largest moon Charon are mutually tidally locked, facing each other like cosmic dance partners.',
      'Pluto\'s orbit is eccentric and tilted 17 degrees; sometimes it is actually closer to the Sun than Neptune is!'
    ],
    audioNarration: 'You have ventured to Pluto in the Kuiper Belt! Reclassified in 2006 as a dwarf planet, this frozen world features towering water-ice mountains and a famous heart-shaped nitrogen glacier.',
    surfaceDetails: {
      type: 'Nitrogen & Water Ice Crust',
      features: ['Tombaugh Regio ("The Heart")', 'Sputnik Planitia Nitrogen Ice Plain', 'Hillary & Norgay Ice Mountains (3.5km high)', 'Mottled Tholin Terrain'],
      description: 'A fascinating frozen realm of nitrogen glaciers, rugged mountains made of rock-hard water ice, and dark reddish tholin organic deposits.'
    }
  }
];

// Quick lookup dictionary by planet ID
export const PLANETS_BY_ID = PLANETS_DATA.reduce((acc, p) => {
  acc[p.id] = p;
  return acc;
}, {});

