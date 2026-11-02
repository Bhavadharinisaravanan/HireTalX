import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  RecruiterPersona,
  JobDescription,
  Candidate,
  ScreeningQuestion,
  MarketInsights,
  SearchStringsResult,
  RecalibrationAudit,
  StepId
} from '../types';

interface RecruitmentContextType {
  currentStep: StepId;
  setCurrentStep: (step: StepId) => void;
  currentUser: RecruiterPersona | null;
  personas: RecruiterPersona[];
  loginAs: (personaId: string) => Promise<void>;
  logout: () => void;
  // JD
  currentJD: JobDescription | null;
  setCurrentJD: (jd: JobDescription | null) => void;
  loadSampleJD: () => Promise<void>;
  parseJDFileOrText: (file?: File, text?: string) => Promise<void>;
  updateJD: (updated: JobDescription) => void;
  // Resumes
  candidates: Candidate[];
  loadSyntheticResumes: () => Promise<void>;
  uploadResumes: (files: File[]) => Promise<void>;
  removeCandidate: (candidateId: string) => void;
  // Ranking & Recalibration
  rankedCandidates: Candidate[];
  rankCandidatesList: () => Promise<void>;
  recalibrateCandidate: (
    candidateId: string,
    adjustments: { [key: string]: number },
    notes: string,
    reason: string
  ) => Promise<void>;
  auditLogs: RecalibrationAudit[];
  selectedCandidate: Candidate | null;
  setSelectedCandidate: (c: Candidate | null) => void;
  // Screening Questions
  screeningQuestions: ScreeningQuestion[];
  generateQuestions: () => Promise<void>;
  updateQuestionNoteOrScore: (id: number, score: number, notes: string) => void;
  // Market Insights
  marketInsights: MarketInsights | null;
  fetchMarketInsights: () => Promise<void>;
  // Search Strings
  searchStrings: SearchStringsResult | null;
  generateSearchStringsData: () => Promise<void>;
  // Global status
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  resetAll: () => void;
}

const RecruitmentContext = createContext<RecruitmentContextType | undefined>(undefined);

const STORAGE_KEY = 'hiretalx_recruitment_state_v1';

export const RecruitmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStepState] = useState<StepId>(1);
  const [currentUser, setCurrentUser] = useState<RecruiterPersona | null>(null);
  const [personas, setPersonas] = useState<RecruiterPersona[]>([]);
  const [currentJD, setCurrentJD] = useState<JobDescription | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [rankedCandidates, setRankedCandidates] = useState<Candidate[]>([]);
  const [auditLogs, setAuditLogs] = useState<RecalibrationAudit[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [screeningQuestions, setScreeningQuestions] = useState<ScreeningQuestion[]>([]);
  const [marketInsights, setMarketInsights] = useState<MarketInsights | null>(null);
  const [searchStrings, setSearchStrings] = useState<SearchStringsResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => prev === msg ? null : prev);
    }, 3500);
  };

  const clearError = () => setError(null);

  const setCurrentStep = (step: StepId) => {
    setCurrentStepState(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Load initial personas and restore state from sessionStorage
  useEffect(() => {
    fetchPersonas();
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.currentStep) setCurrentStepState(parsed.currentStep);
        if (parsed.currentUser) setCurrentUser(parsed.currentUser);
        if (parsed.currentJD) setCurrentJD(parsed.currentJD);
        if (parsed.candidates) setCandidates(parsed.candidates);
        if (parsed.rankedCandidates) setRankedCandidates(parsed.rankedCandidates);
        if (parsed.auditLogs) setAuditLogs(parsed.auditLogs);
        if (parsed.screeningQuestions) setScreeningQuestions(parsed.screeningQuestions);
        if (parsed.marketInsights) setMarketInsights(parsed.marketInsights);
        if (parsed.searchStrings) setSearchStrings(parsed.searchStrings);
      }
    } catch (e) {
      console.warn('Failed to parse saved session state:', e);
    }
  }, []);

  // Save state to sessionStorage
  useEffect(() => {
    try {
      const stateToSave = {
        currentStep,
        currentUser,
        currentJD,
        candidates,
        rankedCandidates,
        auditLogs,
        screeningQuestions,
        marketInsights,
        searchStrings
      };
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (e) {
      console.warn('Failed to persist to sessionStorage:', e);
    }
  }, [
    currentStep,
    currentUser,
    currentJD,
    candidates,
    rankedCandidates,
    auditLogs,
    screeningQuestions,
    marketInsights,
    searchStrings
  ]);

  const fetchPersonas = async () => {
    try {
      const res = await fetch('/api/auth/personas');
      if (res.ok) {
        const data = await res.json();
        setPersonas(data);
      }
    } catch {
      // Fallback default personas
      setPersonas([
        {
          id: "recruiter-01",
          name: "Sarah Jenkins",
          role: "Lead Technical Recruiter",
          team: "Applied AI & Cloud Platforms",
          email: "sarah.jenkins@hiretalx.com",
          avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
          activeRequisitions: 4,
          monthlyQuota: "12 Placements",
          company: "NovaTech Financial Cloud"
        }
      ]);
    }
  };

  const loginAs = async (personaId: string) => {
    setIsLoading(true);
    clearError();
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ personaId })
      });
      const data = await res.json();
      if (data.success && data.user) {
        setCurrentUser(data.user);
        showToast(`Authenticated as ${data.user.name}`);
        setCurrentStep(2);
      } else {
        throw new Error(data.error || 'Authentication failed');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed. Please retry.');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentStep(1);
    showToast('Logged out of recruiter session');
  };

  // Module 2: JD
  const loadSampleJD = async () => {
    setIsLoading(true);
    clearError();
    try {
      const res = await fetch('/api/jd/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ loadSample: true })
      });
      const data = await res.json();
      if (data.success && data.jd) {
        setCurrentJD(data.jd);
        showToast('Sample JD Loaded: Senior Full Stack & AI Solutions Engineer');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load sample JD.');
    } finally {
      setIsLoading(false);
    }
  };

  const parseJDFileOrText = async (file?: File, text?: string) => {
    setIsLoading(true);
    clearError();
    try {
      let res;
      if (file) {
        const formData = new FormData();
        formData.append('jdFile', file);
        res = await fetch('/api/jd/parse', { method: 'POST', body: formData });
      } else {
        res = await fetch('/api/jd/parse', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text })
        });
      }
      const data = await res.json();
      if (data.success && data.jd) {
        setCurrentJD(data.jd);
        showToast(`Successfully extracted JD: ${data.jd.title}`);
      } else {
        throw new Error(data.error || 'Failed to parse Job Description');
      }
    } catch (err: any) {
      setError(err.message || 'JD parsing error.');
    } finally {
      setIsLoading(false);
    }
  };

  const updateJD = (updated: JobDescription) => {
    setCurrentJD(updated);
    showToast('Job Description updated successfully');
  };

  // Module 3: Resumes
  const loadSyntheticResumes = async () => {
    setIsLoading(true);
    clearError();
    try {
      const res = await fetch('/api/resumes/synthetic');
      const data = await res.json();
      if (data.success && Array.isArray(data.candidates)) {
        setCandidates(data.candidates);
        showToast(`Loaded ${data.candidates.length} synthetic candidate resumes`);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load synthetic resumes');
    } finally {
      setIsLoading(false);
    }
  };

  const uploadResumes = async (files: File[]) => {
    if (files.length === 0) return;
    setIsLoading(true);
    clearError();
    try {
      const formData = new FormData();
      files.forEach(f => formData.append('resumes', f));
      const res = await fetch('/api/resumes/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.candidates)) {
        setCandidates(prev => [...prev, ...data.candidates]);
        showToast(`Successfully parsed and added ${data.candidates.length} candidate file(s)`);
      } else {
        throw new Error(data.error || 'Failed to parse files');
      }
    } catch (err: any) {
      setError(err.message || 'Resume upload error.');
    } finally {
      setIsLoading(false);
    }
  };

  const removeCandidate = (candidateId: string) => {
    setCandidates(prev => prev.filter(c => c.id !== candidateId));
    setRankedCandidates(prev => prev.filter(c => c.id !== candidateId));
    showToast('Candidate removed from pool');
  };

  // Module 4: Ranking
  const rankCandidatesList = async () => {
    setIsLoading(true);
    clearError();
    try {
      const listToRank = candidates.length > 0 ? candidates : [];
      const res = await fetch('/api/ranking/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          candidates: listToRank,
          jd: currentJD
        })
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.rankedCandidates)) {
        setRankedCandidates(data.rankedCandidates);
        showToast(`Evaluated & ranked ${data.rankedCandidates.length} candidate(s)`);
      } else {
        throw new Error(data.error || 'Failed to rank candidates');
      }
    } catch (err: any) {
      setError(err.message || 'Ranking calculation error.');
    } finally {
      setIsLoading(false);
    }
  };

  const recalibrateCandidate = async (
    candidateId: string,
    adjustments: { [key: string]: number },
    notes: string,
    reason: string
  ) => {
    setIsLoading(true);
    clearError();
    try {
      const target = rankedCandidates.find(c => c.id === candidateId) || candidates.find(c => c.id === candidateId);
      if (!target) throw new Error('Candidate not found');

      const res = await fetch('/api/ranking/recalibrate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          candidate: target,
          originalScore: target.overallScore || 70,
          categoryAdjustments: adjustments,
          recruiterNotes: notes,
          reason
        })
      });

      const data = await res.json();
      if (data.success && data.recalibrated) {
        const audit: RecalibrationAudit = data.recalibrated;
        setAuditLogs(prev => [audit, ...prev]);

        // Update in rankedCandidates
        setRankedCandidates(prev =>
          prev.map(c => {
            if (c.id === candidateId) {
              return {
                ...c,
                overallScore: audit.correctedScore,
                scoreBreakdown: audit.scoreBreakdown,
                isRecalibrated: true
              };
            }
            return c;
          }).sort((a, b) => (b.overallScore || 0) - (a.overallScore || 0))
        );

        if (selectedCandidate && selectedCandidate.id === candidateId) {
          setSelectedCandidate(prev => prev ? {
            ...prev,
            overallScore: audit.correctedScore,
            scoreBreakdown: audit.scoreBreakdown,
            isRecalibrated: true
          } : null);
        }

        showToast(`AI Recalibration Complete! Score adjusted by ${audit.delta >= 0 ? '+' : ''}${audit.delta} pts.`);
      }
    } catch (err: any) {
      setError(err.message || 'Recalibration error');
    } finally {
      setIsLoading(false);
    }
  };

  // Module 5: Screening
  const generateQuestions = async () => {
    setIsLoading(true);
    clearError();
    try {
      const res = await fetch('/api/screening/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jd: currentJD })
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.questions)) {
        setScreeningQuestions(data.questions);
        showToast('Generated 10 contextual screening questions');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to generate screening questions');
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuestionNoteOrScore = (id: number, score: number, notes: string) => {
    setScreeningQuestions(prev =>
      prev.map(q => q.id === id ? { ...q, score, interviewNotes: notes } : q)
    );
  };

  // Module 6: Market
  const fetchMarketInsights = async () => {
    setIsLoading(true);
    clearError();
    try {
      const role = currentJD?.title || "Senior Full Stack & AI Solutions Engineer";
      const loc = currentJD?.location || "Bangalore, India";
      const res = await fetch(`/api/market/insights?role=${encodeURIComponent(role)}&location=${encodeURIComponent(loc)}`);
      const data = await res.json();
      if (data.success && data.insights) {
        setMarketInsights(data.insights);
        showToast('Loaded real-time talent market benchmarks');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch market insights');
    } finally {
      setIsLoading(false);
    }
  };

  // Module 7: Search Strings
  const generateSearchStringsData = async () => {
    setIsLoading(true);
    clearError();
    try {
      const res = await fetch('/api/search-strings/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jd: currentJD })
      });
      const data = await res.json();
      if (data.success && data.strings) {
        setSearchStrings(data.strings);
        showToast('Generated Boolean & Plain-Language search strings');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to generate search strings');
    } finally {
      setIsLoading(false);
    }
  };

  const resetAll = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setCurrentStep(1);
    setCurrentUser(null);
    setCurrentJD(null);
    setCandidates([]);
    setRankedCandidates([]);
    setAuditLogs([]);
    setSelectedCandidate(null);
    setScreeningQuestions([]);
    setMarketInsights(null);
    setSearchStrings(null);
    showToast('Workflow reset to clean initial state');
  };

  return (
    <RecruitmentContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        currentUser,
        personas,
        loginAs,
        logout,
        currentJD,
        setCurrentJD,
        loadSampleJD,
        parseJDFileOrText,
        updateJD,
        candidates,
        loadSyntheticResumes,
        uploadResumes,
        removeCandidate,
        rankedCandidates,
        rankCandidatesList,
        recalibrateCandidate,
        auditLogs,
        selectedCandidate,
        setSelectedCandidate,
        screeningQuestions,
        generateQuestions,
        updateQuestionNoteOrScore,
        marketInsights,
        fetchMarketInsights,
        searchStrings,
        generateSearchStringsData,
        isLoading,
        error,
        clearError,
        toastMessage,
        showToast,
        resetAll
      }}
    >
      {children}
    </RecruitmentContext.Provider>
  );
};

export const useRecruitment = () => {
  const context = useContext(RecruitmentContext);
  if (!context) {
    throw new Error('useRecruitment must be used within a RecruitmentProvider');
  }
  return context;
};
