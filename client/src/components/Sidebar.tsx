import React from 'react';
import { useRecruitment } from '../context/RecruitmentContext';
import { StepId } from '../types';
import {
  UserCheck,
  FileText,
  Files,
  Award,
  HelpCircle,
  TrendingUp,
  Search,
  CheckCircle2,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

interface SidebarProps {
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpenMobile, onCloseMobile }) => {
  const {
    currentStep,
    setCurrentStep,
    currentUser,
    currentJD,
    candidates,
    rankedCandidates,
    screeningQuestions,
    marketInsights,
    searchStrings
  } = useRecruitment();

  const STEPS: {
    id: StepId;
    title: string;
    subtitle: string;
    icon: React.ElementType;
    isCompleted: boolean;
  }[] = [
    {
      id: 1,
      title: "Recruiter Login",
      subtitle: currentUser ? currentUser.name : "Authentication",
      icon: UserCheck,
      isCompleted: Boolean(currentUser)
    },
    {
      id: 2,
      title: "Job Description",
      subtitle: currentJD ? `${currentJD.title.slice(0, 18)}...` : "PDF / DOCX / Text",
      icon: FileText,
      isCompleted: Boolean(currentJD)
    },
    {
      id: 3,
      title: "Resume Ingestion",
      subtitle: candidates.length > 0 ? `${candidates.length} candidate(s)` : "Multi-file upload",
      icon: Files,
      isCompleted: candidates.length > 0
    },
    {
      id: 4,
      title: "AI Candidate Ranking",
      subtitle: rankedCandidates.length > 0 ? `${rankedCandidates.length} evaluated (/100)` : "Rubric scoring",
      icon: Award,
      isCompleted: rankedCandidates.length > 0
    },
    {
      id: 5,
      title: "Screening Questions",
      subtitle: screeningQuestions.length > 0 ? `${screeningQuestions.length} contextual Qs` : "10 Qs with Rubric",
      icon: HelpCircle,
      isCompleted: screeningQuestions.length > 0
    },
    {
      id: 6,
      title: "Market Insights",
      subtitle: marketInsights ? "Salary & Benchmark" : "Public Market Data",
      icon: TrendingUp,
      isCompleted: Boolean(marketInsights)
    },
    {
      id: 7,
      title: "Search Strings",
      subtitle: searchStrings ? "Naukri & LinkedIn" : "Boolean & Plain",
      icon: Search,
      isCompleted: Boolean(searchStrings)
    }
  ];

  const completedCount = STEPS.filter(s => s.isCompleted).length;
  const progressPercent = Math.round((completedCount / STEPS.length) * 100);

  const handleStepClick = (stepId: StepId) => {
    setCurrentStep(stepId);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <aside
      className={`
        w-72 bg-[#0f172a] text-slate-300 flex flex-col justify-between shrink-0 min-h-[calc(100vh-4rem)] border-r border-slate-800
        ${isOpenMobile ? 'fixed inset-y-0 left-0 z-50 block' : 'hidden md:flex'}
      `}
    >
      {/* Top Header & Navigation Stepper */}
      <div className="p-4 space-y-6">
        {/* Recruiter Workspace Header */}
        <div className="px-2 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-400">
              Recruitment Workflow
            </span>
            <span className="text-xs text-slate-400 font-semibold">{completedCount}/7 Done</span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-purple-500 to-indigo-400 h-full transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Step Nav Links */}
        <nav className="space-y-1">
          {STEPS.map((step) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;

            return (
              <button
                key={step.id}
                onClick={() => handleStepClick(step.id)}
                className={`
                  w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all group
                  ${
                    isActive
                      ? 'bg-purple-900/40 text-white font-medium border border-purple-500/40 shadow-inner'
                      : 'hover:bg-slate-800/60 text-slate-400 hover:text-slate-100'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`
                      w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors
                      ${
                        isActive
                          ? 'bg-purple-600 text-white shadow-sm'
                          : step.isCompleted
                          ? 'bg-slate-800 text-purple-400'
                          : 'bg-slate-800/60 text-slate-500'
                      }
                    `}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold">{step.title}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 truncate max-w-[140px]">{step.subtitle}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  {step.isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <span className="text-[10px] font-mono text-slate-600">0{step.id}</span>
                  )}
                  {isActive && <ChevronRight className="w-4 h-4 text-purple-400 animate-pulse" />}
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Info Box */}
      <div className="p-4 m-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2.5 text-xs">
        <div className="flex items-center gap-2 text-purple-400 font-semibold">
          <ShieldAlert className="w-4 h-4 text-purple-400" />
          <span>Fair Hiring Guardrails</span>
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed">
          HireTalX enforces transparent 100-point rubrics with strict zero-weighting on personal protected demographic attributes.
        </p>
        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
          <span>Platform Status</span>
          <span className="flex items-center gap-1 text-emerald-400 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            All Systems Operational
          </span>
        </div>
      </div>
    </aside>
  );
};
