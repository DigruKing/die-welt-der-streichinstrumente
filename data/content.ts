
import { Question, Instrument } from '../types';

export const MODULE_1_QUESTIONS: Question[] = [
  {
    id: 'm1q1',
    text: 'Wie entsteht der Ton bei einem Streichinstrument primär?',
    options: [
      'Durch das Zupfen mit den Fingern',
      'Durch Reibung der Bogenhaare an den Saiten',
      'Durch das Hineinblasen in das F-Loch'
    ],
    correctIndex: 1,
    explanation: 'Der Bogen streicht über die Saite. Durch Haftreibung wird die Saite in Schwingung versetzt.'
  },
  {
    id: 'm1q2',
    text: 'Welche Aufgabe hat der Steg?',
    options: [
      'Er dient zum Festhalten des Instruments',
      'Er überträgt die Schwingung der Saiten auf den Korpus',
      'Er wird benutzt, um die Saiten zu stimmen'
    ],
    correctIndex: 1,
    explanation: 'Der Steg leitet die Schwingungen der Saiten direkt an die Decke des Resonanzkörpers weiter.'
  },
  {
    id: 'm1q3',
    text: 'Was wird auf die Bogenhaare aufgetragen, damit sie besser "greifen"?',
    options: [
      'Öl',
      'Seife',
      'Kolophonium (Baumharz)'
    ],
    correctIndex: 2,
    explanation: 'Ohne Kolophonium würden die Haare einfach über die Saiten rutschen, ohne sie zum Schwingen zu bringen.'
  }
];

export const INSTRUMENTS: Instrument[] = [
  {
    name: 'Violine (Geige)',
    description: 'Das kleinste und am höchsten klingende Mitglied der Familie. Sie wird zwischen Kinn und Schulter gehalten.',
    size: 'Ca. 60 cm',
    pitch: 'Sopran (Hoch)',
    playingStyle: 'Stehend oder sitzend am Kinn',
    imageUrl: 'https://images.unsplash.com/photo-1573871666457-7c7329118cf9?auto=format&fit=crop&q=80&w=400'
  },
  {
    name: 'Viola (Bratsche)',
    description: 'Etwas größer als die Geige. Ihr Klang ist dunkler, voller und weicher.',
    size: 'Ca. 70 cm',
    pitch: 'Alt (Mittelhoch)',
    playingStyle: 'Wie die Violine am Kinn',
    imageUrl: 'https://images.unsplash.com/photo-1541689592655-f5f52827a3b4?auto=format&fit=crop&q=80&w=400'
  },
  {
    name: 'Violoncello (Cello)',
    description: 'Wird im Sitzen zwischen den Knien gespielt. Es hat einen warmen, tiefen Klang, der oft mit der menschlichen Stimme verglichen wird.',
    size: 'Ca. 120 cm',
    pitch: 'Tenor / Bass (Tief)',
    playingStyle: 'Sitzend mit einem Stachel am Boden',
    imageUrl: 'https://images.unsplash.com/photo-1590483734015-7a6c9d08465e?auto=format&fit=crop&q=80&w=400'
  },
  {
    name: 'Kontrabass',
    description: 'Das größte und tiefste Instrument. Es hat mechanische Wirbel und bildet das Fundament des Orchesters.',
    size: 'Ca. 180 - 200 cm',
    pitch: 'Kontrabass (Sehr tief)',
    playingStyle: 'Stehend oder auf einem hohen Hocker',
    imageUrl: 'https://images.unsplash.com/photo-1510915367464-573a5a729603?auto=format&fit=crop&q=80&w=400'
  }
];

export const FINAL_QUIZ_QUESTIONS: Question[] = [
  {
    id: 'f1',
    text: 'Welches Instrument ist das "Fundament" im Orchester?',
    options: ['Cello', 'Kontrabass', 'Viola'],
    correctIndex: 1,
    explanation: 'Der Kontrabass liefert die tiefsten Töne und sorgt für Stabilität im Orchesterklang.'
  },
  {
    id: 'f2',
    text: 'Was sind die "F-Löcher"?',
    options: [
      'Löcher zum Festhalten',
      'Schalllöcher im Korpus',
      'Löcher für die Saitenbefestigung'
    ],
    correctIndex: 1,
    explanation: 'Durch die F-Löcher kann die Luft im Resonanzkörper schwingen und den Klang nach außen tragen.'
  },
  {
    id: 'f3',
    text: 'Richtig oder Falsch: Die Viola ist kleiner als die Violine.',
    options: ['Richtig', 'Falsch'],
    correctIndex: 1,
    explanation: 'Die Viola (Bratsche) ist etwas größer und tiefer gestimmt als die Violine.'
  },
  {
    id: 'f4',
    text: 'Wie nennt man den Stab am Cello, mit dem es auf dem Boden steht?',
    options: ['Stachel', 'Anker', 'Pfeil'],
    correctIndex: 0,
    explanation: 'Der Stachel ist aus Metall und höhenverstellbar.'
  },
  {
    id: 'f5',
    text: 'Woraus bestehen die Haare des Bogens traditionell?',
    options: ['Nylon', 'Ross-Haar (Pferd)', 'Baumwolle'],
    correctIndex: 1,
    explanation: 'Pferdeschweifhaar ist aufgrund seiner rauen Struktur ideal für die Schwingungserzeugung.'
  },
  {
    id: 'f6',
    text: 'An welcher Stelle im Orchester sitzen die 1. Violinen üblicherweise?',
    options: ['Ganz hinten links', 'Ganz vorne links', 'In der Mitte'],
    correctIndex: 1,
    explanation: 'Vom Dirigenten aus gesehen sitzen sie links vorne.'
  },
  {
    id: 'f7',
    text: 'Welches Instrument hat einen hellen, oft solistischen Klang?',
    options: ['Kontrabass', 'Cello', 'Violine'],
    correctIndex: 2,
    explanation: 'Die Violine übernimmt oft die Melodieführung.'
  },
  {
    id: 'f8',
    text: 'Was passiert, wenn man die Saite auf dem Griffbrett verkürzt (finger draufdrückt)?',
    options: ['Der Ton wird tiefer', 'Der Ton wird höher', 'Nichts passiert'],
    correctIndex: 1,
    explanation: 'Je kürzer die schwingende Saite, desto schneller vibriert sie – der Ton wird höher.'
  }
];
