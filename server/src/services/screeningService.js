import { callGeminiJSON } from './geminiService.js';

/**
 * Generate exactly 10 contextual screening questions based on the JD
 * @param {Object} jd 
 * @returns {Promise<Array>}
 */
export async function generateScreeningQuestions(jd) {
  // 1. Try Gemini generation if available
  const geminiPrompt = `
You are an expert technical recruiter and hiring manager.
Generate EXACTLY 10 rigorous screening interview questions for this role:
Role: ${jd.title}
Required Skills: ${JSON.stringify(jd.requiredSkills)}
Preferred Skills: ${JSON.stringify(jd.preferredSkills)}
Experience: ${jd.experience}
Responsibilities: ${JSON.stringify(jd.responsibilities)}

REQUIREMENTS:
- Exactly 10 questions total.
- Exactly 4 Technical Architecture questions.
- Exactly 3 Practical Experience & Problem-Solving questions.
- Exactly 3 Role / Cultural Fit questions.
- For each question, provide 3 to 4 concrete "expectedGoodAnswerPoints" (bullet points the interviewer should look for).

Return JSON array with 10 objects:
[
  {
    "id": number (1 to 10),
    "category": "Technical Architecture" | "Practical Experience" | "Role & Cultural Fit",
    "question": string,
    "intent": string,
    "difficulty": "Intermediate" | "Advanced",
    "goodAnswerPoints": string[]
  }
]
`;

  try {
    const aiResult = await callGeminiJSON(geminiPrompt, "You are an expert talent acquisition assessment architect.");
    if (Array.isArray(aiResult) && aiResult.length === 10) {
      return aiResult.map((q, idx) => ({
        ...q,
        id: idx + 1,
        interviewNotes: "",
        score: 0
      }));
    }
  } catch (err) {
    console.warn('Gemini screening generation failed, falling back to contextual generator:', err.message);
  }

  // 2. High-quality default screening questions suite (exactly 10)
  return getDefaultScreeningQuestions(jd);
}

function getDefaultScreeningQuestions(jd) {
  return [
    // 1-4: Technical Architecture & Code
    {
      id: 1,
      category: "Technical Architecture",
      difficulty: "Advanced",
      intent: "Evaluates production-grade Generative AI and RAG pipeline engineering.",
      question: "In building a production Retrieval-Augmented Generation (RAG) system with LLMs, how do you handle hallucination prevention, chunking strategies for dense technical documents, and vector similarity thresholding?",
      goodAnswerPoints: [
        "Discusses dynamic semantic chunking with overlapping windows (e.g. 500-1000 tokens with 10% overlap).",
        "Mentions hybrid search (combining dense vector embeddings with sparse BM25 keyword search) to prevent false positives.",
        "Articulates evaluation metrics like RAGAS (faithfulness, answer relevancy, context precision).",
        "Mentions guardrails, prompt constraint techniques, and grounding source verification."
      ],
      interviewNotes: "",
      score: 0
    },
    {
      id: 2,
      category: "Technical Architecture",
      difficulty: "Advanced",
      intent: "Tests deep knowledge of full-stack TypeScript/React state and async streaming.",
      question: "When streaming real-time tokens from an LLM API to a React 18 client, how do you prevent re-rendering bottlenecks and ensure smooth 60fps rendering without UI freeze?",
      goodAnswerPoints: [
        "Recommends using Server-Sent Events (SSE) or WebSockets with ReadableStream decoder.",
        "Suggests throttling UI state updates via requestAnimationFrame or React 18 startTransition / useDeferredValue.",
        "Avoids parsing entire JSON blobs on every single token; buffers deltas before triggering component reconciliation.",
        "Manages auto-scroll behavior without blocking user manual scroll interaction."
      ],
      interviewNotes: "",
      score: 0
    },
    {
      id: 3,
      category: "Technical Architecture",
      difficulty: "Intermediate",
      intent: "Evaluates relational database design, indexing, and transactional integrity.",
      question: "How do you design a PostgreSQL schema and indexing strategy for a high-concurrency ledger that experiences 10,000 writes per second while requiring ACID compliance?",
      goodAnswerPoints: [
        "Discusses database partitioning (range/hash partitioning by timestamp or tenant ID).",
        "Recommends optimistic concurrency control or row-level locking (SELECT ... FOR UPDATE) to avoid race conditions.",
        "Mentions connection pooling (PgBouncer) and read replicas to offload read-heavy reporting queries.",
        "Explains BRIN or partial indexes to keep B-tree indexes compact in memory."
      ],
      interviewNotes: "",
      score: 0
    },
    {
      id: 4,
      category: "Technical Architecture",
      difficulty: "Advanced",
      intent: "Assesses microservice resilience, containerization, and distributed tracing.",
      question: "When containerizing Node.js and Python microservices with Docker, what multi-stage build optimizations and container security practices do you enforce in production?",
      goodAnswerPoints: [
        "Uses minimal distroless or Alpine base images to minimize attack surface and image size.",
        "Implements multi-stage Docker builds separating development dependencies from runtime artifacts.",
        "Ensures non-root user execution inside container (USER node / appuser).",
        "Configures explicit memory and CPU limits (cgroups) to prevent OOM cascade failures."
      ],
      interviewNotes: "",
      score: 0
    },

    // 5-7: Practical Experience & Problem-Solving
    {
      id: 5,
      category: "Practical Experience",
      difficulty: "Advanced",
      intent: "Investigates real-world production incident response and root-cause analysis.",
      question: "Describe a complex production outage or severe performance regression you personally resolved in a microservices or distributed environment. What was your diagnosis and preventative fix?",
      goodAnswerPoints: [
        "Structured diagnosis: traces telemetry via distributed tracing (OpenTelemetry/Datadog), error rates, and CPU/memory spikes.",
        "Clear root cause identification (e.g. database connection exhaustion, memory leak, or cascading timeout).",
        "Immediate mitigation vs long-term architectural remediation (circuit breakers, rate limiting, exponential backoff).",
        "Post-mortem documentation and blameless post-mortem culture."
      ],
      interviewNotes: "",
      score: 0
    },
    {
      id: 6,
      category: "Practical Experience",
      difficulty: "Intermediate",
      intent: "Tests capability to manage technical debt while delivering under tight business deadlines.",
      question: "How do you balance rapid delivery of client-facing AI features with engineering rigor like automated testing, CI/CD pipelines, and refactoring?",
      goodAnswerPoints: [
        "Advocates for continuous small refactorings alongside feature tickets rather than prolonged rewrite sprints.",
        "Applies testing pyramid: fast unit tests in Vitest/Jest, mock external LLM API calls with deterministic fixtures.",
        "Leverages feature flags to roll out experimental AI capabilities incrementally to canary user cohorts.",
        "Transparently communicates technical trade-offs and debt impact to product management."
      ],
      interviewNotes: "",
      score: 0
    },
    {
      id: 7,
      category: "Practical Experience",
      difficulty: "Intermediate",
      intent: "Assesses AI cost optimization and latency engineering in production systems.",
      question: "If your LLM API monthly bill or inference latency suddenly doubled due to user growth, what tactical architectural measures would you take within the first 48 hours?",
      goodAnswerPoints: [
        "Implement semantic caching (e.g. Redis + vector distance) for frequent or identical prompt queries.",
        "Model tiering: routing simple classification/routing prompts to smaller, faster models (e.g. Flash/Haiku) and reserving Pro models for complex reasoning.",
        "Prompt compression: stripping redundant context tokens and formatting instructions.",
        "Batching non-interactive background tasks during off-peak windows."
      ],
      interviewNotes: "",
      score: 0
    },

    // 8-10: Cultural & Role Fit
    {
      id: 8,
      category: "Role & Cultural Fit",
      difficulty: "Intermediate",
      intent: "Evaluates cross-functional collaboration with non-technical stakeholders.",
      question: "How do you communicate AI capabilities, prompt nondeterminism, and statistical confidence levels to non-technical stakeholders, such as product managers and legal compliance teams?",
      goodAnswerPoints: [
        "Translates complex probabilistic concepts into clear business SLAs and risk boundaries.",
        "Provides realistic expectations regarding edge cases rather than over-promising 100% LLM accuracy.",
        "Creates interactive sandbox demos or evaluation matrices so stakeholders can visually inspect prompt variations.",
        "Demonstrates empathy for user experience and compliance requirements."
      ],
      interviewNotes: "",
      score: 0
    },
    {
      id: 9,
      category: "Role & Cultural Fit",
      difficulty: "Intermediate",
      intent: "Tests engineering mentorship and elevating team standards.",
      question: "How do you approach code reviews and mentorship for mid-level or junior engineers who are eager to learn modern AI/full-stack engineering practices?",
      goodAnswerPoints: [
        "Conducts constructive, empathetic code reviews focused on architectural principles and 'why' rather than nitpicking style.",
        "Pair-programs on thorny bugs to model systematic troubleshooting and debugging methods.",
        "Creates internal documentation, architecture decision records (ADRs), and lunch-and-learn knowledge shares.",
        "Celebrates junior team members' wins and encourages safe experimentation."
      ],
      interviewNotes: "",
      score: 0
    },
    {
      id: 10,
      category: "Role & Cultural Fit",
      difficulty: "Intermediate",
      intent: "Evaluates adaptability, ownership, and autonomous problem-solving.",
      question: "The Generative AI landscape evolves rapidly on a monthly basis. How do you continuously vet which new libraries, frameworks, and foundational models are truly production-worthy versus fleeting hype?",
      goodAnswerPoints: [
        "Runs rapid proof-of-concept benchmarks focusing on maintainability, latency, and community support.",
        "Prioritizes open standards, clean modular abstractions, and vendor-agnostic APIs to prevent deep lock-in.",
        "Reads primary research papers, engineering blogs, and benchmark suites rather than relying on social media hype.",
        "Considers team cognitive load before introducing new tools into the production stack."
      ],
      interviewNotes: "",
      score: 0
    }
  ];
}
