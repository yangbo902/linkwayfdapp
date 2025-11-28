import { GoogleGenAI } from "@google/genai";

// Declare process for TypeScript to avoid compilation errors if @types/node is missing
declare var process: {
  env: {
    [key: string]: string | undefined;
  };
};

// Declare window extension for the polyfill in index.html
declare global {
  interface Window {
    process?: {
      env: {
        [key: string]: string | undefined;
      };
    };
  }
}

// Helper to safely get API key without crashing in browser
const getApiKey = (): string => {
  try {
    // 1. Check standard process.env (Vite replacement or Node)
    // We check typeof to avoid ReferenceError if the variable is completely undeclared
    if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
      return process.env.API_KEY;
    }
    
    // 2. Check window.process (Browser polyfill from index.html)
    if (typeof window !== 'undefined' && window.process && window.process.env && window.process.env.API_KEY) {
      return window.process.env.API_KEY;
    }
  } catch (e) {
    console.warn("API Key access failed", e);
  }
  return '';
};

const API_KEY = getApiKey();

let aiClient: GoogleGenAI | null = null;

// Only initialize if key is present
if (API_KEY) {
  try {
    aiClient = new GoogleGenAI({ apiKey: API_KEY });
  } catch (e) {
    console.error("Failed to initialize GoogleGenAI client", e);
  }
}

export const generateInvestmentAdvice = async (userPrompt: string): Promise<string> => {
  // Graceful fallback if client isn't initialized (e.g. missing key)
  if (!aiClient) {
    console.warn("Gemini Client not initialized. Missing API_KEY.");
    return "AI Service Unavailable. Please ensure the API Key is configured in your environment.";
  }

  try {
    const model = 'gemini-2.5-flash';
    const systemInstruction = `
      You are the **Official AI Assistant for LinkwayFDI**, a cross-border investment consulting firm connecting Europe and Asia.

      Your Role:
      - Provide strategic advice on Foreign Direct Investment (FDI) into China and Outward Direct Investment (ODI) from China to Europe.
      - Explain the "Linkway Protocol": A streamlined 6-month market entry process vs the industry standard 18 months.
      - Highlight advantages: "GovSec" compliance, "Parallel Approval" speed, and real-time market intelligence.
      - Maintain a professional, executive, and authoritative tone suitable for C-suite clients.

      If asked about specific industries, focus on:
      1. Advanced Manufacturing (CNC, Robotics)
      2. Automotive (EV Components, Thermal Management)
      3. Smart Grid & Power Equipment
      4. Ecological Foods

      Constraints:
      - Keep answers concise (under 150 words) unless asked for a detailed report.
      - Use "We" to refer to LinkwayFDI.
    `;

    const response = await aiClient.models.generateContent({
      model: model,
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.3, 
      }
    });

    return response.text || "System currently unavailable.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I am currently analyzing high volumes of market data. Please try your query again in a moment.";
  }
};