/**
 * Client-side ATS Scoring Engine
 */

export function calculateATSScore(resumeData, domainKeywords = []) {
  let score = 100;
  const issues = [];
  const improvements = [];
  
  // 1. Missing Sections Check (Max penalty: 30)
  const sections = Object.keys(resumeData || {});
  if (!sections.includes('education') || !resumeData.education?.items?.length) {
    score -= 10;
    issues.push({ id: 'missing_education', message: 'Missing Education section' });
  }
  if (!sections.includes('projects') || !resumeData.projects?.items?.length) {
    score -= 10;
    issues.push({ id: 'missing_projects', message: 'Missing Projects section (Critical for VLSI)' });
  }
  if (!sections.includes('experience') || !resumeData.experience?.items?.length) {
    score -= 15;
    issues.push({ id: 'missing_experience', message: 'Missing Experience section' });
  }
  if (!sections.includes('skills') || !resumeData.skills?.text) {
    score -= 5;
    issues.push({ id: 'missing_skills', message: 'Missing Technical Skills section' });
  }

  // 2. Contact Completeness (Max penalty: 15)
  const personal = resumeData.personal || {};
  if (!personal.email) {
    score -= 5;
    issues.push({ id: 'missing_email', message: 'Missing Email address' });
  }
  if (!personal.phone) {
    score -= 5;
    issues.push({ id: 'missing_phone', message: 'Missing Phone number' });
  }
  if (!personal.linkedin) {
    score -= 5;
    improvements.push({ id: 'add_linkedin', message: 'Add a LinkedIn profile URL to boost your professional credibility.' });
  }

  // 3. Keyword Match (Max penalty: 20)
  if (domainKeywords.length > 0) {
    const fullText = JSON.stringify(resumeData).toLowerCase();
    let matches = 0;
    const missing = [];
    
    for (const kw of domainKeywords) {
      if (fullText.includes(kw.toLowerCase())) {
        matches++;
      } else {
        missing.push(kw);
      }
    }
    
    const matchRatio = matches / domainKeywords.length;
    if (matchRatio < 0.5) {
      score -= 20;
      issues.push({ id: 'low_keywords', message: `Missing key Physical Design terms (e.g., ${missing.slice(0, 3).join(', ')}). Go to the Technical Skills or Experience sections and use the "✨ Generate with AI" or "✨ Enhance with AI" buttons to automatically insert them.` });
    } else if (matchRatio < 0.8) {
      score -= 10;
      improvements.push({ id: 'med_keywords', message: `Consider adding these keywords: ${missing.slice(0, 3).join(', ')}` });
    }
  }

  // 4. Action Verbs Check (Max penalty: 15)
  let expHasBullets = false;
  let expLacksVerbs = false;
  let expHasMeasurable = false;
  let expHasWeakVerbs = false;
  const actionVerbs = ['developed', 'designed', 'managed', 'created', 'led', 'analyzed', 'optimized', 'implemented', 'architected', 'spearheaded', 'resolved', 'delivered'];
  const weakVerbs = ['helped', 'worked', 'assisted', 'was responsible for', 'handled', 'did'];
  
  if (resumeData.experience?.items?.length) {
    for (const item of resumeData.experience.items) {
      if (item.description) {
        expHasBullets = true;
        const lowerDesc = item.description.toLowerCase();
        const hasVerb = actionVerbs.some(verb => lowerDesc.includes(verb));
        const hasWeak = weakVerbs.some(verb => lowerDesc.includes(verb));
        const hasMetrics = /%|\$|\d+/.test(lowerDesc);
        
        if (!hasVerb) expLacksVerbs = true;
        if (hasMetrics) expHasMeasurable = true;
        if (hasWeak) expHasWeakVerbs = true;
      }
    }
  }
  
  if (expHasBullets && expLacksVerbs) {
    score -= 10;
    issues.push({ id: 'action_verbs', message: 'Use strong action verbs (e.g., Developed, Optimized) in your experience descriptions.' });
  }

  if (expHasBullets && expHasWeakVerbs) {
    score -= 5;
    issues.push({ id: 'weak_verbs', message: 'Avoid weak verbs like "helped" or "worked on". Replace them with active verbs like "Led", "Executed", or "Architected".' });
  }

  if (expHasBullets && !expHasMeasurable) {
    score -= 10;
    issues.push({ id: 'measurable_achievements', message: 'Add quantifiable metrics to your experience. Use numbers, percentages, or dollar amounts to demonstrate impact (e.g., "Improved timing by 15%").' });
  }

  // Ensure score is within 0-100
  score = Math.max(0, Math.min(100, score));

  return {
    score,
    issues,
    improvements
  };
}
