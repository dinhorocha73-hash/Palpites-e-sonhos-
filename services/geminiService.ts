import { GoogleGenAI, Type } from "@google/genai";
import { getAnimalByNumber } from '../utils/gameLogic';
import { DailyPrediction, DreamPrediction } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getHoroscopePrediction = async (sign: string): Promise<DailyPrediction> => {
  try {
    const prompt = `Você é o Mestre Dinho, um místico especialista no Jogo do Bicho.
    Gere um palpite da sorte curto (máximo 2 frases) para o signo de ${sign} hoje.
    Forneça também uma milhar da sorte (4 dígitos).
    Responda em JSON.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            prediction: { type: Type.STRING },
            luckyMilhar: { type: Type.STRING }
          },
          required: ["prediction", "luckyMilhar"]
        }
      }
    });

    const json = JSON.parse(response.text || '{}');
    const milhar = json.luckyMilhar || "0000";
    const animal = getAnimalByNumber(milhar);

    return {
      text: json.prediction || "Os astros estão confusos, mas a sorte está com você.",
      luckyNumbers: [milhar],
      animal: animal
    };

  } catch (error) {
    console.error("Gemini Error:", error);
    // Fallback
    const fallbackMilhar = Math.floor(1000 + Math.random() * 9000).toString();
    return {
      text: "A energia cósmica flui misteriosamente hoje. Confie na sua intuição.",
      luckyNumbers: [fallbackMilhar],
      animal: getAnimalByNumber(fallbackMilhar)
    };
  }
};

export const getDailyAnimalPrediction = async (): Promise<DailyPrediction> => {
    const today = new Date().toLocaleDateString('pt-BR');
    const cacheKey = `mestre_dinho_daily_${today}`;

    // Tentar recuperar do cache local primeiro para manter consistência no dia
    try {
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
            return JSON.parse(cached) as DailyPrediction;
        }
    } catch (e) {
        console.warn("Erro ao ler cache", e);
    }

    try {
      const prompt = `Você é o Mestre Dinho. Para o dia de hoje (${today}), qual é o "Bicho do Dia" no Jogo do Bicho baseado em numerologia e vibrações do dia?
      Explique brevemente o porquê (ex: dia do santo tal, lua tal).
      Gere uma milhar sugerida.
      Responda em JSON.`;
  
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              reasoning: { type: Type.STRING },
              luckyMilhar: { type: Type.STRING }
            },
            required: ["reasoning", "luckyMilhar"]
          }
        }
      });
  
      const json = JSON.parse(response.text || '{}');
      const milhar = json.luckyMilhar || "1234";
      const animal = getAnimalByNumber(milhar);
  
      const result: DailyPrediction = {
        text: json.reasoning || "Hoje é um dia de fortes energias para apostas.",
        luckyNumbers: [milhar],
        animal: animal
      };

      // Salvar no cache
      try {
          localStorage.setItem(cacheKey, JSON.stringify(result));
      } catch (e) {
          console.warn("Erro ao salvar cache", e);
      }
  
      return result;
    } catch (error) {
        console.error("Gemini Error:", error);
        const fallbackMilhar = Math.floor(1000 + Math.random() * 9000).toString();
        return {
            text: "A sorte favorece os audazes. Tente este palpite hoje!",
            luckyNumbers: [fallbackMilhar],
            animal: getAnimalByNumber(fallbackMilhar)
        };
    }
  };

export const interpretDream = async (dreamText: string): Promise<DreamPrediction> => {
  try {
    const prompt = `Você é o Mestre Dinho, a maior autoridade em "Livro dos Sonhos" e Jogo do Bicho do Brasil.
    O usuário sonhou com: "${dreamText}".
    Interprete este sonho misticamente e relacione com um bicho e uma milhar específica.
    Seja criativo e místico.
    Responda EXCLUSIVAMENTE em JSON.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            interpretation: { type: Type.STRING, description: "A interpretação mística do sonho conectada ao bicho" },
            luckyMilhar: { type: Type.STRING, description: "Uma milhar de 4 dígitos relacionada ao sonho" }
          },
          required: ["interpretation", "luckyMilhar"]
        }
      }
    });

    const json = JSON.parse(response.text || '{}');
    const milhar = json.luckyMilhar || generateFallbackMilhar();
    const animal = getAnimalByNumber(milhar);

    return {
      interpretation: json.interpretation || "Seu sonho carrega mistérios profundos. Aposte com fé.",
      luckyMilhar: milhar,
      animal: animal
    };

  } catch (error) {
    console.error("Dream Interpretation Error:", error);
    const milhar = generateFallbackMilhar();
    return {
      interpretation: "As nuvens do mistério encobrem este sonho, mas a sorte sorri para quem tenta.",
      luckyMilhar: milhar,
      animal: getAnimalByNumber(milhar)
    };
  }
};

const generateFallbackMilhar = () => Math.floor(1000 + Math.random() * 9000).toString();