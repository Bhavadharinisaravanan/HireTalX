import React, { useState } from 'react';
import { useRecruitment } from '../context/RecruitmentContext';
import {
  Files,
  UploadCloud,
  Sparkles,
  ArrowRight,
  Trash2,
  CheckCircle2,
  FileText,
  Briefcase,
  Layers,
  GraduationCap,
  MapPin,
  RefreshCw
} from 'lucide-react';

export const Module3_Resumes: React.FC = () => {
  const {
    candidates,
    loadSyntheticResumes,
    uploadResumes,
    removeCandidate,
    isLoading,
    setCurrentStep
  } = useRecruitment();

  const [dragActive, setDragActive] = useState<boolean>(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const filesArray = Array.from(e.dataTransfer.files);
      await uploadResumes(filesArray);
    }
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      await uploadResumes(filesArray);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-8 animate-fade-in">
      {/* Module Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wider border border-purple-200 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Workflow 3: Multi-Resume Ingestion & Parsing
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Multi-Resume Ingestion & Content Parsing
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Accepts multiple PDF and DOCX resumes. Live extraction using PDF.js/pdf-parse and Mammoth. Includes 5 comprehensive candidate profiles for ranking analysis.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={loadSyntheticResumes}
            disabled={isLoading}
            className="px-4 py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 font-bold text-xs shadow-2xs transition-colors flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span>Load Benchmark Candidate Pool (5 Profiles)</span>
          </button>

          {candidates.length > 0 && (
            <button
              onClick={() => setCurrentStep(4)}
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-sm transition-colors flex items-center gap-2"
            >
              <span>Rank Candidates</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Ingested Resumes</span>
          <p className="text-2xl font-black text-slate-900 mt-1">{candidates.length} Profiles</p>
          <span className="text-xs text-purple-600 font-medium">Ready in candidate pool</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Parsing Engine</span>
          <p className="text-base font-bold text-slate-800 mt-1">PDF.js & Mammoth DOCX</p>
          <span className="text-xs text-emerald-600 font-medium">100% Client/Server Verified</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Workflow Status</span>
          <p className="text-base font-bold text-slate-800 mt-1">
            {candidates.length > 0 ? 'Ready for AI Ranking' : 'Awaiting Resume Ingestion'}
          </p>
          <span className="text-xs text-slate-500">Step 3 of 7 Active</span>
        </div>
      </div>

      {/* Upload Dropzone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`
          border-2 border-dashed rounded-2xl p-8 text-center transition-all bg-white
          ${dragActive ? 'border-purple-600 bg-purple-50/40 scale-[1.005]' : 'border-slate-300 hover:border-purple-400 hover:bg-purple-50/10'}
        `}
      >
        <input
          type="file"
          id="multiResumeInput"
          multiple
          accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
          onChange={handleFileInput}
          className="hidden"
        />
        <label htmlFor="multiResumeInput" className="cursor-pointer flex flex-col items-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center shadow-xs">
            <UploadCloud className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800">
              Drag & Drop Multiple Resumes Here or Click to Browse
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Select multiple files simultaneously • Supports PDF, DOCX and TXT files
            </p>
          </div>
          <span className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold shadow-xs hover:bg-purple-700 transition-colors">
            {isLoading ? 'Parsing Resumes...' : 'Select Resume Files from Computer'}
          </span>
        </label>
      </div>

      {/* Ingested Resumes List / Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Files className="w-4 h-4 text-purple-600" />
            <h3 className="font-bold text-sm text-slate-900">
              Parsed Candidate Queue ({candidates.length})
            </h3>
          </div>

          {candidates.length > 0 && (
            <span className="text-xs text-slate-500 font-medium">
              Click "Rank Candidates" to trigger 100-point rubric AI scoring
            </span>
          )}
        </div>

        {candidates.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <Files className="w-12 h-12 text-slate-300 mx-auto" />
            <p className="text-sm font-bold text-slate-700">No resumes uploaded yet</p>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Upload candidate PDF or DOCX files above, or click "Load 5 Synthetic Resumes" to test the AI evaluation workflow immediately.
            </p>
            <button
              onClick={loadSyntheticResumes}
              className="mt-2 px-4 py-2 rounded-lg bg-purple-50 text-purple-700 border border-purple-200 text-xs font-bold hover:bg-purple-100 transition-colors"
            >
              Load Benchmark Candidate Pool (5 Profiles)
            </button>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {candidates.map((cand, idx) => (
              <div
                key={cand.id}
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-base shrink-0">
                    {cand.candidateName.charAt(0)}
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="font-bold text-sm text-slate-900">{cand.candidateName}</h4>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Parsed & Ready
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        {cand.fileName}
                      </span>
                    </div>

                    <p className="text-xs font-medium text-slate-600">
                      {cand.currentTitle} • {cand.currentCompany}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-0.5">
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                        {cand.totalExperienceYears} Yrs Exp
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {cand.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                        {cand.education}
                      </span>
                    </div>

                    {/* Skill tags preview */}
                    <div className="flex flex-wrap gap-1 pt-1.5">
                      {cand.skills.slice(0, 6).map((skill, sIdx) => (
                        <span key={sIdx} className="px-2 py-0.5 rounded text-[11px] bg-slate-100 text-slate-700 font-medium">
                          {skill}
                        </span>
                      ))}
                      {cand.skills.length > 6 && (
                        <span className="text-[10px] text-slate-400 self-center">
                          +{cand.skills.length - 6} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <button
                    onClick={() => removeCandidate(cand.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Remove from queue"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Step Navigation Footer */}
      {candidates.length > 0 && (
        <div className="flex justify-end pt-2">
          <button
            onClick={() => setCurrentStep(4)}
            className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
          >
            <span>Proceed to Step 4: AI Candidate Ranking</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
