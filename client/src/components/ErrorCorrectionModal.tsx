import React, { useState } from 'react';
import { Candidate } from '../types';
import { useRecruitment } from '../context/RecruitmentContext';
import {
  X,
  Sliders,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  History,
  FileCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ErrorCorrectionModalProps {
  candidate: Candidate | null;
  onClose: () => void;
}

export const ErrorCorrectionModal: React.FC<ErrorCorrectionModalProps> = ({
  candidate,
  onClose
}) => {
  const { recalibrateCandidate, isLoading } = useRecruitment();

  if (!candidate) return null;

  const originalScore = candidate.overallScore ?? 70;
  const initialBreakdown = candidate.scoreBreakdown || {
    technicalSkills: 28,
    experienceDepth: 18,
    projectRelevance: 12,
    educationCertifications: 12
  };

  // Adjustments state (delta per category)
  const [techAdj, setTechAdj] = useState<number>(4);
  const [expAdj, setExpAdj] = useState<number>(0);
  const [projAdj, setProjAdj] = useState<number>(7);
  const [eduAdj, setEduAdj] = useState<number>(0);

  const [selectedPresetReason, setSelectedPresetReason] = useState<string>(
    "Candidate engineered custom Triton inference cluster with 50,000 QPS; qualifies for advanced system architecture points that were under-weighted by initial keyword match."
  );
  const [customNotes, setCustomNotes] = useState<string>(
    "Recruiter verified GitHub pull requests and architectural post-mortem confirming scale. Human recruiter override approved."
  );

  const deltaTotal = techAdj + expAdj + projAdj + eduAdj;
  const correctedScore = Math.min(100, Math.max(0, originalScore + deltaTotal));

  const handleAdjust = (setter: React.Dispatch<React.SetStateAction<number>>, current: number, step: number, minLimit: number, maxLimit: number) => {
    const nextVal = current + step;
    if (nextVal >= minLimit && nextVal <= maxLimit) {
      setter(nextVal);
    }
  };

  const handleApplyRecalibration = async () => {
    try {
      await recalibrateCandidate(
        candidate.id,
        {
          technicalSkills: techAdj,
          experienceDepth: expAdj,
          projectRelevance: projAdj,
          educationCertifications: eduAdj
        },
        customNotes,
        selectedPresetReason
      );

      // Trigger celebratory confetti
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });

      onClose();
    } catch (e) {
      console.error('Error applying recalibration:', e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
              <Sliders className="w-5 h-5 text-purple-700" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-base">Human-in-the-Loop Score Recalibration & Audit</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-amber-100 text-amber-800 border border-amber-300">
                  Compliance Audit Trail
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Reviewing candidate: <span className="font-semibold text-slate-800">{candidate.candidateName}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Score Differential Comparison */}
        <div className="p-6 bg-slate-900 text-white border-b border-slate-800">
          <div className="grid grid-cols-3 gap-4 text-center items-center">
            {/* Original Score */}
            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Algorithmic Base</span>
              <p className="text-3xl font-extrabold text-slate-300 mt-1">{originalScore}</p>
              <span className="text-[10px] text-slate-500">Automated Parser Score</span>
            </div>

            {/* Delta Indicator */}
            <div className="flex flex-col items-center justify-center">
              <span className="text-[11px] uppercase tracking-wider text-purple-400 font-semibold">Recalibration Delta</span>
              <div className={`text-2xl font-black mt-1 flex items-center gap-1 ${deltaTotal >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                <TrendingUp className={`w-5 h-5 ${deltaTotal < 0 ? 'rotate-180' : ''}`} />
                <span>{deltaTotal >= 0 ? `+${deltaTotal}` : deltaTotal} pts</span>
              </div>
              <span className="text-[10px] text-purple-300">Recruiter Review</span>
            </div>

            {/* Corrected Score */}
            <div className="p-3 bg-purple-500/20 rounded-xl border border-purple-500/30">
              <span className="text-[11px] uppercase tracking-wider text-purple-200 font-semibold">Audited Score</span>
              <p className="text-3xl font-black text-white mt-1">{correctedScore}</p>
              <span className="text-[10px] text-emerald-300 font-medium">Post-Audit Score</span>
            </div>
          </div>
        </div>

        {/* Interactive Rubric Dimension Adjustments */}
        <div className="p-6 space-y-5 overflow-y-auto max-h-[50vh] text-slate-700">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Recalibrate Rubric Category Points
            </h4>

            <div className="space-y-3">
              {/* Category 1: Technical Skills */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xs text-slate-900">Technical Skills Match</span>
                    <span className="text-[10px] text-slate-500">(Max 40 pts)</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Base: {initialBreakdown.technicalSkills} pts • Adjusted: <span className="font-bold text-purple-700">{Math.min(40, initialBreakdown.technicalSkills + techAdj)}</span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAdjust(setTechAdj, techAdj, -1, -10, 10)}
                    className="w-7 h-7 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 flex items-center justify-center font-bold text-slate-700 text-sm shadow-2xs"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-mono font-bold text-xs text-slate-900">
                    {techAdj >= 0 ? `+${techAdj}` : techAdj}
                  </span>
                  <button
                    onClick={() => handleAdjust(setTechAdj, techAdj, 1, -10, 10)}
                    className="w-7 h-7 rounded-lg bg-purple-50 border border-purple-200 hover:bg-purple-100 flex items-center justify-center font-bold text-purple-700 text-sm shadow-2xs"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Category 2: Experience Depth */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xs text-slate-900">Experience Depth & Seniority</span>
                    <span className="text-[10px] text-slate-500">(Max 25 pts)</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Base: {initialBreakdown.experienceDepth} pts • Adjusted: <span className="font-bold text-purple-700">{Math.min(25, initialBreakdown.experienceDepth + expAdj)}</span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAdjust(setExpAdj, expAdj, -1, -5, 5)}
                    className="w-7 h-7 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 flex items-center justify-center font-bold text-slate-700 text-sm shadow-2xs"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-mono font-bold text-xs text-slate-900">
                    {expAdj >= 0 ? `+${expAdj}` : expAdj}
                  </span>
                  <button
                    onClick={() => handleAdjust(setExpAdj, expAdj, 1, -5, 5)}
                    className="w-7 h-7 rounded-lg bg-purple-50 border border-purple-200 hover:bg-purple-100 flex items-center justify-center font-bold text-purple-700 text-sm shadow-2xs"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Category 3: Project Relevance & System Scale */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xs text-slate-900">Project Relevance & System Scale</span>
                    <span className="text-[10px] text-slate-500">(Max 20 pts)</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Base: {initialBreakdown.projectRelevance} pts • Adjusted: <span className="font-bold text-purple-700">{Math.min(20, initialBreakdown.projectRelevance + projAdj)}</span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAdjust(setProjAdj, projAdj, -1, -8, 8)}
                    className="w-7 h-7 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 flex items-center justify-center font-bold text-slate-700 text-sm shadow-2xs"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-mono font-bold text-xs text-slate-900">
                    {projAdj >= 0 ? `+${projAdj}` : projAdj}
                  </span>
                  <button
                    onClick={() => handleAdjust(setProjAdj, projAdj, 1, -8, 8)}
                    className="w-7 h-7 rounded-lg bg-purple-50 border border-purple-200 hover:bg-purple-100 flex items-center justify-center font-bold text-purple-700 text-sm shadow-2xs"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Category 4: Education & Foundation */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xs text-slate-900">Education & Accreditations</span>
                    <span className="text-[10px] text-slate-500">(Max 15 pts)</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Base: {initialBreakdown.educationCertifications} pts • Adjusted: <span className="font-bold text-purple-700">{Math.min(15, initialBreakdown.educationCertifications + eduAdj)}</span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAdjust(setEduAdj, eduAdj, -1, -3, 3)}
                    className="w-7 h-7 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 flex items-center justify-center font-bold text-slate-700 text-sm shadow-2xs"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-mono font-bold text-xs text-slate-900">
                    {eduAdj >= 0 ? `+${eduAdj}` : eduAdj}
                  </span>
                  <button
                    onClick={() => handleAdjust(setEduAdj, eduAdj, 1, -3, 3)}
                    className="w-7 h-7 rounded-lg bg-purple-50 border border-purple-200 hover:bg-purple-100 flex items-center justify-center font-bold text-purple-700 text-sm shadow-2xs"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Audit Reason Preset Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700">
              Audit Recalibration Rationale (Audit Trail Documentation)
            </label>
            <select
              value={selectedPresetReason}
              onChange={(e) => setSelectedPresetReason(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-800"
            >
              <option value="Candidate engineered custom Triton inference cluster with 50,000 QPS; qualifies for advanced system architecture points that were under-weighted by initial keyword match.">
                Specialized AI Architecture Under-weighted in Initial Keyword Scan
              </option>
              <option value="Candidate demonstrated deep distributed ledger microservices experience; proprietary company terminology was missed by standard parser.">
                Proprietary / Non-Standard Project Terminology Verified
              </option>
              <option value="Candidate transitioned between backend and ML roles with proven full-stack ownership not reflected in standard title matching.">
                Cross-Functional Engineering Depth Verified via Code Portfolio
              </option>
            </select>
          </div>

          {/* Recruiter Notes */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">
              Recruiter Override Verification Notes
            </label>
            <textarea
              rows={2}
              value={customNotes}
              onChange={(e) => setCustomNotes(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono text-slate-800"
              placeholder="Add verification notes, links to candidate pull requests, or interview confirmation..."
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <FileCheck className="w-4 h-4 text-emerald-600" />
            <span>Audit record will be stamped in compliance log</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleApplyRecalibration}
              disabled={isLoading}
              className="px-5 py-2 text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-lg shadow-sm transition-colors flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isLoading ? 'Recalibrating...' : 'Commit Score to Audit Log'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
