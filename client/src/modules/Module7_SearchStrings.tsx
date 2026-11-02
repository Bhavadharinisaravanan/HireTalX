import React, { useState, useEffect } from 'react';
import { useRecruitment } from '../context/RecruitmentContext';
import {
  Search,
  Sparkles,
  Copy,
  Check,
  CheckCircle2,
  Terminal,
  ExternalLink,
  RotateCcw,
  BookOpen,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const Module7_SearchStrings: React.FC = () => {
  const {
    searchStrings,
    generateSearchStringsData,
    currentJD,
    showToast,
    resetAll,
    isLoading
  } = useRecruitment();

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    if (!searchStrings) {
      generateSearchStringsData();
    }
  }, []);

  const handleCopy = (text: string, label: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    showToast(`Copied ${label} to clipboard!`);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleCelebrateCompletion = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.5 }
    });
    showToast('All 7 recruitment workflows successfully demonstrated!');
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-8 animate-fade-in">
      {/* Module Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wider border border-purple-200 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Workflow 7: Sourcing Search String Generator
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Naukri & LinkedIn Search String Generator
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Instant dual-engine queries formatted with precise Boolean logic and natural language keyword densities. Includes one-click copy buttons for recruiter workflows.
          </p>
        </div>

        <button
          onClick={generateSearchStringsData}
          disabled={isLoading}
          className="px-4 py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 font-bold text-xs shadow-2xs transition-colors flex items-center gap-2 shrink-0 self-start sm:self-auto"
        >
          <RotateCcw className="w-4 h-4 text-purple-600" />
          <span>{isLoading ? 'Generating Strings...' : 'Regenerate Strings'}</span>
        </button>
      </div>

      {/* Role Metadata Chip */}
      {searchStrings?.roleMetadata && (
        <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4 text-xs">
          <div>
            <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Target Position:</span>
            <p className="font-bold text-slate-900 text-sm">{searchStrings.roleMetadata.title}</p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-slate-600">
            <span><strong>Experience:</strong> {searchStrings.roleMetadata.targetExperience}</span>
            <span><strong>Location:</strong> {searchStrings.roleMetadata.primaryLocation}</span>
          </div>
        </div>
      )}

      {/* Grid: Naukri Section vs LinkedIn Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* NAUKRI PLATFORM CARD */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="px-6 py-4 bg-gradient-to-r from-blue-900 to-indigo-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-blue-500 text-white flex items-center justify-center font-bold text-xs">
                N
              </div>
              <div>
                <h3 className="font-bold text-sm">Naukri.com Resdex Sourcing</h3>
                <p className="text-[11px] text-blue-200">Optimized for Indian Tech Talent Pools</p>
              </div>
            </div>

            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-blue-200 border border-white/10">
              Resdex Ready
            </span>
          </div>

          <div className="p-6 space-y-6 flex-1 text-slate-700">
            {/* 1. Naukri Boolean */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-bold text-slate-900">Naukri Boolean Query</span>
                </div>
                <button
                  onClick={() =>
                    handleCopy(
                      searchStrings?.naukri.boolean || '',
                      'Naukri Boolean String',
                      'naukri-bool'
                    )
                  }
                  className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-colors flex items-center gap-1.5 shadow-2xs"
                >
                  {copiedKey === 'naukri-bool' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'naukri-bool' ? 'Copied!' : 'Copy Boolean'}</span>
                </button>
              </div>

              <pre className="p-3.5 rounded-xl bg-slate-900 text-blue-300 font-mono text-xs whitespace-pre-wrap max-h-36 overflow-y-auto leading-relaxed border border-slate-800">
                {searchStrings?.naukri.boolean}
              </pre>

              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>{searchStrings?.naukri.charCountBoolean || 0} characters</span>
                <span className="text-blue-600 font-medium">{searchStrings?.naukri.tips}</span>
              </div>
            </div>

            {/* 2. Naukri Plain-Language */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">Naukri Plain-Language Keywords</span>
                <button
                  onClick={() =>
                    handleCopy(
                      searchStrings?.naukri.plain || '',
                      'Naukri Plain-Language Keywords',
                      'naukri-plain'
                    )
                  }
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1.5 shadow-2xs"
                >
                  {copiedKey === 'naukri-plain' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'naukri-plain' ? 'Copied!' : 'Copy Plain'}</span>
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-mono leading-relaxed">
                {searchStrings?.naukri.plain}
              </div>
              <p className="text-[11px] text-slate-400">
                Recommended for Naukri quick candidate filter tags and comma-separated mandatory skill inputs.
              </p>
            </div>
          </div>
        </div>

        {/* LINKEDIN PLATFORM CARD */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="px-6 py-4 bg-gradient-to-r from-slate-900 to-purple-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-purple-600 text-white flex items-center justify-center font-bold text-xs">
                in
              </div>
              <div>
                <h3 className="font-bold text-sm">LinkedIn Recruiter Sourcing</h3>
                <p className="text-[11px] text-purple-200">Global & GCC Engineering Search</p>
              </div>
            </div>

            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-purple-200 border border-white/10">
              Recruiter & Lite
            </span>
          </div>

          <div className="p-6 space-y-6 flex-1 text-slate-700">
            {/* 1. LinkedIn Boolean */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 text-purple-600" />
                  <span className="text-xs font-bold text-slate-900">LinkedIn Boolean Query</span>
                </div>
                <button
                  onClick={() =>
                    handleCopy(
                      searchStrings?.linkedin.boolean || '',
                      'LinkedIn Boolean String',
                      'linkedin-bool'
                    )
                  }
                  className="px-3 py-1.5 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold transition-colors flex items-center gap-1.5 shadow-2xs"
                >
                  {copiedKey === 'linkedin-bool' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'linkedin-bool' ? 'Copied!' : 'Copy Boolean'}</span>
                </button>
              </div>

              <pre className="p-3.5 rounded-xl bg-slate-900 text-purple-300 font-mono text-xs whitespace-pre-wrap max-h-36 overflow-y-auto leading-relaxed border border-slate-800">
                {searchStrings?.linkedin.boolean}
              </pre>

              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>{searchStrings?.linkedin.charCountBoolean || 0} characters</span>
                <span className="text-purple-600 font-medium">{searchStrings?.linkedin.tips}</span>
              </div>
            </div>

            {/* 2. LinkedIn Plain-Language */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">LinkedIn Semantic Plain-Language</span>
                <button
                  onClick={() =>
                    handleCopy(
                      searchStrings?.linkedin.plain || '',
                      'LinkedIn Plain-Language Search',
                      'linkedin-plain'
                    )
                  }
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1.5 shadow-2xs"
                >
                  {copiedKey === 'linkedin-plain' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'linkedin-plain' ? 'Copied!' : 'Copy Plain'}</span>
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-mono leading-relaxed">
                {searchStrings?.linkedin.plain}
              </div>
              <p className="text-[11px] text-slate-400">
                Designed for LinkedIn's semantic AI search algorithm to discover active candidate profiles.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recruiter Boolean Cheat Sheet */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3 text-xs text-slate-600">
        <div className="flex items-center gap-2 font-bold text-slate-900">
          <BookOpen className="w-4 h-4 text-purple-600" />
          <span>Recruiter Sourcing Syntax Reference</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-2.5 bg-white rounded-lg border border-slate-200">
            <strong className="text-slate-800 font-mono">AND Operator:</strong> Narrows results. Every profile must contain all terms (e.g. "React" AND "Node.js").
          </div>
          <div className="p-2.5 bg-white rounded-lg border border-slate-200">
            <strong className="text-slate-800 font-mono">OR Operator:</strong> Broadens results with skill synonyms (e.g. "LLM" OR "GenAI" OR "RAG").
          </div>
          <div className="p-2.5 bg-white rounded-lg border border-slate-200">
            <strong className="text-slate-800 font-mono">NOT Operator:</strong> Excludes unwanted seniority tiers (e.g. NOT "Intern" NOT "Fresher").
          </div>
        </div>
      </div>

      {/* Workflow Completion Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Complete 7-Stage Talent Pipeline Executed</span>
          </div>
          <h2 className="text-2xl font-black text-white">Talent Acquisition Pipeline Complete</h2>
          <p className="text-xs text-slate-300 max-w-xl">
            You have executed all seven core workflows: Recruiter Workspace Authentication, JD Ingestion, Multi-Resume Parsing, 100-Point AI Candidate Ranking with Human-in-the-Loop Recalibration, Contextual Screening Questions, Public Market Benchmarks, and Boolean Search Strings.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleCelebrateCompletion}
            className="px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-lg transition-all flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Verify Pipeline Complete</span>
          </button>

          <button
            onClick={resetAll}
            className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all flex items-center gap-1.5"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Workspace</span>
          </button>
        </div>
      </div>
    </div>
  );
};
