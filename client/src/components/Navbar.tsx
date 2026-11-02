import React from 'react';
import { useRecruitment } from '../context/RecruitmentContext';
import {
  Sparkles,
  ShieldCheck,
  RotateCcw,
  LogOut,
  Building2,
  Briefcase
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentUser, logout, resetAll, currentJD } = useRecruitment();

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-900 to-purple-700 flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight text-slate-900">HireTalX</span>
                <span className="px-1.5 py-0.5 text-[10px] font-extrabold uppercase bg-purple-100 text-purple-700 rounded-md border border-purple-200">
                  Enterprise
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">Talent Acquisition & Intelligence Platform</p>
            </div>
          </div>

          {/* Center Requisition Info */}
          {currentJD && (
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
              <Briefcase className="w-3.5 h-3.5 text-purple-600" />
              <span className="font-semibold text-slate-700 truncate max-w-[240px]">{currentJD.title}</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-500">{currentJD.location.split(',')[0]}</span>
            </div>
          )}

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            {/* Blind Assessment Pill */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Blind Assessment Active</span>
            </div>

            {/* Recruiter Profile / Auth */}
            {currentUser ? (
              <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
                <div className="flex items-center gap-2">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full object-cover border border-purple-300 ring-2 ring-purple-50"
                  />
                  <div className="hidden md:block text-left">
                    <p className="text-xs font-semibold text-slate-800 leading-tight">{currentUser.name}</p>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Building2 className="w-3 h-3 text-slate-400" />
                      {currentUser.company}
                    </p>
                  </div>
                </div>

                <button
                  onClick={logout}
                  title="Logout"
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Enterprise SSO Active
              </span>
            )}

            {/* Reset Workspace Button */}
            <button
              onClick={resetAll}
              title="Reset workspace state"
              className="flex items-center gap-1 text-xs px-2.5 py-1.5 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200 font-medium"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Workspace</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
