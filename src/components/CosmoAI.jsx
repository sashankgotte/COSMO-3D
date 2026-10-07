import React, { useState, useEffect, useRef } from 'react';
import { Bot, Volume2, VolumeX, MessageSquare, Send, Sparkles, X, ChevronUp, ChevronDown } from 'lucide-react';

// Comprehensive AI Science Knowledge Base for Space Questions
const COSMO_QA_DATABASE = [
  {
    keywords: ['mars', 'red'],
    answer: "Mars appears red because its surface is coated in iron oxide—commonly known as rust! Over billions of years, iron-rich minerals in Martian rock oxidized in the presence of trace water and volcanic gases, creating the rusty dust that blankets the planet."
  },
  {
    keywords: ['pluto', 'dwarf', 'planet'],
    answer: "Pluto was reclassified as a dwarf planet by the International Astronomical Union in 2006. To be a full planet, a body must orbit the Sun, be spherical, and have 'cleared its orbit' of other debris. Pluto shares its orbit with thousands of Kuiper Belt icy objects."
  },
  {
    keywords: ['saturn', 'ring', 'made of', 'rings'],
    answer: "Saturn's rings are approximately 99% pure water ice, with traces of rock and dust. They are remnants of ancient icy comets or shattered moons torn apart by Saturn's immense tidal gravity. Remarkably, while spanning 282,000 km across, they are only 10 to 30 meters thick!"
  },
  {
    keywords: ['sun', 'old', 'age', 'die'],
    answer: "The Sun is about 4.6 billion years old, roughly halfway through its main sequence life. In about 5 billion years, it will expand into a Red Giant, engulfing Mercury and Venus, before shedding its outer layers into a planetary nebula and ending as a white dwarf."
  },
  {
    keywords: ['float', 'water', 'bathtub'],
    answer: "Saturn is the only planet in our solar system less dense than water! Its average density is about 0.687 g/cm³ (water is 1.0 g/cm³). If you had a bathtub large enough, Saturn would literally float!"
  },
  {
    keywords: ['hottest', 'hot'],
    answer: "Venus is the hottest planet in the Solar System at 465°C (869°F), hotter even than Mercury! Venus suffers from a runaway greenhouse effect where dense carbon dioxide clouds trap virtually all escaping heat."
  },
  {
    keywords: ['eclipse', 'solar', 'lunar'],
    answer: "An eclipse occurs when one celestial body moves into the shadow of another. A Solar Eclipse happens when the Moon blocks the Sun from Earth's view. A Lunar Eclipse happens when Earth blocks sunlight from reaching the Moon, turning it copper-red!"
  },
  {
    keywords: ['moon', 'jump', 'gravity'],
    answer: "Gravity on the Moon is only 1/6th of Earth's gravity (1.62 m/s²). If you can jump 0.5 meters on Earth, you could leap over 3 meters high on the Moon, and a 60 kg person would weigh equivalent to just 10 kg!"
  },
  {
    keywords: ['kuiper', 'belt'],
    answer: "The Kuiper Belt is a colossal ring of icy bodies, comets, and dwarf planets (including Pluto, Eris, and Haumea) extending from Neptune's orbit out to about 50 Astronomical Units from the Sun."
  },
  {
    keywords: ['moons', 'most'],
    answer: "Saturn currently holds the record with 146 confirmed moons, followed by Jupiter with 95 moons! Saturn's moon Titan is larger than the planet Mercury and has rivers of liquid methane."
  },
  {
    keywords: ['great red spot', 'storm', 'spot'],
    answer: "Jupiter's Great Red Spot is a persistent anticyclonic storm wider than Earth itself. Astronomers have observed it swirling for over 350 years, with winds gusting over 600 kilometers per hour!"
  },
  {
    keywords: ['light', 'sun to earth', 'speed'],
    answer: "Light travels at 299,792 kilometers per second. It takes sunlight approximately 8 minutes and 20 seconds to travel the 149.6 million kilometers from the Sun to Earth."
  }
];

export default function CosmoAI({
  currentContext = 'solarSystem',
  activePlanet = null,
  isMuted = false,
  onToggleMute
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'cosmo',
      text: "Greetings explorer! I am COSMO AI, your virtual astrophysicist guide. Click any planet to fly through space, or ask me anything about the universe!",
      time: 'Just now'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const chatEndRef = useRef(null);

  // Auto-speak narration when active planet changes
  useEffect(() => {
    if (activePlanet && !isMuted) {
      const textToSpeak = activePlanet.audioNarration || `You are now exploring ${activePlanet.name}. ${activePlanet.subtitle}.`;
      speakText(textToSpeak);

      // Add announcement to chat log
      setMessages((prev) => [
        ...prev,
        {
          sender: 'cosmo',
          text: `🔭 Target Acquired: ${activePlanet.name} (${activePlanet.type}). ${activePlanet.facts[0]}`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  }, [activePlanet]);

  // Speech synthesis
  const speakText = (text) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel(); // Cancel prior audio

    if (isMuted) return;

    try {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.05;

      // Select high quality English voice if available
      const voices = window.speechSynthesis.getVoices();
      const engVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('David') || v.name.includes('Samantha')));
      if (engVoice) utterance.voice = engVoice;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn("Speech synthesis error:", e);
      setIsSpeaking(false);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Scroll to bottom of chat
  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Handle user question submission
  const handleSendMessage = (textToSend = inputValue) => {
    const q = textToSend.trim();
    if (!q) return;

    const userMsg = {
      sender: 'user',
      text: q,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');

    // Answer generation
    setTimeout(() => {
      const lower = q.toLowerCase();
      let matched = COSMO_QA_DATABASE.find(item =>
        item.keywords.every(kw => lower.includes(kw))
      );

      if (!matched) {
        matched = COSMO_QA_DATABASE.find(item =>
          item.keywords.some(kw => lower.includes(kw))
        );
      }

      let answer = "";
      if (matched) {
        answer = matched.answer;
      } else if (lower.includes('who are you') || lower.includes('your name')) {
        answer = "I am COSMO AI, your personal artificial intelligence guide through the 3D Solar System!";
      } else if (lower.includes('earth')) {
        answer = "Earth is our home planet—the only world known so far to harbor life, with liquid water oceans covering 71% of its surface and dynamic day/night cycles.";
      } else if (lower.includes('gravity')) {
        answer = "Gravity is the fundamental force of attraction between masses. Try our ⚖️ Gravity Simulator in the navigation bar to see your weight on every world!";
      } else {
        answer = `Fascinating cosmic question! In our Solar System, eight major planets and hundreds of moons orbit the Sun across billions of kilometers. Feel free to fly to any planet or test our Science Lab and Eclipse Simulator!`;
      }

      const cosmoMsg = {
        sender: 'cosmo',
        text: answer,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, cosmoMsg]);

      if (!isMuted) {
        speakText(answer);
      }
    }, 400);
  };

  const samplePrompts = [
    "Why is Mars red?",
    "Why is Pluto a dwarf planet?",
    "What are Saturn's rings made of?",
    "Can Saturn float in water?",
    "How does an eclipse happen?"
  ];

  return (
    <>
      {/* Floating COSMO Avatar Button (Bottom Right) */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center gap-3">
        {/* Quick Voice Control Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-full glass-panel shadow-2xl">
          {isSpeaking ? (
            <button
              onClick={stopSpeaking}
              title="Stop Speaking"
              className="px-3 py-1.5 rounded-full bg-rose-500/80 hover:bg-rose-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all animate-pulse"
            >
              <VolumeX className="w-3.5 h-3.5" /> Stop
            </button>
          ) : (
            <button
              onClick={() => {
                if (activePlanet) {
                  speakText(activePlanet.audioNarration || activePlanet.facts[0]);
                } else {
                  speakText("Welcome to COSMO. Explore our 3D solar system by clicking any planet!");
                }
              }}
              title="Speak Briefing"
              className="px-3 py-1.5 rounded-full glass-btn text-xs font-medium flex items-center gap-1.5 text-sky-300"
            >
              <Volume2 className="w-3.5 h-3.5" /> Speak
            </button>
          )}

          <button
            onClick={onToggleMute}
            title={isMuted ? "Unmute Voice" : "Mute Voice"}
            className={`p-2 rounded-full transition-all ${
              isMuted ? 'text-slate-500 hover:text-slate-300' : 'text-sky-400 hover:text-sky-200'
            }`}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>

        {/* Main COSMO Orb Trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative group p-3.5 rounded-full bg-gradient-to-tr from-sky-600 via-indigo-600 to-cyan-400 text-white shadow-lg shadow-sky-500/30 hover:shadow-cyan-400/50 hover:scale-105 active:scale-95 transition-all duration-300"
          title="Chat with COSMO AI"
        >
          {/* Animated radar rings */}
          <span className="absolute inset-0 rounded-full bg-cyan-400 opacity-20 animate-ping pointer-events-none" />
          <Bot className="w-6 h-6 animate-float" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-400"></span>
          </span>
        </button>
      </div>

      {/* Interactive Chat Window Modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-5 z-50 w-[360px] sm:w-[400px] max-h-[560px] h-[520px] rounded-2xl glass-panel-glow flex flex-col overflow-hidden shadow-2xl animate-fade-in border border-sky-400/30">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-slate-900/90 to-sky-950/90 border-b border-sky-500/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-sky-500 to-cyan-400 flex items-center justify-center shadow-md shadow-sky-500/30">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-bold tracking-wide text-white flex items-center gap-1.5 font-orbitron">
                  COSMO AI
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    ONLINE
                  </span>
                </h3>
                <p className="text-[11px] text-slate-400">Interactive Science Teacher</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${
                  m.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3 leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-sky-600 text-white rounded-br-none shadow-md shadow-sky-900/40'
                      : 'bg-slate-900/90 text-slate-200 border border-slate-700/60 rounded-bl-none shadow-md'
                  }`}
                >
                  {m.text}
                </div>
                <span className="text-[9px] text-slate-500 mt-1 px-1">{m.time}</span>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Prompt Suggestions */}
          <div className="p-2 bg-slate-950/60 border-t border-slate-800/80 overflow-x-auto flex gap-1.5 no-scrollbar">
            {samplePrompts.map((sp, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(sp)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full text-[10px] glass-btn text-sky-300 border-sky-500/20 hover:border-sky-400"
              >
                <Sparkles className="w-2.5 h-2.5 inline mr-1 text-cyan-400" />
                {sp}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-slate-900/90 border-t border-sky-500/20 flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask COSMO about planets, gravity, eclipses..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 bg-slate-950/80 border border-slate-700/70 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 transition-all"
            />
            <button
              onClick={() => handleSendMessage()}
              className="p-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white transition-all shadow-md shadow-sky-600/30"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

