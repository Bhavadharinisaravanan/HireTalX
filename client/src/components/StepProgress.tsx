import React from 'react';
import { useRecruitment } from '../context/RecruitmentContext';
import { StepId } from '../types';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

const STEP_NAMES = [
  "1. Recruiter Login",
  "2. Job Description",
  "3. Resume Upload",
  "4. Candidate Ranking",
  "5. Screening Qs",
  "6. Market Insights",
  "7. Search Strings"
];

export const StepProgress: React.FC = () => {
  const { currentStep, setCurrentStep } = useRecruitment();

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as StepId);
    }
  };

  const handleNext = () => {
    if (currentStep < 7) {
      setCurrentStep((currentStep + 1) as StepId);
    }
  };

  return (
    <div className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
      {/* Previous Step Button */}
      <button
        onClick={handlePrev}
        disabled={currentStep === 1}
        className={`
          flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all
          ${
            currentStep === 1
              ? 'border-slate-200 text-slate-300 cursor-not-allowed bg-slate-50'
              : 'border-slate-300 text-slate-700 hover:bg-slate-100 hover:text-slate-900 bg-white shadow-2xs'
          }
        `}
      >
        <ChevronLeft className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Previous</span>
      </button>

      {/* Stepper Pills */}
      <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-1 scrollbar-none">
        {STEP_NAMES.map((name, index) => {
          const stepNumber = (index + 1) as StepId;
          const isCurrent = currentStep === stepNumber;
          const isPassed = currentStep > stepNumber;

          return (
            <button
              key={stepNumber}
              onClick={() => setCurrentStep(stepNumber)}
              className={`
                flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all shrink-0
                ${
                  isCurrent
                    ? 'bg-purple-600 text-white shadow-sm ring-2 ring-purple-200'
                    : isPassed
                    ? 'bg-purple-50 text-purple-700 hover:bg-purple-100'
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }
              `}
            >
              <span
                className={`
                  w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold
                  ${
                    isCurrent
                      ? 'bg-white text-purple-700'
                      : isPassed
                      ? 'bg-purple-600 text-white'
                      : 'bg-slate-300 text-slate-700'
                  }
                `}
              >
                {isPassed ? <Check className="w-2.5 h-2.5 stroke-[3]" /> : stepNumber}
              </span>
              <span className="hidden md:inline">{name.replace(/^\d+\.\s*/, '')}</span>
            </button>
          );
        })}
      </div>

      {/* Next Step Button */}
      <button
        onClick={handleNext}
        disabled={currentStep === 7}
        className={`
          flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all
          ${
            currentStep === 7
              ? 'border-slate-200 text-slate-300 cursor-not-allowed bg-slate-50'
              : 'border-purple-600 bg-purple-600 text-white hover:bg-purple-700 shadow-xs'
          }
        `}
      >
        <span className="hidden sm:inline">Next Step</span>
        <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
