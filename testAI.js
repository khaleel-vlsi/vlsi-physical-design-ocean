import { generateObjective, generateSummary, suggestSkills, generateAchievements, enhanceExperience, enhanceProject } from './src/api/aiService.js';
import { GeminiProvider } from './src/api/aiProviders/GeminiProvider.js';

console.log("=== BEGINNING END-TO-END AI TESTING ===");

async function runTests() {
  try {
    console.log("Testing suggestSkills (Fresher Physical Design)...");
    const fresherSkills = await suggestSkills('Physical Design', 'Fresher');
    console.log("Result:", fresherSkills.substring(0, 50) + "...\n");

    console.log("Testing generateObjective (STA Engineer, 5 Years)...");
    const obj = await generateObjective('Static Timing Analysis', '5 Years', ['PrimeTime', 'TCL', 'Timing Closure']);
    console.log("Result:", obj + "\n");

    console.log("Testing enhanceExperience...");
    const rawExp = "did floorplanning and placement for block level design and fixed setup violations";
    const enhanced = await enhanceExperience(rawExp, 'Physical Design');
    console.log("Result:", enhanced + "\n");

    console.log("Testing generateAchievements (DFT Engineer)...");
    const ach = await generateAchievements('Semiconductor', 'DFT Engineer');
    console.log("Result:", ach + "\n");

    console.log("ALL AI TESTS PASSED SUCCESSFULLY! ✅");
  } catch (error) {
    console.error("AI TEST FAILED ❌");
    console.error(error.message);
    process.exit(1);
  }
}

runTests();
