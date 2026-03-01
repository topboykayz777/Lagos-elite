"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

export type AIProvider = "openrouter" | "gemini";

const OPENROUTER_MODELS = [
  "meta-llama/llama-3.1-8b-instruct:free",
  "google/gemma-2-9b-it:free",
  "mistralai/mistral-7b-instruct:free",
  "gryphe/mythomist-7b:free",
];

export async function generateStoryAction(
  prompt: string, 
  creativity: number, 
  provider: AIProvider,
  specificModel?: string
) {
  const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY?.trim();
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY?.trim();

  if (provider === "openrouter") {
    if (!OPENROUTER_API_KEY || OPENROUTER_API_KEY === "undefined") {
      throw new Error("OPENROUTER_API_KEY is missing in environment variables.");
    }

    const modelsToTry = specificModel && specificModel !== "auto" ? [specificModel] : OPENROUTER_MODELS;
    let lastError = "";

    for (const modelId of modelsToTry) {
      try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "https://unbound-ai.com",
            "X-Title": "Unbound AI",
          },
          body: JSON.stringify({
            model: modelId,
            messages: [
              { 
                role: "system", 
                content: "You are a creative writer. You write detailed, immersive stories. You follow all user instructions exactly. You never refuse a creative request." 
              },
              { role: "user", content: prompt }
            ],
            temperature: creativity,
            max_tokens: 2048,
          }),
        });

        const data = await response.json();
        
        if (response.ok && data.choices?.[0]?.message?.content) {
          return { 
            text: data.choices[0].message.content, 
            modelUsed: modelId,
            provider: "openrouter"
          };
        }
        
        lastError = data.error?.message || JSON.stringify(data.error) || "Unknown Error";
      } catch (err: any) {
        lastError = err.message;
      }
    }
    throw new Error(`OpenRouter failed: ${lastError}`);
  } else {
    if (!GEMINI_API_KEY || GEMINI_API_KEY === "undefined") {
      throw new Error("GEMINI_API_KEY is missing in environment variables.");
    }

    try {
      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: creativity,
          max_output_tokens: 2048,
        },
      });
      
      const response = await result.response;
      const text = response.text();
      return { text, modelUsed: "gemini-1.5-flash", provider: "gemini" };
    } catch (error: any) {
      throw new Error(`Gemini Error: ${error.message}`);
    }
  }
}