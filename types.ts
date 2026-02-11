
export enum AppState {
  START = 'START',
  MODULE_1 = 'MODULE_1', // Was sind Streichinstrumente?
  MODULE_2 = 'MODULE_2', // Die Instrumentenfamilie
  MODULE_3 = 'MODULE_3', // Klang & Einsatz
  FINAL_QUIZ = 'FINAL_QUIZ',
  SUMMARY = 'SUMMARY',
  TEACHER_MODE = 'TEACHER_MODE'
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  imageUrl?: string;
}

export interface Instrument {
  name: string;
  description: string;
  size: string;
  pitch: string;
  playingStyle: string;
  imageUrl: string;
}

export interface LearningProgress {
  completedModules: string[];
  points: number;
  maxPoints: number;
  badges: string[];
}
