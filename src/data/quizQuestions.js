// Educational question bank for COSMO Space Quiz
export const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Which planet is known as the 'Red Planet' due to iron minerals on its surface?",
    options: ["Venus", "Mars", "Jupiter", "Mercury"],
    correctIndex: 1,
    explanation: "Mars appears reddish because its soil is rich in iron oxide (rust) minerals.",
    category: "Planets"
  },
  {
    id: 2,
    question: "Which planet has the most extensive and famous ring system?",
    options: ["Uranus", "Neptune", "Jupiter", "Saturn"],
    correctIndex: 3,
    explanation: "Saturn has the most spectacular ring system, composed mostly of ice particles, rocky debris, and dust.",
    category: "Planets"
  },
  {
    id: 3,
    question: "Which planet is closest to the Sun?",
    options: ["Mercury", "Venus", "Earth", "Mars"],
    correctIndex: 0,
    explanation: "Mercury orbits closest to the Sun at an average distance of about 58 million kilometers (0.39 AU).",
    category: "Solar System"
  },
  {
    id: 4,
    question: "What is Pluto officially classified as by the International Astronomical Union?",
    options: ["Terrestrial Planet", "Gas Giant", "Dwarf Planet", "Asteroid"],
    correctIndex: 2,
    explanation: "In 2006, the IAU reclassified Pluto as a Dwarf Planet because it hasn't cleared its orbital zone.",
    category: "Dwarf Planets"
  },
  {
    id: 5,
    question: "What astronomical event occurs when the Moon passes directly between the Sun and Earth?",
    options: ["Lunar Eclipse", "Solar Eclipse", "Aurora Borealis", "Equinox"],
    correctIndex: 1,
    explanation: "A Solar Eclipse occurs when the Moon aligns between the Sun and Earth, casting its shadow onto Earth.",
    category: "Eclipses"
  },
  {
    id: 6,
    question: "Which planet is the hottest in the Solar System, with surface temperatures around 465°C?",
    options: ["Mercury", "Venus", "Mars", "Jupiter"],
    correctIndex: 1,
    explanation: "Venus is hotter than Mercury despite being further away due to a runaway greenhouse effect from thick CO₂ clouds.",
    category: "Planets"
  },
  {
    id: 7,
    question: "Approximately how much is gravity on the Moon compared to Earth's gravity?",
    options: ["About 1/2 (50%)", "About 1/6 (16.6%)", "About 1/10 (10%)", "Double (200%)"],
    correctIndex: 1,
    explanation: "Lunar gravity is about 1.62 m/s², approximately one-sixth of Earth's gravity (9.81 m/s²).",
    category: "Gravity"
  },
  {
    id: 8,
    question: "What is the Great Red Spot on Jupiter?",
    options: ["A massive volcano", "A gigantic storm raging for centuries", "An impact crater", "A sea of molten lava"],
    correctIndex: 1,
    explanation: "The Great Red Spot is a persistent anticyclonic storm wider than Earth that has been observed for over 350 years.",
    category: "Planets"
  },
  {
    id: 9,
    question: "Which planet rotates almost completely on its side with an axial tilt of about 98°?",
    options: ["Neptune", "Uranus", "Saturn", "Mars"],
    correctIndex: 1,
    explanation: "Uranus has an extreme tilt of 97.8°, causing each pole to experience 42 years of continuous sunlight and darkness.",
    category: "Planets"
  },
  {
    id: 10,
    question: "Where is the main Asteroid Belt located in our Solar System?",
    options: ["Between Earth and Mars", "Between Mars and Jupiter", "Beyond Neptune", "Inside Mercury's orbit"],
    correctIndex: 1,
    explanation: "The main Asteroid Belt lies between the orbits of Mars and Jupiter, containing millions of rocky remnants.",
    category: "Solar System"
  },
  {
    id: 11,
    question: "What is the Kuiper Belt?",
    options: [
      "A ring around Saturn",
      "A region of icy bodies and dwarf planets beyond Neptune",
      "The outer atmosphere of the Sun",
      "A cloud of gas between Earth and Mars"
    ],
    correctIndex: 1,
    explanation: "The Kuiper Belt is a vast disc-shaped realm beyond Neptune harboring icy comets, asteroids, and dwarf planets like Pluto.",
    category: "Deep Space"
  },
  {
    id: 12,
    question: "How long does it take for light from the Sun to reach Earth?",
    options: ["Instantaneous", "About 8 minutes and 20 seconds", "About 1 hour", "24 hours"],
    correctIndex: 1,
    explanation: "Traveling at ~300,000 km/s, sunlight takes about 500 seconds (8 min 20 sec) to cross the 150 million km to Earth.",
    category: "Physics"
  },
  {
    id: 13,
    question: "What is the name of the tallest known volcano in the Solar System, located on Mars?",
    options: ["Mount Everest", "Maxwell Montes", "Olympus Mons", "Mauna Kea"],
    correctIndex: 2,
    explanation: "Olympus Mons is a colossal shield volcano on Mars standing 21.9 km high, nearly 3 times taller than Everest!",
    category: "Planets"
  },
  {
    id: 14,
    question: "What gives Uranus and Neptune their distinctive cyan and deep blue colors?",
    options: ["Liquid water oceans", "Methane gas in their atmospheres", "Iron rust particles", "Liquid nitrogen lakes"],
    correctIndex: 1,
    explanation: "Methane gas absorbs red wavelengths of light and scatters blue-green wavelengths back into space.",
    category: "Planets"
  },
  {
    id: 15,
    question: "Which celestial body causes the ocean tides on Earth?",
    options: ["The Moon (primarily) and the Sun", "Mars", "Jupiter", "Venus"],
    correctIndex: 0,
    explanation: "The gravitational gradient of the Moon, combined with the Sun's tidal pull, generates ocean tides on Earth.",
    category: "Earth & Moon"
  },
  {
    id: 16,
    question: "What famous feature did the New Horizons spacecraft discover on Pluto's surface?",
    options: ["A giant pyramid", "A heart-shaped nitrogen ice plain (Tombaugh Regio)", "An ocean of liquid water", "Active fiery volcanoes"],
    correctIndex: 1,
    explanation: "Pluto features Tombaugh Regio, a vast, bright heart-shaped glacier primarily composed of nitrogen ice.",
    category: "Dwarf Planets"
  },
  {
    id: 17,
    question: "Why does Venus rotate in 'retrograde' (backwards) compared to most planets?",
    options: [
      "Its magnetic field is reversed",
      "It was likely struck by a massive celestial body early in history",
      "It was captured from another star system",
      "Solar radiation pushed it"
    ],
    correctIndex: 1,
    explanation: "Astronomers hypothesize that giant impacts during early planetary formation flipped or reversed Venus's rotation.",
    category: "Planets"
  },
  {
    id: 18,
    question: "If a student weighs 60 kg on Earth, approximately how much would they weigh on Jupiter?",
    options: ["About 30 kg", "About 60 kg", "About 152 kg", "About 600 kg"],
    correctIndex: 2,
    explanation: "Jupiter's gravity is 2.53× Earth's gravity (24.79 m/s²), so 60 kg × 2.53 ≈ 151.8 kg equivalent weight!",
    category: "Gravity"
  },
  {
    id: 19,
    question: "What causes a Lunar Eclipse?",
    options: [
      "The Moon passes between the Sun and Earth",
      "Earth passes directly between the Sun and the Moon",
      "The Sun passes between Earth and the Moon",
      "Mars blocks the Moon's light"
    ],
    correctIndex: 1,
    explanation: "During a Lunar Eclipse, Earth moves between the Sun and Moon, casting Earth's shadow across the lunar surface.",
    category: "Eclipses"
  },
  {
    id: 20,
    question: "Which planet has the fastest rotation, completing one full day in less than 10 hours?",
    options: ["Earth", "Mars", "Jupiter", "Neptune"],
    correctIndex: 2,
    explanation: "Despite its immense size, Jupiter spins once every 9.9 hours, causing an equatorial bulge.",
    category: "Planets"
  },
  {
    id: 21,
    question: "What percentage of the total mass of the Solar System is contained inside the Sun?",
    options: ["About 50%", "About 75%", "About 90%", "About 99.86%"],
    correctIndex: 3,
    explanation: "The Sun is overwhelmingly massive, containing 99.86% of all matter in the Solar System.",
    category: "Sun"
  },
  {
    id: 22,
    question: "Which of Saturn's moons has a dense atmosphere and liquid methane lakes?",
    options: ["Enceladus", "Titan", "Mimas", "Europa"],
    correctIndex: 1,
    explanation: "Titan is the only moon with a substantial nitrogen atmosphere and liquid hydrocarbon lakes on its surface.",
    category: "Moons"
  },
  {
    id: 23,
    question: "What is the primary substance that makes up Saturn's rings?",
    options: ["Solid iron", "Water ice crystals and rock chunks", "Liquid mercury", "Pure gold dust"],
    correctIndex: 1,
    explanation: "Saturn's rings are 99% pure water ice particles ranging in size from tiny dust grains to house-sized boulders.",
    category: "Planets"
  },
  {
    id: 24,
    question: "Why does the Moon always show the same face toward Earth?",
    options: [
      "The other side is invisible",
      "It doesn't rotate at all",
      "It is tidally locked (its rotational period equals its orbital period)",
      "Solar winds prevent it from turning"
    ],
    correctIndex: 2,
    explanation: "Gravitational forces have tidally locked the Moon so it takes 27.3 days to rotate once and 27.3 days to orbit Earth.",
    category: "Earth & Moon"
  },
  {
    id: 25,
    question: "Which planet experiences supersonic winds faster than the speed of sound (>2,000 km/h)?",
    options: ["Earth", "Venus", "Neptune", "Mercury"],
    correctIndex: 2,
    explanation: "Neptune hosts the most violent storms in the Solar System, where methane winds roar at up to 2,100 km/h.",
    category: "Planets"
  }
];

