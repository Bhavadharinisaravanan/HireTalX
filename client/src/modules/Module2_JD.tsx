import React, { useState } from 'react';
import { useRecruitment } from '../context/RecruitmentContext';
import {
  FileText,
  UploadCloud,
  Edit3,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Plus,
  Trash2,
  FileCheck,
  Building2,
  MapPin,
  Clock,
  Layers,
  Save
} from 'lucide-react';

export const Module2_JD: React.FC = () => {
  const { currentJD, loadSampleJD, parseJDFileOrText, updateJD, isLoading, setCurrentStep } = useRecruitment();

  const [inputMode, setInputMode] = useState<'upload' | 'paste'>('upload');
  const [pastedText, setPastedText] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Editable local state
  const [editTitle, setEditTitle] = useState<string>('');
  const [editCompany, setEditCompany] = useState<string>('');
  const [editLocation, setEditLocation] = useState<string>('');
  const [editExperience, setEditExperience] = useState<string>('');
  const [editRequiredSkills, setEditRequiredSkills] = useState<string[]>([]);
  const [editPreferredSkills, setEditPreferredSkills] = useState<string[]>([]);
  const [editResponsibilities, setEditResponsibilities] = useState<string[]>([]);
  const [newReqSkill, setNewReqSkill] = useState<string>('');
  const [newPrefSkill, setNewPrefSkill] = useState<string>('');

  const initEditState = () => {
    if (currentJD) {
      setEditTitle(currentJD.title);
      setEditCompany(currentJD.company);
      setEditLocation(currentJD.location);
      setEditExperience(currentJD.experience);
      setEditRequiredSkills([...currentJD.requiredSkills]);
      setEditPreferredSkills([...currentJD.preferredSkills]);
      setEditResponsibilities([...currentJD.responsibilities]);
      setIsEditing(true);
    }
  };

  const handleSaveEdits = () => {
    if (!currentJD) return;
    const updated = {
      ...currentJD,
      title: editTitle,
      company: editCompany,
      location: editLocation,
      experience: editExperience,
      requiredSkills: editRequiredSkills,
      preferredSkills: editPreferredSkills,
      responsibilities: editResponsibilities
    };
    updateJD(updated);
    setIsEditing(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      await parseJDFileOrText(file, undefined);
    }
  };

  const handlePasteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pastedText.trim().length > 10) {
      await parseJDFileOrText(undefined, pastedText);
    }
  };

  const handleRemoveReqSkill = (index: number) => {
    setEditRequiredSkills(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddReqSkill = () => {
    if (newReqSkill.trim()) {
      setEditRequiredSkills(prev => [...prev, newReqSkill.trim()]);
      setNewReqSkill('');
    }
  };

  const handleRemovePrefSkill = (index: number) => {
    setEditPreferredSkills(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddPrefSkill = () => {
    if (newPrefSkill.trim()) {
      setEditPreferredSkills(prev => [...prev, newPrefSkill.trim()]);
      setNewPrefSkill('');
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 space-y-8 animate-fade-in">
      {/* Module Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wider border border-purple-200 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Workflow 2: Job Description Ingestion & Parsing
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Job Description Upload & Skill Extraction
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Accepts PDF, DOCX or pasted text. AI extracts structured skills, qualifications, and role requirements with complete recruiter editability.
          </p>
        </div>

        <button
          onClick={loadSampleJD}
          disabled={isLoading}
          className="px-4 py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 font-bold text-xs shadow-2xs transition-colors flex items-center gap-2 shrink-0 self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4 text-purple-600" />
          <span>Import Standard Engineering JD</span>
        </button>
      </div>

      {/* Input Options (Tabs) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-4 text-xs font-bold">
          <button
            onClick={() => setInputMode('upload')}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
              inputMode === 'upload'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <UploadCloud className="w-4 h-4" />
            <span>Upload Document (PDF / DOCX / TXT)</span>
          </button>
          <button
            onClick={() => setInputMode('paste')}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
              inputMode === 'paste'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Paste Raw JD Text</span>
          </button>
        </div>

        {inputMode === 'upload' ? (
          /* File Upload Box */
          <div className="border-2 border-dashed border-slate-300 hover:border-purple-400 rounded-2xl p-8 text-center transition-all bg-slate-50/50 hover:bg-purple-50/20 group">
            <input
              type="file"
              id="jdFileInput"
              accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
              onChange={handleFileUpload}
              className="hidden"
            />
            <label htmlFor="jdFileInput" className="cursor-pointer flex flex-col items-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform shadow-xs">
                <UploadCloud className="w-7 h-7" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">
                  {selectedFile ? selectedFile.name : 'Click to upload or drag & drop Job Description'}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Supports PDF (pdf-parse), DOCX (mammoth), and UTF-8 plain text documents
                </p>
              </div>
              <span className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50">
                {isLoading ? 'Extracting JD Content...' : 'Browse Computer Files'}
              </span>
            </label>
          </div>
        ) : (
          /* Paste Box */
          <form onSubmit={handlePasteSubmit} className="space-y-3">
            <textarea
              rows={6}
              value={pastedText}
              onChange={(e) => setPastedText(e.target.value)}
              placeholder="Paste complete Job Description text here including title, responsibilities, and required qualifications..."
              className="w-full text-xs p-3.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono text-slate-800"
            />
            <button
              type="submit"
              disabled={isLoading || pastedText.trim().length === 0}
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-xs transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Parsing Text...' : 'Parse & Extract JD Structure'}
            </button>
          </form>
        )}
      </div>

      {/* Extracted Structured Information Display */}
      {currentJD && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                <FileCheck className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">{currentJD.title}</h2>
                <p className="text-xs text-slate-500">{currentJD.company} • {currentJD.department}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {!isEditing ? (
                <button
                  onClick={initEditState}
                  className="px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1.5"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Extracted Fields</span>
                </button>
              ) : (
                <button
                  onClick={handleSaveEdits}
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </button>
              )}

              <button
                onClick={() => setCurrentStep(3)}
                className="px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <span>Proceed to Step 3: Resumes</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {isEditing ? (
            /* Edit Form Mode */
            <div className="space-y-4 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Role Title</label>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Hiring Company</label>
                  <input
                    type="text"
                    value={editCompany}
                    onChange={(e) => setEditCompany(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Work Location</label>
                  <input
                    type="text"
                    value={editLocation}
                    onChange={(e) => setEditLocation(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Required Experience Range</label>
                  <input
                    type="text"
                    value={editExperience}
                    onChange={(e) => setEditExperience(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              {/* Required Skills Editor */}
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-bold text-slate-700">Required Skills</label>
                <div className="flex flex-wrap gap-2">
                  {editRequiredSkills.map((s, idx) => (
                    <span key={idx} className="flex items-center gap-1.5 px-3 py-1 rounded-md text-xs bg-purple-50 text-purple-700 border border-purple-200">
                      {s}
                      <button type="button" onClick={() => handleRemoveReqSkill(idx)} className="hover:text-rose-600">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2 pt-1">
                  <input
                    type="text"
                    value={newReqSkill}
                    onChange={(e) => setNewReqSkill(e.target.value)}
                    placeholder="Add required skill (e.g. Docker, LangChain)..."
                    className="text-xs p-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-purple-500 flex-1"
                  />
                  <button
                    type="button"
                    onClick={handleAddReqSkill}
                    className="px-3 py-1.5 rounded-lg bg-purple-600 text-white text-xs font-bold hover:bg-purple-700"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Preferred Skills Editor */}
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-bold text-slate-700">Preferred / Bonus Skills</label>
                <div className="flex flex-wrap gap-2">
                  {editPreferredSkills.map((s, idx) => (
                    <span key={idx} className="flex items-center gap-1.5 px-3 py-1 rounded-md text-xs bg-slate-100 text-slate-700 border border-slate-200">
                      {s}
                      <button type="button" onClick={() => handleRemovePrefSkill(idx)} className="hover:text-rose-600">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2 pt-1">
                  <input
                    type="text"
                    value={newPrefSkill}
                    onChange={(e) => setNewPrefSkill(e.target.value)}
                    placeholder="Add preferred skill (e.g. Kubernetes, pgvector)..."
                    className="text-xs p-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-purple-500 flex-1"
                  />
                  <button
                    type="button"
                    onClick={handleAddPrefSkill}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 text-white text-xs font-bold hover:bg-slate-900"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Read-Only Extracted Cards Mode */
            <div className="space-y-6">
              {/* Top Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-purple-600" />
                    Experience Requirement
                  </span>
                  <p className="text-base font-bold text-slate-900 mt-1">{currentJD.experience}</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-purple-600" />
                    Target Location
                  </span>
                  <p className="text-base font-bold text-slate-900 mt-1">{currentJD.location}</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-purple-600" />
                    Target Compensation
                  </span>
                  <p className="text-xs font-bold text-slate-900 mt-1 truncate">{currentJD.compensationRange}</p>
                </div>
              </div>

              {/* Skills Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-purple-700 mb-2">
                    Required Core Competencies ({currentJD.requiredSkills.length})
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {currentJD.requiredSkills.map((skill, idx) => (
                      <span key={idx} className="px-3 py-1 rounded-md text-xs font-semibold bg-purple-50 text-purple-800 border border-purple-200">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                    Preferred / Bonus Competencies ({currentJD.preferredSkills.length})
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {currentJD.preferredSkills.map((skill, idx) => (
                      <span key={idx} className="px-3 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Responsibilities */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
                  Core Responsibilities
                </h3>
                <ul className="space-y-2">
                  {currentJD.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
