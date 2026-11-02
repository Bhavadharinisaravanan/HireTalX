import React, { useState } from 'react';
import { useRecruitment } from '../context/RecruitmentContext';
import { Candidate } from '../types';
import { CandidateDetailModal } from '../components/CandidateDetailModal';
import { ErrorCorrectionModal } from '../components/ErrorCorrectionModal';
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Sliders,
  Eye,
  Sparkles,
  ArrowRight,
  TrendingUp,
  History,
  FileCheck,
  Briefcase,
  HelpCircle,
  Quote
} from 'lucide-react';

export const Module4_Ranking: React.FC = () => {
  const {
    rankedCandidates,
    candidates,
    rankCandidatesList,
    auditLogs,
    isLoading,
    setCurrentStep
  } = useRecruitment();

  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [errorCorrectionCandidate, setErrorCorrectionCandidate] = useState<Candidate | null>(null);

  const displayCandidates = rankedCandidates.length > 0 ? rankedCandidates : candidates;

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-8 animate-fade-in">
      {/* Module Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wider border border-purple-200 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Workflow 4: 100-Point Candidate Ranking & Audit
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Transparent 100-Point Candidate Ranking & Audit
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Compare parsed resumes with the Job Description using a 100-point rubric. Evidence-backed explanations with zero weight on protected personal characteristics.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={rankCandidatesList}
            disabled={isLoading || candidates.length === 0}
            className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-sm transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <Award className="w-4 h-4" />
            <span>{isLoading ? 'Evaluating Candidates...' : 'Run AI Evaluation (/100)'}</span>
          </button>

          {rankedCandidates.length > 0 && (
            <button
              onClick={() => setCurrentStep(5)}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition-colors flex items-center gap-2"
            >
              <span>Screening Qs</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Transparent Rubric & Ethical AI Policy Banner */}
      <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-2xl text-white p-6 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <Award className="w-5 h-5 text-purple-400" />
            <h3 className="font-bold text-base text-white">Transparent 100-Point Scoring Rubric</h3>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Ethical AI: Protected Attributes Blind</span>
          </div>
        </div>

        {/* 4 Rubric Categories */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <span className="text-purple-300 font-bold block text-sm">40 Points</span>
            <span className="text-slate-200 font-semibold mt-1 block">Technical Skills</span>
            <p className="text-[11px] text-slate-400 mt-0.5">Mandatory (30) & Preferred (10) skill alignment</p>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <span className="text-indigo-300 font-bold block text-sm">25 Points</span>
            <span className="text-slate-200 font-semibold mt-1 block">Experience Depth</span>
            <p className="text-[11px] text-slate-400 mt-0.5">Years of experience & role seniority curve</p>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <span className="text-blue-300 font-bold block text-sm">20 Points</span>
            <span className="text-slate-200 font-semibold mt-1 block">Project Scale</span>
            <p className="text-[11px] text-slate-400 mt-0.5">Production GenAI & microservices throughput</p>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <span className="text-emerald-300 font-bold block text-sm">15 Points</span>
            <span className="text-slate-200 font-semibold mt-1 block">Education & Basis</span>
            <p className="text-[11px] text-slate-400 mt-0.5">Accredited Engineering/CS degree alignment</p>
          </div>
        </div>

        <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
          <strong>Fair Hiring Guarantee:</strong> The algorithm strictly excludes candidate gender, age, photo, and nationality from evaluation calculations.
        </p>
      </div>

      {/* Recalibration Audit Log Banner (If any recalibrations performed) */}
      {auditLogs.length > 0 && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2 text-xs">
          <div className="flex items-center gap-2 text-amber-900 font-bold">
            <History className="w-4 h-4 text-amber-700" />
            <span>AI Error Correction Audit Trail ({auditLogs.length} Logged Recalibrations)</span>
          </div>
          <div className="space-y-1.5 pt-1">
            {auditLogs.map((log) => (
              <div key={log.auditId} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] bg-white p-2.5 rounded-lg border border-amber-200/60">
                <div>
                  <span className="font-bold text-slate-900">{log.candidateName}:</span>{' '}
                  <span className="text-slate-600">{log.recalibrationReason}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-mono text-slate-500">Score: {log.originalScore} → <strong className="text-emerald-700">{log.correctedScore}</strong> ({log.delta >= 0 ? `+${log.delta}` : log.delta})</span>
                  <span className="text-slate-400 font-mono text-[10px]">{new Date(log.auditTimestamp).toLocaleTimeString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Candidate Leaderboard List */}
      <div className="space-y-4">
        {displayCandidates.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-3">
            <Award className="w-12 h-12 text-slate-300 mx-auto" />
            <p className="text-sm font-bold text-slate-700">No candidates available to rank</p>
            <p className="text-xs text-slate-400">
              Please go back to Step 3 to ingest resumes or load the 5 synthetic profiles.
            </p>
            <button
              onClick={() => setCurrentStep(3)}
              className="mt-2 px-4 py-2 rounded-lg bg-purple-600 text-white text-xs font-bold hover:bg-purple-700 transition-colors"
            >
              Go to Step 3: Resumes
            </button>
          </div>
        ) : (
          displayCandidates.map((cand, idx) => {
            const score = cand.overallScore ?? 70;
            const rankNumber = cand.rank ?? (idx + 1);
            const breakdown = cand.scoreBreakdown || {
              technicalSkills: 28,
              experienceDepth: 18,
              projectRelevance: 12,
              educationCertifications: 12
            };

            return (
              <div
                key={cand.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition-shadow space-y-4"
              >
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div className="flex items-start gap-4">
                    {/* Rank Badge */}
                    <div
                      className={`
                        w-12 h-12 rounded-2xl flex flex-col items-center justify-center font-extrabold shrink-0 shadow-xs
                        ${
                          rankNumber === 1
                            ? 'bg-amber-100 text-amber-800 border-2 border-amber-300'
                            : rankNumber === 2
                            ? 'bg-slate-200 text-slate-800 border-2 border-slate-300'
                            : rankNumber === 3
                            ? 'bg-orange-100 text-orange-800 border-2 border-orange-300'
                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }
                      `}
                    >
                      <span className="text-[10px] uppercase font-bold text-slate-500">Rank</span>
                      <span className="text-base font-black">#{rankNumber}</span>
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2.5">
                        <h3 className="text-lg font-bold text-slate-900">{cand.candidateName}</h3>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${cand.badgeColor || 'bg-purple-100 text-purple-800 border-purple-200'}`}>
                          {cand.matchTier || 'Evaluated'}
                        </span>
                        {cand.isRecalibrated && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1">
                            <Sliders className="w-3 h-3 text-amber-600" />
                            Recalibrated
                          </span>
                        )}
                      </div>

                      <p className="text-xs font-medium text-slate-600 mt-1">
                        {cand.currentTitle} • {cand.currentCompany} ({cand.totalExperienceYears} Yrs Exp)
                      </p>
                    </div>
                  </div>

                  {/* Score Pill & Action Buttons */}
                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <div className="text-right pr-2">
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-black text-slate-900">{score}</span>
                        <span className="text-xs font-medium text-slate-400">/ 100</span>
                      </div>
                      <span className="text-[10px] font-semibold text-purple-700">AI Match Score</span>
                    </div>

                    <button
                      onClick={() => setSelectedCandidate(cand)}
                      className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5 text-slate-500" />
                      <span>Details</span>
                    </button>

                    <button
                      onClick={() => setErrorCorrectionCandidate(cand)}
                      className="px-3.5 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-bold transition-colors flex items-center gap-1.5"
                    >
                      <Sliders className="w-3.5 h-3.5 text-purple-600" />
                      <span>Audit Score</span>
                    </button>
                  </div>
                </div>

                {/* Rubric Category Progress Bars */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-50/70 p-3.5 rounded-xl">
                  <div>
                    <div className="flex justify-between text-[11px] font-medium text-slate-600 mb-1">
                      <span>Tech Skills</span>
                      <span className="font-bold text-slate-900">{breakdown.technicalSkills}/40</span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-purple-600 h-full rounded-full" style={{ width: `${(breakdown.technicalSkills / 40) * 100}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] font-medium text-slate-600 mb-1">
                      <span>Experience</span>
                      <span className="font-bold text-slate-900">{breakdown.experienceDepth}/25</span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${(breakdown.experienceDepth / 25) * 100}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] font-medium text-slate-600 mb-1">
                      <span>Project Scale</span>
                      <span className="font-bold text-slate-900">{breakdown.projectRelevance}/20</span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-blue-600 h-full rounded-full" style={{ width: `${(breakdown.projectRelevance / 20) * 100}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] font-medium text-slate-600 mb-1">
                      <span>Education</span>
                      <span className="font-bold text-slate-900">{breakdown.educationCertifications}/15</span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${(breakdown.educationCertifications / 15) * 100}%` }} />
                    </div>
                  </div>
                </div>

                {/* Evidence Quote Preview */}
                {cand.evidenceQuotes && cand.evidenceQuotes.length > 0 && (
                  <div className="p-3 bg-purple-50/50 rounded-xl border border-purple-100 flex items-start gap-2.5 text-xs text-slate-700">
                    <Quote className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                    <p className="font-mono text-[11px] leading-relaxed italic">
                      "{cand.evidenceQuotes[0]}"
                    </p>
                  </div>
                )}

                {/* Matched & Missing Skills Tags */}
                <div className="flex flex-wrap items-center gap-4 text-xs pt-1">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="font-semibold text-slate-700">Matched:</span>
                    <span className="text-slate-600 truncate max-w-md">
                      {cand.matchedSkills && cand.matchedSkills.length > 0
                        ? cand.matchedSkills.slice(0, 4).join(', ') + (cand.matchedSkills.length > 4 ? ` +${cand.matchedSkills.length - 4}` : '')
                        : 'Reviewing...'}
                    </span>
                  </div>

                  {cand.missingSkills && cand.missingSkills.length > 0 && (
                    <div className="flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                      <span className="font-semibold text-slate-700">Missing:</span>
                      <span className="text-rose-700">
                        {cand.missingSkills.slice(0, 2).join(', ')}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Detail View Modal */}
      <CandidateDetailModal
        candidate={selectedCandidate}
        onClose={() => setSelectedCandidate(null)}
        onOpenErrorCorrection={(c) => setErrorCorrectionCandidate(c)}
      />

      {/* AI Error Correction Demonstration Modal */}
      <ErrorCorrectionModal
        candidate={errorCorrectionCandidate}
        onClose={() => setErrorCorrectionCandidate(null)}
      />

      {/* Step Navigation Footer */}
      {displayCandidates.length > 0 && (
        <div className="flex justify-end pt-4">
          <button
            onClick={() => setCurrentStep(5)}
            className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
          >
            <span>Proceed to Step 5: Screening Questions</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
