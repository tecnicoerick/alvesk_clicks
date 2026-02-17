import { GoogleGenAI, Type } from "@google/genai";
import { AICaptionResponse } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateImageAnalysis = async (base64Image: string): Promise<AICaptionResponse> => {
  if (!apiKey) {
    throw new Error("API Key não encontrada. Por favor, configure a variável de ambiente API_KEY.");
  }

  // Remove header data URI if present (e.g., "data:image/jpeg;base64,")
  const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, "");

  try {
    const model = 'gemini-2.5-flash';
    
    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: cleanBase64
            }
          },
          {
            text: `Analise esta fotografia como um fotógrafo profissional premiado.
            1. Crie uma legenda poética e envolvente em Português para redes sociais.
            2. Forneça uma breve análise técnica (composição, iluminação, cor).
            3. Sugira 5 hashtags relevantes.`
          }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            caption: { type: Type.STRING, description: "A poetic caption for the image" },
            technicalAnalysis: { type: Type.STRING, description: "Brief technical analysis of lighting and composition" },
            tags: { type: Type.ARRAY, items: { type: Type.STRING }, description: "5 relevant hashtags" }
          },
          required: ["caption", "technicalAnalysis", "tags"]
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) throw new Error("Sem resposta da IA");

    return JSON.parse(jsonText) as AICaptionResponse;

  } catch (error) {
    console.error("Erro ao analisar imagem com Gemini:", error);
    throw error;
  }
};