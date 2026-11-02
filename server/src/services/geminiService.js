import { GoogleGenerativeAI } from '@google/generative-ai';

let genAI = null;

function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim() === '' || apiKey === 'YOUR_GEMINI_API_KEY') {
    return null;
  }
  if (!genAI) {
    try {
      genAI = new GoogleGenerativeAI(apiKey);
    } catch (e) {
      console.warn('Failed to initialize GoogleGenerativeAI client:', e);
      return null;
    }
  }
  return genAI;
}

/**
 * Call Gemini model with a prompt and extract JSON response
 * @param {string} prompt 
 * @param {string} systemInstruction 
 * @returns {Promise<any|null>}
 */
export async function callGeminiJSON(prompt, systemInstruction = '') {
  const client = getGeminiClient();
  if (!client) {
    return null;
  }

  try {
    const model = client.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.2,
      },
      systemInstruction: systemInstruction || undefined,
    });

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return JSON.parse(text);
  } catch (err) {
    console.warn('Gemini API call failed or rate limited, falling back to local intelligence engine:', err.message);
    return null;
  }
}

/**
 * Check if Gemini API is configured
 */
export function isGeminiConfigured() {
  const apiKey = process.env.GEMINI_API_KEY;
  return Boolean(apiKey && apiKey.trim().length > 5 && apiKey !== 'YOUR_GEMINI_API_KEY');
}
