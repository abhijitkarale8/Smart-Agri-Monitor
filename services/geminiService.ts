
import { GoogleGenAI, Type } from "@google/genai";
import type { LeafHealthStatus } from '../types';

if (!process.env.API_KEY) {
  console.warn("API_KEY environment variable not set. Using a placeholder key. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "YOUR_API_KEY_HERE" });

interface AnalysisResult {
    status: LeafHealthStatus;
    reason: string;
}

export const analyzeLeafHealth = async (base64Image: string, mimeType: string): Promise<AnalysisResult> => {
    try {
        if (!process.env.API_KEY) {
            // Simulate API call if no key is present
            await new Promise(resolve => setTimeout(resolve, 2000));
            const mockStatuses: LeafHealthStatus[] = ['Healthy', 'Deficient', 'Diseased'];
            const randomStatus = mockStatuses[Math.floor(Math.random() * mockStatuses.length)];
            return {
                status: randomStatus,
                reason: `This is a mock analysis. The leaf appears to be ${randomStatus.toLowerCase()}. Please configure your API key for a real analysis.`
            };
        }

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: {
                parts: [
                    {
                        inlineData: {
                            data: base64Image,
                            mimeType: mimeType,
                        },
                    },
                    {
                        text: "Analyze the health of this plant leaf. Classify it as 'Healthy', 'Deficient', or 'Diseased'. Provide a brief one-sentence explanation for your classification.",
                    },
                ],
            },
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        status: {
                            type: Type.STRING,
                            description: "The health status of the leaf. Must be one of: Healthy, Deficient, Diseased.",
                        },
                        reason: {
                            type: Type.STRING,
                            description: "A brief, one-sentence explanation of the status.",
                        },
                    },
                    required: ["status", "reason"],
                },
            },
        });

        const jsonString = response.text;
        const result: AnalysisResult = JSON.parse(jsonString);

        if (!['Healthy', 'Deficient', 'Diseased'].includes(result.status)) {
            throw new Error('Invalid status received from API');
        }

        return result;

    } catch (error) {
        console.error("Error analyzing leaf health:", error);
        throw new Error("Failed to analyze leaf health. The API may be unavailable or the response was invalid.");
    }
};
