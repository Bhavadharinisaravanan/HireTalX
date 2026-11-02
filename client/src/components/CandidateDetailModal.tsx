import React, { useState } from 'react';
import { Candidate } from '../types';
import {
  X,
  Award,
  CheckCircle2,
  AlertTriangle,
  Briefcase,
  GraduationCap,
  MapPin,
  Mail,
  Phone,
  Quote,
  Sliders,
  FileText,
  ShieldCheck
} from 'lucide-react';

interface CandidateDetailModalProps {
  candidate: Candidate | null;
  onClose: () => void;
  onOpenErrorCorrection: (candidate: Candidate) => void;
}

export const CandidateDetailModal: React.FC<CandidateDetailModalProps> = ({
  candidate,
  onClose,
  onOpenErrorCorrection
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'evidence' | 'resume'>('overview');

  if (!candidate) return null;

  const score = candidate.overallScore ?? 70;
  const breakdown = candidate.scoreBreakdown || {
    technicalSkills: 30,
    experienceDepth: 20,
    projectRelevance: 12,
    educationCertifications: 12
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-200 bg-slate-50/80 flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-700 to-indigo-600 text-white flex items-center justify-center font-bold text-2xl shadow-md shrink-0">
              {candidate.candidateName.charAt(0)}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h2 className="text-xl font-bold text-slate-900">{candidate.candidateName}</h2>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${candidate.badgeColor || 'bg-purple-100 text-purple-800 border-purple-200'}`}>
                  {candidate.matchTier || 'Evaluated'}
                </span>
                {candidate.isRecalibrated && (
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1">
                    <Sliders className="w-3 h-3 text-amber-600" />
                    AI Recalibrated
                  </span>
                )}
              </div>

              <p className="text-sm text-slate-600 mt-1 font-medium">{candidate.currentTitle} • {candidate.currentCompany}</p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-2">
                <span className="flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                  {candidate.totalExperienceYears} Years Experience
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {candidate.location}
                </span>
                <span className="flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                  {candidate.education}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenErrorCorrection(candidate);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg transition-colors"
            >
              <Sliders className="w-3.5 h-3.5 text-purple-600" />
              <span>Audit / Recalibrate AI Score</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex items-center gap-4 px-6 border-b border-slate-200 bg-white text-xs font-medium text-slate-600">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 border-b-2 font-semibold transition-colors ${
              activeTab === 'overview'
                ? 'border-purple-600 text-purple-700'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Overview & 100-Pt Breakdown
          </button>
          <button
            onClick={() => setActiveTab('evidence')}
            className={`py-3 border-b-2 font-semibold transition-colors ${
              activeTab === 'evidence'
                ? 'border-purple-600 text-purple-700'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Evidence-Based Explanations ({candidate.evidenceQuotes?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('resume')}
            className={`py-3 border-b-2 font-semibold transition-colors ${
              activeTab === 'resume'
                ? 'border-purple-600 text-purple-700'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Full Resume Content
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-700">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Score Header Card */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-gradient-to-br from-slate-900 to-indigo-950 p-5 rounded-2xl text-white shadow-md">
                <div className="md:col-span-1 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-800 pb-4 md:pb-0">
                  <span className="text-xs font-medium uppercase tracking-wider text-purple-300">Overall Match</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-4xl font-extrabold text-white">{score}</span>
                    <span className="text-slate-400 text-sm">/ 100</span>
                  </div>
                  <span className="text-[11px] text-purple-200 mt-1">{candidate.matchTier}</span>
                </div>

                {/* Rubric Breakdown 4 Cards */}
                <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="bg-white/10 rounded-xl p-3 border border-white/10">
                    <p className="text-slate-400 text-[11px]">Technical Skills</p>
                    <p className="text-lg font-bold text-white mt-0.5">{breakdown.technicalSkills} <span className="text-xs font-normal text-slate-400">/ 40</span></p>
                    <div className="w-full bg-white/20 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div className="bg-purple-400 h-full rounded-full" style={{ width: `${(breakdown.technicalSkills / 40) * 100}%` }} />
                    </div>
                  </div>

                  <div className="bg-white/10 rounded-xl p-3 border border-white/10">
                    <p className="text-slate-400 text-[11px]">Experience Depth</p>
                    <p className="text-lg font-bold text-white mt-0.5">{breakdown.experienceDepth} <span className="text-xs font-normal text-slate-400">/ 25</span></p>
                    <div className="w-full bg-white/20 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div className="bg-indigo-400 h-full rounded-full" style={{ width: `${(breakdown.experienceDepth / 25) * 100}%` }} />
                    </div>
                  </div>

                  <div className="bg-white/10 rounded-xl p-3 border border-white/10">
                    <p className="text-slate-400 text-[11px]">Project Scale</p>
                    <p className="text-lg font-bold text-white mt-0.5">{breakdown.projectRelevance} <span className="text-xs font-normal text-slate-400">/ 20</span></p>
                    <div className="w-full bg-white/20 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div className="bg-blue-400 h-full rounded-full" style={{ width: `${(breakdown.projectRelevance / 20) * 100}%` }} />
                    </div>
                  </div>

                  <div className="bg-white/10 rounded-xl p-3 border border-white/10">
                    <p className="text-slate-400 text-[11px]">Education</p>
                    <p className="text-lg font-bold text-white mt-0.5">{breakdown.educationCertifications} <span className="text-xs font-normal text-slate-400">/ 15</span></p>
                    <div className="w-full bg-white/20 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${(breakdown.educationCertifications / 15) * 100}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bias Audit Statement */}
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3 text-xs text-emerald-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold">Ethical AI Protection Audit:</span>
                  <p className="text-emerald-700 mt-0.5">
                    {candidate.biasAuditStatement || "Scored strictly on job-relevant skills, work history, and verified outcomes. Zero weight given to gender, age, nationality, or demographic factors."}
                  </p>
                </div>
              </div>

              {/* Matched vs Missing Skills */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                  <div className="flex items-center gap-2 mb-3 text-xs font-bold text-emerald-800 uppercase tracking-wide">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Matched Competencies ({candidate.matchedSkills?.length || 0})</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {candidate.matchedSkills && candidate.matchedSkills.length > 0 ? (
                      candidate.matchedSkills.map((skill, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-100/70 text-emerald-800 border border-emerald-200">
                          {skill}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-slate-400 italic">No direct keyword overlap</span>
                    )}
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                  <div className="flex items-center gap-2 mb-3 text-xs font-bold text-rose-800 uppercase tracking-wide">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    <span>Skill Gaps / Missing Requisite ({candidate.missingSkills?.length || 0})</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {candidate.missingSkills && candidate.missingSkills.length > 0 ? (
                      candidate.missingSkills.map((skill, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-md text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200">
                          {skill}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-emerald-700 font-medium">None! All core required skills matched.</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Projects & Highlights */}
              {candidate.projects && candidate.projects.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Key Production Projects</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {candidate.projects.map((proj, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-1.5">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-sm text-slate-800">{proj.name}</h4>
                          <span className="text-[11px] text-purple-700 bg-purple-50 px-2 py-0.5 rounded font-medium">{proj.role}</span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">{proj.description}</p>
                        {proj.impact && (
                          <p className="text-xs font-medium text-emerald-700 bg-emerald-50/50 p-2 rounded-lg border border-emerald-100">
                            Impact: {proj.impact}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'evidence' && (
            <div className="space-y-4">
              <div className="p-3 bg-purple-50 rounded-xl border border-purple-100 text-xs text-purple-900 leading-relaxed">
                <strong>Verifiable Evidence Extraction:</strong> The following excerpts were parsed directly from {candidate.candidateName}'s submitted resume document to justify each score rubric dimension.
              </div>

              {candidate.evidenceQuotes && candidate.evidenceQuotes.length > 0 ? (
                <div className="space-y-3">
                  {candidate.evidenceQuotes.map((quote, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                      <Quote className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                      <p className="text-xs text-slate-700 leading-relaxed font-mono italic">
                        "{quote}"
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic">No specific quotes extracted yet.</p>
              )}
            </div>
          )}

          {activeTab === 'resume' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>File: {candidate.fileName}</span>
                <span>Format: {candidate.mimeType || 'Extracted Text'}</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-900 text-slate-200 text-xs font-mono whitespace-pre-wrap max-h-96 overflow-y-auto leading-relaxed border border-slate-800">
                {candidate.rawContent || candidate.experienceSummary}
              </pre>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-slate-500">
            {candidate.contact?.email && (
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                {candidate.contact.email}
              </span>
            )}
            {candidate.contact?.phone && (
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                {candidate.contact.phone}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenErrorCorrection(candidate);
              }}
              className="px-4 py-2 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Launch AI Error Correction</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
