
import React, { useState } from 'react';
import { Question } from '../types';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

interface QuizProps {
  questions: Question[];
  onComplete: (score: number) => void;
}

const Quiz: React.FC<QuizProps> = ({ questions, onComplete }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = questions[currentIdx];

  const handleOptionSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedIdx(index);
    setShowFeedback(true);
    if (index === currentQuestion.correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedIdx(null);
      setShowFeedback(false);
    } else {
      onComplete(score);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-xl border border-amber-100">
      <div className="mb-4">
        <span className="text-sm font-medium text-amber-600">Frage {currentIdx + 1} von {questions.length}</span>
        <h3 className="text-xl font-bold text-gray-800 mt-1">{currentQuestion.text}</h3>
      </div>

      <div className="space-y-3">
        {currentQuestion.options.map((option, idx) => {
          let styles = "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ";
          
          if (!showFeedback) {
            styles += "border-gray-100 hover:border-amber-300 hover:bg-amber-50";
          } else {
            if (idx === currentQuestion.correctIndex) {
              styles += "border-green-500 bg-green-50 text-green-800";
            } else if (idx === selectedIdx) {
              styles += "border-red-500 bg-red-50 text-red-800";
            } else {
              styles += "border-gray-100 opacity-50";
            }
          }

          return (
            <button
              key={idx}
              disabled={showFeedback}
              onClick={() => handleOptionSelect(idx)}
              className={styles}
            >
              <div className="flex justify-between items-center">
                <span>{option}</span>
                {showFeedback && idx === currentQuestion.correctIndex && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                {showFeedback && idx === selectedIdx && idx !== currentQuestion.correctIndex && <XCircle className="w-5 h-5 text-red-600" />}
              </div>
            </button>
          );
        })}
      </div>

      {showFeedback && (
        <div className="mt-6 animate-fadeIn">
          <div className="p-4 bg-amber-50 rounded-lg text-amber-900 border border-amber-200 text-sm italic mb-6">
            <strong>Erklärung:</strong> {currentQuestion.explanation}
          </div>
          <button
            onClick={nextQuestion}
            className="w-full bg-amber-700 text-white py-3 rounded-xl font-bold flex justify-center items-center gap-2 hover:bg-amber-800 transition-colors"
          >
            {currentIdx < questions.length - 1 ? 'Nächste Frage' : 'Quiz beenden'}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
