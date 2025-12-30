
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateStrategy(strengths: string, decisionArea: string): Promise<string> {
  try {
    const prompt = `
      You are a world-class strategic thinking partner and executive coach. Your mission is to empower users by helping them apply their unique strengths to make intelligent, well-informed decisions.

      The user has provided the following information:
      - **Strengths:** ${strengths}
      - **Area of Focus:** ${decisionArea}

      Your task is to generate a comprehensive, actionable strategic plan. The plan should be insightful, encouraging, and highly practical.

      **Output Requirements:**
      1.  **Format:** Use Markdown for clear, readable formatting. Use headings, bold text, and bullet points.
      2.  **Structure:** Organize your response into the following sections:
          -   A brief, empowering **## Opening Statement**.
          -   A section for each strength listed, titled "**### Leveraging Your Strength: [Strength Name]**". Under each, provide 2-3 specific, actionable ways to apply that strength to the user's area of focus using bullet points.
          -   A section titled "**## Strategic Synthesis: Weaving Your Strengths Together**". Explain how combining these strengths creates a powerful, unique advantage.
          -   A section titled "**## Potential Blind Spots & Mitigation**". Gently point out potential challenges or blind spots related to these strengths and suggest how to proactively manage them.
          -   A concluding "**## Your Path Forward**" section with a summary and a final motivational thought.
      3.  **Tone:** Be positive, strategic, and authoritative, like a trusted advisor.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Error generating strategy from Gemini API:", error);
    if (error instanceof Error && error.message.includes('API key not valid')) {
         throw new Error("The provided API key is not valid. Please check your configuration.");
    }
    throw new Error("Failed to generate a strategy. Please try again later.");
  }
}
