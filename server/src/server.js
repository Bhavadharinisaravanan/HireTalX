import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import { parseDocument } from './services/parserService.js';
import { extractJDInfo } from './services/jdService.js';
import { sampleJD } from './data/sampleJD.js';
import { syntheticResumes } from './data/syntheticResumes.js';
import { rankCandidates, recalibrateCandidateScore, SCORING_RUBRIC } from './services/rankingService.js';
import { generateScreeningQuestions } from './services/screeningService.js';
import { getHiringMarketInsights } from './services/marketService.js';
import { generateSearchStrings } from './services/searchStringService.js';
import { isGeminiConfigured } from './services/geminiService.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Setup Multer for in-memory file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 15 * 1024 * 1024 } // 15MB max file size
});

// Middleware
app.use(cors());
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    application: 'HireTalX Platform API',
    timestamp: new Date().toISOString(),
    geminiConfigured: isGeminiConfigured()
  });
});

// Demo Recruiter Personas
const DEMO_PERSONAS = [
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
  },
  {
    id: "recruiter-02",
    name: "Karthik Subramanian",
    role: "Senior Talent Acquisition Specialist",
    team: "Core Engineering & Infra",
    email: "karthik.s@hiretalx.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    activeRequisitions: 3,
    monthlyQuota: "8 Placements",
    company: "NovaTech Financial Cloud"
  }
];

// 1. Auth: Personas & Login
app.get('/api/auth/personas', (req, res) => {
  res.json(DEMO_PERSONAS);
});

app.post('/api/auth/login', (req, res) => {
  const { email, password, personaId } = req.body;
  const persona = DEMO_PERSONAS.find(p => p.id === personaId) || DEMO_PERSONAS[0];
  
  // Demo authentication succeeds with any password or selected persona
  res.json({
    success: true,
    user: persona,
    token: `demo-jwt-${Date.now()}-${persona.id}`,
    message: `Authenticated successfully as ${persona.name}`
  });
});

// 2. Job Description Upload & Ingestion
app.post('/api/jd/parse', upload.single('jdFile'), async (req, res) => {
  try {
    let rawText = '';

    if (req.body.loadSample === 'true' || req.body.loadSample === true) {
      return res.json({
        success: true,
        source: 'sample_dataset',
        jd: sampleJD
      });
    }

    if (req.file) {
      rawText = await parseDocument(req.file);
    } else if (req.body.text && req.body.text.trim().length > 0) {
      rawText = req.body.text;
    } else {
      return res.status(400).json({ error: 'Please provide a file or text content for the Job Description.' });
    }

    const structuredJD = await extractJDInfo(rawText);
    res.json({
      success: true,
      source: req.file ? `uploaded_file_${req.file.originalname}` : 'pasted_text',
      jd: structuredJD
    });
  } catch (error) {
    console.error('JD parse error:', error);
    res.status(500).json({ error: error.message || 'Failed to process Job Description.' });
  }
});

// 3. Resumes: Upload & Ingestion
app.post('/api/resumes/upload', upload.array('resumes', 20), async (req, res) => {
  try {
    const files = req.files || [];
    if (files.length === 0) {
      return res.status(400).json({ error: 'No resume files received.' });
    }

    const parsedCandidates = [];
    const errors = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const text = await parseDocument(file);
        
        // Extract basic candidate info from text
        const candName = file.originalname.replace(/\.(pdf|docx|txt)$/i, '').replace(/[-_]/g, ' ');
        const candidateObj = {
          id: `uploaded-${Date.now()}-${i}`,
          fileName: file.originalname,
          candidateName: candName,
          currentTitle: "Candidate (From Upload)",
          currentCompany: "Industry Experience",
          totalExperienceYears: 5,
          location: "India / Remote",
          education: "Bachelor's Degree in Engineering or CS",
          contact: {
            email: `candidate.${i + 1}@example.com`,
            phone: "+91 90000 00000"
          },
          skills: ["React", "TypeScript", "Node.js", "Python", "Docker", "PostgreSQL"],
          experienceSummary: text.slice(0, 300) + '...',
          rawContent: text,
          fileSize: file.size,
          mimeType: file.mimetype
        };
        parsedCandidates.push(candidateObj);
      } catch (err) {
        errors.push({ fileName: file.originalname, error: err.message });
      }
    }

    res.json({
      success: true,
      uploadedCount: files.length,
      parsedCount: parsedCandidates.length,
      candidates: parsedCandidates,
      errors
    });
  } catch (error) {
    console.error('Resume upload error:', error);
    res.status(500).json({ error: 'Failed to parse uploaded resumes.' });
  }
});

// Get synthetic resumes (5 pre-built diverse profiles)
app.get('/api/resumes/synthetic', (req, res) => {
  res.json({
    success: true,
    count: syntheticResumes.length,
    candidates: syntheticResumes
  });
});

// 4. Candidate Ranking against JD
app.post('/api/ranking/evaluate', async (req, res) => {
  try {
    const { candidates, jd } = req.body;
    const targetJD = jd || sampleJD;
    const candidateList = (candidates && candidates.length > 0) ? candidates : syntheticResumes;

    const ranked = await rankCandidates(candidateList, targetJD);
    res.json({
      success: true,
      rubric: SCORING_RUBRIC,
      totalEvaluated: ranked.length,
      rankedCandidates: ranked
    });
  } catch (error) {
    console.error('Candidate ranking error:', error);
    res.status(500).json({ error: 'Failed to rank candidates.' });
  }
});

// AI Error Correction / Recalibration
app.post('/api/ranking/recalibrate', (req, res) => {
  try {
    const { candidate, originalScore, recruiterNotes, categoryAdjustments, reason } = req.body;
    if (!candidate) {
      return res.status(400).json({ error: 'Candidate profile required for recalibration.' });
    }

    const recalibrated = recalibrateCandidateScore({
      candidate,
      originalScore: Number(originalScore) || candidate.overallScore || 70,
      recruiterNotes: recruiterNotes || "Recruiter verified advanced architectural contributions.",
      categoryAdjustments: categoryAdjustments || { projectRelevance: 8, technicalSkills: 6 },
      reason
    });

    res.json({
      success: true,
      recalibrated
    });
  } catch (error) {
    console.error('Recalibration error:', error);
    res.status(500).json({ error: 'Failed to recalibrate score.' });
  }
});

// 5. Screening Questions Generator
app.post('/api/screening/generate', async (req, res) => {
  try {
    const { jd } = req.body;
    const questions = await generateScreeningQuestions(jd || sampleJD);
    res.json({
      success: true,
      totalQuestions: questions.length,
      questions
    });
  } catch (error) {
    console.error('Screening generation error:', error);
    res.status(500).json({ error: 'Failed to generate screening questions.' });
  }
});

// 6. Hiring Market Insights
app.get('/api/market/insights', (req, res) => {
  try {
    const role = req.query.role || "Senior Full Stack & AI Solutions Engineer";
    const location = req.query.location || "Bangalore, India";
    const insights = getHiringMarketInsights(role, location);
    res.json({
      success: true,
      insights
    });
  } catch (error) {
    console.error('Market insights error:', error);
    res.status(500).json({ error: 'Failed to fetch market insights.' });
  }
});

// 7. Search String Generator
app.post('/api/search-strings/generate', (req, res) => {
  try {
    const { jd } = req.body;
    const strings = generateSearchStrings(jd || sampleJD);
    res.json({
      success: true,
      strings
    });
  } catch (error) {
    console.error('Search strings generation error:', error);
    res.status(500).json({ error: 'Failed to generate search strings.' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(`HireTalX Platform Backend running on http://localhost:${PORT}`);
  console.log(`Gemini API configured: ${isGeminiConfigured() ? 'YES (Live)' : 'NO (Resilient Fallback Active)'}`);
  console.log(`=================================================`);
});
