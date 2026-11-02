export interface RecruiterPersona {
  id: string;
  name: string;
  role: string;
  team: string;
  email: string;
  avatar: string;
  activeRequisitions: number;
  monthlyQuota: string;
  company: string;
}

export interface JobDescription {
  id: string;
  title: string;
  company: string;
  department: string;
  location: string;
  experience: string;
  minExperienceYears: number;
  maxExperienceYears: number;
  compensationRange: string;
  education: string;
  requiredSkills: string[];
  preferredSkills: string[];
  responsibilities: string[];
  rawText?: string;
}

export interface CandidateContact {
  email: string;
  phone: string;
  linkedin?: string;
}

export interface CandidateProject {
  name: string;
  role: string;
  description: string;
  impact?: string;
}

export interface ScoreBreakdown {
  technicalSkills: number;
  experienceDepth: number;
  projectRelevance: number;
  educationCertifications: number;
}

export interface Candidate {
  id: string;
  fileName: string;
  candidateName: string;
  currentTitle: string;
  currentCompany: string;
  totalExperienceYears: number;
  location: string;
  education: string;
  contact?: CandidateContact;
  skills: string[];
  experienceSummary: string;
  projects?: CandidateProject[];
  rawContent?: string;
  fileSize?: number;
  mimeType?: string;
  // Ranking & AI Evaluation fields
  overallScore?: number;
  scoreBreakdown?: ScoreBreakdown;
  matchedSkills?: string[];
  missingSkills?: string[];
  evidenceQuotes?: string[];
  evaluationSummary?: string;
  strengths?: string[];
  areasForImprovement?: string[];
  biasAuditStatement?: string;
  isRecalibrated?: boolean;
  rank?: number;
  matchTier?: string;
  badgeColor?: string;
}

export interface RecalibrationAudit {
  candidateId: string;
  candidateName: string;
  originalScore: number;
  correctedScore: number;
  delta: number;
  scoreBreakdown: ScoreBreakdown;
  recruiterNotes: string;
  recalibrationReason: string;
  auditId: string;
  auditTimestamp: string;
  isRecalibrated: boolean;
}

export interface ScreeningQuestion {
  id: number;
  category: "Technical Architecture" | "Practical Experience" | "Role & Cultural Fit";
  question: string;
  intent: string;
  difficulty: "Fundamental" | "Intermediate" | "Advanced";
  goodAnswerPoints: string[];
  interviewNotes?: string;
  score?: number; // 0 to 5 score
}

export interface ComparableJobPosting {
  id: string;
  company: string;
  logoLetter: string;
  badgeClass: string;
  jobRole: string;
  experience: string;
  compensation: string;
  compensationNum: number;
  location: string;
  source: string;
  sourceUrl: string;
  isVerified: boolean;
  verificationLabel: string;
  postedDate: string;
  skills: string[];
}

export interface SalaryDistribution {
  currency: string;
  unit: string;
  percentile25: { value: number; formatted: string };
  median50: { value: number; formatted: string };
  percentile75: { value: number; formatted: string };
  percentile90: { value: number; formatted: string };
  marketTrend: string;
}

export interface MarketInsights {
  roleTitle: string;
  targetLocation: string;
  comparableJobPostings: ComparableJobPosting[];
  salaryDistribution: SalaryDistribution;
  talentMarketMetrics: {
    demandIndex: string;
    supplyShortage: string;
    averageTimeToHireDays: number;
    typicalNoticePeriod: string;
    preferredCandidateLocations: string[];
  };
  complianceNotice: string;
  lastRefreshed: string;
}

export interface SearchStringGroup {
  boolean: string;
  plain: string;
  charCountBoolean: number;
  tips: string;
}

export interface SearchStringsResult {
  naukri: SearchStringGroup;
  linkedin: SearchStringGroup;
  roleMetadata: {
    title: string;
    targetExperience: string;
    primaryLocation: string;
    coreKeywords: string[];
  };
}

export type StepId = 1 | 2 | 3 | 4 | 5 | 6 | 7;
