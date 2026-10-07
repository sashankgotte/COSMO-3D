import React, { useState, useEffect } from 'react';
import { X, Brain, CheckCircle2, XCircle, Award, Sparkles, RefreshCw, Trophy, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { QUIZ_QUESTIONS } from '../data/quizQuestions';

export default function SpaceQuiz({ onClose, onUnlockAchievement }) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Shuffle and pick 10 random questions on mount
  useEffect(() => {
    restartQuiz();
  }, []);

  const restartQuiz = () => {
    const shuffled = [...QUIZ_QUESTIONS].sort(() => 0.5 - Math.random()).slice(0, 10);
    setQuestions(shuffled);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setStreak(0);
    setIsFinished(false);
  };

  const currentQ = questions[currentIndex];

  const handleSelectOption = (idx) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    const isCorrect = idx === currentQ.correctIndex;
    if (isCorrect) {
      setScore((s) => s + 100 + streak * 20);
      setStreak((st) => st + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      // Confetti celebration if passed
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      if (score >= 600 && onUnlockAchievement) {
        onUnlockAchievement('cosmic_scholar');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in pointer-events-auto">
      <div className="w-full max-w-xl glass-panel-glow rounded-3xl overflow-hidden shadow-2xl border border-sky-400/30 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-slate-900/90 to-purple-950/90 border-b border-purple-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-wide text-white font-orbitron">
                🧠 COSMO SPACE QUIZ
              </h2>
              <div className="flex items-center gap-3 text-xs text-purple-300">
                <span>Score: <b className="text-white font-mono">{score} pts</b></span>
                {streak > 1 && (
                  <span className="text-amber-400 font-bold flex items-center gap-1 animate-pulse">
                    <Sparkles className="w-3 h-3" /> {streak}× Streak!
                  </span>
                )}
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
        <div className="p-6 overflow-y-auto space-y-5 text-xs">
          {!isFinished && currentQ ? (
            <>
              {/* Question Progress Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-slate-400 font-bold">
                  <span>Question {currentIndex + 1} of {questions.length}</span>
                  <span className="text-purple-400">{currentQ.category}</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-sky-400 transition-all duration-300"
                    style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question Text */}
              <div className="p-4 rounded-2xl bg-slate-900/70 border border-purple-500/20">
                <h3 className="text-sm font-bold text-slate-100 leading-relaxed">
                  {currentQ.question}
                </h3>
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQ.options.map((opt, idx) => {
                  let btnStyle = 'bg-slate-900/60 border-slate-800 text-slate-200 hover:border-slate-600';
                  if (isAnswered) {
                    if (idx === currentQ.correctIndex) {
                      btnStyle = 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold';
                    } else if (idx === selectedOption) {
                      btnStyle = 'bg-rose-500/20 border-rose-400 text-rose-300';
                    } else {
                      btnStyle = 'bg-slate-950/40 border-slate-900 text-slate-500 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isAnswered}
                      className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between transition-all ${btnStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-lg bg-slate-800/80 flex items-center justify-center font-bold text-[11px] text-slate-400 shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="text-xs">{opt}</span>
                      </div>
                      {isAnswered && idx === currentQ.correctIndex && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      )}
                      {isAnswered && idx === selectedOption && idx !== currentQ.correctIndex && (
                        <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Next button */}
              {isAnswered && (
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-sky-500/30 space-y-3 animate-fade-in">
                  <div className="text-slate-300 leading-relaxed text-[11px]">
                    <b className="text-sky-400 mr-1.5">Fact:</b>
                    {currentQ.explanation}
                  </div>
                  <button
                    onClick={handleNext}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-sky-500 hover:from-purple-400 hover:to-sky-400 text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 transition-all"
                  >
                    <span>{currentIndex < questions.length - 1 ? 'Next Question' : 'View Results'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          ) : (
            /* Quiz Completed View */
            <div className="py-8 text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 to-purple-600 flex items-center justify-center mx-auto shadow-xl shadow-amber-500/20">
                <Trophy className="w-10 h-10 text-white animate-bounce" />
              </div>
              <h3 className="text-xl font-black font-orbitron text-white">
                QUIZ COMPLETED!
              </h3>
              <p className="text-xs text-slate-300 max-w-sm mx-auto">
                You scored <b className="text-amber-400 font-mono text-sm">{score} points</b> across 10 astronomical questions!
              </p>

              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={restartQuiz}
                  className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-purple-500 to-sky-500 hover:from-purple-400 text-white font-bold flex items-center gap-2 shadow-lg"
                >
                  <RefreshCw className="w-4 h-4" /> Play Again
                </button>
                <button
                  onClick={onClose}
                  className="py-2.5 px-6 rounded-xl glass-btn text-slate-300 hover:text-white"
                >
                  Return to Explorer
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

