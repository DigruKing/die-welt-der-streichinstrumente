
import React, { useState, useEffect } from 'react';
import { AppState, LearningProgress } from './types';
import ProgressBar from './components/ProgressBar';
import Quiz from './components/Quiz';
import { MODULE_1_QUESTIONS, INSTRUMENTS, FINAL_QUIZ_QUESTIONS } from './data/content';
import { Music, PlayCircle, Info, Users, GraduationCap, ArrowRight, Award, Trophy, ChevronLeft, Map, Settings } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.START);
  const [progress, setProgress] = useState<LearningProgress>(() => {
    const saved = localStorage.getItem('stringAppProgress');
    return saved ? JSON.parse(saved) : {
      completedModules: [],
      points: 0,
      maxPoints: 14, // Total questions: 3 (M1) + 3 (M2 logic) + 8 (Final)
      badges: []
    };
  });

  useEffect(() => {
    localStorage.setItem('stringAppProgress', JSON.stringify(progress));
  }, [progress]);

  const completeModule = (moduleId: string, earnedPoints: number) => {
    if (!progress.completedModules.includes(moduleId)) {
      setProgress(prev => ({
        ...prev,
        completedModules: [...prev.completedModules, moduleId],
        points: prev.points + earnedPoints,
        badges: earnedPoints > 0 ? [...prev.badges, `${moduleId}_done`] : prev.badges
      }));
    }
    // Simple state flow
    const nextState = moduleId === 'MODULE_1' ? AppState.MODULE_2 : 
                      moduleId === 'MODULE_2' ? AppState.MODULE_3 : 
                      moduleId === 'MODULE_3' ? AppState.FINAL_QUIZ : AppState.SUMMARY;
    setState(nextState);
  };

  const getProgressStep = () => {
    switch(state) {
      case AppState.START: return 0;
      case AppState.MODULE_1: return 1;
      case AppState.MODULE_2: return 2;
      case AppState.MODULE_3: return 3;
      case AppState.FINAL_QUIZ: return 4;
      case AppState.SUMMARY: return 5;
      default: return 0;
    }
  };

  // --- Screens ---

  const StartScreen = () => (
    <div className="flex flex-col items-center justify-center text-center p-8 min-h-[80vh]">
      <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mb-8 shadow-lg">
        <Music className="w-12 h-12 text-amber-800" />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">Die Welt der Streichinstrumente</h1>
      <p className="text-xl text-amber-800 max-w-lg mb-10 leading-relaxed">
        Warum klingt eine Geige eigentlich anders als ein Cello? Entdecke die Geheimnisse des Holzes und der Saiten!
      </p>
      <button 
        onClick={() => setState(AppState.MODULE_1)}
        className="wood-gradient text-white px-10 py-5 rounded-full font-bold text-xl shadow-xl hover:scale-105 transition-transform flex items-center gap-3"
      >
        Lernreise starten
        <PlayCircle className="w-6 h-6" />
      </button>
      <button 
        onClick={() => setState(AppState.TEACHER_MODE)}
        className="mt-12 text-amber-700 flex items-center gap-2 text-sm opacity-60 hover:opacity-100 transition-opacity"
      >
        <GraduationCap className="w-4 h-4" /> Lehrer-Modus
      </button>
    </div>
  );

  const Module1 = () => {
    const [step, setStep] = useState<'info' | 'quiz'>('info');

    if (step === 'info') {
      return (
        <div className="max-w-3xl mx-auto py-8">
          <div className="flex items-center gap-3 mb-6">
            <Info className="w-8 h-8 text-amber-700" />
            <h2 className="text-3xl font-bold text-amber-900">Was sind Streichinstrumente?</h2>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-amber-100 mb-8 overflow-hidden">
            <h3 className="text-xl font-bold mb-4 text-amber-800">Die Entstehung des Klangs</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Streichinstrumente (Chordophone) bestehen aus einem hohlen <strong>Resonanzkörper</strong> aus Holz. 
              Der Ton entsteht, indem ein <strong>Bogen</strong> über die Saiten gestrichen wird. 
              Dabei nutzt man ein Harz namens <strong>Kolophonium</strong>, damit die Bogenhaare an der Saite haften bleiben und sie in Schwingung versetzen. 
              Der <strong>Steg</strong> leitet diese Schwingung ins Innere des Instruments weiter.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <img 
                src="https://images.unsplash.com/photo-1460039230329-eb072f47776f?auto=format&fit=crop&q=80&w=600" 
                alt="Violine Anatomie" 
                className="rounded-lg shadow-md border-4 border-amber-50"
              />
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold">1</div>
                  <span className="text-amber-900"><strong>Schnecke & Wirbel</strong>: Zum Stimmen</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold">2</div>
                  <span className="text-amber-900"><strong>Griffbrett</strong>: Hier bestimmt man die Tonhöhe</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold">3</div>
                  <span className="text-amber-900"><strong>F-Löcher</strong>: Lassen den Schall entweichen</span>
                </div>
              </div>
            </div>
          </div>

          <button 
            onClick={() => setStep('quiz')}
            className="w-full bg-amber-700 text-white py-4 rounded-xl font-bold shadow-lg hover:bg-amber-800 transition-colors flex justify-center items-center gap-3"
          >
            Wissen testen
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      );
    }

    return (
      <div className="max-w-2xl mx-auto py-8">
        <h2 className="text-2xl font-bold text-amber-900 mb-6 flex items-center gap-2">
          <GraduationCap className="text-amber-600" /> Mini-Quiz: Modul 1
        </h2>
        <Quiz 
          questions={MODULE_1_QUESTIONS} 
          onComplete={(s) => completeModule('MODULE_1', s)} 
        />
      </div>
    );
  };

  const Module2 = () => {
    const [step, setStep] = useState<'info' | 'sorting'>('info');
    const [currentInst, setCurrentInst] = useState(0);

    if (step === 'info') {
      const inst = INSTRUMENTS[currentInst];
      return (
        <div className="max-w-4xl mx-auto py-8">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-8 h-8 text-amber-700" />
            <h2 className="text-3xl font-bold text-amber-900">Die Instrumentenfamilie</h2>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-stretch mb-8">
            <div className="flex-1 bg-white p-8 rounded-2xl shadow-xl border border-amber-100 flex flex-col justify-between">
              <div>
                <span className="text-sm font-bold text-amber-600 tracking-widest uppercase mb-2 block">Instrument {currentInst + 1} von 4</span>
                <h3 className="text-4xl font-bold text-gray-800 mb-4">{inst.name}</h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-8">{inst.description}</p>
                
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="text-center p-3 bg-amber-50 rounded-xl">
                    <p className="text-[10px] uppercase font-bold text-amber-600 mb-1">Größe</p>
                    <p className="font-bold text-amber-900">{inst.size}</p>
                  </div>
                  <div className="text-center p-3 bg-amber-50 rounded-xl">
                    <p className="text-[10px] uppercase font-bold text-amber-600 mb-1">Tonlage</p>
                    <p className="font-bold text-amber-900">{inst.pitch}</p>
                  </div>
                  <div className="text-center p-3 bg-amber-50 rounded-xl">
                    <p className="text-[10px] uppercase font-bold text-amber-600 mb-1">Spielart</p>
                    <p className="font-bold text-amber-900 text-sm leading-tight">{inst.playingStyle}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => setCurrentInst(p => Math.max(0, p - 1))}
                  disabled={currentInst === 0}
                  className="flex-1 py-3 rounded-xl border-2 border-amber-200 text-amber-800 font-bold disabled:opacity-30 hover:bg-amber-50"
                >
                  Zurück
                </button>
                {currentInst < 3 ? (
                  <button 
                    onClick={() => setCurrentInst(p => Math.min(3, p + 1))}
                    className="flex-1 py-3 bg-amber-700 text-white rounded-xl font-bold hover:bg-amber-800"
                  >
                    Nächstes
                  </button>
                ) : (
                  <button 
                    onClick={() => setStep('sorting')}
                    className="flex-1 py-3 bg-green-700 text-white rounded-xl font-bold hover:bg-green-800 shadow-lg"
                  >
                    Übung starten
                  </button>
                )}
              </div>
            </div>
            <div className="md:w-1/3">
              <img src={inst.imageUrl} alt={inst.name} className="w-full h-full object-cover rounded-2xl shadow-xl border-8 border-white" />
            </div>
          </div>
        </div>
      );
    }

    // Simplified Drag & Drop (Click to match)
    return (
      <div className="max-w-3xl mx-auto py-8 text-center">
        <h2 className="text-2xl font-bold text-amber-900 mb-8">Match-Up: Welches Bild gehört zu welchem Namen?</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {INSTRUMENTS.map((inst, i) => (
            <div key={i} className="bg-white p-2 rounded-xl shadow border border-amber-50">
              <img src={inst.imageUrl} className="w-full h-32 object-cover rounded-lg mb-2" />
              <div className="py-2 px-1 bg-amber-100 rounded font-bold text-xs text-amber-900 uppercase">Bild {i+1}</div>
            </div>
          ))}
        </div>
        <div className="space-y-4">
          <p className="text-amber-800 font-medium">Ordne Bild 1 (Cello) gedanklich zu und klicke dann auf "Weiter".</p>
          <button 
            onClick={() => completeModule('MODULE_2', 3)}
            className="bg-amber-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:bg-amber-800 transition-colors"
          >
            Übung abgeschlossen!
          </button>
        </div>
      </div>
    );
  };

  const Module3 = () => {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <div className="flex items-center gap-3 mb-6">
          <Map className="w-8 h-8 text-amber-700" />
          <h2 className="text-3xl font-bold text-amber-900">Klang & Einsatz im Orchester</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-amber-100">
            <h3 className="text-xl font-bold mb-4 text-amber-800">Die Sitzordnung</h3>
            <div className="relative aspect-video bg-amber-50 rounded-xl border-2 border-dashed border-amber-300 flex items-center justify-center p-4">
              <div className="text-center">
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2 bg-amber-200 rounded text-xs">Vla</div>
                  <div className="p-2 bg-amber-300 rounded text-xs font-bold">Dirigent</div>
                  <div className="p-2 bg-amber-200 rounded text-xs">Vc</div>
                  <div className="p-2 bg-amber-100 rounded text-xs col-span-1">Vl 1</div>
                  <div className="p-2 bg-amber-100 rounded text-xs col-span-1">Vl 2</div>
                  <div className="p-2 bg-amber-400 rounded text-xs">Cb</div>
                </div>
                <p className="mt-4 text-[10px] text-amber-700 uppercase font-bold tracking-widest">Die Streicher sitzen im Halbkreis vorne</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-4 leading-relaxed">
              Vom Publikum aus gesehen: <strong>1. Violinen</strong> (links), <strong>2. Violinen</strong> (links innen), <strong>Violas</strong> (Mitte/rechts), <strong>Celli</strong> (rechts), <strong>Kontrabässe</strong> (ganz rechts außen/hinten).
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-amber-100">
            <h3 className="text-xl font-bold mb-4 text-amber-800">Klang-Charaktere</h3>
            <ul className="space-y-4">
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">Vl</div>
                <div><p className="font-bold text-amber-900">Violine</p><p className="text-xs text-gray-600">Hell, brillant, singend, virtuos.</p></div>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">Va</div>
                <div><p className="font-bold text-amber-900">Viola</p><p className="text-xs text-gray-600">Dunkel, warm, melancholisch.</p></div>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">Vc</div>
                <div><p className="font-bold text-amber-900">Cello</p><p className="text-xs text-gray-600">Samtig, kraftvoll, tief-singend.</p></div>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">Cb</div>
                <div><p className="font-bold text-amber-900">Kontrabass</p><p className="text-xs text-gray-600">Grollend, tief, tragend, mächtig.</p></div>
              </li>
            </ul>
          </div>
        </div>

        <button 
          onClick={() => completeModule('MODULE_3', 0)}
          className="w-full bg-amber-700 text-white py-4 rounded-xl font-bold shadow-lg hover:bg-amber-800 transition-colors flex justify-center items-center gap-3"
        >
          Zum Abschluss-Quiz!
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    );
  };

  const SummaryScreen = () => {
    const successRate = (progress.points / progress.maxPoints) * 100;
    const isMaster = successRate >= 80;

    return (
      <div className="max-w-2xl mx-auto py-12 text-center">
        <div className="mb-8 flex justify-center">
          <div className="w-32 h-32 rounded-full bg-amber-100 flex items-center justify-center shadow-xl border-4 border-amber-300">
            {isMaster ? <Trophy className="w-16 h-16 text-yellow-600" /> : <Award className="w-16 h-16 text-amber-700" />}
          </div>
        </div>
        <h2 className="text-4xl font-bold text-amber-900 mb-2">Großartig gemacht!</h2>
        <p className="text-lg text-amber-700 mb-8">Du hast deine Lernreise durch die Welt der Streichinstrumente beendet.</p>
        
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-amber-100 mb-8">
          <div className="text-6xl font-black text-amber-900 mb-2">{progress.points} <span className="text-2xl text-amber-600">/ {progress.maxPoints}</span></div>
          <p className="text-sm uppercase font-bold text-amber-500 tracking-widest mb-6">Deine Punktzahl</p>
          
          <div className="flex justify-center gap-4">
            {progress.completedModules.map(mod => (
              <div key={mod} className="p-3 bg-green-50 text-green-700 rounded-lg flex items-center gap-2 border border-green-200">
                <CheckCircle2 className="w-4 h-4" /> {mod}
              </div>
            ))}
          </div>
        </div>

        {isMaster && (
          <div className="bg-yellow-50 border-2 border-yellow-300 p-6 rounded-2xl mb-10 animate-bounce">
            <h3 className="font-bold text-yellow-900 mb-1">Badge verliehen: Saiten-Meister! 🎻</h3>
            <p className="text-xs text-yellow-700">Du hast mehr als 80% der Fragen richtig beantwortet.</p>
          </div>
        )}

        <div className="flex gap-4 justify-center">
          <button 
            onClick={() => {
              setProgress({ completedModules: [], points: 0, maxPoints: 14, badges: [] });
              setState(AppState.START);
            }}
            className="px-8 py-3 rounded-xl border-2 border-amber-600 text-amber-700 font-bold hover:bg-amber-50"
          >
            Neustart
          </button>
          <button 
            onClick={() => window.print()}
            className="px-8 py-3 bg-amber-700 text-white rounded-xl font-bold shadow-lg hover:bg-amber-800"
          >
            Ergebnis teilen
          </button>
        </div>
      </div>
    );
  };

  const TeacherMode = () => (
    <div className="max-w-4xl mx-auto py-12">
      <button onClick={() => setState(AppState.START)} className="mb-8 flex items-center gap-2 text-amber-700 font-bold">
        <ChevronLeft /> Zurück
      </button>
      <h2 className="text-3xl font-bold text-amber-900 mb-8">Übersicht für Lehrkräfte</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-md border border-amber-50">
          <h3 className="text-xl font-bold mb-4 text-amber-800">Curriculum-Ziele</h3>
          <ul className="space-y-3 text-sm text-gray-700 list-disc list-inside">
            <li>Anatomie der Chordophone verstehen</li>
            <li>Unterscheidungsmerkmale der Instrumentenfamilie</li>
            <li>Klangfarbe und orchestrale Funktion</li>
            <li>Fachterminologie (Kolophonium, Steg, F-Loch)</li>
          </ul>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md border border-amber-50">
          <h3 className="text-xl font-bold mb-4 text-amber-800">Didaktischer Aufbau</h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            Die App nutzt den <strong>Scaffolding-Ansatz</strong>. Zuerst werden Grundlagen der Physik vermittelt, dann die visuelle Differenzierung, gefolgt von der auditiven und funktionalen Einordnung. Gamification (Punkte & Badges) motiviert zur Wiederholung.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen parchment overflow-x-hidden">
      {/* Header */}
      <nav className="wood-gradient text-white p-4 shadow-lg sticky top-0 z-50">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 font-bold text-lg">
            <Music className="w-6 h-6" />
            <span className="hidden sm:inline">Die Welt der Streichinstrumente</span>
          </div>
          {state !== AppState.START && state !== AppState.SUMMARY && state !== AppState.TEACHER_MODE && (
            <button 
              onClick={() => setState(AppState.START)}
              className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded text-sm font-medium transition-colors"
            >
              Abbrechen
            </button>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {state !== AppState.START && state !== AppState.SUMMARY && state !== AppState.TEACHER_MODE && (
          <ProgressBar currentStep={getProgressStep()} totalSteps={5} />
        )}

        {state === AppState.START && <StartScreen />}
        {state === AppState.MODULE_1 && <Module1 />}
        {state === AppState.MODULE_2 && <Module2 />}
        {state === AppState.MODULE_3 && <Module3 />}
        {state === AppState.FINAL_QUIZ && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-amber-900 mb-8 text-center">Abschluss-Quiz: Werde zum Saiten-Profi!</h2>
            <Quiz 
              questions={FINAL_QUIZ_QUESTIONS} 
              onComplete={(s) => completeModule('FINAL', s)} 
            />
          </div>
        )}
        {state === AppState.SUMMARY && <SummaryScreen />}
        {state === AppState.TEACHER_MODE && <TeacherMode />}
      </main>

      {/* Footer Decoration */}
      <div className="fixed bottom-0 left-0 w-full pointer-events-none opacity-10 flex justify-around p-4 overflow-hidden">
        <Music className="w-24 h-24 rotate-12" />
        <Music className="w-24 h-24 -rotate-12" />
        <Music className="w-24 h-24 rotate-45" />
      </div>
    </div>
  );
};

export default App;

// Helper icons
const CheckCircle2 = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
);
