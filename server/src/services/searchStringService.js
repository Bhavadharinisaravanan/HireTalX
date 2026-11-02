/**
 * Search String Generator for Recruiter Sourcing
 * Generates Naukri Boolean, Naukri Plain-Language, LinkedIn Boolean, and LinkedIn Plain-Language strings.
 */

export function generateSearchStrings(jd) {
  const title = jd.title || "Senior Full Stack & AI Solutions Engineer";
  const required = jd.requiredSkills || ["React", "TypeScript", "Node.js", "Python", "PostgreSQL", "Docker", "LLM Integration / RAG"];
  const location = jd.location ? jd.location.split(',')[0].replace(/[^a-zA-Z\s]/g, '').trim() : "Bangalore";
  const minExp = jd.minExperienceYears || 5;
  const maxExp = jd.maxExperienceYears || 8;

  // 1. Naukri Boolean
  const naukriBoolean = `("React" OR "React.js" OR "ReactJS") AND ("TypeScript" OR "Typescript") AND ("Node.js" OR "NodeJS" OR "Node" OR "Express") AND ("Python" OR "FastAPI") AND ("LLM" OR "Generative AI" OR "GenAI" OR "RAG" OR "LangChain" OR "Vector") AND ("PostgreSQL" OR "Postgres" OR "SQL") AND ("Docker" OR "AWS" OR "Container") NOT ("Intern" OR "Trainee" OR "Fresher" OR "Junior")`;

  // 2. Naukri Plain-Language
  const naukriPlain = `React.js, TypeScript, Node.js, Python, PostgreSQL, Docker, Generative AI, RAG Pipelines, LangChain, Microservices, REST APIs, ${location}, ${minExp} to ${maxExp} years experience`;

  // 3. LinkedIn Boolean
  const linkedinBoolean = `(title:"Full Stack Engineer" OR title:"Full Stack Developer" OR title:"Software Engineer" OR title:"AI Engineer") AND ("React" OR "TypeScript") AND ("Node.js" OR "Python") AND ("LLM" OR "RAG" OR "LangChain" OR "Generative AI") AND ("Docker" OR "AWS") NOT (title:"Intern" OR title:"Associate" OR title:"Graduate")`;

  // 4. LinkedIn Plain-Language
  const linkedinPlain = `${title} with React TypeScript Node.js Python Generative AI and RAG in ${location}`;

  return {
    naukri: {
      boolean: naukriBoolean,
      plain: naukriPlain,
      charCountBoolean: naukriBoolean.length,
      tips: "Paste into Naukri Resdex / Recruiter 'Key Skills' or 'Keywords' search field with 'All Keywords (AND)' selected."
    },
    linkedin: {
      boolean: linkedinBoolean,
      plain: linkedinPlain,
      charCountBoolean: linkedinBoolean.length,
      tips: "Paste into LinkedIn Recruiter search bar or LinkedIn Standard search with 'People' filter applied."
    },
    roleMetadata: {
      title,
      targetExperience: `${minExp}-${maxExp} Years`,
      primaryLocation: location,
      coreKeywords: required.slice(0, 6)
    }
  };
}
