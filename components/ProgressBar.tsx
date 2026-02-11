
import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const percentage = Math.round((currentStep / totalSteps) * 100);
  
  return (
    <div className="w-full mb-6">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-semibold text-amber-800 uppercase tracking-wider">Dein Fortschritt</span>
        <span className="text-xs font-bold text-amber-900">{percentage}%</span>
      </div>
      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-amber-200 shadow-inner">
        <div
          style={{ width: `${percentage}%` }}
          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-amber-600 transition-all duration-500 ease-out"
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
