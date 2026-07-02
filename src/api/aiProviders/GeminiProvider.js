import { GoogleGenerativeAI } from '@google/generative-ai';

export class GeminiProvider {
  constructor(apiKey) {
    const storedKey = typeof window !== 'undefined' ? localStorage.getItem('GEMINI_API_KEY') : null;
    const finalKey = apiKey || storedKey;
    
    if (!finalKey) {
      console.warn("Gemini API Key is missing. Please set VITE_GEMINI_API_KEY in .env.local or enter it in the Advanced Settings.");
    }
    
    this.genAI = new GoogleGenerativeAI(finalKey || 'dummy-key');
    this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  }

  async generateText(prompt) {
    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error("Gemini API Error:", error);
      throw new Error("Failed to generate content with Gemini.");
    }
  }

  // Define structured JSON generation
  async generateJSON(prompt) {
    try {
      const modelWithJson = this.genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        generationConfig: { responseMimeType: "application/json" }
      });
      const result = await modelWithJson.generateContent(prompt);
      const response = await result.response;
      return JSON.parse(response.text());
    } catch (error) {
      console.error("Gemini API Error (JSON):", error);
      throw new Error("Failed to generate structured content with Gemini.");
    }
  }
}
