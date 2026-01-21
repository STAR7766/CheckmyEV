
import { GoogleGenAI, Type } from "@google/genai";
import { DiagnosticInput, DiagnosticResult } from "../types";

const SYSTEM_INSTRUCTION = `You are a world-class AI-powered EV Charging Diagnostic Engineer. 
Your job is to identify real electrical reasons why an EV is charging poorly, based on physics and electrical engineering principles.
Analyze inputs for issues like voltage drop (V = I * R), thermal derating (P = I^2 * R), earthing faults, and power quality.
Always provide:
1. Root Cause: Precise electrical diagnosis.
2. Risk Level: Low, Medium, or High based on fire/shock hazard.
3. Electrical Explanation: The physics of what's happening (e.g., resistance, impedance, heat).
4. Safety Assessment: Is this safe long-term?
5. Protection Logic: Why the EV or Charger is throttling or tripping.
6. Practical Fix: Engineering solutions like rewiring, torque checks, or earthing rods.

Never blame the user or suggest a new car. Focus on the infrastructure.`;

export async function runDiagnostic(input: DiagnosticInput): Promise<DiagnosticResult> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const prompt = `
    EV Model: ${input.evModel}
    Charger: ${input.chargerType}
    Electrical Supply: ${input.supplyVoltage}V, ${input.phase}
    Cable Specs: ${input.cableLength}m length, ${input.cableSize}mm² cross-section
    Earthing: ${input.earthing}
    Breaker: ${input.breakerDetails}
    Observed Issues: ${input.observedProblems}
    
    Please diagnose this case as a senior electrical engineer.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          rootCause: { type: Type.STRING },
          riskLevel: { type: Type.STRING, enum: ['Low', 'Medium', 'High'] },
          electricalExplanation: { type: Type.STRING },
          safetyAssessment: { type: Type.STRING },
          protectionLogic: { type: Type.STRING },
          practicalFix: { type: Type.STRING }
        },
        required: ["rootCause", "riskLevel", "electricalExplanation", "safetyAssessment", "protectionLogic", "practicalFix"]
      }
    }
  });

  return JSON.parse(response.text);
}
