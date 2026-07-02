import { GeminiProvider } from './aiProviders/GeminiProvider.js';
import { CacheLayer } from './aiProviders/CacheLayer.js';

// Initialize Provider
// We read from env var, defaulting to empty so it warns if not set
const GEMINI_API_KEY = (typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_GEMINI_API_KEY : process.env.VITE_GEMINI_API_KEY) || '';
const provider = new GeminiProvider(GEMINI_API_KEY);

// Helper for caching logic
async function withCache(cacheKey, apiCallFn) {
  const cached = CacheLayer.get(cacheKey);
  if (cached) return cached;
  
  const result = await apiCallFn();
  CacheLayer.set(cacheKey, result);
  return result;
}

/**
 * Generate a professional career objective based on domain and experience level.
 */
export async function generateObjective(domain, experienceLevel, skills) {
  const prompt = `You are an expert ATS-friendly resume writer for the Semiconductor/VLSI industry. 
Write a professional Career Objective (3-4 sentences) for a ${experienceLevel} engineer in the ${domain} domain. 
Incorporate these skills: ${skills.join(', ')}. 
Do not use bullet points. Make it sound professional, action-oriented, and highlight value.`;

  return withCache(CacheLayer.generateKey('obj', domain, experienceLevel, skills), () => 
    provider.generateText(prompt)
  );
}

/**
 * Generate a professional summary based on experience bullet points.
 */
export async function generateSummary(experienceText, domain, level) {
  const prompt = `You are an expert ATS-friendly resume writer. 
Summarize the following work experience into a 3-sentence professional summary for a ${level} ${domain} engineer.
Focus on major achievements, methodologies, and tools used. Do not use bullet points.

Work Experience:
${experienceText}`;

  return withCache(CacheLayer.generateKey('sum', experienceText, domain, level), () => 
    provider.generateText(prompt)
  );
}

/**
 * Enhance experience bullet points with action verbs and quantifiable metrics.
 */
export async function enhanceExperience(rawText, domain) {
  const prompt = `You are an expert technical resume writer.
Enhance the following work experience description for a ${domain} role. 
Format the output strictly as bullet points starting with '•'.
For each bullet point, rewrite it to:
1. Start with a strong action verb (e.g., Spearheaded, Architected, Optimized).
2. Incorporate quantifiable metrics where appropriate (if none exist, suggest reasonable metric placeholders like "resulting in X% improvement").
3. Keep it concise, ATS-friendly, and impactful.

Raw Description:
${rawText}`;

  return withCache(CacheLayer.generateKey('enhExp', rawText, domain), () => 
    provider.generateText(prompt)
  );
}

/**
 * Enhance project description.
 */
export async function enhanceProject(rawText, tools) {
  const prompt = `You are an expert technical resume writer.
Enhance the following project description. 
Format the output strictly as bullet points starting with '•'.
Highlight the use of these tools: ${tools.join(', ')}.
Focus on problem solving, methodologies, and outcomes.

Raw Description:
${rawText}`;

  return withCache(CacheLayer.generateKey('enhProj', rawText, tools), () => 
    provider.generateText(prompt)
  );
}

/**
 * Improve grammar and professional tone.
 */
export async function improveGrammar(text) {
  const prompt = `Fix any grammar or spelling mistakes in the following text. 
Maintain the original meaning but make it sound more professional.
Only return the corrected text, nothing else.

Text:
${text}`;

  return withCache(CacheLayer.generateKey('gram', text), () => 
    provider.generateText(prompt)
  );
}

/**
 * Suggest technical skills based on domain and experience level.
 */
export async function suggestSkills(domain, experienceLevel) {
  const prompt = `You are an expert recruiter in the Semiconductor/VLSI industry.
List 15-20 essential technical skills, EDA tools, and methodologies for a ${experienceLevel} ${domain} engineer.
Return ONLY a comma-separated list of skills, with no introductory text or bullet points.`;

  return withCache(CacheLayer.generateKey('sugSkills', domain, experienceLevel), () => 
    provider.generateText(prompt)
  );
}

/**
 * Compare resume against a Job Description.
 */
export async function matchJobDescription(resumeData, jdText) {
  const prompt = `You are an ATS system parsing a resume against a Job Description.
Compare them and return a JSON object with the following schema:
{
  "matchPercentage": number (0-100),
  "matchedSkills": string[],
  "missingSkills": string[],
  "suggestions": string[] (3 actionable tips to improve the match)
}

Resume Data:
${JSON.stringify(resumeData)}

Job Description:
${jdText}`;

  return withCache(CacheLayer.generateKey('matchJD', JSON.stringify(resumeData), jdText), () => 
    provider.generateJSON(prompt)
  );
}

/**
 * Generate Achievements for a given role or domain.
 */
export async function generateAchievements(domain, role) {
  const prompt = `You are a technical recruiter. Generate 3 impressive, quantifiable bullet point achievements for a ${role} in the ${domain} industry.
Return ONLY the bullet points, starting each with a strong action verb. Do not include an introduction.`;

  return withCache(CacheLayer.generateKey('genAch', domain, role), () => 
    provider.generateText(prompt)
  );
}

/**
 * Generate a Cover Letter based on resume data and job description.
 */
export async function generateCoverLetter(resumeData, jdText) {
  const prompt = `You are an expert career coach. Write a compelling, highly professional cover letter using the candidate's resume data to apply for the following job description.

Candidate Resume Data:
${JSON.stringify(resumeData)}

Job Description:
${jdText}

Write the full cover letter text.`;

  return withCache(CacheLayer.generateKey('covLet', JSON.stringify(resumeData), jdText), () => 
    provider.generateText(prompt)
  );
}

/**
 * Generate LinkedIn Optimization Suggestions.
 */
export async function optimizeLinkedIn(resumeData) {
  const prompt = `You are a LinkedIn optimization expert. Review this resume data and provide:
1. A highly optimized LinkedIn Headline.
2. A compelling "About" section summary.
3. 5 specific keywords to add to their Skills section.

Resume Data:
${JSON.stringify(resumeData)}

Return the output formatted cleanly in text.`;

  return withCache(CacheLayer.generateKey('linOpt', JSON.stringify(resumeData)), () => 
    provider.generateText(prompt)
  );
}

/**
 * Global Resume ATS Optimization
 */
export async function optimizeResumeATS(resumeData) {
  const prompt = `You are an ATS parser and resume writer. Rewrite the provided resume JSON to maximize ATS parsing.
Improve action verbs, fix grammar, and ensure standard terminology is used.
Return the exact same JSON schema structure, but with the text fields enhanced.

Resume JSON:
${JSON.stringify(resumeData)}
`;

  return withCache(CacheLayer.generateKey('atsOpt', JSON.stringify(resumeData)), () => 
    provider.generateJSON(prompt)
  );
}
