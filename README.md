# HireTalX – Intelligent Talent Acquisition Assistant

> **Enterprise Talent Intelligence Platform** demonstrating all seven mandatory recruitment workflows in a unified, full-stack application. Built with React, TypeScript, Tailwind CSS, Node.js Express, Google Gemini, PDF.js, and Mammoth.

---

## 🌟 Key Features & The 7 Mandatory Workflows

### 1. Recruiter Authentication & Multi-Persona Workspace
- **Enterprise Profile Switcher**: Authenticate as specialized technical recruiters (e.g., *Sarah Jenkins – Lead Technical Recruiter* or *Karthik Subramanian – Senior Talent Acquisition Specialist*).
- **Session Persistence**: Automated `sessionStorage` synchronization preserves recruiter state, active requisitions, and audit trails across page refreshes.
- **Enterprise Security**: Role-based access control and certified SSO guardrails.

### 2. Job Description Ingestion & Extraction (PDF, DOCX, Text)
- **Multi-Format Ingestion**: Upload `.pdf` (parsed via PDF parser engine), `.docx` (parsed via Mammoth), or paste raw text.
- **Structured Schema Extraction**: Parser extracts Job Title, Company, Department, Experience Range, Required Core Skills, Preferred Competencies, and Responsibilities.
- **Recruiter Editability**: Inline interactive editor allowing recruiters to modify, add, or delete required skills and responsibilities prior to candidate ranking.
- **1-Click Engineering Role**: Instantly loads a comprehensive *Senior Full Stack & AI Solutions Engineer* JD.

### 3. Multiple Resume Ingestion & Deep Parsing
- **Multi-File Drag & Drop**: Concurrently accepts multiple PDF and DOCX resume files with live parsing indicators.
- **Document Extractors**: High-fidelity text extraction via `pdf-parse` / `PDF.js` and `mammoth`.
- **Pre-Screened Candidate Pool (5 Profiles)**:
  1. *Aravind Sharma* – Lead Full Stack & AI Engineer (Score ~92/100)
  2. *Priya Venkat* – Senior Backend & Cloud Platform Engineer (Score ~84/100)
  3. *Marcus Chen* – Senior Machine Learning & Data Infrastructure Engineer (Score ~72/100)
  4. *Neha Kapoor* – Senior Frontend & Web Applications Engineer (Score ~58/100)
  5. *David Miller* – Principal Legacy Systems & Java Architect (Score ~42/100)

### 4. Transparent 100-Point Candidate Ranking & Recalibration Audit
- **Transparent 100-Point Scoring Rubric**:
  - **Technical Skills Match (40 pts)**: Mandatory (30 pts) and preferred (10 pts) stack alignment.
  - **Experience Depth & Seniority (25 pts)**: Years of experience relative to JD seniority curve.
  - **Project Relevance & Scale (20 pts)**: High-scale distributed systems and production AI pipeline throughput.
  - **Education & Domain Foundation (15 pts)**: Accredited engineering/CS degree alignment.
- **Blind Assessment Guarantee**: Strictly **zero weight** on protected demographic attributes (gender, age, ethnicity, nationality, marital status, or photo).
- **Evidence-Based Explanations**: Verbatim quotes and verifiable achievements extracted directly from the candidate's resume justifying each dimension.
- **Human-in-the-Loop Recalibration Audit**: Recruiters can challenge an automated score (e.g. specialized Triton inference or proprietary distributed ledger experience under-weighted by keyword parsers), apply category adjustments, and generate an audited **Original Score vs. Corrected Score** delta with recruiter notes.

### 5. Contextual Screening Questions (Exactly 10 Questions with Rubrics)
- **Contextual Generation**: Tailored to the active JD's technical stack and responsibilities.
- **Structured Categorization**:
  - Technical Architecture & Code (4 questions)
  - Practical Experience & Incident Resolution (3 questions)
  - Role & Cultural Alignment (3 questions)
- **Expected Good-Answer Benchmarks**: Recruiter evaluation guide detailing concrete points to look for in exceptional candidate responses.
- **Interactive Recruiter Scorekeeper**: Live 1-5 star ratings and interview note-taking drawer.
- **Export & Copy**: 1-click clipboard export for all 10 questions or individual questions.

### 6. Hiring Market Intelligence & Compensation Benchmarks
- **Comparable Public Job Postings**: Real public job openings from top technology firms (Razorpay, CRED, Swiggy, Thoughtworks, etc.) with role, experience, compensation (INR LPA and USD), location, and source URL.
- **Explicit Verification Badges**: Distinctly labeled as `[Verified Public Posting]` or `[Estimated Market Benchmark]`.
- **Market Salary Distribution**: 25th percentile, Median (50th), 75th percentile, and 90th percentile salary benchmarks with visual distribution bar.
- **Zero-Scraping Compliance**: Complies strictly with portal terms of service (no scraping or authenticated sessions of LinkedIn or Naukri).

### 7. Talent Sourcing Search String Generator
- **Naukri Boolean Search**: Formatted with `AND`, `OR`, `NOT`, and bracket groupings optimized for Naukri Resdex.
- **Naukri Plain-Language**: Comma-separated keyword density string for quick recruiter filter tags.
- **LinkedIn Boolean Search**: Structured with title filters and keyword groupings for LinkedIn Recruiter (`title:"..." AND "..." NOT "..."`).
- **LinkedIn Plain-Language**: Semantic natural language search string tailored for modern LinkedIn algorithms.
- **1-Click Copy**: Instant clipboard copying with visual toast notifications.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, TypeScript, Vite 8, Tailwind CSS, Lucide Icons, Canvas Confetti |
| **Backend** | Node.js, Express, Multer (in-memory uploads), CORS, Dotenv |
| **Inference Engine** | Google Gemini API (`@google/generative-ai`), Deterministic Heuristic Engine |
| **Document Parsers** | `pdf-parse` (PDF extraction), `mammoth` (DOCX extraction) |
| **Design System** | Enterprise Navy (`#0f172a`), Subtle Purple Accents (`#7c3aed`), White Backgrounds |

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js** (v18.0 or higher recommended, tested on v22.x)
- **npm** (v9.0 or higher)

### 1. Repository Setup
```bash
# Clone or navigate to the repository directory
cd HireTalX
```

### 2. Backend Setup
```bash
cd server
npm install

# (Optional) Add your Gemini API key in server/.env
# If left blank, HireTalX automatically operates in resilient fallback mode!
# GEMINI_API_KEY=your_gemini_api_key_here

# Start the backend server (Port 5000)
npm start
```

### 3. Frontend Setup
In a new terminal:
```bash
cd client
npm install

# Start the Vite development server (Port 5173)
npm run dev
```

### 4. Access the Application
Open your browser and navigate to:
```
http://localhost:5173/
```

---

## 📄 Architecture & Tech Stack PDF Documentation

A complete 6-page technical architecture and workflow specification document is available at:
`HireTalX_Workflow_and_TechStack_Architecture.pdf`
