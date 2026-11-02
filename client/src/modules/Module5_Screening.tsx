import React, { useState, useEffect } from 'react';
import { useRecruitment } from '../context/RecruitmentContext';
import {
  HelpCircle,
  Sparkles,
  Copy,
  Check,
  CheckCircle2,
  ArrowRight,
  Code,
  Briefcase,
  Users,
  Star,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const Module5_Screening: React.FC = () => {
  const {
    screeningQuestions,
    generateQuestions,
    updateQuestionNoteOrScore,
    isLoading,
    showToast,
    setCurrentStep
  } = useRecruitment();

  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState<boolean>(false);
  const [expandedNotes, setExpandedNotes] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    if (screeningQuestions.length === 0) {
      generateQuestions();
    }
  }, []);

  const handleCopySingle = (q: any) => {
    const text = `Question ${q.id} [${q.category}]:\n${q.question}\n\nExpected Good-Answer Indicators:\n${q.goodAnswerPoints.map((pt: string) => `• ${pt}`).join('\n')}`;
    navigator.clipboard.writeText(text);
    setCopiedId(q.id);
    showToast(`Copied Question #${q.id} and rubric to clipboard`);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleCopyAll = () => {
    const fullText = screeningQuestions.map(q =>
      `QUESTION ${q.id} (${q.category} - ${q.difficulty}):\n${q.question}\n\nExpected Good Answer Indicators:\n${q.goodAnswerPoints.map((pt: string) => `• ${pt}`).join('\n')}\n---------------------------------------------`
    ).join('\n\n');

    navigator.clipboard.writeText(fullText);
    setCopiedAll(true);
    showToast('Copied all 10 screening questions to clipboard');
    setTimeout(() => setCopiedAll(false), 2500);
  };

  const toggleNote = (id: number) => {
    setExpandedNotes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredQuestions = screeningQuestions.filter(q => {
    if (activeFilter === 'technical') return q.category === 'Technical Architecture';
    if (activeFilter === 'experience') return q.category === 'Practical Experience';
    if (activeFilter === 'fit') return q.category === 'Role & Cultural Fit';
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-8 animate-fade-in">
      {/* Module Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wider border border-purple-200 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Workflow 5: Contextual Screening Questions
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            10 Tailored Screening Questions with Rubrics
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            AI-engineered questions based on the Job Description. Covers technical architecture, practical experience, and cultural fit with expected good-answer benchmarks.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={generateQuestions}
            disabled={isLoading}
            className="px-4 py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 font-bold text-xs shadow-2xs transition-colors flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span>{isLoading ? 'Generating Qs...' : 'Regenerate 10 Questions'}</span>
          </button>

          <button
            onClick={handleCopyAll}
            disabled={screeningQuestions.length === 0}
            className="px-4 py-2.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs shadow-2xs transition-colors flex items-center gap-2"
          >
            {copiedAll ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
            <span>{copiedAll ? 'Copied All!' : 'Export All 10 Qs'}</span>
          </button>
        </div>
      </div>

      {/* Category Filter Pills & Distribution */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              activeFilter === 'all'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Questions (10)
          </button>
          <button
            onClick={() => setActiveFilter('technical')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
              activeFilter === 'technical'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>Technical Architecture (4)</span>
          </button>
          <button
            onClick={() => setActiveFilter('experience')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
              activeFilter === 'experience'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Practical Experience (3)</span>
          </button>
          <button
            onClick={() => setActiveFilter('fit')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
              activeFilter === 'fit'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Role & Cultural Fit (3)</span>
          </button>
        </div>

        <span className="text-xs text-slate-400 font-medium">
          Showing {filteredQuestions.length} of {screeningQuestions.length} questions
        </span>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.map((q) => {
          const isCopied = copiedId === q.id;
          const isNoteOpen = expandedNotes[q.id];

          return (
            <div
              key={q.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition-shadow space-y-4"
            >
              {/* Question Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-black text-sm shrink-0">
                    #{q.id}
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`
                        px-2.5 py-0.5 rounded-full text-xs font-bold border
                        ${
                          q.category === 'Technical Architecture'
                            ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                            : q.category === 'Practical Experience'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        }
                      `}
                    >
                      {q.category}
                    </span>

                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 text-slate-600 border border-slate-200">
                      {q.difficulty}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => handleCopySingle(q)}
                    className="p-1.5 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors flex items-center gap-1 text-xs font-semibold"
                    title="Copy question and answer key"
                  >
                    {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    <span className="hidden sm:inline">{isCopied ? 'Copied' : 'Copy'}</span>
                  </button>

                  <button
                    onClick={() => toggleNote(q.id)}
                    className="px-2.5 py-1 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1"
                  >
                    <span>Score / Note</span>
                    {isNoteOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Question Text */}
              <div className="space-y-1">
                <p className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                  {q.question}
                </p>
                {q.intent && (
                  <p className="text-xs text-purple-700 font-medium">
                    Evaluator Intent: {q.intent}
                  </p>
                )}
              </div>

              {/* Expected Good-Answer Benchmarks Box */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Expected Good-Answer Benchmarks (Interviewer Evaluation Key)
                </span>
                <ul className="space-y-1.5 pt-1">
                  {q.goodAnswerPoints.map((pt, pIdx) => (
                    <li key={pIdx} className="text-xs text-slate-700 flex items-start gap-2 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0 mt-1.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recruiter Live Phone Scoring & Notes Drawer */}
              {isNoteOpen && (
                <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-200 space-y-3 animate-fade-in text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-purple-900">Candidate Response Rating:</span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((starVal) => (
                        <button
                          key={starVal}
                          onClick={() => updateQuestionNoteOrScore(q.id, starVal, q.interviewNotes || '')}
                          className={`p-1 transition-colors ${
                            (q.score || 0) >= starVal ? 'text-amber-500' : 'text-slate-300 hover:text-amber-400'
                          }`}
                        >
                          <Star className="w-4 h-4 fill-current" />
                        </button>
                      ))}
                      <span className="font-bold text-purple-800 ml-1.5">
                        {q.score ? `${q.score}/5` : 'Not rated'}
                      </span>
                    </div>
                  </div>

                  <textarea
                    rows={2}
                    value={q.interviewNotes || ''}
                    onChange={(e) => updateQuestionNoteOrScore(q.id, q.score || 0, e.target.value)}
                    placeholder="Record candidate's answer highlights, depth of technical explanation, or follow-up notes..."
                    className="w-full text-xs p-2.5 rounded-lg border border-purple-200 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-800 font-mono"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Step Navigation Footer */}
      <div className="flex justify-end pt-4">
        <button
          onClick={() => setCurrentStep(6)}
          className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
        >
          <span>Proceed to Step 6: Hiring Market Insights</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
