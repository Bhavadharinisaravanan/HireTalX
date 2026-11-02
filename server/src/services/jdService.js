import { callGeminiJSON } from './geminiService.js';
import { sampleJD } from '../data/sampleJD.js';

/**
 * Extract structured JD information from raw text
 * @param {string} rawText 
 * @returns {Promise<Object>}
 */
export async function extractJDInfo(rawText) {
  if (!rawText || rawText.trim().length === 0) {
    return sampleJD;
  }

  // 1. Try Gemini if configured
  const geminiPrompt = `
You are a senior recruitment technology parser. Analyze the following Job Description (JD) and extract the structured information in exact JSON format.

JSON Schema:
{
  "title": string (e.g. "Senior Full Stack & AI Solutions Engineer"),
  "company": string,
  "department": string,
  "location": string,
  "experience": string (e.g. "5-8 Years"),
  "minExperienceYears": number,
  "maxExperienceYears": number,
  "compensationRange": string (e.g. "INR 25-40 LPA" or "Competitive / Not Specified"),
  "education": string,
  "requiredSkills": string[] (mandatory core skills),
  "preferredSkills": string[] (bonus/nice-to-have skills),
  "responsibilities": string[] (key bullet points)
}

Job Description Text:
"""
${rawText.slice(0, 8000)}
"""
`;

  try {
    const aiResult = await callGeminiJSON(geminiPrompt, "You are a professional HR Tech parsing engine.");
    if (aiResult && aiResult.title && Array.isArray(aiResult.requiredSkills)) {
      return {
        ...aiResult,
        id: `jd-${Date.now()}`,
        rawText
      };
    }
  } catch (err) {
    console.warn('Gemini JD parsing failed, falling back to heuristic parser:', err);
  }

  // 2. Intelligent Deterministic Fallback Parser
  return parseJDHeuristically(rawText);
}

/**
 * Deterministic heuristic parser for JD text
 */
function parseJDHeuristically(text) {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);

  let title = "Senior Software & AI Solutions Engineer";
  let company = "Hiring Organization";
  let department = "Engineering & Technology";
  let location = "Bangalore, India (Hybrid / Flexible)";
  let experience = "5-8 Years";
  let minExp = 5;
  let maxExp = 8;
  let compensationRange = "Competitive / Market Standard";
  let education = "Bachelor's / Master's degree in Computer Science or related field";
  
  // Extract title
  for (const line of lines) {
    if (/^(job title|role|position):/i.test(line)) {
      title = line.replace(/^(job title|role|position):/i, '').trim();
      break;
    }
  }

  // Extract experience
  const expMatch = text.match(/(\d+)\s*(?:-|to)\s*(\d+)\s*years?/i);
  if (expMatch) {
    minExp = parseInt(expMatch[1], 10);
    maxExp = parseInt(expMatch[2], 10);
    experience = `${minExp}-${maxExp} Years`;
  }

  // Common technical skill dictionary for matching
  const knownSkills = [
    "React", "TypeScript", "Node.js", "Python", "PostgreSQL", "Docker",
    "LLM Integration / RAG", "RESTful APIs & Microservices", "AWS", "Kubernetes",
    "LangChain", "Vector Databases", "Redis", "CI/CD", "Next.js", "Java",
    "FastAPI", "MongoDB", "GraphQL", "Tailwind CSS", "PyTorch"
  ];

  const foundSkills = [];
  const lowerText = text.toLowerCase();
  for (const s of knownSkills) {
    if (lowerText.includes(s.toLowerCase())) {
      foundSkills.push(s);
    }
  }

  const requiredSkills = foundSkills.length >= 4 
    ? foundSkills.slice(0, 8) 
    : sampleJD.requiredSkills;

  const preferredSkills = foundSkills.length > 8 
    ? foundSkills.slice(8, 14) 
    : sampleJD.preferredSkills;

  // Extract responsibilities
  const responsibilities = [];
  let inRespSection = false;
  for (const line of lines) {
    if (/responsibilit|what you('ll| will) do|duties|scope/i.test(line)) {
      inRespSection = true;
      continue;
    }
    if (inRespSection && /requirements|qualifications|skills|education/i.test(line)) {
      inRespSection = false;
      break;
    }
    if (inRespSection && (line.startsWith('-') || line.startsWith('•') || line.startsWith('*') || /^\d+\./.test(line))) {
      responsibilities.push(line.replace(/^[-•*\d.]\s*/, '').trim());
    }
  }

  return {
    id: `jd-${Date.now()}`,
    title,
    company,
    department,
    location,
    experience,
    minExperienceYears: minExp,
    maxExperienceYears: maxExp,
    compensationRange,
    education,
    requiredSkills: requiredSkills.length > 0 ? requiredSkills : sampleJD.requiredSkills,
    preferredSkills: preferredSkills.length > 0 ? preferredSkills : sampleJD.preferredSkills,
    responsibilities: responsibilities.length >= 3 ? responsibilities.slice(0, 6) : sampleJD.responsibilities,
    rawText: text
  };
}
